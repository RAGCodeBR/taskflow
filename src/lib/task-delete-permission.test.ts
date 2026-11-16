import { describe, expect, it } from "vitest";
import { canDeleteTask, isRejectedTaskRemoval, rejectionMessage } from "./task-delete-permission";

describe("canDeleteTask", () => {
  const task = { created_by: "creator" };

  it("permite a quem criou a tarefa", () => {
    expect(canDeleteTask(task, { userId: "creator" })).toBe(true);
  });

  it("permite ao administrador mesmo sem ter criado", () => {
    expect(canDeleteTask(task, { userId: "admin", isAdmin: true })).toBe(true);
  });

  it("não permite ao responsável que não criou a tarefa", () => {
    expect(canDeleteTask(task, { userId: "assignee" })).toBe(false);
  });

  it("não permite sem usuário identificado", () => {
    expect(canDeleteTask({ created_by: null }, { userId: null })).toBe(false);
  });
});

describe("isRejectedTaskRemoval", () => {
  const removal = {
    entity: "task",
    action: "update",
    payload: { patch: { deleted_at: "2026-11-16T12:00:00.000Z", deleted_by: "user" } },
  };
  const ruleError = {
    code: "P0001",
    message: "Apenas o criador ou um administrador pode cancelar esta tarefa.",
  };

  it("reconhece a exclusão recusada por uma regra do banco", () => {
    expect(isRejectedTaskRemoval(removal, ruleError)).toBe(true);
  });

  it("mantém na fila quando a falha é de rede ou de sessão", () => {
    expect(isRejectedTaskRemoval(removal, new TypeError("Failed to fetch"))).toBe(false);
    expect(isRejectedTaskRemoval(removal, { code: "PGRST301", message: "JWT expired" })).toBe(
      false,
    );
  });

  it("não descarta edições comuns nem restaurações da Lixeira", () => {
    const edit = { entity: "task", action: "update", payload: { patch: { title: "Novo" } } };
    const restore = { entity: "task", action: "update", payload: { patch: { deleted_at: null } } };
    expect(isRejectedTaskRemoval(edit, ruleError)).toBe(false);
    expect(isRejectedTaskRemoval(restore, ruleError)).toBe(false);
  });

  it("não descarta criações nem outros tipos de registro", () => {
    const create = { entity: "task", action: "create", payload: { task: { deleted_at: "x" } } };
    const subtask = {
      entity: "subtask",
      action: "update",
      payload: { patch: { deleted_at: "x" } },
    };
    expect(isRejectedTaskRemoval(create, ruleError)).toBe(false);
    expect(isRejectedTaskRemoval(subtask, ruleError)).toBe(false);
  });
});

describe("rejectionMessage", () => {
  it("usa o texto do servidor e tem um padrão quando ele não vem", () => {
    expect(rejectionMessage({ message: " Regra do banco. " })).toBe("Regra do banco.");
    expect(rejectionMessage(null)).toBe("O servidor não aceitou a exclusão.");
  });
});
