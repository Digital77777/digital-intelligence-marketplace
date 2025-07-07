
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import WorkflowList from './WorkflowList';
import WorkflowDetail from './WorkflowDetail';
import WorkflowTemplates from './WorkflowTemplates';
import SchedulingPanel from './SchedulingPanel';
import { Workflow, SchedulingConfig } from './types';

interface WorkflowContentProps {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  onSelectWorkflow: (workflow: Workflow) => void;
  onUpdateWorkflow: (workflow: Partial<Workflow> & { id: string }) => Promise<any>;
  onTemplateSelect: (template: any) => void;
  availableModels: { id: string; name: string }[];
  schedulingConfig: SchedulingConfig;
  onSchedulingChange: (config: SchedulingConfig) => void;
  isLoading: boolean;
  canAccessProFeatures: boolean;
}

const WorkflowContent: React.FC<WorkflowContentProps> = ({
  workflows,
  selectedWorkflow,
  onSelectWorkflow,
  onUpdateWorkflow,
  onTemplateSelect,
  availableModels,
  schedulingConfig,
  onSchedulingChange,
  isLoading,
  canAccessProFeatures
}) => {
  const ProFeatureCard = ({ title, description }: { title: string; description: string }) => (
    <Card>
      <CardContent className="flex items-center justify-center h-96">
        <div className="text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <TabsContent value="workflows">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WorkflowList
              workflows={workflows}
              selectedWorkflow={selectedWorkflow}
              onSelectWorkflow={onSelectWorkflow}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-2">
            {selectedWorkflow ? (
              <WorkflowDetail
                workflow={selectedWorkflow}
                onUpdateWorkflow={onUpdateWorkflow}
                availableModels={availableModels}
              />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-gray-500">
                    {isLoading ? 'Loading workflows...' : 'Select a workflow to edit or create a new one.'}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="templates">
        {canAccessProFeatures ? (
          <WorkflowTemplates onSelectTemplate={onTemplateSelect} />
        ) : (
          <ProFeatureCard
            title="Pro Feature Required"
            description="Upgrade to Pro to access advanced workflow templates"
          />
        )}
      </TabsContent>

      <TabsContent value="scheduling">
        {canAccessProFeatures ? (
          <SchedulingPanel
            config={schedulingConfig}
            onChange={onSchedulingChange}
          />
        ) : (
          <ProFeatureCard
            title="Pro Feature Required"
            description="Upgrade to Pro to access advanced scheduling and automation"
          />
        )}
      </TabsContent>
    </>
  );
};

export default WorkflowContent;
