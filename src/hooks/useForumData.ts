
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  required_tier: string;
  created_at: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_public?: boolean;
  reply_count?: number;
  author_username?: string;
}

export const useForumData = (categoryId?: string) => {
  // For categories list
  const { 
    data: categories = [], 
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories
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
  
  // For topics by category
  const { 
    data: topicsByCategory = {}, 
    isLoading: topicsLoading,
    error: topicsError,
    refetch: refetchTopics
  } = useQuery({
    queryKey: ['forumTopics', categories, categoryId],
    queryFn: async () => {
      const result: Record<string, ForumTopic[]> = {};
      
      // If categoryId is provided, only fetch topics for that category
      const categoriesToFetch = categoryId 
        ? categories.filter((cat: ForumCategory) => cat.id === categoryId)
        : categories;
      
      await Promise.all(
        categoriesToFetch.map(async (category: ForumCategory) => {
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
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Refetch all data
  const refetchAll = () => {
    refetchCategories();
    refetchTopics();
  };
  
  return {
    categories,
    topicsByCategory,
    categoriesLoading,
    topicsLoading,
    isLoading: categoriesLoading || topicsLoading,
    error: categoriesError || topicsError,
    formatDate,
    refetchAll
  };
};

export default useForumData;
