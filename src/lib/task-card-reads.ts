import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "./fetch-all-rows";

export interface CardSubtask {
  id: string; task_id: string; title: string; done: boolean; position: number;
  comment_id: string | null; due_date: string | null; completed_at: string | null;
  assignee_id: string | null; notes: string | null;
}
export interface CardCommentRow { id: string; task_id: string; title: string | null; body: string; created_at: string; position: number }
export interface CardRelatedData { tagIds: string[]; subtasks: CardSubtask[]; comments: CardCommentRow[] }

/** Group simultaneously mounted cards; 30 cards need 3 reads instead of 90. */
export function createCardReadBatcher(read: (ids: string[]) => Promise<Map<string, CardRelatedData>>, delay = 25) {
  const queues = new Map<string, Map<string, Array<{ resolve: (data: CardRelatedData) => void; reject: (error: unknown) => void }>>>();
  return (scope: string, id: string): Promise<CardRelatedData> => new Promise((resolve, reject) => {
    let pending = queues.get(scope);
    if (!pending) {
      pending = new Map(); queues.set(scope, pending);
      const group = pending;
      setTimeout(() => {
        queues.delete(scope);
        const entries = [...group.entries()];
        for (let start = 0; start < entries.length; start += 100) {
          const batch = entries.slice(start, start + 100);
          void read(batch.map(([key]) => key)).then((rows) => {
            for (const [key, listeners] of batch) {
              const result = rows.get(key) ?? { tagIds: [], subtasks: [], comments: [] };
              listeners.forEach((listener) => listener.resolve(result));
            }
          }).catch((error) => batch.forEach(([, listeners]) => listeners.forEach((listener) => listener.reject(error))));
        }
      }, delay);
    }
    const listeners = pending.get(id) ?? [];
    listeners.push({ resolve, reject }); pending.set(id, listeners);
  });
}

export const readCardRelated = createCardReadBatcher(async (ids) => {
  const [links, subtasks, comments] = await Promise.all([
    fetchAllRows<{ task_id: string; tag_id: string }>((from, to) => supabase.from("task_tag_links").select("task_id,tag_id").in("task_id", ids).order("task_id").order("tag_id").range(from, to)),
    fetchAllRows<CardSubtask>((from, to) => supabase.from("subtasks").select("id,task_id,title,done,position,comment_id,due_date,completed_at,assignee_id,notes").in("task_id", ids).order("position").order("id").range(from, to)),
    fetchAllRows<CardCommentRow>((from, to) => supabase.from("comments").select("id,task_id,title,body,created_at,position").in("task_id", ids).order("position").order("created_at").order("id").range(from, to)),
  ]);
  for (const result of [links, subtasks, comments]) if (result.error) throw result.error;
  const groups = new Map(ids.map((id) => [id, { tagIds: [] as string[], subtasks: [] as CardSubtask[], comments: [] as CardCommentRow[] }]));
  links.data?.forEach((row) => groups.get(row.task_id)?.tagIds.push(row.tag_id));
  subtasks.data?.forEach((row) => groups.get(row.task_id)?.subtasks.push(row));
  comments.data?.forEach((row) => groups.get(row.task_id)?.comments.push(row));
  return groups;
});
