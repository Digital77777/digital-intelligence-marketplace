
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send, Loader2 } from 'lucide-react';

interface ProChatInputProps {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  isVoiceMode: boolean;
  isRecording: boolean;
  handleVoiceButton: () => void;
}

export const ProChatInput: React.FC<ProChatInputProps> = ({
  inputValue,
  handleInputChange,
  handleKeyPress,
  handleSendMessage,
  isLoading,
  isVoiceMode,
  isRecording,
  handleVoiceButton
}) => {
  return (
    <div className="p-3 border-t bg-background">
      <div className="flex gap-2 items-end">
        <Textarea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
          className="min-h-10 resize-none"
        />
        <div className="flex gap-2">
          {isVoiceMode && (
            <Button
              size="icon"
              variant={isRecording ? "destructive" : "secondary"}
              onClick={handleVoiceButton}
              disabled={isLoading}
              className="flex-shrink-0"
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="flex-shrink-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
