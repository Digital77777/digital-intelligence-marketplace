
import React from 'react';
import MetricCard from './MetricCard';
import { PerformanceMetric } from '@/services/performanceMetricsService';
import { DollarSign, Activity, Smile, Lightbulb } from 'lucide-react';

interface KeyMetricsGridProps {
  metrics: PerformanceMetric[];
}

const KeyMetricsGrid: React.FC<KeyMetricsGridProps> = ({ metrics }) => {
  const getMetric = (name: string) => {
    return metrics.find(m => m.metric_name === name) || { value: 0, change_value: 0, metric_name: name, id: '', user_id: '', change_period: null, updated_at: '' };
  };

  const totalRevenueMetric = getMetric('Total Revenue');
  const engagementScoreMetric = getMetric('Engagement Score');
  const customerSatisfactionMetric = getMetric('Customer Satisfaction');
  const projectsCreatedMetric = getMetric('Projects Created');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Total Revenue"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        value={totalRevenueMetric.value}
        changeValue={totalRevenueMetric.change_value}
        prefix="$"
      />
      <MetricCard
        title="Engagement Score"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        value={engagementScoreMetric.value}
        changeValue={engagementScoreMetric.change_value}
      />
       <MetricCard
        title="Customer Satisfaction"
        icon={<Smile className="h-4 w-4 text-muted-foreground" />}
        value={customerSatisfactionMetric.value}
        changeValue={customerSatisfactionMetric.change_value}
        suffix="/100"
      />
      <MetricCard
        title="Projects Created"
        icon={<Lightbulb className="h-4 w-4 text-muted-foreground" />}
        value={projectsCreatedMetric.value}
        changeValue={projectsCreatedMetric.change_value}
      />
    </div>
  );
};

export default KeyMetricsGrid;
