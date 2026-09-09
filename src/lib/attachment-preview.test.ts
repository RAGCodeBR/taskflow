import { describe, expect, it } from "vitest";
import { canPreviewAttachment } from "@/lib/attachment-preview";

describe("canPreviewAttachment", () => {
  it.each(["relatorio.docx", "dados.xlsx", "macros.xlsm", "exportacao.csv"])(
    "reconhece %s mesmo sem MIME type",
    (fileName) => {
      expect(canPreviewAttachment(fileName, null)).toBe(true);
    },
  );

  it("mantem os formatos de mídia e PDF disponíveis", () => {
    expect(canPreviewAttachment("imagem", "image/png")).toBe(true);
    expect(canPreviewAttachment("relatorio", "application/pdf")).toBe(true);
  });

  it("não anuncia preview para formatos ainda não suportados", () => {
    expect(canPreviewAttachment("documento.doc", "application/msword")).toBe(false);
    expect(canPreviewAttachment("planilha.xls", "application/vnd.ms-excel")).toBe(false);
    expect(canPreviewAttachment("apresentacao.pptx", null)).toBe(false);
  });
});
