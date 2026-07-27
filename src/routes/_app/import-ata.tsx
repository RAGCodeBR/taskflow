import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useProfiles, useTaskTags, useTaskStatuses } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Upload, FileText, Loader2, Trash2, Plus, CheckCircle2, NotebookPen, FileSignature } from "lucide-react";
import { toast } from "sonner";
import { parseAtaWithGemini, type ExtractedTask } from "@/lib/import-ata.functions";
import { formatAtaWithGemini } from "@/lib/format-ata.functions";
import { FileDropZone } from "@/components/FileDropZone";

export const Route = createFileRoute("/_app/import-ata")({
  component: ImportAtaPage,
});

type Row = ExtractedTask & { _selected: boolean; _id: string };

function ImportAtaPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: profiles = [] } = useProfiles();
  const { data: clients = [] } = useClients();
  const { data: tags = [] } = useTaskTags();
  const { data: statuses = [] } = useTaskStatuses();
  const runParse = useServerFn(parseAtaWithGemini);
  const runFormat = useServerFn(formatAtaWithGemini);

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
      },
    ]);

  const createTasks = async () => {
    if (!user) { toast.error("Sessão expirada"); return; }
    const picked = rows.filter((r) => r._selected && r.title.trim());
    if (picked.length === 0) { toast.error("Selecione ao menos uma tarefa válida"); return; }
    setCreating(true);
    try {
      const payload = picked.map((r) => ({
        title: r.title.trim().slice(0, 200),
        description: r.description || null,
        status: "todo" as const,
        status_id: defaultStatusId,
        priority: r.priority,
        due_date: r.due_date ? new Date(r.due_date + "T18:00:00").toISOString() : null,
        assignee_id: r.assignee_id,
        client_id: r.client_id,
        tag_id: r.tag_id,
        created_by: user.id,
      }));
      const { data, error } = await supabase.from("tasks").insert(payload).select("id");
      if (error) throw error;
      // task_tag_links
      const links = picked
        .map((r, i) => ({ task: data?.[i], tagId: r.tag_id }))
        .filter((x) => x.task && x.tagId)
        .map((x) => ({ task_id: x.task!.id, tag_id: x.tagId! }));
      if (links.length) {
        await supabase.from("task_tag_links").insert(links);
      }
      toast.success(`${picked.length} tarefa(s) criada(s) no Kanban`);
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
                        <div className="text-[11px] text-muted-foreground mb-1">Prazo</div>
                        <Input type="date" value={r.due_date ?? ""} onChange={(e) => updateRow(r._id, { due_date: e.target.value || null })} />
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
