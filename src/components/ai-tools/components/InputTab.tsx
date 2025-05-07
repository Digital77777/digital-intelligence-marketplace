
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface InputTabProps {
  input: string;
  setInput: (value: string) => void;
  isProcessing: boolean;
  handleProcess: () => void;
  toolCategory: string;
  buttonText: string;
}

const InputTab: React.FC<InputTabProps> = ({
  input,
  setInput,
  isProcessing,
  handleProcess,
  toolCategory,
  buttonText
}) => {
  const getPlaceholder = () => {
    switch (toolCategory.toLowerCase()) {
      case 'text tools':
        return "Enter text to summarize...";
      case 'image generation':
        return "Describe the image you want to generate...";
      case 'development':
        return "Enter code or a coding problem...";
      default:
        return "Enter text to process...";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow submitting with Enter (not in textareas)
    if (e.key === 'Enter' && !e.shiftKey && toolCategory.toLowerCase() === 'image generation') {
      e.preventDefault();
      if (!isProcessing && input.trim()) {
        handleProcess();
      }
    }
  };

  return (
    <div className="mb-4 flex-1">
      {toolCategory.toLowerCase() === 'image generation' ? (
        <div className="space-y-4">
          <Input
            placeholder="Enter a description of the image..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => setInput("A serene mountain landscape at sunset with dramatic clouds and a reflective lake")}
              size="sm"
              disabled={isProcessing}
            >
              Mountain sunset
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setInput("A futuristic cyberpunk cityscape at night with neon lights and flying vehicles")}
              size="sm"
              disabled={isProcessing}
            >
              Cyberpunk city
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setInput("A charming cottage in a magical forest with glowing mushrooms and fairy lights")}
              size="sm"
              disabled={isProcessing}
            >
              Fantasy cottage
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setInput("A colorful abstract painting with geometric shapes and vibrant colors")}
              size="sm"
              disabled={isProcessing}
            >
              Abstract art
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            <p>Try to be specific with your descriptions. Include details about style, lighting, composition, and mood.</p>
          </div>
        </div>
      ) : (
        <Textarea
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          className="w-full h-full min-h-[300px] font-mono"
        />
      )}

      <div className="flex justify-end mt-4">
        <Button 
          onClick={handleProcess} 
          disabled={isProcessing || !input.trim()}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </div>
  );
};

export default InputTab;
