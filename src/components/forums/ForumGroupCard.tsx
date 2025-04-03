
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
      toast.error(`This group requires ${group.tier_required} tier access`, {
        description: "Please upgrade your subscription to join."
      });
      return;
    }
    
    toast.success(`You've joined the ${group.name} group!`);
    // In a real implementation, we would call an API to join the group
  };
  
  const handleGroupClick = () => {
    if (!canAccess(group.tier_required)) {
      toast.error(`This group requires ${group.tier_required} tier access`, {
        description: "Please upgrade your subscription to access."
      });
      return;
    }
    
    navigate(`/community/group/${group.id}`);
  };
  
  const getTierBadge = () => {
    if (group.tier_required === 'pro') {
      return (
        <Badge variant="outline" className="bg-purple-900/60 text-purple-200 border-purple-700 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#6AC8FF]" />
          <span>PRO</span>
        </Badge>
      );
    } else if (group.tier_required === 'basic') {
      return (
        <Badge variant="outline" className="bg-blue-900/60 text-blue-200 border-blue-700 px-3 py-1 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>BASIC</span>
        </Badge>
      );
    }
    return null;
  };
  
  const canViewGroup = canAccess(group.tier_required);
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${!canViewGroup ? 'opacity-70' : ''}`}
      onClick={handleGroupClick}
    >
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle>{group.name}</CardTitle>
              {getTierBadge()}
              {group.is_private ? (
                <Badge variant="outline" className="bg-amber-900/60 text-amber-200 border-amber-700 px-3 py-1 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  <span>PRIVATE</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-green-900/60 text-green-200 border-green-700 px-3 py-1 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>PUBLIC</span>
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1">{group.description}</CardDescription>
          </div>
          <Button 
            onClick={(e) => handleJoinGroup(e, group.id)}
            variant="outline"
            className="gap-1"
            disabled={!canViewGroup}
          >
            <UserPlus className="h-4 w-4" />
            Join
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{group.member_count} members</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Category: {group.category}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Created {formatDate(group.created_at)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-4 flex justify-between">
        <span className="text-sm text-muted-foreground">
          {group.is_private ? 'Private discussions' : 'Public threads and discussions'}
        </span>
        {canViewGroup && (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </CardFooter>
    </Card>
  );
};
