
import React from "react";
import {
  ChevronLeft,
  Shield,
  AlertTriangle,
  BarChart3,
  FileText,
  Map,
  Layers,
  Calendar,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AgroRiskNavigatorInterfaceProps {
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
    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
      selected
        ? "bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-700"
        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
    }`}
  >
    <Icon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{label}</span>
  </div>
);

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  positive?: boolean;
}) => (
  <Card className="border border-blue-100 dark:border-blue-800">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</CardTitle>
      <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <p className={`text-xs ${positive ? 'text-blue-600' : 'text-red-600'}`}>{change} vs last period</p>
    </CardContent>
  </Card>
);

const AgroRiskNavigatorInterface: React.FC<AgroRiskNavigatorInterfaceProps> = ({ onBack }) => {
  const riskInsights = [
    "Drought risk increased in June—consider crop rotation planning.",
    "Pest risk stable but monitor northern fields for warnings.",
    "Recent storms reduced fire risk by 6%.",
    "Projected yield risk below normal for this season."
  ];
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-blue-300 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-blue-100 dark:hover:bg-blue-800">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">
              AgroRisk Navigator
            </h1>
            <p className="text-sm text-blue-700 dark:text-blue-300">Intelligent Farm Risk Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-800">
            <FileText className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Shield className="mr-2 h-4 w-4" /> Run Risk Scan
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-100 dark:hover:bg-blue-800">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-blue-200 dark:border-blue-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
              Risk Tools
            </h2>
            <div className="space-y-3">
              <SidebarNode icon={Shield} label="Risk Overview" selected />
              <SidebarNode icon={AlertTriangle} label="Threat Alerts" />
              <SidebarNode icon={BarChart3} label="Risk Analytics" />
              <SidebarNode icon={Map} label="Risk Map" />
              <SidebarNode icon={Layers} label="Layered Analysis" />
            </div>
          </div>
          <Separator className="bg-blue-200 dark:bg-blue-700" />
          <div>
            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
              Reports
            </h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-900 dark:text-blue-100">
                <FileText className="h-4 w-4 mr-2" /> Risk Profile
              </Button>
              <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900">
                <Calendar className="h-4 w-4 mr-2" /> Periodic Report
              </Button>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-blue-50/70 to-cyan-50/70 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
                Risk Dashboard
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900">
                  <Layers className="mr-2 h-4 w-4" /> Layers
                </Button>
                <select
                  className="px-3 py-1 border border-blue-200 rounded-md bg-white dark:bg-gray-800 dark:border-blue-700"
                >
                  <option value="current">Current Risk</option>
                  <option value="1m">Last 30 Days</option>
                  <option value="6m">Last 6 Months</option>
                </select>
              </div>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Overall Risk"
                value="Medium"
                change="+7%"
                icon={Shield}
                positive={false}
              />
              <MetricCard
                title="Drought Risk"
                value="High"
                change="+11%"
                icon={AlertTriangle}
                positive={false}
              />
              <MetricCard
                title="Pest Risk"
                value="Low"
                change="0%"
                icon={Layers}
                positive={true}
              />
              <MetricCard
                title="Fire Risk"
                value="Low"
                change="-5%"
                icon={BarChart3}
                positive={true}
              />
            </div>
            {/* Chart Placeholder */}
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                  Risk Evolution Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-700">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-blue-700 dark:text-blue-300 font-medium">Interactive Risk Chart</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">AI-driven historical risk trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Bottom Stats and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                    Top Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Storm Warning</span>
                      <span className="font-medium text-blue-700 dark:text-blue-300">6/12/2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Drought Probability</span>
                      <span className="font-medium text-blue-700 dark:text-blue-300">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Fire Risk Update</span>
                      <span className="font-medium text-blue-700 dark:text-blue-300">Decreased</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {riskInsights.map((insight, i) => (
                      <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-200">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        {/* Right Panel */}
        <aside className="w-80 border-l border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-950 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3 mb-6">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Shield className="h-4 w-4 mr-2" /> Run Risk Assessment
            </Button>
            <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900">
              <FileText className="h-4 w-4 mr-2" /> Generate Full Report
            </Button>
          </div>
          <Separator className="my-6 bg-blue-200 dark:bg-blue-700" />
          <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
            Current Risk Levels
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">47%</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Overall Risk Index</div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Drought</span>
                <span className="text-blue-600 dark:text-blue-400">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pests</span>
                <span className="text-blue-600 dark:text-blue-400">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Fire</span>
                <span className="text-blue-600 dark:text-blue-400">Low</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AgroRiskNavigatorInterface;

