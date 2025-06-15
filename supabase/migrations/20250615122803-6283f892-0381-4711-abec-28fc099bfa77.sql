
-- 1. Create workflow execution logs table
CREATE TABLE public.workflow_execution_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  status TEXT NOT NULL,
  step_outputs JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Create workflow permissions table
CREATE TABLE public.workflow_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT unique_workflow_user UNIQUE(workflow_id, user_id)
);

-- 3. Create workflow execution metrics table
CREATE TABLE public.workflow_execution_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  log_id UUID REFERENCES workflow_execution_logs(id) ON DELETE CASCADE,
  execution_time_ms INTEGER,
  success BOOLEAN,
  step_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS and policies
ALTER TABLE public.workflow_execution_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workflow log access for workflow editors" ON public.workflow_execution_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_id = workflow_execution_logs.workflow_id
      AND user_id = auth.uid()
    )
  );
CREATE POLICY "Workflow log insert by editors" ON public.workflow_execution_logs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_id = workflow_execution_logs.workflow_id
      AND user_id = auth.uid()
    )
  );

ALTER TABLE public.workflow_permissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their workflow permissions" ON public.workflow_permissions
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Only workflow owners grant perms" ON public.workflow_permissions
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Only owners edit/delete their perms" ON public.workflow_permissions
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Only owners remove their perms" ON public.workflow_permissions
  FOR DELETE USING (user_id = auth.uid());

ALTER TABLE public.workflow_execution_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Workflow metrics readable to workflow editors" ON public.workflow_execution_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_id = workflow_execution_metrics.workflow_id
      AND user_id = auth.uid()
    )
  );
CREATE POLICY "Metrics insertable by editors" ON public.workflow_execution_metrics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflow_permissions
      WHERE workflow_id = workflow_execution_metrics.workflow_id
      AND user_id = auth.uid()
    )
  );
