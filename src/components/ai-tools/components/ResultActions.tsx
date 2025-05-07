
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ResultActionsProps {
  setCurrentTab: (tab: string) => void;
  handleProcess: () => void;
  isProcessing: boolean;
  hasInput: boolean;
}

const ResultActions: React.FC<ResultActionsProps> = ({ 
  setCurrentTab, 
  handleProcess, 
  isProcessing, 
  hasInput 
}) => {
  return (
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
  );
};

export default ResultActions;
