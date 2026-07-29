import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useProfiles } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Plus, Trash2, Highlighter, Bold, Italic, Underline, Eraser, NotebookPen, ExternalLink,
  ArrowUp, ArrowDown, Paperclip, FileText, Save, Sparkles, FileDown, Maximize2, Minimize2, Check, Loader2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { FileDropZone } from "@/components/FileDropZone";
import { marked } from "marked";
import { AttachmentPreviewDialog, type PreviewableAttachment } from "@/components/AttachmentPreviewDialog";
import { formatNoteWithAI } from "@/lib/ai-format.functions";

export const Route = createFileRoute("/_app/notes")({
  component: NotesPage,
});

const sb = supabase as any;
const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;

type SortMode = "manual" | "date_desc" | "date_asc" | "updated_desc" | "title_asc";

interface ClientNote {
  id: string;
  client_id: string;
  title: string;
  content: string;
  content_html: string | null;
  done: boolean;
  position: number;
  created_at: string;
  updated_at: string;
  note_date: string;
  task_id: string | null;
  created_by: string | null;
}

interface NoteAttachment {
  id: string;
  note_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeNoteHtmlForPdf(rawHtml: string) {
  if (typeof window === "undefined") return rawHtml;

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml || "", "text/html");
  const root = doc.body;

  root.querySelectorAll("script, style, meta, link, title, noscript, iframe, object").forEach((node) => node.remove());

  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const keepBackground = el.style.backgroundColor;
    const keepColor = el.style.color;
    const keepTextAlign = el.style.textAlign;
    const keepFontWeight = el.style.fontWeight;
    const keepFontStyle = el.style.fontStyle;
    const keepTextDecoration = el.style.textDecoration;

    el.removeAttribute("class");
    el.removeAttribute("id");
    el.removeAttribute("width");
    el.removeAttribute("height");
    el.removeAttribute("face");
    el.removeAttribute("size");
    el.removeAttribute("dir");
    el.removeAttribute("data-start");
    el.removeAttribute("data-end");

    if (tag !== "a") {
      el.removeAttribute("href");
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }

    const nextStyle = [
      keepBackground ? `background-color: ${keepBackground}` : "",
      keepColor ? `color: ${keepColor}` : "",
      keepTextAlign ? `text-align: ${keepTextAlign}` : "",
      keepFontWeight && keepFontWeight !== "400" && keepFontWeight !== "normal" ? `font-weight: ${keepFontWeight}` : "",
      keepFontStyle && keepFontStyle !== "normal" ? `font-style: ${keepFontStyle}` : "",
      keepTextDecoration && keepTextDecoration !== "none" ? `text-decoration: ${keepTextDecoration}` : "",
    ].filter(Boolean).join("; ");

    if (nextStyle) el.setAttribute("style", nextStyle);
    else el.removeAttribute("style");

    if (tag === "font") {
      const fragment = doc.createDocumentFragment();
      while (el.firstChild) fragment.appendChild(el.firstChild);
      el.replaceWith(fragment);
    }
  });

  return root.innerHTML;
}

function syncEditorDom(target: HTMLDivElement | null, html: string) {
  if (!target || target.innerHTML === html) return;
  target.innerHTML = html;
}

function extractTextFromHtml(rawHtml: string) {
  if (typeof window === "undefined") return rawHtml;
  const doc = new DOMParser().parseFromString(rawHtml || "", "text/html");
  return doc.body.textContent ?? "";
}

function openNotePrintPreview({
  title,
  dateLabel,
  html,
}: {
  title: string;
  dateLabel: string;
  html: string;
}) {
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Não foi possível abrir a nova aba do PDF.");
  const previewCss = `
    :root {
      color-scheme: light;
      --page-width: 210mm;
      --page-padding-y: 20mm;
      --page-padding-x: 18mm;
      --surface: #eef1f5;
      --paper: #ffffff;
      --ink: #1f2937;
      --muted: #6b7280;
      --rule: #d1d5db;
      --accent: #0f172a;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: var(--surface); color: var(--ink); }
    body { font-family: Arial, Helvetica, sans-serif; }
    .preview-shell { min-height: 100vh; padding: 24px; }
    .preview-toolbar {
      position: sticky; top: 0; z-index: 5; display: flex; justify-content: center;
      padding-bottom: 16px;
    }
    .preview-toolbar-inner {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--rule);
      background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    .toolbar-button {
      border: 1px solid var(--rule); background: #fff; color: var(--accent); padding: 10px 14px; cursor: pointer;
      font-size: 13px; font-weight: 600;
    }
    .toolbar-note { font-size: 12px; color: var(--muted); }
    .paper {
      width: min(100%, calc(var(--page-width) + 36mm)); margin: 0 auto; background: var(--paper);
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
    }
    .paper-inner {
      padding: var(--page-padding-y) var(--page-padding-x) calc(var(--page-padding-y) + 2mm);
      min-height: 297mm;
    }
    .doc-title {
      margin: 0 0 10px; font-size: 28px; line-height: 1.1; font-weight: 700; color: var(--accent);
    }
    .doc-date {
      margin: 0 0 22px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--muted);
    }
    .doc-body, .doc-body * {
      max-width: 100%; letter-spacing: 0; word-break: normal; overflow-wrap: break-word;
    }
    .doc-body {
      font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; line-height: 1.7; color: var(--ink);
    }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 {
      font-family: Arial, Helvetica, sans-serif; color: var(--accent); line-height: 1.25; break-after: avoid;
      margin: 22px 0 10px;
    }
    .doc-body h1 { font-size: 22px; }
    .doc-body h2 { font-size: 18px; }
    .doc-body h3 { font-size: 16px; }
    .doc-body p, .doc-body div { margin: 0 0 12px; }
    .doc-body ul, .doc-body ol { margin: 0 0 14px; padding-left: 24px; }
    .doc-body li { margin-bottom: 6px; }
    .doc-body blockquote {
      margin: 16px 0; padding: 0 0 0 14px; border-left: 3px solid #cbd5e1; color: #475569;
    }
    .doc-body table { width: 100%; border-collapse: collapse; margin: 14px 0; }
    .doc-body th, .doc-body td { border: 1px solid var(--rule); padding: 7px 8px; text-align: left; }
    .doc-body img { max-width: 100%; height: auto; }
    .doc-body pre, .doc-body code {
      font-family: Consolas, Monaco, monospace; white-space: pre-wrap; word-break: break-word; font-size: 11.5pt;
    }
    .doc-body span[style*="background"] { padding: 0 2px; }
    @page {
      size: A4;
      margin: 18mm 16mm 20mm;
    }
    @media print {
      html, body { background: #fff; }
      .preview-shell { padding: 0; }
      .preview-toolbar { display: none; }
      .paper {
        width: auto; margin: 0; box-shadow: none;
      }
      .paper-inner {
        min-height: auto; padding: 0;
      }
      .doc-title, .doc-date, .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4,
      .doc-body p, .doc-body div, .doc-body ul, .doc-body ol, .doc-body table, .doc-body blockquote, .doc-body pre {
        break-inside: avoid-page;
      }
    }
  `;

  popup.document.open();
  popup.document.write(`<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title || "Anotação")}</title>
        <style>${previewCss}</style>
      </head>
      <body>
        <div class="preview-shell">
          <div class="preview-toolbar">
            <div class="preview-toolbar-inner">
              <button class="toolbar-button" onclick="window.print()">Imprimir / Salvar em PDF</button>
              <button class="toolbar-button" onclick="window.close()">Fechar</button>
              <span class="toolbar-note">Pré-visualização limpa para impressão profissional.</span>
            </div>
          </div>
          <article class="paper">
            <div class="paper-inner">
              <h1 class="doc-title">${escapeHtml(title || "Sem título")}</h1>
              <p class="doc-date">${escapeHtml(dateLabel)}</p>
              <div class="doc-body">${html}</div>
            </div>
          </article>
        </div>
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 250);
          });
        </script>
      </body>
    </html>`);
  popup.document.close();
}


export function NotesWorkspace({
  fixedClientId,
  embedded = false,
}: {
  fixedClientId?: string;
  embedded?: boolean;
}) {
  const { user, isAdmin } = useAuth();
  const { data: clients = [] } = useClients();
  const { data: profiles = [] } = useProfiles();

  const [clientId, setClientId] = useState<string | null>(fixedClientId ?? null);
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [createdBy, setCreatedBy] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>(() => {
    if (typeof window === "undefined") return "manual";
    return (localStorage.getItem("notes_sort_mode") as SortMode) || "manual";
  });

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("notes_sort_mode", sortMode);
  }, [sortMode]);

  // Administrators begin by seeing their own notes. They can explicitly choose
  // "Todos os usuários" whenever they need the team-wide view.
  useEffect(() => {
    if (!user?.id) return;
    setCreatedBy((current) => (current === "all" ? user.id : current));
  }, [user?.id]);

  useEffect(() => {
    if (fixedClientId) {
      setClientId(fixedClientId);
    } else if (!clientId && clients[0]) {
      setClientId(clients[0].id);
    }
  }, [clients, clientId, fixedClientId]);

  const load = async (cid: string) => {
    setLoading(true);
    const { data, error } = await sb
      .from("client_notes")
      .select("*")
      .eq("client_id", cid)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    const list = (data ?? []) as ClientNote[];
    setNotes(list);
    if (list.length && !list.find((n) => n.id === selectedId)) {
      setSelectedId(list[0].id);
    }
  };

  useEffect(() => {
    if (clientId) void load(clientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const addNote = async () => {
    if (!clientId || !user) return;
    const today = new Date().toISOString().slice(0, 10);
    const minPos = notes.reduce((m, n) => Math.min(m, n.position), 0);
    const { data, error } = await sb.from("client_notes").insert({
      client_id: clientId,
      title: "Nova anotação",
      content: "",
      content_html: "",
      note_date: today,
      created_by: user.id,
      position: minPos - 1,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    const created = data as ClientNote;
    setNotes((n) => [created, ...n]);
    setSelectedId(created.id);
  };

  const deleteNote = async (id: string) => {
    if (!confirm("Excluir esta anotação?")) return;
    setNotes((n) => n.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
    const { error } = await sb.from("client_notes").delete().eq("id", id);
    if (error) toast.error(error.message);
  };

  const patchNote = (id: string, patch: Partial<ClientNote>) => {
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const persistNote = async (id: string, patch: Partial<ClientNote>) => {
    const { error } = await sb.from("client_notes").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const sortedNotes = useMemo(() => {
    const arr = [...notes];
    switch (sortMode) {
      case "date_desc":
        arr.sort((a, b) => (b.note_date || "").localeCompare(a.note_date || ""));
        break;
      case "date_asc":
        arr.sort((a, b) => (a.note_date || "").localeCompare(b.note_date || ""));
        break;
      case "updated_desc":
        arr.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
        break;
      case "title_asc":
        arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", "pt-BR"));
        break;
      case "manual":
      default:
        arr.sort((a, b) => a.position - b.position || b.created_at.localeCompare(a.created_at));
    }
    return arr;
  }, [notes, sortMode]);

  const authorNameById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile.full_name || "Usuário sem nome"])),
    [profiles],
  );
  const noteAuthors = useMemo(
    () => [...new Set(notes.map((note) => note.created_by).filter((id): id is string => !!id))]
      .map((id) => ({ id, name: authorNameById.get(id) ?? "Usuário removido" }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [authorNameById, notes],
  );
  const selectableNoteAuthors = useMemo(() => {
    if (!user?.id || noteAuthors.some((author) => author.id === user.id)) return noteAuthors;
    return [
      {
        id: user.id,
        name: authorNameById.get(user.id) ?? "Meu usuário",
      },
      ...noteAuthors,
    ].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [authorNameById, noteAuthors, user?.id]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedNotes.filter((note) => {
      const matchesAuthor = createdBy === "all" || note.created_by === createdBy;
      const matchesSearch = !q || note.title.toLowerCase().includes(q) || (note.content ?? "").toLowerCase().includes(q);
      return matchesAuthor && matchesSearch;
    });
  }, [createdBy, sortedNotes, search]);

  const move = async (id: string, dir: -1 | 1) => {
    const ordered = [...sortedNotes];
    const idx = ordered.findIndex((n) => n.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= ordered.length) return;
    [ordered[idx], ordered[swap]] = [ordered[swap], ordered[idx]];
    const reIndexed = ordered.map((n, i) => ({ ...n, position: i }));
    setNotes(reIndexed);
    await Promise.all(
      reIndexed.map((n) => sb.from("client_notes").update({ position: n.position }).eq("id", n.id)),
    );
  };

  const selected = useMemo(() => notes.find((n) => n.id === selectedId) ?? null, [notes, selectedId]);
  return (
    <div className={embedded ? "flex min-h-[720px] flex-col" : "flex h-[calc(100vh-0px)] flex-col"}>
      <header className="border-b bg-background p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <NotebookPen className="h-6 w-6" /> Anotações
            </h1>
            <p className="text-sm text-muted-foreground">
              Anotações dedicadas por cliente, com data, grifos e anexos.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!fixedClientId && (
              <Select value={clientId ?? undefined} onValueChange={(v) => setClientId(v)}>
                <SelectTrigger className="w-[260px]"><SelectValue placeholder="Selecione um cliente" /></SelectTrigger>
                <SelectContent>
                  {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
            <Button onClick={addNote} disabled={!clientId}>
              <Plus className="mr-1 h-4 w-4" /> Nova anotação
            </Button>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-[340px_1fr]">
        {/* Lista lateral */}
        <aside className="flex min-h-0 flex-col border-r bg-muted/20">
          <div className="space-y-2 border-b p-2">
            <Input
              placeholder="Buscar anotação…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground">Ordenar:</span>
              <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
                <SelectTrigger className="h-7 flex-1 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual (arrastar)</SelectItem>
                  <SelectItem value="date_desc">Data ↓ (mais recente)</SelectItem>
                  <SelectItem value="date_asc">Data ↑ (mais antiga)</SelectItem>
                  <SelectItem value="updated_desc">Atualizado recente</SelectItem>
                  <SelectItem value="title_asc">Título A→Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-1.5">
                <span className="shrink-0 text-[11px] text-muted-foreground">Criado por:</span>
                <Select value={createdBy} onValueChange={setCreatedBy}>
                  <SelectTrigger className="h-7 flex-1 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os usuários</SelectItem>
                    {selectableNoteAuthors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {loading ? (
              <p className="p-4 text-sm text-muted-foreground">Carregando…</p>
            ) : filteredNotes.length === 0 ? (
              <p className="rounded border border-dashed p-6 text-center text-xs text-muted-foreground">
                {clientId ? "Nenhuma anotação ainda." : "Selecione um cliente."}
              </p>
            ) : (
              <ul className="space-y-1">
                {filteredNotes.map((n, i) => {
                  return (
                    <li key={n.id} className="flex items-stretch gap-1">
                      {sortMode === "manual" && (
                        <div className="flex flex-col justify-center">
                          <Button
                            size="icon" variant="ghost" className="h-5 w-5"
                            onClick={(e) => { e.stopPropagation(); void move(n.id, -1); }}
                            disabled={i === 0}
                            title="Mover para cima"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon" variant="ghost" className="h-5 w-5"
                            onClick={(e) => { e.stopPropagation(); void move(n.id, 1); }}
                            disabled={i === filteredNotes.length - 1}
                            title="Mover para baixo"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedId(n.id)}
                        className={`flex-1 rounded-md border px-3 py-2 text-left transition ${
                          selectedId === n.id
                            ? "border-primary bg-primary/10"
                            : "border-transparent hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-medium">{n.title || "(sem título)"}</p>
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {n.note_date ? format(parseISO(n.note_date), "dd/MM", { locale: ptBR }) : ""}
                          </span>
                        </div>
                        <p
                          className="mt-1 line-clamp-2 text-[11px] text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: (n.content_html || n.content || "").replace(/<[^>]+>/g, " "),
                          }}
                        />
                        {isAdmin && (
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            Criada por: {n.created_by ? (authorNameById.get(n.created_by) ?? "Usuário removido") : "Não identificado"}
                          </p>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* Editor */}
        <section className="min-h-0 overflow-y-auto p-4">
          {selected ? (
            <NoteEditor
              key={selected.id}
              note={selected}
              onPatch={(p) => patchNote(selected.id, p)}
              onSave={(p) => persistNote(selected.id, p)}
              onDelete={() => deleteNote(selected.id)}
            />
          ) : (
            <Card className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">
              Selecione ou crie uma anotação.
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

function NotesPage() {
  return <NotesWorkspace />;
}

function NoteEditor({
  note, onPatch, onSave, onDelete,
}: {
  note: ClientNote;
  onPatch: (p: Partial<ClientNote>) => void;
  onSave: (p: Partial<ClientNote>) => Promise<void>;
  onDelete: () => void;
}) {
  const { user } = useAuth();
  const aiFormat = useServerFn(formatNoteWithAI);
  const [title, setTitle] = useState(note.title);
  const [noteDate, setNoteDate] = useState(note.note_date ?? new Date().toISOString().slice(0, 10));
  const editorRef = useRef<HTMLDivElement>(null);
  const fsEditorRef = useRef<HTMLDivElement>(null);
  const pendingPatch = useRef<Partial<ClientNote>>({});
  const syncingRef = useRef(false);
  const selectedTextRangeRef = useRef<Range | null>(null);

  const [saveState, setSaveState] = useState<"idle" | "dirty" | "saving" | "saved">("idle");
  const [fullscreen, setFullscreen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState(note.content_html ?? note.content ?? "");
  const [highlightColor, setHighlightColor] = useState<string | null>(null);

  const [attachments, setAttachments] = useState<NoteAttachment[]>([]);
  const [attUrls, setAttUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);

  const setEditorsHTML = useCallback((html: string) => {
    syncingRef.current = true;
    setEditorHtml(html);
    syncEditorDom(editorRef.current, html);
    syncEditorDom(fsEditorRef.current, html);
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }, []);

  useEffect(() => {
    setEditorsHTML(note.content_html ?? note.content ?? "");
    setTitle(note.title);
    setNoteDate(note.note_date ?? new Date().toISOString().slice(0, 10));
    setHighlightColor(null);
    pendingPatch.current = {};
    setSaveState("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  // Sync between main editor and focus-mode editor when toggling fullscreen
  useEffect(() => {
    if (fullscreen) {
      const html = editorHtml || editorRef.current?.innerHTML || note.content_html || note.content || "";
      requestAnimationFrame(() => {
        syncEditorDom(fsEditorRef.current, html);
      });
    } else {
      syncEditorDom(editorRef.current, editorHtml || fsEditorRef.current?.innerHTML || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen, editorHtml]);

  const loadAttachments = async () => {
    const { data, error } = await sb
      .from("client_note_attachments")
      .select("*")
      .eq("note_id", note.id)
      .order("created_at", { ascending: true });
    if (error) { toast.error(error.message); return; }
    const list = (data ?? []) as NoteAttachment[];
    setAttachments(list);
    const next: Record<string, string> = {};
    await Promise.all(list.map(async (a) => {
      const { data: signed } = await supabase.storage
        .from("task-attachments").createSignedUrl(a.storage_path, 3600);
      if (signed) next[a.id] = signed.signedUrl;
    }));
    setAttUrls(next);
  };

  useEffect(() => {
    void loadAttachments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id]);

  const doSave = useCallback(async () => {
    const patch = pendingPatch.current;
    if (!Object.keys(patch).length) return;
    pendingPatch.current = {};
    setSaveState("saving");
    try {
      await onSave(patch);
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1500);
    } catch (e: any) {
      setSaveState("dirty");
      toast.error(e?.message ?? "Falha ao salvar");
    }
  }, [onSave]);

  const stageChange = useCallback((patch: Partial<ClientNote>) => {
    onPatch(patch);
    pendingPatch.current = { ...pendingPatch.current, ...patch };
    setSaveState("dirty");
  }, [onPatch]);

  // Save on unmount / before unload
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (saveState === "dirty" || saveState === "saving" || Object.keys(pendingPatch.current).length) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [saveState]);

  const getActiveEditor = () => (fullscreen ? fsEditorRef.current : editorRef.current);

  const applyEditorChange = useCallback((html: string) => {
    setEditorsHTML(html);
    stageChange({ content_html: html, content: extractTextFromHtml(html) });
  }, [setEditorsHTML, stageChange]);

  const exec = (cmd: string, value?: string) => {
    const ed = getActiveEditor();
    ed?.focus();
    document.execCommand(cmd, false, value);
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };

  const applyHighlightColor = (color: string) => {
    setHighlightColor(color);
    exec("hiliteColor", color);
  };

  const preserveSelectedText = () => {
    const ed = getActiveEditor();
    const selection = window.getSelection();
    if (!ed || !selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (ed.contains(range.commonAncestorContainer)) {
      selectedTextRangeRef.current = range.cloneRange();
    }
  };

  const clearHighlight = () => {
    const ed = getActiveEditor();
    const savedRange = selectedTextRangeRef.current;
    ed?.focus();

    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }

    // Alguns navegadores usam `backColor` e outros `hiliteColor` para o grifo.
    document.execCommand("hiliteColor", false, "transparent");
    document.execCommand("backColor", false, "transparent");
    selectedTextRangeRef.current = null;
    applyEditorChange(ed?.innerHTML ?? "");
  };

  const onEditorInput = (which: "main" | "fs") => {
    if (syncingRef.current) return;
    const ed = which === "fs" ? fsEditorRef.current : editorRef.current;
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };

  // Smart paste: prefer HTML; if only plain text and looks like markdown, convert
  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const cd = e.clipboardData;
    const html = cd.getData("text/html");
    const text = cd.getData("text/plain");
    if (html && html.trim()) return; // browser default keeps formatting
    if (!text) return;
    const looksLikeMarkdown = /(^|\n)\s*(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(/.test(text);
    if (!looksLikeMarkdown) return;
    e.preventDefault();
    const converted = String(marked.parse(text, { breaks: true, async: false }));
    document.execCommand("insertHTML", false, converted);
    const ed = getActiveEditor();
    if (ed) applyEditorChange(ed.innerHTML);
  };

  const runAIFormat = async () => {
    const ed = getActiveEditor();
    const html = ed?.innerHTML ?? "";
    if (!html.trim()) { toast.info("Escreva algo primeiro."); return; }
    setAiLoading(true);
    try {
      const res = await aiFormat({ data: { html, title } });
      applyEditorChange(res.html);
      toast.success("Texto reformatado pela IA.");
    } catch (e: any) {
      toast.error(e?.message ?? "Falha ao reformatar.");
    } finally {
      setAiLoading(false);
    }
  };

  const exportPDF = () => {
    const html = normalizeNoteHtmlForPdf(editorHtml || getActiveEditor()?.innerHTML || "");
    const dateLabel = noteDate ? format(parseISO(noteDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "";
    Promise.resolve().then(() => openNotePrintPreview({ title: title || "Sem título", dateLabel, html })).catch((error: any) => {
      toast.error(error?.message ?? "Falha ao gerar PDF.");
    });
  };

  const onUpload = async (fl: FileList | null) => {
    if (!fl || !fl.length || !user) return;
    setUploading(true);
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `notes/${note.id}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { error: insErr } = await sb.from("client_note_attachments").insert({
        note_id: note.id,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id,
      });
      if (insErr) toast.error(insErr.message);
    }
    setUploading(false);
    void loadAttachments();
  };

  const removeAttachment = async (a: NoteAttachment) => {
    if (!confirm(`Excluir "${a.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([a.storage_path]);
    await sb.from("client_note_attachments").delete().eq("id", a.id);
    void loadAttachments();
  };

  const openAttachment = (a: NoteAttachment) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
    if (canPreview) {
      setPreview({ file_name: a.file_name, storage_path: a.storage_path, mime_type: a.mime_type });
      return;
    }
    const u = attUrls[a.id];
    if (u) window.open(u, "_blank", "noopener,noreferrer");
  };


  const SaveBadge = (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${
        saveState === "saved" ? "bg-green-500/15 text-green-600 dark:text-green-400" :
        saveState === "saving" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :
        saveState === "dirty" ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" :
        "bg-muted text-muted-foreground"
      }`}
      title="Estado do salvamento"
    >
      {saveState === "saving" ? <Loader2 className="h-3 w-3 animate-spin" /> :
       saveState === "saved" ? <Check className="h-3 w-3" /> :
       saveState === "dirty" ? <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> :
       <Check className="h-3 w-3 opacity-60" />}
      {saveState === "saving" ? "Salvando…" :
       saveState === "saved" ? "Salvo" :
       saveState === "dirty" ? "Não salvo" : "Salvo"}
    </span>
  );

  const Toolbar = (
    <div className="flex flex-wrap items-center gap-1 rounded-md border bg-muted/30 p-1">
      <Button type="button" variant="ghost" size="sm" onClick={() => exec("bold")} title="Negrito (Ctrl+B)">
        <Bold className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => exec("italic")} title="Itálico (Ctrl+I)">
        <Italic className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => exec("underline")} title="Sublinhado">
        <Underline className="h-4 w-4" />
      </Button>
      <div className="mx-1 h-5 w-px bg-border" />
      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#fde047")} title="Grifar amarelo" className={highlightColor === "#fde047" ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" : "text-yellow-700 dark:text-yellow-400"}>
        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Amarelo</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#86efac")} title="Grifar verde" className={highlightColor === "#86efac" ? "bg-green-500/15 text-green-700 dark:text-green-400" : "text-green-700 dark:text-green-400"}>
        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Verde</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#fca5a5")} title="Grifar vermelho" className={highlightColor === "#fca5a5" ? "bg-red-500/15 text-red-700 dark:text-red-400" : "text-red-700 dark:text-red-400"}>
        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Vermelho</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#93c5fd")} title="Grifar azul" className={highlightColor === "#93c5fd" ? "bg-blue-500/15 text-blue-700 dark:text-blue-400" : "text-blue-700 dark:text-blue-400"}>
        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Azul</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onPointerDown={(e) => { preserveSelectedText(); e.preventDefault(); }} onClick={clearHighlight} title="Remover grifo do texto selecionado">
        <Eraser className="h-4 w-4" /><span className="ml-1 text-xs">Remover grifo</span>
      </Button>
      <div className="mx-1 h-5 w-px bg-border" />
      <Button type="button" variant="ghost" size="sm" onClick={runAIFormat} disabled={aiLoading} title="Reformatar texto com IA">
        {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        <span className="ml-1 text-xs">Auto-ajuste</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={exportPDF} title="Gerar PDF em nova aba">
        <FileDown className="h-4 w-4" /><span className="ml-1 text-xs">PDF</span>
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setFullscreen((v) => !v)} title="Modo foco (tela cheia)">
        {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        <span className="ml-1 text-xs">{fullscreen ? "Sair" : "Foco"}</span>
      </Button>
      <div className="ml-auto flex items-center gap-2 pr-1">
        {SaveBadge}
        <Button type="button" size="sm" onClick={() => void doSave()} disabled={saveState === "saving"}>
          <Save className="mr-1 h-4 w-4" /> Salvar
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Card className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden">
        <div className="space-y-3 border-b p-4">
          <div className="space-y-1.5">
            <label htmlFor="note-title" className="block px-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              Título da anotação
            </label>
            <div className="flex items-start gap-2">
              <Input id="note-title"
                value={title}
                onChange={(e) => { setTitle(e.target.value); stageChange({ title: e.target.value }); }}
                onBlur={() => stageChange({ title })}
                placeholder="Título da anotação"
                className="h-12 flex-1 rounded-lg border-primary/25 bg-primary/5 px-3 text-xl font-bold shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
              />
              <Button variant="ghost" size="icon" className="mt-1 text-destructive" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <label className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Data:</span>
              <Input
                type="date"
                value={noteDate}
                onChange={(e) => { setNoteDate(e.target.value); stageChange({ note_date: e.target.value }); }}
                className="h-8 w-[160px]"
              />
            </label>
          </div>

          {Toolbar}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => onEditorInput("main")}
            onPaste={onPaste}
            onBlur={() => stageChange({
              content_html: editorRef.current?.innerHTML ?? "",
              content: editorRef.current?.innerText ?? "",
            })}
            className="prose prose-sm dark:prose-invert min-h-[360px] max-w-none rounded-md border border-dashed bg-background p-5 text-base leading-relaxed outline-none transition focus:border-primary focus:bg-card focus:shadow-lg focus:ring-2 focus:ring-primary/30"
            data-placeholder="Escreva sua anotação aqui… (use o botão Salvar para registrar as alterações)"
          />

          {/* Anexos */}
          <FileDropZone
            onFiles={(files) => void onUpload(files)}
            disabled={uploading}
            className="mt-6 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Paperclip className="h-4 w-4" /> Anexos
                <span className="text-xs font-normal text-muted-foreground">({attachments.length})</span>
              </h3>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="*/*"
                  className="hidden"
                  onChange={(e) => { void onUpload(e.target.files); e.currentTarget.value = ""; }}
                />
                <span className="inline-flex items-center rounded-md border bg-background px-3 py-1 text-xs hover:bg-muted">
                  {uploading ? "Enviando…" : "+ Adicionar arquivo"}
                </span>
              </label>
            </div>

            {attachments.length === 0 ? (
              <p className="rounded border border-dashed p-4 text-center text-xs text-muted-foreground">
                Nenhum anexo. Aceita qualquer tipo (imagens, PDF, Word, Excel, etc.).
              </p>
            ) : (
              <ul className="space-y-1.5">
                {attachments.map((a) => {
                  const isImage = a.mime_type?.startsWith("image/");
                  const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
                  return (
                    <li key={a.id} className="flex items-center gap-2 rounded-md border bg-card p-2">
                      <button
                        type="button"
                        onClick={() => openAttachment(a)}
                        className="h-10 w-10 shrink-0 overflow-hidden rounded border bg-muted"
                        title={a.file_name}
                      >
                        {isImage && attUrls[a.id] ? (
                          <img src={attUrls[a.id]} alt={a.file_name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            {canPreview ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openAttachment(a)}
                        className="flex min-w-0 flex-1 flex-col text-left"
                      >
                        <span className="truncate text-sm">{a.file_name}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {a.mime_type || "arquivo"}{a.size_bytes ? ` · ${Math.round(a.size_bytes / 1024)} KB` : ""}
                        </span>
                      </button>
                      <Button size="sm" variant="ghost" onClick={() => openAttachment(a)}>Abrir</Button>
                      <Button
                        size="icon" variant="ghost" className="h-8 w-8 text-destructive"
                        onClick={() => void removeAttachment(a)}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </FileDropZone>

          <p className="mt-4 text-[11px] text-muted-foreground">
            Atualizado em {format(new Date(note.updated_at), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}.
          </p>
        </div>

        <AttachmentPreviewDialog
          open={!!preview}
          onOpenChange={(o) => { if (!o) setPreview(null); }}
          attachment={preview}
        />
      </Card>

      {/* Fullscreen / Focus mode */}
      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="flex h-[96vh] max-h-[96vh] w-[96vw] max-w-[1100px] flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => { setTitle(e.target.value); stageChange({ title: e.target.value }); }}
              placeholder="Título da anotação"
              className="h-11 flex-1 border-0 px-1 text-2xl font-bold shadow-none focus-visible:ring-0"
            />
            <span className="text-xs text-muted-foreground">
              {noteDate ? format(parseISO(noteDate), "dd 'de' MMM yyyy", { locale: ptBR }) : ""}
            </span>
          </div>
          {Toolbar}
          <div
            ref={fsEditorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => onEditorInput("fs")}
            onPaste={onPaste}
            onBlur={() => stageChange({
              content_html: fsEditorRef.current?.innerHTML ?? "",
              content: fsEditorRef.current?.innerText ?? "",
            })}
            className="prose dark:prose-invert min-h-0 flex-1 max-w-none overflow-y-auto rounded-md border bg-background p-8 text-lg leading-relaxed outline-none focus:ring-2 focus:ring-primary/30"
            data-placeholder="Modo foco — escreva à vontade…"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
