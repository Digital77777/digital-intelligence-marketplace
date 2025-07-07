
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Users, Plus } from 'lucide-react';
import { Task, Team } from './types';
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
import { useTaskMutations } from './hooks/useTaskMutations';

interface TeamDashboardContentProps {
  tasks: Task[];
  teams: Team[];
  onInvalidateQueries: () => void;
}

const TeamDashboardContent: React.FC<TeamDashboardContentProps> = ({
  tasks,
  teams,
  onInvalidateQueries
}) => {
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);

  const { deleteTask, isDeleting } = useTaskMutations(() => {
    setTaskToDelete(null);
    onInvalidateQueries();
  });

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const pending = tasks.filter(task => task.status === 'todo').length;
    
    return { total, completed, inProgress, pending };
  };

  const stats = getTaskStats();
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  if (teams.length === 0) {
    return (
      <>
        <CreateTeamDialog
          open={isCreateTeamOpen}
          onOpenChange={setCreateTeamOpen}
          onTeamCreated={onInvalidateQueries}
        />
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Team Dashboard</h1>
            <p className="text-gray-600">Overview of your team's tasks and progress</p>
          </div>
          <Button onClick={() => setCreateTeamOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Team
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <EmptyState
              title="No teams found"
              description="You are not part of any team yet. Create or join a team to see dashboard data."
              icon={<Users className="w-12 h-12" />}
            />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dialogs */}
      <CreateTeamDialog
        open={isCreateTeamOpen}
        onOpenChange={setCreateTeamOpen}
        onTeamCreated={onInvalidateQueries}
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

      <TeamsManagerCard teams={teams} onTeamUpdated={onInvalidateQueries} />
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
    </div>
  );
};

export default TeamDashboardContent;
