import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Task } from "@/hooks/use-data";
import { MobileKanban } from "./MobileKanban";

const task = (id: string, title: string) =>
  ({
    id,
    title,
    due_date: null,
    status: "todo",
    completed_at: null,
    column_id: null,
  }) as unknown as Task;

const render = () =>
  renderToStaticMarkup(
    createElement(MobileKanban, {
      columns: [
        { id: "col-1", name: "A fazer" },
        { id: "col-2", name: "Fazendo" },
      ],
      tasksByColumn: new Map([
        ["col-1", [task("t1", "Primeira"), task("t2", "Segunda")]],
        ["col-2", [task("t3", "Terceira")]],
      ]),
      isDone: () => false,
      clientNames: new Map(),
      profiles: new Map(),
      onOpen: () => undefined,
      onToggleDone: () => undefined,
      onMove: () => undefined,
      onCreateInColumn: () => undefined,
    }),
  );

describe("MobileKanban", () => {
  it("renders one tab per column with its task count, first selected", () => {
    const html = render();
    const tabs = html.match(/<button[^>]*role="tab"[^>]*>.*?<\/button>/g) ?? [];
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toContain("A fazer");
    expect(tabs[0]).toContain(">2<");
    expect(tabs[0]).toContain('aria-selected="true"');
    expect(tabs[1]).toContain("Fazendo");
    expect(tabs[1]).toContain('aria-selected="false"');
  });

  it("lays the columns side by side with scroll snapping, one per screen", () => {
    const html = render();
    expect(html).toContain("snap-x snap-mandatory");
    expect((html.match(/snap-start/g) ?? []).length).toBe(2);
    expect(html).toContain("Primeira");
    expect(html).toContain("Terceira");
  });

  it("offers adding a task to each column", () => {
    expect((render().match(/Adicionar tarefa em/g) ?? []).length).toBe(2);
  });
});
