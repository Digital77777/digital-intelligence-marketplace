
-- Create marketplace tools table (approved tools from submissions)
CREATE TABLE public.marketplace_tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  pricing_model TEXT NOT NULL,
  price NUMERIC DEFAULT 0,
  external_link TEXT NOT NULL,
  images TEXT[] NOT NULL,
  contact_info TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_subscription BOOLEAN DEFAULT false,
  subscription_period TEXT,
  rating NUMERIC DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  demo_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'))
);

-- Create marketplace projects table
CREATE TABLE public.marketplace_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  budget_min NUMERIC,
  budget_max NUMERIC,
  budget_type TEXT CHECK (budget_type IN ('fixed', 'hourly')),
  timeline TEXT,
  skills_required TEXT[] DEFAULT '{}',
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'expert')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  deadline TIMESTAMP WITH TIME ZONE,
  location TEXT,
  is_remote BOOLEAN DEFAULT true,
  proposal_count INTEGER DEFAULT 0
);

-- Create marketplace services table
CREATE TABLE public.marketplace_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  provider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  pricing_type TEXT CHECK (pricing_type IN ('fixed', 'hourly', 'package')),
  delivery_time INTEGER, -- in days
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  orders_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'paused'))
);

-- Add RLS policies for marketplace_tools
ALTER TABLE public.marketplace_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tools"
  ON public.marketplace_tools
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Sellers can manage their own tools"
  ON public.marketplace_tools
  FOR ALL
  USING (auth.uid() = seller_id);

-- Add RLS policies for marketplace_projects
ALTER TABLE public.marketplace_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view open projects"
  ON public.marketplace_projects
  FOR SELECT
  USING (status = 'open' OR client_id = auth.uid());

CREATE POLICY "Clients can manage their own projects"
  ON public.marketplace_projects
  FOR ALL
  USING (auth.uid() = client_id);

-- Add RLS policies for marketplace_services
ALTER TABLE public.marketplace_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON public.marketplace_services
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Providers can manage their own services"
  ON public.marketplace_services
  FOR ALL
  USING (auth.uid() = provider_id);

-- Function to approve tool submissions and move to marketplace
CREATE OR REPLACE FUNCTION approve_tool_submission(submission_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  submission_record RECORD;
  new_tool_id UUID;
BEGIN
  -- Get submission details
  SELECT * INTO submission_record
  FROM marketplace_tool_submissions
  WHERE id = submission_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Submission not found or already processed';
  END IF;
  
  -- Create new marketplace tool
  INSERT INTO marketplace_tools (
    seller_id, name, description, category, pricing_model,
    external_link, images, contact_info
  ) VALUES (
    submission_record.submitter_id,
    submission_record.tool_name,
    submission_record.detailed_description,
    submission_record.category,
    submission_record.pricing_model,
    submission_record.external_link,
    submission_record.images,
    submission_record.contact_info
  ) RETURNING id INTO new_tool_id;
  
  -- Update submission status
  UPDATE marketplace_tool_submissions
  SET status = 'approved', reviewed_at = now(), reviewed_by = auth.uid()
  WHERE id = submission_id;
  
  RETURN new_tool_id;
END;
$$;
