
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for forum data
export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  required_tier: string;
  created_at: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  replies?: number;
  username?: string;
  avatar_url?: string;
}

export interface ForumGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  tier_required: string;
  is_private: boolean;
  created_at: string;
  member_count: number;
  created_by: string;
}

interface TopicsByCategory {
  [categoryId: string]: ForumTopic[];
}

export const useForumData = () => {
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  const [topicsByCategory, setTopicsByCategory] = useState<TopicsByCategory>({});
  const [topicsLoading, setTopicsLoading] = useState(true);
  
  const [forumGroups, setForumGroups] = useState<ForumGroup[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  
  // Combined loading state
  const isLoading = categoriesLoading || topicsLoading;
  
  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };
  
  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('forum_categories')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load forum categories');
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch Topics for each category
  useEffect(() => {
    const fetchTopics = async () => {
      if (categories.length === 0) return;
      
      try {
        setTopicsLoading(true);
        const result: TopicsByCategory = {};
        
        for (const category of categories) {
          const { data, error } = await supabase
            .from('forum_topics')
            .select(`
              *,
              profiles:user_id (username, avatar_url),
              replies:forum_replies (count)
            `)
            .eq('category_id', category.id)
            .order('created_at', { ascending: false })
            .limit(5);
          
          if (error) {
            throw error;
          }
          
          if (data) {
            // Transform data to include reply count and user info
            const transformedTopics = data.map(topic => {
              // TypeScript fix: Check if profiles exists and has the expected properties
              const username = topic.profiles && 'username' in topic.profiles 
                ? topic.profiles.username as string 
                : 'Anonymous';
                
              const avatarUrl = topic.profiles && 'avatar_url' in topic.profiles 
                ? topic.profiles.avatar_url as string | null 
                : null;
                
              return {
                ...topic,
                replies: topic.replies?.[0]?.count || 0,
                username: username,
                avatar_url: avatarUrl
              };
            });
            
            result[category.id] = transformedTopics;
          }
        }
        
        setTopicsByCategory(result);
      } catch (error) {
        console.error('Error fetching topics:', error);
        toast.error('Failed to load forum topics');
      } finally {
        setTopicsLoading(false);
      }
    };
    
    fetchTopics();
  }, [categories]);
  
  // Fetch Forum Groups
  useEffect(() => {
    const fetchForumGroups = async () => {
      try {
        setGroupsLoading(true);
        
        // Check if the edge function exists and use it
        let data;
        let error;
        
        try {
          // First try the direct table approach
          const response = await supabase
            .from('forum_groups')
            .select('*')
            .order('created_at', { ascending: false });
            
          data = response.data;
          error = response.error;
        } catch (err) {
          console.error('Error accessing forum_groups table directly:', err);
          // If direct access fails, we'll log the error but continue
          // We'll return an empty array later if both methods fail
        }
        
        if (error) {
          console.error('Error fetching forum groups:', error);
          toast.error('Failed to load community groups');
          setForumGroups([]);
        } else if (data) {
          setForumGroups(data);
        } else {
          setForumGroups([]);
        }
      } catch (error) {
        console.error('Error in fetchForumGroups:', error);
        toast.error('Failed to load community groups');
        setForumGroups([]);
      } finally {
        setGroupsLoading(false);
      }
    };
    
    fetchForumGroups();
  }, []);
  
  return {
    categories,
    topicsByCategory,
    forumGroups,
    categoriesLoading,
    topicsLoading,
    groupsLoading,
    isLoading,
    formatDate
  };
};
