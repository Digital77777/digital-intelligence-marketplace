
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ResultDisplayProps {
  output: string;
  toolCategory: string;
  isImageOutput: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  output, 
  toolCategory, 
  isImageOutput 
}) => {
  if (isImageOutput) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] p-2">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    );
  }
  
  if (toolCategory.toLowerCase() === 'image generation' && !isImageOutput) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] bg-muted/30 rounded-md">
        <p className="text-muted-foreground">{output || "Processing image generation..."}</p>
      </div>
    );
  }
  
  return (
    <pre className="whitespace-pre-wrap font-mono text-sm h-full min-h-[300px] overflow-auto p-4">
      {output}
    </pre>
  );
};

export default ResultDisplay;
