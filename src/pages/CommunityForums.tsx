
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from '@tanstack/react-query';

// Import our components
import { ForumCard } from '@/components/forums/ForumCard';
import { ForumSearch } from '@/components/forums/ForumSearch';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  
  // Fetch categories with React Query
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['forumCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
  
  // Initialize selected category after categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);
  
  // Fetch topics by category with React Query
  const { 
    data: topicsByCategory = {}, 
    isLoading: topicsLoading 
  } = useQuery({
    queryKey: ['forumTopics', categories],
    queryFn: async () => {
      const result: Record<string, ForumTopic[]> = {};
      
      await Promise.all(
        categories.map(async (category: ForumCategory) => {
          const { data: topics, error } = await supabase
            .from('forum_topics')
            .select('*')
            .eq('category_id', category.id)
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false })
            .limit(5);
            
          if (error) throw error;
          
          if (!topics) return;
          
          const topicsWithCounts = await Promise.all(
            topics.map(async (topic) => {
              const { count: replyCount, error: replyError } = await supabase
                .from('forum_replies')
                .select('*', { count: 'exact', head: true })
                .eq('topic_id', topic.id);
                
              if (replyError) throw replyError;
              
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
          
          result[category.id] = topicsWithCounts;
        })
      );
      
      return result;
    },
    staleTime: 1000 * 60 * 1, // Cache for 1 minute
    enabled: categories.length > 0,
  });
  
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
  
  const filteredCategories = searchQuery.trim() !== '' 
    ? categories.filter((cat: ForumCategory) => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;
  
  const isLoading = categoriesLoading || topicsLoading;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 animate-fade-in">Community Forums</h1>
              <p className="text-muted-foreground mt-1">
                Join the conversation with other AI enthusiasts
              </p>
            </div>
            <ForumSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="border rounded-lg p-6 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Skeleton className="h-7 w-40 mb-2" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-9 w-32" />
                  </div>
                  <div className="mt-6">
                    {Array(3).fill(0).map((_, j) => (
                      <div key={j} className="py-3 border-b last:border-0 flex justify-between items-center">
                        <div>
                          <Skeleton className="h-5 w-56 mb-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No categories found matching your search.</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredCategories.map((category: ForumCategory) => (
                <ForumCard
                  key={category.id}
                  category={category}
                  topics={topicsByCategory[category.id] || []}
                  handleCreateTopic={handleCreateTopic}
                  formatDate={formatDate}
                  canAccess={canAccess}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityForums;
