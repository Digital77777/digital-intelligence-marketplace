
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, Clock, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type TaskStatus = 'Not Started' | 'In Progress' | 'Done';

interface Task {
  id: number;
  title: string;
  assignee: string;
  status: TaskStatus;
  due: string;
}

interface TasksTabProps {
  tasks: Task[];
}

export const TasksTab: React.FC<TasksTabProps> = ({ tasks }) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Done':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'Not Started':
        return <AlertCircle className="h-3.5 w-3.5" />;
      case 'In Progress':
        return <Clock className="h-3.5 w-3.5" />;
      case 'Done':
        return <Check className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Team Tasks</CardTitle>
          <CardDescription>Track and manage team tasks and progress</CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{task.title}</h4>
                <Badge variant="outline" className={`flex items-center gap-1 ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                  {task.status}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Assigned to: <span className="text-foreground">{task.assignee}</span></span>
                <span className="text-muted-foreground">Due: <span className="text-foreground">{task.due}</span></span>
              </div>
              <div className="mt-3 flex gap-2 justify-end">
                <Button variant="outline" size="sm">Edit</Button>
                {task.status !== 'Done' && (
                  <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
