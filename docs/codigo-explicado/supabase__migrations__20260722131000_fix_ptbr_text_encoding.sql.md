# supabase/migrations/20260722131000_fix_ptbr_text_encoding.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Corrige textos salvos como UTF-8 interpretado incorretamente como Windows-1252` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- (por exemplo: "ConcluÃ­das" passa a ser "Concluídas").` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `CREATE OR REPLACE FUNCTION public.fix_ptbr_mojibake(value text)` | Define uma funcao no banco para reutilizar logica SQL. |
| 4 | `RETURNS text` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `IMMUTABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  IF value IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `    OR (position(chr(195) IN value) = 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `      AND position(chr(194) IN value) = 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `      AND position(chr(226) IN value) = 0) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    RETURN value;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `  RETURN convert_from(convert_to(value, 'WIN1252'), 'UTF8');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `EXCEPTION` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  WHEN character_not_in_repertoire OR untranslatable_character THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    -- Mantém textos que já são válidos e apenas contenham esses caracteres.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 20 | `    RETURN value;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `UPDATE public.kanban_columns SET name = public.fix_ptbr_mojibake(name);` | Atualiza registros existentes no banco. |
| 25 | `UPDATE public.task_statuses SET name = public.fix_ptbr_mojibake(name);` | Atualiza registros existentes no banco. |
| 26 | `UPDATE public.task_tags SET name = public.fix_ptbr_mojibake(name);` | Atualiza registros existentes no banco. |
| 27 | `UPDATE public.tasks SET` | Atualiza registros existentes no banco. |
| 28 | `  title = public.fix_ptbr_mojibake(title),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  description = public.fix_ptbr_mojibake(description);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `UPDATE public.subtasks SET` | Atualiza registros existentes no banco. |
| 31 | `  title = public.fix_ptbr_mojibake(title),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `  notes = public.fix_ptbr_mojibake(notes);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `UPDATE public.comments SET` | Atualiza registros existentes no banco. |
| 34 | `  title = public.fix_ptbr_mojibake(title),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `  body = public.fix_ptbr_mojibake(body);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `UPDATE public.notifications SET` | Atualiza registros existentes no banco. |
| 37 | `  title = public.fix_ptbr_mojibake(title),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `  body = public.fix_ptbr_mojibake(body);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `UPDATE public.profiles SET full_name = public.fix_ptbr_mojibake(full_name);` | Atualiza registros existentes no banco. |
| 40 | `UPDATE public.clients SET` | Atualiza registros existentes no banco. |
| 41 | `  name = public.fix_ptbr_mojibake(name),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  description = public.fix_ptbr_mojibake(description),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  legal_name = public.fix_ptbr_mojibake(legal_name),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  trade_name = public.fix_ptbr_mojibake(trade_name),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  address = public.fix_ptbr_mojibake(address),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  responsible = public.fix_ptbr_mojibake(responsible);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `UPDATE public.client_notes SET` | Atualiza registros existentes no banco. |
| 48 | `  title = public.fix_ptbr_mojibake(title),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  content = public.fix_ptbr_mojibake(content);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `UPDATE public.client_departments SET` | Atualiza registros existentes no banco. |
| 51 | `  name = public.fix_ptbr_mojibake(name),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `  description = public.fix_ptbr_mojibake(description);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `UPDATE public.client_department_employees SET` | Atualiza registros existentes no banco. |
| 54 | `  full_name = public.fix_ptbr_mojibake(full_name),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  role = public.fix_ptbr_mojibake(role),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  activities = public.fix_ptbr_mojibake(activities);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
