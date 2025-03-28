
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Code, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Bot,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define types for stream and comments
interface CodeSnippet {
  language: string;
  content: string;
}

interface Annotation {
  timestamp: number;
  user_id: string;
  username: string;
  content: string;
}

interface AIStream {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  thumbnail_url: string;
  video_url: string;
  duration: number;
  category: 'tutorial' | 'research' | 'demo' | 'live';
  code_snippets?: CodeSnippet[];
  annotations?: Annotation[];
  views: number;
  likes: number;
  created_at: string;
  creator_name: string;
  creator_avatar?: string;
}

interface Comment {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  content: string;
  timestamp: string;
}

// Mock data for development - will be replaced with Supabase
const mockAIStream: AIStream = {
  id: '1',
  user_id: '123',
  title: 'Fine-tuning GPT-4 for Custom Datasets',
  description: 'Learn how to fine-tune GPT-4 on your own datasets to create specialized AI models that perform better on domain-specific tasks.',
  thumbnail_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
  video_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  duration: 580, // in seconds
  category: 'tutorial',
  code_snippets: [
    {
      language: 'python',
      content: `import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, TextDataset, DataCollatorForLanguageModeling
from transformers import Trainer, TrainingArguments

# Load pre-trained model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

# Prepare dataset
dataset = TextDataset(
    tokenizer=tokenizer,
    file_path="train.txt",
    block_size=128)

data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer, 
    mlm=False)

# Set up training arguments
training_args = TrainingArguments(
    output_dir="./gpt2-finetuned",
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=4,
    save_steps=10_000,
    save_total_limit=2,
)

# Initialize trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,
)

# Start training
trainer.train()

# Save the model
model.save_pretrained("./gpt2-finetuned")`
    }
  ],
  annotations: [
    {
      timestamp: 45,
      user_id: '123',
      username: 'ai_expert',
      content: 'This is where we load the pre-trained model as our starting point'
    },
    {
      timestamp: 120,
      user_id: '123',
      username: 'ai_expert',
      content: 'Pay attention to the batch size - larger values require more GPU memory'
    }
  ],
  views: 1240,
  likes: 89,
  created_at: '2023-05-15T14:48:00.000Z',
  creator_name: 'AI Academy',
  creator_avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=aiexpert&backgroundColor=b6e3f4'
};

const mockComments: Comment[] = [
  {
    id: '1',
    user_id: '456',
    username: 'neural_ninja',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=ninja',
    content: 'Great tutorial! I was struggling with tokenization for my custom dataset. This helped a lot.',
    timestamp: '2023-05-15T15:30:00.000Z'
  },
  {
    id: '2',
    user_id: '789',
    username: 'data_scientist42',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=data42',
    content: 'Have you tried using a different learning rate? I found 5e-5 works better for domain adaptation.',
    timestamp: '2023-05-15T16:15:00.000Z'
  }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const AIStreamDetail = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const { user, profile } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();

  const [stream, setStream] = useState<AIStream | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedStreams, setRelatedStreams] = useState<AIStream[]>([]);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // This would be replaced with a Supabase query
    const fetchStream = async () => {
      try {
        // Mock data for development
        setIsLoading(true);
        
        // In a real implementation, this would be a Supabase query
        // const { data, error } = await supabase
        //   .from('ai_streams')
        //   .select('*')
        //   .eq('id', streamId)
        //   .single();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStream(mockAIStream);
        setComments(mockComments);
        
        // Also fetch related streams
        setRelatedStreams(Array(5).fill(null).map((_, i) => ({
          ...mockAIStream,
          id: `related-${i}`,
          title: `Related AI Stream ${i + 1}`,
          views: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 100)
        })));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stream:', error);
        toast.error('Failed to load stream data');
        setIsLoading(false);
      }
    };

    if (streamId) {
      fetchStream();
    }
  }, [streamId]);

  useEffect(() => {
    // Check for annotations at current timestamp
    if (stream?.annotations && currentTime > 0) {
      const currentAnnotation = stream.annotations.find(
        ann => Math.abs(ann.timestamp - currentTime) < 2
      );
      
      if (currentAnnotation && (!activeAnnotation || activeAnnotation.timestamp !== currentAnnotation.timestamp)) {
        setActiveAnnotation(currentAnnotation);
        
        // Auto-hide annotation after 5 seconds
        const timer = setTimeout(() => {
          setActiveAnnotation(null);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentTime, stream?.annotations, activeAnnotation]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleLike = () => {
    if (!user) {
      toast.error('Please sign in to like this stream');
      return;
    }
    
    toast.success('Stream liked!');
    // In a real implementation, this would update the likes in Supabase
  };

  const handleComment = () => {
    if (!commentInput.trim()) return;
    
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }
    
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      user_id: user.id,
      username: profile?.username || user.email || 'User',
      avatar_url: profile?.avatar_url || undefined,
      content: commentInput,
      timestamp: new Date().toISOString()
    };
    
    setComments([newComment, ...comments]);
    setCommentInput('');
    toast.success('Comment added!');
    // In a real implementation, this would insert the comment in Supabase
  };

  const handleShare = () => {
    // Copy the current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleBookmark = () => {
    if (!user) {
      toast.error('Please sign in to bookmark this stream');
      return;
    }
    
    toast.success('Stream bookmarked!');
    // In a real implementation, this would update bookmarks in Supabase
  };

  const handleNavigateToStream = (id: string) => {
    navigate(`/ai-streams/${id}`);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="animate-pulse space-y-4 w-full">
              <div className="bg-gray-800 h-[400px] w-full rounded-lg"></div>
              <div className="bg-gray-800 h-8 w-3/4 rounded"></div>
              <div className="bg-gray-800 h-4 w-1/2 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!stream) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <h2 className="text-2xl font-bold text-white mb-4">Stream not found</h2>
            <Button onClick={() => navigate('/ai-streams')}>
              Return to AI Streams
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-gray-900">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main video section */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                src={stream.video_url}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
              />
              
              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center mb-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white" 
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white" 
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                  
                  <div className="flex-1 mx-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
              
              {/* Annotation overlay */}
              {activeAnnotation && (
                <div className="absolute bottom-16 left-4 right-4 bg-indigo-900/80 text-white p-3 rounded-lg border border-indigo-500 shadow-lg">
                  <div className="flex items-start">
                    <Badge variant="outline" className="bg-indigo-700 mr-2 shrink-0">
                      {formatTime(activeAnnotation.timestamp)}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{activeAnnotation.username}:</p>
                      <p className="text-sm">{activeAnnotation.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">{stream.title}</h1>
              <div className="flex flex-wrap items-center justify-between gap-2 text-gray-300 text-sm mb-4">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2 bg-blue-900/30 text-blue-300 border-blue-600/30">
                    {stream.category.charAt(0).toUpperCase() + stream.category.slice(1)}
                  </Badge>
                  <span className="mr-3">{stream.views.toLocaleString()} views</span>
                  <span>{new Date(stream.created_at).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white gap-1" onClick={handleLike}>
                    <Heart className="h-4 w-4" />
                    <span>{stream.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white gap-1" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-white gap-1" onClick={handleBookmark}>
                    <Bookmark className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center py-4 border-t border-b border-gray-800">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={stream.creator_avatar} />
                  <AvatarFallback>{stream.creator_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{stream.creator_name}</p>
                  <p className="text-sm text-gray-400">AI Solutions Expert</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Follow
                </Button>
              </div>
              
              <p className="mt-4 text-gray-300">{stream.description}</p>
            </div>
            
            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="code">Code Snippets</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments" className="p-4 bg-gray-900 rounded-b-lg border border-gray-800">
                <div className="mb-4">
                  <Textarea
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white resize-none mb-2"
                  />
                  <Button onClick={handleComment} disabled={!commentInput.trim()}>
                    Comment
                  </Button>
                </div>
                
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-3 rounded-lg bg-gray-800/50">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src={comment.avatar_url} />
                          <AvatarFallback>{comment.username?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-white">{comment.username}</p>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="code" className="p-4 bg-gray-900 rounded-b-lg border border-gray-800">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {stream.code_snippets?.map((snippet, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                          <div className="flex items-center">
                            <Code className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-white font-medium">{snippet.language}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => {
                            navigator.clipboard.writeText(snippet.content);
                            toast.success('Code copied to clipboard!');
                          }}>
                            <Download className="h-4 w-4 mr-1" />
                            <span>Copy</span>
                          </Button>
                        </div>
                        <pre className="bg-gray-950 p-4 overflow-x-auto text-gray-300 text-sm">
                          <code>{snippet.content}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="related" className="p-4 bg-gray-900 rounded-b-lg border border-gray-800">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {relatedStreams.map((relatedStream) => (
                      <Card key={relatedStream.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative sm:w-40 h-32 shrink-0">
                            <img 
                              src={relatedStream.thumbnail_url} 
                              alt={relatedStream.title} 
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                              {formatTime(relatedStream.duration)}
                            </div>
                          </div>
                          <CardContent className="p-3 flex-1">
                            <h3 className="font-medium text-white line-clamp-2 mb-1">{relatedStream.title}</h3>
                            <p className="text-sm text-gray-400 mb-2">{relatedStream.creator_name}</p>
                            <div className="flex items-center text-xs text-gray-400">
                              <span className="mr-2">{relatedStream.views.toLocaleString()} views</span>
                              <span>{new Date(relatedStream.created_at).toLocaleDateString()}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2 text-blue-400" 
                              onClick={() => handleNavigateToStream(relatedStream.id)}
                            >
                              Watch now
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar with thumbnail navigation */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-medium text-white mb-4">More AI Streams</h3>
            <div className="space-y-3 sticky top-24">
              {relatedStreams.map((relatedStream) => (
                <Card 
                  key={relatedStream.id} 
                  className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => handleNavigateToStream(relatedStream.id)}
                >
                  <div className="flex">
                    <div className="relative w-32 h-24 shrink-0">
                      <img 
                        src={relatedStream.thumbnail_url} 
                        alt={relatedStream.title} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {formatTime(relatedStream.duration)}
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <h4 className="font-medium text-white text-sm line-clamp-2 mb-1">{relatedStream.title}</h4>
                      <p className="text-xs text-gray-400">{relatedStream.creator_name}</p>
                      <p className="text-xs text-gray-500 mt-1">{relatedStream.views.toLocaleString()} views</p>
                    </CardContent>
                  </div>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate('/ai-streams')}
              >
                Browse All Streams
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIStreamDetail;
