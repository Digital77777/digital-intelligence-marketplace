
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  GitMerge,
  Database,
  FileText,
  MessageSquare,
  Eye,
  Play,
  Save,
  Plus,
  ArrowRight,
  Image,
  FileCode,
  SquareCode,
  PlusCircle,
  Settings,
  CornerDownRight,
  Check,
  ExternalLink
} from 'lucide-react';

const PipelineDesigner = () => {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  
  const pipelineTemplates = [
    {
      id: 'data-processing',
      name: 'Data Processing Pipeline',
      description: 'Extract, transform, and load data from multiple sources',
      icon: <Database className="h-5 w-5 text-blue-400" />,
      steps: 5,
      category: 'Data'
    },
    {
      id: 'document-workflow',
      name: 'Document Processing Workflow',
      description: 'Process and analyze documents with AI',
      icon: <FileText className="h-5 w-5 text-purple-400" />,
      steps: 4,
      category: 'Documents'
    },
    {
      id: 'conversation-pipeline',
      name: 'Conversation Analysis Pipeline',
      description: 'Process and extract insights from customer conversations',
      icon: <MessageSquare className="h-5 w-5 text-green-400" />,
      steps: 6,
      category: 'NLP'
    },
    {
      id: 'visual-recognition',
      name: 'Visual Recognition Workflow',
      description: 'Process images and extract visual insights',
      icon: <Eye className="h-5 w-5 text-amber-400" />,
      steps: 7,
      category: 'Computer Vision'
    }
  ];

  const handleSelectTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
  };

  return (
    <ProTierLayout pageTitle="Pipeline Designer" requiredFeature="pipeline-designer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Design Your AI Pipelines</h2>
            <p className="text-indigo-200">Create and orchestrate sophisticated AI workflows with our visual pipeline designer</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-indigo-950/50 border-indigo-900 text-indigo-100 hover:bg-indigo-900/70">
              <Plus className="mr-2 h-4 w-4" />
              New Pipeline
            </Button>
            {activeTemplate && (
              <Button className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                <Play className="mr-2 h-4 w-4" />
                Run Pipeline
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="bg-indigo-950/60 border border-indigo-900/50">
            <TabsTrigger value="templates" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Templates
            </TabsTrigger>
            <TabsTrigger value="myPipelines" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              My Pipelines
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {pipelineTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`bg-indigo-950/40 border-indigo-900/50 hover:border-[#6AC8FF]/50 transition-all cursor-pointer ${activeTemplate === template.id ? 'border-[#6AC8FF] ring-1 ring-[#6AC8FF]/30' : ''}`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-indigo-900/30 text-indigo-200 border-indigo-800/50">
                        {template.category}
                      </Badge>
                      {template.icon}
                    </div>
                    <CardTitle className="text-xl text-white mt-2">{template.name}</CardTitle>
                    <CardDescription className="text-indigo-200">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-indigo-300">{template.steps} processing steps</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {activeTemplate && (
              <Card className="bg-indigo-950/40 border-indigo-900/50 mt-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white">Pipeline Designer</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button size="sm" className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                        <Play className="mr-2 h-4 w-4" />
                        Run
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-indigo-200">
                    {pipelineTemplates.find(t => t.id === activeTemplate)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="w-56 bg-indigo-900/30 border border-indigo-800/50 rounded-md p-4">
                        <h3 className="font-medium text-white mb-3">Components</h3>
                        <ScrollArea className="h-[400px]">
                          <div className="space-y-2 pr-4">
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <Database className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-white">Data Source</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-purple-400" />
                                <span className="text-sm text-white">Text Processor</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <Image className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-white">Image Processor</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <FileCode className="h-4 w-4 text-amber-400" />
                                <span className="text-sm text-white">Transformer</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <SquareCode className="h-4 w-4 text-blue-400" />
                                <span className="text-sm text-white">Custom Code</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-purple-400" />
                                <span className="text-sm text-white">Connector</span>
                              </div>
                            </Card>
                            <Card className="bg-indigo-900/50 border-indigo-800/50 hover:bg-indigo-900/70 cursor-pointer transition-colors p-2">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-white">Output</span>
                              </div>
                            </Card>
                          </div>
                        </ScrollArea>
                      </div>
                      
                      <div className="flex-1 bg-indigo-900/20 border border-indigo-800/30 rounded-md p-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <GitMerge className="h-12 w-12 text-indigo-700/50 mx-auto mb-3" />
                            <p className="text-indigo-300">Drag and drop components to build your pipeline</p>
                            <Button variant="outline" className="mt-4 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add First Component
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-900/30 border border-indigo-800/50 rounded-md p-4">
                      <h3 className="font-medium text-white mb-3">Pipeline Details</h3>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-sm text-indigo-300">Name:</span>
                          <span className="text-white">
                            {pipelineTemplates.find(t => t.id === activeTemplate)?.name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-indigo-300">Status:</span>
                          <span className="text-white">Draft</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-indigo-300">Category:</span>
                          <span className="text-white">
                            {pipelineTemplates.find(t => t.id === activeTemplate)?.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="myPipelines">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">My Pipelines</CardTitle>
                <CardDescription className="text-indigo-200">
                  Access and manage your custom AI pipelines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <GitMerge className="h-12 w-12 text-indigo-700/50 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">No pipelines yet</h3>
                  <p className="text-indigo-300 mb-4">Create your first AI pipeline to automate workflows</p>
                  <Button className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Pipeline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">Pipeline Settings</CardTitle>
                <CardDescription className="text-indigo-200">
                  Configure default settings for your pipelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-indigo-800/30 pb-3">
                  <div>
                    <h3 className="font-medium text-white">Auto-save pipelines</h3>
                    <p className="text-sm text-indigo-300">Automatically save pipeline changes every 5 minutes</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-[#6AC8FF]" />
                    <span className="ml-2 text-indigo-200">Enabled</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-indigo-800/30 pb-3">
                  <div>
                    <h3 className="font-medium text-white">Pipeline execution logs</h3>
                    <p className="text-sm text-indigo-300">Store execution history for debugging</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-[#6AC8FF]" />
                    <span className="ml-2 text-indigo-200">Enabled</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-indigo-800/30 pb-3">
                  <div>
                    <h3 className="font-medium text-white">Error notifications</h3>
                    <p className="text-sm text-indigo-300">Receive alerts when pipelines fail</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-[#6AC8FF]" />
                    <span className="ml-2 text-indigo-200">Enabled</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50">
                    <Settings className="mr-2 h-4 w-4" />
                    Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

export default PipelineDesigner;
