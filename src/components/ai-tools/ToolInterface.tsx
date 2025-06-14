
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Loader2, Play, Download, Info, Sparkles, ArrowLeft } from 'lucide-react';

interface ToolInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
  connectionDetails: {
    apiKey: string;
    endpoint: string;
    isConnected: boolean;
  };
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onBack, connectionDetails }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleProcess = async () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    setActiveTab('result');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock output based on tool category
    const mockOutput = generateMockOutput(tool.category, input);
    setOutput(mockOutput);
    setIsProcessing(false);
  };

  const handleSave = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPlaceholder = () => {
    switch (tool.category.toLowerCase()) {
      case 'image-generation':
        return 'Describe the image you want to generate...';
      case 'text-tools':
        return 'Enter your text to analyze or process...';
      case 'agriculture':
        return 'Describe your farm, crop, or agricultural challenge...';
      case 'development':
        return 'Describe the code or function you need...';
      case 'data-analysis':
        return 'Describe your data or analysis requirements...';
      default:
        return 'Enter your input here...';
    }
  };

  const getButtonText = () => {
    switch (tool.category.toLowerCase()) {
      case 'image-generation':
        return 'Generate Image';
      case 'text-tools':
        return 'Process Text';
      case 'agriculture':
        return 'Analyze Farm Data';
      case 'development':
        return 'Generate Code';
      case 'data-analysis':
        return 'Analyze Data';
      case 'music':
        return 'Compose Music';
      case 'video-editing':
        return 'Process Video';
      case 'voice':
        return 'Generate Voice';
      default:
        return 'Process';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Back button */}
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Details
        </Button>
      </div>

      {/* Tool Info Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-2xl">{tool.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{tool.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {tool.category}
              </Badge>
              {tool.popularTool && (
                <Badge className="bg-amber-100 text-amber-800 text-xs">
                  🔥 Popular
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {tool.function && (
          <div className="mt-3 p-3 bg-white rounded-md border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Function</span>
            </div>
            <p className="text-sm text-gray-700">{tool.function}</p>
          </div>
        )}
      </div>

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="flex-1 flex flex-col mt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Input</CardTitle>
              <CardDescription>
                {getInputDescription(tool.category)}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Textarea
                placeholder={getPlaceholder()}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-h-[200px] resize-none"
              />
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={handleProcess}
                  disabled={!input.trim() || isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      {getButtonText()}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 flex flex-col mt-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Result</CardTitle>
              <CardDescription>
                Generated output from {tool.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {isProcessing ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                    <p className="text-gray-600">Processing your request...</p>
                  </div>
                </div>
              ) : output ? (
                <>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-auto">
                    <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button onClick={handleSave} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Save Result
                    </Button>
                    <Button onClick={() => setActiveTab('input')} variant="outline">
                      Process Again
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Run the tool to see results here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const getInputDescription = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'image generation':
      return 'Describe the image you want to create in detail, including style, colors, and composition.';
    case 'text tools':
      return 'Provide the text content you want to analyze, summarize, or process.';
    case 'agriculture':
      return 'Share information about your farm, crops, or agricultural challenge for AI-powered insights.';
    case 'development':
      return 'Describe the code functionality you need or paste existing code for analysis.';
    case 'data analysis':
      return 'Describe your dataset or paste sample data for AI-powered analysis.';
    case 'productivity':
      return 'Describe the task or workflow you want to automate or optimize.';
    case 'music':
      return 'Describe the musical style, mood, or specific requirements for your composition.';
    case 'voice':
      return 'Enter the text you want to convert to speech or describe voice characteristics.';
    default:
      return 'Enter your input and click process to see AI-generated results.';
  }
};

const generateMockOutput = (category: string, input: string): string => {
  switch (category.toLowerCase()) {
    case 'image-generation':
      return `🎨 Image Generated Successfully!

Style: Photorealistic
Dimensions: 1024x1024
Format: PNG

Description: ${input}

[Image would be displayed here in the actual implementation]

Generated with advanced AI diffusion models optimized for quality and creativity.`;

    case 'text-tools':
      return `📝 Text Analysis Complete

Input Length: ${input.length} characters
Word Count: ${input.split(' ').length} words

Summary:
${input.slice(0, 200)}...

Key Points:
• Main theme identified
• Sentiment: Neutral
• Readability: Good
• Suggested improvements available

Processing completed using advanced NLP models.`;

    case 'agriculture':
      return `🌱 Agricultural Analysis Report

Farm Analysis for: ${input.slice(0, 50)}...

Recommendations:
• Optimal planting window: Next 2-3 weeks
• Soil moisture: Monitor closely
• Weather forecast: Favorable conditions
• Pest risk: Low to moderate
• Fertilizer timing: Recommended in 10 days

Crop Health Score: 8.5/10

Generated using satellite data, weather patterns, and soil analysis.`;

    case 'development':
      return `💻 Code Generation Complete

// Generated code based on: ${input.slice(0, 50)}...

function processData(data) {
  // AI-generated implementation
  const processed = data.map(item => {
    return {
      ...item,
      processed: true,
      timestamp: new Date().toISOString()
    };
  });
  
  return processed;
}

// Additional utility functions
const validateInput = (input) => {
  return input && typeof input === 'object';
};

Code quality: High
Estimated performance: Optimized
Testing: Unit tests recommended`;

    case 'data-analysis':
      return `📊 Data Analysis Results

Dataset Overview:
- Records analyzed: 1,247
- Variables: 12
- Data quality: 94% complete

Key Insights:
• Strong correlation between variables A and B (r=0.82)
• Seasonal trend detected in time series
• 3 outliers identified and flagged
• Recommendation: Focus on Q3 optimization

Statistical Summary:
- Mean: 45.7
- Median: 42.1
- Standard Deviation: 12.3

Confidence Level: 95%`;

    default:
      return `✨ Processing Complete

Input processed: ${input.slice(0, 100)}...

Results:
• Analysis completed successfully
• Quality score: 92%
• Processing time: 1.2 seconds
• Confidence: High

Generated using advanced AI models optimized for accuracy and performance.

Additional insights and recommendations would be displayed here based on the specific tool functionality.`;
  }
};

const getInputDescription = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'image-generation':
      return 'Describe the image you want to create in detail, including style, colors, and composition.';
    case 'text-tools':
      return 'Provide the text content you want to analyze, summarize, or process.';
    case 'agriculture':
      return 'Share information about your farm, crops, or agricultural challenge for AI-powered insights.';
    case 'development':
      return 'Describe the code functionality you need or paste existing code for analysis.';
    case 'data-analysis':
      return 'Describe your dataset or paste sample data for AI-powered analysis.';
    case 'productivity':
      return 'Describe the task or workflow you want to automate or optimize.';
    case 'music':
      return 'Describe the musical style, mood, or specific requirements for your composition.';
    case 'voice':
      return 'Enter the text you want to convert to speech or describe voice characteristics.';
    default:
      return 'Enter your input and click process to see AI-generated results.';
  }
};

export default ToolInterface;
