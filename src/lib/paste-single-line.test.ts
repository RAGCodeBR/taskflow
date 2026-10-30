import { describe, expect, it, vi } from "vitest";
import type { ClipboardEvent } from "react";
import { pasteSingleLine } from "./paste-single-line";

describe("paste into a task title", () => {
  it("inserts multiple copied lines as one title without dispatching Enter", () => {
    const value = vi.fn();
    const preventDefault = vi.fn();
    const stopPropagation = vi.fn();
    const target = { value: "Antes depois", selectionStart: 6, selectionEnd: 6, setSelectionRange: vi.fn() };
    vi.stubGlobal("requestAnimationFrame", (callback: () => void) => callback());
    pasteSingleLine({
      clipboardData: { getData: (type: string) => type === "text/plain" ? "linha 1\nlinha 2" : "" },
      currentTarget: target,
      preventDefault,
      stopPropagation,
    } as unknown as ClipboardEvent<HTMLInputElement>, value);
    expect(value).toHaveBeenCalledWith("Antes linha 1 linha 2depois");
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(stopPropagation).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
