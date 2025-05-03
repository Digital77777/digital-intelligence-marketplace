
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Play, Share } from 'lucide-react';

const WorkflowEditor = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workflow Steps</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex flex-col gap-2">
              {['Data Input', 'Process', 'Decision', 'Output', 'Notification'].map((step, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md cursor-move hover:shadow-md transition-shadow"
                >
                  {step}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Workflow Canvas</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button size="sm" className="flex items-center gap-1.5">
                <Play className="h-4 w-4" /> Test Run
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Drag workflow steps here to build your workflow
            </div>
            
            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="text-sm font-medium mb-2">Workflow Properties</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 mt-1 bg-white dark:bg-gray-900" 
                    placeholder="My Workflow"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Schedule</label>
                  <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 mt-1 bg-white dark:bg-gray-900">
                    <option>Manual</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowEditor;
