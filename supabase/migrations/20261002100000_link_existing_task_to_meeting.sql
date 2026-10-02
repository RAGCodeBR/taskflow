-- Transforma uma tarefa existente em item da pauta sem duplicar a tarefa.
-- A criação do item e o vínculo acontecem na mesma transação.
CREATE OR REPLACE FUNCTION public.link_existing_task_to_meeting(
  target_occurrence_id uuid,
  target_task_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meeting_record record;
  task_record public.tasks%ROWTYPE;
  new_item_id uuid;
  next_position integer;
BEGIN
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'client'::public.app_role) THEN
    RAISE EXCEPTION 'Você não pode vincular tarefas a reuniões';
  END IF;

  SELECT occurrence.id, occurrence.workspace_id, occurrence.status, meeting.client_id
    INTO meeting_record
  FROM public.recurring_meeting_occurrences occurrence
  JOIN public.recurring_meetings meeting ON meeting.id = occurrence.recurring_meeting_id
  WHERE occurrence.id = target_occurrence_id
  FOR UPDATE OF occurrence;

  IF NOT FOUND THEN RAISE EXCEPTION 'Reunião não encontrada'; END IF;
  IF NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode alterar esta reunião';
  END IF;
  IF meeting_record.status IN ('completed', 'skipped') THEN
    RAISE EXCEPTION 'Esta reunião já foi encerrada';
  END IF;

  SELECT * INTO task_record
  FROM public.tasks
  WHERE id = target_task_id
  FOR UPDATE;

  IF NOT FOUND OR NOT public.can_view_task(target_task_id) THEN
    RAISE EXCEPTION 'Tarefa não encontrada';
  END IF;
  IF task_record.workspace_id IS DISTINCT FROM meeting_record.workspace_id
     OR task_record.client_id IS DISTINCT FROM meeting_record.client_id THEN
    RAISE EXCEPTION 'A tarefa precisa pertencer ao mesmo cliente e ambiente da reunião';
  END IF;
  IF task_record.deleted_at IS NOT NULL OR task_record.archived_at IS NOT NULL THEN
    RAISE EXCEPTION 'A tarefa excluída ou arquivada não pode ser vinculada';
  END IF;
  IF task_record.recurring_meeting_agenda_item_id IS NOT NULL
     OR task_record.recurring_meeting_occurrence_id IS NOT NULL
     OR task_record.recurring_meeting_agenda_template_id IS NOT NULL THEN
    RAISE EXCEPTION 'Esta tarefa já está vinculada a uma reunião';
  END IF;

  PERFORM public.prepare_recurring_meeting_agenda(target_occurrence_id);

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.recurring_meeting_agenda_items
  WHERE occurrence_id = target_occurrence_id;

  INSERT INTO public.recurring_meeting_agenda_items (occurrence_id, title, position)
  VALUES (target_occurrence_id, task_record.title, next_position)
  RETURNING id INTO new_item_id;

  UPDATE public.tasks
  SET recurring_meeting_agenda_item_id = new_item_id
  WHERE id = target_task_id;

  RETURN new_item_id;
END;
$$;

REVOKE ALL ON FUNCTION public.link_existing_task_to_meeting(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.link_existing_task_to_meeting(uuid, uuid) TO authenticated, service_role;
