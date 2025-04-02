
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIToolItem, AIToolTier, aiTools, getTierLabel, toolCategories } from '@/data/ai-tools-tiers';
import AIToolCard from '@/components/ai-tools/AIToolCard';
import ToolsFilter from '@/components/ai-tools/ToolsFilter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import CategoryToolsSection from '@/components/ai-tools/CategoryToolsSection';
import TierToolsSection from '@/components/ai-tools/TierToolsSection';
import ToolTierComparison from '@/components/ai-tools/ToolTierComparison';
import { Button } from '@/components/ui/button';
import { Info, SearchX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AIToolsDirectory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial filter values from URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialTier = (searchParams.get('tier') || 'all') as AIToolTier | 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialView = (searchParams.get('view') || 'grid') as 'grid' | 'list';
  const initialTabValue = searchParams.get('tab') || 'all';
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [viewType, setViewType] = useState<'grid' | 'list'>(initialView);
  const [activeTab, setActiveTab] = useState(initialTabValue);
  
  // Debounce search query to avoid too many re-renders
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    if (debouncedSearchQuery) params.set('search', debouncedSearchQuery);
    if (viewType !== 'grid') params.set('view', viewType);
    if (activeTab !== 'all') params.set('tab', activeTab);
    
    setSearchParams(params);
  }, [debouncedSearchQuery, selectedCategory, selectedTier, viewType, activeTab, setSearchParams]);
  
  // Filter tools based on search, category, and tier
  const { data: filteredTools, isLoading } = useQuery({
    queryKey: ['aiTools', debouncedSearchQuery, selectedCategory, selectedTier, activeTab],
    queryFn: () => {
      let filtered = [...aiTools];
      
      // Filter by search query
      if (debouncedSearchQuery) {
        const search = debouncedSearchQuery.toLowerCase();
        filtered = filtered.filter(tool => 
          tool.name.toLowerCase().includes(search) || 
          tool.description.toLowerCase().includes(search)
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(tool => tool.category === selectedCategory);
      }
      
      // Filter by tier
      if (selectedTier !== 'all') {
        filtered = filtered.filter(tool => tool.tier === selectedTier);
      }
      
      // Apply tab filtering
      if (activeTab === 'popular') {
        filtered = filtered.filter(tool => tool.popularTool);
      } else if (activeTab === 'freemium') {
        filtered = filtered.filter(tool => tool.tier === 'freemium');
      } else if (activeTab === 'basic') {
        filtered = filtered.filter(tool => tool.tier === 'basic');
      } else if (activeTab === 'pro') {
        filtered = filtered.filter(tool => tool.tier === 'pro');
      } else if (activeTab !== 'all' && activeTab !== 'compare') {
        // Filter by category (if tab is a category id)
        const categoryId = activeTab;
        filtered = filtered.filter(tool => {
          const category = toolCategories.find(c => c.id === categoryId);
          return category && tool.category === category.name.toLowerCase();
        });
      }
      
      return filtered;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Group tools by category for the Categories tab
  const toolsByCategory = toolCategories.map(category => {
    const categoryTools = aiTools.filter(tool => tool.category === category.id);
    return { category, tools: categoryTools };
  });
  
  // Group tools by tier for the Tiers tab
  const tierGroups: AIToolTier[] = ['freemium', 'basic', 'pro'];
  const toolsByTier = tierGroups.map(tier => {
    const tierTools = aiTools.filter(tool => tool.tier === tier);
    return { tier, tools: tierTools };
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/20 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">AI Tools Directory</h1>
              <p className="text-muted-foreground">
                Discover and utilize powerful AI tools organized by category and subscription tier
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/pricing')}
                className="text-sm"
              >
                <Info className="h-4 w-4 mr-1.5" />
                Compare Plans
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="flex flex-wrap mb-6 h-auto">
              <TabsTrigger value="all" className="px-4 py-2 h-auto">
                All Tools
              </TabsTrigger>
              <TabsTrigger value="popular" className="px-4 py-2 h-auto">
                Popular
              </TabsTrigger>
              <TabsTrigger value="freemium" className="px-4 py-2 h-auto">
                Freemium
              </TabsTrigger>
              <TabsTrigger value="basic" className="px-4 py-2 h-auto">
                Basic
              </TabsTrigger>
              <TabsTrigger value="pro" className="px-4 py-2 h-auto">
                Pro
              </TabsTrigger>
              <TabsTrigger value="compare" className="px-4 py-2 h-auto">
                Compare Tiers
              </TabsTrigger>
            </TabsList>
            
            {/* All Tools Tab */}
            <TabsContent value="all" className="mt-0">
              <ToolsFilter 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
                viewType={viewType}
                setViewType={setViewType}
                totalTools={aiTools.length}
                filteredCount={filteredTools?.length || 0}
              />
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : filteredTools && filteredTools.length > 0 ? (
                <div className={viewType === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "space-y-4"
                }>
                  {filteredTools.map(tool => (
                    <AIToolCard key={tool.id} tool={tool} compact={viewType === 'list'} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <SearchX className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-bold mb-2">No tools found</h2>
                  <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                    We couldn't find any AI tools matching your search criteria. 
                    Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedTier('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Popular Tab */}
            <TabsContent value="popular" className="mt-0">
              <Alert className="mb-6">
                <AlertTitle>Popular Tools</AlertTitle>
                <AlertDescription>
                  These are the most widely used tools across all subscription tiers
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
                  ))
                ) : filteredTools && filteredTools.length > 0 ? (
                  filteredTools.map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p>No popular tools found with the current filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Freemium Tab */}
            <TabsContent value="freemium" className="mt-0">
              <Alert className="mb-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <AlertTitle className="flex items-center gap-2">
                  Freemium Tools
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                    Free
                  </span>
                </AlertTitle>
                <AlertDescription>
                  These tools are available to all users with a free account, designed to help you get started with AI
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
                  ))
                ) : filteredTools && filteredTools.length > 0 ? (
                  filteredTools.map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p>No freemium tools found with the current filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Basic Tab */}
            <TabsContent value="basic" className="mt-0">
              <Alert className="mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <AlertTitle className="flex items-center gap-2">
                  Basic Tier Tools
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                    $29/month
                  </span>
                </AlertTitle>
                <AlertDescription>
                  Professional tools for individuals and small teams with expanded functionality
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
                  ))
                ) : filteredTools && filteredTools.length > 0 ? (
                  filteredTools.map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p>No basic tier tools found with the current filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Pro Tab */}
            <TabsContent value="pro" className="mt-0">
              <Alert className="mb-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                <AlertTitle className="flex items-center gap-2">
                  Pro Tier Tools
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded">
                    $79/month
                  </span>
                </AlertTitle>
                <AlertDescription>
                  Enterprise-grade tools with advanced features, integrations, and scalability
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
                  ))
                ) : filteredTools && filteredTools.length > 0 ? (
                  filteredTools.map(tool => (
                    <AIToolCard key={tool.id} tool={tool} />
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <p>No pro tier tools found with the current filters.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-0">
              <Alert className="mb-6">
                <AlertTitle>Tier Comparison</AlertTitle>
                <AlertDescription>
                  Compare features across different subscription tiers
                </AlertDescription>
              </Alert>
              
              <ToolTierComparison />
              
              <div className="mt-12 space-y-12">
                {toolsByTier.map(({ tier, tools }) => (
                  <TierToolsSection 
                    key={tier}
                    tier={tier}
                    tools={tools}
                    limit={3}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
