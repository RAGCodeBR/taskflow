import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const allAdminPermissions = ["dashboard", "tasks", "notes", "import_ata", "clients", "reports", "portal", "calendar", "users", "trash", "settings"];
const clientPermissions = ["portal"];

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return response({ error: "Método não permitido." }, 405);

  try {
    const authorization = request.headers.get("Authorization");
    const token = authorization?.replace(/^Bearer\s+/i, "");
    if (!token) return response({ error: "Sessão não encontrada." }, 401);

    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authClient = createClient(projectUrl, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    if (authError || !authData.user) return response({ error: "Sessão inválida." }, 401);

    const admin = createClient(projectUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: callerRoles, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id);
    if (roleError) throw roleError;
    if (!callerRoles?.some((item) => item.role === "admin")) return response({ error: "Somente administradores podem gerenciar acessos." }, 403);

    const payload = await request.json();
    const action = payload?.action;
    const data = payload?.data ?? {};
    const role = data.role;
    if (!['admin', 'collaborator', 'client'].includes(role)) return response({ error: "Categoria de acesso inválida." }, 400);
    if (role === "client" && !validUuid(data.clientId)) return response({ error: "Selecione o cliente que será vinculado a este acesso." }, 400);
    const permissions = role === "admin" ? allAdminPermissions : role === "client" ? clientPermissions : Array.isArray(data.permissions) ? data.permissions : [];

    if (action === "create") {
      if (typeof data.fullName !== "string" || data.fullName.trim().length < 2) return response({ error: "Informe o nome completo." }, 400);
      if (typeof data.email !== "string" || !/^\S+@\S+\.\S+$/.test(data.email)) return response({ error: "Informe um e-mail válido." }, 400);
      if (typeof data.password !== "string" || data.password.length < 6) return response({ error: "A senha provisória deve ter ao menos 6 caracteres." }, 400);

      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        email_confirm: true,
        user_metadata: { full_name: data.fullName.trim(), role },
      });
      if (createError || !created.user) throw createError ?? new Error("Não foi possível criar o usuário.");

      const { error: permissionsError } = await admin.from("user_permissions").upsert({
        user_id: created.user.id,
        permissions,
        updated_by: authData.user.id,
      });
      if (permissionsError) throw permissionsError;
      if (role === "client") {
        const { error: linkError } = await admin.from("client_user_links").upsert({ user_id: created.user.id, client_id: data.clientId });
        if (linkError) throw linkError;
      }
      return response({ userId: created.user.id });
    }

    if (action === "update") {
      if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);
      if (data.userId === authData.user.id && role !== "admin") return response({ error: "Você não pode remover seu próprio acesso de administrador." }, 400);
      const { error: removeRoleError } = await admin.from("user_roles").delete().eq("user_id", data.userId);
      if (removeRoleError) throw removeRoleError;
      const { error: addRoleError } = await admin.from("user_roles").insert({ user_id: data.userId, role });
      if (addRoleError) throw addRoleError;
      const { error: permissionsError } = await admin.from("user_permissions").upsert({ user_id: data.userId, permissions, updated_by: authData.user.id });
      if (permissionsError) throw permissionsError;
      const linkQuery = admin.from("client_user_links");
      const { error: linkError } = role === "client"
        ? await linkQuery.upsert({ user_id: data.userId, client_id: data.clientId })
        : await linkQuery.delete().eq("user_id", data.userId);
      if (linkError) throw linkError;
      return response({ ok: true });
    }

    return response({ error: "Ação inválida." }, 400);
  } catch (error) {
    console.error(error);
    return response({ error: error instanceof Error ? error.message : "Não foi possível salvar o acesso." }, 400);
  }
});
