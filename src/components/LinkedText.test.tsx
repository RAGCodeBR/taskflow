import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FieldLinks, LinkedText } from "./LinkedText";

describe("clickable text", () => {
  it("renders a safe link in a new tab and preserves surrounding text as text", () => {
    const html = renderToStaticMarkup(
      createElement(LinkedText, {
        text: "<img src=x onerror=alert(1)> https://example.com/?a=1&b=2",
      }),
    );
    expect(html).toContain('href="https://example.com/?a=1&amp;b=2"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("&lt;img");
    expect(html).not.toContain("<img");
  });

  it("keeps ordinary fields unchanged and deduplicates link shortcuts", () => {
    expect(renderToStaticMarkup(createElement(FieldLinks, { value: "Texto sem link" }))).toBe("");
    const html = renderToStaticMarkup(
      createElement(FieldLinks, {
        value: "https://example.com/a https://example.com/a",
      }),
    );
    expect(html.match(/<a /g)).toHaveLength(1);
  });
});
