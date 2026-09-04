# supabase/migrations/20260730103000_allow_collaborator_client_data_management.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Collaborators can maintain operational client data, while deleting clients` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- remains restricted to administrators.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `DROP POLICY IF EXISTS clients_update_admin ON public.clients;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 5 | `CREATE POLICY clients_update_staff ON public.clients` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 6 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `DROP POLICY IF EXISTS client_departments_insert_admin ON public.client_departments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 17 | `DROP POLICY IF EXISTS client_departments_update_admin ON public.client_departments;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 18 | `CREATE POLICY client_departments_insert_staff ON public.client_departments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 19 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `CREATE POLICY client_departments_update_staff ON public.client_departments` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 25 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `DROP POLICY IF EXISTS client_department_employees_insert_admin ON public.client_department_employees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 36 | `DROP POLICY IF EXISTS client_department_employees_update_admin ON public.client_department_employees;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 37 | `CREATE POLICY client_department_employees_insert_staff ON public.client_department_employees` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 38 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `CREATE POLICY client_department_employees_update_staff ON public.client_department_employees` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 44 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 54 | `DROP POLICY IF EXISTS client_system_accesses_select_admin ON public.client_system_accesses;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 55 | `DROP POLICY IF EXISTS client_system_accesses_insert_admin ON public.client_system_accesses;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 56 | `DROP POLICY IF EXISTS client_system_accesses_update_admin ON public.client_system_accesses;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 57 | `CREATE POLICY client_system_accesses_select_staff ON public.client_system_accesses` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 58 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `CREATE POLICY client_system_accesses_insert_staff ON public.client_system_accesses` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 64 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `CREATE POLICY client_system_accesses_update_staff ON public.client_system_accesses` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 70 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `DROP POLICY IF EXISTS client_branches_select_admin ON public.client_branches;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 81 | `DROP POLICY IF EXISTS client_branches_insert_admin ON public.client_branches;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 82 | `DROP POLICY IF EXISTS client_branches_update_admin ON public.client_branches;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 83 | `CREATE POLICY client_branches_select_staff ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 84 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `CREATE POLICY client_branches_insert_staff ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 90 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 91 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `CREATE POLICY client_branches_update_staff ON public.client_branches` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 96 | `  FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `    OR public.has_role(auth.uid(), 'collaborator'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
