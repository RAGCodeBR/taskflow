-- A criação offline sincroniza o cadastro sem chamar refresh_recurring_meeting.
-- Este gatilho garante a ocorrência única também nesse caminho.
CREATE OR REPLACE FUNCTION public.sync_single_meeting_occurrence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND (
    OLD.is_recurring IS DISTINCT FROM NEW.is_recurring
    OR OLD.start_date IS DISTINCT FROM NEW.start_date
    OR OLD.is_active IS DISTINCT FROM NEW.is_active
  ) THEN
    DELETE FROM public.recurring_meeting_occurrences
    WHERE recurring_meeting_id = NEW.id
      AND task_id IS NULL
      AND status = 'scheduled';
  END IF;

  IF NOT NEW.is_recurring AND NEW.is_active THEN
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

DROP TRIGGER IF EXISTS trg_sync_single_meeting_occurrence ON public.recurring_meetings;
CREATE TRIGGER trg_sync_single_meeting_occurrence
  AFTER INSERT OR UPDATE ON public.recurring_meetings
  FOR EACH ROW EXECUTE FUNCTION public.sync_single_meeting_occurrence();

REVOKE ALL ON FUNCTION public.sync_single_meeting_occurrence() FROM PUBLIC, anon, authenticated;
