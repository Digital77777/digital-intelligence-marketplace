
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Code, 
  Award, 
  Brain, 
  Eye, 
  Database, 
  Workflow, 
  Layers, 
  Cpu, 
  MessageSquare, 
  Star, 
  Lock,
  Play,
  Clock,
  BarChart4,
  CheckCircle2
} from 'lucide-react';

// Define course types and interfaces
type CourseCategory = 'foundation' | 'tool-specific' | 'advanced' | 'certification';
type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
type ToolCategory = 'nlp' | 'computer-vision' | 'ml-frameworks' | 'data-analysis' | 'automation' | 'open-source-ai' | 'code-assistance' | 'business-intelligence' | 'audio-speech' | 'collaboration';

interface Course {
  id: number;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  lessons: number;
  progress?: number;
  isPremium: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  relatedTool?: string;
  relatedToolCategory?: ToolCategory;
  icon: React.ReactNode;
}

const Courses = () => {
  const { currentTier } = useTier();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample courses data
  const foundationalCourses: Course[] = [
    {
      id: 1,
      title: "Introduction to AI and Machine Learning",
      description: "Learn the fundamental concepts of AI, basic terminologies, and the evolution of artificial intelligence.",
      category: "foundation",
      level: "beginner",
      duration: "3 hours",
      lessons: 5,
      progress: 0,
      isPremium: false,
      isPopular: true,
      icon: <Brain className="h-6 w-6 text-blue-500" />
    },
    {
      id: 2,
      title: "Getting Started with Python for AI",
      description: "Master Python programming fundamentals, essential libraries, and environments for AI development.",
      category: "foundation",
      level: "beginner",
      duration: "4 hours",
      lessons: 8,
      progress: 0,
      isPremium: false,
      icon: <Code className="h-6 w-6 text-blue-500" />
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Understand the basics of data science, including data collection, cleaning, and analysis.",
      category: "foundation",
      level: "beginner",
      duration: "5 hours",
      lessons: 10,
      progress: 0,
      isPremium: false,
      icon: <Database className="h-6 w-6 text-blue-500" />
    }
  ];
  
  const toolSpecificCourses: Course[] = [
    {
      id: 4,
      title: "Mastering Hugging Face Transformers",
      description: "Learn NLP basics, model fine-tuning, and build chatbots or text generators using Hugging Face.",
      category: "tool-specific",
      level: "intermediate",
      duration: "6 hours",
      lessons: 12,
      progress: 0,
      isPremium: false,
      relatedTool: "Hugging Face Transformers",
      relatedToolCategory: "nlp",
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />
    },
    {
      id: 5,
      title: "Computer Vision with OpenCV",
      description: "Step-by-step guides for image processing, object detection, and real-time video analysis with OpenCV.",
      category: "tool-specific",
      level: "intermediate",
      duration: "8 hours",
      lessons: 15,
      progress: 0,
      isPremium: false,
      relatedTool: "OpenCV",
      relatedToolCategory: "computer-vision",
      icon: <Eye className="h-6 w-6 text-purple-500" />
    },
    {
      id: 6,
      title: "Data Science with Scikit-learn",
      description: "Practical machine learning techniques, model evaluation, and use case demonstrations using Scikit-learn.",
      category: "tool-specific",
      level: "intermediate",
      duration: "7 hours",
      lessons: 14,
      progress: 0,
      isPremium: false,
      relatedTool: "Scikit-learn",
      relatedToolCategory: "ml-frameworks",
      icon: <Brain className="h-6 w-6 text-purple-500" />
    },
    {
      id: 7,
      title: "Workflow Automation with Apache Airflow",
      description: "Learn to build, schedule, and monitor data pipelines with Apache Airflow.",
      category: "tool-specific",
      level: "intermediate",
      duration: "5 hours",
      lessons: 10,
      progress: 0,
      isPremium: true,
      relatedTool: "Apache Airflow",
      relatedToolCategory: "automation",
      icon: <Workflow className="h-6 w-6 text-purple-500" />
    },
    {
      id: 8,
      title: "Interactive Data Analysis with Pandas",
      description: "Master data cleaning, visualization, and exploratory analysis using Pandas and Jupyter Notebook.",
      category: "tool-specific",
      level: "intermediate",
      duration: "6 hours",
      lessons: 12,
      progress: 0,
      isPremium: true,
      relatedTool: "Pandas",
      relatedToolCategory: "data-analysis",
      icon: <BarChart4 className="h-6 w-6 text-purple-500" />
    }
  ];
  
  const advancedCourses: Course[] = [
    {
      id: 9,
      title: "Deep Dive into NLP",
      description: "In-depth exploration of spaCy, NLTK, and TextBlob, coupled with advanced language processing projects.",
      category: "advanced",
      level: "advanced",
      duration: "10 hours",
      lessons: 20,
      progress: 0,
      isPremium: true,
      isNew: true,
      relatedToolCategory: "nlp",
      icon: <Layers className="h-6 w-6 text-amber-500" />
    },
    {
      id: 10,
      title: "Advanced Computer Vision Techniques",
      description: "Master YOLOv5, Dlib, and ImageAI for sophisticated image recognition and segmentation tasks.",
      category: "advanced",
      level: "advanced",
      duration: "12 hours",
      lessons: 24,
      progress: 0,
      isPremium: true,
      relatedToolCategory: "computer-vision",
      icon: <Eye className="h-6 w-6 text-amber-500" />
    },
    {
      id: 11,
      title: "Automation and Integration Strategies",
      description: "Learn to integrate AI tools with automation platforms like Zapier and n8n for powerful workflows.",
      category: "advanced",
      level: "advanced",
      duration: "8 hours",
      lessons: 16,
      progress: 0,
      isPremium: true,
      relatedToolCategory: "automation",
      icon: <Workflow className="h-6 w-6 text-amber-500" />
    }
  ];
  
  const certificationCourses: Course[] = [
    {
      id: 12,
      title: "AI Tools Practitioner Certification",
      description: "Comprehensive certification track covering practical applications of leading AI tools.",
      category: "certification",
      level: "advanced",
      duration: "20 hours",
      lessons: 40,
      progress: 0,
      isPremium: true,
      icon: <Award className="h-6 w-6 text-green-500" />
    },
    {
      id: 13,
      title: "Advanced AI Developer Certification",
      description: "Become an expert in building complex AI systems integrating multiple tools and technologies.",
      category: "certification",
      level: "advanced",
      duration: "30 hours",
      lessons: 60,
      progress: 0,
      isPremium: true,
      icon: <Award className="h-6 w-6 text-green-500" />
    }
  ];
  
  // Combine all courses
  const allCourses = [...foundationalCourses, ...toolSpecificCourses, ...advancedCourses, ...certificationCourses];
  
  // Filter courses based on active tab and search query
  useEffect(() => {
    let filtered = allCourses;
    
    // Filter by category tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(course => course.category === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by tier access
    if (currentTier === 'freemium') {
      filtered = filtered.filter(course => !course.isPremium);
    }
    
    setFilteredCourses(filtered);
  }, [activeTab, searchQuery, currentTier]);
  
  const getLevelBadge = (level: CourseLevel) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Intermediate</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Advanced</Badge>;
      default:
        return null;
    }
  };
  
  const getCategoryIcon = (category: CourseCategory) => {
    switch (category) {
      case 'foundation':
        return <BookOpen className="h-5 w-5" />;
      case 'tool-specific':
        return <Cpu className="h-5 w-5" />;
      case 'advanced':
        return <Brain className="h-5 w-5" />;
      case 'certification':
        return <Award className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 relative overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-64 md:h-80 flex items-center">
              <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                  Courses & Learning Hub
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6 animate-slide-up">
                  Master AI tools and techniques with our comprehensive learning resources
                </p>
                <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    Explore Courses
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                  >
                    View Learning Paths
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
          </div>
          
          {/* Search and stats */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <input 
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
              
              {currentTier !== 'freemium' ? (
                <div className="flex gap-4">
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="mr-3 bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Courses</p>
                      <p className="font-semibold">{allCourses.length} Total</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="mr-3 bg-green-100 dark:bg-green-800 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                      <p className="font-semibold">0/{allCourses.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="mr-3 bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Learning Time</p>
                      <p className="font-semibold">0 hrs</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            
            {currentTier === 'freemium' && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Lock className="h-4 w-4 text-amber-500" /> 
                      <span>Limited Access on Freemium Plan</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You have access to {foundationalCourses.length} free courses. Upgrade to Basic or Pro for full access to all {allCourses.length} courses and certification tracks.
                    </p>
                  </div>
                  <Button variant="outline" className="shrink-0" onClick={() => window.location.href = "/pricing"}>
                    View Pricing
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Course Category Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="all" className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" /> All Courses
              </TabsTrigger>
              <TabsTrigger value="foundation" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> Foundational
              </TabsTrigger>
              <TabsTrigger value="tool-specific" className="flex items-center gap-1.5">
                <Cpu className="h-4 w-4" /> Tool-Specific
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-1.5">
                <Brain className="h-4 w-4" /> Advanced
              </TabsTrigger>
              <TabsTrigger value="certification" className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> Certification
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Course Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any courses matching your search criteria. Try adjusting your filters or search query.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className={`overflow-hidden transition-all hover:shadow-md ${course.isPremium && currentTier === 'freemium' ? 'opacity-70' : ''}`}>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 flex justify-center items-center h-40">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                        {course.icon}
                      </div>
                    </div>
                    
                    {course.isNew && (
                      <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">New</Badge>
                    )}
                    
                    {course.isPopular && !course.isNew && (
                      <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-600">Popular</Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        {course.relatedTool && (
                          <CardDescription className="text-xs mt-1">
                            Related tool: {course.relatedTool}
                          </CardDescription>
                        )}
                      </div>
                      {course.isPremium && (
                        <Badge variant="outline" className="border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400">
                          {currentTier === 'pro' ? 'Pro' : currentTier === 'basic' ? 'Basic' : 'Premium'}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getLevelBadge(course.level)}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {course.duration}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                      </Badge>
                    </div>
                    
                    {course.progress !== undefined && course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    {course.isPremium && currentTier === 'freemium' ? (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => window.location.href = "/pricing"}
                      >
                        <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" /> Start Learning
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Weekly Challenges Section */}
          {currentTier !== 'freemium' && (
            <div className="mt-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Weekly Challenges</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                    <h3 className="text-lg font-semibold">Build a Chatbot with GPT-2</h3>
                    <p className="text-white/80 text-sm">Ends in 4 days</p>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm mb-4">
                      Create a functional chatbot using the GPT-2 model and share your project with the community.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                            {i + 1}
                          </div>
                        ))}
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                          +12
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 200 points
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Challenge</Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                    <h3 className="text-lg font-semibold">Object Detection with OpenCV</h3>
                    <p className="text-white/80 text-sm">Ends in 6 days</p>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm mb-4">
                      Implement a real-time object detection system using OpenCV and demonstrate its practical applications.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                            {i + 1}
                          </div>
                        ))}
                        <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                          +8
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> 250 points
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Challenge</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
          
          {/* Learning Paths */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Learning Paths</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500/90 to-purple-600 p-6 text-white">
                  <BookOpen className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">AI Development Fundamentals</h3>
                  <p className="text-white/80 text-sm mt-2">4 courses • 18 hours</p>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    A structured path to master the essentials of AI development with Python and key libraries.
                  </p>
                  {currentTier === 'freemium' ? (
                    <Button className="w-full" variant="outline">
                      Start Path
                    </Button>
                  ) : (
                    <Progress value={0} className="mb-2" />
                  )}
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-amber-500/90 to-red-600 p-6 text-white">
                  <Cpu className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">Computer Vision Specialist</h3>
                  <p className="text-white/80 text-sm mt-2">3 courses • 26 hours</p>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Master image processing, object detection, and advanced computer vision applications.
                  </p>
                  {currentTier === 'freemium' ? (
                    <Button className="w-full" variant="outline" onClick={() => window.location.href = "/pricing"}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
                    </Button>
                  ) : (
                    <Progress value={0} className="mb-2" />
                  )}
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-green-500/90 to-teal-600 p-6 text-white">
                  <MessageSquare className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">NLP & Text Processing Expert</h3>
                  <p className="text-white/80 text-sm mt-2">5 courses • 32 hours</p>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Become proficient in natural language processing, text analysis, and building language models.
                  </p>
                  {currentTier === 'freemium' ? (
                    <Button className="w-full" variant="outline" onClick={() => window.location.href = "/pricing"}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
                    </Button>
                  ) : (
                    <Progress value={0} className="mb-2" />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
