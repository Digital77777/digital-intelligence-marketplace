
-- Create a table for marketplace tool submissions
CREATE TABLE public.marketplace_tool_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  submitter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  short_description TEXT NOT NULL CHECK (length(short_description) <= 300),
  detailed_description TEXT NOT NULL,
  external_link TEXT NOT NULL,
  images TEXT[] NOT NULL CHECK (array_length(images, 1) >= 2),
  category TEXT NOT NULL,
  pricing_model TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.marketplace_tool_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own submissions
CREATE POLICY "Users can view their own submissions"
  ON public.marketplace_tool_submissions
  FOR SELECT
  USING (auth.uid() = submitter_id);

-- Policy: Basic and Pro tier users can insert submissions
CREATE POLICY "Basic and Pro users can submit tools"
  ON public.marketplace_tool_submissions
  FOR INSERT
  WITH CHECK (
    auth.uid() = submitter_id AND
    get_user_tier(auth.uid()) IN ('basic', 'pro')
  );

-- Policy: Users can update their own pending submissions
CREATE POLICY "Users can update their own pending submissions"
  ON public.marketplace_tool_submissions
  FOR UPDATE
  USING (auth.uid() = submitter_id AND status = 'pending');

-- Policy: Admins can view all submissions (for review)
CREATE POLICY "Admins can view all submissions"
  ON public.marketplace_tool_submissions
  FOR SELECT
  USING (get_user_tier(auth.uid()) = 'pro'); -- Assuming pro users can be admins

-- Policy: Admins can update submission status
CREATE POLICY "Admins can update submission status"
  ON public.marketplace_tool_submissions
  FOR UPDATE
  USING (get_user_tier(auth.uid()) = 'pro')
  WITH CHECK (get_user_tier(auth.uid()) = 'pro');
