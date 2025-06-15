
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  completionRate: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completionRate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Progress</CardTitle>
        <CardDescription>Overall completion rate across all tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span>{completionRate.toFixed(1)}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
