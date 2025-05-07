
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
          // For image generation, we need to return a placeholder until we get the actual image
          // In a real implementation, we'd return a data URL or an image URL
          result = "Generating image from prompt: " + input;
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
      
      let result;
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Simulate API call for text summarization
          await new Promise(resolve => setTimeout(resolve, 1500));
          result = `Summary: ${input.substring(0, 100)}...`;
          break;
        case 'image generation':
          // For image generation, we'll use our image generation endpoint
          toast({
            title: "Generating Image",
            description: "Your image is being generated. This may take a moment..."
          });
          
          try {
            // This would be a real API call to your image generation endpoint
            await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate API delay
            
            // For demo purposes, we're using a placeholder image
            // In a real implementation, this would be the URL or data URL of the generated image
            const placeholderImages = [
              'https://source.unsplash.com/random/400x400/?abstract',
              'https://source.unsplash.com/random/400x400/?landscape',
              'https://source.unsplash.com/random/400x400/?portrait',
              'https://source.unsplash.com/random/400x400/?nature'
            ];
            const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
            result = `<img src="${randomImage}" alt="Generated image from prompt: ${input}" class="w-full rounded-md" />`;
          } catch (error) {
            console.error("Image generation error:", error);
            return {
              success: false,
              result: '',
              error: `Error generating image: ${error.message || 'Unknown error'}`
            };
          }
          break;
        case 'development':
          // Simulate API call for code generation
          await new Promise(resolve => setTimeout(resolve, 1800));
          result = `function processInput(input) {\n  // Code generated for: ${input.substring(0, 30)}\n  console.log("Processing:", input);\n  return "Processed " + input;\n}`;
          break;
        default:
          // Generic API processing
          await new Promise(resolve => setTimeout(resolve, 1500));
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
