
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import TierGuard from '@/components/auth/TierGuard';
import ProjectBasicsForm from '@/components/post-project/ProjectBasicsForm';
import BudgetTimelineForm from '@/components/post-project/BudgetTimelineForm';
import SkillsExperienceForm from '@/components/post-project/SkillsExperienceForm';

interface ProjectData {
  client_id: string;
  title: string;
  description: string;
  project_type: string;
  is_hourly: boolean;
  required_skills: string[];
  experience_level: string;
  urgency_level: number;
  budget_min?: number;
  budget_max?: number;
  fixed_price?: number;
  estimated_hours?: number;
  deadline?: string;
}

const PostProject = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_type: '',
    budget_type: 'fixed',
    fixed_price: '',
    budget_min: '',
    budget_max: '',
    estimated_hours: '',
    deadline: '',
    required_skills: [],
    experience_level: 'intermediate',
    urgency_level: 2
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a project",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const projectData: ProjectData = {
        client_id: user.id,
        title: formData.title,
        description: formData.description,
        project_type: formData.project_type,
        is_hourly: formData.budget_type === 'hourly',
        required_skills: formData.required_skills,
        experience_level: formData.experience_level,
        urgency_level: formData.urgency_level
      };

      if (formData.budget_type === 'hourly') {
        projectData.budget_min = parseFloat(formData.budget_min);
        projectData.budget_max = parseFloat(formData.budget_max);
      } else {
        projectData.fixed_price = parseFloat(formData.fixed_price);
      }

      if (formData.estimated_hours) {
        projectData.estimated_hours = parseInt(formData.estimated_hours);
      }

      if (formData.deadline) {
        projectData.deadline = formData.deadline;
      }

      const { data, error } = await supabase
        .from('marketplace_projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Project Posted Successfully",
        description: "Your project has been posted and is now visible to freelancers.",
      });

      navigate(`/marketplace/project/${data.id}`);
    } catch (error) {
      console.error('Error posting project:', error);
      toast({
        title: "Error",
        description: "Failed to post project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TierGuard requiredTier="basic" feature="Project posting">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Post a Project</h1>
              <p className="text-muted-foreground">
                Tell us about your project and we'll connect you with the perfect AI experts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <ProjectBasicsForm 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <BudgetTimelineForm 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <SkillsExperienceForm 
                formData={formData}
                onInputChange={handleInputChange}
              />

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/marketplace')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Posting...' : 'Post Project'}
                </Button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </TierGuard>
  );
};

export default PostProject;
