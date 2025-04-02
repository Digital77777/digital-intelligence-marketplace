
import React from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';

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
    <div className="p-3 border-t bg-background mt-auto">
      <div className="flex gap-2">
        {isVoiceMode ? (
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="icon"
            className="flex-shrink-0"
            onClick={handleVoiceButton}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
        ) : (
          <>
            <Textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
            />
            <Button 
              variant="default"
              size="icon"
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="flex-shrink-0"
            >
              {isLoading ? <Spinner size="sm" /> : <Send size={18} />}
            </Button>
          </>
        )}
      </div>
      {isVoiceMode && (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {isRecording 
            ? "Recording... Click the button again to stop." 
            : "Click the microphone button to start speaking."}
        </div>
      )}
    </div>
  );
};
