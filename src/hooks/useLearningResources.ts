

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

      // New courses and learning paths data
      const newCourses = [
        { id: '1', title: 'Introduction to Artificial Intelligence', description: 'A comprehensive introduction to the field of AI.', category: 'AI Fundamentals', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '2', title: 'History & Ethics of AI', description: 'Explore the historical development and ethical considerations of AI.', category: 'AI Fundamentals', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '3', title: 'How AI Impacts Our Daily Lives', description: 'Understand the impact of AI on various aspects of daily life.', category: 'AI Fundamentals', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '4', title: 'Understanding Chatbots & Virtual Assistants', description: 'Learn about the technology and applications of chatbots and virtual assistants.', category: 'AI Applications', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '5', title: 'Basic Prompt Writing for AI Tools', description: 'Master the basics of writing effective prompts for AI tools.', category: 'AI Applications', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '6', title: 'Exploring AI in Social Media', description: 'Discover how AI is used in social media platforms.', category: 'AI Applications', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '7', title: 'What is Machine Learning? (non-technical overview)', description: 'A non-technical overview of machine learning concepts.', category: 'Machine Learning', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '8', title: 'Intro to No-Code AI Platforms', description: 'Get introduced to no-code AI platforms and their capabilities.', category: 'No-Code AI', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '9', title: 'Using AI for Research & Writing', description: 'Learn how to use AI tools for research and writing tasks.', category: 'AI Applications', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '10', title: 'AI for Students & Everyday Users', description: 'Explore AI applications for students and everyday users.', category: 'AI Applications', difficulty: 'beginner', required_tier: 'freemium' },
        { id: '11', title: 'Intermediate Prompt Engineering', description: 'Learn intermediate prompt engineering techniques.', category: 'AI Applications', difficulty: 'intermediate', required_tier: 'basic' },
        { id: '12', title: 'Creating with AI Art & Image Generators', description: 'Create stunning visuals with AI art and image generators.', category: 'AI Applications', difficulty: 'intermediate', required_tier: 'basic' },
        { id: '13', title: 'Using AI for Content Creation & Marketing', description: 'Leverage AI for content creation and marketing strategies.', category: 'AI Applications', difficulty: 'intermediate', required_tier: 'basic' },
        { id: '14', title: 'Intro to Natural Language Processing (NLP)', description: 'An introduction to the concepts and applications of NLP.', category: 'Natural Language Processing', difficulty: 'intermediate', required_tier: 'basic', modules: [{ title: 'Sentiment Analysis with Hugging Face Transformers', content: `
          // Placeholder code for sentiment analysis using Hugging Face Transformers API
          // In a real-world scenario, this code would fetch data from the Hugging Face API
          // and perform sentiment analysis on the given text.
          const text = "This is a great movie!";
          const sentiment = "Positive";
          console.log(\`Sentiment analysis for text: \${text} is \${sentiment}\`);
        ` }] },
        { id: '15', title: 'Designing AI Chatbots without Coding', description: 'Design and build AI chatbots without coding.', category: 'No-Code AI', difficulty: 'intermediate', required_tier: 'basic' },
      ];

      const newLearningPaths = [
        { id: '1', title: 'AI Awareness for Everyone', description: 'A path to understand the basics of AI.', required_tier: 'freemium', courses: ['1', '2', '3'] },
        { id: '2', title: 'Get Productive with AI Tools', description: 'A path to get productive with AI tools.', required_tier: 'freemium', courses: ['9', '4', '6'] },
        { id: '3', title: 'First Steps in Building with AI', description: 'A path to take the first steps in building with AI.', required_tier: 'freemium', courses: ['7', '8', '5'] },
      ];

      const populatedPaths = paths.map(path => ({
        ...path,
        courses: path.courses
          .map(courseId => courses.find(c => c.id === courseId))
          .filter((c): c is Course => !!c)
      }));

      return { courses: [...courses, ...newCourses], learningPaths: [...populatedPaths, ...newLearningPaths], certifications: certs, liveEvents: events, userProgress };
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
