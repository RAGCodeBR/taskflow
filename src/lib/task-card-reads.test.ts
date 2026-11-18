import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { createCardReadBatcher, type CardRelatedData } from "./task-card-reads";
const empty = (): CardRelatedData => ({ tagIds: [], subtasks: [], comments: [] });
afterEach(() => vi.useRealTimers());
describe("batched card reads", () => {
  it("combines simultaneous cards, separates users/workspaces and deduplicates the same card", async () => {
    vi.useFakeTimers();
    const read = vi.fn(async (ids: string[]) => new Map(ids.map((id) => [id, { ...empty(), tagIds: [id] }])));
    const load = createCardReadBatcher(read);
    const results = Promise.all([load("user:marketing", "a"), load("user:marketing", "b"), load("user:marketing", "a"), load("other:consultoria", "c")]);
    await vi.runAllTimersAsync();
    expect(read.mock.calls.map(([ids]) => ids)).toEqual([["a", "b"], ["c"]]);
    expect((await results).map((result) => result.tagIds)).toEqual([["a"], ["b"], ["a"], ["c"]]);
  });
  it("bounds batch size and preserves cards with no children", async () => {
    vi.useFakeTimers();
    const read = vi.fn(async () => new Map<string, CardRelatedData>());
    const load = createCardReadBatcher(read);
    const results = Promise.all(Array.from({ length: 205 }, (_, i) => load("scope", String(i))));
    await vi.runAllTimersAsync();
    expect(read).toHaveBeenCalledTimes(3);
    expect((await results)).toEqual(Array.from({ length: 205 }, empty));
  });
  it("propagates failed reads instead of replacing cached content with an empty list", async () => {
    vi.useFakeTimers();
    const load = createCardReadBatcher(async () => { throw new Error("offline"); });
    const result = Promise.allSettled([load("scope", "a"), load("scope", "b")]);
    await vi.runAllTimersAsync();
    expect((await result).every((item) => item.status === "rejected")).toBe(true);
  });
});
