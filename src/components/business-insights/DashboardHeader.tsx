
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Period = '7d' | '30d' | '90d';

interface DashboardHeaderProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your business performance and growth</p>
      </div>
      <Select value={selectedPeriod} onValueChange={(value: Period) => onPeriodChange(value)}>
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
  );
};

export default DashboardHeader;
