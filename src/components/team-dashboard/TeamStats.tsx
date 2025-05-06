
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TeamStats = () => {
  // This would normally come from Supabase
  const mockData = {
    activeProjects: 8,
    projectLimit: 20
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>Overview of your team's usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Active Projects</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-semibold">{mockData.activeProjects}</span>
              <span className="text-sm text-muted-foreground">/ {mockData.projectLimit}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
              <div 
                className="h-2 bg-green-500 rounded-full" 
                style={{ width: `${(mockData.activeProjects / mockData.projectLimit) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mt-6">Basic Tier Features</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Team Collaboration
              </li>
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Workflow Automation
              </li>
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Usage Analytics
              </li>
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Priority Support
              </li>
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                Limited Custom Models
              </li>
              <li className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                Advanced Enterprise Tools
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStats;
