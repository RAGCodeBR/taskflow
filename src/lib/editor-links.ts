import type { JSONContent } from "@tiptap/core";
import { findTextLinks } from "./text-links";

/** Adds web-link marks to existing editor text without changing the saved content on open. */
export function linkifyEditorDocument(document: JSONContent): JSONContent | null {
  let changed = false;

  const transform = (node: JSONContent, insideCodeBlock = false): JSONContent[] => {
    if (
      node.type === "text" &&
      node.text &&
      !insideCodeBlock &&
      !node.marks?.some((mark) => mark.type === "link" || mark.type === "code")
    ) {
      const links = findTextLinks(node.text);
      if (links.length) {
        changed = true;
        const parts: JSONContent[] = [];
        let cursor = 0;
        for (const link of links) {
          if (link.start > cursor) parts.push({ ...node, text: node.text.slice(cursor, link.start) });
          parts.push({
            ...node,
            text: link.text,
            marks: [...(node.marks ?? []), { type: "link", attrs: { href: link.href } }],
          });
          cursor = link.end;
        }
        if (cursor < node.text.length) parts.push({ ...node, text: node.text.slice(cursor) });
        return parts;
      }
    }

    if (!node.content?.length || insideCodeBlock) return [node];
    const content = node.content.flatMap((child) => transform(child, node.type === "codeBlock"));
    return changed ? [{ ...node, content }] : [node];
  };

  const [result] = transform(document);
  return changed ? result : null;
}
