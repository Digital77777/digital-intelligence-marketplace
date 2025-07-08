import React from 'react';
import { Play, Share2, Settings, ChevronLeft, Search, TrendingUp, FileText, BarChart3, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const SidebarNode = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50 dark:bg-gray-800/50 cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

interface SEOBoostAIInterfaceProps {
  onBack: () => void;
}

const SEOBoostAIInterface: React.FC<SEOBoostAIInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">SEO Boost AI</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Project: Website Optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share Report
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" /> Analyze Site
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
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Analysis Tools</h2>
            <div className="space-y-3">
              <SidebarNode icon={Search} label="Keyword Research" />
              <SidebarNode icon={TrendingUp} label="Ranking Tracker" />
              <SidebarNode icon={FileText} label="Content Optimizer" />
              <SidebarNode icon={BarChart3} label="Site Audit" />
              <SidebarNode icon={Globe} label="Backlink Analysis" />
            </div>
          </div>
          <Separator />
          <div>
             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Templates</h2>
             <div className="space-y-2">
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">E-commerce SEO Audit</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Blog Content Strategy</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Local SEO Analysis</div>
             </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900/80 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">SEO Analysis Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your website URL to start optimizing your search rankings.</p>
          </div>
        </main>
        
        {/* Properties Panel */}
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
           <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">SEO Insights</h2>
           <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
             Select an analysis tool to view detailed insights.
           </div>
        </aside>
      </div>
    </div>
  );
};

export default SEOBoostAIInterface;
