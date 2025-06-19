
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Suspense } from 'react';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, MessageCircle, ThumbsUp, Award, Flag, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

const ForumTopic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const { canAccess, upgradePrompt } = useTier();
  
  const [topic, setTopic] = useState<any>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topicAuthor, setTopicAuthor] = useState<any>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        
        // Fetch the topic
        const { data: topicData, error: topicError } = await supabase
          .from('forum_topics')
          .select('*')
          .eq('id', topicId)
          .single();
          
        if (topicError) throw topicError;
        setTopic(topicData);
        
        // Increment view count
        await supabase
          .from('forum_topics')
          .update({ views: (topicData.views || 0) + 1 })
          .eq('id', topicId);
        
        // Fetch replies
        const { data: repliesData, error: repliesError } = await supabase
          .from('forum_replies')
          .select('*')
          .eq('topic_id', topicId)
          .order('created_at', { ascending: true });
          
        if (repliesError) throw repliesError;
        setReplies(repliesData || []);

        // Fetch topic author
        if (topicData) {
          const { data: authorData, error: authorError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', topicData.user_id)
            .single();
            
          if (!authorError && authorData) {
            setTopicAuthor(authorData);
          }
        }

        // Fetch reply authors
        if (repliesData && repliesData.length > 0) {
          const authorIds = [...new Set(repliesData.map(reply => reply.user_id))];
          
          const { data: authorsData, error: authorsError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', authorIds);
            
          if (!authorsError && authorsData) {
            // Create a map of user_id to author data
            const authorMap = authorsData.reduce((acc, author) => {
              acc[author.id] = author;
              return acc;
            }, {});
            
            // Add author data to replies
            const repliesWithAuthors = repliesData.map(reply => ({
              ...reply,
              author: authorMap[reply.user_id] || null
            }));
            
            setReplies(repliesWithAuthors);
          }
        }
      } catch (err) {
        console.error('Error fetching topic:', err);
        setError('Failed to load the topic. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchTopic();
    }
  }, [topicId]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be signed in to reply');
      navigate('/auth');
      return;
    }
    
    if (!canAccess('basic-forum')) {
      upgradePrompt('basic');
      return;
    }
    
    if (!newReply.trim()) {
      toast.error('Reply cannot be empty');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const { data, error } = await supabase
        .from('forum_replies')
        .insert([{
          topic_id: topicId,
          user_id: user.id,
          content: newReply.trim()
        }]);
        
      if (error) throw error;
      
      toast.success('Reply posted successfully!');
      setNewReply('');
      
      // Fetch the updated replies
      const { data: updatedReplies, error: fetchError } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: true });
        
      if (fetchError) throw fetchError;
      
      // Fetch the author for the new reply
      if (updatedReplies && updatedReplies.length > 0) {
        const authorIds = [...new Set(updatedReplies.map(reply => reply.user_id))];
        
        const { data: authorsData, error: authorsError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', authorIds);
          
        if (!authorsError && authorsData) {
          // Create a map of user_id to author data
          const authorMap = authorsData.reduce((acc, author) => {
            acc[author.id] = author;
            return acc;
          }, {});
          
          // Add author data to replies
          const repliesWithAuthors = updatedReplies.map(reply => ({
            ...reply,
            author: authorMap[reply.user_id] || null
          }));
          
          setReplies(repliesWithAuthors);
        } else {
          setReplies(updatedReplies);
        }
      }
    } catch (err) {
      console.error('Error posting reply:', err);
      toast.error('Failed to post your reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const markAsSolution = async (replyId: string) => {
    if (!user || (topic && topic.user_id !== user.id)) {
      toast.error('Only the topic author can mark a solution');
      return;
    }
    
    try {
      // Reset any previous solutions
      await supabase
        .from('forum_replies')
        .update({ is_solution: false })
        .eq('topic_id', topicId);
      
      // Mark the new solution
      const { error } = await supabase
        .from('forum_replies')
        .update({ is_solution: true })
        .eq('id', replyId);
        
      if (error) throw error;
      
      // Update the local state
      setReplies(replies.map(reply => ({
        ...reply,
        is_solution: reply.id === replyId
      })));
      
      toast.success('Solution marked successfully!');
    } catch (err) {
      console.error('Error marking solution:', err);
      toast.error('Failed to mark the solution. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'unknown time';
    }
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-8" />
          <Skeleton className="h-40 w-full mb-8" />
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Topic not found'}
          </h1>
          <Button onClick={() => navigate('/forums')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forums
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/forums')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forums
        </Button>
        
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold leading-tight">{topic.title}</h1>
                <div className="flex items-center space-x-2 mt-2 text-muted-foreground text-sm">
                  {topic.is_pinned && <Badge variant="outline">Pinned</Badge>}
                  {topic.is_locked && <Badge variant="outline">Locked</Badge>}
                  <span>{formatDate(topic.created_at)}</span>
                  <span>•</span>
                  <span>{topic.views} views</span>
                  <span>•</span>
                  <span>{replies.length} replies</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10">
                  <Suspense fallback={<LoadingIndicator />}>
                    <AvatarImage src={topicAuthor?.avatar_url || undefined} />
                  </Suspense>
                  <AvatarFallback>
                    {getInitials(topicAuthor?.username || 'User')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-4">
                <div className="font-medium">{topicAuthor?.username || 'Anonymous User'}</div>
                <div className="prose max-w-none">
                  {topic.content.split('\n').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Replies ({replies.length})
        </h2>
        
        {replies.length === 0 ? (
          <Card className="mb-6 bg-muted/50">
            <CardContent className="py-6 text-center text-muted-foreground">
              No replies yet. Be the first to respond!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 mb-8">
            {replies.map((reply) => (
              <Card key={reply.id} className={reply.is_solution ? "border-green-500 border-2" : ""}>
                <CardHeader className="pb-2 pt-4">
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <Suspense fallback={<LoadingIndicator />}>
                          <AvatarImage src={reply.author?.avatar_url || undefined} />
                        </Suspense>
                        <AvatarFallback>
                          {getInitials(reply.author?.username || 'User')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{reply.author?.username || 'Anonymous User'}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(reply.created_at)}</div>
                      </div>
                    </div>
                    
                    {reply.is_solution && (
                      <Badge className="bg-green-500 text-white">
                        <Award className="mr-1 h-3 w-3" /> Solution
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="prose max-w-none">
                    {reply.content.split('\n').map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t bg-muted/20 py-2 px-6">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <ThumbsUp className="h-4 w-4 mr-1" /> Like
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <Flag className="h-4 w-4 mr-1" /> Flag
                      </Button>
                    </div>
                    
                    {user && topic.user_id === user.id && !topic.is_locked && !reply.is_solution && (
                      <Button 
                        size="sm" 
                        onClick={() => markAsSolution(reply.id)}
                        className="h-8"
                      >
                        <Award className="mr-2 h-4 w-4" /> Mark as Solution
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {!topic.is_locked ? (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-semibold">Post a Reply</h3>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReply}>
                <Textarea
                  placeholder="Write your response here..."
                  className="min-h-32 mb-4"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  disabled={!user || submitting}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!user || submitting}>
                    {submitting ? 'Posting...' : 'Post Reply'}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="bg-muted/20 text-muted-foreground text-sm">
              {!user ? (
                <div className="w-full text-center">
                  <p className="mb-2">You need to be signed in to reply</p>
                  <Button onClick={() => navigate('/auth')} size="sm">
                    Sign In / Sign Up
                  </Button>
                </div>
              ) : !canAccess('basic-forum') ? (
                <div className="w-full text-center">
                  <p className="mb-2">Upgrade to post in premium forums</p>
                  <Button onClick={() => navigate('/pricing')} size="sm">
                    View Plans
                  </Button>
                </div>
              ) : (
                <p>Be respectful and follow our community guidelines.</p>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="mb-8 bg-muted/30">
            <CardContent className="py-6 text-center text-muted-foreground">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p>This topic is locked and no longer accepts replies.</p>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ForumTopic;
