import { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Paperclip, FileText, Link2, ChevronDown, ChevronRight, Check, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useClients } from "@/hooks/use-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { AttachmentPreviewDialog, type PreviewableAttachment } from "@/components/AttachmentPreviewDialog";
import { FileDropZone } from "@/components/FileDropZone";

const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;

interface ClientNote {
  id: string;
  client_id: string;
  title: string;
  content: string;
  done: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

interface NoteAttachment {
  id: string;
  note_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
}

const sb = supabase as any;

export function ClientNotesSheet({ open, onOpenChange, initialClientId, embedded = false }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialClientId?: string | null;
  embedded?: boolean;
}) {
  const { user } = useAuth();
  const { data: clients = [] } = useClients();
  const [clientId, setClientId] = useState<string | null>(initialClientId ?? null);
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialClientId) setClientId(initialClientId);
  }, [initialClientId]);

  useEffect(() => {
    if ((!open && !embedded) || clientId) return;
    if (clients[0]) setClientId(clients[0].id);
  }, [open, clients, clientId]);

  const load = async (cid: string) => {
    setLoading(true);
    const { data, error } = await sb
      .from("client_notes")
      .select("*")
      .eq("client_id", cid)
      .order("done", { ascending: true })
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setNotes((data ?? []) as ClientNote[]);
  };

  useEffect(() => {
    if ((open || embedded) && clientId) void load(clientId);
  }, [open, embedded, clientId]);

  const addNote = async () => {
    if (!clientId || !user) return;
    const { data, error } = await sb.from("client_notes").insert({
      client_id: clientId, title: "Nova anotação", content: "", created_by: user.id,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    setNotes((n) => [data as ClientNote, ...n]);
  };

  const updateNote = async (id: string, patch: Partial<ClientNote>) => {
    setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    const { error } = await sb.from("client_notes").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };

  const deleteNote = async (id: string) => {
    if (!confirm("Excluir esta anotação?")) return;
    setNotes((n) => n.filter((x) => x.id !== id));
    const { error } = await sb.from("client_notes").delete().eq("id", id);
    if (error) toast.error(error.message);
  };

  const currentClient = useMemo(() => clients.find((c) => c.id === clientId), [clients, clientId]);
  const pendingCount = notes.filter((n) => !n.done).length;

  const content = (
    <>
        {embedded ? (
          <div className="border-b px-4 py-3">
            <h2 className="text-lg font-semibold">Anotações do cliente</h2>
            <p className="text-sm text-muted-foreground">
              Anotações livres, com checkbox e anexos. Role na horizontal para navegar.
            </p>
          </div>
        ) : (
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle>Anotações do cliente</SheetTitle>
            <SheetDescription>
              Anotações livres, com checkbox e anexos. Role na horizontal para navegar.
            </SheetDescription>
          </SheetHeader>
        )}

        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Select value={clientId ?? undefined} onValueChange={(v) => setClientId(v)}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addNote} disabled={!clientId}>
            <Plus className="mr-1 h-4 w-4" /> Nova
          </Button>
          {currentClient && (
            <p className="ml-2 text-xs text-muted-foreground">
              {notes.length} anotação(ões) · {pendingCount} pendente(s)
            </p>
          )}
        </div>

        <div className="kanban-scroll min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          ) : notes.length === 0 ? (
            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">
              {clientId ? "Nenhuma anotação ainda. Clique em \"Nova\"." : "Selecione um cliente."}
            </p>
          ) : (
            <div className="flex h-full items-start gap-3">
              {notes.map((note) => (
                <div key={note.id} className="flex h-full w-80 shrink-0 flex-col overflow-y-auto">
                  <NoteCard
                    note={note}
                    onChange={(p) => void updateNote(note.id, p)}
                    onDelete={() => void deleteNote(note.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {clientId && <ClientFilesPanel clientId={clientId} />}
    </>
  );

  if (embedded) {
    return <div className="flex min-h-[680px] flex-col">{content}</div>;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="flex h-[85vh] w-full flex-col p-0 sm:max-w-none">
        {content}
      </SheetContent>
    </Sheet>
  );
}

function NoteCard({
  note, onChange, onDelete,
}: {
  note: ClientNote;
  onChange: (p: Partial<ClientNote>) => void;
  onDelete: () => void;
}) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [atts, setAtts] = useState<NoteAttachment[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [previewAtt, setPreviewAtt] = useState<PreviewableAttachment | null>(null);

  // Track what's actually persisted, so we don't clobber in-progress typing
  const savedTitleRef = useRef(note.title);
  const savedContentRef = useRef(note.content);
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { titleRef.current = title; }, [title]);
  useEffect(() => { contentRef.current = content; }, [content]);

  // Re-sync from props ONLY when there are no unsaved local edits
  useEffect(() => {
    if (titleRef.current === savedTitleRef.current) {
      savedTitleRef.current = note.title;
      setTitle(note.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.title]);

  useEffect(() => {
    if (contentRef.current === savedContentRef.current) {
      savedContentRef.current = note.content;
      setContent(note.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.content]);

  const flushSave = async () => {
    const nextTitle = titleRef.current;
    const nextContent = contentRef.current;
    const patch: Partial<ClientNote> = {};
    if (nextTitle !== savedTitleRef.current) patch.title = nextTitle;
    if (nextContent !== savedContentRef.current) patch.content = nextContent;
    if (Object.keys(patch).length === 0) return;
    setSaveState("saving");
    // Mark as saved optimistically so prop-sync from onChange doesn't clobber
    savedTitleRef.current = nextTitle;
    savedContentRef.current = nextContent;
    const { error } = await sb.from("client_notes").update(patch).eq("id", note.id);
    if (error) {
      setSaveState("error");
      toast.error(`Erro ao salvar: ${error.message}`);
      return;
    }
    onChange(patch);
    setSaveState("saved");
    setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1500);
  };

  // Debounced autosave on title/content change
  useEffect(() => {
    if (title === savedTitleRef.current && content === savedContentRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => { void flushSave(); }, 600);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  // Flush on unmount (sheet close / navigation)
  useEffect(() => {
    return () => {
      if (titleRef.current !== savedTitleRef.current || contentRef.current !== savedContentRef.current) {
        void flushSave();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAtts = async () => {
    const { data } = await sb
      .from("client_note_attachments")
      .select("*")
      .eq("note_id", note.id)
      .order("created_at", { ascending: false });
    const list = (data ?? []) as NoteAttachment[];
    setAtts(list);
    const next: Record<string, string> = {};
    await Promise.all(list
      .filter((a) => a.mime_type !== "text/uri-list")
      .map(async (a) => {
        const { data: signed } = await supabase.storage
          .from("task-attachments").createSignedUrl(a.storage_path, 3600);
        if (signed) next[a.id] = signed.signedUrl;
      }));
    setUrls(next);
  };

  useEffect(() => { if (expanded) void loadAtts(); }, [expanded, note.id]);

  const onFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || !user) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `notes/${note.id}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage
        .from("task-attachments").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { error: insErr } = await sb.from("client_note_attachments").insert({
        note_id: note.id, file_name: file.name, storage_path: path,
        mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,
      });
      if (insErr) toast.error(insErr.message);
    }
    setUploading(false);
    void loadAtts();
  };

  const addLink = async () => {
    const url = prompt("Cole o link");
    if (!url || !user) return;
    const { error } = await sb.from("client_note_attachments").insert({
      note_id: note.id, file_name: url, storage_path: url,
      mime_type: "text/uri-list", uploaded_by: user.id,
    });
    if (error) { toast.error(error.message); return; }
    void loadAtts();
  };

  const removeAtt = async (a: NoteAttachment) => {
    if (a.mime_type !== "text/uri-list") {
      await supabase.storage.from("task-attachments").remove([a.storage_path]);
    }
    await sb.from("client_note_attachments").delete().eq("id", a.id);
    void loadAtts();
  };

  return (
    <div className={`rounded-lg border bg-card ${note.done ? "opacity-70" : ""}`}>
      <div className="flex items-start gap-2 p-3">
        <Checkbox
          checked={note.done}
          onCheckedChange={(v) => onChange({ done: !!v })}
          className="mt-1"
        />
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-0.5 text-muted-foreground hover:text-foreground"
        >
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => void flushSave()}
          className={`h-8 flex-1 border-0 px-1 text-sm font-medium shadow-none focus-visible:ring-0 ${note.done ? "line-through" : ""}`}
          placeholder="Título"
        />
        <SaveIndicator state={saveState} />
        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={onDelete}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      {expanded && (
        <div className="space-y-3 border-t px-3 pb-3 pt-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => void flushSave()}
            placeholder="Escreva aqui informações, contexto, lembretes…"
            className="min-h-[120px] resize-y text-sm"
          />

          <FileDropZone
            onFiles={(files) => void onFiles(files)}
            disabled={uploading}
            className="rounded-md border border-dashed bg-muted/30 p-2"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                <Paperclip className="h-3 w-3" /> Arquivos e imagens ({atts.length})
              </p>
              <div className="flex gap-1">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="*/*"
                    className="hidden"
                    onChange={(e) => void onFiles(e.target.files)}
                  />
                  <span className="rounded border bg-background px-2 py-0.5 text-[10px] hover:bg-muted">
                    {uploading ? "Enviando…" : "+ Arquivo"}
                  </span>
                </label>
                <button type="button" onClick={addLink} className="rounded border bg-background px-2 py-0.5 text-[10px] hover:bg-muted">
                  + Link
                </button>
              </div>
            </div>
            <p className="mb-2 text-[10px] text-muted-foreground">
              Aceita qualquer tipo: PDF, Word, Excel, PNG, JPG, vídeo, áudio, etc. Imagens, PDFs, vídeos, áudios e textos abrem aqui; os demais baixam ou abrem em nova aba.
            </p>
            {atts.length === 0 ? (
              <p className="rounded border border-dashed bg-background/50 p-3 text-center text-[11px] text-muted-foreground">
                Nenhum arquivo. Clique em "+ Arquivo" para enviar.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-1.5">
                {atts.map((a) => {
                  const isLink = a.mime_type === "text/uri-list";
                  const isImage = !isLink && a.mime_type?.startsWith("image/");
                  const canPreview = !isLink && PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");

                  const handleOpen = () => {
                    if (isLink) {
                      window.open(a.storage_path, "_blank", "noopener,noreferrer");
                      return;
                    }
                    if (canPreview) {
                      setPreviewAtt({ file_name: a.file_name, storage_path: a.storage_path, mime_type: a.mime_type });
                      return;
                    }
                    const url = urls[a.id];
                    if (url) window.open(url, "_blank", "noopener,noreferrer");
                  };

                  return (
                    <div key={a.id} className="group relative aspect-square overflow-hidden rounded border bg-muted">
                      <button
                        type="button"
                        onClick={handleOpen}
                        className="block h-full w-full text-left"
                        title={a.file_name}
                      >
                        {isImage && urls[a.id] ? (
                          <img src={urls[a.id]} alt={a.file_name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground">
                            {isLink ? <Link2 className="h-4 w-4" /> : canPreview ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                            <span className="line-clamp-2 w-full break-all text-center text-[8px] leading-tight">{a.file_name}</span>
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => void removeAtt(a)}
                        className="absolute right-0.5 top-0.5 hidden rounded bg-black/60 p-0.5 text-white group-hover:block"
                        title="Remover"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </FileDropZone>

          <p className="text-[10px] text-muted-foreground">
            Atualizado em {format(new Date(note.updated_at), "dd MMM yyyy HH:mm", { locale: ptBR })}
          </p>
        </div>
      )}

      <AttachmentPreviewDialog
        open={!!previewAtt}
        onOpenChange={(o) => { if (!o) setPreviewAtt(null); }}
        attachment={previewAtt}
      />
    </div>
  );
}

function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" | "error" }) {
  if (state === "idle") return null;
  if (state === "saving") return (
    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
      <Loader2 className="h-3 w-3 animate-spin" /> salvando
    </span>
  );
  if (state === "saved") return (
    <span className="flex items-center gap-1 text-[10px] text-emerald-600">
      <Check className="h-3 w-3" /> salvo
    </span>
  );
  return <span className="text-[10px] text-destructive">erro</span>;
}

interface ClientFile {
  id: string;
  client_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function ClientFilesPanel({ clientId }: { clientId: string }) {
  const { user } = useAuth();
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const load = async () => {
    const { data, error } = await sb
      .from("client_files")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    const list = (data ?? []) as ClientFile[];
    setFiles(list);
    const next: Record<string, string> = {};
    await Promise.all(list.map(async (f) => {
      const { data: signed } = await supabase.storage
        .from("task-attachments").createSignedUrl(f.storage_path, 3600);
      if (signed) next[f.id] = signed.signedUrl;
    }));
    setUrls(next);
  };

  useEffect(() => { void load(); /* eslint-disable-next-line */ }, [clientId]);

  const onFiles = async (fl: FileList | null) => {
    if (!fl || fl.length === 0 || !user) return;
    setUploading(true);
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `clients/${clientId}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { error: insErr } = await sb.from("client_files").insert({
        client_id: clientId, file_name: file.name, storage_path: path,
        mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,
      });
      if (insErr) toast.error(insErr.message);
    }
    setUploading(false);
    void load();
  };

  const remove = async (f: ClientFile) => {
    if (!confirm(`Excluir "${f.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([f.storage_path]);
    await sb.from("client_files").delete().eq("id", f.id);
    void load();
  };

  const open = (f: ClientFile) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
    if (canPreview) {
      setPreview({ file_name: f.file_name, storage_path: f.storage_path, mime_type: f.mime_type });
      return;
    }
    const url = urls[f.id];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <FileDropZone
      onFiles={(files) => void onFiles(files)}
      disabled={uploading}
      className="border-t bg-muted/20"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <Paperclip className="h-4 w-4" />
          Arquivos do cliente ({files.length})
        </button>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="*/*"
            className="hidden"
            onChange={(e) => void onFiles(e.target.files)}
          />
          <span className="rounded border bg-background px-3 py-1 text-xs hover:bg-muted">
            {uploading ? "Enviando…" : "+ Adicionar arquivo"}
          </span>
        </label>
      </div>

      {!collapsed && (
        <div className="max-h-[28vh] overflow-y-auto px-4 pb-3">
          <p className="mb-2 text-[11px] text-muted-foreground">
            PDF, Word, Excel, imagens, vídeos, áudio, qualquer tipo. Imagens, PDF, vídeo, áudio e texto abrem aqui; os demais abrem em nova aba.
          </p>
          {files.length === 0 ? (
            <p className="rounded border border-dashed bg-background/50 p-4 text-center text-xs text-muted-foreground">
              Nenhum arquivo enviado ainda para este cliente.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {files.map((f) => {
                const isImage = f.mime_type?.startsWith("image/");
                const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
                return (
                  <div key={f.id} className="group relative aspect-square overflow-hidden rounded border bg-background">
                    <button
                      type="button"
                      onClick={() => open(f)}
                      className="block h-full w-full text-left"
                      title={f.file_name}
                    >
                      {isImage && urls[f.id] ? (
                        <img src={urls[f.id]} alt={f.file_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-muted-foreground">
                          {canPreview ? <FileText className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                          <span className="line-clamp-2 w-full break-all text-center text-[9px] leading-tight">{f.file_name}</span>
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(f)}
                      className="absolute right-0.5 top-0.5 hidden rounded bg-black/60 p-0.5 text-white group-hover:block"
                      title="Excluir"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <AttachmentPreviewDialog
        open={!!preview}
        onOpenChange={(o) => { if (!o) setPreview(null); }}
        attachment={preview}
      />
    </FileDropZone>
  );
}
