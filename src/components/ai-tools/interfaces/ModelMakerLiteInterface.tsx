
import React from 'react';
import { Play, Share2, Settings, ChevronLeft, Layers, Database, Cpu, TestTube2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SidebarNode = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50 dark:bg-gray-800/50 cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

interface ModelMakerLiteInterfaceProps {
  onBack: () => void;
}

const ModelMakerLiteInterface: React.FC<ModelMakerLiteInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">ModelMaker Lite</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Model: Image Classifier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" /> Train Model
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
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Layers</h2>
            <div className="space-y-3">
              <SidebarNode icon={Database} label="Input Data" />
              <SidebarNode icon={Layers} label="Convolutional Layer" />
              <SidebarNode icon={Layers} label="Pooling Layer" />
              <SidebarNode icon={Cpu} label="Dense Layer" />
              <SidebarNode icon={TestTube2} label="Output Layer" />
            </div>
          </div>
          <Separator />
          <div>
             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Templates</h2>
             <div className="space-y-2">
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Basic CNN Classifier</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Simple Feedforward NN</div>
             </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900/80 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Model Architecture</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Drag layers from the sidebar to design your model.</p>
          </div>
        </main>
        
        {/* Properties Panel */}
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
           <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Layer Properties</h2>
           <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
             Select a layer to configure it.
           </div>
        </aside>
      </div>
    </div>
  );
};

export default ModelMakerLiteInterface;
