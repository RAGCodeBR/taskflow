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

// Some clipboard sources (ChatGPT, web editors, social media tools) expose
// rendered markup as text/plain: "<span><span>Texto</span> </span>". It can be
// mixed with ordinary lines and use other simple tags. Recognize text whose
// tags are all simple text formatting, with at least two opening tags (or one
// element wrapping the whole text), so a sentence that merely mentions one tag,
// like "Exemplo: <span>literal</span>", stays literal. Code is never touched.
const MARKUP_TAG = /<\/?([a-z][a-z0-9]*)\b[^<>]*>/gi;
const TEXT_TAGS = new Set([
  "span",
  "p",
  "br",
  "div",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "font",
  "mark",
  "small",
  "sub",
  "sup",
]);
const BLOCK_TAG = /<\/?(?:p|div|br|ul|ol|li|h[1-6])\b/i;
const STYLE_ATTRIBUTE = /^<[a-z][a-z0-9]*\b[^<>]*\sstyle\s*=\s*["']?\s*[a-z-]+\s*:/i;

function looksLikeSerializedMarkup(text: string) {
  const source = text.trim();
  if (!source || /<(?:pre|code|img|script|style)\b/i.test(source)) return false;
  const tags = [...source.matchAll(MARKUP_TAG)];
  if (!tags.length || !tags.every((tag) => TEXT_TAGS.has(tag[1].toLowerCase()))) return false;
  const openings = tags.filter((tag) => !tag[0].startsWith("</")).length;
  const closings = tags.length - openings;
  if (!closings && !/<br\b/i.test(source)) return false;
  // An element carrying the inline CSS of the page it came from (copied from a
  // web editor) is never typed by hand, even when it is the only tag among lines.
  const copiedStyle = tags.some((tag) => STYLE_ATTRIBUTE.test(tag[0]));
  return (
    copiedStyle ||
    openings >= 2 ||
    (/^<([a-z][a-z0-9]*)\b[^<>]*>/i.test(source) && /<\/[a-z][a-z0-9]*\s*>$/i.test(source))
  );
}

export function isSerializedSpansClipboard(html: string, text: string) {
  return !/<(?:pre|code)\b/i.test(html) && looksLikeSerializedMarkup(text);
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};
function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const value =
        code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(value) && value > 0 && value <= 0x10ffff
        ? String.fromCodePoint(value)
        : entity;
    }
    return ENTITIES[code.toLowerCase()] ?? entity;
  });
}

/** Clean text for plain fields (titles, comments, notes): tags removed, line breaks kept. */
export function serializedMarkupToPlainText(text: string) {
  return decodeEntities(
    text
      .replace(/\r\n?/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li\b[^>]*>/gi, "• ")
      .replace(/<\/(?:p|div|li|h[1-6])\s*>\n?/gi, "\n")
      .replace(MARKUP_TAG, ""),
  )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** HTML for the rich editor: keeps bold, links and lists; plain line breaks become breaks. */
function serializedMarkupToHtml(text: string) {
  const source = text.trim().replace(/\r\n?/g, "\n");
  // Block markup already describes the paragraphs; newlines between tags are layout only.
  return BLOCK_TAG.test(source) ? source : source.split("\n").join("<br>");
}

function htmlFragment(source: string) {
  const marked = source.match(/<!--\s*StartFragment\s*-->([\s\S]*?)<!--\s*EndFragment\s*-->/i);
  const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return (marked?.[1] ?? body?.[1] ?? source).replace(/<!--[\s\S]*?-->/g, "").trim();
}

/** Clipboard formats vary by browser and source application. Never feed plain text to the HTML parser. */
export function richTextPasteContent(html: string, text: string): RichTextPasteContent {
  if (isSerializedSpansClipboard(html, text)) {
    return { kind: "html", content: serializedMarkupToHtml(htmlFragment(text)) };
  }
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
