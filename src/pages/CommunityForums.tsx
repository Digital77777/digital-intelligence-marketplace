
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useTier } from '@/context/TierContext';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  required_tier: string;
  created_at: string;
}

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

const CommunityForums = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topicsByCategory, setTopicsByCategory] = useState<{[key: string]: ForumTopic[]}>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(category => {
        fetchTopicsByCategory(category.id);
      });
    }
  }, [categories]);
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setCategories(data || []);
      if (data && data.length > 0) {
        setSelectedCategory(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchTopicsByCategory = async (categoryId: string) => {
    try {
      // First get the topics
      const { data: topics, error } = await supabase
        .from('forum_topics')
        .select('*')
        .eq('category_id', categoryId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      if (!topics) return;
      
      // Get the reply counts
      const topicsWithCounts = await Promise.all(
        topics.map(async (topic) => {
          // Get reply count
          const { count: replyCount, error: replyError } = await supabase
            .from('forum_replies')
            .select('*', { count: 'exact', head: true })
            .eq('topic_id', topic.id);
            
          if (replyError) throw replyError;
          
          // Get author username
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', topic.user_id)
            .single();
            
          if (userError && userError.code !== 'PGRST116') throw userError;
          
          return {
            ...topic,
            reply_count: replyCount || 0,
            author_username: userData?.username || 'Anonymous'
          };
        })
      );
      
      setTopicsByCategory(prev => ({
        ...prev,
        [categoryId]: topicsWithCounts
      }));
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };
  
  const handleCreateTopic = (categoryId: string) => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to create a new topic",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    const category = categories.find(c => c.id === categoryId);
    if (category && !canAccess(category.required_tier)) {
      toast.error("Access restricted", {
        description: `This forum requires ${category.required_tier} tier access`,
        action: {
          label: "Upgrade",
          onClick: () => navigate('/pricing')
        }
      });
      return;
    }
    
    navigate(`/community/new-topic/${categoryId}`);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
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
  
  const filteredCategories = searchQuery.trim() !== '' 
    ? categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : categories;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community Forums</h1>
              <p className="text-muted-foreground mt-1">
                Join the conversation with other AI enthusiasts
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search forums..." 
                  className="w-full md:w-64 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {filteredCategories.map((category) => {
              const canAccessCategory = canAccess(category.required_tier);
              const topics = topicsByCategory[category.id] || [];
              
              return (
                <Card key={category.id} className={`overflow-hidden ${!canAccessCategory ? 'opacity-80' : ''}`}>
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
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForums;
