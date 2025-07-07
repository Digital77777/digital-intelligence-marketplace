
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar } from 'lucide-react';
import { Team } from './types';

interface TeamCardProps {
  team: Team;
  memberCount?: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, memberCount = 0 }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold truncate">{team.name}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {memberCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {team.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{team.description}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          Created {formatDate(team.created_at)}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
