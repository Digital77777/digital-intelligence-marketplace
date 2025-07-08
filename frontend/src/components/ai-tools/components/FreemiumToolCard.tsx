
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIToolItem } from '@/data/ai-tools-tiers';
import { ExternalLink, Zap } from 'lucide-react';

interface FreemiumToolCardProps {
  tool: AIToolItem;
  onSelect?: (tool: AIToolItem) => void;
  compact?: boolean;
}

const FreemiumToolCard: React.FC<FreemiumToolCardProps> = ({ 
  tool, 
  onSelect, 
  compact = false 
}) => {
  if (compact) {
    return (
      <Card className="hover:shadow-md transition-all duration-200 border-blue-100 bg-gradient-to-br from-blue-50/30 to-white">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-blue-600 p-2 rounded-lg bg-blue-100/50 flex-shrink-0">
              {tool.icon || <Zap className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate text-gray-800">{tool.name}</h3>
              <p className="text-xs text-gray-600 truncate">{tool.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              Free
            </Badge>
            {tool.externalUrl ? (
              <Button size="sm" variant="default" className="h-7 px-2" asChild>
                <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="default" 
                className="h-7 px-2"
                onClick={() => onSelect?.(tool)}
              >
                <Zap className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-blue-100 bg-gradient-to-br from-blue-50/20 to-white group">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-transparent">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:scale-105 transition-transform">
              {tool.icon || <Zap className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-blue-600 font-medium capitalize">
                {tool.category.replace('-', ' ')}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Free Access
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {tool.description}
        </p>
        
        {tool.use_cases && tool.use_cases.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {tool.use_cases.slice(0, 2).map((useCase, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  {useCase}
                </Badge>
              ))}
              {tool.use_cases.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  +{tool.use_cases.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <div className="p-4 pt-0">
        {tool.externalUrl ? (
          <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Tool
            </a>
          </Button>
        ) : (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onSelect?.(tool)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Launch Tool
          </Button>
        )}
      </div>
    </Card>
  );
};

export default FreemiumToolCard;
