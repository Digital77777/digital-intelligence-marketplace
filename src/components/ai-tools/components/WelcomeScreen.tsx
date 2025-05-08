
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
      
      {tool.relatedCourses && tool.relatedCourses.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg max-w-lg">
          <h3 className="font-semibold mb-2">Learning Resources Available</h3>
          <p className="text-sm mb-2">
            Enhance your skills with these related courses:
          </p>
          <ul className="text-sm list-disc list-inside text-left">
            {tool.relatedCourses.map((course, index) => (
              <li key={index} className="mb-1">{course}</li>
            ))}
          </ul>
          <div className="mt-3">
            <a 
              href="/learning-hub" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Visit Learning Hub →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
