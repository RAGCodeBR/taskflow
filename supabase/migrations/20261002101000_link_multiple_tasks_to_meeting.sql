-- Vincula várias tarefas na ordem escolhida; um erro desfaz o lote inteiro.
CREATE OR REPLACE FUNCTION public.link_existing_tasks_to_meeting(
  target_occurrence_id uuid,
  target_task_ids uuid[]
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  task_id uuid;
  linked_ids uuid[] := ARRAY[]::uuid[];
BEGIN
  IF target_task_ids IS NULL OR cardinality(target_task_ids) = 0 THEN RETURN 0; END IF;
  FOREACH task_id IN ARRAY target_task_ids LOOP
    IF task_id IS NULL OR task_id = ANY(linked_ids) THEN
      RAISE EXCEPTION 'A lista contém uma tarefa inválida ou repetida';
    END IF;
    PERFORM public.link_existing_task_to_meeting(target_occurrence_id, task_id);
    linked_ids := array_append(linked_ids, task_id);
  END LOOP;

  RETURN cardinality(linked_ids);
END;
$$;

REVOKE ALL ON FUNCTION public.link_existing_tasks_to_meeting(uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.link_existing_tasks_to_meeting(uuid, uuid[]) TO authenticated, service_role;
