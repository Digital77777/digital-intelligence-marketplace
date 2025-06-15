
-- Phase 1 (Corrected): Database Schema Enhancement for Team Dashboard

-- 1. Create a specific type for task statuses for data integrity.
DO $$ BEGIN
    CREATE TYPE public.task_status AS ENUM ('todo', 'in_progress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Update the tasks table to use the new status type.
-- This block is now idempotent and handles the default value correctly.
DO $$ BEGIN
  -- Drop the old text-based default if it exists
  IF EXISTS (
      SELECT 1 FROM pg_attribute
      WHERE  attrelid = 'public.tasks'::regclass
      AND    attname = 'status'
      AND    attgenerated = ''
      AND    atthasdef
  ) THEN
      ALTER TABLE public.tasks ALTER COLUMN status DROP DEFAULT;
  END IF;

  -- Change the column type to the new enum
  ALTER TABLE public.tasks
    ALTER COLUMN status SET DATA TYPE public.task_status USING status::text::public.task_status;

  -- Set the new default with an explicit cast to the enum type
  ALTER TABLE public.tasks
    ALTER COLUMN status SET DEFAULT 'todo'::public.task_status;
EXCEPTION
    WHEN undefined_column THEN
        -- This can happen on subsequent runs if the column type is already correct.
        -- We can safely ignore it.
        RAISE NOTICE 'Column status is already of type task_status or does not exist.';
    WHEN wrong_object_type THEN
        -- This can also happen if the type is already correct
        RAISE NOTICE 'Column status is already of type task_status.';
END $$;


-- 3. Add indexes for performance, as suggested in the technical guide.
CREATE INDEX IF NOT EXISTS idx_tasks_team_id_status ON public.tasks(team_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_memberships_team_user ON public.team_memberships(team_id, user_id);

-- 4. Create a helper function to check team membership securely.
-- Using SECURITY DEFINER to bypass RLS and avoid recursion.
CREATE OR REPLACE FUNCTION public.is_team_member(p_team_id uuid, p_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships
    WHERE team_id = p_team_id AND user_id = p_user_id
  );
$$;

-- 5. Enable Row Level Security on all related tables.
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- 6. Define RLS Policies for data isolation.

-- Policies for 'teams' table
DROP POLICY IF EXISTS "Team members can view their team" ON public.teams;
CREATE POLICY "Team members can view their team" ON public.teams
  FOR SELECT USING (public.is_team_member(id, auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can create teams" ON public.teams;
CREATE POLICY "Authenticated users can create teams" ON public.teams
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
DROP POLICY IF EXISTS "Team creator can update team" ON public.teams;
CREATE POLICY "Team creator can update team" ON public.teams
  FOR UPDATE USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());


-- Policies for 'team_memberships' table
DROP POLICY IF EXISTS "Team members can view memberships" ON public.team_memberships;
CREATE POLICY "Team members can view memberships" ON public.team_memberships
  FOR SELECT USING (public.is_team_member(team_id, auth.uid()));

DROP POLICY IF EXISTS "Team members can add new members" ON public.team_memberships;
CREATE POLICY "Team members can add new members" ON public.team_memberships
  FOR INSERT WITH CHECK (public.is_team_member(team_id, auth.uid()));

DROP POLICY IF EXISTS "Users can leave their team" ON public.team_memberships;
CREATE POLICY "Users can leave their team" ON public.team_memberships
  FOR DELETE USING (user_id = auth.uid());


-- Policies for 'tasks' table
DROP POLICY IF EXISTS "Team members can view tasks" ON public.tasks;
CREATE POLICY "Team members can view tasks" ON public.tasks
  FOR SELECT USING (public.is_team_member(team_id, auth.uid()));

DROP POLICY IF EXISTS "Team members can create tasks" ON public.tasks;
CREATE POLICY "Team members can create tasks" ON public.tasks
  FOR INSERT WITH CHECK (public.is_team_member(team_id, auth.uid()));

DROP POLICY IF EXISTS "Team members can update tasks" ON public.tasks;
CREATE POLICY "Team members can update tasks" ON public.tasks
  FOR UPDATE USING (public.is_team_member(team_id, auth.uid())) WITH CHECK (public.is_team_member(team_id, auth.uid()));
  
DROP POLICY IF EXISTS "Team members can delete tasks" ON public.tasks;
CREATE POLICY "Team members can delete tasks" ON public.tasks
  FOR DELETE USING (public.is_team_member(team_id, auth.uid()));

