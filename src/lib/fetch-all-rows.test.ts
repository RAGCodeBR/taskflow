import { describe, expect, it, vi } from "vitest";
import { fetchAllRows } from "./fetch-all-rows";

type Row = { id: string };

const rowsOf = (total: number): Row[] =>
  Array.from({ length: total }, (_, index) => ({ id: `row-${index}` }));

/** Simula a API: nunca devolve mais do que `serverCap` linhas por resposta. */
function server(all: Row[], serverCap: number, withCount = true) {
  return vi.fn(async (from: number, to: number) => ({
    data: all.slice(from, Math.min(to + 1, from + serverCap)),
    error: null,
    count: withCount ? all.length : null,
  }));
}

describe("fetchAllRows", () => {
  it("lê em uma única resposta quando a lista cabe no lote", async () => {
    const fetchPage = server(rowsOf(300), 1000);
    const result = await fetchAllRows(fetchPage, { rowKey: (row) => row.id });
    expect(result.error).toBeNull();
    expect(result.data).toHaveLength(300);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  it("continua pedindo páginas quando a lista passa do lote", async () => {
    const fetchPage = server(rowsOf(2350), 1000);
    const result = await fetchAllRows(fetchPage, { rowKey: (row) => row.id });
    expect(result.data).toHaveLength(2350);
    expect(result.data?.at(-1)).toEqual({ id: "row-2349" });
    expect(fetchPage).toHaveBeenCalledTimes(3);
    expect(fetchPage).toHaveBeenNthCalledWith(2, 1000, 1999);
  });

  it("não para antes do fim quando o servidor entrega lotes menores que o pedido", async () => {
    const fetchPage = server(rowsOf(1200), 500);
    const result = await fetchAllRows(fetchPage, { rowKey: (row) => row.id });
    expect(result.data).toHaveLength(1200);
    expect(fetchPage).toHaveBeenNthCalledWith(2, 500, 1499);
  });

  it("lê uma lista com exatamente o tamanho do lote sem pedir página extra", async () => {
    const fetchPage = server(rowsOf(1000), 1000);
    const result = await fetchAllRows(fetchPage, { rowKey: (row) => row.id });
    expect(result.data).toHaveLength(1000);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  it("sem total do servidor, encerra na primeira página incompleta", async () => {
    const fetchPage = server(rowsOf(1500), 1000, false);
    const result = await fetchAllRows(fetchPage, { rowKey: (row) => row.id });
    expect(result.data).toHaveLength(1500);
    expect(fetchPage).toHaveBeenCalledTimes(2);
  });

  it("não duplica uma linha que aparece em duas páginas", async () => {
    const pages: Row[][] = [
      [{ id: "a" }, { id: "b" }],
      [{ id: "b" }, { id: "c" }],
    ];
    const fetchPage = vi.fn(async (from: number) => ({
      data: pages[from / 2] ?? [],
      error: null,
      count: 4,
    }));
    const result = await fetchAllRows(fetchPage, { pageSize: 2, rowKey: (row) => row.id });
    expect(result.data).toEqual([{ id: "a" }, { id: "b" }, { id: "c" }]);
  });

  it("devolve o erro, e nenhuma linha, quando uma página falha no meio", async () => {
    const failure = { message: "rede" };
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ data: rowsOf(1000), error: null, count: 2500 })
      .mockResolvedValueOnce({ data: null, error: failure, count: null });
    const result = await fetchAllRows<Row, typeof failure>(fetchPage);
    expect(result).toEqual({ data: null, error: failure });
  });
});
