
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

  const processWithPlatformAPI = async (input: string, toolId: string): Promise<ProcessResult> => {
    try {
      setIsProcessing(true);
      
      toast({
        title: "Processing with Platform API",
        description: "Your request is being processed by our hosted API..."
      });
      
      let result;
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Simulate API call for text summarization
          await new Promise(resolve => setTimeout(resolve, 1200));
          result = `Summary of "${input.substring(0, 30)}...": 
          
${input.split('. ').filter((_, i) => i % 3 === 0).join('. ')}`;
          break;
        case 'image generation':
          // For image generation, we'll use our image generation endpoint
          toast({
            title: "Generating Image",
            description: "Your image is being generated. This may take a moment..."
          });
          
          try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate a somewhat deterministic but different image based on the input
            const hashCode = Array.from(input).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
            const imageId = Math.abs(hashCode % 1000);
            const randomImage = `https://picsum.photos/seed/${imageId}/512/512`;
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
          // Simulate API call for code generation with slightly more realistic code
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Generate slightly more meaningful code based on input
          const isReactRequest = input.toLowerCase().includes('react') || input.toLowerCase().includes('component');
          const isAPIRequest = input.toLowerCase().includes('api') || input.toLowerCase().includes('fetch');
          
          if (isReactRequest) {
            result = `import React, { useState } from 'react';

// Generated component based on: "${input.substring(0, 30)}..."
export const ${input.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
  .replace(/[^a-zA-Z]/g, '').substring(0, 20)}Component = () => {
  const [data, setData] = useState(null);
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-medium">Generated Component</h2>
      <p>This component was created based on your request</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Click Me
      </button>
    </div>
  );
};`;
          } else if (isAPIRequest) {
            result = `// Generated API integration based on: "${input.substring(0, 30)}..."
export async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Example usage
fetchData()
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));`;
          } else {
            result = `// Generated code based on: "${input.substring(0, 30)}..."
function processInput(input) {
  const processed = input.trim().toLowerCase();
  const words = processed.split(' ');
  
  return {
    originalInput: input,
    wordCount: words.length,
    characters: input.length,
    firstWord: words[0],
    lastWord: words[words.length - 1]
  };
}

console.log(processInput("${input.replace(/"/g, '\\"')}"));`;
          }
          break;
        case 'language translator':
          // Simulate API call for translation
          await new Promise(resolve => setTimeout(resolve, 1300));
          
          // Very basic "translation" for demo purposes
          const languages = {
            spanish: { hello: 'hola', world: 'mundo', welcome: 'bienvenido', to: 'a', the: 'el', platform: 'plataforma' },
            french: { hello: 'bonjour', world: 'monde', welcome: 'bienvenue', to: 'à', the: 'la', platform: 'plateforme' },
            german: { hello: 'hallo', world: 'welt', welcome: 'willkommen', to: 'zu', the: 'die', platform: 'plattform' }
          };
          
          const targetLang = input.toLowerCase().includes('spanish') ? 'spanish' : 
                            input.toLowerCase().includes('french') ? 'french' : 
                            input.toLowerCase().includes('german') ? 'german' : 'spanish';
          
          // Extract text to translate
          let textToTranslate = input;
          if (input.includes(':')) {
            textToTranslate = input.split(':')[1].trim();
          }
          
          // Perform simple word replacement
          const dict = languages[targetLang as keyof typeof languages];
          result = `Translation to ${targetLang}:\n\n` + 
                  textToTranslate.split(' ')
                    .map(word => {
                      const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
                      const replacement = dict[lowerWord as keyof typeof dict];
                      return replacement || word;
                    })
                    .join(' ');
          break;
        default:
          // Generic API processing
          await new Promise(resolve => setTimeout(resolve, 1000));
          result = `Processed with platform API: ${input}`;
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

  const processInput = async (input: string, modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform', toolId?: string): Promise<ProcessResult> => {
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
    } else if (modelProvider === 'platform' && toolId) {
      return processWithPlatformAPI(input, toolId);
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
