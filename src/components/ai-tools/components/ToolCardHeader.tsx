
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AIToolItem, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';

interface ToolCardHeaderProps {
  tool: AIToolItem;
  getCategoryIcon: (category: string) => React.ReactNode;
}

const ToolCardHeader: React.FC<ToolCardHeaderProps> = ({ tool, getCategoryIcon }) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4"> {/* Increased gap for better spacing */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/20 to-primary/5 p-3 rounded-lg shadow-sm text-3xl text-primary group-hover:scale-105 transition-transform duration-300 ease-in-out">
          {tool.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors dark:text-gray-100 dark:group-hover:text-primary">
            {tool.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1"> {/* Adjusted gap */}
            <span className="text-primary">{getCategoryIcon(tool.category)}</span>
            <span className="capitalize font-medium text-xs text-gray-500 dark:text-gray-400">
              {tool.category.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5"> {/* Adjusted gap */}
        <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2.5 py-1 text-xs flex items-center gap-1 shadow-xs border`}>
          {getTierIcon(tool.tier)}
          <span>{getTierLabel(tool.tier)}</span>
        </Badge>
        {tool.popularTool && (
          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700/50">
            🔥 Popular
          </Badge>
        )}
        {tool.featured && (
          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50">
            ⭐ Featured
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ToolCardHeader;
