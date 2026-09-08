-- Sem isto as subscriptions de postgres_changes que o front abre para
-- "attachments" nunca recebem evento nenhum: a tabela precisa estar na
-- publicação do Realtime, independente de RLS ou de qualquer subscription do
-- lado do cliente. comments e subtasks já foram adicionadas quando ganharam
-- realtime; attachments ficou de fora até agora.

ALTER PUBLICATION supabase_realtime ADD TABLE public.attachments;
