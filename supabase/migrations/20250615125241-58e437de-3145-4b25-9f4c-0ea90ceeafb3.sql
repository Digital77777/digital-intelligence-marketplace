
-- This function safely retrieves the teams a user belongs to.
-- It uses SECURITY DEFINER to bypass RLS on the team_memberships table, preventing recursion.
CREATE OR REPLACE FUNCTION public.get_my_teams()
RETURNS TABLE(team_id uuid)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid();
$$;

-- First, let's fix the policies on the team_memberships table.
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;

-- Drop potentially recursive SELECT policies on team_memberships.
DROP POLICY IF EXISTS "Team members can view other members" ON public.team_memberships;
DROP POLICY IF EXISTS "Users can view memberships of their own teams." ON public.team_memberships;

-- Create a new, safe SELECT policy for team_memberships.
CREATE POLICY "Users can view memberships of teams they belong to" ON public.team_memberships
FOR SELECT
USING (team_id IN (SELECT team_id FROM public.get_my_teams()));

-- Now, let's set up safe policies for the workflows table.
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Drop potentially problematic existing policies on workflows.
DROP POLICY IF EXISTS "Users can create workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can view their own or team workflows" ON public.workflows;
DROP POLICY IF EXISTS "Allow insert for team members" ON public.workflows;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.workflows;
DROP POLICY IF EXISTS "Users can create workflows for themselves or their teams" ON public.workflows;
DROP POLICY IF EXISTS "Users can view their own workflows or team workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can update their own workflows or team workflows" ON public.workflows;
DROP POLICY IF EXISTS "Users can delete their own workflows or team workflows" ON public.workflows;

-- Policy to allow users to create workflows.
CREATE POLICY "Users can create workflows for themselves or their teams" ON public.workflows
FOR INSERT
WITH CHECK (
  created_by = auth.uid() AND (
    team_id IS NULL OR team_id IN (SELECT team_id FROM public.get_my_teams())
  )
);

-- Policy to allow users to view workflows.
CREATE POLICY "Users can view their own workflows or team workflows" ON public.workflows
FOR SELECT
USING (
  created_by = auth.uid() OR team_id IN (SELECT team_id FROM public.get_my_teams())
);

-- Policy to allow users to update workflows.
CREATE POLICY "Users can update their own workflows or team workflows" ON public.workflows
FOR UPDATE
USING (
  created_by = auth.uid() OR team_id IN (SELECT team_id FROM public.get_my_teams())
);

-- Policy to allow users to delete workflows.
CREATE POLICY "Users can delete their own workflows or team workflows" ON public.workflows
FOR DELETE
USING (
  created_by = auth.uid() OR team_id IN (SELECT team_id FROM public.get_my_teams())
);
