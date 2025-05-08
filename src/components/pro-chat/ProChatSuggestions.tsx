
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface ProChatSuggestionsProps {
  suggestedPrompts: string[];
  handleSuggestedPrompt: (prompt: string) => void;
}

export const ProChatSuggestions: React.FC<ProChatSuggestionsProps> = ({
  suggestedPrompts,
  handleSuggestedPrompt
}) => {
  return (
    <div className="px-3 pt-2 pb-4">
      <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
        <Lightbulb className="h-3 w-3" />
        <span>Suggested questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => handleSuggestedPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};
