
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  CheckCircle,
  Download,
  ExternalLink,
  Globe,
  Lightbulb,
  Lock,
  Share2,
  Shield,
  Sparkles,
  Zap,
  Copy,
  PlayCircle,
  Info,
  BookOpen,
  Code
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useTier } from '@/context/TierContext';
import { AITool } from '@/types/tools';

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<AITool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { currentTier, canAccess, upgradePrompt } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    fetchToolDetails();
  }, [id]);

  const fetchToolDetails = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      setTool(data);
      
      // Check access rights
      if (data && !hasAccessToTool(data.required_tier)) {
        upgradePrompt(data.required_tier as any);
        navigate('/ai-tools-directory');
      }
    } catch (error) {
      console.error('Error fetching tool details:', error);
      toast.error('Failed to load tool details');
      navigate('/ai-tools-directory');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has access to this tool based on required tier
  const hasAccessToTool = (requiredTier: string): boolean => {
    if (requiredTier === 'freemium') return true;
    if (requiredTier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
    if (requiredTier === 'pro') return currentTier === 'pro';
    return false;
  };

  const getTierBadge = (tier: string) => {
    if (tier === 'pro') {
      return (
        <Badge variant="outline" className="bg-purple-900/60 text-purple-200 border-purple-700 px-3 py-1 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#6AC8FF]" />
          <span>PRO</span>
        </Badge>
      );
    } else if (tier === 'basic') {
      return (
        <Badge variant="outline" className="bg-blue-900/60 text-blue-200 border-blue-700 px-3 py-1 flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>BASIC</span>
        </Badge>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 px-6 pb-12 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-28 px-6 pb-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Tool Not Found</h1>
            <p className="text-muted-foreground mb-6">This AI tool doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/ai-tools-directory')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools Directory
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/ai-tools-directory')}
              className="mb-4 text-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tool.icon}</div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                    {getTierBadge(tool.required_tier)}
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm md:text-base">
                    {tool.category} • {new Date(tool.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <Button size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Use Tool</span>
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="bg-card rounded-lg border p-6">
                      <h2 className="text-xl font-semibold mb-4">About this Tool</h2>
                      <p className="text-muted-foreground mb-6">{tool.description}</p>
                      
                      <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                        <Zap className="h-5 w-5 text-amber-500" />
                        Key Use Cases
                      </h3>
                      <ul className="space-y-3 mb-6">
                        {tool.use_cases.map((useCase, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{useCase}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {tool.rationale && (
                        <>
                          <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                            <Lightbulb className="h-5 w-5 text-blue-500" />
                            Why Use This Tool
                          </h3>
                          <p className="text-muted-foreground">{tool.rationale}</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-card rounded-lg border p-6">
                      <h3 className="font-medium mb-4">Quick Start</h3>
                      <div className="space-y-3">
                        <Button className="w-full justify-start gap-2" size="sm">
                          <PlayCircle className="h-4 w-4" />
                          Launch Tool
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                          <BookOpen className="h-4 w-4" />
                          View Tutorial
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                          <Code className="h-4 w-4" />
                          API Reference
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg border p-6">
                      <h3 className="font-medium mb-4">Tool Information</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category</span>
                          <span className="font-medium">{tool.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Required Tier</span>
                          <span className="font-medium capitalize">{tool.required_tier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Added</span>
                          <span className="font-medium">{new Date(tool.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">API Access</span>
                          <span className="font-medium">Yes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg border p-6">
                      <h3 className="font-medium mb-4">Community</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                          <Globe className="h-4 w-4" />
                          Community Forum
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          Documentation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documentation" className="space-y-6">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">Documentation</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p>Comprehensive documentation for {tool.name} will be available here, including:</p>
                    <ul>
                      <li>Step-by-step guides</li>
                      <li>API references</li>
                      <li>Best practices</li>
                      <li>Troubleshooting</li>
                    </ul>
                    <p>This section is currently under development. Check back soon for complete documentation.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-6">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Example 1: Basic Usage</h3>
                      <div className="bg-muted rounded-md p-4 relative">
                        <pre className="text-sm overflow-x-auto"><code>// Example code or configuration will be displayed here</code></pre>
                        <Button size="sm" variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={() => toast.success('Code copied to clipboard')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Example 2: Advanced Configuration</h3>
                      <div className="bg-muted rounded-md p-4 relative">
                        <pre className="text-sm overflow-x-auto"><code>// Advanced usage examples will be shown here</code></pre>
                        <Button size="sm" variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0" onClick={() => toast.success('Code copied to clipboard')}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="integrations" className="space-y-6">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">Integrations</h2>
                  <p className="text-muted-foreground mb-6">
                    {tool.name} works seamlessly with the following platforms and tools:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['API Integration', 'Data Export', 'Third-party Services'].map((integration, index) => (
                      <div key={index} className="border rounded-lg p-4 flex items-start gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Info className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{integration}</h3>
                          <p className="text-sm text-muted-foreground">Integration details will be listed here.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;
