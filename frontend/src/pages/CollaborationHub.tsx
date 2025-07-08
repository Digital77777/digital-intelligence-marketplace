
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';
import useScrollToTop from '@/hooks/useScrollToTop';
import CollaborationErrorBoundary from '@/components/collaboration/CollaborationErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

// Import collaboration components
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
        <LoadingSpinner text="Loading collaboration data..." className="py-12" />
      </BasicTierLayout>
    );
  }

  if (isError) {
    return (
      <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
        <CollaborationErrorBoundary>
          <ErrorMessage
            title="Failed to Load Collaboration Hub"
            message={error?.message || 'Unable to load collaboration data. Please try again.'}
            onRetry={refetch}
            className="my-8 max-w-md mx-auto"
          />
        </CollaborationErrorBoundary>
      </BasicTierLayout>
    );
  }

  const { discussions, files, teamMembers, tasks, teams } = data;

  return (
    <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
      <CollaborationErrorBoundary>
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
      </CollaborationErrorBoundary>
    </BasicTierLayout>
  );
};

export default CollaborationHub;
