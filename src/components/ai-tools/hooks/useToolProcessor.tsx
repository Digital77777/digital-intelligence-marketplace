
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ProcessResult } from '../types/tool-types';

export const useToolProcessor = (model: any, toolCategory: string) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // This function simulates AI model processing without needing actual models
  const processWithModel = async (input: string): Promise<ProcessResult> => {
    try {
      setIsProcessing(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let result;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          result = `Summarized: ${input.split('.').filter((_, i) => i % 3 === 0).join('. ')}`;
          break;
        case 'image generation':
          // Use a placeholder image from Unsplash with a seed based on input
          const hash = Array.from(input).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
          const imageId = Math.abs(hash % 1000);
          result = `<img src="https://picsum.photos/seed/${imageId}/512/512" alt="Generated image from prompt: ${input}" class="w-full rounded-md" />`;
          break;
        case 'development':
          result = `// Generated code for: ${input}\n
function processInput(data) {
  // Implementation based on user request: "${input.substring(0, 30)}..."
  console.log("Processing:", data);
  return {
    result: data,
    processed: true,
    timestamp: new Date().toISOString()
  };
}

// Example usage
const result = processInput("${input.replace(/"/g, '\\"')}");
console.log(result);`;
          break;
        case 'language translator':
          // Simple mock translation
          const languages = {
            spanish: { hello: 'hola', world: 'mundo', welcome: 'bienvenido', to: 'a', the: 'el', platform: 'plataforma' },
            french: { hello: 'bonjour', world: 'monde', welcome: 'bienvenue', to: 'à', the: 'la', platform: 'plateforme' },
            german: { hello: 'hallo', world: 'welt', welcome: 'willkommen', to: 'zu', the: 'die', platform: 'plattform' }
          };
          
          const targetLang = input.toLowerCase().includes('spanish') ? 'spanish' : 
                            input.toLowerCase().includes('french') ? 'french' : 
                            input.toLowerCase().includes('german') ? 'german' : 'spanish';
          
          const dict = languages[targetLang as keyof typeof languages];
          result = `Translation to ${targetLang}:\n\n` + 
                  input.split(' ')
                    .map(word => {
                      const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
                      const replacement = dict[lowerWord as keyof typeof dict];
                      return replacement || word;
                    })
                    .join(' ');
          break;
        default:
          result = `Processed with AI model: ${input}`;
      }
      
      return {
        success: true,
        result: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
      };
    } catch (err: any) {
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

  // This function simulates processing with a platform API
  const processWithPlatformAPI = async (input: string, toolId: string): Promise<ProcessResult> => {
    try {
      setIsProcessing(true);
      
      toast({
        title: "Processing with Platform API",
        description: "Your request is being processed..."
      });
      
      // Simulate processing time (slightly faster than models)
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let result;
      let fileName;
      let fileType;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Enhanced text summarization
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
          
          // Simulate longer processing time for image generation
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Generate a somewhat deterministic but different image based on the input
          const hashCode = Array.from(input).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
          const imageId = Math.abs(hashCode % 1000);
          const randomImage = `https://picsum.photos/seed/${imageId}/512/512`;
          result = `<img src="${randomImage}" alt="Generated image from prompt: ${input}" class="w-full rounded-md" />`;
          fileName = `image-${Date.now()}`;
          fileType = 'png';
          break;
          
        case 'development':
          // Better code generation with more realistic code
          await new Promise(resolve => setTimeout(resolve, 800));
          
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
          await new Promise(resolve => setTimeout(resolve, 700));
          
          // More comprehensive language mapping
          const languages = {
            spanish: { hello: 'hola', world: 'mundo', welcome: 'bienvenido', to: 'a', the: 'el', platform: 'plataforma', is: 'es', 
              good: 'bueno', thanks: 'gracias', for: 'para', your: 'tu', help: 'ayuda' },
            french: { hello: 'bonjour', world: 'monde', welcome: 'bienvenue', to: 'à', the: 'la', platform: 'plateforme', is: 'est', 
              good: 'bon', thanks: 'merci', for: 'pour', your: 'votre', help: 'aide' },
            german: { hello: 'hallo', world: 'welt', welcome: 'willkommen', to: 'zu', the: 'die', platform: 'plattform', is: 'ist', 
              good: 'gut', thanks: 'danke', for: 'für', your: 'dein', help: 'hilfe' }
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
          await new Promise(resolve => setTimeout(resolve, 800));
          
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
          
          fileName = `data-analysis-${Date.now()}`;
          fileType = 'txt';
          break;
          
        default:
          // Generic API processing with enhanced output
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
      
    } catch (err: any) {
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

  // This function simulates API processing without needing actual API keys
  const processWithApi = async (input: string): Promise<ProcessResult> => {
    try {
      setIsProcessing(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let result;
      let fileName;
      let fileType;
      
      switch (toolCategory.toLowerCase()) {
        case 'text tools':
          // Text summarization
          result = `Summary: ${input.substring(0, 100)}...`;
          fileName = `summary-${Date.now()}`;
          fileType = 'txt';
          break;
        case 'image generation':
          toast({
            title: "Generating Image",
            description: "Your image is being generated..."
          });
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Generate a placeholder image
          const imageOptions = [
            'abstract', 'landscape', 'portrait', 'nature', 'city', 'technology'
          ];
          const randomCategory = imageOptions[Math.floor(Math.random() * imageOptions.length)];
          const randomImage = `https://source.unsplash.com/random/400x400/?${randomCategory}`;
          result = `<img src="${randomImage}" alt="Generated image from prompt: ${input}" class="w-full rounded-md" />`;
          fileName = `image-${Date.now()}`;
          fileType = 'png';
          break;
        case 'development':
          // Code generation
          result = `function processInput(input) {\n  // Code generated for: ${input.substring(0, 30)}\n  console.log("Processing:", input);\n  return "Processed " + input;\n}`;
          fileName = `code-${Date.now()}`;
          fileType = 'js';
          break;
        default:
          // Generic processing
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
      
    } catch (err: any) {
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

  // Main processing function that works regardless of selected method
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
    
    // All processing methods work without external dependencies
    if (modelProvider === 'open-source') {
      return processWithModel(input);
    } else if (modelProvider === 'platform' && toolId) {
      return processWithPlatformAPI(input, toolId);
    } else if (modelProvider === 'api') {
      return processWithApi(input);
    } else {
      // Hybrid approach - try the model first, fall back to API
      try {
        // Both methods work, so just randomly choose one for variety
        const useModelFirst = Math.random() > 0.5;
        if (useModelFirst) {
          return processWithModel(input);
        } else {
          return processWithApi(input);
        }
      } catch (err) {
        console.error('Falling back to API due to error:', err);
        return processWithApi(input);
      }
    }
  };

  return { processInput, isProcessing };
};
