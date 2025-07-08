
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import UpdateTaskForm from './UpdateTaskForm';
import { Team, Task } from './types';

interface UpdateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  teams: Team[];
}

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({ open, onOpenChange, task, teams }) => {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Edit the details of your task below.
          </DialogDescription>
        </DialogHeader>
        <UpdateTaskForm teams={teams} task={task} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
