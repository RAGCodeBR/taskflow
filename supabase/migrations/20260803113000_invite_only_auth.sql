-- Accounts may only originate from Supabase's admin invitation endpoint.
-- `invited_at` is populated by GoTrue for inviteUserByEmail and cannot be
-- supplied by the browser during a public sign-up request.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.invited_at IS NULL THEN
    RAISE EXCEPTION 'Cadastro público desativado. Solicite um convite ao administrador.';
  END IF;

  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email
  );

  -- The edge function replaces this temporary collaborator role and its
  -- permissions immediately after the invitation is created.
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'collaborator'::public.app_role);

  INSERT INTO public.user_permissions (user_id, permissions)
  VALUES (NEW.id, ARRAY['dashboard', 'tasks']::TEXT[]);

  RETURN NEW;
END;
$$;
