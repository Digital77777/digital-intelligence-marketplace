import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { LearningCourse, LearningProgress } from '@/types/learning';

export interface CourseResource {
  id: string;
  title: string;
  description?: string;
  type: 'pdf' | 'link' | 'video' | 'code' | 'download';
  url: string;
}

export const useCourseData = (courseId: string | undefined) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  
  const [courseResources, setCourseResources] = useState<CourseResource[]>([]);
  
  const { 
    data: course,
    isLoading: courseLoading,
    error: courseError
  } = useQuery<LearningCourse | null>({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      const { data, error } = await supabase
        .from('learning_courses')
        .select('*')
        .eq('id', courseId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!courseId
  });
  
  const { 
    data: userProgress,
    isLoading: progressLoading,
  } = useQuery<LearningProgress | null>({
    queryKey: ['course-progress', courseId, user?.id],
    queryFn: async () => {
      if (!user?.id || !courseId) return null;
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!user?.id && !!courseId
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (newProgress: { percent: number; courseId: string }) => {
      if (!user?.id) throw new Error("User not authenticated");
      const { error } = await supabase.from('learning_progress').upsert({
        user_id: user.id,
        course_id: newProgress.courseId,
        completion_percent: newProgress.percent,
        completed: newProgress.percent === 100,
        last_accessed: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,course_id' });

      if (error) throw error;
      return newProgress.percent;
    },
    onSuccess: (newProgress) => {
      queryClient.invalidateQueries({ queryKey: ['course-progress', courseId, user?.id] });
      if (newProgress === 100) {
        toast.success("Congratulations! You've completed this course.");
      } else {
        toast.info("Progress saved.");
      }
    },
    onError: (err: Error) => {
      toast.error(`Failed to update progress: ${err.message}`);
    }
  });

  const handleUpdateProgress = (progress: number) => {
    if (!courseId) return;
    updateProgressMutation.mutate({ percent: progress, courseId });
  };
  
  useEffect(() => {
    if (!course) return;
    
    // Generate course resources based on course data
    const resources: CourseResource[] = [];
    
    // Add syllabus resource
    resources.push({
      id: `${course.id}-syllabus`,
      title: 'Course Syllabus',
      description: 'Complete course outline and learning objectives',
      type: 'pdf',
      url: '#' // In a real app, this would be a downloadable PDF
    });
    
    // Add reading materials if course has specific tags
    if (course.tags?.includes('machine learning')) {
      resources.push({
        id: `${course.id}-reading`,
        title: 'Supplementary Reading',
        description: 'Advanced concepts and research papers',
        type: 'link',
        url: 'https://arxiv.org/list/cs.LG/recent'
      });
    }
    
    // Add code repository for programming courses
    if (course.tags?.includes('programming') || course.tags?.includes('code')) {
      resources.push({
        id: `${course.id}-code`,
        title: 'Project Repository',
        description: 'Access the GitHub repository with sample code',
        type: 'code',
        url: 'https://github.com/example/course-repo'
      });
    }
    
    // Add video resources for visual topics
    if (course.tags?.includes('computer vision') || course.tags?.includes('image')) {
      resources.push({
        id: `${course.id}-video`,
        title: 'Video Tutorials',
        description: 'Step-by-step visual guides and demonstrations',
        type: 'video',
        url: 'https://youtube.com'
      });
    }
    
    setCourseResources(resources);
  }, [course]);
  
  return {
    course,
    loading: courseLoading || progressLoading,
    isUpdating: updateProgressMutation.isPending,
    error: courseError as Error | null,
    userProgress: userProgress?.completion_percent || 0,
    setUserProgress: handleUpdateProgress,
    courseResources
  };
};
