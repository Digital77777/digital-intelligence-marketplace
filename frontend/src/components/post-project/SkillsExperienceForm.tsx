
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X, Users } from 'lucide-react';

interface SkillsExperienceFormProps {
  formData: {
    required_skills: string[];
    experience_level: string;
  };
  onInputChange: (field: string, value: string | string[]) => void;
}

const SkillsExperienceForm: React.FC<SkillsExperienceFormProps> = ({ formData, onInputChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const skillSuggestions = [
    'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision',
    'Data Science', 'Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js',
    'Data Analysis', 'Statistical Modeling', 'AI/ML', 'API Development'
  ];

  const addSkill = () => {
    if (skillInput.trim() && !formData.required_skills.includes(skillInput.trim())) {
      onInputChange('required_skills', [...formData.required_skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onInputChange('required_skills', formData.required_skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
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
                    onInputChange('required_skills', [...formData.required_skills, skill]);
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
          <Select value={formData.experience_level} onValueChange={(value) => onInputChange('experience_level', value)}>
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
  );
};

export default SkillsExperienceForm;
