
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface CreateTeamFormProps {
  onTeamCreated: () => void;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onTeamCreated, onCancel }) => {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to create a team');
      return;
    }

    setCreating(true);
    
    try {
      console.log('Creating team with user:', user.id);
      
      // Create the team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert([{ 
          name, 
          description,
          created_by: user.id 
        }])
        .select()
        .single();

      if (teamError) {
        console.error('Team creation error:', teamError);
        toast.error('Failed to create team: ' + teamError.message);
        return;
      }

      console.log('Team created successfully:', team);

      // Add the creator as a team member
      const { error: membershipError } = await supabase
        .from('team_memberships')
        .insert([{ 
          team_id: team.id, 
          user_id: user.id,
          role: 'owner'
        }]);

      if (membershipError) {
        console.error('Membership creation error:', membershipError);
        toast.error('Team created but failed to add you as member: ' + membershipError.message);
        return;
      }

      toast.success('Team created successfully!');
      setName('');
      setDescription('');
      onTeamCreated();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Team Name</Label>
        <Input
          id="name"
          required
          disabled={creating}
          placeholder="Enter team name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter team description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={creating}
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={creating} className="flex-1">
          {creating ? 'Creating...' : 'Create Team'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={creating}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateTeamForm;
