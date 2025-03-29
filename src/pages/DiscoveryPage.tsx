
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Code, 
  ChevronRight,
  Brain,
  Lightbulb,
  PenSquare,
  Users,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTier } from '@/context/TierContext';
import { AITool } from '@/types/tools';
import { LearningContent } from '@/types/learning';
import { convertToLearningContent } from '@/utils/dataConverters';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'tool' | 'course' | 'forum' | 'stream';
  category: string;
  required_tier: string;
  link: string;
  icon: JSX.Element;
}

const DiscoveryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([
    'machine learning', 
    'natural language processing', 
    'computer vision', 
    'AI tools for beginners',
    'neural networks'
  ]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { currentTier } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Effect to search when query changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    const query = searchQuery.toLowerCase();

    try {
      // Save search to recent searches
      if (!recentSearches.includes(searchQuery)) {
        const updatedSearches = [searchQuery, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }

      // Fetch AI tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('ai_tools')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

      if (toolsError) throw toolsError;

      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

      if (coursesError) throw coursesError;

      // Transform results
      const toolResults: SearchResult[] = (toolsData || []).map((tool: AITool) => ({
        id: tool.id,
        title: tool.name,
        description: tool.description,
        type: 'tool',
        category: tool.category,
        required_tier: tool.required_tier,
        link: `/tool/${tool.id}`,
        icon: <Code className="h-4 w-4" />
      }));

      const courseResults: SearchResult[] = (coursesData || []).map((course) => ({
        id: String(course.id),
        title: course.title,
        description: course.description || '',
        type: 'course',
        category: course.category,
        required_tier: course.required_tier,
        link: `/learning/${course.id}`,
        icon: <BookOpen className="h-4 w-4" />
      }));

      // Combine results
      const combinedResults = [...toolResults, ...courseResults];
      
      // Filter by access level
      const accessibleResults = combinedResults.filter(result => {
        if (result.required_tier === 'freemium') return true;
        if (result.required_tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) return true;
        if (result.required_tier === 'pro' && currentTier === 'pro') return true;
        return false;
      });

      // Filter by tab
      let filteredResults = accessibleResults;
      if (activeTab !== 'all') {
        filteredResults = accessibleResults.filter(result => result.type === activeTab);
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleRecentSearch = (term: string) => {
    setSearchQuery(term);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getRequiredTierBadge = (tier: string) => {
    switch (tier) {
      case 'freemium':
        return null; // No badge for freemium
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Discovery</h1>
            <p className="text-muted-foreground mb-6 text-center max-w-2xl">
              Search for AI tools, courses, community topics, and more
            </p>
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Search for tools, courses, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isLoading && (
                <div className="absolute right-3 top-3">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          {searchQuery ? (
            <div className="mt-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  <TabsTrigger value="tool">Tools</TabsTrigger>
                  <TabsTrigger value="course">Courses</TabsTrigger>
                  <TabsTrigger value="forum">Forums</TabsTrigger>
                  <TabsTrigger value="stream">Streams</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-4">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-12">
                      <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground mb-6">
                        Try using different keywords or browsing our categories
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => navigate('/ai-tools-directory')}>
                          Browse AI Tools
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/learning-hub')}>
                          Explore Learning Hub
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {searchResults.map((result) => (
                        <Card key={`${result.type}-${result.id}`} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Badge 
                                  variant="secondary" 
                                  className="mr-2 capitalize"
                                >
                                  {result.icon}
                                  <span className="ml-1">{result.type}</span>
                                </Badge>
                                {result.category && (
                                  <Badge variant="outline" className="capitalize">
                                    {result.category}
                                  </Badge>
                                )}
                                {getRequiredTierBadge(result.required_tier)}
                              </div>
                            </div>
                            <CardTitle className="text-xl mt-2">{result.title}</CardTitle>
                            <CardDescription className="line-clamp-2 mt-1">
                              {result.description}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto flex items-center text-primary" 
                              onClick={() => navigate(result.link)}
                            >
                              View details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              <div className="lg:col-span-2 space-y-8">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>Explore Categories</CardTitle>
                    <CardDescription>
                      Discover resources across different AI categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/ai-tools-directory?category=nlp')}
                      >
                        <Brain className="h-6 w-6 text-indigo-500" />
                        <span>Natural Language Processing</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/ai-tools-directory?category=computer-vision')}
                      >
                        <PenSquare className="h-6 w-6 text-green-500" />
                        <span>Computer Vision</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/ai-tools-directory?category=machine-learning')}
                      >
                        <Code className="h-6 w-6 text-blue-500" />
                        <span>Machine Learning</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/learning-hub?category=fundamentals')}
                      >
                        <BookOpen className="h-6 w-6 text-amber-500" />
                        <span>AI Fundamentals</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/forums?category=discussions')}
                      >
                        <MessageSquare className="h-6 w-6 text-purple-500" />
                        <span>Discussion Forums</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto py-4 px-3 flex flex-col items-center text-center justify-center gap-2"
                        onClick={() => navigate('/community')}
                      >
                        <Users className="h-6 w-6 text-red-500" />
                        <span>Community</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Featured Resources</CardTitle>
                    <CardDescription>
                      Explore trending AI tools, courses, and discussions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
                      <CardHeader className="pb-2">
                        <Badge className="mb-1 bg-blue-500">New</Badge>
                        <CardTitle className="text-lg">AI Tools Directory</CardTitle>
                        <CardDescription>
                          Browse our curated collection of 250+ AI tools and services
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/ai-tools-directory')}>
                          Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30">
                      <CardHeader className="pb-2">
                        <Badge className="mb-1 bg-purple-500">Featured</Badge>
                        <CardTitle className="text-lg">Learning Hub</CardTitle>
                        <CardDescription>
                          Comprehensive courses and tutorials for all AI skill levels
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/learning-hub')}>
                          Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30">
                      <CardHeader className="pb-2">
                        <Badge className="mb-1 bg-amber-500">Popular</Badge>
                        <CardTitle className="text-lg">Community Forums</CardTitle>
                        <CardDescription>
                          Join discussions with other AI enthusiasts and experts
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/forums')}>
                          Join Discussions <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-100 dark:border-green-900/30">
                      <CardHeader className="pb-2">
                        <Badge className="mb-1 bg-green-500">Trending</Badge>
                        <CardTitle className="text-lg">AI Streams</CardTitle>
                        <CardDescription>
                          Watch tutorials, demos, and live sessions from AI experts
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/ai-streams')}>
                          Watch Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Recent Searches</CardTitle>
                        <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                          Clear
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {recentSearches.map((term, index) => (
                          <li key={`recent-${index}`}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start text-left h-auto py-2"
                              onClick={() => handleRecentSearch(term)}
                            >
                              <Search className="h-4 w-4 mr-2 opacity-70" />
                              {term}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Popular Searches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {popularSearches.map((term, index) => (
                        <li key={`popular-${index}`}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left h-auto py-2"
                            onClick={() => handlePopularSearch(term)}
                          >
                            <Search className="h-4 w-4 mr-2 opacity-70" />
                            {term}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-100 dark:border-indigo-900/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                    <CardDescription>
                      Our AI assistant can help you find what you're looking for
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => navigate('/ai-assistant')}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Ask AI Assistant
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoveryPage;
