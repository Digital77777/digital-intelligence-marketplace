
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface ResultTabProps {
  output: string;
  setCurrentTab: (tab: string) => void;
  handleProcess: () => void;
  isProcessing: boolean;
  hasInput: boolean;
  toolCategory: string;
}

const ResultTab: React.FC<ResultTabProps> = ({
  output,
  setCurrentTab,
  handleProcess,
  isProcessing,
  hasInput,
  toolCategory
}) => {
  // Check if the output contains an HTML img tag
  const isImageOutput = output?.includes('<img');
  
  return (
    <>
      {output ? (
        <Card className="flex-1">
          <CardContent className="p-4">
            {isImageOutput ? (
              // If it's an image, render the HTML directly
              <div className="flex items-center justify-center h-full min-h-[300px] p-2">
                <div dangerouslySetInnerHTML={{ __html: output }} />
              </div>
            ) : toolCategory.toLowerCase() === 'image generation' && !isImageOutput ? (
              // If it's an image generation task but no image yet
              <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/30 rounded-md">
                <p className="text-muted-foreground">{output || "Processing image generation..."}</p>
              </div>
            ) : (
              // For text content, show pre-formatted text
              <pre className="whitespace-pre-wrap font-mono text-sm h-full min-h-[300px] overflow-auto p-4">
                {output}
              </pre>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
          <p className="text-muted-foreground">No result yet. Process some input first.</p>
        </div>
      )}
      
      <div className="flex justify-end mt-4 gap-2">
        <Button variant="outline" onClick={() => setCurrentTab('input')}>
          Back to Input
        </Button>
        <Button 
          onClick={handleProcess} 
          disabled={isProcessing || !hasInput}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Process Again"
          )}
        </Button>
      </div>
    </>
  );
};

export default ResultTab;
