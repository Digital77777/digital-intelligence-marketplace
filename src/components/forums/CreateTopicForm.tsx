
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import { TopicForm } from './TopicForm';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface CreateTopicFormProps {
  categoryId: string;
  onCancel: () => void;
}

interface FormData {
  title: string;
  content: string;
}

const CreateTopicForm: React.FC<CreateTopicFormProps> = ({ categoryId, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const { currentTier, canAccess } = useTier();
  const navigate = useNavigate();
  
  const handleSubmit = async (data: FormData) => {
    if (!user) {
      toast.error("You must be logged in to create a topic");
      navigate('/auth');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Get category info to check required tier
      const { data: categoryData, error: categoryError } = await supabase
        .from('forum_categories')
        .select('required_tier')
        .eq('id', categoryId)
        .single();
      
      if (categoryError) throw categoryError;
      
      // Check if user can access this category based on tier
      if (!canAccess(`forum-category-${categoryData.required_tier}`)) {
        toast.error(`This category requires ${categoryData.required_tier} tier access`);
        return;
      }
      
      // Insert the topic
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
      
      toast.success("Topic created successfully");
      navigate(`/community/topic/${newTopic.id}`);
    } catch (error) {
      console.error("Error creating topic:", error);
      toast.error("Failed to create topic. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {currentTier === 'freemium' && (
        <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Freemium Tier Limitations</AlertTitle>
          <AlertDescription>
            Basic topics only. Upgrade to access premium categories and advanced forum features.
          </AlertDescription>
        </Alert>
      )}
      
      {currentTier === 'basic' && (
        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <Shield className="h-4 w-4" />
          <AlertTitle>Basic Tier Access</AlertTitle>
          <AlertDescription>
            You have access to most forum categories. Some specialized categories require Pro tier.
          </AlertDescription>
        </Alert>
      )}
      
      <TopicForm
        onSubmit={handleSubmit}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateTopicForm;
