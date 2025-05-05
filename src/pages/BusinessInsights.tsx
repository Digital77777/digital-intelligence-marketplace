
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Download, FileDown, FileText, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRange } from "react-day-picker";

const revenueData = [
  { month: 'Jan', revenue: 5000, expenses: 3000, profit: 2000 },
  { month: 'Feb', revenue: 7000, expenses: 3500, profit: 3500 },
  { month: 'Mar', revenue: 8500, expenses: 4000, profit: 4500 },
  { month: 'Apr', revenue: 9800, expenses: 4200, profit: 5600 },
  { month: 'May', revenue: 11000, expenses: 4800, profit: 6200 },
  { month: 'Jun', revenue: 10500, expenses: 5000, profit: 5500 },
];

const userEngagementData = [
  { day: 'Mon', newUsers: 45, activeUsers: 280, churnedUsers: 5 },
  { day: 'Tue', newUsers: 52, activeUsers: 290, churnedUsers: 8 },
  { day: 'Wed', newUsers: 70, activeUsers: 305, churnedUsers: 10 },
  { day: 'Thu', newUsers: 45, activeUsers: 298, churnedUsers: 12 },
  { day: 'Fri', newUsers: 56, activeUsers: 287, churnedUsers: 7 },
  { day: 'Sat', newUsers: 68, activeUsers: 310, churnedUsers: 5 },
  { day: 'Sun', newUsers: 54, activeUsers: 325, churnedUsers: 4 },
];

const marketShareData = [
  { name: 'Our Platform', value: 65 },
  { name: 'Competitor A', value: 15 },
  { name: 'Competitor B', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#6AC8FF', '#82ca9d', '#8884d8', '#ffc658', '#ff8042'];

const topPerformingProducts = [
  { id: 1, name: 'AI Studio Pro License', sales: 1245, revenue: 124500, growth: '+18%' },
  { id: 2, name: 'Neural Network Template Pack', sales: 867, revenue: 43350, growth: '+12%' },
  { id: 3, name: 'Enterprise Data Connectors', sales: 658, revenue: 98700, growth: '+24%' },
  { id: 4, name: 'Computer Vision Toolkit', sales: 524, revenue: 78600, growth: '+15%' },
  { id: 5, name: 'NLP Advanced Models', sales: 492, revenue: 73800, growth: '+9%' },
];

const BusinessInsights = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [period, setPeriod] = useState("monthly");

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log('Exporting PDF report...');
  };

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV
    console.log('Exporting CSV data...');
  };

  return (
    <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold text-white">Analytics Dashboard</h2>
            <p className="text-indigo-200">Monitor your business performance and make data-driven decisions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Select defaultValue={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-full sm:w-40 bg-indigo-950/50 border-indigo-900 text-indigo-100">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="bg-indigo-950/50 border border-indigo-900 rounded-md">
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-[#6AC8FF]" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$283,450</div>
              <p className="text-sm text-indigo-200 mt-1">
                <span className="text-green-400">↑ 18.2%</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8,642</div>
              <p className="text-sm text-indigo-200 mt-1">
                <span className="text-green-400">↑ 12.5%</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-emerald-400" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24.8%</div>
              <p className="text-sm text-indigo-200 mt-1">
                <span className="text-green-400">↑ 3.1%</span> from last period
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-yellow-400" />
                Avg. Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$756</div>
              <p className="text-sm text-indigo-200 mt-1">
                <span className="text-green-400">↑ 5.3%</span> from last period
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="bg-indigo-950/60 border border-indigo-900/50 mb-4">
            <TabsTrigger value="revenue" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              User Engagement
            </TabsTrigger>
            <TabsTrigger value="market" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Market Share
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-0">
            <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <CardTitle>Revenue Analytics</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportPDF}>
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportCSV}>
                      <FileDown className="h-4 w-4" />
                      <span>CSV</span>
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-indigo-200">
                  Monthly revenue, expenses, and profit overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#4338ca', color: '#e0e7ff' }} 
                        itemStyle={{ color: '#e0e7ff' }}
                        labelStyle={{ color: '#e0e7ff' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#6AC8FF" fill="#6AC8FF" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="expenses" stackId="1" stroke="#f87171" fill="#f87171" fillOpacity={0.4} />
                      <Area type="monotone" dataKey="profit" stackId="1" stroke="#4ade80" fill="#4ade80" fillOpacity={0.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportPDF}>
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportCSV}>
                      <FileDown className="h-4 w-4" />
                      <span>CSV</span>
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-indigo-200">
                  Daily active users, new registrations, and churn rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userEngagementData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#4338ca', color: '#e0e7ff' }} 
                        itemStyle={{ color: '#e0e7ff' }}
                        labelStyle={{ color: '#e0e7ff' }}
                      />
                      <Legend />
                      <Bar dataKey="activeUsers" stackId="a" fill="#6AC8FF" />
                      <Bar dataKey="newUsers" stackId="a" fill="#4ade80" />
                      <Bar dataKey="churnedUsers" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="market" className="mt-0">
            <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <CardTitle>Market Share Analysis</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportPDF}>
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50" onClick={handleExportCSV}>
                      <FileDown className="h-4 w-4" />
                      <span>CSV</span>
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-indigo-200">
                  Current market share compared to competitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#4338ca', color: '#e0e7ff' }} 
                        itemStyle={{ color: '#e0e7ff' }}
                        labelStyle={{ color: '#e0e7ff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <CardTitle>Top Performing Products</CardTitle>
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-indigo-900/30 border-indigo-800 hover:bg-indigo-800/50 w-full sm:w-auto">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </div>
            <CardDescription className="text-indigo-200">
              Products with highest sales and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-indigo-800/50 hover:bg-indigo-900/20">
                  <TableHead className="text-indigo-200">Product Name</TableHead>
                  <TableHead className="text-indigo-200 text-right">Units Sold</TableHead>
                  <TableHead className="text-indigo-200 text-right">Revenue</TableHead>
                  <TableHead className="text-indigo-200 text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformingProducts.map((product) => (
                  <TableRow key={product.id} className="border-indigo-800/50 hover:bg-indigo-900/20">
                    <TableCell className="text-white font-medium">{product.name}</TableCell>
                    <TableCell className="text-right text-white">{product.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-white">${product.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50">
                        {product.growth}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProTierLayout>
  );
};

export default BusinessInsights;
