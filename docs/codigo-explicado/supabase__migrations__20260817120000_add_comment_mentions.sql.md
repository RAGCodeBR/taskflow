# supabase/migrations/20260817120000_add_comment_mentions.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Stores the people explicitly mentioned in a task conversation.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE TABLE IF NOT EXISTS public.comment_mentions (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 3 | `  comment_id uuid NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 4 | `  mentioned_user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  PRIMARY KEY (comment_id, mentioned_user_id)` | Define identificador unico principal do registro. |
| 7 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `CREATE INDEX IF NOT EXISTS comment_mentions_user_idx` | Cria indice para acelerar consultas frequentes. |
| 10 | `  ON public.comment_mentions (mentioned_user_id, created_at DESC);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `GRANT SELECT, INSERT, DELETE ON public.comment_mentions TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `GRANT ALL ON public.comment_mentions TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `ALTER TABLE public.comment_mentions ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `CREATE POLICY comment_mentions_select ON public.comment_mentions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 18 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `    EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `      SELECT 1 FROM public.comments c` | Consulta dados ou valida uma condicao no banco. |
| 22 | `      WHERE c.id = comment_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `CREATE POLICY comment_mentions_insert ON public.comment_mentions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 27 | `  FOR INSERT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  WITH CHECK (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `    EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `      SELECT 1 FROM public.comments c` | Consulta dados ou valida uma condicao no banco. |
| 31 | `      WHERE c.id = comment_id AND c.author_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `CREATE POLICY comment_mentions_delete ON public.comment_mentions` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 36 | `  FOR DELETE TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 37 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `    EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `      SELECT 1 FROM public.comments c` | Consulta dados ou valida uma condicao no banco. |
| 40 | `      WHERE c.id = comment_id AND c.author_id = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `-- Mentions invite a person into the task conversation. Suppress the normal` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 45 | `-- "collaborator added" notification in this specific case: the mention is the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 46 | `-- useful notification and avoids two entries in the bell for one action.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 47 | `CREATE OR REPLACE FUNCTION public.notify_task_collaborator_added()` | Define uma funcao no banco para reutilizar logica SQL. |
| 48 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 50 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 51 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 53 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 54 | `  actor uuid := COALESCE(NEW.added_by, auth.uid());` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `  actor_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 56 | `  task_title text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 58 | `  IF NEW.collaborator_id = actor` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `     OR current_setting('app.comment_mention', true) = 'true' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 62 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 63 | `  SELECT COALESCE(full_name, email) INTO actor_name` | Consulta dados ou valida uma condicao no banco. |
| 64 | `  FROM public.profiles WHERE id = actor;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 65 | `  SELECT title INTO task_title FROM public.tasks WHERE id = NEW.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 68 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `    NEW.collaborator_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 70 | `    NEW.task_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 71 | `    'collaborator_assignment',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `    U&'Voc\00EA foi adicionado como colaborador',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `    COALESCE(actor_name, U&'Algu\00E9m') || U&' adicionou voc\00EA como colaborador em: ' || COALESCE(task_title, 'uma tarefa')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 75 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 76 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 77 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `CREATE OR REPLACE FUNCTION public.notify_comment_mention()` | Define uma funcao no banco para reutilizar logica SQL. |
| 80 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 81 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 82 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 85 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 86 | `  comment_row record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 87 | `  task_row record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  author_name text;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 90 | `  SELECT id, task_id, author_id, body INTO comment_row` | Consulta dados ou valida uma condicao no banco. |
| 91 | `  FROM public.comments WHERE id = NEW.comment_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 92 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 93 | `  IF comment_row.id IS NULL OR NEW.mentioned_user_id = comment_row.author_id THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 95 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 96 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 97 | `  SELECT id, title INTO task_row FROM public.tasks WHERE id = comment_row.task_id;` | Consulta dados ou valida uma condicao no banco. |
| 98 | `  SELECT COALESCE(full_name, email) INTO author_name` | Consulta dados ou valida uma condicao no banco. |
| 99 | `  FROM public.profiles WHERE id = comment_row.author_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `  -- A mentioned person needs access to the task to be able to read and reply` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 102 | `  -- to the conversation opened from the notification bell.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 103 | `  PERFORM set_config('app.comment_mention', 'true', true);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `  INSERT INTO public.task_collaborators (task_id, collaborator_id, added_by)` | Insere dados iniciais ou registros de apoio. |
| 105 | `  VALUES (task_row.id, NEW.mentioned_user_id, comment_row.author_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `  ON CONFLICT (task_id, collaborator_id) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 107 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 108 | `  -- The assignee may already have received the standard comment notification.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 109 | `  -- Avoid showing two bell entries for that same message.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 110 | `  IF EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 111 | `    SELECT 1 FROM public.notifications n` | Consulta dados ou valida uma condicao no banco. |
| 112 | `    WHERE n.user_id = NEW.mentioned_user_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `      AND n.task_id = task_row.id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `      AND n.type = 'comment'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `      AND n.created_at >= now() - interval '10 seconds'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 116 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `    RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 118 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  INSERT INTO public.notifications (user_id, task_id, type, title, body)` | Insere dados iniciais ou registros de apoio. |
| 121 | `  VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 122 | `    NEW.mentioned_user_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `    task_row.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 124 | `    'mention',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `    U&'Voc\00EA foi mencionado em uma tarefa',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `    COALESCE(author_name, U&'Algu\00E9m') || U&' mencionou voc\00EA em: ' || task_row.title` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 127 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 128 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 129 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 130 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 131 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 132 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 133 | `DROP TRIGGER IF EXISTS trg_notify_comment_mention ON public.comment_mentions;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 134 | `CREATE TRIGGER trg_notify_comment_mention` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 135 | `AFTER INSERT ON public.comment_mentions` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 136 | `FOR EACH ROW EXECUTE FUNCTION public.notify_comment_mention();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 137 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 138 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 139 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 140 | `  ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 141 | `EXCEPTION WHEN duplicate_object THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 142 | `  NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 143 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 144 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 145 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
