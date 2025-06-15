
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricSnapshot } from '@/services/performanceMetricsService';
import RevenueChart from './charts/RevenueChart';
import UserEngagementChart from './charts/UserEngagementChart';
import CategoryPieChart from './charts/CategoryPieChart';

interface ChartsSectionProps {
  metricSnapshots: MetricSnapshot[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ metricSnapshots }) => {

  return (
    <Tabs defaultValue="revenue" className="space-y-4">
      <TabsList>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="users">User Engagement</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="revenue">
        <RevenueChart metricSnapshots={metricSnapshots} />
      </TabsContent>

      <TabsContent value="users">
        <UserEngagementChart metricSnapshots={metricSnapshots} />
      </TabsContent>

      <TabsContent value="categories">
        <CategoryPieChart />
      </TabsContent>
    </Tabs>
  );
};

export default ChartsSection;
