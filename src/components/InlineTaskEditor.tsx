import { useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Download, ExternalLink, GripVertical, Image as ImageIcon, Link2, Paperclip, Pencil, RotateCcw, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";
import { FileDropZone } from "@/components/FileDropZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useAssignableProfiles, type Client, type KanbanColumn, type Profile, type Task, type TaskTag } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";

interface Attachment {
  id: string;
  task_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  created_at: string;
}

const LINK_MIME = "text/uri-list";

interface Props {
  task: Task;
  clients: Client[];
  profiles: Profile[];
  columns: KanbanColumn[];
  tags: TaskTag[];
  onClose?: () => void;
  onOpenFull?: () => void;
  compact?: boolean;
  dragHandleProps?: HTMLAttributes<HTMLSpanElement>;
}

function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const deadlineToIso = (date: string) => date ? new Date(`${date}T12:00:00`).toISOString() : null;

export function InlineTaskEditor({
  task,
  clients,
  profiles,
  columns,
  tags,
  onClose,
  onOpenFull,
  compact = false,
  dragHandleProps,
}: Props) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
    due_date: toLocalInput(task.due_date),
    client_id: task.client_id ?? "none",
    assignee_id: task.assignee_id ?? "none",
    column_id: task.column_id ?? "none",
    tag_id: task.tag_id ?? "none",
    color: task.color ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const canDeleteTask = !!isAdmin || task.created_by === user?.id;
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAttachments() {
      const { data } = await supabase
        .from("attachments")
        .select("*")
        .eq("task_id", task.id)
        .order("created_at", { ascending: true });

      if (cancelled) return;

      const list = (data ?? []) as Attachment[];
      setAttachments(list);

      const next: Record<string, string> = {};
      await Promise.all(
        list
          .filter((attachment) => attachment.mime_type !== LINK_MIME && (attachment.mime_type?.startsWith("image/") ?? false))
          .map(async (attachment) => {
            const { data: signed } = await supabase.storage
              .from("task-attachments")
              .createSignedUrl(attachment.storage_path, 3600);
            if (signed) next[attachment.id] = signed.signedUrl;
          }),
      );

      if (!cancelled) setPreviews(next);
    }

    void loadAttachments();
    return () => {
      cancelled = true;
    };
  }, [task.id]);

  useEffect(() => {
    setForm({
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      status: task.status,
      due_date: toLocalInput(task.due_date),
      client_id: task.client_id ?? "none",
      assignee_id: task.assignee_id ?? "none",
      column_id: task.column_id ?? "none",
      tag_id: task.tag_id ?? "none",
      color: task.color ?? "",
    });
  }, [task]);

  const save = async (overrides: Partial<typeof form> = {}) => {
    setSaving(true);
    const merged = { ...form, ...overrides };
    const payload = {
      title: merged.title.trim() || "Sem título",
      description: merged.description || null,
      priority: merged.priority,
      status: merged.status,
      due_date: deadlineToIso(merged.due_date),
      client_id: merged.client_id === "none" ? null : merged.client_id,
      assignee_id: merged.assignee_id === "none" ? null : merged.assignee_id,
      column_id: merged.column_id === "none" ? null : merged.column_id,
      tag_id: merged.tag_id === "none" ? null : merged.tag_id,
      color: merged.color || null,
      completed_at: merged.status === "done" ? task.completed_at ?? new Date().toISOString() : null,
    };

    const { error } = await supabase.from("tasks").update(payload).eq("id", task.id);
    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Alterações salvas");
    void qc.invalidateQueries({ queryKey: ["tasks"] });
  };

  const remove = async () => {
    if (!confirm("Excluir esta tarefa?")) return;

    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Tarefa excluída");
    void qc.invalidateQueries({ queryKey: ["tasks"] });
    onClose?.();
  };

  const toggleDone = async () => {
    const nextStatus: Task["status"] = form.status === "done" ? "in_progress" : "done";
    setForm((current) => ({ ...current, status: nextStatus }));
    await save({ status: nextStatus });
  };

  const uploadFile = async (file: File) => {
    if (!user) return;

    const safeName =
      file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]+/g, "_")
        .replace(/_+/g, "_")
        .slice(-120) || "arquivo";

    const path = `${task.id}/${Date.now()}-${safeName}`;
    const contentType = file.type || "application/octet-stream";

    const { error: uploadError } = await supabase.storage
      .from("task-attachments")
      .upload(path, file, { contentType, upsert: false });

    if (uploadError) {
      toast.error(`Falha no upload: ${uploadError.message}`);
      return;
    }

    const { data, error } = await supabase
      .from("attachments")
      .insert({
        task_id: task.id,
        file_name: file.name,
        storage_path: path,
        mime_type: contentType,
        size_bytes: file.size,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    const attachment = data as Attachment;
    setAttachments((current) => [...current, attachment]);

    if (attachment.mime_type?.startsWith("image/")) {
      const { data: signed } = await supabase.storage
        .from("task-attachments")
        .createSignedUrl(attachment.storage_path, 3600);

      if (signed) {
        setPreviews((current) => ({ ...current, [attachment.id]: signed.signedUrl }));
      }
    }

    toast.success("Arquivo enviado");
  };

  const addLink = async () => {
    if (!user || !linkUrl.trim()) return;

    let url = linkUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    const { data, error } = await supabase
      .from("attachments")
      .insert({
        task_id: task.id,
        file_name: linkLabel.trim() || url,
        storage_path: url,
        mime_type: LINK_MIME,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setAttachments((current) => [...current, data as Attachment]);
    setLinkUrl("");
    setLinkLabel("");
    toast.success("Link adicionado");
  };

  const openAttachment = (attachment: Attachment) => {
    if (attachment.mime_type === LINK_MIME) {
      window.open(attachment.storage_path, "_blank", "noopener,noreferrer");
      return;
    }

    setPreviewAttachment(attachment);
  };

  const downloadAttachment = async (attachment: Attachment) => {
    if (attachment.mime_type === LINK_MIME) {
      openAttachment(attachment);
      return;
    }

    const { data, error } = await supabase.storage.from("task-attachments").download(attachment.storage_path);
    if (error) {
      toast.error(error.message);
      return;
    }

    const blobUrl = URL.createObjectURL(data);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = attachment.file_name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
  };

  const deleteAttachment = async (attachment: Attachment) => {
    if (attachment.mime_type !== LINK_MIME) {
      await supabase.storage.from("task-attachments").remove([attachment.storage_path]);
    }

    await supabase.from("attachments").delete().eq("id", attachment.id);
    setAttachments((current) => current.filter((item) => item.id !== attachment.id));
  };

  const handleSaveOnEnter = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void save();
    }
  };

  const selectTriggerClass = compact ? "h-8 text-xs" : "h-7 text-xs";

  return (
    <>
      <div
        className={compact ? "rounded-lg border bg-card p-3 shadow-sm" : "max-h-[75vh] overflow-y-auto rounded-lg border bg-card p-3 shadow-md ring-2 ring-primary/40"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            {compact && dragHandleProps ? (
              <span
                {...dragHandleProps}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground active:cursor-grabbing"
                title="Arrastar tarefa"
              >
                <GripVertical className="h-3.5 w-3.5" />
              </span>
            ) : null}
            <span className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">
              {compact ? "Inline" : "Editando"}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {onOpenFull ? (
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onOpenFull} title="Tela cheia">
                <Pencil className="h-3 w-3" />
              </Button>
            ) : null}
            {!compact && onClose ? (
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onClose} title="Fechar">
                <X className="h-3 w-3" />
              </Button>
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-[10px] text-muted-foreground">Nome</Label>
            <Textarea
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              onKeyDown={handleSaveOnEnter}
              placeholder="Nome da tarefa"
              className="mt-1 min-h-[54px] resize-none overflow-hidden text-sm font-medium leading-snug [overflow-wrap:anywhere]"
              autoFocus={!compact}
            />
          </div>

          <div>
            <Label className="text-[10px] text-muted-foreground">Observação</Label>
            <Textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              onKeyDown={handleSaveOnEnter}
              placeholder="Observações da tarefa"
              className="mt-1 min-h-[88px] resize-y text-xs leading-relaxed [overflow-wrap:anywhere]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[10px] text-muted-foreground">Tag</Label>
              <Select value={form.tag_id} onValueChange={(value) => setForm({ ...form, tag_id: value })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Sem tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem tag</SelectItem>
                  {tags.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: tag.color }} />
                        {tag.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Status</Label>
              <Select value={form.status ?? "none"} onValueChange={(value) => setForm({ ...form, status: value === "none" ? null : (value as Task["status"]) })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem status</SelectItem>
                  <SelectItem value="todo">A fazer</SelectItem>
                  <SelectItem value="in_progress">Em andamento</SelectItem>
                  <SelectItem value="review">Em revisão</SelectItem>
                  <SelectItem value="done">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Prioridade</Label>
              <Select value={form.priority ?? "none"} onValueChange={(value) => setForm({ ...form, priority: value === "none" ? null : (value as Task["priority"]) })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem prioridade</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Cliente</Label>
              <Select value={form.client_id} onValueChange={(value) => setForm({ ...form, client_id: value })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Responsável</Label>
              <Select value={form.assignee_id} onValueChange={(value) => setForm({ ...form, assignee_id: value })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem responsável</SelectItem>
                  {assignableProfiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.full_name || profile.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[10px] text-muted-foreground">Prazo</Label>
              <Input
                type="date"
                value={form.due_date}
                onChange={(event) => setForm({ ...form, due_date: event.target.value })}
                className={selectTriggerClass}
              />
            </div>
          </div>

          {!compact ? (
            <>
              <div>
                <Label className="text-[10px] text-muted-foreground">Coluna</Label>
                <Select value={form.column_id} onValueChange={(value) => setForm({ ...form, column_id: value })}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem coluna</SelectItem>
                    {columns.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-[10px] text-muted-foreground">Cor</Label>
                <input
                  type="color"
                  value={form.color || "#1e3a8a"}
                  onChange={(event) => setForm({ ...form, color: event.target.value })}
                  className="h-7 w-10 cursor-pointer rounded border bg-transparent"
                />
                {form.color ? (
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]" onClick={() => setForm({ ...form, color: "" })}>
                    Limpar
                  </Button>
                ) : null}
              </div>
            </>
          ) : null}

          <FileDropZone
            onFiles={(files) => {
              const file = files.item(0);
              if (file) void uploadFile(file);
            }}
            className="space-y-2 rounded-md border border-dashed p-2"
          >
            <div className="flex items-center justify-between gap-2">
              <Label className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Paperclip className="h-3 w-3" />Arquivos
              </Label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-[10px]"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="mr-1 h-3 w-3" />Enviar arquivo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="*/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadFile(file);
                  event.target.value = "";
                }}
              />
            </div>

            {attachments.length > 0 ? (
              <ul className="space-y-1.5">
                {attachments.map((attachment) => {
                  const isLink = attachment.mime_type === LINK_MIME;
                  const isImage = !isLink && attachment.mime_type?.startsWith("image/");

                  return (
                    <li key={attachment.id} className="rounded border bg-muted/30 p-1.5">
                      <div className="flex items-start gap-2">
                        {isImage && previews[attachment.id] ? (
                          <button
                            type="button"
                            onClick={() => openAttachment(attachment)}
                            className="h-10 w-10 shrink-0 overflow-hidden rounded border"
                            title="Visualizar"
                          >
                            <img src={previews[attachment.id]} alt={attachment.file_name} className="h-full w-full object-cover" />
                          </button>
                        ) : (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border bg-background text-muted-foreground">
                            {isLink ? <Link2 className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => openAttachment(attachment)}
                          className="min-w-0 flex-1 text-left text-xs leading-snug text-foreground transition hover:underline [overflow-wrap:anywhere]"
                          title={isLink ? attachment.storage_path : attachment.file_name}
                        >
                          {attachment.file_name}
                        </button>

                        <div className="flex shrink-0 items-center gap-0.5">
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openAttachment(attachment)} title="Abrir">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          {!isLink ? (
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => downloadAttachment(attachment)} title="Baixar">
                              <Download className="h-3 w-3" />
                            </Button>
                          ) : null}
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => void deleteAttachment(attachment)} title="Remover">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <div className="flex flex-col gap-1">
              <Input
                value={linkLabel}
                onChange={(event) => setLinkLabel(event.target.value)}
                placeholder="Rótulo do link (opcional)"
                className="h-7 text-xs"
              />
              <div className="flex gap-1">
                <Input
                  value={linkUrl}
                  onChange={(event) => setLinkUrl(event.target.value)}
                  placeholder="https://..."
                  className="h-7 text-xs"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void addLink();
                    }
                  }}
                />
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => void addLink()} disabled={!linkUrl.trim()}>
                  <Link2 className="mr-1 h-3 w-3" />Adicionar
                </Button>
              </div>
            </div>
          </FileDropZone>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t pt-2">
          {canDeleteTask && (
            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => void remove()}>
              <Trash2 className="mr-1 h-3 w-3" />Excluir
            </Button>
          )}
          <div className="flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => void toggleDone()}>
              {form.status === "done" ? (
                <>
                  <RotateCcw className="mr-1 h-3 w-3" />Reabrir
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-1 h-3 w-3" />Concluir
                </>
              )}
            </Button>
            <Button size="sm" className="h-7 text-xs" onClick={() => void save()} disabled={saving}>
              <Save className="mr-1 h-3 w-3" />Salvar
            </Button>
          </div>
        </div>
      </div>

      <AttachmentPreviewDialog
        open={!!previewAttachment}
        onOpenChange={(open) => {
          if (!open) setPreviewAttachment(null);
        }}
        attachment={previewAttachment}
      />
    </>
  );
}
