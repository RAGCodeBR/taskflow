-- Recovery for the initial workspace rollout.  Consultoria is the original
-- TaskFlow environment, so every existing operational record belongs there.
-- Marketing is intentionally reset to a clean environment; no data is
-- deleted, only reassigned to its correct original workspace.

DO $$
DECLARE
  consultoria_id UUID;
BEGIN
  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';

  UPDATE public.clients SET workspace_id = consultoria_id;
  UPDATE public.kanban_columns SET workspace_id = consultoria_id;
  UPDATE public.tasks SET workspace_id = consultoria_id;
  UPDATE public.task_tags SET workspace_id = consultoria_id;
  UPDATE public.task_statuses SET workspace_id = consultoria_id;
  UPDATE public.mural_posts SET workspace_id = consultoria_id;
  UPDATE public.calendar_events SET workspace_id = consultoria_id;
  UPDATE public.service_requests SET workspace_id = consultoria_id;
  UPDATE public.board_preferences SET workspace_id = consultoria_id;
  UPDATE public.user_column_order SET workspace_id = consultoria_id;
  UPDATE public.user_task_order SET workspace_id = consultoria_id;
END $$;

-- Recreate only the base configuration necessary for an empty Marketing board.
INSERT INTO public.kanban_columns (workspace_id, name, color, position)
SELECT w.id, v.name, v.color, v.position
FROM public.workspaces w
CROSS JOIN (VALUES
  ('A Fazer', '#1e3a8a', 0),
  ('Em Andamento', '#2563eb', 1),
  ('Em Revisão', '#7c3aed', 2),
  ('Concluído', '#059669', 3)
) AS v(name, color, position)
WHERE w.slug = 'marketing';

INSERT INTO public.task_statuses (workspace_id, name, color, position, is_completed, is_active)
SELECT w.id, v.name, v.color, v.position, v.is_completed, true
FROM public.workspaces w
CROSS JOIN (VALUES
  ('A Fazer', '#1e3a8a', 0, false),
  ('Em andamento', '#2563eb', 1, false),
  ('Concluído', '#059669', 2, true)
) AS v(name, color, position, is_completed)
WHERE w.slug = 'marketing';

NOTIFY pgrst, 'reload schema';
