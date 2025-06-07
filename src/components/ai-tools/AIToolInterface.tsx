
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ConnectionDetails } from './types/tool-types';
import { useAIModel } from './hooks/useAIModel';
import { useToolProcessor } from './hooks/useToolProcessor';
import { useFileSaver } from '@/utils/saveUtils';
import ModelStatusAlerts from './components/ModelStatusAlerts';
import InputTab from './components/InputTab';
import ResultTab from './components/ResultTab';
import { Info } from 'lucide-react';

interface AIToolInterfaceProps {
  tool: AIToolItem;
  connectionDetails: ConnectionDetails;
}

const AIToolInterface: React.FC<AIToolInterfaceProps> = ({ tool, connectionDetails }) => {
  const [input, setInput] = useState(getPlaceholderInput(tool.category));
  const [output, setOutput] = useState('');
  const [currentTab, setCurrentTab] = useState('input');
  
  const { model, modelLoading, error } = useAIModel(tool, connectionDetails);
  const { processInput, isProcessing } = useToolProcessor(model, tool.category);
  const { saveResult } = useFileSaver();

  const handleProcess = async () => {
    const result = await processInput(input, connectionDetails.modelProvider, tool.id);
    
    if (result.success) {
      setOutput(result.result);
      setCurrentTab('result');
    }
  };

  const handleSave = async () => {
    if (output) {
      const isImageOutput = output.includes('<img');
      await saveResult(output, tool.name, tool.category, isImageOutput);
    }
  };

  const getButtonText = () => {
    switch (tool.category.toLowerCase()) {
      case 'text tools':
        return "Analyze Text";
      case 'image generation':
        return "Generate Image";
      case 'development':
        return "Generate Code";
      case 'language translator':
        return "Translate";
      case 'data analysis':
        return "Analyze Data";
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
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3 mb-4">
        <div className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Tips for using {tool.name}</p>
            <p>{getToolDescription(tool.category)}</p>
          </div>
        </div>
      </div>
      
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
          <div className="mb-3">
            <h3 className="font-medium text-sm mb-2">Example prompts:</h3>
            <div className="flex flex-wrap gap-2">
              {getExamplePrompts(tool.category).map((prompt, index) => (
                <button
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
          
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
            handleSave={handleSave}
            isProcessing={isProcessing}
            hasInput={!!input}
            toolCategory={tool.category}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get tool-specific description
const getToolDescription = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'text tools':
      return "This tool analyzes text content to provide insights on readability, sentiment, and key statistics. Try inputting paragraphs of text for best results.";
    case 'image generation':
      return "Generate images from text descriptions. Be specific about style, colors, and content for more predictable results.";
    case 'development':
      return "Generate code snippets based on your requirements. Specify language, functionality and context for more accurate code generation.";
    case 'language translator':
      return "Translate text between languages. Begin your input with the target language (e.g., 'to Spanish:') for best results.";
    case 'data analysis':
      return "Analyze data patterns and generate visualizations. Input data descriptions or examples to see analytics results.";
    default:
      return "Enter your input in the text area below and click process to see results.";
  }
};

// Helper function to get example prompts for each tool category
const getExamplePrompts = (category: string): string[] => {
  switch (category.toLowerCase()) {
    case 'text tools':
      return [
        "Analyze this blog post about climate change and its effects on agriculture.",
        "Summarize the key points from this technical documentation.",
        "Extract the main topics from this news article."
      ];
    case 'image generation':
      return [
        "A futuristic city with flying cars and tall glass buildings at sunset",
        "A photorealistic landscape of mountains with a lake in the foreground",
        "An abstract painting in the style of Picasso using blues and greens"
      ];
    case 'development':
      return [
        "Create a React component for a user profile card with avatar",
        "Write a function to sort an array of objects by multiple properties",
        "Generate a REST API endpoint for user authentication"
      ];
    case 'language translator':
      return [
        "To Spanish: Hello world, how are you today?",
        "To French: I would like to order a coffee, please.",
        "To German: Where is the nearest train station?"
      ];
    case 'data analysis':
      return [
        "Analyze monthly sales data for an e-commerce store",
        "Compare website traffic sources over the last quarter",
        "Visualize customer demographics by age and location"
      ];
    default:
      return [
        "Enter your input here...",
        "Try another example...",
        "One more example..."
      ];
  }
};

// Helper function to get category-specific placeholder input
const getPlaceholderInput = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'text tools':
      return "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, such as through variations in the solar cycle. But since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil and gas, which produces heat-trapping gases.";
    case 'image generation':
      return "A beautiful mountain landscape with a lake in the foreground, snow-capped peaks in the background, and a clear blue sky";
    case 'development':
      return "Create a React component for a responsive navigation bar with dropdown menus";
    case 'language translator':
      return "To Spanish: Hello, how are you? My name is Alex and I am learning to speak Spanish.";
    case 'data analysis':
      return "Analyze monthly sales data for a retail store across five product categories over the last year";
    default:
      return "";
  }
};

export default AIToolInterface;
