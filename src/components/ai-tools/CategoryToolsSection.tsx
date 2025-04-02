
import React from 'react';
import { ToolCategoryInfo, AIToolItem } from '@/data/ai-tools-tiers';
import AIToolCard from './AIToolCard';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryToolsSectionProps {
  category: ToolCategoryInfo;
  tools: AIToolItem[];
  compact?: boolean;
  limit?: number;
}

const CategoryToolsSection: React.FC<CategoryToolsSectionProps> = ({ 
  category, 
  tools,
  compact = false,
  limit
}) => {
  const navigate = useNavigate();
  const displayTools = limit ? tools.slice(0, limit) : tools;
  const hasMore = limit && tools.length > limit;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-full">
            {category.icon}
          </div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
        </div>
        
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-sm"
            onClick={() => navigate(`/ai-tools-directory?category=${category.id}`)}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-5">{category.description}</p>
      
      <div className={compact 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      }>
        {displayTools.map(tool => (
          <AIToolCard key={tool.id} tool={tool} compact={compact} />
        ))}
      </div>
    </div>
  );
};

export default CategoryToolsSection;
