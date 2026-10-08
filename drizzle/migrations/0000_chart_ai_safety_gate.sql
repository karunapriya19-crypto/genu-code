CREATE TABLE public.chart_ai_gate (
 id text PRIMARY KEY DEFAULT 'chart-explanation',
 paused boolean NOT NULL DEFAULT false,
 reason text,
 status integer,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.chart_ai_gate TO service_role;
ALTER TABLE public.chart_ai_gate ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.chart_ai_usage (
 user_id uuid PRIMARY KEY,
 window_started timestamptz NOT NULL DEFAULT now(),
 requests integer NOT NULL DEFAULT 0
);
GRANT ALL ON public.chart_ai_usage TO service_role;
ALTER TABLE public.chart_ai_usage ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.reserve_chart_explanation(p_user_id uuid) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE n integer;
BEGIN
 INSERT INTO public.chart_ai_usage (user_id, requests) VALUES (p_user_id, 1)
 ON CONFLICT (user_id) DO UPDATE SET
 requests = CASE WHEN chart_ai_usage.window_started < now() - interval '1 hour' THEN 1 ELSE chart_ai_usage.requests + 1 END,
 window_started = CASE WHEN chart_ai_usage.window_started < now() - interval '1 hour' THEN now() ELSE chart_ai_usage.window_started END
 WHERE chart_ai_usage.window_started < now() - interval '1 hour' OR chart_ai_usage.requests < 10
 RETURNING requests INTO n;
 RETURN n IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.reserve_chart_explanation(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reserve_chart_explanation(uuid) TO service_role;