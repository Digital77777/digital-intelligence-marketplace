
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, MessageSquare } from 'lucide-react';

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

export default CommentForm;
