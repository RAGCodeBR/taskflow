-- Formatos continuam usando task_tags para preservar as classificações existentes.
-- Objetivos são uma segunda classificação exclusiva do Marketing.
CREATE TABLE IF NOT EXISTS public.task_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6366f1',
  position integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, name)
);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS objective_id uuid REFERENCES public.task_objectives(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS tasks_objective_id_idx ON public.tasks(objective_id);
ALTER TABLE public.task_objectives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS task_objectives_workspace_access ON public.task_objectives;
CREATE POLICY task_objectives_workspace_access ON public.task_objectives
  FOR ALL TO authenticated
  USING (public.has_workspace_access(workspace_id))
  WITH CHECK (public.has_workspace_access(workspace_id));
