# supabase/migrations/20260813113000_fix_mural_reaction_notification_recipients.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Profiles are the source of truth for active internal accesses. Some legacy` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- accounts do not have a user_roles row, so joining only user_roles skipped` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- them when a reaction was created.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.notify_mural_post_activity()` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  actor_id uuid := COALESCE(auth.uid(), NEW.created_by);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  notification_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  notification_body text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = actor_id;` | Consulta dados ou valida uma condicao no banco. |
| 17 | `  IF TG_OP = 'INSERT' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    notification_title := 'Novo post-it no mural';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    notification_body := COALESCE(actor_name, 'Alguém') || ' publicou: ' || NEW.title;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    notification_title := 'Post-it atualizado no mural';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    notification_body := COALESCE(actor_name, 'Alguém') || ' atualizou: ' || NEW.title;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `  INSERT INTO public.notifications (user_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 26 | `  SELECT profile.id, 'mural_post', notification_title, notification_body` | Consulta dados ou valida uma condicao no banco. |
| 27 | `  FROM public.profiles profile` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  WHERE profile.is_active = true` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    AND profile.id <> actor_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `    AND NOT public.has_role(profile.id, 'client'::public.app_role);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `CREATE OR REPLACE FUNCTION public.notify_mural_reaction_activity()` | Define uma funcao no banco para reutilizar logica SQL. |
| 36 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  post_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `  SELECT title INTO post_title FROM public.mural_posts WHERE id = NEW.post_id;` | Consulta dados ou valida uma condicao no banco. |
| 46 | `  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = NEW.user_id;` | Consulta dados ou valida uma condicao no banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `  INSERT INTO public.notifications (user_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 49 | `  SELECT profile.id,` | Consulta dados ou valida uma condicao no banco. |
| 50 | `    'mural_reaction',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `    'Nova reação no mural',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `    COALESCE(actor_name, 'Alguém') || ' reagiu ' || NEW.emoji || ' em: ' || COALESCE(post_title, 'um post-it')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `  FROM public.profiles profile` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  WHERE profile.is_active = true` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `    AND profile.id <> NEW.user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `    AND NOT public.has_role(profile.id, 'client'::public.app_role);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
