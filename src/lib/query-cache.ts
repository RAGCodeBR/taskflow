import type { QueryClient, QueryKey } from "@tanstack/react-query";

/**
 * Atualiza na hora as listas que a tela está exibindo.
 *
 * As listas ficam guardadas com um endereço composto, por exemplo
 * `["tasks", usuário, ambiente]` ou `["columns", ambiente]`. Gravar só em
 * `["tasks"]` cria uma lista solta que nenhuma tela lê, e a alteração só
 * aparece quando o servidor responde. Aqui a mudança é aplicada a todas as
 * listas cujo endereço começa com `prefix`.
 *
 * Só listas (arrays) já carregadas são alteradas; registros avulsos guardados
 * sob o mesmo prefixo, como `["clients", idDoCliente]`, ficam intactos.
 */
export function updateCachedLists<Item>(
  queryClient: QueryClient,
  prefix: QueryKey,
  update: (current: Item[]) => Item[],
  options: { skip?: (queryKey: QueryKey) => boolean } = {},
) {
  queryClient.setQueriesData<Item[]>(
    {
      queryKey: prefix,
      predicate: (query) => !options.skip?.(query.queryKey),
    },
    (current) => (Array.isArray(current) ? update(current) : current),
  );
}

/** Lixeira e arquivadas também começam com "tasks", mas não são o quadro. */
export const isSideTaskList = (queryKey: QueryKey) =>
  queryKey[1] === "deleted" || queryKey[1] === "archived";

/** Procura uma tarefa em qualquer lista de tarefas já carregada. */
export function findCachedTask<Task extends { id: string }>(
  queryClient: QueryClient,
  taskId: string | null | undefined,
): Task | undefined {
  if (!taskId) return undefined;
  for (const [, list] of queryClient.getQueriesData<Task[]>({ queryKey: ["tasks"] })) {
    if (!Array.isArray(list)) continue;
    const found = list.find((item) => item.id === taskId);
    if (found) return found;
  }
  return undefined;
}

/** Aplica um ajuste a uma tarefa em todas as listas em que ela aparece. */
export function patchCachedTask<Task extends { id: string }>(
  queryClient: QueryClient,
  taskId: string,
  patch: Partial<Task>,
) {
  updateCachedLists<Task>(queryClient, ["tasks"], (current) =>
    current.map((item) => (item.id === taskId ? { ...item, ...patch } : item)),
  );
}

/**
 * Inclui uma tarefa recém-criada nas listas do quadro. Lixeira e arquivadas
 * ficam de fora, assim como a pré-visualização de outro ambiente.
 */
export function addCachedTask<Task extends { id: string; workspace_id?: string | null; origin_workspace_id?: string | null; created_by?: string | null }>(
  queryClient: QueryClient,
  task: Task,
) {
  updateCachedLists<Task>(
    queryClient,
    ["tasks"],
    (current) => (current.some((item) => item.id === task.id) ? current : [...current, task]),
    {
      skip: (queryKey) => {
        if (isSideTaskList(queryKey)) return true;
        // ["tasks", usuário, ambiente ativo, ambiente pré-visualizado]
        if (task.created_by && queryKey[1] !== task.created_by) return true;
        if ((!queryKey[3] || queryKey[3] === queryKey[2]) && task.origin_workspace_id === queryKey[2]) return false;
        const workspace = queryKey[3] ?? queryKey[2];
        return (
          typeof workspace === "string" &&
          !!task.workspace_id &&
          workspace !== task.workspace_id
        );
      },
    },
  );
}
