
import React from 'react';
import { Button } from '@/components/ui/button';
import { Key, Server } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import apiConnectionManager from '@/utils/apiConnectionManager';

interface WelcomeScreenProps {
  tool: AIToolItem;
  handleConnectApi: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ tool, handleConnectApi }) => {
  return (
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
  );
};

export default WelcomeScreen;
