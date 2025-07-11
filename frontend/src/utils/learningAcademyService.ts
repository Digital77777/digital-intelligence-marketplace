
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

// Mock data for learning academy courses
const mockLearningAcademyCourses: LearningAcademyCourse[] = [
  {
    id: '1',
    title: 'Introduction to AI',
    description: 'Learn the basics of artificial intelligence and its applications in today\'s world.',
    category: 'AI Fundamentals',
    difficulty: 'beginner',
    duration: 60,
    prerequisites: null,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    instructor_id: '1',
    is_featured: true,
    certification_available: true,
    tool_categories: ['AI', 'machine learning']
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Understand core machine learning concepts, algorithms, and implementation strategies.',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    duration: 120,
    prerequisites: ['Introduction to AI'],
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    instructor_id: '2',
    is_featured: true,
    certification_available: true,
    tool_categories: ['machine learning', 'algorithms']
  },
  {
    id: '3',
    title: 'Advanced AI Solutions',
    description: 'Learn to build and deploy advanced AI systems for complex real-world problems.',
    category: 'Advanced AI',
    difficulty: 'advanced',
    duration: 180,
    prerequisites: ['Machine Learning Fundamentals'],
    image_url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1470&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    instructor_id: '3',
    is_featured: false,
    certification_available: true,
    tool_categories: ['deep learning', 'neural networks']
  },
  {
    id: '4',
    title: 'Prompt Engineering Masterclass',
    description: 'Master the art and science of crafting effective prompts for AI models to get optimal results.',
    category: 'AI Applications',
    difficulty: 'intermediate',
    duration: 90,
    prerequisites: null,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    instructor_id: '4',
    is_featured: true,
    certification_available: true,
    tool_categories: ['prompt engineering', 'generative AI']
  }
];

// Fetch all courses from the learning academy - using mock data
export const fetchLearningAcademyCourses = async (): Promise<LearningAcademyCourse[]> => {
  // Try to fetch from database first, fallback to mock data
  try {
    const { data, error } = await supabase
      .from('learning_academy')
      .select('*')
      .order('created_at', { ascending: false });

    if (error && error.code === '42P01') {
      // Table doesn't exist, use mock data
      console.log("Using mock data for learning academy courses");
      return mockLearningAcademyCourses;
    }

    if (error) {
      console.error("Error fetching learning academy courses:", error);
      throw error;
    }

    return data as unknown as LearningAcademyCourse[] || mockLearningAcademyCourses;
  } catch (error) {
    console.log("Falling back to mock data for learning academy courses");
    return mockLearningAcademyCourses;
  }
};

// Fetch courses by tool category
export const fetchCoursesByToolCategory = async (category: string): Promise<LearningAcademyCourse[]> => {
  try {
    const { data, error } = await supabase
      .from('learning_academy')
      .select('*')
      .contains('tool_categories', [category])
      .order('created_at', { ascending: false });

    if (error && error.code === '42P01') {
      // Table doesn't exist, use mock data
      return mockLearningAcademyCourses.filter(course => 
        course.tool_categories?.includes(category)
      );
    }

    if (error) {
      console.error(`Error fetching courses for tool category ${category}:`, error);
      throw error;
    }

    return data as unknown as LearningAcademyCourse[] || [];
  } catch (error) {
    return mockLearningAcademyCourses.filter(course => 
      course.tool_categories?.includes(category)
    );
  }
};

// Fetch a single course by ID
export const fetchCourseById = async (courseId: string): Promise<LearningAcademyCourse> => {
  try {
    const { data, error } = await supabase
      .from('learning_academy')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error && error.code === '42P01') {
      // Table doesn't exist, use mock data
      const course = mockLearningAcademyCourses.find(c => c.id === courseId);
      if (!course) throw new Error('Course not found');
      return course;
    }

    if (error) {
      console.error(`Error fetching course with ID ${courseId}:`, error);
      throw error;
    }

    return data as unknown as LearningAcademyCourse;
  } catch (error) {
    const course = mockLearningAcademyCourses.find(c => c.id === courseId);
    if (!course) throw new Error('Course not found');
    return course;
  }
};

// Fetch user progress for all courses
export const fetchUserProgress = async (userId: string): Promise<Record<string, UserProgress>> => {
  try {
    const { data, error } = await supabase
      .from('learning_academy_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching user progress:", error);
      return {};
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
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {};
  }
};

// Update user progress for a course
export const updateUserProgress = async (
  userId: string, 
  courseId: string, 
  progress: Partial<UserProgress>
): Promise<void> => {
  try {
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
  } catch (error) {
    console.error("Error updating user progress:", error);
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
