import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Download, GripVertical, ImageIcon, Maximize2, Minimize2, Paperclip, Pencil, Pin, PinOff, Plus, RotateCcw, SmilePlus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useProfiles } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileDropZone } from "@/components/FileDropZone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { markMuralAsRead, muralUnreadKey } from "@/hooks/use-mural-unread";

export const Route = createFileRoute("/_app/mural")({
  component: MuralPage,
});

type ChecklistItem = { text: string; done: boolean };
type MuralPost = {
  id: string;
  title: string;
  content: string | null;
  color: string;
  tag: string | null;
  image_url: string | null;
  checklist: ChecklistItem[];
  created_by: string;
  created_at: string;
  completed_at: string | null;
  is_pinned: boolean;
  card_size: CardSize;
  text_style: TextStyle;
  canvas_x: number;
  canvas_y: number;
};
type MuralAttachment = {
  id: string;
  post_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
};
type MuralReaction = {
  id: string;
  post_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
};

const COLORS = [
  { value: "sky", label: "Azul", card: "bg-sky-200/85 dark:bg-sky-900/65" },
  { value: "amber", label: "Amarelo", card: "bg-amber-200/85 dark:bg-amber-900/65" },
  { value: "violet", label: "Lilás", card: "bg-violet-200/85 dark:bg-violet-900/65" },
  { value: "green", label: "Verde", card: "bg-green-200/85 dark:bg-green-900/65" },
  { value: "rose", label: "Rosa", card: "bg-pink-200/85 dark:bg-pink-900/65" },
  { value: "red", label: "Vermelho", card: "bg-red-200/85 dark:bg-red-900/65" },
  { value: "stone", label: "Cinza", card: "bg-stone-200/85 dark:bg-stone-800" },
] as const;

type CardSize = "compact" | "normal" | "large";
type TextStyle = "clean" | "handwritten" | "editorial" | "typewriter";

const CARD_SIZES: { value: CardSize; label: string }[] = [
  { value: "compact", label: "Compacto" },
  { value: "normal", label: "Normal" },
  { value: "large", label: "Destaque" },
];

const TEXT_STYLES: { value: TextStyle; label: string; css: CSSProperties }[] = [
  { value: "clean", label: "Clássico", css: { fontFamily: "var(--font-sans)" } },
  { value: "handwritten", label: "Manual", css: { fontFamily: "cursive", letterSpacing: "0.01em" } },
  { value: "editorial", label: "Elegante", css: { fontFamily: "Georgia, 'Times New Roman', serif" } },
  { value: "typewriter", label: "Máquina", css: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.92em" } },
];

const QUICK_EMOJIS = ["📌", "✨", "💡", "🚀", "✅", "⚠️", "🎉", "❤️"];
const REACTION_EMOJIS = ["👍", "❤️", "🎉", "👏", "💡", "👀"];
const CANVAS_WIDTH = 3200;
const CANVAS_HEIGHT = 2200;
const CARD_GAP = 20;

const emptyForm = {
  title: "", content: "", tag: "", imageUrl: "", checklist: "", color: "sky",
  cardSize: "normal" as CardSize, textStyle: "clean" as TextStyle,
};

function colorClass(color: string) {
  return COLORS.find((item) => item.value === color)?.card ?? COLORS[0].card;
}

function textStyleCss(style: TextStyle | null | undefined) {
  return TEXT_STYLES.find((item) => item.value === style)?.css ?? TEXT_STYLES[0].css;
}

function MuralPage() {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingPost, setEditingPost] = useState<MuralPost | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [uploadingPostId, setUploadingPostId] = useState<string | null>(null);
  const hasMarkedCurrentVisitRead = useRef(false);
  const canvasViewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const postRefs = useRef(new Map<string, HTMLElement>());
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["mural_posts"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("mural_posts") as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((post: any) => ({
        ...post,
        checklist: Array.isArray(post.checklist) ? post.checklist : [],
        is_pinned: !!post.is_pinned,
        card_size: post.card_size ?? "normal",
        text_style: post.text_style ?? "clean",
        canvas_x: post.canvas_x ?? 520,
        canvas_y: post.canvas_y ?? 180,
      })) as MuralPost[];
    },
  });
  const { data: attachments = [] } = useQuery({
    queryKey: ["mural_post_attachments"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("mural_post_attachments") as any)
        .select("id, post_id, file_name, storage_path, mime_type, size_bytes")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as MuralAttachment[];
    },
  });
  const { data: reactions = [] } = useQuery({
    queryKey: ["mural_post_reactions"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("mural_post_reactions") as any)
        .select("id, post_id, user_id, emoji, created_at")
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as MuralReaction[];
    },
  });

  useEffect(() => {
    if (!user || isLoading || hasMarkedCurrentVisitRead.current) return;
    hasMarkedCurrentVisitRead.current = true;
    const unreadPostIds = posts
      .filter((post) => post.created_by !== user.id)
      .map((post) => post.id);
    void markMuralAsRead(user.id, unreadPostIds)
      .then(() => qc.invalidateQueries({ queryKey: muralUnreadKey(user.id) }))
      .catch((error: Error) => {
        hasMarkedCurrentVisitRead.current = false;
        toast.error(`Não foi possível atualizar a leitura do mural: ${error.message}`);
      });
  }, [isLoading, posts, qc, user?.id]);

  const savePost = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Sua sessão expirou. Entre novamente.");
      if (!form.title.trim()) throw new Error("Informe o título do post-it.");
      const checklist = form.checklist
        .split("\n")
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => ({
          text,
          done: editingPost?.checklist.find((item) => item.text === text)?.done ?? false,
        }));
      const payload = {
        title: form.title.trim(),
        content: form.content.trim() || null,
        tag: form.tag.trim() || null,
        image_url: form.imageUrl.trim() || null,
        color: form.color,
        checklist,
        card_size: form.cardSize,
        text_style: form.textStyle,
      };
      const { data, error } = editingPost
        ? await (supabase.from("mural_posts") as any).update(payload).eq("id", editingPost.id).select().single()
        : await (supabase.from("mural_posts") as any).insert({ ...payload, created_by: user.id }).select().single();
      if (error) throw error;
      return data as MuralPost;
    },
    onSuccess: (savedPost) => {
      qc.invalidateQueries({ queryKey: ["mural_posts"] });
      setOpen(false);
      setForm(emptyForm);
      setEditingPost(null);
      toast.success(editingPost ? "Post-it atualizado." : "Post-it publicado no mural.");
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateChecklist = useMutation({
    mutationFn: async ({ post, index }: { post: MuralPost; index: number }) => {
      const checklist = post.checklist.map((item, itemIndex) =>
        itemIndex === index ? { ...item, done: !item.done } : item,
      );
      const { error } = await (supabase.from("mural_posts") as any)
        .update({ checklist })
        .eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),
    onError: (error: Error) => toast.error(error.message),
  });

  const removePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from("mural_posts") as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mural_posts"] });
      toast.success("Post-it removido.");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const setPostCompleted = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { error } = await (supabase.from("mural_posts") as any)
        .update({ completed_at: completed ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),
    onError: (error: Error) => toast.error(error.message),
  });
  const updatePostPresentation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Pick<MuralPost, "is_pinned" | "card_size" | "canvas_x" | "canvas_y">> }) => {
      const { error } = await (supabase.from("mural_posts") as any).update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),
    onError: (error: Error) => toast.error(error.message),
  });
  const toggleReaction = useMutation({
    mutationFn: async ({ postId, emoji }: { postId: string; emoji: string }) => {
      if (!user) throw new Error("Sua sessão expirou. Entre novamente.");
      const current = reactions.find(
        (reaction) => reaction.post_id === postId && reaction.user_id === user.id && reaction.emoji === emoji,
      );
      const { error } = current
        ? await (supabase.from("mural_post_reactions") as any).delete().eq("id", current.id)
        : await (supabase.from("mural_post_reactions") as any).insert({ post_id: postId, user_id: user.id, emoji });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_post_reactions"] }),
    onError: (error: Error) => toast.error(error.message),
  });

  const postCountLabel = useMemo(
    () => `${posts.length} post-it${posts.length === 1 ? "" : "s"} no mural`,
    [posts.length],
  );
  const orderedPosts = useMemo(() => {
    return posts
      .filter((post) => (showCompleted ? !!post.completed_at : !post.completed_at))
      .sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [posts, showCompleted]);
  const openNewPost = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setOpen(true);
  };
  const openEditPost = (post: MuralPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content ?? "",
      tag: post.tag ?? "",
      imageUrl: post.image_url ?? "",
      checklist: post.checklist.map((item) => item.text).join("\n"),
      color: post.color,
      cardSize: post.card_size ?? "normal",
      textStyle: post.text_style ?? "clean",
    });
    setOpen(true);
  };
  const findOpenCanvasPosition = (post: MuralPost, requestedX: number, requestedY: number) => {
    const card = postRefs.current.get(post.id);
    const width = card?.offsetWidth ?? (post.card_size === "large" ? 560 : post.card_size === "compact" ? 256 : 320);
    const height = card?.offsetHeight ?? (post.card_size === "large" ? 420 : post.card_size === "compact" ? 220 : 300);
    const maxX = CANVAS_WIDTH - width - CARD_GAP;
    const maxY = CANVAS_HEIGHT - height - CARD_GAP;
    const collides = (x: number, y: number) => orderedPosts.some((other) => {
      if (other.id === post.id) return false;
      const otherCard = postRefs.current.get(other.id);
      const otherWidth = otherCard?.offsetWidth ?? (other.card_size === "large" ? 560 : other.card_size === "compact" ? 256 : 320);
      const otherHeight = otherCard?.offsetHeight ?? (other.card_size === "large" ? 420 : other.card_size === "compact" ? 220 : 300);
      return x < other.canvas_x + otherWidth + CARD_GAP
        && x + width + CARD_GAP > other.canvas_x
        && y < other.canvas_y + otherHeight + CARD_GAP
        && y + height + CARD_GAP > other.canvas_y;
    });
    let x = Math.max(CARD_GAP, Math.min(Math.round(requestedX), maxX));
    let y = Math.max(CARD_GAP, Math.min(Math.round(requestedY), maxY));
    for (let attempt = 0; collides(x, y) && attempt < 400; attempt += 1) {
      x += 32;
      if (x > maxX) {
        x = CARD_GAP;
        y += 32;
        if (y > maxY) y = CARD_GAP;
      }
    }
    return { x, y };
  };
  const movePostOnCanvas = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain") || draggingId;
    const post = orderedPosts.find((item) => item.id === id);
    const canvas = canvasRef.current;
    if (!post || !canvas || !(isAdmin || post.created_by === user?.id)) return;
    const rect = canvas.getBoundingClientRect();
    const position = findOpenCanvasPosition(post, event.clientX - rect.left - 28, event.clientY - rect.top - 28);
    updatePostPresentation.mutate({ id: post.id, patch: { canvas_x: position.x, canvas_y: position.y } });
  };

  useEffect(() => {
    const viewport = canvasViewportRef.current;
    if (viewport) viewport.scrollLeft = 420;
  }, []);
  const uploadFiles = async (post: MuralPost, files: FileList) => {
    if (!user || files.length === 0) return;
    setUploadingPostId(post.id);
    try {
      for (const file of Array.from(files)) {
        const safeName = file.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9._-]+/g, "_");
        const path = `mural/${post.id}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage.from("mural-attachments").upload(path, file);
        if (uploadError) throw uploadError;
        const { error: insertError } = await (supabase.from("mural_post_attachments") as any).insert({
          post_id: post.id,
          file_name: file.name,
          storage_path: path,
          mime_type: file.type || null,
          size_bytes: file.size,
          uploaded_by: user.id,
        });
        if (insertError) {
          await supabase.storage.from("mural-attachments").remove([path]);
          throw insertError;
        }
      }
      qc.invalidateQueries({ queryKey: ["mural_post_attachments"] });
      toast.success("Anexo adicionado ao post-it.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploadingPostId(null);
    }
  };
  const downloadAttachment = async (attachment: MuralAttachment) => {
    const { data, error } = await supabase.storage
      .from("mural-attachments")
      .createSignedUrl(attachment.storage_path, 60);
    if (error || !data) return toast.error(error?.message ?? "Não foi possível baixar o anexo.");
    const response = await fetch(data.signedUrl);
    if (!response.ok) return toast.error("Não foi possível baixar o anexo.");
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.file_name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };
  const deleteAttachment = async (attachment: MuralAttachment) => {
    if (!confirm(`Excluir "${attachment.file_name}"?`)) return;
    const { error: storageError } = await supabase.storage
      .from("mural-attachments")
      .remove([attachment.storage_path]);
    if (storageError) return toast.error(storageError.message);
    const { error } = await (supabase.from("mural_post_attachments") as any)
      .delete()
      .eq("id", attachment.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["mural_post_attachments"] });
    toast.success("Anexo excluído.");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Pin className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Mural</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Ideias, lembretes e comunicados compartilhados pela equipe. Arraste seus post-its pelo espaço livre; a tela rola em todas as direções e evita sobreposições. Itens fixados ficam sempre à frente. {postCountLabel}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={showCompleted ? "secondary" : "outline"} onClick={() => setShowCompleted((current) => !current)}>
            {showCompleted ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            {showCompleted ? "Post-its em aberto" : "Post-its concluídos"}
          </Button>
          <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setEditingPost(null); }}>
            <Button onClick={openNewPost}><Plus className="h-4 w-4" /> Novo post-it</Button>
          <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Editar post-it" : "Novo post-it"}</DialogTitle>
              <DialogDescription>{editingPost ? "Atualize o recado compartilhado com a equipe." : "Crie um aviso visual para o mural da equipe."}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Ex.: Ideias para a próxima reunião" />
              </div>
              <div className="space-y-2">
                <Label>Mensagem</Label>
                <Textarea value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="Escreva um recado para a equipe" />
                <div className="flex flex-wrap gap-1.5" aria-label="Adicionar emoji à mensagem">
                  {QUICK_EMOJIS.map((emoji) => (
                    <Button key={emoji} type="button" variant="outline" size="sm" className="h-7 min-w-7 px-1.5 text-sm" onClick={() => setForm((current) => ({ ...current, content: `${current.content}${current.content ? " " : ""}${emoji}` }))}>
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Etiqueta</Label>
                  <Input value={form.tag} onChange={(event) => setForm({ ...form, tag: event.target.value })} placeholder="Ex.: Importante" />
                </div>
                <div className="space-y-2">
                  <Label>Cor</Label>
                  <select className="h-9 w-full rounded-md border bg-background px-3 text-sm" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })}>
                    {COLORS.map((color) => <option key={color.value} value={color.value}>{color.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tamanho no mural</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {CARD_SIZES.map((size) => (
                      <Button key={size.value} type="button" size="sm" variant={form.cardSize === size.value ? "default" : "outline"} className="px-1 text-xs" onClick={() => setForm({ ...form, cardSize: size.value })}>
                        {size.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Estilo de escrita</Label>
                  <select className="h-9 w-full rounded-md border bg-background px-3 text-sm" value={form.textStyle} onChange={(event) => setForm({ ...form, textStyle: event.target.value as TextStyle })}>
                    {TEXT_STYLES.map((style) => <option key={style.value} value={style.value}>{style.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Checklist <span className="font-normal text-muted-foreground">(um item por linha)</span></Label>
                <Textarea value={form.checklist} onChange={(event) => setForm({ ...form, checklist: event.target.value })} placeholder={"Preparar pauta\nConfirmar participantes"} />
              </div>
              <div className="space-y-2">
                <Label>Imagem <span className="font-normal text-muted-foreground">(link opcional)</span></Label>
                <Input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button disabled={savePost.isPending} onClick={() => savePost.mutate()}>
                {savePost.isPending ? "Salvando..." : editingPost ? "Salvar alterações" : "Publicar post-it"}
              </Button>
            </DialogFooter>
          </DialogContent>
          </Dialog>
        </div>
      </header>

      {isLoading ? (
        <div className="py-20 text-center text-sm text-muted-foreground">Carregando mural...</div>
      ) : orderedPosts.length === 0 ? (
        <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed bg-card/60 p-8 text-center">
          <div>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Pin className="h-5 w-5" /></div>
            <h2 className="font-semibold">{showCompleted ? "Nenhum post-it concluído" : "O mural está pronto para começar"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{showCompleted ? "Os post-its concluídos aparecerão aqui." : "Publique o primeiro post-it para compartilhar uma ideia ou recado."}</p>
          </div>
        </div>
      ) : (
        <div ref={canvasViewportRef} className="h-[calc(100dvh-13rem)] min-h-[36rem] overflow-auto rounded-2xl border border-border/60 bg-muted/20 shadow-inner">
          <div
            ref={canvasRef}
            onDragOver={(event) => event.preventDefault()}
            onDrop={movePostOnCanvas}
            className="relative bg-[linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] bg-[size:28px_28px]"
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
          {orderedPosts.map((post) => {
            const canEdit = isAdmin || post.created_by === user?.id;
            const postAttachments = attachments.filter((attachment) => attachment.post_id === post.id);
            const postReactions = reactions.filter((reaction) => reaction.post_id === post.id);
            const authorName =
              profiles.find((profile) => profile.id === post.created_by)?.full_name ?? "Usuário";
            return (
              <article
                key={post.id}
                ref={(node) => {
                  if (node) postRefs.current.set(post.id, node);
                  else postRefs.current.delete(post.id);
                }}
                draggable={canEdit}
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", post.id);
                  event.dataTransfer.effectAllowed = "move";
                  setDraggingId(post.id);
                }}
                onDragEnd={() => setDraggingId(null)}
                className={`group absolute overflow-hidden rounded-md p-4 shadow-[0_5px_10px_-5px_rgb(0_0_0_/_0.38)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_14px_-6px_rgb(0_0_0_/_0.44)] ${post.card_size === "large" ? "w-[34rem] p-6" : post.card_size === "compact" ? "w-64 p-3" : "w-80"} ${post.is_pinned ? "z-20 ring-2 ring-primary/40" : "z-10"} ${draggingId === post.id ? "opacity-45" : ""} ${colorClass(post.color)}`}
                style={{ ...textStyleCss(post.text_style), left: post.canvas_x, top: post.canvas_y }}
              >
                {post.image_url && (
                  <img src={post.image_url} alt="" className="-mx-4 -mt-4 mb-4 h-36 w-[calc(100%+2rem)] object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                )}
                <div className="flex items-start gap-2">
                  <h2 className={`min-w-0 flex-1 font-bold leading-snug ${post.card_size === "large" ? "text-xl" : "text-base"}`}>{post.title}</h2>
                  <GripVertical className="h-4 w-4 shrink-0 cursor-grab opacity-45" aria-label="Arraste para mover" />
                  {canEdit && <div className="-mr-2 -mt-2 flex opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updatePostPresentation.mutate({ id: post.id, patch: { is_pinned: !post.is_pinned } })} title={post.is_pinned ? "Desafixar" : "Fixar à frente dos demais"}>
                      {post.is_pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updatePostPresentation.mutate({ id: post.id, patch: { card_size: post.card_size === "large" ? "normal" : "large" } })} title={post.card_size === "large" ? "Voltar ao tamanho normal" : "Destacar e ampliar"}>
                      {post.card_size === "large" ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPostCompleted.mutate({ id: post.id, completed: !post.completed_at })} title={post.completed_at ? "Reabrir post-it" : "Concluir post-it"}>
                      {post.completed_at ? <RotateCcw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditPost(post)} title="Editar post-it"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removePost.mutate(post.id)} title="Remover post-it"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>}
                </div>
                {post.is_pinned && <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-background/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide"><Pin className="h-3 w-3" /> Fixado à frente</span>}
                {post.content && <p className={`whitespace-pre-wrap leading-relaxed text-foreground/85 ${post.is_pinned ? "mt-2" : "mt-3"} ${post.card_size === "large" ? "text-base" : "text-sm"}`}>{post.content}</p>}
                {post.checklist.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {post.checklist.map((item, index) => (
                      <label key={`${post.id}-${index}`} className={`flex items-start gap-2 text-sm ${canEdit ? "cursor-pointer" : "cursor-default"}`}>
                        <Checkbox disabled={!canEdit} checked={item.done} onCheckedChange={() => updateChecklist.mutate({ post, index })} />
                        <span className={item.done ? "text-muted-foreground line-through" : ""}>{item.text}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {canEdit && (
                    <FileDropZone onFiles={(files) => uploadFiles(post, files)} disabled={uploadingPostId === post.id}>
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-foreground/25 bg-background/20 px-2 py-2 text-xs font-medium hover:bg-background/35">
                        <Upload className="h-3.5 w-3.5" />
                        {uploadingPostId === post.id ? "Enviando..." : "Anexar arquivo"}
                        <input className="sr-only" type="file" multiple onChange={(event) => { if (event.target.files) void uploadFiles(post, event.target.files); event.currentTarget.value = ""; }} />
                      </label>
                    </FileDropZone>
                  )}
                  {postAttachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center gap-1 rounded bg-background/45 px-2 py-1.5 text-xs">
                      <Paperclip className="h-3.5 w-3.5 shrink-0" />
                      <span className="min-w-0 flex-1 truncate" title={attachment.file_name}>{attachment.file_name}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => void downloadAttachment(attachment)} title="Baixar anexo"><Download className="h-3.5 w-3.5" /></Button>
                      {canEdit && <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => void deleteAttachment(attachment)} title="Excluir anexo"><Trash2 className="h-3.5 w-3.5" /></Button>}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-foreground/10 pt-3">
                  <SmilePlus className="mr-0.5 h-3.5 w-3.5 text-foreground/60" aria-hidden="true" />
                  {REACTION_EMOJIS.map((emoji) => {
                    const emojiReactions = postReactions.filter((reaction) => reaction.emoji === emoji);
                    const reactedByCurrentUser = emojiReactions.some((reaction) => reaction.user_id === user?.id);
                    const names = emojiReactions
                      .map((reaction) => profiles.find((profile) => profile.id === reaction.user_id)?.full_name ?? "Usuário")
                      .join(", ");
                    return (
                      <Button
                        key={emoji}
                        type="button"
                        variant={reactedByCurrentUser ? "secondary" : "ghost"}
                        size="sm"
                        disabled={toggleReaction.isPending}
                        onClick={() => toggleReaction.mutate({ postId: post.id, emoji })}
                        title={names ? `${emoji} por ${names}` : `Reagir com ${emoji}`}
                        className="h-7 min-w-7 gap-1 rounded-full px-1.5 text-xs"
                      >
                        <span>{emoji}</span>
                        {emojiReactions.length > 0 && <span>{emojiReactions.length}</span>}
                      </Button>
                    );
                  })}
                  {postReactions.length > 0 && (
                    <p className="basis-full pt-1 text-[10px] text-foreground/65">
                      {postReactions.map((reaction) => `${profiles.find((profile) => profile.id === reaction.user_id)?.full_name ?? "Usuário"} ${reaction.emoji}`).join(" · ")}
                    </p>
                  )}
                </div>
                {!post.image_url && !post.content && post.checklist.length === 0 && <ImageIcon className="mt-8 h-5 w-5 opacity-25" />}
                <div className="mt-4 flex items-center justify-between gap-2">
                  {post.tag ? (
                    <span className="inline-flex rounded bg-background/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                      {post.tag}
                    </span>
                  ) : <span />}
                  <p className="text-right text-[10px] font-medium text-foreground/60">Por {authorName}</p>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
}
