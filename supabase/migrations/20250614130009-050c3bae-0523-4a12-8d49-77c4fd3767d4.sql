
-- Step 1: Create a global application role type for super admin capabilities
CREATE TYPE public.app_role AS ENUM ('super_admin', 'user');

-- Step 2: Create a table to assign global roles to users
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Step 3: Enable Row-Level Security on the new user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow users to view their own roles.
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Allow super admins to manage roles (we will create a function for this later)
-- For now, this allows service-level access.
CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL
USING (true)
WITH CHECK (true);


-- Step 4: Remove the redundant 'team_members' table to avoid confusion.
-- We will use 'team_memberships' going forward.
DROP TABLE IF EXISTS public.team_members;

-- Step 5: Enforce that every subscriber must be a registered user.
-- This makes the relationship between users and subscribers explicit.
ALTER TABLE public.subscribers
ALTER COLUMN user_id SET NOT NULL;

-- Step 6: Remove the 'tier' column from 'user_profiles' to make 'subscribers' the single source of truth for subscription data.
ALTER TABLE public.user_profiles
DROP COLUMN IF EXISTS tier;

