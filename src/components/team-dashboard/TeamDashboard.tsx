
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Users, Plus } from 'lucide-react';
import { Task } from './types';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import EmptyState from './EmptyState';
import CreateTaskDialog from './CreateTaskDialog';
import UpdateTaskDialog from './UpdateTaskDialog';
import StatsCards from './StatsCards';
import ProgressCard from './ProgressCard';
import RecentTasksCard from './RecentTasksCard';
import CreateTeamDialog from './CreateTeamDialog';
import PendingInvitesCard from './PendingInvitesCard';
import TeamsManagerCard from './TeamsManagerCard';
import TeamsGrid from './TeamsGrid';
import { useTeamDashboard } from './hooks/useTeamDashboard';
import { useTaskMutations } from './hooks/useTaskMutations';

const TeamDashboard = () => {
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);

  const { data, isLoading, isError, error, refetch, invalidateQueries } = useTeamDashboard();
  const { deleteTask, isDeleting } = useTaskMutations(() => {
    setTaskToDelete(null);
    invalidateQueries();
  });

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
    }
  };

  const tasks = data?.tasks || [];
  const teams = data?.teams || [];

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const pending = tasks.filter(task => task.status === 'todo').length;
    
    return { total, completed, inProgress, pending };
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." className="py-12" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load dashboard"
        message={error?.message || 'Unable to load dashboard data'}
        onRetry={refetch}
        className="my-8"
      />
    );
  }

  const stats = getTaskStats();
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <CreateTeamDialog
        open={isCreateTeamOpen}
        onOpenChange={setCreateTeamOpen}
        onTeamCreated={invalidateQueries}
      />
      <CreateTaskDialog
        open={isCreateTaskOpen}
        onOpenChange={setCreateTaskOpen}
        teams={teams}
      />
      <UpdateTaskDialog
        open={!!taskToEdit}
        onOpenChange={(open) => !open && setTaskToEdit(null)}
        task={taskToEdit}
        teams={teams}
      />
      <AlertDialog open={!!taskToDelete} onOpenChange={(open) => !open && setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PendingInvitesCard />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Dashboard</h1>
          <p className="text-gray-600">Overview of your team's tasks and progress</p>
        </div>
        <Button onClick={() => setCreateTeamOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Team
        </Button>
      </div>

      {teams.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <EmptyState
              title="No teams found"
              description="You are not part of any team yet. Create or join a team to see dashboard data."
              icon={<Users className="w-12 h-12" />}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <TeamsManagerCard teams={teams} onTeamUpdated={invalidateQueries} />
          <StatsCards stats={stats} />
          <ProgressCard completionRate={completionRate} />
          <RecentTasksCard
            tasks={tasks}
            onEditTask={setTaskToEdit}
            onDeleteTask={setTaskToDelete}
            onCreateTask={() => setCreateTaskOpen(true)}
          />
          
          {/* Teams Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Teams</h2>
            <TeamsGrid teams={teams} />
          </div>
        </>
      )}
    </div>
  );
};

export default TeamDashboard;
