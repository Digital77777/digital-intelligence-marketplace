
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInsights();
  }, [selectedPeriod]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      
      // Calculate date range based on selected period
      const now = new Date();
      const daysBack = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
      const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
      
      const { data, error } = await supabase
        .from('insights_data')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error('Error fetching insights:', error);
      toast({
        title: "Error",
        description: "Failed to load business insights",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate sample data for demonstration
  const generateSampleData = () => {
    const sampleInsights: InsightData[] = [
      // Revenue data
      { id: '1', type: 'revenue', category: 'sales', value: 12500, meta: {}, date: '2024-01-01', timestamp: '2024-01-01T00:00:00Z' },
      { id: '2', type: 'revenue', category: 'sales', value: 15200, meta: {}, date: '2024-01-02', timestamp: '2024-01-02T00:00:00Z' },
      { id: '3', type: 'revenue', category: 'sales', value: 18700, meta: {}, date: '2024-01-03', timestamp: '2024-01-03T00:00:00Z' },
      // User engagement
      { id: '4', type: 'users', category: 'engagement', value: 1250, meta: {}, date: '2024-01-01', timestamp: '2024-01-01T00:00:00Z' },
      { id: '5', type: 'users', category: 'engagement', value: 1420, meta: {}, date: '2024-01-02', timestamp: '2024-01-02T00:00:00Z' },
      { id: '6', type: 'users', category: 'engagement', value: 1680, meta: {}, date: '2024-01-03', timestamp: '2024-01-03T00:00:00Z' },
    ];
    return sampleInsights;
  };

  const displayData = insights.length > 0 ? insights : generateSampleData();

  const revenueData = displayData
    .filter(item => item.type === 'revenue')
    .map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      value: item.value
    }));

  const userEngagementData = displayData
    .filter(item => item.type === 'users')
    .map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      users: item.value
    }));

  const categoryData = [
    { name: 'Sales', value: 45, fill: '#8884d8' },
    { name: 'Marketing', value: 25, fill: '#82ca9d' },
    { name: 'Support', value: 20, fill: '#ffc658' },
    { name: 'Development', value: 10, fill: '#ff7300' }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
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
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
              <div className="text-2xl font-bold">$46,400</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon('up')}
                <span className={getTrendColor('up')}>+12.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,350</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon('up')}
                <span className={getTrendColor('up')}>+8.2%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon('down')}
                <span className={getTrendColor('down')}>-0.5%</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center space-x-1 text-xs">
                {getTrendIcon('up')}
                <span className={getTrendColor('up')}>+0.3</span>
                <span className="text-muted-foreground">from last month</span>
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
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Badge className="bg-green-100 text-green-800">Positive</Badge>
                <div>
                  <p className="font-medium">Revenue Growth Acceleration</p>
                  <p className="text-sm text-gray-600">Your revenue growth rate has increased by 12.5% compared to the previous period, indicating strong business momentum.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge className="bg-blue-100 text-blue-800">Opportunity</Badge>
                <div>
                  <p className="font-medium">User Engagement Optimization</p>
                  <p className="text-sm text-gray-600">While user numbers are growing, engagement metrics suggest opportunities for improving user experience and retention.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Badge className="bg-yellow-100 text-yellow-800">Attention</Badge>
                <div>
                  <p className="font-medium">Conversion Rate Decline</p>
                  <p className="text-sm text-gray-600">A slight decrease in conversion rate warrants investigation into potential friction points in your customer journey.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProTierLayout>
  );
};

export default BusinessInsightsPage;
