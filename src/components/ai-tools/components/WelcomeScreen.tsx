
import React from 'react';
import { Button } from '@/components/ui/button';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Key, Server } from 'lucide-react';
import apiConnectionManager from '@/utils/apiConnectionManager';

interface WelcomeScreenProps {
  tool: AIToolItem;
  handleConnectApi: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ tool, handleConnectApi }) => {
  const hasOpenSourceOption = apiConnectionManager.hasOpenSourceAlternative(tool.id);
  
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-6xl mb-6">{tool.icon}</div>
      <h2 className="text-2xl font-bold mb-2">Welcome to {tool.name}</h2>
      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
        {tool.description}
      </p>
      
      <div className="bg-muted/30 p-6 rounded-lg mb-8 w-full max-w-lg">
        <h3 className="font-semibold mb-2">Getting Started</h3>
        <p className="text-sm mb-4">
          To start using {tool.name}, you need to set up your connection preferences. 
          {hasOpenSourceOption && " You can use open-source models that run in your browser or connect to an API."}
        </p>
        
        <div className="flex justify-center gap-4">
          {hasOpenSourceOption && (
            <Button 
              onClick={() => {
                // Store open-source preference and trigger API connect form
                apiConnectionManager.storeConnection(
                  tool.id, 
                  "open-source-mode", 
                  undefined, 
                  'open-source', 
                  true
                );
                handleConnectApi();
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Server className="mr-2 h-4 w-4" />
              Use Open Source
            </Button>
          )}
          
          <Button 
            onClick={handleConnectApi}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Key className="mr-2 h-4 w-4" />
            {hasOpenSourceOption ? "Use API" : "Connect API"}
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-lg">
        <h3 className="font-semibold mb-2">What you can do with {tool.name}:</h3>
        <ul className="text-left space-y-2 mb-6">
          {tool.use_cases?.map((useCase, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WelcomeScreen;
