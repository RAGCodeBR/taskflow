import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({ channel: vi.fn(), remove: vi.fn(), callbacks: new Map<string, (payload: unknown) => void>() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { channel: mock.channel, removeChannel: mock.remove } }));
import { subscribeTaskReadUpdates } from "./task-read-updates";
afterEach(() => { vi.useRealTimers(); vi.clearAllMocks(); mock.callbacks.clear(); });
function fixture() {
  vi.useFakeTimers();
  const channel = { on: vi.fn((_event, filter, fn) => { mock.callbacks.set(filter.table, fn); return channel; }), subscribe: vi.fn(() => channel) };
  mock.channel.mockReturnValue(channel);
  const qc = new QueryClient();
  const invalidate = vi.spyOn(qc, "invalidateQueries");
  return { qc, invalidate };
}
describe("shared task subscriptions", () => {
  it("shares one channel among list, calendar and card consumers and cleans up after the last", () => {
    const { qc } = fixture();
    const first = subscribeTaskReadUpdates(qc, "user", "marketing");
    const second = subscribeTaskReadUpdates(qc, "user", "marketing");
    expect(mock.channel).toHaveBeenCalledTimes(1);
    first(); expect(mock.remove).not.toHaveBeenCalled();
    second(); expect(mock.remove).toHaveBeenCalledTimes(1);
  });
  it("coalesces event bursts while refreshing the affected card and lists", async () => {
    const { qc, invalidate } = fixture();
    const stop = subscribeTaskReadUpdates(qc, "user", "marketing");
    for (let i = 0; i < 4; i++) mock.callbacks.get("subtasks")?.({ new: { task_id: "parent" } });
    await vi.advanceTimersByTimeAsync(250);
    expect(invalidate.mock.calls.filter(([args]) => args?.queryKey?.[0] === "tasks")).toHaveLength(1);
    expect(invalidate.mock.calls.filter(([args]) => args?.queryKey?.[0] === "subtasks")).toHaveLength(1);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["task_card_related", "user", "marketing", "parent"] });
    await vi.advanceTimersByTimeAsync(500);
    expect(invalidate.mock.calls.filter(([args]) => args?.queryKey?.[0] === "task_card_related")).toHaveLength(1);
    stop();
  });
  it("does not refetch cards on list fetch-start/success or unchanged polls", async () => {
    const { qc, invalidate } = fixture();
    const stop = subscribeTaskReadUpdates(qc, "user", "marketing");
    await qc.fetchQuery({ queryKey: ["tasks", "user"], queryFn: async () => [{ id: "parent" }] });
    await vi.runAllTimersAsync();
    expect(invalidate).not.toHaveBeenCalled();
    await qc.invalidateQueries({ queryKey: ["tasks"] });
    await vi.runAllTimersAsync();
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["task_card_related"] });
    stop(); qc.clear();
  });
});
