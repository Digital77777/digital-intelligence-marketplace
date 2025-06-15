import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useBusinessInsights } from '@/utils/businessInsightsService';
import { usePerformanceMetrics, useMetricSnapshots } from '@/services/performanceMetricsService';

interface InsightData {
  id: string;
  type: string;
  category: string;
  value: number;
  meta: any;
  date: string;
  timestamp: string;
}

const BusinessInsightsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const { toast } = useToast();

  const { data: performanceMetrics = [], isLoading: metricsLoading, isError: metricsError } = usePerformanceMetrics();
  const { data: metricSnapshots = [], isLoading: snapshotsLoading, isError: snapshotsError } = useMetricSnapshots(selectedPeriod);
  
  // This is for the AI Insights panel at the bottom, we'll keep it for now.
  const { data: aiInsights, isLoading: aiInsightsLoading } = useBusinessInsights();
  
  useEffect(() => {
    if (metricsError || snapshotsError) {
      toast({
        title: "Error",
        description: "Failed to load business insights data. Please try again later.",
        variant: "destructive"
      });
    }
  }, [metricsError, snapshotsError, toast]);

  const getMetric = (name: string) => {
    return performanceMetrics.find(m => m.metric_name === name) || { value: 0, change_value: 0 };
  };
  
  const totalRevenueMetric = getMetric('Total Revenue');
  const activeUsersMetric = getMetric('Active Users');
  const conversionRateMetric = getMetric('Conversion Rate');
  const customerSatisfactionMetric = getMetric('Customer Satisfaction');

  const revenueData = metricSnapshots.map(item => ({
    date: new Date(item.snapshot_date).toLocaleDateString(),
    value: item.total_revenue || 0
  }));

  const userEngagementData = metricSnapshots.map(item => ({
    date: new Date(item.snapshot_date).toLocaleDateString(),
    users: item.active_users || 0
  }));

  const categoryData = [
    { name: 'Sales', value: 45, fill: '#8884d8' },
    { name: 'Marketing', value: 25, fill: '#82ca9d' },
    { name: 'Support', value: 20, fill: '#ffc658' },
    { name: 'Development', value: 10, fill: '#ff7300' }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };
  
  const getTrend = (value: number | null | undefined) => {
      if (value === null || value === undefined || value === 0) return 'stable';
      return value > 0 ? 'up' : 'down';
  }

  if (metricsLoading || snapshotsLoading) {
    return (
      <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
        <div className="flex items-center justify-center h-64">Loading insights...</div>
      </ProTierLayout>
    );
  }

  return (
    <ProTierLayout pageTitle="Business Insights" requiredFeature="business-insights">
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-gray-600">Track your business performance and growth</p>
          </div>
          <Select value={selectedPeriod} onValueChange={(value: '7d' | '30d' | '90d') => setSelectedPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenueMetric.value.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(getTrend(totalRevenueMetric.change_value))}
                <span className={getTrendColor(getTrend(totalRevenueMetric.change_value))}>
                  {totalRevenueMetric.change_value > 0 ? '+' : ''}{totalRevenueMetric.change_value}%
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsersMetric.value.toLocaleString()}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(getTrend(activeUsersMetric.change_value))}
                <span className={getTrendColor(getTrend(activeUsersMetric.change_value))}>
                   {activeUsersMetric.change_value > 0 ? '+' : ''}{activeUsersMetric.change_value}%
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRateMetric.value}%</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(getTrend(conversionRateMetric.change_value))}
                <span className={getTrendColor(getTrend(conversionRateMetric.change_value))}>
                   {conversionRateMetric.change_value > 0 ? '+' : ''}{conversionRateMetric.change_value}%
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customerSatisfactionMetric.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon(getTrend(customerSatisfactionMetric.change_value))}
                <span className={getTrendColor(getTrend(customerSatisfactionMetric.change_value))}>
                  {customerSatisfactionMetric.change_value > 0 ? '+' : ''}{customerSatisfactionMetric.change_value}
                </span>
                <span className="text-muted-foreground">from last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">User Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ fill: '#8884d8' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Daily active users over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Category</CardTitle>
                <CardDescription>Distribution of metrics across business categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-powered insights based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            {aiInsights && aiInsights.length > 0 ? (
            <div className="space-y-4">
              {aiInsights.slice(0,3).map((insight) => (
                <div key={insight.id} className="flex items-start space-x-3">
                  <Badge className={
                    insight.trend_direction === 'up' ? "bg-green-100 text-green-800" :
                    insight.trend_direction === 'down' ? "bg-yellow-100 text-yellow-800" :
                    "bg-blue-100 text-blue-800"
                  }>
                    {insight.trend_direction === 'up' ? 'Positive' : insight.trend_direction === 'down' ? 'Attention' : 'Opportunity'}
                  </Badge>
                  <div>
                    <p className="font-medium">{insight.title}</p>
                    <p className="text-sm text-gray-600">{insight.summary}</p>
                  </div>
                </div>
              ))}
            </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                {aiInsightsLoading ? 'Generating AI insights...' : 'No AI insights available yet.'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProTierLayout>
  );
};

export default BusinessInsightsPage;
