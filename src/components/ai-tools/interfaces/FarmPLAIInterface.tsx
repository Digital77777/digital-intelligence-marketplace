
import React, { useState } from "react";
import {
  ChevronLeft,
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Settings,
  Play,
  FileText,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FarmPLAIInterfaceProps {
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
        ? "bg-green-100 dark:bg-green-900/60 border-green-200 dark:border-green-700"
        : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/30"
    }`}
  >
    <Icon className="h-5 w-5 text-green-700 dark:text-green-300" />
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
  <Card className="border border-green-100 dark:border-green-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</CardTitle>
      <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </CardContent>
  </Card>
);

const FarmPLAIInterface: React.FC<FarmPLAIInterfaceProps> = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-green-100 dark:hover:bg-green-800">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-green-900 dark:text-green-100">
              Farm P&L AI
            </h1>
            <p className="text-sm text-green-700 dark:text-green-300">Intelligent Profit & Loss Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-800">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
            <Play className="mr-2 h-4 w-4" /> Generate Analysis
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-green-100 dark:hover:bg-green-800">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-green-200 dark:border-green-800 p-4 space-y-6 bg-white dark:bg-gray-950 overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 uppercase tracking-wider">
              Analysis Tools
            </h2>
            <div className="space-y-3">
              <SidebarNode icon={DollarSign} label="Revenue Analysis" selected />
              <SidebarNode icon={Calculator} label="Cost Breakdown" />
              <SidebarNode icon={TrendingUp} label="Profit Trends" />
              <SidebarNode icon={PieChart} label="Expense Categories" />
              <SidebarNode icon={BarChart3} label="Performance Metrics" />
            </div>
          </div>
          <Separator className="bg-green-200 dark:bg-green-700" />
          <div>
            <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 uppercase tracking-wider">
              Reports
            </h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-900 dark:text-green-100">
                <FileText className="h-4 w-4 mr-2" /> Monthly P&L
              </Button>
              <Button variant="outline" className="w-full justify-start border-green-200 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-900">
                <Calendar className="h-4 w-4 mr-2" /> Quarterly Report
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-green-50/70 to-emerald-50/70 dark:from-green-900/20 dark:to-emerald-900/20 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100">
                Financial Dashboard
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-900">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-1 border border-green-200 rounded-md bg-white dark:bg-gray-800 dark:border-green-700"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Revenue"
                value="$45,890"
                change="+12.3%"
                icon={DollarSign}
                positive={true}
              />
              <MetricCard
                title="Total Expenses"
                value="$28,420"
                change="+5.1%"
                icon={Calculator}
                positive={false}
              />
              <MetricCard
                title="Net Profit"
                value="$17,470"
                change="+18.9%"
                icon={TrendingUp}
                positive={true}
              />
              <MetricCard
                title="Profit Margin"
                value="38.1%"
                change="+2.1%"
                icon={PieChart}
                positive={true}
              />
            </div>

            {/* Chart Placeholder */}
            <Card className="border border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg text-green-900 dark:text-green-100">
                  Revenue vs Expenses Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center border border-green-200 dark:border-green-700">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-green-700 dark:text-green-300 font-medium">Interactive Chart View</p>
                    <p className="text-sm text-green-600 dark:text-green-400">AI-powered financial analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-green-100 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900 dark:text-green-100">
                    Top Expense Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Feed & Livestock</span>
                      <span className="font-medium text-green-700 dark:text-green-300">$12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Equipment & Maintenance</span>
                      <span className="font-medium text-green-700 dark:text-green-300">$8,920</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Labor & Wages</span>
                      <span className="font-medium text-green-700 dark:text-green-300">$5,680</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-green-100 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-lg text-green-900 dark:text-green-100">
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-900 dark:text-green-200">
                        Feed costs increased 8% this month. Consider bulk purchasing for better rates.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-900 dark:text-green-200">
                        Profit margin improved by 2.1%. Excellent performance in crop sales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l border-green-200 dark:border-green-800 bg-white dark:bg-gray-950 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3 mb-6">
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
              <Calculator className="h-4 w-4 mr-2" /> Calculate ROI
            </Button>
            <Button variant="outline" className="w-full justify-start border-green-200 hover:bg-green-50 dark:border-green-600 dark:hover:bg-green-900">
              <FileText className="h-4 w-4 mr-2" /> Generate Report
            </Button>
          </div>
          
          <Separator className="my-6 bg-green-200 dark:bg-green-700" />
          
          <h2 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-4">
            Financial Health
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">85%</div>
              <div className="text-sm text-green-600 dark:text-green-400">Overall Score</div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Revenue Growth</span>
                <span className="text-green-600 dark:text-green-400">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cost Control</span>
                <span className="text-green-600 dark:text-green-400">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Profit Margin</span>
                <span className="text-green-600 dark:text-green-400">Strong</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FarmPLAIInterface;
