
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import APIConnectionForm from './APIConnectionForm';
import { useToast } from '@/hooks/use-toast';
import apiConnectionManager from '@/utils/apiConnectionManager';
import AIToolInterface from './AIToolInterface';
import ConnectionSection from './components/ConnectionSection';
import WelcomeScreen from './components/WelcomeScreen';

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
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform';
    useLocalModels: boolean;
  }>(null);
  const { toast } = useToast();
  
  // Auto-initialize connection details when modal is opened
  useEffect(() => {
    if (open && tool) {
      // Get or initialize a platform connection for the tool
      const connection = apiConnectionManager.getConnection(tool.id);
      
      setConnectionDetails({
        apiKey: connection.apiKey,
        modelProvider: connection.modelProvider,
        useLocalModels: connection.useLocalModels
      });
    }
  }, [open, tool]);
  
  const handleConnectApi = () => {
    setShowConnectionForm(true);
  };
  
  const handleQuickStart = () => {
    // Set up platform API connection
    apiConnectionManager.storeConnection(
      tool.id,
      apiConnectionManager.getPlatformAPIKey(tool.id),
      undefined,
      'platform',
      false
    );
    
    const connection = apiConnectionManager.getConnection(tool.id);
    setConnectionDetails({
      apiKey: connection.apiKey,
      modelProvider: connection.modelProvider,
      useLocalModels: connection.useLocalModels
    });
    
    toast({
      title: "Ready to Use",
      description: `${tool.name} is now set up with our platform API. No configuration needed.`,
    });
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
      description: `Successfully connected to ${tool.name}${connection?.modelProvider === 'open-source' ? ' with open-source models' : ''}${connection?.modelProvider === 'platform' ? ' with platform API' : ''}.`,
    });
  };

  const handleUpdateConfig = () => {
    setShowConnectionForm(true);
  };
  
  // Auto-initialize on component mount if no connection details
  useEffect(() => {
    if (open && tool && !connectionDetails) {
      handleQuickStart();
    }
  }, [open, tool, connectionDetails]);
  
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
            
            <ConnectionSection 
              connectionDetails={connectionDetails}
              showConnectionForm={showConnectionForm}
              handleConnectApi={handleConnectApi}
              handleUpdateConfig={handleUpdateConfig}
            />
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
              <div className="text-center py-4">
                <p>Initializing tool...</p>
                <Button 
                  variant="default" 
                  className="mt-2"
                  onClick={handleQuickStart}
                >
                  Quick Start
                </Button>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolInterfaceModal;
