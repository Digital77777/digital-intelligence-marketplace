
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Paperclip, Send, File } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Discussion {
  id: number;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  replies: number;
  attachments?: { name: string; size: string }[];
}

interface DiscussionsTabProps {
  discussions: Discussion[];
}

export const DiscussionsTab: React.FC<DiscussionsTabProps> = ({ discussions }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      // In a real app, this would send the message to Supabase
      setNewMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Discussions</CardTitle>
        <CardDescription>Conversations, updates, and ideas from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={discussion.avatar} />
                  <AvatarFallback>{discussion.user.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{discussion.user}</h4>
                    <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                  </div>
                  <p className="text-sm mb-3">{discussion.message}</p>
                  
                  {discussion.attachments && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 mb-3">
                      {discussion.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <File className="h-4 w-4 text-blue-500" />
                          <span>{file.name}</span>
                          <span className="text-muted-foreground">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" /> 
                      Reply ({discussion.replies})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-end gap-3 w-full">
          <div className="flex-1">
            <Textarea 
              placeholder="Type your message here..." 
              className="resize-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4 mr-2" /> 
              Send
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
