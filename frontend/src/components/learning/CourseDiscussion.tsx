
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import CommentForm from './comments/CommentForm';
import CommentsList from './comments/CommentsList';
import { Comment } from './comments/types';

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
        toast("Failed to load comments. There was a problem loading the discussion thread.");
      }
    };

    if (courseId) {
      fetchComments();
    }
  }, [courseId]);

  const handleSubmitComment = async () => {
    if (!user) {
      toast("Login Required. You need to sign in to participate in discussions.");
      return;
    }

    if (!newComment.trim()) {
      toast("Empty comment. Please write something before submitting.");
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
        toast("Comment posted. Your comment has been added to the discussion.");
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast("Failed to post comment. There was a problem submitting your comment.");
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

export default CourseDiscussion;
