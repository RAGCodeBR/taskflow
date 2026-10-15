import { afterEach, describe, expect, it, vi } from "vitest";
import { applyDashboardFilters } from "./dashboard-filters";

const tasks = [
  {
    id: "open-ana",
    due_date: "2026-10-16",
    completed_at: null,
    status: "todo",
    assignee_id: "ana",
  },
  {
    id: "done-ana",
    due_date: "2026-09-30",
    completed_at: "2026-10-15T12:00:00Z",
    status: "done",
    assignee_id: "ana",
  },
  {
    id: "open-unassigned",
    due_date: "2026-10-17",
    completed_at: null,
    status: "todo",
    assignee_id: null,
  },
];

describe("dashboard filters", () => {
  afterEach(() => vi.useRealTimers());

  it("keeps date-only deadlines on the correct day in Brasília", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T12:00:00-03:00"));
    const datedTasks = [
      { id: "yesterday", due_date: "2026-10-14", completed_at: null, status: "todo", assignee_id: null },
      { id: "today", due_date: "2026-10-15", completed_at: null, status: "todo", assignee_id: null },
      { id: "tomorrow", due_date: "2026-10-16", completed_at: null, status: "todo", assignee_id: null },
    ];
    const matching = (period: "due_today" | "tomorrow" | "overdue") => applyDashboardFilters(datedTasks, {
      period,
      customPeriod: null,
      status: "all",
      assignee: "all",
    }).map((task) => task.id);

    expect(matching("due_today")).toEqual(["today"]);
    expect(matching("tomorrow")).toEqual(["tomorrow"]);
    expect(matching("overdue")).toEqual(["yesterday"]);
  });

  it("combines period, status and responsible person", () => {
    expect(
      applyDashboardFilters(tasks, {
        period: "all",
        customPeriod: { start: "2026-10-15", end: "2026-10-16" },
        status: "pending",
        assignee: "ana",
      }).map((task) => task.id),
    ).toEqual(["open-ana"]);
  });

  it("uses completion date for completed work in a custom period", () => {
    expect(
      applyDashboardFilters(tasks, {
        period: "all",
        customPeriod: { start: "2026-10-15", end: "2026-10-15" },
        status: "completed",
        assignee: "all",
      }).map((task) => task.id),
    ).toEqual(["done-ana"]);
  });

  it("shows tasks without an assignee when selected", () => {
    expect(
      applyDashboardFilters(tasks, {
        period: "all",
        customPeriod: null,
        status: "all",
        assignee: "unassigned",
      }).map((task) => task.id),
    ).toEqual(["open-unassigned"]);
  });

  it("returns all tasks after clearing every filter", () => {
    expect(
      applyDashboardFilters(tasks, {
        period: "all",
        customPeriod: null,
        status: "all",
        assignee: "all",
      }).map((task) => task.id),
    ).toEqual(tasks.map((task) => task.id));
  });
});
