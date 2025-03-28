
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
}

const ChatBubble = ({ message, isUser, timestamp, avatar }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-primary/10 border border-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "px-4 py-3 rounded-lg max-w-[80%] text-sm",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted dark:bg-muted/40"
      )}>
        <div className="whitespace-pre-wrap">{message}</div>
        {timestamp && (
          <div className={cn(
            "text-xs mt-1", 
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {timestamp}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-primary">
            {avatar ? (
              <img src={avatar} alt="User" />
            ) : (
              <User className="h-4 w-4 text-white" />
            )}
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
