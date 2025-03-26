
import React from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart, AreaChart, PieChart, Line, Bar, Area, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Share, Calendar, Filter, RefreshCcw, Zap, Users, LineChart as LineChartIcon, Layers, ArrowUp, ArrowDown } from 'lucide-react';

// Sample data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 5000, expenses: 2800, profit: 2200 },
  { name: 'Mar', revenue: 8000, expenses: 3800, profit: 4200 },
  { name: 'Apr', revenue: 7500, expenses: 3500, profit: 4000 },
  { name: 'May', revenue: 9000, expenses: 4000, profit: 5000 },
  { name: 'Jun', revenue: 11000, expenses: 4500, profit: 6500 },
  { name: 'Jul', revenue: 12000, expenses: 5000, profit: 7000 },
];

const usageData = [
  { name: 'Mon', api_calls: 2500, predictions: 1200 },
  { name: 'Tue', api_calls: 3000, predictions: 1400 },
  { name: 'Wed', api_calls: 4500, predictions: 2200 },
  { name: 'Thu', api_calls: 4000, predictions: 2000 },
  { name: 'Fri', api_calls: 5000, predictions: 2400 },
  { name: 'Sat', api_calls: 3500, predictions: 1800 },
  { name: 'Sun', api_calls: 2800, predictions: 1500 },
];

const modelUsageData = [
  { name: 'GPT-4', value: 40 },
  { name: 'DALL-E 3', value: 25 },
  { name: 'CodeGPT', value: 15 },
  { name: 'Whisper', value: 12 },
  { name: 'Other', value: 8 },
];

const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 950 },
  { name: 'Apr', users: 1400 },
  { name: 'May', users: 1800 },
  { name: 'Jun', users: 2400 },
  { name: 'Jul', users: 3000 },
];

const COLORS = ['#6AC8FF', '#9F7AEA', '#F687B3', '#48BB78', '#A0AEC0'];

const BusinessInsights = () => {
  return (
    <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
      <div className="text-white space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
            <p className="text-gray-400">Track your business performance and ROI</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$56,500</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/20 px-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      12%
                    </Badge>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-[#6AC8FF]/10 rounded-lg flex items-center justify-center">
                  <LineChartIcon className="h-6 w-6 text-[#6AC8FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">API Usage</p>
                  <h3 className="text-2xl font-bold mt-1">32,450</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/20 px-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      18%
                    </Badge>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <h3 className="text-2xl font-bold mt-1">3,285</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/20 px-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      7%
                    </Badge>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-800 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">Models Deployed</p>
                  <h3 className="text-2xl font-bold mt-1">128</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/20 px-1">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      4%
                    </Badge>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Layers className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="bg-gray-800/50 border border-gray-700 mb-6">
            <TabsTrigger value="revenue" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="usage" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
              API Usage
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
              Models
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#6AC8FF]/20 data-[state=active]:text-[#6AC8FF]">
              Users
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-0">
            <Card className="bg-gray-900/50 border-gray-800 text-white">
              <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">Revenue Overview</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6AC8FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6AC8FF" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9F7AEA" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9F7AEA" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" />
                      <XAxis dataKey="name" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A202C', 
                          borderColor: '#2D3748',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Legend wrapperStyle={{ color: 'white' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#6AC8FF" fillOpacity={1} fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="profit" stroke="#9F7AEA" fillOpacity={1} fill="url(#colorProfit)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-0">
            <Card className="bg-gray-900/50 border-gray-800 text-white">
              <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">API Usage</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" />
                      <XAxis dataKey="name" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A202C', 
                          borderColor: '#2D3748',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Legend wrapperStyle={{ color: 'white' }} />
                      <Bar dataKey="api_calls" fill="#6AC8FF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="predictions" fill="#9F7AEA" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="models" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800 text-white">
                <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                  <CardTitle className="text-lg text-white">Model Usage Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={modelUsageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {modelUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A202C', 
                            borderColor: '#2D3748',
                            borderRadius: '8px',
                            color: 'white'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-800 text-white">
                <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                  <CardTitle className="text-lg text-white">Top Models by API Calls</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'GPT-4 Turbo', calls: '12,450', percent: 42 },
                      { name: 'DALL-E 3', calls: '7,320', percent: 25 },
                      { name: 'CodeGPT Pro', calls: '4,560', percent: 15 },
                      { name: 'Whisper Advanced', calls: '3,540', percent: 12 },
                      { name: 'SentimentX', calls: '2,350', percent: 8 }
                    ].map((model, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{model.name}</span>
                          <span className="text-sm text-gray-400">{model.calls} calls</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${model.percent}%`, 
                              backgroundColor: COLORS[idx % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <Card className="bg-gray-900/50 border-gray-800 text-white">
              <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-white">User Growth</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D3748" />
                      <XAxis dataKey="name" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1A202C', 
                          borderColor: '#2D3748',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Legend wrapperStyle={{ color: 'white' }} />
                      <Line type="monotone" dataKey="users" stroke="#6AC8FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

// Create a custom Badge component for this page
const Badge = ({ children, className, ...props }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${className}`} {...props}>
      {children}
    </div>
  );
};

export default BusinessInsights;
