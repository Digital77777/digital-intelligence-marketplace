
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: (team: any) => void;
}

const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({ open, onOpenChange, onTeamCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const { data, error } = await supabase
      .from('teams')
      .insert([{ name, description }])
      .select()
      .single();
    setCreating(false);

    if (error) {
      toast.error('Failed to create team: ' + error.message);
      return;
    }
    setName('');
    setDescription('');
    onOpenChange(false);
    toast.success('Team created!');

    // Add user to team_memberships
    if (data?.id) {
      await supabase.from('team_memberships').insert([{ team_id: data.id }]);
      if (onTeamCreated) onTeamCreated(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>Enter a team name and description to create a new team.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            required
            disabled={creating}
            placeholder="Team Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button type="submit" disabled={creating} className="w-full">
            {creating ? 'Creating...' : 'Create Team'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
