# supabase/migrations/20260903170000_allow_admin_to_fill_cross_workspace_task.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Quem pode lançar uma tarefa no outro ambiente precisa poder preenchê-la.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- A migration 20260903150000 tirou os membros de participates_in_task() para` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- impedir que o quadro de um ambiente despejasse as tarefas do outro. Isso` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- estava certo para LEITURA, mas derrubou a ESCRITA no meio da criação: um` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- administrador na Consultoria lançando uma tarefa no Marketing conseguia` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `-- inserir a tarefa (can_create_in_workspace) e falhava ao gravar colaborador,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `-- subtarefa, comentário ou anexo — todos passam por can_access_workspace_task(),` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 9 | `-- onde nem has_workspace_access nem participates_in_task valiam para ele.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 10 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 11 | `-- Sintoma: "new row violates row-level security policy for table` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `-- task_collaborators".` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `-- A regra que faltava: quem pode CRIAR no ambiente pode TRABALHAR na tarefa que` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 15 | `-- criou lá. can_create_in_workspace() já exige associação ao ambiente de` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 16 | `-- destino, então isso não abre nada para quem é de fora.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 17 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 18 | `-- A política de SELECT de tasks continua intocada de propósito: incluir` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 19 | `-- can_create_in_workspace ali traria de volta as tarefas de um ambiente no` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 20 | `-- quadro do outro, que é exatamente o que a 150000 resolveu.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_task(_task_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 23 | `RETURNS BOOLEAN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 30 | `    SELECT 1 FROM public.tasks` | Consulta dados ou valida uma condicao no banco. |
| 31 | `    WHERE id = _task_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `        public.has_workspace_access(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `        -- Administrador associado ao ambiente de destino, preenchendo a tarefa` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 35 | `        -- que acabou de lançar lá sem precisar trocar de ambiente.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 36 | `        OR public.can_create_in_workspace(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `        -- Pessoa de outro ambiente marcada na tarefa.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 38 | `        OR public.participates_in_task(id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `-- O mesmo vale para salvar a própria tarefa logo após criá-la.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 44 | `DROP POLICY IF EXISTS workspace_tasks_update ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 45 | `CREATE POLICY workspace_tasks_update ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 46 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    public.has_workspace_access(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `    OR public.can_create_in_workspace(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    OR public.participates_in_task(id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `    public.has_workspace_access(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `    OR public.can_create_in_workspace(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    OR public.participates_in_task(id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `DROP POLICY IF EXISTS workspace_tasks_delete ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 59 | `CREATE POLICY workspace_tasks_delete ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 60 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    public.has_workspace_access(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `    OR public.can_create_in_workspace(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `-- O gatilho que protege coluna, cliente e exclusão passa a mirar somente quem é` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 67 | `-- realmente de fora. Um administrador associado ao ambiente da tarefa pode` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 68 | `-- trocar de ambiente e fazer a mesma coisa — bloqueá-lo aqui era só atrito.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 69 | `CREATE OR REPLACE FUNCTION public.guard_cross_workspace_task_update()` | Define uma funcao no banco para reutilizar logica SQL. |
| 70 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `  IF public.has_workspace_access(OLD.workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `     OR public.can_create_in_workspace(OLD.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `  -- Daqui para baixo é quem entrou só por participação: trabalha na tarefa, mas` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 84 | `  -- não a reposiciona no quadro alheio nem a remove.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 85 | `  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `    RAISE EXCEPTION 'Uma tarefa não muda de ambiente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  IF NEW.column_id IS DISTINCT FROM OLD.column_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode movê-la de coluna';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `  IF NEW.client_id IS DISTINCT FROM OLD.client_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode trocar o cliente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `  IF NEW.deleted_at IS DISTINCT FROM OLD.deleted_at THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `    RAISE EXCEPTION 'Somente o ambiente dono da tarefa pode excluí-la';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 102 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
