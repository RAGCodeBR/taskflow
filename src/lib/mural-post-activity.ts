const SILENT_FIELDS = new Set([
  "id", "created_by", "created_at", "updated_at", "workspace_id",
  "canvas_x", "canvas_y", "last_activity_by", "last_activity_at",
]);

type PostValues = Record<string, unknown>;

/** Never infer the editor from the author: activity identity comes from auth.uid() in the database. */
export function muralPostUpdateActivity(
  previous: PostValues,
  current: PostValues,
  viewerId: string | undefined,
) {
  const actorId = current.last_activity_by;
  if (typeof actorId !== "string" || !actorId || actorId === viewerId) return null;
  // Without the previous row, a coordinate-only event cannot safely be called an edit.
  if (!previous.id || previous.id !== current.id) return null;
  const fields = Object.keys(current).filter((key) => !SILENT_FIELDS.has(key));
  if (fields.some((key) => !(key in previous))) return null;
  const changed = fields.filter((key) => JSON.stringify(current[key]) !== JSON.stringify(previous[key]));
  if (!changed.length) return null;
  const verb = changed.length === 1 && changed[0] === "is_pinned"
    ? current.is_pinned ? "fixou" : "desfixou"
    : "atualizou";
  return { actorId, verb, title: typeof current.title === "string" ? current.title : "um recado" };
}

export function muralPostActivitySince(
  post: { created_at: string | null; last_activity_at?: string | null; last_activity_by?: string | null },
  lastSeen: number,
  viewerId: string,
) {
  if (!post.last_activity_by || post.last_activity_by === viewerId) return null;
  const activityTime = Date.parse(post.last_activity_at ?? "");
  if (!Number.isFinite(activityTime) || activityTime <= lastSeen) return null;
  if (post.created_at && Date.parse(post.created_at) > lastSeen) return null;
  return post.last_activity_by;
}
