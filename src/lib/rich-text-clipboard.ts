import type { Fragment } from "@tiptap/pm/model";

// Each paragraph contributes one separator; an empty paragraph contributes
// the additional line the user sees in the editor.
export function plainTextForClipboard(content: Fragment) {
  return content.textBetween(0, content.size, "\n");
}
