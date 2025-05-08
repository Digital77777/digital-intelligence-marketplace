
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

export interface LearningAcademyCourse {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  duration: number;
  prerequisites: string[] | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  instructor_id: string | null;
  is_featured: boolean | null;
  certification_available: boolean | null;
  tool_categories?: string[] | null;
}

export interface UserProgress {
  course_id: string;
  completion_percent: number;
  last_accessed: string | null;
  completed: boolean;
}

// Fetch all courses from the learning academy
export const fetchLearningAcademyCourses = async (): Promise<LearningAcademyCourse[]> => {
  const { data, error } = await supabase
    .from('learning_academy')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching learning academy courses:", error);
    throw error;
  }

  return data as unknown as LearningAcademyCourse[] || [];
};

// Fetch courses by tool category
export const fetchCoursesByToolCategory = async (category: string): Promise<LearningAcademyCourse[]> => {
  const { data, error } = await supabase
    .from('learning_academy')
    .select('*')
    .contains('tool_categories', [category])
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching courses for tool category ${category}:`, error);
    throw error;
  }

  return data as unknown as LearningAcademyCourse[] || [];
};

// Fetch a single course by ID
export const fetchCourseById = async (courseId: string): Promise<LearningAcademyCourse> => {
  const { data, error } = await supabase
    .from('learning_academy')
    .select('*')
    .eq('id', courseId)
    .single();

  if (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    throw error;
  }

  return data as unknown as LearningAcademyCourse;
};

// Fetch user progress for all courses
export const fetchUserProgress = async (userId: string): Promise<Record<string, UserProgress>> => {
  const { data, error } = await supabase
    .from('learning_academy_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }

  // Convert to a map of courseId -> progress
  const progressMap: Record<string, UserProgress> = {};
  (data || []).forEach((progress: any) => {
    progressMap[progress.course_id] = {
      course_id: progress.course_id,
      completion_percent: progress.completion_percent || 0,
      last_accessed: progress.last_accessed,
      completed: progress.completed || false
    };
  });

  return progressMap;
};

// Update user progress for a course
export const updateUserProgress = async (
  userId: string, 
  courseId: string, 
  progress: Partial<UserProgress>
): Promise<void> => {
  const { error } = await supabase
    .from('learning_academy_progress')
    .upsert({
      user_id: userId,
      course_id: courseId,
      completion_percent: progress.completion_percent,
      last_accessed: new Date().toISOString(),
      completed: progress.completed
    }, {
      onConflict: 'user_id,course_id'
    });

  if (error) {
    console.error("Error updating user progress:", error);
    throw error;
  }
};

// Custom hook to fetch courses with React Query
export const useLearningAcademyCourses = () => {
  return useQuery({
    queryKey: ['learning-academy-courses'],
    queryFn: fetchLearningAcademyCourses
  });
};

// Custom hook to fetch courses by tool category
export const useCoursesByToolCategory = (category: string) => {
  return useQuery({
    queryKey: ['courses-by-tool-category', category],
    queryFn: () => fetchCoursesByToolCategory(category),
    enabled: !!category
  });
};

// Custom hook to fetch user progress with React Query
export const useUserCourseProgress = () => {
  const { user } = useUser();
  
  return useQuery({
    queryKey: ['user-course-progress', user?.id],
    queryFn: () => user ? fetchUserProgress(user.id) : Promise.resolve({}),
    enabled: !!user
  });
};
