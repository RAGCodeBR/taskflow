-- A conversa pode começar antes de a tarefa ser finalizada.
ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS is_draft boolean NOT NULL DEFAULT false;

-- A atribuição durante a elaboração dá acesso à conversa; o aviso de tarefa
-- atribuída só é enviado quando o criador finaliza a tarefa.
CREATE OR REPLACE FUNCTION public.notify_task_assignment()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE actor uuid := auth.uid(); assigner_name text;
BEGIN
  IF NEW.assignee_id IS NULL OR NEW.is_draft THEN RETURN NEW; END IF;
  IF TG_OP = 'UPDATE'
     AND OLD.assignee_id IS NOT DISTINCT FROM NEW.assignee_id
     AND NOT OLD.is_draft THEN RETURN NEW; END IF;
  IF NEW.assignee_id = actor THEN RETURN NEW; END IF;
  SELECT COALESCE(full_name, email) INTO assigner_name FROM public.profiles WHERE id = actor;
  INSERT INTO public.notifications (user_id, task_id, type, title, body)
  VALUES (NEW.assignee_id, NEW.id, 'assignment',
    U&'Nova tarefa atribu\00EDda a voc\00EA',
    COALESCE(assigner_name, U&'Algu\00E9m') || ' atribuiu: ' || NEW.title);
  RETURN NEW;
END; $$;
