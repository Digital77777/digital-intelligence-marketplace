
import React from 'react';
import { AIToolItem, AIToolTier } from '@/data/ai-tools-tiers';
import AIToolCard from '@/components/ai-tools/AIToolCard';
import ToolsFilter from '@/components/ai-tools/ToolsFilter';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface AllToolsTabProps {
  isLoading: boolean;
  filteredTools: AIToolItem[] | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTier: AIToolTier | 'all';
  setSelectedTier: (tier: AIToolTier | 'all') => void;
  viewType: 'grid' | 'list';
  setViewType: (viewType: 'grid' | 'list') => void;
  totalTools: number;
  onToolSelect: (tool: AIToolItem) => void;
}

const AllToolsTab: React.FC<AllToolsTabProps> = ({
  isLoading,
  filteredTools,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier,
  viewType,
  setViewType,
  totalTools,
  onToolSelect
}) => {
  return (
    <>
      <ToolsFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        viewType={viewType}
        setViewType={setViewType}
        totalTools={totalTools}
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
            <AIToolCard 
              key={tool.id} 
              tool={tool} 
              compact={viewType === 'list'} 
              onSelect={() => onToolSelect(tool)}
            />
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
    </>
  );
};

export default AllToolsTab;
