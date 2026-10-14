import { describe, expect, it } from "vitest";
import { taskCollaboratorChanges } from "./task-collaborator-changes";

describe("task collaborator changes", () => {
  it("preserves a participant another person added while the editor was open", () => {
    expect(taskCollaboratorChanges(["eloisa"], ["eloisa", "igor"], ["eloisa"])).toEqual({
      removedIds: [],
      addedIds: [],
    });
  });

  it("only applies deliberate additions and removals from the loaded selection", () => {
    expect(taskCollaboratorChanges(["eloisa", "carol"], ["eloisa", "carol", "igor"], ["carol", "ana"])).toEqual({
      removedIds: ["eloisa"],
      addedIds: ["ana"],
    });
  });
});
