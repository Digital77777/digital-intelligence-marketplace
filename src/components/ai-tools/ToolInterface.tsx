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
  connectionDetails?: {
    apiKey: string;
    endpoint: string;
    isConnected: boolean;
  };
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onBack, connectionDetails }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'image generation': return <ImageIcon className="h-5 w-5" />;
      case 'text tools': return <FileText className="h-5 w-5" />;
      case 'productivity': return <Zap className="h-5 w-5" />;
      case 'data analysis': return <BarChart3 className="h-5 w-5" />;
      case 'automation': return <Cpu className="h-5 w-5" />;
      case 'machine learning': return <Cpu className="h-5 w-5" />;
      case 'collaboration': return <Users className="h-5 w-5" />;
      case 'development': return <Code className="h-5 w-5" />;
      case 'music': return <Music className="h-5 w-5" />;
      case 'video editing': return <Video className="h-5 w-5" />;
      case 'voice': return <Music className="h-5 w-5" />;
      case 'seo': return <Globe className="h-5 w-5" />;
      case 'marketing': return <BarChart3 className="h-5 w-5" />;
      case 'ethics': return <Shield className="h-5 w-5" />;
      case 'cloud': return <Globe className="h-5 w-5" />;
      case 'agriculture': return <span className="h-5 w-5">🌾</span>;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const getPlaceholderText = () => {
    switch (tool.category.toLowerCase()) {
      case 'image generation':
        return 'Describe the image you want to generate (e.g., "A futuristic city with flying cars at sunset")';
      case 'text tools':
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
      case 'data analysis':
        return 'Upload your data file or describe the analysis you need...';
      case 'automation':
        return 'Describe the workflow you want to automate...';
      case 'development':
        return 'Describe the code you need or paste code for review...';
      case 'music':
        return 'Describe the type of music you want (e.g., "Upbeat jazz melody for intro")';
      case 'machine learning':
        return 'Describe your ML problem or upload your dataset...';
      case 'agriculture':
        return getAgriculturePlaceholder(tool.id);
      default:
        return 'Enter your input here...';
    }
  };

  const getAgriculturePlaceholder = (toolId: string) => {
    switch (toolId) {
      case 'cropmind-ai':
        return 'Ask about your crops: "How are my tomatoes doing?" or "When should I water my corn field?"';
      case 'agrobot-commander':
        return 'Plan robot tasks: "Schedule harvesting for Field A tomorrow at 8 AM"';
      case 'aquayield-os':
        return 'Set irrigation: "Create watering schedule for corn field based on weather forecast"';
      case 'farmpnl-ai':
        return 'Analyze costs: "Calculate profit for wheat field after harvest expenses"';
      case 'agrorisk-navigator':
        return 'Assess risks: "Analyze drought risk for soybean crop in Iowa for next season"';
      case 'smartpest-sentinel':
        return 'Report pests: "Found small green insects on tomato leaves" or upload pest image';
      case 'livestock-guardian-vision':
        return 'Monitor animals: "Check health status of cattle in barn 2"';
      case 'agritrial-ai':
        return 'Plan trial: "Set up fertilizer comparison trial for corn across 4 plots"';
      case 'regencert-hub':
        return 'Log practices: "Record no-till planting for Field C, 50 acres"';
      case 'agroapi-marketplace':
        return 'Search data: "Find soil moisture APIs for California almond orchards"';
      case 'fieldsim-xr':
        return 'Start training: "Begin irrigation simulation for new farming techniques"';
      case 'agrimesh-network':
        return 'Share insight: "Report pest outbreak in tomatoes, need community advice"';
      default:
        return 'Enter your agricultural query or request...';
    }
  };

  const getExamplePrompts = () => {
    switch (tool.category.toLowerCase()) {
      case 'image generation':
        return [
          'A photorealistic portrait of a robot in a garden',
          'Abstract art with vibrant blues and greens',
          'A minimalist logo for a tech startup'
        ];
      case 'text tools':
        return tool.id === 'ai-text-summarizer' 
          ? ['Summarize this research paper', 'Key points from meeting notes', 'Executive summary needed']
          : tool.id === 'ai-language-translator'
          ? ['Translate to Spanish: Hello world', 'French translation needed', 'Convert to German']
          : ['Write a blog post about AI', 'Create product description', 'Generate social media copy'];
      case 'productivity':
        return ['Create quarterly review presentation', 'Write professional email template', 'Generate meeting agenda'];
      case 'data analysis':
        return ['Analyze sales data trends', 'Customer behavior insights', 'Financial performance review'];
      case 'agriculture':
        return getAgricultureExamples(tool.id);
      default:
        return ['Get started with your input', 'Try an example', 'Explore capabilities'];
    }
  };

  const getAgricultureExamples = (toolId: string) => {
    switch (toolId) {
      case 'cropmind-ai':
        return ['Check corn growth stage', 'Fertilizer recommendations for tomatoes', 'Pest alert for Field A'];
      case 'agrobot-commander':
        return ['Schedule planting robots', 'Optimize harvest routes', 'Check battery status'];
      case 'aquayield-os':
        return ['Water schedule for drought', 'Soil moisture analysis', 'Irrigation zone setup'];
      case 'farmpnl-ai':
        return ['Corn field profitability', 'Seed cost analysis', 'Harvest ROI calculation'];
      case 'agrorisk-navigator':
        return ['Drought risk assessment', 'Frost damage prediction', 'Insurance planning'];
      case 'smartpest-sentinel':
        return ['Identify aphids on crops', 'Pest treatment advice', 'Community pest alerts'];
      case 'livestock-guardian-vision':
        return ['Monitor cattle health', 'Detect limping animals', 'Behavior analysis'];
      default:
        return ['Monitor crop health', 'Optimize resources', 'Get recommendations'];
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
    switch (tool.category.toLowerCase()) {
      case 'image generation':
        return `Generated image: "${input}"\n\nImage created successfully with high resolution (1024x1024)\nStyle: Photorealistic\nQuality: Premium\n\n[Image would be displayed here in the actual implementation]`;
      case 'text tools':
        if (tool.id === 'ai-text-summarizer') {
          return `Summary of your text:\n\n• Key Point 1: Main concept identified from your input\n• Key Point 2: Supporting details and evidence\n• Key Point 3: Conclusion and implications\n\nOriginal length: ${input.length} characters\nSummary length: 150 characters\nCompression ratio: 75%`;
        }
        return `Generated content based on: "${input}"\n\nHere's your professionally crafted content that meets your requirements. The tone is optimized for your target audience and includes relevant keywords for better engagement.`;
      case 'data analysis':
        return `Analysis Results:\n\n📊 Data Overview:\n- Processed ${Math.floor(Math.random() * 1000)} data points\n- Found ${Math.floor(Math.random() * 10)} key trends\n- Confidence level: ${85 + Math.floor(Math.random() * 10)}%\n\n🔍 Key Insights:\n1. Strong positive correlation in primary metrics\n2. Seasonal patterns detected in Q3 data\n3. Recommendation: Focus on high-performing segments`;
      case 'development':
        return `Code Analysis Complete:\n\n✅ Generated solution for: "${input}"\n\n\`\`\`python\n# Your optimized code solution\ndef solution():\n    # Implementation based on your requirements\n    return "Code generated successfully"\n\`\`\`\n\n📝 Code Quality Score: 95/100\n🔧 Suggestions: Consider adding error handling\n📚 Documentation: Auto-generated comments included`;
      case 'agriculture':
        return generateAgricultureResult(tool.id, input);
      default:
        return `✨ Processing complete!\n\nYour request "${input}" has been processed successfully using ${tool.name}.\n\nResults are ready for download or further processing. The AI has optimized the output based on best practices and your specific requirements.`;
    }
  };

  const generateAgricultureResult = (toolId: string, input: string): string => {
    switch (toolId) {
      case 'cropmind-ai':
        return `🌱 CropMind Analysis for: "${input}"\n\n📊 Current Status:\n- Growth Stage: Vegetative (Week 6)\n- Soil Moisture: 65% (Optimal)\n- Weather: 3 days of rain predicted\n\n💡 Recommendations:\n✅ Reduce irrigation for next 4 days\n✅ Apply nitrogen fertilizer in 2 weeks\n⚠️ Monitor for fungal diseases due to humidity\n\n📱 Alert: WhatsApp notifications enabled\n🛰️ Next satellite update: Tomorrow 6 AM`;
      case 'agrobot-commander':
        return `🤖 Robot Command Center - Task: "${input}"\n\n📍 Fleet Status:\n- Robot A: Active, Battery 85%, Field 2\n- Robot B: Charging, Battery 45%, Base\n- Robot C: Maintenance needed\n\n📋 Scheduled Tasks:\n✅ Field mapping: 85% complete\n⏳ Seeding operation: Starting in 2 hours\n📅 Harvest prep: Scheduled for next week\n\n🛣️ Optimized Routes: Generated\n⚡ Estimated completion: 6.5 hours`;
      case 'aquayield-os':
        return `💧 Irrigation Analysis: "${input}"\n\n🌡️ Environmental Conditions:\n- Soil temperature: 22°C\n- Humidity: 45%\n- Wind speed: 8 km/h\n\n💦 Watering Schedule:\n- Zone A: 25 minutes at 6 AM\n- Zone B: 30 minutes at 7 AM\n- Zone C: Skip (recent rainfall)\n\n📊 Water Usage:\n- Today: 245L (15% below target)\n- Weekly savings: 450L\n- Efficiency score: 92%`;
      case 'farmpnl-ai':
        return `📊 Farm P&L Analysis: "${input}"\n\n💰 Financial Summary:\n- Revenue: $12,450\n- Input costs: $3,200\n- Labor costs: $1,800\n- Net profit: $7,450\n\n📈 Performance Metrics:\n- ROI: 232%\n- Cost per acre: $85\n- Profit margin: 59.8%\n\n🎯 Optimization Tips:\n• Reduce fertilizer costs by 12%\n• Consider bulk seed purchasing\n• Harvest timing optimal for price`;
      case 'smartpest-sentinel':
        return `🐛 Pest Detection Result: "${input}"\n\n🔍 Identified Species:\n- Primary: Aphids (Green peach aphid)\n- Confidence: 94%\n- Threat level: Medium\n\n📊 Population Analysis:\n- Estimated count: 150-200 per plant\n- Growth rate: +15% daily\n- Economic threshold: 75% reached\n\n💊 Treatment Recommendations:\n1. Apply insecticidal soap (organic)\n2. Introduce ladybugs (biological)\n3. Monitor for 5 days\n\n🌍 Community Alert: 3 nearby farms reported similar`;
      default:
        return `🌾 Agricultural Analysis Complete!\n\nProcessed: "${input}"\n\nYour request has been analyzed using advanced agricultural AI models. Results show optimal growing conditions with actionable recommendations for improved yield and sustainability.\n\n📈 Expected improvement: 15-25%\n🌱 Sustainability score: 8.5/10`;
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
        {/* Main Content */}
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
                {tool.category.toLowerCase() === 'data analysis' ? (
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
