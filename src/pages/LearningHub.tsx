
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
  ChevronRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';

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
}

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-green-100 text-green-800 border-green-200',
  'Intermediate': 'bg-amber-100 text-amber-800 border-amber-200',
  'Advanced': 'bg-red-100 text-red-800 border-red-200'
};

const categoryIcons: Record<string, React.ReactNode> = {
  'AI Fundamentals': <Bot className="h-5 w-5" />,
  'Machine Learning': <BarChart className="h-5 w-5" />,
  'Deep Learning': <Layers className="h-5 w-5" />,
  'Natural Language Processing': <BookOpen className="h-5 w-5" />
};

const LearningHub = () => {
  const [content, setContent] = useState<LearningContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<LearningContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLearningContent();
  }, [currentTier]);

  const fetchLearningContent = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_content')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setContent(data || []);
      setFilteredContent(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data?.map(item => item.category) || []));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching learning content:', error);
    }
  };

  useEffect(() => {
    filterContent();
  }, [searchQuery, activeCategory, content]);

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
    
    setFilteredContent(filtered);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Learning Hub</h1>
              <p className="text-muted-foreground mt-1">
                Enhance your AI knowledge with our curated learning resources
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search content..." 
                  className="w-full md:w-64 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  <div className="flex items-center gap-1.5">
                    {categoryIcons[category]}
                    <span>{category}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => {
              const hasAccess = canAccess(item.required_tier);
              
              return (
                <Card key={item.id} className={`overflow-hidden transition-all hover:shadow-md ${!hasAccess ? 'grayscale opacity-80' : 'hover:scale-[1.01]'}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    {!hasAccess && (
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-between">
                    <div className="flex items-center gap-1 text-sm">
                      <GraduationCap className="h-4 w-4" />
                      <span>{item.category}</span>
                    </div>
                    <Button 
                      variant={hasAccess ? "default" : "outline"}
                      onClick={() => {
                        if (hasAccess) {
                          navigate(`/learning/${item.id}`);
                        } else {
                          navigate('/pricing');
                        }
                      }}
                    >
                      {hasAccess ? "Start Learning" : "Upgrade"}
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
