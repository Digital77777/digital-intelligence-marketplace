
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
  Plus,
  Globe 
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
  const { currentTier } = useTier();
  const isFreemium = currentTier === 'freemium';
  
  // All users can access discussions - but freemium users only in public mode
  const canAccessCategory = true;

  const getTierBadge = (tier: string) => {
    if (tier === 'pro') {
      return (
        <Badge className="bg-purple-900/60 text-purple-200 border-purple-700 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#00FF88]" />
          <span>PRO</span>
        </Badge>
      );
    } else if (tier === 'basic') {
      return (
        <Badge className="bg-blue-900/60 text-blue-200 border-blue-700 px-3 py-1 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>BASIC</span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700">
      <CardHeader className="bg-gray-900/50 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white">{category.name}</CardTitle>
              {category.required_tier !== 'freemium' && getTierBadge(category.required_tier)}
              {isFreemium && (
                <Badge className="bg-green-900/60 text-green-200 border-green-700 px-3 py-1 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>PUBLIC</span>
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1 text-gray-300">{category.description}</CardDescription>
          </div>
          <Button 
            onClick={() => handleCreateTopic(category.id)}
            className="gap-1 bg-[#2A5C8D] hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4" />
            New Topic
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {topics.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-10 w-10 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2 text-white">No Topics Yet</h3>
            <p className="text-gray-400 mb-4">
              Be the first to start a discussion in this category.
            </p>
            <Button onClick={() => handleCreateTopic(category.id)} className="bg-[#2A5C8D] hover:bg-blue-700 text-white">
              Create Topic
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {topics.map((topic) => (
              <div key={topic.id} className="p-4 hover:bg-gray-700/20 transition-colors cursor-pointer" onClick={() => navigate(`/community/topic/${topic.id}`)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{topic.title}</h3>
                      {topic.is_pinned && (
                        <Badge variant="secondary" className="text-xs bg-blue-900 text-blue-200">Pinned</Badge>
                      )}
                      {topic.is_locked && (
                        <Badge variant="outline" className="text-xs border-amber-700 text-amber-200">Locked</Badge>
                      )}
                      {isFreemium && (
                        <Badge variant="outline" className="bg-green-900/40 text-green-200 border-green-700 text-xs">Public</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
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
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {canAccessCategory && topics.length > 0 && (
        <CardFooter className="bg-gray-900/50 p-4 flex justify-between">
          <span className="text-sm text-gray-400">Showing {topics.length} topics</span>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/community/category/${category.id}`)} className="text-[#00FF88] hover:text-green-300 hover:bg-gray-700">
            View All
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
