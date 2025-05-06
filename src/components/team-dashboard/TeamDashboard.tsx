
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Calendar, BarChart3, ChevronUp, Database, Star, Clock } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';
import TeamOverview from '@/components/team-dashboard/TeamOverview';
import TeamProjects from '@/components/team-dashboard/TeamProjects';
import TeamActivity from '@/components/team-dashboard/TeamActivity';
import TeamStats from '@/components/team-dashboard/TeamStats';

export const TeamDashboard = () => {
  // Use our custom scroll hook to ensure page scrolls to top on navigation
  useScrollToTop();

  return (
    <BasicTierLayout pageTitle="Team Dashboard" requiredFeature="team-dashboard">
      <div className="space-y-6">
        <TeamOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <TeamProjects />
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <TeamActivity />
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
            <TeamStats />
          </div>
        </div>
      </div>
    </BasicTierLayout>
  );
};

export default TeamDashboard;
