
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare,
  Users,
  ThumbsUp,
  Flag,
  Reply,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ForumTopic {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  category_name?: string;
  author_username?: string;
}

interface ForumReply {
  id: string;
  content: string;
  user_id: string;
  topic_id: string;
  created_at: string;
  updated_at: string;
  is_solution: boolean;
  author_username?: string;
}

const replySchema = z.object({
  content: z.string().min(10, { message: "Reply must be at least 10 characters" })
});

const ForumTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [isLoadingTopic, setIsLoadingTopic] = useState(true);
  const [isLoadingReplies, setIsLoadingReplies] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: ''
    }
  });
  
  useEffect(() => {
    if (topicId) {
      fetchTopic();
      fetchReplies();
      incrementViewCount();
    }
  }, [topicId]);
  
  const fetchTopic = async () => {
    if (!topicId) return;
    
    setIsLoadingTopic(true);
    try {
      const { data, error } = await supabase
        .from('forum_topics')
        .select('*, forum_categories(name)')
        .eq('id', topicId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        // Get author username
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', data.user_id)
          .single();
          
        if (userError && userError.code !== 'PGRST116') throw userError;
        
        setTopic({
          ...data,
          category_name: data.forum_categories?.name || 'Unknown Category',
          author_username: userData?.username || 'Anonymous'
        });
      }
    } catch (error) {
      console.error('Error fetching topic:', error);
      toast.error("Error", {
        description: "Failed to load the topic"
      });
      navigate('/community');
    } finally {
      setIsLoadingTopic(false);
    }
  };
  
  const fetchReplies = async () => {
    if (!topicId) return;
    
    setIsLoadingReplies(true);
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      if (data) {
        // Get usernames for all replies
        const enrichedReplies = await Promise.all(
          data.map(async (reply) => {
            const { data: userData, error: userError } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', reply.user_id)
              .single();
              
            if (userError && userError.code !== 'PGRST116') console.error(userError);
            
            return {
              ...reply,
              author_username: userData?.username || 'Anonymous'
            };
          })
        );
        
        setReplies(enrichedReplies);
      }
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setIsLoadingReplies(false);
    }
  };
  
  const incrementViewCount = async () => {
    if (!topicId) return;
    
    try {
      const { error } = await supabase
        .rpc('increment_view_count', { topic_id: topicId });
        
      if (error) console.error('Error incrementing view count:', error);
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };
  
  const onSubmitReply = async (data: z.infer<typeof replySchema>) => {
    if (!user || !topicId) {
      toast.error("Authentication required", {
        description: "You must be logged in to reply"
      });
      navigate('/auth');
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
      
      toast.success("Reply posted", {
        description: "Your reply has been added to the discussion"
      });
      
      form.reset();
      fetchReplies();
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error("Error", {
        description: "Failed to post reply. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
  
  const markAsSolution = async (replyId: string) => {
    if (!user || !topicId) return;
    
    // Check if user is the topic author
    if (topic?.user_id !== user.id) {
      toast.error("Permission denied", {
        description: "Only the topic author can mark a solution"
      });
      return;
    }
    
    try {
      // First, remove solution status from any existing solution
      await supabase
        .from('forum_replies')
        .update({ is_solution: false })
        .eq('topic_id', topicId)
        .eq('is_solution', true);
      
      // Then mark the selected reply as solution
      const { error } = await supabase
        .from('forum_replies')
        .update({ is_solution: true })
        .eq('id', replyId);
        
      if (error) throw error;
      
      toast.success("Solution marked", {
        description: "The reply has been marked as the solution"
      });
      
      fetchReplies();
    } catch (error) {
      console.error('Error marking solution:', error);
      toast.error("Error", {
        description: "Failed to mark the solution. Please try again."
      });
    }
  };
  
  if (isLoadingTopic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading topic...</p>
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
        <main className="flex-1 pt-24 px-6 pb-12 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Topic Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The topic you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/community')}>
              Return to Forums
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
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/community')}
              className="self-start"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forums
            </Button>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-muted/50">
                {topic.category_name}
              </Badge>
              {topic.is_pinned && (
                <Badge variant="secondary">Pinned</Badge>
              )}
              {topic.is_locked && (
                <Badge variant="outline">Locked</Badge>
              )}
            </div>
          </div>
          
          {/* Topic */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-2xl">{topic.title}</CardTitle>
              </div>
              <CardDescription className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{topic.author_username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(topic.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{replies.length} replies</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{topic.content}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Replies */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">
              Replies {isLoadingReplies && <Loader2 className="inline-block h-4 w-4 animate-spin ml-2" />}
            </h2>
            
            {replies.length === 0 && !isLoadingReplies ? (
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Replies Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to reply to this topic.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {replies.map((reply) => (
                  <Card key={reply.id} className={reply.is_solution ? "border-green-500" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {reply.author_username?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div>
                            <CardTitle className="text-base">{reply.author_username}</CardTitle>
                            <CardDescription>{formatDate(reply.created_at)}</CardDescription>
                          </div>
                        </div>
                        {reply.is_solution && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            Solution
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{reply.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Reply className="h-4 w-4 mr-1" />
                          Quote
                        </Button>
                      </div>
                      {user && topic.user_id === user.id && !reply.is_solution && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-800"
                          onClick={() => markAsSolution(reply.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Mark as Solution
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Reply Form */}
          {!topic.is_locked ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Post a Reply</CardTitle>
                {!user && (
                  <CardDescription>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/auth');
                      }}
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </a> to post a reply
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmitReply)}>
                  <Textarea 
                    placeholder={user ? "Write your reply here..." : "Please sign in to reply"}
                    className="min-h-32 mb-4"
                    disabled={!user || isSubmitting}
                    {...form.register('content')}
                  />
                  {form.formState.errors.content && (
                    <p className="text-sm text-red-500 mb-4">
                      {form.formState.errors.content.message}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={!user || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : 'Post Reply'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
              <CardContent className="p-4 text-center">
                <p className="text-amber-800 dark:text-amber-300">
                  This topic is locked and no longer accepts replies
                </p>
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
