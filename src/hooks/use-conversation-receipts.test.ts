import { describe, expect, it } from "vitest";
import {
  formatSeenAt,
  whoSawMessage,
  type ConversationParticipant,
} from "./use-conversation-receipts";

const participants: ConversationParticipant[] = [
  { id: "author", name: "Autor", avatarUrl: null, lastReadAt: "2026-09-14T10:00:00Z" },
  { id: "b", name: "Beatriz", avatarUrl: null, lastReadAt: "2026-09-14T10:05:00Z" },
  { id: "c", name: "Carlos", avatarUrl: null, lastReadAt: null },
  { id: "d", name: "Duda", avatarUrl: null, lastReadAt: "2026-09-14T09:50:00Z" },
];

describe("whoSawMessage", () => {
  it("separa quem já viu de quem ainda não viu, sem contar o autor", () => {
    const result = whoSawMessage(participants, "author", "2026-09-14T09:55:00Z");
    expect(result.seen.map((p) => p.id)).toEqual(["b"]);
    expect(result.notSeen.map((p) => p.id).sort()).toEqual(["c", "d"]);
    expect(result.totalRecipients).toBe(3);
  });

  it("quem nunca leu (lastReadAt null) sempre fica em notSeen", () => {
    const result = whoSawMessage(participants, "author", "2026-01-01T00:00:00Z");
    expect(result.notSeen.map((p) => p.id)).toContain("c");
  });

  it("ordena quem viu pelo horário mais antigo primeiro", () => {
    const ps: ConversationParticipant[] = [
      { id: "a", name: "A", avatarUrl: null, lastReadAt: "2026-09-14T11:00:00Z" },
      { id: "b", name: "B", avatarUrl: null, lastReadAt: "2026-09-14T10:00:00Z" },
    ];
    const result = whoSawMessage(ps, null, "2026-09-14T09:00:00Z");
    expect(result.seen.map((p) => p.id)).toEqual(["b", "a"]);
  });
});

describe("formatSeenAt", () => {
  const now = new Date("2026-09-14T15:00:00");

  it("nunca entrou", () => {
    expect(formatSeenAt(null, now)).toBe("Ainda não entrou");
  });

  it("mesmo dia mostra só a hora", () => {
    const today = new Date("2026-09-14T10:05:00");
    expect(formatSeenAt(today.toISOString(), now)).toBe(
      today.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    );
  });

  it("dia diferente mostra data e hora", () => {
    const yesterday = new Date("2026-09-13T10:05:00");
    expect(formatSeenAt(yesterday.toISOString(), now)).toBe(
      `${yesterday.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} às ${yesterday.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`,
    );
  });
});
