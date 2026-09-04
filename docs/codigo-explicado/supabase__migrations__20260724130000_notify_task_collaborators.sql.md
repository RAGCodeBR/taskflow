# supabase/migrations/20260724130000_notify_task_collaborators.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Notifica quem foi adicionado como colaborador de uma tarefa.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.notify_task_collaborator_added()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  actor uuid := COALESCE(NEW.added_by, auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  task_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  -- Não cria uma notificação quando a própria pessoa se adiciona.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `  IF NEW.collaborator_id = actor THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `  SELECT COALESCE(full_name, email) INTO actor_name` | Consulta dados ou valida uma condicao no banco. |
| 17 | `  FROM public.profiles WHERE id = actor;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  SELECT title INTO task_title FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 21 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    NEW.collaborator_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    NEW.task_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    'collaborator_assignment',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    U&'Voc\00EA foi adicionado como colaborador',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    COALESCE(actor_name, U&'Algu\00E9m') || ' adicionou você como colaborador em: ' || COALESCE(task_title, 'uma tarefa')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `DROP TRIGGER IF EXISTS trg_notify_task_collaborator_added ON public.task_collaborators;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 33 | `CREATE TRIGGER trg_notify_task_collaborator_added` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 34 | `AFTER INSERT ON public.task_collaborators` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `FOR EACH ROW EXECUTE FUNCTION public.notify_task_collaborator_added();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
