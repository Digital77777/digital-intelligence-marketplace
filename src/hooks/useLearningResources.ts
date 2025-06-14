import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { learningContentService, Course, LiveEvent, Certification } from '@/utils/learningApiService';
import { allLearningPaths, LearningPath } from "@/data/courses";
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

interface UseLearningResourcesProps {
  categoryFilter?: string;
  difficultyFilter?: string;
  searchQuery?: string;
  limit?: number;
}

interface UseLearningResourcesResult {
  resources: Course[];
  liveEvents: LiveEvent[];
  certifications: Certification[];
  isLoading: boolean;
  error: Error | null;
  userProgress: Record<string, number>;
  completedResources: Set<string>;
  markResourceComplete: (resourceId: string) => Promise<void>;
  totalCount: number;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  learningPaths: LearningPath[];
}

interface PublicApiEntry {
  API: string;
  Description: string;
  Link: string;
  Category: string;
}

export const useLearningResources = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
  limit = 12
}: UseLearningResourcesProps = {}): UseLearningResourcesResult & {
  learningPaths: LearningPath[];
} => {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  
  const { user } = useUser();
  const { currentTier } = useTier();

  const { data: allResources, isLoading, error } = useQuery<Course[]>({
    queryKey: ['learningResourcesFromApi'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.publicapis.org/entries');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const relevantCategories = [
          'books', 
          'science & math', 
          'education', 
          'documents & productivity',
          'text analysis',
          'development'
        ];
        
        const relevantEntries = data.entries.filter((entry: PublicApiEntry) => 
          relevantCategories.includes(entry.Category.toLowerCase().replace(/ & /g, ' & ').replace(/ and /g, ' & '))
        );

        return relevantEntries.map((entry: PublicApiEntry): Course => ({
          id: uuidv4(),
          title: entry.API,
          description: entry.Description,
          category: entry.Category,
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
          duration: Math.floor(Math.random() * (180 - 30 + 1) + 30),
          instructor: 'External Provider',
          content: `This resource is provided by an external API. You can find more information at the following link: ${entry.Link}`,
          exercises: [],
          requiredTier: 'freemium',
        }));
      } catch (err) {
        console.error("Failed to fetch learning resources:", err);
        toast.error("Failed to load learning resources from API.");
        return []; // Return empty array on error
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const filteredResources = useMemo(() => {
    if (!allResources) return [];

    let filtered = [...allResources];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(res =>
        res.title.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q)
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(res => res.category === categoryFilter);
    }

    if (difficultyFilter) {
      filtered = filtered.filter(res => res.difficulty === difficultyFilter);
    }
    
    if (currentTier === "freemium") {
      filtered = filtered.filter(c => c.requiredTier === "freemium");
    } else if (currentTier === "basic") {
      filtered = filtered.filter(c => c.requiredTier === "freemium" || c.requiredTier === "basic");
    }

    return filtered;
  }, [allResources, searchQuery, categoryFilter, difficultyFilter, currentTier]);
  
  // Load user progress from localStorage
  useEffect(() => {
    if (!user) return;
    try {
      const storedProgress = localStorage.getItem(`learning_progress_${user.id}`);
      const storedCompleted = localStorage.getItem(`completed_resources_${user.id}`);
      if (storedProgress) setUserProgress(JSON.parse(storedProgress));
      if (storedCompleted) setCompletedResources(new Set(JSON.parse(storedCompleted)));
    } catch (error) {
      console.error("Error loading user progress:", error);
    }
  }, [user]);
  
  // Mark a resource as complete
  const markResourceComplete = async (resourceId: string) => {
    if (!user) {
      toast("Please sign in to track your progress");
      return;
    }
    
    try {
      // Update progress via API
      await learningContentService.updateProgress(user.id, resourceId, 100);
      
      // Update local state
      const newProgress = { ...userProgress, [resourceId]: 100 };
      const newCompleted = new Set(completedResources).add(resourceId);
      
      setUserProgress(newProgress);
      setCompletedResources(newCompleted);
      
      // Persist to localStorage
      localStorage.setItem(`learning_progress_${user.id}`, JSON.stringify(newProgress));
      localStorage.setItem(`completed_resources_${user.id}`, JSON.stringify(Array.from(newCompleted)));
      
      toast.success("Course marked as completed!");
      
    } catch (err) {
      console.error("Error marking resource complete:", err);
      toast.error("Failed to update progress");
    }
  };
  
  // Fetch more resources (placeholder for pagination)
  const fetchMore = async () => {
    // In a real implementation, this would load more data
    console.log('Fetching more resources...');
  };
  
  return {
    resources: filteredResources.slice(0, limit),
    liveEvents,
    certifications,
    isLoading,
    error,
    userProgress,
    completedResources,
    markResourceComplete,
    totalCount: filteredResources.length,
    fetchMore,
    hasMore: filteredResources.length > limit,
    learningPaths
  };
};
