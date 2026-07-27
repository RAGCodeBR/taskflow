-- Self-service sign-ups must never be able to choose a privileged role from
-- user metadata. Administrators can still create/update admin and client
-- accounts through the server-side admin-user-access function, which updates
-- the role and permissions after this trigger runs.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
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

  -- A person registering through the login screen always starts as a
  -- collaborator. This is deliberately not read from user-editable metadata.
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'collaborator'::public.app_role);

  INSERT INTO public.user_permissions (user_id, permissions)
  VALUES (
    NEW.id,
    ARRAY[
      'dashboard',
      'tasks',
      'notes',
      'import_ata',
      'clients',
      'reports',
      'portal',
      'calendar',
      'trash',
      'settings'
    ]::TEXT[]
  );

  RETURN NEW;
END;
$$;
