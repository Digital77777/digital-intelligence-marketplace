
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  X, 
  User, 
  DollarSign, 
  Award,
  ExternalLink,
  Star,
  Code,
  Brain
} from 'lucide-react';

const CreateFreelancerProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [existingProfile, setExistingProfile] = useState(null);

  const [formData, setFormData] = useState({
    bio: '',
    hourly_rate: '',
    years_experience: '',
    skills: [],
    portfolio_url: '',
    github_url: '',
    kaggle_url: '',
    badge: 'bronze'
  });

  useEffect(() => {
    if (user) {
      checkExistingProfile();
    }
  }, [user]);

  const checkExistingProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('freelancer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setExistingProfile(data);
        setFormData({
          bio: data.bio || '',
          hourly_rate: data.hourly_rate?.toString() || '',
          years_experience: data.years_experience?.toString() || '',
          skills: data.skills || [],
          portfolio_url: data.portfolio_url || '',
          github_url: data.github_url || '',
          kaggle_url: data.kaggle_url || '',
          badge: data.badge || 'bronze'
        });
      }
    } catch (error) {
      // Profile doesn't exist yet, which is fine
      console.log('No existing profile found');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a freelancer profile",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const profileData = {
        user_id: user.id,
        bio: formData.bio,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : 0,
        skills: formData.skills,
        portfolio_url: formData.portfolio_url || null,
        github_url: formData.github_url || null,
        kaggle_url: formData.kaggle_url || null,
        badge: formData.badge,
        updated_at: new Date().toISOString()
      };

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('freelancer_profiles')
          .update(profileData)
          .eq('id', existingProfile.id)
          .select()
          .single();
      } else {
        // Create new profile
        result = await supabase
          .from('freelancer_profiles')
          .insert([profileData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      toast({
        title: existingProfile ? "Profile Updated" : "Profile Created",
        description: existingProfile 
          ? "Your freelancer profile has been updated successfully."
          : "Your freelancer profile has been created successfully.",
      });

      navigate('/marketplace');
    } catch (error) {
      console.error('Error saving freelancer profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const skillSuggestions = [
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'Data Science', 'Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js',
    'Data Analysis', 'Statistical Modeling', 'AI/ML', 'API Development',
    'Neural Networks', 'Reinforcement Learning', 'MLOps', 'Cloud Computing'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {existingProfile ? 'Update Your Profile' : 'Create Freelancer Profile'}
            </h1>
            <p className="text-muted-foreground">
              {existingProfile 
                ? 'Update your profile to attract more clients'
                : 'Set up your professional profile to start receiving project opportunities'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Basics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Tell clients about your expertise and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Describe your expertise, experience, and what makes you unique..."
                    rows={6}
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      placeholder="75"
                      value={formData.hourly_rate}
                      onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="years_experience">Years of Experience</Label>
                    <Input
                      id="years_experience"
                      type="number"
                      placeholder="5"
                      value={formData.years_experience}
                      onChange={(e) => handleInputChange('years_experience', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Skills & Expertise
                </CardTitle>
                <CardDescription>
                  Add your technical skills and areas of expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="skills"
                      placeholder="Add a skill (e.g., Machine Learning)"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p className="mb-1">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {skillSuggestions.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              skills: [...prev.skills, skill]
                            }));
                          }}
                          className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded-md"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio & Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Portfolio & Links
                </CardTitle>
                <CardDescription>
                  Showcase your work and professional profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="portfolio_url">Portfolio Website</Label>
                  <Input
                    id="portfolio_url"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio_url}
                    onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github_url">GitHub Profile</Label>
                    <Input
                      id="github_url"
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.github_url}
                      onChange={(e) => handleInputChange('github_url', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="kaggle_url">Kaggle Profile</Label>
                    <Input
                      id="kaggle_url"
                      type="url"
                      placeholder="https://kaggle.com/username"
                      value={formData.kaggle_url}
                      onChange={(e) => handleInputChange('kaggle_url', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/marketplace')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Saving...' : (existingProfile ? 'Update Profile' : 'Create Profile')}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateFreelancerProfile;
