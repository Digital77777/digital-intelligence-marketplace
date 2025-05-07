
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Key, Server } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import APIConnectionForm from './APIConnectionForm';
import { useToast } from '@/hooks/use-toast';
import apiConnectionManager from '@/utils/apiConnectionManager';
import AIToolInterface from './AIToolInterface';

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

  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<null | {
    apiKey: string;
    modelProvider: 'open-source' | 'api' | 'hybrid';
    useLocalModels: boolean;
  }>(null);
  const { toast } = useToast();
  
  // Check for existing connection on open
  useEffect(() => {
    if (open && tool) {
      const connection = apiConnectionManager.getConnection(tool.id);
      if (connection) {
        setConnectionDetails({
          apiKey: connection.apiKey,
          modelProvider: connection.modelProvider,
          useLocalModels: connection.useLocalModels
        });
      } else {
        setConnectionDetails(null);
      }
    }
  }, [open, tool]);
  
  const handleConnectApi = () => {
    setShowConnectionForm(true);
  };
  
  const handleApiConnectionSuccess = () => {
    setShowConnectionForm(false);
    const connection = apiConnectionManager.getConnection(tool.id);
    if (connection) {
      setConnectionDetails({
        apiKey: connection.apiKey,
        modelProvider: connection.modelProvider,
        useLocalModels: connection.useLocalModels
      });
    }
    
    toast({
      title: "Connection Successful",
      description: `Successfully connected to ${tool.name}${connection?.modelProvider === 'open-source' ? ' with open-source models' : ''}.`,
    });
  };

  const handleUpdateConfig = () => {
    setShowConnectionForm(true);
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
            
            {connectionDetails ? (
              <div className="flex items-center gap-2">
                {connectionDetails.modelProvider === 'open-source' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpdateConfig}
                    className="bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
                  >
                    <Server className="h-3.5 w-3.5 mr-1.5" />
                    Open Source
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUpdateConfig}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                  >
                    <Key className="h-3.5 w-3.5 mr-1.5" />
                    Update Config
                  </Button>
                )}
              </div>
            ) : (
              !showConnectionForm && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleConnectApi}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                >
                  <Key className="h-3.5 w-3.5 mr-1.5" />
                  Connect API
                </Button>
              )
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
            connectionDetails ? (
              <AIToolInterface 
                tool={tool} 
                connectionDetails={connectionDetails}
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
                
                <div className="bg-muted/40 rounded-lg p-6 w-full max-w-2xl">
                  <div className="text-center">
                    {apiConnectionManager.hasOpenSourceAlternative(tool.id) ? (
                      <>
                        <p className="mb-4">To use {tool.name}, you can connect your API credentials or use open-source models</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button 
                            onClick={handleConnectApi}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            variant="default"
                          >
                            <Server className="h-4 w-4 mr-2" />
                            Use Open Source Model
                          </Button>
                          <Button 
                            onClick={handleConnectApi}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            variant="default"
                          >
                            <Key className="h-4 w-4 mr-2" />
                            Connect API
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-4">To use {tool.name}, you need to connect your API credentials</p>
                        <Button 
                          onClick={handleConnectApi}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Set up API Connection
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
