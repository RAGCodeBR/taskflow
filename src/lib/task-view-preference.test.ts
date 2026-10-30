import { beforeEach, describe, expect, it, vi } from "vitest";
import { preferredTaskView, rememberTaskView } from "./task-view-preference";

describe("preferred task view", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", { localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
    } });
  });

  it("remembers the last selected view per account and workspace", () => {
    rememberTaskView("list", "rei", "consultoria");
    rememberTaskView("calendar", "rei", "marketing");
    expect(preferredTaskView("rei", "consultoria")).toBe("list");
    expect(preferredTaskView("rei", "marketing")).toBe("calendar");
    expect(preferredTaskView("outro", "marketing")).toBe("kanban");
  });
});
