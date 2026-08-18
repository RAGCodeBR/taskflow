-- Stores the people explicitly mentioned in a task conversation.
CREATE TABLE IF NOT EXISTS public.comment_mentions (
  comment_id uuid NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  mentioned_user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (comment_id, mentioned_user_id)
);

CREATE INDEX IF NOT EXISTS comment_mentions_user_idx
  ON public.comment_mentions (mentioned_user_id, created_at DESC);

GRANT SELECT, INSERT, DELETE ON public.comment_mentions TO authenticated;
GRANT ALL ON public.comment_mentions TO service_role;

ALTER TABLE public.comment_mentions ENABLE ROW LEVEL SECURITY;

CREATE POLICY comment_mentions_select ON public.comment_mentions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id
    )
  );

CREATE POLICY comment_mentions_insert ON public.comment_mentions
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND c.author_id = auth.uid()
    )
  );

CREATE POLICY comment_mentions_delete ON public.comment_mentions
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.comments c
      WHERE c.id = comment_id AND c.author_id = auth.uid()
    )
  );

-- Mentions invite a person into the task conversation. Suppress the normal
-- "collaborator added" notification in this specific case: the mention is the
-- useful notification and avoids two entries in the bell for one action.
CREATE OR REPLACE FUNCTION public.notify_task_collaborator_added()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor uuid := COALESCE(NEW.added_by, auth.uid());
  actor_name text;
  task_title text;
BEGIN
  IF NEW.collaborator_id = actor
     OR current_setting('app.comment_mention', true) = 'true' THEN
    RETURN NEW;
  END IF;

  SELECT COALESCE(full_name, email) INTO actor_name
  FROM public.profiles WHERE id = actor;
  SELECT title INTO task_title FROM public.tasks WHERE id = NEW.task_id;

  INSERT INTO public.notifications (user_id, task_id, type, title, body)
  VALUES (
    NEW.collaborator_id,
    NEW.task_id,
    'collaborator_assignment',
    U&'Voc\00EA foi adicionado como colaborador',
    COALESCE(actor_name, U&'Algu\00E9m') || U&' adicionou voc\00EA como colaborador em: ' || COALESCE(task_title, 'uma tarefa')
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_comment_mention()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  comment_row record;
  task_row record;
  author_name text;
BEGIN
  SELECT id, task_id, author_id, body INTO comment_row
  FROM public.comments WHERE id = NEW.comment_id;

  IF comment_row.id IS NULL OR NEW.mentioned_user_id = comment_row.author_id THEN
    RETURN NEW;
  END IF;

  SELECT id, title INTO task_row FROM public.tasks WHERE id = comment_row.task_id;
  SELECT COALESCE(full_name, email) INTO author_name
  FROM public.profiles WHERE id = comment_row.author_id;

  -- A mentioned person needs access to the task to be able to read and reply
  -- to the conversation opened from the notification bell.
  PERFORM set_config('app.comment_mention', 'true', true);
  INSERT INTO public.task_collaborators (task_id, collaborator_id, added_by)
  VALUES (task_row.id, NEW.mentioned_user_id, comment_row.author_id)
  ON CONFLICT (task_id, collaborator_id) DO NOTHING;

  -- The assignee may already have received the standard comment notification.
  -- Avoid showing two bell entries for that same message.
  IF EXISTS (
    SELECT 1 FROM public.notifications n
    WHERE n.user_id = NEW.mentioned_user_id
      AND n.task_id = task_row.id
      AND n.type = 'comment'
      AND n.created_at >= now() - interval '10 seconds'
  ) THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.notifications (user_id, task_id, type, title, body)
  VALUES (
    NEW.mentioned_user_id,
    task_row.id,
    'mention',
    U&'Voc\00EA foi mencionado em uma tarefa',
    COALESCE(author_name, U&'Algu\00E9m') || U&' mencionou voc\00EA em: ' || task_row.title
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_comment_mention ON public.comment_mentions;
CREATE TRIGGER trg_notify_comment_mention
AFTER INSERT ON public.comment_mentions
FOR EACH ROW EXECUTE FUNCTION public.notify_comment_mention();

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
EXCEPTION WHEN duplicate_object THEN
  NULL;
END;
$$;
