
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiTools } from '@/data/ai-tools-tiers';
import { useTier } from '@/context/TierContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AvailableTools = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();
  
  const availableTools = useMemo(() => {
    // Filter tools based on the user's current tier
    return aiTools.filter(tool => {
      switch (tool.tier) {
        case 'freemium':
          return true; // Available to all users
        case 'basic':
          return currentTier === 'basic' || currentTier === 'pro';
        case 'pro':
          return currentTier === 'pro';
        default:
          return false;
      }
    }).slice(0, 6); // Limit display to 6 tools
  }, [currentTier]);
  
  const handleViewAllTools = () => {
    navigate('/ai-tools-directory');
  };
  
  const handleToolClick = (toolId: string) => {
    navigate(`/tool/${toolId}`);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Available AI Tools</h2>
            <p className="text-muted-foreground">
              Access these powerful AI tools with your {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} subscription
            </p>
          </div>
          
          <Button onClick={handleViewAllTools} variant="ghost" className="hidden sm:flex items-center gap-1">
            View All Tools <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTools.map(tool => (
            <Card 
              key={tool.id}
              className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleToolClick(tool.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 text-2xl flex items-center justify-center bg-primary/10 rounded-lg">
                    <span>{tool.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button onClick={handleViewAllTools} variant="outline">
            View All Tools <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AvailableTools;
