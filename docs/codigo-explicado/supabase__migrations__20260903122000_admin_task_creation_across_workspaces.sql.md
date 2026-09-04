# supabase/migrations/20260903122000_admin_task_creation_across_workspaces.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Lançamento de tarefa em outro ambiente, na criação, só para administradores.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- O administrador é o único que pertence aos dois ambientes e o único que alterna` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- entre eles. Na criação de uma tarefa ele passa a escolher em qual ambiente` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- lançá-la. Para todo o resto nada muda: continua valendo has_workspace_access,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- ou seja, você só escreve no ambiente em que está.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `CREATE OR REPLACE FUNCTION public.can_create_in_workspace(_workspace_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 9 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  SELECT _workspace_id IS NOT NULL` | Consulta dados ou valida uma condicao no banco. |
| 16 | `    -- Pertencer ao ambiente de destino é condição inegociável, inclusive para` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 17 | `    -- administradores: quem não é membro não cria nada lá.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 18 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `      SELECT 1 FROM public.workspace_memberships` | Consulta dados ou valida uma condicao no banco. |
| 20 | `      WHERE workspace_id = _workspace_id AND user_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `      public.has_workspace_access(_workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `      OR public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `REVOKE ALL ON FUNCTION public.can_create_in_workspace(uuid) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `GRANT EXECUTE ON FUNCTION public.can_create_in_workspace(uuid) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `DROP POLICY IF EXISTS workspace_tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 32 | `CREATE POLICY workspace_tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 33 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  WITH CHECK (public.can_create_in_workspace(workspace_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `-- tasks ganha o seu próprio gatilho de ambiente. A função compartilhada` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 37 | `-- assign_current_workspace() continua intacta nas outras 10 tabelas: afrouxá-la` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 38 | `-- ali abriria escrita entre ambientes para clientes, murais e agendas também.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 39 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 40 | `-- Coluna, status e cliente pertencem a um ambiente. Quando a tarefa é lançada no` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 41 | `-- outro, os valores que vieram da tela do ambiente de origem não existem no` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 42 | `-- destino, então são resolvidos aqui — a tela não tem como oferecer os de lá,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 43 | `-- que a RLS não deixa ela ler.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 44 | `CREATE OR REPLACE FUNCTION public.assign_task_workspace()` | Define uma funcao no banco para reutilizar logica SQL. |
| 45 | `RETURNS TRIGGER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `  resolved_column uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  resolved_status uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  resolved_client uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  -- Migrations e rotinas de servidor rodam sem JWT de usuário final.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 56 | `  IF auth.uid() IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `  IF NEW.workspace_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `    NEW.workspace_id := public.current_workspace_id();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `  IF NOT public.can_create_in_workspace(NEW.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `    RAISE EXCEPTION 'Você não pode lançar tarefas neste ambiente do TaskFlow';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `  IF NEW.column_id IS NULL OR NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `    SELECT 1 FROM public.kanban_columns` | Consulta dados ou valida uma condicao no banco. |
| 68 | `    WHERE id = NEW.column_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    SELECT id INTO resolved_column` | Consulta dados ou valida uma condicao no banco. |
| 71 | `    FROM public.kanban_columns` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `    WHERE workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `    NEW.column_id := resolved_column;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `  IF NEW.status_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `    SELECT 1 FROM public.task_statuses` | Consulta dados ou valida uma condicao no banco. |
| 80 | `    WHERE id = NEW.status_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `    SELECT id INTO resolved_status` | Consulta dados ou valida uma condicao no banco. |
| 83 | `    FROM public.task_statuses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `    WHERE workspace_id = NEW.workspace_id AND is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `    ORDER BY position` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `    NEW.status_id := resolved_status;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 90 | `  -- Os clientes já são espelhados entre os ambientes (source_client_id), então` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 91 | `  -- o cliente escolhido tem um correspondente do outro lado. Sem espelho, a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 92 | `  -- tarefa nasce sem cliente em vez de apontar para fora do ambiente.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 93 | `  IF NEW.client_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `    SELECT 1 FROM public.clients` | Consulta dados ou valida uma condicao no banco. |
| 95 | `    WHERE id = NEW.client_id AND workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `    SELECT c.id INTO resolved_client` | Consulta dados ou valida uma condicao no banco. |
| 98 | `    FROM public.clients c` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `    WHERE c.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `        c.source_client_id = NEW.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `        OR c.id = (SELECT o.source_client_id FROM public.clients o WHERE o.id = NEW.client_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `    NEW.client_id := resolved_client;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 108 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 111 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 112 | `DROP TRIGGER IF EXISTS trg_assign_workspace ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 113 | `CREATE TRIGGER trg_assign_workspace` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 114 | `  BEFORE INSERT OR UPDATE OF workspace_id ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `  FOR EACH ROW EXECUTE FUNCTION public.assign_task_workspace();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 117 | `-- Seletor de pessoas: Consultoria e Marketing não se misturam.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 118 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 119 | `-- A versão anterior lia user_roles sem nenhum filtro de ambiente, então todo` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 120 | `-- mundo via todo mundo. O padrão passa a ser o ambiente que a pessoa está` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 121 | `-- usando agora — inclusive para administradores, que só veem o outro lado` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 122 | `-- quando escolhem o outro lado explicitamente na criação da tarefa.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 123 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 124 | `-- Isso corrige de uma vez os 9 lugares que selecionam pessoa (tarefa,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 125 | `-- subtarefa, card, editor inline, obrigações, filtros, menções, dashboard e` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 126 | `-- relatório de cliente): todos chamam sem argumento.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 127 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 128 | `DROP FUNCTION IF EXISTS public.list_task_assignees();` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 129 | `DROP FUNCTION IF EXISTS public.list_task_assignees(uuid);` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 130 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 131 | `CREATE FUNCTION public.list_task_assignees(target_workspace_id uuid DEFAULT NULL)` | Define uma funcao no banco para reutilizar logica SQL. |
| 132 | `RETURNS TABLE (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 133 | `  id uuid,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 134 | `  full_name text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 135 | `  email text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 136 | `  avatar_url text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 137 | `  is_active boolean,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 138 | `  workspace_slugs text[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 139 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 140 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 141 | `-- VOLATILE de propósito: o resultado depende do ambiente ativo, e a migration` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 142 | `-- 20260831124000 já marcou current_workspace_id() assim para que uma consulta` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 143 | `-- preparada não devolva o ambiente anterior logo após a troca.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 144 | `VOLATILE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 145 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 146 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 147 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 148 | `  SELECT` | Consulta dados ou valida uma condicao no banco. |
| 149 | `    p.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 150 | `    p.full_name,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 151 | `    p.email,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 152 | `    p.avatar_url,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 153 | `    COALESCE(p.is_active, true),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 154 | `    array_agg(DISTINCT w.slug ORDER BY w.slug)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 155 | `  FROM public.profiles p` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 156 | `  -- O papel continua vindo de user_roles, como na função original. A coluna` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 157 | `  -- role da associação é uma cópia feita no backfill e pode estar defasada;` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 158 | `  -- alguém sumir do seletor por causa disso seria pior do que o vazamento que` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 159 | `  -- esta função fecha.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 160 | `  JOIN public.user_roles ur ON ur.user_id = p.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 161 | `  JOIN public.workspace_memberships m ON m.user_id = p.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 162 | `  JOIN public.workspaces w ON w.id = m.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 163 | `  WHERE COALESCE(p.is_active, true)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 164 | `    AND ur.role IN ('admin'::public.app_role, 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 165 | `    -- Sem argumento, o ambiente é o que quem chama está usando. Se não houver` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 166 | `    -- ambiente ativo, a lista degrada para todos os ambientes de quem chama em` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 167 | `    -- vez de vir vazia: tela sem nenhum nome é pior que uma lista ampla demais.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 168 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 169 | `      COALESCE(target_workspace_id, public.current_workspace_id()) IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 170 | `      OR m.workspace_id = COALESCE(target_workspace_id, public.current_workspace_id())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 171 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 172 | `    -- Você só enxerga pessoas de ambientes a que você mesmo pertence.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 173 | `    AND EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 174 | `      SELECT 1 FROM public.workspace_memberships own` | Consulta dados ou valida uma condicao no banco. |
| 175 | `      WHERE own.user_id = auth.uid() AND own.workspace_id = m.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 176 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 177 | `  GROUP BY p.id, p.full_name, p.email, p.avatar_url, p.is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 178 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 179 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 180 | `REVOKE ALL ON FUNCTION public.list_task_assignees(uuid) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 181 | `GRANT EXECUTE ON FUNCTION public.list_task_assignees(uuid) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 182 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 183 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 184 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
