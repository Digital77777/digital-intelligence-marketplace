
import React from 'react';

interface StatItem {
  label: string;
  value: string;
  unit?: string; // unit might be part of the label or value in the original implementation
}

interface StatsDisplayGridProps {
  stats: StatItem[];
}

const StatsDisplayGrid: React.FC<StatsDisplayGridProps> = ({ stats }) => {
  // The original display has hardcoded labels and values, let's adapt to use the props
  // Assuming stats prop provides items like { value: "650", label: "XR Training Score" }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className="text-2xl font-bold text-gray-900">{stat.value}{stat.unit && stat.unit !== "points" && stat.unit !== "modules" && stat.unit !== "hours" ? stat.unit : ''}</div>
          <div className="text-xs text-gray-600">{stat.label} {stat.unit === "hours" ? `(${stat.unit})` : ''}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplayGrid;
