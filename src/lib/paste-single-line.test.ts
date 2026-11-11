import { describe, expect, it, vi } from "vitest";
import type { ClipboardEvent } from "react";
import { pastePlainDescription, pasteSingleLine } from "./paste-single-line";

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

describe("paste styled markup mixed with ordinary lines", () => {
  const text = 'Legenda:\n<span style="color: rgb(55, 55, 55); font-size: 16px;">Um dia comum no estúdio.</span>';
  const clipboardData = { getData: (type: string) => (type === "text/plain" ? text : "") };

  it("keeps the title on one line without the tags", () => {
    const value = vi.fn();
    vi.stubGlobal("requestAnimationFrame", (callback: () => void) => callback());
    pasteSingleLine({
      clipboardData,
      currentTarget: { value: "", selectionStart: 0, selectionEnd: 0, setSelectionRange: vi.fn() },
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as ClipboardEvent<HTMLInputElement>, value);
    expect(value).toHaveBeenCalledWith("Legenda: Um dia comum no estúdio.");
    vi.unstubAllGlobals();
  });

  it("keeps paragraphs in plain descriptions without the tags", () => {
    const value = vi.fn();
    const target = {
      value: "",
      selectionStart: 0,
      selectionEnd: 0,
      setRangeText(inserted: string) { this.value = inserted; },
    };
    pastePlainDescription({
      clipboardData,
      currentTarget: target,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as ClipboardEvent<HTMLTextAreaElement>, value);
    expect(value).toHaveBeenCalledWith("Legenda:\nUm dia comum no estúdio.");
  });
});
