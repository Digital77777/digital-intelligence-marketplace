
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { AIToolItem, getTierLabel } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';

interface ToolCardFooterProps {
  tool: AIToolItem;
  hasAccess: boolean;
  onSelect?: (tool: AIToolItem) => void;
}

const ToolCardFooter: React.FC<ToolCardFooterProps> = ({ tool, hasAccess, onSelect }) => {
  return (
    <div className="pt-4 border-t mt-auto bg-gradient-to-r from-gray-50/50 to-transparent">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <span className="text-xs text-gray-600">
              {hasAccess ? "Available" : "Requires upgrade"}
            </span>
          </div>
          {tool.demoAvailable && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
              Demo Available
            </Badge>
          )}
        </div>
        
        <Button 
          className={`w-full ${hasAccess ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' : ''}`}
          variant={hasAccess ? "default" : "outline"}
          onClick={() => onSelect?.(tool)}
          disabled={!hasAccess}
        >
          {hasAccess ? (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              Launch Tool
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Upgrade to {getTierLabel(tool.tier)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ToolCardFooter;
