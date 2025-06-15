

import { useMemo } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Course, LearningPath, Certification, LiveEvent, LearningProgress } from '@/types/learning';

interface UseLearningResourcesProps {
  categoryFilter?: string;
  difficultyFilter?: string;
  searchQuery?: string;
  limit?: number;
}

interface UseLearningResourcesResult {
  courses: Course[];
  liveEvents: LiveEvent[];
  certifications: Certification[];
  learningPaths: LearningPath[];
  isLoading: boolean;
  error: Error | null;
  userProgress: Record<string, number>;
  completedCourses: Set<string>;
  markCourseComplete: (courseId: string) => Promise<void>;
  totalCount: number;
}

export const useLearningResources = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
  limit = 12
}: UseLearningResourcesProps = {}): UseLearningResourcesResult => {
  const { user } = useUser();
  const { currentTier } = useTier();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['learning-hub-resources'],
    queryFn: async () => {
      const { data: courses, error: coursesError } = await supabase.from('learning_courses').select('*');
      if (coursesError) throw new Error(coursesError.message);
      
      const { data: paths, error: pathsError } = await supabase.from('learning_paths').select('*');
      if (pathsError) throw new Error(pathsError.message);

      const { data: certs, error: certsError } = await supabase.from('certifications').select('*');
      if (certsError) throw new Error(certsError.message);

      const { data: events, error: eventsError } = await supabase.from('live_events').select('*');
      if (eventsError) throw new Error(eventsError.message);

      let userProgress: LearningProgress[] = [];
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('learning_progress')
          .select('*')
          .eq('user_id', user.id);
        if (progressError) console.error("Error fetching user progress:", progressError);
        else userProgress = progressData || [];
      }

      const populatedPaths = paths.map(path => ({
        ...path,
        courses: path.courses
          .map(courseId => courses.find(c => c.id === courseId))
          .filter((c): c is Course => !!c)
      }));

      return { courses, learningPaths: populatedPaths, certifications: certs, liveEvents: events, userProgress };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { courses: allCourses = [], learningPaths = [], certifications = [], liveEvents = [], userProgress: progressData = [] } = data || {};

  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(res =>
        res.title.toLowerCase().includes(q) ||
        (res.description && res.description.toLowerCase().includes(q))
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(res => res.category === categoryFilter);
    }

    if (difficultyFilter) {
      filtered = filtered.filter(res => res.difficulty === difficultyFilter);
    }
    
    if (currentTier === "freemium") {
      filtered = filtered.filter(c => c.required_tier === "freemium");
    } else if (currentTier === "basic") {
      filtered = filtered.filter(c => c.required_tier === "freemium" || c.required_tier === "basic");
    }

    return filtered;
  }, [allCourses, searchQuery, categoryFilter, difficultyFilter, currentTier]);
  
  const userProgress = useMemo(() => {
    return (progressData || []).reduce((acc, p) => {
      acc[p.course_id] = p.completion_percent;
      return acc;
    }, {} as Record<string, number>);
  }, [progressData]);

  const completedCourses = useMemo(() => {
    return new Set((progressData || []).filter(p => p.completed).map(p => p.course_id));
  }, [progressData]);
  
  const markCompleteMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) {
        toast.error("Please sign in to track your progress");
        throw new Error("User not signed in");
      }
      const { error } = await supabase.from('learning_progress').upsert(
        {
          user_id: user.id,
          course_id: courseId,
          completion_percent: 100,
          completed: true,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'user_id,course_id' }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course marked as completed!");
      queryClient.invalidateQueries({ queryKey: ['learning-hub-resources'] });
    },
    onError: (err: Error) => {
      console.error("Error marking course complete:", err);
      toast.error("Failed to update progress: " + err.message);
    }
  });

  const markCourseComplete = async (courseId: string) => {
    await markCompleteMutation.mutateAsync(courseId);
  };
  
  return {
    courses: filteredCourses.slice(0, limit),
    liveEvents,
    certifications,
    learningPaths,
    isLoading,
    error: error as Error | null,
    userProgress,
    completedCourses,
    markCourseComplete,
    totalCount: filteredCourses.length,
  };
};
