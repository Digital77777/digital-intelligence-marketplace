
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  changeValue: number | null;
  prefix?: string;
  suffix?: string;
  changeIsPercentage?: boolean;
}

const getTrend = (value: number | null | undefined) => {
    if (value === null || value === undefined || value === 0) return 'stable';
    return value > 0 ? 'up' : 'down';
}

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

const formatChangeValue = (changeValue: number | null, isPercentage: boolean) => {
    if (changeValue === null || changeValue === undefined) return '';
    const plusSign = changeValue > 0 ? '+' : '';
    const suffix = isPercentage ? '%' : '';
    return `${plusSign}${changeValue}${suffix}`;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, icon, value, changeValue, prefix = '', suffix = '', changeIsPercentage = false }) => {
  const trend = getTrend(changeValue);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{prefix}{value.toLocaleString()}{suffix}</div>
        <div className="flex items-center space-x-1 text-xs">
          {getTrendIcon(trend)}
          <span className={getTrendColor(trend)}>
             {formatChangeValue(changeValue, changeIsPercentage)}
          </span>
          <span className="text-muted-foreground">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
