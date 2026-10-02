-- A mesma estrutura atende reuniões únicas e recorrentes. Registros existentes
-- continuam recorrentes; novas reuniões podem optar por uma única ocorrência.
ALTER TABLE public.recurring_meetings
  ADD COLUMN IF NOT EXISTS is_recurring boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.recurring_meetings.is_recurring IS
  'Quando false, a reunião possui uma única ocorrência na start_date.';

-- O agendamento normal começa em CURRENT_DATE. Reuniões únicas podem ser
-- cadastradas em qualquer data, inclusive passada, e precisam de uma ocorrência.
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
  SELECT * INTO meeting_record
  FROM public.recurring_meetings
  WHERE id = target_recurring_meeting_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode atualizar esta reunião';
  END IF;

  -- Reuniões já concluídas ou com tarefa vinculada são preservadas.
  DELETE FROM public.recurring_meeting_occurrences
  WHERE recurring_meeting_id = target_recurring_meeting_id
    AND task_id IS NULL
    AND status = 'scheduled'
    AND (due_date >= CURRENT_DATE OR NOT meeting_record.is_recurring);

  IF NOT meeting_record.is_active THEN RETURN 0; END IF;

  IF NOT meeting_record.is_recurring THEN
    INSERT INTO public.recurring_meeting_occurrences (
      workspace_id, recurring_meeting_id, due_date, due_time
    ) VALUES (
      meeting_record.workspace_id, meeting_record.id,
      meeting_record.start_date, meeting_record.due_time
    )
    ON CONFLICT (recurring_meeting_id, due_date) DO NOTHING;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    RETURN inserted_count;
  END IF;

  RETURN public.materialize_recurring_meetings(365);
END;
$$;
