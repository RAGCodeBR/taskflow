import type { OfflineOperation } from "./offline-sync";
import { findTextLinks } from "./text-links";

export interface ClientReferenceTopic {
  id: string;
  client_id: string;
  title: string;
  created_at: string;
}
export interface ClientReference {
  id: string;
  client_id: string;
  topic_id: string;
  title: string;
  url: string | null;
  notes: string;
  storage_path: string | null;
  file_name: string | null;
  mime_type: string | null;
  created_at: string;
  updated_at: string;
}
export type ReferenceTable = "client_reference_topics" | "client_references";

export function referenceWebUrl(value: string): string | null {
  const text = value.trim();
  const links = findTextLinks(text);
  return links.length === 1 && links[0].start === 0 && links[0].end === text.length
    ? links[0].href
    : null;
}

/** Pending topic/image creation and later edits stay visible during reconnection. */
export function overlayClientReferences<T extends { id: string; client_id: string }>(
  records: T[],
  operations: readonly OfflineOperation[],
  table: ReferenceTable,
  clientId: string,
  workspaceId: string,
): T[] {
  const rows = new Map(
    records.filter((row) => row.client_id === clientId).map((row) => [row.id, row]),
  );
  for (const op of operations) {
    if (
      op.payload.table !== table ||
      op.payload.workspaceId !== workspaceId ||
      op.payload.clientId !== clientId
    )
      continue;
    if (op.action === "delete") rows.delete(op.entityId);
    else if (op.action === "create") {
      const row = (op.entity === "attachment" ? op.payload.attachment : op.payload.record) as T;
      if (row?.client_id === clientId) rows.set(row.id, row);
    } else if (rows.has(op.entityId))
      rows.set(op.entityId, {
        ...rows.get(op.entityId)!,
        ...((op.entity === "attachment" ? op.payload.attachment : op.payload.patch) as Partial<T>),
      });
  }
  return [...rows.values()];
}
