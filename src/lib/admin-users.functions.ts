import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const userAccessSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
  role: z.enum(["admin", "collaborator", "client"]),
  permissions: z.array(z.string()).max(20),
  clientId: z.string().uuid().nullable().or(z.literal("")),
});

async function requireAdmin(userId: string | null) {
  if (!userId) throw new Response("Unauthorized", { status: 401 });
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
  if (error) throw new Error(error.message);
  if (!data?.some((row: { role: string }) => row.role === "admin")) throw new Response("Forbidden", { status: 403 });
  return supabaseAdmin;
}

export const createUserAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => userAccessSchema.parse(data))
  .handler(async ({ data, context }) => {
    const callerId = (context as any)?.userId ?? null;
    const supabaseAdmin = await requireAdmin(callerId);
    if (data.role === "client" && !data.clientId) throw new Error("Selecione o cliente que será vinculado a este acesso.");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName, role: data.role },
    });
    if (error) throw new Error(error.message);
    if (!created.user) throw new Error("Não foi possível criar o usuário.");

    const { error: permissionsError } = await supabaseAdmin.from("user_permissions").upsert({
      user_id: created.user.id,
      permissions: data.role === "admin" ? ["dashboard", "tasks", "import_ata", "clients", "reports", "mural", "portal_entregas", "portal_financeiro", "users", "trash", "settings"] : data.role === "client" ? ["portal_entregas", "portal_financeiro"] : data.permissions,
      updated_by: callerId,
    });
    if (permissionsError) throw new Error(permissionsError.message);
    if (data.role === "client" && data.clientId) {
      const { error: linkError } = await (supabaseAdmin.from("client_user_links" as any) as any).upsert({ user_id: created.user.id, client_id: data.clientId });
      if (linkError) throw new Error(linkError.message);
    }
    return { userId: created.user.id };
  });

export const updateUserAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ userId: z.string().uuid(), role: z.enum(["admin", "collaborator", "client"]), permissions: z.array(z.string()).max(20), clientId: z.string().uuid().nullable().or(z.literal("")) }).parse(data))
  .handler(async ({ data, context }) => {
    const callerId = (context as any)?.userId ?? null;
    const supabaseAdmin = await requireAdmin(callerId);
    if (data.role === "client" && !data.clientId) throw new Error("Selecione o cliente que será vinculado a este acesso.");
    if (data.userId === callerId && data.role !== "admin") throw new Error("Você não pode remover seu próprio acesso de administrador.");
    const { error: roleError } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    if (roleError) throw new Error(roleError.message);
    const { error: insertRoleError } = await supabaseAdmin.from("user_roles").insert({ user_id: data.userId, role: data.role });
    if (insertRoleError) throw new Error(insertRoleError.message);
    const { error: permissionsError } = await supabaseAdmin.from("user_permissions").upsert({ user_id: data.userId, permissions: data.role === "admin" ? ["dashboard", "tasks", "import_ata", "clients", "reports", "mural", "portal_entregas", "portal_financeiro", "users", "trash", "settings"] : data.role === "client" ? ["portal_entregas", "portal_financeiro"] : data.permissions, updated_by: callerId });
    if (permissionsError) throw new Error(permissionsError.message);
    if (data.role === "client" && data.clientId) {
      const { error: linkError } = await (supabaseAdmin.from("client_user_links" as any) as any).upsert({ user_id: data.userId, client_id: data.clientId });
      if (linkError) throw new Error(linkError.message);
    } else {
      const { error: unlinkError } = await (supabaseAdmin.from("client_user_links" as any) as any).delete().eq("user_id", data.userId);
      if (unlinkError) throw new Error(unlinkError.message);
    }
    return { ok: true };
  });

export const deleteUserCompletely = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const callerId = (context as any)?.userId ?? null;

    // Verify caller is admin
    const { data: callerRoles, error: rolesErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerId ?? "");
    if (rolesErr) throw new Error(rolesErr.message);
    if (!callerRoles?.some((r: { role: string }) => r.role === "admin")) {
      throw new Response("Forbidden", { status: 403 });
    }
    if (data.userId === callerId) {
      throw new Error("Você não pode excluir a si mesmo.");
    }

    const uid = data.userId;

    // Wipe user-owned content in public schema. Order matters for FKs.
    const tasksRes = await supabaseAdmin
      .from("tasks")
      .select("id")
      .or(`assignee_id.eq.${uid},created_by.eq.${uid}`);
    const taskIds = (tasksRes.data ?? []).map((t: any) => t.id);

    if (taskIds.length) {
      await supabaseAdmin.from("subtasks").delete().in("task_id", taskIds);
      await supabaseAdmin.from("task_tag_links").delete().in("task_id", taskIds);
      await supabaseAdmin.from("task_interruptions").delete().in("task_id", taskIds);
      await supabaseAdmin.from("task_history").delete().in("task_id", taskIds);
      await supabaseAdmin.from("comments").delete().in("task_id", taskIds);
      await supabaseAdmin.from("attachments").delete().in("task_id", taskIds);
      await supabaseAdmin.from("tasks").delete().in("id", taskIds);
    }

    // Other user-scoped rows
    await supabaseAdmin.from("task_interruptions").delete().eq("user_id", uid);
    await supabaseAdmin.from("comments").delete().eq("author_id", uid);
    await supabaseAdmin.from("client_note_attachments").delete().eq("uploaded_by", uid);
    await supabaseAdmin.from("client_notes").delete().eq("created_by", uid);
    await supabaseAdmin.from("client_files").delete().eq("uploaded_by", uid);
    // tags/statuses/columns are global — never delete on user removal
    await supabaseAdmin.from("user_column_order").delete().eq("user_id", uid);
    await supabaseAdmin.from("user_task_order").delete().eq("user_id", uid);
    await supabaseAdmin.from("board_preferences").delete().eq("user_id", uid);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", uid);
    await supabaseAdmin.from("profiles").delete().eq("id", uid);

    // Finally remove auth user
    const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(uid);
    if (authErr) throw new Error(authErr.message);

    return { ok: true };
  });
