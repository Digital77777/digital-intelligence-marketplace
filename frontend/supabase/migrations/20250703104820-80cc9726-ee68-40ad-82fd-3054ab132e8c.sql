
-- Fix the teams table RLS policies to allow authenticated users to create teams
DROP POLICY IF EXISTS "Users can create teams" ON public.teams;
DROP POLICY IF EXISTS "Users can view teams they belong to" ON public.teams;
DROP POLICY IF EXISTS "Users can update teams they belong to" ON public.teams;
DROP POLICY IF EXISTS "Users can delete teams they belong to" ON public.teams;

-- Create proper RLS policies for teams table
CREATE POLICY "Users can create teams" ON public.teams
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view teams they belong to" ON public.teams
FOR SELECT 
USING (
  id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
);

CREATE POLICY "Users can update teams they belong to" ON public.teams
FOR UPDATE 
USING (
  id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
);

CREATE POLICY "Users can delete teams they belong to" ON public.teams
FOR DELETE 
USING (
  id IN (SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid())
);

-- Fix user_profiles table policies to prevent sign-up errors
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

-- Create proper RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.user_profiles
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
FOR UPDATE 
USING (auth.uid() = id);

-- Ensure the handle_new_user trigger function works properly
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, username, full_name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/identicon/svg?seed=' || NEW.id)
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    username = COALESCE(EXCLUDED.username, user_profiles.username),
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't prevent user creation
    RAISE WARNING 'Error creating user profile for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
