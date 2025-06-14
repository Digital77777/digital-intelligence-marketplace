
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader, // Removed CardDescription, CardFooter as they are part of subcomponents
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
  Lock, // Added Lock icon
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
      case 'machine learning': return <Cpu className="h-4 w-4" />; // Could use a more specific icon like Brain
      case 'collaboration': return <Users className="h-4 w-4" />;
      case 'development': return <Code className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      case 'video editing': return <Video className="h-4 w-4" />;
      case 'voice': return <Music className="h-4 w-4" />; // Could use Mic
      case 'seo': return <Globe className="h-4 w-4" />; // Could use Search
      case 'marketing': return <BarChart3 className="h-4 w-4" />; // Could use Megaphone or TrendingUp
      case 'ethics': return <Shield className="h-4 w-4" />;
      case 'cloud': return <Globe className="h-4 w-4" />; // Could use Cloud
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (compact) {
    return (
      <Card className={`overflow-hidden transition-all duration-300 ease-in-out border dark:border-gray-700 ${hasAccess ? 'hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/70' : 'opacity-85 hover:opacity-100'} group bg-white dark:bg-gray-800`}>
        <div className="p-3 flex justify-between items-start"> {/* Reduced padding */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2.5 rounded-md text-2xl group-hover:scale-105 transition-transform"> {/* Icon style similar to full card */}
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0"> {/* Added flex-1 and min-w-0 for truncation */}
              <h3 className="font-medium text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary truncate">{tool.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="text-primary">{getCategoryIcon(tool.category)}</span>
                <span className="capitalize truncate">{tool.category.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2 py-0.5 text-xs flex items-center gap-1 border shadow-xs`}>
            {getTierIcon(tool.tier)}
            <span className="hidden sm:inline">{getTierLabel(tool.tier)}</span> {/* Hide on very small screens if needed */}
          </Badge>
        </div>
        <div className="px-3 pb-3 border-t dark:border-gray-700/50 pt-3"> {/* Added border-t and padding */}
          <Button 
            variant={hasAccess ? "default" : "outline"} 
            size="sm" 
            className={`w-full ${hasAccess ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'}`}
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
                Upgrade
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden h-full flex flex-col border dark:border-gray-700/80 ${hasAccess ? 'hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/60 hover:-translate-y-1' : 'opacity-90 hover:opacity-100'} group bg-white dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300 ease-in-out`}>
      <CardHeader className="pb-2 bg-gray-50/30 dark:bg-gray-900/20 dark:border-b dark:border-gray-700/50 relative"> {/* Adjusted padding and bg */}
        <ToolCardHeader tool={tool} getCategoryIcon={getCategoryIcon} />
      </CardHeader>
      
      <CardContent className="flex-grow"> {/* Added flex-grow to ensure content takes available space */}
        <ToolCardContent tool={tool} />
      </CardContent>
      
      {/* Footer is now a direct child, not wrapped in CardFooter from shadcn/ui */}
      <div className="p-4 pt-0"> {/* Wrapper for ToolCardFooter with padding control */}
        <ToolCardFooter tool={tool} hasAccess={hasAccess} onSelect={onSelect} />
      </div>
    </Card>
  );
};

export default AIToolCard;
