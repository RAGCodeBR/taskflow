-- Delete a meeting and its occurrence history, including prepared agenda and
-- import links. Tasks and client notes survive because their meeting FKs use
-- ON DELETE SET NULL. Calendar events remain as tombstones until Google sync
-- confirms remote deletion; attached Meet artifacts remain on those rows.
CREATE OR REPLACE FUNCTION public.delete_recurring_meeting(target_meeting_id uuid)
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

  IF NOT FOUND OR NOT meeting_record.meeting_mode
     OR NOT public.has_workspace_access(meeting_record.workspace_id)
     OR NOT (
       public.has_role(auth.uid(), 'admin'::public.app_role)
       OR public.has_role(auth.uid(), 'collaborator'::public.app_role)
     ) THEN
    RAISE EXCEPTION 'Você não pode excluir esta reunião.';
  END IF;

  -- Keep the local tombstone for retries if Google is unavailable. Set the
  -- acting user as updated_by so their calendar connection pushes the delete.
  UPDATE public.calendar_events event
  SET deleted_at = coalesce(event.deleted_at, now()),
      deleted_by = auth.uid(),
      updated_by = auth.uid(),
      sync_status = 'pending',
      sync_error = null
  FROM public.recurring_meeting_occurrences occurrence
  WHERE event.recurring_meeting_occurrence_id = occurrence.id
    AND occurrence.recurring_meeting_id = target_meeting_id
    AND event.deleted_at IS NULL;

  DELETE FROM public.recurring_meetings WHERE id = target_meeting_id;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_recurring_meeting(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_recurring_meeting(uuid) TO authenticated;

NOTIFY pgrst, 'reload schema';
