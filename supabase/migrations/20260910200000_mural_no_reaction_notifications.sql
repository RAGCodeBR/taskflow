-- Reagir a um recado do mural não notifica mais ninguém.
--
-- O único evento do mural que gera notificação passa a ser: recado novo, ou
-- edição de título/texto de um recado existente.

DROP TRIGGER IF EXISTS trg_notify_mural_reaction ON public.mural_post_reactions;
DROP FUNCTION IF EXISTS public.notify_mural_reaction_activity();

-- Limpa o que essas reações já geraram (o histórico de mural_post já foi zerado
-- em 20260910160000; mural_reaction pode ter voltado a acumular desde então).
DELETE FROM public.notifications WHERE type = 'mural_reaction';
