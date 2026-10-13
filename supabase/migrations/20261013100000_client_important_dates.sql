-- Client dates are scoped through their parent client. Occurrences are
-- calculated by the application, so an annual date has only one stored row.
CREATE TABLE public.client_important_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120),
  event_date date NOT NULL,
  recurrence text NOT NULL DEFAULT 'annual' CHECK (recurrence IN ('annual', 'once')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX client_important_dates_client_idx ON public.client_important_dates(client_id);
ALTER TABLE public.client_important_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY client_important_dates_workspace ON public.client_important_dates
  FOR ALL TO authenticated
  USING (public.can_access_workspace_client(client_id))
  WITH CHECK (public.can_access_workspace_client(client_id));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_important_dates TO authenticated;

-- Administrative cross-workspace calendar preview remains read-only.
CREATE FUNCTION public.list_workspace_client_important_dates_for_admin_preview(target_workspace_id uuid)
RETURNS SETOF public.client_important_dates
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NOT public.can_preview_workspace_tasks(target_workspace_id) THEN
    RAISE EXCEPTION 'Você não pode visualizar as datas deste ambiente';
  END IF;

  RETURN QUERY
  SELECT important_date.*
  FROM public.client_important_dates important_date
  JOIN public.clients client ON client.id = important_date.client_id
  WHERE client.workspace_id = target_workspace_id
  ORDER BY important_date.event_date, important_date.title;
END;
$$;

GRANT EXECUTE ON FUNCTION public.list_workspace_client_important_dates_for_admin_preview(uuid) TO authenticated;
