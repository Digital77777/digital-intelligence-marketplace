
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Database, ChevronUp } from 'lucide-react';

const TeamOverview = () => {
  // This would normally come from Supabase
  const mockData = {
    apiCalls: 1243,
    apiLimit: 5000,
    teamMembers: 6,
    teamLimit: 10,
    storageUsed: "4.2GB",
    storageLimit: "10GB"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-500" />
            API Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold">{mockData.apiCalls}</span>
              <span className="text-sm text-muted-foreground ml-2">/ {mockData.apiLimit}</span>
            </div>
            <div className="text-xs text-green-600 flex items-center">
              <ChevronUp className="h-4 w-4 mr-1" />
              12% from last week
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: `${(mockData.apiCalls / mockData.apiLimit) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5 text-indigo-500" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold">{mockData.teamMembers}</span>
              <span className="text-sm text-muted-foreground ml-2">/ {mockData.teamLimit}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {mockData.teamLimit - mockData.teamMembers} slots available
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
            <div 
              className="h-2 bg-indigo-500 rounded-full" 
              style={{ width: `${(mockData.teamMembers / mockData.teamLimit) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="mr-2 h-5 w-5 text-purple-500" />
            Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold">{mockData.storageUsed}</span>
              <span className="text-sm text-muted-foreground ml-2">/ {mockData.storageLimit}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              42% used
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3">
            <div 
              className="h-2 bg-purple-500 rounded-full" 
              style={{ width: `42%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamOverview;
