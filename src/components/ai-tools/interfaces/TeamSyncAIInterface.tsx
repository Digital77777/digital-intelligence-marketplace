import React from 'react';
import { Play, Share2, Settings, ChevronLeft, Users, MessageCircle, BarChart3, CalendarDays, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Sidebar node for uniform sidebar entries
const SidebarNode = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg border bg-gray-50 dark:bg-gray-800/50 cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

interface TeamSyncAIInterfaceProps {
  onBack: () => void;
}

const TeamSyncAIInterface: React.FC<TeamSyncAIInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">TeamSync AI</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Workspace: Collaboration Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share Summary
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" /> Sync Now
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
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Collab Tools</h2>
            <div className="space-y-3">
              <SidebarNode icon={Users} label="Team Overview" />
              <SidebarNode icon={MessageCircle} label="Chat Rooms" />
              <SidebarNode icon={CalendarDays} label="Meetings" />
              <SidebarNode icon={BarChart3} label="Analytics" />
              <SidebarNode icon={FileText} label="Shared Docs" />
            </div>
          </div>
          <Separator />
          <div>
             <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Templates</h2>
             <div className="space-y-2">
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Weekly Standup</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Project Kickoff</div>
                <div className="text-xs p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">Retrospective</div>
             </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900/80 p-6 flex items-center justify-center">
          <div className="text-center max-w-lg">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Collaboration Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sync team chats, meetings, and docs. Insights updated in real-time to keep everyone on the same page.</p>
          </div>
        </main>
        
        {/* Properties Panel */}
        <aside className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
           <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Team Insights</h2>
           <div className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
             Select a tool to see more detailed information.
           </div>
        </aside>
      </div>
    </div>
  );
};

export default TeamSyncAIInterface;
