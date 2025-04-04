
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIToolItem, AIToolTier, aiTools, toolCategories } from '@/data/ai-tools-tiers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AllToolsTab from '@/components/ai-tools/AllToolsTab';
import ToolsTabContent from '@/components/ai-tools/ToolsTabContent';
import ToolTierComparison from '@/components/ai-tools/ToolTierComparison';
import TierToolsSection from '@/components/ai-tools/TierToolsSection';
import ToolInterfaceModal from '@/components/ai-tools/ToolInterfaceModal';

const AIToolsDirectory = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Modal state
  const [selectedTool, setSelectedTool] = useState<AIToolItem | null>(null);
  const [toolModalOpen, setToolModalOpen] = useState(false);
  
  // Get initial filter values from URL params
  const initialCategory = searchParams.get('category') || 'all';
  const initialTier = (searchParams.get('tier') || 'all') as AIToolTier | 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialView = (searchParams.get('view') || 'grid') as 'grid' | 'list';
  const initialTabValue = searchParams.get('tab') || 'all';
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTier, setSelectedTier] = useState<AIToolTier | 'all'>(initialTier);
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
  
  // Group tools by tier for the Tiers tab
  const tierGroups: AIToolTier[] = ['freemium', 'basic', 'pro'];
  const toolsByTier = tierGroups.map(tier => {
    const tierTools = aiTools.filter(tool => tool.tier === tier);
    return { tier, tools: tierTools };
  });

  // Handle tool selection
  const handleToolSelect = (tool: AIToolItem) => {
    setSelectedTool(tool);
    setToolModalOpen(true);
  };
  
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
              <AllToolsTab
                isLoading={isLoading}
                filteredTools={filteredTools}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
                viewType={viewType}
                setViewType={setViewType}
                totalTools={aiTools.length}
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            {/* Popular Tab */}
            <TabsContent value="popular" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Popular Tools"
                description="These are the most widely used tools across all subscription tiers"
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            {/* Freemium Tab */}
            <TabsContent value="freemium" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Freemium Tools"
                description="These tools are available to all users with a free account, designed to help you get started with AI"
                alertColor="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            {/* Basic Tab */}
            <TabsContent value="basic" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Basic Tier Tools"
                description="Professional tools for individuals and small teams with expanded functionality"
                alertColor="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            {/* Pro Tab */}
            <TabsContent value="pro" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Pro Tier Tools"
                description="Enterprise-grade tools with advanced features, integrations, and scalability"
                alertColor="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
                onToolSelect={handleToolSelect}
              />
            </TabsContent>
            
            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-0">
              <div className="mb-6 p-5 bg-[#00FFFF]/5 border border-[#00FFFF]/20 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Tier Comparison</h2>
                <p>Compare features across different subscription tiers</p>
              </div>
              
              <ToolTierComparison />
              
              <div className="mt-12 space-y-12">
                {toolsByTier.map(({ tier, tools }) => (
                  <TierToolsSection 
                    key={tier}
                    tier={tier}
                    tools={tools}
                    limit={3}
                    onToolSelect={handleToolSelect}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Tool Interface Modal */}
      <ToolInterfaceModal
        open={toolModalOpen}
        onOpenChange={setToolModalOpen}
        tool={selectedTool}
      />
      
      <Footer />
    </div>
  );
};

export default AIToolsDirectory;
