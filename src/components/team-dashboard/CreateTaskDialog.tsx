
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateTaskForm from './CreateTaskForm';
import { Team } from './types';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teams: Team[];
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ open, onOpenChange, teams }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new task for your team.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm teams={teams} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
