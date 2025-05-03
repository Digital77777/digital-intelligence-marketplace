
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WorkflowTemplates from '@/components/workflow/WorkflowTemplates';
import WorkflowEditor from '@/components/workflow/WorkflowEditor';
import WorkflowHistory from '@/components/workflow/WorkflowHistory';

const WorkflowDesigner = () => {
  return (
    <BasicTierLayout pageTitle="Workflow Designer" requiredFeature="workflow-designer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-gray-600 dark:text-gray-300">
            Design and automate your AI workflows with our visual workflow designer.
          </p>
          <div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create New Workflow
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-0">
            <WorkflowEditor />
          </TabsContent>
          
          <TabsContent value="templates" className="mt-0">
            <WorkflowTemplates />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <WorkflowHistory />
          </TabsContent>
        </Tabs>
      </div>
    </BasicTierLayout>
  );
};

export default WorkflowDesigner;
