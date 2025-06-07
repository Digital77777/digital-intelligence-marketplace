
import React, { useState } from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Download, 
  Share2, 
  Settings, 
  Lightbulb,
  Cpu,
  Zap,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Code,
  BarChart3,
  Users,
  Globe,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ToolInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onBack }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'image-generation': return <ImageIcon className="h-5 w-5" />;
      case 'text-tools': return <FileText className="h-5 w-5" />;
      case 'productivity': return <Zap className="h-5 w-5" />;
      case 'data-analysis': return <BarChart3 className="h-5 w-5" />;
      case 'automation': return <Cpu className="h-5 w-5" />;
      case 'machine-learning': return <Cpu className="h-5 w-5" />;
      case 'collaboration': return <Users className="h-5 w-5" />;
      case 'development': return <Code className="h-5 w-5" />;
      case 'music': return <Music className="h-5 w-5" />;
      case 'video-editing': return <Video className="h-5 w-5" />;
      case 'voice': return <Music className="h-5 w-5" />;
      case 'seo': return <Globe className="h-5 w-5" />;
      case 'marketing': return <BarChart3 className="h-5 w-5" />;
      case 'ethics': return <Shield className="h-5 w-5" />;
      case 'cloud': return <Globe className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const getPlaceholderText = () => {
    switch (tool.category) {
      case 'image-generation':
        return 'Describe the image you want to generate (e.g., "A futuristic city with flying cars at sunset")';
      case 'text-tools':
        return tool.id === 'ai-text-summarizer' 
          ? 'Paste the text you want to summarize...'
          : tool.id === 'ai-language-translator'
          ? 'Enter text to translate (specify target language)'
          : 'Enter your text here...';
      case 'productivity':
        return tool.id === 'ai-presentation-maker'
          ? 'Enter your presentation topic (e.g., "Machine Learning Basics for Business")'
          : tool.id === 'ai-email-writer'
          ? 'Describe the email you want to write (e.g., "Professional follow-up after job interview")'
          : 'Describe what you want to accomplish...';
      case 'data-analysis':
        return 'Upload your data file or describe the analysis you need...';
      case 'automation':
        return 'Describe the workflow you want to automate...';
      case 'development':
        return 'Describe the code you need or paste code for review...';
      case 'music':
        return 'Describe the type of music you want (e.g., "Upbeat jazz melody for intro")';
      case 'machine-learning':
        return 'Describe your ML problem or upload your dataset...';
      default:
        return 'Enter your input here...';
    }
  };

  const getExamplePrompts = () => {
    switch (tool.category) {
      case 'image-generation':
        return [
          'A photorealistic portrait of a robot in a garden',
          'Abstract art with vibrant blues and greens',
          'A minimalist logo for a tech startup'
        ];
      case 'text-tools':
        return tool.id === 'ai-text-summarizer' 
          ? ['Summarize this research paper', 'Key points from meeting notes', 'Executive summary needed']
          : tool.id === 'ai-language-translator'
          ? ['Translate to Spanish: Hello world', 'French translation needed', 'Convert to German']
          : ['Write a blog post about AI', 'Create product description', 'Generate social media copy'];
      case 'productivity':
        return ['Create quarterly review presentation', 'Write professional email template', 'Generate meeting agenda'];
      case 'data-analysis':
        return ['Analyze sales data trends', 'Customer behavior insights', 'Financial performance review'];
      default:
        return ['Get started with your input', 'Try an example', 'Explore capabilities'];
    }
  };

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some input to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Generate mock result based on tool type
    const mockResult = generateMockResult(tool, input);
    setResult(mockResult);
    setIsProcessing(false);
    
    toast({
      title: "Processing Complete",
      description: `${tool.name} has successfully processed your input.`,
    });
  };

  const generateMockResult = (tool: AIToolItem, input: string): string => {
    switch (tool.category) {
      case 'image-generation':
        return `Generated image: "${input}"\n\nImage created successfully with high resolution (1024x1024)\nStyle: Photorealistic\nQuality: Premium\n\n[Image would be displayed here in the actual implementation]`;
      case 'text-tools':
        if (tool.id === 'ai-text-summarizer') {
          return `Summary of your text:\n\n• Key Point 1: Main concept identified from your input\n• Key Point 2: Supporting details and evidence\n• Key Point 3: Conclusion and implications\n\nOriginal length: ${input.length} characters\nSummary length: 150 characters\nCompression ratio: 75%`;
        }
        return `Generated content based on: "${input}"\n\nHere's your professionally crafted content that meets your requirements. The tone is optimized for your target audience and includes relevant keywords for better engagement.`;
      case 'data-analysis':
        return `Analysis Results:\n\n📊 Data Overview:\n- Processed ${Math.floor(Math.random() * 1000)} data points\n- Found ${Math.floor(Math.random() * 10)} key trends\n- Confidence level: ${85 + Math.floor(Math.random() * 10)}%\n\n🔍 Key Insights:\n1. Strong positive correlation in primary metrics\n2. Seasonal patterns detected in Q3 data\n3. Recommendation: Focus on high-performing segments`;
      case 'development':
        return `Code Analysis Complete:\n\n✅ Generated solution for: "${input}"\n\n\`\`\`python\n# Your optimized code solution\ndef solution():\n    # Implementation based on your requirements\n    return "Code generated successfully"\n\`\`\`\n\n📝 Code Quality Score: 95/100\n🔧 Suggestions: Consider adding error handling\n📚 Documentation: Auto-generated comments included`;
      default:
        return `✨ Processing complete!\n\nYour request "${input}" has been processed successfully using ${tool.name}.\n\nResults are ready for download or further processing. The AI has optimized the output based on best practices and your specific requirements.`;
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name}-result.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your result has been downloaded successfully.",
    });
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: `Result from ${tool.name}`,
        text: result.substring(0, 100) + '...',
      });
    } else {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied to Clipboard",
        description: "Result has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Tools
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Lightbulb className="h-4 w-4 mr-1" />
            Help
          </Button>
        </div>
      </div>

      {/* Tool Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{tool.icon}</div>
              <div>
                <CardTitle className="text-2xl">{tool.name}</CardTitle>
                <CardDescription className="text-lg">{tool.description}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  {getCategoryIcon(tool.category)}
                  <span className="text-sm text-muted-foreground capitalize">
                    {tool.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Example Prompts */}
              <div>
                <h4 className="text-sm font-medium mb-2">Quick Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {getExamplePrompts().map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(prompt)}
                      className="text-xs"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Input Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Input:</label>
                {tool.category === 'data-analysis' ? (
                  <div className="space-y-3">
                    <Input 
                      type="file" 
                      accept=".csv,.xlsx,.json"
                      className="cursor-pointer"
                    />
                    <Textarea
                      placeholder="Or describe your data analysis needs..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={4}
                    />
                  </div>
                ) : (
                  <Textarea
                    placeholder={getPlaceholderText()}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleProcess} 
                  disabled={isProcessing || !input.trim()}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Process
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setInput('')}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Results
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap font-mono text-sm">
                  {result}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Tool Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Function:</h4>
                <p className="text-muted-foreground">{tool.function}</p>
              </div>
              
              {tool.use_cases && (
                <div>
                  <h4 className="font-medium mb-2">Use Cases:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.use_cases.map((useCase, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {tool.technologies && (
                <div>
                  <h4 className="font-medium mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tool.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {tool.usageLimit && (
                <div>
                  <h4 className="font-medium mb-2">Usage Limits:</h4>
                  <p className="text-muted-foreground text-xs">{tool.usageLimit}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Code className="h-4 w-4 mr-2" />
                API Reference
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToolInterface;
