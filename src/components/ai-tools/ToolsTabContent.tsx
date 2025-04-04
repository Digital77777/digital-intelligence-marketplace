
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AIToolCard from '@/components/ai-tools/AIToolCard';
import { Spinner } from '@/components/ui/spinner';

interface ToolsTabContentProps {
  isLoading: boolean;
  filteredTools: AIToolItem[] | undefined;
  title: string;
  description: string;
  alertColor?: string;
  onToolSelect: (tool: AIToolItem) => void;
}

const ToolsTabContent: React.FC<ToolsTabContentProps> = ({
  isLoading,
  filteredTools,
  title,
  description,
  alertColor,
  onToolSelect
}) => {
  return (
    <>
      <Alert className={`mb-6 ${alertColor || "bg-[#00FFFF]/5 dark:border-[#00FFFF]/30"}`}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse"></div>
          ))
        ) : filteredTools && filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <AIToolCard 
              key={tool.id} 
              tool={tool} 
              onSelect={() => onToolSelect(tool)}
            />
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <p>No {title.toLowerCase()} tools found with the current filters.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolsTabContent;
