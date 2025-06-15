
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus } from 'lucide-react';
import { TeamMember } from './types';
import { supabase } from '@/integrations/supabase/client';

interface TeamMembersListProps {
  teamMembers: TeamMember[];
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({ teamMembers }) => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Track online presence using Supabase realtime
    const channel = supabase.channel('online-users');

    const presenceTrack = async () => {
      await channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
          });
        }
      });

      channel
        .on('presence', { event: 'sync' }, () => {
          const newState = channel.presenceState();
          const onlineUserIds = new Set(Object.keys(newState));
          setOnlineUsers(onlineUserIds);
        })
        .on('presence', { event: 'join' }, ({ key }) => {
          setOnlineUsers(prev => new Set([...prev, key]));
        })
        .on('presence', { event: 'leave' }, ({ key }) => {
          setOnlineUsers(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        });
    };

    presenceTrack();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'lead': return 'bg-purple-100 text-purple-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Members ({teamMembers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={member.user_profiles?.avatar_url} 
                      alt={member.user_profiles?.full_name || member.user_profiles?.username}
                    />
                    <AvatarFallback>
                      {(member.user_profiles?.full_name || member.user_profiles?.username || 'U')
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {onlineUsers.has(member.user_id) && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {member.user_profiles?.full_name || member.user_profiles?.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{member.user_profiles?.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getRoleColor(member.role)}>
                  {member.role}
                </Badge>
                {onlineUsers.has(member.user_id) && (
                  <span className="text-xs text-green-600 font-medium">Online</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembersList;
