import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import { MobileTaskList } from "./MobileTaskList";
import { MobileTaskCard } from "./MobileTaskCard";

const base = {
  status: "todo",
  completed_at: null,
  client_id: "c1",
  assignee_id: "u1",
  priority: "high",
} as Partial<Task>;
const now = new Date("2026-11-24T15:00:00-03:00");
const tasks = [
  { ...base, id: "t1", title: "Petição atrasada", due_date: "2026-11-20T12:00:00-03:00" },
  { ...base, id: "t2", title: "Reunião de hoje", due_date: "2026-11-24T10:00:00-03:00" },
  {
    ...base,
    id: "t3",
    title: "Já feita",
    due_date: null,
    status: "done",
    completed_at: "2026-11-24T10:00:00Z",
  },
] as Task[];

const render = () =>
  renderToStaticMarkup(
    createElement(MobileTaskList, {
      tasks,
      now,
      isDone: (task: Task) => task.status === "done" || !!task.completed_at,
      clientNames: new Map([["c1", "Cliente Exemplo"]]),
      profiles: new Map([
        ["u1", { id: "u1", full_name: "Ana Souza", email: "ana@example.com" } as any],
      ]),
      onOpen: () => undefined,
      onToggleDone: () => undefined,
    }),
  );

describe("MobileTaskList", () => {
  it("shows one collapsible section per due group with its count", () => {
    const html = render();
    expect(html).toContain("Atrasadas");
    expect(html).toContain("Hoje");
    expect(html).toMatch(/Atrasadas<\/span><span[^>]*>1</);
    expect(html).toContain("Cliente Exemplo");
  });

  it("starts the completed section closed and the others open", () => {
    const html = render();
    const sections = html.match(/<details[^>]*>/g) ?? [];
    expect(sections).toHaveLength(3);
    expect(sections.slice(0, 2).every((tag) => tag.includes("open"))).toBe(true);
    expect(sections[2]).not.toContain("open");
  });

  it("shows an empty state", () => {
    const html = renderToStaticMarkup(
      createElement(MobileTaskList, {
        tasks: [],
        isDone: () => false,
        clientNames: new Map(),
        profiles: new Map(),
        onOpen: () => undefined,
        onToggleDone: () => undefined,
      }),
    );
    expect(html).toContain("Nenhuma tarefa por aqui");
  });
});

describe("MobileTaskCard", () => {
  it("has a 44px complete button separate from the open button", () => {
    const html = renderToStaticMarkup(
      createElement(MobileTaskCard, {
        task: tasks[0],
        isDone: false,
        onOpen: () => undefined,
        onToggleDone: () => undefined,
      }),
    );
    expect(html).toContain('aria-label="Concluir tarefa Petição atrasada"');
    expect(html).toContain("h-11 w-11");
    expect(html).toContain('aria-label="Abrir tarefa Petição atrasada"');
  });

  it("marks completed tasks and disables the complete button", () => {
    const html = renderToStaticMarkup(
      createElement(MobileTaskCard, {
        task: tasks[2],
        isDone: true,
        onOpen: () => undefined,
        onToggleDone: () => undefined,
      }),
    );
    expect(html).toContain("line-through");
    expect(html).toMatch(
      /aria-label="Tarefa concluída"[^>]*disabled|disabled[^>]*aria-label="Tarefa concluída"/,
    );
  });
});
