import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** One channel and one invalidation queue per authenticated scope, shared by all hook consumers. */
const scopes = new WeakMap<QueryClient, Map<string, { count: number; stop: () => void }>>();
export function subscribeTaskReadUpdates(qc: QueryClient, userId: string, workspaceId: string | null) {
  let entries = scopes.get(qc);
  if (!entries) { entries = new Map(); scopes.set(qc, entries); }
  const scope = `${userId}:${workspaceId ?? ""}`;
  const existing = entries.get(scope);
  if (existing) { existing.count++; return () => { if (--existing.count === 0) { existing.stop(); entries!.delete(scope); } }; }
  let timer: ReturnType<typeof setTimeout> | undefined;
  const pending = new Set<string>();
  const pendingCards = new Set<string>();
  let flushing = false;
  const queue = (...keys: string[]) => {
    keys.forEach((key) => pending.add(key));
    timer ??= setTimeout(() => {
      timer = undefined;
      const keys = [...pending]; pending.clear();
      flushing = true;
      keys.forEach((key) => void qc.invalidateQueries({ queryKey: [key] }));
      flushing = false;
      if (!keys.includes("task_card_related")) {
        for (const id of pendingCards) void qc.invalidateQueries({ queryKey: ["task_card_related", userId, workspaceId, id] });
      }
      pendingCards.clear();
    }, 250);
  };
  const related = (payload: { new?: Record<string, unknown>; old?: Record<string, unknown> }, table: string) => {
    const id = (table === "tasks" ? payload.new?.id ?? payload.old?.id : payload.new?.task_id ?? payload.old?.task_id) as string | undefined;
    // DELETE may omit task_id; in that case invalidate the active batches in this scope.
    if (id) { pendingCards.add(id); queue(); }
    else queue("task_card_related");
  };
  let channel = supabase.channel(`task-reads-${scope}-${Math.random().toString(36).slice(2)}`);
  for (const table of ["tasks", "subtasks", "task_collaborators", "comments", "task_tag_links"] as const) {
    channel = channel.on("postgres_changes", { event: "*", schema: "public", table }, (payload: { new?: Record<string, unknown>; old?: Record<string, unknown> }) => {
      if (table === "tasks") queue("tasks");
      if (table === "subtasks") queue("subtasks", "tasks");
      if (table === "task_collaborators") queue("task_collaborators", "tasks");
      if (table === "task_tag_links") queue("task_tag_links");
      related(payload as unknown as { new?: Record<string, unknown>; old?: Record<string, unknown> }, table);
    });
  }
  channel.subscribe((status: string) => { if (status === "SUBSCRIBED") queue("tasks", "subtasks", "task_collaborators"); });
  // Local mutations already invalidate these lists. Listen only to explicit invalidations,
  // never to fetch-start/fetch-success events (which previously retriggered every card).
  const unsubscribe = qc.getQueryCache().subscribe((event) => {
    if (flushing || event.type !== "updated" || event.action.type !== "invalidate") return;
    const key = event.query.queryKey;
    if (key[0] === "tasks" || key[0] === "subtasks" || key[0] === "task_tag_links") {
      queue("task_card_related");
    }
  });
  const entry = { count: 1, stop: () => { if (timer) clearTimeout(timer); unsubscribe(); void supabase.removeChannel(channel); } };
  entries.set(scope, entry);
  return () => { if (--entry.count === 0) { entry.stop(); entries!.delete(scope); } };
}
