
import { Team, Task } from '../types';

export const validateTeamName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Team name is required';
  }
  if (name.length < 3) {
    return 'Team name must be at least 3 characters';
  }
  if (name.length > 50) {
    return 'Team name must be less than 50 characters';
  }
  return null;
};

export const validateTaskTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'Task title is required';
  }
  if (title.length < 3) {
    return 'Task title must be at least 3 characters';
  }
  if (title.length > 100) {
    return 'Task title must be less than 100 characters';
  }
  return null;
};

export const validateTaskDescription = (description?: string): string | null => {
  if (description && description.length > 500) {
    return 'Task description must be less than 500 characters';
  }
  return null;
};

export const canUserEditTask = (task: Task, userId: string): boolean => {
  // Users can edit tasks they created or are assigned to
  return task.created_by === userId || task.assigned_to === userId;
};

export const canUserDeleteTask = (task: Task, userId: string): boolean => {
  // Only task creators can delete tasks
  return task.created_by === userId;
};

export const getTaskPriorityColor = (priority: string | null): string => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'low': return 'text-green-600 bg-green-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getTaskStatusColor = (status: string): string => {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'in_progress': return 'bg-blue-500';
    case 'todo': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};
