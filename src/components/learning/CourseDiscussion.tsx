
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
}

interface CourseDiscussionProps {
  courseId: string;
}

const CourseDiscussion: React.FC<CourseDiscussionProps> = ({ courseId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Use the course_feedback table which exists in the database
        const { data, error } = await supabase
          .from('course_feedback')
          .select('*')
          .eq('course_id', parseInt(courseId, 10))
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Transform data to match our Comment interface
        const formattedComments: Comment[] = (data || []).map(item => ({
          id: item.id,
          content: item.comment || '',
          created_at: item.created_at || new Date().toISOString(),
          user_id: item.user_id,
          user_name: `User ${item.user_id.substring(0, 4)}`,
          user_avatar: undefined
        })).filter(comment => comment.content); // Only include comments with content
        
        setComments(formattedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: "Failed to load comments",
          description: "There was a problem loading the discussion thread.",
          variant: "destructive",
        });
      }
    };

    if (courseId) {
      fetchComments();
    }
  }, [courseId]);

  const handleSubmitComment = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "You need to sign in to participate in discussions.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userName = user.email ? user.email.split('@')[0] : 'Anonymous';
      
      const { data, error } = await supabase
        .from('course_feedback')
        .insert({
          course_id: parseInt(courseId, 10),
          user_id: user.id,
          comment: newComment,
          rating: null // Include a null rating since we're using the feedback table
        })
        .select();

      if (error) throw error;

      // Add the new comment to the list
      if (data && data[0]) {
        const newCommentObj: Comment = {
          id: data[0].id,
          content: data[0].comment || '',
          created_at: data[0].created_at,
          user_id: data[0].user_id,
          user_name: userName
        };
        
        setComments([newCommentObj, ...comments]);
        setNewComment('');
        toast({
          title: "Comment posted",
          description: "Your comment has been added to the discussion.",
        });
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Failed to post comment",
        description: "There was a problem submitting your comment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      <CommentForm 
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmitComment={handleSubmitComment}
        isSubmitting={isSubmitting}
        user={user}
      />
      <CommentsList 
        comments={comments}
        formatDate={formatDate}
      />
    </div>
  );
};

interface CommentFormProps {
  newComment: string;
  setNewComment: (comment: string) => void;
  handleSubmitComment: () => void;
  isSubmitting: boolean;
  user: any;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  newComment, 
  setNewComment, 
  handleSubmitComment, 
  isSubmitting,
  user
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="font-medium flex items-center">
          <MessageSquare className="h-4 w-4 mr-2" />
          Join the conversation
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Share your thoughts or ask questions about this course..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] mb-3"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment} 
            disabled={isSubmitting || !newComment.trim() || !user}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface CommentsListProps {
  comments: Comment[];
  formatDate: (date: string) => string;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, formatDate }) => {
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return name.substring(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Discussion ({comments.length})</h3>
      
      {comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Be the first to start a discussion about this course!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar>
                  <AvatarImage src={comment.user_avatar} />
                  <AvatarFallback>
                    {getInitials(comment.user_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{comment.user_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </div>
                </div>
              </div>
              <Separator className="my-3" />
              <p className="text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDiscussion;
