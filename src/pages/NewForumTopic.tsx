
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z.string()
    .min(20, { message: "Content must be at least 20 characters" })
});

const NewForumTopic = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });
  
  React.useEffect(() => {
    if (!user) {
      toast.error("Authentication required", {
        description: "You must be logged in to create a topic"
      });
      navigate('/auth');
      return;
    }
    
    if (categoryId) {
      fetchCategoryDetails();
    }
  }, [user, categoryId]);
  
  const fetchCategoryDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('name')
        .eq('id', categoryId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCategoryName(data.name);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error("Error", {
        description: "Could not find the forum category"
      });
      navigate('/community');
    }
  };
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user || !categoryId) return;
    
    setIsSubmitting(true);
    
    try {
      const { data: newTopic, error } = await supabase
        .from('forum_topics')
        .insert({
          title: data.title,
          content: data.content,
          user_id: user.id,
          category_id: categoryId
        })
        .select('id')
        .single();
        
      if (error) throw error;
      
      toast.success("Topic created", {
        description: "Your topic has been successfully created"
      });
      
      if (newTopic?.id) {
        navigate(`/community/topic/${newTopic.id}`);
      } else {
        navigate(`/community/category/${categoryId}`);
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      toast.error("Error", {
        description: "Failed to create topic. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/community')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forums
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>
                {categoryName ? `Posting in: ${categoryName}` : 'Start a new discussion'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a descriptive title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Choose a clear and specific title for your topic
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your post content here..." 
                            className="min-h-32"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details, questions, or points for discussion
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/community')}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : 'Create Topic'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewForumTopic;
