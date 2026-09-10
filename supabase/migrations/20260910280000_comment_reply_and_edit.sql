-- Responder citando outra mensagem e editar a própria mensagem na conversa.

ALTER TABLE public.comments
  ADD COLUMN IF NOT EXISTS reply_to_id uuid REFERENCES public.comments(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS edited_at timestamptz;

CREATE INDEX IF NOT EXISTS comments_reply_to_idx ON public.comments (reply_to_id);

-- Só o autor edita o texto da própria mensagem (admin também pode, para
-- moderação). Qualquer edição do corpo carimba edited_at — o "editado" na tela
-- vem daí, não da confiança no cliente.
CREATE OR REPLACE FUNCTION public.guard_comment_edit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;
  IF NEW.body IS DISTINCT FROM OLD.body THEN
    IF auth.uid() <> OLD.author_id AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
      RAISE EXCEPTION 'Só o autor pode editar a própria mensagem';
    END IF;
    NEW.edited_at := now();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guard_comment_edit ON public.comments;
CREATE TRIGGER trg_guard_comment_edit
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.guard_comment_edit();
