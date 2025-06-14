
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Lightbulb, Zap } from 'lucide-react'; // Example icons

interface ToolCardContentProps {
  tool: AIToolItem;
}

const ToolCardContent: React.FC<ToolCardContentProps> = ({ tool }) => {
  return (
    <div className="flex-grow pt-4 space-y-3"> {/* Reduced space-y for tighter content */}
      <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-300 line-clamp-3"> {/* Added line-clamp */}
        {tool.description}
      </p>
      
      {tool.function && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-3 border border-slate-200 dark:border-slate-700/70">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-xs text-slate-700 dark:text-slate-200">Function</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 pl-6">{tool.function}</p>
        </div>
      )}

      {tool.uniqueSellingPoint && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-md p-3 border border-slate-200 dark:border-slate-700/70">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-green-500" />
            <h4 className="font-medium text-xs text-slate-700 dark:text-slate-200">Key Advantage</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 pl-6">{tool.uniqueSellingPoint}</p>
        </div>
      )}
      
      {tool.use_cases && tool.use_cases.length > 0 && (
        <div>
          <h4 className="font-medium text-xs mb-1.5 text-gray-500 dark:text-gray-400">Use Cases</h4>
          <div className="flex flex-wrap gap-1.5">
            {tool.use_cases.slice(0, 3).map((useCase, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-normal py-0.5 px-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                {useCase}
              </Badge>
            ))}
            {tool.use_cases.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal py-0.5 px-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600">
                +{tool.use_cases.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {tool.technologies && tool.technologies.length > 0 && (
        <div>
          <h4 className="font-medium text-xs mb-1.5 text-gray-500 dark:text-gray-400">Technologies</h4>
          <div className="flex flex-wrap gap-1">
            {tool.technologies.slice(0, 4).map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-normal py-0 px-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50">
                {tech}
              </Badge>
            ))}
            {tool.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs font-normal py-0 px-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50">
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
