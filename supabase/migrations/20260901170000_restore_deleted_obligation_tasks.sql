-- A soft-deleted task remains linked to its obligation occurrence. When the
-- user asks to create it again, restore that task instead of duplicating it.
CREATE OR REPLACE FUNCTION public.create_obligation_task(target_occurrence_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  occurrence_record record;
  obligation_record public.obligations%ROWTYPE;
  selected_status_id uuid;
  selected_column_id uuid;
  new_task_id uuid;
  next_position integer;
  linked_task_deleted_at timestamptz;
BEGIN
  SELECT * INTO occurrence_record
  FROM public.obligation_occurrences
  WHERE id = target_occurrence_id
  FOR UPDATE;

  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;
  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN
    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';
  END IF;

  IF occurrence_record.task_id IS NOT NULL THEN
    SELECT deleted_at INTO linked_task_deleted_at
    FROM public.tasks
    WHERE id = occurrence_record.task_id;

    IF FOUND AND linked_task_deleted_at IS NULL THEN
      RETURN occurrence_record.task_id;
    END IF;

    IF FOUND THEN
      UPDATE public.tasks
      SET deleted_at = NULL,
          deleted_by = NULL
      WHERE id = occurrence_record.task_id;

      UPDATE public.obligation_occurrences
      SET status = 'open'
      WHERE id = occurrence_record.id;

      RETURN occurrence_record.task_id;
    END IF;
  END IF;

  IF occurrence_record.status IN ('completed', 'skipped') THEN
    RAISE EXCEPTION 'Esta ocorrência já foi encerrada';
  END IF;

  SELECT * INTO obligation_record
  FROM public.obligations
  WHERE id = occurrence_record.obligation_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;

  selected_status_id := obligation_record.status_id;
  IF selected_status_id IS NULL THEN
    SELECT id INTO selected_status_id
    FROM public.task_statuses
    WHERE workspace_id = obligation_record.workspace_id AND NOT is_completed
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  selected_column_id := obligation_record.column_id;
  IF selected_column_id IS NULL THEN
    SELECT id INTO selected_column_id
    FROM public.kanban_columns
    WHERE workspace_id = obligation_record.workspace_id
    ORDER BY position, created_at
    LIMIT 1;
  END IF;

  SELECT coalesce(max(position), -1) + 1 INTO next_position
  FROM public.tasks
  WHERE workspace_id = obligation_record.workspace_id
    AND column_id IS NOT DISTINCT FROM selected_column_id
    AND deleted_at IS NULL;

  INSERT INTO public.tasks (
    title, description, status, status_id, priority, due_date, due_time,
    assignee_id, client_id, column_id, position, created_by, workspace_id
  ) VALUES (
    obligation_record.title,
    obligation_record.description,
    'todo'::public.task_status,
    selected_status_id,
    obligation_record.priority,
    (
      occurrence_record.due_date
      + coalesce(occurrence_record.due_time, time '12:00')
    ) AT TIME ZONE 'America/Sao_Paulo',
    occurrence_record.due_time,
    obligation_record.assignee_id,
    obligation_record.client_id,
    selected_column_id,
    next_position,
    obligation_record.created_by,
    obligation_record.workspace_id
  )
  RETURNING id INTO new_task_id;

  UPDATE public.obligation_occurrences
  SET task_id = new_task_id, status = 'open'
  WHERE id = occurrence_record.id;

  RETURN new_task_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_obligation_task(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_obligation_task(uuid) TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
