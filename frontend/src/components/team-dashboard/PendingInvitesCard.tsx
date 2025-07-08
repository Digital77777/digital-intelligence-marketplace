
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTeamInvites } from './hooks/useTeamInvites';

const PendingInvitesCard: React.FC = () => {
  const { invites, loading, handleInviteAction } = useTeamInvites();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
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
              <div className="text-xs text-gray-500">
                Invited on {new Date(invite.created_at).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-400 capitalize">{invite.status}</div>
            </div>
            {invite.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => handleInviteAction(invite, true)}
                >
                  Accept
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleInviteAction(invite, false)}
                >
                  Decline
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingInvitesCard;
