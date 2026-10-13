import { describe, expect, it } from "vitest";
import { isMuralPostCurrent } from "./mural-post-visibility";

describe("validade dos recados do mural", () => {
  it("mostra o recado até o último dia da validade", () => {
    expect(isMuralPostCurrent("2026-10-24", "2026-10-24")).toBe(true);
    expect(isMuralPostCurrent("2026-10-24", "2026-10-25")).toBe(false);
  });

  it("mantém recados sem validade visíveis", () => {
    expect(isMuralPostCurrent(null, "2026-10-25")).toBe(true);
  });
});
