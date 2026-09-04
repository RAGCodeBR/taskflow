# supabase/migrations/20260728181000_notify_task_completion.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Notify task participants when someone completes the main task.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.notify_task_completion()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  actor uuid := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  recipient_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  was_completed boolean := OLD.status = 'done' OR OLD.completed_at IS NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  is_completed boolean := NEW.status = 'done' OR NEW.completed_at IS NOT NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  IF NOT is_completed OR was_completed THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `  SELECT COALESCE(full_name, email) INTO actor_name` | Consulta dados ou valida uma condicao no banco. |
| 20 | `  FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  WHERE id = actor;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `  FOR recipient_id IN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    SELECT DISTINCT participant.user_id` | Consulta dados ou valida uma condicao no banco. |
| 25 | `    FROM (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `      SELECT NEW.assignee_id AS user_id` | Consulta dados ou valida uma condicao no banco. |
| 27 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `      SELECT NEW.created_by AS user_id` | Consulta dados ou valida uma condicao no banco. |
| 29 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `      SELECT tc.collaborator_id AS user_id FROM public.task_collaborators tc WHERE tc.task_id = NEW.id` | Consulta dados ou valida uma condicao no banco. |
| 31 | `      UNION ALL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `      SELECT s.assignee_id AS user_id FROM public.subtasks s WHERE s.task_id = NEW.id` | Consulta dados ou valida uma condicao no banco. |
| 33 | `    ) AS participant` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    WHERE participant.user_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `      AND (actor IS NULL OR participant.user_id <> actor)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 38 | `    VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `      recipient_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `      NEW.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `      'task_completed',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `      U&'Tarefa conclu\00EDda',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `      COALESCE(actor_name, U&'Algu\00E9m') || ' concluiu a tarefa: ' || NEW.title` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `DROP TRIGGER IF EXISTS trg_notify_task_completion ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 52 | `CREATE TRIGGER trg_notify_task_completion` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 53 | `  AFTER UPDATE OF status, completed_at ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  FOR EACH ROW EXECUTE FUNCTION public.notify_task_completion();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
