export type SpreadsheetCellValue = string | number | boolean | Date | null | undefined;

function isPercentageColumn(header: SpreadsheetCellValue) {
  if (typeof header !== "string") return false;
  const normalized = header
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return (
    normalized.includes("%") || normalized.includes("percent") || normalized.includes("porcent")
  );
}

/** Formata somente a visualização; o arquivo original não é modificado. */
export function formatSpreadsheetCell(value: SpreadsheetCellValue, header?: SpreadsheetCellValue) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleString("pt-BR");
  if (typeof value !== "number" || !Number.isFinite(value)) return String(value);

  if (isPercentageColumn(header)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Retorna o cabeçalho textual mais próximo acima da célula. */
export function spreadsheetColumnHeader(
  rows: SpreadsheetCellValue[][],
  rowIndex: number,
  columnIndex: number,
) {
  for (let index = rowIndex - 1; index >= 0; index -= 1) {
    const candidate = rows[index]?.[columnIndex];
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }
  return undefined;
}
