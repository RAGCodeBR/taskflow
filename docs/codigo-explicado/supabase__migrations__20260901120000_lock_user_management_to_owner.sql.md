# supabase/migrations/20260901120000_lock_user_management_to_owner.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- User management is centralized. Other administrators retain their own` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- profile editing through the regular profile policy, but cannot manage peers.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE OR REPLACE FUNCTION public.is_taskflow_access_manager(_user_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  SELECT EXISTS (` | Consulta dados ou valida uma condicao no banco. |
| 12 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 13 | `    FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `    WHERE id = _user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `      AND lower(email) = 'reinangrupoahouse@gmail.com'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `REVOKE ALL ON FUNCTION public.is_taskflow_access_manager(uuid) FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `GRANT EXECUTE ON FUNCTION public.is_taskflow_access_manager(uuid) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `DROP POLICY IF EXISTS profiles_update_own_or_admin ON public.profiles;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 23 | `CREATE POLICY profiles_update_own_or_manager` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 24 | `  ON public.profiles FOR UPDATE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  USING (auth.uid() = id OR public.is_taskflow_access_manager(auth.uid()))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  WITH CHECK (auth.uid() = id OR public.is_taskflow_access_manager(auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `DROP POLICY IF EXISTS roles_admin_manage ON public.user_roles;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 29 | `CREATE POLICY roles_manager_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 30 | `  ON public.user_roles FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  USING (public.is_taskflow_access_manager(auth.uid()))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `DROP POLICY IF EXISTS user_permissions_admin_manage ON public.user_permissions;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 35 | `CREATE POLICY user_permissions_manager_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 36 | `  ON public.user_permissions FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  USING (public.is_taskflow_access_manager(auth.uid()))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 40 | `DROP POLICY IF EXISTS client_user_links_admin_manage ON public.client_user_links;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 41 | `CREATE POLICY client_user_links_manager_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 42 | `  ON public.client_user_links FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  USING (public.is_taskflow_access_manager(auth.uid()))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `DROP POLICY IF EXISTS memberships_admin_manage ON public.workspace_memberships;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 47 | `CREATE POLICY memberships_manager_manage` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 48 | `  ON public.workspace_memberships FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  USING (public.is_taskflow_access_manager(auth.uid()))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  WITH CHECK (public.is_taskflow_access_manager(auth.uid()));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
