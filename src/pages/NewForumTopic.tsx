
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Lock } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TopicForm } from '@/components/forums/TopicForm';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { currentTier, canAccess } = useTier();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const isFreemium = currentTier === 'freemium';
  
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
  }, [user, categoryId, navigate]);
  
  const fetchCategoryDetails = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('name, required_tier')
        .eq('id', categoryId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCategoryName(data.name);
        
        // Check if user has access to this category based on their tier
        if (data.required_tier && !canAccess(data.required_tier)) {
          toast.error("Access restricted", {
            description: `This category requires ${data.required_tier} tier or higher`
          });
          navigate('/community');
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error("Error", {
        description: "Could not find the forum category"
      });
      navigate('/community');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user || !categoryId) return;
    
    setIsSubmitting(true);
    
    try {
      // For freemium users, always set is_public to true
      const topicData = {
        title: data.title,
        content: data.content,
        user_id: user.id,
        category_id: categoryId,
        is_public: isFreemium ? true : undefined // Only set for freemium users
      };
      
      const { data: newTopic, error } = await supabase
        .from('forum_topics')
        .insert(topicData)
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
  
  if (isLoading) {
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
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <div className="flex justify-end space-x-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 group transition-all hover:bg-blue-50 dark:hover:bg-blue-950"
            onClick={() => navigate('/community')}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Forums
          </Button>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-400">Create New Topic</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {categoryName ? `Posting in: ${categoryName}` : 'Start a new discussion'}
                  </CardDescription>
                </div>
                {isFreemium ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1.5 px-3 py-1.5 animate-fade-in">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Public Topic</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 flex items-center gap-1.5 px-3 py-1.5 animate-fade-in">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Advanced Controls</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isFreemium && (
                <div className="mb-4 p-4 bg-green-50 text-green-800 rounded-md text-sm border border-green-200 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400">
                  <p className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>As a freemium user, your topic will be visible to all community members.</span>
                  </p>
                </div>
              )}
              <TopicForm 
                onSubmit={onSubmit} 
                onCancel={() => navigate('/community')} 
                isSubmitting={isSubmitting} 
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewForumTopic;
