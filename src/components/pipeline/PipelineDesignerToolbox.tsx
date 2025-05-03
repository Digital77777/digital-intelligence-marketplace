
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';

interface ToolboxItem {
  name: string;
  category: string;
  description: string;
}

const PipelineDesignerToolbox = () => {
  const toolItems: ToolboxItem[] = [
    { name: "Data Source", category: "Input", description: "Connect to a data source" },
    { name: "Filter", category: "Transform", description: "Filter data based on conditions" },
    { name: "Join", category: "Transform", description: "Join multiple data sources" },
    { name: "Aggregate", category: "Transform", description: "Aggregate data by fields" },
    { name: "ML Model", category: "Process", description: "Apply machine learning model" },
    { name: "Export", category: "Output", description: "Export data to destination" },
  ];

  return (
    <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Components</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-300" />
          <input 
            type="text"
            placeholder="Search components..."
            className="w-full bg-indigo-900/30 border border-indigo-800 rounded pl-8 pr-4 py-1.5 text-sm text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-1">
          {toolItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center p-2 rounded-md cursor-move hover:bg-indigo-900/30 transition-colors"
              draggable={true}
            >
              <div className="h-6 w-6 bg-indigo-800/70 rounded flex items-center justify-center mr-2 text-xs font-bold text-indigo-200">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{item.name}</div>
                <div className="text-xs text-indigo-300">{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineDesignerToolbox;
