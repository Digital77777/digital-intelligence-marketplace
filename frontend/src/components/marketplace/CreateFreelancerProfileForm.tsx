
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

const CreateFreelancerProfileForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState({
    bio: '',
    hourly_rate: '',
    years_experience: '',
    github_url: '',
    portfolio_url: '',
    kaggle_url: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to create a freelancer profile');
      return;
    }

    if (!formData.bio.trim() || !formData.hourly_rate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('freelancer_profiles')
        .insert({
          user_id: user.id,
          bio: formData.bio.trim(),
          hourly_rate: parseFloat(formData.hourly_rate),
          years_experience: parseInt(formData.years_experience) || 0,
          github_url: formData.github_url.trim() || null,
          portfolio_url: formData.portfolio_url.trim() || null,
          kaggle_url: formData.kaggle_url.trim() || null,
          skills: skills
        });

      if (error) throw error;

      toast.success('Freelancer profile created successfully!');
      navigate('/marketplace');
    } catch (error: any) {
      console.error('Profile creation error:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            Please log in to create a freelancer profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Freelancer Profile</CardTitle>
          <p className="text-sm text-muted-foreground">
            Set up your professional profile to start receiving project invitations.
          </p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Describe your expertise, experience, and what makes you unique..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourly_rate">Hourly Rate (USD) *</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                  placeholder="50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => handleInputChange('years_experience', e.target.value)}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Portfolio Links</Label>
              
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub Profile</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => handleInputChange('github_url', e.target.value)}
                  placeholder="https://github.com/yourusername"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio_url">Portfolio Website</Label>
                <Input
                  id="portfolio_url"
                  type="url"
                  value={formData.portfolio_url}
                  onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kaggle_url">Kaggle Profile</Label>
                <Input
                  id="kaggle_url"
                  type="url"
                  value={formData.kaggle_url}
                  onChange={(e) => handleInputChange('kaggle_url', e.target.value)}
                  placeholder="https://kaggle.com/yourusername"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/marketplace')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateFreelancerProfileForm;
