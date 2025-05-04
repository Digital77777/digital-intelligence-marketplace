
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { fetchCourseById, getOrInitUserProgress, Course } from '@/utils/courseService';

export const useCourseData = (courseId: string | undefined) => {
  const { user } = useUser();
  const { canAccess } = useTier();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<number>(0);
  const [courseResources, setCourseResources] = useState<any[]>([]);
  
  useEffect(() => {
    if (!courseId) return;
    
    const loadCourseData = async () => {
      try {
        setLoading(true);
        
        // Fetch course by ID
        const courseData = await fetchCourseById(courseId);
        if (!courseData) {
          toast("Course not found");
          return;
        }
          
        setCourse(courseData);
        
        // Check if user can access this course based on tier
        if (courseData?.required_tier && !canAccess(courseData.required_tier)) {
          toast(`This course requires ${courseData.required_tier} tier access`);
          return;
        }
        
        // Fetch user's progress if logged in
        if (user) {
          const progress = await getOrInitUserProgress(user.id, courseData.id);
          if (progress) {
            setUserProgress(progress.completion_percent || 0);
          }
        }
        
        // Here we would fetch course resources
        // For now, using sample data
        setCourseResources([
          {
            id: '1',
            title: 'Course Syllabus',
            description: 'Complete course outline and learning objectives',
            type: 'pdf',
            url: '#'
          },
          {
            id: '2',
            title: 'Project Repository',
            description: 'Access the GitHub repository with sample code',
            type: 'code',
            url: 'https://github.com/example/course-repo'
          }
        ]);
        
      } catch (err: any) {
        console.error('Error loading course:', err);
        toast('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseData();
  }, [courseId, user, canAccess]);

  return {
    course,
    loading,
    userProgress,
    setUserProgress,
    courseResources
  };
};
