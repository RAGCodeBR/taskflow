import { describe, expect, it } from "vitest";
import {
  htmlHasMeaningfulText,
  isSerializedSpansClipboard,
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

  it("renders repeated ChatGPT spans supplied as plain text instead of showing tags", () => {
    const spans = "<span>Uma </span><span>imersão </span><span>teórica e prática</span>";
    expect(richTextPasteContent("", spans)).toEqual({ kind: "html", content: spans });
    expect(isSerializedSpansClipboard("", spans)).toBe(true);
    expect(richTextPasteContent(`<div>${spans.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</div>`, spans))
      .toEqual({ kind: "html", content: spans });
    const code = `<pre><code>${spans.replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</code></pre>`;
    expect(isSerializedSpansClipboard(code, spans)).toBe(false);
    expect(richTextPasteContent(code, spans)).toEqual({ kind: "html", content: code });
  });

  it("keeps ordinary text literal, including punctuation, tags and line breaks", () => {
    expect(richTextPasteContent("", "Linha 1\nLinha <b>literal</b> & ⭐")).toEqual({
      kind: "text",
      content: "Linha 1\nLinha <b>literal</b> & ⭐",
    });
    expect(plainTextToEditorHtml("Linha 1\n\nLinha <b>literal</b> & ⭐")).toBe(
      "<p>Linha 1</p><p><br></p><p>Linha &lt;b&gt;literal&lt;/b&gt; &amp; ⭐</p>",
    );
    expect(richTextPasteContent("", "Exemplo: <span>literal</span>")).toEqual({
      kind: "text", content: "Exemplo: <span>literal</span>",
    });
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
