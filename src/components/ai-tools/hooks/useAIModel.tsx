
import { useState, useEffect } from 'react';
import { pipeline, env } from '@huggingface/transformers';
import { useToast } from '@/hooks/use-toast';
import { PipelineType, DeviceType, ConnectionDetails } from '../types/tool-types';

// Configure transformers.js to use browser cache by default
env.allowLocalModels = true;
env.useBrowserCache = true;

export const useAIModel = (tool: { category: string; name: string }, connectionDetails: ConnectionDetails) => {
  const [model, setModel] = useState<any>(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize model if using open-source option
  useEffect(() => {
    if (connectionDetails.modelProvider === 'open-source' || connectionDetails.modelProvider === 'hybrid') {
      loadModel();
    }
  }, [connectionDetails.modelProvider]);

  const loadModel = async () => {
    if (modelLoading || model) return;
    
    setModelLoading(true);
    setError(null);
    
    try {
      let modelTask: PipelineType;
      let modelId: string;
      
      // Determine which model to use based on the tool
      switch (tool.category.toLowerCase()) {
        case 'text tools':
          modelTask = 'summarization';
          modelId = 'Xenova/distilbart-cnn-6-6';
          break;
        case 'image generation':
          // Use text2text-generation instead of text-to-image as it's more widely supported
          modelTask = 'text2text-generation';
          modelId = 'Xenova/stable-diffusion-onnx'; 
          break;
        case 'development':
          modelTask = 'text-generation';
          modelId = 'Xenova/codegen-350M-mono';
          break;
        case 'language translator':
          modelTask = 'translation';
          modelId = 'Xenova/m2m100_418M';
          break;
        default:
          modelTask = 'text-generation';
          modelId = 'Xenova/distilgpt2';
      }
      
      // Check for WebGPU support without directly accessing navigator.gpu
      const hasWebGPU = typeof window !== 'undefined' && 
                      'navigator' in window && 
                      'gpu' in navigator;
      
      // Set device option with the correct type
      const deviceOption = {
        device: (connectionDetails.useLocalModels && hasWebGPU ? 'webgpu' : 'cpu') as DeviceType
      };
      
      toast({
        title: "Loading Model",
        description: `Loading ${modelId}. This may take a moment...`
      });
      
      // Initialize the model with the correct type
      const pipelineInstance = await pipeline(modelTask, modelId, deviceOption);
      setModel(pipelineInstance);
      
      toast({
        title: "Model Ready",
        description: `${modelId} loaded successfully.`
      });
      
    } catch (err) {
      console.error('Error loading model:', err);
      setError(`Error loading model: ${err.message || 'Unknown error'}`);
      
      toast({
        variant: "destructive",
        title: "Model Loading Error",
        description: `Could not load the AI model. ${err.message || 'Please try again.'}`,
      });
      
    } finally {
      setModelLoading(false);
    }
  };

  return { model, modelLoading, error, loadModel };
};
