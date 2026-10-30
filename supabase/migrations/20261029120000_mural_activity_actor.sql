-- Record the authenticated actor of visible mural activity. Existing posts stay
-- unattributed until the next real action; the creator is not the last editor.
ALTER TABLE public.mural_posts
  ADD COLUMN last_activity_by uuid,
  ADD COLUMN last_activity_at timestamptz;

CREATE FUNCTION public.track_mural_post_activity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF (to_jsonb(NEW) - ARRAY[
      'id', 'created_by', 'created_at', 'updated_at', 'workspace_id',
      'canvas_x', 'canvas_y', 'last_activity_by', 'last_activity_at'
    ]) IS NOT DISTINCT FROM (to_jsonb(OLD) - ARRAY[
      'id', 'created_by', 'created_at', 'updated_at', 'workspace_id',
      'canvas_x', 'canvas_y', 'last_activity_by', 'last_activity_at'
    ]) THEN
      NEW.last_activity_by := OLD.last_activity_by;
      NEW.last_activity_at := OLD.last_activity_at;
      RETURN NEW;
    END IF;
  END IF;

  -- Also covers updates replayed from the offline queue under that person's session.
  -- No session means no known actor; never attribute background jobs to the author.
  NEW.last_activity_by := auth.uid();
  NEW.last_activity_at := statement_timestamp();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.track_mural_post_activity() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER trg_track_mural_post_activity
  BEFORE INSERT OR UPDATE ON public.mural_posts
  FOR EACH ROW EXECUTE FUNCTION public.track_mural_post_activity();
