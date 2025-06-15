
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InviteMemberDialog from './InviteMemberDialog';
import { Team } from './types';

interface TeamsManagerCardProps {
  teams: Team[];
  onTeamUpdated?: () => void;
}

const TeamsManagerCard: React.FC<TeamsManagerCardProps> = ({ teams, onTeamUpdated }) => {
  const [inviteDialogTeam, setInviteDialogTeam] = useState<Team | null>(null);

  if (!teams?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map(team => (
            <div key={team.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{team.name}</div>
                <div className="text-xs text-gray-500">{team.description}</div>
              </div>
              <div>
                <Button size="sm" onClick={() => setInviteDialogTeam(team)}>
                  Invite Member
                </Button>
              </div>
            </div>
          ))}
        </div>
        {inviteDialogTeam && (
          <InviteMemberDialog
            open={!!inviteDialogTeam}
            onOpenChange={() => setInviteDialogTeam(null)}
            teamId={inviteDialogTeam.id}
            teamName={inviteDialogTeam.name}
          />
        )}
      </CardContent>
    </Card>
  );
};
export default TeamsManagerCard;
