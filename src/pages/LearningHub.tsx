
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Clock,
  Filter,
  Search,
  CheckCircle,
  TrendingUp,
  Zap,
  Star,
  Users,
  Award,
  Lock,
  Play,
  Info,
  FileText
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { LearningContent, UserProgress } from '@/types/learning';

const LearningHub = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { currentTier, canAccess, upgradePrompt } = useTier();

  const [courses, setCourses] = useState<LearningContent[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningContent[]>([]);
  const [activeCourse, setActiveCourse] = useState<LearningContent | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all-courses');

  // Fetch courses and user progress
  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserProgress();
    }
  }, [user, currentTier]);

  // Handle course ID from URL
  useEffect(() => {
    if (courseId && courses.length > 0) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        setActiveCourse(course);
        setActiveTab('course-details');
      }
    }
  }, [courseId, courses]);

  // Filter courses when filters change
  useEffect(() => {
    filterCourses();
  }, [searchQuery, activeCategory, activeDifficulty, courses]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      
      // Base query to fetch all courses
      let query = supabase.from('courses').select('*');
      
      // Add tier filtering based on user's tier
      if (currentTier === 'freemium') {
        query = query.eq('required_tier', 'freemium');
      } else if (currentTier === 'basic') {
        query = query.in('required_tier', ['freemium', 'basic']);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setCourses(data || []);
      setFilteredCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id);
        
      if (error) {
        throw error;
      }
      
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(course => course.category === activeCategory);
    }
    
    // Filter by difficulty
    if (activeDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === activeDifficulty);
    }
    
    setFilteredCourses(filtered);
  };

  const getProgressForCourse = (courseId: string): number => {
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress ? progress.completion_percent : 0;
  };

  const startOrContinueCourse = async (course: LearningContent) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!hasAccessToCourse(course)) {
      upgradePrompt(course.required_tier as any);
      return;
    }
    
    setActiveCourse(course);
    setActiveTab('course-details');
    
    try {
      // Check if progress record exists
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      // If no progress record exists, create one
      if (!data) {
        const newProgress = {
          user_id: user.id,
          course_id: course.id,
          completion_percent: 0,
          last_accessed: new Date().toISOString()
        };
        
        await supabase.from('user_progress').insert(newProgress);
        
        // Update local state
        setUserProgress([...userProgress, { ...newProgress, id: '' }]);
      } else {
        // Update last_accessed
        await supabase
          .from('user_progress')
          .update({ last_accessed: new Date().toISOString() })
          .eq('id', data.id);
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  const hasAccessToCourse = (course: LearningContent): boolean => {
    if (course.required_tier === 'freemium') return true;
    if (course.required_tier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
    if (course.required_tier === 'pro') return currentTier === 'pro';
    return false;
  };

  const getCategoryCount = (category: string): number => {
    return courses.filter(course => course.category === category).length;
  };

  const getDifficultyCount = (difficulty: string): number => {
    return courses.filter(course => course.difficulty === difficulty).length;
  };

  const getCourseCategories = (): string[] => {
    const categories = courses.map(course => course.category);
    return [...new Set(categories)];
  };

  const getCourseDifficulties = (): string[] => {
    const difficulties = courses.map(course => course.difficulty);
    return [...new Set(difficulties)];
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${remainingMinutes} min`;
  };

  const renderCoursesList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Courses</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search courses..."
              className="pl-9 h-9 w-full sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveCategory('all')}
        >
          All Categories
        </Button>
        {getCourseCategories().map(category => (
          <Button 
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category} ({getCategoryCount(category)})
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeDifficulty === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveDifficulty('all')}
        >
          All Levels
        </Button>
        {getCourseDifficulties().map(difficulty => (
          <Button 
            key={difficulty}
            variant={activeDifficulty === difficulty ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveDifficulty(difficulty)}
          >
            {difficulty} ({getDifficultyCount(difficulty)})
          </Button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="bg-muted h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-muted h-4 w-1/2 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted h-4 w-full rounded mb-4"></div>
                <div className="bg-muted h-4 w-3/4 rounded mb-4"></div>
                <div className="bg-muted h-8 w-full rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn't find any courses matching your search criteria. Try changing your filters or check back later.
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setActiveCategory('all');
            setActiveDifficulty('all');
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const hasAccess = hasAccessToCourse(course);
            const progress = getProgressForCourse(course.id);
            
            return (
              <Card 
                key={course.id} 
                className={`overflow-hidden transition-all hover:shadow-md ${!hasAccess ? 'opacity-80' : ''}`}
              >
                <div className="aspect-video relative bg-muted w-full">
                  {course.image_url ? (
                    <img 
                      src={course.image_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <BookOpen className="h-12 w-12 text-primary/50" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge className="bg-primary/90">{course.difficulty}</Badge>
                    {course.required_tier !== 'freemium' && (
                      <Badge className="capitalize bg-secondary/90">{course.required_tier}</Badge>
                    )}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description || 'Learn essential skills and concepts with this course.'}
                  </p>
                  
                  {progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  
                  {!hasAccess ? (
                    <Button 
                      onClick={() => upgradePrompt(course.required_tier as any)}
                      className="w-full"
                      variant="outline"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Upgrade to Access
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => startOrContinueCourse(course)}
                      className="w-full"
                    >
                      {progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderCourseDetails = () => {
    if (!activeCourse) return null;
    
    const hasAccess = hasAccessToCourse(activeCourse);
    const progress = getProgressForCourse(activeCourse.id);
    
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setActiveTab('all-courses')}
          className="mb-2"
        >
          ← Back to courses
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="aspect-video relative bg-muted w-full mb-6 rounded-lg overflow-hidden">
              {activeCourse.image_url ? (
                <img 
                  src={activeCourse.image_url} 
                  alt={activeCourse.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <BookOpen className="h-16 w-16 text-primary/50" />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{activeCourse.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary/90">{activeCourse.difficulty}</Badge>
                  <Badge variant="outline">{activeCourse.category}</Badge>
                  {activeCourse.required_tier !== 'freemium' && (
                    <Badge className="capitalize bg-secondary/90">{activeCourse.required_tier}</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {activeCourse.description || 'Learn essential skills and concepts with this course.'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">{formatDuration(activeCourse.duration)}</span>
                    <span className="text-xs text-muted-foreground">Duration</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">{activeCourse.difficulty}</span>
                    <span className="text-xs text-muted-foreground">Difficulty</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">5 Lessons</span>
                    <span className="text-xs text-muted-foreground">Content</span>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm font-medium">423</span>
                    <span className="text-xs text-muted-foreground">Enrolled</span>
                  </CardContent>
                </Card>
              </div>
              
              {!hasAccess ? (
                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {activeCourse.required_tier.charAt(0).toUpperCase() + activeCourse.required_tier.slice(1)} Tier Required
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade your subscription to access this premium course and unlock all its features.
                    </p>
                    <Button onClick={() => navigate('/pricing')}>
                      View Pricing Options
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          'Introduction to the Course',
                          'Core Concepts & Terminology',
                          'Practical Exercises',
                          'Advanced Techniques',
                          'Final Project & Next Steps'
                        ].map((lesson, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg flex items-center justify-between ${
                              index === 0 ? 'bg-primary/10' : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
                              }`}>
                                {index + 1}
                              </div>
                              <span className={index === 0 ? 'font-medium' : ''}>{lesson}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Simplified course content for this implementation */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        {activeCourse.content.split('\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:w-1/3 space-y-6">
            {hasAccess && progress > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">
                      {progress < 100 ? 'Continue Course' : 'Review Course'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    'Core concepts and principles',
                    'Practical implementation techniques',
                    'Best practices and common patterns',
                    'Problem solving and troubleshooting',
                    'Advanced use cases and applications'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Course Slides
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Exercise Files
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Reference Guide
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Info className="h-4 w-4" />
                  Additional Resources
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.filter(c => 
                  c.id !== activeCourse.id && 
                  c.category === activeCourse.category
                ).slice(0, 3).map(course => (
                  <div key={course.id} className="flex items-start gap-3">
                    <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">{course.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDuration(course.duration)}</span>
                        <span>•</span>
                        <span>{course.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 px-4 md:px-6 pb-12 bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Learning Hub</h1>
                <p className="text-muted-foreground">
                  Expand your AI knowledge with our curated courses
                </p>
              </div>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      <div>
                        <div className="text-sm font-medium">Learning Level</div>
                        <div className="text-xs text-muted-foreground">Bronze</div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">Courses Completed</div>
                        <div className="text-xs text-muted-foreground">0 / {courses.length}</div>
                      </div>
                    </div>
                  </div>
                  <TabsList>
                    <TabsTrigger value="all-courses">All Courses</TabsTrigger>
                    <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                    {activeCourse && <TabsTrigger value="course-details">Current Course</TabsTrigger>}
                  </TabsList>
                </div>
              ) : (
                <Button onClick={() => navigate('/auth')}>Sign in to Track Progress</Button>
              )}
            </div>
            
            <TabsContent value="all-courses">
              {renderCoursesList()}
            </TabsContent>
            
            <TabsContent value="my-courses">
              {user ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">My Courses</h2>
                  
                  {userProgress.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userProgress.map(progress => {
                        const course = courses.find(c => c.id === progress.course_id);
                        if (!course) return null;
                        
                        return (
                          <Card key={progress.id} className="overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-video relative bg-muted w-full">
                              {course.image_url ? (
                                <img 
                                  src={course.image_url} 
                                  alt={course.title} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                  <BookOpen className="h-12 w-12 text-primary/50" />
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-primary/90">{course.difficulty}</Badge>
                              </div>
                            </div>
                            
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Last accessed: {new Date(progress.last_accessed).toLocaleDateString()}</span>
                              </div>
                            </CardHeader>
                            
                            <CardContent>
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{progress.completion_percent}%</span>
                                </div>
                                <Progress value={progress.completion_percent} className="h-2" />
                              </div>
                              
                              <Button 
                                onClick={() => startOrContinueCourse(course)}
                                className="w-full"
                              >
                                {progress.completion_percent === 100 ? 'Review Course' : 'Continue Learning'}
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Courses Started</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You haven't started any courses yet. Browse our catalog and start learning today!
                      </p>
                      <Button onClick={() => setActiveTab('all-courses')}>
                        Browse Courses
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sign In Required</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Please sign in to track your course progress and access your saved courses.
                  </p>
                  <Button onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="course-details">
              {renderCourseDetails()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
