/**
 * Confere, no servidor, as mesmas permissões que o menu usa no navegador
 * (ver `use-auth.tsx`): administradores têm tudo; os demais usam as permissões
 * do ambiente ativo e, sem ambiente, as permissões gerais do usuário.
 *
 * As leituras passam pelo cliente autenticado da própria pessoa, então o banco
 * só devolve os registros de acesso dela. Qualquer falha de leitura nega o
 * acesso, em vez de liberar por engano.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AccessClient = { from: (table: string) => any; rpc: (fn: string) => any };

export class PermissionDeniedError extends Error {
  constructor(message = "Você não tem permissão para esta ação.") {
    super(message);
    this.name = "PermissionDeniedError";
  }
}

export async function resolveServerAccess(supabase: AccessClient, userId: string) {
  const [rolesResult, workspaceResult, membershipsResult, permissionsResult] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", userId),
    supabase.rpc("current_workspace_id"),
    supabase
      .from("workspace_memberships")
      .select("workspace_id, permissions")
      .eq("user_id", userId),
    supabase.from("user_permissions").select("permissions").eq("user_id", userId).maybeSingle(),
  ]);
  if (rolesResult.error || membershipsResult.error || permissionsResult.error) {
    throw new PermissionDeniedError("Não foi possível confirmar suas permissões. Tente novamente.");
  }

  const roles = ((rolesResult.data ?? []) as Array<{ role: string }>).map((row) => row.role);
  const isAdmin = roles.includes("admin");
  const memberships = (membershipsResult.data ?? []) as Array<{
    workspace_id: string;
    permissions: unknown;
  }>;
  const activeWorkspaceId = workspaceResult.error
    ? null
    : ((workspaceResult.data as string | null) ?? null);
  const activeMembership = activeWorkspaceId
    ? (memberships.find((membership) => membership.workspace_id === activeWorkspaceId) ?? null)
    : (memberships[0] ?? null);
  const general = (permissionsResult.data as { permissions?: unknown } | null)?.permissions;
  const source = activeMembership ? activeMembership.permissions : general;
  const permissions = Array.isArray(source)
    ? source.filter((item): item is string => typeof item === "string")
    : [];

  return { isAdmin, roles, activeWorkspaceId, permissions };
}

/** Lança `PermissionDeniedError` quando a pessoa não tem nenhuma das permissões pedidas. */
export async function requireServerPermission(
  supabase: AccessClient,
  userId: string | null | undefined,
  anyOf: readonly string[],
) {
  if (!userId) throw new PermissionDeniedError("Sessão expirada. Entre novamente.");
  const access = await resolveServerAccess(supabase, userId);
  if (!access.isAdmin && !anyOf.some((permission) => access.permissions.includes(permission))) {
    throw new PermissionDeniedError();
  }
  return access;
}
