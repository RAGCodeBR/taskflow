import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import { MobileDayAgenda, shiftWeek } from "./MobileDayAgenda";
import { dayKey } from "@/lib/mobile-task-groups";

const task = (id: string, title: string, due: string | null) =>
  ({
    id,
    title,
    due_date: due,
    status: "todo",
    completed_at: null,
    column_id: null,
  }) as unknown as Task;

const tasks = [
  task("a", "Audiência do dia 24", "2026-11-24T14:00:00-03:00"),
  task("b", "Prazo do dia 26", "2026-11-26T18:00:00-03:00"),
];

const render = (selected: string) =>
  renderToStaticMarkup(
    createElement(MobileDayAgenda, {
      tasks,
      selectedDay: new Date(`${selected}T12:00:00-03:00`),
      today: new Date("2026-11-24T12:00:00-03:00"),
      onSelectDay: () => undefined,
      isDone: () => false,
      clientNames: new Map(),
      profiles: new Map(),
      onOpen: () => undefined,
      onToggleDone: () => undefined,
    }),
  );

describe("MobileDayAgenda", () => {
  it("shows the 7 days of the selected week, Monday 23 to Sunday 29", () => {
    const html = render("2026-11-24");
    const days = html.match(/data-day="[^"]+"/g) ?? [];
    expect(days).toHaveLength(7);
    expect(days[0]).toBe('data-day="2026-11-23"');
    expect(days[6]).toBe('data-day="2026-11-29"');
  });

  it("lists only the tasks of the selected day", () => {
    const html = render("2026-11-26");
    expect(html).toContain("Prazo do dia 26");
    expect(html).not.toContain("Audiência do dia 24");
  });

  it("marks days that have tasks and the selected day", () => {
    const html = render("2026-11-24");
    expect(html).toMatch(/data-day="2026-11-26"[^>]*data-has-tasks="true"/);
    expect(html).toMatch(/data-day="2026-11-24"[^>]*aria-pressed="true"/);
  });

  it("shows an empty message for a day without tasks", () => {
    expect(render("2026-11-25")).toContain("Nada para este dia");
  });
});

describe("shiftWeek", () => {
  it("moves the selected day by whole weeks", () => {
    expect(dayKey(shiftWeek(new Date("2026-11-24T12:00:00-03:00"), 1))).toBe("2026-12-01");
    expect(dayKey(shiftWeek(new Date("2026-11-24T12:00:00-03:00"), -1))).toBe("2026-11-17");
  });
});
