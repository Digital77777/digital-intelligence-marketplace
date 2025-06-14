import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AIToolItem, AIToolTier, aiTools, toolCategories } from '@/data/ai-tools-tiers';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { useQuery } from '@tanstack/react-query';
import AllToolsTab from '@/components/ai-tools/AllToolsTab';
import ToolsTabContent from '@/components/ai-tools/ToolsTabContent';
import ToolTierComparison from '@/components/ai-tools/ToolTierComparison';
import TierToolsSection from '@/components/ai-tools/TierToolsSection';
import ToolInterfaceModal from '@/components/ai-tools/ToolInterfaceModal';
import DirectoryHeader from '@/components/ai-tools/components/DirectoryHeader';
import DirectoryTabs from '@/components/ai-tools/components/DirectoryTabs';
import useScrollToTop from '@/hooks/useScrollToTop';
import { LayoutGrid, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { Zap } from 'lucide-react';

interface PublicApiEntry {
  API: string;
  Description: string;
  Link: string;
  Category: string;
}

const AIToolsDirectory = () => {
  useScrollToTop();
  
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
  const { data: allPlatformTools, isLoading: isLoadingTools } = useQuery({
    queryKey: ['allPlatformTools'],
    queryFn: async (): Promise<any[]> => {
      let externalTools: any[] = [];
      try {
        const response = await fetch('https://api.publicapis.org/entries');
        if (response.ok) {
          const data = await response.json();
          const relevantCategories = [
            'Machine Learning', 
            'Development', 
            'Data Validation', 
            'Text Analysis',
            'Documents & Productivity',
            'Cloud Storage & File Sharing'
          ];
          
          const relevantEntries = data.entries.filter((entry: PublicApiEntry) => 
            relevantCategories.includes(entry.Category)
          );

          externalTools = relevantEntries.map((entry: PublicApiEntry) => ({
            id: uuidv4(),
            name: entry.API,
            description: entry.Description,
            category: entry.Category,
            tier: 'freemium',
            icon: <Zap className="h-full w-full" />,
            externalUrl: entry.Link,
            use_cases: [entry.Category],
            hasAccess: true,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch external AI tools:", error);
        // Silently fail to not block UI
      }
      return [...aiTools, ...externalTools];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: filteredTools, isLoading: isLoadingFiltered } = useQuery({
    queryKey: ['aiTools', allPlatformTools, debouncedSearchQuery, selectedCategory, selectedTier, activeTab],
    queryFn: () => {
      if (!allPlatformTools) return [];

      let filtered = [...allPlatformTools];
      
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
        const category = toolCategories.find(c => c.id === selectedCategory);
        if (category) {
            filtered = filtered.filter(tool => tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === category.id);
        }
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
          return category && tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === category.name.toLowerCase();
        });
      }
      
      return filtered;
    },
    enabled: !!allPlatformTools,
  });

  const isLoading = isLoadingTools || (isLoadingFiltered && !filteredTools);
  
  // Group tools by tier for the Tiers tab
  const tierGroups: AIToolTier[] = ['freemium', 'basic', 'pro'];
  const toolsByTier = tierGroups.map(tier => {
    const tierTools = aiTools.filter(tool => tool.tier === tier);
    return { tier, tools: tierTools };
  });

  // Handle tool selection
  const handleToolSelect = (tool: AIToolItem) => {
    // External tools are handled by the card footer directly
    if (tool.externalUrl) return;

    setSelectedTool(tool);
    setToolModalOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <DirectoryHeader totalTools={allPlatformTools?.length || aiTools.length} />
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <DirectoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
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
                totalTools={allPlatformTools?.length || aiTools.length}
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
                viewControls={
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={viewType === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewType('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewType === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewType('list')}
                      className="h-8 w-8"
                    >
                      <ListFilter className="h-4 w-4" />
                    </Button>
                  </div>
                }
                viewType={viewType}
              />
            </TabsContent>
            
            {/* Freemium Tab */}
            <TabsContent value="freemium" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Freemium Tools"
                description="These tools are available to all users with a free account, designed to help you get started with AI"
                alertColor="bg-amber-50 border-amber-200 text-amber-800"
                onToolSelect={handleToolSelect}
                viewControls={
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={viewType === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewType('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewType === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewType('list')}
                      className="h-8 w-8"
                    >
                      <ListFilter className="h-4 w-4" />
                    </Button>
                  </div>
                }
                viewType={viewType}
              />
            </TabsContent>
            
            {/* Basic Tab */}
            <TabsContent value="basic" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Basic Tier Tools"
                description="Professional tools for individuals and small teams with expanded functionality"
                alertColor="bg-blue-50 border-blue-200 text-blue-800"
                onToolSelect={handleToolSelect}
                viewControls={
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={viewType === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewType('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewType === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewType('list')}
                      className="h-8 w-8"
                    >
                      <ListFilter className="h-4 w-4" />
                    </Button>
                  </div>
                }
                viewType={viewType}
              />
            </TabsContent>
            
            {/* Pro Tab */}
            <TabsContent value="pro" className="mt-0">
              <ToolsTabContent
                isLoading={isLoading}
                filteredTools={filteredTools}
                title="Pro Tier Tools"
                description="Enterprise-grade tools with advanced features, integrations, and scalability"
                alertColor="bg-purple-50 border-purple-200 text-purple-800"
                onToolSelect={handleToolSelect}
                viewControls={
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={viewType === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewType('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewType === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewType('list')}
                      className="h-8 w-8"
                    >
                      <ListFilter className="h-4 w-4" />
                    </Button>
                  </div>
                }
                viewType={viewType}
              />
            </TabsContent>
            
            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-0">
              <div className="mb-6 p-5 bg-[#f5f8fa] border border-blue-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">AI Tool Tier Comparison</h2>
                <p className="text-gray-600">Compare features and capabilities across different subscription tiers</p>
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
      <MobileStickyFooter />
    </div>
  );
};

export default AIToolsDirectory;
