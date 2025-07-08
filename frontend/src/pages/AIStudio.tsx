
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Save, Play, Brain, Zap, Settings, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useModels,
  useTrainingJobs,
  useDeployments,
  useDatasets,
  useCreateModel,
  useStartTraining,
  useDeployModel,
} from '@/hooks/useModelState';
import PipelineDesignerView from '@/components/ai-studio/PipelineDesignerView';

const AIStudio = () => {
  const [view, setView] = useState<'overview' | 'designer'>('overview');

  const handleCreateNew = () => {
    setView('designer');
  };

  return (
    <ProTierLayout pageTitle="AI Studio" requiredFeature="ai-studio">
      <div className="space-y-6">
        {view === 'overview' ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">AI Studio</h2>
                <p className="text-muted-foreground">Design, train, and deploy custom AI models</p>
              </div>
              <Button onClick={handleCreateNew}>
                <Brain className="h-4 w-4 mr-2" />
                New Model
              </Button>
            </div>

            <Tabs defaultValue="models" className="w-full">
              <TabsList>
                <TabsTrigger value="models">My Models</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="deployment">Deployment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="models" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Brain className="h-5 w-5 mr-2" />
                          Text Classifier v1.0
                        </CardTitle>
                        <CardDescription>Custom sentiment analysis model</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span className="font-medium">94.2%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Status</span>
                            <span className="text-green-600 font-medium">Deployed</span>
                          </div>
                          <Button className="w-full mt-4" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          Image Processor v2.1
                        </CardTitle>
                        <CardDescription>Custom image classification model</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span className="font-medium">89.7%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Status</span>
                            <span className="text-yellow-600 font-medium">Training</span>
                          </div>
                          <Button className="w-full mt-4" size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            View Progress
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed border-2">
                      <CardContent className="flex flex-col items-center justify-center h-full py-8">
                        <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="font-medium mb-2">Create New Model</h3>
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          Start building your custom AI model
                        </p>
                        <Button onClick={handleCreateNew}>Get Started</Button>
                      </CardContent>
                    </Card>
                  </div>
              </TabsContent>
              
              <TabsContent value="training">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Queue</CardTitle>
                    <CardDescription>Monitor your model training progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No models currently in training.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="deployment">
                <Card>
                  <CardHeader>
                    <CardTitle>Deployed Models</CardTitle>
                    <CardDescription>Manage your deployed AI models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">1 model currently deployed.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => setView('overview')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">Model Designer</h2>
                  <p className="text-muted-foreground">Design your custom AI model with templates and configurations</p>
                </div>
              </div>
            </div>

            <PipelineDesignerView />
          </div>
        )}
      </div>
    </ProTierLayout>
  );
};

export default AIStudio;
