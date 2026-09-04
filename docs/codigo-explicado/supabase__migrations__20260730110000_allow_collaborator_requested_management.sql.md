# supabase/migrations/20260730110000_allow_collaborator_requested_management.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Shared management requested for collaborators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `DROP POLICY IF EXISTS task_tags_admin_write ON public.task_tags;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 4 | `CREATE POLICY task_tags_staff_write ON public.task_tags` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 5 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `DROP POLICY IF EXISTS clients_insert_admin ON public.clients;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 16 | `DROP POLICY IF EXISTS clients_delete_admin ON public.clients;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 17 | `CREATE POLICY clients_insert_staff ON public.clients` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `CREATE POLICY clients_delete_staff ON public.clients` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 24 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `DROP POLICY IF EXISTS client_department_employees_delete_admin ON public.client_department_employees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 31 | `CREATE POLICY client_department_employees_delete_staff ON public.client_department_employees` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 32 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `DROP POLICY IF EXISTS client_department_employee_attachments_select_admin ON public.client_department_employee_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 39 | `DROP POLICY IF EXISTS client_department_employee_attachments_insert_admin ON public.client_department_employee_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 40 | `DROP POLICY IF EXISTS client_department_employee_attachments_delete_admin ON public.client_department_employee_attachments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 41 | `CREATE POLICY client_department_employee_attachments_select_staff ON public.client_department_employee_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 42 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `CREATE POLICY client_department_employee_attachments_insert_staff ON public.client_department_employee_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 48 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `      public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `CREATE POLICY client_department_employee_attachments_delete_staff ON public.client_department_employee_attachments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 57 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `DROP POLICY IF EXISTS client_department_employee_notes_insert_admin ON public.client_department_employee_notes;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 64 | `DROP POLICY IF EXISTS client_department_employee_notes_update_admin ON public.client_department_employee_notes;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 65 | `DROP POLICY IF EXISTS client_department_employee_notes_delete_admin ON public.client_department_employee_notes;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 66 | `CREATE POLICY client_department_employee_notes_insert_staff ON public.client_department_employee_notes` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 67 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    created_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `      public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `      OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `CREATE POLICY client_department_employee_notes_update_staff ON public.client_department_employee_notes` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 76 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 80 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `CREATE POLICY client_department_employee_notes_delete_staff ON public.client_department_employee_notes` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 86 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `DROP POLICY IF EXISTS task_attachments_delete_own ON storage.objects;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 93 | `CREATE POLICY task_attachments_delete_staff_or_owner ON storage.objects` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 94 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `    bucket_id = 'task-attachments'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `    AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `      owner = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `      OR public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `        SELECT 1 FROM public.attachments attachment` | Consulta dados ou valida uma condicao no banco. |
| 102 | `        WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `          AND attachment.uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `        SELECT 1 FROM public.comment_attachments attachment` | Consulta dados ou valida uma condicao no banco. |
| 107 | `        WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `          AND attachment.uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 111 | `        SELECT 1 FROM public.client_note_attachments attachment` | Consulta dados ou valida uma condicao no banco. |
| 112 | `        WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `          AND attachment.uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `        SELECT 1 FROM public.client_files file` | Consulta dados ou valida uma condicao no banco. |
| 117 | `        WHERE file.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 118 | `          AND file.uploaded_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 120 | `      OR EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 121 | `        SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 122 | `        FROM public.client_department_employee_attachments attachment` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `        WHERE attachment.storage_path = storage.objects.name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 124 | `          AND public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 127 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
