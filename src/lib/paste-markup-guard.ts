import { isSerializedSpansClipboard, serializedMarkupToPlainText } from "@/lib/rich-text-paste";

const TEXT_INPUT_TYPES = new Set(["", "text", "search", "url", "email", "tel"]);

function plainTextField(target: EventTarget | null): HTMLInputElement | HTMLTextAreaElement | null {
  if (target instanceof HTMLTextAreaElement)
    return target.readOnly || target.disabled ? null : target;
  if (target instanceof HTMLInputElement && TEXT_INPUT_TYPES.has(target.type))
    return target.readOnly || target.disabled ? null : target;
  return null;
}

/**
 * Safety net for every plain text field in the app: text copied as markup
 * ("<span>…</span>" from ChatGPT and similar tools) is pasted without the tags.
 * Runs after the field's own paste handler, so fields that already handle
 * pasting (titles, rich editors) keep their behaviour.
 */
export function handleMarkupPaste(event: ClipboardEvent) {
  if (event.defaultPrevented || !event.clipboardData) return false;
  const field = plainTextField(event.target);
  if (!field) return false;
  const html = event.clipboardData.getData("text/html");
  const text = event.clipboardData.getData("text/plain");
  if (!isSerializedSpansClipboard(html, text)) return false;
  event.preventDefault();
  let clean = serializedMarkupToPlainText(text);
  if (field instanceof HTMLInputElement) clean = clean.replace(/\s*\n\s*/g, " ");
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  field.setRangeText(clean, start, end, "end");
  // React-controlled fields pick the new value up from the input event.
  field.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}

export function installMarkupPasteGuard(target: Window = window) {
  const listener = (event: Event) => {
    handleMarkupPaste(event as ClipboardEvent);
  };
  // Bubble phase on window: React's own onPaste handlers run first.
  target.addEventListener("paste", listener);
  return () => target.removeEventListener("paste", listener);
}
