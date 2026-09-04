# supabase/migrations/20260723120000_prevent_assignee_task_deletion.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- O responsável pode executar a tarefa, mas não cancelá-la nem excluí-la` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- quando ela foi atribuída por outra pessoa. A regra no banco também protege` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- chamadas feitas fora da interface.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.prevent_assignee_task_cancellation()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  IF OLD.deleted_at IS NOT DISTINCT FROM NEW.deleted_at THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `  IF OLD.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `     AND OLD.created_by IS DISTINCT FROM auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `     AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    RAISE EXCEPTION 'Apenas o criador ou um administrador pode cancelar esta tarefa.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `DROP TRIGGER IF EXISTS trg_prevent_assignee_task_cancellation ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 26 | `CREATE TRIGGER trg_prevent_assignee_task_cancellation` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 27 | `  BEFORE UPDATE OF deleted_at ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  FOR EACH ROW EXECUTE FUNCTION public.prevent_assignee_task_cancellation();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `CREATE OR REPLACE FUNCTION public.prevent_assignee_subtask_deletion()` | Define uma funcao no banco para reutilizar logica SQL. |
| 31 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  task_creator uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  SELECT created_by INTO task_creator FROM public.tasks WHERE id = OLD.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `  IF OLD.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `     AND task_creator IS DISTINCT FROM auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `     AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    RAISE EXCEPTION 'Apenas o criador da tarefa ou um administrador pode excluir esta subtarefa.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `  RETURN OLD;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `DROP TRIGGER IF EXISTS trg_prevent_assignee_subtask_deletion ON public.subtasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 52 | `CREATE TRIGGER trg_prevent_assignee_subtask_deletion` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 53 | `  BEFORE DELETE ON public.subtasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  FOR EACH ROW EXECUTE FUNCTION public.prevent_assignee_subtask_deletion();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
