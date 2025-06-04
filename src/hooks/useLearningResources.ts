
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { learningContentService, Course, LiveEvent, Certification } from '@/utils/learningApiService';

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
}

export const useLearningResources = ({
  categoryFilter,
  difficultyFilter,
  searchQuery = '',
  limit = 12
}: UseLearningResourcesProps = {}): UseLearningResourcesResult => {
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
  
  const { user } = useUser();
  const { currentTier } = useTier();
  
  // Fetch all learning content
  useEffect(() => {
    const fetchLearningContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch courses, events, and certifications concurrently
        const [coursesData, eventsData, certificationsData] = await Promise.all([
          learningContentService.fetchOpenSourceCourses(),
          learningContentService.fetchLiveEvents(),
          learningContentService.fetchCertifications()
        ]);
        
        // Apply filters
        let filteredCourses = coursesData;
        
        // Category filter
        if (categoryFilter) {
          filteredCourses = filteredCourses.filter(course => 
            course.category.toLowerCase().includes(categoryFilter.toLowerCase())
          );
        }
        
        // Difficulty filter
        if (difficultyFilter) {
          filteredCourses = filteredCourses.filter(course => 
            course.difficulty === difficultyFilter
          );
        }
        
        // Search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query)
          );
        }
        
        // Tier filtering - only show resources available to the current tier
        if (currentTier === 'freemium') {
          filteredCourses = filteredCourses.filter(course => course.requiredTier === 'freemium');
        } else if (currentTier === 'basic') {
          filteredCourses = filteredCourses.filter(course => 
            course.requiredTier === 'freemium' || course.requiredTier === 'basic'
          );
        }
        
        setResources(filteredCourses);
        setLiveEvents(eventsData);
        setCertifications(certificationsData);
        setTotalCount(filteredCourses.length);
        setHasMore(false); // All data is loaded at once for simplicity
        
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
  }, [categoryFilter, difficultyFilter, searchQuery, currentTier]);
  
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
    hasMore
  };
};
