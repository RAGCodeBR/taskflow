import { find } from "linkifyjs";

export type TextLink = { start: number; end: number; text: string; href: string };

export function webLinkHref(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

/** Recognizes web URLs without treating email addresses or unsafe schemes as links. */
export function findTextLinks(text: string): TextLink[] {
  return find(text, "url", { defaultProtocol: "https" }).flatMap((match) => {
    const href = webLinkHref(match.href);
    return href ? [{ start: match.start, end: match.end, text: match.value, href }] : [];
  });
}

/** Only text nodes are transformed; HTML attributes, existing links and code stay intact. */
export function linkifyTextNodes(container: HTMLElement) {
  const document = container.ownerDocument;
  const walker = document.createTreeWalker(container, 4 /* SHOW_TEXT */);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (!node.parentElement?.closest("a, code, pre, script, style, textarea")) nodes.push(node);
  }

  for (const node of nodes) {
    const text = node.data;
    const links = findTextLinks(text);
    if (!links.length) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const link of links) {
      fragment.append(document.createTextNode(text.slice(cursor, link.start)));
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.text;
      fragment.append(anchor);
      cursor = link.end;
    }
    fragment.append(document.createTextNode(text.slice(cursor)));
    node.replaceWith(fragment);
  }

  for (const anchor of container.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    const originalHref = anchor.getAttribute("href") ?? "";
    const href =
      webLinkHref(originalHref) ??
      findTextLinks(originalHref).find(
        (link) => link.start === 0 && link.end === originalHref.length,
      )?.href;
    if (!href) continue;
    anchor.href = href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.classList.add("cursor-pointer", "underline", "underline-offset-2");
  }
}
