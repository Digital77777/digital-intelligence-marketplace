
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
import { 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  BarChart3, 
  Users, 
  Globe,
  Shield,
  Cpu,
  Zap,
  Code
} from 'lucide-react';
import { useTier } from '@/context/TierContext';
import ToolCardHeader from './components/ToolCardHeader';
import ToolCardContent from './components/ToolCardContent';
import ToolCardFooter from './components/ToolCardFooter';

interface AIToolCardProps {
  tool: AIToolItem;
  compact?: boolean;
  onSelect?: (tool: AIToolItem) => void;
}

const AIToolCard: React.FC<AIToolCardProps> = ({ tool, compact = false, onSelect }) => {
  const { currentTier } = useTier();
  
  // Access logic to ensure proper tier access
  const hasAccess = (
    (tool.tier === 'freemium') || 
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) ||
    (tool.tier === 'pro' && currentTier === 'pro')
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'image generation': return <ImageIcon className="h-4 w-4" />;
      case 'text tools': return <FileText className="h-4 w-4" />;
      case 'productivity': return <Zap className="h-4 w-4" />;
      case 'data analysis': return <BarChart3 className="h-4 w-4" />;
      case 'automation': return <Cpu className="h-4 w-4" />;
      case 'machine learning': return <Cpu className="h-4 w-4" />;
      case 'collaboration': return <Users className="h-4 w-4" />;
      case 'development': return <Code className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      case 'video editing': return <Video className="h-4 w-4" />;
      case 'voice': return <Music className="h-4 w-4" />;
      case 'seo': return <Globe className="h-4 w-4" />;
      case 'marketing': return <BarChart3 className="h-4 w-4" />;
      case 'ethics': return <Shield className="h-4 w-4" />;
      case 'cloud': return <Globe className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (compact) {
    return (
      <Card className={`overflow-hidden transition-all border ${hasAccess ? 'hover:shadow-md hover:border-blue-200' : 'opacity-80'}`}>
        <div className="p-4 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full text-2xl">{tool.icon}</div>
            <div>
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getCategoryIcon(tool.category)}
                <span className="capitalize">{tool.category.replace('-', ' ')}</span>
              </div>
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
            onClick={() => onSelect?.(tool)}
            disabled={!hasAccess}
          >
            {hasAccess ? (
              <>
                <ExternalLink className="h-3 w-3 mr-1" />
                Launch Tool
              </>
            ) : (
              'Upgrade Required'
            )}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden h-full flex flex-col transition-all border ${hasAccess ? 'hover:shadow-lg hover:border-blue-300 hover:-translate-y-1' : 'opacity-80'} group`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-transparent relative">
        <ToolCardHeader tool={tool} getCategoryIcon={getCategoryIcon} />
      </CardHeader>
      
      <CardContent>
        <ToolCardContent tool={tool} />
      </CardContent>
      
      <CardFooter>
        <ToolCardFooter tool={tool} hasAccess={hasAccess} onSelect={onSelect} />
      </CardFooter>
    </Card>
  );
};

export default AIToolCard;
