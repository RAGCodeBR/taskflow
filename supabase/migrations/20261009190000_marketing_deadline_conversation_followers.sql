-- Prazo alterado no Marketing abre uma conversa verificável para responsáveis e
-- Igor, sem transformar o acompanhante em responsável ou colaborador da tarefa.
CREATE TABLE public.task_conversation_followers (
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
    CHECK (user_id = '76c2c067-e336-4d94-ab99-1247f7b6a0de'::uuid),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (task_id, user_id)
);

CREATE INDEX task_conversation_followers_user_idx
  ON public.task_conversation_followers (user_id, task_id);

ALTER TABLE public.task_conversation_followers ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.task_conversation_followers TO authenticated;
GRANT ALL ON public.task_conversation_followers TO service_role;
CREATE POLICY task_conversation_followers_own_select
  ON public.task_conversation_followers FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_access_task_conversation(task_id));

ALTER TABLE public.tasks
  ADD COLUMN IF NOT EXISTS deadline_conversation_active_at timestamptz;

CREATE OR REPLACE FUNCTION public.can_access_task_conversation(_task_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tasks t
    WHERE t.id = _task_id
      AND (
        t.assignee_id = auth.uid()
        OR t.created_by = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.task_collaborators tc
          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.subtasks s
          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()
        )
        OR (
          public.has_workspace_access(t.workspace_id)
          AND EXISTS (
            SELECT 1 FROM public.workspaces w
            WHERE w.id = t.workspace_id AND w.slug = 'marketing'
          )
          AND EXISTS (
            SELECT 1 FROM public.task_conversation_followers f
            WHERE f.task_id = t.id AND f.user_id = auth.uid()
          )
        )
      )
  )
$$;

REVOKE ALL ON FUNCTION public.can_access_task_conversation(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_task_conversation(uuid) TO authenticated;

-- Executa somente como trigger após uma mudança real de due_date. A gravação
-- da mensagem e o novo prazo participam da mesma transação. Atualizações
-- repetidas com o mesmo prazo, inclusive retries offline, não duplicam aviso.
CREATE OR REPLACE FUNCTION public.record_marketing_deadline_conversation()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  task_id_for_message uuid;
  task_workspace_id uuid;
  subtask_title text;
  actor uuid := auth.uid();
  actor_name text;
  event_time timestamptz := clock_timestamp();
  old_label text;
  new_label text;
  subject_label text;
  body_text text;
  igor_id constant uuid := '76c2c067-e336-4d94-ab99-1247f7b6a0de'::uuid;
BEGIN
  IF OLD.due_date IS NOT DISTINCT FROM NEW.due_date OR actor IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_TABLE_NAME = 'tasks' THEN
    task_id_for_message := NEW.id;
    task_workspace_id := NEW.workspace_id;
    subject_label := 'da tarefa';
  ELSE
    task_id_for_message := NEW.task_id;
    subtask_title := regexp_replace(coalesce(NEW.title, ''), '<[^>]*>', '', 'g');
    subject_label := format('da subtarefa "%s"', subtask_title);
    SELECT t.workspace_id INTO task_workspace_id
      FROM public.tasks t WHERE t.id = task_id_for_message;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.workspaces w
    WHERE w.id = task_workspace_id AND w.slug = 'marketing'
  ) THEN
    RETURN NEW;
  END IF;

  -- Se a conversa estava concluída, uma mudança de prazo a reabre. Uma tarefa
  -- concluída continua concluída, mas essa conversa pode ser respondida.
  IF TG_TABLE_NAME = 'tasks' THEN
    NEW.conversation_closed_at := NULL;
    NEW.deadline_conversation_active_at := event_time;
  ELSE
    UPDATE public.tasks t
      SET conversation_closed_at = NULL,
          deadline_conversation_active_at = event_time
      WHERE t.id = task_id_for_message;
  END IF;

  INSERT INTO public.task_conversation_followers (task_id, user_id)
  SELECT task_id_for_message, igor_id
  WHERE EXISTS (
    SELECT 1 FROM public.workspace_memberships m
    WHERE m.workspace_id = task_workspace_id AND m.user_id = igor_id
  )
  ON CONFLICT (task_id, user_id) DO NOTHING;

  SELECT coalesce(nullif(p.full_name, ''), p.email, 'Alguém') INTO actor_name
    FROM public.profiles p WHERE p.id = actor;
  old_label := coalesce(to_char(OLD.due_date AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY'), 'sem prazo');
  new_label := coalesce(to_char(NEW.due_date AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY'), 'sem prazo');
  body_text := format(
    'Prazo %s alterado por %s: %s → %s em %s (horário de Brasília).',
    subject_label, coalesce(actor_name, 'Alguém'), old_label, new_label,
    to_char(event_time AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY HH24:MI')
  );
  INSERT INTO public.comments (task_id, author_id, body, title, created_at)
    VALUES (task_id_for_message, actor, body_text, 'Alteração de prazo', event_time);

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.record_marketing_deadline_conversation()
  FROM PUBLIC, anon, authenticated;

CREATE TRIGGER trg_marketing_task_deadline_conversation
  BEFORE UPDATE OF due_date ON public.tasks
  FOR EACH ROW
  WHEN (OLD.due_date IS DISTINCT FROM NEW.due_date)
  EXECUTE FUNCTION public.record_marketing_deadline_conversation();

CREATE TRIGGER trg_marketing_subtask_deadline_conversation
  BEFORE UPDATE OF due_date ON public.subtasks
  FOR EACH ROW
  WHEN (OLD.due_date IS DISTINCT FROM NEW.due_date)
  EXECUTE FUNCTION public.record_marketing_deadline_conversation();

NOTIFY pgrst, 'reload schema';
