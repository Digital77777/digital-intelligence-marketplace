import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const freelancerProfileSchema = z.object({
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  skills: z.string().min(2, 'Please list at least one skill'),
  hourly_rate: z.coerce.number().positive('Hourly rate must be positive'),
  portfolio_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  github_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  kaggle_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

const CreateFreelancerProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof freelancerProfileSchema>>({
    resolver: zodResolver(freelancerProfileSchema),
    defaultValues: {
      bio: '',
      skills: '',
      portfolio_url: '',
      github_url: '',
      kaggle_url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof freelancerProfileSchema>) => {
    if (!user) {
      toast.error('You must be logged in to create a profile.');
      return;
    }

    const { data, error } = await supabase
      .from('freelancer_profiles')
      .insert([{ 
        ...values, 
        user_id: user.id,
        skills: values.skills.split(',').map(skill => skill.trim()),
      }]);

    if (error) {
      toast.error('Failed to create profile. Please try again.');
      console.error('Error creating profile:', error);
    } else {
      toast.success('Profile created successfully!');
      navigate('/marketplace');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create Your Freelancer Profile</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., React, Node.js, Python" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hourly_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portfolio_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://your-portfolio.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/your-username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kaggle_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kaggle URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://kaggle.com/your-username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Profile
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateFreelancerProfile;
