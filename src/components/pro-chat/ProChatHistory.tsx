
import React from 'react';
import { History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

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
    <div className="w-64 border-r bg-muted/30 flex flex-col">
      <div className="p-3 border-b bg-muted/50 font-medium flex items-center justify-between">
        <span className="flex items-center gap-1">
          <History size={14} />
          Chat History
        </span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleHistoryPanel}>
          <X size={14} />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {isHistoryLoading ? (
          <div className="flex justify-center items-center h-20">
            <Spinner size="sm" />
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="text-center text-muted-foreground p-4 text-sm">
            No chat history found
          </div>
        ) : (
          <div className="space-y-2">
            {chatHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLoadHistoryItem(item)}
                className="w-full text-left p-2 hover:bg-muted rounded-md text-xs border border-transparent hover:border-border transition-colors"
              >
                <div className="font-medium truncate">{item.message}</div>
                <div className="text-muted-foreground text-xs mt-1">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
