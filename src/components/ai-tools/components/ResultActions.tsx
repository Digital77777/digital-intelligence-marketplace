
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Save, Share } from 'lucide-react';
import { toast } from 'sonner';

interface ResultActionsProps {
  setCurrentTab: (tab: string) => void;
  handleProcess: () => void;
  handleSave: () => void;
  isProcessing: boolean;
  hasInput: boolean;
  output?: string;
}

const ResultActions: React.FC<ResultActionsProps> = ({ 
  setCurrentTab, 
  handleProcess, 
  handleSave,
  isProcessing, 
  hasInput,
  output
}) => {
  const handleDownload = () => {
    if (!output) {
      toast("No content to save");
      return;
    }
    
    try {
      // Create a blob from the content
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `ai-result-${new Date().toISOString().slice(0, 10)}.txt`;
      
      // Trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      
      toast("Result saved to your device");
    } catch (error) {
      console.error("Error saving file:", error);
      toast.error("Failed to save file");
    }
  };
  
  return (
    <div className="flex justify-end mt-4 gap-2">
      <Button variant="outline" onClick={() => setCurrentTab('input')}>
        Back to Input
      </Button>
      <Button 
        variant="outline" 
        onClick={handleSave}
      >
        <Save className="mr-2 h-4 w-4" />
        Save to Library
      </Button>
      <Button 
        variant="outline" 
        onClick={handleDownload}
        disabled={!output}
      >
        <Download className="mr-2 h-4 w-4" />
        Download
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
