
import React, { useRef, useEffect } from 'react';
import { Loader } from 'lucide-react'; 
import ChatBubble from './ChatBubble';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto flex-1">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
          <p className="mb-4">No messages yet. Start a conversation!</p>
          <p className="text-sm">Ask about platform features, AI tools, or how to use specific functionalities.</p>
        </div>
      )}
      
      {messages.map((message) => (
        <ChatBubble 
          key={message.id} 
          message={message}
        />
      ))}
      
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatContainer;
