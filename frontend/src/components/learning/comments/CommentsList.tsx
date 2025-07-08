
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
}

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

export default CommentsList;
