# supabase/migrations/20260724160000_allow_collaborator_invoice_management.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Finance staff can be administrators or collaborators. Client accounts remain read-only.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `DROP POLICY IF EXISTS client_invoices_admin_manage ON public.client_invoices;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `CREATE POLICY client_invoices_admin_or_collaborator_manage ON public.client_invoices` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
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
