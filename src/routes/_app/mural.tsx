import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Download,
  GripVertical,
  ImageIcon,
  Maximize2,
  Minimize2,
  Paperclip,
  Pencil,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  SmilePlus,
  Trash2,
  Upload,
} from "lucide-react";
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
import { muralUnreadKey } from "@/hooks/use-mural-unread";

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
  { value: "sky", label: "Azul", card: "bg-[#d9eff7] text-[#263b42]" },
  { value: "amber", label: "Amarelo", card: "bg-[#fff6a8] text-[#423b1b]" },
  { value: "violet", label: "Lilás", card: "bg-[#e9e1ff] text-[#39344f]" },
  { value: "green", label: "Verde", card: "bg-[#caffdf] text-[#294438]" },
  { value: "rose", label: "Rosa", card: "bg-[#ffe1f0] text-[#4c3543]" },
  { value: "red", label: "Vermelho", card: "bg-[#ffdcd5] text-[#553832]" },
  { value: "stone", label: "Cinza", card: "bg-[#f0eee9] text-[#343330]" },
] as const;

type CardSize = "compact" | "normal" | "large";
type TextStyle = "clean" | "handwritten" | "editorial" | "typewriter";

const CARD_SIZES: { value: CardSize; label: string }[] = [
  { value: "compact", label: "Compacto" },
  { value: "normal", label: "Normal" },
  { value: "large", label: "Destaque" },
];

const TEXT_STYLES: { value: TextStyle; label: string; css: CSSProperties }[] = [
  { value: "clean", label: "Editorial", css: { fontFamily: "Georgia, 'Times New Roman', serif" } },
  {
    value: "handwritten",
    label: "Manual",
    css: { fontFamily: "cursive", letterSpacing: "0.01em" },
  },
  {
    value: "editorial",
    label: "Elegante",
    css: { fontFamily: "Georgia, 'Times New Roman', serif" },
  },
  {
    value: "typewriter",
    label: "Máquina",
    css: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.92em" },
  },
];

const QUICK_EMOJIS = ["📌", "✨", "💡", "🚀", "✅", "⚠️", "🎉", "❤️"];
const REACTION_EMOJIS = ["👍", "❤️", "🎉", "👏", "💡", "👀"];
const CANVAS_WIDTH = 3200;
const CANVAS_HEIGHT = 2200;
const CARD_GAP = 20;
const cardFallbackSize = (size: CardSize) => ({
  width: size === "large" ? 560 : size === "compact" ? 256 : 320,
  height: size === "large" ? 420 : size === "compact" ? 220 : 300,
});

const emptyForm = {
  title: "",
  content: "",
  tag: "",
  imageUrl: "",
  checklist: "",
  color: "sky",
  cardSize: "normal" as CardSize,
  textStyle: "clean" as TextStyle,
};

function colorClass(color: string) {
  return COLORS.find((item) => item.value === color)?.card ?? COLORS[0].card;
}

function textStyleCss(style: TextStyle | null | undefined) {
  return TEXT_STYLES.find((item) => item.value === style)?.css ?? TEXT_STYLES[0].css;
}

function profileName(
  profiles: Array<{ id: string; full_name: string | null; email?: string | null }>,
  userId?: string,
) {
  const name = profiles.find((profile) => profile.id === userId)?.full_name;
  return name?.split(" ")[0] || "equipe";
}

function MuralPage() {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingPost, setEditingPost] = useState<MuralPost | null>(null);
  const [postFilter, setPostFilter] = useState<"all" | "pinned" | "open" | "completed">("all");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [frontCardId, setFrontCardId] = useState<string | null>(null);
  const [draftPositions, setDraftPositions] = useState<Record<string, { x: number; y: number }>>(
    {},
  );
  const [uploadingPostId, setUploadingPostId] = useState<string | null>(null);
  const hasMarkedCurrentVisitRead = useRef(false);
  const canvasViewportRef = useRef<HTMLDivElement | null>(null);
  const topCanvasScrollRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const postRefs = useRef(new Map<string, HTMLElement>());
  const activeDragRef = useRef<{
    id: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const draftPositionsRef = useRef<Record<string, { x: number; y: number }>>({});
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
    void (async () => {
      const { error } = await (supabase.from("notifications") as any)
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false)
        .in("type", ["mural_post", "mural_reaction"]);
      if (error) {
        hasMarkedCurrentVisitRead.current = false;
        toast.error(`Não foi possível atualizar a leitura do mural: ${error.message}`);
        return;
      }
      await qc.invalidateQueries({ queryKey: muralUnreadKey(user.id) });
    })();
  }, [isLoading, qc, user?.id]);

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
      const newPostPosition = editingPost ? null : findAvailableCanvasPosition(form.cardSize);
      const { data, error } = editingPost
        ? await (supabase.from("mural_posts") as any)
            .update(payload)
            .eq("id", editingPost.id)
            .select()
            .single()
        : await (supabase.from("mural_posts") as any)
            .insert({
              ...payload,
              created_by: user.id,
              canvas_x: newPostPosition?.x,
              canvas_y: newPostPosition?.y,
            })
            .select()
            .single();
      if (error) throw error;
      return data as MuralPost;
    },
    onSuccess: (savedPost) => {
      qc.invalidateQueries({ queryKey: ["mural_posts"] });
      if (!editingPost) setFrontCardId(savedPost.id);
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
        // Um recado concluído deixa automaticamente de ocupar a área de fixados.
        .update({
          completed_at: completed ? new Date().toISOString() : null,
          ...(completed ? { is_pinned: false } : {}),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),
    onError: (error: Error) => toast.error(error.message),
  });
  const updatePostPresentation = useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: Partial<Pick<MuralPost, "is_pinned" | "card_size" | "canvas_x" | "canvas_y">>;
    }) => {
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
        (reaction) =>
          reaction.post_id === postId && reaction.user_id === user.id && reaction.emoji === emoji,
      );
      const { error } = current
        ? await (supabase.from("mural_post_reactions") as any).delete().eq("id", current.id)
        : await (supabase.from("mural_post_reactions") as any).insert({
            post_id: postId,
            user_id: user.id,
            emoji,
          });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_post_reactions"] }),
    onError: (error: Error) => toast.error(error.message),
  });

  const orderedPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (postFilter === "pinned") return post.is_pinned;
        if (postFilter === "open") return !post.completed_at;
        if (postFilter === "completed") return !!post.completed_at;
        return !post.completed_at;
      })
      .sort((a, b) => {
        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [posts, postFilter]);
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
    const fallback = cardFallbackSize(post.card_size);
    const width = card?.offsetWidth ?? fallback.width;
    const height = card?.offsetHeight ?? fallback.height;
    const maxX = CANVAS_WIDTH - width - CARD_GAP;
    const maxY = CANVAS_HEIGHT - height - CARD_GAP;
    return {
      x: Math.max(CARD_GAP, Math.min(Math.round(requestedX), maxX)),
      y: Math.max(CARD_GAP, Math.min(Math.round(requestedY), maxY)),
    };
  };
  const findAvailableCanvasPosition = (cardSize: CardSize) => {
    const { width, height } = cardFallbackSize(cardSize);
    const viewport = canvasViewportRef.current;
    const preferredX = Math.max(CARD_GAP, (viewport?.scrollLeft ?? 0) + 48);
    const preferredY = Math.max(CARD_GAP, (viewport?.scrollTop ?? 0) + 48);
    const maxX = CANVAS_WIDTH - width - CARD_GAP;
    const maxY = CANVAS_HEIGHT - height - CARD_GAP;
    const overlapsExistingCard = (x: number, y: number) =>
      orderedPosts.some((post) => {
        const element = postRefs.current.get(post.id);
        const fallback = cardFallbackSize(post.card_size);
        const otherWidth = element?.offsetWidth ?? fallback.width;
        const otherHeight = element?.offsetHeight ?? fallback.height;
        const position = draftPositionsRef.current[post.id] ?? {
          x: post.canvas_x,
          y: post.canvas_y,
        };
        return (
          x < position.x + otherWidth + CARD_GAP &&
          x + width + CARD_GAP > position.x &&
          y < position.y + otherHeight + CARD_GAP &&
          y + height + CARD_GAP > position.y
        );
      });

    // Só a criação procura espaço vazio. Depois de criado, o usuário pode
    // mover livremente e sobrepor cartões sem o mural travar.
    let x = Math.min(preferredX, maxX);
    let y = Math.min(preferredY, maxY);
    for (let attempt = 0; overlapsExistingCard(x, y) && attempt < 600; attempt += 1) {
      x += 40;
      if (x > maxX) {
        x = CARD_GAP;
        y += 40;
        if (y > maxY) y = CARD_GAP;
      }
    }
    return { x, y };
  };
  const setDraftPosition = (id: string, position: { x: number; y: number }) => {
    draftPositionsRef.current = { ...draftPositionsRef.current, [id]: position };
    setDraftPositions(draftPositionsRef.current);
  };
  const startCanvasDrag = (event: PointerEvent<SVGSVGElement>, post: MuralPost) => {
    if (!(isAdmin || post.created_by === user?.id) || !canvasRef.current) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = canvasRef.current.getBoundingClientRect();
    const current = draftPositionsRef.current[post.id] ?? { x: post.canvas_x, y: post.canvas_y };
    activeDragRef.current = {
      id: post.id,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - current.x,
      offsetY: event.clientY - rect.top - current.y,
    };
    setFrontCardId(post.id);
    setDraggingId(post.id);
  };
  const moveCanvasDrag = (event: PointerEvent<SVGSVGElement>) => {
    const activeDrag = activeDragRef.current;
    const post = orderedPosts.find((item) => item.id === activeDrag?.id);
    const canvas = canvasRef.current;
    if (!activeDrag || activeDrag.pointerId !== event.pointerId || !post || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    setDraftPosition(
      post.id,
      findOpenCanvasPosition(
        post,
        event.clientX - rect.left - activeDrag.offsetX,
        event.clientY - rect.top - activeDrag.offsetY,
      ),
    );
  };
  const finishCanvasDrag = (event: PointerEvent<SVGSVGElement>) => {
    const activeDrag = activeDragRef.current;
    if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;
    const position = draftPositionsRef.current[activeDrag.id];
    activeDragRef.current = null;
    setDraggingId(null);
    if (position)
      updatePostPresentation.mutate({
        id: activeDrag.id,
        patch: { canvas_x: position.x, canvas_y: position.y },
      });
  };

  useEffect(() => {
    const viewport = canvasViewportRef.current;
    const topScroll = topCanvasScrollRef.current;
    if (viewport) viewport.scrollLeft = 420;
    if (topScroll) topScroll.scrollLeft = 420;
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
        const { error: uploadError } = await supabase.storage
          .from("mural-attachments")
          .upload(path, file);
        if (uploadError) throw uploadError;
        const { error: insertError } = await (
          supabase.from("mural_post_attachments") as any
        ).insert({
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
    <div className="mural-la min-h-full bg-background px-4 py-5 text-[#313532] sm:px-7 sm:py-7">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mural-subtle text-[11px] text-[#8a9089]">Mural LA</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Olá, {profileName(profiles, user?.id)} 👋
          </h1>
          <p className="mural-subtle mt-1 text-sm text-[#747a74]">
            Recados, normas e novidades compartilhadas com a equipe.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="h-9 rounded-full px-4 shadow-sm" onClick={openNewPost}>
            <Plus className="h-4 w-4" /> Novo recado
          </Button>
          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) setEditingPost(null);
            }}
          >
            <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Editar post-it" : "Novo post-it"}</DialogTitle>
                <DialogDescription>
                  {editingPost
                    ? "Atualize o recado compartilhado com a equipe."
                    : "Crie um aviso visual para o mural da equipe."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    placeholder="Ex.: Ideias para a próxima reunião"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mensagem</Label>
                  <Textarea
                    value={form.content}
                    onChange={(event) => setForm({ ...form, content: event.target.value })}
                    placeholder="Escreva um recado para a equipe"
                  />
                  <div className="flex flex-wrap gap-1.5" aria-label="Adicionar emoji à mensagem">
                    {QUICK_EMOJIS.map((emoji) => (
                      <Button
                        key={emoji}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 min-w-7 px-1.5 text-sm"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            content: `${current.content}${current.content ? " " : ""}${emoji}`,
                          }))
                        }
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Etiqueta</Label>
                    <Input
                      value={form.tag}
                      onChange={(event) => setForm({ ...form, tag: event.target.value })}
                      placeholder="Ex.: Importante"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cor</Label>
                    <select
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      value={form.color}
                      onChange={(event) => setForm({ ...form, color: event.target.value })}
                    >
                      {COLORS.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tamanho no mural</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {CARD_SIZES.map((size) => (
                        <Button
                          key={size.value}
                          type="button"
                          size="sm"
                          variant={form.cardSize === size.value ? "default" : "outline"}
                          className="px-1 text-xs"
                          onClick={() => setForm({ ...form, cardSize: size.value })}
                        >
                          {size.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Estilo de escrita</Label>
                    <select
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      value={form.textStyle}
                      onChange={(event) =>
                        setForm({ ...form, textStyle: event.target.value as TextStyle })
                      }
                    >
                      {TEXT_STYLES.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>
                    Checklist{" "}
                    <span className="font-normal text-muted-foreground">(um item por linha)</span>
                  </Label>
                  <Textarea
                    value={form.checklist}
                    onChange={(event) => setForm({ ...form, checklist: event.target.value })}
                    placeholder={"Preparar pauta\nConfirmar participantes"}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Imagem{" "}
                    <span className="font-normal text-muted-foreground">(link opcional)</span>
                  </Label>
                  <Input
                    type="url"
                    value={form.imageUrl}
                    onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button disabled={savePost.isPending} onClick={() => savePost.mutate()}>
                  {savePost.isPending
                    ? "Salvando..."
                    : editingPost
                      ? "Salvar alterações"
                      : "Publicar post-it"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Recados em aberto",
            value: posts.filter((post) => !post.completed_at).length,
            tone: "bg-[#fff0cf] text-[#3d3d32]",
          },
          {
            label: "Recados fixados",
            value: posts.filter((post) => post.is_pinned && !post.completed_at).length,
            tone: "bg-[#dff2fa] text-[#304248]",
          },
          {
            label: "Reações da equipe",
            value: reactions.length,
            tone: "bg-[#dff5e9] text-[#32433a]",
          },
          {
            label: "Recados concluídos",
            value: posts.filter((post) => !!post.completed_at).length,
            tone: "bg-[#f8e1ef] text-[#493742]",
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className={`flex min-h-20 items-center justify-between rounded-xl px-4 py-3 shadow-[0_1px_0_rgb(0_0_0_/_0.05)] ${metric.tone}`}
          >
            <div>
              <p className="text-sm font-medium">{metric.label}</p>
              <p className="mt-1 text-xs text-[#727973]">Atualização do mural</p>
            </div>
            <strong className="text-2xl font-semibold">{metric.value}</strong>
          </div>
        ))}
      </section>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#858b85]">
          Em destaque
        </p>
        <div className="mural-filter flex flex-wrap gap-1 rounded-full bg-white/70 p-1 text-xs shadow-sm">
          {(
            [
              ["all", "Todos"],
              ["pinned", "Fixados"],
              ["open", "Em aberto"],
              ["completed", "Concluídos"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPostFilter(value)}
              className={`rounded-full px-3 py-1 transition-colors ${postFilter === value ? "bg-[#d9efed] text-[#256e6f]" : "text-[#737a74] hover:bg-[#eeefea]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-sm text-[#747a74]">Carregando mural...</div>
      ) : orderedPosts.length === 0 ? (
        <div className="mural-empty grid min-h-72 place-items-center rounded-xl border border-dashed border-[#d9dcd5] bg-white/50 p-8 text-center">
          <div>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dff2fa] text-[#287f80]">
              <Pin className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">
              {postFilter === "all"
                ? "O mural está pronto para começar"
                : "Nenhum recado nesta visualização"}
            </h2>
            <p className="mt-1 text-sm text-[#747a74]">
              {postFilter === "all"
                ? "Publique o primeiro recado para compartilhar uma ideia ou comunicado."
                : "Use os filtros acima para navegar entre os outros recados."}
            </p>
          </div>
        </div>
      ) : (
        <section>
          <div ref={canvasRef} className="grid auto-rows-auto gap-5 md:grid-cols-2 xl:grid-cols-4">
            {orderedPosts.map((post, index) => {
              const canEdit = isAdmin || post.created_by === user?.id;
              const postAttachments = attachments.filter(
                (attachment) => attachment.post_id === post.id,
              );
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
                  className={`group relative min-w-0 self-start overflow-hidden rounded-sm border border-black/[0.035] p-4 shadow-[0_9px_18px_-14px_rgb(46_57_48_/_0.7)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:translate-x-1 hover:shadow-[0_16px_26px_-15px_rgb(46_57_48_/_0.78)] ${index % 5 === 0 ? "rotate-[-0.7deg] hover:rotate-[0.15deg]" : index % 5 === 1 ? "rotate-[0.45deg] hover:rotate-[-0.25deg]" : index % 5 === 2 ? "rotate-[-0.3deg] hover:rotate-[0.45deg]" : index % 5 === 3 ? "rotate-[0.72deg] hover:rotate-[0.05deg]" : "rotate-[-0.12deg] hover:rotate-[-0.5deg]"} ${post.card_size === "large" ? "md:col-span-2 p-6" : post.card_size === "compact" ? "max-w-xs p-3" : ""} ${post.is_pinned ? "ring-1 ring-[#287f80]/45" : ""} ${draggingId === post.id ? "opacity-75 shadow-xl" : ""} ${colorClass(post.color)}`}
                  style={{
                    ...textStyleCss(post.text_style),
                  }}
                >
                  <span
                    className={`absolute -top-1 left-1/2 h-5 w-20 -translate-x-1/2 rounded-[2px] opacity-70 shadow-sm ${post.color === "amber" ? "bg-[#ffe363]" : post.color === "sky" ? "bg-[#8dd6ee]" : post.color === "green" ? "bg-[#65e7ba]" : post.color === "rose" ? "bg-[#ffa7d0]" : "bg-[#c9b7fa]"}`}
                  />
                  {index === 4 && <span className="sr-only">Mural</span>}
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt=""
                      className="-mx-4 -mt-4 mb-4 h-36 w-[calc(100%+2rem)] object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex items-start gap-2 pt-1">
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.11em] opacity-60">
                        {post.tag || "Aviso"}
                      </p>
                      <h2
                        className={`font-bold leading-snug ${post.card_size === "large" ? "text-xl" : "text-base"}`}
                      >
                        {post.title}
                      </h2>
                    </div>
                    {canEdit && (
                      <div className="-mr-2 -mt-2 flex opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-current"
                          onClick={() =>
                            updatePostPresentation.mutate({
                              id: post.id,
                              patch: { is_pinned: !post.is_pinned },
                            })
                          }
                          title={post.is_pinned ? "Desafixar" : "Fixar à frente dos demais"}
                        >
                          {post.is_pinned ? (
                            <PinOff className="h-3.5 w-3.5" />
                          ) : (
                            <Pin className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-current"
                          onClick={() =>
                            updatePostPresentation.mutate({
                              id: post.id,
                              patch: { card_size: post.card_size === "large" ? "normal" : "large" },
                            })
                          }
                          title={
                            post.card_size === "large"
                              ? "Voltar ao tamanho normal"
                              : "Destacar e ampliar"
                          }
                        >
                          {post.card_size === "large" ? (
                            <Minimize2 className="h-3.5 w-3.5" />
                          ) : (
                            <Maximize2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-current"
                          onClick={() =>
                            setPostCompleted.mutate({ id: post.id, completed: !post.completed_at })
                          }
                          title={post.completed_at ? "Reabrir post-it" : "Concluir post-it"}
                        >
                          {post.completed_at ? (
                            <RotateCcw className="h-3.5 w-3.5" />
                          ) : (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-current"
                          onClick={() => openEditPost(post)}
                          title="Editar post-it"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-current"
                          onClick={() => removePost.mutate(post.id)}
                          title="Remover post-it"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {post.is_pinned && (
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
                      <Pin className="h-3 w-3" /> Fixado à frente
                    </span>
                  )}
                  {post.content && (
                    <p
                      className={`whitespace-pre-wrap leading-relaxed opacity-85 ${post.is_pinned ? "mt-2" : "mt-3"} ${post.card_size === "large" ? "text-base" : "text-sm"}`}
                    >
                      {post.content}
                    </p>
                  )}
                  {post.checklist.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {post.checklist.map((item, index) => (
                        <label
                          key={`${post.id}-${index}`}
                          className={`flex items-start gap-2 text-sm ${canEdit ? "cursor-pointer" : "cursor-default"}`}
                        >
                          <Checkbox
                            disabled={!canEdit}
                            checked={item.done}
                            onCheckedChange={() => updateChecklist.mutate({ post, index })}
                          />
                          <span className={item.done ? "text-muted-foreground line-through" : ""}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 space-y-2">
                    {canEdit && (
                      <FileDropZone
                        onFiles={(files) => uploadFiles(post, files)}
                        disabled={uploadingPostId === post.id}
                      >
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-black/20 bg-white/25 px-2 py-2 text-xs font-medium hover:bg-white/40">
                          <Upload className="h-3.5 w-3.5" />
                          {uploadingPostId === post.id ? "Enviando..." : "Anexar arquivo"}
                          <input
                            className="sr-only"
                            type="file"
                            multiple
                            onChange={(event) => {
                              if (event.target.files) void uploadFiles(post, event.target.files);
                              event.currentTarget.value = "";
                            }}
                          />
                        </label>
                      </FileDropZone>
                    )}
                    {postAttachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-1 rounded bg-white/40 px-2 py-1.5 text-xs"
                      >
                        <Paperclip className="h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 truncate" title={attachment.file_name}>
                          {attachment.file_name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-current"
                          onClick={() => void downloadAttachment(attachment)}
                          title="Baixar anexo"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-current"
                            onClick={() => void deleteAttachment(attachment)}
                            title="Excluir anexo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-foreground/10 pt-3">
                    <SmilePlus className="mr-0.5 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                    {REACTION_EMOJIS.map((emoji) => {
                      const emojiReactions = postReactions.filter(
                        (reaction) => reaction.emoji === emoji,
                      );
                      const reactedByCurrentUser = emojiReactions.some(
                        (reaction) => reaction.user_id === user?.id,
                      );
                      const names = emojiReactions
                        .map(
                          (reaction) =>
                            profiles.find((profile) => profile.id === reaction.user_id)
                              ?.full_name ?? "Usuário",
                        )
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
                          className="h-7 min-w-7 gap-1 rounded-full px-1.5 text-xs text-current"
                        >
                          <span>{emoji}</span>
                          {emojiReactions.length > 0 && <span>{emojiReactions.length}</span>}
                        </Button>
                      );
                    })}
                    {postReactions.length > 0 && (
                      <p className="basis-full pt-1 text-[10px] opacity-65">
                        {postReactions
                          .map(
                            (reaction) =>
                              `${profiles.find((profile) => profile.id === reaction.user_id)?.full_name ?? "Usuário"} ${reaction.emoji}`,
                          )
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                  {!post.image_url && !post.content && post.checklist.length === 0 && (
                    <ImageIcon className="mt-8 h-5 w-5 opacity-25" />
                  )}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {post.tag ? (
                      <span className="inline-flex rounded bg-white/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                        {post.tag}
                      </span>
                    ) : (
                      <span />
                    )}
                    <p className="text-right text-[10px] font-medium opacity-60">
                      Por {authorName}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
