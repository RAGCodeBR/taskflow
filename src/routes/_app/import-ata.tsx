import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useColumns, useProfiles, useTaskTags, useTaskStatuses } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Upload, FileText, Loader2, Trash2, Plus, CheckCircle2, NotebookPen, FileSignature, FileDown } from "lucide-react";
import { toast } from "sonner";
import { createTasksFromAta, parseAtaWithGemini, type ExtractedTask } from "@/lib/import-ata.functions";
import { formatAtaWithGemini } from "@/lib/format-ata.functions";
import { FileDropZone } from "@/components/FileDropZone";
import timbradoPngUrl from "@/assets/Timbrado LA.pdf?timbrado-png";

export const Route = createFileRoute("/_app/import-ata")({
  component: ImportAtaPage,
});

type Row = ExtractedTask & {
  _selected: boolean;
  _id: string;
  status_id: string | null;
  column_id: string | null;
  mark_completed: boolean;
};

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
// O cabeçalho do timbrado ocupa aproximadamente 140 px; mantemos uma folga
// adicional para que o conteúdo nunca invada a marca em páginas seguintes.
const DOCUMENT_TOP_PADDING_PX = 176;
const DOCUMENT_BOTTOM_PADDING_PX = 105;

function ImportAtaPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: profiles = [] } = useProfiles();
  const { data: clients = [] } = useClients();
  const { data: tags = [] } = useTaskTags();
  const { data: statuses = [] } = useTaskStatuses();
  const { data: columns = [] } = useColumns();
  const runParse = useServerFn(parseAtaWithGemini);
  const runFormat = useServerFn(formatAtaWithGemini);
  const runCreateTasks = useServerFn(createTasksFromAta);

  const [tab, setTab] = useState<"pdf" | "text">("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [creating, setCreating] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const [ataHtml, setAtaHtml] = useState<string>("");
  const [ataText, setAtaText] = useState<string>("");
  const [ataTitle, setAtaTitle] = useState<string>("");
  const [saveClientId, setSaveClientId] = useState<string>("");
  const [savingNote, setSavingNote] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  const activeMembers = useMemo(
    () => profiles.filter((p) => p.is_active !== false).map((p) => ({ id: p.id, name: p.full_name || "Sem nome" })),
    [profiles],
  );
  const clientList = useMemo(() => clients.map((c) => ({ id: c.id, name: c.name })), [clients]);
  const tagList = useMemo(() => tags.map((t) => ({ id: t.id, name: t.name })), [tags]);

  const defaultStatusId = useMemo(() => {
    const open = statuses.find((s) => s.is_active && !s.is_completed);
    return open?.id ?? statuses[0]?.id ?? null;
  }, [statuses]);
  const defaultColumnId = useMemo(
    () => columns.find((column) => column.name.trim().toLocaleLowerCase("pt-BR") === "a fazer")?.id ?? columns[0]?.id ?? null,
    [columns],
  );

  const fileToBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const s = String(r.result || "");
        const i = s.indexOf(",");
        resolve(i >= 0 ? s.slice(i + 1) : s);
      };
      r.onerror = () => reject(r.error);
      r.readAsDataURL(f);
    });

  const analyze = async () => {
    if (tab === "pdf" && !file) { toast.error("Selecione um PDF"); return; }
    if (tab === "text" && !text.trim()) { toast.error("Cole o texto da ata"); return; }
    setLoading(true);
    try {
      const payload: {
        members: { id: string; name: string }[];
        clients: { id: string; name: string }[];
        tags: { id: string; name: string }[];
        pdfBase64?: string;
        filename?: string;
        text?: string;
      } = {
        members: activeMembers,
        clients: clientList,
        tags: tagList,
      };
      if (tab === "pdf" && file) {
        payload.pdfBase64 = await fileToBase64(file);
        payload.filename = file.name;
      } else {
        payload.text = text;
      }
      const res = await runParse({ data: payload });
      const mapped: Row[] = (res.tasks || []).map((t, i) => ({
        ...t,
        _selected: true,
        _id: `r-${i}-${Date.now()}`,
        status_id: defaultStatusId,
        column_id: defaultColumnId,
        mark_completed: false,
      }));
      if (mapped.length === 0) toast.message("Nenhuma tarefa encontrada na ata");
      setRows(mapped);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generateAta = async () => {
    if (tab === "pdf" && !file) { toast.error("Selecione um PDF"); return; }
    if (tab === "text" && !text.trim()) { toast.error("Cole o texto da reunião"); return; }
    setFormatting(true);
    try {
      const payload: { pdfBase64?: string; filename?: string; text?: string } = {};
      if (tab === "pdf" && file) {
        payload.pdfBase64 = await fileToBase64(file);
        payload.filename = file.name;
      } else {
        payload.text = text;
      }
      const res = await runFormat({ data: payload });
      setAtaHtml(res.html);
      setAtaText(res.text);
      if (!ataTitle) {
        const today = new Date().toLocaleDateString("pt-BR");
        setAtaTitle(`Ata de Reunião — ${today}`);
      }
      toast.success("Ata gerada");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setFormatting(false);
    }
  };

  const saveAtaAsNote = async () => {
    if (!user) { toast.error("Sessão expirada"); return; }
    if (!ataHtml) { toast.error("Gere a ata primeiro"); return; }
    if (!saveClientId) { toast.error("Selecione um cliente"); return; }
    setSavingNote(true);
    try {
      const { error } = await supabase.from("client_notes").insert({
        client_id: saveClientId,
        title: ataTitle || "Ata de Reunião",
        content: ataText,
        content_html: ataHtml,
        created_by: user.id,
      });
      if (error) throw error;
      toast.success("Ata salva nas anotações do cliente");
      qc.invalidateQueries({ queryKey: ["client_notes"] });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSavingNote(false);
    }
  };

  const downloadAtaPdf = async () => {
    if (!ataHtml) return;
    setExportingPdf(true);
    let renderFrame: HTMLIFrameElement | null = null;
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      renderFrame = document.createElement("iframe");
      renderFrame.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0;visibility:hidden;";
      document.body.appendChild(renderFrame);
      const previewDocument = renderFrame.contentDocument;
      if (!previewDocument) throw new Error("Não foi possível preparar a página da ata.");
      previewDocument.open();
      previewDocument.write(`<!doctype html><html><head><meta charset="utf-8" /><style>
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; background: transparent; color: #172033; font-family: Arial, Helvetica, sans-serif; }
          #ata-pdf-preview { width: ${A4_WIDTH_PX}px; padding: 0 68px; }
          .ata-pdf-content { font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.55; }
          .ata-pdf-content h2 { margin: 0 0 20px; color: #14284b; font-size: 24px; line-height: 1.2; }
          .ata-pdf-content h3 { margin: 22px 0 9px; color: #14284b; font-size: 16px; line-height: 1.25; }
          .ata-pdf-content p { margin: 0 0 10px; }
          .ata-pdf-content ul { margin: 0 0 12px; padding-left: 22px; }
          .ata-pdf-content li { margin: 0 0 5px; }
          .ata-pdf-content table { width: 100%; border-collapse: collapse; margin: 12px 0 16px; font-size: 12px; }
          .ata-pdf-content th, .ata-pdf-content td { border: 1px solid #9aa6b6; padding: 7px 8px; vertical-align: top; text-align: left; }
          .ata-pdf-content th { background: #eaf0f8; color: #14284b; }
        </style></head><body><main id="ata-pdf-preview">
          <div style="font-size:12px;color:#536174;margin-bottom:18px;">${new Date().toLocaleDateString("pt-BR")}</div>
          <div class="ata-pdf-content">${ataHtml}</div>
        </main></body></html>`);
      previewDocument.close();
      const preview = previewDocument.getElementById("ata-pdf-preview");
      if (!preview) throw new Error("Não foi possível preparar o conteúdo da ata.");

      const source = await html2canvas(preview, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [A4_WIDTH_PX, A4_HEIGHT_PX] });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableHeight = A4_HEIGHT_PX - DOCUMENT_TOP_PADDING_PX - DOCUMENT_BOTTOM_PADDING_PX;
      const totalPages = Math.max(1, Math.ceil(source.height / 2 / usableHeight));

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
        if (pageIndex > 0) pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = A4_WIDTH_PX * 2;
        pageCanvas.height = A4_HEIGHT_PX * 2;
        const context = pageCanvas.getContext("2d");
        if (!context) throw new Error("Não foi possível montar a página da ata.");
        context.drawImage(
          source,
          0,
          pageIndex * usableHeight * 2,
          source.width,
          Math.min(usableHeight * 2, source.height - pageIndex * usableHeight * 2),
          0,
          DOCUMENT_TOP_PADDING_PX * 2,
          A4_WIDTH_PX * 2,
          Math.min(usableHeight * 2, source.height - pageIndex * usableHeight * 2),
        );
        pdf.addImage(timbradoPngUrl, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);
      }

      pdf.save(`${(ataTitle || "ata-de-reuniao").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "ata-de-reuniao"}.pdf`);
      toast.success("PDF timbrado gerado");
    } catch (e) {
      toast.error((e as Error).message || "Não foi possível gerar o PDF.");
    } finally {
      renderFrame?.remove();
      setExportingPdf(false);
    }
  };

  const updateRow = (id: string, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r._id === id ? { ...r, ...patch } : r)));

  const removeRow = (id: string) => setRows((rs) => rs.filter((r) => r._id !== id));

  const addRow = () =>
    setRows((rs) => [
      ...rs,
      {
        _id: `r-new-${Date.now()}`,
        _selected: true,
        title: "",
        description: "",
        assignee_id: null,
        assignee_name: null,
        due_date: null,
        client_id: null,
        client_name: null,
        tag_id: null,
        tag_name: null,
        priority: "medium",
        status_id: defaultStatusId,
        column_id: defaultColumnId,
        mark_completed: false,
      },
    ]);

  const createTasks = async () => {
    if (!user) { toast.error("Sessão expirada"); return; }
    const picked = rows.filter((r) => r._selected && r.title.trim());
    if (picked.length === 0) { toast.error("Selecione ao menos uma tarefa válida"); return; }
    if (picked.some((r) => !r.due_date)) {
      toast.error("Defina o prazo de todas as tarefas selecionadas antes de criar no Kanban.");
      return;
    }
    setCreating(true);
    try {
      const completedStatusId = statuses.find((status) => status.is_completed)?.id ?? null;
      const payload = picked.map((r) => {
      return {
        title: r.title.trim().slice(0, 200),
        description: r.description || null,
        status: r.mark_completed ? "done" as const : "todo" as const,
        status_id: r.mark_completed ? completedStatusId : r.status_id,
        column_id: r.mark_completed ? null : r.column_id,
        priority: r.priority,
        due_date: r.due_date ? new Date(r.due_date + "T18:00:00").toISOString() : null,
        assignee_id: r.assignee_id,
        client_id: r.client_id,
        tag_id: r.tag_id,
      };
    });
      const result = await runCreateTasks({ data: { tasks: payload } });
      toast.success(`${result.created} tarefa(s) criada(s) no Kanban`);
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["task_tag_links"] });
      setRows([]);
      setFile(null);
      setText("");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-xl font-semibold">Importar ata de reunião</h1>
          <p className="text-sm text-muted-foreground">Gere uma <strong>ata formatada</strong> a partir de notas brutas e/ou extraia <strong>tarefas</strong> para o Kanban. Use os dois ou apenas um.</p>
        </div>
      </div>

      <Card className="p-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as "pdf" | "text")}>
          <TabsList>
            <TabsTrigger value="pdf"><FileText className="h-4 w-4 mr-1" />PDF da ata</TabsTrigger>
            <TabsTrigger value="text"><Sparkles className="h-4 w-4 mr-1" />Texto do Gemini</TabsTrigger>
          </TabsList>
          <TabsContent value="pdf" className="mt-3 space-y-3">
            <FileDropZone
              onFiles={(files) => setFile(files.item(0))}
              className="rounded-md"
            >
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed p-4 hover:bg-muted/40">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="text-sm font-medium">{file ? file.name : "Selecionar PDF"}</div>
                <div className="text-xs text-muted-foreground">{file ? `${(file.size / 1024).toFixed(0)} KB` : "Aceita atas em PDF (até ~10MB)"}</div>
              </div>
              <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </label>
            </FileDropZone>
          </TabsContent>
          <TabsContent value="text" className="mt-3 space-y-3">
            <Textarea
              rows={10}
              placeholder="Cole aqui o conteúdo da ata (ou a resposta do Gemini com as próximas etapas)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </TabsContent>
        </Tabs>
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={generateAta} disabled={formatting}>
            {formatting ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileSignature className="h-4 w-4 mr-1" />}
            Gerar Ata Formatada
          </Button>
          <Button onClick={analyze} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1" />}
            Extrair Tarefas
          </Button>
        </div>
      </Card>

      {ataHtml && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <NotebookPen className="h-5 w-5 text-primary" />
            <div className="text-sm font-medium">Ata gerada</div>
          </div>
          <Input
            value={ataTitle}
            onChange={(e) => setAtaTitle(e.target.value)}
            placeholder="Título da ata"
          />
          <div
            className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4 dark:prose-invert [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2 [&_th]:bg-muted"
            dangerouslySetInnerHTML={{ __html: ataHtml }}
          />
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex-1 min-w-[200px]">
              <div className="text-[11px] text-muted-foreground mb-1">Salvar nas anotações do cliente</div>
              <Select value={saveClientId} onValueChange={setSaveClientId}>
                <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                <SelectContent>
                  {clientList.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={saveAtaAsNote} disabled={savingNote || !saveClientId}>
              {savingNote ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <NotebookPen className="h-4 w-4 mr-1" />}
              Salvar como Anotação
            </Button>
            <Button variant="outline" onClick={downloadAtaPdf} disabled={exportingPdf}>
              {exportingPdf ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileDown className="h-4 w-4 mr-1" />}
              Baixar PDF timbrado
            </Button>
            <Button variant="ghost" onClick={() => { setAtaHtml(""); setAtaText(""); }}>
              Descartar
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            A criação de tarefas no Kanban é opcional e independente — use o botão "Extrair Tarefas" acima se quiser também transformar as ações em cards.
          </div>
        </Card>
      )}

      {rows.length > 0 && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Tarefas sugeridas ({rows.filter(r => r._selected).length}/{rows.length})</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={addRow}><Plus className="h-4 w-4 mr-1" />Adicionar manualmente</Button>
              <Button size="sm" onClick={createTasks} disabled={creating}>
                {creating ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-1" />}
                Criar no Kanban
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r._id} className={`rounded-md border p-3 space-y-2 ${r._selected ? "" : "opacity-50"}`}>
                <div className="flex items-start gap-2">
                  <Checkbox checked={r._selected} onCheckedChange={(c) => updateRow(r._id, { _selected: !!c })} className="mt-1" />
                  <div className="flex-1 space-y-2">
                    <Input
                      value={r.title}
                      onChange={(e) => updateRow(r._id, { title: e.target.value })}
                      placeholder="Título da tarefa"
                      className="font-medium"
                    />
                    <Textarea
                      rows={2}
                      value={r.description}
                      onChange={(e) => updateRow(r._id, { description: e.target.value })}
                      placeholder="Descrição"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div>
                        <div className="text-[11px] text-muted-foreground mb-1">Responsável {r.assignee_name && !r.assignee_id ? <span className="text-amber-600">(sugestão: {r.assignee_name})</span> : null}</div>
                        <Select value={r.assignee_id ?? "none"} onValueChange={(v) => updateRow(r._id, { assignee_id: v === "none" ? null : v })}>
                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">— Sem responsável —</SelectItem>
                            {activeMembers.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground mb-1">Prazo *</div>
                        <Input type="date" required value={r.due_date ?? ""} onChange={(e) => updateRow(r._id, { due_date: e.target.value || null })} />
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground mb-1">Cliente {r.client_name && !r.client_id ? <span className="text-amber-600">({r.client_name})</span> : null}</div>
                        <Select value={r.client_id ?? "none"} onValueChange={(v) => updateRow(r._id, { client_id: v === "none" ? null : v })}>
                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">— Sem cliente —</SelectItem>
                            {clientList.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground mb-1">Tag {r.tag_name && !r.tag_id ? <span className="text-amber-600">({r.tag_name})</span> : null}</div>
                        <Select value={r.tag_id ?? "none"} onValueChange={(v) => updateRow(r._id, { tag_id: v === "none" ? null : v })}>
                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">— Sem tag —</SelectItem>
                            {tagList.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[11px] text-muted-foreground">Prioridade:</div>
                      <Select value={r.priority} onValueChange={(v) => updateRow(r._id, { priority: v as Row["priority"] })}>
                        <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baixa</SelectItem>
                          <SelectItem value="medium">Média</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="text-[11px] text-muted-foreground ml-2">Status:</div>
                      <Select
                        value={r.mark_completed ? "completed" : r.column_id ?? "none"}
                        onValueChange={(v) => updateRow(r._id, v === "completed"
                          ? { mark_completed: true, column_id: null }
                          : { mark_completed: false, column_id: v === "none" ? null : v })}
                      >
                        <SelectTrigger className="h-8 w-48"><SelectValue placeholder="Nenhum status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— Nenhum status —</SelectItem>
                          {columns.map((column) => (
                            <SelectItem key={column.id} value={column.id}>{column.name}</SelectItem>
                          ))}
                          <SelectItem value="completed">Concluídas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeRow(r._id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
