# supabase/migrations/20260722130000_add_task_assignment_audit.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `ALTER TABLE public.tasks` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 2 | `  ADD COLUMN IF NOT EXISTS assigned_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 3 | `  ADD COLUMN IF NOT EXISTS assigned_at timestamptz;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `-- Tarefas antigas não possuem o histórico de atribuição. Usa o criador como` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- melhor informação disponível quando já existe um responsável.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `UPDATE public.tasks` | Atualiza registros existentes no banco. |
| 8 | `SET assigned_by = created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `    assigned_at = COALESCE(updated_at, created_at)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `WHERE assignee_id IS NOT NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  AND assigned_by IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `CREATE OR REPLACE FUNCTION public.track_task_assignment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 14 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  actor uuid := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  IF TG_OP = 'UPDATE' AND OLD.assignee_id IS NOT DISTINCT FROM NEW.assignee_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `  IF NEW.assignee_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    NEW.assigned_by := NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    NEW.assigned_at := NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  ELSIF actor IS NOT NULL AND NEW.assignee_id IS DISTINCT FROM actor THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `    NEW.assigned_by := actor;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    NEW.assigned_at := now();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `    NEW.assigned_by := NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    NEW.assigned_at := NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `DROP TRIGGER IF EXISTS trg_track_task_assignment ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 42 | `CREATE TRIGGER trg_track_task_assignment` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 43 | `BEFORE INSERT OR UPDATE OF assignee_id ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `FOR EACH ROW EXECUTE FUNCTION public.track_task_assignment();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
