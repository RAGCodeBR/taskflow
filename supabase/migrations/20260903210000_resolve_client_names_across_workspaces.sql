-- Exibir o nome do cliente de uma tarefa lançada para o outro ambiente.
--
-- O gatilho assign_task_workspace() já remapeia o cliente para o gêmeo do
-- ambiente de destino (via source_client_id), que é o comportamento correto: a
-- tarefa do Marketing aponta para o cliente do Marketing, não para o da
-- Consultoria. Mas o card, renderizado no ambiente de origem, faz
-- clients.find(...) sobre uma lista que a RLS restringe ao ambiente ativo — e
-- não encontra o cliente do outro lado. O card então mostra "Adicionar
-- cliente", como se o dado tivesse se perdido.
--
-- Esta função existe só para resolver a exibição. Devolve o mínimo — id, nome e
-- cor — dos clientes dos ambientes a que a pessoa pertence. Nada de CNPJ,
-- endereço, contato ou qualquer outro campo do cadastro.
--
-- Os seletores de cliente continuam usando a consulta normal à tabela,
-- restrita ao ambiente ativo: eles não devem oferecer o cliente do outro lado.

CREATE OR REPLACE FUNCTION public.list_related_client_names()
RETURNS TABLE (id uuid, name text, color text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.name, c.color
  FROM public.clients c
  WHERE EXISTS (
    SELECT 1 FROM public.workspace_memberships m
    WHERE m.user_id = auth.uid() AND m.workspace_id = c.workspace_id
  )
$$;

REVOKE ALL ON FUNCTION public.list_related_client_names() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_related_client_names() TO authenticated;

NOTIFY pgrst, 'reload schema';
