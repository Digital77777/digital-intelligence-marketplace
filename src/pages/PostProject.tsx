
import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  X, 
  DollarSign, 
  Clock, 
  Calendar,
  Users,
  Briefcase,
  Target
} from 'lucide-react';

const PostProject = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_type: '',
    budget_type: 'fixed', // 'fixed' or 'hourly'
    fixed_price: '',
    budget_min: '',
    budget_max: '',
    estimated_hours: '',
    deadline: '',
    required_skills: [],
    experience_level: 'intermediate',
    urgency_level: 2
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...prev.required_skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      required_skills: prev.required_skills.filter(skill => skill !== skillToRemove)
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
        description: "Please sign in to post a project",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      const projectData = {
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

  const skillSuggestions = [
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'Data Science', 'Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js',
    'Data Analysis', 'Statistical Modeling', 'AI/ML', 'API Development'
  ];

  return (
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
            {/* Project Basics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Provide basic information about your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Build a recommendation system for e-commerce"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, goals, and any specific details..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="project_type">Project Type</Label>
                  <Select value={formData.project_type} onValueChange={(value) => handleInputChange('project_type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Service (Custom Development)</SelectItem>
                      <SelectItem value="tool">Tool (Software/Model)</SelectItem>
                      <SelectItem value="job">Job (Consulting/Analysis)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Budget & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Budget & Timeline
                </CardTitle>
                <CardDescription>
                  Set your budget and timeline expectations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Budget Type</Label>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="fixed"
                        checked={formData.budget_type === 'fixed'}
                        onCheckedChange={() => handleInputChange('budget_type', 'fixed')}
                      />
                      <Label htmlFor="fixed">Fixed Price</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hourly"
                        checked={formData.budget_type === 'hourly'}
                        onCheckedChange={() => handleInputChange('budget_type', 'hourly')}
                      />
                      <Label htmlFor="hourly">Hourly Rate</Label>
                    </div>
                  </div>
                </div>

                {formData.budget_type === 'fixed' ? (
                  <div>
                    <Label htmlFor="fixed_price">Fixed Price ($)</Label>
                    <Input
                      id="fixed_price"
                      type="number"
                      placeholder="5000"
                      value={formData.fixed_price}
                      onChange={(e) => handleInputChange('fixed_price', e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget_min">Min Hourly Rate ($)</Label>
                      <Input
                        id="budget_min"
                        type="number"
                        placeholder="50"
                        value={formData.budget_min}
                        onChange={(e) => handleInputChange('budget_min', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget_max">Max Hourly Rate ($)</Label>
                      <Input
                        id="budget_max"
                        type="number"
                        placeholder="100"
                        value={formData.budget_max}
                        onChange={(e) => handleInputChange('budget_max', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimated_hours">Estimated Hours (optional)</Label>
                    <Input
                      id="estimated_hours"
                      type="number"
                      placeholder="40"
                      value={formData.estimated_hours}
                      onChange={(e) => handleInputChange('estimated_hours', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Deadline (optional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="urgency_level">Urgency Level</Label>
                  <Select value={formData.urgency_level.toString()} onValueChange={(value) => handleInputChange('urgency_level', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Flexible (No rush)</SelectItem>
                      <SelectItem value="2">Normal (Standard timeline)</SelectItem>
                      <SelectItem value="3">Important (Priority project)</SelectItem>
                      <SelectItem value="4">Urgent (Need ASAP)</SelectItem>
                      <SelectItem value="5">Critical (Emergency)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Skills & Experience Required
                </CardTitle>
                <CardDescription>
                  Specify the skills and experience level needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Required Skills</Label>
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
                  
                  {formData.required_skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.required_skills.map((skill, index) => (
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
                      {skillSuggestions.filter(skill => !formData.required_skills.includes(skill)).slice(0, 8).map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              required_skills: [...prev.required_skills, skill]
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

                <div>
                  <Label htmlFor="experience_level">Experience Level Required</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => handleInputChange('experience_level', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-4 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (5-7 years)</SelectItem>
                      <SelectItem value="expert">Expert (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
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
  );
};

export default PostProject;
