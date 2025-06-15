import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
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
  Code,
  Lock,
  ArrowRight
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
  
  // Fixed tier access logic - hierarchical access
  const hasAccess = (
    !!tool.externalUrl || // External tools are always accessible
    (tool.tier === 'freemium') || // Freemium tools available to all
    (tool.tier === 'basic' && (currentTier === 'basic' || currentTier === 'pro')) || // Basic tools for basic+ users
    (tool.tier === 'pro' && currentTier === 'pro') // Pro tools only for pro users
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
      case 'agriculture': return <span>🌾</span>;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (compact) {
    return (
      <Card className={`overflow-hidden transition-all duration-300 ease-in-out border dark:border-gray-700 ${hasAccess ? 'hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/70' : 'opacity-60 hover:opacity-80 border-dashed'} group bg-white dark:bg-gray-800`}>
        <div className="p-3 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`text-primary p-2.5 rounded-md text-2xl group-hover:scale-105 transition-transform ${hasAccess ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-700'}`}>
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-sm group-hover:text-primary truncate ${hasAccess ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>{tool.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="text-primary">{getCategoryIcon(tool.category)}</span>
                <span className="capitalize truncate">{tool.category.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2 py-0.5 text-xs flex items-center gap-1 border shadow-xs`}>
            {getTierIcon(tool.tier)}
            <span className="hidden sm:inline">{getTierLabel(tool.tier)}</span>
          </Badge>
        </div>
        <div className="px-3 pb-3 border-t dark:border-gray-700/50 pt-3">
          {tool.externalUrl ? (
            <Button variant="default" size="sm" className="w-full" asChild>
              <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Visit Tool
                <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </a>
            </Button>
          ) : (
            <Button 
              variant={hasAccess ? "default" : "outline"} 
              size="sm" 
              className={`w-full ${hasAccess ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 border-dashed'}`}
              onClick={() => onSelect?.(tool)}
            >
              {hasAccess ? (
                <>
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Launch
                  <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                </>
              ) : (
                <>
                  <Lock className="h-3.5 w-3.5 mr-1" />
                  Upgrade to {getTierLabel(tool.tier)}
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden h-full flex flex-col border dark:border-gray-700/80 ${hasAccess ? 'hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/60 hover:-translate-y-1' : 'opacity-70 hover:opacity-85 border-dashed'} group bg-white dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300 ease-in-out`}>
      <CardHeader className={`pb-2 relative ${hasAccess ? 'bg-gray-50/30 dark:bg-gray-900/20' : 'bg-gray-100/50 dark:bg-gray-800/50'} dark:border-b dark:border-gray-700/50`}>
        <ToolCardHeader tool={tool} getCategoryIcon={getCategoryIcon} />
        {!hasAccess && (
          <div className="absolute top-2 right-2">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ToolCardContent tool={tool} />
      </CardContent>
      
      <div className="p-4 pt-0">
        <ToolCardFooter tool={tool} hasAccess={hasAccess} onSelect={onSelect} />
      </div>
    </Card>
  );
};

export default AIToolCard;
