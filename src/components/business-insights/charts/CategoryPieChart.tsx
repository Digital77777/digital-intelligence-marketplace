
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, Tooltip } from 'recharts';

const CategoryPieChart: React.FC = () => {
  const categoryData = [
    { name: 'Sales', value: 45, fill: '#8884d8' },
    { name: 'Marketing', value: 25, fill: '#82ca9d' },
    { name: 'Support', value: 20, fill: '#ffc658' },
    { name: 'Development', value: 10, fill: '#ff7300' }
  ];

  return (
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
  );
};

export default CategoryPieChart;
