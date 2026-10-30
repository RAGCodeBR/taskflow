import type { ClipboardEvent } from "react";
import { isSerializedSpansClipboard } from "@/lib/rich-text-paste";

export function clipboardPlainText(event: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const html = event.clipboardData.getData("text/html");
  const text = event.clipboardData.getData("text/plain");
  return isSerializedSpansClipboard(html, text)
    ? new DOMParser().parseFromString(text, "text/html").body.textContent ?? text
    : text;
}

/** Paste into a task/subtask title without turning copied line breaks into actions. */
export function pasteSingleLine(
  event: ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  update: (value: string) => void,
) {
  const text = clipboardPlainText(event);
  if (!text) return;
  event.preventDefault();
  event.stopPropagation();
  const target = event.currentTarget;
  const selectionStart = target.selectionStart ?? target.value.length;
  const selectionEnd = target.selectionEnd ?? selectionStart;
  const normalized = text.replace(/\s*\r?\n\s*/g, " ").replace(/\s+/g, " ");
  const next = target.value.slice(0, selectionStart) + normalized + target.value.slice(selectionEnd);
  update(next);
  requestAnimationFrame(() => {
    const position = selectionStart + normalized.length;
    target.setSelectionRange(position, position);
  });
}

/** Plain description fields keep paragraphs; only clean serialized markup. */
export function pastePlainDescription(
  event: ClipboardEvent<HTMLTextAreaElement>,
  update: (value: string) => void,
) {
  const html = event.clipboardData.getData("text/html");
  const text = event.clipboardData.getData("text/plain");
  if (!isSerializedSpansClipboard(html, text)) return;
  event.preventDefault();
  event.stopPropagation();
  const target = event.currentTarget;
  target.setRangeText(clipboardPlainText(event), target.selectionStart, target.selectionEnd, "end");
  update(target.value);
}
