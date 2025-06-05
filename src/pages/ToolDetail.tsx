import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { aiTools, AIToolTier, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Info,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import ToolInterface from '@/components/ai-tools/ToolInterface';

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentTier, upgradePrompt } = useTier();
  const [showToolInterface, setShowToolInterface] = useState(false);
  
  const { data: tool, isLoading, error } = useQuery({
    queryKey: ['aiTool', id],
    queryFn: () => {
      const foundTool = aiTools.find(t => t.id === id);
      if (!foundTool) {
        throw new Error('Tool not found');
      }
      return foundTool;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const hasAccess = tool ? (
    (tool.tier === 'freemium') ||
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) ||
    (tool.tier === 'pro' && currentTier === 'pro')
  ) : false;
  
  useEffect(() => {
    if (error) {
      toast.error("Tool not found", {
        description: "The requested tool does not exist or has been removed",
      });
      navigate('/ai-tools-directory');
    }
  }, [error, navigate]);
  
  const handleUpgrade = () => {
    if (tool) {
      upgradePrompt(tool.tier as AIToolTier);
      navigate('/pricing');
    }
  };
  
  const handleLaunchTool = () => {
    setShowToolInterface(true);
  };
  
  const handleBackToDetails = () => {
    setShowToolInterface(false);
  };
  
  const renderLoading = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
          <Skeleton className="h-8 w-60 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-5 w-full max-w-2xl mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-64 w-full rounded-lg mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
          {renderLoading()}
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
            <p className="mb-6">The tool you are looking for does not exist or has been removed.</p>
            <Button onClick={() => navigate('/ai-tools-directory')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to AI Tools Directory
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
        <div className="max-w-6xl mx-auto">
          {showToolInterface ? (
            <ToolInterface 
              tool={tool} 
              onBack={handleBackToDetails}
              connectionDetails={{
                apiKey: '',
                endpoint: '',
                isConnected: false
              }}
            />
          ) : (
            <>
              <div className="mb-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/ai-tools-directory')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Directory
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-grow md:max-w-[70%]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {tool.icon}
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`${getTierBadgeColor(tool.tier as AIToolTier)} px-2 py-0.5 text-xs flex items-center gap-1.5`}
                        >
                          {getTierIcon(tool.tier as AIToolTier)}
                          <span>{getTierLabel(tool.tier as AIToolTier)} Tier</span>
                        </Badge>
                        {tool.demoAvailable && (
                          <Badge variant="secondary" className="text-xs">
                            Demo Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-8">
                    {tool.description}
                  </p>
                  
                  {!hasAccess ? (
                    <Alert className="mb-8 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                      <Lock className="h-4 w-4" />
                      <AlertTitle>Subscription Required</AlertTitle>
                      <AlertDescription>
                        This tool requires a {getTierLabel(tool.tier as AIToolTier)} subscription. 
                        Upgrade your plan to access this and other premium features.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="mb-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                      <Check className="h-4 w-4 text-green-500" />
                      <AlertTitle>You Have Access</AlertTitle>
                      <AlertDescription>
                        You can use this tool with your current {getTierLabel(currentTier)} subscription.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Tabs defaultValue="features" className="mb-10">
                    <TabsList className="mb-6">
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="usage">Usage Guide</TabsTrigger>
                      <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="features">
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-5 rounded-lg border">
                          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-amber-500" />
                            Unique Selling Point
                          </h2>
                          <p>{tool.uniqueSellingPoint}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Core Functionality</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {[1, 2, 3].map((_, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span className="text-sm">
                                      {tool.tier === 'freemium' 
                                        ? ['Basic visualization tools', 'Data import from CSV', 'Up to 3 datasets'][i]
                                        : tool.tier === 'basic'
                                        ? ['Advanced analytics dashboard', 'Custom chart creation', 'Export options'][i]
                                        : ['Enterprise data integration', 'Real-time predictive modeling', 'Custom API access'][i]
                                      }
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Limitations & Usage</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {tool.usageLimit ? (
                                <div className="flex items-start gap-2 mb-3">
                                  <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <p className="text-sm">{tool.usageLimit}</p>
                                </div>
                              ) : (
                                <p className="text-sm">No usage limitations for your current tier.</p>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="usage">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Getting Started</CardTitle>
                            <CardDescription>
                              Follow these steps to start using {tool.name}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ol className="space-y-4 list-decimal list-inside">
                              <li className="pl-2">Click the "Launch Tool" button to open the tool interface</li>
                              <li className="pl-2">Follow the onboarding wizard to set up your initial preferences</li>
                              <li className="pl-2">Import your data or use the provided templates to get started</li>
                              <li className="pl-2">Configure your settings and begin using the features</li>
                            </ol>
                          </CardContent>
                        </Card>
                        
                        {hasAccess && (
                          <Card>
                            <CardHeader>
                              <CardTitle>Interactive Tutorial</CardTitle>
                              <CardDescription>
                                Walk through an interactive guide to understand all features
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button className="gap-2" onClick={handleLaunchTool}>
                                Start Tutorial
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="integrations">
                      {tool.integrations && tool.integrations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tool.integrations.map((integration, idx) => (
                            <Card key={idx}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{integration}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Connect {tool.name} with {integration} for enhanced functionality.
                                </p>
                                {hasAccess && (
                                  <Button variant="outline" size="sm" className="w-full">
                                    Configure Integration
                                  </Button>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No integrations available for this tool.</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="w-full md:w-[30%] flex-shrink-0">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Tier Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Subscription Level</span>
                          <Badge 
                            variant="outline" 
                            className={`${getTierBadgeColor(tool.tier as AIToolTier)} px-2 py-0.5 text-xs flex items-center gap-1.5`}
                          >
                            {getTierIcon(tool.tier as AIToolTier)}
                            <span>{getTierLabel(tool.tier as AIToolTier)}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Your Current Tier</span>
                          <Badge 
                            variant="outline" 
                            className={`${getTierBadgeColor(currentTier)} px-2 py-0.5 text-xs flex items-center gap-1.5`}
                          >
                            {getTierIcon(currentTier)}
                            <span>{getTierLabel(currentTier)}</span>
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Access Status</span>
                          {hasAccess ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                              <Lock className="h-3.5 w-3.5 mr-1" />
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tool Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hasAccess ? (
                        <>
                          <Button onClick={handleLaunchTool} className="w-full gap-2">
                            Launch Tool
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="outline" className="w-full">
                            View Documentation
                          </Button>
                          
                          {tool.demoAvailable && (
                            <Button variant="secondary" className="w-full">
                              Watch Demo
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <Button onClick={handleUpgrade} className="w-full gap-2">
                            Upgrade to {getTierLabel(tool.tier as AIToolTier)}
                            <Lock className="h-4 w-4" />
                          </Button>
                          
                          {tool.demoAvailable && (
                            <Button variant="outline" className="w-full">
                              Preview Demo
                            </Button>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;
