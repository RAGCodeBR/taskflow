# supabase/migrations/20260827233000_notify_service_request_members.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Notifica individualmente quem foi incluído em uma solicitação.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- A mesma tabela de notificações já alimenta a bolinha vermelha da navegação.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE OR REPLACE FUNCTION public.notify_service_request_member()` | Define uma funcao no banco para reutilizar logica SQL. |
| 4 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  request_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  request_creator uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  role_label text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  SELECT title, created_by` | Consulta dados ou valida uma condicao no banco. |
| 16 | `    INTO request_title, request_creator` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    FROM public.service_requests` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `   WHERE id = NEW.request_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `  -- Não gera pendência para a própria pessoa que criou/adicionou a si mesma.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 21 | `  IF NEW.user_id = auth.uid() OR NEW.user_id = request_creator THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `  SELECT COALESCE(full_name, email)` | Consulta dados ou valida uma condicao no banco. |
| 26 | `    INTO actor_name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `   WHERE id = auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `  role_label := CASE TG_TABLE_NAME` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    WHEN 'service_request_assignees' THEN 'como responsável'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    ELSE 'como participante'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 36 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    NEW.user_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `    'service_request',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `    'Nova solicitação para você',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    COALESCE(actor_name, 'Alguém') || ' adicionou você ' || role_label || ': ' || COALESCE(request_title, 'Solicitação')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `DROP TRIGGER IF EXISTS trg_notify_service_request_participant ON public.service_request_participants;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 49 | `CREATE TRIGGER trg_notify_service_request_participant` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 50 | `AFTER INSERT ON public.service_request_participants` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `FOR EACH ROW EXECUTE FUNCTION public.notify_service_request_member();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `DROP TRIGGER IF EXISTS trg_notify_service_request_assignee ON public.service_request_assignees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 54 | `CREATE TRIGGER trg_notify_service_request_assignee` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 55 | `AFTER INSERT ON public.service_request_assignees` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `FOR EACH ROW EXECUTE FUNCTION public.notify_service_request_member();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
