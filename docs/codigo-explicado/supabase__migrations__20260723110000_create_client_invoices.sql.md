# supabase/migrations/20260723110000_create_client_invoices.sql

Tipo: Migration SQL do Supabase.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `-- Invoices shown in the client portal. Amounts use NUMERIC to avoid currency rounding errors.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 2 | `CREATE TABLE IF NOT EXISTS public.client_invoices (` | Cria uma tabela no banco de dados Supabase/PostgreSQL. |
| 3 | `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),` | Define identificador unico principal do registro. |
| 4 | `  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,` | Define relacionamento entre tabelas por chave estrangeira. |
| 5 | `  description TEXT NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 6 | `  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 7 | `  due_date DATE NOT NULL,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 8 | `  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'paid')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 9 | `  paid_at TIMESTAMPTZ,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 10 | `  payment_method TEXT NOT NULL DEFAULT 'pix' CHECK (payment_method IN ('pix', 'boleto', 'link')),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 11 | `  payment_link TEXT,` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 12 | `  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 13 | `  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()` | Atualiza registros existentes no banco. |
| 14 | `);` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `CREATE INDEX IF NOT EXISTS client_invoices_client_due_idx ON public.client_invoices (client_id, due_date);` | Cria indice para acelerar consultas frequentes. |
| 17 | `ALTER TABLE public.client_invoices ENABLE ROW LEVEL SECURITY;` | Altera uma tabela existente, normalmente adicionando campos, chaves ou politicas. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `-- Administrators see all invoices. A client account only sees invoices for the` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 20 | `-- client_id assigned in its trusted auth app_metadata.` | Comentario da migration; explica a intencao daquele trecho SQL. |
| 21 | `CREATE POLICY client_invoices_read_admin_or_own_client ON public.client_invoices` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 22 | `  FOR SELECT TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 23 | `  USING (` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 24 | `    public.has_role(auth.uid(), 'admin'::public.app_role)` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 25 | `    OR client_id = NULLIF(auth.jwt() -> 'app_metadata' ->> 'client_id', '')::UUID` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 26 | `  );` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 27 | `CREATE POLICY client_invoices_admin_manage ON public.client_invoices` | Cria uma regra de seguranca RLS para controlar acesso aos dados. |
| 28 | `  FOR ALL TO authenticated` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 29 | `  USING (public.has_role(auth.uid(), 'admin'::public.app_role))` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 30 | `  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `CREATE OR REPLACE FUNCTION public.set_client_invoices_updated_at()` | Define uma funcao no banco para reutilizar logica SQL. |
| 33 | `RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 34 | `BEGIN NEW.updated_at = now(); RETURN NEW; END;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 35 | `$$;` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 36 | `CREATE TRIGGER trg_client_invoices_updated_at BEFORE UPDATE ON public.client_invoices` | Cria gatilho que executa uma funcao automaticamente em eventos da tabela. |
| 37 | `  FOR EACH ROW EXECUTE FUNCTION public.set_client_invoices_updated_at();` | Executa parte da mudanca estrutural ou de seguranca do banco. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
