-- notify_task_assignment already handles draft publication and ignores self-assignment.
SET LOCAL lock_timeout = '3s';
DROP TRIGGER IF EXISTS trg_notify_task_assignment ON public.tasks;
CREATE TRIGGER trg_notify_task_assignment
AFTER INSERT OR UPDATE OF assignee_id, is_draft ON public.tasks
FOR EACH ROW EXECUTE FUNCTION public.notify_task_assignment();

-- These RLS-protected tables are already watched by the client's shared channel.
DO $$
DECLARE
  relation text;
BEGIN
  FOREACH relation IN ARRAY ARRAY['tasks', 'task_collaborators', 'task_tag_links'] LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = relation
    ) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', relation);
    END IF;
  END LOOP;
END $$;
