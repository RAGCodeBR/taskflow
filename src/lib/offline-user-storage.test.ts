import { beforeEach, describe, expect, it, vi } from "vitest";

const { deleteKey, clearSyncData } = vi.hoisted(() => ({
  deleteKey: vi.fn(async () => undefined),
  clearSyncData: vi.fn(async () => undefined),
}));

vi.mock("idb-keyval", () => ({ del: deleteKey }));
vi.mock("@/lib/offline-sync", () => ({ clearOfflineSyncData: clearSyncData }));

import {
  clearOfflineUserData,
  offlineAccessKey,
  offlineQueryCacheKey,
  offlineTaskCacheKey,
} from "./offline-user-storage";

describe("offline user storage", () => {
  beforeEach(() => {
    deleteKey.mockClear();
    clearSyncData.mockClear();
    vi.stubGlobal("localStorage", { removeItem: vi.fn() });
  });

  it("keeps every persisted key scoped to the authenticated user", () => {
    expect(offlineQueryCacheKey("user-1")).toBe("taskflow-query-cache:offline-cache-v2:user-1");
    expect(offlineTaskCacheKey("user-1")).toBe("taskflow-offline-tasks-v1:user-1");
    expect(offlineAccessKey("user-1")).toBe("taskflow-offline-access-v1:user-1");
  });

  it("clears the cache and pending queue only on explicit logout", async () => {
    await clearOfflineUserData("user-1");

    expect(localStorage.removeItem).toHaveBeenCalledWith("taskflow-offline-access-v1:user-1");
    expect(deleteKey).toHaveBeenCalledWith("taskflow-query-cache:offline-cache-v2:user-1");
    expect(deleteKey).toHaveBeenCalledWith("taskflow-offline-tasks-v1:user-1");
    expect(clearSyncData).toHaveBeenCalledWith("user-1");
  });
});
