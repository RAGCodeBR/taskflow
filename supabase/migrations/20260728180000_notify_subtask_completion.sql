-- Notify every task participant when someone completes a subtask.
CREATE OR REPLACE FUNCTION public.notify_subtask_completion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor uuid := auth.uid();
  actor_name text;
  task_title text;
  clean_subtask_title text;
  recipient_id uuid;
BEGIN
  -- Only notify on the transition from open to completed.
  IF NEW.done IS NOT TRUE OR OLD.done IS TRUE THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(full_name, email) INTO actor_name
  FROM public.profiles
  WHERE id = actor;

  SELECT title INTO task_title
  FROM public.tasks
  WHERE id = NEW.task_id;

  clean_subtask_title := regexp_replace(COALESCE(NEW.title, ''), '<[^>]+>', '', 'g');

  FOR recipient_id IN
    SELECT DISTINCT participant.user_id
    FROM (
      SELECT t.assignee_id AS user_id FROM public.tasks t WHERE t.id = NEW.task_id
      UNION ALL
      SELECT t.created_by AS user_id FROM public.tasks t WHERE t.id = NEW.task_id
      UNION ALL
      SELECT tc.collaborator_id AS user_id FROM public.task_collaborators tc WHERE tc.task_id = NEW.task_id
      UNION ALL
      SELECT s.assignee_id AS user_id FROM public.subtasks s WHERE s.task_id = NEW.task_id
    ) AS participant
    WHERE participant.user_id IS NOT NULL
      AND (actor IS NULL OR participant.user_id <> actor)
  LOOP
    INSERT INTO public.notifications (user_id, task_id, type, title, body)
    VALUES (
      recipient_id,
      NEW.task_id,
      'subtask_completed',
      U&'Subtarefa conclu\00EDda',
      COALESCE(actor_name, U&'Algu\00E9m') || ' concluiu a subtarefa "' || clean_subtask_title || '"'
        || CASE WHEN task_title IS NOT NULL THEN ' em: ' || task_title ELSE '' END
    );
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_subtask_completion ON public.subtasks;
CREATE TRIGGER trg_notify_subtask_completion
  AFTER UPDATE OF done ON public.subtasks
  FOR EACH ROW EXECUTE FUNCTION public.notify_subtask_completion();
