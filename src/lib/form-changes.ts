import { htmlHasMeaningfulText, plainTextToEditorHtml } from "./rich-text-paste";

/** Editor initialization and an empty paragraph do not count as a user edit. */
export function richTextFormValue(value: string | null | undefined) {
  const text = value ?? "";
  if (!htmlHasMeaningfulText(text) && !/<(?:img|hr)\b/i.test(text)) return "";
  return /<[a-z][\s\S]*>/i.test(text) ? text : plainTextToEditorHtml(text);
}

export function formValuesChanged(initial: Record<string, unknown>, current: Record<string, unknown>) {
  const keys = new Set([...Object.keys(initial), ...Object.keys(current)]);
  return [...keys].some((key) => JSON.stringify(initial[key]) !== JSON.stringify(current[key]));
}

export const formIdSet = (values: readonly string[]) => [...new Set(values)].sort();
