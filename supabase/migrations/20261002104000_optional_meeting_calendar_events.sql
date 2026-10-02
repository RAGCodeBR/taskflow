-- A reunião pode existir sem compromisso na Agenda. Eventos já ligados a
-- reuniões com Google Meet continuam visíveis após esta alteração.
ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS add_to_calendar boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS meeting_location text,
  ADD COLUMN IF NOT EXISTS meeting_attendee_emails text[] NOT NULL DEFAULT ARRAY[]::text[],
  ADD COLUMN IF NOT EXISTS manual_meeting_url text;

UPDATE public.recurring_meetings
SET add_to_calendar = true
WHERE create_google_meet AND NOT add_to_calendar;

ALTER TABLE public.recurring_meeting_occurrences
  ADD COLUMN IF NOT EXISTS calendar_event_disabled boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS calendar_title_override text,
  ADD COLUMN IF NOT EXISTS calendar_description_override text,
  ADD COLUMN IF NOT EXISTS calendar_location_override text,
  ADD COLUMN IF NOT EXISTS calendar_attendee_emails_override text[],
  ADD COLUMN IF NOT EXISTS calendar_duration_minutes_override integer
    CHECK (calendar_duration_minutes_override BETWEEN 15 AND 1440),
  ADD COLUMN IF NOT EXISTS calendar_google_calendar_id_override text,
  ADD COLUMN IF NOT EXISTS calendar_meeting_url_override text;

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
  event_title text;
  event_description text;
  event_location text;
  event_attendees text[];
  event_calendar_id text;
  event_manual_url text;
  previous_sync_flag text;
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

  IF NOT meeting_record.add_to_calendar OR NOT meeting_record.is_active
     OR occurrence_record.calendar_event_disabled
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

  IF occurrence_record.due_date < (now() AT TIME ZONE 'America/Sao_Paulo')::date
     AND existing_event.id IS NULL THEN RETURN NULL; END IF;

  IF meeting_record.is_recurring
     AND occurrence_record.due_date > (now() AT TIME ZONE 'America/Sao_Paulo')::date + 30
     AND existing_event.id IS NULL THEN RETURN NULL; END IF;

  event_title := coalesce(occurrence_record.calendar_title_override, meeting_record.title);
  event_description := nullif(coalesce(occurrence_record.calendar_description_override,
                                       meeting_record.description), '');
  event_location := nullif(coalesce(occurrence_record.calendar_location_override,
                                    meeting_record.meeting_location), '');
  event_attendees := coalesce(occurrence_record.calendar_attendee_emails_override,
                              meeting_record.meeting_attendee_emails);
  event_calendar_id := coalesce(occurrence_record.calendar_google_calendar_id_override,
                               meeting_record.google_calendar_id);
  event_manual_url := nullif(coalesce(occurrence_record.calendar_meeting_url_override,
                                     meeting_record.manual_meeting_url), '');
  event_start := (occurrence_record.due_date + coalesce(occurrence_record.due_time, '09:00'::time))
    AT TIME ZONE 'America/Sao_Paulo';
  event_end := event_start + make_interval(
    mins => coalesce(occurrence_record.calendar_duration_minutes_override,
                     meeting_record.duration_minutes)
  );

  previous_sync_flag := current_setting('taskflow.meeting_calendar_sync', true);
  PERFORM set_config('taskflow.meeting_calendar_sync', 'true', true);
  IF existing_event.id IS NULL THEN
    INSERT INTO public.calendar_events (
      title, description, starts_at, ends_at, is_all_day, location, attendee_emails,
      meeting_url, create_google_meet, auto_smart_notes, auto_transcription,
      google_calendar_id, created_by, updated_by, source, sync_status,
      recurring_meeting_occurrence_id
    ) VALUES (
      event_title, event_description, event_start, event_end, false,
      event_location, event_attendees,
      CASE WHEN meeting_record.create_google_meet THEN NULL ELSE event_manual_url END,
      meeting_record.create_google_meet,
      meeting_record.create_google_meet AND meeting_record.auto_smart_notes,
      meeting_record.create_google_meet AND meeting_record.auto_transcription,
      event_calendar_id, meeting_record.created_by,
      coalesce(auth.uid(), meeting_record.created_by), 'taskflow', 'pending',
      occurrence_record.id
    ) RETURNING id INTO event_id;
  ELSE
    UPDATE public.calendar_events event
    SET title = event_title,
        description = event_description,
        starts_at = event_start,
        ends_at = event_end,
        location = event_location,
        attendee_emails = event_attendees,
        google_calendar_id = event_calendar_id,
        auto_smart_notes = meeting_record.create_google_meet AND meeting_record.auto_smart_notes,
        auto_transcription = meeting_record.create_google_meet AND meeting_record.auto_transcription,
        create_google_meet = meeting_record.create_google_meet AND (
          event.meeting_url IS NULL
          OR event.meeting_url !~* '^https://meet[.]google[.]com/'
          OR event.auto_smart_notes IS DISTINCT FROM meeting_record.auto_smart_notes
          OR event.auto_transcription IS DISTINCT FROM meeting_record.auto_transcription
        ),
        meeting_url = CASE WHEN meeting_record.create_google_meet
                           THEN CASE WHEN event.meeting_url ~* '^https://meet[.]google[.]com/'
                                     THEN event.meeting_url ELSE NULL END
                           ELSE event_manual_url END,
        deleted_at = NULL,
        deleted_by = NULL,
        updated_by = coalesce(auth.uid(), meeting_record.created_by),
        sync_status = 'pending'
    WHERE event.id = existing_event.id
      AND (
        event.title IS DISTINCT FROM event_title
        OR event.description IS DISTINCT FROM event_description
        OR event.starts_at IS DISTINCT FROM event_start
        OR event.ends_at IS DISTINCT FROM event_end
        OR event.location IS DISTINCT FROM event_location
        OR event.attendee_emails IS DISTINCT FROM event_attendees
        OR event.google_calendar_id IS DISTINCT FROM event_calendar_id
        OR event.auto_smart_notes IS DISTINCT FROM
          (meeting_record.create_google_meet AND meeting_record.auto_smart_notes)
        OR event.auto_transcription IS DISTINCT FROM
          (meeting_record.create_google_meet AND meeting_record.auto_transcription)
        OR event.create_google_meet IS DISTINCT FROM
          (meeting_record.create_google_meet AND event.meeting_url IS NULL)
        OR (meeting_record.create_google_meet AND event.meeting_url IS NOT NULL
            AND event.meeting_url !~* '^https://meet[.]google[.]com/')
        OR (NOT meeting_record.create_google_meet
            AND event.meeting_url IS DISTINCT FROM event_manual_url)
        OR event.deleted_at IS NOT NULL
      );
    event_id := existing_event.id;
  END IF;
  PERFORM set_config('taskflow.meeting_calendar_sync', coalesce(previous_sync_flag, ''), true);
  RETURN event_id;
END;
$$;

-- O cadastro único recebe a nova data quando um compromisso vinculado é movido
-- diretamente na Agenda, sem recriar sua ocorrência e perder o vínculo.
CREATE OR REPLACE FUNCTION public.sync_single_meeting_occurrence()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('taskflow.calendar_event_edit', true) = 'true' THEN RETURN NEW; END IF;

  IF TG_OP = 'UPDATE' AND (
    OLD.is_recurring IS DISTINCT FROM NEW.is_recurring
    OR OLD.is_active IS DISTINCT FROM NEW.is_active
    OR (NEW.is_recurring AND OLD.start_date IS DISTINCT FROM NEW.start_date)
  ) THEN
    DELETE FROM public.recurring_meeting_occurrences
    WHERE recurring_meeting_id = NEW.id
      AND task_id IS NULL
      AND status = 'scheduled';
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

-- Alterações na série não apagam decisões tomadas para uma data específica,
-- como remarcar ou remover somente aquele compromisso da Agenda.
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

  DELETE FROM public.recurring_meeting_occurrences occurrence
  WHERE occurrence.recurring_meeting_id = target_recurring_meeting_id
    AND occurrence.task_id IS NULL
    AND occurrence.status = 'scheduled'
    AND (occurrence.due_date >= CURRENT_DATE OR NOT meeting_record.is_recurring)
    AND (
      NOT meeting_record.is_recurring
      AND occurrence.due_date <> meeting_record.start_date
      OR meeting_record.is_recurring
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
    );

  IF NOT meeting_record.is_active THEN RETURN 0; END IF;
  IF NOT meeting_record.is_recurring THEN
    INSERT INTO public.recurring_meeting_occurrences (
      workspace_id, recurring_meeting_id, due_date, due_time
    ) VALUES (
      meeting_record.workspace_id, meeting_record.id,
      meeting_record.start_date, meeting_record.due_time
    ) ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    RETURN inserted_count;
  END IF;
  RETURN public.materialize_recurring_meetings(365);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_meeting_calendar_event(
  target_event_id uuid,
  new_title text,
  new_description text,
  new_starts_at timestamptz,
  new_ends_at timestamptz,
  new_location text,
  new_attendee_emails text[],
  new_google_calendar_id text,
  new_meeting_url text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  event_record public.calendar_events%ROWTYPE;
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  meeting_record public.recurring_meetings%ROWTYPE;
  local_date date;
  local_time time;
  duration integer;
  previous_edit_flag text;
BEGIN
  SELECT * INTO event_record FROM public.calendar_events
  WHERE id = target_event_id AND deleted_at IS NULL FOR UPDATE;
  IF NOT FOUND OR event_record.recurring_meeting_occurrence_id IS NULL THEN
    RAISE EXCEPTION 'Compromisso da reunião não encontrado';
  END IF;
  SELECT * INTO occurrence_record FROM public.recurring_meeting_occurrences
  WHERE id = event_record.recurring_meeting_occurrence_id FOR UPDATE;
  SELECT * INTO meeting_record FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'client'::public.app_role)
     OR NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode editar este compromisso';
  END IF;
  IF length(trim(coalesce(new_title, ''))) = 0
     OR new_starts_at IS NULL OR new_ends_at IS NULL
     OR new_ends_at <= new_starts_at THEN
    RAISE EXCEPTION 'Título ou horário do compromisso inválido';
  END IF;
  duration := round(extract(epoch FROM new_ends_at - new_starts_at) / 60)::integer;
  IF duration < 15 OR duration > 1440 THEN
    RAISE EXCEPTION 'A duração deve estar entre 15 e 1440 minutos';
  END IF;
  local_date := (new_starts_at AT TIME ZONE 'America/Sao_Paulo')::date;
  local_time := (new_starts_at AT TIME ZONE 'America/Sao_Paulo')::time;

  IF NOT meeting_record.is_recurring THEN
    previous_edit_flag := current_setting('taskflow.calendar_event_edit', true);
    PERFORM set_config('taskflow.calendar_event_edit', 'true', true);
    UPDATE public.recurring_meetings
    SET start_date = local_date, end_date = local_date, due_time = local_time,
        duration_minutes = duration
    WHERE id = meeting_record.id;
    PERFORM set_config('taskflow.calendar_event_edit', coalesce(previous_edit_flag, ''), true);
  END IF;

  UPDATE public.recurring_meeting_occurrences
  SET due_date = local_date,
      due_time = local_time,
      rescheduled_at = CASE WHEN meeting_record.is_recurring THEN now() ELSE rescheduled_at END,
      calendar_title_override = CASE WHEN new_title IS DISTINCT FROM event_record.title
                                     THEN trim(new_title) ELSE calendar_title_override END,
      calendar_description_override = CASE
        WHEN new_description IS DISTINCT FROM event_record.description
        THEN coalesce(new_description, '') ELSE calendar_description_override END,
      calendar_location_override = CASE
        WHEN new_location IS DISTINCT FROM event_record.location
        THEN coalesce(new_location, '') ELSE calendar_location_override END,
      calendar_attendee_emails_override = CASE
        WHEN new_attendee_emails IS DISTINCT FROM event_record.attendee_emails
        THEN coalesce(new_attendee_emails, ARRAY[]::text[]) ELSE calendar_attendee_emails_override END,
      calendar_duration_minutes_override = CASE
        WHEN duration IS DISTINCT FROM round(extract(epoch FROM
             event_record.ends_at - event_record.starts_at) / 60)::integer
        THEN duration ELSE calendar_duration_minutes_override END,
      calendar_google_calendar_id_override = CASE
        WHEN new_google_calendar_id IS DISTINCT FROM event_record.google_calendar_id
        THEN new_google_calendar_id ELSE calendar_google_calendar_id_override END,
      calendar_meeting_url_override = CASE
        WHEN NOT meeting_record.create_google_meet
             AND new_meeting_url IS DISTINCT FROM event_record.meeting_url
        THEN coalesce(new_meeting_url, '') ELSE calendar_meeting_url_override END
  WHERE id = occurrence_record.id;

  UPDATE public.calendar_events
  SET title = trim(new_title),
      description = nullif(trim(coalesce(new_description, '')), ''),
      starts_at = new_starts_at,
      ends_at = new_ends_at,
      location = nullif(trim(coalesce(new_location, '')), ''),
      attendee_emails = coalesce(new_attendee_emails, ARRAY[]::text[]),
      google_calendar_id = new_google_calendar_id,
      meeting_url = CASE WHEN meeting_record.create_google_meet
                         THEN event_record.meeting_url ELSE nullif(trim(coalesce(new_meeting_url, '')), '') END,
      updated_by = auth.uid(),
      sync_status = 'pending'
  WHERE id = target_event_id;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_meeting_calendar_event(target_event_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  event_record public.calendar_events%ROWTYPE;
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
BEGIN
  SELECT * INTO event_record FROM public.calendar_events
  WHERE id = target_event_id AND deleted_at IS NULL FOR UPDATE;
  IF NOT FOUND OR event_record.recurring_meeting_occurrence_id IS NULL THEN
    RAISE EXCEPTION 'Compromisso da reunião não encontrado';
  END IF;
  SELECT * INTO occurrence_record FROM public.recurring_meeting_occurrences
  WHERE id = event_record.recurring_meeting_occurrence_id;
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'client'::public.app_role)
     OR NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode excluir este compromisso';
  END IF;
  UPDATE public.recurring_meeting_occurrences
  SET calendar_event_disabled = true
  WHERE id = occurrence_record.id;
  UPDATE public.calendar_events
  SET deleted_at = coalesce(deleted_at, now()), deleted_by = auth.uid(),
      updated_by = auth.uid(), sync_status = 'pending'
  WHERE id = target_event_id;
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.restore_meeting_calendar_event(target_occurrence_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE target_workspace_id uuid;
BEGIN
  SELECT workspace_id INTO target_workspace_id
  FROM public.recurring_meeting_occurrences WHERE id = target_occurrence_id;
  IF NOT FOUND OR auth.uid() IS NULL
     OR NOT public.has_workspace_access(target_workspace_id)
     OR public.has_role(auth.uid(), 'client'::public.app_role) THEN
    RAISE EXCEPTION 'Você não pode restaurar este compromisso';
  END IF;
  UPDATE public.recurring_meeting_occurrences
  SET calendar_event_disabled = false WHERE id = target_occurrence_id;
  PERFORM public.sync_meeting_calendar_event(target_occurrence_id);
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.update_meeting_calendar_event(uuid,text,text,timestamptz,timestamptz,text,text[],text,text)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_meeting_calendar_event(uuid,text,text,timestamptz,timestamptz,text,text[],text,text)
  TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.remove_meeting_calendar_event(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.remove_meeting_calendar_event(uuid) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.restore_meeting_calendar_event(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.restore_meeting_calendar_event(uuid) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
