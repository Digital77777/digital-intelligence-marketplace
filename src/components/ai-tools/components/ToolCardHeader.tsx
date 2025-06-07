
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
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-sm text-3xl group-hover:scale-110 transition-transform">
          {tool.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">{tool.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            {getCategoryIcon(tool.category)}
            <span className="capitalize font-medium text-sm text-gray-600">
              {tool.category.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-3 py-1 text-xs flex items-center gap-1.5 shadow-sm`}>
          {getTierIcon(tool.tier)}
          <span>{getTierLabel(tool.tier)}</span>
        </Badge>
        {tool.popularTool && (
          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
            🔥 Popular
          </Badge>
        )}
        {tool.featured && (
          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
            ⭐ Featured
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ToolCardHeader;
