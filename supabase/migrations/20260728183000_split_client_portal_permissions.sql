-- The Portal do Cliente has two independent areas. Existing users who had
-- access to the former combined Portal keep both areas after this change.
UPDATE public.user_permissions
SET permissions = array_remove(
  array_remove(array_remove(permissions, 'portal'), 'portal_entregas'),
  'portal_financeiro'
) || ARRAY[
  'portal_entregas',
  'portal_financeiro'
]::text[]
WHERE 'portal' = ANY(permissions);

-- Keep the sign-up default aligned with the access selector and sidebar.
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

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'collaborator'::public.app_role);

  INSERT INTO public.user_permissions (user_id, permissions)
  VALUES (
    NEW.id,
    ARRAY[
      'dashboard',
      'tasks',
      'import_ata',
      'clients',
      'reports',
      'mural',
      'portal_entregas',
      'portal_financeiro',
      'trash',
      'settings'
    ]::text[]
  );

  RETURN NEW;
END;
$$;
