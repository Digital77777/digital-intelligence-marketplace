
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface ComponentsSidebarProps {
  onAddComponent: (componentType: string) => void;
}

type ComponentType = {
  name: string;
  description: string;
  category: string;
};

const componentTypes: ComponentType[] = [
  { name: 'Data Input', description: 'Import and process training data', category: 'data' },
  { name: 'Pre-Processing', description: 'Clean and transform data', category: 'data' },
  { name: 'Training', description: 'Configure and train model', category: 'model' },
  { name: 'Validation', description: 'Test and validate results', category: 'evaluation' },
  { name: 'Deployment', description: 'Deploy and manage model', category: 'operations' },
];

const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ onAddComponent }) => {
  const { toast } = useToast();

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData('componentType', componentType);
  };

  const handleComponentClick = (componentType: string) => {
    onAddComponent(componentType);
    toast({
      title: `Adding ${componentType}`,
      description: "Drag the component to position it in the model.",
    });
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 text-white">
      <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
        <CardTitle className="text-sm font-medium">Components</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {componentTypes.map((component) => (
          <Tooltip key={component.name}>
            <TooltipTrigger asChild>
              <div
                className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all"
                draggable
                onDragStart={(e) => handleDragStart(e, component.name)}
                onClick={() => handleComponentClick(component.name)}
              >
                <div className="font-medium text-white mb-1">{component.name}</div>
                <div className="text-xs text-gray-400">{component.description}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700">
              <p className="text-xs">Drag to add to model</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};

export default ComponentsSidebar;
