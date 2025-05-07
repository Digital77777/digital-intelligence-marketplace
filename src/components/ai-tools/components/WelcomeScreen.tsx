
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import ToolDescription from './ToolDescription';
import APIConnectionOptions from './APIConnectionOptions';
import ToolUseCases from './ToolUseCases';
import apiConnectionManager from '@/utils/apiConnectionManager';

interface WelcomeScreenProps {
  tool: AIToolItem;
  handleConnectApi: () => void;
  handleQuickStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ tool, handleConnectApi, handleQuickStart }) => {
  // Check if the platform API is available for this tool
  const hasPlatformAPI = apiConnectionManager.hasPlatformAPI(tool.id);

  return (
    <div className="flex flex-col items-center text-center p-6">
      <ToolDescription tool={tool} />
      
      <APIConnectionOptions 
        tool={tool} 
        handleConnectApi={handleConnectApi}
        handleQuickStart={handleQuickStart}
      />
      
      <ToolUseCases tool={tool} />
      
      {hasPlatformAPI && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg max-w-lg">
          <h3 className="font-semibold mb-2">Ready to use!</h3>
          <p className="text-sm">
            This tool is ready to use with our platform API. No setup required - just click "Quick Start" to begin.
            Your results can be saved to your device after processing.
          </p>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
