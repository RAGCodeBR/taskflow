import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FileWarning, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

export interface PreviewableAttachment {
  file_name: string;
  storage_path: string;
  mime_type: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attachment: PreviewableAttachment | null;
}

interface SpreadsheetSheet {
  name: string;
  rows: string[][];
  totalRows: number;
  totalColumns: number;
}

const MAX_SPREADSHEET_ROWS = 500;
const MAX_SPREADSHEET_COLUMNS = 50;

function fileExtension(fileName: string | undefined) {
  return fileName?.split(".").pop()?.toLocaleLowerCase() ?? "";
}

function parseCsv(source: string) {
  const firstLine = source.split(/\r?\n/, 1)[0] ?? "";
  const delimiter = [",", ";", "\t"].reduce(
    (selected, candidate) =>
      firstLine.split(candidate).length > firstLine.split(selected).length ? candidate : selected,
    ",",
  );
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];
    if (character === '"') {
      if (quoted && nextCharacter === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === delimiter && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && nextCharacter === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

export function AttachmentPreviewDialog({ open, onOpenChange, attachment }: Props) {
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [renderingDocument, setRenderingDocument] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sheets, setSheets] = useState<SpreadsheetSheet[]>([]);
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const wordContainerRef = useRef<HTMLDivElement>(null);

  const extension = fileExtension(attachment?.file_name);
  const mime = attachment?.mime_type ?? "";
  const isImage = mime.startsWith("image/");
  const isVideo = mime.startsWith("video/");
  const isAudio = mime.startsWith("audio/");
  const isPdf = mime === "application/pdf" || mime.includes("pdf");
  const isDocx =
    extension === "docx" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const isSpreadsheet = ["xlsx", "xlsm", "csv"].includes(extension);
  const isText = !isSpreadsheet && !isDocx && (mime.startsWith("text/") || mime.includes("json"));
  const hasEmbeddedPreview =
    isImage || isPdf || isVideo || isAudio || isText || isDocx || isSpreadsheet;
  const selectedSheet = sheets[selectedSheetIndex];

  useEffect(() => {
    if (!open || !attachment) return;

    let active = true;
    let nextBlobUrl: string | null = null;
    setLoading(true);
    setError(null);
    setFileBlob(null);
    setBlobUrl(null);
    setSheets([]);
    setSelectedSheetIndex(0);

    void (async () => {
      const { data, error: downloadError } = await supabase.storage
        .from("task-attachments")
        .download(attachment.storage_path);
      if (!active) return;
      if (downloadError) {
        setError(downloadError.message);
        setLoading(false);
        return;
      }

      nextBlobUrl = URL.createObjectURL(data);
      setFileBlob(data);
      setBlobUrl(nextBlobUrl);
      setLoading(false);
    })();

    return () => {
      active = false;
      if (nextBlobUrl) URL.revokeObjectURL(nextBlobUrl);
    };
  }, [open, attachment]);

  useEffect(() => {
    if (!fileBlob || !isDocx) return;
    let active = true;
    const wordContainer = wordContainerRef.current;
    setRenderingDocument(true);
    setError(null);

    void (async () => {
      try {
        const [{ renderAsync }, arrayBuffer] = await Promise.all([
          import("docx-preview"),
          fileBlob.arrayBuffer(),
        ]);
        if (!active || !wordContainer) return;
        wordContainer.replaceChildren();
        await renderAsync(arrayBuffer, wordContainer, undefined, {
          className: "taskflow-docx",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          breakPages: true,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
        });
      } catch (renderError) {
        if (active) {
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Não foi possível montar o preview do documento.",
          );
        }
      } finally {
        if (active) setRenderingDocument(false);
      }
    })();

    return () => {
      active = false;
      wordContainer?.replaceChildren();
    };
  }, [fileBlob, isDocx]);

  useEffect(() => {
    if (!fileBlob || !isSpreadsheet) return;
    let active = true;
    setRenderingDocument(true);
    setError(null);

    void (async () => {
      try {
        if (extension === "csv") {
          const rows = parseCsv(await fileBlob.text());
          const totalColumns = rows.reduce((largest, row) => Math.max(largest, row.length), 0);
          if (active) {
            setSheets([
              {
                name: "Planilha",
                rows: rows
                  .slice(0, MAX_SPREADSHEET_ROWS)
                  .map((row) => row.slice(0, MAX_SPREADSHEET_COLUMNS)),
                totalRows: rows.length,
                totalColumns,
              },
            ]);
          }
          return;
        }

        const { default: readXlsxFile, readSheetNames } = await import("read-excel-file/browser");
        const sheetNames = await readSheetNames(fileBlob);
        const nextSheets = await Promise.all(
          sheetNames.map(async (sheetName) => {
            const sourceRows = await readXlsxFile(fileBlob, { sheet: sheetName });
            const totalColumns = sourceRows.reduce(
              (largest, row) => Math.max(largest, row.length),
              0,
            );
            return {
              name: sheetName,
              rows: sourceRows.slice(0, MAX_SPREADSHEET_ROWS).map((row) =>
                row.slice(0, MAX_SPREADSHEET_COLUMNS).map((cell) => {
                  if (cell === null || cell === undefined) return "";
                  if (cell instanceof Date) return cell.toLocaleString("pt-BR");
                  return String(cell);
                }),
              ),
              totalRows: sourceRows.length,
              totalColumns,
            };
          }),
        );
        if (active) setSheets(nextSheets);
      } catch (renderError) {
        if (active) {
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Não foi possível montar o preview da planilha.",
          );
        }
      } finally {
        if (active) setRenderingDocument(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [extension, fileBlob, isSpreadsheet]);

  const spreadsheetWasLimited = useMemo(
    () =>
      !!selectedSheet &&
      (selectedSheet.totalRows > MAX_SPREADSHEET_ROWS ||
        selectedSheet.totalColumns > MAX_SPREADSHEET_COLUMNS),
    [selectedSheet],
  );

  const downloadCurrent = async () => {
    if (!attachment) return;
    try {
      const data =
        fileBlob ??
        (await supabase.storage.from("task-attachments").download(attachment.storage_path)).data;
      if (!data) throw new Error("Não foi possível baixar o arquivo.");
      const url = URL.createObjectURL(data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = attachment.file_name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch (downloadError) {
      toast.error(
        downloadError instanceof Error
          ? downloadError.message
          : "Não foi possível baixar o arquivo.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-hidden p-0">
        <DialogHeader className="border-b py-4 pl-6 pr-16">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="min-w-0 flex-1 truncate text-sm">
              {attachment?.file_name ?? "Visualizar arquivo"}
            </DialogTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => void downloadCurrent()}
              disabled={!attachment}
            >
              <Download className="mr-2 h-4 w-4" /> Baixar
            </Button>
          </div>
        </DialogHeader>

        <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-muted/20 p-4">
          {(loading || renderingDocument) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {loading ? "Carregando arquivo…" : "Montando preview…"}
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="space-y-3 text-center">
              <FileWarning className="mx-auto h-8 w-8 text-destructive" />
              <p className="max-w-xl text-sm text-destructive">{error}</p>
              <Button type="button" onClick={() => void downloadCurrent()}>
                <Download className="mr-2 h-4 w-4" /> Baixar arquivo
              </Button>
            </div>
          )}

          {!loading && !error && blobUrl && isImage && (
            <img
              src={blobUrl}
              alt={attachment?.file_name ?? "Arquivo"}
              className="max-h-[78vh] w-auto max-w-full rounded-md object-contain"
            />
          )}

          {!loading && !error && blobUrl && isPdf && (
            <iframe
              src={blobUrl}
              title={attachment?.file_name ?? "PDF"}
              className="h-[78vh] w-full rounded-md border bg-background"
            />
          )}

          {!loading && !error && blobUrl && isVideo && (
            <video src={blobUrl} controls className="max-h-[78vh] w-full rounded-md bg-black" />
          )}

          {!loading && !error && blobUrl && isAudio && (
            <audio src={blobUrl} controls className="w-full max-w-2xl" />
          )}

          {!loading && !error && blobUrl && isText && (
            <iframe
              src={blobUrl}
              title={attachment?.file_name ?? "Arquivo de texto"}
              className="h-[78vh] w-full rounded-md border bg-background"
            />
          )}

          {!loading && !error && fileBlob && isDocx && (
            <div className="h-[78vh] w-full overflow-auto rounded-md border bg-slate-200 p-4">
              <div ref={wordContainerRef} className="mx-auto min-w-fit" />
            </div>
          )}

          {!loading && !error && fileBlob && isSpreadsheet && (
            <div className="flex h-[78vh] w-full flex-col overflow-hidden rounded-md border bg-background">
              {sheets.length > 1 && (
                <div className="flex shrink-0 gap-1 overflow-x-auto border-b p-2">
                  {sheets.map((sheet, index) => (
                    <Button
                      key={`${sheet.name}-${index}`}
                      type="button"
                      size="sm"
                      variant={selectedSheetIndex === index ? "default" : "ghost"}
                      onClick={() => setSelectedSheetIndex(index)}
                    >
                      {sheet.name}
                    </Button>
                  ))}
                </div>
              )}
              {selectedSheet ? (
                <>
                  <div className="flex-1 overflow-auto">
                    <table className="min-w-full border-collapse text-xs">
                      <tbody>
                        {selectedSheet.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex === 0 ? "bg-muted/70" : undefined}>
                            <th className="sticky left-0 border bg-muted px-2 py-1 text-right font-normal text-muted-foreground">
                              {rowIndex + 1}
                            </th>
                            {row.map((cell, columnIndex) => (
                              <td
                                key={columnIndex}
                                className="max-w-80 whitespace-pre-wrap border px-2 py-1 align-top"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {spreadsheetWasLimited && (
                    <p className="shrink-0 border-t px-3 py-2 text-xs text-muted-foreground">
                      Preview limitado às primeiras {MAX_SPREADSHEET_ROWS} linhas e{" "}
                      {MAX_SPREADSHEET_COLUMNS} colunas para preservar o desempenho.
                    </p>
                  )}
                </>
              ) : (
                <p className="m-auto text-sm text-muted-foreground">
                  A planilha não possui conteúdo.
                </p>
              )}
            </div>
          )}

          {!loading && !error && blobUrl && !hasEmbeddedPreview && (
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Este formato ainda não possui um renderizador seguro no navegador.
              </p>
              <Button type="button" onClick={() => void downloadCurrent()}>
                <Download className="mr-2 h-4 w-4" /> Baixar arquivo
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
