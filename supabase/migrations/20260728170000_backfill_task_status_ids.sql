-- Assign the default configured status to legacy tasks that only have the old status value.
UPDATE public.tasks AS task
SET status_id = CASE
  WHEN task.status = 'done' THEN (
    SELECT id FROM public.task_statuses WHERE is_completed ORDER BY position LIMIT 1
  )
  ELSE (
    SELECT id FROM public.task_statuses WHERE NOT is_completed ORDER BY position LIMIT 1
  )
END
WHERE task.status_id IS NULL;
