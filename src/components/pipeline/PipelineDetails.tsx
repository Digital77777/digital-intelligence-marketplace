
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Settings, Play } from 'lucide-react';

const PipelineDetails = () => {
  return (
    <Tabs defaultValue="properties" className="w-full">
      <TabsList className="bg-indigo-950/60 border border-indigo-900/50 mb-4">
        <TabsTrigger value="properties" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
          <Settings className="h-4 w-4 mr-1.5" />
          Properties
        </TabsTrigger>
        <TabsTrigger value="code" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
          <Code className="h-4 w-4 mr-1.5" />
          Code View
        </TabsTrigger>
        <TabsTrigger value="runtime" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
          <Play className="h-4 w-4 mr-1.5" />
          Runtime
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="properties" className="mt-0">
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-md p-4 text-indigo-200">
          <p className="text-sm">Select a pipeline component to view and edit its properties</p>
        </div>
      </TabsContent>
      
      <TabsContent value="code" className="mt-0">
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-md p-4 text-indigo-200 font-mono text-sm">
          <pre className="whitespace-pre-wrap">
{`// Generated Pipeline Code
import { DataSource, Filter, Aggregate } from '@platform/pipeline';

export async function processPipeline(input) {
  // Pipeline will appear here when components are added
  return {};
}`}
          </pre>
        </div>
      </TabsContent>
      
      <TabsContent value="runtime" className="mt-0">
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-md p-4 text-indigo-200">
          <p className="text-sm">Pipeline execution details will appear here when the pipeline is run</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PipelineDetails;
