
import React from 'react';
import { AIToolItem, AIToolTier, getTierBadgeColor, getTierDescription, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import AIToolCard from './AIToolCard';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TierToolsSectionProps {
  tier: AIToolTier;
  tools: AIToolItem[];
  compact?: boolean;
  limit?: number;
}

const TierToolsSection: React.FC<TierToolsSectionProps> = ({ 
  tier, 
  tools,
  compact = false,
  limit
}) => {
  const navigate = useNavigate();
  const displayTools = limit ? tools.slice(0, limit) : tools;
  const hasMore = limit && tools.length > limit;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${getTierBadgeColor(tier)} px-3 py-1 text-sm flex items-center gap-1.5`}>
            {getTierIcon(tier)}
            <span>{getTierLabel(tier)} Tier</span>
          </Badge>
        </div>
        
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-sm"
            onClick={() => navigate(`/ai-tools-directory?tier=${tier}`)}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-5">{getTierDescription(tier)}</p>
      
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

export default TierToolsSection;
