
import React from 'react';
import { Sparkles, History, MoreVertical, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
        <Avatar className="h-8 w-8 bg-primary-foreground/10">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">Pro AI Assistant</h3>
        </div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleHistoryPanel}
        >
          <History size={16} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={clearChat}>Clear Chat</DropdownMenuItem>
            <DropdownMenuItem onClick={toggleVoiceMode}>
              {isVoiceMode ? "Switch to Text Input" : "Switch to Voice Input"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={toggleFullScreen}
        >
          {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" 
          onClick={toggleChat}
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};
