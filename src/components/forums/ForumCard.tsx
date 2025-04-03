
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
        <Badge className="bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F]/50 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#00FFFF]" />
          <span>NEO</span>
        </Badge>
      );
    } else if (tier === 'basic') {
      return (
        <Badge className="bg-[#8000FF]/20 text-[#8000FF] border-[#8000FF]/50 px-3 py-1 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>ADVANCED</span>
        </Badge>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden bg-black border-[#00FFFF]/30 hover:border-[#00FFFF]/60 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]">
      <CardHeader className="bg-gradient-to-r from-black to-[#00FFFF]/5 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white">{category.name}</CardTitle>
              {category.required_tier !== 'freemium' && getTierBadge(category.required_tier)}
              {isFreemium && (
                <Badge className="bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/50 px-3 py-1 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>PUBLIC</span>
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1 text-gray-400">{category.description}</CardDescription>
          </div>
          <Button 
            onClick={() => handleCreateTopic(category.id)}
            className="gap-1 bg-[#00FFFF] hover:bg-[#00D6D6] text-black font-bold"
          >
            <Plus className="h-4 w-4" />
            NEW
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {topics.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-10 w-10 text-[#00FFFF]/50 mb-3" />
            <h3 className="text-lg font-medium mb-2 text-white">NO DATA FOUND</h3>
            <p className="text-gray-400 mb-4">
              Be the first to initialize a discussion thread in this sector.
            </p>
            <Button onClick={() => handleCreateTopic(category.id)} className="bg-[#00FFFF] hover:bg-[#00D6D6] text-black font-bold">
              CREATE THREAD
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-[#00FFFF]/10">
            {topics.map((topic) => (
              <div key={topic.id} className="p-4 hover:bg-[#00FFFF]/5 transition-colors cursor-pointer" onClick={() => navigate(`/community/topic/${topic.id}`)}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{topic.title}</h3>
                      {topic.is_pinned && (
                        <Badge variant="secondary" className="text-xs bg-[#00FFFF]/20 text-[#00FFFF] border-[#00FFFF]/50">PINNED</Badge>
                      )}
                      {topic.is_locked && (
                        <Badge variant="outline" className="text-xs border-[#FF007F]/50 text-[#FF007F]">LOCKED</Badge>
                      )}
                      {isFreemium && (
                        <Badge variant="outline" className="bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/30 text-xs">PUBLIC</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#00FFFF]/70" />
                        <span>{topic.author_username}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-[#00FFFF]/70" />
                        <span>{topic.reply_count} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[#00FFFF]/70" />
                        <span>{formatDate(topic.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#00FFFF]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {canAccessCategory && topics.length > 0 && (
        <CardFooter className="bg-gradient-to-r from-black to-[#00FFFF]/5 p-4 flex justify-between">
          <span className="text-sm text-gray-400">Displaying {topics.length} threads</span>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/community/category/${category.id}`)} className="text-[#00FFFF] hover:text-[#4DFFFF] hover:bg-[#00FFFF]/10">
            VIEW ALL
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
