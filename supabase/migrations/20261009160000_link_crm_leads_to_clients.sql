-- A empresa pode ser um cliente cadastrado ou apenas um nome no lead.
-- A coluna company_name existente preserva os leads anteriores e serve como
-- nome de referência caso o cadastro vinculado seja removido.
ALTER TABLE public.crm_opportunities
  ADD COLUMN client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL;

CREATE INDEX crm_opportunities_client_id_idx
  ON public.crm_opportunities (client_id)
  WHERE client_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.crm_validate_client_workspace()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.client_id IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM public.clients c
    WHERE c.id = NEW.client_id AND c.workspace_id = NEW.workspace_id
  ) THEN
    RAISE EXCEPTION 'A empresa selecionada não pertence ao ambiente do lead';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER crm_opportunities_client_workspace
  BEFORE INSERT OR UPDATE OF client_id, workspace_id ON public.crm_opportunities
  FOR EACH ROW EXECUTE FUNCTION public.crm_validate_client_workspace();

NOTIFY pgrst, 'reload schema';
