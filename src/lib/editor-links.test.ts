import { describe, expect, it } from "vitest";
import { linkifyEditorDocument } from "./editor-links";

describe("links in existing task descriptions", () => {
  it("makes plain addresses clickable in their original position and preserves formatting", () => {
    const original = {
      type: "doc",
      content: [{
        type: "bulletList",
        content: [{
          type: "listItem",
          content: [{
            type: "paragraph",
            content: [{ type: "text", text: "Veja www.google.com e example.org/briefing.", marks: [{ type: "bold" }] }],
          }],
        }],
      }],
    };

    const updated = linkifyEditorDocument(original);
    const parts = updated?.content?.[0].content?.[0].content?.[0].content;
    expect(parts?.map((part) => part.text).join("")).toBe("Veja www.google.com e example.org/briefing.");
    expect(parts?.filter((part) => part.marks?.some((mark) => mark.type === "link"))).toEqual([
      { type: "text", text: "www.google.com", marks: [{ type: "bold" }, { type: "link", attrs: { href: "https://www.google.com/" } }] },
      { type: "text", text: "example.org/briefing", marks: [{ type: "bold" }, { type: "link", attrs: { href: "https://example.org/briefing" } }] },
    ]);
    expect(original.content[0].content[0].content[0].content).toHaveLength(1);
  });

  it("does not change existing links, code, email addresses or unsafe schemes", () => {
    const document = {
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "https://example.com", marks: [{ type: "link", attrs: { href: "https://example.com" } }] }] },
        { type: "codeBlock", content: [{ type: "text", text: "www.example.com" }] },
        { type: "paragraph", content: [{ type: "text", text: "contact@example.com javascript:alert(1)", marks: [{ type: "code" }] }] },
      ],
    };
    expect(linkifyEditorDocument(document)).toBeNull();
  });
});
