
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight, Lock } from 'lucide-react';
import { AIToolItem, getTierLabel } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';

interface ToolCardFooterProps {
  tool: AIToolItem;
  hasAccess: boolean;
  onSelect?: (tool: AIToolItem) => void;
}

const ToolCardFooter: React.FC<ToolCardFooterProps> = ({ tool, hasAccess, onSelect }) => {
  if (tool.externalUrl) {
    return (
      <div className="pt-3 border-t mt-auto bg-gray-50/30 dark:bg-gray-800/20 dark:border-gray-700/50">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                External Tool
              </span>
            </div>
          </div>
          <Button className="w-full group-hover:shadow-lg transition-shadow duration-300" asChild>
            <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Visit Tool
              <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-3 border-t mt-auto dark:border-gray-700/50 ${hasAccess ? 'bg-gray-50/30 dark:bg-gray-800/20' : 'bg-gray-100/50 dark:bg-gray-700/30'}`}>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-red-400'}`}></div>
            <span className={`text-xs ${hasAccess ? 'text-gray-500 dark:text-gray-400' : 'text-red-500 dark:text-red-400'}`}>
              {hasAccess ? "Available" : `Requires ${getTierLabel(tool.tier)} Tier`}
            </span>
          </div>
          {tool.demoAvailable && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50">
              Demo Available
            </Badge>
          )}
        </div>
        
        <Button 
          className={`w-full group-hover:shadow-lg transition-shadow duration-300 ${hasAccess ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 border-dashed border'}`}
          variant={hasAccess ? "default" : "outline"}
          onClick={() => onSelect?.(tool)}
        >
          {hasAccess ? (
            <>
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Launch Tool
              <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-1.5" />
              Upgrade to {getTierLabel(tool.tier)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ToolCardFooter;
