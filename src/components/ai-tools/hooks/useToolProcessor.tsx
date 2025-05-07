
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ProcessResult } from '../types/tool-types';

export const useToolProcessor = (model: any, toolCategory: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processWithModel = async (input: string): Promise<ProcessResult> => {
    if (!model) {
      return {
        success: false,
        result: '',
        error: 'Model not loaded. Please reload the page or try again.'
      };
    }
    
    try {
      setIsProcessing(true);
      
      let result;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          result = await model(input);
          if (typeof result === 'object' && result.summary_text) {
            result = result.summary_text;
          }
          break;
        case 'image generation':
          // For image generation we'd generate an image and return a data URL
          result = "Open-source image generation requires more specialized components";
          break;
        case 'development':
          result = await model(input, { 
            max_new_tokens: 128,
            do_sample: true,
            temperature: 0.7
          });
          if (typeof result === 'object' && result.generated_text) {
            result = result.generated_text;
          }
          break;
        default:
          result = await model(input, { max_new_tokens: 100 });
          if (typeof result === 'object' && result.generated_text) {
            result = result.generated_text;
          }
      }
      
      return {
        success: true,
        result: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
      };
      
    } catch (err) {
      console.error('Model processing error:', err);
      return {
        success: false,
        result: '',
        error: `Error processing with model: ${err.message || 'Unknown error'}`
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const processWithApi = async (input: string): Promise<ProcessResult> => {
    try {
      setIsProcessing(true);
      
      // Simulate API call - in a real implementation, this would call the actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate response
      let result;
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          result = `Summary: ${input.substring(0, 50)}...`;
          break;
        case 'image generation':
          result = "Image generation would show a preview here";
          break;
        case 'development':
          result = `function processInput(input) {\n  // Process ${input.substring(0, 20)}\n  return processed;\n}`;
          break;
        default:
          result = `Processed: ${input}`;
      }
      
      return {
        success: true,
        result
      };
      
    } catch (err) {
      console.error('API processing error:', err);
      return {
        success: false,
        result: '',
        error: `Error processing with API: ${err.message || 'Unknown error'}`
      };
    } finally {
      setIsProcessing(false);
    }
  };

  const processInput = async (input: string, modelProvider: 'open-source' | 'api' | 'hybrid'): Promise<ProcessResult> => {
    if (!input.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to process.",
        variant: "destructive"
      });
      return {
        success: false,
        result: '',
        error: 'Empty input'
      };
    }
    
    if (modelProvider === 'open-source') {
      return processWithModel(input);
    } else if (modelProvider === 'api') {
      return processWithApi(input);
    } else {
      // Hybrid approach - try the model first, fallback to API
      try {
        const modelResult = await processWithModel(input);
        if (modelResult.success) {
          return modelResult;
        }
        // If model processing fails, fall back to API
        return processWithApi(input);
      } catch (err) {
        console.error('Falling back to API due to error:', err);
        return processWithApi(input);
      }
    }
  };

  return { processInput, isProcessing };
};
