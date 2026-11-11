import { describe, expect, it } from "vitest";
import { formIdSet, formValuesChanged, richTextFormValue } from "./form-changes";

describe("unsaved form values", () => {
  it("ignores empty editor markup, but retains images and formatting edits", () => {
    expect(richTextFormValue("<p></p>")).toBe(richTextFormValue(null));
    expect(richTextFormValue("<p><br></p>")).toBe("");
    expect(richTextFormValue("Texto")).toBe(richTextFormValue("<p>Texto</p>"));
    expect(richTextFormValue('<img data-taskflow-pending-id="print">')).not.toBe("");
    expect(richTextFormValue("<p><strong>Texto</strong></p>")).not.toBe(richTextFormValue("Texto"));
  });
  it("detects edited and reverted fields without depending on key or assignee order", () => {
    const initial = { title: "Original", responsible: formIdSet(["b", "a"]) };
    expect(formValuesChanged(initial, { responsible: formIdSet(["a", "b"]), title: "Original" })).toBe(false);
    expect(formValuesChanged(initial, { ...initial, title: "Alterada" })).toBe(true);
    expect(formValuesChanged(initial, { ...initial, notes: "Novo texto" })).toBe(true);
    expect(formValuesChanged(initial, { ...initial })).toBe(false);
  });
});
