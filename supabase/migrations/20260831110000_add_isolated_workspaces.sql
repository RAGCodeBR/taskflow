-- TaskFlow workspaces: Consultoria keeps every existing record and Marketing
-- starts empty. The active workspace lives on the profile and is validated by
-- membership before it can be changed.

CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (slug IN ('consultoria', 'marketing')),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.workspaces (slug, name)
VALUES ('consultoria', 'Consultoria'), ('marketing', 'Marketing')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

CREATE TABLE IF NOT EXISTS public.workspace_memberships (
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'collaborator'::public.app_role,
  permissions TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS active_workspace_id UUID REFERENCES public.workspaces(id);

-- Existing users and records remain in Consultoria. Admins can immediately
-- access both environments; the Users screen will manage future memberships.
INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)
SELECT w.id, r.user_id, r.role, COALESCE(p.permissions, ARRAY[]::TEXT[])
FROM public.user_roles r
CROSS JOIN public.workspaces w
LEFT JOIN public.user_permissions p ON p.user_id = r.user_id
WHERE w.slug = 'consultoria'
ON CONFLICT (workspace_id, user_id) DO NOTHING;

INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)
SELECT w.id, r.user_id, r.role,
  ARRAY['dashboard','tasks','requests','import_ata','clients','reports','mural','agenda','portal_entregas','portal_financeiro','users','trash','settings']::TEXT[]
FROM public.user_roles r
CROSS JOIN public.workspaces w
WHERE w.slug = 'marketing' AND r.role = 'admin'::public.app_role
ON CONFLICT (workspace_id, user_id) DO NOTHING;

UPDATE public.profiles p
SET active_workspace_id = w.id
FROM public.workspaces w
WHERE w.slug = 'consultoria' AND p.active_workspace_id IS NULL;

CREATE OR REPLACE FUNCTION public.current_workspace_id()
RETURNS UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT active_workspace_id FROM public.profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.has_workspace_access(_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT _workspace_id IS NOT NULL
    AND _workspace_id = public.current_workspace_id()
    AND EXISTS (
      SELECT 1 FROM public.workspace_memberships
      WHERE workspace_id = _workspace_id AND user_id = auth.uid()
    )
$$;

CREATE OR REPLACE FUNCTION public.can_change_active_workspace()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;
  IF NEW.active_workspace_id IS DISTINCT FROM OLD.active_workspace_id
     AND NOT EXISTS (
       SELECT 1 FROM public.workspace_memberships
       WHERE workspace_id = NEW.active_workspace_id AND user_id = auth.uid()
     ) THEN
    RAISE EXCEPTION 'You do not have access to this TaskFlow environment';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_active_workspace ON public.profiles;
CREATE TRIGGER trg_profiles_active_workspace
  BEFORE UPDATE OF active_workspace_id ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.can_change_active_workspace();

CREATE OR REPLACE FUNCTION public.add_profile_to_consultoria()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE consultoria_id UUID;
BEGIN
  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';
  INSERT INTO public.workspace_memberships (workspace_id, user_id, role, permissions)
  VALUES (
    consultoria_id,
    NEW.id,
    COALESCE((SELECT role FROM public.user_roles WHERE user_id = NEW.id LIMIT 1), 'collaborator'::public.app_role),
    COALESCE((SELECT permissions FROM public.user_permissions WHERE user_id = NEW.id), ARRAY[]::TEXT[])
  ) ON CONFLICT DO NOTHING;
  UPDATE public.profiles SET active_workspace_id = consultoria_id WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_default_workspace ON public.profiles;
CREATE TRIGGER trg_profiles_default_workspace
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.add_profile_to_consultoria();

ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_memberships ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.workspaces, public.workspace_memberships TO authenticated;
GRANT ALL ON public.workspaces, public.workspace_memberships TO service_role;

CREATE POLICY workspaces_select_member ON public.workspaces FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.workspace_memberships m WHERE m.workspace_id = id AND m.user_id = auth.uid()));
CREATE POLICY memberships_select_own_or_admin ON public.workspace_memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY memberships_admin_manage ON public.workspace_memberships FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Root records own their workspace. All former data is backfilled into
-- Consultoria. Child records stay protected through their parent RLS policy.
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.kanban_columns ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.task_tags ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.task_statuses ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.mural_posts ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.calendar_events ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.service_requests ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.board_preferences ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.user_column_order ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);
ALTER TABLE public.user_task_order ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id);

DO $$
DECLARE consultoria_id UUID;
BEGIN
  SELECT id INTO consultoria_id FROM public.workspaces WHERE slug = 'consultoria';
  UPDATE public.clients SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.kanban_columns SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.tasks SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.task_tags SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.task_statuses SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.mural_posts SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.calendar_events SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.service_requests SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.board_preferences SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.user_column_order SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
  UPDATE public.user_task_order SET workspace_id = consultoria_id WHERE workspace_id IS NULL;
END $$;

CREATE OR REPLACE FUNCTION public.assign_current_workspace()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Database migrations and trusted server jobs run without an end-user JWT.
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;
  IF NEW.workspace_id IS NULL THEN NEW.workspace_id := public.current_workspace_id(); END IF;
  IF NOT public.has_workspace_access(NEW.workspace_id) THEN
    RAISE EXCEPTION 'You cannot write records in this TaskFlow environment';
  END IF;
  RETURN NEW;
END;
$$;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests','board_preferences','user_column_order','user_task_order'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_assign_workspace ON public.%I', tbl);
    EXECUTE format('CREATE TRIGGER trg_assign_workspace BEFORE INSERT OR UPDATE OF workspace_id ON public.%I FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace()', tbl);
  END LOOP;
END $$;

-- Existing policies were permissive and are replaced only for the workspace
-- root tables. A policy cannot tighten another permissive policy, so remove
-- every legacy policy on these tables before creating the scoped policy.
DO $$
DECLARE p RECORD;
BEGIN
  FOR p IN SELECT tablename, policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests','board_preferences','user_column_order','user_task_order')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['clients','kanban_columns','tasks','task_tags','task_statuses','mural_posts','calendar_events','service_requests'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_access ON public.%I FOR ALL TO authenticated USING (public.has_workspace_access(workspace_id)) WITH CHECK (public.has_workspace_access(workspace_id))', tbl, tbl);
  END LOOP;
  FOREACH tbl IN ARRAY ARRAY['board_preferences','user_column_order','user_task_order'] LOOP
    EXECUTE format('CREATE POLICY workspace_%I_own ON public.%I FOR ALL TO authenticated USING (user_id = auth.uid() AND public.has_workspace_access(workspace_id)) WITH CHECK (user_id = auth.uid() AND public.has_workspace_access(workspace_id))', tbl, tbl);
  END LOOP;
END $$;

CREATE INDEX IF NOT EXISTS clients_workspace_idx ON public.clients(workspace_id);
CREATE INDEX IF NOT EXISTS tasks_workspace_idx ON public.tasks(workspace_id);
CREATE INDEX IF NOT EXISTS kanban_columns_workspace_idx ON public.kanban_columns(workspace_id);
CREATE INDEX IF NOT EXISTS mural_posts_workspace_idx ON public.mural_posts(workspace_id);

-- A usable empty Kanban configuration for Marketing.
INSERT INTO public.kanban_columns (workspace_id, name, color, position)
SELECT w.id, v.name, v.color, v.position
FROM public.workspaces w
CROSS JOIN (VALUES
  ('A Fazer', '#1e3a8a', 0),
  ('Em Andamento', '#2563eb', 1),
  ('Em Revisão', '#7c3aed', 2),
  ('Concluído', '#059669', 3)
) AS v(name, color, position)
WHERE w.slug = 'marketing'
  AND NOT EXISTS (SELECT 1 FROM public.kanban_columns c WHERE c.workspace_id = w.id);

INSERT INTO public.task_statuses (workspace_id, name, color, position, is_completed, is_active)
SELECT w.id, v.name, v.color, v.position, v.is_completed, true
FROM public.workspaces w
CROSS JOIN (VALUES
  ('A Fazer', '#1e3a8a', 0, false),
  ('Em andamento', '#2563eb', 1, false),
  ('Concluído', '#059669', 2, true)
) AS v(name, color, position, is_completed)
WHERE w.slug = 'marketing'
  AND NOT EXISTS (SELECT 1 FROM public.task_statuses s WHERE s.workspace_id = w.id);
