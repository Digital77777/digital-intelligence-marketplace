
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  GraduationCap,
  Flame,
  BookOpen,
  Lock,
  BarChart,
  Bot,
  Layers,
  Shield,
  Sparkles,
  ChevronRight,
  Filter,
  Star,
  Users,
  Trophy,
  Gift,
  Brain,
  LightbulbIcon,
  Code,
  LineChart,
  Eye,
  MessageSquare,
  Database,
  Cpu
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';

interface LearningContent {
  id: string;
  title: string;
  description: string;
  image_url: string;
  required_tier: string;
  category: string;
  difficulty: string;
  duration: number;
  created_at: string;
  content: string;
}

interface UserProgress {
  course_id: string;
  completion_percent: number;
}

interface UserAchievement {
  badge_name: string;
  badge_description: string;
  earned_at: string;
}

const LearningHub = () => {
  const [content, setContent] = useState<LearningContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<LearningContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [totalXp, setTotalXp] = useState(0);
  const [userLevel, setUserLevel] = useState('Bronze');
  const [nextLevelProgress, setNextLevelProgress] = useState(0);
  const [featuredCourses, setFeaturedCourses] = useState<LearningContent[]>([]);
  const [popularCourses, setPopularCourses] = useState<LearningContent[]>([]);
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLearningContent();
    if (user) {
      fetchUserProgress();
      fetchUserAchievements();
      fetchUserXp();
    }
  }, [currentTier, user]);

  const fetchLearningContent = async () => {
    try {
      setIsLoading(true);
      // Fetch learning content from Supabase based on user's tier
      const { data, error } = await supabase
        .from('learning_content')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // If no data or very little data, add sample content for demonstration
      if (!data || data.length < 5) {
        const sampleContent = generateSampleContent();
        for (const item of sampleContent) {
          const { error: insertError } = await supabase
            .from('learning_content')
            .insert(item);
            
          if (insertError) {
            console.error('Error inserting sample content:', insertError);
          }
        }
        
        // Fetch the updated content
        const { data: updatedData, error: fetchError } = await supabase
          .from('learning_content')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (fetchError) {
          throw fetchError;
        }
        
        setContent(updatedData || []);
        setFilteredContent(updatedData || []);

        // Set featured and popular courses
        if (updatedData) {
          setFeaturedCourses(updatedData.filter(item => item.category === 'AI Fundamentals').slice(0, 3));
          setPopularCourses(updatedData.filter(item => item.difficulty === 'Intermediate').slice(0, 3));
        }
      } else {
        setContent(data);
        setFilteredContent(data);

        // Set featured and popular courses
        setFeaturedCourses(data.filter(item => item.category === 'AI Fundamentals').slice(0, 3));
        setPopularCourses(data.filter(item => item.difficulty === 'Intermediate').slice(0, 3));
      }
      
      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(
          (data || []).map(item => item.category)
        )
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching learning content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (data) {
        setUserProgress(data);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const fetchUserAchievements = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      if (data) {
        setUserAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    }
  };

  const fetchUserXp = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If no XP record exists, create one
      if (!data) {
        const { data: newXpData, error: insertError } = await supabase
          .from('user_xp')
          .insert({
            user_id: user.id,
            total_xp: 0,
            current_level: 'Bronze'
          })
          .select('*')
          .single();
          
        if (insertError) throw insertError;
        
        if (newXpData) {
          setTotalXp(newXpData.total_xp);
          setUserLevel(newXpData.current_level);
          calculateNextLevelProgress(newXpData.total_xp, newXpData.current_level);
        }
      } else {
        setTotalXp(data.total_xp);
        setUserLevel(data.current_level);
        calculateNextLevelProgress(data.total_xp, data.current_level);
      }
    } catch (error) {
      console.error('Error fetching user XP:', error);
    }
  };

  const calculateNextLevelProgress = (xp: number, level: string) => {
    // Define XP thresholds for each level
    const thresholds = {
      'Bronze': { min: 0, max: 500 },
      'Silver': { min: 500, max: 1500 },
      'Gold': { min: 1500, max: 3000 }
    };
    
    const currentThreshold = thresholds[level as keyof typeof thresholds];
    
    if (currentThreshold) {
      const levelRange = currentThreshold.max - currentThreshold.min;
      const levelProgress = xp - currentThreshold.min;
      const progressPercent = Math.min(Math.round((levelProgress / levelRange) * 100), 100);
      setNextLevelProgress(progressPercent);
    }
  };

  const startCourse = async (course: LearningContent) => {
    if (!user) {
      toast.error('Please sign in to track your progress');
      navigate('/auth');
      return;
    }
    
    // Check if user already has progress for this course
    const existingProgress = userProgress.find(p => p.course_id === course.id);
    
    if (!existingProgress) {
      try {
        // Create new progress record
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            course_id: course.id,
            completion_percent: 0,
            last_accessed: new Date().toISOString()
          });
          
        if (error) throw error;
        
        // Refresh progress
        fetchUserProgress();
        
        // Award XP for starting a new course
        await awardXp(25);
        
        toast.success('Course started!', {
          description: `You've earned 25 XP for starting a new course.`
        });
      } catch (error) {
        console.error('Error starting course:', error);
        toast.error('Failed to start course');
      }
    }
    
    // Navigate to course detail page
    navigate(`/learning/${course.id}`);
  };

  const awardXp = async (amount: number) => {
    if (!user) return;
    
    try {
      // Get current XP
      const { data, error } = await supabase
        .from('user_xp')
        .select('total_xp, current_level')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      
      const currentXp = data?.total_xp || 0;
      const newXp = currentXp + amount;
      
      // Determine new level
      let newLevel = 'Bronze';
      if (newXp >= 1500) {
        newLevel = 'Gold';
      } else if (newXp >= 500) {
        newLevel = 'Silver';
      }
      
      // Check if level up occurred
      const levelUp = data?.current_level !== newLevel;
      
      // Update XP record
      const { error: updateError } = await supabase
        .from('user_xp')
        .upsert({
          user_id: user.id,
          total_xp: newXp,
          current_level: newLevel,
          last_updated: new Date().toISOString()
        });
        
      if (updateError) throw updateError;
      
      // Update state
      setTotalXp(newXp);
      setUserLevel(newLevel);
      calculateNextLevelProgress(newXp, newLevel);
      
      // If level up, award achievement
      if (levelUp) {
        const { error: achievementError } = await supabase
          .from('user_achievements')
          .insert({
            user_id: user.id,
            badge_name: `${newLevel} Level`,
            badge_description: `Reached ${newLevel} level by earning ${newXp} XP`,
            earned_at: new Date().toISOString()
          });
          
        if (achievementError) throw achievementError;
        
        fetchUserAchievements();
        
        toast.success(`Congratulations! You've reached ${newLevel} level!`);
      }
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  };

  // Generate sample content for demonstration
  const generateSampleContent = (): Partial<LearningContent>[] => {
    return [
      {
        title: "Introduction to AI",
        description: "Demystify AI concepts and real-world applications with this comprehensive introduction.",
        image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
        required_tier: "freemium",
        category: "AI Fundamentals",
        difficulty: "Beginner",
        duration: 240, // 4 hours in minutes
        content: "This course covers what AI is, its history, types, ethics, and applications in healthcare, finance, and e-commerce. Includes hands-on project building a simple chatbot."
      },
      {
        title: "Machine Learning Basics",
        description: "Learn the fundamental concepts of machine learning without coding.",
        image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
        required_tier: "freemium",
        category: "Machine Learning",
        difficulty: "Beginner",
        duration: 360, // 6 hours in minutes
        content: "Explore supervised vs. unsupervised learning, tools like Google AutoML and Teachable Machine, and build a project to predict house prices using no-code ML tools."
      },
      {
        title: "NLP Essentials",
        description: "Master the basics of natural language processing and sentiment analysis.",
        image_url: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c",
        required_tier: "freemium",
        category: "Natural Language Processing",
        difficulty: "Intermediate",
        duration: 180, // 3 hours in minutes
        content: "Learn tokenization, stemming, TF-IDF and use Hugging Face Transformers to analyze Twitter sentiment with pre-trained models."
      },
      {
        title: "Data Visualization for Beginners",
        description: "Turn complex data into meaningful insights with visualization techniques.",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        required_tier: "basic",
        category: "Data Visualization",
        difficulty: "Beginner",
        duration: 240, // 4 hours in minutes
        content: "Use tools like Tableau Public and Google Data Studio to visualize COVID-19 trends with open datasets."
      },
      {
        title: "Automation 101",
        description: "Streamline workflows with no-code automation tools.",
        image_url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
        required_tier: "basic",
        category: "Automation",
        difficulty: "Beginner",
        duration: 180, // 3 hours in minutes
        content: "Learn to use Zapier and n8n to automate email responses using Gmail and Slack."
      },
      {
        title: "Python Basics for AI",
        description: "Build coding foundations essential for AI development.",
        image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
        required_tier: "freemium",
        category: "AI Fundamentals",
        difficulty: "Beginner",
        duration: 300, // 5 hours in minutes
        content: "Master Python basics and build a calculator and weather API fetcher using Replit."
      },
      {
        title: "Computer Vision Fundamentals",
        description: "Introduction to image processing and object detection basics.",
        image_url: "https://images.unsplash.com/photo-1575403071235-5a3aae7e4a7a",
        required_tier: "basic",
        category: "Computer Vision",
        difficulty: "Intermediate",
        duration: 360, // 6 hours in minutes
        content: "Learn the basics of computer vision including image filtering, feature extraction and simple object recognition."
      },
      {
        title: "Advanced Natural Language Processing",
        description: "Deep dive into advanced NLP techniques and transformer models.",
        image_url: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c",
        required_tier: "pro",
        category: "Natural Language Processing",
        difficulty: "Advanced",
        duration: 480, // 8 hours in minutes
        content: "Master advanced NLP concepts including fine-tuning transformer models, building chatbots, and implementing translation systems."
      },
      {
        title: "Reinforcement Learning Basics",
        description: "Learn how AI agents can learn from their environment.",
        image_url: "https://images.unsplash.com/photo-1534723452862-4c874018d66d",
        required_tier: "pro",
        category: "Reinforcement Learning",
        difficulty: "Advanced",
        duration: 420, // 7 hours in minutes
        content: "Introduction to reinforcement learning concepts, algorithms like Q-learning, and applications in games and robotics."
      },
      {
        title: "AI Ethics and Responsible Development",
        description: "Understand the ethical implications of AI systems and how to build responsibly.",
        image_url: "https://images.unsplash.com/photo-1581093458791-9d3a3f72a8f8",
        required_tier: "freemium",
        category: "AI Ethics",
        difficulty: "Beginner",
        duration: 180, // 3 hours in minutes
        content: "Explore bias in AI, privacy concerns, transparency, and guidelines for responsible AI development."
      },
      {
        title: "Deep Learning Fundamentals",
        description: "Master the basics of neural networks and deep learning architectures.",
        image_url: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
        required_tier: "basic",
        category: "Deep Learning",
        difficulty: "Intermediate",
        duration: 420, // 7 hours in minutes
        content: "Learn about neural networks, activation functions, backpropagation, and building simple deep learning models."
      },
      {
        title: "AI for Business Intelligence",
        description: "Learn how AI is transforming business analytics and decision-making.",
        image_url: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9",
        required_tier: "pro",
        category: "Business AI",
        difficulty: "Intermediate",
        duration: 300, // 5 hours in minutes
        content: "Explore how AI is used for predictive analytics, customer insights, and automated reporting in business environments."
      }
    ];
  };

  useEffect(() => {
    filterContent();
  }, [searchQuery, activeCategory, difficulty, content, userProgress]);

  const filterContent = () => {
    let filtered = [...content];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Filter by difficulty
    if (difficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === difficulty);
    }
    
    setFilteredContent(filtered);
  };

  const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-800 border-green-200',
    'Intermediate': 'bg-amber-100 text-amber-800 border-amber-200',
    'Advanced': 'bg-red-100 text-red-800 border-red-200'
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'AI Fundamentals': <Bot className="h-5 w-5" />,
    'Machine Learning': <BarChart className="h-5 w-5" />,
    'Deep Learning': <Layers className="h-5 w-5" />,
    'Natural Language Processing': <MessageSquare className="h-5 w-5" />,
    'Computer Vision': <Eye className="h-5 w-5" />,
    'Reinforcement Learning': <Flame className="h-5 w-5" />,
    'AI Ethics': <Shield className="h-5 w-5" />,
    'Data Visualization': <BarChart className="h-5 w-5" />,
    'Automation': <Cpu className="h-5 w-5" />,
    'Business AI': <LineChart className="h-5 w-5" />
  };

  const getTierBadge = (tier: string) => {
    if (tier === 'pro') {
      return (
        <Badge variant="outline" className="bg-purple-900/60 text-purple-200 border-purple-700 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#6AC8FF]" />
          <span>PRO</span>
        </Badge>
      );
    } else if (tier === 'basic') {
      return (
        <Badge variant="outline" className="bg-blue-900/60 text-blue-200 border-blue-700 px-3 py-1 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>BASIC</span>
        </Badge>
      );
    }
    return null;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  // Check if user has access to content based on required tier
  const hasAccess = (requiredTier: string): boolean => {
    if (requiredTier === 'freemium') return true;
    if (requiredTier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
    if (requiredTier === 'pro') return currentTier === 'pro';
    return false;
  };

  // Get course progress
  const getCourseProgress = (courseId: string): number => {
    const progress = userProgress.find(p => p.course_id === courseId);
    return progress ? progress.completion_percent : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 px-6 pb-12 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-xl font-medium">Loading Learning Hub...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 px-6 pb-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
              <div className="relative z-10">
                <Badge variant="outline" className="mb-4 px-3 py-1 bg-white/20 backdrop-blur-sm border-blue-200/30 text-white">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  <span>AI LEARNING PLATFORM</span>
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to the Learning Hub</h1>
                <p className="text-white/90 text-lg max-w-2xl mb-6">
                  Master AI tools and technologies with our comprehensive courses, hands-on labs, and interactive projects
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50" onClick={() => window.scrollTo({ top: document.getElementById('courses')?.offsetTop || 800, behavior: 'smooth' })}>
                    Explore Courses
                  </Button>
                  {user ? (
                    <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => window.scrollTo({ top: document.getElementById('my-progress')?.offsetTop || 500, behavior: 'smooth' })}>
                      View My Progress
                    </Button>
                  ) : (
                    <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('/auth')}>
                      Sign In to Track Progress
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
            <div className="absolute -right-24 -top-24 w-80 h-80 bg-purple-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/30 rounded-full filter blur-3xl"></div>
          </div>

          {/* User Progress Section (if logged in) */}
          {user && (
            <div id="my-progress" className="mb-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">My Learning Journey</h2>
                  <p className="text-muted-foreground">Track your progress and earn achievements</p>
                </div>
                <Button variant="outline" className="mt-2 md:mt-0">View All Progress</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* User Level Card */}
                <Card className="md:col-span-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200 dark:border-blue-900">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="relative mx-auto w-24 h-24 mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                            {userLevel === 'Bronze' && <Trophy className="h-10 w-10 text-amber-600" />}
                            {userLevel === 'Silver' && <Trophy className="h-10 w-10 text-gray-400" />}
                            {userLevel === 'Gold' && <Trophy className="h-10 w-10 text-yellow-500" />}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{userLevel} Level</h3>
                      <p className="text-muted-foreground text-sm mb-4">{totalXp} XP earned</p>
                      
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span>Progress to next level</span>
                          <span>{nextLevelProgress}%</span>
                        </div>
                        <Progress value={nextLevelProgress} className="h-2" />
                      </div>
                      
                      {userLevel === 'Bronze' && (
                        <p className="text-xs text-muted-foreground">
                          500 XP needed for Silver Level
                        </p>
                      )}
                      {userLevel === 'Silver' && (
                        <p className="text-xs text-muted-foreground">
                          1,500 XP needed for Gold Level
                        </p>
                      )}
                      {userLevel === 'Gold' && (
                        <p className="text-xs text-muted-foreground">
                          Maximum level reached!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements */}
                <Card className="md:col-span-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Gift className="h-5 w-5 mr-2 text-purple-500" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userAchievements.length > 0 ? (
                      <div className="space-y-3">
                        {userAchievements.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                              <Trophy className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{achievement.badge_name}</p>
                              <p className="text-xs text-muted-foreground">{achievement.badge_description || 'Achievement unlocked!'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Gift className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Complete courses to earn achievements!</p>
                      </div>
                    )}
                  </CardContent>
                  {userAchievements.length > 3 && (
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm">
                        View All ({userAchievements.length})
                      </Button>
                    </CardFooter>
                  )}
                </Card>
                
                {/* In Progress Courses */}
                <Card className="md:col-span-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-500" />
                      In Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userProgress.length > 0 ? (
                      <div className="space-y-4">
                        {userProgress.slice(0, 3).map((progress, index) => {
                          const course = content.find(c => c.id === progress.course_id);
                          if (!course) return null;
                          
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">{course.title}</p>
                                <span className="text-xs text-muted-foreground">{progress.completion_percent}%</span>
                              </div>
                              <Progress value={progress.completion_percent} className="h-1.5" />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No courses in progress yet!</p>
                      </div>
                    )}
                  </CardContent>
                  {userProgress.length > 3 && (
                    <CardFooter>
                      <Button variant="ghost" className="w-full text-sm">
                        View All ({userProgress.length})
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          )}
          
          {/* Featured and Popular Courses */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Featured Courses</h2>
                <p className="text-muted-foreground">Hand-picked courses to get you started</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {featuredCourses.map((course, index) => {
                const accessible = hasAccess(course.required_tier);
                const progress = getCourseProgress(course.id);
                
                return (
                  <Card key={index} className={`overflow-hidden transition-all hover:shadow-md ${!accessible ? 'grayscale opacity-80' : 'hover:scale-[1.01]'}`}>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.image_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      {!accessible && (
                        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Lock className="h-10 w-10 mx-auto mb-3 text-white/80" />
                            <p className="text-white font-medium">
                              {course.required_tier.charAt(0).toUpperCase() + course.required_tier.slice(1)} Tier Required
                            </p>
                          </div>
                        </div>
                      )}
                      {course.required_tier !== 'freemium' && (
                        <div className="absolute top-3 right-3">
                          {getTierBadge(course.required_tier)}
                        </div>
                      )}
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0">
                          <Progress value={progress} className="h-1 rounded-none" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className={difficultyColors[course.difficulty] || ''}>
                          {course.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-muted">
                          <Clock className="h-3 w-3" />
                          {formatDuration(course.duration)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{course.description}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        {categoryIcons[course.category] || <BookOpen className="h-4 w-4" />}
                        <span>{course.category}</span>
                      </div>
                      <Button 
                        variant={accessible ? "default" : "outline"}
                        onClick={() => {
                          if (accessible) {
                            startCourse(course);
                          } else {
                            navigate('/pricing');
                          }
                        }}
                      >
                        {progress > 0 ? "Continue" : (accessible ? "Start Learning" : "Upgrade")}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Popular Courses</h2>
                <p className="text-muted-foreground">Most enrolled courses this month</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularCourses.map((course, index) => {
                const accessible = hasAccess(course.required_tier);
                const progress = getCourseProgress(course.id);
                
                return (
                  <Card key={index} className={`overflow-hidden transition-all hover:shadow-md ${!accessible ? 'grayscale opacity-80' : 'hover:scale-[1.01]'}`}>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.image_url} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                      {!accessible && (
                        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Lock className="h-10 w-10 mx-auto mb-3 text-white/80" />
                            <p className="text-white font-medium">
                              {course.required_tier.charAt(0).toUpperCase() + course.required_tier.slice(1)} Tier Required
                            </p>
                          </div>
                        </div>
                      )}
                      {course.required_tier !== 'freemium' && (
                        <div className="absolute top-3 right-3">
                          {getTierBadge(course.required_tier)}
                        </div>
                      )}
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0">
                          <Progress value={progress} className="h-1 rounded-none" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className={difficultyColors[course.difficulty] || ''}>
                          {course.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-muted">
                          <Clock className="h-3 w-3" />
                          {formatDuration(course.duration)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{course.description}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        {categoryIcons[course.category] || <BookOpen className="h-4 w-4" />}
                        <span>{course.category}</span>
                      </div>
                      <Button 
                        variant={accessible ? "default" : "outline"}
                        onClick={() => {
                          if (accessible) {
                            startCourse(course);
                          } else {
                            navigate('/pricing');
                          }
                        }}
                      >
                        {progress > 0 ? "Continue" : (accessible ? "Start Learning" : "Upgrade")}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Learning Paths Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Learning Paths</h2>
                <p className="text-muted-foreground">Follow structured learning paths to master AI skills</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500/90 to-purple-600 p-6 text-white">
                  <Brain className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">AI Development Fundamentals</h3>
                  <p className="text-white/80 text-sm mt-2">4 courses • 18 hours</p>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    A structured path to master the essentials of AI development with Python and key libraries.
                  </p>
                  <Button className="w-full">Start Path</Button>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-amber-500/90 to-red-600 p-6 text-white">
                  <Eye className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">Computer Vision Specialist</h3>
                  <p className="text-white/80 text-sm mt-2">3 courses • 26 hours</p>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Master image processing, object detection, and advanced computer vision applications.
                  </p>
                  {currentTier === 'freemium' ? (
                    <Button className="w-full" variant="outline" onClick={() => navigate('/pricing')}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
                    </Button>
                  ) : (
                    <Button className="w-full">Start Path</Button>
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
                    <Button className="w-full" variant="outline" onClick={() => navigate('/pricing')}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
                    </Button>
                  ) : (
                    <Button className="w-full">Start Path</Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Course Catalog Section */}
          <div id="courses" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold">Course Catalog</h1>
                <p className="text-muted-foreground mt-1">
                  Explore our diverse collection of AI and machine learning courses
                </p>
              </div>
              <div className="w-full md:w-auto flex items-center gap-3">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search courses..." 
                    className="w-full md:w-64 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </div>
            </div>
            
            {/* Course Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Courses Available</p>
                      <p className="text-3xl font-bold">
                        {content.filter(item => hasAccess(item.required_tier)).length}
                        <span className="text-sm text-muted-foreground ml-2">of {content.length}</span>
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <BookOpen className="h-6 w-6 text-blue-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-200 dark:border-amber-900">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hours of Content</p>
                      <p className="text-3xl font-bold">
                        {Math.round(content
                          .filter(item => hasAccess(item.required_tier))
                          .reduce((acc, item) => acc + item.duration, 0) / 60)}
                        <span className="text-sm text-muted-foreground ml-2">hours</span>
                      </p>
                    </div>
                    <div className="p-3 bg-amber-500/20 rounded-full">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-200 dark:border-purple-900">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Certification Tracks</p>
                      <p className="text-3xl font-bold">
                        {currentTier === 'pro' ? 5 : currentTier === 'basic' ? 2 : 0}
                        <span className="text-sm text-muted-foreground ml-2">available</span>
                      </p>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <GraduationCap className="h-6 w-6 text-purple-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Category Tabs */}
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-4">
              <TabsList className="flex flex-wrap mb-2">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    <div className="flex items-center gap-1.5">
                      {categoryIcons[category] || <BookOpen className="h-4 w-4" />}
                      <span>{category}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge 
                variant={difficulty === 'all' ? "default" : "outline"} 
                className={`px-3 py-1.5 cursor-pointer hover:bg-muted/80 ${difficulty === 'all' ? '' : 'hover:text-foreground'}`}
                onClick={() => setDifficulty('all')}
              >
                All Levels
              </Badge>
              <Badge 
                variant={difficulty === 'Beginner' ? "default" : "outline"} 
                className={`px-3 py-1.5 cursor-pointer hover:bg-green-100 hover:text-green-800 ${
                  difficulty === 'Beginner' 
                    ? 'bg-green-500 text-white hover:bg-green-600 hover:text-white' 
                    : 'bg-green-100/50 text-green-800'
                }`}
                onClick={() => setDifficulty('Beginner')}
              >
                Beginner
              </Badge>
              <Badge 
                variant={difficulty === 'Intermediate' ? "default" : "outline"} 
                className={`px-3 py-1.5 cursor-pointer hover:bg-amber-100 hover:text-amber-800 ${
                  difficulty === 'Intermediate' 
                    ? 'bg-amber-500 text-white hover:bg-amber-600 hover:text-white' 
                    : 'bg-amber-100/50 text-amber-800'
                }`}
                onClick={() => setDifficulty('Intermediate')}
              >
                Intermediate
              </Badge>
              <Badge 
                variant={difficulty === 'Advanced' ? "default" : "outline"} 
                className={`px-3 py-1.5 cursor-pointer hover:bg-red-100 hover:text-red-800 ${
                  difficulty === 'Advanced' 
                    ? 'bg-red-500 text-white hover:bg-red-600 hover:text-white' 
                    : 'bg-red-100/50 text-red-800'
                }`}
                onClick={() => setDifficulty('Advanced')}
              >
                Advanced
              </Badge>
            </div>
            
            {currentTier === 'freemium' && (
              <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-900/50">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2 justify-center md:justify-start">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        <span>Upgrade to Access All Learning Content</span>
                      </h3>
                      <p className="text-muted-foreground">
                        Unlock {content.length - content.filter(item => item.required_tier === 'freemium').length} premium courses and certification tracks with a Basic or Pro subscription.
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate('/pricing')}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      View Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map(item => {
                const accessible = hasAccess(item.required_tier);
                const progress = getCourseProgress(item.id);
                
                return (
                  <Card key={item.id} className={`overflow-hidden transition-all hover:shadow-md ${!accessible ? 'grayscale opacity-80' : 'hover:scale-[1.01]'}`}>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      {!accessible && (
                        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                          <div className="text-center p-6">
                            <Lock className="h-10 w-10 mx-auto mb-3 text-white/80" />
                            <p className="text-white font-medium">
                              {item.required_tier.charAt(0).toUpperCase() + item.required_tier.slice(1)} Tier Required
                            </p>
                          </div>
                        </div>
                      )}
                      {item.required_tier !== 'freemium' && (
                        <div className="absolute top-3 right-3">
                          {getTierBadge(item.required_tier)}
                        </div>
                      )}
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0">
                          <Progress value={progress} className="h-1 rounded-none" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className={difficultyColors[item.difficulty] || ''}>
                          {item.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-muted">
                          <Clock className="h-3 w-3" />
                          {formatDuration(item.duration)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-amber-100/50 text-amber-800 border-amber-200">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {(Math.random() * 2 + 3).toFixed(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        {categoryIcons[item.category] || <BookOpen className="h-4 w-4" />}
                        <span>{item.category}</span>
                      </div>
                      <Button 
                        variant={accessible ? "default" : "outline"}
                        onClick={() => {
                          if (accessible) {
                            startCourse(item);
                          } else {
                            navigate('/pricing');
                          }
                        }}
                      >
                        {progress > 0 ? "Continue" : (accessible ? "Start Learning" : "Upgrade")}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            {filteredContent.length === 0 && (
              <div className="py-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No content found</h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any content matching your search criteria.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setDifficulty('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Community Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Learning Community</h2>
                <p className="text-muted-foreground">Connect with fellow learners and AI enthusiasts</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/community')}>View Community</Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-10 max-w-4xl mx-auto shadow-xl border border-blue-100/50 dark:border-blue-900/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                    <div className="relative h-40 w-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                      <div className="text-4xl font-bold text-white flex flex-col items-center">
                        <span>10K+</span>
                        <span className="text-sm font-medium mt-1">Members</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Join Our AI Learning Community</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Connect with fellow learners, participate in study groups, and get help from experts. 
                      Share your projects and get valuable feedback to accelerate your AI learning journey.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button onClick={() => navigate('/community')}>
                        <Users className="h-4 w-4 mr-2" /> Join Community
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/forums')}>
                        <MessageSquare className="h-4 w-4 mr-2" /> Browse Forums
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Study Groups */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Study Groups</h2>
                <p className="text-muted-foreground">Learn together with peers in focused study groups</p>
              </div>
              <Button variant="outline">View All Groups</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Computer Vision Explorers</CardTitle>
                  <CardDescription>A group focused on learning computer vision techniques and applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> 24 members
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> Computer Vision
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Currently working on object detection projects using YOLO and exploring OpenCV applications.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Group</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>NLP Practitioners</CardTitle>
                  <CardDescription>Exploring the latest in natural language processing and transformers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> 32 members
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> NLP
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Weekly discussions on transformer models, fine-tuning techniques, and language generation.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Group</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Python for AI Beginners</CardTitle>
                  <CardDescription>A supportive group for those starting their AI journey with Python</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> 56 members
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Code className="h-3 w-3" /> Python
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Guided learning path from Python basics to implementing simple machine learning models.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Group</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about our learning platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I track my progress?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your progress is automatically tracked as you complete lessons. Visit the "My Learning Journey" 
                    section to see your progress across all courses and learning paths.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are certificates provided upon completion?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, downloadable certificates are available for Basic and Pro tier users upon successful 
                    completion of courses and certification tracks.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I access courses on mobile devices?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, our learning platform is responsive and works on all devices including smartphones 
                    and tablets, allowing you to learn on the go.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often is new content added?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We add new courses and update existing content regularly, usually on a bi-weekly basis, 
                    to ensure you have access to the latest AI tools and techniques.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Learning Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners mastering AI skills through our structured courses and hands-on projects
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => window.scrollTo({ top: document.getElementById('courses')?.offsetTop || 800, behavior: 'smooth' })}>
                Explore Courses
              </Button>
              {!user && (
                <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
                  Create Account
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
