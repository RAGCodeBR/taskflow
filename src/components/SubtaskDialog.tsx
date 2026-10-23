import { useEffect, useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import { Download, FileText, Loader2, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { enqueueOfflineOperation, isOffline, listOfflineOperations } from "@/lib/offline-sync";
import { isTaskAttachmentTooLarge, MAX_TASK_ATTACHMENT_LABEL } from "@/lib/attachment-limits";
import { RichTextEditor, allClipboardImageFiles, hasClipboardText, type PastedEditorImage } from "@/components/RichTextEditor";
import { attachImagesToDescription, pendingDescriptionImageIds, stripPendingDescriptionImages } from "@/lib/task-description-images";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldLinks } from "@/components/LinkedText";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useAssignableProfiles } from "@/hooks/use-data";
import { useQueryClient } from "@tanstack/react-query";

export interface EditableSubtask {
  id: string;
  title: string;
  done: boolean;
  position: number;
  due_date: string | null;
  assignee_id: string | null;
  notes: string | null;
  completed_at: string | null;
}

export interface EditableSubtaskAttachment {
  id: string;
  subtask_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
}

type PendingPrint = { id: string; file: File; previewUrl: string; inline: boolean };

interface SubtaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string | null;
  /** Ambiente da tarefa dona. A lista de pessoas segue a tarefa, não quem abriu. */
  workspaceId?: string | null;
  showAvatars?: boolean;
  marketingLayout?: boolean;
  parentTitle?: string;
  attachments?: EditableSubtaskAttachment[];
  subtask?: EditableSubtask | null;
  position: number;
  defaults?: {
    title?: string;
    dueDate?: string;
    assigneeId?: string;
  };
  onSaved: (subtask: EditableSubtask) => void;
  onAttachmentSaved?: (attachment: EditableSubtaskAttachment) => void;
  onAttachmentsComplete?: (subtaskId: string) => void;
}

const toDateInputValue = (value: string | null | undefined) =>
  value ? value.slice(0, 10) : "";

const dueDateToIso = (value: string) =>
  value ? new Date(`${value}T12:00:00`).toISOString() : null;

const formatCompletionDate = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

function SavedSubtaskImage({ attachment, userId }: { attachment: EditableSubtaskAttachment; userId?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const isImage = Boolean(attachment.mime_type?.startsWith("image/") || /\.(?:png|jpe?g|gif|webp|avif|bmp)$/i.test(attachment.file_name));
  useEffect(() => {
    if (!isImage) return;
    let active = true;
    let localUrl: string | null = null;
    void (async () => {
      const queued = userId ? (await listOfflineOperations(userId)).find((operation) => operation.entity === "attachment" && operation.entityId === attachment.id) : null;
      if (queued?.payload.blob instanceof Blob) {
        localUrl = URL.createObjectURL(queued.payload.blob);
        if (active) setSrc(localUrl);
        else URL.revokeObjectURL(localUrl);
        return;
      }
      if (!navigator.onLine) return;
      const { data } = await supabase.storage.from("task-attachments").createSignedUrl(attachment.storage_path, 3600);
      if (active && data?.signedUrl) setSrc(data.signedUrl);
    })().catch(() => { if (active) setSrc(null); });
    return () => { active = false; if (localUrl) URL.revokeObjectURL(localUrl); };
  }, [attachment.id, attachment.storage_path, isImage, userId]);
  return src ? <img src={src} alt={attachment.file_name} className="h-24 w-full rounded object-contain" /> : <span className="flex h-24 items-center justify-center text-muted-foreground"><FileText className="h-6 w-6" /></span>;
}

export function SubtaskDialog({
  open,
  onOpenChange,
  taskId,
  workspaceId,
  showAvatars = false,
  marketingLayout = false,
  parentTitle,
  attachments = [],
  subtask,
  position,
  defaults,
  onSaved,
  onAttachmentSaved,
  onAttachmentsComplete,
}: SubtaskDialogProps) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: assignableProfiles = [] } = useAssignableProfiles(workspaceId);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDateReason, setDueDateReason] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pendingPrints, setPendingPrints] = useState<PendingPrint[]>([]);
  const [draggingImages, setDraggingImages] = useState(false);
  const dragDepthRef = useRef(0);
  const savedSubtaskRef = useRef<EditableSubtask | null>(null);
  const pendingPrintsRef = useRef<PendingPrint[]>([]);
  const uploadedPrintsRef = useRef<Record<string, string>>({});
  const storedPrintPreviewsRef = useRef(new Map<string, string>());
  const initializedForRef = useRef<string | null>(null);
  const defaultTitle = defaults?.title ?? "";
  const defaultDueDate = defaults?.dueDate ?? "";
  const defaultAssigneeId = defaults?.assigneeId ?? "";

  const downloadAttachment = async (attachment: EditableSubtaskAttachment) => {
    const queued = user ? (await listOfflineOperations(user.id)).find((operation) => operation.entity === "attachment" && operation.entityId === attachment.id) : null;
    const blob = queued?.payload.blob instanceof Blob ? queued.payload.blob : (await supabase.storage.from("task-attachments").download(attachment.storage_path)).data;
    if (!blob) { toast.error("Não foi possível baixar este anexo."); return; }
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = attachment.file_name;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  useEffect(() => {
    if (!open) {
      initializedForRef.current = null;
      return;
    }
    const key = subtask?.id ?? "new";
    if (initializedForRef.current === key) return;
    initializedForRef.current = key;
    pendingPrintsRef.current.forEach((print) => URL.revokeObjectURL(print.previewUrl));
    storedPrintPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
    storedPrintPreviewsRef.current.clear();
    pendingPrintsRef.current = [];
    uploadedPrintsRef.current = {};
    setPendingPrints([]);
    dragDepthRef.current = 0;
    setDraggingImages(false);
    savedSubtaskRef.current = subtask ?? null;
    setTitle(subtask?.title ?? defaultTitle);
    setDueDate(toDateInputValue(subtask?.due_date) || defaultDueDate);
    setAssigneeId(subtask?.assignee_id ?? defaultAssigneeId);
    setNotes(subtask?.notes ?? "");
    setDueDateReason("");
    setDone(subtask?.done ?? false);
  }, [open, subtask, defaultTitle, defaultDueDate, defaultAssigneeId]);

  useEffect(() => () => {
    pendingPrintsRef.current.forEach((print) => URL.revokeObjectURL(print.previewUrl));
    storedPrintPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const removePrint = (id: string, revokePreview = true) => {
    const print = pendingPrintsRef.current.find((item) => item.id === id);
    if (print && revokePreview) URL.revokeObjectURL(print.previewUrl);
    pendingPrintsRef.current = pendingPrintsRef.current.filter((item) => item.id !== id);
    setPendingPrints(pendingPrintsRef.current);
  };

  const addImages = (files: File[]) => {
    const images = files.filter((file) => file.type.startsWith("image/"));
    const accepted = images.filter((file) => !isTaskAttachmentTooLarge(file));
    if (images.length !== files.length)
      toast.error("Somente imagens podem ser adicionadas à descrição da subtarefa.");
    if (accepted.length !== images.length)
      toast.error(`Algumas imagens ultrapassam o limite de ${MAX_TASK_ATTACHMENT_LABEL} por arquivo.`);
    const added = accepted.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      inline: false,
    }));
    if (!added.length) return;
    pendingPrintsRef.current = [...pendingPrintsRef.current, ...added];
    setPendingPrints(pendingPrintsRef.current);
  };

  const addEditorImages = (images: PastedEditorImage[]) => {
    const added = images.map((image) => ({ id: image.id, file: image.file, previewUrl: image.src, inline: true }));
    pendingPrintsRef.current = [...pendingPrintsRef.current, ...added];
    setPendingPrints(pendingPrintsRef.current);
  };

  const addAttachments = (files: FileList | null) => {
    if (!files) return;
    const accepted = Array.from(files).filter((file) => {
      if (!isTaskAttachmentTooLarge(file)) return true;
      toast.error(`${file.name} ultrapassa ${MAX_TASK_ATTACHMENT_LABEL}.`);
      return false;
    });
    if (!accepted.length) return;
    pendingPrintsRef.current = [...pendingPrintsRef.current, ...accepted.map((file) => ({
      id: crypto.randomUUID(), file, previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "", inline: false,
    }))];
    setPendingPrints(pendingPrintsRef.current);
  };

  const handlePrintPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    if (hasClipboardText(event.clipboardData)) return;
    const files = allClipboardImageFiles(event.clipboardData);
    if (!files.length) return;
    event.preventDefault();
    addImages(files);
  };

  const hasDraggedFiles = (event: DragEvent<HTMLElement>) =>
    Array.from(event.dataTransfer.types).includes("Files") || event.dataTransfer.files.length > 0;

  const handleImageDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    dragDepthRef.current += 1;
    setDraggingImages(true);
  };

  const handleImageDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleImageDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!dragDepthRef.current) return;
    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setDraggingImages(false);
  };

  const handleImageDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!hasDraggedFiles(event)) return;
    event.preventDefault();
    dragDepthRef.current = 0;
    setDraggingImages(false);
    if (!saving) addImages(Array.from(event.dataTransfer.files));
  };

  const handleOpenChange = (nextOpen: boolean, force = false) => {
    if (!nextOpen && saving && !force) return;
    if (!nextOpen) {
      dragDepthRef.current = 0;
      setDraggingImages(false);
      pendingPrintsRef.current.forEach((print) => URL.revokeObjectURL(print.previewUrl));
      storedPrintPreviewsRef.current.forEach((url) => URL.revokeObjectURL(url));
      storedPrintPreviewsRef.current.clear();
      pendingPrintsRef.current = [];
      setPendingPrints([]);
      uploadedPrintsRef.current = {};
    }
    onOpenChange(nextOpen);
  };

  const dueDateChanged =
    Boolean(subtask?.due_date) && dueDate !== toDateInputValue(subtask?.due_date);

  const uploadPrint = async (subtaskId: string, print: PendingPrint): Promise<string> => {
    if (!user || !taskId) throw new Error("Não foi possível identificar a tarefa para enviar o print.");
    const path = `${taskId}/subtasks/${subtaskId}/arquivo-${crypto.randomUUID()}`;
    const attachment = {
      id: crypto.randomUUID(),
      subtask_id: subtaskId,
      task_id: taskId,
      file_name: print.file.name,
      storage_path: path,
      mime_type: print.file.type || null,
      size_bytes: print.file.size,
      uploaded_by: user.id,
    };
    if (isOffline()) {
      await enqueueOfflineOperation({
        userId: user.id,
        entity: "attachment",
        action: "create",
        entityId: attachment.id,
        payload: {
          table: "subtask_attachments",
          bucket: "task-attachments",
          blob: print.file,
          attachment,
        },
      });
      onAttachmentSaved?.(attachment);
      return attachment.id;
    }
    const { error: uploadError } = await supabase.storage
      .from("task-attachments")
      .upload(path, print.file);
    if (uploadError) throw uploadError;
    const { data, error } = await (supabase.from("subtask_attachments") as any)
      .insert(attachment)
      .select()
      .single();
    if (error) {
      await supabase.storage.from("task-attachments").remove([path]);
      throw error;
    }
    onAttachmentSaved?.(data as EditableSubtaskAttachment);
    return attachment.id;
  };

  const save = async () => {
    if (!taskId) {
      toast.error("Salve a tarefa antes de criar uma subtarefa.");
      return;
    }
    if (!title.trim()) {
      toast.error("Informe o título da subtarefa.");
      return;
    }
    if (dueDateChanged && !dueDateReason.trim()) {
      toast.error("Informe a justificativa para alterar o prazo da subtarefa.");
      return;
    }

    const payload = {
      title: title.trim(),
      due_date: dueDateToIso(dueDate),
      assignee_id: assigneeId || null,
      notes: (marketingLayout ? stripPendingDescriptionImages(notes) : notes).trim() || null,
      done,
    };
    setSaving(true);
    try {
      const existing = savedSubtaskRef.current;
      const recordDueDateChange = Boolean(
        subtask && dueDateChanged && user && existing?.due_date !== payload.due_date,
      );
      let saved: EditableSubtask;
      if (user && isOffline()) {
        saved = existing
          ? { ...existing, ...payload }
          : { id: crypto.randomUUID(), ...payload, position, completed_at: null };
        await enqueueOfflineOperation({
          userId: user.id,
          entity: "subtask",
          action: existing ? "update" : "create",
          entityId: saved.id,
          payload: existing ? { patch: payload } : { subtask: { ...saved, task_id: taskId } },
        });
      } else {
        const request = existing
          ? (supabase.from("subtasks") as any)
              .update(payload)
              .eq("id", existing.id)
              .select("id, title, done, position, due_date, assignee_id, notes, completed_at")
              .single()
          : (supabase.from("subtasks") as any)
              .insert({ ...payload, task_id: taskId, position })
              .select("id, title, done, position, due_date, assignee_id, notes, completed_at")
              .single();
        const { data, error } = await request;
        if (error) throw error;
        saved = data as EditableSubtask;
      }
      savedSubtaskRef.current = saved;
      onSaved(saved);
      if (recordDueDateChange && subtask && user && !isOffline()) {
        const { error: historyError } = await supabase.from("subtask_due_date_changes").insert({
          subtask_id: subtask.id,
          old_due_date: subtask.due_date,
          new_due_date: payload.due_date,
          reason: dueDateReason.trim(),
          user_id: user.id,
        });
        if (historyError)
          toast.warning("Prazo atualizado, mas não foi possível registrar a justificativa.");
      }
      let failedPrints = 0;
      const hadPrints = pendingPrintsRef.current.length > 0;
      let resolvedNotes = notes;
      for (const print of [...pendingPrintsRef.current]) {
        try {
          if (marketingLayout && print.inline && !pendingDescriptionImageIds(resolvedNotes).has(print.id)) {
            removePrint(print.id);
            continue;
          }
          const attachmentId = uploadedPrintsRef.current[print.id] ?? await uploadPrint(saved.id, print);
          uploadedPrintsRef.current[print.id] = attachmentId;
          if (marketingLayout && print.inline) {
            const nextNotes = attachImagesToDescription(resolvedNotes, new Map([[print.id, attachmentId]]));
            const storedNotes = stripPendingDescriptionImages(nextNotes).trim() || null;
            if (user && isOffline()) {
              await enqueueOfflineOperation({ userId: user.id, entity: "subtask", action: "update", entityId: saved.id, payload: { patch: { notes: storedNotes } } });
            } else {
              const { error } = await supabase.from("subtasks").update({ notes: storedNotes }).eq("id", saved.id);
              if (error) throw error;
            }
            resolvedNotes = nextNotes;
            storedPrintPreviewsRef.current.set(attachmentId, print.previewUrl);
            setNotes(nextNotes);
            saved = { ...saved, notes: storedNotes };
            savedSubtaskRef.current = saved;
            onSaved(saved);
          }
          removePrint(print.id, !(marketingLayout && print.inline));
          delete uploadedPrintsRef.current[print.id];
        } catch {
          failedPrints += 1;
        }
      }
      if (hadPrints && !isOffline()) onAttachmentsComplete?.(saved.id);
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["tasks"] }),
        qc.invalidateQueries({ queryKey: ["subtasks"] }),
      ]);
      if (failedPrints) {
        toast.error(`${failedPrints} arquivo(s) não foram enviados. A subtarefa foi salva; tente salvar novamente.`);
        return;
      }
      toast.success(isOffline()
        ? "Subtarefa salva neste aparelho. Será sincronizada ao reconectar."
        : subtask ? "Subtarefa atualizada" : "Subtarefa criada");
      handleOpenChange(false, true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar a subtarefa.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent overlayClassName={marketingLayout ? "!bg-transparent" : undefined} className={marketingLayout
        ? "!left-auto !right-0 !top-0 !h-dvh !max-h-dvh !w-full !max-w-[720px] !translate-x-0 !translate-y-0 gap-0 overflow-y-auto !rounded-none !border-y-0 !border-r-0 p-0 shadow-2xl sm:!w-[min(720px,100vw)] sm:!rounded-none sm:!p-0"
        : "max-w-2xl gap-5 p-6 sm:rounded-2xl"}>
        <DialogHeader className={marketingLayout ? "sticky top-0 z-20 border-b bg-background px-5 py-4 text-left sm:px-7" : undefined}>
          {marketingLayout && <button type="button" onClick={() => handleOpenChange(false)} className="w-fit text-xs text-muted-foreground hover:text-primary">{parentTitle || "Tarefa principal"} /</button>}
          <DialogTitle>{subtask ? "Editar subtarefa" : "Nova subtarefa"}</DialogTitle>
        </DialogHeader>

        <div className={marketingLayout ? "space-y-5 px-5 py-6 sm:px-7" : "space-y-4"}>
          <div className="space-y-2">
            <Label htmlFor="subtask-title">Título *</Label>
            <Input
              id="subtask-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Descreva a subtarefa"
              autoFocus
            />
            <FieldLinks value={title} />
          </div>

          <div className={marketingLayout ? "grid gap-4 border-y py-4 sm:grid-cols-2" : "grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2"}>
            <div className="space-y-2">
              <Label>Responsável</Label>
              <Select value={assigneeId || "none"} onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sem responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem responsável</SelectItem>
                  {assignableProfiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      <span className="inline-flex items-center gap-2">{showAvatars && <Avatar className="h-5 w-5"><AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || profile.email || "Responsável"} /><AvatarFallback className="text-[9px]">{(profile.full_name || profile.email || "?").slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>}{profile.full_name || profile.email}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtask-due-date">Prazo</Label>
              <Input
                id="subtask-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
            {dueDateChanged && (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="subtask-due-date-reason">
                  Justificativa da alteração de prazo *
                </Label>
                <Textarea
                  id="subtask-due-date-reason"
                  value={dueDateReason}
                  onChange={(event) => setDueDateReason(event.target.value)}
                  placeholder="Explique o motivo da alteração"
                  rows={3}
                />
                <FieldLinks value={dueDateReason} />
              </div>
            )}
            {subtask && (
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <Checkbox checked={done} onCheckedChange={(value) => setDone(value === true)} />
                Concluída
                {subtask.done && subtask.completed_at ? (
                  <span className="text-xs text-muted-foreground">
                    em {formatCompletionDate(subtask.completed_at)}
                  </span>
                ) : null}
              </label>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtask-notes">Descrição</Label>
            {marketingLayout ? <RichTextEditor
              value={notes}
              onChange={setNotes}
              onImagePaste={addEditorImages}
              onStoredImageClick={(attachmentId) => {
                const attachment = attachments.find((item) => item.id === attachmentId);
                if (attachment) void downloadAttachment(attachment);
                else toast.error("O print ainda está carregando. Tente novamente em instantes.");
              }}
              storedImageTable="subtask_attachments"
              storedImagePreviews={storedPrintPreviewsRef.current}
              imageTools
              disabled={saving}
              minHeight={180}
              maxHeight={440}
              placeholder="Escreva e insira prints onde fizerem sentido."
            /> : <div
              onDragEnter={handleImageDragEnter}
              onDragOver={handleImageDragOver}
              onDragLeave={handleImageDragLeave}
              onDrop={handleImageDrop}
              className={`rounded-md transition-colors ${draggingImages ? "ring-2 ring-primary bg-primary/5" : ""}`}
            >
              <Textarea
                id="subtask-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                onPaste={handlePrintPaste}
                placeholder="Descreva a subtarefa... Cole ou arraste imagens aqui."
                rows={6}
              />
            </div>}
            <p className="text-xs text-muted-foreground">{marketingLayout ? "Cole, arraste ou use o botão de imagem na posição desejada. O print também ficará em Arquivos." : "Cole com ⌘V / Ctrl+V ou arraste imagens para a descrição."}</p>
            {!marketingLayout && <FieldLinks value={notes} />}
            {pendingPrints.filter((print) => !marketingLayout || !print.inline || pendingDescriptionImageIds(notes).has(print.id)).length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Arquivos da subtarefa aguardando salvamento">
                {pendingPrints.filter((print) => !marketingLayout || !print.inline || pendingDescriptionImageIds(notes).has(print.id)).map((print) => (
                  <div key={print.id} className="relative rounded-lg border bg-muted/20 p-2">
                    {print.previewUrl ? <img src={print.previewUrl} alt={print.file.name} className="h-28 w-full object-contain" /> : <span className="flex h-28 items-center justify-center text-muted-foreground"><FileText className="h-7 w-7" /></span>}
                    <p className="mt-1 truncate text-xs text-muted-foreground" title={print.file.name}>{print.file.name}</p>
                    {(!marketingLayout || !print.inline) && <button
                      type="button"
                      aria-label={`Remover ${print.file.name}`}
                      className="absolute right-1 top-1 rounded-full bg-background p-1 shadow-sm"
                      onClick={() => removePrint(print.id)}
                      disabled={saving}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>}
                  </div>
                ))}
              </div>
            )}
            {pendingPrints.length > 0 && (
              <p className="text-xs text-muted-foreground">Os arquivos aparecerão na subtarefa após salvar.</p>
            )}
          </div>
          {marketingLayout && <div className="space-y-2 border-t pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><Label>Arquivos da subtarefa</Label><label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-2 text-xs text-primary hover:bg-primary/5"><Paperclip className="h-4 w-4" />Anexar arquivo<input type="file" multiple className="sr-only" aria-label="Selecionar arquivos para a subtarefa" onChange={(event) => { addAttachments(event.target.files); event.target.value = ""; }} disabled={saving} /></label></div>
            {attachments.length ? <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{attachments.map((attachment) => <div key={attachment.id} className="min-w-0 rounded-lg border bg-muted/20 p-2">
              <SavedSubtaskImage attachment={attachment} userId={user?.id} />
              <div className="mt-1 flex items-center gap-1"><span className="min-w-0 flex-1 truncate text-xs" title={attachment.file_name}>{attachment.file_name}</span><button type="button" title={`Baixar ${attachment.file_name}`} aria-label={`Baixar ${attachment.file_name}`} className="rounded p-1 text-primary hover:bg-primary/10" onClick={() => void downloadAttachment(attachment)}><Download className="h-4 w-4" /></button></div>
            </div>)}</div> : <p className="text-xs text-muted-foreground">Nenhum anexo salvo nesta subtarefa.</p>}
          </div>}
        </div>

        <DialogFooter className={marketingLayout ? "sticky bottom-0 border-t bg-background px-5 py-4 sm:px-7" : undefined}>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
