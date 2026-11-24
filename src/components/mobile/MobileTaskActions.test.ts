import { describe, expect, it } from "vitest";
import { moveTargets } from "./MobileTaskActions";

describe("moveTargets", () => {
  it("lists every column except the task's current one, in order", () => {
    const columns = [
      { id: "a", name: "A fazer" },
      { id: "b", name: "Fazendo" },
      { id: "c", name: "Revisão" },
    ];
    expect(moveTargets(columns, { column_id: "b" }).map((c) => c.id)).toEqual(["a", "c"]);
  });

  it("lists all columns when the task has none", () => {
    expect(moveTargets([{ id: "a", name: "A fazer" }], { column_id: null })).toHaveLength(1);
  });
});
