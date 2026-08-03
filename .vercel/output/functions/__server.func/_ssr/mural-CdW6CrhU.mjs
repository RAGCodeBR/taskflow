import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { u as useAuth, j as useProfiles, B as Button, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, r as DialogDescription, L as Label, I as Input, d as DialogFooter, F as FileDropZone } from "./router-ZM7179_C.mjs";
import { T as Textarea } from "./textarea-CnlXJbD_.mjs";
import { C as Checkbox } from "./checkbox-Bhd60i9o.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as markMuralAsRead, a as muralUnreadKey } from "./use-mural-unread-C0FWkmUY.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { ab as Pin, ac as RotateCcw, c as Check, P as Plus, ad as GripVertical, b as Pencil, T as Trash2, a9 as Upload, f as Paperclip, D as Download, ae as Image } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./server-DJ8sPH9h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-CTknNXUw.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
const COLORS = [{
  value: "sky",
  label: "Azul",
  card: "bg-sky-200/85 dark:bg-sky-900/65"
}, {
  value: "amber",
  label: "Amarelo",
  card: "bg-amber-200/85 dark:bg-amber-900/65"
}, {
  value: "violet",
  label: "Lilás",
  card: "bg-violet-200/85 dark:bg-violet-900/65"
}, {
  value: "green",
  label: "Verde",
  card: "bg-green-200/85 dark:bg-green-900/65"
}, {
  value: "rose",
  label: "Rosa",
  card: "bg-pink-200/85 dark:bg-pink-900/65"
}, {
  value: "red",
  label: "Vermelho",
  card: "bg-red-200/85 dark:bg-red-900/65"
}, {
  value: "stone",
  label: "Cinza",
  card: "bg-stone-200/85 dark:bg-stone-800"
}];
const emptyForm = {
  title: "",
  content: "",
  tag: "",
  imageUrl: "",
  checklist: "",
  color: "sky"
};
function colorClass(color) {
  return COLORS.find((item) => item.value === color)?.card ?? COLORS[0].card;
}
function MuralPage() {
  const {
    user,
    isAdmin
  } = useAuth();
  const {
    data: profiles = []
  } = useProfiles();
  const qc = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [editingPost, setEditingPost] = reactExports.useState(null);
  const [showCompleted, setShowCompleted] = reactExports.useState(false);
  const [draggingId, setDraggingId] = reactExports.useState(null);
  const [localOrder, setLocalOrder] = reactExports.useState([]);
  const [uploadingPostId, setUploadingPostId] = reactExports.useState(null);
  const hasMarkedCurrentVisitRead = reactExports.useRef(false);
  const {
    data: posts = [],
    isLoading
  } = useQuery({
    queryKey: ["mural_posts"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("mural_posts").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return (data ?? []).map((post) => ({
        ...post,
        checklist: Array.isArray(post.checklist) ? post.checklist : []
      }));
    }
  });
  const {
    data: storedOrders = []
  } = useQuery({
    queryKey: ["mural_post_orders", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("mural_post_orders").select("post_id, position").order("position");
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: attachments = []
  } = useQuery({
    queryKey: ["mural_post_attachments"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("mural_post_attachments").select("id, post_id, file_name, storage_path, mime_type, size_bytes").order("created_at");
      if (error) throw error;
      return data ?? [];
    }
  });
  reactExports.useEffect(() => {
    if (!user || isLoading || hasMarkedCurrentVisitRead.current) return;
    hasMarkedCurrentVisitRead.current = true;
    const unreadPostIds = posts.filter((post) => post.created_by !== user.id).map((post) => post.id);
    void markMuralAsRead(user.id, unreadPostIds).then(() => qc.invalidateQueries({
      queryKey: muralUnreadKey(user.id)
    })).catch((error) => {
      hasMarkedCurrentVisitRead.current = false;
      toast.error(`Não foi possível atualizar a leitura do mural: ${error.message}`);
    });
  }, [isLoading, posts, qc, user?.id]);
  const savePost = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Sua sessão expirou. Entre novamente.");
      if (!form.title.trim()) throw new Error("Informe o título do post-it.");
      const checklist = form.checklist.split("\n").map((text) => text.trim()).filter(Boolean).map((text) => ({
        text,
        done: editingPost?.checklist.find((item) => item.text === text)?.done ?? false
      }));
      const payload = {
        title: form.title.trim(),
        content: form.content.trim() || null,
        tag: form.tag.trim() || null,
        image_url: form.imageUrl.trim() || null,
        color: form.color,
        checklist
      };
      const {
        error
      } = editingPost ? await supabase.from("mural_posts").update(payload).eq("id", editingPost.id) : await supabase.from("mural_posts").insert({
        ...payload,
        created_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["mural_posts"]
      });
      setOpen(false);
      setForm(emptyForm);
      setEditingPost(null);
      toast.success(editingPost ? "Post-it atualizado." : "Post-it publicado no mural.");
    },
    onError: (error) => toast.error(error.message)
  });
  const updateChecklist = useMutation({
    mutationFn: async ({
      post,
      index
    }) => {
      const checklist = post.checklist.map((item, itemIndex) => itemIndex === index ? {
        ...item,
        done: !item.done
      } : item);
      const {
        error
      } = await supabase.from("mural_posts").update({
        checklist
      }).eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["mural_posts"]
    }),
    onError: (error) => toast.error(error.message)
  });
  const removePost = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("mural_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["mural_posts"]
      });
      toast.success("Post-it removido.");
    },
    onError: (error) => toast.error(error.message)
  });
  const setPostCompleted = useMutation({
    mutationFn: async ({
      id,
      completed
    }) => {
      const {
        error
      } = await supabase.from("mural_posts").update({
        completed_at: completed ? (/* @__PURE__ */ new Date()).toISOString() : null
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["mural_posts"]
    }),
    onError: (error) => toast.error(error.message)
  });
  const saveOrder = useMutation({
    mutationFn: async (postIds) => {
      if (!user) return;
      const {
        error
      } = await supabase.from("mural_post_orders").upsert(postIds.map((postId, position) => ({
        user_id: user.id,
        post_id: postId,
        position
      })), {
        onConflict: "user_id,post_id"
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["mural_post_orders", user?.id]
    }),
    onError: (error) => toast.error(error.message)
  });
  const postCountLabel = reactExports.useMemo(() => `${posts.length} post-it${posts.length === 1 ? "" : "s"} no mural`, [posts.length]);
  const orderedPosts = reactExports.useMemo(() => {
    const positions = new Map(storedOrders.map((order2) => [order2.post_id, order2.position]));
    const order = localOrder.length > 0 ? new Map(localOrder.map((id, index) => [id, index])) : positions;
    return posts.filter((post) => showCompleted ? !!post.completed_at : !post.completed_at).sort((a, b) => {
      const aPosition = order.get(a.id);
      const bPosition = order.get(b.id);
      if (aPosition !== void 0 && bPosition !== void 0) return aPosition - bPosition;
      if (aPosition !== void 0) return -1;
      if (bPosition !== void 0) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [posts, storedOrders, localOrder, showCompleted]);
  const openNewPost = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setOpen(true);
  };
  const openEditPost = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      content: post.content ?? "",
      tag: post.tag ?? "",
      imageUrl: post.image_url ?? "",
      checklist: post.checklist.map((item) => item.text).join("\n"),
      color: post.color
    });
    setOpen(true);
  };
  const movePost = (targetId) => {
    if (!draggingId || draggingId === targetId) return;
    const ids = orderedPosts.map((post) => post.id);
    const from = ids.indexOf(draggingId);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    ids.splice(from, 1);
    ids.splice(to, 0, draggingId);
    setLocalOrder(ids);
    saveOrder.mutate(ids);
  };
  const uploadFiles = async (post, files) => {
    if (!user || files.length === 0) return;
    setUploadingPostId(post.id);
    try {
      for (const file of Array.from(files)) {
        const safeName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
        const path = `mural/${post.id}/${crypto.randomUUID()}-${safeName}`;
        const {
          error: uploadError
        } = await supabase.storage.from("mural-attachments").upload(path, file);
        if (uploadError) throw uploadError;
        const {
          error: insertError
        } = await supabase.from("mural_post_attachments").insert({
          post_id: post.id,
          file_name: file.name,
          storage_path: path,
          mime_type: file.type || null,
          size_bytes: file.size,
          uploaded_by: user.id
        });
        if (insertError) {
          await supabase.storage.from("mural-attachments").remove([path]);
          throw insertError;
        }
      }
      qc.invalidateQueries({
        queryKey: ["mural_post_attachments"]
      });
      toast.success("Anexo adicionado ao post-it.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploadingPostId(null);
    }
  };
  const downloadAttachment = async (attachment) => {
    const {
      data,
      error
    } = await supabase.storage.from("mural-attachments").createSignedUrl(attachment.storage_path, 60);
    if (error || !data) return toast.error(error?.message ?? "Não foi possível baixar o anexo.");
    const response = await fetch(data.signedUrl);
    if (!response.ok) return toast.error("Não foi possível baixar o anexo.");
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.file_name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 3e4);
  };
  const deleteAttachment = async (attachment) => {
    if (!confirm(`Excluir "${attachment.file_name}"?`)) return;
    const {
      error: storageError
    } = await supabase.storage.from("mural-attachments").remove([attachment.storage_path]);
    if (storageError) return toast.error(storageError.message);
    const {
      error
    } = await supabase.from("mural_post_attachments").delete().eq("id", attachment.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["mural_post_attachments"]
    });
    toast.success("Anexo excluído.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Mural" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Ideias, lembretes e comunicados compartilhados pela equipe. ",
          postCountLabel,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: showCompleted ? "secondary" : "outline", onClick: () => setShowCompleted((current) => !current), children: [
          showCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
          showCompleted ? "Post-its em aberto" : "Post-its concluídos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (next) => {
          setOpen(next);
          if (!next) setEditingPost(null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openNewPost, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Novo post-it"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90dvh] overflow-y-auto sm:max-w-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingPost ? "Editar post-it" : "Novo post-it" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingPost ? "Atualize o recado compartilhado com a equipe." : "Crie um aviso visual para o mural da equipe." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Título" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (event) => setForm({
                  ...form,
                  title: event.target.value
                }), placeholder: "Ex.: Ideias para a próxima reunião" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Mensagem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.content, onChange: (event) => setForm({
                  ...form,
                  content: event.target.value
                }), placeholder: "Escreva um recado para a equipe" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Etiqueta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.tag, onChange: (event) => setForm({
                    ...form,
                    tag: event.target.value
                  }), placeholder: "Ex.: Importante" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "h-9 w-full rounded-md border bg-background px-3 text-sm", value: form.color, onChange: (event) => setForm({
                    ...form,
                    color: event.target.value
                  }), children: COLORS.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: color.value, children: color.label }, color.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Checklist ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(um item por linha)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.checklist, onChange: (event) => setForm({
                  ...form,
                  checklist: event.target.value
                }), placeholder: "Preparar pauta\nConfirmar participantes" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Imagem ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(link opcional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "url", value: form.imageUrl, onChange: (event) => setForm({
                  ...form,
                  imageUrl: event.target.value
                }), placeholder: "https://..." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: savePost.isPending, onClick: () => savePost.mutate(), children: savePost.isPending ? "Salvando..." : editingPost ? "Salvar alterações" : "Publicar post-it" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-sm text-muted-foreground", children: "Carregando mural..." }) : orderedPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-72 place-items-center rounded-2xl border border-dashed bg-card/60 p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: showCompleted ? "Nenhum post-it concluído" : "O mural está pronto para começar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: showCompleted ? "Os post-its concluídos aparecerão aqui." : "Publique o primeiro post-it para compartilhar uma ideia ou recado." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4", children: orderedPosts.map((post) => {
      const canEdit = isAdmin || post.created_by === user?.id;
      const postAttachments = attachments.filter((attachment) => attachment.post_id === post.id);
      const authorName = profiles.find((profile) => profile.id === post.created_by)?.full_name ?? "Usuário";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { draggable: true, onDragStart: () => setDraggingId(post.id), onDragEnd: () => setDraggingId(null), onDragOver: (event) => event.preventDefault(), onDrop: () => movePost(post.id), className: `group mb-4 break-inside-avoid overflow-hidden rounded-md p-4 shadow-[0_5px_10px_-5px_rgb(0_0_0_/_0.38)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_14px_-6px_rgb(0_0_0_/_0.44)] ${draggingId === post.id ? "opacity-45" : ""} ${colorClass(post.color)}`, children: [
        post.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.image_url, alt: "", className: "-mx-4 -mt-4 mb-4 h-36 w-[calc(100%+2rem)] object-cover", onError: (event) => {
          event.currentTarget.style.display = "none";
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "min-w-0 flex-1 text-base font-bold leading-snug", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 shrink-0 cursor-grab opacity-45", "aria-label": "Arraste para mover" }),
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mr-2 -mt-2 flex opacity-0 transition-opacity group-hover:opacity-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => setPostCompleted.mutate({
              id: post.id,
              completed: !post.completed_at
            }), title: post.completed_at ? "Reabrir post-it" : "Concluir post-it", children: post.completed_at ? /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => openEditPost(post), title: "Editar post-it", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7", onClick: () => removePost.mutate(post.id), title: "Remover post-it", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }),
        post.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85", children: post.content }),
        post.checklist.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: post.checklist.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-2 text-sm ${canEdit ? "cursor-pointer" : "cursor-default"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { disabled: !canEdit, checked: item.done, onCheckedChange: () => updateChecklist.mutate({
            post,
            index
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: item.done ? "text-muted-foreground line-through" : "", children: item.text })
        ] }, `${post.id}-${index}`)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(FileDropZone, { onFiles: (files) => uploadFiles(post, files), disabled: uploadingPostId === post.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-foreground/25 bg-background/20 px-2 py-2 text-xs font-medium hover:bg-background/35", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
            uploadingPostId === post.id ? "Enviando..." : "Anexar arquivo",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "sr-only", type: "file", multiple: true, onChange: (event) => {
              if (event.target.files) void uploadFiles(post, event.target.files);
              event.currentTarget.value = "";
            } })
          ] }) }),
          postAttachments.map((attachment) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded bg-background/45 px-2 py-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", title: attachment.file_name, children: attachment.file_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => void downloadAttachment(attachment), title: "Baixar anexo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }) }),
            canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-6 w-6", onClick: () => void deleteAttachment(attachment), title: "Excluir anexo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] }, attachment.id))
        ] }),
        !post.image_url && !post.content && post.checklist.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "mt-8 h-5 w-5 opacity-25" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-2", children: [
          post.tag ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded bg-background/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", children: post.tag }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-right text-[10px] font-medium text-foreground/60", children: [
            "Por ",
            authorName
          ] })
        ] })
      ] }, post.id);
    }) })
  ] });
}
export {
  MuralPage as component
};
