import { describe, expect, it } from "vitest";
import {
  isConversationRoom,
  sortRoomsByLastMessage,
  unreadInRoom,
  unreadMessageCount,
  unreadRoomCount,
} from "./task-conversations";

const task = (over: Partial<Parameters<typeof isConversationRoom>[0]> = {}) => ({
  id: "t1",
  completed_at: null,
  status: "todo",
  deleted_at: null,
  ...over,
});

describe("unreadMessageCount", () => {
  it("soma cada mensagem não lida, inclusive quando são da mesma conversa", () => {
    const msgs = [
      { task_id: "t1", author_id: "outro", created_at: "2026-09-03T10:00:00Z" },
      { task_id: "t1", author_id: "outro", created_at: "2026-09-03T10:01:00Z" },
      { task_id: "t2", author_id: "outro", created_at: "2026-09-03T10:02:00Z" },
      { task_id: "t2", author_id: "eu", created_at: "2026-09-03T10:03:00Z" },
    ];
    expect(unreadMessageCount(msgs, ["t1", "t2"], "eu", new Map())).toBe(3);
  });
});

describe("isConversationRoom", () => {
  it("tarefa ativa com mensagem é sala", () => {
    expect(isConversationRoom(task(), true)).toBe(true);
  });
  it("sem mensagem não é sala", () => {
    expect(isConversationRoom(task(), false)).toBe(false);
  });
  it("concluída sai da lista (completed_at)", () => {
    expect(isConversationRoom(task({ completed_at: "2026-09-01T10:00:00Z" }), true)).toBe(false);
  });
  it("concluída sai da lista (status done)", () => {
    expect(isConversationRoom(task({ status: "done" }), true)).toBe(false);
  });
  it("na lixeira não é sala", () => {
    expect(isConversationRoom(task({ deleted_at: "2026-09-01T10:00:00Z" }), true)).toBe(false);
  });
  it("conversa concluída sai da lista, mas mantém seu histórico na tarefa", () => {
    expect(isConversationRoom(task({ conversation_closed_at: "2026-09-11T10:00:00Z" }), true)).toBe(
      false,
    );
  });
});

describe("sortRoomsByLastMessage", () => {
  it("mais recente primeiro", () => {
    const rooms = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const last = new Map([
      ["a", "2026-09-01T10:00:00Z"],
      ["b", "2026-09-03T10:00:00Z"],
      ["c", "2026-09-02T10:00:00Z"],
    ]);
    expect(sortRoomsByLastMessage(rooms, last).map((r) => r.id)).toEqual(["b", "c", "a"]);
  });
  it("sala sem última mensagem vai para o fim", () => {
    const rooms = [{ id: "a" }, { id: "semmsg" }];
    const last = new Map([["a", "2026-09-01T10:00:00Z"]]);
    expect(sortRoomsByLastMessage(rooms, last).map((r) => r.id)).toEqual(["a", "semmsg"]);
  });
});

describe("unreadInRoom", () => {
  const msgs = [
    { task_id: "t1", author_id: "outro", created_at: "2026-09-02T10:00:00Z" },
    { task_id: "t1", author_id: "outro", created_at: "2026-09-03T10:00:00Z" },
    { task_id: "t1", author_id: "eu", created_at: "2026-09-04T10:00:00Z" },
    { task_id: "t2", author_id: "outro", created_at: "2026-09-05T10:00:00Z" },
  ];
  it("conta só o que é de outro e mais novo que o last_read", () => {
    expect(unreadInRoom(msgs, "t1", "eu", "2026-09-02T12:00:00Z")).toBe(1);
  });
  it("minhas mensagens nunca contam", () => {
    expect(unreadInRoom(msgs, "t1", "eu", null)).toBe(2);
  });
  it("sem last_read tudo do outro conta", () => {
    expect(unreadInRoom(msgs, "t2", "eu", null)).toBe(1);
  });
  it("last_read depois de tudo zera", () => {
    expect(unreadInRoom(msgs, "t1", "eu", "2026-09-10T00:00:00Z")).toBe(0);
  });
  it("não vaza mensagem de outra tarefa", () => {
    expect(unreadInRoom(msgs, "t1", "eu", null)).toBe(2); // ignora a de t2
  });
});

describe("unreadRoomCount", () => {
  const msgs = [
    { task_id: "t1", author_id: "outro", created_at: "2026-09-03T10:00:00Z" },
    { task_id: "t2", author_id: "outro", created_at: "2026-09-03T10:00:00Z" },
    { task_id: "t3", author_id: "eu", created_at: "2026-09-03T10:00:00Z" },
  ];
  it("conta salas com pendência, não mensagens", () => {
    const lastRead = new Map([["t2", "2026-09-04T00:00:00Z"]]); // t2 já visto
    expect(unreadRoomCount(msgs, ["t1", "t2", "t3"], "eu", lastRead)).toBe(1); // só t1
  });
  it("nenhuma pendência = 0", () => {
    const lastRead = new Map([
      ["t1", "2026-09-04T00:00:00Z"],
      ["t2", "2026-09-04T00:00:00Z"],
    ]);
    expect(unreadRoomCount(msgs, ["t1", "t2", "t3"], "eu", lastRead)).toBe(0);
  });
});
