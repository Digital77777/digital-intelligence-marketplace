
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, History, Trash2, Mic, MicOff } from 'lucide-react';

interface ProChatHeaderProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  toggleHistoryPanel: () => void;
  toggleChat: () => void;
  clearChat: () => void;
  toggleVoiceMode: () => void;
  isVoiceMode: boolean;
}

export const ProChatHeader: React.FC<ProChatHeaderProps> = ({
  isFullScreen,
  toggleFullScreen,
  toggleHistoryPanel,
  toggleChat,
  clearChat,
  toggleVoiceMode,
  isVoiceMode
}) => {
  return (
    <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <h3 className="font-medium text-sm">Pro AI Assistant</h3>
        </div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleVoiceMode}
        >
          {isVoiceMode ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleHistoryPanel}
        >
          <History size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={clearChat}
        >
          <Trash2 size={18} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleChat}
        >
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};
