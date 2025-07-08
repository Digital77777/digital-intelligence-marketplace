
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamId: string;
  teamName?: string;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({ open, onOpenChange, teamId, teamName }) => {
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);

    const { error } = await supabase
      .from('team_invites')
      .insert([{ team_id: teamId, email }]);
    setInviting(false);

    if (error) {
      toast.error('Failed to send invite: ' + error.message);
      return;
    }
    toast.success('Team invite sent!');
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite to {teamName || 'Team'}</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            required
            disabled={inviting}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <Button type="submit" disabled={inviting} className="w-full">
            {inviting ? 'Inviting...' : 'Send Invite'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
