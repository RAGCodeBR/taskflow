import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const allAdminPermissions = [
  "dashboard",
  "tasks",
  "requests",
  "import_ata",
  "clients",
  "reports",
  "mural",
  "agenda",
  "portal_entregas",
  "portal_financeiro",
  "users",
  "trash",
  "settings",
];
const clientPermissions = ["portal_entregas", "portal_financeiro"];
const marketingManagerEmail = "reinangrupoahouse@gmail.com";
const validPermissions = new Set([
  "dashboard",
  "tasks",
  "requests",
  "import_ata",
  "clients",
  "reports",
  "mural",
  "agenda",
  "portal_entregas",
  "portal_financeiro",
  "trash",
  "settings",
]);

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
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
    const authClient = createClient(projectUrl, anonKey, {
      global: { headers: { Authorization: authorization } },
    });
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    if (authError || !authData.user) return response({ error: "Sessão inválida." }, 401);

    const admin = createClient(projectUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data: callerRoles, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id);
    if (roleError) throw roleError;
    if (!callerRoles?.some((item) => item.role === "admin"))
      return response({ error: "Somente administradores podem gerenciar acessos." }, 403);
    const isMarketingManager = authData.user.email?.trim().toLowerCase() === marketingManagerEmail;
    if (!isMarketingManager)
      return response({ error: "Somente o responsável pode gerenciar os acessos de usuários." }, 403);

    const payload = await request.json();
    const action = payload?.action;
    const data = payload?.data ?? {};
    const role = data.role;
    if (!["create", "update", "delete"].includes(action))
      return response({ error: "Ação inválida." }, 400);
    if (action !== "delete" && !["admin", "collaborator", "client"].includes(role))
      return response({ error: "Categoria de acesso inválida." }, 400);
    if (action !== "delete" && role === "client" && !validUuid(data.clientId))
      return response({ error: "Selecione o cliente que será vinculado a este acesso." }, 400);
    if (action === "create" && data.marketingAccess === true && role === "client")
      return response({ error: "O acesso de cliente deve permanecer vinculado à Consultoria." }, 400);
    const permissions =
      action === "delete"
        ? []
        : role === "admin"
          ? allAdminPermissions
          : Array.isArray(data.permissions)
            ? data.permissions.filter(
                (permission): permission is string =>
                  typeof permission === "string" && validPermissions.has(permission),
              )
            : role === "client"
              ? clientPermissions
              : [];

    if (action === "create") {
      if (typeof data.fullName !== "string" || data.fullName.trim().length < 2)
        return response({ error: "Informe o nome completo." }, 400);
      if (typeof data.email !== "string" || !/^\S+@\S+\.\S+$/.test(data.email))
        return response({ error: "Informe um e-mail válido." }, 400);
      const invitedEmail = data.email.trim().toLowerCase();
      const { error: allowInvitationError } = await admin.from("access_invitations").upsert({
        email: invitedEmail,
        invited_by: authData.user.id,
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      });
      if (allowInvitationError) throw allowInvitationError;
      const redirectTo = Deno.env.get("INVITE_REDIRECT_URL");
      const { data: created, error: createError } = await admin.auth.admin.inviteUserByEmail(
        invitedEmail,
        {
          ...(redirectTo ? { redirectTo } : {}),
          data: { full_name: data.fullName.trim() },
        },
      );
      if (createError || !created.user)
        throw createError ?? new Error("Não foi possível enviar o convite.");

      // The database trigger creates every invited account as a collaborator
      // first. Replace that temporary role with the category selected by the
      // administrator; roles must never come from browser-controlled metadata.
      const { error: removeRoleError } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", created.user.id);
      if (removeRoleError) throw removeRoleError;
      const { error: addRoleError } = await admin
        .from("user_roles")
        .insert({ user_id: created.user.id, role });
      if (addRoleError) throw addRoleError;

      const { error: permissionsError } = await admin.from("user_permissions").upsert({
        user_id: created.user.id,
        permissions,
        updated_by: authData.user.id,
      });
      if (permissionsError) throw permissionsError;
      if (role === "client") {
        const { error: linkError } = await admin
          .from("client_user_links")
          .upsert({ user_id: created.user.id, client_id: data.clientId });
        if (linkError) throw linkError;
      }
      if (data.marketingAccess === true) {
        const { data: marketingWorkspace, error: marketingWorkspaceError } = await admin
          .from("workspaces")
          .select("id")
          .eq("slug", "marketing")
          .single();
        if (marketingWorkspaceError || !marketingWorkspace) {
          throw marketingWorkspaceError ?? new Error("Ambiente Marketing não encontrado.");
        }
        const { data: consultoriaWorkspace, error: consultoriaWorkspaceError } = await admin
          .from("workspaces")
          .select("id")
          .eq("slug", "consultoria")
          .single();
        if (consultoriaWorkspaceError || !consultoriaWorkspace) {
          throw consultoriaWorkspaceError ?? new Error("Ambiente Consultoria não encontrado.");
        }
        const { error: membershipError } = await admin.from("workspace_memberships").upsert({
          workspace_id: marketingWorkspace.id,
          user_id: created.user.id,
          role,
          permissions,
          access_grant: "manual",
        });
        if (membershipError) throw membershipError;
        const { error: removeConsultoriaMembershipError } = await admin
          .from("workspace_memberships")
          .delete()
          .eq("workspace_id", consultoriaWorkspace.id)
          .eq("user_id", created.user.id);
        if (removeConsultoriaMembershipError) throw removeConsultoriaMembershipError;
        const { error: activeWorkspaceError } = await admin
          .from("profiles")
          .update({ active_workspace_id: marketingWorkspace.id })
          .eq("id", created.user.id);
        if (activeWorkspaceError) throw activeWorkspaceError;
      }
      return response({ userId: created.user.id });
    }

    if (action === "update") {
      if (typeof data.fullName !== "string" || data.fullName.trim().length < 2)
        return response({ error: "Informe o nome completo." }, 400);
      if (
        data.password !== undefined &&
        (typeof data.password !== "string" || data.password.length < 6)
      )
        return response({ error: "A nova senha deve ter ao menos 6 caracteres." }, 400);
      if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);
      if (data.userId === authData.user.id && role !== "admin")
        return response(
          { error: "Você não pode remover seu próprio acesso de administrador." },
          400,
        );
      const authUpdate = {
        // The Admin API accepts user_metadata (not the client-side `data`
        // property). Using `data` made every access update be rejected by GoTrue.
        user_metadata: { full_name: data.fullName.trim(), role },
        ...(data.password ? { password: data.password } : {}),
      };
      const { error: authUpdateError } = await admin.auth.admin.updateUserById(
        data.userId,
        authUpdate,
      );
      if (authUpdateError) throw authUpdateError;
      const { error: profileUpdateError } = await admin
        .from("profiles")
        .update({ full_name: data.fullName.trim() })
        .eq("id", data.userId);
      if (profileUpdateError) throw profileUpdateError;
      const { error: removeRoleError } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId);
      if (removeRoleError) throw removeRoleError;
      const { error: addRoleError } = await admin
        .from("user_roles")
        .insert({ user_id: data.userId, role });
      if (addRoleError) throw addRoleError;
      const { error: permissionsError } = await admin
        .from("user_permissions")
        .upsert({ user_id: data.userId, permissions, updated_by: authData.user.id });
      if (permissionsError) throw permissionsError;
      const linkQuery = admin.from("client_user_links");
      const { error: linkError } =
        role === "client"
          ? await linkQuery.upsert({ user_id: data.userId, client_id: data.clientId })
          : await linkQuery.delete().eq("user_id", data.userId);
      if (linkError) throw linkError;
      return response({ ok: true });
    }

    if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);
    if (data.userId === authData.user.id)
      return response({ error: "Você não pode excluir seu próprio acesso." }, 400);
    const { error: deleteError } = await admin.auth.admin.deleteUser(data.userId);
    if (deleteError) throw deleteError;
    return response({ ok: true });

    return response({ error: "Ação inválida." }, 400);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Não foi possível salvar o acesso.";
    // Returning a JSON payload with a successful transport status lets the
    // browser show the provider's real message instead of Supabase's empty
    // FunctionsHttpError object. The `error` field is still handled as a
    // failed operation by the caller.
    return response({ error: message });
  }
});
