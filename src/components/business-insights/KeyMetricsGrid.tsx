
import React from 'react';
import MetricCard from './MetricCard';
import { PerformanceMetric } from '@/services/performanceMetricsService';
import { DollarSign, Users, BarChart3, PieChart } from 'lucide-react';

interface KeyMetricsGridProps {
  metrics: PerformanceMetric[];
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ metrics }) => {
  const getMetric = (name: string) => {
    return metrics.find(m => m.metric_name === name) || { value: 0, change_value: 0, metric_name: name, id: '', change_period: null, updated_at: '' };
  };

  const totalRevenueMetric = getMetric('Total Revenue');
  const activeUsersMetric = getMetric('Active Users');
  const conversionRateMetric = getMetric('Conversion Rate');
  const customerSatisfactionMetric = getMetric('Customer Satisfaction');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        value={totalRevenueMetric.value}
        changeValue={totalRevenueMetric.change_value}
        prefix="$"
        changeIsPercentage={true}
      />
      <MetricCard
        title="Active Users"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        value={activeUsersMetric.value}
        changeValue={activeUsersMetric.change_value}
        changeIsPercentage={true}
      />
       <MetricCard
        title="Conversion Rate"
        icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        value={conversionRateMetric.value}
        changeValue={conversionRateMetric.change_value}
        suffix="%"
        changeIsPercentage={true}
      />
      <MetricCard
        title="Customer Satisfaction"
        icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
        value={customerSatisfactionMetric.value}
        changeValue={customerSatisfactionMetric.change_value}
        changeIsPercentage={false}
      />
    </div>
  );
};

export default KeyMetricsGrid;
