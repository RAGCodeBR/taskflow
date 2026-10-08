-- Oculta reuniões de teste sem apagar ocorrências, pautas, atas ou eventos.
ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS archived_at timestamptz;

ALTER TABLE public.recurring_meetings
  ADD CONSTRAINT recurring_meetings_archived_inactive
  CHECK (archived_at IS NULL OR NOT is_active);

CREATE INDEX IF NOT EXISTS recurring_meetings_archived_at_idx
  ON public.recurring_meetings (workspace_id, archived_at);

-- Arquivar pausa a recorrência. A transição de arquivamento não pode executar
-- a limpeza normal de ocorrências agendadas do gatilho de sincronização.
CREATE OR REPLACE FUNCTION public.sync_single_meeting_occurrence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('taskflow.calendar_event_edit', true) = 'true' THEN RETURN NEW; END IF;
  IF TG_OP = 'UPDATE' AND OLD.archived_at IS DISTINCT FROM NEW.archived_at THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND NEW.is_recurring AND (
    OLD.is_recurring IS DISTINCT FROM NEW.is_recurring
    OR OLD.is_active IS DISTINCT FROM NEW.is_active
    OR OLD.start_date IS DISTINCT FROM NEW.start_date
  ) THEN
    DELETE FROM public.recurring_meeting_occurrences occurrence
    WHERE occurrence.recurring_meeting_id = NEW.id
      AND occurrence.task_id IS NULL
      AND occurrence.status = 'scheduled'
      AND occurrence.agenda_prepared_at IS NULL
      AND occurrence.rescheduled_at IS NULL
      AND NOT EXISTS (
        SELECT 1 FROM public.calendar_events event
        WHERE event.recurring_meeting_occurrence_id = occurrence.id
      );
  END IF;

  IF NOT NEW.is_recurring AND NEW.is_active THEN
    IF TG_OP = 'UPDATE' AND NOT OLD.is_recurring THEN
      UPDATE public.recurring_meeting_occurrences
      SET due_date = NEW.start_date, due_time = NEW.due_time
      WHERE recurring_meeting_id = NEW.id AND task_id IS NULL
        AND status = 'scheduled'
        AND (due_date IS DISTINCT FROM NEW.start_date
             OR due_time IS DISTINCT FROM NEW.due_time);
    END IF;
    INSERT INTO public.recurring_meeting_occurrences (
      workspace_id, recurring_meeting_id, due_date, due_time
    ) VALUES (
      NEW.workspace_id, NEW.id, NEW.start_date, NEW.due_time
    )
    ON CONFLICT (recurring_meeting_id, due_date)
    DO UPDATE SET due_time = EXCLUDED.due_time
    WHERE public.recurring_meeting_occurrences.task_id IS NULL
      AND public.recurring_meeting_occurrences.status = 'scheduled';
  END IF;

  RETURN NEW;
END;
$$;
