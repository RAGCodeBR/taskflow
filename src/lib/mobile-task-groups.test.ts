import { describe, expect, it } from "vitest";
import { dayKey, groupTasksByDue, tasksOnDay, weekDaysAround } from "./mobile-task-groups";

type T = {
  id: string;
  due_date: string | null;
  completed_at?: string | null;
  status?: string | null;
};

const now = new Date("2026-11-24T15:00:00-03:00");

describe("groupTasksByDue", () => {
  const tasks: T[] = [
    { id: "later", due_date: "2026-12-10T12:00:00-03:00" },
    { id: "overdue", due_date: "2026-11-23T12:00:00-03:00" },
    { id: "today-early", due_date: "2026-11-24T00:30:00-03:00" },
    { id: "tomorrow", due_date: "2026-11-25T18:00:00-03:00" },
    { id: "week", due_date: "2026-11-29T10:00:00-03:00" },
    { id: "none", due_date: null },
    { id: "done", due_date: "2026-11-20T10:00:00-03:00", completed_at: "2026-11-21T10:00:00Z" },
  ];

  it("places each task in its Brasília-day group, in display order", () => {
    const groups = groupTasksByDue(tasks, now);
    expect(groups.map((g) => [g.key, g.tasks.map((t) => t.id)])).toEqual([
      ["overdue", ["overdue"]],
      ["today", ["today-early"]],
      ["tomorrow", ["tomorrow"]],
      ["week", ["week"]],
      ["later", ["later"]],
      ["none", ["none"]],
      ["done", ["done"]],
    ]);
    expect(groups[0].label).toBe("Atrasadas");
  });

  it("omits empty groups and sorts by due date inside a group", () => {
    const groups = groupTasksByDue(
      [
        { id: "b", due_date: "2026-11-24T20:00:00-03:00" },
        { id: "a", due_date: "2026-11-24T09:00:00-03:00" },
      ],
      now,
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].tasks.map((t) => t.id)).toEqual(["a", "b"]);
  });

  it("uses the custom completion check when given", () => {
    const groups = groupTasksByDue(
      [{ id: "x", due_date: null, status: "custom" }],
      now,
      (t) => t.status === "custom",
    );
    expect(groups.map((g) => g.key)).toEqual(["done"]);
  });
});

describe("weekDaysAround", () => {
  it("returns Monday to Sunday of the anchor's week", () => {
    const days = weekDaysAround(new Date("2026-11-26T12:00:00-03:00"));
    expect(days).toHaveLength(7);
    expect(dayKey(days[0])).toBe("2026-11-23");
    expect(dayKey(days[6])).toBe("2026-11-29");
  });

  it("treats Sunday as the end of the week", () => {
    const days = weekDaysAround(new Date("2026-11-29T12:00:00-03:00"));
    expect(dayKey(days[0])).toBe("2026-11-23");
  });
});

describe("tasksOnDay", () => {
  it("matches tasks by the Brasília calendar day", () => {
    const tasks: T[] = [
      { id: "early", due_date: "2026-11-24T00:30:00-03:00" },
      { id: "other", due_date: "2026-11-25T00:30:00-03:00" },
      { id: "none", due_date: null },
    ];
    expect(tasksOnDay(tasks, new Date("2026-11-24T12:00:00-03:00")).map((t) => t.id)).toEqual([
      "early",
    ]);
  });
});
