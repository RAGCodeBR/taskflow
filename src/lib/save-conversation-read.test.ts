import { describe, expect, it, vi } from "vitest";
import { saveConversationRead } from "./save-conversation-read";

describe("conversation receipt persistence", () => {
  it("uses the atomic server operation without trusting client identity or time", async () => {
    const client = { rpc: vi.fn().mockResolvedValue({ data: true, error: null }) };
    expect(await saveConversationRead(client, "task-id", false)).toBe(true);
    expect(client.rpc).toHaveBeenCalledWith("set_task_conversation_read", {
      target_task_id: "task-id",
      mark_unread: false,
    });
  });

  it("treats a removed, inaccessible or not-yet-synced task as a skipped write", async () => {
    const client = { rpc: vi.fn().mockResolvedValue({ data: false, error: null }) };
    expect(await saveConversationRead(client, "missing-task", false)).toBe(false);
  });

  it("passes the manual unread flag to preserve the server read watermark", async () => {
    const client = { rpc: vi.fn().mockResolvedValue({ data: true, error: null }) };
    await saveConversationRead(client, "task-id", true);
    expect(client.rpc.mock.calls[0][1].mark_unread).toBe(true);
  });

  it("does not silently accept a rejected write", async () => {
    const client = {
      rpc: vi.fn().mockResolvedValue({ data: null, error: { message: "permission denied" } }),
    };
    await expect(saveConversationRead(client, "task-id", false)).rejects.toThrow(
      "permission denied",
    );
  });

  it("propagates a network failure to the caller's error handler", async () => {
    const client = { rpc: vi.fn().mockRejectedValue(new Error("offline")) };
    await expect(saveConversationRead(client, "task-id", false)).rejects.toThrow("offline");
  });
});
