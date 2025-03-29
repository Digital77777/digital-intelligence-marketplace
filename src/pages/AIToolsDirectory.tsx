
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
import { AITool, ToolCategory } from '@/types/tools';

const AIToolsDirectory = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [filteredTools, setFilteredTools] = useState<AITool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const { user } = useUser();
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
      
      // Process categories
      const categoryMap = new Map<string, number>();
      data?.forEach(tool => {
        const count = categoryMap.get(tool.category) || 0;
        categoryMap.set(tool.category, count + 1);
      });
      
      const categoryArray: ToolCategory[] = Array.from(categoryMap).map(([name, count]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        count
      }));
      
      setCategories([{ id: 'all', name: 'All Categories', count: data?.length || 0 }, ...categoryArray]);
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
      filtered = filtered.filter(item => item.category.toLowerCase().replace(/\s+/g, '-') === activeCategory);
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
      <main className="flex-1 pt-28 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/30 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Tools Directory</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Discover and utilize powerful AI tools for your projects
              </p>
            </div>
            <div className="w-full md:w-auto flex items-center gap-2 md:gap-3">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search tools..." 
                  className="w-full md:w-64 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2 px-2 md:px-4 py-1">
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
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
            <TabsList className="flex flex-wrap mb-2 h-auto">
              {categories.slice(0, 5).map(category => (
                <TabsTrigger key={category.id} value={category.id} className="h-8 text-xs md:text-sm">
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                </TabsTrigger>
              ))}
              {categories.length > 5 && (
                <TabsTrigger value="more" className="h-8 text-xs md:text-sm">
                  More Categories
                </TabsTrigger>
              )}
            </TabsList>
            
            {categories.length > 5 && (
              <TabsContent value="more" className="mt-2 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.slice(5).map(category => (
                    <Button 
                      key={category.id} 
                      variant="outline" 
                      size="sm"
                      className="justify-start h-8 text-xs"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      <Badge variant="secondary" className="ml-2 text-xs">{category.count}</Badge>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
          
          <div className={viewType === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            : "space-y-4"
          }>
            {filteredTools.map(tool => {
              const hasAccess = hasAccessToTool(tool.required_tier);
              
              return viewType === 'grid' ? (
                <Card key={tool.id} className={`overflow-hidden border transition-all hover:shadow-md ${!hasAccess ? 'opacity-80' : 'hover:border-primary/50'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tool.icon}</div>
                        <div>
                          <CardTitle className="text-base md:text-lg">{tool.name}</CardTitle>
                          <CardDescription className="text-xs md:text-sm">{tool.category}</CardDescription>
                        </div>
                      </div>
                      {tool.required_tier !== 'freemium' && getTierBadge(tool.required_tier)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{tool.description}</p>
                    
                    {!hasAccess ? (
                      <div className="bg-muted/40 border rounded-lg p-3 text-center">
                        <Lock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm mb-2">
                          {tool.required_tier.charAt(0).toUpperCase() + tool.required_tier.slice(1)} Tier Required
                        </h3>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="mt-1 text-xs"
                          onClick={() => navigate('/pricing')}
                        >
                          Upgrade to Access
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-amber-500" />
                          Key Use Cases
                        </h4>
                        <ul className="space-y-1 mb-3">
                          {tool.use_cases.slice(0, 3).map((useCase, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-xs md:text-sm">{useCase}</span>
                            </li>
                          ))}
                          {tool.use_cases.length > 3 && (
                            <li className="text-xs text-muted-foreground pl-5">+{tool.use_cases.length - 3} more use cases</li>
                          )}
                        </ul>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="border-t p-3 flex justify-between">
                    <p className="text-xs text-muted-foreground">
                      {hasAccess ? "Available for your tier" : "Upgrade to access"}
                    </p>
                    <Button 
                      variant={hasAccess ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (hasAccess) {
                          navigate(`/ai-tools/tool/${tool.id}`);
                        } else {
                          navigate('/pricing');
                        }
                      }}
                      className="gap-1 text-xs"
                    >
                      {hasAccess ? "Open Tool" : "Upgrade"}
                      {hasAccess ? <ExternalLink className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card key={tool.id} className={`overflow-hidden border transition-all hover:shadow-md ${!hasAccess ? 'opacity-80' : 'hover:border-primary/50'}`}>
                  <div className="flex flex-col sm:flex-row">
                    <div className="p-3 sm:p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="text-xl sm:text-2xl">{tool.icon}</div>
                          <div>
                            <CardTitle className="text-base sm:text-lg">{tool.name}</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">{tool.category}</CardDescription>
                          </div>
                        </div>
                        {tool.required_tier !== 'freemium' && getTierBadge(tool.required_tier)}
                      </div>
                      
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">{tool.description}</p>
                      
                      {hasAccess && (
                        <div className="mb-2">
                          <h4 className="font-medium text-xs sm:text-sm mb-1 flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-amber-500" />
                            Key Use Cases
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {tool.use_cases.slice(0, 2).map((useCase, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                            {tool.use_cases.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{tool.use_cases.length - 2} more</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 sm:p-4 flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 border-t sm:border-t-0 sm:border-l bg-muted/20 sm:min-w-[160px]">
                      {!hasAccess ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                            <p className="text-xs font-medium">
                              {tool.required_tier.charAt(0).toUpperCase() + tool.required_tier.slice(1)} Tier
                            </p>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/pricing')}
                            className="text-xs"
                          >
                            Upgrade
                          </Button>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-muted-foreground">
                            Available for your tier
                          </p>
                          <Button 
                            variant="default"
                            size="sm"
                            onClick={() => navigate(`/ai-tools/tool/${tool.id}`)}
                            className="gap-1 text-xs"
                          >
                            Open Tool <ExternalLink className="h-3.5 w-3.5" />
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
              <Search className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No tools found</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
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
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Load More
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
