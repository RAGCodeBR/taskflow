# supabase/migrations/20260728183000_split_client_portal_permissions.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- The Portal do Cliente has two independent areas. Existing users who had` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- access to the former combined Portal keep both areas after this change.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `UPDATE public.user_permissions` | Atualiza registros existentes no banco. |
| 4 | `SET permissions = array_remove(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `  array_remove(array_remove(permissions, 'portal'), 'portal_entregas'),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  'portal_financeiro'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `) || ARRAY[` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  'portal_entregas',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  'portal_financeiro'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `]::text[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `WHERE 'portal' = ANY(permissions);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `-- Keep the sign-up default aligned with the access selector and sidebar.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `CREATE OR REPLACE FUNCTION public.handle_new_user()` | Define uma funcao no banco para reutilizar logica SQL. |
| 15 | `RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  INSERT INTO public.profiles (id, full_name, email)` | Insere dados iniciais ou registros de apoio. |
| 18 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    COALESCE(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `      NEW.raw_user_meta_data->>'full_name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `      NEW.raw_user_meta_data->>'name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `      split_part(NEW.email, '@', 1)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    ),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    NEW.email` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `  INSERT INTO public.user_roles (user_id, role)` | Insere dados iniciais ou registros de apoio. |
| 29 | `  VALUES (NEW.id, 'collaborator'::public.app_role);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `  INSERT INTO public.user_permissions (user_id, permissions)` | Insere dados iniciais ou registros de apoio. |
| 32 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    ARRAY[` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `      'dashboard',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `      'tasks',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `      'import_ata',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `      'clients',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `      'reports',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `      'mural',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `      'portal_entregas',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `      'portal_financeiro',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `      'trash',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `      'settings'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    ]::text[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
