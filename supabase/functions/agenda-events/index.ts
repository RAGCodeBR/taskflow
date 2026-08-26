import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) throw new Error("Sessão não encontrada.");
    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const auth = createClient(projectUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    });
    const { data: authData, error: authError } = await auth.auth.getUser();
    if (authError || !authData.user) throw new Error("Sessão inválida.");
    const admin = createClient(projectUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: roles, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id);
    if (roleError) throw roleError;
    if (!roles?.some((role) => role.role === "admin" || role.role === "collaborator"))
      throw new Error("Sua conta não possui acesso à Agenda.");
    const { data, error } = await admin
      .from("calendar_events")
      .select("*")
      .is("deleted_at", null)
      .order("starts_at", { ascending: true });
    if (error) throw error;
    return json({ events: data ?? [] });
  } catch (error) {
    console.error(error);
    return json(
      { error: error instanceof Error ? error.message : "Não foi possível carregar a Agenda." },
      400,
    );
  }
});
