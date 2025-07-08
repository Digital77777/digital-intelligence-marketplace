
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import FreemiumToolCard from './FreemiumToolCard';
import { Spinner } from '@/components/ui/spinner';
import { Zap } from 'lucide-react';

interface FreemiumToolsGridProps {
  tools: AIToolItem[] | undefined;
  isLoading: boolean;
  onToolSelect: (tool: AIToolItem) => void;
  viewType: 'grid' | 'list';
}

const FreemiumToolsGrid: React.FC<FreemiumToolsGridProps> = ({
  tools,
  isLoading,
  onToolSelect,
  viewType
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Zap className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Tools Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any freemium tools matching your criteria. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className={
      viewType === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        : "space-y-3"
    }>
      {tools.map(tool => (
        <FreemiumToolCard 
          key={tool.id} 
          tool={tool} 
          onSelect={onToolSelect}
          compact={viewType === 'list'}
        />
      ))}
    </div>
  );
};

export default FreemiumToolsGrid;
