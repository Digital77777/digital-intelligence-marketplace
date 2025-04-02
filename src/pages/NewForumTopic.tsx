
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
import { ArrowLeft, Globe } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { TopicForm } from '@/components/forums/TopicForm';
import { Badge } from "@/components/ui/badge";

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
  const { currentTier } = useTier();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Create New Topic</CardTitle>
                  <CardDescription>
                    {categoryName ? `Posting in: ${categoryName}` : 'Start a new discussion'}
                  </CardDescription>
                </div>
                {isFreemium && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 flex items-center gap-1.5 px-3 py-1">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Public Topic</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isFreemium && (
                <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md text-sm">
                  Note: As a freemium user, your topic will be visible to all community members.
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
