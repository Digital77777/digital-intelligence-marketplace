import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Play, 
  Clock, 
  Eye,
  User,
  CheckCircle,
  Lock,
  Unlock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LearningContent, UserProgress } from '@/types/learning';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { convertToLearningContent, convertToUserProgress } from '@/utils/dataConverters';

const LearningHub = () => {
  const [courses, setCourses] = useState<LearningContent[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningContent[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();
  const location = useLocation();

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, courses]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select('*');
      
    if (error) throw error;
    
    // Convert the course data using our utility
    const convertedCourses = coursesData ? coursesData.map(course => convertToLearningContent(course)) : [];
    
    setCourses(convertedCourses);
    setFilteredCourses(convertedCourses);
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    toast({
      title: "Error",
      description: "Could not load courses. Please try again later.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};

  const fetchUserProgress = async () => {
    if (!user) return;
  
  try {
    const { data: progressData, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) throw error;
    
    // Convert the progress data using our utility
    const convertedProgress = progressData ? progressData.map(progress => convertToUserProgress(progress)) : [];
    setUserProgress(convertedProgress);
    
  } catch (error) {
    console.error("Error fetching user progress:", error);
  }
};

  const applyFilters = () => {
    let filtered = [...courses];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description?.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(filtered);
  };

  const handleMarkComplete = async (courseId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to track your progress",
        variant: "destructive"
      });
      return;
    }
  
  try {
    setIsUpdating(true);
    
    // Convert courseId to number for the database query
    const courseIdNum = parseInt(courseId, 10);
    if (isNaN(courseIdNum)) {
      throw new Error("Invalid course ID");
    }
    
    // First check if progress entry exists
    const { data: existing, error: queryError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseIdNum)
      .maybeSingle();
      
    if (queryError) throw queryError;
    
    if (existing) {
      // Update existing progress
      const { error: updateError } = await supabase
        .from('user_progress')
        .update({ 
          completion_percent: 100,
          last_accessed: new Date().toISOString()
        })
        .eq('id', existing.id);
        
      if (updateError) throw updateError;
    } else {
      // Create new progress
      const { error: insertError } = await supabase
        .from('user_progress')
        .insert({ 
          user_id: user.id,
          course_id: courseIdNum,
          completion_percent: 100,
          last_accessed: new Date().toISOString()
        });
        
      if (insertError) throw insertError;
    }
    
    // Update local state
    setUserProgress(prev => {
      const newProgress = [...prev];
      const existingIndex = newProgress.findIndex(p => p.course_id === courseId);
      
      if (existingIndex >= 0) {
        newProgress[existingIndex] = {
          ...newProgress[existingIndex],
          completion_percent: 100,
          last_accessed: new Date().toISOString()
        };
      } else {
        newProgress.push({
          id: uuidv4(),
          user_id: user.id,
          course_id: courseId,
          completion_percent: 100,
          last_accessed: new Date().toISOString()
        });
      }
      
      return newProgress;
    });
    
    toast({
      title: "Progress Updated",
      description: "Course marked as completed!",
    });
    
  } catch (error) {
    console.error("Error updating progress:", error);
    toast({
      title: "Error",
      description: "Could not update progress. Please try again.",
      variant: "destructive"
    });
  } finally {
    setIsUpdating(false);
  }
};

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress ? progress.completion_percent || 0 : 0;
  };

  const isCourseLocked = (course: LearningContent) => {
    if (course.required_tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (course.required_tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="relative rounded-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 py-16 px-8 rounded-xl">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Learning Hub</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  Explore our AI learning courses and tutorials to enhance your skills and knowledge.
                </p>
                <Button className="bg-white text-purple-900 hover:bg-indigo-50">
                  Start Learning
                </Button>
              </div>
            </div>
          </div>

          {/* Search and filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="relative flex-1 md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:ml-4 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Course list */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-40 bg-muted animate-pulse" />
                    <CardContent className="pt-4">
                      <div className="h-5 bg-muted animate-pulse mb-2 w-3/4" />
                      <div className="h-4 bg-muted animate-pulse mb-1 w-full" />
                      <div className="h-4 bg-muted animate-pulse w-2/3" />
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                          <div className="h-4 w-20 bg-muted animate-pulse" />
                        </div>
                        <div className="h-4 w-12 bg-muted animate-pulse" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="relative h-40 bg-gray-800">
                      {course.image_url ? (
                        <img 
                          src={course.image_url} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-800 to-gray-900">
                          <Play className="h-12 w-12 text-white opacity-50" />
                        </div>
                      )}
                      {isCourseLocked(course) && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-white opacity-70" />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-medium line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        {course.difficulty && (
                          <Badge variant="outline">{course.difficulty}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1 inline-block" /> {course.duration} minutes
                      </div>
                    </CardFooter>
                    <div className="absolute top-2 right-2">
                      {getCourseProgress(course.id) === 100 ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        isCourseLocked(course) ? (
                          <Badge variant="destructive">
                            <Lock className="h-3 w-3 mr-1" />
                            {course.required_tier === 'basic' ? 'Basic Tier' : 'Pro Tier'}
                          </Badge>
                        ) : null
                      )}
                    </div>
                    <Link to={`/learning/${course.id}`} className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View course</span>
                    </Link>
                    {user && !isCourseLocked(course) && getCourseProgress(course.id) !== 100 && (
                      <Button 
                        size="sm" 
                        className="absolute bottom-2 left-2"
                        onClick={() => handleMarkComplete(course.id)}
                        disabled={isUpdating}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Upgrade banner */}
          {currentTier === 'freemium' && (
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">Unlock More Courses</h3>
                  <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                    Upgrade to Basic or Pro to access all courses and exclusive content.
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
                  onClick={() => upgradePrompt('basic')}
                >
                  Upgrade Now
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
