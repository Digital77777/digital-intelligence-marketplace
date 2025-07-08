
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricSnapshot } from '@/services/performanceMetricsService';

interface UserEngagementChartProps {
  metricSnapshots: MetricSnapshot[];
}

const UserEngagementChart: React.FC<UserEngagementChartProps> = ({ metricSnapshots }) => {
  const userEngagementData = metricSnapshots.map(item => ({
    date: new Date(item.snapshot_date).toLocaleDateString(),
    users: item.active_users || 0
  }));

  return (
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
  );
};

export default UserEngagementChart;
