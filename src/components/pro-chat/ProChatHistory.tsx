
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ChevronLeft, MessageCircle } from 'lucide-react';

interface ProChatHistoryProps {
  isHistoryLoading: boolean;
  chatHistory: any[];
  toggleHistoryPanel: () => void;
  handleLoadHistoryItem: (item: any) => void;
}

export const ProChatHistory: React.FC<ProChatHistoryProps> = ({
  isHistoryLoading,
  chatHistory,
  toggleHistoryPanel,
  handleLoadHistoryItem
}) => {
  return (
    <div className="w-64 border-r border-muted flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium text-sm">Chat History</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleHistoryPanel}
          className="h-6 w-6"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {isHistoryLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : chatHistory.length > 0 ? (
          <div className="p-3 space-y-2">
            {chatHistory.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => handleLoadHistoryItem(item)}
              >
                <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate text-xs">{item.message}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">No chat history</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
