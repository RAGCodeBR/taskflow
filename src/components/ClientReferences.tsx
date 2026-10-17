import { useEffect, useState } from "react";
import { BookImage, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { LinkedText } from "@/components/LinkedText";
import { useAuth } from "@/hooks/use-auth";
import { useClientReferences } from "@/hooks/use-client-references";
import { supabase } from "@/integrations/supabase/client";
import { isOffline, listOfflineOperations } from "@/lib/offline-sync";
import {
  referenceWebUrl,
  type ClientReference,
  type ClientReferenceTopic,
} from "@/lib/client-references";

const EMPTY_FORM = { title: "", url: "", notes: "", topic_id: "" };

function ReferenceImage({ reference }: { reference: ClientReference }) {
  const { user } = useAuth();
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    if (!reference.storage_path || !user) return;
    let active = true;
    let objectUrl: string | undefined;
    setSrc(null);
    void (async () => {
      const operations = await listOfflineOperations(user.id);
      const local = operations.find(
        (op) =>
          op.entity === "attachment" &&
          op.entityId === reference.id &&
          op.payload.table === "client_references",
      );
      let blob = local?.payload.blob as Blob | undefined;
      if (!blob && !isOffline()) {
        const { data, error } = await supabase.storage
          .from("client-references")
          .download(reference.storage_path!);
        if (!error && data) blob = data;
      }
      if (active && blob) {
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      }
    })().catch(() => {
      /* The reference and its link remain available if the image cannot load. */
    });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [reference.id, reference.storage_path, user?.id]);
  return src ? (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="block cursor-pointer"
      title="Ampliar imagem em outra aba"
    >
      <img
        src={src}
        alt={reference.title}
        className="h-40 w-full rounded-lg border bg-muted/30 object-contain"
        loading="lazy"
      />
    </a>
  ) : (
    <div className="grid h-24 place-items-center rounded-lg border bg-muted/30 text-xs text-muted-foreground">
      Imagem indisponível neste momento
    </div>
  );
}

export function ClientReferences({ clientId }: { clientId: string }) {
  const { isAdmin, isCollaborator } = useAuth();
  const { topics, references, mutate } = useClientReferences(clientId);
  const canWrite = isAdmin || isCollaborator;
  const [topicTitle, setTopicTitle] = useState("");
  const [editingTopic, setEditingTopic] = useState<ClientReferenceTopic | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState<ClientReference | null>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const error = topics.error || references.error;
  const loading = topics.isLoading || references.isLoading;
  const rows = references.data ?? [];
  const notifySaved = () =>
    toast.success(
      isOffline()
        ? "Referência salva neste aparelho. Será sincronizada ao reconectar."
        : "Referência salva. Sincronizando com o servidor.",
    );

  const saveTopic = async () => {
    const title = topicTitle.trim();
    if (!title || title.length > 120) return;
    setBusy(true);
    try {
      const id = editingTopic?.id ?? crypto.randomUUID();
      await mutate(
        "client_reference_topics",
        editingTopic ? "update" : "create",
        id,
        editingTopic
          ? { title }
          : { id, client_id: clientId, title, created_at: new Date().toISOString() },
      );
      setTopicTitle("");
      setEditingTopic(null);
      toast.success("Tópico salvo.");
    } catch {
      toast.error("Não foi possível salvar o tópico. Tente novamente.");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    const title = form.title.trim();
    const url = form.url.trim() ? referenceWebUrl(form.url) : null;
    if (!title || !form.topic_id || title.length > 160) {
      toast.error("Informe o título e escolha um tópico.");
      return;
    }
    if (form.url.trim() && !url) {
      toast.error("Informe um link válido (http ou https).");
      return;
    }
    if (!url && !image && !editing?.storage_path && !form.notes.trim()) {
      toast.error("Inclua um link, uma imagem ou uma observação.");
      return;
    }
    if (
      image &&
      (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(image.type) ||
        image.size > 10 * 1024 * 1024)
    ) {
      toast.error("Use uma imagem JPG, PNG, WebP ou GIF de até 10 MB.");
      return;
    }
    setBusy(true);
    try {
      const id = editing?.id ?? crypto.randomUUID();
      const record = {
        id,
        client_id: clientId,
        topic_id: form.topic_id,
        title,
        url,
        notes: form.notes.trim(),
        storage_path:
          editing?.storage_path ?? (image ? `${clientId}/${id}/${crypto.randomUUID()}` : null),
        file_name: editing?.file_name ?? image?.name ?? null,
        mime_type: editing?.mime_type ?? image?.type ?? null,
        created_at: editing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      await mutate(
        "client_references",
        editing ? "update" : "create",
        id,
        record,
        image ?? undefined,
      );
      setOpen(false);
      setEditing(null);
      setImage(null);
      setForm(EMPTY_FORM);
      notifySaved();
    } catch {
      toast.error("Não foi possível salvar. Seu preenchimento foi mantido para tentar novamente.");
    } finally {
      setBusy(false);
    }
  };

  const removeReference = async (reference: ClientReference) => {
    if (!window.confirm(`Excluir a referência “${reference.title}”?`)) return;
    setBusy(true);
    try {
      await mutate("client_references", "delete", reference.id, {
        storage_path: reference.storage_path,
      });
      toast.success("Exclusão salva.");
    } catch {
      toast.error("Não foi possível excluir a referência.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="flex items-center gap-2 font-semibold">
            <BookImage className="h-4 w-4" />
            Referências
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Posts, imagens e links organizados por campanha ou assunto.
          </p>
        </div>
        {canWrite && (
          <Button
            size="sm"
            disabled={busy || loading || !!error || !topics.data?.length}
            onClick={() => {
              setEditing(null);
              setImage(null);
              setForm({ ...EMPTY_FORM, topic_id: topics.data?.[0]?.id ?? "" });
              setOpen(true);
            }}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Referência
          </Button>
        )}
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
        >
          Não foi possível carregar as referências. Verifique se a atualização do banco foi aplicada
          e tente novamente.
        </p>
      ) : null}
      {canWrite && (
        <form
          className="flex flex-wrap gap-2 rounded-lg border bg-muted/20 p-3"
          onSubmit={(event) => {
            event.preventDefault();
            void saveTopic();
          }}
        >
          <Input
            aria-label="Nome do tópico"
            placeholder="Ex.: Referências da campanha de verão"
            maxLength={120}
            value={topicTitle}
            onChange={(event) => setTopicTitle(event.target.value)}
            className="min-w-0 flex-1 basis-48"
            disabled={busy || loading || !!error}
          />
          <Button
            size="sm"
            type="submit"
            variant="outline"
            disabled={busy || loading || !!error || !topicTitle.trim()}
          >
            {editingTopic ? "Salvar tópico" : "+ Tópico"}
          </Button>
          {editingTopic && (
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={() => {
                setEditingTopic(null);
                setTopicTitle("");
              }}
            >
              Cancelar
            </Button>
          )}
        </form>
      )}
      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando referências…</p>
      ) : !error && !topics.data?.length ? (
        <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          Crie um tópico para reunir as primeiras referências deste cliente.
        </p>
      ) : null}
      {topics.data?.map((topic) => {
        const items = rows.filter((row) => row.topic_id === topic.id);
        return (
          <details key={topic.id} open className="group rounded-xl border bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold">
              <span className="min-w-0 break-words">
                {topic.title}{" "}
                <span className="font-normal text-muted-foreground">({items.length})</span>
              </span>
              {canWrite && (
                <span className="flex shrink-0 gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    title="Renomear tópico"
                    disabled={busy}
                    onClick={(event) => {
                      event.preventDefault();
                      setEditingTopic(topic);
                      setTopicTitle(topic.title);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    title={
                      items.length
                        ? "Mova ou exclua as referências antes de excluir o tópico"
                        : "Excluir tópico vazio"
                    }
                    disabled={busy || items.length > 0}
                    onClick={async (event) => {
                      event.preventDefault();
                      if (!window.confirm(`Excluir o tópico “${topic.title}”?`)) return;
                      setBusy(true);
                      try {
                        await mutate("client_reference_topics", "delete", topic.id, {});
                      } catch {
                        toast.error("Não foi possível excluir o tópico.");
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </span>
              )}
            </summary>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3 border-t p-3">
              {!items.length && (
                <p className="p-3 text-xs text-muted-foreground">
                  Nenhuma referência neste tópico.
                </p>
              )}
              {items.map((reference) => (
                <article
                  key={reference.id}
                  className="min-w-0 space-y-2 rounded-lg border bg-background p-3"
                >
                  {reference.storage_path && <ReferenceImage reference={reference} />}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="break-words text-sm font-medium">{reference.title}</h3>
                    {canWrite && (
                      <div className="flex shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          title="Editar ou mudar de tópico"
                          disabled={busy}
                          onClick={() => {
                            setEditing(reference);
                            setImage(null);
                            setForm({
                              title: reference.title,
                              url: reference.url ?? "",
                              notes: reference.notes,
                              topic_id: reference.topic_id,
                            });
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          title="Excluir referência"
                          disabled={busy}
                          onClick={() => void removeReference(reference)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {reference.url && (
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 cursor-pointer items-center gap-1 text-xs text-primary underline underline-offset-2"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">{reference.url}</span>
                    </a>
                  )}
                  {reference.notes && (
                    <p className="whitespace-pre-wrap break-words text-xs text-muted-foreground">
                      <LinkedText text={reference.notes} />
                    </p>
                  )}
                </article>
              ))}
            </div>
          </details>
        );
      })}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!busy) setOpen(next);
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar referência" : "Nova referência"}</DialogTitle>
            <DialogDescription>
              Escolha um tópico para manter os materiais organizados.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              void save();
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="reference-topic">Tópico *</Label>
              <select
                id="reference-topic"
                required
                value={form.topic_id}
                onChange={(event) => setForm({ ...form, topic_id: event.target.value })}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {topics.data?.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="reference-title">Título *</Label>
              <Input
                id="reference-title"
                required
                maxLength={160}
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reference-url">Link do post ou página</Label>
              <Input
                id="reference-url"
                placeholder="https://…"
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reference-notes">Observações</Label>
              <Textarea
                id="reference-notes"
                rows={3}
                value={form.notes}
                onChange={(event) => setForm({ ...form, notes: event.target.value })}
              />
            </div>
            {!editing?.storage_path && (
              <div className="space-y-1">
                <Label htmlFor="reference-image">Imagem (opcional, até 10 MB)</Label>
                <Input
                  id="reference-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={(event) => setImage(event.target.files?.[0] ?? null)}
                />
              </div>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={busy}>
                {busy ? "Salvando…" : "Salvar referência"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
