
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUser } from '@/context/UserContext';

const serviceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
  price: z.coerce.number().min(1, 'Price must be at least $1.'),
  category: z.string().min(3, 'Category is required.'),
  tags: z.string().optional(),
  delivery_time_days: z.coerce.number().int().min(1, 'Delivery time must be at least 1 day.'),
});

interface CreateServiceFormProps {
  onServiceCreated: () => void;
}

const CreateServiceForm: React.FC<CreateServiceFormProps> = ({ onServiceCreated }) => {
  const { user } = useUser();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 1,
      category: '',
      tags: '',
      delivery_time_days: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof serviceSchema>) => {
    if (!user) {
      toast({ title: 'Authentication Error', description: 'You must be logged in to create a service.', variant: 'destructive' });
      return;
    }

    const { error } = await supabase.from('marketplace_services').insert([
      {
        seller_id: user.id,
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        tags: values.tags?.split(',').map(tag => tag.trim()).filter(Boolean),
        delivery_time_days: values.delivery_time_days,
      },
    ]).select();

    if (error) {
      toast({ title: 'Error creating service', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success!', description: 'Your service has been listed on the marketplace.' });
      form.reset();
      onServiceCreated();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., I will create a custom AI chatbot" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your service in detail..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="delivery_time_days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time (days)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., chatbot, nlp, react" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Service'}
        </Button>
      </form>
    </Form>
  );
};

export default CreateServiceForm;

