
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface WorkflowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  canAccessProFeatures: boolean;
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({
  activeTab,
  onTabChange,
  canAccessProFeatures
}) => {
  return (
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="workflows">My Workflows</TabsTrigger>
      <TabsTrigger value="templates">
        Templates
        {canAccessProFeatures && <Badge className="ml-2 bg-purple-100 text-purple-800">PRO</Badge>}
      </TabsTrigger>
      <TabsTrigger value="scheduling">
        Automation
        {canAccessProFeatures && <Badge className="ml-2 bg-purple-100 text-purple-800">PRO</Badge>}
      </TabsTrigger>
    </TabsList>
  );
};

export default WorkflowTabs;
