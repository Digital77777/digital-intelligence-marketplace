
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
  return (
    <div className="flex flex-col items-center text-center p-6">
      <ToolDescription tool={tool} />
      
      <APIConnectionOptions 
        tool={tool} 
        handleConnectApi={handleConnectApi}
        handleQuickStart={handleQuickStart}
      />
      
      <ToolUseCases tool={tool} />
    </div>
  );
};

export default WelcomeScreen;
