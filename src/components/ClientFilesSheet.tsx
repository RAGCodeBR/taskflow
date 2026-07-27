import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, ExternalLink, FileText, Paperclip, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useClients } from "@/hooks/use-data";
import { toast } from "sonner";
import { AttachmentPreviewDialog, type PreviewableAttachment } from "@/components/AttachmentPreviewDialog";
import { FileDropZone } from "@/components/FileDropZone";

const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;
const sb = supabase as any;

interface ClientFile {
  id: string;
  client_id: string;
  title: string | null;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  position: number;
  created_at: string;
}

export function ClientFilesSheet({
  open,
  onOpenChange,
  initialClientId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialClientId?: string | null;
}) {
  const { user } = useAuth();
  const { data: clients = [] } = useClients();
  const [clientId, setClientId] = useState<string | null>(initialClientId ?? null);
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);

  useEffect(() => {
    if (initialClientId) setClientId(initialClientId);
  }, [initialClientId]);

  useEffect(() => {
    if (open && !clientId && clients[0]) setClientId(clients[0].id);
  }, [open, clients, clientId]);

  const load = async (cid: string) => {
    const { data, error } = await sb
      .from("client_files")
      .select("*")
      .eq("client_id", cid)
      .order("position", { ascending: true })
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

  useEffect(() => {
    if (open && clientId) void load(clientId);
  }, [open, clientId]);

  const onUpload = async (fl: FileList | null) => {
    if (!fl || !fl.length || !user || !clientId) return;
    setUploading(true);
    const startPos = files.length;
    let i = 0;
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `clients/${clientId}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { error: insErr } = await sb.from("client_files").insert({
        client_id: clientId,
        title: file.name,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id,
        position: startPos + i,
      });
      if (insErr) toast.error(insErr.message);
      i++;
    }
    setUploading(false);
    if (clientId) void load(clientId);
  };

  const updateTitle = async (id: string, title: string) => {
    setFiles((curr) => curr.map((f) => (f.id === id ? { ...f, title } : f)));
    const { error } = await sb.from("client_files").update({ title }).eq("id", id);
    if (error) toast.error(error.message);
  };

  const remove = async (f: ClientFile) => {
    if (!confirm(`Excluir "${f.title || f.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([f.storage_path]);
    await sb.from("client_files").delete().eq("id", f.id);
    if (clientId) void load(clientId);
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = files.findIndex((f) => f.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= files.length) return;
    const next = [...files];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    const reIndexed = next.map((f, i) => ({ ...f, position: i }));
    setFiles(reIndexed);
    await Promise.all(
      reIndexed.map((f) => sb.from("client_files").update({ position: f.position }).eq("id", f.id)),
    );
  };

  const openFile = (f: ClientFile) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
    if (canPreview) {
      setPreview({ file_name: f.title || f.file_name, storage_path: f.storage_path, mime_type: f.mime_type });
      return;
    }
    const u = urls[f.id];
    if (u) window.open(u, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-2xl flex-col p-0 sm:max-w-2xl">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="flex items-center gap-2">
            <Paperclip className="h-4 w-4" /> Arquivos do cliente
          </SheetTitle>
          <SheetDescription>
            Apenas arquivos. Defina título e reordene com as setas. Aceita qualquer tipo.
          </SheetDescription>
        </SheetHeader>

        <FileDropZone
          onFiles={(uploadedFiles) => void onUpload(uploadedFiles)}
          disabled={!clientId || uploading}
          className="border-b px-4 py-3"
        >
          <div className="flex items-center gap-2">
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
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="*/*"
              className="hidden"
              onChange={(e) => void onUpload(e.target.files)}
              disabled={!clientId || uploading}
            />
            <span className="inline-flex items-center rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-muted">
              {uploading ? "Enviando…" : "+ Adicionar arquivo"}
            </span>
          </label>
          {clientId && (
            <p className="ml-auto text-xs text-muted-foreground">{files.length} arquivo(s)</p>
          )}
          </div>
        </FileDropZone>

        <div className="flex-1 overflow-y-auto p-4">
          {!clientId ? (
            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">
              Selecione um cliente para ver e gerenciar arquivos.
            </p>
          ) : files.length === 0 ? (
            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">
              Nenhum arquivo enviado para este cliente.
            </p>
          ) : (
            <ul className="space-y-2">
              {files.map((f, i) => {
                const isImage = f.mime_type?.startsWith("image/");
                const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
                return (
                  <li key={f.id} className="flex items-center gap-3 rounded-lg border bg-card p-2">
                    <div className="flex flex-col">
                      <Button
                        size="icon" variant="ghost" className="h-6 w-6"
                        onClick={() => void move(f.id, -1)} disabled={i === 0}
                        title="Mover para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon" variant="ghost" className="h-6 w-6"
                        onClick={() => void move(f.id, 1)} disabled={i === files.length - 1}
                        title="Mover para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <button
                      type="button"
                      onClick={() => openFile(f)}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded border bg-muted"
                      title={f.file_name}
                    >
                      {isImage && urls[f.id] ? (
                        <img src={urls[f.id]} alt={f.file_name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          {canPreview ? <FileText className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                        </div>
                      )}
                    </button>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Input
                        value={f.title ?? ""}
                        onChange={(e) => setFiles((curr) => curr.map((x) => (x.id === f.id ? { ...x, title: e.target.value } : x)))}
                        onBlur={(e) => void updateTitle(f.id, e.target.value)}
                        placeholder="Título do arquivo"
                        className="h-7 text-sm"
                      />
                      <p className="truncate text-[11px] text-muted-foreground" title={f.file_name}>
                        {f.file_name}
                      </p>
                    </div>

                    <Button
                      size="sm" variant="ghost"
                      onClick={() => openFile(f)}
                      title="Abrir"
                    >
                      Abrir
                    </Button>
                    <Button
                      size="icon" variant="ghost" className="h-8 w-8 text-destructive"
                      onClick={() => void remove(f)}
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <AttachmentPreviewDialog
          open={!!preview}
          onOpenChange={(o) => { if (!o) setPreview(null); }}
          attachment={preview}
        />
      </SheetContent>
    </Sheet>
  );
}
