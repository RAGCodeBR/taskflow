import { describe, expect, it } from "vitest";
import { findTextLinks, webLinkHref } from "./text-links";

describe("web links in user text", () => {
  it("keeps query parameters, fragments and balanced parentheses while leaving punctuation outside", () => {
    const text = "Confira (https://example.com/a_(b)?x=1&y=2#video).";
    const [link] = findTextLinks(text);
    expect(link.text).toBe("https://example.com/a_(b)?x=1&y=2#video");
    expect(text.slice(link.start, link.end)).toBe(link.text);
    expect(link.href).toBe(link.text);
    expect(text.slice(link.end)).toBe(").");
  });

  it("recognizes several links and uses HTTPS for addresses without a scheme", () => {
    expect(
      findTextLinks("www.example.com/material\nexample.org/briefing").map((link) => link.href),
    ).toEqual(["https://www.example.com/material", "https://example.org/briefing"]);
  });

  it("does not turn mentions, email addresses or executable schemes into web links", () => {
    expect(
      findTextLinks("@Gabriel contato@example.com javascript:alert(1) data:text/html,oi"),
    ).toEqual([]);
    expect(webLinkHref("javascript:alert(1)")).toBeNull();
    expect(webLinkHref("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(webLinkHref("file:///C:/test.txt")).toBeNull();
  });
});
