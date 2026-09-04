# supabase/migrations/20260803113000_invite_only_auth.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Accounts may only originate from Supabase's admin invitation endpoint.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- \`invited_at\` is populated by GoTrue for inviteUserByEmail and cannot be` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- supplied by the browser during a public sign-up request.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.handle_new_user()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  IF NEW.invited_at IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `    RAISE EXCEPTION 'Cadastro público desativado. Solicite um convite ao administrador.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `  INSERT INTO public.profiles (id, full_name, email)` | Insere dados iniciais ou registros de apoio. |
| 12 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `    COALESCE(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `      NEW.raw_user_meta_data->>'full_name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `      NEW.raw_user_meta_data->>'name',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `      split_part(NEW.email, '@', 1)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    ),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    NEW.email` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `  -- The edge function replaces this temporary collaborator role and its` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 23 | `  -- permissions immediately after the invitation is created.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 24 | `  INSERT INTO public.user_roles (user_id, role)` | Insere dados iniciais ou registros de apoio. |
| 25 | `  VALUES (NEW.id, 'collaborator'::public.app_role);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `  INSERT INTO public.user_permissions (user_id, permissions)` | Insere dados iniciais ou registros de apoio. |
| 28 | `  VALUES (NEW.id, ARRAY['dashboard', 'tasks']::TEXT[]);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
