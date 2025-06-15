
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, Calendar, Plus } from 'lucide-react';
import { CollaborationTask } from './types';
import { formatDistanceToNow } from 'date-fns';

interface TasksTabProps {
  tasks: CollaborationTask[];
}

const TasksTab: React.FC<TasksTabProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    in_progress: tasks.filter(task => task.status === 'in_progress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                To Do ({groupedTasks.todo.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {groupedTasks.todo.map((task) => (
              <div key={task.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  {task.priority && (
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                )}
                <div className="flex items-center justify-between">
                  {task.assignee_profile && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {(task.assignee_profile.full_name || task.assignee_profile.username)
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">
                        {task.assignee_profile.full_name || task.assignee_profile.username}
                      </span>
                    </div>
                  )}
                  {task.due_date && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* In Progress Column */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                In Progress ({groupedTasks.in_progress.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {groupedTasks.in_progress.map((task) => (
              <div key={task.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  {task.priority && (
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                )}
                <div className="flex items-center justify-between">
                  {task.assignee_profile && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {(task.assignee_profile.full_name || task.assignee_profile.username)
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">
                        {task.assignee_profile.full_name || task.assignee_profile.username}
                      </span>
                    </div>
                  )}
                  {task.due_date && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDistanceToNow(new Date(task.due_date), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed Column */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Completed ({groupedTasks.completed.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {groupedTasks.completed.map((task) => (
              <div key={task.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm line-through text-gray-600">{task.title}</h4>
                  {task.priority && (
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  )}
                </div>
                {task.description && (
                  <p className="text-xs text-gray-500 mb-2">{task.description}</p>
                )}
                <div className="flex items-center justify-between">
                  {task.assignee_profile && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {(task.assignee_profile.full_name || task.assignee_profile.username)
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">
                        {task.assignee_profile.full_name || task.assignee_profile.username}
                      </span>
                    </div>
                  )}
                  {task.completed_at && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3" />
                      <span>Completed {formatDistanceToNow(new Date(task.completed_at), { addSuffix: true })}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksTab;
