# supabase/migrations/20260723130000_add_task_collaborators.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Vários colaboradores podem participar da mesma tarefa.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE TABLE IF NOT EXISTS public.task_collaborators (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 3 | `  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  collaborator_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  added_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 6 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  PRIMARY KEY (task_id, collaborator_id)` | Define identificador unico principal do registro. |
| 8 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `CREATE INDEX IF NOT EXISTS task_collaborators_collaborator_idx` | Cria indice para acelerar consultas frequentes. |
| 11 | `  ON public.task_collaborators(collaborator_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `ALTER TABLE public.task_collaborators ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 14 | `GRANT SELECT, INSERT, DELETE ON public.task_collaborators TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `GRANT ALL ON public.task_collaborators TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `-- Colaboradores também podem visualizar a tarefa e seus recursos vinculados.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 18 | `CREATE OR REPLACE FUNCTION public.can_view_task(_task_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 19 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 26 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 27 | `    FROM public.tasks t` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    WHERE t.id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `        public.has_role(auth.uid(), 'admin'::app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `        OR t.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `        OR t.created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `          SELECT 1 FROM public.task_collaborators tc` | Consulta dados ou valida uma condicao no banco. |
| 35 | `          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `          SELECT 1 FROM public.subtasks s` | Consulta dados ou valida uma condicao no banco. |
| 39 | `          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 45 | `CREATE OR REPLACE FUNCTION public.can_manage_task_collaborators(_task_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 46 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 53 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 54 | `    FROM public.tasks t` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    WHERE t.id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `        public.has_role(auth.uid(), 'admin'::app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `        OR t.created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `        OR t.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `DROP POLICY IF EXISTS task_collaborators_select ON public.task_collaborators;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 65 | `CREATE POLICY task_collaborators_select ON public.task_collaborators` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 66 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  USING (public.can_view_task(task_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `DROP POLICY IF EXISTS task_collaborators_insert ON public.task_collaborators;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 70 | `CREATE POLICY task_collaborators_insert ON public.task_collaborators` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 71 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  WITH CHECK (public.can_manage_task_collaborators(task_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `DROP POLICY IF EXISTS task_collaborators_delete ON public.task_collaborators;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 75 | `CREATE POLICY task_collaborators_delete ON public.task_collaborators` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 76 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `  USING (public.can_manage_task_collaborators(task_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `DROP POLICY IF EXISTS tasks_select ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 80 | `CREATE POLICY tasks_select ON public.tasks FOR SELECT TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 81 | `  USING (public.can_view_task(id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `DROP POLICY IF EXISTS tasks_update ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 84 | `CREATE POLICY tasks_update ON public.tasks FOR UPDATE TO authenticated` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 85 | `  USING (public.can_view_task(id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `  WITH CHECK (public.can_view_task(id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
