# supabase/migrations/20260901170000_restore_deleted_obligation_tasks.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- A soft-deleted task remains linked to its obligation occurrence. When the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- user asks to create it again, restore that task instead of duplicating it.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE OR REPLACE FUNCTION public.create_obligation_task(target_occurrence_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 4 | `RETURNS uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  occurrence_record record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  obligation_record public.obligations%ROWTYPE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  selected_status_id uuid;` | Consulta dados ou valida uma condicao no banco. |
| 13 | `  selected_column_id uuid;` | Consulta dados ou valida uma condicao no banco. |
| 14 | `  new_task_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  next_position integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  linked_task_deleted_at timestamptz;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  SELECT * INTO occurrence_record` | Consulta dados ou valida uma condicao no banco. |
| 19 | `  FROM public.obligation_occurrences` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  WHERE id = target_occurrence_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  FOR UPDATE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `  IF occurrence_record.task_id IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    SELECT deleted_at INTO linked_task_deleted_at` | Consulta dados ou valida uma condicao no banco. |
| 30 | `    FROM public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    WHERE id = occurrence_record.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `    IF FOUND AND linked_task_deleted_at IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `      RETURN occurrence_record.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `    IF FOUND THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `      UPDATE public.tasks` | Atualiza registros existentes no banco. |
| 39 | `      SET deleted_at = NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `          deleted_by = NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `      WHERE id = occurrence_record.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `      UPDATE public.obligation_occurrences` | Atualiza registros existentes no banco. |
| 44 | `      SET status = 'open'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `      WHERE id = occurrence_record.id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `      RETURN occurrence_record.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `  IF occurrence_record.status IN ('completed', 'skipped') THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    RAISE EXCEPTION 'Esta ocorrência já foi encerrada';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `  SELECT * INTO obligation_record` | Consulta dados ou valida uma condicao no banco. |
| 56 | `  FROM public.obligations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  WHERE id = occurrence_record.obligation_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  IF NOT FOUND THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `  selected_status_id := obligation_record.status_id;` | Consulta dados ou valida uma condicao no banco. |
| 61 | `  IF selected_status_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `    SELECT id INTO selected_status_id` | Consulta dados ou valida uma condicao no banco. |
| 63 | `    FROM public.task_statuses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `    WHERE workspace_id = obligation_record.workspace_id AND NOT is_completed` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `  selected_column_id := obligation_record.column_id;` | Consulta dados ou valida uma condicao no banco. |
| 70 | `  IF selected_column_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `    SELECT id INTO selected_column_id` | Consulta dados ou valida uma condicao no banco. |
| 72 | `    FROM public.kanban_columns` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    WHERE workspace_id = obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `  SELECT coalesce(max(position), -1) + 1 INTO next_position` | Consulta dados ou valida uma condicao no banco. |
| 79 | `  FROM public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  WHERE workspace_id = obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `    AND column_id IS NOT DISTINCT FROM selected_column_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `    AND deleted_at IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 84 | `  INSERT INTO public.tasks (` | Insere dados iniciais ou registros de apoio. |
| 85 | `    title, description, status, status_id, priority, due_date, due_time,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `    assignee_id, client_id, column_id, position, created_by, workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  ) VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    obligation_record.title,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `    obligation_record.description,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `    'todo'::public.task_status,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `    selected_status_id,` | Consulta dados ou valida uma condicao no banco. |
| 92 | `    obligation_record.priority,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `    (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `      occurrence_record.due_date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `      + coalesce(occurrence_record.due_time, time '12:00')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `    ) AT TIME ZONE 'America/Sao_Paulo',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `    occurrence_record.due_time,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `    obligation_record.assignee_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `    obligation_record.client_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `    selected_column_id,` | Consulta dados ou valida uma condicao no banco. |
| 101 | `    next_position,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `    obligation_record.created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `    obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `  RETURNING id INTO new_task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `  UPDATE public.obligation_occurrences` | Atualiza registros existentes no banco. |
| 108 | `  SET task_id = new_task_id, status = 'open'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `  WHERE id = occurrence_record.id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `  RETURN new_task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 112 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `REVOKE ALL ON FUNCTION public.create_obligation_task(uuid) FROM PUBLIC, anon;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `GRANT EXECUTE ON FUNCTION public.create_obligation_task(uuid) TO authenticated, service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 118 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
