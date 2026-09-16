-- Conversas mantêm seu histórico textual quando uma tarefa é concluída, mas os
-- arquivos compartilhados nela são temporários: seus metadados e seus objetos
-- privados no Storage são removidos na mesma transição para concluída.
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

  -- Apaga primeiro o objeto físico privado. Em seguida, remove o registro que
  -- o torna acessível pela conversa. Assim não sobra arquivo nem metadado.
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

REVOKE ALL ON FUNCTION public.delete_completed_task_conversation_attachments() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_delete_completed_task_conversation_attachments ON public.tasks;
CREATE TRIGGER trg_delete_completed_task_conversation_attachments
  AFTER UPDATE OF status, completed_at ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.delete_completed_task_conversation_attachments();

-- 50 MiB mantém o envio de documentos, imagens, planilhas e vídeos curtos
-- previsível no navegador e dentro da cota de Storage do projeto.
UPDATE storage.buckets
SET file_size_limit = 52428800
WHERE id = 'task-attachments';
