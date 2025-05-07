
import React, { useState, useEffect } from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2, Loader2, Server } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { pipeline, env } from '@huggingface/transformers';

// Define the PipelineType for proper TypeScript integration
type PipelineType = 
  | 'audio-classification'
  | 'automatic-speech-recognition'
  | 'conversational'
  | 'depth-estimation'
  | 'document-question-answering'
  | 'feature-extraction'
  | 'fill-mask'
  | 'image-classification'
  | 'image-feature-extraction'
  | 'image-segmentation'
  | 'image-to-image'
  | 'image-to-text'
  | 'mask-generation'
  | 'ner'
  | 'object-detection'
  | 'question-answering'
  | 'sentiment-analysis'
  | 'summarization'
  | 'table-question-answering'
  | 'text-classification'
  | 'text-generation'
  | 'text-to-image'
  | 'token-classification'
  | 'translation'
  | 'visual-question-answering'
  | 'zero-shot-classification'
  | 'zero-shot-image-classification'
  | 'zero-shot-object-detection';

// Configure transformers.js to use browser cache by default
env.allowLocalModels = true;
env.useBrowserCache = true;

interface AIToolInterfaceProps {
  tool: AIToolItem;
  connectionDetails: {
    apiKey: string;
    modelProvider: 'open-source' | 'api' | 'hybrid';
    useLocalModels: boolean;
  };
}

const AIToolInterface: React.FC<AIToolInterfaceProps> = ({ tool, connectionDetails }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTab, setCurrentTab] = useState('input');
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
          modelTask = 'text-to-image';
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
      
      const deviceOption = {
        device: (connectionDetails.useLocalModels && hasWebGPU) ? 'webgpu' : 'cpu'
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

  const processWithApi = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Simulate API call - in a real implementation, this would call the actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate response
      let result;
      switch (tool.category.toLowerCase()) {
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
      
      setOutput(result);
      setCurrentTab('result');
      
    } catch (err) {
      console.error('API processing error:', err);
      setError(`Error processing with API: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const processWithModel = async () => {
    if (!model) {
      setError('Model not loaded. Please reload the page or try again.');
      return;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
      
      let result;
      
      switch (tool.category.toLowerCase()) {
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
      
      setOutput(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
      setCurrentTab('result');
      
    } catch (err) {
      console.error('Model processing error:', err);
      setError(`Error processing with model: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcess = () => {
    if (!input.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to process.",
        variant: "destructive"
      });
      return;
    }
    
    if (connectionDetails.modelProvider === 'open-source') {
      processWithModel();
    } else if (connectionDetails.modelProvider === 'api') {
      processWithApi();
    } else {
      // Hybrid approach - try the model first, fallback to API
      try {
        processWithModel();
      } catch (err) {
        console.error('Falling back to API due to error:', err);
        processWithApi();
      }
    }
  };

  const getPlaceholder = () => {
    switch (tool.category.toLowerCase()) {
      case 'text tools':
        return "Enter text to summarize...";
      case 'image generation':
        return "Describe the image you want to generate...";
      case 'development':
        return "Enter code or a coding problem...";
      default:
        return "Enter text to process...";
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
      default:
        return "Process";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {modelLoading && (
        <Alert className="mb-4 bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />
          <AlertDescription className="text-blue-800 dark:text-blue-300">
            Loading AI model... This may take a few moments.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {connectionDetails.modelProvider === 'open-source' && model && (
        <Alert className="mb-4 bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-300">
            Using open-source model running in your browser
          </AlertDescription>
        </Alert>
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
          <div className="mb-4 flex-1">
            {tool.category.toLowerCase() === 'image generation' ? (
              <div className="space-y-4">
                <Input
                  placeholder="Enter a description of the image..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isProcessing}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setInput("A mountain landscape at sunset with dramatic clouds")}
                    size="sm"
                  >
                    Mountain sunset
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setInput("A futuristic city skyline with flying cars")}
                    size="sm"
                  >
                    Futuristic city
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setInput("Portrait of a smiling person with blue hair")}
                    size="sm"
                  >
                    Portrait
                  </Button>
                </div>
              </div>
            ) : (
              <Textarea
                placeholder={getPlaceholder()}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                className="w-full h-full min-h-[300px] font-mono"
              />
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleProcess} 
              disabled={isProcessing || (connectionDetails.modelProvider === 'open-source' && !model)}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                getButtonText()
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 flex flex-col mt-4">
          {output ? (
            <Card className="flex-1">
              <CardContent className="p-4">
                {tool.category.toLowerCase() === 'image generation' ? (
                  <div className="flex items-center justify-center h-full min-h-[300px] bg-muted rounded-md">
                    <p className="text-muted-foreground">{output}</p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm h-full min-h-[300px] overflow-auto p-4">
                    {output}
                  </pre>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
              <p className="text-muted-foreground">No result yet. Process some input first.</p>
            </div>
          )}
          
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setCurrentTab('input')}>
              Back to Input
            </Button>
            <Button 
              onClick={handleProcess} 
              disabled={isProcessing || !input || (connectionDetails.modelProvider === 'open-source' && !model)}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Again"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIToolInterface;
