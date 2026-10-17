import { describe, expect, it } from "vitest";
import type { OfflineOperation } from "./offline-sync";
import { overlayClientReferences, referenceWebUrl } from "./client-references";

const op = (
  action: OfflineOperation["action"],
  entityId: string,
  payload: Record<string, unknown>,
  entity: OfflineOperation["entity"] = "record",
): OfflineOperation => ({
  id: `op-${entityId}`,
  userId: "user",
  entity,
  action,
  entityId,
  createdAt: "2026-10-16T12:00:00Z",
  attempts: 0,
  payload: { table: "client_references", workspaceId: "marketing", clientId: "client", ...payload },
});

describe("client references and offline persistence", () => {
  it("retains an image creation and its later topic change before the server catches up", () => {
    const record = { id: "image", client_id: "client", topic_id: "summer", title: "Inspiração" };
    expect(
      overlayClientReferences(
        [],
        [
          op("create", "image", { attachment: record }, "attachment"),
          op("update", "image", { patch: { topic_id: "gincana", title: "Referência visual" } }),
        ],
        "client_references",
        "client",
        "marketing",
      ),
    ).toEqual([{ ...record, topic_id: "gincana", title: "Referência visual" }]);
  });
  it("keeps deletions deleted on refetch and ignores records from another workspace or client", () => {
    const record = { id: "saved", client_id: "client", title: "Post" };
    expect(
      overlayClientReferences(
        [record],
        [
          op("create", "foreign", {
            record: { ...record, id: "foreign" },
            workspaceId: "consultoria",
          }),
          op("create", "other-client", {
            record: { ...record, id: "other-client" },
            clientId: "other",
          }),
          op("delete", "saved", {}),
        ],
        "client_references",
        "client",
        "marketing",
      ),
    ).toEqual([]);
  });
  it("adds an image to an existing reference without losing its topic or title", () => {
    const record = {
      id: "saved",
      client_id: "client",
      title: "Post",
      topic_id: "topic",
      storage_path: null as string | null,
    };
    const updated = { ...record, storage_path: "client/saved/image" };
    expect(
      overlayClientReferences(
        [record],
        [op("update", "saved", { attachment: updated }, "attachment")],
        "client_references",
        "client",
        "marketing",
      ),
    ).toEqual([updated]);
  });
  it("accepts post URLs without a scheme while refusing executable, partial and multiple links", () => {
    expect(referenceWebUrl("example.com/post")).toBe("https://example.com/post");
    expect(referenceWebUrl("javascript:alert(1)")).toBeNull();
    expect(referenceWebUrl("Confira example.com/post")).toBeNull();
    expect(referenceWebUrl("https://example.com https://example.org")).toBeNull();
  });
});
