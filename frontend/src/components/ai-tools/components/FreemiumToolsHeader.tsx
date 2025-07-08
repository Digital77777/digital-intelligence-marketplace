
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface FreemiumToolsHeaderProps {
  toolCount: number;
}

const FreemiumToolsHeader: React.FC<FreemiumToolsHeaderProps> = ({ toolCount }) => {
  return (
    <div className="text-center mb-8">
      <Badge variant="outline" className="mb-4 px-4 py-2 bg-blue-50 border-blue-200">
        <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
        <span className="text-blue-700 font-medium">Free Access Tools</span>
      </Badge>
      
      <h2 className="text-2xl lg:text-3xl font-bold mb-3">
        Freemium <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI Tools</span>
      </h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base">
        Access powerful AI tools for free. Perfect for getting started with AI-powered solutions.
        {toolCount > 0 && (
          <span className="block mt-1 text-blue-600 font-medium">
            {toolCount} tools available
          </span>
        )}
      </p>
    </div>
  );
};

export default FreemiumToolsHeader;
