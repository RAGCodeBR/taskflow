# supabase/migrations/20260728180000_notify_subtask_completion.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Notify every task participant when someone completes a subtask.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.notify_subtask_completion()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  actor uuid := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  task_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  clean_subtask_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  recipient_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  -- Only notify on the transition from open to completed.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 16 | `  IF NEW.done IS NOT TRUE OR OLD.done IS TRUE THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `  SELECT COALESCE(full_name, email) INTO actor_name` | Consulta dados ou valida uma condicao no banco. |
| 21 | `  FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  WHERE id = actor;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `  SELECT title INTO task_title` | Consulta dados ou valida uma condicao no banco. |
| 25 | `  FROM public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  WHERE id = NEW.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `  clean_subtask_title := regexp_replace(COALESCE(NEW.title, ''), '<[^>]+>', '', 'g');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `  FOR recipient_id IN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    SELECT DISTINCT participant.user_id` | Consulta dados ou valida uma condicao no banco. |
| 32 | `    FROM (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `      SELECT t.assignee_id AS user_id FROM public.tasks t WHERE t.id = NEW.task_id` | Consulta dados ou valida uma condicao no banco. |
| 34 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `      SELECT t.created_by AS user_id FROM public.tasks t WHERE t.id = NEW.task_id` | Consulta dados ou valida uma condicao no banco. |
| 36 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `      SELECT tc.collaborator_id AS user_id FROM public.task_collaborators tc WHERE tc.task_id = NEW.task_id` | Consulta dados ou valida uma condicao no banco. |
| 38 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `      SELECT s.assignee_id AS user_id FROM public.subtasks s WHERE s.task_id = NEW.task_id` | Consulta dados ou valida uma condicao no banco. |
| 40 | `    ) AS participant` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    WHERE participant.user_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `      AND (actor IS NULL OR participant.user_id <> actor)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 45 | `    VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `      recipient_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `      NEW.task_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `      'subtask_completed',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `      U&'Subtarefa conclu\00EDda',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `      COALESCE(actor_name, U&'Algu\00E9m') || ' concluiu a subtarefa "' || clean_subtask_title || '"'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `        || CASE WHEN task_title IS NOT NULL THEN ' em: ' || task_title ELSE '' END` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `DROP TRIGGER IF EXISTS trg_notify_subtask_completion ON public.subtasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 60 | `CREATE TRIGGER trg_notify_subtask_completion` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 61 | `  AFTER UPDATE OF done ON public.subtasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  FOR EACH ROW EXECUTE FUNCTION public.notify_subtask_completion();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
