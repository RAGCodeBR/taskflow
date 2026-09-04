# supabase/migrations/20260724140000_fix_comment_notification_author.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Comments are authored through author_id, not created_by.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.notify_task_comment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  t record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  author_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  SELECT id, title, assignee_id INTO t FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 13 | `  IF t.assignee_id IS NULL OR t.assignee_id = NEW.author_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `  SELECT COALESCE(full_name, email) INTO author_name` | Consulta dados ou valida uma condicao no banco. |
| 18 | `  FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  WHERE id = NEW.author_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 22 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    t.assignee_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    t.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    'comment',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    'Nova observação em sua tarefa',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    COALESCE(author_name, 'Alguém') || ' comentou em: ' || t.title` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `DROP TRIGGER IF EXISTS trg_notify_task_comment ON public.comments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 35 | `CREATE TRIGGER trg_notify_task_comment` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 36 | `AFTER INSERT ON public.comments` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `FOR EACH ROW EXECUTE FUNCTION public.notify_task_comment();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
