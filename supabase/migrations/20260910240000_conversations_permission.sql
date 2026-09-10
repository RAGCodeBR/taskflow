-- Nova área "Conversas" (chat por tarefa) no menu e na tela "Definir acessos".
-- A permissão entra no padrão de colaborador: conversar sobre a tarefa é uso do
-- dia a dia. Retroativo para os colaboradores que já existem, nas duas fontes
-- de permissão (user_permissions e workspace_memberships) — como foi feito nos
-- ajustes anteriores desta sprint.

WITH alvo AS (
  SELECT p.id
  FROM public.profiles p
  JOIN public.user_roles ur ON ur.user_id = p.id AND ur.role = 'collaborator'
)
UPDATE public.user_permissions up
SET permissions = (
      SELECT array_agg(DISTINCT perm)
      FROM unnest(up.permissions || ARRAY['conversations']) AS perm
    ),
    updated_at = now()
FROM alvo
WHERE up.user_id = alvo.id
  AND NOT (up.permissions @> ARRAY['conversations']);

WITH alvo AS (
  SELECT p.id
  FROM public.profiles p
  JOIN public.user_roles ur ON ur.user_id = p.id AND ur.role = 'collaborator'
)
UPDATE public.workspace_memberships m
SET permissions = (
      SELECT array_agg(DISTINCT perm)
      FROM unnest(m.permissions || ARRAY['conversations']) AS perm
    ),
    updated_at = now()
FROM alvo
WHERE m.user_id = alvo.id
  AND NOT (m.permissions @> ARRAY['conversations']);
