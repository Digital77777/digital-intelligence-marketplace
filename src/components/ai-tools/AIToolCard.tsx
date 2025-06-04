
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
import { AIToolItem, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';
import { Check, Info, Key, Lock, Server, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useTier } from '@/context/TierContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ToolActionButton from './ToolActionButton';
import apiConnectionManager from '@/utils/apiConnectionManager';

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

  // Check if this tool has an API connection
  const isApiConnected = apiConnectionManager.hasConnection(tool.id);
  const connectionDetails = isApiConnected ? apiConnectionManager.getConnection(tool.id) : null;
  const hasOpenSourceOption = apiConnectionManager.hasOpenSourceAlternative(tool.id);
  
  const isUsingOpenSource = connectionDetails?.modelProvider === 'open-source';

  if (compact) {
    return (
      <Card className={`overflow-hidden transition-all border ${hasAccess ? 'hover:shadow-md hover:border-blue-200' : 'opacity-80'}`}>
        <div className="p-4 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">{tool.icon}</div>
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
        <div className="px-4 pb-4 flex gap-2">
          <ToolActionButton
            tool={tool}
            compact={true}
            action="view"
            className="flex-1"
          />
          <ToolActionButton
            tool={tool}
            compact={true}
            action={isApiConnected ? "launch" : "connect-api"}
            onSelect={onSelect}
            className="flex-1"
          />
        </div>
        {isApiConnected && (
          <div className="px-4 pb-2 flex items-center gap-1 text-xs">
            {isUsingOpenSource ? (
              <span className="text-green-600 flex items-center gap-1">
                <Server className="h-3 w-3" /> Open Source
              </span>
            ) : (
              <span className="text-blue-600 flex items-center gap-1">
                <Key className="h-3 w-3" /> API Connected
              </span>
            )}
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden h-full flex flex-col transition-all border ${hasAccess ? 'hover:shadow-md hover:border-blue-200' : 'opacity-80'}`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-transparent">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100/80 p-2.5 rounded-full shadow-sm">{tool.icon}</div>
            <div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <CardDescription className="capitalize">{tool.category.replace('-', ' ')}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${getTierBadgeColor(tool.tier)} px-2.5 py-1 text-xs flex items-center gap-1.5`}>
            {getTierIcon(tool.tier)}
            <span>{getTierLabel(tool.tier)}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <p className="text-sm text-gray-700 mb-4">{tool.description}</p>
        
        {tool.usageLimit && (
          <div className="flex items-start gap-2 mb-3 bg-blue-50/50 p-2 rounded-md">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700">{tool.usageLimit}</p>
          </div>
        )}
        
        <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
          <h4 className="font-medium text-sm mb-1">Unique Selling Point</h4>
          <p className="text-xs text-gray-700">{tool.uniqueSellingPoint}</p>
        </div>
        
        {hasOpenSourceOption && (
          <div className="bg-green-50 rounded-lg p-3 mb-3 border border-green-100">
            <h4 className="font-medium text-sm mb-1 flex items-center gap-1.5 text-green-800">
              <Server className="h-4 w-4" /> Open Source Available
            </h4>
            <p className="text-xs text-green-700">
              This tool can run using open source models in your browser
            </p>
          </div>
        )}
        
        {tool.integrations && tool.integrations.length > 0 && (
          <div>
            <h4 className="font-medium text-xs mb-1 text-gray-500">Integrations</h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.integrations.map((integration, idx) => (
                <Badge key={idx} variant="outline" className="text-xs py-0 px-2 bg-gray-50">
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {isApiConnected && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            {isUsingOpenSource ? (
              <div className="text-green-700 bg-green-50 px-3 py-1.5 rounded-md flex items-center gap-2 w-full border border-green-100">
                <Server className="h-4 w-4" />
                <span className="font-medium">Using Open Source Models</span>
              </div>
            ) : (
              <div className="text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md flex items-center gap-2 w-full border border-blue-100">
                <Key className="h-4 w-4" />
                <span className="font-medium">API Connected</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t mt-auto bg-gray-50/50">
        <div className="w-full flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-xs text-gray-600">
                    {hasAccess ? (isApiConnected ? "Ready to use" : "Available") : "Requires upgrade"}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {hasAccess 
                  ? (isApiConnected 
                    ? (isUsingOpenSource ? "Using open source models" : "API connected and ready to use")
                    : "You have access to this tool with your current subscription") 
                  : `This tool requires a ${getTierLabel(tool.tier)} subscription`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex gap-2">
            <ToolActionButton 
              tool={tool}
              action="view"
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              Details
            </ToolActionButton>
            <ToolActionButton 
              tool={tool}
              action={isApiConnected ? "launch" : "connect-api"}
              size="sm"
              onSelect={onSelect}
            >
              {isApiConnected ? (
                <>
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Launch
                </>
              ) : (
                'Connect'
              )}
            </ToolActionButton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIToolCard;
