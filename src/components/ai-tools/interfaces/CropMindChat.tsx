import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Mic, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice';
  language?: string;
}

interface CropMindChatProps {
  messages: ChatMessage[];
  inputMessage: string;
  isRecording: boolean;
  onSendMessage: () => void;
  onToggleRecording: () => void;
  onInputMessageChange: (message: string) => void;
}

const CropMindChat: React.FC<CropMindChatProps> = ({
  messages,
  inputMessage,
  isRecording,
  onSendMessage,
  onToggleRecording,
  onInputMessageChange
}) => {
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          Chat with CropMind AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 mb-4 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => onInputMessageChange(e.target.value)}
            placeholder="Ask about your crops..."
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1"
          />
          <Button
            variant={isRecording ? 'destructive' : 'outline'}
            size="icon"
            onClick={onToggleRecording}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={onSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropMindChat;
