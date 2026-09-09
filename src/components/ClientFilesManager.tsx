import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ExternalLink,
  FileText,
  Paperclip,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  AttachmentPreviewDialog,
  type PreviewableAttachment,
} from "@/components/AttachmentPreviewDialog";
import { FileDropZone } from "@/components/FileDropZone";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { useProfiles } from "@/hooks/use-data";
import { supabase } from "@/integrations/supabase/client";
import {
  removeTaskAttachmentAndClientCopy,
  taskAttachmentIdFromClientFilePath,
} from "@/lib/sync-task-attachment-to-client";
import { canPreviewAttachment } from "@/lib/attachment-preview";

export interface ClientFile {
  id: string;
  client_id: string;
  title: string | null;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  position: number;
  created_at: string;
  uploaded_by: string | null;
  source_attachment_id: string | null;
}

export function ClientFilesManager({
  clientId,
  showHeader = true,
}: {
  clientId: string;
  showHeader?: boolean;
}) {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const [selectedUploaderIds, setSelectedUploaderIds] = useState<string[]>([]);
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);
  const loadRequestRef = useRef(0);

  const filterableProfiles = useMemo(
    () =>
      [...profiles].sort((first, second) => {
        if (first.id === user?.id) return -1;
        if (second.id === user?.id) return 1;
        return (first.full_name || first.email || "").localeCompare(
          second.full_name || second.email || "",
          "pt-BR",
        );
      }),
    [profiles, user?.id],
  );
  const profilesById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );
  const selectedProfiles = useMemo(
    () => filterableProfiles.filter((profile) => selectedUploaderIds.includes(profile.id)),
    [filterableProfiles, selectedUploaderIds],
  );

  useEffect(() => {
    if (user?.id) setSelectedUploaderIds([user.id]);
  }, [user?.id]);

  const load = async (uploaderIds: string[]) => {
    if (!user?.id) {
      setFiles([]);
      setUrls({});
      return;
    }
    const requestId = ++loadRequestRef.current;
    let query = supabase
      .from("client_files")
      .select("*")
      .eq("client_id", clientId)
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });
    if (isAdmin) {
      if (!uploaderIds.length) return;
      query = query.in("uploaded_by", uploaderIds);
    } else {
      query = query.eq("uploaded_by", user.id);
    }
    const { data, error } = await query;
    if (requestId !== loadRequestRef.current) return;
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = (data ?? []) as ClientFile[];
    setFiles(list);
    const nextUrls: Record<string, string> = {};
    await Promise.all(
      list.map(async (file) => {
        const { data: signed } = await supabase.storage
          .from("task-attachments")
          .createSignedUrl(file.storage_path, 3600);
        if (signed) nextUrls[file.id] = signed.signedUrl;
      }),
    );
    if (requestId === loadRequestRef.current) setUrls(nextUrls);
  };

  useEffect(() => {
    if (user?.id && (!isAdmin || selectedUploaderIds.length)) {
      void load(selectedUploaderIds);
    }
  }, [clientId, isAdmin, selectedUploaderIds, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleUploader = (uploaderId: string) => {
    setSelectedUploaderIds((current) => {
      if (!current.includes(uploaderId)) return [...current, uploaderId];
      if (current.length === 1) {
        toast.error("Selecione ao menos um usuário.");
        return current;
      }
      return current.filter((id) => id !== uploaderId);
    });
  };

  const selectedUploaderLabel = selectedProfiles
    .map((profile) => profile.full_name || profile.email || "Usuário sem nome")
    .join(", ");

  const upload = async (fileList: FileList | null) => {
    if (!fileList?.length || !user) return;
    setUploading(true);
    const { data: lastFile } = await supabase
      .from("client_files")
      .select("position")
      .eq("client_id", clientId)
      .order("position", { ascending: false })
      .limit(1)
      .maybeSingle();
    let nextPosition = (lastFile?.position ?? -1) + 1;
    for (const file of Array.from(fileList)) {
      const safeName = file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `clients/${clientId}/files/${Date.now()}_${crypto.randomUUID()}_${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("task-attachments")
        .upload(path, file, { contentType: file.type || "application/octet-stream" });
      if (uploadError) {
        toast.error(uploadError.message);
        continue;
      }
      const { error: insertError } = await supabase.from("client_files").insert({
        client_id: clientId,
        title: file.name,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type || null,
        size_bytes: file.size,
        uploaded_by: user.id,
        position: nextPosition,
      });
      if (insertError) {
        await supabase.storage.from("task-attachments").remove([path]);
        toast.error(insertError.message);
        continue;
      }
      nextPosition += 1;
    }
    setUploading(false);
    const nextUploaderIds =
      isAdmin && !selectedUploaderIds.includes(user.id)
        ? [...selectedUploaderIds, user.id]
        : selectedUploaderIds;
    if (nextUploaderIds !== selectedUploaderIds) setSelectedUploaderIds(nextUploaderIds);
    else void load(nextUploaderIds);
  };

  const saveTitle = async (file: ClientFile, title: string) => {
    const normalizedTitle = title.trim() || file.file_name;
    setFiles((current) =>
      current.map((item) => (item.id === file.id ? { ...item, title: normalizedTitle } : item)),
    );
    const { error } = await supabase
      .from("client_files")
      .update({ title: normalizedTitle })
      .eq("id", file.id);
    if (error) {
      toast.error(error.message);
      void load(selectedUploaderIds);
    }
  };

  const remove = async (file: ClientFile) => {
    if (!confirm(`Excluir "${file.title || file.file_name}"?`)) return;
    const sourceAttachmentId =
      file.source_attachment_id ?? taskAttachmentIdFromClientFilePath(file.storage_path);
    if (sourceAttachmentId) {
      try {
        await removeTaskAttachmentAndClientCopy(sourceAttachmentId);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Não foi possível excluir o arquivo.");
        return;
      }
      void load(selectedUploaderIds);
      return;
    }
    const { error } = await supabase.from("client_files").delete().eq("id", file.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.storage.from("task-attachments").remove([file.storage_path]);
    void load(selectedUploaderIds);
  };

  const move = async (id: string, direction: -1 | 1) => {
    const index = files.findIndex((file) => file.id === id);
    const swapIndex = index + direction;
    if (index < 0 || swapIndex < 0 || swapIndex >= files.length) return;
    const currentFile = files[index];
    const swappedFile = files[swapIndex];
    const next = [...files];
    next[index] = { ...swappedFile, position: currentFile.position };
    next[swapIndex] = { ...currentFile, position: swappedFile.position };
    setFiles(next);
    const results = await Promise.all([
      supabase
        .from("client_files")
        .update({ position: swappedFile.position })
        .eq("id", currentFile.id),
      supabase
        .from("client_files")
        .update({ position: currentFile.position })
        .eq("id", swappedFile.id),
    ]);
    const error = results.find((result) => result.error)?.error;
    if (error) {
      toast.error(error.message);
      void load(selectedUploaderIds);
    }
  };

  const openFile = (file: ClientFile) => {
    if (canPreviewAttachment(file.file_name, file.mime_type)) {
      setPreview({
        file_name: file.title || file.file_name,
        storage_path: file.storage_path,
        mime_type: file.mime_type,
      });
      return;
    }
    const url = urls[file.id];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="space-y-3">
      {showHeader && (
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <Paperclip className="h-4 w-4" /> Anexos do cliente
            </h2>
            <p className="text-sm text-muted-foreground">
              Adicione arquivos, edite os títulos e ajuste a ordem de exibição.
            </p>
          </div>
          <span className="text-sm text-muted-foreground">{files.length} arquivo(s)</span>
        </div>
      )}

      {isAdmin && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">
          <span className="text-sm font-medium">Exibir anexos de</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-[240px] justify-between font-normal"
              >
                <span className="truncate text-left">
                  {selectedProfiles.length === 0 && selectedUploaderIds.length === 1
                    ? "Meu usuário"
                    : selectedProfiles.length === 1
                      ? selectedUploaderLabel
                      : `${selectedProfiles.length} usuários selecionados`}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-2">
              <div className="mb-2 flex items-center justify-between gap-1">
                <span className="px-1 text-xs font-medium">Usuários</span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() =>
                      setSelectedUploaderIds(filterableProfiles.map((profile) => profile.id))
                    }
                    disabled={
                      !filterableProfiles.length ||
                      selectedUploaderIds.length === filterableProfiles.length
                    }
                  >
                    Todos
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => user?.id && setSelectedUploaderIds([user.id])}
                    disabled={
                      selectedUploaderIds.length === 1 && selectedUploaderIds[0] === user?.id
                    }
                  >
                    Somente eu
                  </Button>
                </div>
              </div>
              <div className="max-h-64 space-y-1 overflow-y-auto overscroll-contain">
                {filterableProfiles.map((profile) => (
                  <label
                    key={profile.id}
                    className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <Checkbox
                      checked={selectedUploaderIds.includes(profile.id)}
                      onCheckedChange={() => toggleUploader(profile.id)}
                    />
                    <span className="truncate">
                      {profile.id === user?.id
                        ? `${profile.full_name || profile.email || "Meu usuário"} (você)`
                        : `${profile.full_name || profile.email || "Usuário sem nome"}${profile.is_active === false ? " (inativo)" : ""}`}
                    </span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <FileDropZone
        onFiles={(droppedFiles) => void upload(droppedFiles)}
        disabled={uploading}
        className="rounded-lg border border-dashed p-4"
      >
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            Arraste arquivos aqui ou selecione do computador.
          </span>
          <span className="rounded-md border bg-background px-3 py-1.5 text-sm">
            {uploading ? "Enviando..." : "Adicionar arquivos"}
          </span>
          <input
            type="file"
            multiple
            accept="*/*"
            className="hidden"
            onChange={(event) => {
              void upload(event.target.files);
              event.currentTarget.value = "";
            }}
            disabled={uploading}
          />
        </label>
      </FileDropZone>

      {files.length === 0 ? (
        <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
          Nenhum arquivo enviado para este cliente pelos usuários selecionados.
        </p>
      ) : (
        <ul className="space-y-2">
          {files.map((file, index) => {
            const isImage = file.mime_type?.startsWith("image/");
            const canPreview = canPreviewAttachment(file.file_name, file.mime_type);
            return (
              <li key={file.id} className="flex items-center gap-3 rounded-lg border bg-card p-2">
                <div className="flex flex-col">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => void move(file.id, -1)}
                    disabled={index === 0}
                    title="Mover para cima"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => void move(file.id, 1)}
                    disabled={index === files.length - 1}
                    title="Mover para baixo"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => openFile(file)}
                  className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded border bg-muted text-muted-foreground"
                  title={file.file_name}
                >
                  {isImage && urls[file.id] ? (
                    <img
                      src={urls[file.id]}
                      alt={file.file_name}
                      className="h-full w-full object-cover"
                    />
                  ) : canPreview ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <ExternalLink className="h-5 w-5" />
                  )}
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <Input
                    defaultValue={file.title || file.file_name}
                    onBlur={(event) => void saveTitle(file, event.target.value)}
                    placeholder="Título do arquivo"
                    className="h-8 text-sm"
                  />
                  <p className="truncate text-[11px] text-muted-foreground" title={file.file_name}>
                    {file.file_name}
                  </p>
                  {isAdmin && (
                    <p className="truncate text-[11px] text-muted-foreground">
                      Enviado por {profilesById.get(file.uploaded_by ?? "")?.full_name || "Usuário"}
                    </p>
                  )}
                </div>
                <Button type="button" size="sm" variant="ghost" onClick={() => openFile(file)}>
                  Abrir
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive"
                  onClick={() => void remove(file)}
                  title="Excluir arquivo"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      <AttachmentPreviewDialog
        open={!!preview}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
        attachment={preview}
      />
    </section>
  );
}
