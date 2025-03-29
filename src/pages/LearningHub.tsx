import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LearningContent, UserProgress, CourseCategory } from '@/types/learning';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { convertToLearningContent, convertToUserProgress, ensureString, ensureNumber } from '@/utils/dataConverters';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  BarChart, 
  Brain, 
  MessageSquare, 
  Eye, 
  Shield, 
  ChevronRight, 
  Lock, 
  CheckCircle, 
  Star, 
  Sparkles, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

const LearningHub = () => {
  const [courses, setCourses] = useState<LearningContent[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<LearningContent[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { courseId } = useParams<{ courseId: string }>();
  const { currentTier, upgradePrompt } = useTier();
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');
        
        if (coursesError) throw coursesError;
        
        // Convert database types to app types
        const convertedCourses = coursesData.map(convertToLearningContent);
        setCourses(convertedCourses);
        setFilteredCourses(convertedCourses);
        
        // Mock categories for now
        setCategories([
          { id: "1", name: "Machine Learning", icon: "brain", description: "Learn about ML algorithms and applications" },
          { id: "2", name: "NLP", icon: "message-square", description: "Natural Language Processing concepts and tools" },
          { id: "3", name: "Computer Vision", icon: "eye", description: "Image recognition and visual data processing" },
          { id: "4", name: "Data Science", icon: "bar-chart", description: "Data analysis and visualization techniques" },
          { id: "5", name: "AI Ethics", icon: "shield", description: "Ethical considerations in AI development" },
        ]);
        
        // Fetch user progress if logged in
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id);
          
          if (progressError) throw progressError;
          
          // Convert database types to app types
          const convertedProgress = progressData.map(convertToUserProgress);
          setUserProgress(convertedProgress);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, [user]);
  
  // Filter courses based on search, category, difficulty
  useEffect(() => {
    let filtered = [...courses];
    
    // Filter by access level (tier)
    filtered = filtered.filter(course => {
      if (course.required_tier === 'freemium') return true;
      if (course.required_tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) return true;
      if (course.required_tier === 'pro' && currentTier === 'pro') return true;
      return false;
    });
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => course.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(course => course.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          (course.description && course.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, selectedCategory, selectedDifficulty, searchQuery, currentTier]);
  
  // Handler for tracking course progress
  const trackProgress = async (courseId: string, completionPercent: number) => {
    if (!user) return;
    
    try {
      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', ensureNumber(courseId))
        .single();
      
      const now = new Date().toISOString();
      
      if (existingProgress) {
        // Update existing progress
        await supabase
          .from('user_progress')
          .update({
            completion_percent: completionPercent,
            last_accessed: now
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new progress record
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            course_id: ensureNumber(courseId),
            completion_percent: completionPercent,
            last_accessed: now
          });
      }
      
      // Refresh progress data
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (progressData) {
        const convertedProgress = progressData.map(convertToUserProgress);
        setUserProgress(convertedProgress);
      }
    } catch (error) {
      console.error("Error tracking progress:", error);
    }
  };
  
  // Course selection handler
  const handleCourseSelect = (course: LearningContent) => {
    // Check if user has access to this course
    if ((course.required_tier === 'basic' && currentTier === 'freemium') || 
        (course.required_tier === 'pro' && currentTier !== 'pro')) {
      upgradePrompt(course.required_tier as 'basic' | 'pro');
      return;
    }
    
    // If user has access, navigate to the course
    navigate(`/learning/${course.id}`);
    
    // Track that user accessed the course
    if (user) {
      // Get existing progress or default to 0
      const existingProgress = userProgress.find(p => p.course_id === course.id);
      const completionPercent = existingProgress ? existingProgress.completion_percent : 0;
      
      trackProgress(course.id, completionPercent);
    }
  };

  // Get course progress
  const getCourseProgress = (courseId: string): number => {
    if (!user) return 0;
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress ? progress.completion_percent : 0;
  };

  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'machine learning':
        return <Brain className="h-4 w-4" />;
      case 'nlp':
        return <MessageSquare className="h-4 w-4" />;
      case 'computer vision':
        return <Eye className="h-4 w-4" />;
      case 'data science':
        return <BarChart className="h-4 w-4" />;
      case 'ai ethics':
        return <Shield className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Format duration
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  // Get tier badge
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'basic':
        return (
          <Badge variant="outline" className="ml-2 text-blue-500 border-blue-200 dark:border-blue-800">
            Basic
          </Badge>
        );
      case 'pro':
        return (
          <Badge variant="outline" className="ml-2 text-purple-500 border-purple-200 dark:border-purple-800">
            <Sparkles className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        );
      default:
        return null;
    }
  };

  // Render course card
  const renderCourseCard = (course: LearningContent) => {
    const progress = getCourseProgress(course.id);
    const isLocked = (course.required_tier === 'basic' && currentTier === 'freemium') || 
                     (course.required_tier === 'pro' && currentTier !== 'pro');
    
    return (
      <Card 
        key={course.id} 
        className={`overflow-hidden transition-all hover:shadow-md ${isLocked ? 'opacity-80' : ''}`}
      >
        <div className="relative h-40 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
          {course.image_url ? (
            <img 
              src={course.image_url} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen className="h-16 w-16 text-primary/20" />
          )}
          
          {isLocked && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Lock className="h-8 w-8 text-muted-foreground mb-2" />
                <Badge variant="outline">
                  {course.required_tier === 'basic' ? 'Basic' : 'Pro'} Tier Required
                </Badge>
              </div>
            </div>
          )}
          
          <Badge 
            className="absolute top-2 left-2 capitalize"
            variant="secondary"
          >
            {getCategoryIcon(course.category)}
            <span className="ml-1">{course.category}</span>
          </Badge>
          
          <Badge 
            className="absolute top-2 right-2"
            variant={course.difficulty === 'beginner' ? 'outline' : 
                    course.difficulty === 'intermediate' ? 'secondary' : 'default'}
          >
            {course.difficulty}
          </Badge>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            {course.title}
            {getTierBadge(course.required_tier)}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(course.duration)}
            </div>
            {progress > 0 && (
              <div className="flex items-center">
                {progress === 100 ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <span>{progress}% complete</span>
                )}
              </div>
            )}
          </div>
          
          {user && progress > 0 && progress < 100 && (
            <Progress value={progress} className="h-1 mb-2" />
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            variant={isLocked ? "outline" : "default"} 
            className="w-full"
            onClick={() => handleCourseSelect(course)}
          >
            {isLocked ? (
              <>Unlock<Lock className="ml-2 h-4 w-4" /></>
            ) : progress > 0 && progress < 100 ? (
              <>Continue Learning<ChevronRight className="ml-2 h-4 w-4" /></>
            ) : progress === 100 ? (
              <>Review Course<Star className="ml-2 h-4 w-4" /></>
            ) : (
              <>Start Learning<ChevronRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <div className="relative rounded-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 py-16 px-8 rounded-xl">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Learning Hub</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  Expand your AI knowledge with our comprehensive courses, tutorials, and resources.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-indigo-900 hover:bg-indigo-50">
                    Browse All Courses
                  </Button>
                  {currentTier !== 'pro' && (
                    <Button 
                      variant="outline" 
                      className="text-white border-white/30 hover:bg-white/10 hover:text-white"
                      onClick={() => upgradePrompt('pro')}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Unlock Pro Courses
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-semibold">Courses & Tutorials</h2>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedDifficulty("beginner")}>
                      Beginner
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedDifficulty("intermediate")}>
                      Intermediate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedDifficulty("advanced")}>
                      Advanced
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedDifficulty("all")}>
                      All Levels
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.name.toLowerCase()}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedCategory} className="mt-0">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <Card key={index}>
                        <Skeleton className="h-40 w-full" />
                        <CardHeader className="pb-2">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3 mt-1" />
                        </CardHeader>
                        <CardContent className="pb-2">
                          <Skeleton className="h-4 w-1/3" />
                        </CardContent>
                        <CardFooter>
                          <Skeleton className="h-9 w-full" />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredCourses.length === 0 ? (
                      <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No courses found</h3>
                        <p className="text-muted-foreground mb-6">
                          Try adjusting your filters or search query
                        </p>
                        <Button variant="outline" onClick={() => {
                          setSelectedCategory("all");
                          setSelectedDifficulty("all");
                          setSearchQuery("");
                        }}>
                          Reset Filters
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map(renderCourseCard)}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Learning paths section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900/30">
                <CardHeader>
                  <CardTitle>AI Fundamentals</CardTitle>
                  <CardDescription>
                    Master the core concepts of artificial intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>5 courses</span>
                    <span>12 hours</span>
                  </div>
                  <Progress value={user ? 20 : 0} className="h-1 mb-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                        <span>Introduction to AI</span>
                      </span>
                      <Badge variant="outline" className="text-xs">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <div className="h-3.5 w-3.5 mr-1.5 rounded-full border-2 border-primary" />
                        <span>Machine Learning Basics</span>
                      </span>
                      <Badge variant="outline" className="text-xs">In Progress</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Neural Networks</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue Path</Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-100 dark:border-purple-900/30">
                <CardHeader>
                  <CardTitle>NLP Specialist</CardTitle>
                  <CardDescription>
                    Become an expert in Natural Language Processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>7 courses</span>
                    <span>18 hours</span>
                  </div>
                  <Progress value={0} className="h-1 mb-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Text Processing Fundamentals</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Building Language Models</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Advanced NLP Techniques</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={currentTier === 'pro' ? 'default' : 'outline'}>
                    {currentTier === 'pro' ? 'Start Path' : 'Pro Tier Required'}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border-green-100 dark:border-green-900/30">
                <CardHeader>
                  <CardTitle>Computer Vision</CardTitle>
                  <CardDescription>
                    Learn to build image recognition systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>6 courses</span>
                    <span>15 hours</span>
                  </div>
                  <Progress value={0} className="h-1 mb-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Image Processing Basics</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Convolutional Neural Networks</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Object Detection</span>
                      <Badge variant="outline" className="text-xs opacity-50">Locked</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={currentTier === 'basic' || currentTier === 'pro' ? 'default' : 'outline'}>
                    {currentTier === 'freemium' ? 'Basic Tier Required' : 'Start Path'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Study groups section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Study Groups</h2>
              <Button variant="outline" className="hidden md:flex">
                <Users className="mr-2 h-4 w-4" />
                Browse All Groups
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1">Active</Badge>
                  <CardTitle className="text-base">ML Study Group</CardTitle>
                  <CardDescription className="line-clamp-1">
                    Weekly discussions on machine learning papers
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex -space-x-2 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <img src={`https://i.pravatar.cc/32?img=${i + 10}`} alt="Member" />
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">+12</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next meeting: Tomorrow, 7:00 PM
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1" variant="outline">New</Badge>
                  <CardTitle className="text-base">NLP Enthusiasts</CardTitle>
                  <CardDescription className="line-clamp-1">
                    Exploring latest advancements in NLP
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex -space-x-2 mb-2">
                    {[...Array(3)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <img src={`https://i.pravatar.cc/32?img=${i + 20}`} alt="Member" />
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next meeting: Friday, 6:30 PM
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1" variant="secondary">Popular</Badge>
                  <CardTitle className="text-base">AI Ethics Discussion</CardTitle>
                  <CardDescription className="line-clamp-1">
                    Discussing ethical implications of AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex -space-x-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <img src={`https://i.pravatar.cc/32?img=${i + 30}`} alt="Member" />
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">+8</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next meeting: Monday, 5:00 PM
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-100 dark:border-indigo-900/30">
                <CardHeader>
                  <CardTitle className="text-base">Create a Study Group</CardTitle>
                  <CardDescription>
                    Start your own group to learn together
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Collaborate with others who share your interests
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <Button variant="outline" className="w-full mt-4 md:hidden">
              <Users className="mr-2 h-4 w-4" />
              Browse All Groups
            </Button>
          </div>

          {/* Pro upgrade banner */}
          {currentTier !== 'pro' && (
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">Unlock Pro Learning Content</h3>
                  <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                    Upgrade to Pro to access advanced courses, specialized learning paths, and exclusive study materials.
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
                  onClick={() => upgradePrompt('pro')}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </div>
            </Card>
          )}

          {/* Resources section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Cheat Sheets</CardTitle>
                  <CardDescription>
                    Quick reference guides for AI concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Machine Learning Algorithms
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Neural Network Architectures
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Python for Data Science
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Cheat Sheets
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Tools Directory</CardTitle>
                  <CardDescription>
                    Explore tools to enhance your AI projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Model Training Platforms
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Data Visualization Tools
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      AI Development Frameworks
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/ai-tools-directory')}>
                    Browse AI Tools
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Forums</CardTitle>
                  <CardDescription>
                    Connect with other learners and experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Ask Questions
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Share Projects
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      Get Feedback
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/forums')}>
                    Join Discussions
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
