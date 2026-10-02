-- Cada data de uma reunião pode ter um evento próprio no Google Calendar/Meet.
-- Os links futuros são preparados numa janela de 30 dias para evitar criar
-- centenas de salas de uma vez em uma rotina diária.
ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS create_google_meet boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS auto_smart_notes boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS auto_transcription boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS google_calendar_id text,
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 60
    CHECK (duration_minutes BETWEEN 15 AND 1440);

ALTER TABLE public.calendar_events
  ADD COLUMN IF NOT EXISTS recurring_meeting_occurrence_id uuid
    REFERENCES public.recurring_meeting_occurrences(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS calendar_events_meeting_occurrence_key
  ON public.calendar_events(recurring_meeting_occurrence_id)
  WHERE recurring_meeting_occurrence_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.sync_meeting_calendar_event(target_occurrence_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meeting_record public.recurring_meetings%ROWTYPE;
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  existing_event public.calendar_events%ROWTYPE;
  event_start timestamptz;
  event_end timestamptz;
  event_id uuid;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;

  SELECT * INTO meeting_record
  FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode alterar esta reunião';
  END IF;

  SELECT * INTO existing_event
  FROM public.calendar_events
  WHERE recurring_meeting_occurrence_id = target_occurrence_id;

  IF NOT meeting_record.create_google_meet OR NOT meeting_record.is_active
     OR meeting_record.google_calendar_id IS NULL
     OR occurrence_record.status = 'skipped' THEN
    IF existing_event.id IS NOT NULL AND existing_event.deleted_at IS NULL THEN
      UPDATE public.calendar_events
      SET deleted_at = now(), deleted_by = auth.uid(),
          updated_by = coalesce(auth.uid(), meeting_record.created_by),
          sync_status = 'pending'
      WHERE id = existing_event.id;
    END IF;
    RETURN existing_event.id;
  END IF;

  -- Reuniões antigas não são criadas retroativamente no Google.
  IF occurrence_record.due_date < (now() AT TIME ZONE 'America/Sao_Paulo')::date
     AND existing_event.id IS NULL THEN RETURN NULL; END IF;

  -- Para recorrências, preparar gradualmente as próximas datas.
  IF meeting_record.is_recurring
     AND occurrence_record.due_date > (now() AT TIME ZONE 'America/Sao_Paulo')::date + 30
     AND existing_event.id IS NULL THEN RETURN NULL; END IF;

  event_start := (occurrence_record.due_date + coalesce(occurrence_record.due_time, '09:00'::time))
    AT TIME ZONE 'America/Sao_Paulo';
  event_end := event_start + make_interval(mins => meeting_record.duration_minutes);

  IF existing_event.id IS NULL THEN
    INSERT INTO public.calendar_events (
      title, description, starts_at, ends_at, is_all_day, meeting_url,
      create_google_meet, auto_smart_notes, auto_transcription,
      google_calendar_id, created_by, updated_by, source, sync_status,
      recurring_meeting_occurrence_id
    ) VALUES (
      meeting_record.title, meeting_record.description, event_start, event_end, false, NULL,
      true, meeting_record.auto_smart_notes, meeting_record.auto_transcription,
      meeting_record.google_calendar_id, meeting_record.created_by,
      coalesce(auth.uid(), meeting_record.created_by), 'taskflow', 'pending',
      occurrence_record.id
    ) RETURNING id INTO event_id;
    RETURN event_id;
  END IF;

  UPDATE public.calendar_events event
  SET title = meeting_record.title,
      description = meeting_record.description,
      starts_at = event_start,
      ends_at = event_end,
      google_calendar_id = meeting_record.google_calendar_id,
      auto_smart_notes = meeting_record.auto_smart_notes,
      auto_transcription = meeting_record.auto_transcription,
      create_google_meet = event.create_google_meet OR event.meeting_url IS NULL
        OR event.auto_smart_notes IS DISTINCT FROM meeting_record.auto_smart_notes
        OR event.auto_transcription IS DISTINCT FROM meeting_record.auto_transcription,
      deleted_at = NULL,
      deleted_by = NULL,
      updated_by = coalesce(auth.uid(), meeting_record.created_by),
      sync_status = 'pending'
  WHERE event.id = existing_event.id
    AND (
      event.title IS DISTINCT FROM meeting_record.title
      OR event.description IS DISTINCT FROM meeting_record.description
      OR event.starts_at IS DISTINCT FROM event_start
      OR event.ends_at IS DISTINCT FROM event_end
      OR event.google_calendar_id IS DISTINCT FROM meeting_record.google_calendar_id
      OR event.auto_smart_notes IS DISTINCT FROM meeting_record.auto_smart_notes
      OR event.auto_transcription IS DISTINCT FROM meeting_record.auto_transcription
      OR event.deleted_at IS NOT NULL
    );
  RETURN existing_event.id;
END;
$$;

CREATE OR REPLACE FUNCTION public.prepare_meeting_calendar_events(target_meeting_id uuid DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_id uuid;
  prepared_count integer := 0;
BEGIN
  IF auth.uid() IS NOT NULL AND target_meeting_id IS NULL THEN
    RAISE EXCEPTION 'Informe a reunião';
  END IF;
  FOR occurrence_id IN
    SELECT occurrence.id
    FROM public.recurring_meeting_occurrences occurrence
    JOIN public.recurring_meetings meeting ON meeting.id = occurrence.recurring_meeting_id
    WHERE (target_meeting_id IS NULL OR meeting.id = target_meeting_id)
      AND (auth.uid() IS NULL OR public.has_workspace_access(meeting.workspace_id))
      AND (occurrence.due_date >= (now() AT TIME ZONE 'America/Sao_Paulo')::date
           OR EXISTS (SELECT 1 FROM public.calendar_events event
                      WHERE event.recurring_meeting_occurrence_id = occurrence.id))
      AND (occurrence.due_date <= (now() AT TIME ZONE 'America/Sao_Paulo')::date + 30
           OR NOT meeting.is_recurring
           OR EXISTS (SELECT 1 FROM public.calendar_events event
                      WHERE event.recurring_meeting_occurrence_id = occurrence.id))
  LOOP
    PERFORM public.sync_meeting_calendar_event(occurrence_id);
    prepared_count := prepared_count + 1;
  END LOOP;
  RETURN prepared_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.sync_meeting_calendar_event_on_occurrence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.calendar_events
    SET deleted_at = coalesce(deleted_at, now()),
        deleted_by = auth.uid(),
        updated_by = coalesce(auth.uid(), updated_by, created_by),
        sync_status = 'pending'
    WHERE recurring_meeting_occurrence_id = OLD.id AND deleted_at IS NULL;
    RETURN OLD;
  END IF;
  PERFORM public.sync_meeting_calendar_event(NEW.id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_meeting_calendar_event_on_occurrence
  ON public.recurring_meeting_occurrences;
CREATE TRIGGER trg_sync_meeting_calendar_event_on_occurrence
  AFTER INSERT OR UPDATE OF due_date, due_time, status OR DELETE
  ON public.recurring_meeting_occurrences
  FOR EACH ROW EXECUTE FUNCTION public.sync_meeting_calendar_event_on_occurrence();

REVOKE ALL ON FUNCTION public.sync_meeting_calendar_event(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.sync_meeting_calendar_event_on_occurrence() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prepare_meeting_calendar_events(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.prepare_meeting_calendar_events(uuid) TO authenticated, service_role;

-- O ciclo diário materializa novas ocorrências; esta etapa cria os compromissos
-- que entraram na janela de 30 dias, com um evento/Meet distinto por data.
SELECT cron.unschedule(jobid) FROM cron.job
WHERE jobname = 'taskflow-meeting-calendar-events';
SELECT cron.schedule(
  'taskflow-meeting-calendar-events',
  '5 10 * * *',
  'SELECT public.prepare_meeting_calendar_events(NULL)'
);

NOTIFY pgrst, 'reload schema';
