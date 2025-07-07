
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AIToolCard from '@/components/ai-tools/AIToolCard';
import FreemiumToolsGrid from '@/components/ai-tools/components/FreemiumToolsGrid';
import FreemiumToolsHeader from '@/components/ai-tools/components/FreemiumToolsHeader';
import FreemiumViewControls from '@/components/ai-tools/components/FreemiumViewControls';
import { Spinner } from '@/components/ui/spinner';

interface ToolsTabContentProps {
  isLoading: boolean;
  filteredTools: AIToolItem[] | undefined;
  title: string;
  description: string;
  alertColor?: string;
  onToolSelect: (tool: AIToolItem) => void;
  viewControls?: React.ReactNode;
  viewType?: 'grid' | 'list';
}

const ToolsTabContent: React.FC<ToolsTabContentProps> = ({
  isLoading,
  filteredTools,
  title,
  description,
  alertColor,
  onToolSelect,
  viewControls,
  viewType = 'grid'
}) => {
  // Check if this is specifically for freemium tools
  const isFreemiumTab = title.toLowerCase().includes('freemium');
  
  if (isFreemiumTab) {
    return (
      <>
        <FreemiumToolsHeader toolCount={filteredTools?.length || 0} />
        <div className="flex justify-between items-center mb-6">
          <Alert className={`flex-grow mr-4 ${alertColor || "bg-blue-50 border-blue-200 text-blue-800"}`}>
            <AlertTitle>Free AI Tools</AlertTitle>
            <AlertDescription className="text-inherit opacity-80">
              {description}
            </AlertDescription>
          </Alert>
          <FreemiumViewControls 
            viewType={viewType}
            onViewTypeChange={() => {}} // This will be handled by parent component
          />
        </div>
        <FreemiumToolsGrid
          tools={filteredTools}
          isLoading={isLoading}
          onToolSelect={onToolSelect}
          viewType={viewType}
        />
      </>
    );
  }

  // Default layout for other tiers
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Alert className={`mb-0 p-4 flex-grow ${alertColor || "bg-blue-50 border-blue-200 text-blue-800"}`}>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="text-inherit opacity-80">
            {description}
          </AlertDescription>
        </Alert>
        
        {viewControls && (
          <div className="ml-auto">
            {viewControls}
          </div>
        )}
      </div>
      
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-[300px] rounded-lg bg-gray-100 animate-pulse"></div>
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
      ) : (
        <div className="space-y-4">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
            ))
          ) : filteredTools && filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <AIToolCard 
                key={tool.id} 
                tool={tool} 
                compact={true}
                onSelect={() => onToolSelect(tool)}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <p>No {title.toLowerCase()} tools found with the current filters.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ToolsTabContent;
