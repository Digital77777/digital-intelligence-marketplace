
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  Users, 
  ThumbsUp, 
  Check, 
  Flag, 
  Reply, 
  Loader2
} from 'lucide-react';

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  user_id: string;
  author_username: string;
  author_avatar_url: string | null;
  category_id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
}

interface ForumReply {
  id: string;
  content: string;
  user_id: string;
  author_username: string;
  author_avatar_url: string | null;
  topic_id: string;
  created_at: string;
  updated_at: string;
  is_solution: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const replySchema = z.object({
  content: z.string().min(10, { message: "Reply must be at least 10 characters" })
});

type ReplyFormValues = z.infer<typeof replySchema>;

const ForumTopic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [isLoadingTopic, setIsLoadingTopic] = useState(true);
  const [isLoadingReplies, setIsLoadingReplies] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: ''
    }
  });

  useEffect(() => {
    const fetchTopic = async () => {
      setIsLoadingTopic(true);
      try {
        if (!topicId) return;
        
        const { data: topicData, error: topicError } = await supabase
          .from('forum_topics')
          .select(`
            *,
            profiles:user_id(username, avatar_url),
            forum_categories:category_id(name)
          `)
          .eq('id', topicId)
          .single();
        
        if (topicError) throw topicError;
        
        const formattedTopic: ForumTopic = {
          id: topicData.id,
          title: topicData.title,
          content: topicData.content,
          user_id: topicData.user_id,
          author_username: topicData.profiles?.username || 'Unknown User',
          author_avatar_url: topicData.profiles?.avatar_url,
          category_id: topicData.category_id,
          category_name: topicData.forum_categories?.name || 'Unknown Category',
          created_at: topicData.created_at,
          updated_at: topicData.updated_at,
          views: topicData.views,
          is_pinned: topicData.is_pinned,
          is_locked: topicData.is_locked
        };
        
        setTopic(formattedTopic);
        
        // Update view count
        await supabase
          .from('forum_topics')
          .update({ views: topicData.views + 1 })
          .eq('id', topicId);
          
      } catch (error) {
        console.error('Error fetching topic:', error);
        toast.error('Failed to load topic');
      } finally {
        setIsLoadingTopic(false);
      }
    };
    
    const fetchReplies = async () => {
      setIsLoadingReplies(true);
      try {
        if (!topicId) return;
        
        const { data, error } = await supabase
          .from('forum_replies')
          .select(`
            *,
            profiles:user_id(username, avatar_url)
          `)
          .eq('topic_id', topicId)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        const formattedReplies: ForumReply[] = data.map(reply => ({
          id: reply.id,
          content: reply.content,
          user_id: reply.user_id,
          author_username: reply.profiles?.username || 'Unknown User',
          author_avatar_url: reply.profiles?.avatar_url,
          topic_id: reply.topic_id,
          created_at: reply.created_at,
          updated_at: reply.updated_at,
          is_solution: reply.is_solution
        }));
        
        setReplies(formattedReplies);
      } catch (error) {
        console.error('Error fetching replies:', error);
        toast.error('Failed to load replies');
      } finally {
        setIsLoadingReplies(false);
      }
    };
    
    fetchTopic();
    fetchReplies();
  }, [topicId]);
  
  const markAsSolution = async (replyId: string) => {
    try {
      if (!topic || !user) return;
      
      // Only the topic author can mark a reply as solution
      if (topic.user_id !== user.id) {
        toast.error("Permission denied", {
          description: "Only the topic author can mark a solution"
        });
        return;
      }
      
      // Update the reply is_solution status
      const { error } = await supabase
        .from('forum_replies')
        .update({ is_solution: true })
        .eq('id', replyId)
        .eq('topic_id', topic.id);
      
      if (error) throw error;
      
      // Update local state
      setReplies(replies.map(reply => 
        reply.id === replyId 
          ? { ...reply, is_solution: true } 
          : { ...reply, is_solution: false }
      ));
      
      toast.success("Solution marked", {
        description: "This reply has been marked as the solution"
      });
    } catch (error) {
      console.error('Error marking solution:', error);
      toast.error('Failed to mark solution');
    }
  };
  
  const onSubmitReply = async (data: ReplyFormValues) => {
    if (!user || !topicId) {
      toast.error("Authentication required", {
        description: "You must be logged in to reply"
      });
      return;
    }
    
    if (topic?.is_locked) {
      toast.error("Topic locked", {
        description: "This topic is locked and cannot receive new replies"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          content: data.content,
          user_id: user.id,
          topic_id: topicId
        });
      
      if (error) throw error;
      
      // Reset form
      form.reset();
      
      // Fetch updated replies
      const { data: newReplies, error: fetchError } = await supabase
        .from('forum_replies')
        .select(`
          *,
          profiles:user_id(username, avatar_url)
        `)
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      const formattedReplies: ForumReply[] = newReplies.map(reply => ({
        id: reply.id,
        content: reply.content,
        user_id: reply.user_id,
        author_username: reply.profiles?.username || 'Unknown User',
        author_avatar_url: reply.profiles?.avatar_url,
        topic_id: reply.topic_id,
        created_at: reply.created_at,
        updated_at: reply.updated_at,
        is_solution: reply.is_solution
      }));
      
      setReplies(formattedReplies);
      
      toast.success('Reply posted successfully');
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to post reply');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoadingTopic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12">
          <div className="max-w-5xl mx-auto text-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading topic...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12">
          <div className="max-w-5xl mx-auto text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
            <p className="text-muted-foreground mb-6">The topic you're looking for might have been removed or doesn't exist.</p>
            <Button onClick={() => navigate('/forums')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forums
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={() => navigate('/forums')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forums
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-muted/50">
                {topic?.category_name}
              </Badge>
              {topic?.is_pinned && (
                <Badge variant="secondary">Pinned</Badge>
              )}
              {topic?.is_locked && (
                <Badge variant="outline">Locked</Badge>
              )}
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-2xl">{topic?.title}</CardTitle>
              </div>
              <CardDescription className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{topic?.author_username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{topic ? formatDate(topic.created_at) : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{replies.length} replies</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{topic?.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={topic.author_avatar_url || undefined} />
                  <AvatarFallback>{topic.author_username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{topic.author_username}</p>
                  <p className="text-xs text-muted-foreground">Topic Author</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-bold">
              Replies <span className="text-muted-foreground">({replies.length})</span>
            </h2>
            
            {isLoadingReplies ? (
              <div className="text-center py-10">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-muted-foreground">Loading replies...</p>
              </div>
            ) : replies.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground mb-2">No replies yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to reply to this topic!</p>
                </CardContent>
              </Card>
            ) : (
              replies.map((reply, index) => (
                <Card key={reply.id} className={reply.is_solution ? "border-green-500" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author_avatar_url || undefined} />
                          <AvatarFallback>{reply.author_username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{reply.author_username}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(reply.created_at)}</p>
                        </div>
                      </div>
                      {reply.is_solution && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Solution
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Flag className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground"
                        onClick={() => {
                          form.setValue('content', `> ${reply.content.slice(0, 100)}${reply.content.length > 100 ? '...' : ''}\n\n`);
                        }}
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Quote
                      </Button>
                    </div>
                    {user && topic?.user_id === user.id && !reply.is_solution && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markAsSolution(reply.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Solution
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
          
          {/* Reply Form */}
          {!topic?.is_locked ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post a Reply</CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitReply)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Write your reply here..."
                                className="min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Post Reply
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">You must be logged in to reply</p>
                    <Button onClick={() => navigate('/auth')}>Sign In to Reply</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground mb-2">This topic is locked</p>
                <p className="text-sm text-muted-foreground">New replies cannot be posted at this time</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumTopic;
