
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TeamActivity = () => {
  const recentActivity = [
    { user: "John Doe", action: "Created new workflow", time: "2 hours ago" },
    { user: "Jane Smith", action: "Updated team settings", time: "3 hours ago" },
    { user: "Mike Johnson", action: "Added new team member", time: "5 hours ago" },
    { user: "Sarah Wilson", action: "Deployed model to production", time: "Yesterday" },
    { user: "Alex Brown", action: "Updated dataset for NLP model", time: "2 days ago" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Team Activity</CardTitle>
        <CardDescription>Activity from all team members</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivity.map((activity, index) => (
            <li key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TeamActivity;
