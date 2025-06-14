import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { learningContentService, Course, LiveEvent, Certification } from '@/utils/learningApiService';
import { allCourses, allLearningPaths, LearningPath } from "@/data/courses";

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

export const useLearningResources = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
  limit = 12
}: UseLearningResourcesProps = {}): UseLearningResourcesResult & {
  learningPaths: LearningPath[];
} => {
  const [resources, setResources] = useState<Course[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  
  const { user } = useUser();
  const { currentTier } = useTier();
  
  // Fetch all learning content
  useEffect(() => {
    const fetchLearningContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // NEW: Filter from our allCourses & allLearningPaths imports
        let filteredCourses = allCourses;
        let filteredPaths = allLearningPaths;

        // Add your filters as needed (category, difficulty, etc.)
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filteredCourses = filteredCourses.filter(course =>
            course.title.toLowerCase().includes(q) ||
            course.description.toLowerCase().includes(q)
          );
          filteredPaths = filteredPaths.filter(path =>
            path.title.toLowerCase().includes(q) ||
            path.outcome.toLowerCase().includes(q)
          );
        }
        // Only show courses/paths for the user's tier or below
        if (currentTier === "freemium") {
          filteredCourses = filteredCourses.filter(c => c.tier === "freemium");
          filteredPaths = filteredPaths.filter(p => p.tier === "freemium");
        } else if (currentTier === "basic") {
          filteredCourses = filteredCourses.filter(c => c.tier === "freemium" || c.tier === "basic");
          filteredPaths = filteredPaths.filter(p => p.tier === "freemium" || p.tier === "basic");
        }
        // Else pro gets all

        setResources(filteredCourses.slice(0, limit));
        setTotalCount(filteredCourses.length);
        setHasMore(filteredCourses.length > limit);
        // Provide learningPaths for return value
        (setLearningPaths as any)?.(filteredPaths);

        // Load user progress from localStorage (simulating database)
        loadUserProgress();
        
      } catch (err: any) {
        console.error("Error fetching learning resources:", err);
        setError(err);
        toast.error("Failed to load learning resources");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLearningContent();
  }, [categoryFilter, difficultyFilter, searchQuery, currentTier, limit]);
  
  // Load user progress from localStorage
  const loadUserProgress = () => {
    if (!user) return;
    
    try {
      const storedProgress = localStorage.getItem(`learning_progress_${user.id}`);
      const storedCompleted = localStorage.getItem(`completed_resources_${user.id}`);
      
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      }
      
      if (storedCompleted) {
        setCompletedResources(new Set(JSON.parse(storedCompleted)));
      }
    } catch (error) {
      console.error("Error loading user progress:", error);
    }
  };
  
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
    resources,
    liveEvents,
    certifications,
    isLoading,
    error,
    userProgress,
    completedResources,
    markResourceComplete,
    totalCount,
    fetchMore,
    hasMore,
    learningPaths
  };
};
