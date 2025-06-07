
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Play, BookOpen } from 'lucide-react';
import { AIToolItem, getTierBadgeColor, getTierLabel } from '@/data/ai-tools-tiers';

interface ToolDetailSidebarProps {
  tool: AIToolItem;
  onLaunch: () => void;
}

const ToolDetailSidebar: React.FC<ToolDetailSidebarProps> = ({ tool, onLaunch }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Category</span>
            <Badge variant="outline">{tool.category}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tier</span>
            <Badge className={getTierBadgeColor(tool.tier)}>
              {getTierLabel(tool.tier)}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Users</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-400" />
              <span>12,500+</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={onLaunch} className="w-full bg-green-600 hover:bg-green-700">
            <Play className="h-4 w-4 mr-2" />
            Launch {tool.name}
          </Button>
          <Button variant="outline" className="w-full">
            <BookOpen className="h-4 w-4 mr-2" />
            View Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolDetailSidebar;
