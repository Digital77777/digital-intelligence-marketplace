
import React from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database, ArrowRight, Plus } from 'lucide-react';
import PipelineDesignerToolbox from '@/components/pipeline/PipelineDesignerToolbox';
import PipelineCanvas from '@/components/pipeline/PipelineCanvas';
import PipelineDetails from '@/components/pipeline/PipelineDetails';

const PipelineDesigner = () => {
  return (
    <ProTierLayout pageTitle="Pipeline Designer" requiredFeature="pipeline-designer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-indigo-200 mb-4">
              Design, visualize, and deploy data processing pipelines with our intuitive drag-and-drop interface.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-indigo-800 text-indigo-200 hover:bg-indigo-900/50">
                <Plus className="h-4 w-4 mr-1.5" /> New Pipeline
              </Button>
              <Button size="sm" variant="outline" className="border-indigo-800 text-indigo-200 hover:bg-indigo-900/50">
                Import Template
              </Button>
              <Button size="sm" variant="outline" className="border-indigo-800 text-indigo-200 hover:bg-indigo-900/50">
                Browse Gallery
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PipelineDesignerToolbox />
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-lg p-4 h-[500px] mb-6">
              <PipelineCanvas />
            </div>
            
            <PipelineDetails />
          </div>
        </div>

        <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
          <CardHeader>
            <CardTitle>Recent Pipelines</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-indigo-800/50 hover:bg-indigo-900/20">
                  <TableHead className="text-indigo-200">Name</TableHead>
                  <TableHead className="text-indigo-200">Status</TableHead>
                  <TableHead className="text-indigo-200">Last Run</TableHead>
                  <TableHead className="text-indigo-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Customer Analytics ETL", status: "Active", lastRun: "30 min ago" },
                  { name: "Social Media Sentiment", status: "Inactive", lastRun: "2 days ago" },
                  { name: "Product Recommendation", status: "Active", lastRun: "1 hour ago" },
                ].map((pipeline, i) => (
                  <TableRow key={i} className="border-indigo-800/50 hover:bg-indigo-900/20">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-indigo-400 mr-2" />
                        {pipeline.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        pipeline.status === "Active" 
                          ? "bg-green-900/30 text-green-400 border-green-800/50" 
                          : "bg-gray-800/30 text-gray-400 border-gray-700/50"
                      }`}>
                        {pipeline.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-indigo-200">{pipeline.lastRun}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-indigo-200 hover:text-white hover:bg-indigo-900/50"
                      >
                        View <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProTierLayout>
  );
};

export default PipelineDesigner;
