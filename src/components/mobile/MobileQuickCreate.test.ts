import { describe, expect, it } from "vitest";
import { quickValuesToDialogDefaults } from "./MobileQuickCreate";

describe("quickValuesToDialogDefaults", () => {
  it("keeps 'Sem responsável' as no assignee (the dialog turns null into the current user)", () => {
    expect(
      quickValuesToDialogDefaults({
        title: "x",
        clientId: "",
        assigneeId: "",
        dueDate: "2026-11-24",
      }).assigneeId,
    ).toBe("");
  });
  it("passes the chosen assignee through", () => {
    expect(
      quickValuesToDialogDefaults({
        title: "x",
        clientId: "",
        assigneeId: "u2",
        dueDate: "2026-11-24",
      }).assigneeId,
    ).toBe("u2");
  });
});
