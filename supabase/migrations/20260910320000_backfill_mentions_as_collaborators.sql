-- Backfill: menções feitas antes do trigger add_mentioned_as_collaborator
-- (migration 20260910260000) nunca promoveram ninguém a colaborador. Depois que
-- a conversa passou a ser escopada por participação (20260910300000), essas
-- pessoas perderam acesso às conversas em que só apareciam por menção.
--
-- Aplica a MESMA regra do trigger retroativamente:
--   - ignora se já é responsável ou já é colaborador da tarefa;
--   - ignora se a pessoa não é membro do ambiente da tarefa;
--   - respeita o teto de 3 colaboradores por tarefa — quem foi mencionado
--     primeiro (created_at mais antigo) fica com a vaga.
--
-- Idempotente: rodar de novo não insere nada por causa das checagens + ON
-- CONFLICT.

DO $$
DECLARE
  r RECORD;
  v_workspace uuid;
  v_count int;
BEGIN
  FOR r IN
    SELECT firsts.task_id, firsts.mentioned_user_id, firsts.author_id
    FROM (
      SELECT DISTINCT ON (c.task_id, cm.mentioned_user_id)
             c.task_id,
             cm.mentioned_user_id,
             c.author_id,
             c.created_at
      FROM public.comment_mentions cm
      JOIN public.comments c ON c.id = cm.comment_id
      WHERE c.task_id IS NOT NULL
      ORDER BY c.task_id, cm.mentioned_user_id, c.created_at
    ) firsts
    ORDER BY firsts.task_id, firsts.created_at
  LOOP
    IF EXISTS (
      SELECT 1 FROM public.tasks t
      WHERE t.id = r.task_id AND t.assignee_id = r.mentioned_user_id
    ) THEN
      CONTINUE;
    END IF;

    IF EXISTS (
      SELECT 1 FROM public.task_collaborators tc
      WHERE tc.task_id = r.task_id AND tc.collaborator_id = r.mentioned_user_id
    ) THEN
      CONTINUE;
    END IF;

    SELECT t.workspace_id INTO v_workspace FROM public.tasks t WHERE t.id = r.task_id;
    IF NOT EXISTS (
      SELECT 1 FROM public.workspace_memberships m
      WHERE m.workspace_id = v_workspace AND m.user_id = r.mentioned_user_id
    ) THEN
      CONTINUE;
    END IF;

    SELECT count(*) INTO v_count FROM public.task_collaborators WHERE task_id = r.task_id;
    IF v_count >= 3 THEN
      CONTINUE;
    END IF;

    INSERT INTO public.task_collaborators (task_id, collaborator_id, added_by)
    VALUES (r.task_id, r.mentioned_user_id, r.author_id)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;
