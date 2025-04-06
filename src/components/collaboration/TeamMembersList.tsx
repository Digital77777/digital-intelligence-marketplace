
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

interface TeamMembersListProps {
  teamMembers: TeamMember[];
}

export const TeamMembersList: React.FC<TeamMembersListProps> = ({ teamMembers }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-3 py-1">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-1 ring-white ${
                  member.online ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              </div>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {member.online ? 'Online' : 'Offline'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
