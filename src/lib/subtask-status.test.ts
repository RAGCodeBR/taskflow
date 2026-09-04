import { describe, expect, it } from "vitest";
import { countCompletedSubtasks, subtaskStatus } from "./subtask-status";

// Meio do dia, para que "ontem" e "amanhã" não escorreguem por fuso.
const HOJE = new Date("2026-09-04T12:00:00");

const sub = (done: boolean, due_date: string | null) => ({ done, due_date });

describe("subtaskStatus", () => {
  it("marca como concluída quando está feita", () => {
    expect(subtaskStatus(sub(true, "2026-09-10T12:00:00"), HOJE)).toBe("concluida");
  });

  it("concluída vence atrasada: entregue com atraso continua entregue", () => {
    expect(subtaskStatus(sub(true, "2026-08-01T12:00:00"), HOJE)).toBe("concluida");
  });

  it("sem prazo quando não há data", () => {
    expect(subtaskStatus(sub(false, null), HOJE)).toBe("sem_prazo");
  });

  it("atrasada quando o prazo ficou para trás", () => {
    expect(subtaskStatus(sub(false, "2026-09-03T12:00:00"), HOJE)).toBe("atrasada");
  });

  it("vencer hoje ainda é pendente, não atrasada", () => {
    expect(subtaskStatus(sub(false, "2026-09-04T08:00:00"), HOJE)).toBe("pendente");
    expect(subtaskStatus(sub(false, "2026-09-04T23:59:00"), HOJE)).toBe("pendente");
  });

  it("pendente quando o prazo está à frente", () => {
    expect(subtaskStatus(sub(false, "2026-09-30T12:00:00"), HOJE)).toBe("pendente");
  });
});

describe("countCompletedSubtasks", () => {
  it("conta quantas de quantas", () => {
    const lista = [sub(true, null), sub(false, null), sub(true, "2026-09-01T12:00:00")];
    expect(countCompletedSubtasks(lista)).toEqual({ done: 2, total: 3 });
  });

  it("lista vazia não quebra", () => {
    expect(countCompletedSubtasks([])).toEqual({ done: 0, total: 0 });
  });
});
