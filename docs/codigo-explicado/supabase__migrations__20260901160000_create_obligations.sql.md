# supabase/migrations/20260901160000_create_obligations.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Client obligations are permanent recurrence templates. Individual due dates` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `-- are materialized as occurrences and, near their deadline, as normal tasks.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 3 | `-- Existing tasks remain untouched and do not depend on this module.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `CREATE TABLE IF NOT EXISTS public.obligations (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 6 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 7 | `  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 8 | `  title text NOT NULL CHECK (char_length(trim(title)) > 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  description text,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 11 | `  assignee_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 12 | `  frequency text NOT NULL DEFAULT 'monthly'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `    CHECK (frequency IN ('daily', 'weekly', 'monthly')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 14 | `  interval_count integer NOT NULL DEFAULT 1 CHECK (interval_count BETWEEN 1 AND 365),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `  days_of_week smallint[] NOT NULL DEFAULT ARRAY[]::smallint[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 16 | `  days_of_month smallint[] NOT NULL DEFAULT ARRAY[]::smallint[],` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 17 | `  month_rule text NOT NULL DEFAULT 'specific_days'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 18 | `    CHECK (month_rule IN ('specific_days', 'last_day', 'last_business_day')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 19 | `  business_days_only boolean NOT NULL DEFAULT false,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 20 | `  start_date date NOT NULL DEFAULT CURRENT_DATE,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 21 | `  end_date date,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 22 | `  create_before_days integer NOT NULL DEFAULT 7 CHECK (create_before_days BETWEEN 0 AND 365),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  due_time time without time zone,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `  priority public.task_priority NOT NULL DEFAULT 'medium',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `  column_id uuid REFERENCES public.kanban_columns(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 26 | `  status_id uuid REFERENCES public.task_statuses(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 27 | `  is_active boolean NOT NULL DEFAULT true,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 28 | `  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,` | Define relacionamento entre tabelas por chave estrangeira. |
| 29 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  updated_at timestamptz NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 31 | `  CHECK (end_date IS NULL OR end_date >= start_date)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 32 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `CREATE TABLE IF NOT EXISTS public.obligation_occurrences (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 35 | `  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 36 | `  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 37 | `  obligation_id uuid NOT NULL REFERENCES public.obligations(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 38 | `  due_date date NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 39 | `  due_time time without time zone,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 40 | `  status text NOT NULL DEFAULT 'scheduled'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 41 | `    CHECK (status IN ('scheduled', 'open', 'completed', 'skipped')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 42 | `  task_id uuid UNIQUE REFERENCES public.tasks(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 43 | `  completed_at timestamptz,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 44 | `  completed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,` | Define relacionamento entre tabelas por chave estrangeira. |
| 45 | `  created_at timestamptz NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 46 | `  updated_at timestamptz NOT NULL DEFAULT now(),` | Atualiza registros existentes no banco. |
| 47 | `  UNIQUE (obligation_id, due_date)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 48 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `CREATE INDEX IF NOT EXISTS obligations_workspace_active_idx` | Cria indice para acelerar consultas frequentes. |
| 51 | `  ON public.obligations(workspace_id, is_active);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 52 | `CREATE INDEX IF NOT EXISTS obligations_client_idx ON public.obligations(client_id);` | Cria indice para acelerar consultas frequentes. |
| 53 | `CREATE INDEX IF NOT EXISTS obligation_occurrences_workspace_due_idx` | Cria indice para acelerar consultas frequentes. |
| 54 | `  ON public.obligation_occurrences(workspace_id, due_date);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 55 | `CREATE INDEX IF NOT EXISTS obligation_occurrences_obligation_due_idx` | Cria indice para acelerar consultas frequentes. |
| 56 | `  ON public.obligation_occurrences(obligation_id, due_date);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.obligations TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 59 | `GRANT SELECT, INSERT, UPDATE, DELETE ON public.obligation_occurrences TO authenticated;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 60 | `GRANT ALL ON public.obligations, public.obligation_occurrences TO service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `ALTER TABLE public.obligations ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 63 | `ALTER TABLE public.obligation_occurrences ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 64 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 65 | `CREATE POLICY obligations_workspace_access ON public.obligations` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 66 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 67 | `  USING (public.has_workspace_access(workspace_id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 68 | `  WITH CHECK (public.has_workspace_access(workspace_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `CREATE POLICY obligation_occurrences_workspace_access ON public.obligation_occurrences` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 71 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 72 | `  USING (public.has_workspace_access(workspace_id))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 73 | `  WITH CHECK (public.has_workspace_access(workspace_id));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 74 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 75 | `DROP TRIGGER IF EXISTS trg_obligations_assign_workspace ON public.obligations;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 76 | `CREATE TRIGGER trg_obligations_assign_workspace` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 77 | `  BEFORE INSERT OR UPDATE OF workspace_id ON public.obligations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 78 | `  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `DROP TRIGGER IF EXISTS trg_obligation_occurrences_assign_workspace ON public.obligation_occurrences;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 81 | `CREATE TRIGGER trg_obligation_occurrences_assign_workspace` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 82 | `  BEFORE INSERT OR UPDATE OF workspace_id ON public.obligation_occurrences` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 83 | `  FOR EACH ROW EXECUTE FUNCTION public.assign_current_workspace();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `DROP TRIGGER IF EXISTS trg_obligations_updated_at ON public.obligations;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 86 | `CREATE TRIGGER trg_obligations_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 87 | `  BEFORE UPDATE ON public.obligations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 88 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 89 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 90 | `DROP TRIGGER IF EXISTS trg_obligation_occurrences_updated_at ON public.obligation_occurrences;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 91 | `CREATE TRIGGER trg_obligation_occurrences_updated_at` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 92 | `  BEFORE UPDATE ON public.obligation_occurrences` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 93 | `  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `CREATE OR REPLACE FUNCTION public.prepare_obligation()` | Define uma funcao no banco para reutilizar logica SQL. |
| 96 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 97 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 98 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 99 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 100 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 101 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 102 | `  IF auth.uid() IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 103 | `    IF TG_OP = 'INSERT' THEN NEW.created_by := auth.uid(); END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 104 | `    IF NEW.workspace_id IS NULL THEN NEW.workspace_id := public.current_workspace_id(); END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 105 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `  NEW.title := trim(NEW.title);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 108 | `  NEW.description := nullif(trim(coalesce(NEW.description, '')), '');` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 109 | `  NEW.days_of_week := ARRAY(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 110 | `    SELECT DISTINCT day_value` | Consulta dados ou valida uma condicao no banco. |
| 111 | `    FROM unnest(NEW.days_of_week) AS day_value` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 112 | `    ORDER BY day_value` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 113 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 114 | `  NEW.days_of_month := ARRAY(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 115 | `    SELECT DISTINCT day_value` | Consulta dados ou valida uma condicao no banco. |
| 116 | `    FROM unnest(NEW.days_of_month) AS day_value` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 117 | `    ORDER BY day_value` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 118 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  IF EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 121 | `    SELECT 1 FROM unnest(NEW.days_of_week) AS day_value` | Consulta dados ou valida uma condicao no banco. |
| 122 | `    WHERE day_value < 1 OR day_value > 7` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 123 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 124 | `    RAISE EXCEPTION 'Os dias da semana devem estar entre 1 e 7';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 125 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 126 | `  IF EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 127 | `    SELECT 1 FROM unnest(NEW.days_of_month) AS day_value` | Consulta dados ou valida uma condicao no banco. |
| 128 | `    WHERE day_value < 1 OR day_value > 31` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 129 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 130 | `    RAISE EXCEPTION 'Os dias do mês devem estar entre 1 e 31';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 131 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 132 | `  IF NEW.frequency = 'weekly' AND cardinality(NEW.days_of_week) = 0 THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 133 | `    RAISE EXCEPTION 'Selecione ao menos um dia da semana';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 134 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 135 | `  IF NEW.frequency = 'monthly'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 136 | `     AND NEW.month_rule = 'specific_days'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 137 | `     AND cardinality(NEW.days_of_month) = 0 THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 138 | `    RAISE EXCEPTION 'Informe ao menos um dia do mês';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 139 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 140 | `  IF NEW.client_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 141 | `    SELECT 1 FROM public.clients client` | Consulta dados ou valida uma condicao no banco. |
| 142 | `    WHERE client.id = NEW.client_id AND client.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 143 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 144 | `    RAISE EXCEPTION 'O cliente não pertence ao ambiente atual';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 145 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 146 | `  IF NEW.assignee_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 147 | `    SELECT 1 FROM public.workspace_memberships membership` | Consulta dados ou valida uma condicao no banco. |
| 148 | `    WHERE membership.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 149 | `      AND membership.user_id = NEW.assignee_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 150 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 151 | `    RAISE EXCEPTION 'O responsável não pertence ao ambiente atual';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 152 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 153 | `  IF NEW.column_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 154 | `    SELECT 1 FROM public.kanban_columns kanban_column` | Consulta dados ou valida uma condicao no banco. |
| 155 | `    WHERE kanban_column.id = NEW.column_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 156 | `      AND kanban_column.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 157 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 158 | `    RAISE EXCEPTION 'A coluna não pertence ao ambiente atual';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 159 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 160 | `  IF NEW.status_id IS NOT NULL AND NOT EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 161 | `    SELECT 1 FROM public.task_statuses task_status` | Consulta dados ou valida uma condicao no banco. |
| 162 | `    WHERE task_status.id = NEW.status_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 163 | `      AND task_status.workspace_id = NEW.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 164 | `      AND NOT task_status.is_completed` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 165 | `  ) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 166 | `    RAISE EXCEPTION 'O status inicial precisa ser um status aberto do ambiente atual';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 167 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 168 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 169 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 170 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 171 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 172 | `DROP TRIGGER IF EXISTS trg_prepare_obligation ON public.obligations;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 173 | `CREATE TRIGGER trg_prepare_obligation` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 174 | `  BEFORE INSERT OR UPDATE ON public.obligations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 175 | `  FOR EACH ROW EXECUTE FUNCTION public.prepare_obligation();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 176 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 177 | `CREATE OR REPLACE FUNCTION public.obligation_matches_date(` | Define uma funcao no banco para reutilizar logica SQL. |
| 178 | `  obligation public.obligations,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 179 | `  candidate date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 180 | `)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 181 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 182 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 183 | `STABLE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 184 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 185 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 186 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 187 | `  month_start date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 188 | `  month_end date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 189 | `  target_date date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 190 | `  months_since integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 191 | `  weeks_since integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 192 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 193 | `  IF candidate < obligation.start_date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 194 | `     OR (obligation.end_date IS NOT NULL AND candidate > obligation.end_date) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 195 | `    RETURN false;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 196 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 197 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 198 | `  IF obligation.frequency = 'daily' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 199 | `    IF mod(candidate - obligation.start_date, obligation.interval_count) <> 0 THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 200 | `      RETURN false;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 201 | `    END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 202 | `    RETURN NOT obligation.business_days_only` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 203 | `      OR extract(isodow FROM candidate)::integer BETWEEN 1 AND 5;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 204 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 205 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 206 | `  IF obligation.frequency = 'weekly' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 207 | `    weeks_since := (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 208 | `      date_trunc('week', candidate)::date - date_trunc('week', obligation.start_date)::date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 209 | `    ) / 7;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 210 | `    RETURN mod(weeks_since, obligation.interval_count) = 0` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 211 | `      AND extract(isodow FROM candidate)::smallint = ANY(obligation.days_of_week);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 212 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 213 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 214 | `  month_start := date_trunc('month', candidate)::date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 215 | `  month_end := (month_start + interval '1 month - 1 day')::date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 216 | `  months_since :=` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 217 | `    (extract(year FROM candidate)::integer - extract(year FROM obligation.start_date)::integer) * 12` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 218 | `    + extract(month FROM candidate)::integer - extract(month FROM obligation.start_date)::integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 219 | `  IF mod(months_since, obligation.interval_count) <> 0 THEN RETURN false; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 220 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 221 | `  IF obligation.month_rule = 'last_day' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 222 | `    RETURN candidate = month_end;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 223 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 224 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 225 | `  IF obligation.month_rule = 'last_business_day' THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 226 | `    target_date := month_end;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 227 | `    IF extract(isodow FROM target_date)::integer = 6 THEN target_date := target_date - 1; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 228 | `    IF extract(isodow FROM target_date)::integer = 7 THEN target_date := target_date - 2; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 229 | `    RETURN candidate = target_date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 230 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 231 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 232 | `  RETURN EXISTS (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 233 | `    SELECT 1` | Consulta dados ou valida uma condicao no banco. |
| 234 | `    FROM unnest(obligation.days_of_month) configured_day` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 235 | `    WHERE candidate = make_date(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 236 | `      extract(year FROM candidate)::integer,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 237 | `      extract(month FROM candidate)::integer,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 238 | `      least(configured_day::integer, extract(day FROM month_end)::integer)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 239 | `    )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 240 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 241 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 242 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 243 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 244 | `CREATE OR REPLACE FUNCTION public.create_obligation_task(target_occurrence_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 245 | `RETURNS uuid` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 246 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 247 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 248 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 249 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 250 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 251 | `  occurrence_record record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 252 | `  obligation_record public.obligations%ROWTYPE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 253 | `  selected_status_id uuid;` | Consulta dados ou valida uma condicao no banco. |
| 254 | `  selected_column_id uuid;` | Consulta dados ou valida uma condicao no banco. |
| 255 | `  new_task_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 256 | `  next_position integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 257 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 258 | `  SELECT * INTO occurrence_record` | Consulta dados ou valida uma condicao no banco. |
| 259 | `  FROM public.obligation_occurrences` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 260 | `  WHERE id = target_occurrence_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 261 | `  FOR UPDATE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 262 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 263 | `  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 264 | `  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(occurrence_record.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 265 | `    RAISE EXCEPTION 'Você não pode criar tarefas neste ambiente';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 266 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 267 | `  IF occurrence_record.task_id IS NOT NULL THEN RETURN occurrence_record.task_id; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 268 | `  IF occurrence_record.status IN ('completed', 'skipped') THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 269 | `    RAISE EXCEPTION 'Esta ocorrência já foi encerrada';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 270 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 271 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 272 | `  SELECT * INTO obligation_record` | Consulta dados ou valida uma condicao no banco. |
| 273 | `  FROM public.obligations` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 274 | `  WHERE id = occurrence_record.obligation_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 275 | `  IF NOT FOUND THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 276 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 277 | `  selected_status_id := obligation_record.status_id;` | Consulta dados ou valida uma condicao no banco. |
| 278 | `  IF selected_status_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 279 | `    SELECT id INTO selected_status_id` | Consulta dados ou valida uma condicao no banco. |
| 280 | `    FROM public.task_statuses` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 281 | `    WHERE workspace_id = obligation_record.workspace_id AND NOT is_completed` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 282 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 283 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 284 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 285 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 286 | `  selected_column_id := obligation_record.column_id;` | Consulta dados ou valida uma condicao no banco. |
| 287 | `  IF selected_column_id IS NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 288 | `    SELECT id INTO selected_column_id` | Consulta dados ou valida uma condicao no banco. |
| 289 | `    FROM public.kanban_columns` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 290 | `    WHERE workspace_id = obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 291 | `    ORDER BY position, created_at` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 292 | `    LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 293 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 294 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 295 | `  SELECT coalesce(max(position), -1) + 1 INTO next_position` | Consulta dados ou valida uma condicao no banco. |
| 296 | `  FROM public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 297 | `  WHERE workspace_id = obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 298 | `    AND column_id IS NOT DISTINCT FROM selected_column_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 299 | `    AND deleted_at IS NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 300 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 301 | `  INSERT INTO public.tasks (` | Insere dados iniciais ou registros de apoio. |
| 302 | `    title, description, status, status_id, priority, due_date, due_time,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 303 | `    assignee_id, client_id, column_id, position, created_by, workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 304 | `  ) VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 305 | `    obligation_record.title,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 306 | `    obligation_record.description,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 307 | `    'todo'::public.task_status,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 308 | `    selected_status_id,` | Consulta dados ou valida uma condicao no banco. |
| 309 | `    obligation_record.priority,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 310 | `    (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 311 | `      occurrence_record.due_date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 312 | `      + coalesce(occurrence_record.due_time, time '12:00')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 313 | `    ) AT TIME ZONE 'America/Sao_Paulo',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 314 | `    occurrence_record.due_time,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 315 | `    obligation_record.assignee_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 316 | `    obligation_record.client_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 317 | `    selected_column_id,` | Consulta dados ou valida uma condicao no banco. |
| 318 | `    next_position,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 319 | `    obligation_record.created_by,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 320 | `    obligation_record.workspace_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 321 | `  )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 322 | `  RETURNING id INTO new_task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 323 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 324 | `  UPDATE public.obligation_occurrences` | Atualiza registros existentes no banco. |
| 325 | `  SET task_id = new_task_id, status = 'open'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 326 | `  WHERE id = occurrence_record.id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 327 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 328 | `  RETURN new_task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 329 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 330 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 331 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 332 | `CREATE OR REPLACE FUNCTION public.materialize_obligations(p_horizon_days integer DEFAULT 180)` | Define uma funcao no banco para reutilizar logica SQL. |
| 333 | `RETURNS integer` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 334 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 335 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 336 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 337 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 338 | `DECLARE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 339 | `  obligation_record public.obligations%ROWTYPE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 340 | `  candidate date;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 341 | `  generated_count integer := 0;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 342 | `  inserted_count integer;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 343 | `  occurrence_record record;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 344 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 345 | `  p_horizon_days := greatest(30, least(coalesce(p_horizon_days, 180), 730));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 346 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 347 | `  FOR obligation_record IN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 348 | `    SELECT * FROM public.obligations obligation` | Consulta dados ou valida uma condicao no banco. |
| 349 | `    WHERE obligation.is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 350 | `      AND (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 351 | `        auth.uid() IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 352 | `        OR obligation.workspace_id = public.current_workspace_id()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 353 | `      )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 354 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 355 | `    FOR candidate IN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 356 | `      SELECT day_value::date` | Consulta dados ou valida uma condicao no banco. |
| 357 | `      FROM generate_series(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 358 | `        greatest(CURRENT_DATE, obligation_record.start_date)::timestamp,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 359 | `        least(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 360 | `          CURRENT_DATE + p_horizon_days,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 361 | `          coalesce(obligation_record.end_date, CURRENT_DATE + p_horizon_days)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 362 | `        )::timestamp,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 363 | `        interval '1 day'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 364 | `      ) day_value` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 365 | `    LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 366 | `      IF public.obligation_matches_date(obligation_record, candidate) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 367 | `        INSERT INTO public.obligation_occurrences (` | Insere dados iniciais ou registros de apoio. |
| 368 | `          workspace_id, obligation_id, due_date, due_time` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 369 | `        ) VALUES (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 370 | `          obligation_record.workspace_id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 371 | `          obligation_record.id,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 372 | `          candidate,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 373 | `          obligation_record.due_time` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 374 | `        )` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 375 | `        ON CONFLICT (obligation_id, due_date) DO NOTHING;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 376 | `        GET DIAGNOSTICS inserted_count = ROW_COUNT;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 377 | `        generated_count := generated_count + inserted_count;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 378 | `      END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 379 | `    END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 380 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 381 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 382 | `  FOR occurrence_record IN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 383 | `    SELECT occurrence.id` | Consulta dados ou valida uma condicao no banco. |
| 384 | `    FROM public.obligation_occurrences occurrence` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 385 | `    JOIN public.obligations obligation ON obligation.id = occurrence.obligation_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 386 | `    WHERE occurrence.task_id IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 387 | `      AND occurrence.status = 'scheduled'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 388 | `      AND obligation.is_active` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 389 | `      AND occurrence.due_date - obligation.create_before_days <= CURRENT_DATE` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 390 | `      AND (auth.uid() IS NULL OR occurrence.workspace_id = public.current_workspace_id())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 391 | `    ORDER BY occurrence.due_date` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 392 | `  LOOP` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 393 | `    PERFORM public.create_obligation_task(occurrence_record.id);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 394 | `  END LOOP;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 395 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 396 | `  RETURN generated_count;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 397 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 398 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 399 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 400 | `CREATE OR REPLACE FUNCTION public.refresh_obligation(target_obligation_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 401 | `RETURNS integer` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 402 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 403 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 404 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 405 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 406 | `DECLARE target_workspace uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 407 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 408 | `  SELECT workspace_id INTO target_workspace FROM public.obligations WHERE id = target_obligation_id;` | Consulta dados ou valida uma condicao no banco. |
| 409 | `  IF target_workspace IS NULL THEN RAISE EXCEPTION 'Obrigação não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 410 | `  IF auth.uid() IS NOT NULL AND NOT public.has_workspace_access(target_workspace) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 411 | `    RAISE EXCEPTION 'Você não pode atualizar esta obrigação';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 412 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 413 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 414 | `  DELETE FROM public.obligation_occurrences` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 415 | `  WHERE obligation_id = target_obligation_id` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 416 | `    AND task_id IS NULL` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 417 | `    AND status = 'scheduled'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 418 | `    AND due_date >= CURRENT_DATE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 419 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 420 | `  RETURN public.materialize_obligations(365);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 421 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 422 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 423 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 424 | `CREATE OR REPLACE FUNCTION public.complete_obligation_occurrence(target_occurrence_id uuid)` | Define uma funcao no banco para reutilizar logica SQL. |
| 425 | `RETURNS boolean` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 426 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 427 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 428 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 429 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 430 | `DECLARE occurrence_record record; completed_status_id uuid;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 431 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 432 | `  SELECT * INTO occurrence_record FROM public.obligation_occurrences` | Consulta dados ou valida uma condicao no banco. |
| 433 | `  WHERE id = target_occurrence_id FOR UPDATE;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 434 | `  IF NOT FOUND THEN RAISE EXCEPTION 'Ocorrência não encontrada'; END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 435 | `  IF NOT public.has_workspace_access(occurrence_record.workspace_id) THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 436 | `    RAISE EXCEPTION 'Você não pode concluir esta ocorrência';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 437 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 438 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 439 | `  UPDATE public.obligation_occurrences` | Atualiza registros existentes no banco. |
| 440 | `  SET status = 'completed', completed_at = coalesce(completed_at, now()), completed_by = auth.uid()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 441 | `  WHERE id = target_occurrence_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 442 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 443 | `  IF occurrence_record.task_id IS NOT NULL THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 444 | `    SELECT id INTO completed_status_id FROM public.task_statuses` | Consulta dados ou valida uma condicao no banco. |
| 445 | `    WHERE workspace_id = occurrence_record.workspace_id AND is_completed` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 446 | `    ORDER BY position LIMIT 1;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 447 | `    UPDATE public.tasks` | Atualiza registros existentes no banco. |
| 448 | `    SET status = 'done'::public.task_status,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 449 | `        status_id = coalesce(completed_status_id, status_id),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 450 | `        completed_at = coalesce(completed_at, now())` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 451 | `    WHERE id = occurrence_record.task_id;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 452 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 453 | `  RETURN true;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 454 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 455 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 456 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 457 | `CREATE OR REPLACE FUNCTION public.sync_obligation_occurrence_from_task()` | Define uma funcao no banco para reutilizar logica SQL. |
| 458 | `RETURNS trigger` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 459 | `LANGUAGE plpgsql` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 460 | `SECURITY DEFINER` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 461 | `SET search_path = public` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 462 | `AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 463 | `DECLARE is_task_completed boolean;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 464 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 465 | `  is_task_completed := NEW.completed_at IS NOT NULL OR NEW.status = 'done'::public.task_status` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 466 | `    OR EXISTS (SELECT 1 FROM public.task_statuses status WHERE status.id = NEW.status_id AND status.is_completed);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 467 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 468 | `  UPDATE public.obligation_occurrences` | Atualiza registros existentes no banco. |
| 469 | `  SET status = CASE WHEN is_task_completed THEN 'completed' ELSE 'open' END,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 470 | `      completed_at = CASE WHEN is_task_completed THEN coalesce(completed_at, NEW.completed_at, now()) ELSE NULL END,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 471 | `      completed_by = CASE WHEN is_task_completed THEN coalesce(completed_by, auth.uid()) ELSE NULL END` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 472 | `  WHERE task_id = NEW.id AND status <> 'skipped';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 473 | `  RETURN NEW;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 474 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 475 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 476 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 477 | `DROP TRIGGER IF EXISTS trg_sync_obligation_occurrence_from_task ON public.tasks;` | Remove objeto antigo para permitir recriacao ou limpeza controlada. |
| 478 | `CREATE TRIGGER trg_sync_obligation_occurrence_from_task` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 479 | `  AFTER INSERT OR UPDATE OF status, status_id, completed_at ON public.tasks` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 480 | `  FOR EACH ROW EXECUTE FUNCTION public.sync_obligation_occurrence_from_task();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 481 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 482 | `REVOKE ALL ON FUNCTION public.create_obligation_task(uuid) FROM PUBLIC, anon;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 483 | `REVOKE ALL ON FUNCTION public.materialize_obligations(integer) FROM PUBLIC, anon;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 484 | `REVOKE ALL ON FUNCTION public.refresh_obligation(uuid) FROM PUBLIC, anon;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 485 | `REVOKE ALL ON FUNCTION public.complete_obligation_occurrence(uuid) FROM PUBLIC, anon;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 486 | `GRANT EXECUTE ON FUNCTION public.create_obligation_task(uuid) TO authenticated, service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 487 | `GRANT EXECUTE ON FUNCTION public.materialize_obligations(integer) TO authenticated, service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 488 | `GRANT EXECUTE ON FUNCTION public.refresh_obligation(uuid) TO authenticated, service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 489 | `GRANT EXECUTE ON FUNCTION public.complete_obligation_occurrence(uuid) TO authenticated, service_role;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 490 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 491 | `-- Existing task users receive the new page permission. Administrators also` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 492 | `-- receive it through the application-level permission list.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 493 | `UPDATE public.workspace_memberships` | Atualiza registros existentes no banco. |
| 494 | `SET permissions = array_append(permissions, 'obligations'), updated_at = now()` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 495 | `WHERE 'tasks' = ANY(permissions) AND NOT ('obligations' = ANY(permissions));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 496 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 497 | `UPDATE public.user_permissions` | Atualiza registros existentes no banco. |
| 498 | `SET permissions = array_append(permissions, 'obligations')` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 499 | `WHERE 'tasks' = ANY(permissions) AND NOT ('obligations' = ANY(permissions));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 500 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 501 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 502 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 503 | `  BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 504 | `    ALTER PUBLICATION supabase_realtime ADD TABLE public.obligations;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 505 | `  EXCEPTION WHEN duplicate_object THEN NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 506 | `  END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 507 | `  BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 508 | `    ALTER PUBLICATION supabase_realtime ADD TABLE public.obligation_occurrences;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 509 | `  EXCEPTION WHEN duplicate_object THEN NULL;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 510 | `  END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 511 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 512 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 513 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 514 | `-- If pg_cron is enabled in the project, generate upcoming occurrences and` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 515 | `-- tasks every day. The page also calls the same idempotent function as a safe` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 516 | `-- fallback whenever the module is opened.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 517 | `DO $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 518 | `DECLARE existing_job bigint;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 519 | `BEGIN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 520 | `  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'cron') THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 521 | `    SELECT jobid INTO existing_job FROM cron.job WHERE jobname = 'taskflow-obligations-daily';` | Consulta dados ou valida uma condicao no banco. |
| 522 | `    IF existing_job IS NOT NULL THEN PERFORM cron.unschedule(existing_job); END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 523 | `    PERFORM cron.schedule(` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 524 | `      'taskflow-obligations-daily',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 525 | `      '10 3 * * *',` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 526 | `      'SELECT public.materialize_obligations(180);'` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 527 | `    );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 528 | `  END IF;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 529 | `EXCEPTION WHEN insufficient_privilege OR undefined_table OR undefined_function THEN` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 530 | `  RAISE NOTICE 'pg_cron não está disponível; a página fará a materialização idempotente.';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 531 | `END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 532 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 533 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 534 | `NOTIFY pgrst, 'reload schema';` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 535 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
