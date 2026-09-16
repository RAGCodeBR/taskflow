import { beforeEach, describe, expect, it, vi } from "vitest";

const memory = vi.hoisted(() => new Map<string, unknown>());

vi.mock("idb-keyval", () => ({
  createStore: () => ({}),
  get: async (key: string) => memory.get(key),
  set: async (key: string, value: unknown) => {
    // Yield once to reproduce the read/modify/write race that used to discard
    // operations when several offline changes were queued together.
    await Promise.resolve();
    memory.set(key, value);
  },
  del: async (key: string) => memory.delete(key),
}));

import {
  clearOfflineSyncData,
  enqueueOfflineOperation,
  isNetworkFailure,
  listOfflineOperations,
  removeOfflineOperation,
  replaceOfflineOperation,
} from "./offline-sync";

describe("offline operation queue", () => {
  beforeEach(() => memory.clear());

  it("does not lose concurrent writes", async () => {
    const userId = "user-1";
    await Promise.all(
      Array.from({ length: 25 }, (_, index) =>
        enqueueOfflineOperation({
          userId,
          entity: "task",
          action: "create",
          entityId: `task-${index}`,
          payload: { task: { id: `task-${index}`, title: `Task ${index}` } },
        }),
      ),
    );

    const queued = await listOfflineOperations(userId);
    expect(queued).toHaveLength(25);
    expect(new Set(queued.map((operation) => operation.entityId)).size).toBe(25);
  });

  it("preserves new operations while an existing one is updated and removed", async () => {
    const userId = "user-2";
    const first = await enqueueOfflineOperation({
      userId,
      entity: "task",
      action: "create",
      entityId: "first",
      payload: { task: { id: "first", title: "First" } },
    });

    await Promise.all([
      replaceOfflineOperation({ ...first, attempts: 1 }),
      enqueueOfflineOperation({
        userId,
        entity: "task",
        action: "create",
        entityId: "second",
        payload: { task: { id: "second", title: "Second" } },
      }),
    ]);
    await removeOfflineOperation(userId, first.id);

    const queued = await listOfflineOperations(userId);
    expect(queued.map((operation) => operation.entityId)).toEqual(["second"]);
    await clearOfflineSyncData(userId);
    expect(await listOfflineOperations(userId)).toEqual([]);
  });
});

describe("network failure detection", () => {
  it.each([
    new TypeError("Failed to fetch"),
    new Error("NetworkError when attempting to fetch resource"),
    { message: "net::ERR_INTERNET_DISCONNECTED" },
    "Load failed",
  ])("recognizes a transport failure", (error) => {
    expect(isNetworkFailure(error)).toBe(true);
  });

  it("does not treat a database validation error as offline", () => {
    expect(isNetworkFailure({ message: "new row violates row-level security policy" })).toBe(false);
  });
});
