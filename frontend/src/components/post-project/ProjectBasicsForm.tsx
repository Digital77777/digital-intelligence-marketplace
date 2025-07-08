
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Target } from 'lucide-react';

interface ProjectBasicsFormProps {
  formData: {
    title: string;
    description: string;
    project_type: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const ProjectBasicsForm: React.FC<ProjectBasicsFormProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('title', e.target.value)}
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
            onChange={(e) => onInputChange('description', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="project_type">Project Type</Label>
          <Select value={formData.project_type} onValueChange={(value) => onInputChange('project_type', value)}>
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
  );
};

export default ProjectBasicsForm;
