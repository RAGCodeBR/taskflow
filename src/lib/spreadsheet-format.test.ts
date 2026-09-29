import { describe, expect, it } from "vitest";
import { formatSpreadsheetCell, spreadsheetColumnHeader } from "@/lib/spreadsheet-format";

describe("formatSpreadsheetCell", () => {
  it("usa ponto para milhar e duas casas para valores decimais", () => {
    expect(formatSpreadsheetCell(12550.74)).toBe("12.550,74");
    expect(formatSpreadsheetCell(23356.8)).toBe("23.356,80");
    expect(formatSpreadsheetCell(5780)).toBe("5.780");
  });

  it("converte uma coluna de porcentagem para percentual legível", () => {
    expect(formatSpreadsheetCell(0.32270116185483, "% do Total")).toBe("32,27%");
  });

  it("mantém texto, datas e valores vazios sem convertê-los em número", () => {
    expect(formatSpreadsheetCell("0012")).toBe("0012");
    expect(formatSpreadsheetCell(null)).toBe("");
    expect(formatSpreadsheetCell(new Date("2026-01-02T03:04:05Z"))).toContain("2026");
  });
});

describe("spreadsheetColumnHeader", () => {
  it("encontra o cabeçalho textual mais próximo acima da coluna", () => {
    const rows = [
      ["Convênio", "% do Total"],
      ["Blue Med", 0.3227],
    ];
    expect(spreadsheetColumnHeader(rows, 1, 1)).toBe("% do Total");
  });
});
