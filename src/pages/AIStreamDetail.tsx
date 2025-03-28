
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  Code,
  Download,
  Copy,
  Check,
  MessageSquare,
  ThumbsUp,
  Share2,
  Flag,
  Bookmark,
  Play,
  Clock,
  Calendar,
  User,
  List,
  X,
  MessageCircle,
  Send
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CodeSnippet {
  language: string;
  content: string;
  description?: string;
}

interface Annotation {
  user_id: string;
  username?: string;
  timestamp: number;  // in seconds
  content: string;
  created_at: string;
}

interface AIStream {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: 'tutorial' | 'research' | 'demo' | 'live';
  thumbnail_url?: string;
  video_url?: string;
  duration?: number;
  code_snippets?: CodeSnippet[];
  annotations?: Annotation[];
  tools_used?: string[];
  created_at: string;
  is_flagged?: boolean;
  author?: {
    username?: string;
    avatar_url?: string;
    tier?: string;
  };
}

const AIStreamDetail = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const { currentTier, canAccess, upgradePrompt } = useTier();
  const { user } = useUser();
  
  const [stream, setStream] = useState<AIStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Placeholder data for demo
  const exampleComments = [
    {
      id: '1',
      user_id: 'user1',
      username: 'AIExpert',
      content: 'Great explanation of the transformer architecture!',
      created_at: new Date().toISOString(),
      avatar_url: null
    },
    {
      id: '2',
      user_id: 'user2',
      username: 'MLEngineer',
      content: 'I implemented this model and got 95% accuracy on my dataset. Definitely recommend it!',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      avatar_url: null
    }
  ];
  
  useEffect(() => {
    const fetchStream = async () => {
      if (!streamId) return;
      
      try {
        setLoading(true);
        
        // In a real implementation, we would fetch from the database
        // This is mocked data for now
        const mockStream: AIStream = {
          id: streamId,
          user_id: 'author-id',
          title: 'Building a GPT-4 Fine-tuned Model for Specialized Tasks',
          description: 'Learn how to fine-tune GPT-4 for domain-specific tasks and improve accuracy with custom datasets',
          category: 'tutorial',
          thumbnail_url: 'https://picsum.photos/seed/ai-stream/800/450',
          video_url: 'https://example.com/video.mp4',
          duration: 645, // 10:45
          code_snippets: [
            {
              language: 'python',
              content: 'import torch\nimport transformers\n\nmodel = transformers.AutoModelForCausalLM.from_pretrained("gpt-4")\n\n# Fine-tuning code\noptimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)\n\nfor epoch in range(3):\n    for batch in dataloader:\n        outputs = model(**batch)\n        loss = outputs.loss\n        loss.backward()\n        optimizer.step()\n        optimizer.zero_grad()',
              description: 'Basic GPT-4 fine-tuning setup with PyTorch'
            },
            {
              language: 'python',
              content: 'def preprocess_dataset(texts, labels):\n    """Preprocess text data for fine-tuning"""\n    tokenizer = transformers.AutoTokenizer.from_pretrained("gpt-4")\n    \n    # Tokenize inputs\n    tokenized = tokenizer(\n        texts,\n        padding="max_length",\n        truncation=True,\n        max_length=512,\n        return_tensors="pt"\n    )\n    \n    return {\n        "input_ids": tokenized.input_ids,\n        "attention_mask": tokenized.attention_mask,\n        "labels": torch.tensor(labels)\n    }',
              description: 'Dataset preprocessing function'
            }
          ],
          annotations: [
            {
              user_id: 'annotator-1',
              username: 'AI_Researcher',
              timestamp: 120, // 2:00
              content: 'At this point, we're loading the pre-trained model. Note that you'll need proper API access.',
              created_at: new Date().toISOString()
            },
            {
              user_id: 'annotator-2',
              username: 'ML_Engineer',
              timestamp: 305, // 5:05
              content: 'This learning rate worked best in my tests. You might need to adjust based on your dataset size.',
              created_at: new Date().toISOString()
            }
          ],
          tools_used: ['PyTorch', 'Hugging Face', 'GPT-4', 'CUDA'],
          created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
          author: {
            username: 'AIInnovator',
            avatar_url: null,
            tier: 'pro'
          }
        };
        
        setStream(mockStream);
      } catch (err) {
        console.error('Error fetching AI stream:', err);
        setError('Failed to load the stream. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStream();
  }, [streamId]);
  
  const handleCopyCode = (index: number) => {
    if (!stream?.code_snippets?.[index]) return;
    
    navigator.clipboard.writeText(stream.code_snippets[index].content);
    setCopiedSnippetIndex(index);
    
    setTimeout(() => {
      setCopiedSnippetIndex(null);
    }, 2000);
    
    toast.success('Code copied to clipboard');
  };
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be signed in to comment');
      navigate('/auth');
      return;
    }
    
    if (!canAccess('learning-hub-pro')) {
      upgradePrompt('basic');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    try {
      setSubmittingComment(true);
      
      // In a real implementation, we would save to the database
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network request
      
      toast.success('Comment posted successfully!');
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      toast.error('Failed to post your comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return name.substring(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/ai-streams')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Streams
          </Button>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <Skeleton className="aspect-video w-full rounded-lg mb-4" />
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-20 w-full" />
            </div>
            
            <div className="lg:w-1/3">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !stream) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Stream not found'}
          </h1>
          <Button onClick={() => navigate('/ai-streams')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Streams
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/ai-streams')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Streams
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main video content */}
          <div className="lg:w-2/3">
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden mb-4">
              {stream.thumbnail_url ? (
                <img 
                  src={stream.thumbnail_url} 
                  alt={stream.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-violet-900">
                  <Code className="h-24 w-24 text-white/30" />
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="rounded-full h-16 w-16 flex items-center justify-center"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              
              {/* Video progress bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2 flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-white hover:bg-white/20">
                  <Play className="h-4 w-4" />
                </Button>
                
                <div className="relative flex-1 h-1 bg-white/30 rounded-full">
                  <div className="absolute h-full bg-white rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(stream.duration || 0)}
                </span>
              </div>
              
              {/* Annotations overlay */}
              {stream.annotations?.map((annotation, index) => (
                <div 
                  key={index}
                  className="absolute left-4 bg-black/80 text-white p-2 rounded text-sm max-w-xs"
                  style={{ 
                    bottom: 40 + index * 60, 
                    display: currentTime >= annotation.timestamp ? 'block' : 'none' 
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{annotation.username}</span>
                    <span className="text-xs text-white/70">@{formatTime(annotation.timestamp)}</span>
                  </div>
                  {annotation.content}
                </div>
              ))}
            </div>
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{stream.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Badge variant="outline">
                  {stream.category.charAt(0).toUpperCase() + stream.category.slice(1)}
                </Badge>
                
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(stream.created_at), 'MMM d, yyyy')}
                </span>
                
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(stream.duration || 0)}
                </span>
                
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {stream.author?.username || 'Anonymous'}
                </span>
              </div>
              
              <p className="mt-4 text-gray-700">{stream.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {stream.tools_used?.map((tool, index) => (
                  <Badge key={index} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 mb-8">
              <Button variant="outline" className="flex-1">
                <ThumbsUp className="h-4 w-4 mr-2" /> Like
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button variant="outline" className="flex-1">
                <Bookmark className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Flag className="h-4 w-4 mr-2" /> Report
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" /> Comments
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <Textarea
                    placeholder="Add a comment..."
                    className="mb-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!user || submittingComment || !canAccess('learning-hub-pro')}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={!user || submittingComment || !canAccess('learning-hub-pro')}
                    >
                      {submittingComment ? (
                        'Posting...'
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" /> Post
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {!user ? (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      <a href="/auth" className="text-blue-600 hover:underline">Sign in</a> to comment
                    </p>
                  ) : !canAccess('learning-hub-pro') ? (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      <a href="/pricing" className="text-blue-600 hover:underline">Upgrade to Basic or Pro</a> to comment
                    </p>
                  ) : null}
                </form>
                
                <div className="space-y-6">
                  {exampleComments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar_url || undefined} />
                        <AvatarFallback>
                          {getInitials(comment.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.username}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-1">{comment.content}</p>
                        <div className="flex gap-4 mt-2">
                          <button className="text-xs text-muted-foreground hover:text-foreground">
                            Like
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-foreground">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar content */}
          <div className="lg:w-1/3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Interactive Resources</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className={`space-y-6 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Code snippets */}
              {stream.code_snippets && stream.code_snippets.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      <Code className="h-4 w-4 inline mr-2" /> Code Snippets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="0" className="w-full">
                      <TabsList className="w-full justify-start rounded-none px-4">
                        {stream.code_snippets.map((_, index) => (
                          <TabsTrigger 
                            key={index} 
                            value={index.toString()}
                            className="text-xs"
                          >
                            Snippet {index + 1}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {stream.code_snippets.map((snippet, index) => (
                        <TabsContent 
                          key={index} 
                          value={index.toString()} 
                          className="m-0 p-0"
                        >
                          <div className="p-4 pt-0">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm font-medium">
                                {snippet.language}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => handleCopyCode(index)}
                              >
                                {copiedSnippetIndex === index ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 mr-1" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                                  </>
                                )}
                              </Button>
                            </div>
                            
                            {snippet.description && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {snippet.description}
                              </p>
                            )}
                            
                            <div className="bg-muted p-3 rounded-md overflow-x-auto">
                              <pre className="text-xs">{snippet.content}</pre>
                            </div>
                            
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                <Download className="h-3.5 w-3.5 mr-1" /> Download
                              </Button>
                              
                              <Button size="sm" variant="outline" className="text-xs">
                                Fork Code
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}
              
              {/* Annotations */}
              {stream.annotations && stream.annotations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">
                      <MessageSquare className="h-4 w-4 inline mr-2" /> Annotations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-60">
                      <div className="space-y-4">
                        {stream.annotations.map((annotation, index) => (
                          <div key={index} className="border-l-2 border-primary pl-3 py-1">
                            <div className="flex justify-between items-start">
                              <div className="font-medium text-sm">{annotation.username}</div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs"
                                // In a real implementation, this would seek to the timestamp
                                onClick={() => setCurrentTime(annotation.timestamp)}
                              >
                                {formatTime(annotation.timestamp)}
                              </Button>
                            </div>
                            <p className="text-sm mt-1">{annotation.content}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
              
              {/* Author info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Creator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={stream.author?.avatar_url || undefined} />
                      <AvatarFallback>
                        {getInitials(stream.author?.username || 'User')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{stream.author?.username || 'Anonymous'}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {stream.author?.tier === 'pro' ? 'Pro' : stream.author?.tier === 'basic' ? 'Basic' : 'Freemium'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function formatDistanceToNow(date: Date, options: { addSuffix: boolean }) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return options.addSuffix ? 'just now' : 'less than a minute';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  
  if (diffInMinutes < 60) {
    return options.addSuffix ? `${diffInMinutes} minutes ago` : `${diffInMinutes} minutes`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  
  if (diffInHours < 24) {
    return options.addSuffix ? `${diffInHours} hours ago` : `${diffInHours} hours`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInDays < 30) {
    return options.addSuffix ? `${diffInDays} days ago` : `${diffInDays} days`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  
  if (diffInMonths < 12) {
    return options.addSuffix ? `${diffInMonths} months ago` : `${diffInMonths} months`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  
  return options.addSuffix ? `${diffInYears} years ago` : `${diffInYears} years`;
}

export default AIStreamDetail;
