# supabase/migrations/20260903120000_cross_workspace_task_participation.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Participação de tarefas entre ambientes.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- Consultoria e Marketing continuam isolados por associação: set_marketing_user_access` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- recusa um colaborador que já pertença à Consultoria, então uma pessoa vive em um` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- ambiente só (apenas administradores pertencem aos dois). Logo, não existe caminho` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- por membership para alguém do Marketing enxergar uma tarefa da Consultoria.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `-- O único vínculo honesto é a participação, e ela já existia neste sistema: a função` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 9 | `-- can_view_task() codificava exatamente estes níveis, mas ficou órfã quando a migration` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 10 | `-- 20260831110000 removeu todas as policies de tasks para instalar a regra de workspace.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 11 | `-- Aqui ela volta, agora convivendo com o workspace em vez de substituí-lo.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `-- A tarefa NUNCA sai do ambiente dela. A participação concede visibilidade e o direito` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `-- de trabalhar na tarefa; reposicioná-la e excluí-la seguem sendo do ambiente dono.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE OR REPLACE FUNCTION public.participates_in_task(_task_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 17 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  -- has_role(admin) fica deliberadamente de fora. A can_view_task() original o` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 24 | `  -- incluía, mas ali não havia ambientes: aqui isso tornaria a Consultoria e o` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 25 | `  -- Marketing inteiros visíveis a qualquer administrador de uma só vez, que é` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 26 | `  -- precisamente o isolamento que este sistema construiu.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 27 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 28 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 29 | `    FROM public.tasks t` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `    WHERE t.id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `        t.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `        OR t.created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `          SELECT 1 FROM public.task_collaborators tc` | Consulta dados ou valida uma condicao no banco. |
| 36 | `          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `        OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `          SELECT 1 FROM public.subtasks s` | Consulta dados ou valida uma condicao no banco. |
| 40 | `          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `REVOKE ALL ON FUNCTION public.participates_in_task(uuid) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `GRANT EXECUTE ON FUNCTION public.participates_in_task(uuid) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 49 | `-- A policy única FOR ALL não serve mais: leitura passa a aceitar participação,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 50 | `-- criação e exclusão continuam exclusivas do ambiente dono.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 51 | `DROP POLICY IF EXISTS workspace_tasks_access ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `CREATE POLICY workspace_tasks_select ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 54 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  USING (public.has_workspace_access(workspace_id) OR public.participates_in_task(id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `CREATE POLICY workspace_tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 58 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `  WITH CHECK (public.has_workspace_access(workspace_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 61 | `-- O participante pode ser o detentor da tarefa principal, então precisa conseguir` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 62 | `-- concluí-la e editá-la. O que ele não pode mudar é o que ancora a tarefa no` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 63 | `-- ambiente dono — garantido pelo gatilho abaixo, não por esta policy.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 64 | `CREATE POLICY workspace_tasks_update ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 65 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `  USING (public.has_workspace_access(workspace_id) OR public.participates_in_task(id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  WITH CHECK (public.has_workspace_access(workspace_id) OR public.participates_in_task(id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `CREATE POLICY workspace_tasks_delete ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 70 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `  USING (public.has_workspace_access(workspace_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `CREATE OR REPLACE FUNCTION public.guard_cross_workspace_task_update()` | Define uma funcao no banco para reutilizar logica SQL. |
| 74 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 82 | `  -- Quem está no ambiente da tarefa mantém exatamente os direitos de sempre.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 83 | `  IF public.has_workspace_access(OLD.workspace_id) THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `  -- Daqui para baixo é um participante de outro ambiente: ele trabalha na tarefa,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 86 | `  -- mas não a reposiciona no quadro alheio nem a remove.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 87 | `  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    RAISE EXCEPTION 'Uma tarefa não muda de ambiente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  IF NEW.column_id IS DISTINCT FROM OLD.column_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode movê-la de coluna';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `  IF NEW.client_id IS DISTINCT FROM OLD.client_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode trocar o cliente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `  IF NEW.deleted_at IS DISTINCT FROM OLD.deleted_at THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode excluí-la';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 100 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `DROP TRIGGER IF EXISTS trg_guard_cross_workspace_task_update ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 105 | `CREATE TRIGGER trg_guard_cross_workspace_task_update` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 106 | `  BEFORE UPDATE ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `  FOR EACH ROW EXECUTE FUNCTION public.guard_cross_workspace_task_update();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `-- Sem isto o participante vê o card e não consegue abrir subtarefa, comentário,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 110 | `-- anexo nem histórico: todas as tabelas filhas de tasks passam por esta função.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 111 | `-- Ela concede ao participante externo os mesmos direitos sobre os registros da` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 112 | `-- tarefa que um colaborador do próprio ambiente já tem.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 113 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_task(_task_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 114 | `RETURNS BOOLEAN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 118 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 120 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 121 | `    SELECT 1 FROM public.tasks` | Consulta dados ou valida uma condicao no banco. |
| 122 | `    WHERE id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `      AND (public.has_workspace_access(workspace_id) OR public.participates_in_task(id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 124 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 127 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
