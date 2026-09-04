# supabase/migrations/20260723140000_fix_task_creation_rls.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- O criador de uma tarefa deve sempre ser o usuário autenticado. Definir isso` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- no gatilho evita falhas de RLS ao criar uma tarefa já com responsável e` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- colaboradores, e também impede que o cliente escolha outro criador.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.set_task_created_by()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  IF TG_OP = 'INSERT' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    NEW.created_by := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `DROP POLICY IF EXISTS tasks_insert ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 19 | `CREATE POLICY tasks_insert ON public.tasks` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 20 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  WITH CHECK (auth.uid() IS NOT NULL);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
