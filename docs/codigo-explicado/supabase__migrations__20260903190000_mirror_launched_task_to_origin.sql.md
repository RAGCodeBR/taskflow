# supabase/migrations/20260903190000_mirror_launched_task_to_origin.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Uma tarefa lançada para o outro ambiente continua visível no ambiente de onde` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- foi lançada, para quem a lançou.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- Hoje a tarefa só sabe onde mora (workspace_id), não de onde veio. Sem essa` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- segunda informação não há como distinguir "tarefa normal do Marketing" de` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- "tarefa que o administrador lançou da Consultoria para o Marketing" — e é` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `-- exatamente essa distinção que permite espelhar uma sem vazar a outra.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `ALTER TABLE public.tasks` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 10 | `  ADD COLUMN IF NOT EXISTS origin_workspace_id uuid REFERENCES public.workspaces(id);` | Define relacionamento entre tabelas por chave estrangeira. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `-- Todo o histórico nasce com origem igual ao ambiente. Assim a regra de espelho` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `-- abaixo nunca dispara para tarefas antigas: nada muda para elas.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `UPDATE public.tasks` | Atualiza registros existentes no banco. |
| 15 | `SET origin_workspace_id = workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `WHERE origin_workspace_id IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `CREATE INDEX IF NOT EXISTS tasks_origin_workspace_idx` | Cria indice para acelerar consultas frequentes. |
| 19 | `  ON public.tasks(origin_workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  WHERE origin_workspace_id IS DISTINCT FROM workspace_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `CREATE OR REPLACE FUNCTION public.assign_task_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 23 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  resolved_column uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  resolved_status uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  resolved_client uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  -- Migrations e rotinas de servidor rodam sem JWT de usuário final.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 34 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  IF NEW.workspace_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `    NEW.workspace_id := public.current_workspace_id();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `  IF NOT public.can_create_in_workspace(NEW.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    RAISE EXCEPTION 'Você não pode lançar tarefas neste ambiente do TaskFlow';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `  -- Ambiente de onde a tarefa saiu. Sem sessão de usuário, cai no próprio` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 45 | `  -- ambiente da tarefa, para o espelho nunca disparar por acidente.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 46 | `  IF TG_OP = 'INSERT' AND NEW.origin_workspace_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    NEW.origin_workspace_id := COALESCE(public.current_workspace_id(), NEW.workspace_id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `  IF NEW.column_id IS NULL OR NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    SELECT 1 FROM public.kanban_columns` | Consulta dados ou valida uma condicao no banco. |
| 52 | `    WHERE id = NEW.column_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `    SELECT id INTO resolved_column` | Consulta dados ou valida uma condicao no banco. |
| 55 | `    FROM public.kanban_columns` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    WHERE workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `    NEW.column_id := resolved_column;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `  IF NEW.status_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `    SELECT 1 FROM public.task_statuses` | Consulta dados ou valida uma condicao no banco. |
| 64 | `    WHERE id = NEW.status_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `    SELECT id INTO resolved_status` | Consulta dados ou valida uma condicao no banco. |
| 67 | `    FROM public.task_statuses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `    WHERE workspace_id = NEW.workspace_id AND is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    ORDER BY position` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `    NEW.status_id := resolved_status;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  -- Os clientes já são espelhados entre os ambientes (source_client_id), então` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 75 | `  -- o cliente escolhido tem um correspondente do outro lado. Sem espelho, a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 76 | `  -- tarefa nasce sem cliente em vez de apontar para fora do ambiente.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 77 | `  IF NEW.client_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `    SELECT 1 FROM public.clients` | Consulta dados ou valida uma condicao no banco. |
| 79 | `    WHERE id = NEW.client_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    SELECT c.id INTO resolved_client` | Consulta dados ou valida uma condicao no banco. |
| 82 | `    FROM public.clients c` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `    WHERE c.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `        c.source_client_id = NEW.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `        OR c.id = (SELECT o.source_client_id FROM public.clients o WHERE o.id = NEW.client_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `    NEW.client_id := resolved_client;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `-- As três condições do espelho existem cada uma por um motivo:` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 97 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 98 | `--   origem <> ambiente   → só tarefas realmente lançadas para o outro lado.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 99 | `--                          Sem isso, toda tarefa comum entraria na regra.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 100 | `--   created_by = você    → só quem lançou. Sem isso, todo colaborador da` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 101 | `--                          Consultoria passaria a ver o quadro do Marketing —` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 102 | `--                          seria vazamento, não espelho.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 103 | `--   acesso à origem      → você continua precisando estar no ambiente de onde` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 104 | `--                          a lançou para vê-la ali.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 105 | `DROP POLICY IF EXISTS workspace_tasks_select ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 106 | `CREATE POLICY workspace_tasks_select ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 107 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `    public.has_workspace_access(workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `    OR public.participates_in_task(id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 111 | `    OR (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 112 | `      origin_workspace_id IS DISTINCT FROM workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `      AND created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `      AND public.has_workspace_access(origin_workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 118 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
