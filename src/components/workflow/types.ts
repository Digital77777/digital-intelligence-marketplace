
export type AllowedStepType = "action" | "condition" | "ai-model" | "api-call" | "timer" | "notification";

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: AllowedStepType;
  config: any;
  order: number;
  triggers?: string[];
  dependencies?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: string;
  created_at: string;
  created_by: string;
  team_id?: string | null;
}

export interface SchedulingConfig {
  enabled: boolean;
  type: 'once' | 'recurring' | 'trigger';
  schedule: string;
  timezone: string;
  conditions?: string[];
}
