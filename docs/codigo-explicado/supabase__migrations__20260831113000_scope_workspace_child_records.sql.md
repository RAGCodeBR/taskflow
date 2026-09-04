# supabase/migrations/20260831113000_scope_workspace_child_records.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Child rows inherit the workspace of their parent record. This closes the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- direct-query paths used by reports, dialogs and attachments.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_task(_task_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  SELECT EXISTS (SELECT 1 FROM public.tasks WHERE id = _task_id AND public.has_workspace_access(workspace_id))` | Consulta dados ou valida uma condicao no banco. |
| 7 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_client(_client_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 10 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  SELECT EXISTS (SELECT 1 FROM public.clients WHERE id = _client_id AND public.has_workspace_access(workspace_id))` | Consulta dados ou valida uma condicao no banco. |
| 12 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_department(_department_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 15 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 17 | `    SELECT 1 FROM public.client_departments d` | Consulta dados ou valida uma condicao no banco. |
| 18 | `    JOIN public.clients c ON c.id = d.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    WHERE d.id = _department_id AND public.has_workspace_access(c.workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_employee(_employee_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 24 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 26 | `    SELECT 1 FROM public.client_department_employees e` | Consulta dados ou valida uma condicao no banco. |
| 27 | `    JOIN public.client_departments d ON d.id = e.department_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    JOIN public.clients c ON c.id = d.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    WHERE e.id = _employee_id AND public.has_workspace_access(c.workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_mural_post(_post_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 34 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  SELECT EXISTS (SELECT 1 FROM public.mural_posts WHERE id = _post_id AND public.has_workspace_access(workspace_id))` | Consulta dados ou valida uma condicao no banco. |
| 36 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_request(_request_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 39 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  SELECT EXISTS (SELECT 1 FROM public.service_requests WHERE id = _request_id AND public.has_workspace_access(workspace_id))` | Consulta dados ou valida uma condicao no banco. |
| 41 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `CREATE OR REPLACE FUNCTION public.can_access_workspace_note(_note_id UUID)` | Define uma funcao no banco para reutilizar logica SQL. |
| 44 | `RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 46 | `    SELECT 1 FROM public.client_notes n` | Consulta dados ou valida uma condicao no banco. |
| 47 | `    JOIN public.clients c ON c.id = n.client_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `    WHERE n.id = _note_id AND public.has_workspace_access(c.workspace_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `DECLARE p RECORD;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  FOR p IN SELECT tablename, policyname FROM pg_policies` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    WHERE schemaname = 'public' AND tablename IN (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `      'subtasks','comments','attachments','task_history','task_collaborators','task_tag_links',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `      'task_due_date_changes','subtask_due_date_changes','subtask_attachments','comment_attachments','comment_mentions',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `      'client_departments','client_department_employees','client_department_employee_notes','client_department_employee_attachments',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `      'client_system_accesses','client_branches','client_notes','client_note_attachments','client_files','client_invoices',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `      'mural_post_attachments','mural_post_reactions','mural_post_reads','mural_post_orders',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `      'service_request_messages','service_request_participants','service_request_assignees','service_request_attachments','service_request_activity'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, p.tablename);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `DECLARE tbl TEXT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  FOREACH tbl IN ARRAY ARRAY['subtasks','comments','attachments','task_history','task_collaborators','task_tag_links','task_due_date_changes'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_task(task_id)) WITH CHECK (public.can_access_workspace_task(task_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  FOREACH tbl IN ARRAY ARRAY['subtask_due_date_changes','subtask_attachments'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.subtasks s WHERE s.id = subtask_id AND public.can_access_workspace_task(s.task_id))) WITH CHECK (EXISTS (SELECT 1 FROM public.subtasks s WHERE s.id = subtask_id AND public.can_access_workspace_task(s.task_id)))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `  FOREACH tbl IN ARRAY ARRAY['comment_attachments','comment_mentions'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.comments c WHERE c.id = comment_id AND public.can_access_workspace_task(c.task_id))) WITH CHECK (EXISTS (SELECT 1 FROM public.comments c WHERE c.id = comment_id AND public.can_access_workspace_task(c.task_id)))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  FOREACH tbl IN ARRAY ARRAY['client_departments','client_system_accesses','client_branches','client_notes','client_files','client_invoices'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_client(client_id)) WITH CHECK (public.can_access_workspace_client(client_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `  EXECUTE 'CREATE POLICY workspace_client_department_employees_parent ON public.client_department_employees FOR ALL TO authenticated USING (public.can_access_workspace_department(department_id)) WITH CHECK (public.can_access_workspace_department(department_id))';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `  FOREACH tbl IN ARRAY ARRAY['client_department_employee_notes','client_department_employee_attachments'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_employee(employee_id)) WITH CHECK (public.can_access_workspace_employee(employee_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  EXECUTE 'CREATE POLICY workspace_client_note_attachments_parent ON public.client_note_attachments FOR ALL TO authenticated USING (public.can_access_workspace_note(note_id)) WITH CHECK (public.can_access_workspace_note(note_id))';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `  FOREACH tbl IN ARRAY ARRAY['mural_post_attachments','mural_post_reactions','mural_post_reads','mural_post_orders'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_mural_post(post_id)) WITH CHECK (public.can_access_workspace_mural_post(post_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `  FOREACH tbl IN ARRAY ARRAY['service_request_messages','service_request_participants','service_request_assignees','service_request_attachments','service_request_activity'] LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `    EXECUTE format('CREATE POLICY workspace_%I_parent ON public.%I FOR ALL TO authenticated USING (public.can_access_workspace_request(request_id)) WITH CHECK (public.can_access_workspace_request(request_id))', tbl, tbl);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `END $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
