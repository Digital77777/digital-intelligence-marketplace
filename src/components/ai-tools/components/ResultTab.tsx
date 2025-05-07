
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
  return (
    <>
      {output ? (
        <Card className="flex-1">
          <CardContent className="p-4">
            {toolCategory.toLowerCase() === 'image generation' ? (
              <div className="flex items-center justify-center h-full min-h-[300px] bg-muted rounded-md">
                <p className="text-muted-foreground">{output}</p>
              </div>
            ) : (
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
