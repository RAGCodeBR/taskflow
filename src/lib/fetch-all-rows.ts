/**
 * Leitura completa de listas grandes do Supabase.
 *
 * A API devolve no máximo um lote de linhas por resposta (1000 por padrão) e
 * corta o restante sem avisar. Uma consulta sem paginação parece funcionar
 * até a tabela crescer; a partir daí, registros somem e voltam conforme a
 * ordem em que o banco monta o lote. Este utilitário pede as páginas
 * seguintes até completar o total informado pelo próprio servidor.
 *
 * Quem chama deve:
 *  - pedir `{ count: "exact" }` no select/rpc, para que o limite configurado
 *    no servidor (qualquer que seja) não encerre a leitura antes da hora;
 *  - ordenar por uma chave sem empates (termine com o id), senão páginas
 *    consecutivas podem repetir ou pular linhas.
 */
export const FETCH_PAGE_SIZE = 1000;

/** Trava de segurança: nenhuma lista do app deveria passar disso. */
const MAX_PAGES = 200;

export interface RowPage<Row, Failure = unknown> {
  data: Row[] | null;
  error: Failure | null;
  count?: number | null;
}

export async function fetchAllRows<Row, Failure = unknown>(
  fetchPage: (from: number, to: number) => PromiseLike<RowPage<Row, Failure>>,
  options: { pageSize?: number; rowKey?: (row: Row) => string | null | undefined } = {},
): Promise<{ data: Row[] | null; error: Failure | null }> {
  const pageSize = options.pageSize ?? FETCH_PAGE_SIZE;
  const rows: Row[] = [];
  const seen = new Set<string>();
  let offset = 0;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const { data, error, count } = await fetchPage(offset, offset + pageSize - 1);
    // Uma página que falha invalida a leitura inteira: devolver só o começo
    // reproduziria exatamente o corte silencioso que este utilitário evita.
    if (error) return { data: null, error };

    const received = data ?? [];
    for (const row of received) {
      const key = options.rowKey?.(row);
      // Uma linha pode aparecer em duas páginas se algo mudar entre as leituras.
      if (key != null) {
        if (seen.has(key)) continue;
        seen.add(key);
      }
      rows.push(row);
    }

    offset += received.length;
    if (received.length === 0) break;
    if (typeof count === "number") {
      if (offset >= count) break;
    } else if (received.length < pageSize) {
      break;
    }
  }

  return { data: rows, error: null };
}
