
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';
import { Task } from './types';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';

interface RecentTasksCardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onCreateTask: () => void;
}

const RecentTasksCard: React.FC<RecentTasksCardProps> = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask, 
  onCreateTask 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Latest tasks assigned to your team</CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task: Task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No tasks yet"
            description="Your team has no tasks. Create one to get started."
            icon={<FileText className="w-12 h-12" />}
            buttonText="Create Task"
            onButtonClick={onCreateTask}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTasksCard;
