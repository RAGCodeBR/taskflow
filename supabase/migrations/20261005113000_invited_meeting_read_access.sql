-- An invited team member can read a meeting while another workspace is active.
-- Mutation policies still require the meeting's workspace to be active.
CREATE OR REPLACE FUNCTION public.can_view_invited_meeting(target_meeting_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1
    FROM public.recurring_meetings meeting
    JOIN public.workspace_memberships membership
      ON membership.workspace_id = meeting.workspace_id
     AND membership.user_id = auth.uid()
    WHERE meeting.id = target_meeting_id
      AND (
        meeting.assignee_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.recurring_meeting_participants participant
          WHERE participant.recurring_meeting_id = meeting.id
            AND participant.user_id = auth.uid()
        )
      )
  );
$$;

REVOKE ALL ON FUNCTION public.can_view_invited_meeting(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_view_invited_meeting(uuid) TO authenticated, service_role;

CREATE POLICY recurring_meetings_invited_select ON public.recurring_meetings
  FOR SELECT TO authenticated
  USING (public.can_view_invited_meeting(id));

CREATE POLICY recurring_meeting_occurrences_invited_select ON public.recurring_meeting_occurrences
  FOR SELECT TO authenticated
  USING (public.can_view_invited_meeting(recurring_meeting_id));

CREATE POLICY recurring_meeting_participants_invited_select ON public.recurring_meeting_participants
  FOR SELECT TO authenticated
  USING (public.can_view_invited_meeting(recurring_meeting_id));

CREATE POLICY recurring_meeting_agenda_templates_invited_select ON public.recurring_meeting_agenda_templates
  FOR SELECT TO authenticated
  USING (public.can_view_invited_meeting(recurring_meeting_id));

CREATE POLICY recurring_meeting_agenda_items_invited_select ON public.recurring_meeting_agenda_items
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.recurring_meeting_occurrences occurrence
    WHERE occurrence.id = occurrence_id
      AND public.can_view_invited_meeting(occurrence.recurring_meeting_id)
  ));

CREATE POLICY client_notes_invited_meeting_select ON public.client_notes
  FOR SELECT TO authenticated
  USING (
    recurring_meeting_id IS NOT NULL
    AND public.can_view_invited_meeting(recurring_meeting_id)
  );

-- Preview is a SECURITY DEFINER function, so it needs the same explicit
-- invitation check as the table policies above.
CREATE OR REPLACE FUNCTION public.recurring_meeting_agenda_preview(target_occurrence_id uuid)
RETURNS TABLE (template_id uuid, title text, "position" integer)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  recurring_meeting_record public.recurring_meetings%ROWTYPE;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.recurring_meeting_occurrences
  WHERE id = target_occurrence_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL
     AND NOT public.has_workspace_access(occurrence_record.workspace_id)
     AND NOT public.can_view_invited_meeting(occurrence_record.recurring_meeting_id) THEN
    RAISE EXCEPTION 'Você não pode acessar esta reunião';
  END IF;
  SELECT * INTO recurring_meeting_record
  FROM public.recurring_meetings
  WHERE id = occurrence_record.recurring_meeting_id;

  RETURN QUERY
  SELECT template.id, template.title, (row_number() OVER (
    ORDER BY template.position, template.created_at
  ) - 1)::integer
  FROM public.recurring_meeting_agenda_templates template
  WHERE template.recurring_meeting_id = recurring_meeting_record.id
    AND public.recurring_meeting_agenda_template_applies(
      recurring_meeting_record, template, occurrence_record.due_date
    )
  ORDER BY template.position, template.created_at;
END;
$$;

NOTIFY pgrst, 'reload schema';
