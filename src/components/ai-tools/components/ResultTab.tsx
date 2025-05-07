
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from './ResultDisplay';
import ResultActions from './ResultActions';

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
            <ResultDisplay 
              output={output} 
              toolCategory={toolCategory}
              isImageOutput={isImageOutput}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
          <p className="text-muted-foreground">No result yet. Process some input first.</p>
        </div>
      )}
      
      <ResultActions 
        setCurrentTab={setCurrentTab}
        handleProcess={handleProcess}
        isProcessing={isProcessing}
        hasInput={hasInput}
      />
    </>
  );
};

export default ResultTab;
