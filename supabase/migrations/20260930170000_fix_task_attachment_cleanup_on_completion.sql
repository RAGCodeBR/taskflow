-- O Storage bloqueia DELETE direto em storage.objects. A flag de transação é
-- a via interna usada pelo próprio Storage para permitir a remoção controlada.
-- Mantemos a remoção limitada aos anexos da tarefa que acabou de ser concluída.
CREATE OR REPLACE FUNCTION public.delete_completed_task_conversation_attachments()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, storage
AS $$
DECLARE
  was_completed boolean := OLD.status = 'done'::public.task_status OR OLD.completed_at IS NOT NULL;
  is_completed boolean := NEW.status = 'done'::public.task_status OR NEW.completed_at IS NOT NULL;
BEGIN
  IF was_completed OR NOT is_completed THEN
    RETURN NEW;
  END IF;

  -- storage.protect_delete aceita a remoção apenas dentro desta transação
  -- explicitamente autorizada. Sem isso, a conclusão inteira é recusada.
  PERFORM set_config('storage.allow_delete_query', 'true', true);

  DELETE FROM storage.objects AS object
  USING public.comment_attachments AS attachment
  WHERE attachment.task_id = NEW.id
    AND object.bucket_id = 'task-attachments'
    AND object.name = attachment.storage_path;

  DELETE FROM public.comment_attachments
  WHERE task_id = NEW.id;

  RETURN NEW;
END;
$$;
