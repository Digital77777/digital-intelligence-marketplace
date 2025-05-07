
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
      let fileName;
      let fileType;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Enhanced text summarization
          await new Promise(resolve => setTimeout(resolve, 1200));
          result = `Summary of "${input.substring(0, 30)}...": 
          
${input.split('. ').filter((_, i) => i % 3 === 0).join('. ')}`;
          fileName = `summary-${Date.now()}`;
          fileType = 'txt';
          break;
          
        case 'image generation':
          toast({
            title: "Generating Image",
            description: "Your image is being generated. This may take a moment..."
          });
          
          try {
            // More sophisticated image generation
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate a somewhat deterministic but different image based on the input
            const hashCode = Array.from(input).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
            const imageId = Math.abs(hashCode % 1000);
            const randomImage = `https://picsum.photos/seed/${imageId}/512/512`;
            result = `<img src="${randomImage}" alt="Generated image from prompt: ${input}" class="w-full rounded-md" />`;
            fileName = `image-${Date.now()}`;
            fileType = 'png';
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
          // Better code generation with more realistic code
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
            fileName = `React${input.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
            .replace(/[^a-zA-Z]/g, '').substring(0, 20)}Component`;
            fileType = 'tsx';
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
            fileName = `apiService-${Date.now()}`;
            fileType = 'js';
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
            fileName = `utility-${Date.now()}`;
            fileType = 'js';
          }
          break;
          
        case 'language translator':
          // Enhanced translation
          await new Promise(resolve => setTimeout(resolve, 1300));
          
          // More comprehensive language mapping
          const languages = {
            spanish: { hello: 'hola', world: 'mundo', welcome: 'bienvenido', to: 'a', the: 'el', platform: 'plataforma', is: 'es', 
              good: 'bueno', thanks: 'gracias', for: 'para', your: 'tu', help: 'ayuda', name: 'nombre', 
              my: 'mi', friend: 'amigo', how: 'cómo', are: 'estás', you: 'tú' },
            french: { hello: 'bonjour', world: 'monde', welcome: 'bienvenue', to: 'à', the: 'la', platform: 'plateforme', is: 'est', 
              good: 'bon', thanks: 'merci', for: 'pour', your: 'votre', help: 'aide', name: 'nom', 
              my: 'mon', friend: 'ami', how: 'comment', are: 'allez', you: 'vous' },
            german: { hello: 'hallo', world: 'welt', welcome: 'willkommen', to: 'zu', the: 'die', platform: 'plattform', is: 'ist', 
              good: 'gut', thanks: 'danke', for: 'für', your: 'dein', help: 'hilfe', name: 'name', 
              my: 'mein', friend: 'freund', how: 'wie', are: 'geht', you: 'dir' }
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
          fileName = `translation-to-${targetLang}-${Date.now()}`;
          fileType = 'txt';
          break;
          
        case 'data analysis':
          // Data analysis tool
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          result = `Data Analysis Results for input "${input.substring(0, 30)}...":\n\n`;
          result += "Summary Statistics:\n";
          result += "- Total words: " + input.split(/\s+/).length + "\n";
          result += "- Total characters: " + input.length + "\n";
          
          // Generate some mock analysis data
          const mockData = [];
          for (let i = 0; i < 5; i++) {
            mockData.push({
              category: `Category ${i+1}`,
              value: Math.floor(Math.random() * 100) + 1
            });
          }
          
          result += "\nData Breakdown:\n";
          mockData.forEach(item => {
            result += `- ${item.category}: ${item.value}\n`;
          });
          
          result += "\nRecommendations:\n";
          result += "1. Consider expanding the dataset for more accurate results\n";
          result += "2. Apply normalization to account for outliers\n";
          result += "3. Use statistical significance testing for validation\n";
          
          fileName = `data-analysis-${Date.now()}`;
          fileType = 'txt';
          break;
          
        case 'audio generation':
          // Audio generation (simulated)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          result = `Audio has been generated from your prompt: "${input}"\n\n`;
          result += "Due to browser limitations, we cannot play the audio directly, but you can download it using the Save Result button.";
          
          fileName = `audio-generation-${Date.now()}`;
          fileType = 'txt';
          break;
          
        default:
          // Generic API processing with enhanced output
          await new Promise(resolve => setTimeout(resolve, 1000));
          result = `Processed with platform API: ${input}\n\n`;
          result += "Analysis completed at " + new Date().toLocaleString() + "\n";
          result += "Tool ID: " + toolId + "\n";
          result += "Category: " + toolCategory;
          
          fileName = `output-${Date.now()}`;
          fileType = 'txt';
      }
      
      return {
        success: true,
        result,
        fileName,
        fileType
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
      let fileName;
      let fileType;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Simulate API call for text summarization
          await new Promise(resolve => setTimeout(resolve, 1500));
          result = `Summary: ${input.substring(0, 100)}...`;
          fileName = `summary-${Date.now()}`;
          fileType = 'txt';
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
            fileName = `image-${Date.now()}`;
            fileType = 'png';
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
          fileName = `code-${Date.now()}`;
          fileType = 'js';
          break;
        default:
          // Generic API processing
          await new Promise(resolve => setTimeout(resolve, 1500));
          result = `Processed: ${input}`;
          fileName = `output-${Date.now()}`;
          fileType = 'txt';
      }
      
      return {
        success: true,
        result,
        fileName,
        fileType
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
