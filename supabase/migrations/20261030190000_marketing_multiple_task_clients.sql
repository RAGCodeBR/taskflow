-- A Marketing task remains one record, with one team and conversation, while
-- appearing under any number of clients from the same workspace.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS additional_client_ids uuid[] NOT NULL DEFAULT '{}'::uuid[];

UPDATE public.tasks
SET additional_client_ids = ARRAY[secondary_client_id]
WHERE secondary_client_id IS NOT NULL
  AND cardinality(additional_client_ids) = 0;

CREATE INDEX IF NOT EXISTS tasks_additional_client_ids_idx
  ON public.tasks USING gin (additional_client_ids);

CREATE OR REPLACE FUNCTION public.validate_marketing_secondary_task_client()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  workspace_slug text;
  extra_client_id uuid;
  client_workspace_id uuid;
BEGIN
  -- Keep the old second-client column readable during the rollout.
  IF (TG_OP = 'INSERT' AND NEW.secondary_client_id IS NOT NULL AND cardinality(NEW.additional_client_ids) = 0)
     OR (TG_OP = 'UPDATE' AND NEW.additional_client_ids IS NOT DISTINCT FROM OLD.additional_client_ids
       AND NEW.secondary_client_id IS DISTINCT FROM OLD.secondary_client_id) THEN
    NEW.additional_client_ids := CASE WHEN NEW.secondary_client_id IS NULL
      THEN '{}'::uuid[] ELSE ARRAY[NEW.secondary_client_id] END;
  ELSE
    NEW.secondary_client_id := NEW.additional_client_ids[1];
  END IF;

  IF cardinality(NEW.additional_client_ids) = 0 THEN RETURN NEW; END IF;
  SELECT slug INTO workspace_slug FROM public.workspaces WHERE id = NEW.workspace_id;
  IF workspace_slug IS DISTINCT FROM 'marketing' THEN
    RAISE EXCEPTION 'Clientes adicionais disponíveis somente em tarefas de Marketing';
  END IF;
  IF NEW.client_id IS NULL THEN
    RAISE EXCEPTION 'Escolha um cliente principal antes de adicionar outros clientes';
  END IF;
  IF cardinality(NEW.additional_client_ids) <> (SELECT count(DISTINCT id) FROM unnest(NEW.additional_client_ids) AS id) THEN
    RAISE EXCEPTION 'Um cliente não pode ser selecionado mais de uma vez';
  END IF;
  FOREACH extra_client_id IN ARRAY NEW.additional_client_ids LOOP
    IF extra_client_id IS NULL OR extra_client_id = NEW.client_id THEN
      RAISE EXCEPTION 'Escolha clientes adicionais diferentes do principal';
    END IF;
    SELECT workspace_id INTO client_workspace_id FROM public.clients WHERE id = extra_client_id;
    IF client_workspace_id IS DISTINCT FROM NEW.workspace_id THEN
      RAISE EXCEPTION 'Todos os clientes da tarefa devem pertencer ao Marketing';
    END IF;
  END LOOP;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_marketing_secondary_task_client ON public.tasks;
CREATE TRIGGER validate_marketing_secondary_task_client
  BEFORE INSERT OR UPDATE OF additional_client_ids, secondary_client_id, client_id, workspace_id ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.validate_marketing_secondary_task_client();

-- Existing Consultoria behavior remains: assignee receives a comment alert.
-- In Marketing, each collaborator also receives one alert for the same card.
CREATE OR REPLACE FUNCTION public.notify_task_comment()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  task_record record;
  author_name text;
BEGIN
  SELECT t.id, t.title, t.assignee_id, w.slug AS workspace_slug
  INTO task_record FROM public.tasks t
  LEFT JOIN public.workspaces w ON w.id = t.workspace_id
  WHERE t.id = NEW.task_id;
  IF NOT FOUND THEN RETURN NEW; END IF;

  SELECT COALESCE(full_name, email) INTO author_name
  FROM public.profiles WHERE id = NEW.author_id;

  INSERT INTO public.notifications (user_id, task_id, type, title, body)
  SELECT recipients.user_id, task_record.id, 'comment',
    'Nova observação em sua tarefa',
    COALESCE(author_name, 'Alguém') || ' comentou em: ' || task_record.title
  FROM (
    SELECT task_record.assignee_id AS user_id
    UNION
    SELECT collaborator_id FROM public.task_collaborators
    WHERE task_id = task_record.id AND task_record.workspace_slug = 'marketing'
  ) recipients
  WHERE recipients.user_id IS NOT NULL AND recipients.user_id IS DISTINCT FROM NEW.author_id;
  RETURN NEW;
END;
$$;
