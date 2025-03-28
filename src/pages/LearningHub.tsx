
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
  Star
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

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

const LearningHub = () => {
  const [content, setContent] = useState<LearningContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<LearningContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLearningContent();
  }, [currentTier]);

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
      } else {
        setContent(data);
        setFilteredContent(data);
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
      }
    ];
  };

  useEffect(() => {
    filterContent();
  }, [searchQuery, activeCategory, difficulty, content]);

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
    'Natural Language Processing': <BookOpen className="h-5 w-5" />,
    'Computer Vision': <BookOpen className="h-5 w-5" />,
    'Reinforcement Learning': <Flame className="h-5 w-5" />,
    'AI Ethics': <Shield className="h-5 w-5" />,
    'Data Visualization': <BarChart className="h-5 w-5" />,
    'Automation': <Flame className="h-5 w-5" />
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Learning Hub</h1>
              <p className="text-muted-foreground mt-1">
                Enhance your AI knowledge with our curated learning resources
              </p>
            </div>
            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search content..." 
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
                          navigate(`/learning/${item.id}`);
                        } else {
                          navigate('/pricing');
                        }
                      }}
                    >
                      {accessible ? "Start Learning" : "Upgrade"}
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
      </main>
      <Footer />
    </div>
  );
};

export default LearningHub;
