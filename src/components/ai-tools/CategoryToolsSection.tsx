import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ToolCategoryInfo } from '@/types/tools';
import AIToolCard from './AIToolCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryToolsSectionProps {
  category: ToolCategoryInfo;
  tools: AIToolItem[];
  limit?: number;
  onToolSelect?: (tool: AIToolItem) => void;
}

const CategoryToolsSection: React.FC<CategoryToolsSectionProps> = ({ 
  category, 
  tools,
  limit,
  onToolSelect
}) => {
  const navigate = useNavigate();
  const displayTools = limit ? tools.slice(0, limit) : tools;
  
  const handleViewMore = () => {
    navigate(`/ai-tools-directory?category=${category.id}`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-full">
            {category.icon}
          </div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
          <span className="text-sm text-muted-foreground ml-2">
            ({tools.length} tools)
          </span>
        </div>
        {limit && tools.length > limit && (
          <Button variant="outline" size="sm" onClick={handleViewMore}>
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-4">{category.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayTools.map(tool => (
          <AIToolCard 
            key={tool.id} 
            tool={tool}
            onSelect={onToolSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryToolsSection;
