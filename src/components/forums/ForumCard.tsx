
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
  Clock, 
  ChevronRight, 
  Lock, 
  Sparkles,
  Shield,
  Plus 
} from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';

interface ForumTopic {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  reply_count?: number;
  author_username?: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  required_tier: string;
  created_at: string;
}

interface ForumCardProps {
  category: ForumCategory;
  topics: ForumTopic[];
  handleCreateTopic: (categoryId: string) => void;
  formatDate: (dateString: string) => string;
  canAccess: (tier: string) => boolean;
}

export const ForumCard: React.FC<ForumCardProps> = ({
  category,
  topics,
  handleCreateTopic,
  formatDate,
  canAccess
}) => {
  const navigate = useNavigate();
  const canAccessCategory = canAccess(category.required_tier);

  const getTierBadge = (tier: string) => {
    if (tier === 'pro') {
      return (
        <Badge variant="outline" className="bg-purple-900/60 text-purple-200 border-purple-700 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#6AC8FF]" />
          <span>PRO</span>
        </Badge>
      );
    } else if (tier === 'basic') {
      return (
        <Badge variant="outline" className="bg-blue-900/60 text-blue-200 border-blue-700 px-3 py-1 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>BASIC</span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className={`overflow-hidden ${!canAccessCategory ? 'opacity-80' : ''}`}>
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle>{category.name}</CardTitle>
              {category.required_tier !== 'freemium' && getTierBadge(category.required_tier)}
            </div>
            <CardDescription className="mt-1">{category.description}</CardDescription>
          </div>
          <Button 
            onClick={() => handleCreateTopic(category.id)}
            disabled={!canAccessCategory}
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            New Topic
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {!canAccessCategory ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <Lock className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-2">Restricted Access</h3>
            <p className="text-muted-foreground mb-4">
              This forum requires {category.required_tier} tier access.
            </p>
            <Button onClick={() => navigate('/pricing')}>
              Upgrade Now
            </Button>
          </div>
        ) : topics.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-2">No Topics Yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to start a discussion in this category.
            </p>
            <Button onClick={() => handleCreateTopic(category.id)}>
              Create Topic
            </Button>
          </div>
        ) : (
          <div className="divide-y">
            {topics.map((topic) => (
              <div key={topic.id} className="p-4 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => navigate(`/community/topic/${topic.id}`)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{topic.title}</h3>
                      {topic.is_pinned && (
                        <Badge variant="secondary" className="text-xs">Pinned</Badge>
                      )}
                      {topic.is_locked && (
                        <Badge variant="outline" className="text-xs">Locked</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{topic.author_username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.reply_count} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(topic.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {canAccessCategory && topics.length > 0 && (
        <CardFooter className="bg-muted/30 p-4 flex justify-between">
          <span className="text-sm text-muted-foreground">Showing {topics.length} topics</span>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/community/category/${category.id}`)}>
            View All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
