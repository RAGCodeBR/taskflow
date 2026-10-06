-- Reuniões cadastradas não podem ser excluídas por usuários da aplicação.
-- As ocorrências concluídas permanecem disponíveis no histórico.
REVOKE DELETE ON public.recurring_meetings FROM authenticated;
REVOKE DELETE ON public.recurring_meeting_occurrences FROM authenticated;

-- Pausar ou reativar uma reunião única não deve apagar sua ocorrência,
-- seus itens de pauta, sua ata ou o vínculo com o compromisso da Agenda.
CREATE OR REPLACE FUNCTION public.sync_single_meeting_occurrence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('taskflow.calendar_event_edit', true) = 'true' THEN RETURN NEW; END IF;

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

CREATE OR REPLACE FUNCTION public.refresh_recurring_meeting(target_recurring_meeting_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meeting_record public.recurring_meetings%ROWTYPE;
  inserted_count integer := 0;
BEGIN
  SELECT * INTO meeting_record FROM public.recurring_meetings
  WHERE id = target_recurring_meeting_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode atualizar esta reunião';
  END IF;

  IF NOT meeting_record.is_recurring THEN
    IF NOT meeting_record.is_active THEN RETURN 0; END IF;
    UPDATE public.recurring_meeting_occurrences
    SET due_date = meeting_record.start_date, due_time = meeting_record.due_time
    WHERE recurring_meeting_id = meeting_record.id
      AND task_id IS NULL AND status = 'scheduled'
      AND (due_date IS DISTINCT FROM meeting_record.start_date
           OR due_time IS DISTINCT FROM meeting_record.due_time);
    INSERT INTO public.recurring_meeting_occurrences (
      workspace_id, recurring_meeting_id, due_date, due_time
    ) VALUES (
      meeting_record.workspace_id, meeting_record.id,
      meeting_record.start_date, meeting_record.due_time
    ) ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    RETURN inserted_count;
  END IF;

  DELETE FROM public.recurring_meeting_occurrences occurrence
  WHERE occurrence.recurring_meeting_id = target_recurring_meeting_id
    AND occurrence.task_id IS NULL
    AND occurrence.status = 'scheduled'
    AND occurrence.due_date >= CURRENT_DATE
    AND occurrence.rescheduled_at IS NULL
    AND occurrence.agenda_prepared_at IS NULL
    AND NOT occurrence.calendar_event_disabled
    AND occurrence.calendar_title_override IS NULL
    AND occurrence.calendar_description_override IS NULL
    AND occurrence.calendar_location_override IS NULL
    AND occurrence.calendar_attendee_emails_override IS NULL
    AND occurrence.calendar_duration_minutes_override IS NULL
    AND occurrence.calendar_google_calendar_id_override IS NULL
    AND occurrence.calendar_meeting_url_override IS NULL
    AND NOT EXISTS (
      SELECT 1 FROM public.calendar_events event
      WHERE event.recurring_meeting_occurrence_id = occurrence.id
    );

  IF NOT meeting_record.is_active THEN RETURN 0; END IF;
  RETURN public.materialize_recurring_meetings(365);
END;
$$;
