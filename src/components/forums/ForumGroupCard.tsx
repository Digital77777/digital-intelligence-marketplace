
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  ShieldCheck,
  ChevronRight, 
  Lock, 
  Sparkles,
  UserPlus,
  Globe 
} from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { ForumGroup } from '@/hooks/useForumData';

interface ForumGroupCardProps {
  group: ForumGroup;
  formatDate: (dateString: string) => string;
  canAccess: (tier: string) => boolean;
}

export const ForumGroupCard: React.FC<ForumGroupCardProps> = ({
  group,
  formatDate,
  canAccess
}) => {
  const navigate = useNavigate();
  const { currentTier } = useTier();
  
  const handleJoinGroup = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    if (!canAccess(group.tier_required)) {
      toast.error(`This node requires ${group.tier_required} tier privileges`, {
        description: "Please upgrade your network access to join."
      });
      return;
    }
    
    toast.success(`You've connected to the ${group.name} node!`);
    // In a real implementation, we would call an API to join the group
  };
  
  const handleGroupClick = () => {
    if (!canAccess(group.tier_required)) {
      toast.error(`This node requires ${group.tier_required} tier access`, {
        description: "Please upgrade your privileges to access."
      });
      return;
    }
    
    navigate(`/community/group/${group.id}`);
  };
  
  const getTierBadge = () => {
    if (group.tier_required === 'pro') {
      return (
        <Badge className="bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F]/50 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#00FFFF]" />
          <span>NEO</span>
        </Badge>
      );
    } else if (group.tier_required === 'basic') {
      return (
        <Badge className="bg-[#8000FF]/20 text-[#8000FF] border-[#8000FF]/50 px-3 py-1 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>ADVANCED</span>
        </Badge>
      );
    }
    return null;
  };
  
  const canViewGroup = canAccess(group.tier_required);
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(128,0,255,0.3)] bg-black border-[#8000FF]/30 hover:border-[#8000FF]/60 ${!canViewGroup ? 'opacity-70' : ''}`}
      onClick={handleGroupClick}
    >
      <CardHeader className="bg-gradient-to-r from-black to-[#8000FF]/5 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white">{group.name}</CardTitle>
              {getTierBadge()}
              {group.is_private ? (
                <Badge className="bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F]/50 px-3 py-1 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  <span>PRIVATE</span>
                </Badge>
              ) : (
                <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/50 px-3 py-1 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>PUBLIC</span>
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1 text-gray-400">{group.description}</CardDescription>
          </div>
          <Button 
            onClick={(e) => handleJoinGroup(e, group.id)}
            variant="outline"
            className="gap-1 bg-[#8000FF] hover:bg-[#6A00D9] text-white border-[#8000FF]/50"
            disabled={!canViewGroup}
          >
            <UserPlus className="h-4 w-4" />
            CONNECT
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-[#8000FF]/70" />
              <span>{group.member_count} nodes</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-[#8000FF]/70" />
              <span>Classification: {group.category}</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Initialized {formatDate(group.created_at)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-black to-[#8000FF]/5 p-4 flex justify-between">
        <span className="text-sm text-gray-400">
          {group.is_private ? 'Encrypted neural links' : 'Public network access'}
        </span>
        {canViewGroup && (
          <ChevronRight className="h-5 w-5 text-[#8000FF]" />
        )}
      </CardFooter>
    </Card>
  );
};
