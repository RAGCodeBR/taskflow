import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { Subtask, Task } from "@/hooks/use-data";
import { CompletedSubtaskCard } from "./CompletedSubtaskCard";

describe("completed subtask in the Kanban lane", () => {
  it("renders the child as completed without presenting its parent as the completed card", () => {
    const html = renderToStaticMarkup(
      createElement(CompletedSubtaskCard, {
        subtask: {
          id: "sub",
          title: "Revisar texto",
          done: true,
          completed_at: "2026-10-09T12:00:00Z",
        } as Subtask,
        parent: { id: "parent", title: "Preparar campanha" } as Task,
        orientation: "horizontal",
        onOpen: () => undefined,
      }),
    );
    expect(html).toContain("Subtarefa concluída");
    expect(html).toContain("Revisar texto");
    expect(html).toContain("Na tarefa: Preparar campanha");
    expect(html).toContain("line-through");
  });
});
