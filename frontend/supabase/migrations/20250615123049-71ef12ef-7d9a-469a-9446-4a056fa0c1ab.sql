
ALTER TABLE public.workflow_execution_logs REPLICA IDENTITY FULL;
ALTER TABLE public.workflow_permissions REPLICA IDENTITY FULL;
ALTER TABLE public.workflow_execution_metrics REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_execution_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_permissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_execution_metrics;
