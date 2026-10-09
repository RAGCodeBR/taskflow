export type RichTextPasteContent = { kind: "html" | "text"; content: string };

export function htmlHasMeaningfulText(html: string) {
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(head|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/<img\b[^>]*>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .trim().length > 0
  );
}

function looksLikeCopiedHtmlDocument(text: string) {
  return (
    /<!--\s*StartFragment\s*-->/i.test(text) ||
    (/<(?:html|body)\b/i.test(text) && /<\/(?:html|body)>/i.test(text))
  );
}

function htmlFragment(source: string) {
  const marked = source.match(/<!--\s*StartFragment\s*-->([\s\S]*?)<!--\s*EndFragment\s*-->/i);
  const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return (marked?.[1] ?? body?.[1] ?? source).replace(/<!--[\s\S]*?-->/g, "").trim();
}

/** Clipboard formats vary by browser and source application. Never feed plain text to the HTML parser. */
export function richTextPasteContent(html: string, text: string): RichTextPasteContent {
  const source = html.trim() || (looksLikeCopiedHtmlDocument(text) ? text.trim() : "");
  if (source) return { kind: "html", content: htmlFragment(source) };
  return { kind: "text", content: text };
}

export function plainTextToEditorHtml(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return escaped
    .split(/\r\n|\r|\n/)
    .map((line) => `<p>${line || "<br>"}</p>`)
    .join("");
}
