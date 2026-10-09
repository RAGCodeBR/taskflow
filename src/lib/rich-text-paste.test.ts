import { describe, expect, it } from "vitest";
import {
  htmlHasMeaningfulText,
  plainTextToEditorHtml,
  richTextPasteContent,
} from "./rich-text-paste";

describe("rich text paste content", () => {
  const copiedDocument =
    '<html><body><!--StartFragment--><span style="color:red"><strong>Nome</strong> – CRM 15897-MT</span><!--EndFragment--></body></html>';

  it("extracts the formatted fragment from a full HTML clipboard document", () => {
    expect(richTextPasteContent(copiedDocument, "Nome – CRM 15897-MT")).toEqual({
      kind: "html",
      content: '<span style="color:red"><strong>Nome</strong> – CRM 15897-MT</span>',
    });
  });

  it("recognizes an HTML document mistakenly supplied as plain text", () => {
    expect(richTextPasteContent("", copiedDocument)).toEqual({
      kind: "html",
      content: '<span style="color:red"><strong>Nome</strong> – CRM 15897-MT</span>',
    });
  });

  it("keeps ordinary text literal, including punctuation, tags and line breaks", () => {
    expect(richTextPasteContent("", "Linha 1\nLinha <b>literal</b> & ⭐")).toEqual({
      kind: "text",
      content: "Linha 1\nLinha <b>literal</b> & ⭐",
    });
    expect(plainTextToEditorHtml("Linha 1\n\nLinha <b>literal</b> & ⭐")).toBe(
      "<p>Linha 1</p><p><br></p><p>Linha &lt;b&gt;literal&lt;/b&gt; &amp; ⭐</p>",
    );
  });

  it("preserves supported formatting from a regular rich clipboard fragment", () => {
    expect(
      richTextPasteContent(
        "<p><strong>Importante</strong> <a href='https://example.com'>link</a></p>",
        "Importante link",
      ),
    ).toEqual({
      kind: "html",
      content: "<p><strong>Importante</strong> <a href='https://example.com'>link</a></p>",
    });
  });

  it("does not mistake a screenshot with HTML fragment markers for text", () => {
    expect(
      htmlHasMeaningfulText(
        '<html><body><!--StartFragment--><img src="data:image/png;base64,AAAA"><!--EndFragment--></body></html>',
      ),
    ).toBe(false);
    expect(htmlHasMeaningfulText("<p>Legenda com texto</p><img src='x'>")).toBe(true);
  });
});
