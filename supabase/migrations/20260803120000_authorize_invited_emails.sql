-- Keep an allow-list created only by the administrator-only Edge Function.
-- This makes invitation-only signup independent from the timing of GoTrue's
-- internal `invited_at` field.
CREATE TABLE IF NOT EXISTS public.access_invitations (
  email TEXT PRIMARY KEY,
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.access_invitations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.access_invitations FROM anon, authenticated;
GRANT ALL ON public.access_invitations TO service_role;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  invitation_is_valid BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.access_invitations
    WHERE email = lower(NEW.email)
      AND expires_at > now()
  ) INTO invitation_is_valid;

  IF NOT invitation_is_valid THEN
    RAISE EXCEPTION 'Cadastro público desativado. Solicite um convite ao administrador.';
  END IF;

  DELETE FROM public.access_invitations WHERE email = lower(NEW.email);

  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'collaborator'::public.app_role);
  INSERT INTO public.user_permissions (user_id, permissions) VALUES (NEW.id, ARRAY['dashboard', 'tasks']::TEXT[]);
  RETURN NEW;
END;
$$;
