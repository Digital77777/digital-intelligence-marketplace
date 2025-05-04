
import { supabase } from '@/integrations/supabase/client';

// Type for course data
export interface Course {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  required_tier: string;
  created_at: string;
  updated_at: string;
}

// Type for user progress
export interface UserProgress {
  id: string;
  user_id: string;
  course_id: number;
  completion_percent: number;
  last_accessed: string | null;
}

// Mock courses data for development until proper database is set up
const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'Learn the basics of artificial intelligence and its applications.',
    content: 'This is the detailed course content for Introduction to AI...',
    required_tier: 'freemium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Understand core machine learning concepts and algorithms.',
    content: 'This is the detailed course content for Machine Learning...',
    required_tier: 'basic',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Advanced AI Solutions',
    description: 'Learn to build and deploy advanced AI systems.',
    content: 'This is the detailed course content for Advanced AI...',
    required_tier: 'pro',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Fetch course by ID - mocked for now
export const fetchCourseById = async (courseId: string): Promise<Course | null> => {
  // For a proper implementation, would query the database
  // const { data, error } = await supabase.from('courses').select('*').eq('id', parseInt(courseId, 10)).single();
  
  // For now, use mock data
  const course = mockCourses.find(c => c.id === parseInt(courseId, 10));
  return course || null;
};

// Get or initialize user progress
export const getOrInitUserProgress = async (userId: string, courseId: number): Promise<UserProgress | null> => {
  if (!userId) return null;
  
  try {
    // Check if progress entry exists
    const { data: existing, error: queryError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();
      
    if (queryError) throw queryError;
    
    if (existing) {
      return existing as UserProgress;
    } else {
      // Create new progress entry
      const newProgress: Omit<UserProgress, 'id'> = {
        user_id: userId,
        course_id: courseId,
        completion_percent: 0,
        last_accessed: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('user_progress')
        .insert(newProgress)
        .select()
        .single();
        
      if (error) throw error;
      return data as UserProgress;
    }
  } catch (error) {
    console.error("Error with user progress:", error);
    return null;
  }
};

// Update user progress
export const updateUserProgress = async (
  userId: string, 
  courseId: number, 
  progress: number
): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { error } = await supabase
      .from('user_progress')
      .update({ 
        completion_percent: progress,
        last_accessed: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    return false;
  }
};
