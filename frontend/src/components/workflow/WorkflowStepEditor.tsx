
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Settings } from 'lucide-react';
import { WorkflowStep } from './types';

interface WorkflowStepEditorProps {
  step: WorkflowStep;
  onUpdate: (step: WorkflowStep) => void;
  onDelete: () => void;
  availableModels: Array<{ id: string; name: string }>;
  isAdvanced?: boolean;
}

const WorkflowStepEditor: React.FC<WorkflowStepEditorProps> = ({
  step,
  onUpdate,
  onDelete,
  availableModels,
  isAdvanced = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateStep = (updates: Partial<WorkflowStep>) => {
    onUpdate({ ...step, ...updates });
  };

  const updateConfig = (configUpdates: Partial<WorkflowStep['config']>) => {
    onUpdate({
      ...step,
      config: { ...step.config, ...configUpdates }
    });
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'ai-model': return '🤖';
      case 'condition': return '🔀';
      case 'api-call': return '🌐';
      case 'timer': return '⏱️';
      case 'notification': return '📧';
      default: return '⚡';
    }
  };

  if (!isAdvanced) {
    return (
      <div className="flex-1 p-4 border rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium">{step.name}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>
            <Badge variant="outline" className="mt-2">
              {step.type}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-3">
            <Input
              placeholder="Step name"
              value={step.name}
              onChange={(e) => updateStep({ name: e.target.value })}
            />
            <Textarea
              placeholder="Step description"
              value={step.description}
              onChange={e => updateStep({ description: e.target.value })}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getStepIcon(step.type)}</span>
            <div>
              <CardTitle className="text-sm">{step.name}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {step.type.replace('-', ' ')}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <Input
            placeholder="Step name"
            value={step.name}
            onChange={(e) => updateStep({ name: e.target.value })}
          />
          <Textarea
            placeholder="Step description"
            value={step.description}
            onChange={e => updateStep({ description: e.target.value })}
          />
          <Select
            value={step.type}
            onValueChange={(value) => updateStep({ type: value as WorkflowStep['type'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="action">Action</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="ai-model">AI Model</SelectItem>
              <SelectItem value="api-call">API Call</SelectItem>
              <SelectItem value="timer">Timer</SelectItem>
              <SelectItem value="notification">Notification</SelectItem>
            </SelectContent>
          </Select>

          {step.type === 'ai-model' && (
            <Select
              value={step.config.modelId}
              onValueChange={(value) => updateConfig({ modelId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {step.type === 'api-call' && (
            <Input
              placeholder="API Endpoint URL"
              value={step.config.apiEndpoint || ''}
              onChange={(e) => updateConfig({ apiEndpoint: e.target.value })}
            />
          )}

          {step.type === 'condition' && (
            <Textarea
              placeholder="Condition logic (e.g., response.confidence > 0.8)"
              value={step.config.condition || ''}
              onChange={(e) => updateConfig({ condition: e.target.value })}
            />
          )}

          {step.type === 'timer' && (
            <Input
              type="number"
              placeholder="Delay in seconds"
              value={step.config.delay || ''}
              onChange={(e) => updateConfig({ delay: parseInt(e.target.value) })}
            />
          )}

          {step.type === 'notification' && (
            <div className="space-y-2">
              <Textarea
                placeholder="Notification message"
                value={step.config.message || ''}
                onChange={(e) => updateConfig({ message: e.target.value })}
              />
              <Input
                placeholder="Recipients (comma separated emails)"
                value={step.config.recipients?.join(', ') || ''}
                onChange={(e) => updateConfig({
                  recipients: e.target.value.split(',').map(email => email.trim())
                })}
              />
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default WorkflowStepEditor;
