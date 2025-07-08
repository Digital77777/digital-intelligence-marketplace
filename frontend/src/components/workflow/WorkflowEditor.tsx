
import React from 'react';
import { Tabs } from "@/components/ui/tabs";
import WorkflowHeader from './WorkflowHeader';
import WorkflowTabs from './WorkflowTabs';
import WorkflowContent from './WorkflowContent';
import { useWorkflowManager } from './hooks/useWorkflowManager';

const WorkflowEditor = () => {
  const {
    workflows,
    isLoading,
    selectedWorkflow,
    setSelectedWorkflow,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newWorkflowFromTemplate,
    activeTab,
    setActiveTab,
    availableModels,
    schedulingConfig,
    setSchedulingConfig,
    handleUpdateWorkflow,
    handleCreateWorkflow,
    handleTemplateSelect,
    canAccessProFeatures,
    isCreating
  } = useWorkflowManager();

  return (
    <div className="space-y-6">
      <WorkflowHeader
        onCreateWorkflow={handleCreateWorkflow}
        isCreating={isCreating}
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        initialData={newWorkflowFromTemplate ? { 
          name: newWorkflowFromTemplate.name, 
          description: newWorkflowFromTemplate.description 
        } : undefined}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <WorkflowTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          canAccessProFeatures={canAccessProFeatures}
        />

        <WorkflowContent
          workflows={workflows}
          selectedWorkflow={selectedWorkflow}
          onSelectWorkflow={setSelectedWorkflow}
          onUpdateWorkflow={handleUpdateWorkflow}
          onTemplateSelect={handleTemplateSelect}
          availableModels={availableModels}
          schedulingConfig={schedulingConfig}
          onSchedulingChange={setSchedulingConfig}
          isLoading={isLoading}
          canAccessProFeatures={canAccessProFeatures}
        />
      </Tabs>
    </div>
  );
};

export default WorkflowEditor;
