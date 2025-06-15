
-- 1. Team Invites Table
CREATE TABLE public.team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- values: pending, accepted, declined, expired
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  declined_at TIMESTAMP WITH TIME ZONE
);

-- 2. Enable RLS
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;

-- 3. RLS for team_invites: Only the invitee (by email) or inviter can see/manage the invite
CREATE POLICY "Invitee or inviter can view invite" ON public.team_invites
FOR SELECT USING (
  (email = auth.jwt() ->> 'email') OR (invited_by = auth.uid())
);

CREATE POLICY "Inviter can create invites" ON public.team_invites
FOR INSERT WITH CHECK (
  invited_by = auth.uid()
);

-- Accept/decline update only by invitee
CREATE POLICY "Invitee can update invite status" ON public.team_invites
FOR UPDATE USING (
  (email = auth.jwt() ->> 'email')
);

-- 4. API helpers: function to get team invites for the logged-in user
CREATE OR REPLACE FUNCTION public.get_my_team_invites()
RETURNS TABLE(id uuid, team_id uuid, email text, status text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT id, team_id, email, status, created_at FROM public.team_invites WHERE email = (auth.jwt() ->> 'email');
$$;

-- 5. Make sure team_memberships.user_id and team_id are NOT NULL for integrity
ALTER TABLE public.team_memberships 
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN team_id SET NOT NULL;

-- 6. Make sure team_memberships doesn't have duplicates
CREATE UNIQUE INDEX IF NOT EXISTS uniq_team_user ON public.team_memberships (team_id, user_id);
