
import { useQuery } from '@tanstack/react-query';
import { fetchMoodleCourses, MoodleCourse } from '@/utils/moodleApiService';

export const useMoodleCourses = () => {
  const { 
    data: courses, 
    isLoading, 
    error 
  } = useQuery<MoodleCourse[]>({
    queryKey: ['moodleCourses'],
    queryFn: fetchMoodleCourses,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { courses, isLoading, error };
};
