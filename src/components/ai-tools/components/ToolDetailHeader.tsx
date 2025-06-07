
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Play } from 'lucide-react';
import { AIToolItem, getTierBadgeColor, getTierIcon, getTierLabel } from '@/data/ai-tools-tiers';

interface ToolDetailHeaderProps {
  tool: AIToolItem;
  onBack: () => void;
  onLaunch: () => void;
}

const ToolDetailHeader: React.FC<ToolDetailHeaderProps> = ({ tool, onBack, onLaunch }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tools
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              {tool.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{tool.name}</h1>
              <p className="text-gray-600 mt-1">{tool.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className={getTierBadgeColor(tool.tier)}>
                  {getTierIcon(tool.tier)}
                  <span className="ml-1">{getTierLabel(tool.tier)}</span>
                </Badge>
                <Badge variant="outline">{tool.category}</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-600 ml-1">(4.8)</span>
            </div>
            <Button onClick={onLaunch} className="bg-green-600 hover:bg-green-700">
              <Play className="h-4 w-4 mr-2" />
              Launch Tool
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailHeader;
