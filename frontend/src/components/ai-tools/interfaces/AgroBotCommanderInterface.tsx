
import React from 'react';
import { ChevronLeft, Mic, Activity, FileText, Settings, Play, BarChart3, MessageCircle, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AgroBotCommanderInterfaceProps {
  onBack: () => void;
}

// Sidebar node utility
const SidebarNode = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50 dark:bg-gray-800/50 cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const AgroBotCommanderInterface: React.FC<AgroBotCommanderInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">AgroBot Commander</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Control Center & Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" /> Launch Bot
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Commander Tools</h2>
            <div className="space-y-3">
              <SidebarNode icon={Activity} label="Operations Dashboard" />
              <SidebarNode icon={MessageCircle} label="Command Chat" />
              <SidebarNode icon={Mic} label="Voice Input" />
              <SidebarNode icon={FileText} label="Reports" />
              <SidebarNode icon={Users} label="Fleet Management" />
            </div>
          </div>
          <Separator />
          <div>
             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Analytics</h2>
             <div className="space-y-2">
                <SidebarNode icon={BarChart3} label="Performance" />
                <SidebarNode icon={Zap} label="Command Logs" />
             </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900/80 p-6 flex items-center justify-center">
          <div className="text-center max-w-lg">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Command & Control Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Launch, monitor, and interact with your AgroBots in real-time. Access analytics, send commands, and review logs from a unified control panel.
            </p>
          </div>
        </main>
        
        {/* Properties Panel */}
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
           <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bot Insights</h2>
           <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
             Select a feature to see detailed information.
           </div>
        </aside>
      </div>
    </div>
  );
};

export default AgroBotCommanderInterface;
