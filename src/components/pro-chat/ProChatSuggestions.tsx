
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProChatSuggestionsProps {
  suggestedPrompts: string[];
  handleSuggestedPrompt: (prompt: string) => void;
}

export const ProChatSuggestions: React.FC<ProChatSuggestionsProps> = ({
  suggestedPrompts,
  handleSuggestedPrompt
}) => {
  return (
    <div className="p-3 border-t">
      <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.slice(0, 3).map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-auto py-1 px-2 whitespace-nowrap"
            onClick={() => handleSuggestedPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};
