import { describe, expect, it } from "vitest";
import { participantColor } from "./participant-color";

describe("participantColor", () => {
  it("é determinístico para o mesmo id", () => {
    const a = participantColor("11111111-1111-1111-1111-111111111111");
    const b = participantColor("11111111-1111-1111-1111-111111111111");
    expect(a).toEqual(b);
  });

  it("ids diferentes tendem a cores diferentes", () => {
    const ids = [
      "aaaaaaaa-0000-0000-0000-000000000001",
      "bbbbbbbb-0000-0000-0000-000000000002",
      "cccccccc-0000-0000-0000-000000000003",
      "dddddddd-0000-0000-0000-000000000004",
    ];
    const bubbles = new Set(ids.map((id) => participantColor(id).bubble));
    expect(bubbles.size).toBeGreaterThan(1);
  });

  it("sempre devolve classes de bolha e avatar", () => {
    const c = participantColor("qualquer-coisa");
    expect(c.bubble).toMatch(/bg-/);
    expect(c.avatar).toMatch(/bg-/);
  });

  it("id vazio não quebra", () => {
    expect(participantColor(null).bubble).toMatch(/bg-/);
    expect(participantColor(undefined).bubble).toMatch(/bg-/);
  });
});
