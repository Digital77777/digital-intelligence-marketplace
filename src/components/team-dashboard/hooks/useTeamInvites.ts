
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PendingInvite {
  id: string;
  team_id: string;
  email: string;
  status: string;
  created_at: string;
  team?: { name: string };
}

export const useTeamInvites = () => {
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvites = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_my_team_invites');
      if (error) throw error;

      const teamIds = (data || []).map((i: any) => i.team_id);
      let teams: Record<string, { name: string }> = {};
      
      if (teamIds.length > 0) {
        const { data: teamData } = await supabase
          .from('teams')
          .select('id, name')
          .in('id', teamIds);
        
        if (teamData) {
          teamData.forEach((t: any) => (teams[t.id] = { name: t.name }));
        }
      }
      
      setInvites((data || []).map((invite: any) => ({
        ...invite,
        team: teams[invite.team_id]
      })));
    } catch (error) {
      console.error('Error fetching invites:', error);
      toast.error('Failed to load team invites');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteAction = async (invite: PendingInvite, accept: boolean) => {
    try {
      const updates: any = { 
        status: accept ? 'accepted' : 'declined',
        [accept ? 'accepted_at' : 'declined_at']: new Date().toISOString()
      };

      const { error } = await supabase
        .from('team_invites')
        .update(updates)
        .eq('id', invite.id);

      if (error) throw error;

      if (accept) {
        await supabase.from('team_memberships').insert([{ team_id: invite.team_id }]);
        toast.success('Joined team!');
      } else {
        toast.success('Invite declined.');
      }
      
      fetchInvites();
    } catch (error) {
      toast.error('Error updating invite.');
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return {
    invites,
    loading,
    refreshInvites: fetchInvites,
    handleInviteAction
  };
};
