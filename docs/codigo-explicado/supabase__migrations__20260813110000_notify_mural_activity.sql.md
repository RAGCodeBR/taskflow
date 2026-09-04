# supabase/migrations/20260813110000_notify_mural_activity.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `CREATE OR REPLACE FUNCTION public.notify_mural_post_activity()` | Define uma funcao no banco para reutilizar logica SQL. |
| 2 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 3 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 4 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 5 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  actor_id uuid := COALESCE(auth.uid(), NEW.created_by);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  notification_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  notification_body text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  SELECT COALESCE(full_name, email, 'Alguém')` | Consulta dados ou valida uma condicao no banco. |
| 14 | `  INTO actor_name` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  FROM public.profiles` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  WHERE id = actor_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `  IF TG_OP = 'INSERT' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `    notification_title := 'Novo post-it no mural';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    notification_body := COALESCE(actor_name, 'Alguém') || ' publicou: ' || NEW.title;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  ELSE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `    notification_title := 'Post-it atualizado no mural';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    notification_body := COALESCE(actor_name, 'Alguém') || ' atualizou: ' || NEW.title;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `  INSERT INTO public.notifications (user_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 27 | `  SELECT DISTINCT role.user_id, 'mural_post', notification_title, notification_body` | Consulta dados ou valida uma condicao no banco. |
| 28 | `  FROM public.user_roles role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  JOIN public.profiles profile ON profile.id = role.user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  WHERE role.role <> 'client'::public.app_role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `    AND profile.is_active = true` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    AND role.user_id <> actor_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 38 | `DROP TRIGGER IF EXISTS trg_notify_mural_post_created ON public.mural_posts;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 39 | `CREATE TRIGGER trg_notify_mural_post_created` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 40 | `  AFTER INSERT ON public.mural_posts` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `  FOR EACH ROW EXECUTE FUNCTION public.notify_mural_post_activity();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `DROP TRIGGER IF EXISTS trg_notify_mural_post_updated ON public.mural_posts;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 44 | `CREATE TRIGGER trg_notify_mural_post_updated` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 45 | `  AFTER UPDATE OF title, content, color, tag, image_url, checklist, is_pinned, card_size, text_style, completed_at ON public.mural_posts` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  FOR EACH ROW` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `  WHEN (OLD.* IS DISTINCT FROM NEW.*)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `  EXECUTE FUNCTION public.notify_mural_post_activity();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `CREATE OR REPLACE FUNCTION public.notify_mural_reaction_activity()` | Define uma funcao no banco para reutilizar logica SQL. |
| 51 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `  post_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `  SELECT title INTO post_title FROM public.mural_posts WHERE id = NEW.post_id;` | Consulta dados ou valida uma condicao no banco. |
| 61 | `  SELECT COALESCE(full_name, email, 'Alguém') INTO actor_name FROM public.profiles WHERE id = NEW.user_id;` | Consulta dados ou valida uma condicao no banco. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `  INSERT INTO public.notifications (user_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 64 | `  SELECT DISTINCT role.user_id,` | Consulta dados ou valida uma condicao no banco. |
| 65 | `    'mural_reaction',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 66 | `    'Nova reação no mural',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `    COALESCE(actor_name, 'Alguém') || ' reagiu ' || NEW.emoji || ' em: ' || COALESCE(post_title, 'um post-it')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  FROM public.user_roles role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `  JOIN public.profiles profile ON profile.id = role.user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `  WHERE role.role <> 'client'::public.app_role` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `    AND profile.is_active = true` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `    AND role.user_id <> NEW.user_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `DROP TRIGGER IF EXISTS trg_notify_mural_reaction ON public.mural_post_reactions;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 79 | `CREATE TRIGGER trg_notify_mural_reaction` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 80 | `  AFTER INSERT ON public.mural_post_reactions` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `  FOR EACH ROW EXECUTE FUNCTION public.notify_mural_reaction_activity();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
