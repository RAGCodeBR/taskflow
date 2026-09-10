-- Mencionar alguém na conversa de uma tarefa adiciona a pessoa como colaboradora
-- — ela passa a ver a tarefa (RLS por participação), entra na conversa e recebe
-- os avisos. Igual mencionar num chat.
--
-- Limite: no máximo 3 colaboradores por menção (responsável + 3 = 4 pessoas na
-- demanda). Passando disso, a menção ainda notifica, mas não adiciona.
--
-- Só adiciona quem pertence ao mesmo ambiente da tarefa — uma menção a alguém
-- de outro ambiente notifica mas não concede acesso cruzado.

CREATE OR REPLACE FUNCTION public.add_mentioned_as_collaborator()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_task_id uuid;
  v_author uuid;
  v_workspace uuid;
  v_count int;
BEGIN
  SELECT c.task_id, c.author_id INTO v_task_id, v_author
  FROM public.comments c
  WHERE c.id = NEW.comment_id;
  IF v_task_id IS NULL THEN RETURN NEW; END IF;

  -- Já é o responsável da tarefa.
  IF EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id = v_task_id AND t.assignee_id = NEW.mentioned_user_id
  ) THEN
    RETURN NEW;
  END IF;

  -- Já é colaborador.
  IF EXISTS (
    SELECT 1 FROM public.task_collaborators tc
    WHERE tc.task_id = v_task_id AND tc.collaborator_id = NEW.mentioned_user_id
  ) THEN
    RETURN NEW;
  END IF;

  -- A pessoa precisa pertencer ao ambiente da tarefa.
  SELECT t.workspace_id INTO v_workspace FROM public.tasks t WHERE t.id = v_task_id;
  IF NOT EXISTS (
    SELECT 1 FROM public.workspace_memberships m
    WHERE m.workspace_id = v_workspace AND m.user_id = NEW.mentioned_user_id
  ) THEN
    RETURN NEW;
  END IF;

  -- Teto de 3 colaboradores.
  SELECT count(*) INTO v_count FROM public.task_collaborators WHERE task_id = v_task_id;
  IF v_count >= 3 THEN RETURN NEW; END IF;

  INSERT INTO public.task_collaborators (task_id, collaborator_id, added_by)
  VALUES (v_task_id, NEW.mentioned_user_id, v_author)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_add_mentioned_as_collaborator ON public.comment_mentions;
CREATE TRIGGER trg_add_mentioned_as_collaborator
  AFTER INSERT ON public.comment_mentions
  FOR EACH ROW
  EXECUTE FUNCTION public.add_mentioned_as_collaborator();
