
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AIToolItem, AIToolTier, aiTools } from '@/data/ai-tools-tiers';
import AllToolsTab from '@/components/ai-tools/AllToolsTab';
import ToolsTabContent from '@/components/ai-tools/ToolsTabContent';
import ToolTierComparison from '@/components/ai-tools/ToolTierComparison';
import TierToolsSection from '@/components/ai-tools/TierToolsSection';
import ToolInterfaceModal from '@/components/ai-tools/ToolInterfaceModal';
import DirectoryTabs from '@/components/ai-tools/components/DirectoryTabs';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIToolsDirectoryContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTier: AIToolTier | 'all';
  setSelectedTier: (tier: AIToolTier | 'all') => void;
  viewType: 'grid' | 'list';
  setViewType: (viewType: 'grid' | 'list') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  allPlatformTools: AIToolItem[] | undefined;
  filteredTools: AIToolItem[] | undefined;
  isLoading: boolean;
}

const AIToolsDirectoryContent: React.FC<AIToolsDirectoryContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier,
  viewType,
  setViewType,
  activeTab,
  setActiveTab,
  allPlatformTools,
  filteredTools,
  isLoading
}) => {
  const [selectedTool, setSelectedTool] = useState<AIToolItem | null>(null);
  const [toolModalOpen, setToolModalOpen] = useState(false);

  // Group tools by tier for the Tiers tab
  const tierGroups: AIToolTier[] = ['freemium', 'basic', 'pro'];
  const toolsByTier = tierGroups.map(tier => {
    const tierTools = aiTools.filter(tool => tool.tier === tier);
    return { tier, tools: tierTools };
  });

  // Handle tool selection
  const handleToolSelect = (tool: AIToolItem) => {
    if (tool.externalUrl) return;
    setSelectedTool(tool);
    setToolModalOpen(true);
  };

  const viewControls = (
    <div className="flex items-center gap-1 sm:gap-2">
      <Button 
        variant={viewType === 'grid' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewType('grid')}
        className="h-8 w-8 p-0 sm:px-2 sm:w-auto"
      >
        <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline ml-1">Grid</span>
      </Button>
      <Button 
        variant={viewType === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewType('list')}
        className="h-8 w-8 p-0 sm:px-2 sm:w-auto"
      >
        <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline ml-1">List</span>
      </Button>
    </div>
  );

  return (
    <>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-6 sm:mb-8">
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
            viewControls={viewControls}
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
            viewControls={viewControls}
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
            viewControls={viewControls}
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
            viewControls={viewControls}
            viewType={viewType}
          />
        </TabsContent>
        
        {/* Compare Tab */}
        <TabsContent value="compare" className="mt-0">
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-[#f5f8fa] border border-blue-100 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">AI Tool Tier Comparison</h2>
            <p className="text-sm sm:text-base text-gray-600">Compare features and capabilities across different subscription tiers</p>
          </div>
          
          <ToolTierComparison />
          
          <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12">
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

      {/* Tool Interface Modal */}
      <ToolInterfaceModal
        open={toolModalOpen}
        onOpenChange={setToolModalOpen}
        tool={selectedTool}
      />
    </>
  );
};

export default AIToolsDirectoryContent;
