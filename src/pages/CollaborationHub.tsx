
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, RefreshCw, AlertCircle } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';

// Import real collaboration components
import TeamMembersList from '@/components/collaboration/TeamMembersList';
import QuickActions from '@/components/collaboration/QuickActions';
import DiscussionsTab from '@/components/collaboration/DiscussionsTab';
import TasksTab from '@/components/collaboration/TasksTab';
import FilesTab from '@/components/collaboration/FilesTab';
import EmptyState from '@/components/team-dashboard/EmptyState';
import { useCollaborationData } from '@/components/collaboration/hooks/useCollaborationData';

const CollaborationHub = () => {
  useScrollToTop();
  
  const { data, isLoading, isError, error, refetch } = useCollaborationData();

  if (isLoading) {
    return (
      <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </BasicTierLayout>
    );
  }

  if (isError) {
    return (
      <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
        <Card className="max-w-md mx-auto mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900">Failed to Load</h3>
              <p className="text-gray-600">
                {error?.message || 'Unable to load collaboration data. Please try again.'}
              </p>
              <Button onClick={() => refetch()} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </BasicTierLayout>
    );
  }

  const { discussions, files, teamMembers, tasks, teams } = data;

  console.log('CollaborationHub render data:', {
    teamsCount: teams.length,
    discussionsCount: discussions.length,
    filesCount: files.length,
    tasksCount: tasks.length,
    teamMembersCount: teamMembers.length
  });

  return (
    <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {teams.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <EmptyState
                  title="No teams found"
                  description="You are not part of any team yet. Create or join a team to start collaborating."
                  icon={<Users className="w-12 h-12" />}
                />
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="discussions">
              <TabsList className="mb-4">
                <TabsTrigger value="discussions">
                  Discussions ({discussions.length})
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  Tasks ({tasks.length})
                </TabsTrigger>
                <TabsTrigger value="files">
                  Files ({files.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions">
                <DiscussionsTab discussions={discussions} />
              </TabsContent>

              <TabsContent value="tasks">
                <TasksTab tasks={tasks} />
              </TabsContent>

              <TabsContent value="files">
                <FilesTab files={files} />
              </TabsContent>
            </Tabs>
          )}
        </div>

        <div>
          {teams.length > 0 && (
            <>
              <TeamMembersList teamMembers={teamMembers} />
              <QuickActions />
            </>
          )}
        </div>
      </div>
    </BasicTierLayout>
  );
};

export default CollaborationHub;
