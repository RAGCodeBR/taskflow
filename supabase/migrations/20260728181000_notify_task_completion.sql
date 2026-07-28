-- Notify task participants when someone completes the main task.
CREATE OR REPLACE FUNCTION public.notify_task_completion()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor uuid := auth.uid();
  actor_name text;
  recipient_id uuid;
  was_completed boolean := OLD.status = 'done' OR OLD.completed_at IS NOT NULL;
  is_completed boolean := NEW.status = 'done' OR NEW.completed_at IS NOT NULL;
BEGIN
  IF NOT is_completed OR was_completed THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(full_name, email) INTO actor_name
  FROM public.profiles
  WHERE id = actor;

  FOR recipient_id IN
    SELECT DISTINCT participant.user_id
    FROM (
      SELECT NEW.assignee_id AS user_id
      UNION ALL
      SELECT NEW.created_by AS user_id
      UNION ALL
      SELECT tc.collaborator_id AS user_id FROM public.task_collaborators tc WHERE tc.task_id = NEW.id
      UNION ALL
      SELECT s.assignee_id AS user_id FROM public.subtasks s WHERE s.task_id = NEW.id
    ) AS participant
    WHERE participant.user_id IS NOT NULL
      AND (actor IS NULL OR participant.user_id <> actor)
  LOOP
    INSERT INTO public.notifications (user_id, task_id, type, title, body)
    VALUES (
      recipient_id,
      NEW.id,
      'task_completed',
      U&'Tarefa conclu\00EDda',
      COALESCE(actor_name, U&'Algu\00E9m') || ' concluiu a tarefa: ' || NEW.title
    );
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_task_completion ON public.tasks;
CREATE TRIGGER trg_notify_task_completion
  AFTER UPDATE OF status, completed_at ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.notify_task_completion();
