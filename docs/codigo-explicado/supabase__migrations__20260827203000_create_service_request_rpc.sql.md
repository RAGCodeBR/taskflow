# supabase/migrations/20260827203000_create_service_request_rpc.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Criação atômica de solicitações. Mantém a regra de autenticação no servidor` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- e evita que uma atualização tardia do perfil do navegador bloqueie o INSERT` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- pela política de linha da tabela.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `CREATE OR REPLACE FUNCTION public.create_service_request(` | Define uma funcao no banco para reutilizar logica SQL. |
| 5 | `  p_title text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  p_description text DEFAULT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  p_client_id uuid DEFAULT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  p_priority text DEFAULT 'medium',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  p_due_date date DEFAULT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  p_participant_ids uuid[] DEFAULT ARRAY[]::uuid[]` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `RETURNS uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `  v_request_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  IF auth.uid() IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `    RAISE EXCEPTION 'Sessão inválida. Entre novamente para criar uma solicitação.' USING ERRCODE = '42501';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `  IF char_length(trim(coalesce(p_title, ''))) = 0 THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    RAISE EXCEPTION 'Informe o assunto da solicitação.' USING ERRCODE = '23514';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `  INSERT INTO public.service_requests (title, description, client_id, priority, due_date, created_by)` | Insere dados iniciais ou registros de apoio. |
| 29 | `  VALUES (trim(p_title), nullif(trim(coalesce(p_description, '')), ''), p_client_id, p_priority, p_due_date, auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  RETURNING id INTO v_request_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `  INSERT INTO public.service_request_participants (request_id, user_id, added_by)` | Insere dados iniciais ou registros de apoio. |
| 33 | `  VALUES (v_request_id, auth.uid(), auth.uid())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `  ON CONFLICT DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  INSERT INTO public.service_request_participants (request_id, user_id, added_by)` | Insere dados iniciais ou registros de apoio. |
| 37 | `  SELECT v_request_id, participant_id, auth.uid()` | Consulta dados ou valida uma condicao no banco. |
| 38 | `  FROM unnest(coalesce(p_participant_ids, ARRAY[]::uuid[])) AS selected(participant_id)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  ON CONFLICT DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `  INSERT INTO public.service_request_activity (request_id, actor_id, kind, details)` | Insere dados iniciais ou registros de apoio. |
| 42 | `  VALUES (v_request_id, auth.uid(), 'created', 'Solicitação criada');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `  RETURN v_request_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 45 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `GRANT EXECUTE ON FUNCTION public.create_service_request(text, text, uuid, text, date, uuid[]) TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
