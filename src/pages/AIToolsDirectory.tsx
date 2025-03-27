
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ExternalLink,
  Lock,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
  use_cases: string[];
  rationale: string;
  required_tier: string;
  category: string;
  created_at: string;
}

const AIToolsDirectory = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const { user, profile } = useUser();
  const { currentTier, canAccess, upgradePrompt } = useTier();
  const navigate = useNavigate();

  useEffect(() => {
    if (!canAccess('ai-tools-directory')) {
      upgradePrompt('basic');
      navigate('/pricing');
      return;
    }
    
    fetchAITools();
  }, [currentTier]);

  const fetchAITools = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setTools(data || []);
      setFilteredTools(data || []);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data?.map(item => item.category) || []));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching AI tools:', error);
    }
  };

  useEffect(() => {
    filterTools();
  }, [searchQuery, activeCategory, tools]);

  const filterTools = () => {
    let filtered = [...tools];
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.use_cases.some(useCase => useCase.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    setFilteredTools(filtered);
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

  // Check if user has access to a specific tool based on required tier
  const hasAccessToTool = (requiredTier: string): boolean => {
    if (requiredTier === 'freemium') return true;
    if (requiredTier === 'basic') return currentTier === 'basic' || currentTier === 'pro';
    if (requiredTier === 'pro') return currentTier === 'pro';
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 px-6 pb-12 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">AI Tools Directory</h1>
              <p className="text-muted-foreground mt-1">
                Discover and utilize powerful AI tools for your projects
              </p>
            </div>
            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search tools..." 
                  className="w-full md:w-64 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <div className="hidden md:flex items-center bg-muted rounded-md p-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setViewType('grid')}
                  className={`p-1 h-8 w-8 ${viewType === 'grid' ? 'bg-background' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setViewType('list')}
                  className={`p-1 h-8 w-8 ${viewType === 'list' ? 'bg-background' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className={viewType === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredTools.map(tool => {
              const hasAccess = hasAccessToTool(tool.required_tier);
              
              return viewType === 'grid' ? (
                <Card key={tool.id} className={`overflow-hidden border transition-all hover:shadow-md ${!hasAccess ? 'opacity-80' : 'hover:border-primary/50'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{tool.icon}</div>
                        <div>
                          <CardTitle className="text-xl">{tool.name}</CardTitle>
                          <CardDescription>{tool.category}</CardDescription>
                        </div>
                      </div>
                      {tool.required_tier !== 'freemium' && getTierBadge(tool.required_tier)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    
                    {!hasAccess ? (
                      <div className="bg-muted/40 border rounded-lg p-4 text-center">
                        <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium mb-2">
                          {tool.required_tier.charAt(0).toUpperCase() + tool.required_tier.slice(1)} Tier Required
                        </h3>
                        <Button 
                          variant="outline"
                          className="mt-2"
                          onClick={() => navigate('/pricing')}
                        >
                          Upgrade to Access
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4 text-amber-500" />
                          Use Cases
                        </h4>
                        <ul className="space-y-1 mb-4">
                          {tool.use_cases.map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                              <span className="text-sm">{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      {hasAccess ? "Available for your tier" : "Upgrade to access"}
                    </p>
                    <Button 
                      variant={hasAccess ? "default" : "outline"}
                      onClick={() => {
                        if (hasAccess) {
                          navigate(`/ai-tools/tool/${tool.id}`);
                        } else {
                          navigate('/pricing');
                        }
                      }}
                      className="gap-1"
                    >
                      {hasAccess ? "Open Tool" : "Upgrade"}
                      {hasAccess ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card key={tool.id} className={`overflow-hidden border transition-all hover:shadow-md ${!hasAccess ? 'opacity-80' : 'hover:border-primary/50'}`}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-4 sm:p-6 flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{tool.icon}</div>
                          <div>
                            <CardTitle className="text-xl">{tool.name}</CardTitle>
                            <CardDescription>{tool.category}</CardDescription>
                          </div>
                        </div>
                        {tool.required_tier !== 'freemium' && getTierBadge(tool.required_tier)}
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{tool.description}</p>
                      
                      {hasAccess && (
                        <div className="mb-2">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-amber-500" />
                            Key Use Cases
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {tool.use_cases.slice(0, 3).map((useCase, index) => (
                              <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                {useCase}
                              </Badge>
                            ))}
                            {tool.use_cases.length > 3 && (
                              <Badge variant="outline">+{tool.use_cases.length - 3} more</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4 sm:p-6 flex flex-col justify-center items-center sm:items-end gap-3 border-t sm:border-t-0 sm:border-l bg-muted/20 sm:min-w-[200px]">
                      {!hasAccess ? (
                        <>
                          <Lock className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-center font-medium">
                            {tool.required_tier.charAt(0).toUpperCase() + tool.required_tier.slice(1)} Tier Required
                          </p>
                          <Button 
                            variant="outline"
                            onClick={() => navigate('/pricing')}
                            className="w-full sm:w-auto"
                          >
                            Upgrade
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground text-center sm:text-right">
                            Available for your tier
                          </p>
                          <Button 
                            variant="default"
                            onClick={() => navigate(`/ai-tools/tool/${tool.id}`)}
                            className="w-full sm:w-auto gap-1"
                          >
                            Open Tool <ExternalLink className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {filteredTools.length === 0 && (
            <div className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">No tools found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any AI tools matching your search criteria.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
