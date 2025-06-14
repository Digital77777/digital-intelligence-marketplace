
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Bot, Mail, Clock, GitBranch, TrendingUp } from 'lucide-react';

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: number;
  icon: React.ReactNode;
  isPro: boolean;
  template: any;
}

interface WorkflowTemplatesProps {
  onSelectTemplate: (template: WorkflowTemplate) => void;
}

const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({ onSelectTemplate }) => {
  const templates: WorkflowTemplate[] = [
    {
      id: 'ai-content-pipeline',
      name: 'AI Content Pipeline',
      description: 'Automated content generation using AI models with approval workflow',
      category: 'AI Automation',
      steps: 5,
      icon: <Bot className="h-5 w-5" />,
      isPro: true,
      template: {
        steps: [
          { type: 'ai-model', name: 'Generate Content', config: { modelId: 'text-generator' } },
          { type: 'condition', name: 'Quality Check', config: { condition: 'content.length > 100' } },
          { type: 'notification', name: 'Send for Review', config: { message: 'New content ready for review' } },
          { type: 'timer', name: 'Wait for Approval', config: { delay: 3600 } },
          { type: 'action', name: 'Publish Content', config: {} }
        ]
      }
    },
    {
      id: 'data-processing',
      name: 'Data Processing Pipeline',
      description: 'Process incoming data through multiple AI models and validation steps',
      category: 'Data Automation',
      steps: 4,
      icon: <GitBranch className="h-5 w-5" />,
      isPro: true,
      template: {
        steps: [
          { type: 'action', name: 'Receive Data', config: {} },
          { type: 'ai-model', name: 'Data Classification', config: { modelId: 'classifier' } },
          { type: 'condition', name: 'Validate Results', config: { condition: 'confidence > 0.85' } },
          { type: 'api-call', name: 'Store Results', config: { apiEndpoint: '/api/data/store' } }
        ]
      }
    },
    {
      id: 'customer-support',
      name: 'Customer Support Automation',
      description: 'Automated customer inquiry processing with AI assistance',
      category: 'Customer Service',
      steps: 6,
      icon: <Mail className="h-5 w-5" />,
      isPro: true,
      template: {
        steps: [
          { type: 'action', name: 'Receive Inquiry', config: {} },
          { type: 'ai-model', name: 'Analyze Intent', config: { modelId: 'intent-classifier' } },
          { type: 'condition', name: 'Route Decision', config: { condition: 'intent.confidence > 0.9' } },
          { type: 'ai-model', name: 'Generate Response', config: { modelId: 'response-generator' } },
          { type: 'notification', name: 'Human Review', config: { message: 'Response ready for review' } },
          { type: 'action', name: 'Send Response', config: {} }
        ]
      }
    },
    {
      id: 'performance-monitoring',
      name: 'Performance Monitoring',
      description: 'Monitor AI model performance and trigger alerts',
      category: 'Monitoring',
      steps: 3,
      icon: <TrendingUp className="h-5 w-5" />,
      isPro: true,
      template: {
        steps: [
          { type: 'api-call', name: 'Fetch Metrics', config: { apiEndpoint: '/api/metrics' } },
          { type: 'condition', name: 'Check Thresholds', config: { condition: 'accuracy < 0.85' } },
          { type: 'notification', name: 'Alert Team', config: { message: 'Model performance degraded' } }
        ]
      }
    },
    {
      id: 'scheduled-reports',
      name: 'Scheduled Reports',
      description: 'Generate and distribute automated reports on a schedule',
      category: 'Reporting',
      steps: 4,
      icon: <Clock className="h-5 w-5" />,
      isPro: false,
      template: {
        steps: [
          { type: 'timer', name: 'Schedule Trigger', config: { delay: 86400 } },
          { type: 'api-call', name: 'Gather Data', config: { apiEndpoint: '/api/reports/data' } },
          { type: 'action', name: 'Generate Report', config: {} },
          { type: 'notification', name: 'Send Report', config: { message: 'Weekly report attached' } }
        ]
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Workflow Templates</h3>
        <p className="text-sm text-gray-600">Choose from pre-built templates to get started quickly</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {template.icon}
                  <CardTitle className="text-base">{template.name}</CardTitle>
                </div>
                {template.isPro && (
                  <Badge className="bg-purple-100 text-purple-800">PRO</Badge>
                )}
              </div>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{template.steps} steps</span>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onSelectTemplate(template)}
                  className="bg-[#6AC8FF] hover:bg-[#6AC8FF]/90 text-gray-900"
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowTemplates;
