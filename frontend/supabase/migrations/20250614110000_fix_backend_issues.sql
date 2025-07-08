
-- Fix backend security and performance issues

-- 1. Add missing RLS policies for subscribers table
CREATE POLICY "Users can view own subscription" ON public.subscribers
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON public.subscribers
FOR UPDATE USING (auth.uid() = user_id);

-- 2. Add missing RLS policies for user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable" ON public.user_profiles
FOR SELECT USING (true);

-- 3. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);

-- 4. Add missing constraints
ALTER TABLE public.subscribers 
ADD CONSTRAINT check_subscription_tier 
CHECK (subscription_tier IN ('freemium', 'basic', 'pro'));

-- 5. Fix the create_user_profile function to be more secure
CREATE OR REPLACE FUNCTION public.create_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/identicon/svg?seed=' || NEW.id)
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error creating user profile: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- 6. Create trigger for user profile creation if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();

-- 7. Add performance optimization for compliance functions
CREATE INDEX IF NOT EXISTS idx_compliance_issues_user_regulation 
ON public.compliance_issues(user_id, regulation_type) 
WHERE status != 'Resolved';

CREATE INDEX IF NOT EXISTS idx_compliance_scans_user_regulation 
ON public.compliance_scans(user_id, regulation_type);

-- 8. Optimize the calculate_compliance_score function
CREATE OR REPLACE FUNCTION public.calculate_compliance_score(p_user_id uuid, p_regulation regulation_type)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  critical_issues INTEGER := 0;
  high_issues INTEGER := 0;
  medium_issues INTEGER := 0;
  low_issues INTEGER := 0;
  final_score INTEGER;
BEGIN
  -- Use a single query with conditional aggregation for better performance
  SELECT 
    COUNT(*) FILTER (WHERE risk_level = 'Critical'),
    COUNT(*) FILTER (WHERE risk_level = 'High'),
    COUNT(*) FILTER (WHERE risk_level = 'Medium'),
    COUNT(*) FILTER (WHERE risk_level = 'Low')
  INTO 
    critical_issues, high_issues, medium_issues, low_issues
  FROM 
    public.compliance_issues
  WHERE 
    user_id = p_user_id 
    AND regulation_type = p_regulation
    AND status != 'Resolved';
  
  -- Calculate score with bounds checking
  final_score := 100 - (critical_issues * 15) - (high_issues * 8) - (medium_issues * 3) - (low_issues * 1);
  
  -- Ensure score is between 0 and 100
  RETURN GREATEST(0, LEAST(100, final_score));
END;
$$;

-- 9. Add missing unique constraints to prevent duplicates
ALTER TABLE public.subscribers 
ADD CONSTRAINT unique_subscriber_email UNIQUE (email);

ALTER TABLE public.user_profiles 
ADD CONSTRAINT unique_username UNIQUE (username);

-- 10. Add proper validation for email format
ALTER TABLE public.subscribers 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
