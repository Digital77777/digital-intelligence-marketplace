
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Calendar, BarChart3, ChevronUp, Database, Star, Clock } from 'lucide-react';

const TeamDashboard = () => {
  // This would normally come from Supabase
  const mockData = {
    apiCalls: 1243,
    apiLimit: 5000,
    activeProjects: 8,
    projectLimit: 20,
    teamMembers: 6,
    teamLimit: 10,
    storageUsed: "4.2GB",
    storageLimit: "10GB",
    topTools: [
      { name: "Hugging Face Transformers", usage: 423 },
      { name: "OpenCV", usage: 312 },
      { name: "Scikit-learn", usage: 287 }
    ],
    recentActivity: [
      { user: "John Doe", action: "Created new workflow", time: "2 hours ago" },
      { user: "Jane Smith", action: "Updated team settings", time: "3 hours ago" },
      { user: "Mike Johnson", action: "Added new team member", time: "5 hours ago" }
    ],
    upcomingDeadlines: [
      { project: "NLP Model Training", deadline: "Tomorrow" },
      { project: "Data Pipeline Setup", deadline: "In 3 days" },
      { project: "Image Recognition API", deadline: "Next week" }
    ]
  };

  return (
    <BasicTierLayout pageTitle="Team Dashboard" requiredFeature="team-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4 text-blue-500" />
                      Top Tools
                    </CardTitle>
                    <CardDescription>Most frequently used tools this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {mockData.topTools.map((tool, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-2" />
                            <span>{tool.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{tool.usage} calls</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-red-500" />
                      Upcoming Deadlines
                    </CardTitle>
                    <CardDescription>Project deadlines to keep in mind</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {mockData.upcomingDeadlines.map((deadline, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-orange-500 mr-2" />
                            <span>{deadline.project}</span>
                          </div>
                          <span className="text-sm text-red-500 font-medium">{deadline.deadline}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Team Activity</CardTitle>
                  <CardDescription>Activity from all team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {mockData.recentActivity.map((activity, index) => (
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
            </TabsContent>
            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Projects your team is currently working on</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Project details will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
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
        </div>
      </div>
    </BasicTierLayout>
  );
};

export default TeamDashboard;
