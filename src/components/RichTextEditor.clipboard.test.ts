import { describe, expect, it } from "vitest";
import { allClipboardImageFiles, hasClipboardText } from "./RichTextEditor";

describe("image paste shared by tasks and subtasks", () => {
  const print = new File(["imagem"], "print.png", { type: "image/png" });
  const clipboard = (html: string, text = "") => ({
    files: [print],
    items: [],
    types: ["Files", "text/html", "text/plain"],
    getData: (type: string) => type === "text/html" ? html : type === "text/plain" ? text : "",
  }) as unknown as DataTransfer;

  it("recognizes an image-only clipboard even when the source adds auxiliary text", () => {
    const data = clipboard('<img src="blob:print">', "imagem copiada");
    expect(hasClipboardText(data)).toBe(false);
    expect(allClipboardImageFiles(data)).toEqual([print]);
  });

  it("keeps meaningful copied text as text", () => {
    const data = clipboard("<p>Orientações para a subtarefa</p>", "Orientações para a subtarefa");
    expect(hasClipboardText(data)).toBe(true);
  });
});
