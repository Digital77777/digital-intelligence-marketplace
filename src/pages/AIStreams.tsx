
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Upload, 
  Clock, 
  Eye, 
  MessageSquare, 
  Code, 
  Search,
  Filter,
  Plus,
  Crown,
  Lock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { AIStream } from '@/types/AIStreams';
import { toast } from 'sonner';

const AIStreams = () => {
  const [streams, setStreams] = useState<AIStream[]>([]);
  const [filteredStreams, setFilteredStreams] = useState<AIStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  const canUpload = currentTier === 'basic' || currentTier === 'pro';

  useEffect(() => {
    fetchStreams();
  }, []);

  useEffect(() => {
    filterStreams();
  }, [streams, activeCategory, searchQuery]);

  const fetchStreams = async () => {
    try {
      setIsLoading(true);
      
      // Query the ai_streams table
      const { data: streamsData, error } = await supabase
        .from('ai_streams')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      // If we have streams data, fetch the user details for each stream
      if (streamsData && streamsData.length > 0) {
        const streamsWithAuthors = await Promise.all(
          streamsData.map(async (stream) => {
            // Get author details from profiles table
            const { data: authorData } = await supabase
              .from('profiles')
              .select('id, username, avatar_url')
              .eq('id', stream.user_id)
              .single();

            return {
              ...stream,
              author: authorData || { id: stream.user_id, username: 'Anonymous' }
            };
          })
        );

        setStreams(streamsWithAuthors as AIStream[]);
        setFilteredStreams(streamsWithAuthors as AIStream[]);
      } else {
        // If no data in production, use some sample data for development
        const sampleStreams: AIStream[] = [
          {
            id: '1',
            user_id: '123',
            title: 'Building a Neural Network from Scratch',
            description: 'Learn how to implement a neural network using only NumPy and understand the math behind backpropagation.',
            category: 'tutorial',
            duration: '15 minutes',
            views: 1240,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            is_flagged: false,
            image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
            author: {
              id: '123',
              username: 'AIEnthusiast',
              avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
            }
          },
          {
            id: '2',
            user_id: '456',
            title: 'Latest Advancements in Transformer Models',
            description: 'A deep dive into recent research papers on transformer architecture improvements and their implications.',
            category: 'research',
            duration: '28 minutes',
            views: 856,
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            is_flagged: false,
            image_url: 'https://images.unsplash.com/photo-1620266757065-5814239881fd',
            author: {
              id: '456',
              username: 'ResearchPro',
              avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
            }
          },
          {
            id: '3',
            user_id: '789',
            title: 'Deploying ML Models with FastAPI',
            description: 'A step-by-step tutorial on how to create APIs for your machine learning models using FastAPI.',
            category: 'demo',
            duration: '20 minutes',
            views: 1567,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            is_flagged: false,
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            author: {
              id: '789',
              username: 'DevOpsAI',
              avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
            }
          },
          {
            id: '4',
            user_id: '101',
            title: 'Live Training: Fine-tuning GPT-4 for Medical Applications',
            description: 'Watch in real-time as we fine-tune a GPT-4 model on medical data for clinical decision support.',
            category: 'live',
            duration: '45 minutes',
            views: 2340,
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            is_flagged: false,
            image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
            author: {
              id: '101',
              username: 'MedTechAI',
              avatar_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857'
            }
          },
          {
            id: '5',
            user_id: '202',
            title: 'Computer Vision for Beginners',
            description: 'An introduction to computer vision concepts and practical examples using OpenCV and TensorFlow.',
            category: 'tutorial',
            duration: '32 minutes',
            views: 978,
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            is_flagged: false,
            image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
            author: {
              id: '202',
              username: 'VisionAI',
              avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12'
            }
          }
        ];
        
        setStreams(sampleStreams);
        setFilteredStreams(sampleStreams);
      }
    } catch (error: any) {
      console.error('Error fetching AI streams:', error.message);
      toast.error('Failed to load AI streams');
    } finally {
      setIsLoading(false);
    }
  };

  const filterStreams = () => {
    let filtered = [...streams];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(stream => stream.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stream => 
        stream.title.toLowerCase().includes(query) || 
        stream.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredStreams(filtered);
  };

  const handleCreateStream = () => {
    if (!user) {
      toast.error('Please sign in to create AI streams');
      navigate('/auth');
      return;
    }
    
    if (!canUpload) {
      toast.error('Upgrade to Basic or Pro tier to create AI streams');
      navigate('/pricing');
      return;
    }
    
    // Navigate to create stream page
    navigate('/ai-streams/create');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'tutorial':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Tutorial</Badge>;
      case 'research':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Research</Badge>;
      case 'demo':
        return <Badge className="bg-green-500 hover:bg-green-600">Demo</Badge>;
      case 'live':
        return <Badge className="bg-red-500 hover:bg-red-600">Live</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  AI Streams
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-6">
                  Discover AI tutorials, research breakdowns, and tool demonstrations from our community. 
                  Learn from experts and sharpen your AI skills.
                </p>
                <div className="flex flex-wrap gap-4">
                  {canUpload ? (
                    <Button 
                      onClick={handleCreateStream}
                      className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Create AI Stream
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate('/pricing')}
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10 flex items-center gap-2"
                    >
                      <Crown className="h-4 w-4" />
                      Upgrade to Create Streams
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 flex items-center gap-2"
                    onClick={() => navigate('/ai-streams/popular')}
                  >
                    <Eye className="h-4 w-4" />
                    Browse Popular
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search AI streams..." 
                className="pl-10 max-w-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              {canUpload && (
                <Button onClick={handleCreateStream} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create</span>
                </Button>
              )}
            </div>
          </div>

          {/* Categories Tabs */}
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="demo">Demos</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Freemium Overlay - only shown when user is on freemium tier */}
          {currentTier === 'freemium' && (
            <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-800">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Lock className="h-4 w-4 text-amber-500" /> 
                    <span>Freemium Access - Watch Only</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You can watch all AI Streams but need to upgrade to Basic or Pro tier to create and share your own content.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/pricing')} 
                  variant="outline" 
                  className="shrink-0 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          )}

          {/* AI Streams Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-24"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredStreams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStreams.map((stream) => (
                <Card key={stream.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/ai-streams/${stream.id}`} className="block">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                      {stream.image_url ? (
                        <img 
                          src={stream.image_url} 
                          alt={stream.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                          <Code className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {stream.duration || '15 min'}
                      </div>
                    </div>
                  </Link>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/ai-streams/${stream.id}`}>
                          <CardTitle className="hover:text-blue-600 transition-colors line-clamp-1">
                            {stream.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="flex items-center mt-1">
                          {stream.author?.username || 'Anonymous'} • {formatDate(stream.created_at)}
                        </CardDescription>
                      </div>
                      {getCategoryBadge(stream.category)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {stream.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {stream.views}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3.5 w-3.5 mr-1" />
                        {Math.floor(Math.random() * 50)}
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 gap-1" asChild>
                      <Link to={`/ai-streams/${stream.id}`}>
                        <Play className="h-3.5 w-3.5" />
                        <span>Watch</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Play className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-medium mb-2">No streams found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {searchQuery 
                  ? `We couldn't find any streams matching "${searchQuery}"`
                  : `No streams found in the ${activeCategory} category`
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIStreams;
