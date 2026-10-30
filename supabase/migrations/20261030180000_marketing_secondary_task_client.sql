-- A Marketing task may belong to two clients without duplicating its assignee,
-- collaborators, subtasks or conversation.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS secondary_client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS tasks_secondary_client_idx
  ON public.tasks (secondary_client_id)
  WHERE secondary_client_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.validate_marketing_secondary_task_client()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  workspace_slug text;
  client_workspace_id uuid;
BEGIN
  IF NEW.secondary_client_id IS NULL THEN RETURN NEW; END IF;
  SELECT slug INTO workspace_slug FROM public.workspaces WHERE id = NEW.workspace_id;
  IF workspace_slug IS DISTINCT FROM 'marketing' THEN
    RAISE EXCEPTION 'Segundo cliente disponível somente em tarefas de Marketing';
  END IF;
  IF NEW.client_id IS NULL OR NEW.client_id = NEW.secondary_client_id THEN
    RAISE EXCEPTION 'Escolha dois clientes diferentes, com um cliente principal';
  END IF;
  SELECT workspace_id INTO client_workspace_id FROM public.clients WHERE id = NEW.secondary_client_id;
  IF client_workspace_id IS DISTINCT FROM NEW.workspace_id THEN
    RAISE EXCEPTION 'O segundo cliente deve pertencer ao mesmo ambiente da tarefa';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_marketing_secondary_task_client ON public.tasks;
CREATE TRIGGER validate_marketing_secondary_task_client
  BEFORE INSERT OR UPDATE OF secondary_client_id, client_id, workspace_id ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.validate_marketing_secondary_task_client();
