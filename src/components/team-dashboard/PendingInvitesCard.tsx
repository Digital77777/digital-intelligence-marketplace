
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

const PendingInvitesCard: React.FC = () => {
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_my_team_invites');
    if (!error) {
      // For each invite, fetch team name
      const teamIds = (data || []).map((i: any) => i.team_id);
      let teams: Record<string, { name: string }> = {};
      if (teamIds.length > 0) {
        const { data: teamData } = await supabase.from('teams').select('id, name').in('id', teamIds);
        if (teamData) {
          teamData.forEach((t: any) => (teams[t.id] = { name: t.name }));
        }
      }
      setInvites((data || []).map((invite: any) => ({
        ...invite,
        team: teams[invite.team_id]
      })));
    }
    setLoading(false);
  };

  const handleAction = async (invite: PendingInvite, accept: boolean) => {
    const updates: any = { status: accept ? 'accepted' : 'declined' };
    if (accept) updates.accepted_at = new Date().toISOString();
    else updates.declined_at = new Date().toISOString();

    const { error } = await supabase
      .from('team_invites')
      .update(updates)
      .eq('id', invite.id);

    if (error) {
      toast.error('Error updating invite.');
      return;
    }
    if (accept) {
      // Add to team_memberships
      await supabase.from('team_memberships').insert([{ team_id: invite.team_id }]);
      toast.success('Joined team!');
    } else {
      toast.success('Invite declined.');
    }
    fetchInvites();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (invites.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Pending Team Invites</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {invites.map(invite => (
          <div key={invite.id} className="flex items-center justify-between space-y-1 border-b pb-2 last:border-0 last:pb-0">
            <div>
              <div className="font-medium">{invite.team?.name || invite.team_id}</div>
              <div className="text-xs text-gray-500">Invited on {invite.created_at.slice(0, 10)}</div>
              <div className="text-xs text-gray-400">{invite.status}</div>
            </div>
            {invite.status === 'pending' && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAction(invite, true)}>Accept</Button>
                <Button size="sm" variant="outline" onClick={() => handleAction(invite, false)}>Decline</Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default PendingInvitesCard;
