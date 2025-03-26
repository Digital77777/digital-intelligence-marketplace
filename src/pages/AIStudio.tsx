
import React from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Save, Play, History, GitBranch, Plus, UploadCloud, Download } from 'lucide-react';

const AIStudio = () => {
  return (
    <ProTierLayout pageTitle="AI Studio" requiredFeature="ai-studio">
      <div className="text-white space-y-6">
        <Tabs defaultValue="modelTraining" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="modelTraining" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Model Training
              </TabsTrigger>
              <TabsTrigger value="pipelineDesign" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Pipeline Design
              </TabsTrigger>
              <TabsTrigger value="versionHistory" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
                Version History
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="text-[#6AC8FF] border-[#6AC8FF]/30 hover:bg-[#6AC8FF]/10">
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            </div>
          </div>
          
          <TabsContent value="modelTraining" className="mt-0">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[430px] flex items-center justify-center">
                      <div className="text-center p-6 max-w-md">
                        <div className="w-16 h-16 bg-gray-800/80 rounded-full flex items-center justify-center mx-auto mb-4">
                          <UploadCloud className="h-8 w-8 text-[#6AC8FF]" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Start Building Your Model</h3>
                        <p className="text-gray-400 mb-4">Drag and drop components from the sidebar to create your custom AI model or upload an existing model.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button variant="outline" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                            <Plus className="h-4 w-4 mr-2" />
                            New Model
                          </Button>
                          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload Model
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card className="bg-gray-900/50 border-gray-800 text-white">
                  <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                    <CardTitle className="text-sm font-medium">Components</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all">
                      <div className="font-medium text-white mb-1">Data Input</div>
                      <div className="text-xs text-gray-400">Import and process training data</div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all">
                      <div className="font-medium text-white mb-1">Pre-Processing</div>
                      <div className="text-xs text-gray-400">Clean and transform data</div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all">
                      <div className="font-medium text-white mb-1">Training</div>
                      <div className="text-xs text-gray-400">Configure and train model</div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all">
                      <div className="font-medium text-white mb-1">Validation</div>
                      <div className="text-xs text-gray-400">Test and validate results</div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700/50 hover:border-[#6AC8FF]/30 cursor-pointer transition-all">
                      <div className="font-medium text-white mb-1">Deployment</div>
                      <div className="text-xs text-gray-400">Deploy and manage model</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-800 text-white">
                  <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                    <CardTitle className="text-sm font-medium">Model Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Model Name</label>
                        <Input
                          placeholder="My Custom Model"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Version</label>
                        <Input
                          placeholder="1.0.0"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Description</label>
                        <textarea
                          placeholder="Enter a description..."
                          className="w-full h-20 rounded-md bg-gray-800 border border-gray-700 text-white p-2 text-sm placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pipelineDesign" className="mt-0">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 flex items-center justify-center h-[500px]">
              <div className="text-center max-w-md">
                <GitBranch className="h-16 w-16 text-[#6AC8FF] mx-auto mb-6" />
                <h3 className="text-2xl font-medium mb-3">Pipeline Designer</h3>
                <p className="text-gray-400 mb-6">
                  Create complex data and AI pipelines with our visual workflow builder. Connect data sources, processing steps, and output destinations.
                </p>
                <Button className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Pipeline
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="versionHistory" className="mt-0">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium">Version History</h3>
                <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { version: "1.3.0", date: "2 days ago", author: "Alex Morgan", changes: "Added data normalization step" },
                  { version: "1.2.0", date: "1 week ago", author: "Alex Morgan", changes: "Improved model accuracy by 12%" },
                  { version: "1.1.0", date: "2 weeks ago", author: "Sophia Chen", changes: "Added validation dataset" },
                  { version: "1.0.0", date: "3 weeks ago", author: "Alex Morgan", changes: "Initial model creation" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start p-4 bg-gray-800/30 rounded-lg border border-gray-800">
                    <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
                      <History className="h-5 w-5 text-[#6AC8FF]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Version {item.version}</h4>
                        <span className="text-sm text-gray-400">{item.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{item.changes}</p>
                      <div className="mt-1 text-xs text-gray-500">by {item.author}</div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

export default AIStudio;
