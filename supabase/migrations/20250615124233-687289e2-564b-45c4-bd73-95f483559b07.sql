
CREATE OR REPLACE FUNCTION public.get_workflow_runs_with_details()
RETURNS TABLE(
  id uuid,
  workflow_id uuid,
  workflow_name text,
  status text,
  duration text,
  start_time timestamptz,
  steps_count integer,
  triggered_by text,
  error_message text
)
LANGUAGE 'plpgsql'
STABLE
AS $BODY$
BEGIN
  RETURN QUERY
  SELECT
    wel.id,
    wel.workflow_id,
    w.name AS workflow_name,
    wel.status,
    CASE
        WHEN wel.completed_at IS NOT NULL AND wel.started_at IS NOT NULL
        THEN floor(extract(epoch from (wel.completed_at - wel.started_at)) / 60) || 'm ' ||
             floor(extract(epoch from (wel.completed_at - wel.started_at)))::int % 60 || 's'
        ELSE 'In progress'
    END AS duration,
    wel.started_at AS start_time,
    COALESCE(jsonb_array_length(w.steps), 0) AS steps_count,
    COALESCE(up.username, up.full_name, 'System') AS triggered_by,
    wel.error_message
  FROM
    public.workflow_execution_logs AS wel
  LEFT JOIN
    public.workflows AS w ON wel.workflow_id = w.id
  LEFT JOIN
    public.user_profiles AS up ON wel.user_id = up.id
  ORDER BY
    wel.started_at DESC;
END;
$BODY$;
