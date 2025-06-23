import React, { useState, useEffect } from 'react';
import { Play, Code, Database, Share2, Settings, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DataFlowProInterfaceProps {
  onBack: () => void;
}

const SidebarNode = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50 dark:bg-gray-800/50 cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const DataFlowProInterface: React.FC<DataFlowProInterfaceProps> = ({ onBack }) => {
  const [flowData, setFlowData] = useState<any>(null);

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        // Replace with actual API endpoint for FastAPI
        const response = await fetch('/api/data-flow-pro');
        const data = await response.json();
        setFlowData(data);
      } catch (error) {
        console.error('Failed to fetch flow data:', error);
      }
    };

    fetchFlowData();
  }, []);

  const runFlow = async () => {
    // Placeholder function for running the data flow
    console.log('Running data flow with FastAPI...');
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">DataFlow Pro</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Unsaved Changes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="default" size="sm" onClick={runFlow}>
            <Play className="mr-2 h-4 w-4" /> Run Flow
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Nodes</h2>
            <div className="space-y-3">
              <SidebarNode icon={Database} label="Data Input" />
              <SidebarNode icon={Code} label="Transform" />
              <SidebarNode icon={Share2} label="API Output" />
              <SidebarNode icon={Database} label="Database Sink" />
            </div>
          </div>
          <Separator />
          <div>
             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Templates</h2>
             <div className="space-y-2">
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">ETL from Postgres to BigQuery</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Real-time API Enrichment</div>
             </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900/80 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">DataFlow Canvas</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Drag nodes from the sidebar to start building your data flow.</p>
          </div>
        </main>
        
        {/* Properties Panel */}
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
           <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Properties</h2>
           <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
             Select a node to see its properties.
           </div>
        </aside>
      </div>
    </div>
  );
};

export default DataFlowProInterface;
