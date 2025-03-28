
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  PlayCircle, 
  Upload, 
  Code, 
  Filter, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Rocket,
  BookOpen,
  Laptop,
  Sparkles,
  BadgeInfo,
  Info,
  MessageSquare
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface AIStream {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: 'tutorial' | 'research' | 'demo' | 'live';
  thumbnail_url?: string;
  video_url?: string;
  duration?: number;
  code_snippets?: any; // JSONB in DB
  annotations?: any; // JSONB in DB
  tools_used?: string[];
  created_at: string;
  is_flagged?: boolean;
  author?: {
    username?: string;
    avatar_url?: string;
    tier?: string;
  };
}

const CATEGORIES = [
  { id: 'tutorial', label: 'Tutorials', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'research', label: 'Research', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'demo', label: 'Tool Demos', icon: <Laptop className="h-4 w-4" /> },
  { id: 'live', label: 'Live Training', icon: <Rocket className="h-4 w-4" /> },
];

const AIStreams = () => {
  const navigate = useNavigate();
  const { currentTier, canAccess, upgradePrompt } = useTier();
  const { user } = useUser();
  
  const [streams, setStreams] = useState<AIStream[]>([]);
  const [filteredStreams, setFilteredStreams] = useState<AIStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const canUpload = canAccess('team-dashboard'); // Basic or Pro tier
  
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        setLoading(true);
        
        // Fetch streams
        const { data: streamsData, error } = await supabase
          .from('ai_streams')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (streamsData && streamsData.length > 0) {
          // Fetch author details
          const userIds = [...new Set(streamsData.map(stream => stream.user_id))];
          
          const { data: authorsData, error: authorsError } = await supabase
            .from('profiles')
            .select('id, username, avatar_url, tier')
            .in('id', userIds);
            
          if (authorsError) throw authorsError;
          
          // Create a map of user_id to author data
          const authorMap = authorsData?.reduce((acc, author) => {
            acc[author.id] = author;
            return acc;
          }, {}) || {};
          
          // Add author data to streams
          const streamsWithAuthors = streamsData.map(stream => ({
            ...stream,
            author: authorMap[stream.user_id] || {}
          }));
          
          setStreams(streamsWithAuthors);
          setFilteredStreams(streamsWithAuthors);
        } else {
          setStreams([]);
          setFilteredStreams([]);
        }
      } catch (err) {
        console.error('Error fetching AI streams:', err);
        toast.error('Failed to load AI streams');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStreams();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('ai_streams_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ai_streams' }, (payload) => {
        console.log('Change received!', payload);
        fetchStreams(); // Refetch on any changes
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  // Filter streams based on category and search
  useEffect(() => {
    let filtered = [...streams];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(stream => stream.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stream => 
        stream.title?.toLowerCase().includes(query) || 
        stream.description?.toLowerCase().includes(query) ||
        stream.author?.username?.toLowerCase().includes(query) ||
        stream.tools_used?.some(tool => tool.toLowerCase().includes(query))
      );
    }
    
    setFilteredStreams(filtered);
  }, [streams, selectedCategory, searchQuery]);
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };
  
  const handleUpload = () => {
    if (!user) {
      toast.error('You need to sign in to upload content');
      navigate('/auth');
      return;
    }
    
    if (!canUpload) {
      upgradePrompt('basic');
      return;
    }
    
    setUploadDialogOpen(true);
  };
  
  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">AI Streams</h1>
            <p className="text-muted-foreground mt-1">
              Watch, learn, and share AI tutorials, demos, and research
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Input 
                placeholder="Search streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            {canUpload ? (
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="whitespace-nowrap">
                    <Upload className="h-4 w-4 mr-2" /> Upload Stream
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload AI Stream</DialogTitle>
                    <DialogDescription>
                      Share your AI knowledge with the community
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <p className="text-center text-muted-foreground">
                      Upload feature coming soon!
                    </p>
                    
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="w-fit mx-auto">
                        {currentTier === 'basic' ? (
                          <span>Basic: Max 10 min videos</span>
                        ) : (
                          <span>Pro: Max 60 min videos + live streaming</span>
                        )}
                      </Badge>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button onClick={() => setUploadDialogOpen(false)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button onClick={() => upgradePrompt('basic')} variant="outline">
                <Lock className="h-4 w-4 mr-2" /> Upgrade to Upload
              </Button>
            )}
          </div>
        </div>
        
        {!canUpload && (
          <div className="bg-muted/50 border rounded-lg p-4 mb-6 text-center">
            <BadgeInfo className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <h3 className="font-medium">Watch Only Access</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Freemium users can watch AI Streams but cannot upload or interact with content
            </p>
            <Button size="sm" onClick={() => navigate('/pricing')}>
              Upgrade to Basic or Pro
            </Button>
          </div>
        )}
        
        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleScroll('left')}
                disabled={scrollPosition <= 0}
                className="shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide flex-1"
                onScroll={() => scrollContainerRef.current && setScrollPosition(scrollContainerRef.current.scrollLeft)}
              >
                <TabsList className="w-fit">
                  <TabsTrigger value="all" className="flex items-center gap-1">
                    <Info className="h-4 w-4" /> All
                  </TabsTrigger>
                  
                  {CATEGORIES.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center gap-1"
                    >
                      {category.icon} {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleScroll('right')}
                disabled={!scrollContainerRef.current || scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth}
                className="shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <TabsContent value="all" className="m-0">
              <RenderStreamGrid streams={filteredStreams} loading={loading} />
            </TabsContent>
            
            {CATEGORIES.map(category => (
              <TabsContent key={category.id} value={category.id} className="m-0">
                <RenderStreamGrid 
                  streams={filteredStreams} 
                  loading={loading}
                  category={category.id} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {!loading && filteredStreams.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Streams Found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? (
                <span>No streams match your search criteria.</span>
              ) : (
                <span>Be the first to share content in this category!</span>
              )}
            </p>
            
            {canUpload && (
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" /> Upload Stream
              </Button>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

const RenderStreamGrid = ({ 
  streams, 
  loading, 
  category 
}: { 
  streams: AIStream[], 
  loading: boolean,
  category?: string
}) => {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (streams.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {streams.map((stream) => (
        <Card key={stream.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <div 
            className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-900 relative overflow-hidden"
            onClick={() => navigate(`/ai-streams/${stream.id}`)}
          >
            {stream.thumbnail_url ? (
              <img 
                src={stream.thumbnail_url} 
                alt={stream.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="h-16 w-16 text-white/30" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <PlayCircle className="h-16 w-16 text-white" />
            </div>
            
            {stream.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {Math.floor(stream.duration / 60)}:{(stream.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
            
            <Badge 
              className="absolute top-2 left-2"
              variant="secondary"
            >
              {stream.category.charAt(0).toUpperCase() + stream.category.slice(1)}
            </Badge>
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-2 mb-1" title={stream.title}>
              {stream.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
              {stream.description || 'No description provided'}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={stream.author?.avatar_url || undefined} />
                  <AvatarFallback>
                    {stream.author?.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs truncate max-w-[100px]">
                  {stream.author?.username || 'Anonymous'}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(stream.created_at), { addSuffix: true })}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-4 py-3 bg-muted/20 flex gap-2 flex-wrap">
            {stream.tools_used?.slice(0, 2).map((tool, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tool}
              </Badge>
            ))}
            
            {(stream.tools_used?.length || 0) > 2 && (
              <Badge variant="outline" className="text-xs">
                +{(stream.tools_used?.length || 0) - 2} more
              </Badge>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// Missing component definition
const Lock = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};

export default AIStreams;
