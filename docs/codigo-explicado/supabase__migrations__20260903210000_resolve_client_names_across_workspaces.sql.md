# supabase/migrations/20260903210000_resolve_client_names_across_workspaces.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Exibir o nome do cliente de uma tarefa lançada para o outro ambiente.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- O gatilho assign_task_workspace() já remapeia o cliente para o gêmeo do` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `-- ambiente de destino (via source_client_id), que é o comportamento correto: a` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 5 | `-- tarefa do Marketing aponta para o cliente do Marketing, não para o da` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 6 | `-- Consultoria. Mas o card, renderizado no ambiente de origem, faz` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 7 | `-- clients.find(...) sobre uma lista que a RLS restringe ao ambiente ativo — e` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 8 | `-- não encontra o cliente do outro lado. O card então mostra "Adicionar` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 9 | `-- cliente", como se o dado tivesse se perdido.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 10 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 11 | `-- Esta função existe só para resolver a exibição. Devolve o mínimo — id, nome e` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 12 | `-- cor — dos clientes dos ambientes a que a pessoa pertence. Nada de CNPJ,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 13 | `-- endereço, contato ou qualquer outro campo do cadastro.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 14 | `--` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 15 | `-- Os seletores de cliente continuam usando a consulta normal à tabela,` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 16 | `-- restrita ao ambiente ativo: eles não devem oferecer o cliente do outro lado.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `CREATE OR REPLACE FUNCTION public.list_related_client_names()` | Define uma funcao no banco para reutilizar logica SQL. |
| 19 | `RETURNS TABLE (id uuid, name text, color text)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `LANGUAGE sql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  SELECT c.id, c.name, c.color` | Consulta dados ou valida uma condicao no banco. |
| 26 | `  FROM public.clients c` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  WHERE EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `    SELECT 1 FROM public.workspace_memberships m` | Consulta dados ou valida uma condicao no banco. |
| 29 | `    WHERE m.user_id = auth.uid() AND m.workspace_id = c.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `REVOKE ALL ON FUNCTION public.list_related_client_names() FROM PUBLIC;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `GRANT EXECUTE ON FUNCTION public.list_related_client_names() TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
