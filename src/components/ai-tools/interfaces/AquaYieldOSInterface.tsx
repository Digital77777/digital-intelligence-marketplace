
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
        ? "bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-700"
        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
    } cursor-pointer hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors`}
  >
    <Icon className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{label}</span>
  </div>
);

const AquaYieldOSInterface: React.FC<AquaYieldOSInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-cyan-300 dark:border-cyan-700 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/40 dark:to-blue-900/40 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-cyan-100 dark:hover:bg-cyan-800">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-cyan-900 dark:text-cyan-100">
              AquaYield OS
            </h1>
            <p className="text-sm text-cyan-700 dark:text-cyan-300">Smart Irrigation & Crop Monitoring Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-cyan-200 hover:bg-cyan-50 dark:border-cyan-600 dark:hover:bg-cyan-800">
            <Info className="mr-2 h-4 w-4" /> Device Info
          </Button>
          <Button variant="default" size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Play className="mr-2 h-4 w-4" /> Start System
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-cyan-100 dark:hover:bg-cyan-800">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-cyan-200 dark:border-cyan-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider">
              Control Modules
            </h2>
            <div className="space-y-3">
              <SidebarNode icon={Droplets} label="Irrigation Control" selected />
              <SidebarNode icon={Activity} label="Sensor Monitoring" />
              <SidebarNode icon={BarChart3} label="Analytics Dashboard" />
              <SidebarNode icon={Map} label="Field Mapping" />
              <SidebarNode icon={CloudRain} label="Weather Integration" />
            </div>
          </div>
          <Separator className="bg-cyan-200 dark:bg-cyan-700" />
          <div>
            <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3 uppercase tracking-wider">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900 dark:hover:bg-cyan-800 text-cyan-900 dark:text-cyan-100">
                <Droplets className="h-4 w-4 mr-2" /> Start Irrigation
              </Button>
              <Button variant="outline" className="w-full border-cyan-200 hover:bg-cyan-50 dark:border-cyan-600 dark:hover:bg-cyan-900">
                <CloudRain className="h-4 w-4 mr-2" /> Sync Weather
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 bg-gradient-to-br from-cyan-50/70 to-blue-50/70 dark:from-cyan-900/20 dark:to-blue-900/20 p-8 flex flex-col items-center justify-center relative">
          <div className="text-center max-w-4xl">
            <h2 className="text-3xl font-semibold text-cyan-900 dark:text-cyan-100 mb-4">
              Irrigation Control Dashboard
            </h2>
            <p className="text-cyan-700 dark:text-cyan-200 mb-8 text-lg">
              Manage and monitor your precision irrigation system, view real-time analytics, and optimize crop yields automatically.
            </p>
            
            {/* Status widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-900/80 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                    <Droplets className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Irrigation Status</span>
                </div>
                <div className="mb-2 text-xl font-bold text-cyan-600 dark:text-cyan-400">Running</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Next schedule: 07:00 AM</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900/80 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Activity className="h-6 w-6 text-green-700 dark:text-green-300" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sensors</span>
                </div>
                <div className="mb-2 text-xl font-bold text-green-600 dark:text-green-400">All Online</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Moisture: 51% • Temp: 23°C</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900/80 rounded-xl border border-cyan-100 dark:border-cyan-800 shadow-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-sky-100 dark:bg-sky-900 rounded-lg">
                    <CloudRain className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weather</span>
                </div>
                <div className="mb-2 text-xl font-bold text-sky-700 dark:text-sky-300">Sunny</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">24°C • No rain expected</div>
              </div>
            </div>
          </div>
        </main>

        {/* Properties Panel */}
        <aside className="w-80 border-l border-cyan-200 dark:border-cyan-800 bg-white dark:bg-gray-950 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4">
            System Status
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6">
            <div className="text-center text-sm text-green-700 dark:text-green-300">
              <div className="mb-2 font-semibold">All systems operational</div>
              <div className="text-xs text-green-600 dark:text-green-400">Last checked: 2 mins ago</div>
            </div>
          </div>
          
          <Separator className="my-6 bg-cyan-200 dark:bg-cyan-700" />
          
          <h2 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4">
            Optimization Tips
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <p className="text-xs text-cyan-900 dark:text-cyan-200">
                Monitor soil moisture regularly for optimal irrigation scheduling.
              </p>
            </div>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <p className="text-xs text-cyan-900 dark:text-cyan-200">
                Sync with weather forecasts to avoid unnecessary watering.
              </p>
            </div>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <p className="text-xs text-cyan-900 dark:text-cyan-200">
                Review analytics weekly to optimize crop performance.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AquaYieldOSInterface;
