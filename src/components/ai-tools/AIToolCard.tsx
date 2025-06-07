
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
  ArrowRight, 
  ExternalLink, 
  Zap, 
  Code, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  BarChart3, 
  Users, 
  Globe,
  Shield,
  Cpu
} from 'lucide-react';
import { useTier } from '@/context/TierContext';

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
    switch (category) {
      case 'image-generation': return <ImageIcon className="h-4 w-4" />;
      case 'text-tools': return <FileText className="h-4 w-4" />;
      case 'productivity': return <Zap className="h-4 w-4" />;
      case 'data-analysis': return <BarChart3 className="h-4 w-4" />;
      case 'automation': return <Cpu className="h-4 w-4" />;
      case 'machine-learning': return <Cpu className="h-4 w-4" />;
      case 'collaboration': return <Users className="h-4 w-4" />;
      case 'development': return <Code className="h-4 w-4" />;
      case 'music': return <Music className="h-4 w-4" />;
      case 'video-editing': return <Video className="h-4 w-4" />;
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
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-sm text-3xl group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{tool.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {getCategoryIcon(tool.category)}
                <CardDescription className="capitalize font-medium">
                  {tool.category.replace('-', ' ')}
                </CardDescription>
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
      </CardHeader>
      
      <CardContent className="flex-grow pt-4 space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">{tool.description}</p>
        
        {tool.function && (
          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
            <h4 className="font-medium text-sm mb-1 text-blue-900">Function</h4>
            <p className="text-xs text-blue-700">{tool.function}</p>
          </div>
        )}

        {tool.uniqueSellingPoint && (
          <div className="bg-green-50/50 rounded-lg p-3 border border-green-100">
            <h4 className="font-medium text-sm mb-1 text-green-900">Key Advantage</h4>
            <p className="text-xs text-green-700">{tool.uniqueSellingPoint}</p>
          </div>
        )}
        
        {tool.use_cases && tool.use_cases.length > 0 && (
          <div>
            <h4 className="font-medium text-xs mb-2 text-gray-600">Use Cases</h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.use_cases.slice(0, 3).map((useCase, idx) => (
                <Badge key={idx} variant="outline" className="text-xs py-0.5 px-2 bg-gray-50 hover:bg-gray-100 transition-colors">
                  {useCase}
                </Badge>
              ))}
              {tool.use_cases.length > 3 && (
                <Badge variant="outline" className="text-xs py-0.5 px-2 bg-gray-50">
                  +{tool.use_cases.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {tool.technologies && tool.technologies.length > 0 && (
          <div>
            <h4 className="font-medium text-xs mb-2 text-gray-600">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {tool.technologies.slice(0, 4).map((tech, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs py-0 px-1.5 bg-purple-50 text-purple-700">
                  {tech}
                </Badge>
              ))}
              {tool.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs py-0 px-1.5 bg-purple-50 text-purple-700">
                  +{tool.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {tool.usageLimit && (
          <div className="bg-amber-50/50 rounded-lg p-3 border border-amber-100">
            <h4 className="font-medium text-sm mb-1 text-amber-900">Usage Limits</h4>
            <p className="text-xs text-amber-700">{tool.usageLimit}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t mt-auto bg-gradient-to-r from-gray-50/50 to-transparent">
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
      </CardFooter>
    </Card>
  );
};

export default AIToolCard;
