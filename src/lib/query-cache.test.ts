import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { addCachedTask, findCachedTask, patchCachedTask, updateCachedLists } from "./query-cache";

type Task = { id: string; title: string; workspace_id?: string | null };

const boardKey = ["tasks", "user-1", "ws-marketing", null];

function clientWithBoard() {
  const queryClient = new QueryClient();
  queryClient.setQueryData<Task[]>(boardKey, [
    { id: "a", title: "A", workspace_id: "ws-marketing" },
    { id: "b", title: "B", workspace_id: "ws-marketing" },
  ]);
  return queryClient;
}

describe("updateCachedLists", () => {
  it("altera a lista que a tela lê, guardada com usuário e ambiente", () => {
    const queryClient = clientWithBoard();
    patchCachedTask<Task>(queryClient, "a", { title: "A editada" });
    expect(queryClient.getQueryData<Task[]>(boardKey)?.[0].title).toBe("A editada");
  });

  it("não cria uma lista solta no endereço curto", () => {
    const queryClient = clientWithBoard();
    patchCachedTask<Task>(queryClient, "a", { title: "A editada" });
    expect(queryClient.getQueryData(["tasks"])).toBeUndefined();
  });

  it("não toca em registros avulsos guardados sob o mesmo prefixo", () => {
    const queryClient = new QueryClient();
    const single = { id: "client-1", name: "Cliente" };
    queryClient.setQueryData(["clients", "client-1"], single);
    queryClient.setQueryData(["clients", "ws-1"], [single]);
    updateCachedLists<{ id: string; name: string }>(queryClient, ["clients"], (current) =>
      current.filter((item) => item.id !== "client-1"),
    );
    expect(queryClient.getQueryData(["clients", "client-1"])).toEqual(single);
    expect(queryClient.getQueryData(["clients", "ws-1"])).toEqual([]);
  });
});

describe("addCachedTask", () => {
  it("inclui a tarefa no quadro, sem duplicar", () => {
    const queryClient = clientWithBoard();
    const task = { id: "c", title: "C", workspace_id: "ws-marketing" };
    addCachedTask<Task>(queryClient, task);
    addCachedTask<Task>(queryClient, task);
    expect(queryClient.getQueryData<Task[]>(boardKey)?.map((item) => item.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("deixa de fora a Lixeira, as arquivadas e a pré-visualização de outro ambiente", () => {
    const queryClient = clientWithBoard();
    queryClient.setQueryData<Task[]>(["tasks", "user-1", "ws-consultoria", null], []);
    queryClient.setQueryData<Task[]>(["tasks", "deleted"], []);
    queryClient.setQueryData<Task[]>(["tasks", "archived", "client-1", false], []);
    queryClient.setQueryData<Task[]>(["tasks", "user-1", "ws-marketing", "ws-consultoria"], []);
    addCachedTask<Task>(queryClient, { id: "c", title: "C", workspace_id: "ws-marketing" });
    expect(queryClient.getQueryData(["tasks", "user-1", "ws-consultoria", null])).toEqual([]);
    expect(queryClient.getQueryData(["tasks", "deleted"])).toEqual([]);
    expect(queryClient.getQueryData(["tasks", "archived", "client-1", false])).toEqual([]);
    expect(queryClient.getQueryData(["tasks", "user-1", "ws-marketing", "ws-consultoria"])).toEqual(
      [],
    );
  });
});

describe("findCachedTask", () => {
  it("encontra a tarefa na lista carregada do quadro", () => {
    const queryClient = clientWithBoard();
    expect(findCachedTask<Task>(queryClient, "b")?.title).toBe("B");
    expect(findCachedTask<Task>(queryClient, "x")).toBeUndefined();
    expect(findCachedTask<Task>(queryClient, null)).toBeUndefined();
  });
});
