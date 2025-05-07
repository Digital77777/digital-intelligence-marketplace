
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ConnectionDetails } from './types/tool-types';
import { useAIModel } from './hooks/useAIModel';
import { useToolProcessor } from './hooks/useToolProcessor';
import ModelStatusAlerts from './components/ModelStatusAlerts';
import InputTab from './components/InputTab';
import ResultTab from './components/ResultTab';

interface AIToolInterfaceProps {
  tool: AIToolItem;
  connectionDetails: ConnectionDetails;
}

const AIToolInterface: React.FC<AIToolInterfaceProps> = ({ tool, connectionDetails }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [currentTab, setCurrentTab] = useState('input');
  
  const { model, modelLoading, error } = useAIModel(tool, connectionDetails);
  const { processInput, isProcessing } = useToolProcessor(model, tool.category);

  const handleProcess = async () => {
    const result = await processInput(input, connectionDetails.modelProvider, tool.id);
    
    if (result.success) {
      setOutput(result.result);
      setCurrentTab('result');
    } else if (result.error) {
      // Error is already handled within the hook
    }
  };

  const getButtonText = () => {
    switch (tool.category.toLowerCase()) {
      case 'text tools':
        return "Summarize";
      case 'image generation':
        return "Generate Image";
      case 'development':
        return "Generate Code";
      case 'language translator':
        return "Translate";
      default:
        return "Process";
    }
  };

  const isOpenSourceModel = connectionDetails.modelProvider === 'open-source';
  const isPlatformAPI = connectionDetails.modelProvider === 'platform';
  const modelLoaded = !!model || isPlatformAPI;

  return (
    <div className="flex flex-col h-full">
      {!isPlatformAPI && (
        <ModelStatusAlerts 
          modelLoading={modelLoading}
          error={error}
          isOpenSourceModel={isOpenSourceModel}
          modelLoaded={modelLoaded}
        />
      )}
      
      {isPlatformAPI && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-3 rounded-md mb-4 flex items-center gap-2 text-sm">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <span>Using Platform API - No setup required</span>
        </div>
      )}
      
      <Tabs 
        defaultValue="input" 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="flex-1 flex flex-col"
      >
        <TabsList>
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="flex-1 flex flex-col mt-4">
          <InputTab 
            input={input}
            setInput={setInput}
            isProcessing={isProcessing}
            handleProcess={handleProcess}
            toolCategory={tool.category}
            buttonText={getButtonText()}
          />
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 flex flex-col mt-4">
          <ResultTab 
            output={output}
            setCurrentTab={setCurrentTab}
            handleProcess={handleProcess}
            isProcessing={isProcessing}
            hasInput={!!input}
            toolCategory={tool.category}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIToolInterface;
