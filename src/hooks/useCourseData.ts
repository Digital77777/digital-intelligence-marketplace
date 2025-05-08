
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  fetchCourseById, 
  getOrInitUserProgress, 
  updateUserProgress,
  Course
} from '@/utils/courseService';

export interface CourseResource {
  id: string;
  title: string;
  description?: string;
  type: 'pdf' | 'link' | 'video' | 'code' | 'download';
  url: string;
}

/**
 * Custom hook to fetch and manage course data and user progress
 */
export const useCourseData = (courseId: string | undefined) => {
  const { user } = useUser();
  const { canAccess } = useTier();
  
  const [userProgress, setUserProgress] = useState<number>(0);
  const [courseResources, setCourseResources] = useState<CourseResource[]>([]);
  
  // Fetch course data
  const { 
    data: course,
    isLoading: courseLoading,
    error: courseError
  } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => courseId ? fetchCourseById(courseId) : null,
    enabled: !!courseId
  });
  
  // Fetch user progress if user is logged in
  const { 
    data: progress,
    isLoading: progressLoading,
  } = useQuery({
    queryKey: ['course-progress', courseId, user?.id],
    queryFn: async () => {
      if (!user?.id || !courseId || !course) return null;
      return await getOrInitUserProgress(user.id, parseInt(courseId, 10));
    },
    enabled: !!user?.id && !!courseId && !!course
  });
  
  // Update progress when data is loaded
  useEffect(() => {
    if (progress) {
      setUserProgress(progress.completion_percent || 0);
    }
  }, [progress]);
  
  // Update progress mutation
  const { mutate: updateProgress, isPending: isUpdating } = useMutation({
    mutationFn: async (newProgress: number) => {
      if (!user?.id || !courseId || !course) return false;
      return await updateUserProgress(user.id, parseInt(courseId, 10), newProgress);
    },
    onSuccess: (success, newProgress) => {
      if (success) {
        setUserProgress(newProgress);
        if (newProgress === 100) {
          toast.success("Congratulations! You've completed this course.");
        }
      } else {
        toast.error("Failed to update progress");
      }
    },
    onError: () => {
      toast.error("Error updating progress");
    }
  });
  
  // Check course access based on tier
  const checkCourseAccess = useCallback(() => {
    if (!course) return true; // No course to check yet
    if (course.required_tier && !canAccess(course.required_tier)) {
      toast.error(`This course requires ${course.required_tier} tier access`);
      return false;
    }
    return true;
  }, [course, canAccess]);
  
  // Generate course resources based on course data
  useEffect(() => {
    if (!course) return;
    
    // Generate resources based on course data
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
  
  // Check access when course data is loaded
  useEffect(() => {
    if (course && !courseLoading) {
      checkCourseAccess();
    }
  }, [course, courseLoading, checkCourseAccess]);
  
  const handleUpdateProgress = (progress: number) => {
    if (isUpdating) return;
    updateProgress(progress);
  };
  
  return {
    course,
    loading: courseLoading || progressLoading,
    isUpdating,
    error: courseError,
    userProgress,
    setUserProgress: handleUpdateProgress,
    courseResources,
    hasAccess: checkCourseAccess()
  };
};
