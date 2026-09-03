-- Participação passa a valer somente para quem está FORA do ambiente da tarefa.
--
-- A versão anterior concedia acesso por participação a qualquer pessoa ligada à
-- tarefa, sem olhar se ela já pertencia ao ambiente dela. Consequência para um
-- administrador, que é membro dos dois ambientes: toda tarefa da Consultoria em
-- que ele fosse responsável ou criador virava "participação" quando ele estava
-- no Marketing, e o quadro do Marketing passava a despejar o histórico inteiro
-- da Consultoria. Não era um caso de borda — era o volume normal de trabalho.
--
-- E, por tabela, o gatilho guard_cross_workspace_task_update() tratava esse
-- mesmo administrador como forasteiro na própria tarefa, bloqueando trocar
-- cliente, mover de coluna e excluir.
--
-- Regra correta: quem é membro do ambiente da tarefa a alcança trocando de
-- ambiente, com todos os direitos. Participação existe para o caso que a
-- associação não cobre — alguém do Marketing marcado numa tarefa da Consultoria,
-- que nunca vai ser membro da Consultoria (set_marketing_user_access recusa).

CREATE OR REPLACE FUNCTION public.participates_in_task(_task_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tasks t
    WHERE t.id = _task_id
      -- Membro do ambiente da tarefa não entra por aqui: ele já tem o caminho
      -- normal, e conceder acesso extra faria um quadro derramar no outro.
      AND NOT EXISTS (
        SELECT 1 FROM public.workspace_memberships m
        WHERE m.workspace_id = t.workspace_id AND m.user_id = auth.uid()
      )
      -- Os três vínculos de atribuição do sistema. created_by saiu de propósito:
      -- criar uma tarefa para o outro ambiente não é participar do trabalho
      -- dela, e era o que mais poluía o quadro de destino.
      AND (
        t.assignee_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.task_collaborators tc
          WHERE tc.task_id = t.id AND tc.collaborator_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.subtasks s
          WHERE s.task_id = t.id AND s.assignee_id = auth.uid()
        )
      )
  )
$$;

NOTIFY pgrst, 'reload schema';
