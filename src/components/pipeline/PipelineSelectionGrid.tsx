
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pipeline, Deal } from './PipelineCanvas';
import { Plus, Folder } from 'lucide-react';

interface PipelineSelectionGridProps {
  pipelines: Pipeline[];
  dealsByPipeline: Record<string, Deal[]>;
  onSelectPipeline: (pipeline: Pipeline) => void;
  onCreatePipeline: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
};

const PipelineCard = ({ pipeline, deals, onSelect }: { pipeline: Pipeline, deals: Deal[], onSelect: (pipeline: Pipeline) => void }) => {
  const dealCount = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col" onClick={() => onSelect(pipeline)}>
      <CardHeader className="flex-grow">
        <CardTitle>{pipeline.name}</CardTitle>
        <CardDescription>{pipeline.description || 'No description'}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center mt-auto pt-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Folder className="w-4 h-4" />
            <span>{pipeline.stages.length} Stages</span>
        </div>
        <div className="text-right">
            <div className="font-semibold">{dealCount} Deals</div>
            <div className="text-sm text-gray-500">{formatCurrency(totalValue)}</div>
        </div>
      </CardContent>
    </Card>
  );
};


const PipelineSelectionGrid: React.FC<PipelineSelectionGridProps> = ({ pipelines, dealsByPipeline, onSelectPipeline, onCreatePipeline }) => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pipeline Designer</h1>
          <p className="text-gray-600">Select a pipeline to view its deals or create a new one.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pipelines.map(pipeline => (
          <PipelineCard 
            key={pipeline.id} 
            pipeline={pipeline} 
            deals={dealsByPipeline[pipeline.id] || []}
            onSelect={onSelectPipeline} 
          />
        ))}
         <Card 
            className="flex items-center justify-center border-2 border-dashed hover:border-primary hover:text-primary transition-colors cursor-pointer min-h-[180px]"
            onClick={onCreatePipeline}
        >
          <CardContent className="text-center p-6">
            <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-semibold">Create New Pipeline</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelineSelectionGrid;
