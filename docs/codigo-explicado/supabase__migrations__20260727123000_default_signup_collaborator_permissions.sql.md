# supabase/migrations/20260727123000_default_signup_collaborator_permissions.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Self-service sign-ups must never be able to choose a privileged role from` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- user metadata. Administrators can still create/update admin and client` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- accounts through the server-side admin-user-access function, which updates` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- the role and permissions after this trigger runs.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `CREATE OR REPLACE FUNCTION public.handle_new_user()` | Define uma funcao no banco para reutilizar logica SQL. |
| 6 | `RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  INSERT INTO public.profiles (id, full_name, email)` | Insere dados iniciais ou registros de apoio. |
| 9 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `    COALESCE(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `      NEW.raw_user_meta_data->>'full_name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `      NEW.raw_user_meta_data->>'name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `      split_part(NEW.email, '@', 1)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `    ),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `    NEW.email` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `  -- A person registering through the login screen always starts as a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 20 | `  -- collaborator. This is deliberately not read from user-editable metadata.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 21 | `  INSERT INTO public.user_roles (user_id, role)` | Insere dados iniciais ou registros de apoio. |
| 22 | `  VALUES (NEW.id, 'collaborator'::public.app_role);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `  INSERT INTO public.user_permissions (user_id, permissions)` | Insere dados iniciais ou registros de apoio. |
| 25 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    ARRAY[` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `      'dashboard',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `      'tasks',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `      'notes',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `      'import_ata',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `      'clients',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `      'reports',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `      'portal',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `      'calendar',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `      'trash',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `      'settings'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    ]::TEXT[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
