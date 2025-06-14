
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight, Lock } from 'lucide-react'; // Added Lock icon
import { AIToolItem, getTierLabel } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';

interface ToolCardFooterProps {
  tool: AIToolItem;
  hasAccess: boolean;
  onSelect?: (tool: AIToolItem) => void;
}

const ToolCardFooter: React.FC<ToolCardFooterProps> = ({ tool, hasAccess, onSelect }) => {
  return (
    <div className="pt-3 border-t mt-auto bg-gray-50/30 dark:bg-gray-800/20 dark:border-gray-700/50"> {/* Adjusted padding and background */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2.5"> {/* Adjusted margin */}
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {hasAccess ? "Available" : `Requires ${getTierLabel(tool.tier)}`}
            </span>
          </div>
          {tool.demoAvailable && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50">
              Demo Available
            </Badge>
          )}
        </div>
        
        <Button 
          className={`w-full group-hover:shadow-lg transition-shadow duration-300 ${hasAccess ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'}`}
          variant={hasAccess ? "default" : "outline"}
          onClick={() => onSelect?.(tool)}
          // Removed disabled={!hasAccess} to allow clicking on upgrade buttons
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
