
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DollarSign } from 'lucide-react';

interface BudgetTimelineFormProps {
  formData: {
    budget_type: string;
    fixed_price: string;
    budget_min: string;
    budget_max: string;
    estimated_hours: string;
    deadline: string;
    urgency_level: number;
  };
  onInputChange: (field: string, value: string | number) => void;
}

const BudgetTimelineForm: React.FC<BudgetTimelineFormProps> = ({ formData, onInputChange }) => {
  return (
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
                onCheckedChange={() => onInputChange('budget_type', 'fixed')}
              />
              <Label htmlFor="fixed">Fixed Price</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hourly"
                checked={formData.budget_type === 'hourly'}
                onCheckedChange={() => onInputChange('budget_type', 'hourly')}
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
              onChange={(e) => onInputChange('fixed_price', e.target.value)}
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
                onChange={(e) => onInputChange('budget_min', e.target.value)}
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
                onChange={(e) => onInputChange('budget_max', e.target.value)}
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
              onChange={(e) => onInputChange('estimated_hours', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline (optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => onInputChange('deadline', e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="urgency_level">Urgency Level</Label>
          <Select value={formData.urgency_level.toString()} onValueChange={(value) => onInputChange('urgency_level', parseInt(value))}>
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
  );
};

export default BudgetTimelineForm;
