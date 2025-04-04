
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';

interface CourseDiscussionProps {
  courseId: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user: {
    username?: string;
    avatar_url?: string;
  };
}

const CourseDiscussion: React.FC<CourseDiscussionProps> = ({ courseId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  
  useEffect(() => {
    fetchComments();
  }, [courseId]);
  
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      // Using forum_replies table instead since course_discussions doesn't exist
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          id,
          content,
          created_at,
          user_id,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('topic_id', courseId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Format the data to match our Comment interface
      const formattedComments = data.map((item: any) => ({
        id: item.id,
        content: item.content,
        created_at: item.created_at,
        user_id: item.user_id,
        user: item.profiles || {}
      }));
      
      setComments(formattedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmitComment = async () => {
    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }
    
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Using forum_replies table instead
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          content: newComment,
          topic_id: courseId,
          user_id: user.id
        });
        
      if (error) throw error;
      
      toast.success("Comment posted successfully");
      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading discussions...</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Course Discussion</h2>
      
      {/* New comment form */}
      <div className="mb-8">
        <Textarea
          placeholder="Share your thoughts, questions or insights about this course..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4 min-h-24"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment}
            disabled={isSubmitting || !user}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </>
            )}
          </Button>
        </div>
        {!user && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            You need to be logged in to post comments.
          </p>
        )}
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.user.avatar_url || ''} />
                  <AvatarFallback>
                    {(comment.user.username || 'User').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{comment.user.username || 'Anonymous User'}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">No comments yet</h3>
            <p className="text-muted-foreground">Be the first to share your thoughts on this course</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDiscussion;
