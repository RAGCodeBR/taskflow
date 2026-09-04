# supabase/migrations/20260805110000_preserve_imported_task_creator.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Server-side imports use service_role to avoid restricting the Importar Ata` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- flow to a specific RLS policy. Preserve the authenticated creator supplied` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- by that trusted server flow, while browser inserts always use auth.uid().` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.set_task_created_by()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  IF TG_OP = 'INSERT' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    IF auth.uid() IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `      NEW.created_by := auth.uid();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `    ELSIF NEW.created_by IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `      RAISE EXCEPTION 'created_by is required for server-side task creation';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `    END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
