
import React from 'react';
import { AIToolItem, AIToolTier, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import AIToolCard from './AIToolCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface TierToolsSectionProps {
  tier: AIToolTier;
  tools: AIToolItem[];
  limit?: number;
  onToolSelect?: (tool: AIToolItem) => void;
}

const TierToolsSection: React.FC<TierToolsSectionProps> = ({ 
  tier, 
  tools,
  limit,
  onToolSelect
}) => {
  const navigate = useNavigate();
  const displayTools = limit ? tools.slice(0, limit) : tools;
  
  const handleViewMore = () => {
    navigate('/ai-tools-directory?tab=' + tier);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className={`${getTierBadgeColor(tier)} p-2 rounded-full`}>
            {getTierIcon(tier)}
          </div>
          <h2 className="text-xl font-semibold">{getTierLabel(tier)} Tier</h2>
          
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

export default TierToolsSection;
