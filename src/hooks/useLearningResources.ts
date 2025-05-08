
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { LearningContent, UserProgress } from '@/types/learning';

interface UseLearningResourcesProps {
  categoryFilter?: string;
  difficultyFilter?: string;
  searchQuery?: string;
  limit?: number;
}

interface UseLearningResourcesResult {
  resources: LearningContent[];
  isLoading: boolean;
  error: Error | null;
  userProgress: Record<string, number>;
  completedResources: Set<string>;
  markResourceComplete: (resourceId: string) => Promise<void>;
  totalCount: number;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
}

export const useLearningResources = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
  limit = 12
}: UseLearningResourcesProps = {}): UseLearningResourcesResult => {
  const [resources, setResources] = useState<LearningContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  const { user } = useUser();
  const { currentTier } = useTier();
  
  // Fetch resources based on filters
  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setOffset(0);
      
      try {
        // Build the query
        let query = supabase
          .from('learning_content')
          .select('*', { count: 'exact' });
        
        // Apply filters if available
        if (categoryFilter) {
          query = query.eq('category', categoryFilter);
        }
        
        if (difficultyFilter) {
          query = query.eq('difficulty', difficultyFilter);
        }
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
        }
        
        // Tier filtering - only show resources available to the current tier
        if (currentTier === 'freemium') {
          query = query.eq('required_tier', 'freemium');
        } else if (currentTier === 'basic') {
          query = query.in('required_tier', ['freemium', 'basic']);
        }
        
        // Pagination
        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(0, limit - 1);
        
        if (error) throw error;
        
        setResources(data as unknown as LearningContent[]);
        setTotalCount(count || 0);
        setHasMore((count || 0) > limit);
        
      } catch (err: any) {
        console.error("Error fetching learning resources:", err);
        setError(err);
        toast.error("Failed to load learning resources");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
    fetchUserProgress();
    
  }, [categoryFilter, difficultyFilter, searchQuery, currentTier, limit]);
  
  // Fetch user progress
  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const progressMap: Record<string, number> = {};
      const completedSet = new Set<string>();
      
      (data || []).forEach((item: any) => {
        progressMap[item.content_id] = item.progress_percent || 0;
        
        if (item.progress_percent === 100) {
          completedSet.add(item.content_id);
        }
      });
      
      setUserProgress(progressMap);
      setCompletedResources(completedSet);
      
    } catch (err) {
      console.error("Error fetching user progress:", err);
    }
  };
  
  // Mark a resource as complete
  const markResourceComplete = async (resourceId: string) => {
    if (!user) {
      toast("Please sign in to track your progress");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('learning_progress')
        .upsert({
          user_id: user.id,
          content_id: resourceId,
          progress_percent: 100,
          last_accessed: new Date().toISOString()
        });
      
      if (error) throw error;
      
      // Update local state
      setUserProgress(prev => ({
        ...prev,
        [resourceId]: 100
      }));
      
      setCompletedResources(prev => new Set(prev).add(resourceId));
      
      toast.success("Progress updated");
      
    } catch (err) {
      console.error("Error updating progress:", err);
      toast.error("Failed to update progress");
    }
  };
  
  // Fetch more resources
  const fetchMore = async () => {
    if (!hasMore || isLoading) return;
    
    const newOffset = offset + limit;
    setIsLoading(true);
    
    try {
      // Build the query
      let query = supabase
        .from('learning_content')
        .select('*');
      
      // Apply filters if available
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }
      
      if (difficultyFilter) {
        query = query.eq('difficulty', difficultyFilter);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }
      
      // Tier filtering - only show resources available to the current tier
      if (currentTier === 'freemium') {
        query = query.eq('required_tier', 'freemium');
      } else if (currentTier === 'basic') {
        query = query.in('required_tier', ['freemium', 'basic']);
      }
      
      // Pagination
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(newOffset, newOffset + limit - 1);
      
      if (error) throw error;
      
      setResources(prev => [...prev, ...(data as unknown as LearningContent[])]);
      setOffset(newOffset);
      setHasMore(data.length === limit);
      
    } catch (err: any) {
      console.error("Error fetching more learning resources:", err);
      toast.error("Failed to load more resources");
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    resources,
    isLoading,
    error,
    userProgress,
    completedResources,
    markResourceComplete,
    totalCount,
    fetchMore,
    hasMore
  };
};
