
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { Plus } from 'lucide-react';

interface AddDealDialogProps {
  pipelineId: string;
  stage: string;
  onDealAdded: () => void;
}

const AddDealDialog: React.FC<AddDealDialogProps> = ({ pipelineId, stage, onDealAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const { toast } = useToast();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    if (!title || value === '') {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase.from('pipeline_deals').insert({
        pipeline_id: pipelineId,
        stage,
        title,
        value: Number(value),
        user_id: user.id,
        assigned_to: user.id, // Assign to self by default
        probability: 10 // default probability, can be improved later
      });

      if (error) throw error;

      toast({ title: "Success", description: "Deal added successfully." });
      onDealAdded();
      setOpen(false);
      setTitle('');
      setValue('');
    } catch (error: any) {
      console.error('Error creating deal:', error);
      toast({ title: "Error", description: "Failed to create deal. " + error.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Add Deal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Deal to "{stage}"</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Deal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Deal Value ($)"
            value={value}
            onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
            required
          />
          <Button type="submit" className="w-full">Add Deal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDealDialog;
