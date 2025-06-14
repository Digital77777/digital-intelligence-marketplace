
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ModelDesignerProps {
  className?: string;
  modelComponents: ModelComponent[];
}

export type ModelComponent = {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  connections: string[];
};

const ModelDesigner: React.FC<ModelDesignerProps> = ({ className, modelComponents }) => {
  const [activeTab, setActiveTab] = React.useState("visual");

  return (
    <div className={className}>
      <Card className="bg-gray-900/50 border-gray-800 text-white h-[500px]">
        <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3 flex justify-end">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="visual" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Visual Editor
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Code View
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <TabsContent value="visual" className="m-0">
            <div className="h-[calc(500px-61px)] flex items-center justify-center">
              {modelComponents.length > 0 ? (
                <div className="w-full h-full p-6 relative text-center">
                  <p className="text-gray-400 mb-4">
                    {modelComponents.length} component{modelComponents.length !== 1 ? 's' : ''} in model.
                  </p>
                    {modelComponents.map((comp, index) => (
                      <div key={comp.id} className="text-sm text-gray-300 p-1">
                        {index + 1}. {comp.name}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center p-6 max-w-md">
                  <div className="w-16 h-16 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="h-8 w-8 text-[#6AC8FF]" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Start Building Your Model</h3>
                  <p className="text-gray-400 mb-4">Add components from the sidebar on the left to start building your custom AI model.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="m-0">
            <div className="h-[calc(500px-61px)] overflow-auto p-4 bg-gray-950/70 font-mono text-sm">
              <pre className="text-green-400">
                {`// AI Model Configuration
import { DataProcessor, ModelArchitecture, TrainingConfig } from '@platform/ai-studio';

export const modelConfig = {
  inputLayers: ${modelComponents.filter(c => c.type === 'Data Input').length ? 
    `[
    ${modelComponents.filter(c => c.type === 'Data Input').map(c => 
      `  { name: "${c.name}", shape: [null, 128] }`).join(',\n    ')}
  ]` : '[]'},
  hiddenLayers: [
    { units: 256, activation: "relu" },
    { units: 128, activation: "relu" }
  ],
  outputLayer: {
    units: 10,
    activation: "softmax"
  },
  training: {
    epochs: 50,
    batchSize: 32,
    optimizer: "adam"
  }
};`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="m-0">
            <div className="h-[calc(500px-61px)] flex items-center justify-center p-4 bg-gray-950/50">
              {modelComponents.length > 0 ? (
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Model Performance Preview</h3>
                  <div className="w-64 h-64 mx-auto bg-gray-800/50 rounded-md border border-gray-700 flex items-center justify-center mb-4">
                    <p className="text-gray-500">Performance visualization will appear here after training</p>
                  </div>
                  <Button 
                    className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
                  >
                    Run Training
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-gray-400">Build your model first to see a preview</p>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDesigner;
