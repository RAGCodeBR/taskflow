-- A conclusão da pauta conclui suas tarefas; a conclusão (ou reabertura) das
-- tarefas atualiza o resultado da pauta. Uma pauta com várias tarefas só fica
-- concluída quando todas as tarefas ativas estiverem concluídas.
CREATE OR REPLACE FUNCTION public.complete_meeting_agenda_tasks()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  completed_status_id uuid;
  target_workspace_id uuid;
BEGIN
  IF NEW.result IS DISTINCT FROM 'done' OR NEW.result IS NOT DISTINCT FROM OLD.result THEN
    RETURN NEW;
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.tasks task
    JOIN public.subtasks subtask ON subtask.task_id = task.id
    WHERE task.recurring_meeting_agenda_item_id = NEW.id
      AND task.deleted_at IS NULL
      AND task.archived_at IS NULL
      AND NOT subtask.done
      AND task.status IS DISTINCT FROM 'done'::public.task_status
      AND task.completed_at IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM public.task_statuses status
        WHERE status.id = task.status_id AND status.is_completed
      )
  ) THEN
    RAISE EXCEPTION 'Conclua todas as subtarefas antes de concluir a pauta';
  END IF;

  SELECT occurrence.workspace_id INTO target_workspace_id
  FROM public.recurring_meeting_occurrences occurrence
  WHERE occurrence.id = NEW.occurrence_id;

  SELECT status.id INTO completed_status_id
  FROM public.task_statuses status
  WHERE status.workspace_id = target_workspace_id AND status.is_completed
  ORDER BY status.position
  LIMIT 1;

  IF completed_status_id IS NULL AND EXISTS (
    SELECT 1 FROM public.tasks task
    WHERE task.recurring_meeting_agenda_item_id = NEW.id
      AND task.deleted_at IS NULL AND task.archived_at IS NULL
      AND task.status IS DISTINCT FROM 'done'::public.task_status
      AND task.completed_at IS NULL
  ) THEN
    RAISE EXCEPTION 'Cadastre um status marcado como concluído antes de concluir as tarefas';
  END IF;

  UPDATE public.tasks task
  SET status = 'done'::public.task_status,
      status_id = completed_status_id,
      completed_at = coalesce(task.completed_at, now())
  WHERE task.recurring_meeting_agenda_item_id = NEW.id
    AND task.deleted_at IS NULL
    AND task.archived_at IS NULL
    AND NOT (
      task.status = 'done'::public.task_status
      OR task.completed_at IS NOT NULL
      OR EXISTS (
        SELECT 1 FROM public.task_statuses status
        WHERE status.id = task.status_id AND status.is_completed
      )
    );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_complete_meeting_agenda_tasks ON public.recurring_meeting_agenda_items;
CREATE TRIGGER trg_complete_meeting_agenda_tasks
  AFTER UPDATE OF result ON public.recurring_meeting_agenda_items
  FOR EACH ROW EXECUTE FUNCTION public.complete_meeting_agenda_tasks();

CREATE OR REPLACE FUNCTION public.sync_meeting_agenda_from_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  item_id uuid;
  old_item_id uuid;
  has_pending boolean;
  has_active boolean;
BEGIN
  IF TG_OP = 'UPDATE' THEN old_item_id := OLD.recurring_meeting_agenda_item_id; END IF;
  FOR item_id IN
    SELECT DISTINCT linked.id
    FROM (VALUES (NEW.recurring_meeting_agenda_item_id),
                 (old_item_id)) linked(id)
    WHERE linked.id IS NOT NULL
  LOOP
    SELECT
      EXISTS (
        SELECT 1 FROM public.tasks task
        WHERE task.recurring_meeting_agenda_item_id = item_id
          AND task.deleted_at IS NULL AND task.archived_at IS NULL
      ),
      EXISTS (
        SELECT 1 FROM public.tasks task
        WHERE task.recurring_meeting_agenda_item_id = item_id
          AND task.deleted_at IS NULL AND task.archived_at IS NULL
          AND NOT (
            task.status = 'done'::public.task_status
            OR task.completed_at IS NOT NULL
            OR EXISTS (
              SELECT 1 FROM public.task_statuses status
              WHERE status.id = task.status_id AND status.is_completed
            )
          )
      )
    INTO has_active, has_pending;

    IF has_active THEN
      UPDATE public.recurring_meeting_agenda_items item
      SET result = CASE WHEN has_pending THEN 'task' ELSE 'done' END
      WHERE item.id = item_id
        AND item.result IS DISTINCT FROM CASE WHEN has_pending THEN 'task' ELSE 'done' END;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_meeting_agenda_from_task ON public.tasks;
CREATE TRIGGER trg_sync_meeting_agenda_from_task
  AFTER INSERT OR UPDATE OF status, status_id, completed_at, deleted_at, archived_at,
    recurring_meeting_agenda_item_id ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.sync_meeting_agenda_from_task();

-- Corrige pautas que já possuíam tarefas concluídas antes desta sincronização.
UPDATE public.recurring_meeting_agenda_items item
SET result = CASE WHEN EXISTS (
  SELECT 1 FROM public.tasks task
  WHERE task.recurring_meeting_agenda_item_id = item.id
    AND task.deleted_at IS NULL AND task.archived_at IS NULL
    AND NOT (
      task.status = 'done'::public.task_status
      OR task.completed_at IS NOT NULL
      OR EXISTS (
        SELECT 1 FROM public.task_statuses status
        WHERE status.id = task.status_id AND status.is_completed
      )
    )
) THEN 'task' ELSE 'done' END
WHERE EXISTS (
  SELECT 1 FROM public.tasks task
  WHERE task.recurring_meeting_agenda_item_id = item.id
    AND task.deleted_at IS NULL AND task.archived_at IS NULL
)
AND item.result IS DISTINCT FROM CASE WHEN EXISTS (
  SELECT 1 FROM public.tasks task
  WHERE task.recurring_meeting_agenda_item_id = item.id
    AND task.deleted_at IS NULL AND task.archived_at IS NULL
    AND NOT (
      task.status = 'done'::public.task_status
      OR task.completed_at IS NOT NULL
      OR EXISTS (
        SELECT 1 FROM public.task_statuses status
        WHERE status.id = task.status_id AND status.is_completed
      )
    )
) THEN 'task' ELSE 'done' END;

REVOKE ALL ON FUNCTION public.complete_meeting_agenda_tasks() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_meeting_agenda_from_task() FROM PUBLIC, anon, authenticated;
