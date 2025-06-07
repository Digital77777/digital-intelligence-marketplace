
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AIToolItem } from '@/data/ai-tools-tiers';

interface ToolCardContentProps {
  tool: AIToolItem;
}

const ToolCardContent: React.FC<ToolCardContentProps> = ({ tool }) => {
  return (
    <div className="flex-grow pt-4 space-y-4">
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
    </div>
  );
};

export default ToolCardContent;
