# supabase/migrations/20260724123000_fix_notification_text_encoding.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Recria as mensagens de notificações usando escapes Unicode e corrige os registros existentes.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE OR REPLACE FUNCTION public.notify_task_assignment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 3 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `DECLARE actor uuid := auth.uid(); assigner_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  IF NEW.assignee_id IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  IF TG_OP = 'UPDATE' AND OLD.assignee_id IS NOT DISTINCT FROM NEW.assignee_id THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  IF NEW.assignee_id = actor THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  SELECT COALESCE(full_name, email) INTO assigner_name FROM public.profiles WHERE id = actor;` | Consulta dados ou valida uma condicao no banco. |
| 10 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 11 | `  VALUES (NEW.assignee_id, NEW.id, 'assignment',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `    U&'Nova tarefa atribu\00EDda a voc\00EA',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    COALESCE(assigner_name, U&'Algu\00E9m') || ' atribuiu: ' || NEW.title);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `END; $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE OR REPLACE FUNCTION public.notify_task_comment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 18 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `DECLARE t record; author_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  SELECT id, title, assignee_id INTO t FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 22 | `  IF t.assignee_id IS NULL OR t.assignee_id = NEW.created_by THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  SELECT COALESCE(full_name, email) INTO author_name FROM public.profiles WHERE id = NEW.created_by;` | Consulta dados ou valida uma condicao no banco. |
| 24 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 25 | `  VALUES (t.assignee_id, t.id, 'comment', U&'Nova observa\00E7\00E3o em sua tarefa',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `    COALESCE(author_name, U&'Algu\00E9m') || ' comentou em: ' || t.title);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `END; $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `CREATE OR REPLACE FUNCTION public.notify_task_attachment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 31 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `DECLARE t record; uploader_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  SELECT id, title, assignee_id INTO t FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 35 | `  IF t.assignee_id IS NULL OR t.assignee_id = NEW.uploaded_by THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `  SELECT COALESCE(full_name, email) INTO uploader_name FROM public.profiles WHERE id = NEW.uploaded_by;` | Consulta dados ou valida uma condicao no banco. |
| 37 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 38 | `  VALUES (t.assignee_id, t.id, 'attachment', 'Novo arquivo em sua tarefa',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `    COALESCE(uploader_name, U&'Algu\00E9m') || ' anexou "' || NEW.file_name || '" em: ' || t.title);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `END; $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `CREATE OR REPLACE FUNCTION public.notify_subtask_assignment()` | Define uma funcao no banco para reutilizar logica SQL. |
| 44 | `RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `DECLARE actor uuid := auth.uid(); assigner_name text; task_title text; clean_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  IF NEW.assignee_id IS NULL THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  IF TG_OP = 'UPDATE' AND OLD.assignee_id IS NOT DISTINCT FROM NEW.assignee_id THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `  IF NEW.assignee_id = actor THEN RETURN NEW; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `  SELECT COALESCE(full_name, email) INTO assigner_name FROM public.profiles WHERE id = actor;` | Consulta dados ou valida uma condicao no banco. |
| 51 | `  SELECT title INTO task_title FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 52 | `  clean_title := regexp_replace(COALESCE(NEW.title, ''), '<[^>]+>', '', 'g');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 54 | `  VALUES (NEW.assignee_id, NEW.task_id, 'subtask_assignment',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    U&'Nova subtarefa atribu\00EDda a voc\00EA',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    COALESCE(assigner_name, U&'Algu\00E9m') || ' atribuiu a subtarefa "' || clean_title || '"' ||` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `    CASE WHEN task_title IS NOT NULL THEN ' em: ' || task_title ELSE '' END);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `END; $$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 61 | `UPDATE public.notifications` | Atualiza registros existentes no banco. |
| 62 | `SET title = public.fix_ptbr_mojibake(title), body = public.fix_ptbr_mojibake(body)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 63 | `WHERE position(chr(195) IN COALESCE(title, '')) > 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 64 | `   OR position(chr(194) IN COALESCE(title, '')) > 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `   OR position(chr(226) IN COALESCE(title, '')) > 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `   OR position(chr(195) IN COALESCE(body, '')) > 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `   OR position(chr(194) IN COALESCE(body, '')) > 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `   OR position(chr(226) IN COALESCE(body, '')) > 0;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
