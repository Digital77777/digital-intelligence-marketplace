
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CreateTeamForm from './CreateTeamForm';

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: () => void;
}

const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({ 
  open, 
  onOpenChange, 
  onTeamCreated 
}) => {
  const handleTeamCreated = () => {
    onOpenChange(false);
    onTeamCreated?.();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Create a new team to collaborate with others on projects and tasks.
          </DialogDescription>
        </DialogHeader>
        <CreateTeamForm 
          onTeamCreated={handleTeamCreated}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
