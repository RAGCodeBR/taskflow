-- Allow an explicit, guarded deletion of meetings created for testing.
-- Meetings with recorded work keep their history and can be archived instead.
CREATE OR REPLACE FUNCTION public.delete_empty_recurring_meeting(target_meeting_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meeting_record public.recurring_meetings%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'É necessário entrar na sua conta.';
  END IF;

  SELECT * INTO meeting_record
  FROM public.recurring_meetings
  WHERE id = target_meeting_id
  FOR UPDATE;

  IF NOT FOUND OR NOT public.has_workspace_access(meeting_record.workspace_id)
     OR NOT (
       public.has_role(auth.uid(), 'admin'::public.app_role)
       OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
     ) THEN
    RAISE EXCEPTION 'Você não pode excluir esta reunião.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.recurring_meeting_occurrences occurrence
    WHERE occurrence.recurring_meeting_id = target_meeting_id
      AND (occurrence.status <> 'scheduled' OR occurrence.completed_at IS NOT NULL)
  ) OR EXISTS (
    SELECT 1 FROM public.recurring_meeting_agenda_items item
    JOIN public.recurring_meeting_occurrences occurrence ON occurrence.id = item.occurrence_id
    WHERE occurrence.recurring_meeting_id = target_meeting_id
  ) OR EXISTS (
    SELECT 1 FROM public.tasks task
    JOIN public.recurring_meeting_occurrences occurrence
      ON occurrence.id = task.recurring_meeting_occurrence_id
    WHERE occurrence.recurring_meeting_id = target_meeting_id
  ) OR EXISTS (
    SELECT 1 FROM public.tasks task
    JOIN public.recurring_meeting_agenda_templates template
      ON template.id = task.recurring_meeting_agenda_template_id
    WHERE template.recurring_meeting_id = target_meeting_id
  ) OR EXISTS (
    SELECT 1 FROM public.client_notes note
    WHERE note.recurring_meeting_id = target_meeting_id
  ) OR EXISTS (
    SELECT 1 FROM public.meeting_ata_imports imported
    WHERE imported.recurring_meeting_id = target_meeting_id
  ) OR EXISTS (
    SELECT 1 FROM public.calendar_events event
    JOIN public.recurring_meeting_occurrences occurrence
      ON occurrence.id = event.recurring_meeting_occurrence_id
    WHERE occurrence.recurring_meeting_id = target_meeting_id
      AND (
        EXISTS (SELECT 1 FROM public.meeting_transcripts transcript WHERE transcript.calendar_event_id = event.id)
        OR EXISTS (SELECT 1 FROM public.meeting_minutes minutes WHERE minutes.calendar_event_id = event.id)
      )
  ) THEN
    RAISE EXCEPTION 'Esta reunião já possui registros. Arquive-a para preservar o histórico.';
  END IF;

  -- Mark events before the occurrence foreign key detaches them. Google sync
  -- will delete the remote events while retaining local retry state on error.
  UPDATE public.calendar_events event
  SET deleted_at = coalesce(event.deleted_at, now()),
      deleted_by = auth.uid(),
      updated_by = auth.uid(),
      sync_status = 'pending'
  FROM public.recurring_meeting_occurrences occurrence
  WHERE event.recurring_meeting_occurrence_id = occurrence.id
    AND occurrence.recurring_meeting_id = target_meeting_id
    AND event.deleted_at IS NULL;

  DELETE FROM public.recurring_meetings WHERE id = target_meeting_id;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_empty_recurring_meeting(uuid) FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.delete_empty_recurring_meeting(uuid) TO authenticated;

NOTIFY pgrst, 'reload schema';
