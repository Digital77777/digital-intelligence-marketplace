
import React from 'react';
import { Button } from '@/components/ui/button';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Key, Server } from 'lucide-react';
import apiConnectionManager from '@/utils/apiConnectionManager';

interface APIConnectionOptionsProps {
  tool: AIToolItem;
  handleConnectApi: () => void;
  handleQuickStart: () => void;
}

const APIConnectionOptions: React.FC<APIConnectionOptionsProps> = ({ 
  tool, 
  handleConnectApi, 
  handleQuickStart
}) => {
  const hasOpenSourceOption = apiConnectionManager.hasOpenSourceAlternative(tool.id);
  
  return (
    <div className="bg-muted/30 p-6 rounded-lg mb-8 w-full max-w-lg">
      <h3 className="font-semibold mb-2">Getting Started</h3>
      <p className="text-sm mb-4">
        To start using {tool.name}, you can use our built-in API or connect your own.
        {hasOpenSourceOption && " You can also use open-source models that run in your browser."}
      </p>
      
      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleQuickStart}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Server className="mr-2 h-4 w-4" />
          Quick Start
        </Button>
        
        <Button 
          onClick={handleConnectApi}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Key className="mr-2 h-4 w-4" />
          Use Custom API
        </Button>
      </div>
    </div>
  );
};

export default APIConnectionOptions;
