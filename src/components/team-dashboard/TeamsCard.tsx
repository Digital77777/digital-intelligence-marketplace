
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from 'lucide-react';
import { Team } from './types';

interface TeamsCardProps {
  teams: Team[];
}

const TeamsCard: React.FC<TeamsCardProps> = ({ teams }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Teams</CardTitle>
        <CardDescription>Teams you're a member of</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team: Team) => (
            <div key={team.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-gray-600">{team.description}</p>
                </div>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamsCard;
