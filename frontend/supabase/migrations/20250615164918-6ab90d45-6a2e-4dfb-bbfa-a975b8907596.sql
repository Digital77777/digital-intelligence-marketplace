
-- Phase 1 (Corrected): RLS Policy Refactoring for Security and Performance

-- Step 1: Drop old policies and functions if they exist to ensure a clean slate.
-- This makes the script runnable even if parts of the previous one partially succeeded.
DROP POLICY IF EXISTS "Team members can view their teams" ON public.teams;
DROP POLICY IF EXISTS "Team members can view their team" ON public.teams;
DROP POLICY IF EXISTS "Authenticated users can create teams" ON public.teams;
DROP POLICY IF EXISTS "Team creators can update their teams" ON public.teams;
DROP POLICY IF EXISTS "Team creator can update team" ON public.teams;

DROP POLICY IF EXISTS "Team members can view memberships of their own teams" ON public.team_memberships;
DROP POLICY IF EXISTS "Team members can view memberships" ON public.team_memberships;
DROP POLICY IF EXISTS "Team members can add new members to their own teams" ON public.team_memberships;
DROP POLICY IF EXISTS "Team members can add new members" ON public.team_memberships;
DROP POLICY IF EXISTS "Users can leave their own teams" ON public.team_memberships;
DROP POLICY IF EXISTS "Users can leave their team" ON public.team_memberships;

DROP POLICY IF EXISTS "Team members can view tasks in their teams" ON public.tasks;
DROP POLICY IF EXISTS "Team members can view tasks" ON public.tasks;
DROP POLICY IF EXISTS "Team members can create tasks in their teams" ON public.tasks;
DROP POLICY IF EXISTS "Team members can create tasks" ON public.tasks;
DROP POLICY IF EXISTS "Team members can update tasks in their teams" ON public.tasks;
DROP POLICY IF EXISTS "Team members can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Team members can delete tasks in their teams" ON public.tasks;
DROP POLICY IF EXISTS "Team members can delete tasks" ON public.tasks;

DROP FUNCTION IF EXISTS public.is_team_member(uuid, uuid);

-- Step 2: Create the helper function to get user's team IDs.
-- Using SECURITY DEFINER is crucial for this to bypass RLS and avoid recursion.
CREATE OR REPLACE FUNCTION public.get_my_team_ids()
RETURNS SETOF uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
    SELECT team_id FROM public.team_memberships WHERE user_id = auth.uid();
$$;

-- Step 3: Create the new, corrected RLS policies.
-- The syntax `column IN (SELECT func())` is the correct way to use a set-returning function in a policy.

-- Policies for 'teams' table
CREATE POLICY "Team members can view their teams" ON public.teams
  FOR SELECT USING (id IN (SELECT public.get_my_team_ids()));

CREATE POLICY "Authenticated users can create teams" ON public.teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Team creators can update their teams" ON public.teams
  FOR UPDATE USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());


-- Policies for 'team_memberships' table
CREATE POLICY "Team members can view memberships of their own teams" ON public.team_memberships
  FOR SELECT USING (team_id IN (SELECT public.get_my_team_ids()));

CREATE POLICY "Team members can add new members to their own teams" ON public.team_memberships
  FOR INSERT WITH CHECK (team_id IN (SELECT public.get_my_team_ids()));

CREATE POLICY "Users can leave their own teams" ON public.team_memberships
  FOR DELETE USING (user_id = auth.uid());


-- Policies for 'tasks' table
CREATE POLICY "Team members can view tasks in their teams" ON public.tasks
  FOR SELECT USING (team_id IN (SELECT public.get_my_team_ids()));

CREATE POLICY "Team members can create tasks in their teams" ON public.tasks
  FOR INSERT WITH CHECK (team_id IN (SELECT public.get_my_team_ids()));

CREATE POLICY "Team members can update tasks in their teams" ON public.tasks
  FOR UPDATE USING (team_id IN (SELECT public.get_my_team_ids())) WITH CHECK (team_id IN (SELECT public.get_my_team_ids()));
  
CREATE POLICY "Team members can delete tasks in their teams" ON public.tasks
  FOR DELETE USING (team_id IN (SELECT public.get_my_team_ids()));
