
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { aiTools, AIToolItem } from '@/data/ai-tools-tiers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTier } from '@/context/TierContext';
import { 
  ArrowLeft, 
  Rocket, 
  Star, 
  Lock,
  ChevronRight,
  BarChart,
  Code,
  BookOpen,
  Check
} from 'lucide-react';
import ToolInterfaceModal from '@/components/ai-tools/ToolInterfaceModal';

const ToolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<AIToolItem | null>(null);
  const [toolModalOpen, setToolModalOpen] = useState(false);
  const { currentTier, upgradePrompt } = useTier();
  
  useEffect(() => {
    // Find the tool by ID
    if (id) {
      const foundTool = aiTools.find(t => t.id === id);
      if (foundTool) {
        setTool(foundTool);
      }
    }
  }, [id]);
  
  const canAccessTool = () => {
    if (!tool) return false;
    
    switch (tool.tier) {
      case 'freemium':
        return true;
      case 'basic':
        return currentTier === 'basic' || currentTier === 'pro';
      case 'pro':
        return currentTier === 'pro';
      default:
        return false;
    }
  };
  
  const handleLaunchTool = () => {
    if (canAccessTool()) {
      setToolModalOpen(true);
    } else {
      upgradePrompt(tool?.tier || 'basic');
    }
  };
  
  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/ai-tools-directory')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Tools
            </Button>
            
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Tool Not Found</h2>
              <p className="text-muted-foreground mb-6">The AI tool you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/ai-tools-directory')}>Browse All Tools</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/ai-tools-directory')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to AI Tools
            </Button>
            
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/ai-tools-directory">
                  AI Tools Directory
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink>{tool.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="md:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-muted/50">
                      {tool.category}
                    </Badge>
                    <Badge 
                      className={
                        tool.tier === 'freemium' 
                          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/20' 
                          : tool.tier === 'basic'
                          ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/20'
                          : 'bg-purple-50 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/20'
                      }
                    >
                      {tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)} Tier
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <p className="text-lg mb-6">{tool.description}</p>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                <ul className="space-y-3">
                  {tool.use_cases?.map((useCase, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Why This Tool Matters</h2>
                <Card>
                  <CardContent className="p-6">
                    <p>{tool.rationale}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <Card className="bg-muted/20 mb-6">
                <CardContent className="p-6">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                    <div className="text-6xl">{tool.icon}</div>
                  </div>
                  
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={handleLaunchTool}
                  >
                    {canAccessTool() ? (
                      <>
                        <Rocket className="mr-2 h-5 w-5" /> 
                        Launch Tool
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-5 w-5" /> 
                        {tool.tier === 'basic' ? 'Requires Basic Tier' : 'Requires Pro Tier'}
                      </>
                    )}
                  </Button>
                  
                  {!canAccessTool() && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => upgradePrompt(tool.tier)}
                    >
                      Upgrade to {tool.tier.charAt(0).toUpperCase() + tool.tier.slice(1)}
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Tools</h3>
                  <div className="space-y-3">
                    {aiTools
                      .filter(t => t.category === tool.category && t.id !== tool.id)
                      .slice(0, 3)
                      .map(relatedTool => (
                        <Button 
                          key={relatedTool.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => navigate(`/tool/${relatedTool.id}`)}
                        >
                          <div className="mr-3 text-xl">{relatedTool.icon}</div>
                          <div className="text-left flex-1">
                            <div className="font-medium">{relatedTool.name}</div>
                            <div className="text-xs text-muted-foreground">{relatedTool.tier}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="examples">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="examples" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center">
                <Code className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                Performance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="py-6">
              <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Examples of how to use {tool.name} in different scenarios. This section would show
                  code samples, screenshots, and step-by-step guides for common use cases.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="integrations" className="py-6">
              <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Information about how {tool.name} integrates with other tools and services in the
                  ecosystem. This would include API references and connectivity options.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="py-6">
              <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Performance benchmarks and metrics for {tool.name}, including speed, accuracy,
                  resource usage, and comparison with similar tools.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <ToolInterfaceModal
        open={toolModalOpen}
        onOpenChange={setToolModalOpen}
        tool={tool}
      />
      
      <Footer />
    </div>
  );
};

export default ToolDetails;
