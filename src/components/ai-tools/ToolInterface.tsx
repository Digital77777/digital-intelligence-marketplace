import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Loader2, Play, Download, Info, Sparkles, ArrowLeft } from 'lucide-react';
import ToolInfoHeader from "./components/ToolInfoHeader";
import TabsInputPanel from "./components/TabsInputPanel";
import TabsResultPanel from "./components/TabsResultPanel";

interface ToolInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
  connectionDetails: {
    apiKey: string;
    endpoint: string;
    isConnected: boolean;
  };
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({
  tool,
  onBack,
  connectionDetails,
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleProcess = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setActiveTab('result');
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
      <ToolInfoHeader tool={tool} />

      {/* Main Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result">Result</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="flex-1 flex flex-col mt-4">
          <TabsInputPanel
            toolCategory={tool.category}
            placeholder={getPlaceholder()}
            input={input}
            setInput={setInput}
            onProcess={handleProcess}
            isProcessing={isProcessing}
            getButtonText={getButtonText}
          />
        </TabsContent>
        <TabsContent value="result" className="flex-1 flex flex-col mt-4">
          <TabsResultPanel
            toolName={tool.name}
            output={output}
            isProcessing={isProcessing}
            onSave={handleSave}
            onProcessAgain={() => setActiveTab('input')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Export for TabsInputPanel
export const getInputDescription = (category: string): string => {
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

export default ToolInterface;
