import { useEffect, useRef, useState } from "react";
import { FileText, Image as ImageIcon, Paperclip, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";
import { FileDropZone } from "@/components/FileDropZone";
import { toast } from "sonner";

interface CommentAttachment {
  id: string;
  comment_id: string;
  task_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

function stop(e: { stopPropagation: () => void }) {
  e.stopPropagation();
}

export function CommentAttachments({
  taskId,
  commentId,
}: {
  taskId: string;
  commentId: string;
}) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<CommentAttachment[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<CommentAttachment | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("comment_attachments")
        .select("*")
        .eq("comment_id", commentId)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      const list = (data ?? []) as CommentAttachment[];
      setItems(list);
      const next: Record<string, string> = {};
      await Promise.all(
        list
          .filter((a) => a.mime_type?.startsWith("image/"))
          .map(async (a) => {
            const { data: signed } = await supabase.storage
              .from("task-attachments")
              .createSignedUrl(a.storage_path, 3600);
            if (signed) next[a.id] = signed.signedUrl;
          }),
      );
      if (!cancelled) setThumbs(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [commentId]);

  const upload = async (files: FileList | null) => {
    if (!user || !files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const safe =
          file.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9._-]+/g, "_")
            .replace(/_+/g, "_")
            .slice(-120) || "arquivo";
        const path = `${taskId}/comments/${commentId}/${Date.now()}-${safe}`;
        const contentType = file.type || "application/octet-stream";
        const { error: upErr } = await supabase.storage
          .from("task-attachments")
          .upload(path, file, { contentType, upsert: false });
        if (upErr) {
          toast.error(upErr.message);
          continue;
        }
        const { data, error } = await supabase
          .from("comment_attachments")
          .insert({
            comment_id: commentId,
            task_id: taskId,
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
          continue;
        }
        const att = data as CommentAttachment;
        setItems((c) => [...c, att]);
        if (att.mime_type?.startsWith("image/")) {
          const { data: signed } = await supabase.storage
            .from("task-attachments")
            .createSignedUrl(att.storage_path, 3600);
          if (signed) setThumbs((c) => ({ ...c, [att.id]: signed.signedUrl }));
        }
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = async (a: CommentAttachment) => {
    if (!window.confirm(`Remover "${a.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([a.storage_path]);
    await supabase.from("comment_attachments").delete().eq("id", a.id);
    setItems((c) => c.filter((x) => x.id !== a.id));
  };

  return (
    <FileDropZone
      onFiles={(files) => void upload(files)}
      disabled={uploading}
      className="border-t bg-muted/10 px-2 py-1.5"
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Arquivos ({items.length})
        </span>
        <button
          type="button"
          onPointerDown={stop}
          onClick={(e) => {
            stop(e);
            inputRef.current?.click();
          }}
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-primary hover:bg-primary/10 disabled:opacity-50"
          disabled={uploading}
          title="Anexar arquivo"
        >
          <Paperclip className="h-3 w-3" />
          {uploading ? "Enviando..." : "Anexar"}
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => void upload(e.target.files)}
        />
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-4 gap-1">
          {items.map((a) => {
            const isImg = a.mime_type?.startsWith("image/");
            return (
              <div key={a.id} className="group/cf relative aspect-square overflow-hidden rounded border bg-background">
                {isImg && thumbs[a.id] ? (
                  <button
                    type="button"
                    onPointerDown={stop}
                    onClick={(e) => {
                      stop(e);
                      setPreview(a);
                    }}
                    className="block h-full w-full"
                    title={a.file_name}
                  >
                    <img src={thumbs[a.id]} alt={a.file_name} className="h-full w-full object-cover" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onPointerDown={stop}
                    onClick={(e) => {
                      stop(e);
                      setPreview(a);
                    }}
                    className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground"
                    title={a.file_name}
                  >
                    {isImg ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                    <span className="line-clamp-2 w-full break-all text-center text-[8px] leading-tight">
                      {a.file_name}
                    </span>
                  </button>
                )}
                <button
                  type="button"
                  onPointerDown={stop}
                  onClick={(e) => {
                    stop(e);
                    void remove(a);
                  }}
                  className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 opacity-0 transition group-hover/cf:opacity-100"
                  title="Remover"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : null}

      {preview ? (
        <AttachmentPreviewDialog
          attachment={{
            file_name: preview.file_name,
            storage_path: preview.storage_path,
            mime_type: preview.mime_type,
          }}
          open={!!preview}
          onOpenChange={(o) => { if (!o) setPreview(null); }}
        />
      ) : null}
    </FileDropZone>
  );
}
