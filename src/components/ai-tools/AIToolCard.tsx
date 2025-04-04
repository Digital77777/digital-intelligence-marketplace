
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIToolItem, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import { Check, ExternalLink, Info, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTier } from '@/context/TierContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIToolCardProps {
  tool: AIToolItem;
  compact?: boolean;
  onSelect?: (tool: AIToolItem) => void;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, compact = false, onSelect }) => {
  const navigate = useNavigate();
  const { currentTier, upgradePrompt } = useTier();
  
  const hasAccess = (
    (tool.tier === 'freemium') || 
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) ||
    (tool.tier === 'pro' && currentTier === 'pro')
  );

  const handleToolAction = () => {
    if (hasAccess) {
      if (onSelect) {
        onSelect(tool);
      } else {
        navigate(`/tool/${tool.id}`);
      }
    } else {
      upgradePrompt(tool.tier);
    }
  };

  if (compact) {
    return (
      <Card className={`overflow-hidden transition-all ${!hasAccess ? 'opacity-80' : 'hover:shadow-md'}`}>
        <div className="p-4 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">{tool.icon}</div>
            <div>
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </div>
          </div>
          <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2 py-0.5 text-xs flex items-center gap-1`}>
            {getTierIcon(tool.tier)}
            <span>{getTierLabel(tool.tier)}</span>
          </Badge>
        </div>
        <div className="px-4 pb-4">
          <Button
            variant={hasAccess ? "default" : "outline"}
            size="sm"
            className="w-full"
            onClick={handleToolAction}
          >
            {hasAccess ? "Use Tool" : `Upgrade to ${getTierLabel(tool.tier)}`}
            {hasAccess ? <ExternalLink className="h-3.5 w-3.5 ml-1.5" /> : <Lock className="h-3.5 w-3.5 ml-1.5" />}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden h-full flex flex-col transition-all ${!hasAccess ? 'opacity-80' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-full">{tool.icon}</div>
            <div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <CardDescription>{tool.category}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2.5 py-1 text-xs flex items-center gap-1.5`}>
            {getTierIcon(tool.tier)}
            <span>{getTierLabel(tool.tier)}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 mb-4">{tool.description}</p>
        
        {tool.usageLimit && (
          <div className="flex items-start gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">{tool.usageLimit}</p>
          </div>
        )}
        
        <div className="bg-muted/50 rounded-lg p-3 mb-3">
          <h4 className="font-medium text-sm mb-1">Unique Selling Point</h4>
          <p className="text-xs text-foreground/80">{tool.uniqueSellingPoint}</p>
        </div>
        
        {tool.integrations && tool.integrations.length > 0 && (
          <div>
            <h4 className="font-medium text-xs mb-1 text-muted-foreground">Integrations</h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.integrations.map((integration, idx) => (
                <Badge key={idx} variant="outline" className="text-xs py-0 px-2">
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t mt-auto">
        <div className="w-full flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-xs text-muted-foreground">
                    {hasAccess ? "Available" : "Requires upgrade"}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {hasAccess 
                  ? "You have access to this tool with your current subscription" 
                  : `This tool requires a ${getTierLabel(tool.tier)} subscription`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button
            variant={hasAccess ? "default" : "outline"}
            size="sm"
            onClick={handleToolAction}
            className="gap-1.5"
          >
            {hasAccess ? (onSelect ? "Launch Tool" : "View Details") : `Upgrade to ${getTierLabel(tool.tier)}`}
            {hasAccess ? <ExternalLink className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIToolCard;
