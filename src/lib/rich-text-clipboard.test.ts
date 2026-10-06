import { describe, expect, it } from "vitest";
import { Schema } from "@tiptap/pm/model";
import { plainTextForClipboard } from "./rich-text-clipboard";

const schema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: { content: "text*", group: "block" },
    text: { group: "inline" },
  },
  marks: { strong: {} },
});

function paragraph(text: string, bold = false) {
  if (!text) return schema.node("paragraph");
  const marks = bold ? [schema.mark("strong")] : [];
  return schema.node("paragraph", null, schema.text(text, marks));
}

describe("plainTextForClipboard", () => {
  it("keeps one empty line between paragraphs without doubling it", () => {
    const doc = schema.node("doc", null, [
      paragraph("Legenda:"),
      paragraph(""),
      paragraph("Primeiro parágrafo."),
      paragraph(""),
      paragraph("Segundo parágrafo."),
      paragraph("Frase em negrito.", true),
    ]);

    expect(plainTextForClipboard(doc.content)).toBe(
      "Legenda:\n\nPrimeiro parágrafo.\n\nSegundo parágrafo.\nFrase em negrito.",
    );
  });
});
