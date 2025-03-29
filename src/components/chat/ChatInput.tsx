
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

export interface ChatInputProps {
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSubmit, 
  isLoading, 
  placeholder = "Type your message...",
  value, 
  onChange
}) => {
  const [internalMessage, setInternalMessage] = useState('');
  
  // Use external or internal state based on whether external props are provided
  const message = value !== undefined ? value : internalMessage;
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalMessage(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSubmit();
      if (!onChange) {
        setInternalMessage('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2 w-full">
      <Textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-h-[80px] max-h-[150px]"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || isLoading}
        className="h-10 w-10"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
