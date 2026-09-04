# supabase/migrations/20260803120000_authorize_invited_emails.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Keep an allow-list created only by the administrator-only Edge Function.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- This makes invitation-only signup independent from the timing of GoTrue's` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- internal \`invited_at\` field.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE TABLE IF NOT EXISTS public.access_invitations (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 5 | `  email TEXT PRIMARY KEY,` | Define identificador unico principal do registro. |
| 6 | `  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 7 | `  expires_at TIMESTAMPTZ NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `ALTER TABLE public.access_invitations ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 12 | `REVOKE ALL ON public.access_invitations FROM anon, authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `GRANT ALL ON public.access_invitations TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `CREATE OR REPLACE FUNCTION public.handle_new_user()` | Define uma funcao no banco para reutilizar logica SQL. |
| 16 | `RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  invitation_is_valid BOOLEAN;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 21 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 22 | `    FROM public.access_invitations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    WHERE email = lower(NEW.email)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `      AND expires_at > now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  ) INTO invitation_is_valid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `  IF NOT invitation_is_valid THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    RAISE EXCEPTION 'Cadastro público desativado. Solicite um convite ao administrador.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `  DELETE FROM public.access_invitations WHERE email = lower(NEW.email);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `  INSERT INTO public.profiles (id, full_name, email)` | Insere dados iniciais ou registros de apoio. |
| 34 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    NEW.email` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'collaborator'::public.app_role);` | Insere dados iniciais ou registros de apoio. |
| 40 | `  INSERT INTO public.user_permissions (user_id, permissions) VALUES (NEW.id, ARRAY['dashboard', 'tasks']::TEXT[]);` | Insere dados iniciais ou registros de apoio. |
| 41 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
