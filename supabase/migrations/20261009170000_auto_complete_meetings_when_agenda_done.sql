-- Encerra uma reunião quando sua pauta preparada tem ao menos um item,
-- todos os itens estão concluídos e não resta tarefa vinculada em aberto.
-- Reuniões sem pauta e ocorrências de rotinas que não são reuniões ficam intactas.
CREATE OR REPLACE FUNCTION public.auto_complete_meeting_if_ready(target_occurrence_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF target_occurrence_id IS NULL THEN RETURN; END IF;

  -- Serializa conclusões simultâneas de itens da mesma reunião.
  PERFORM 1
  FROM public.recurring_meeting_occurrences occurrence
  JOIN public.recurring_meetings meeting ON meeting.id = occurrence.recurring_meeting_id
  WHERE occurrence.id = target_occurrence_id
    AND occurrence.status IN ('scheduled', 'open')
    AND occurrence.agenda_prepared_at IS NOT NULL
    AND meeting.meeting_mode
  FOR UPDATE OF occurrence;
  IF NOT FOUND THEN RETURN; END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.recurring_meeting_agenda_items item
    WHERE item.occurrence_id = target_occurrence_id
  ) OR EXISTS (
    SELECT 1 FROM public.recurring_meeting_agenda_items item
    WHERE item.occurrence_id = target_occurrence_id
      AND item.result IS DISTINCT FROM 'done'
  ) OR EXISTS (
    SELECT 1
    FROM public.tasks task
    WHERE task.deleted_at IS NULL
      AND task.archived_at IS NULL
      AND (
        task.recurring_meeting_occurrence_id = target_occurrence_id
        OR EXISTS (
          SELECT 1 FROM public.recurring_meeting_agenda_items item
          WHERE item.id = task.recurring_meeting_agenda_item_id
            AND item.occurrence_id = target_occurrence_id
        )
      )
      AND NOT (
        task.status = 'done'::public.task_status
        OR task.completed_at IS NOT NULL
        OR EXISTS (
          SELECT 1 FROM public.task_statuses status
          WHERE status.id = task.status_id AND status.is_completed
        )
      )
  ) THEN
    RETURN;
  END IF;

  UPDATE public.recurring_meeting_occurrences
  SET status = 'completed',
      completed_at = coalesce(completed_at, now()),
      completed_by = auth.uid()
  WHERE id = target_occurrence_id
    AND status IN ('scheduled', 'open');
END;
$$;

CREATE OR REPLACE FUNCTION public.auto_complete_meeting_from_agenda()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM public.auto_complete_meeting_if_ready(OLD.occurrence_id);
    RETURN OLD;
  END IF;

  PERFORM public.auto_complete_meeting_if_ready(NEW.occurrence_id);
  IF NEW.occurrence_id IS DISTINCT FROM OLD.occurrence_id THEN
    PERFORM public.auto_complete_meeting_if_ready(OLD.occurrence_id);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_z_auto_complete_meeting_from_agenda
  ON public.recurring_meeting_agenda_items;
-- O nome ordena este trigger depois de complete_meeting_agenda_tasks, que
-- conclui as tarefas vinculadas quando o resultado vira "done".
CREATE TRIGGER trg_z_auto_complete_meeting_from_agenda
  AFTER UPDATE OF result, occurrence_id OR DELETE
  ON public.recurring_meeting_agenda_items
  FOR EACH ROW EXECUTE FUNCTION public.auto_complete_meeting_from_agenda();

CREATE OR REPLACE FUNCTION public.auto_complete_meeting_from_task()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_id uuid;
  old_occurrence_id uuid;
  old_item_id uuid;
BEGIN
  -- O trigger de sincronização da pauta roda antes deste. Reavalia a reunião
  -- inclusive quando uma tarefa muda de pauta ou é arquivada/excluída.
  IF TG_OP = 'UPDATE' THEN
    old_occurrence_id := OLD.recurring_meeting_occurrence_id;
    old_item_id := OLD.recurring_meeting_agenda_item_id;
  END IF;
  FOR target_id IN
    SELECT DISTINCT linked.occurrence_id
    FROM (
      SELECT NEW.recurring_meeting_occurrence_id AS occurrence_id
      UNION ALL
      SELECT old_occurrence_id
      UNION ALL
      SELECT item.occurrence_id
      FROM public.recurring_meeting_agenda_items item
      WHERE item.id IN (NEW.recurring_meeting_agenda_item_id, old_item_id)
    ) linked
    WHERE linked.occurrence_id IS NOT NULL
  LOOP
    PERFORM public.auto_complete_meeting_if_ready(target_id);
  END LOOP;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_z_auto_complete_meeting_from_task ON public.tasks;
CREATE TRIGGER trg_z_auto_complete_meeting_from_task
  AFTER INSERT OR UPDATE OF status, status_id, completed_at, deleted_at,
    archived_at, recurring_meeting_agenda_item_id, recurring_meeting_occurrence_id
  ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.auto_complete_meeting_from_task();

REVOKE ALL ON FUNCTION public.auto_complete_meeting_if_ready(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.auto_complete_meeting_from_agenda() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.auto_complete_meeting_from_task() FROM PUBLIC, anon, authenticated;

-- Alcança reuniões antigas que já satisfazem a regra, sem tocar as que ainda
-- têm pautas ou tarefas pendentes.
DO $$
DECLARE pending_occurrence record;
BEGIN
  FOR pending_occurrence IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings meeting ON meeting.id = occurrence.recurring_meeting_id
    WHERE occurrence.status IN ('scheduled', 'open')
      AND occurrence.agenda_prepared_at IS NOT NULL
      AND meeting.meeting_mode
  LOOP
    PERFORM public.auto_complete_meeting_if_ready(pending_occurrence.id);
  END LOOP;
END;
$$;
