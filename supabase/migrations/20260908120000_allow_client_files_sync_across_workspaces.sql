-- Anexar um arquivo numa tarefa lançada para o outro ambiente falhava na metade.
--
-- syncTaskAttachmentToClient() é um efeito colateral automático: todo anexo de
-- tarefa com cliente vinculado é copiado também para a ficha do cliente
-- (client_files). Quando a tarefa foi lançada para o outro ambiente, o cliente
-- dela foi remapeado para o gêmeo de lá (assign_task_workspace, migration
-- 20260903122000) — de propósito, para nunca gravar cliente do ambiente errado
-- numa tarefa. Mas isso deixou client_files inacessível para quem lançou: o
-- upload em Storage e o INSERT em attachments já tinham sido corrigidos
-- (20260903170000), e o app então desfazia os dois para não deixar o anexo pela
-- metade — daí o "0 de 1 arquivos foram enviados".
--
-- can_access_workspace_client() protege também client_departments,
-- client_system_accesses (credenciais de acesso a sistemas do cliente),
-- client_notes, client_invoices e client_branches. Estendê-la abriria todo esse
-- cadastro sensível a quem só deveria poder anexar um arquivo pela tarefa —
-- por isso o conserto é uma função própria, usada somente pela policy de
-- client_files, e não uma mudança na função compartilhada.

CREATE OR REPLACE FUNCTION public.can_sync_client_file_from_task(_client_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.can_access_workspace_client(_client_id)
    OR EXISTS (
      SELECT 1 FROM public.clients c
      WHERE c.id = _client_id
        AND (
          -- Administrador associado ao ambiente de destino, preenchendo a
          -- tarefa (e a ficha do cliente dela) que acabou de lançar lá.
          public.can_create_in_workspace(c.workspace_id)
          -- Pessoa de outro ambiente marcada numa tarefa deste cliente.
          OR EXISTS (
            SELECT 1 FROM public.tasks t
            WHERE t.client_id = _client_id AND public.participates_in_task(t.id)
          )
        )
    )
$$;

REVOKE ALL ON FUNCTION public.can_sync_client_file_from_task(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_sync_client_file_from_task(uuid) TO authenticated;

DROP POLICY IF EXISTS workspace_client_files_parent ON public.client_files;
CREATE POLICY workspace_client_files_parent ON public.client_files
  FOR ALL TO authenticated
  USING (public.can_sync_client_file_from_task(client_id))
  WITH CHECK (public.can_sync_client_file_from_task(client_id));

NOTIFY pgrst, 'reload schema';
