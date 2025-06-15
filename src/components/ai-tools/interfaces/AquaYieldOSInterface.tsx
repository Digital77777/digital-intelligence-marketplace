
import React from "react";
import {
  ChevronLeft,
  Droplets,
  Activity,
  BarChart3,
  Map,
  Settings,
  CloudRain,
  Play,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AquaYieldOSInterfaceProps {
  onBack: () => void;
}

const SidebarNode = ({
  icon: Icon,
  label,
  selected = false,
}: {
  icon: React.ElementType;
  label: string;
  selected?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 p-2 rounded-lg border ${
      selected
        ? "bg-cyan-100 dark:bg-cyan-900/60"
        : "bg-gray-50 dark:bg-gray-800/50"
    } cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900 transition-colors`}
  >
    <Icon className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const AquaYieldOSInterface: React.FC<AquaYieldOSInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-cyan-300 dark:border-cyan-700 bg-cyan-50/60 dark:bg-cyan-900/60 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-cyan-900 dark:text-cyan-100">
              AquaYield OS
            </h1>
            <p className="text-xs text-cyan-700 dark:text-cyan-300">Smart Irrigation & Crop Monitoring Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Info className="mr-2 h-4 w-4" /> Device Info
          </Button>
          <Button variant="default" size="sm">
            <Play className="mr-2 h-4 w-4" /> Start System
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-cyan-200 dark:border-cyan-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider">
              Modules
            </h2>
            <div className="space-y-3">
              <SidebarNode icon={Droplets} label="Irrigation Control" selected />
              <SidebarNode icon={Activity} label="Sensor Monitoring" />
              <SidebarNode icon={BarChart3} label="Analytics Dashboard" />
              <SidebarNode icon={Map} label="Field Mapping" />
              <SidebarNode icon={CloudRain} label="Weather Integration" />
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">
                <Droplets className="h-4 w-4 mr-2" /> Start Irrigation
              </Button>
              <Button variant="outline" className="w-full">
                <CloudRain className="h-4 w-4 mr-2" /> Sync Weather
              </Button>
            </div>
          </div>
        </aside>
        {/* Main Canvas */}
        <main className="flex-1 bg-cyan-50/70 dark:bg-cyan-900/50 p-8 flex flex-col items-center justify-center relative">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-cyan-900 dark:text-cyan-100 mb-2">
              Irrigation Control Dashboard
            </h2>
            <p className="text-cyan-700 dark:text-cyan-200 mb-5">
              Manage and monitor your precision irrigation system, view real-time analytics, and optimize crop yields automatically.
            </p>
            {/* Example status widget */}
            <div className="flex flex-wrap gap-8 justify-center mt-4">
              <div className="bg-white dark:bg-cyan-950/70 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow p-5 w-64">
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                  <span className="text-lg font-semibold">Live Status</span>
                </div>
                <div className="mb-1 text-cyan-600 dark:text-cyan-400">Running</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">Next schedule: 07:00 AM</div>
              </div>
              <div className="bg-white dark:bg-cyan-950/70 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow p-5 w-64">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-green-700 dark:text-green-300" />
                  <span className="text-lg font-semibold">Sensors</span>
                </div>
                <div className="mb-1 text-green-600 dark:text-green-400">All sensors: Online</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">Moisture 51% &mdash; Temp 23&deg;C</div>
              </div>
              <div className="bg-white dark:bg-cyan-950/70 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow p-5 w-64">
                <div className="flex items-center gap-3 mb-2">
                  <CloudRain className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <span className="text-lg font-semibold">Weather</span>
                </div>
                <div className="mb-1 text-sky-900 dark:text-sky-200">Rain expected: No</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">Current: Sunny 24&deg;C</div>
              </div>
            </div>
          </div>
        </main>
        {/* Properties Panel */}
        <aside className="w-80 border-l border-cyan-200 dark:border-cyan-800 bg-white dark:bg-gray-950 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            System Status
          </h2>
          <div className="mt-4 text-center text-sm text-cyan-700 dark:text-cyan-300">
            <div className="mb-2">All systems operational.</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">No alerts &mdash; Last checked 2 mins ago</div>
          </div>
          <Separator className="my-4" />
          <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
            Tips
          </h2>
          <ul className="pl-5 text-xs list-disc text-cyan-900 dark:text-cyan-200">
            <li>Monitor soil moisture regularly for optimal irrigation.</li>
            <li>Sync with weather to avoid unnecessary watering.</li>
            <li>Review analytics to optimize crop performance over time.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AquaYieldOSInterface;
