
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
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Clock, 
  Lock,
  BookOpen,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { LearningContent, UserProgress } from '@/types/learning';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { convertToLearningContent, convertToUserProgress } from '@/utils/dataConverters';
import TierLearningFeatures from '@/components/learning/TierLearningFeatures';

const LearningHub = () => {
  const [courses, setCourses] = useState<LearningContent[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningContent[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  const { currentTier, upgradePrompt, getTierFeatures } = useTier();
  const location = useLocation();
  const tierFeatures = getTierFeatures(currentTier);

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, courses]);

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'pro': 
        return <Zap className="h-4 w-4 text-purple-400" />;
      case 'basic': 
        return <Shield className="h-4 w-4 text-blue-400" />;
      default: 
        return <Sparkles className="h-4 w-4 text-amber-400" />;
    }
  };

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
      toast("Could not load courses. Please try again later.");
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
      toast("Please sign in to track your progress");
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
      
      toast("Course marked as completed!");
      
    } catch (error) {
      console.error("Error updating progress:", error);
      toast("Could not update progress. Please try again.");
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
                <div className="flex items-center gap-2 mb-2">
                  {getTierIcon(currentTier)}
                  <Badge variant="outline" className="capitalize bg-white/10 text-white border-white/20">
                    {currentTier} Tier
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Learning Hub</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  {currentTier === 'pro' 
                    ? 'Access expert-level training, industry certifications, and exclusive events.' 
                    : currentTier === 'basic'
                    ? 'Enhance your skills with intermediate courses, learning paths, and live webinars.'
                    : 'Explore foundational AI courses and community resources to begin your learning journey.'}
                </p>
                <Button className="bg-white text-purple-900 hover:bg-indigo-50">
                  Start Learning
                </Button>
              </div>
            </div>
          </div>

          {/* Tier-specific features */}
          <div className="mb-16">
            <TierLearningFeatures />
          </div>

          {/* Learning Resource Library Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Learning Resource Library</h2>
            </div>

            {/* Search and filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="relative flex-1 md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
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

            {/* Resource list */}
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
                            <BookOpen className="h-12 w-12 text-white opacity-50" />
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
                          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
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

            {/* Tier comparison and upgrade banner */}
            {currentTier !== 'pro' && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Learning Hub Tier Comparison</h2>
                
                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-4 font-medium">Feature</th>
                        <th className="text-center p-4 font-medium">
                          <div className="flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-amber-500 mr-2" /> Freemium
                          </div>
                        </th>
                        <th className="text-center p-4 font-medium">
                          <div className="flex items-center justify-center">
                            <Shield className="h-4 w-4 text-blue-500 mr-2" /> Basic
                          </div>
                        </th>
                        <th className="text-center p-4 font-medium">
                          <div className="flex items-center justify-center">
                            <Zap className="h-4 w-4 text-purple-500 mr-2" /> Pro
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4 border-r">Course Access</td>
                        <td className="text-center p-4 border-r">5 starter courses</td>
                        <td className="text-center p-4 border-r">50+ intermediate courses</td>
                        <td className="text-center p-4">200+ advanced courses</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-r">Certifications</td>
                        <td className="text-center p-4 border-r">Basic badges</td>
                        <td className="text-center p-4 border-r">Skill certificates</td>
                        <td className="text-center p-4">Industry-recognized credentials</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-r">Community</td>
                        <td className="text-center p-4 border-r">Public forums</td>
                        <td className="text-center p-4 border-r">Private groups + webinars</td>
                        <td className="text-center p-4">Pro workshops + VIP events</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-r">Tools Integration</td>
                        <td className="text-center p-4 border-r">Sandbox only</td>
                        <td className="text-center p-4 border-r">Kaggle-like projects</td>
                        <td className="text-center p-4">Real-world tool deployment</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-r">Support</td>
                        <td className="text-center p-4 border-r">Community-driven</td>
                        <td className="text-center p-4 border-r">Email + chat</td>
                        <td className="text-center p-4">1:1 mentorship + priority</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">
                        {currentTier === 'freemium' ? 
                          'Upgrade to Basic or Pro for Advanced Learning Features' : 
                          'Upgrade to Pro for Premium Learning Features'}
                      </h3>
                      <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                        {currentTier === 'freemium' ?
                          'Get access to intermediate courses, structured learning paths, and professional certifications.' :
                          'Unlock industry-recognized credentials, 1:1 mentorship, and access to exclusive expert events.'}
                      </p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
                      onClick={() => upgradePrompt(currentTier === 'basic' ? 'pro' : 'basic')}
                    >
                      Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
