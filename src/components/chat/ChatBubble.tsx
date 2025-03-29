
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { User, Bot, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatContainer';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const formattedTimestamp = message.timestamp 
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : '';

  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "px-4 py-3 rounded-lg max-w-[80%] text-sm",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted dark:bg-muted/40"
      )}>
        <div className="whitespace-pre-wrap">{message.content}</div>
        {formattedTimestamp && (
          <div className={cn(
            "text-xs mt-1", 
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {formattedTimestamp}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-primary">
            <User className="h-4 w-4 text-white" />
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
