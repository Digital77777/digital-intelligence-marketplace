
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Pin, FileText, Plus, Send } from 'lucide-react';
import { Discussion } from './types';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

interface DiscussionsTabProps {
  discussions: Discussion[];
}

const DiscussionsTab: React.FC<DiscussionsTabProps> = ({ discussions }) => {
  const { user } = useUser();
  const [newDiscussion, setNewDiscussion] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.trim() || !user) return;

    setIsCreating(true);
    try {
      // Get user's first team (in a real app, you'd let them select)
      const { data: teamMembership } = await supabase
        .from('team_memberships')
        .select('team_id')
        .eq('user_id', user.id)
        .limit(1)
        .single();

      if (!teamMembership) {
        toast.error('You need to be part of a team to create discussions');
        return;
      }

      const { error } = await supabase
        .from('discussions')
        .insert({
          content: newDiscussion,
          author_id: user.id,
          team_id: teamMembership.team_id,
          discussion_type: 'general'
        });

      if (error) throw error;

      setNewDiscussion('');
      toast.success('Discussion created successfully!');
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast.error('Failed to create discussion');
    } finally {
      setIsCreating(false);
    }
  };

  const getDiscussionTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'question': return 'bg-yellow-100 text-yellow-800';
      case 'feedback': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Team Discussions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Start a discussion with your team..."
                value={newDiscussion}
                onChange={(e) => setNewDiscussion(e.target.value)}
                className="flex-1"
                rows={3}
              />
              <Button 
                onClick={handleCreateDiscussion}
                disabled={!newDiscussion.trim() || isCreating}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h3>
                <p className="text-gray-600">Start a conversation with your team members.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={discussion.user_profiles?.avatar_url} 
                      alt={discussion.user_profiles?.full_name || discussion.user_profiles?.username}
                    />
                    <AvatarFallback>
                      {(discussion.user_profiles?.full_name || discussion.user_profiles?.username || 'U')
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {discussion.user_profiles?.full_name || discussion.user_profiles?.username}
                        </span>
                        <Badge className={getDiscussionTypeColor(discussion.discussion_type)}>
                          {discussion.discussion_type}
                        </Badge>
                        {discussion.is_pinned && (
                          <Pin className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{discussion.content}</p>
                    
                    {discussion.file_attachments && discussion.file_attachments.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-600 mb-2">Attachments:</p>
                        <div className="space-y-2">
                          {discussion.file_attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{attachment.files.original_name}</span>
                              <span className="text-xs text-gray-500">
                                ({formatFileSize(attachment.files.size_bytes)})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.reply_count} replies</span>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussionsTab;
