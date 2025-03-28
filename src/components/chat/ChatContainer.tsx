
import React, { useRef, useEffect } from 'react';
import { Spinner } from 'lucide-react';
import ChatBubble from './ChatBubble';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
  emptyState?: React.ReactNode;
  avatar?: string;
}

const ChatContainer = ({ messages, isLoading, emptyState, avatar }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 && !isLoading ? (
        <div className="h-full flex items-center justify-center text-center p-4">
          {emptyState || (
            <div className="text-muted-foreground">
              <p>No messages yet. Start a conversation!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id} 
              message={msg.message} 
              isUser={msg.isUser} 
              timestamp={formatTime(msg.timestamp)}
              avatar={msg.isUser ? avatar : undefined}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-muted dark:bg-muted/40 px-4 py-3 rounded-lg flex items-center">
                <Spinner className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
