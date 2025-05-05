
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Plus, GitBranch, Code, ArrowRight, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface ModelDesignerProps {
  className?: string;
}

export type ModelComponent = {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  connections: string[];
};

const ModelDesigner: React.FC<ModelDesignerProps> = ({ className }) => {
  const [modelComponents, setModelComponents] = useState<ModelComponent[]>([]);
  const [isNewModelOpen, setIsNewModelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("visual");

  const handleAddComponent = (componentType: string) => {
    const newComponent: ModelComponent = {
      id: `component-${Date.now()}`,
      type: componentType,
      name: `New ${componentType}`,
      position: { x: 200, y: 200 }, // Default position
      connections: []
    };
    
    setModelComponents([...modelComponents, newComponent]);
    toast({
      title: "Component Added",
      description: `Added ${componentType} component to your model.`,
    });
  };

  const handleCreateNewModel = () => {
    setModelComponents([]);
    setIsNewModelOpen(false);
    toast({
      title: "New Model Created",
      description: "You can now start building your custom AI model.",
    });
  };

  return (
    <div className={className}>
      <Card className="bg-gray-900/50 border-gray-800 text-white h-[500px]">
        <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-white">Model Designer</CardTitle>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <GitBranch className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Code className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 text-[#6AC8FF] border-[#6AC8FF]/30">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
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
            <div className="h-[400px] flex items-center justify-center">
              {modelComponents.length > 0 ? (
                <div className="w-full h-full p-6 relative">
                  {/* This would be where a canvas drag-and-drop editor would go */}
                  <div className="text-center">
                    <p className="text-gray-400">
                      {modelComponents.length} components in model. 
                      <br />
                      Drag components to connect them.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 max-w-md">
                  <div className="w-16 h-16 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="h-8 w-8 text-[#6AC8FF]" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Start Building Your Model</h3>
                  <p className="text-gray-400 mb-4">Drag and drop components from the sidebar to create your custom AI model or upload an existing model.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10"
                      onClick={() => setIsNewModelOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Model
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Upload Model
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="m-0">
            <div className="h-[400px] overflow-auto p-4 bg-gray-950/70 font-mono text-sm">
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
            <div className="h-[400px] flex items-center justify-center p-4 bg-gray-950/50">
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

      {/* New Model Dialog */}
      <Dialog open={isNewModelOpen} onOpenChange={setIsNewModelOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Model</DialogTitle>
            <DialogDescription className="text-gray-400">
              Choose a starting point for your new model.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div 
              className="p-3 bg-gray-800/50 rounded-md border border-gray-700 hover:border-[#6AC8FF]/50 cursor-pointer transition-all"
              onClick={handleCreateNewModel}
            >
              <div className="font-medium text-white mb-1">Empty Model</div>
              <div className="text-xs text-gray-400">Start from scratch with a blank canvas</div>
            </div>
            <div 
              className="p-3 bg-gray-800/50 rounded-md border border-gray-700 hover:border-[#6AC8FF]/50 cursor-pointer transition-all"
              onClick={handleCreateNewModel}
            >
              <div className="font-medium text-white mb-1">Classification Template</div>
              <div className="text-xs text-gray-400">Pre-configured for classification tasks</div>
            </div>
            <div 
              className="p-3 bg-gray-800/50 rounded-md border border-gray-700 hover:border-[#6AC8FF]/50 cursor-pointer transition-all"
              onClick={handleCreateNewModel}
            >
              <div className="font-medium text-white mb-1">Regression Template</div>
              <div className="text-xs text-gray-400">Pre-configured for regression analysis</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModelDesigner;
