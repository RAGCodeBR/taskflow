import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  addOfflineConflict,
  isOffline,
  listOfflineOperations,
  removeOfflineOperation,
  replaceOfflineOperation,
  type OfflineOperation,
} from "@/lib/offline-sync";

type SyncClient = ReturnType<typeof createClient<Database>>;

const sameValue = (first: unknown, second: unknown) => JSON.stringify(first) === JSON.stringify(second);

async function storeTaskFieldConflicts(operation: OfflineOperation, server: Record<string, unknown>) {
  const patch = (operation.payload.patch ?? {}) as Record<string, unknown>;
  const baseValues = operation.baseValues ?? {};
  const conflictingFields = Object.keys(patch).filter(
    (field) => !sameValue(server[field], baseValues[field]),
  );

  await Promise.all(
    conflictingFields.map((field) =>
      addOfflineConflict({
        operationId: operation.id,
        userId: operation.userId,
        entity: operation.entity,
        entityId: operation.entityId,
        field,
        serverValue: server[field],
        localValue: patch[field],
        serverUpdatedAt: (server.updated_at as string | null | undefined) ?? null,
      }),
    ),
  );

  return conflictingFields;
}

async function syncTaskUpdate(client: SyncClient, operation: OfflineOperation) {
  const { data, error } = await client.from("tasks").select("*").eq("id", operation.entityId).single();
  if (error) throw error;
  const server = data as Record<string, unknown>;
  const changedOnServer = operation.baseUpdatedAt && server.updated_at !== operation.baseUpdatedAt;
  const patch = (operation.payload.patch ?? {}) as Record<string, unknown>;

  if (!changedOnServer) {
    const { error: updateError } = await (client.from("tasks") as any).update(patch).eq("id", operation.entityId);
    if (updateError) throw updateError;
    return false;
  }

  const conflictingFields = await storeTaskFieldConflicts(operation, server);
  const safePatch = Object.fromEntries(
    Object.entries(patch).filter(([field]) => !conflictingFields.includes(field)),
  );
  if (Object.keys(safePatch).length > 0) {
    const { error: updateError } = await (client.from("tasks") as any).update(safePatch).eq("id", operation.entityId);
    if (updateError) throw updateError;
  }
  return conflictingFields.length > 0;
}

async function syncTaskDelete(client: SyncClient, operation: OfflineOperation) {
  const { data, error } = await client.from("tasks").select("*").eq("id", operation.entityId).maybeSingle();
  if (error) throw error;
  if (!data) return false;
  const server = data as Record<string, unknown>;
  if (operation.baseUpdatedAt && server.updated_at !== operation.baseUpdatedAt) {
    await addOfflineConflict({
      operationId: operation.id,
      userId: operation.userId,
      entity: "task",
      entityId: operation.entityId,
      field: "__deleted",
      serverValue: server,
      localValue: operation.payload.task,
      serverUpdatedAt: (server.updated_at as string | null | undefined) ?? null,
    });
    return true;
  }
  const { error: deleteError } = await client.from("tasks").delete().eq("id", operation.entityId);
  if (deleteError) throw deleteError;
  return false;
}

async function syncOperation(client: SyncClient, operation: OfflineOperation) {
  if (operation.entity === "task") {
    if (operation.action === "create") {
      const { error } = await (client.from("tasks") as any).insert(operation.payload.task);
      if (error) throw error;
      return false;
    }
    if (operation.action === "update") return syncTaskUpdate(client, operation);
    return syncTaskDelete(client, operation);
  }

  if (operation.entity === "subtask") {
    if (operation.action === "create") {
      const { error } = await (client.from("subtasks") as any).insert(operation.payload.subtask);
      if (error) throw error;
      return false;
    }
    if (operation.action === "update") {
      const { error } = await (client.from("subtasks") as any).update(operation.payload.patch).eq("id", operation.entityId);
      if (error) throw error;
      return false;
    }
    const { error } = await client.from("subtasks").delete().eq("id", operation.entityId);
    if (error) throw error;
    return false;
  }

  if (operation.entity === "comment") {
    if (operation.action === "create") {
      const comment = operation.payload.comment as Record<string, unknown>;
      const { error: commentError } = await (client.from("comments") as any).insert(comment);
      if (commentError) throw commentError;
      const audio = operation.payload.audio as
        | { blob: Blob; extension: string; contentType: string; fileName: string }
        | undefined;
      if (audio) {
        const path = `${String(comment.task_id)}/comments/${String(comment.id)}/${Date.now()}-audio.${audio.extension}`;
        const { error: uploadError } = await client.storage
          .from("task-attachments")
          .upload(path, audio.blob, { contentType: audio.contentType, upsert: false });
        if (uploadError) throw uploadError;
        const { error: attachmentError } = await (client.from("comment_attachments") as any).insert({
          comment_id: comment.id,
          task_id: comment.task_id,
          file_name: audio.fileName,
          storage_path: path,
          mime_type: audio.contentType,
          size_bytes: audio.blob.size,
          uploaded_by: comment.author_id,
        });
        if (attachmentError) throw attachmentError;
      }
      return false;
    }
    if (operation.action === "update") {
      const { error } = await (client.from("comments") as any)
        .update(operation.payload.patch)
        .eq("id", operation.entityId);
      if (error) throw error;
      return false;
    }
    const { error } = await client.from("comments").delete().eq("id", operation.entityId);
    if (error) throw error;
    return false;
  }

  if (operation.entity === "task_order") {
    const { error } = await client
      .from("user_task_order")
      .upsert(operation.payload.rows as any[], { onConflict: "user_id,task_id" });
    if (error) throw error;
    return false;
  }

  if (operation.entity === "record") {
    const table = operation.payload.table;
    if (typeof table !== "string") throw new Error("Registro offline invÃ¡lido.");
    if (operation.action === "create") {
      const request = operation.payload.upsert
        ? (client.from(table as any) as any).upsert(operation.payload.record, { onConflict: String(operation.payload.onConflict || "id") })
        : (client.from(table as any) as any).insert(operation.payload.record);
      const { error } = await request;
      if (error) throw error;
      return false;
    }
    if (operation.action === "update") {
      const { error } = await (client.from(table as any) as any)
        .update(operation.payload.patch)
        .eq("id", operation.entityId);
      if (error) throw error;
      return false;
    }
    const { error } = await (client.from(table as any) as any).delete().eq("id", operation.entityId);
    if (error) throw error;
    return false;
  }

  if (operation.entity === "reaction") {
    const reaction = operation.payload.reaction as Record<string, unknown>;
    if (operation.action === "delete") {
      const { error } = await (client.from("mural_post_reactions") as any)
        .delete().match({ post_id: reaction.post_id, user_id: reaction.user_id, emoji: reaction.emoji });
      if (error) throw error;
      return false;
    }
    const { error } = await (client.from("mural_post_reactions") as any).insert(reaction);
    if (error && !String(error.message).toLowerCase().includes("duplicate")) throw error;
    return false;
  }

  if (operation.entity === "attachment") {
    const attachment = operation.payload.attachment as Record<string, unknown>;
    const bucket = String(operation.payload.bucket);
    const blob = operation.payload.blob as Blob;
    const { error: uploadError } = await client.storage.from(bucket).upload(String(attachment.storage_path), blob, {
      contentType: String(attachment.mime_type || "application/octet-stream"), upsert: false,
    });
    if (uploadError) throw uploadError;
    if (operation.payload.table === "client_avatar_updates") {
      const { error } = await (client.from("clients") as any)
        .update({ avatar_path: attachment.storage_path })
        .eq("id", attachment.client_id);
      if (error) throw error;
      return false;
    }
    const { error: insertError } = await (client.from(String(operation.payload.table) as any) as any).insert(attachment);
    if (insertError) throw insertError;
    return false;
  }

  throw new Error("Tipo de alteraÃ§Ã£o offline ainda nÃ£o suportado.");
}

/** Envia alterações locais quando a conexão volta, sem bloquear a interface. */
async function createAuthenticatedSyncClient(): Promise<SyncClient> {
  // A fila pode ter sido criada enquanto o navegador estava sem rede. Ao voltar,
  // renovamos a sessão antes de escrever: o cliente global pode ainda carregar
  // um token antigo e o PostgREST então trata a requisição como anônima.
  const { data, error } = await supabase.auth.refreshSession();
  if (error || !data.session?.access_token) {
    throw error ?? new Error("Não foi possível renovar a sessão para sincronizar os dados offline.");
  }

  const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const publishableKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) {
    throw new Error("A conexão com o servidor não está configurada.");
  }

  return createClient<Database>(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });
}

export function OfflineSyncManager() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const syncing = useRef(false);

  const sync = useCallback(async () => {
    if (!user || isOffline() || syncing.current) return;
    syncing.current = true;
    let synced = 0;
    let conflicts = 0;
    let failed = 0;
    try {
      const operations = await listOfflineOperations(user.id);
      if (operations.length === 0) return;
      let client: SyncClient;
      try {
        client = await createAuthenticatedSyncClient();
      } catch (error) {
        // A conexão pode voltar alguns instantes antes de o servidor de sessão
        // estar acessível. Mantemos toda a fila e repetimos automaticamente.
        console.warn("[offline sync] aguardando uma sessão autenticada:", error);
        return;
      }
      for (const operation of operations) {
        if (isOffline()) break;
        try {
          const hasConflict = await syncOperation(client, operation);
          await removeOfflineOperation(user.id, operation.id);
          synced += 1;
          if (hasConflict) conflicts += 1;
        } catch (error) {
          // Uma operação inválida ou temporariamente recusada não pode prender
          // toda a fila. Ela permanece guardada para nova tentativa, enquanto
          // criações posteriores e independentes (como uma tarefa) seguem.
          await replaceOfflineOperation({ ...operation, attempts: operation.attempts + 1 });
          failed += 1;
          console.warn("[offline sync] operação pendente após falha:", operation.entity, operation.action, error);
        }
      }
      if (failed > 0) {
        console.warn(`[offline sync] ${failed} operação(ões) permaneceram na fila para nova tentativa.`);
      }
      if (synced > 0) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["tasks"] }),
          queryClient.invalidateQueries({ queryKey: ["subtasks"] }),
          queryClient.invalidateQueries({ queryKey: ["user_task_order"] }),
        ]);
        toast.success(
          conflicts > 0
            ? "Dados sincronizados. HÃ¡ alteraÃ§Ãµes que precisam de revisÃ£o."
            : "Dados offline sincronizados.",
        );
        if (conflicts > 0) window.dispatchEvent(new Event("taskflow:offline-conflicts"));
      }
    } finally {
      syncing.current = false;
    }
  }, [queryClient, user]);

  useEffect(() => {
    void sync();
    window.addEventListener("online", sync);
    window.addEventListener("focus", sync);
    // A opção Offline do DevTools pode voltar a rede sem disparar o evento
    // `online`. A checagem periódica garante que a fila não fique parada.
    const interval = window.setInterval(() => void sync(), 5_000);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("focus", sync);
      window.clearInterval(interval);
    };
  }, [sync]);

  return null;
}
