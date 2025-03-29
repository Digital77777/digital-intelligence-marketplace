
import React from 'react';
import { Loader } from 'lucide-react'; // Changed from Spinner to Loader
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
  return (
    <div className="flex flex-col space-y-4 p-4 overflow-y-auto flex-1">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
