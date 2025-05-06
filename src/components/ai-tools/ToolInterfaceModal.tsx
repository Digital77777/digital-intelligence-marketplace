
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Key } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import APIConnectionForm from './APIConnectionForm';
import { useToast } from '@/hooks/use-toast';

interface ToolInterfaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: AIToolItem | null;
}

const ToolInterfaceModal: React.FC<ToolInterfaceModalProps> = ({
  open,
  onOpenChange,
  tool
}) => {
  // Early return if no tool selected
  if (!tool) {
    return null;
  }

  const [apiConnected, setApiConnected] = useState(false);
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const { toast } = useToast();
  
  const handleConnectApi = () => {
    setShowConnectionForm(true);
  };
  
  const handleApiConnectionSuccess = () => {
    setShowConnectionForm(false);
    setApiConnected(true);
    toast({
      title: "API Connected",
      description: `Successfully connected to ${tool.name} API.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="text-lg font-medium">
                {tool.name}
              </DialogTitle>
            </div>
            
            {!apiConnected && !showConnectionForm && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleConnectApi}
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
              >
                <Key className="h-3.5 w-3.5 mr-1.5" />
                Connect API
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="flex-grow overflow-auto p-6">
          {showConnectionForm ? (
            <APIConnectionForm 
              tool={tool}
              onSuccess={handleApiConnectionSuccess}
              onCancel={() => setShowConnectionForm(false)}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4 text-3xl">
                {tool.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">Welcome to {tool.name}</h3>
              <p className="text-center text-muted-foreground max-w-md mb-6">
                {tool.description}
              </p>
              
              {!apiConnected ? (
                <div className="bg-muted/40 rounded-lg p-6 w-full max-w-2xl">
                  <div className="text-center">
                    <p className="mb-4">To use {tool.name}, you need to connect your API credentials</p>
                    <Button 
                      onClick={handleConnectApi}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Set up API Connection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/40 rounded-lg p-6 w-full max-w-2xl">
                  <p className="text-center mb-4">Tool interface would appear here</p>
                  <p className="text-sm text-muted-foreground text-center">
                    This is a placeholder for the {tool.name} interface.
                    In a production environment, this would be replaced with the actual tool UI.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
