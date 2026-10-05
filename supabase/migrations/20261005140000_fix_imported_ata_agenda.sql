-- Corrige a colisão entre a variável status e a coluna da ocorrência.
-- Sem isso, a importação inteira falha antes de criar a ata, tarefas e pauta.
CREATE OR REPLACE FUNCTION public.attach_imported_ata_to_meeting(
  target_import_id uuid,
  target_meeting_id uuid,
  ata_title text,
  ata_text text,
  ata_html text,
  imported_tasks jsonb
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meeting_record public.recurring_meetings%ROWTYPE;
  occurrence_record public.recurring_meeting_occurrences%ROWTYPE;
  existing_import public.meeting_ata_imports%ROWTYPE;
  imported_task jsonb;
  new_task_id uuid;
  new_note_id uuid;
  task_title text;
  due_day date;
  assignee uuid;
  imported_status_id uuid;
  column_id uuid;
  tag uuid;
  imported_count integer := 0;
BEGIN
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'client'::public.app_role) THEN
    RAISE EXCEPTION 'Você não pode importar atas para reuniões';
  END IF;
  IF target_import_id IS NULL OR target_meeting_id IS NULL THEN
    RAISE EXCEPTION 'Importação inválida';
  END IF;

  SELECT * INTO meeting_record FROM public.recurring_meetings
  WHERE id = target_meeting_id FOR UPDATE;
  IF NOT FOUND OR meeting_record.client_id IS NULL
     OR NOT public.has_workspace_access(meeting_record.workspace_id) THEN
    RAISE EXCEPTION 'Reunião ou cliente não encontrado neste ambiente';
  END IF;
  IF NOT meeting_record.is_active THEN RAISE EXCEPTION 'Ative a reunião antes de importar a ata'; END IF;

  SELECT * INTO existing_import FROM public.meeting_ata_imports
  WHERE id = target_import_id;
  IF FOUND THEN
    IF existing_import.recurring_meeting_id <> target_meeting_id THEN
      RAISE EXCEPTION 'Esta importação pertence a outra reunião';
    END IF;
    RETURN existing_import.task_count;
  END IF;

  SELECT * INTO occurrence_record FROM public.recurring_meeting_occurrences AS occurrence
  WHERE occurrence.recurring_meeting_id = target_meeting_id
    AND occurrence.status NOT IN ('completed', 'skipped')
  ORDER BY occurrence.due_date, occurrence.id LIMIT 1 FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'A primeira data da reunião ainda não foi gerada'; END IF;

  IF imported_tasks IS NULL THEN imported_tasks := '[]'::jsonb; END IF;
  IF jsonb_typeof(imported_tasks) <> 'array'
     OR jsonb_array_length(imported_tasks) > 100 THEN
    RAISE EXCEPTION 'A importação aceita até 100 tarefas';
  END IF;

  IF length(trim(coalesce(ata_text, ''))) > 0
     OR length(trim(coalesce(ata_html, ''))) > 0 THEN
    INSERT INTO public.client_notes (
      client_id, title, content, content_html, created_by,
      recurring_meeting_id, recurring_meeting_occurrence_id
    ) VALUES (
      meeting_record.client_id,
      left(coalesce(nullif(trim(ata_title), ''), 'Ata de Reunião'), 240),
      coalesce(ata_text, ''), nullif(ata_html, ''), auth.uid(),
      meeting_record.id, occurrence_record.id
    ) RETURNING id INTO new_note_id;
  END IF;

  INSERT INTO public.meeting_ata_imports (
    id, recurring_meeting_id, occurrence_id, client_note_id, created_by
  ) VALUES (
    target_import_id, meeting_record.id, occurrence_record.id, new_note_id, auth.uid()
  );

  FOR imported_task IN SELECT value FROM jsonb_array_elements(imported_tasks) LOOP
    task_title := trim(coalesce(imported_task->>'title', ''));
    IF task_title = '' THEN RAISE EXCEPTION 'Tarefa importada sem título'; END IF;
    IF length(task_title) > 200 THEN RAISE EXCEPTION 'Título de tarefa muito longo'; END IF;

    due_day := coalesce(nullif(imported_task->>'due_date', '')::date,
                        occurrence_record.due_date);
    assignee := nullif(imported_task->>'assignee_id', '')::uuid;
    imported_status_id := nullif(imported_task->>'status_id', '')::uuid;
    column_id := nullif(imported_task->>'column_id', '')::uuid;
    tag := nullif(imported_task->>'tag_id', '')::uuid;

    IF assignee IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.workspace_memberships member
      WHERE member.user_id = assignee
        AND member.workspace_id = meeting_record.workspace_id
    ) THEN RAISE EXCEPTION 'Responsável não pertence a este ambiente'; END IF;
    IF imported_status_id IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.task_statuses item
      WHERE item.id = imported_status_id AND item.workspace_id = meeting_record.workspace_id
        AND NOT item.is_completed
    ) THEN RAISE EXCEPTION 'Status inválido para a reunião'; END IF;
    IF column_id IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.kanban_columns item
      WHERE item.id = column_id AND item.workspace_id = meeting_record.workspace_id
    ) THEN RAISE EXCEPTION 'Coluna inválida para a reunião'; END IF;
    IF tag IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.task_tags item
      WHERE item.id = tag AND item.workspace_id = meeting_record.workspace_id
    ) THEN RAISE EXCEPTION 'Tag inválida para a reunião'; END IF;

    INSERT INTO public.tasks (
      workspace_id, title, description, status, status_id, column_id,
      priority, due_date, assignee_id, client_id, created_by
    ) VALUES (
      meeting_record.workspace_id, task_title,
      nullif(imported_task->>'description', ''), 'todo', imported_status_id, column_id,
      coalesce(nullif(imported_task->>'priority', ''), 'medium')::public.task_priority,
      (due_day + '18:00'::time) AT TIME ZONE 'America/Sao_Paulo',
      assignee, meeting_record.client_id, auth.uid()
    ) RETURNING id INTO new_task_id;

    PERFORM public.link_existing_task_to_meeting(occurrence_record.id, new_task_id);
    IF tag IS NOT NULL THEN
      INSERT INTO public.task_tag_links(task_id, tag_id) VALUES (new_task_id, tag);
    END IF;
    imported_count := imported_count + 1;
  END LOOP;

  UPDATE public.meeting_ata_imports
  SET task_count = imported_count WHERE id = target_import_id;
  RETURN imported_count;
END;
$$;

REVOKE ALL ON FUNCTION public.attach_imported_ata_to_meeting(uuid,uuid,text,text,text,jsonb)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attach_imported_ata_to_meeting(uuid,uuid,text,text,text,jsonb)
  TO authenticated, service_role;

NOTIFY pgrst, 'reload schema';
