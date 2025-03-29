import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
  Code,
  BookOpen,
  FlaskConical,
  Radio
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AIStream } from '@/types/AIStreams';
import { useTier } from '@/context/TierContext';
import { createMockAIStream } from '@/utils/dataConverters';

const AIStreams = () => {
  const [streams, setStreams] = useState<AIStream[]>([]);
  const [featuredStreams, setFeaturedStreams] = useState<AIStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { currentTier, upgradePrompt } = useTier();
  const location = useLocation();

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    setIsLoading(true);
    
    try {
      // This is a mock implementation since the ai_streams table doesn't exist yet
      // We'll create mock data instead
      const mockAIStreams: AIStream[] = [
        createMockAIStream("1", "Building an NLP Model from Scratch", "123"),
        createMockAIStream("2", "Live Demo: Computer Vision Object Detection", "456"),
        createMockAIStream("3", "Research Presentation: Advances in Generative AI", "789"),
        createMockAIStream("4", "Live Coding: Building a Recommender System", "101")
      ];
      
      // Add more details to our mock data
      mockAIStreams[0].description = "Learn how to create a natural language processing model using Python and TensorFlow";
      mockAIStreams[0].category = "tutorial";
      mockAIStreams[0].duration = "45:22";
      mockAIStreams[0].views = 1250;
      mockAIStreams[0].author = {
        id: "123",
        username: "ai_enthusiast",
        avatar_url: "https://i.pravatar.cc/150?img=1"
      };
      
      mockAIStreams[1].description = "Watch as we demonstrate a real-time object detection system using computer vision";
      mockAIStreams[1].category = "demo";
      mockAIStreams[1].duration = "32:15";
      mockAIStreams[1].views = 876;
      mockAIStreams[1].author = {
        id: "456",
        username: "vision_expert",
        avatar_url: "https://i.pravatar.cc/150?img=2"
      };
      
      mockAIStreams[2].description = "A detailed presentation about the latest breakthroughs in generative artificial intelligence";
      mockAIStreams[2].category = "research";
      mockAIStreams[2].duration = "1:12:45";
      mockAIStreams[2].views = 2140;
      mockAIStreams[2].author = {
        id: "789",
        username: "research_lead",
        avatar_url: "https://i.pravatar.cc/150?img=3"
      };
      
      mockAIStreams[3].description = "Join us for a live coding session where we build a movie recommender system";
      mockAIStreams[3].category = "live";
      mockAIStreams[3].duration = "1:05:30";
      mockAIStreams[3].views = 1872;
      mockAIStreams[3].author = {
        id: "101",
        username: "code_pro",
        avatar_url: "https://i.pravatar.cc/150?img=4"
      };
      
      setStreams(mockAIStreams);
      setFeaturedStreams(mockAIStreams.slice(0, 2));
      
    } catch (error) {
      console.error("Error fetching AI streams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredStreams = () => {
    let filtered = [...streams];
    
    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(stream => stream.category === activeTab);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        stream => 
          stream.title.toLowerCase().includes(query) || 
          stream.description.toLowerCase().includes(query) ||
          (stream.author?.username.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tutorial':
        return <BookOpen className="h-4 w-4" />;
      case 'research':
        return <FlaskConical className="h-4 w-4" />;
      case 'demo':
        return <Code className="h-4 w-4" />;
      case 'live':
        return <Radio className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial':
        return "bg-blue-500";
      case 'research':
        return "bg-purple-500";
      case 'demo':
        return "bg-green-500";
      case 'live':
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Streams</h1>
                <p className="text-indigo-100 text-lg mb-6">
                  Watch tutorials, research presentations, live demos, and coding sessions from AI experts and community members.
                </p>
                {currentTier === 'pro' ? (
                  <Button className="bg-white text-purple-900 hover:bg-indigo-50">
                    Upload Your Own Stream
                  </Button>
                ) : (
                  <Button className="bg-white text-purple-900 hover:bg-indigo-50" onClick={() => upgradePrompt('pro')}>
                    Upgrade to Upload Streams
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Featured streams */}
          {featuredStreams.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Featured Streams</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredStreams.map((stream) => (
                  <Card key={stream.id} className="overflow-hidden">
                    <div className="relative h-48 bg-gray-800 flex items-center justify-center">
                      {stream.image_url ? (
                        <img 
                          src={stream.image_url} 
                          alt={stream.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-indigo-900 to-purple-900">
                          <Play className="h-16 w-16 text-white opacity-70" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <Badge 
                            className={`${getCategoryColor(stream.category)} text-white mb-2`}
                          >
                            {getCategoryIcon(stream.category)}
                            <span className="ml-1 capitalize">{stream.category}</span>
                          </Badge>
                          <h3 className="text-xl font-medium">{stream.title}</h3>
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                        {stream.duration}
                      </Badge>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground line-clamp-2">{stream.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-7 w-7">
                          {stream.author?.avatar_url ? (
                            <img src={stream.author.avatar_url} alt={stream.author.username} />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </Avatar>
                        <span className="text-sm font-medium">{stream.author?.username}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-1" /> {stream.views.toLocaleString()}
                      </div>
                    </CardFooter>
                    <Link to={`/ai-streams/${stream.id}`} className="absolute inset-0">
                      <span className="sr-only">View stream</span>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Stream browser */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <h2 className="text-2xl font-semibold">Browse Streams</h2>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search streams..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Most recent</DropdownMenuItem>
                    <DropdownMenuItem>Most viewed</DropdownMenuItem>
                    <DropdownMenuItem>Highest rated</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="demo">Demos</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
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
                  <>
                    {getFilteredStreams().length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium mb-2">No streams found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredStreams().map((stream) => (
                          <Card key={stream.id} className="overflow-hidden relative group">
                            <div className="relative h-40 bg-gray-800">
                              {stream.image_url ? (
                                <img 
                                  src={stream.image_url} 
                                  alt={stream.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-800 to-gray-900">
                                  <Play className="h-12 w-12 text-white opacity-50" />
                                </div>
                              )}
                              <Badge 
                                className="absolute top-3 left-3 capitalize"
                                variant="secondary"
                              >
                                {getCategoryIcon(stream.category)}
                                <span className="ml-1">{stream.category}</span>
                              </Badge>
                              {stream.duration && (
                                <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {stream.duration}
                                </Badge>
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Button variant="secondary" size="sm" className="h-9">
                                  <Play className="h-4 w-4 mr-2" />
                                  Play
                                </Button>
                              </div>
                            </div>
                            <CardContent className="pt-4">
                              <h3 className="font-medium line-clamp-1 mb-1">{stream.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{stream.description}</p>
                            </CardContent>
                            <CardFooter className="border-t pt-4 flex justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  {stream.author?.avatar_url ? (
                                    <img src={stream.author.avatar_url} alt={stream.author.username} />
                                  ) : (
                                    <User className="h-3 w-3" />
                                  )}
                                </Avatar>
                                <span className="text-xs font-medium">{stream.author?.username}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" /> {stream.views.toLocaleString()}
                                </span>
                                <span>{formatDate(stream.created_at)}</span>
                              </div>
                            </CardFooter>
                            <Link to={`/ai-streams/${stream.id}`} className="absolute inset-0">
                              <span className="sr-only">View {stream.title}</span>
                            </Link>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Pro upgrade banner */}
          {currentTier !== 'pro' && (
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">Unlock Pro Features</h3>
                  <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                    Upgrade to Pro to upload your own AI streams, access exclusive content, and join live coding sessions with AI experts.
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
                  onClick={() => upgradePrompt('pro')}
                >
                  Upgrade to Pro
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

export default AIStreams;
