
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';
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
  
  const { data, isLoading, isError, error } = useCollaborationData();

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
        <div className="flex items-center justify-center h-64 text-red-500">
          Error: {error?.message || 'Failed to load collaboration data'}
        </div>
      </BasicTierLayout>
    );
  }

  const { discussions, files, teamMembers, tasks, teams } = data;

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
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
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
