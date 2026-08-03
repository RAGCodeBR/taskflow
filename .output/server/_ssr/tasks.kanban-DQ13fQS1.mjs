import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useSensors, d as useSensor, D as DndContext, e as DragOverlay, P as PointerSensor, f as closestCenter, p as pointerWithin, r as rectIntersection, h as getFirstCollision, T as TouchSensor, a as useDroppable } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, h as horizontalListSortingStrategy, v as verticalListSortingStrategy, a as arrayMove, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DM4Ewr_J.mjs";
import { g as Dialog$1, D as DialogPortal, a as DialogContent$1, d as DialogClose, b as DialogTitle$1, c as DialogDescription, f as DialogOverlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { u as useAuth, f as useTasks, h as useColumns, t as useUserColumnOrder, v as useUserTaskOrder, e as useClients, g as useProfiles, i as useTaskTags, j as useTaskStatuses, s as useTaskCollaborators, r as useSubtasks, w as useTaskTagLinks, B as Button, I as Input, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, o as cn, L as Label } from "./router-DXKzFnT6.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AttachmentPreviewDialog } from "./AttachmentPreviewDialog-BrAtk_dg.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as SubTrigger2, a as SubContent2, b as CheckboxItem2, c as ItemIndicator2, d as RadioItem2, L as Label2, e as Separator2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.mjs";
import { d as Textarea } from "./tabs-D14-kHfb.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, R as RichTextView, c as RichTextEditor } from "./RichTextEditor-BdSq1KNI.mjs";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cs2p32WM.mjs";
import { a as applyTaskFilters, T as TaskFilters, b as TaskDialog } from "./TaskDialog-BFwzVxA1.mjs";
import "../_libs/tiptap__starter-kit.mjs";
import "../_libs/tiptap__extension-link.mjs";
import "../_libs/tiptap__extension-highlight.mjs";
import { a5 as FileDown, at as FolderOpen, P as Plus, au as Rows2, av as Columns2, d as PanelsTopLeft, aw as PanelTop, a1 as ArrowUp, a2 as ArrowDown, ax as Settings2, ay as GripVertical, az as EllipsisVertical, b as Pencil, T as Trash2, U as Users, A as CircleCheck, an as Copy, aA as Ellipsis, aq as Clock3, o as Calendar, n as Check, aB as Tag, j as ChevronDown, am as ChevronRight, c as ListChecks, as as Link2, Z as FileText, X, aC as Flag, aD as History, ac as User, aE as TextAlignStart, _ as Upload, a3 as Paperclip, E as ExternalLink, aF as EyeOff, aG as Eye, aa as Zap, a8 as Save, aH as Circle } from "../_libs/lucide-react.mjs";
import { a as format, p as ptBR } from "../_libs/date-fns.mjs";

import "../_libs/react-dom.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/tiptap__react.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/tiptap__core.mjs";
import "../_libs/prosemirror-transform.mjs";
import "../_libs/prosemirror-model.mjs";
import "../_libs/orderedmap.mjs";
import "../_libs/prosemirror-commands.mjs";
import "../_libs/prosemirror-state.mjs";
import "../_libs/prosemirror-schema-list.mjs";
import "../_libs/prosemirror-view.mjs";
import "../_libs/prosemirror-keymap.mjs";
import "../_libs/w3c-keyname.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "./checkbox-D8t29Ars.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "./badge-BTBDGtvX.mjs";
import "./task-utils-DZ472SbJ.mjs";
import "../_libs/tiptap__extension-blockquote.mjs";
import "../_libs/tiptap__extension-bold.mjs";
import "../_libs/tiptap__extension-code.mjs";
import "../_libs/tiptap__extension-code-block.mjs";
import "../_libs/tiptap__extension-document.mjs";
import "../_libs/tiptap__extension-hard-break.mjs";
import "../_libs/tiptap__extension-heading.mjs";
import "../_libs/@tiptap/extension-horizontal-rule+[...].mjs";
import "../_libs/tiptap__extension-italic.mjs";
import "../_libs/tiptap__extension-list.mjs";
import "../_libs/tiptap__extension-paragraph.mjs";
import "../_libs/tiptap__extension-strike.mjs";
import "../_libs/tiptap__extension-text.mjs";
import "../_libs/tiptap__extension-underline.mjs";
import "../_libs/tiptap__extensions.mjs";
import "../_libs/prosemirror-dropcursor.mjs";
import "../_libs/prosemirror-gapcursor.mjs";
import "../_libs/prosemirror-history.mjs";
import "../_libs/rope-sequence.mjs";
import "../_libs/linkifyjs.mjs";
const Sheet = Dialog$1;
const SheetPortal = DialogPortal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogOverlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent$1, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogContent$1.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogTitle$1.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogDescription.displayName;
const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;
const sb = supabase;
function ClientFilesSheet({
  open,
  onOpenChange,
  initialClientId
}) {
  const { user } = useAuth();
  const { data: clients = [] } = useClients();
  const [clientId, setClientId] = reactExports.useState(initialClientId ?? null);
  const [files, setFiles] = reactExports.useState([]);
  const [urls, setUrls] = reactExports.useState({});
  const [uploading, setUploading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (initialClientId) setClientId(initialClientId);
  }, [initialClientId]);
  reactExports.useEffect(() => {
    if (open && !clientId && clients[0]) setClientId(clients[0].id);
  }, [open, clients, clientId]);
  const load = async (cid) => {
    const { data, error } = await sb.from("client_files").select("*").eq("client_id", cid).order("position", { ascending: true }).order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setFiles(list);
    const next = {};
    await Promise.all(list.map(async (f) => {
      const { data: signed } = await supabase.storage.from("task-attachments").createSignedUrl(f.storage_path, 3600);
      if (signed) next[f.id] = signed.signedUrl;
    }));
    setUrls(next);
  };
  reactExports.useEffect(() => {
    if (open && clientId) void load(clientId);
  }, [open, clientId]);
  const onUpload = async (fl) => {
    if (!fl || !fl.length || !user || !clientId) return;
    setUploading(true);
    const startPos = files.length;
    let i = 0;
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `clients/${clientId}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) {
        toast.error(upErr.message);
        continue;
      }
      const { error: insErr } = await sb.from("client_files").insert({
        client_id: clientId,
        title: file.name,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id,
        position: startPos + i
      });
      if (insErr) toast.error(insErr.message);
      i++;
    }
    setUploading(false);
    if (clientId) void load(clientId);
  };
  const updateTitle = async (id, title) => {
    setFiles((curr) => curr.map((f) => f.id === id ? { ...f, title } : f));
    const { error } = await sb.from("client_files").update({ title }).eq("id", id);
    if (error) toast.error(error.message);
  };
  const remove = async (f) => {
    if (!confirm(`Excluir "${f.title || f.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([f.storage_path]);
    await sb.from("client_files").delete().eq("id", f.id);
    if (clientId) void load(clientId);
  };
  const move = async (id, dir) => {
    const idx = files.findIndex((f) => f.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= files.length) return;
    const next = [...files];
    [next[idx], next[swap]] = [next[swap], next[idx]];
    const reIndexed = next.map((f, i) => ({ ...f, position: i }));
    setFiles(reIndexed);
    await Promise.all(
      reIndexed.map((f) => sb.from("client_files").update({ position: f.position }).eq("id", f.id))
    );
  };
  const openFile = (f) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
    if (canPreview) {
      setPreview({ file_name: f.title || f.file_name, storage_path: f.storage_path, mime_type: f.mime_type });
      return;
    }
    const u = urls[f.id];
    if (u) window.open(u, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "flex w-full max-w-2xl flex-col p-0 sm:max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "border-b px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
        " Arquivos do cliente"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Apenas arquivos. Defina título e reordene com as setas. Aceita qualquer tipo." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: clientId ?? void 0, onValueChange: (v) => setClientId(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione um cliente" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            multiple: true,
            accept: "*/*",
            className: "hidden",
            onChange: (e) => void onUpload(e.target.files),
            disabled: !clientId
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-muted", children: uploading ? "Enviando…" : "+ Adicionar arquivo" })
      ] }),
      clientId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "ml-auto text-xs text-muted-foreground", children: [
        files.length,
        " arquivo(s)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: !clientId ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-6 text-center text-sm text-muted-foreground", children: "Selecione um cliente para ver e gerenciar arquivos." }) : files.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-6 text-center text-sm text-muted-foreground", children: "Nenhum arquivo enviado para este cliente." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: files.map((f, i) => {
      const isImage = f.mime_type?.startsWith("image/");
      const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-lg border bg-card p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "h-6 w-6",
              onClick: () => void move(f.id, -1),
              disabled: i === 0,
              title: "Mover para cima",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              className: "h-6 w-6",
              onClick: () => void move(f.id, 1),
              disabled: i === files.length - 1,
              title: "Mover para baixo",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => openFile(f),
            className: "h-14 w-14 shrink-0 overflow-hidden rounded border bg-muted",
            title: f.file_name,
            children: isImage && urls[f.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: urls[f.id], alt: f.file_name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: canPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-5 w-5" }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: f.title ?? "",
              onChange: (e) => setFiles((curr) => curr.map((x) => x.id === f.id ? { ...x, title: e.target.value } : x)),
              onBlur: (e) => void updateTitle(f.id, e.target.value),
              placeholder: "Título do arquivo",
              className: "h-7 text-sm"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] text-muted-foreground", title: f.file_name, children: f.file_name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => openFile(f),
            title: "Abrir",
            children: "Abrir"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            variant: "ghost",
            className: "h-8 w-8 text-destructive",
            onClick: () => void remove(f),
            title: "Excluir",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ] }, f.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AttachmentPreviewDialog,
      {
        open: !!preview,
        onOpenChange: (o) => {
          if (!o) setPreview(null);
        },
        attachment: preview
      }
    )
  ] }) });
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const ALL_FIELDS = [
  "tags",
  "description",
  "comments",
  "subtasks",
  "attachments",
  "interruptions",
  "priority",
  "due",
  "createdAt",
  "meta"
];
const FIELD_LABELS = {
  tags: "Etiquetas",
  description: "Descrição",
  comments: "Observações (seções dobráveis)",
  subtasks: "Subtarefas",
  attachments: "Arquivos externos",
  interruptions: "Interrupções",
  priority: "Prioridade",
  due: "Prazo",
  createdAt: "Data de criação",
  meta: "Responsável e ações rápidas"
};
const DEFAULT_ORDER = [
  "tags",
  "description",
  "comments",
  "subtasks",
  "attachments",
  "interruptions",
  "priority",
  "due",
  "createdAt",
  "meta"
];
const DEFAULT_PREFS = {
  field_order: DEFAULT_ORDER,
  hidden_fields: [],
  interruption_color: "#ef4444",
  kanban_orientation: "vertical"
};
function migrateChips(fields) {
  const out = [];
  const push = (x) => {
    if (!out.includes(x)) out.push(x);
  };
  for (const f of fields) {
    if (f === "chips") {
      ["priority", "due", "createdAt"].forEach(push);
    } else if (f === "due") {
      ["due", "createdAt"].forEach(push);
    } else if (ALL_FIELDS.includes(f)) {
      push(f);
    }
  }
  return out;
}
function normalize(prefs) {
  const rawOrder = Array.isArray(prefs?.field_order) ? prefs.field_order : [];
  const order = migrateChips(rawOrder);
  const merged = [...order, ...DEFAULT_ORDER.filter((f) => !order.includes(f))];
  const rawHidden = Array.isArray(prefs?.hidden_fields) ? prefs.hidden_fields : [];
  return {
    field_order: merged,
    hidden_fields: migrateChips(rawHidden),
    interruption_color: prefs?.interruption_color || DEFAULT_PREFS.interruption_color,
    kanban_orientation: prefs?.kanban_orientation === "horizontal" ? "horizontal" : "vertical"
  };
}
function useBoardPreferences() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useQuery({
    queryKey: ["board_preferences", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return DEFAULT_PREFS;
      const { data } = await supabase.from("board_preferences").select("field_order, hidden_fields, interruption_color, kanban_orientation").eq("user_id", user.id).maybeSingle();
      const raw = data;
      const normalized = normalize(raw);
      const rawOrder = Array.isArray(raw?.field_order) ? raw.field_order : [];
      const rawHidden = Array.isArray(raw?.hidden_fields) ? raw.hidden_fields : [];
      const orderChanged = rawOrder.length !== normalized.field_order.length || rawOrder.some((v, i) => v !== normalized.field_order[i]);
      const hiddenChanged = rawHidden.length !== normalized.hidden_fields.length || rawHidden.some((v, i) => v !== normalized.hidden_fields[i]);
      if (raw && (orderChanged || hiddenChanged)) {
        void supabase.from("board_preferences").upsert({ user_id: user.id, ...normalized }, { onConflict: "user_id" }).then(() => {
          qc.setQueryData(["board_preferences", user.id], normalized);
        });
      }
      return normalized;
    }
  });
}
function useUpdateBoardPreferences() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (patch) => {
      if (!user) throw new Error("not authenticated");
      const current = qc.getQueryData(["board_preferences", user.id]) ?? DEFAULT_PREFS;
      const next = { ...current, ...patch };
      const { error } = await supabase.from("board_preferences").upsert({ user_id: user.id, ...next }, { onConflict: "user_id" });
      if (error) throw error;
      return next;
    },
    onMutate: async (patch) => {
      if (!user) return;
      const key = ["board_preferences", user.id];
      const prev = qc.getQueryData(key) ?? DEFAULT_PREFS;
      qc.setQueryData(key, { ...prev, ...patch });
    },
    onSettled: () => {
      if (user) qc.invalidateQueries({ queryKey: ["board_preferences", user.id] });
    }
  });
}
function useTaskInterruptions(taskId) {
  return useQuery({
    queryKey: ["task_interruptions", taskId],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_interruptions").select("id, task_id, reason, created_at").eq("task_id", taskId).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function readableText$1(hex) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1e3 >= 160 ? "#0a0a0a" : "#ffffff";
}
function stop$1(e) {
  e.stopPropagation();
}
function InterruptionsBlock({ task, color }) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const { data: items = [] } = useTaskInterruptions(task.id);
  const [open, setOpen] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [reason, setReason] = reactExports.useState("");
  const [editingId, setEditingId] = reactExports.useState(null);
  const [editDraft, setEditDraft] = reactExports.useState("");
  const count = items.length || task.interruptions || 0;
  const fg = readableText$1(color);
  async function save() {
    if (!user) return;
    const trimmed = reason.trim();
    const { error } = await supabase.from("task_interruptions").insert({ task_id: task.id, user_id: user.id, reason: trimmed });
    if (error) {
      toast.error("Erro ao registrar");
      return;
    }
    setReason("");
    setDialogOpen(false);
    setOpen(true);
    qc.invalidateQueries({ queryKey: ["task_interruptions", task.id] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
  }
  async function remove(id) {
    if (!window.confirm("Excluir esta interrupção?")) return;
    const { error } = await supabase.from("task_interruptions").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao remover");
      return;
    }
    qc.invalidateQueries({ queryKey: ["task_interruptions", task.id] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
  }
  async function saveEdit(id) {
    const { error } = await supabase.from("task_interruptions").update({ reason: editDraft.trim() }).eq("id", id);
    if (error) {
      toast.error("Erro ao salvar");
      return;
    }
    setEditingId(null);
    qc.invalidateQueries({ queryKey: ["task_interruptions", task.id] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { open, onOpenChange: setOpen, className: "rounded border border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onPointerDown: stop$1,
            onClick: stop$1,
            className: "flex min-w-0 flex-1 items-center gap-1.5 px-1.5 py-0.5 text-left text-[10px] text-muted-foreground hover:text-foreground",
            children: [
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-2.5 w-2.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2 w-2 rounded-full", style: { background: color } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5", style: { color } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Interrupções" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 font-semibold", style: { color }, children: count })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onPointerDown: stop$1,
            onClick: (e) => {
              stop$1(e);
              setDialogOpen(true);
            },
            className: "rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground",
            title: "Registrar interrupção",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-2.5 w-2.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-1.5 text-[10px] text-muted-foreground", children: "Sem interrupções registradas." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y border-t", children: items.map((it) => {
        const isEditing = editingId === it.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group/it flex items-start gap-2 px-2 py-1.5 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[9px] text-muted-foreground", title: format(new Date(it.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }), children: format(new Date(it.created_at), "dd/MM HH:mm", { locale: ptBR }) }),
          isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: editDraft,
              autoFocus: true,
              onChange: (e) => setEditDraft(e.target.value),
              onPointerDown: stop$1,
              onClick: stop$1,
              onKeyDown: (e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void saveEdit(it.id);
                }
                if (e.key === "Escape") setEditingId(null);
              },
              className: "min-h-[40px] flex-1 resize-none p-1 text-[11px] leading-snug"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onPointerDown: stop$1,
              onClick: (e) => {
                stop$1(e);
                setEditingId(it.id);
                setEditDraft(it.reason);
              },
              className: "flex-1 cursor-text whitespace-pre-wrap text-left [overflow-wrap:anywhere] hover:text-primary",
              children: it.reason || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: "Sem motivo — clique para editar" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover/it:opacity-100", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onPointerDown: stop$1, onClick: (e) => {
              stop$1(e);
              void saveEdit(it.id);
            }, className: "rounded p-0.5 text-success hover:bg-muted", title: "Salvar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onPointerDown: stop$1, onClick: (e) => {
              stop$1(e);
              setEditingId(null);
            }, className: "rounded p-0.5 hover:bg-muted", title: "Cancelar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onPointerDown: stop$1, onClick: (e) => {
              stop$1(e);
              setEditingId(it.id);
              setEditDraft(it.reason);
            }, className: "rounded p-0.5 hover:bg-muted", title: "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onPointerDown: stop$1, onClick: (e) => {
              stop$1(e);
              void remove(it.id);
            }, className: "rounded p-0.5 text-destructive hover:bg-destructive/10", title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
          ] }) })
        ] }, it.id);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { onPointerDown: stop$1, onClick: stop$1, className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4", style: { color } }),
        "Registrar interrupção"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: reason,
          autoFocus: true,
          onChange: (e) => setReason(e.target.value),
          placeholder: "Por que você parou? (opcional)",
          className: "min-h-[90px] text-sm",
          onKeyDown: (e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              void save();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setDialogOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => void save(), style: { background: color, color: fg }, children: "Registrar" })
      ] })
    ] }) })
  ] });
}
const LINK_MIME = "text/uri-list";
const DESCRIPTION_COLLAPSED_LIMIT = 140;
const DEFAULT_DEADLINE_TIME = "12:00";
const formatDueTime = (time) => time?.slice(0, 5) ?? null;
const PRIORITY_LABELS = {
  low: { label: "Baixa", color: "#64748b" },
  medium: { label: "Média", color: "#3b82f6" },
  high: { label: "Alta", color: "#f59e0b" },
  urgent: { label: "Urgente", color: "#ef4444" }
};
function stop(e) {
  e.stopPropagation();
}
function readableText(hex) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
  return yiq >= 160 ? "#0a0a0a" : "#ffffff";
}
function TaskCard({
  task,
  columns = [],
  clients = [],
  profiles = [],
  tags = [],
  statuses = [],
  collaborators = [],
  onEdit,
  onDuplicate,
  dragHandleProps,
  minimal = false
}) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const fileRef = reactExports.useRef(null);
  const descTextareaRef = reactExports.useRef(null);
  const [attachments, setAttachments] = reactExports.useState([]);
  const [thumbs, setThumbs] = reactExports.useState({});
  const [titleEditing, setTitleEditing] = reactExports.useState(false);
  const [titleDraft, setTitleDraft] = reactExports.useState(task.title);
  const [descEditing, setDescEditing] = reactExports.useState(false);
  const [descDraft, setDescDraft] = reactExports.useState(task.description ?? "");
  const [descriptionExpanded, setDescriptionExpanded] = reactExports.useState(false);
  const [collaboratorsOpen, setCollaboratorsOpen] = reactExports.useState(false);
  const [previewAttachment, setPreviewAttachment] = reactExports.useState(null);
  const [tagIds, setTagIds] = reactExports.useState([]);
  const [subtasks, setSubtasks] = reactExports.useState([]);
  const [comments, setComments] = reactExports.useState([]);
  const [openComments, setOpenComments] = reactExports.useState({});
  const [editingCommentId, setEditingCommentId] = reactExports.useState(null);
  const [commentDraft, setCommentDraft] = reactExports.useState("");
  const [editingSubtaskId, setEditingSubtaskId] = reactExports.useState(null);
  const [subtaskDraft, setSubtaskDraft] = reactExports.useState("");
  const canDeleteSubtask = (subtask) => !!isAdmin || subtask.assignee_id !== user?.id || task.created_by === user?.id;
  const [newSubtask, setNewSubtask] = reactExports.useState("");
  const [addingSubtask, setAddingSubtask] = reactExports.useState(false);
  const [commentSubtaskDraft, setCommentSubtaskDraft] = reactExports.useState({});
  const [dueChange, setDueChange] = reactExports.useState({ open: false, pending: null, pendingTime: null, reason: "" });
  const [historyOpen, setHistoryOpen] = reactExports.useState(false);
  const { data: dueHistory = [] } = useQuery({
    queryKey: ["task_due_date_changes", task.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("task_due_date_changes").select("id, old_due_date, new_due_date, reason, created_at, user_id").eq("task_id", task.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: historyOpen
  });
  const { data: prefs } = useBoardPreferences();
  const hiddenFields = prefs?.hidden_fields ?? [];
  const fieldOrder = prefs?.field_order ?? [];
  const interruptionColor = prefs?.interruption_color ?? "#ef4444";
  const isVisible = (f) => !hiddenFields.includes(f);
  const orderOf = (f) => {
    const idx = fieldOrder.indexOf(f);
    return idx === -1 ? 999 : idx;
  };
  const subtasksTitleKey = `subtasks-title:${task.id}`;
  const subtasksOpenKey = `subtasks-open:${task.id}`;
  const [subtasksTitle, setSubtasksTitle] = reactExports.useState(() => {
    if (typeof window === "undefined") return "Subtarefas";
    return window.localStorage.getItem(subtasksTitleKey) || "Subtarefas";
  });
  const [subtasksOpen, setSubtasksOpen] = reactExports.useState(() => {
    if (typeof window === "undefined") return true;
    const v = window.localStorage.getItem(subtasksOpenKey);
    return v === null ? true : v === "1";
  });
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(subtasksOpenKey, subtasksOpen ? "1" : "0");
  }, [subtasksOpen, subtasksOpenKey]);
  const renameSubtasksTitle = () => {
    const next = window.prompt("Título da seção de subtarefas", subtasksTitle)?.trim();
    if (!next) return;
    setSubtasksTitle(next);
    if (typeof window !== "undefined") window.localStorage.setItem(subtasksTitleKey, next);
  };
  reactExports.useEffect(() => setTitleDraft(task.title), [task.title]);
  reactExports.useEffect(() => setDescDraft(task.description ?? ""), [task.description]);
  reactExports.useEffect(() => setDescriptionExpanded(false), [task.id]);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("attachments").select("*").eq("task_id", task.id).order("created_at", { ascending: true });
      if (cancelled) return;
      const list = data ?? [];
      setAttachments(list);
      const next = {};
      await Promise.all(
        list.filter((a) => a.mime_type !== LINK_MIME && (a.mime_type?.startsWith("image/") ?? false)).map(async (a) => {
          const { data: signed } = await supabase.storage.from("task-attachments").createSignedUrl(a.storage_path, 3600);
          if (signed) next[a.id] = signed.signedUrl;
        })
      );
      if (!cancelled) setThumbs(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [task.id]);
  const [subsRefreshTick, setSubsRefreshTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const cache = qc.getQueryCache();
    const unsub = cache.subscribe((event) => {
      if (event?.type !== "updated") return;
      const key = event.query?.queryKey?.[0];
      if (key === "subtasks" || key === "tasks") {
        setSubsRefreshTick((n) => n + 1);
      }
    });
    return () => unsub();
  }, [qc]);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ data: links }, { data: subs }, { data: notes }] = await Promise.all([
        supabase.from("task_tag_links").select("tag_id").eq("task_id", task.id),
        supabase.from("subtasks").select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id").eq("task_id", task.id).order("position"),
        supabase.from("comments").select("id, task_id, title, body, created_at, position").eq("task_id", task.id).order("position", { ascending: true }).order("created_at", { ascending: true })
      ]);
      if (cancelled) return;
      setTagIds((links ?? []).map((l) => l.tag_id));
      setSubtasks(subs ?? []);
      setComments(notes ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [task.id, subsRefreshTick]);
  const selectedTags = reactExports.useMemo(
    () => tagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean),
    [tagIds, tags]
  );
  const client = reactExports.useMemo(() => clients.find((c) => c.id === task.client_id), [clients, task.client_id]);
  const assignee = reactExports.useMemo(
    () => profiles.find((p) => p.id === task.assignee_id),
    [profiles, task.assignee_id]
  );
  const taskCollaborators = reactExports.useMemo(
    () => collaborators.filter((collaborator) => collaborator.task_id === task.id).map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id)).filter((profile) => Boolean(profile)),
    [collaborators, profiles, task.id]
  );
  const taskPeople = reactExports.useMemo(
    () => [assignee, ...taskCollaborators].filter(
      (profile, index, people) => Boolean(profile) && people.findIndex((person) => person?.id === profile?.id) === index
    ),
    [assignee, taskCollaborators]
  );
  const toggleCollaborator = async (collaboratorId) => {
    const existing = collaborators.find(
      (collaborator) => collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId
    );
    const queryKey = ["task_collaborators"];
    if (existing) {
      const { error } = await supabase.from("task_collaborators").delete().eq("task_id", task.id).eq("collaborator_id", collaboratorId);
      if (error) return toast.error(error.message);
      qc.setQueryData(
        queryKey,
        (current = []) => current.filter((collaborator) => !(collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId))
      );
    } else {
      const { data, error } = await supabase.from("task_collaborators").insert({ task_id: task.id, collaborator_id: collaboratorId, added_by: user?.id ?? null }).select("task_id, collaborator_id, added_by, created_at").single();
      if (error) return toast.error(error.message);
      qc.setQueryData(queryKey, (current = []) => [...current, data]);
    }
    qc.invalidateQueries({ queryKey });
  };
  const creator = reactExports.useMemo(
    () => profiles.find((p) => p.id === task.created_by),
    [profiles, task.created_by]
  );
  const assigner = reactExports.useMemo(
    () => profiles.find((p) => p.id === task.assigned_by),
    [profiles, task.assigned_by]
  );
  const update = async (patch) => {
    const { error } = await supabase.from("tasks").update(patch).eq("id", task.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    void qc.invalidateQueries({ queryKey: ["tasks"] });
  };
  const saveTitle = async () => {
    const next = titleDraft.trim() || "Sem título";
    setTitleEditing(false);
    if (next === task.title) return;
    await update({ title: next });
  };
  const saveDesc = async () => {
    setDescEditing(false);
    const next = descDraft.trim();
    const current = task.description ?? "";
    if (next === current) return;
    await update({ description: next || null });
  };
  const uploadFile = async (file) => {
    if (!user) return;
    const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_").slice(-120) || "arquivo";
    const path = `${task.id}/${Date.now()}-${safe}`;
    const contentType = file.type || "application/octet-stream";
    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file, { contentType, upsert: false });
    if (upErr) {
      toast.error(upErr.message);
      return;
    }
    const { data, error } = await supabase.from("attachments").insert({
      task_id: task.id,
      file_name: file.name,
      storage_path: path,
      mime_type: contentType,
      size_bytes: file.size,
      uploaded_by: user.id
    }).select().single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const att = data;
    setAttachments((c) => [...c, att]);
    if (att.mime_type?.startsWith("image/")) {
      const { data: signed } = await supabase.storage.from("task-attachments").createSignedUrl(att.storage_path, 3600);
      if (signed) setThumbs((c) => ({ ...c, [att.id]: signed.signedUrl }));
    }
  };
  const deleteAttachment = async (a) => {
    if (a.mime_type !== LINK_MIME) {
      await supabase.storage.from("task-attachments").remove([a.storage_path]);
    }
    await supabase.from("attachments").delete().eq("id", a.id);
    setAttachments((c) => c.filter((x) => x.id !== a.id));
  };
  const openAttachment = (a) => {
    if (a.mime_type === LINK_MIME) {
      window.open(a.storage_path, "_blank", "noopener,noreferrer");
      return;
    }
    setPreviewAttachment(a);
  };
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const dueTime = formatDueTime(task.due_time);
  const dueHasTime = Boolean(dueTime);
  const dueMoment = dueDate && dueTime ? /* @__PURE__ */ new Date(`${format(dueDate, "yyyy-MM-dd")}T${dueTime}:00`) : dueDate;
  const dueLabel = dueDate ? `${format(dueDate, "dd MMM", { locale: ptBR })}${dueHasTime ? ` · ${dueTime}` : ""}` : null;
  const dueMeta = (() => {
    if (!dueDate || task.status === "done") {
      return { state: "none", label: "Prazo", days: 0, subtext: dueLabel ?? "Definir" };
    }
    const now = /* @__PURE__ */ new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const diffMs = startOfDue.getTime() - startOfToday.getTime();
    const diffDays = Math.round(diffMs / (1e3 * 60 * 60 * 24));
    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      return {
        state: "overdue",
        label: overdueDays === 1 ? "Atrasado 1 dia" : `Atrasado ${overdueDays} dias`,
        days: overdueDays,
        subtext: dueLabel
      };
    }
    if (diffDays === 0) {
      if (dueHasTime) {
        if (dueMoment && dueMoment.getTime() < now.getTime()) {
          const overdueHours = Math.max(1, Math.ceil((now.getTime() - dueMoment.getTime()) / 36e5));
          return {
            state: "overdue",
            label: overdueHours === 1 ? "Atrasado 1h" : `Atrasado ${overdueHours}h`,
            days: 0,
            subtext: dueLabel
          };
        }
        return {
          state: "today",
          label: `Vence às ${dueTime}`,
          days: 0,
          subtext: dueLabel
        };
      }
      return {
        state: "today",
        label: "Vence hoje",
        days: 0,
        subtext: dueLabel
      };
    }
    if (diffDays === 1) {
      return {
        state: "tomorrow",
        label: "Vence amanhã",
        days: 1,
        subtext: dueLabel
      };
    }
    if (diffDays <= 7) {
      return {
        state: "soon",
        label: `Vence em ${diffDays} dias`,
        days: diffDays,
        subtext: dueLabel
      };
    }
    return { state: "future", label: "Prazo", days: diffDays, subtext: dueLabel };
  })();
  const dueState = dueMeta.state;
  const dueChipClass = {
    overdue: "bg-destructive text-destructive-foreground font-bold shadow-sm ring-1 ring-destructive/40",
    today: "bg-destructive/90 text-destructive-foreground font-semibold shadow-sm ring-1 ring-destructive/30",
    tomorrow: "bg-amber-500 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/40",
    soon: "bg-amber-500/90 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/30",
    future: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30",
    none: "bg-muted text-muted-foreground"
  }[dueState];
  const computeSubtaskDue = (iso, done) => {
    if (!iso) return { label: "Sem prazo", cls: "bg-muted/60 text-muted-foreground border border-dashed border-muted-foreground/30", state: "none" };
    const d = new Date(iso);
    const dateLabel = format(d, "dd MMM", { locale: ptBR });
    if (done) return { label: dateLabel, cls: "bg-muted text-muted-foreground line-through", state: "done" };
    const now = /* @__PURE__ */ new Date();
    const s0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const s1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diff = Math.round((s1.getTime() - s0.getTime()) / 864e5);
    if (diff < 0) {
      const n = Math.abs(diff);
      return { label: n === 1 ? "Atrasado 1 dia" : `Atrasado ${n} dias`, cls: "bg-destructive text-destructive-foreground font-semibold ring-1 ring-destructive/40", state: "overdue" };
    }
    if (diff === 0) return { label: "Vence hoje", cls: "bg-destructive/90 text-destructive-foreground font-semibold ring-1 ring-destructive/30", state: "today" };
    if (diff === 1) return { label: "Vence amanhã", cls: "bg-amber-500 text-amber-950 font-semibold ring-1 ring-amber-500/40", state: "tomorrow" };
    if (diff <= 7) return { label: `Vence em ${diff} dias`, cls: "bg-amber-500/90 text-amber-950 font-semibold ring-1 ring-amber-500/30", state: "soon" };
    return { label: dateLabel, cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30", state: "future" };
  };
  const priority = task.priority ? PRIORITY_LABELS[task.priority] : null;
  const clientText = client?.color ? readableText(client.color) : "#fff";
  const toggleTag = async (tagId) => {
    const has = tagIds.includes(tagId);
    if (has) {
      const next = tagIds.filter((id) => id !== tagId);
      setTagIds(next);
      await supabase.from("task_tag_links").delete().eq("task_id", task.id).eq("tag_id", tagId);
      if (task.tag_id === tagId) {
        await update({ tag_id: next[0] ?? null });
      }
    } else {
      const next = [...tagIds, tagId];
      setTagIds(next);
      await supabase.from("task_tag_links").insert({ task_id: task.id, tag_id: tagId });
      if (!task.tag_id) await update({ tag_id: tagId });
    }
  };
  const addSubtask = async (commentId = null, titleOverride, dueOverride) => {
    const title = newSubtask.trim();
    if (!title) {
      setAddingSubtask(false);
      return;
    }
    const siblings = subtasks.filter((s) => (s.comment_id ?? null) === commentId);
    const { data, error } = await supabase.from("subtasks").insert({ task_id: task.id, title, position: siblings.length, comment_id: commentId, due_date: null }).select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id").single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setSubtasks((c) => [...c, data]);
    if (commentId === null) setNewSubtask("");
  };
  const toggleSubtask = async (s) => {
    const nextDone = !s.done;
    const nextCompleted = nextDone ? (/* @__PURE__ */ new Date()).toISOString() : null;
    setSubtasks((c) => c.map((x) => x.id === s.id ? { ...x, done: nextDone, completed_at: nextCompleted } : x));
    await supabase.from("subtasks").update({ done: nextDone }).eq("id", s.id);
  };
  const deleteSubtask = async (id) => {
    setSubtasks((c) => c.filter((x) => x.id !== id));
    await supabase.from("subtasks").delete().eq("id", id);
  };
  const startEditSubtask = (s) => {
    setEditingSubtaskId(s.id);
    setSubtaskDraft(s.title);
  };
  const saveSubtaskTitle = async () => {
    const id = editingSubtaskId;
    if (!id) return;
    const next = subtaskDraft.trim();
    setEditingSubtaskId(null);
    if (!next) return;
    setSubtasks((c) => c.map((x) => x.id === id ? { ...x, title: next } : x));
    const { error } = await supabase.from("subtasks").update({ title: next }).eq("id", id);
    if (error) toast.error(error.message);
  };
  const [subDueReason, setSubDueReason] = reactExports.useState({ open: false, subtask: null, prev: null, next: null, reason: "" });
  const applySubtaskDue = async (s, nextIso, reason) => {
    const prev = s.due_date;
    if (nextIso === prev) return;
    setSubtasks((c) => c.map((x) => x.id === s.id ? { ...x, due_date: nextIso } : x));
    const { error } = await supabase.from("subtasks").update({ due_date: nextIso }).eq("id", s.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (user) {
      await supabase.from("subtask_due_date_changes").insert({
        subtask_id: s.id,
        old_due_date: prev,
        new_due_date: nextIso,
        reason: reason?.trim() || null,
        user_id: user.id
      });
    }
  };
  const updateSubtaskDue = async (s, isoOrEmpty) => {
    const next = isoOrEmpty ? new Date(isoOrEmpty).toISOString() : null;
    if (next === s.due_date) return;
    if (s.due_date) {
      setSubDueReason({ open: true, subtask: s, prev: s.due_date, next, reason: "" });
      return;
    }
    await applySubtaskDue(s, next);
  };
  const updateSubtaskAssignee = async (s, value) => {
    const next = value === "none" ? null : value;
    if (next === s.assignee_id) return;
    setSubtasks((c) => c.map((x) => x.id === s.id ? { ...x, assignee_id: next } : x));
    const { error } = await supabase.from("subtasks").update({ assignee_id: next }).eq("id", s.id);
    if (error) toast.error(error.message);
  };
  const moveSubtaskInScope = async (id, dir, commentId) => {
    const scope = subtasks.filter((s) => (s.comment_id ?? null) === commentId).sort((a, b) => a.position - b.position);
    const idx = scope.findIndex((s) => s.id === id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= scope.length) return;
    const reordered = [...scope];
    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];
    const reindexed = reordered.map((s, i) => ({ ...s, position: i }));
    setSubtasks((c) => c.map((s) => {
      const upd = reindexed.find((r) => r.id === s.id);
      return upd ? { ...s, position: upd.position } : s;
    }));
    await Promise.all(
      reindexed.map((s) => supabase.from("subtasks").update({ position: s.position }).eq("id", s.id))
    );
  };
  const completedStatus = reactExports.useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);
  const completeTask = async () => {
    await update({
      status: "done",
      status_id: completedStatus?.id ?? task.status_id,
      completed_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    toast.success("Tarefa concluída");
  };
  const openDueChange = ({ dueDate: nextIso, dueTime: dueTime2 }) => {
    const oldIso = task.due_date ?? null;
    if (oldIso === nextIso && (task.due_time ?? null) === dueTime2) return;
    setDueChange({ open: true, pending: nextIso, pendingTime: dueTime2, reason: "" });
  };
  const confirmDueChange = async (skipReason = false) => {
    const nextIso = dueChange.pending;
    const oldIso = task.due_date ?? null;
    setDueChange({ open: false, pending: null, pendingTime: null, reason: "" });
    if (user && (oldIso || nextIso)) {
      await supabase.from("task_due_date_changes").insert({
        task_id: task.id,
        user_id: user.id,
        old_due_date: oldIso,
        new_due_date: nextIso,
        reason: skipReason ? null : dueChange.reason.trim() || null
      });
      void qc.invalidateQueries({ queryKey: ["task_due_date_changes", task.id] });
    }
    await update({ due_date: nextIso, due_time: dueChange.pendingTime });
  };
  if (minimal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...dragHandleProps, className: "group flex min-h-[132px] w-full cursor-grab touch-none flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing", title: task.title || "Sem título", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-7 items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider", style: client?.color ? { background: client.color, color: clientText } : void 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client?.name || "Sem cliente" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onPointerDown: stop, onClick: (event) => {
        stop(event);
        onEdit?.();
      }, className: "min-h-0 flex-1 px-2 py-1.5 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary", children: task.title || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sem título" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border-t px-1.5 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 shrink-0 text-success", onPointerDown: stop, onClick: (event) => {
          stop(event);
          void completeTask();
        }, title: "Concluir tarefa", "aria-label": "Concluir tarefa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 shrink-0", onPointerDown: stop, onClick: (event) => {
          stop(event);
          onDuplicate?.();
        }, title: "Duplicar tarefa", "aria-label": "Duplicar tarefa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }) }),
        taskPeople.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-0.5 flex min-w-0 flex-1 -space-x-1.5", title: "Responsável e colaboradores", children: [
          taskPeople.slice(0, 3).map((person) => {
            const name = person.full_name || person.email || "Usuário";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-6 w-6 border-2 border-card text-[8px]", title: name, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: person.avatar_url || void 0, alt: name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: name.slice(0, 2).toUpperCase() })
            ] }, person.id);
          }),
          taskPeople.length > 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 self-center text-[10px] text-muted-foreground", children: [
            "+",
            taskPeople.length - 3
          ] }) : null
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6 shrink-0", onPointerDown: stop, onClick: (event) => {
          stop(event);
          onEdit?.();
        }, title: "Editar tarefa", "aria-label": "Editar tarefa", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1 border-t px-2 py-1 text-[11px]", dueChipClass), children: [
        dueHasTime ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: dueLabel ? `Prazo: ${dueLabel}` : "Sem prazo" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ...dragHandleProps,
        className: cn(
          "group relative flex min-h-[460px] w-full cursor-grab touch-none flex-col overflow-visible rounded-lg border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing"
        ),
        children: [
          client?.color ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                "rounded-t-lg"
              ),
              style: { background: client.color, color: clientText },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client.name })
              ]
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-visible p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            isVisible("tags") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 -mx-1", style: { order: orderOf("tags") }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChipPopover,
              {
                value: selectedTags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-1", children: [
                  selectedTags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm",
                      style: {
                        background: t.color,
                        color: readableText(t.color),
                        boxShadow: `0 2px 8px -2px ${t.color}80`
                      },
                      children: t.name
                    },
                    t.id
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-md border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-2.5 w-2.5" }) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-2.5 w-2.5" }),
                  " Adicionar etiquetas"
                ] }),
                render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Etiquetas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-56 space-y-0.5 overflow-y-auto", children: tags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 py-1 text-[11px] text-muted-foreground", children: "Nenhuma etiqueta criada" }) : tags.map((t) => {
                  const checked = tagIds.includes(t.id);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => void toggleTag(t.id),
                      className: "flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"), children: checked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : null }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: { background: t.color } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.name })
                      ]
                    },
                    t.id
                  );
                }) }) })
              }
            ) }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-start justify-between gap-1", style: { order: -1 }, children: [
              titleEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: titleDraft,
                  autoFocus: true,
                  onChange: (e) => setTitleDraft(e.target.value),
                  onBlur: () => void saveTitle(),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void saveTitle();
                    }
                    if (e.key === "Escape") {
                      setTitleDraft(task.title);
                      setTitleEditing(false);
                    }
                  },
                  onPointerDown: stop,
                  onClick: stop,
                  className: "min-h-[28px] resize-none border-none bg-transparent p-0 text-sm font-medium leading-snug shadow-none focus-visible:ring-0 md:text-sm"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setTitleEditing(true);
                  },
                  className: "min-w-0 flex-1 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary",
                  children: task.title || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sem título" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-6 w-6 shrink-0 text-success opacity-0 transition group-hover:opacity-100",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    void completeTask();
                  },
                  title: "Concluir tarefa",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    onDuplicate?.();
                  },
                  title: "Duplicar tarefa",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
                }
              ),
              false,
              taskPeople.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-1.5", title: "Responsável e colaboradores", children: [
                taskPeople.slice(0, 4).map((person) => {
                  const name = person.full_name || person.email || "Usuário";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-6 w-6 border-2 border-card text-[8px]", title: name, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: person.avatar_url || void 0, alt: name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: name.slice(0, 2).toUpperCase() })
                  ] }, person.id);
                }),
                taskPeople.length > 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 self-center text-[10px] text-muted-foreground", children: [
                  "+",
                  taskPeople.length - 4
                ] }) : null
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    onEdit?.();
                  },
                  title: "Editar tarefa",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3.5 w-3.5" })
                }
              )
            ] }),
            isVisible("description") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { order: orderOf("description") }, children: descEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: descDraft,
                autoFocus: true,
                ref: (el) => {
                  descTextareaRef.current = el;
                  if (el) {
                    el.style.height = "auto";
                    el.style.height = `${el.scrollHeight}px`;
                  }
                },
                onChange: (e) => {
                  setDescDraft(e.target.value);
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                },
                onBlur: () => void saveDesc(),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void saveDesc();
                  }
                  if (e.key === "Escape") {
                    setDescDraft(task.description ?? "");
                    setDescEditing(false);
                  }
                },
                onPointerDown: stop,
                onClick: stop,
                placeholder: "Observações...",
                className: "mb-2 min-h-[40px] resize-none overflow-hidden whitespace-pre-wrap border-none bg-transparent p-0 text-sm leading-snug text-foreground shadow-none focus-visible:ring-0 md:text-sm"
              }
            ) }) : task.description ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setDescEditing(true);
                  },
                  className: "cursor-text whitespace-pre-wrap rounded text-sm leading-snug text-muted-foreground [overflow-wrap:anywhere] hover:bg-muted/40",
                  style: {
                    maxHeight: descriptionExpanded ? "min(18rem, max(8rem, calc(100vh - 22rem)))" : "7.5rem",
                    overflowY: descriptionExpanded ? "auto" : "hidden"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextView, { html: task.description, className: "text-sm text-muted-foreground" })
                }
              ),
              task.description.length > DESCRIPTION_COLLAPSED_LIMIT ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setDescriptionExpanded((expanded) => !expanded);
                  },
                  className: "mt-1 text-xs font-medium text-primary hover:underline",
                  children: descriptionExpanded ? "Ver menos" : "Ver mais"
                }
              ) : null
            ] }) : null }) : null,
            isVisible("subtasks") ? (() => {
              const rootSubs = subtasks.filter((s) => !s.comment_id);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { order: orderOf("subtasks") }, children: rootSubs.length > 0 || addingSubtask ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Collapsible,
                {
                  open: subtasksOpen,
                  onOpenChange: setSubtasksOpen,
                  className: "mb-2 rounded-md border bg-muted/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center gap-0.5 pr-1 hover:bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onPointerDown: stop,
                          onClick: stop,
                          className: "flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left text-xs font-medium",
                          children: [
                            subtasksOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-3 w-3 shrink-0 text-muted-foreground" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: subtasksTitle }),
                            rootSubs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[10px] font-normal text-muted-foreground", children: [
                              rootSubs.filter((s) => s.done).length,
                              "/",
                              rootSubs.length
                            ] }) : null
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          title: "Renomear seção",
                          onPointerDown: stop,
                          onClick: (e) => {
                            stop(e);
                            renameSubtasksTitle();
                          },
                          className: "rounded p-0.5 opacity-0 transition group-hover:opacity-100 hover:bg-muted",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 border-t p-1.5", children: [
                      rootSubs.map((s, sIdx) => {
                        const dueInfo = computeSubtaskDue(s.due_date, s.done);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
                          "group/sub rounded px-1 py-1 transition-colors",
                          s.done ? "bg-emerald-500/10 ring-1 ring-emerald-500/30 hover:bg-emerald-500/15" : "hover:bg-muted/40"
                        ), children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onPointerDown: stop,
                                onClick: (e) => {
                                  stop(e);
                                  void toggleSubtask(s);
                                },
                                className: cn(
                                  "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border",
                                  s.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                                ),
                                children: s.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5" }) : null
                              }
                            ),
                            editingSubtaskId === s.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              RichTextEditor,
                              {
                                value: subtaskDraft,
                                onChange: setSubtaskDraft,
                                onBlur: () => void saveSubtaskTitle(),
                                onSubmit: () => void saveSubtaskTitle(),
                                autoFocus: true,
                                placeholder: "Escreva… (Enter para salvar)",
                                minHeight: 40
                              }
                            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                onPointerDown: stop,
                                onClick: (e) => {
                                  stop(e);
                                  startEditSubtask(s);
                                },
                                className: cn("min-w-0 flex-1 cursor-text break-words text-left hover:text-primary", s.done && "text-muted-foreground line-through"),
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextView, { html: s.title })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover/sub:opacity-100", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  title: "Mover para cima",
                                  disabled: sIdx === 0,
                                  onPointerDown: stop,
                                  onClick: (e) => {
                                    stop(e);
                                    void moveSubtaskInScope(s.id, -1, null);
                                  },
                                  className: "rounded p-0.5 hover:bg-muted disabled:opacity-30",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  title: "Mover para baixo",
                                  disabled: sIdx === rootSubs.length - 1,
                                  onPointerDown: stop,
                                  onClick: (e) => {
                                    stop(e);
                                    void moveSubtaskInScope(s.id, 1, null);
                                  },
                                  className: "rounded p-0.5 hover:bg-muted disabled:opacity-30",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  title: "Renomear",
                                  onPointerDown: stop,
                                  onClick: (e) => {
                                    stop(e);
                                    startEditSubtask(s);
                                  },
                                  className: "rounded p-0.5 hover:bg-muted",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" })
                                }
                              ),
                              canDeleteSubtask(s) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  onPointerDown: stop,
                                  onClick: (e) => {
                                    stop(e);
                                    void deleteSubtask(s.id);
                                  },
                                  title: "Remover",
                                  className: "rounded p-0.5 text-destructive hover:bg-destructive/10",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" })
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-1 pl-5", children: [
                            s.done && s.completed_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300",
                                title: format(new Date(s.completed_at), "PPPp", { locale: ptBR }),
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5" }),
                                  format(new Date(s.completed_at), "dd/MM/yyyy", { locale: ptBR })
                                ]
                              }
                            ) : null,
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SubtaskDuePopover,
                              {
                                dueIso: s.due_date,
                                dueInfo,
                                onApply: (iso) => void updateSubtaskDue(s, iso),
                                onClear: () => void updateSubtaskDue(s, "")
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SubtaskAssigneePopover,
                              {
                                profiles,
                                value: s.assignee_id,
                                onChange: (v) => void updateSubtaskAssignee(s, v)
                              }
                            )
                          ] })
                        ] }, s.id);
                      }),
                      addingSubtask ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 px-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-3.5 w-3.5 shrink-0 rounded border border-muted-foreground/40" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Textarea,
                          {
                            value: newSubtask,
                            autoFocus: true,
                            ref: (el) => {
                              if (el) {
                                el.style.height = "auto";
                                el.style.height = `${el.scrollHeight}px`;
                              }
                            },
                            onChange: (e) => {
                              setNewSubtask(e.target.value);
                              const el = e.currentTarget;
                              el.style.height = "auto";
                              el.style.height = `${el.scrollHeight}px`;
                            },
                            onBlur: () => void addSubtask(),
                            onKeyDown: (e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                void addSubtask();
                              }
                              if (e.key === "Escape") {
                                setNewSubtask("");
                                setAddingSubtask(false);
                              }
                            },
                            onPointerDown: stop,
                            onClick: stop,
                            placeholder: "Nova subtarefa (Enter para salvar)",
                            className: "min-h-[24px] flex-1 resize-none overflow-hidden whitespace-pre-wrap border-none bg-transparent p-0 text-xs leading-snug shadow-none focus-visible:ring-0"
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onPointerDown: stop,
                          onClick: (e) => {
                            stop(e);
                            setAddingSubtask(true);
                          },
                          className: "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar subtarefa" })
                          ]
                        }
                      )
                    ] }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setAddingSubtask(true);
                    setSubtasksOpen(true);
                  },
                  className: "mb-2 flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar subtarefa" })
                  ]
                }
              ) });
            })() : null,
            isVisible("attachments") && attachments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 grid grid-cols-3 gap-1", style: { order: orderOf("attachments") }, children: [
              attachments.slice(0, 6).map((a) => {
                const isLink = a.mime_type === LINK_MIME;
                const isImage = !isLink && a.mime_type?.startsWith("image/");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group/att relative aspect-square overflow-hidden rounded border bg-muted", children: [
                  isImage && thumbs[a.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onPointerDown: stop,
                      onClick: (e) => {
                        stop(e);
                        openAttachment(a);
                      },
                      className: "block h-full w-full",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbs[a.id], alt: a.file_name, className: "h-full w-full object-cover" })
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onPointerDown: stop,
                      onClick: (e) => {
                        stop(e);
                        openAttachment(a);
                      },
                      className: "flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground",
                      title: a.file_name,
                      children: [
                        isLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 w-full break-all text-center text-[8px] leading-tight", children: a.file_name })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onPointerDown: stop,
                      onClick: (e) => {
                        stop(e);
                        void deleteAttachment(a);
                      },
                      className: "absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 opacity-0 transition group-hover/att:opacity-100",
                      title: "Remover",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-2.5 w-2.5" })
                    }
                  )
                ] }, a.id);
              }),
              attachments.length > 6 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    onEdit?.();
                  },
                  className: "flex aspect-square items-center justify-center rounded border bg-muted text-[10px] font-medium text-muted-foreground hover:bg-muted/60",
                  children: [
                    "+",
                    attachments.length - 6
                  ]
                }
              ) : null
            ] }) : null,
            isVisible("interruptions") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { order: orderOf("interruptions") }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InterruptionsBlock, { task, color: interruptionColor }) }) : null,
            isVisible("priority") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1", style: { order: orderOf("priority") }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChipPopover,
              {
                value: priority ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium",
                    style: { background: `${priority.color}22`, color: priority.color },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-2.5 w-2.5" }),
                      priority.label
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-2.5 w-2.5" }),
                  "Definir prioridade"
                ] }),
                render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Prioridade", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: task.priority ?? "none", onValueChange: (v) => {
                  void update({ priority: v === "none" ? null : v });
                  close();
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Sem prioridade" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Baixa" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Média" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "Alta" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgente" })
                  ] })
                ] }) })
              }
            ) }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Collapsible,
              {
                open: collaboratorsOpen,
                onOpenChange: setCollaboratorsOpen,
                className: "rounded-md border",
                style: { order: orderOf("priority") + 1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onPointerDown: stop,
                      className: "flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/60",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("h-3.5 w-3.5 transition-transform", collaboratorsOpen && "rotate-90") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Colaboradores" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px]", children: taskCollaborators.length === 0 ? "Nenhum" : taskCollaborators.length })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { className: "border-t p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-56 space-y-0.5 overflow-y-auto", children: profiles.filter((profile) => profile.is_active !== false).map((profile) => {
                    const checked = taskCollaborators.some((collaborator) => collaborator.id === profile.id);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => void toggleCollaborator(profile.id),
                        className: "flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"), children: checked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : null }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: profile.full_name || profile.email || "Usuário sem nome" })
                        ]
                      },
                      profile.id
                    );
                  }) }) })
                ]
              }
            ),
            isVisible("due") ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1", style: { order: orderOf("due") }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChipPopover,
                {
                  value: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs shadow-sm",
                        dueChipClass
                      ),
                      title: dueMeta.label,
                      children: [
                        dueHasTime ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium opacity-90", children: dueMeta.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: dueMeta.subtext })
                        ] })
                      ]
                    }
                  ),
                  render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DueDateEditor,
                    {
                      task,
                      onChange: (v) => {
                        openDueChange(v);
                        close();
                      }
                    }
                  )
                }
              ),
              dueLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setHistoryOpen(true);
                  },
                  title: "Histórico de mudanças de prazo",
                  className: "inline-flex items-center rounded-sm border border-dashed px-1 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3 w-3" })
                }
              ) : null
            ] }) : null,
            isVisible("createdAt") ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1", style: { order: orderOf("createdAt") }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChipPopover,
              {
                value: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted",
                    title: `Criada em ${format(new Date(task.created_at), "dd/MM/yyyy", { locale: ptBR })}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-2.5 w-2.5" }),
                      "Criada · ",
                      format(new Date(task.created_at), "dd MMM", { locale: ptBR })
                    ]
                  }
                ),
                render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CreatedAtEditor,
                  {
                    value: task.created_at,
                    onChange: (v) => {
                      void update({ created_at: v });
                      close();
                    }
                  }
                )
              }
            ) }) : null,
            task.completed_at ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1", style: { order: orderOf("createdAt") + 0.1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300",
                title: `Concluída em ${format(new Date(task.completed_at), "dd/MM/yyyy", { locale: ptBR })}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5" }),
                  "Concluída · ",
                  format(new Date(task.completed_at), "dd MMM", { locale: ptBR })
                ]
              }
            ) }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 space-y-0.5", style: { order: orderOf("meta") }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  "Criada por: ",
                  creator?.full_name || creator?.email || "Usuário não identificado"
                ] })
              ] }),
              task.assignee_id && task.assigned_by ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  "Atribuída por: ",
                  assigner?.full_name || assigner?.email || "Usuário não identificado"
                ] })
              ] }) : null
            ] }),
            isVisible("meta") ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 space-y-0.5", style: { order: orderOf("meta") }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CompactRow,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3 w-3" }),
                  empty: !assignee,
                  label: assignee ? assignee.full_name || assignee.email || "Sem nome" : "Adicionar responsável",
                  render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Responsável", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: task.assignee_id ?? "none", onValueChange: (v) => {
                    void update({ assignee_id: v === "none" ? null : v });
                    close();
                  }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Sem responsável" }),
                      profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.full_name || p.email }, p.id))
                    ] })
                  ] }) })
                }
              ),
              !client ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                CompactRow,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
                  empty: true,
                  label: "Adicionar cliente",
                  render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ClientPicker,
                    {
                      clients,
                      value: task.client_id,
                      onChange: (clientId) => {
                        void update({ client_id: clientId });
                        close();
                      }
                    }
                  ) })
                }
              ) : null,
              !dueLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                CompactRow,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                  empty: true,
                  label: "Adicionar prazo",
                  render: (close) => /* @__PURE__ */ jsxRuntimeExports.jsx(DueDateEditor, { task, onChange: (v) => {
                    openDueChange(v);
                    close();
                  } })
                }
              ) : null,
              !task.description ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setDescEditing(true);
                  },
                  className: "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignStart, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar observação" })
                  ]
                }
              ) : null,
              subtasks.filter((s) => !s.comment_id).length === 0 && !addingSubtask ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    setAddingSubtask(true);
                  },
                  className: "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar subtarefa" })
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onPointerDown: stop,
                  onClick: (e) => {
                    stop(e);
                    fileRef.current?.click();
                  },
                  className: "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adicionar arquivo" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileRef,
                  type: "file",
                  hidden: true,
                  onChange: (e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadFile(f);
                    e.target.value = "";
                  }
                }
              )
            ] }) : null
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AttachmentPreviewDialog,
      {
        open: !!previewAttachment,
        onOpenChange: (o) => {
          if (!o) setPreviewAttachment(null);
        },
        attachment: previewAttachment
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dueChange.open, onOpenChange: (o) => {
      if (!o) setDueChange({ open: false, pending: null, pendingTime: null, reason: "" });
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { onPointerDown: stop, onClick: stop, className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm", children: "Justificar mudança de prazo" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border bg-muted/50 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Prazo anterior:" }),
            " ",
            task.due_date ? format(new Date(task.due_date), "dd/MM/yyyy", { locale: ptBR }) : "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Novo prazo:" }),
            " ",
            dueChange.pending ? format(new Date(dueChange.pending), "dd/MM/yyyy", { locale: ptBR }) : "—"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            autoFocus: true,
            value: dueChange.reason,
            onChange: (e) => setDueChange((c) => ({ ...c, reason: e.target.value })),
            placeholder: "Motivo da mudança (opcional)",
            className: "min-h-[80px] text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Se não justificar, a mudança será registrada sem motivo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setDueChange({ open: false, pending: null, pendingTime: null, reason: "" }), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => void confirmDueChange(true), children: "Mudar sem justificar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => void confirmDueChange(false), children: "Salvar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: subDueReason.open, onOpenChange: (o) => {
      if (!o) setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { onPointerDown: stop, onClick: stop, className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm", children: "Mudança de prazo da subtarefa" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border bg-muted/50 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Subtarefa:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: subDueReason.subtask?.title ?? "" } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Prazo anterior:" }),
            " ",
            subDueReason.prev ? format(new Date(subDueReason.prev), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Novo prazo:" }),
            " ",
            subDueReason.next ? format(new Date(subDueReason.next), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            autoFocus: true,
            value: subDueReason.reason,
            onChange: (e) => setSubDueReason((c) => ({ ...c, reason: e.target.value })),
            placeholder: "Motivo (opcional) — se preenchido aparece no relatório do cliente",
            className: "min-h-[80px] text-sm"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" }), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: async () => {
          const st = subDueReason.subtask;
          if (!st) return;
          const nx = subDueReason.next;
          setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });
          await applySubtaskDue(st, nx);
        }, children: "Sem justificativa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: async () => {
          const st = subDueReason.subtask;
          if (!st) return;
          const nx = subDueReason.next;
          const r = subDueReason.reason;
          setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });
          await applySubtaskDue(st, nx, r);
        }, children: "Salvar com motivo" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: historyOpen, onOpenChange: setHistoryOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { onPointerDown: stop, onClick: stop, className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4" }),
        "Histórico de prazos"
      ] }) }),
      dueHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: "Nenhuma mudança de prazo registrada." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[60vh] space-y-2 overflow-y-auto", children: dueHistory.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded border p-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center justify-between text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: format(new Date(h.created_at), "dd/MM/yyyy", { locale: ptBR }) }),
          h.user_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "por ",
            profiles.find((p) => p.id === h.user_id)?.full_name ?? "usuário"
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "De:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: h.old_due_date ? format(new Date(h.old_due_date), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Para:" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: h.new_due_date ? format(new Date(h.new_due_date), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Motivo: " }),
          h.reason ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.reason }) : /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-muted-foreground", children: "não justificado" })
        ] })
      ] }, h.id)) })
    ] }) })
  ] });
}
function ChipPopover({
  value,
  render
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onPointerDown: stop,
        onClick: stop,
        className: "inline-flex items-center",
        children: value
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-64 p-3", onPointerDown: stop, onClick: stop, children: render(() => setOpen(false)) })
  ] });
}
function CompactRow({
  icon,
  label,
  empty,
  render
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onPointerDown: stop,
        onClick: stop,
        className: cn(
          "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] hover:bg-muted",
          empty ? "text-muted-foreground/70" : "text-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-64 p-3", onPointerDown: stop, onClick: stop, children: render(() => setOpen(false)) })
  ] });
}
function PopoverField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    children
  ] });
}
function ClientPicker({
  clients,
  value,
  onChange
}) {
  const [search, setSearch] = reactExports.useState("");
  const filteredClients = reactExports.useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return term ? clients.filter((client) => client.name.toLocaleLowerCase("pt-BR").includes(term)) : clients;
  }, [clients, search]);
  const visibleClients = filteredClients.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        autoFocus: true,
        value: search,
        onChange: (event) => setSearch(event.target.value),
        placeholder: "Pesquisar cliente...",
        className: "h-8 text-xs"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(null),
          className: cn(
            "flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",
            !value && "bg-muted font-medium"
          ),
          children: "Nenhum"
        }
      ),
      visibleClients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(client.id),
          className: cn(
            "flex w-full items-center rounded-md px-2 py-1.5 text-left text-xs hover:bg-muted",
            value === client.id && "bg-muted font-medium"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 h-2 w-2 shrink-0 rounded-full", style: { backgroundColor: client.color ?? "#94a3b8" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client.name })
          ]
        },
        client.id
      )),
      filteredClients.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-2 text-xs text-muted-foreground", children: "Nenhum cliente encontrado." })
    ] }),
    filteredClients.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Exibindo os 5 primeiros resultados. Refine a pesquisa para encontrar outro cliente." })
  ] });
}
function SubtaskAssigneePopover({
  profiles,
  value,
  onChange
}) {
  const [open, setOpen] = reactExports.useState(false);
  const current = profiles.find((p) => p.id === value) ?? null;
  const label = current ? current.full_name || current.email || "Responsável" : "Atribuir";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => {
          e.stopPropagation();
          setOpen(true);
        },
        className: cn(
          "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-none ring-1 transition",
          current ? "bg-primary/10 text-primary ring-primary/30 hover:bg-primary/15" : "bg-muted text-muted-foreground ring-border hover:bg-muted/70"
        ),
        title: current ? `Responsável: ${label}` : "Atribuir responsável",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-2.5 w-2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[100px] truncate", children: label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      PopoverContent,
      {
        className: "w-56 p-1",
        onPointerDown: (e) => e.stopPropagation(),
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                onChange("none");
                setOpen(false);
              },
              className: "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-muted text-[10px]", children: "—" }),
                "Ninguém"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-56 overflow-y-auto", children: profiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                onChange(p.id);
                setOpen(false);
              },
              className: cn(
                "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted",
                value === p.id && "bg-primary/10 text-primary"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-5 w-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: p.avatar_url || void 0, alt: p.full_name || p.email || "Usuário" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-[9px]", children: (p.full_name || p.email || "?").slice(0, 1).toUpperCase() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: p.full_name || p.email })
              ]
            },
            p.id
          )) })
        ]
      }
    )
  ] });
}
function SubtaskDuePopover({
  dueIso,
  dueInfo,
  onApply,
  onClear
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [dateStr, setDateStr] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) return;
    setDateStr(dueIso ? format(new Date(dueIso), "yyyy-MM-dd") : "");
  }, [open, dueIso]);
  const save = () => {
    if (!dateStr) {
      onClear();
      setOpen(false);
      return;
    }
    onApply((/* @__PURE__ */ new Date(`${dateStr}T12:00:00`)).toISOString());
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onPointerDown: stop,
        onClick: stop,
        className: cn(
          "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none transition hover:opacity-90",
          dueInfo.cls
        ),
        title: "Editar prazo",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-2.5 w-2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dueInfo.label })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-64 p-2", onPointerDown: stop, onClick: stop, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Prazo da subtarefa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "date",
          value: dateStr,
          onChange: (e) => setDateStr(e.target.value),
          className: "h-8 flex-1 text-xs"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", onClick: save, className: "h-7 flex-1 text-xs", children: "Salvar" }),
        dueIso ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => {
              onClear();
              setOpen(false);
            },
            className: "h-7 text-xs text-muted-foreground",
            children: "Indefinido"
          }
        ) : null
      ] })
    ] })
  ] });
}
function DueDateEditor({ task, onChange }) {
  const [dateStr, setDateStr] = reactExports.useState(task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "");
  const [timeStr, setTimeStr] = reactExports.useState(formatDueTime(task.due_time) ?? "");
  const commit = () => onChange({
    dueDate: dateStr ? (/* @__PURE__ */ new Date(`${dateStr}T${DEFAULT_DEADLINE_TIME}:00`)).toISOString() : null,
    dueTime: dateStr ? timeStr || null : null
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Prazo", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: dateStr, onChange: (e) => setDateStr(e.target.value), className: "h-8 text-xs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-3.5 w-3.5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", step: "300", value: timeStr, onChange: (e) => setTimeStr(e.target.value), className: "h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0", "aria-label": "Hora do prazo (opcional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Opcional" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs", onClick: () => {
        setDateStr("");
        setTimeStr("");
        onChange({ dueDate: null, dueTime: null });
      }, children: "Limpar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", onClick: commit, children: "Salvar" })
    ] })
  ] }) });
}
function CreatedAtEditor({ value, onChange }) {
  const [v, setV] = reactExports.useState(format(new Date(value), "yyyy-MM-dd"));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverField, { label: "Data de criação", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: v, onChange: (e) => setV(e.target.value), className: "h-8 text-xs" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", onClick: () => {
      if (v) onChange((/* @__PURE__ */ new Date(`${v}T12:00:00`)).toISOString());
    }, children: "Salvar" }) })
  ] }) });
}
const PALETTE = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#64748b",
  "#a855f7"
];
function TagManagerDialog({ open, onOpenChange }) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const { data: tags = [] } = useTaskTags();
  const [name, setName] = reactExports.useState("");
  const [color, setColor] = reactExports.useState(PALETTE[0]);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const create = async () => {
    if (!name.trim() || !user) return;
    const { error } = await supabase.from("task_tags").insert({
      name: name.trim(),
      color,
      created_by: user.id,
      position: tags.length
    });
    if (error) return toast.error(error.message);
    setName("");
    qc.invalidateQueries({ queryKey: ["task_tags"] });
    toast.success("Tag criada");
  };
  const update = async (tag, patch) => {
    const { error } = await supabase.from("task_tags").update(patch).eq("id", tag.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_tags"] });
  };
  const remove = async (tag) => {
    if (!confirm(`Excluir tag "${tag.name}"?`)) return;
    const { error } = await supabase.from("task_tags").delete().eq("id", tag.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["task_tags"] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
    toast.success("Tag excluída");
  };
  const onDragEnd = async (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = tags.findIndex((t) => t.id === active.id);
    const newIndex = tags.findIndex((t) => t.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(tags, oldIndex, newIndex);
    qc.setQueryData(["task_tags"], reordered.map((t, i) => ({ ...t, position: i })));
    await Promise.all(
      reordered.map(
        (t, i) => supabase.from("task_tags").update({ position: i }).eq("id", t.id)
      )
    );
    qc.invalidateQueries({ queryKey: ["task_tags"] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Gerenciar tags" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md border bg-muted/40 p-2 text-xs text-muted-foreground", children: "Apenas administradores podem criar, editar, reordenar ou excluir tags. Estas tags são globais." }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-medium text-muted-foreground", children: "Nova tag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Ex: Aguardando retorno do cliente",
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  create();
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: create, disabled: !name.trim(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-3.5 w-3.5" }),
            "Criar"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: PALETTE.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setColor(c),
            className: `h-6 w-6 rounded-full border-2 transition ${color === c ? "border-foreground scale-110" : "border-transparent"}`,
            style: { background: c }
          },
          c
        )) })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
        "Arraste pelo ícone ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "inline h-3 w-3 -mt-0.5" }),
        " para reordenar."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: isAdmin ? onDragEnd : () => {
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: tags.map((t) => t.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-80 space-y-2 overflow-y-auto", children: [
        tags.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground py-4", children: "Nenhuma tag ainda" }),
        tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(TagRow, { tag, onUpdate: update, onDelete: remove, canManage: isAdmin }, tag.id))
      ] }) }) })
    ] })
  ] }) });
}
function TagRow({
  tag,
  onUpdate,
  onDelete,
  canManage
}) {
  const [name, setName] = reactExports.useState(tag.name);
  const [color, setColor] = reactExports.useState(tag.color);
  const dirty = name !== tag.name || color !== tag.color;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: tag.id, disabled: !canManage });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: setNodeRef, style, className: "flex items-center gap-2 rounded-md border p-2 bg-background", children: [
    canManage && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "cursor-grab touch-none text-muted-foreground hover:text-foreground", ...attributes, ...listeners, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "color",
        value: color,
        onChange: (e) => canManage && setColor(e.target.value),
        disabled: !canManage,
        className: "h-7 w-9 cursor-pointer rounded border bg-transparent disabled:cursor-not-allowed disabled:opacity-60"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        value: name,
        onChange: (e) => canManage && setName(e.target.value),
        disabled: !canManage,
        className: "h-8 flex-1 text-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "rounded px-2 py-0.5 text-[11px] font-semibold",
        style: { background: color, color: "#fff" },
        children: name || "tag"
      }
    ),
    canManage && dirty && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => onUpdate(tag, { name, color }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }) }),
    canManage && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 text-destructive", onClick: () => onDelete(tag), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
  ] });
}
function SortableRow({
  field,
  hidden,
  onToggle
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style: { transform: CSS.Transform.toString(transform), transition },
      className: cn(
        "flex items-center gap-2 rounded-md border bg-card px-2 py-1.5",
        isDragging && "z-10 shadow",
        hidden && "opacity-50"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            ...attributes,
            ...listeners,
            className: "cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted",
            "aria-label": "Arrastar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs", children: FIELD_LABELS[field] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onToggle,
            className: "rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
            title: hidden ? "Mostrar" : "Ocultar",
            children: hidden ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" })
          }
        )
      ]
    }
  );
}
function CardFieldsPopover() {
  const [open, setOpen] = reactExports.useState(false);
  const { data: prefs } = useBoardPreferences();
  const update = useUpdateBoardPreferences();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const order = prefs?.field_order ?? [...ALL_FIELDS];
  const hidden = prefs?.hidden_fields ?? [];
  const color = prefs?.interruption_color ?? "#ef4444";
  function handleDragEnd(e) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(active.id);
    const newIndex = order.indexOf(over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    update.mutate({ field_order: arrayMove(order, oldIndex, newIndex) });
  }
  function toggle(field) {
    const next = hidden.includes(field) ? hidden.filter((f) => f !== field) : [...hidden, field];
    update.mutate({ hidden_fields: next });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-3.5 w-3.5" }),
      "Configurar card"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-80 p-3", align: "end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Campos do card" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => update.mutate({ hidden_fields: [] }),
              className: "text-[10px] text-primary hover:underline",
              children: "Mostrar tudo"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => update.mutate({ hidden_fields: [...ALL_FIELDS] }),
              className: "text-[10px] text-primary hover:underline",
              children: "Ocultar tudo"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[10px] text-muted-foreground", children: "Arraste para reordenar. Clique no olho para mostrar/ocultar. A configuração vale para todos os cards do quadro." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: order, strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: order.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SortableRow,
        {
          field,
          hidden: hidden.includes(field),
          onToggle: () => toggle(field)
        },
        field
      )) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Cor das interrupções" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "color",
              value: color,
              onChange: (e) => update.mutate({ interruption_color: e.target.value }),
              className: "h-8 w-12 cursor-pointer rounded border bg-transparent"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: color,
              onChange: (e) => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) update.mutate({ interruption_color: v });
              },
              className: "h-8 flex-1 rounded border bg-background px-2 text-xs"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function SortableTaskCard({
  task,
  colId,
  onEdit,
  onDuplicate,
  clients,
  profiles,
  columns,
  tags,
  statuses,
  collaborators,
  orientation,
  minimal
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      colId: colId ?? task.column_id
    },
    animateLayoutChanges: () => false
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition ?? "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
    opacity: isDragging ? 0.4 : 1,
    willChange: "transform"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setNodeRef, style, className: minimal ? "w-[clamp(15rem,18vw,19rem)] max-w-full min-w-0 shrink-0" : "w-72 max-w-full min-w-0 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task, columns, clients, profiles, tags, statuses, collaborators, onEdit, onDuplicate, minimal, dragHandleProps: {
    ...attributes,
    ...listeners
  } }) });
}
const COMPLETED_COL_ID = "__completed__";
function compareByField(field, a, b, tagNameForTask, statuses) {
  switch (field) {
    case "due_date":
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    case "created_at":
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    case "tag":
      return (tagNameForTask.get(a.id) ?? "").localeCompare(tagNameForTask.get(b.id) ?? "");
    case "priority": {
      const order = {
        low: 1,
        medium: 2,
        high: 3,
        urgent: 4
      };
      return (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
    }
    case "status": {
      const sa = statuses.find((s) => s.id === a.status_id);
      const sb2 = statuses.find((s) => s.id === b.status_id);
      return (sa ? sa.position : 9999) - (sb2 ? sb2.position : 9999);
    }
    default:
      return 0;
  }
}
function CompletedColumn({
  taskIds,
  count,
  children,
  orientation,
  minimal
}) {
  const {
    setNodeRef,
    isOver
  } = useDroppable({
    id: `drop:${COMPLETED_COL_ID}`,
    data: {
      type: "column-drop",
      colId: COMPLETED_COL_ID
    }
  });
  const isH = orientation === "horizontal";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isH ? minimal ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col" : "flex w-72 shrink-0 flex-col" : "flex w-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-1.5 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 dark:ring-2 dark:ring-emerald-200/40 dark:shadow-[0_0_12px_rgba(74,222,128,0.7)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Concluídas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-400/25 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-200/45 dark:shadow-[0_0_10px_rgba(74,222,128,0.32)]", children: count }),
      !isH && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground", children: "Arraste tarefas aqui para concluir" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: taskIds, strategy: isH ? verticalListSortingStrategy : horizontalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setNodeRef, className: `rounded-lg border-2 border-solid p-2 transition ${isH ? "flex flex-col gap-2" : "flex flex-nowrap items-start gap-2 overflow-x-auto pb-2"} ${isOver ? "border-emerald-500 bg-emerald-500/10" : "border-emerald-500/30 bg-emerald-500/5"}`, style: {
      minHeight: isH ? 200 : 120
    }, children }) })
  ] });
}
function SortableColumn({
  col,
  taskIds,
  count,
  children,
  onEdit,
  onDelete,
  onAdd,
  orientation,
  minimal,
  canManage
}) {
  const sortable = useSortable({
    id: `col:${col.id}`,
    data: {
      type: "column",
      colId: col.id
    }
  });
  const {
    setNodeRef: setSortRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = sortable;
  const {
    setNodeRef: setDropRef,
    isOver
  } = useDroppable({
    id: `drop:${col.id}`,
    data: {
      type: "column-drop",
      colId: col.id
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  const isH = orientation === "horizontal";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: setSortRef, style, className: isH ? minimal ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col" : "flex w-fit min-w-72 shrink-0 flex-col" : "flex w-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        canManage && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...attributes, ...listeners, className: "inline-flex h-6 w-6 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing dark:text-slate-100 dark:hover:bg-white/10", title: "Arrastar coluna", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full dark:ring-2 dark:ring-white/45 dark:shadow-[0_0_12px_rgba(255,255,255,0.32)]", style: {
          background: col.color || "#1e3a8a"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: col.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full px-2 py-0.5 text-xs font-semibold dark:ring-1 dark:ring-white/45 dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]", style: {
          color: "var(--foreground)",
          backgroundColor: `${col.color || "#1e3a8a"}40`
        }, children: count })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10", onClick: onAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }),
        canManage && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onEdit, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-2 h-4 w-4" }),
              "Editar"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onDelete, className: "text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
              "Excluir"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: taskIds, strategy: isH ? verticalListSortingStrategy : horizontalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setDropRef, className: `rounded-lg border-2 border-solid border-l-4 p-2 transition ${isH ? "flex flex-col gap-3" : "flex flex-nowrap items-start gap-4 overflow-x-auto pb-2"} ${isOver ? "border-primary bg-primary/5" : "border-transparent bg-muted/40"}`, style: {
      minHeight: isH ? 200 : 120,
      borderLeftColor: col.color || "#1e3a8a"
    }, children }) })
  ] });
}
function KanbanPage() {
  const qc = useQueryClient();
  const {
    user,
    isAdmin
  } = useAuth();
  const {
    data: tasks = []
  } = useTasks();
  const {
    data: rawColumns = []
  } = useColumns();
  const {
    data: userColOrder = []
  } = useUserColumnOrder();
  const {
    data: userTaskOrder = []
  } = useUserTaskOrder();
  const {
    data: clients = []
  } = useClients();
  const {
    data: profiles = []
  } = useProfiles();
  const {
    data: tags = []
  } = useTaskTags();
  const {
    data: statuses = []
  } = useTaskStatuses();
  const {
    data: collaborators = []
  } = useTaskCollaborators();
  const collaboratorTaskIds = reactExports.useMemo(() => new Set(collaborators.filter((collaborator) => collaborator.collaborator_id === user?.id).map((collaborator) => collaborator.task_id)), [collaborators, user?.id]);
  const {
    data: boardPrefs
  } = useBoardPreferences();
  const {
    data: allSubtasks = []
  } = useSubtasks();
  const updatePrefs = useUpdateBoardPreferences();
  const orientation = boardPrefs?.kanban_orientation ?? "vertical";
  const minimalCardsStorageKey = `kanban-minimal-cards:${user?.id ?? "anonymous"}`;
  const [minimalCards, setMinimalCards] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    setMinimalCards(window.localStorage.getItem(minimalCardsStorageKey) === "true");
  }, [minimalCardsStorageKey]);
  const toggleMinimalCards = () => {
    const next = !minimalCards;
    setMinimalCards(next);
    if (typeof window !== "undefined") window.localStorage.setItem(minimalCardsStorageKey, String(next));
  };
  const subtaskAssigneeTaskIds = reactExports.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    if (!user?.id) return s;
    for (const st of allSubtasks) if (st.assignee_id === user.id && st.task_id) s.add(st.task_id);
    return s;
  }, [allSubtasks, user?.id]);
  const subtaskAssigneeTaskIdsByUser = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const st of allSubtasks) {
      if (!st.assignee_id || !st.task_id) continue;
      const set = map.get(st.assignee_id) ?? /* @__PURE__ */ new Set();
      set.add(st.task_id);
      map.set(st.assignee_id, set);
    }
    return map;
  }, [allSubtasks]);
  const columns = reactExports.useMemo(() => {
    const ord = new Map(userColOrder.map((u) => [u.column_id, u.position]));
    return [...rawColumns].sort((a, b) => {
      const ap = ord.has(a.id) ? ord.get(a.id) : a.position + 1e4;
      const bp = ord.has(b.id) ? ord.get(b.id) : b.position + 1e4;
      return ap - bp;
    });
  }, [rawColumns, userColOrder]);
  const userTaskPos = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    userTaskOrder.forEach((u) => m.set(u.task_id, u.position));
    return m;
  }, [userTaskOrder]);
  const [filters, setFilters] = reactExports.useState({});
  const [sort, setSort] = reactExports.useState({
    field: "position",
    direction: "asc"
  });
  const [sort2, setSort2] = reactExports.useState({
    field: "none",
    direction: "asc"
  });
  const [activeTask, setActiveTask] = reactExports.useState(null);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editTask, setEditTask] = reactExports.useState(null);
  const [defaultCol, setDefaultCol] = reactExports.useState(null);
  const [duplicateTaskTarget, setDuplicateTaskTarget] = reactExports.useState(null);
  const [duplicateDueDate, setDuplicateDueDate] = reactExports.useState("");
  const [duplicatingTask, setDuplicatingTask] = reactExports.useState(false);
  const [tagsOpen, setTagsOpen] = reactExports.useState(false);
  const [filesOpen, setFilesOpen] = reactExports.useState(false);
  const [exportingPdf, setExportingPdf] = reactExports.useState(false);
  const [completedRange, setCompletedRange] = reactExports.useState({
    start: "",
    end: ""
  });
  const [columnEditor, setColumnEditor] = reactExports.useState({
    open: false,
    id: null,
    name: "",
    color: "#1e3a8a"
  });
  const completedStatus = reactExports.useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);
  const fallbackStatus = reactExports.useMemo(() => statuses.find((s) => !s.is_completed) ?? null, [statuses]);
  const {
    data: tagLinks = []
  } = useTaskTagLinks();
  const tagNameForTask = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    const linksByTask = /* @__PURE__ */ new Map();
    tagLinks.forEach((l) => {
      if (!linksByTask.has(l.task_id)) linksByTask.set(l.task_id, []);
      linksByTask.get(l.task_id).push(l.tag_id);
    });
    tasks.forEach((t) => {
      const linkIds = linksByTask.get(t.id) ?? [];
      if (t.tag_id) linkIds.push(t.tag_id);
      const uniqueIds = [...new Set(linkIds)];
      const names = uniqueIds.map((id) => tags.find((tag) => tag.id === id)?.name ?? "").filter(Boolean).sort();
      map.set(t.id, names[0] ?? "");
    });
    return map;
  }, [tagLinks, tags, tasks]);
  const completedTasks = reactExports.useMemo(() => {
    const startToday = /* @__PURE__ */ new Date();
    startToday.setHours(0, 0, 0, 0);
    const endToday = /* @__PURE__ */ new Date();
    endToday.setHours(23, 59, 59, 999);
    const hasRange = !!(completedRange.start || completedRange.end);
    let all = tasks.filter((t) => {
      if (t.status !== "done" && !t.completed_at) return false;
      const ref = t.completed_at ? new Date(t.completed_at) : new Date(t.updated_at);
      if (hasRange) {
        const start = completedRange.start ? /* @__PURE__ */ new Date(`${completedRange.start}T00:00:00`) : null;
        const end = completedRange.end ? /* @__PURE__ */ new Date(`${completedRange.end}T23:59:59`) : null;
        return (!start || ref >= start) && (!end || ref <= end);
      }
      return ref >= startToday && ref <= endToday;
    });
    all = applyTaskFilters(all, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser
    });
    all.sort((a, b) => {
      let cmp = 0;
      switch (sort.field) {
        case "due_date": {
          if (!a.due_date && !b.due_date) cmp = 0;
          else if (!a.due_date) cmp = 1;
          else if (!b.due_date) cmp = -1;
          else cmp = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          break;
        }
        case "created_at": {
          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        }
        case "tag": {
          cmp = (tagNameForTask.get(a.id) ?? "").localeCompare(tagNameForTask.get(b.id) ?? "");
          break;
        }
        case "priority": {
          const order = {
            low: 1,
            medium: 2,
            high: 3,
            urgent: 4
          };
          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
          break;
        }
        case "status": {
          const sa = statuses.find((s) => s.id === a.status_id);
          const sb2 = statuses.find((s) => s.id === b.status_id);
          const ap = sa ? sa.position : 9999;
          const bp = sb2 ? sb2.position : 9999;
          cmp = ap - bp;
          break;
        }
        case "position":
        default: {
          cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(a.completed_at ?? a.updated_at ?? "");
          break;
        }
      }
      if (cmp === 0 && sort2.field !== "none") {
        const c2 = compareByField(sort2.field, a, b, tagNameForTask, statuses);
        cmp = sort2.direction === "asc" ? c2 : -c2;
      }
      if (cmp === 0) cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(a.completed_at ?? a.updated_at ?? "");
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return all;
  }, [tasks, filters, sort, sort2, tagNameForTask, completedRange, statuses, user?.id, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser]);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8
    }
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 8
    }
  }));
  const filtered = reactExports.useMemo(() => {
    let r = tasks.filter((t) => t.status !== "done" && !t.completed_at);
    r = applyTaskFilters(r, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser
    });
    return r;
  }, [tasks, filters, user?.id, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser]);
  const sortedTasks = reactExports.useMemo(() => {
    const r = [...filtered];
    r.sort((a, b) => {
      if (sort.field === "position" && sort.direction === "asc" && user?.id) {
        const wasAssignedToCurrentUser = (task) => task.assignee_id === user.id && !!task.assigned_by && task.assigned_by !== user.id;
        const aWasAssigned = wasAssignedToCurrentUser(a);
        const bWasAssigned = wasAssignedToCurrentUser(b);
        if (aWasAssigned !== bWasAssigned) return aWasAssigned ? -1 : 1;
        if (aWasAssigned && bWasAssigned) {
          const priorityOrder = {
            low: 1,
            medium: 2,
            high: 3,
            urgent: 4
          };
          const priorityComparison = (priorityOrder[b.priority ?? ""] || 0) - (priorityOrder[a.priority ?? ""] || 0);
          if (priorityComparison !== 0) return priorityComparison;
        }
      }
      let cmp = 0;
      switch (sort.field) {
        case "due_date": {
          if (!a.due_date && !b.due_date) cmp = 0;
          else if (!a.due_date) cmp = 1;
          else if (!b.due_date) cmp = -1;
          else cmp = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          break;
        }
        case "created_at": {
          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        }
        case "tag": {
          cmp = (tagNameForTask.get(a.id) ?? "").localeCompare(tagNameForTask.get(b.id) ?? "");
          break;
        }
        case "priority": {
          const order = {
            low: 1,
            medium: 2,
            high: 3,
            urgent: 4
          };
          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
          break;
        }
        case "status": {
          const sa = statuses.find((s) => s.id === a.status_id);
          const sb2 = statuses.find((s) => s.id === b.status_id);
          const ap = sa ? sa.position : 9999;
          const bp = sb2 ? sb2.position : 9999;
          cmp = ap - bp;
          break;
        }
        case "position":
        default: {
          const ap = userTaskPos.has(a.id) ? userTaskPos.get(a.id) : (a.position ?? 0) + 1e5;
          const bp = userTaskPos.has(b.id) ? userTaskPos.get(b.id) : (b.position ?? 0) + 1e5;
          cmp = ap - bp;
          break;
        }
      }
      if (cmp === 0 && sort2.field !== "none") {
        const c2 = compareByField(sort2.field, a, b, tagNameForTask, statuses);
        cmp = sort2.direction === "asc" ? c2 : -c2;
      }
      if (cmp === 0) {
        const ap = userTaskPos.has(a.id) ? userTaskPos.get(a.id) : (a.position ?? 0) + 1e5;
        const bp = userTaskPos.has(b.id) ? userTaskPos.get(b.id) : (b.position ?? 0) + 1e5;
        cmp = ap - bp;
      }
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return r;
  }, [filtered, sort, sort2, tagNameForTask, userTaskPos, statuses, user?.id]);
  const tasksByCol = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    columns.forEach((c) => map.set(c.id, []));
    const firstColId = columns[0]?.id;
    sortedTasks.forEach((t) => {
      if (t.column_id && map.has(t.column_id)) {
        map.get(t.column_id).push(t);
        return;
      }
      if (firstColId && map.has(firstColId)) map.get(firstColId).push(t);
    });
    return map;
  }, [sortedTasks, columns]);
  const columnIds = reactExports.useMemo(() => columns.map((c) => `col:${c.id}`), [columns]);
  const collisionDetectionStrategy = (args) => {
    const activeType = args.active.data.current?.type;
    if (activeType === "column") {
      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter((container) => container.data.current?.type === "column")
      });
    }
    const pointerIntersections = pointerWithin(args);
    const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
    const overId = getFirstCollision(intersections, "id");
    if (overId) {
      const matchedColumn = columns.find((column) => `drop:${column.id}` === overId || `col:${column.id}` === overId);
      if (matchedColumn) {
        const taskIds = (tasksByCol.get(matchedColumn.id) ?? []).map((task) => task.id);
        if (taskIds.length > 0) {
          const taskCollisions = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => taskIds.includes(String(container.id)))
          });
          if (taskCollisions.length > 0) return taskCollisions;
        }
      }
    }
    if (intersections.length > 0) return intersections;
    return closestCenter({
      ...args,
      droppableContainers: args.droppableContainers.filter((container) => {
        const type = container.data.current?.type;
        return type === "task" || type === "column-drop" || type === "column";
      })
    });
  };
  const onDragEnd = async (e) => {
    setActiveTask(null);
    const activeType = e.active.data.current?.type;
    if (!e.over) return;
    if (activeType === "column") {
      if (!isAdmin) {
        toast.error("Apenas administradores podem reordenar as colunas");
        return;
      }
      const overType = e.over.data.current?.type;
      if (overType !== "column") return;
      const oldIndex = columns.findIndex((c) => `col:${c.id}` === e.active.id);
      const newIndex = columns.findIndex((c) => `col:${c.id}` === e.over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
      if (!user) return;
      const next = arrayMove(columns, oldIndex, newIndex);
      qc.setQueryData(["user_column_order"], next.map((c, i) => ({
        column_id: c.id,
        position: i
      })));
      const rows2 = next.map((c, i) => ({
        user_id: user.id,
        column_id: c.id,
        position: i
      }));
      const {
        error
      } = await supabase.from("user_column_order").upsert(rows2, {
        onConflict: "user_id,column_id"
      });
      if (error) toast.error(error.message);
      qc.invalidateQueries({
        queryKey: ["user_column_order"]
      });
      return;
    }
    const taskId = e.active.id;
    const overData = e.over.data.current;
    const overId = e.over.id;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    let targetCol = null;
    let targetIndex = -1;
    if (overData?.type === "task") {
      targetCol = overData.colId;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.findIndex((t) => t.id === overId);
    } else if (overData?.type === "column-drop") {
      targetCol = overData.colId;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.length;
    } else if (overData?.type === "column") {
      targetCol = overData.colId;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.length;
    }
    if (!targetCol) return;
    const wasCompleted = !!task.completed_at || task.status === "done";
    if (targetCol === COMPLETED_COL_ID) {
      if (wasCompleted) return;
      const patch = {
        status: "done",
        completed_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (completedStatus?.id) patch.status_id = completedStatus.id;
      qc.setQueryData(["tasks"], (curr = []) => curr.map((t) => t.id === taskId ? {
        ...t,
        ...patch
      } : t));
      const {
        error
      } = await supabase.from("tasks").update(patch).eq("id", taskId);
      if (error) toast.error(error.message);
      qc.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Tarefa concluída");
      return;
    }
    if (wasCompleted) {
      const patch = {
        status: "todo",
        completed_at: null,
        column_id: targetCol
      };
      if (fallbackStatus?.id) patch.status_id = fallbackStatus.id;
      else patch.status_id = null;
      qc.setQueryData(["tasks"], (curr = []) => curr.map((t) => t.id === taskId ? {
        ...t,
        ...patch
      } : t));
      const {
        error
      } = await supabase.from("tasks").update(patch).eq("id", taskId);
      if (error) toast.error(error.message);
      qc.invalidateQueries({
        queryKey: ["tasks"]
      });
      toast.success("Tarefa restaurada");
      return;
    }
    const sourceCol = task.column_id;
    const sourceList = sourceCol ? tasksByCol.get(sourceCol) ?? [] : [];
    const targetList = tasksByCol.get(targetCol) ?? [];
    let nextTargetList;
    if (sourceCol === targetCol) {
      const oldIdx = sourceList.findIndex((t) => t.id === taskId);
      if (oldIdx === -1 || oldIdx === targetIndex) return;
      nextTargetList = arrayMove(sourceList, oldIdx, targetIndex);
    } else {
      nextTargetList = [...targetList];
      const insertAt = targetIndex === -1 ? nextTargetList.length : targetIndex;
      nextTargetList.splice(insertAt, 0, {
        ...task,
        column_id: targetCol
      });
    }
    if (!user) return;
    if (sourceCol !== targetCol) {
      qc.setQueryData(["tasks"], (curr = []) => curr.map((t) => t.id === taskId ? {
        ...t,
        column_id: targetCol
      } : t));
    }
    qc.setQueryData(["user_task_order"], (curr = []) => {
      const filteredOrder = curr.filter((u) => !nextTargetList.some((t) => t.id === u.task_id));
      const newOrders = nextTargetList.map((t, i) => ({
        task_id: t.id,
        position: i
      }));
      return [...filteredOrder, ...newOrders];
    });
    if (sourceCol !== targetCol) {
      const {
        error
      } = await supabase.from("tasks").update({
        column_id: targetCol
      }).eq("id", taskId);
      if (error) toast.error(error.message);
    }
    const rows = nextTargetList.map((t, i) => ({
      user_id: user.id,
      task_id: t.id,
      position: i
    }));
    const {
      error: ordErr
    } = await supabase.from("user_task_order").upsert(rows, {
      onConflict: "user_id,task_id"
    });
    if (ordErr) toast.error(ordErr.message);
    qc.invalidateQueries({
      queryKey: ["tasks"]
    });
    qc.invalidateQueries({
      queryKey: ["user_task_order"]
    });
  };
  const addColumn = () => {
    if (!isAdmin) return toast.error("Apenas administradores podem criar colunas");
    setColumnEditor({
      open: true,
      id: null,
      name: "",
      color: "#1e3a8a"
    });
  };
  const renameColumn = (col) => {
    setColumnEditor({
      open: true,
      id: col.id,
      name: col.name,
      color: col.color || "#1e3a8a"
    });
  };
  const saveColumn = async () => {
    if (!user) return;
    const name = columnEditor.name.trim();
    if (!name) {
      toast.error("Informe um nome");
      return;
    }
    const color = /^#[0-9a-fA-F]{6}$/.test(columnEditor.color) ? columnEditor.color : "#1e3a8a";
    if (columnEditor.id) {
      const {
        error
      } = await supabase.from("kanban_columns").update({
        name,
        color
      }).eq("id", columnEditor.id);
      if (error) return toast.error(error.message);
    } else {
      const {
        error
      } = await supabase.from("kanban_columns").insert({
        name,
        color,
        position: columns.length,
        created_by: user.id
      });
      if (error) return toast.error(error.message);
    }
    setColumnEditor({
      open: false,
      id: null,
      name: "",
      color: "#1e3a8a"
    });
    qc.invalidateQueries({
      queryKey: ["columns"]
    });
  };
  const deleteColumn = async (col) => {
    if (!confirm(`Excluir coluna "${col.name}"? As tarefas ficarão sem coluna.`)) return;
    const {
      error
    } = await supabase.from("kanban_columns").delete().eq("id", col.id);
    if (error) toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["columns"]
    });
    qc.invalidateQueries({
      queryKey: ["tasks"]
    });
  };
  const duplicateTask = async (task, dueDate) => {
    if (!user || !dueDate) return;
    setDuplicatingTask(true);
    try {
      const newTaskId = crypto.randomUUID();
      const {
        error: taskError
      } = await supabase.from("tasks").insert({
        id: newTaskId,
        title: `${task.title} (cópia)`,
        description: task.description,
        status: task.status === "done" ? "todo" : task.status,
        priority: task.priority,
        column_id: task.column_id,
        client_id: task.client_id,
        assignee_id: task.assignee_id,
        due_date: (/* @__PURE__ */ new Date(`${dueDate}T12:00:00`)).toISOString(),
        color: task.color,
        status_id: task.status_id,
        completed_at: null,
        created_by: user.id,
        position: 9999
      });
      if (taskError) throw taskError;
      const {
        data: subs
      } = await supabase.from("subtasks").select("title, done, position").eq("task_id", task.id);
      if (subs && subs.length > 0) {
        await supabase.from("subtasks").insert(subs.map((s) => ({
          task_id: newTaskId,
          title: s.title,
          done: s.done,
          position: s.position
        })));
      }
      const {
        data: coms
      } = await supabase.from("comments").select("body, author_id").eq("task_id", task.id);
      if (coms && coms.length > 0) {
        await supabase.from("comments").insert(coms.map((c) => ({
          task_id: newTaskId,
          body: c.body,
          author_id: c.author_id
        })));
      }
      const {
        data: tagLinks2
      } = await supabase.from("task_tag_links").select("tag_id").eq("task_id", task.id);
      if (tagLinks2 && tagLinks2.length > 0) {
        await supabase.from("task_tag_links").insert(tagLinks2.map((t) => ({
          task_id: newTaskId,
          tag_id: t.tag_id
        })));
      }
      const {
        data: atts
      } = await supabase.from("attachments").select("file_name, storage_path, mime_type, size_bytes, uploaded_by").eq("task_id", task.id);
      if (atts && atts.length > 0) {
        for (const a of atts) {
          if (a.mime_type === "text/uri-list") {
            await supabase.from("attachments").insert({
              task_id: newTaskId,
              file_name: a.file_name,
              storage_path: a.storage_path,
              mime_type: a.mime_type,
              size_bytes: a.size_bytes,
              uploaded_by: a.uploaded_by
            });
          } else {
            try {
              const {
                data: fileData,
                error: dlErr
              } = await supabase.storage.from("task-attachments").download(a.storage_path);
              if (!dlErr && fileData) {
                const newPath = `${newTaskId}/${Date.now()}-${a.file_name}`;
                await supabase.storage.from("task-attachments").upload(newPath, fileData, {
                  contentType: a.mime_type || "application/octet-stream"
                });
                await supabase.from("attachments").insert({
                  task_id: newTaskId,
                  file_name: a.file_name,
                  storage_path: newPath,
                  mime_type: a.mime_type,
                  size_bytes: a.size_bytes,
                  uploaded_by: a.uploaded_by
                });
              }
            } catch {
            }
          }
        }
      }
      qc.invalidateQueries({
        queryKey: ["tasks"]
      });
      setDuplicateTaskTarget(null);
      setDuplicateDueDate("");
      toast.success("Tarefa duplicada");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDuplicatingTask(false);
    }
  };
  const exportPdf = async () => {
    setExportingPdf(true);
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const prioLabel = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente"
    };
    const prioColor = {
      low: "#64748b",
      medium: "#2563eb",
      high: "#f59e0b",
      urgent: "#dc2626"
    };
    const tagsByTask = /* @__PURE__ */ new Map();
    tagLinks.forEach((l) => {
      const tag = tags.find((t) => t.id === l.tag_id);
      if (!tag) return;
      if (!tagsByTask.has(l.task_id)) tagsByTask.set(l.task_id, []);
      tagsByTask.get(l.task_id).push({
        name: tag.name,
        color: tag.color
      });
    });
    const renderTask = (t) => {
      const client = clients.find((c) => c.id === t.client_id);
      const assignee = profiles.find((p) => p.id === t.assignee_id);
      const taskTags = tagsByTask.get(t.id) ?? [];
      const due = t.due_date ? format(new Date(t.due_date), "dd/MM/yyyy") : "";
      return `
        <div class="task" style="border-left:4px solid ${t.color || "#1e3a8a"}">
          <div class="task-title">${esc(t.title)}</div>
          ${t.description ? `<div class="task-desc">${esc(t.description)}</div>` : ""}
          <div class="task-meta">
            <span class="prio" style="background:${prioColor[t.priority ?? "medium"]}">${prioLabel[t.priority ?? "medium"]}</span>
            ${due ? `<span class="meta-item">📅 ${due}</span>` : ""}
            ${client ? `<span class="meta-item">🏢 ${esc(client.name)}</span>` : ""}
            ${assignee ? `<span class="meta-item">👤 ${esc(assignee.full_name || assignee.email || "")}</span>` : ""}
          </div>
          ${taskTags.length ? `<div class="tags">${taskTags.map((tg) => `<span class="tag" style="background:${tg.color}20;color:${tg.color};border-color:${tg.color}55">${esc(tg.name)}</span>`).join("")}</div>` : ""}
        </div>`;
    };
    const renderCol = (name, color, items) => `
      <section class="col">
        <h2 style="border-color:${color}"><span class="dot" style="background:${color}"></span>${esc(name)} <span class="count">${items.length}</span></h2>
        <div class="col-body">
          ${items.length === 0 ? '<div class="empty">Nenhuma tarefa</div>' : items.map(renderTask).join("")}
        </div>
      </section>
    `;
    const colsHtml = columns.map((c) => renderCol(c.name, c.color || "#1e3a8a", tasksByCol.get(c.id) ?? [])).join("");
    const completedLabel = completedRange.start || completedRange.end ? "Concluídas no período" : filters.date === "completed" ? "Concluídas" : filters.date === "this_month" ? "Concluídas no mês" : "Concluídas hoje";
    const completedHtml = renderCol(completedLabel, "#10b981", completedTasks);
    const html = `<style>
  *{box-sizing:border-box}
  .kanban-pdf-root{width:1800px;font-family:Arial,Helvetica,sans-serif;padding:28px;color:#0f172a;background:#fff}
  .kanban-pdf-root header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0f172a;padding-bottom:8px;margin-bottom:16px}
  .kanban-pdf-root header h1{margin:0;font-size:22px}
  .kanban-pdf-root header .meta{font-size:12px;color:#64748b}
  .board{display:flex;flex-direction:column;gap:14px}
  .col{border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;break-inside:avoid;padding:10px}
  .col h2{font-size:14px;margin:0 0 8px;padding-bottom:6px;border-bottom:2px solid #cbd5e1;display:flex;align-items:center;gap:6px}
  .col .dot{width:10px;height:10px;border-radius:999px;display:inline-block}
  .col .count{margin-left:auto;font-size:11px;background:#e2e8f0;padding:2px 8px;border-radius:999px;color:#475569}
  .col-body{display:flex;align-items:flex-start;flex-wrap:wrap;gap:8px;min-height:70px}
  .task{width:260px;flex:0 0 260px;background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:12px;break-inside:avoid}
  .task-title{font-weight:600;font-size:13px;margin-bottom:4px}
  .task-desc{color:#475569;font-size:11px;margin-bottom:6px;white-space:pre-wrap}
  .task-meta{display:flex;flex-wrap:wrap;gap:4px;font-size:10px;color:#475569}
  .meta-item{background:#f1f5f9;padding:2px 6px;border-radius:4px}
  .prio{color:#fff;padding:2px 6px;border-radius:4px;font-weight:600}
  .tags{margin-top:6px;display:flex;flex-wrap:wrap;gap:4px}
  .tag{padding:1px 6px;border-radius:999px;font-size:10px;border:1px solid}
  .empty{color:#94a3b8;font-size:11px;font-style:italic;text-align:center;padding:12px 0}
</style>
<div class="kanban-pdf-root">
  <header>
    <h1>Relatório Kanban</h1>
    <div class="meta">${format(/* @__PURE__ */ new Date(), "dd/MM/yyyy 'às' HH:mm")}</div>
  </header>
  <div class="board">${colsHtml}${completedHtml}</div>
  </div>`;
    try {
      const [{
        default: html2canvas
      }, {
        jsPDF
      }] = await Promise.all([import("../_libs/html2canvas.mjs"), import("../_libs/jspdf.mjs")]);
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-10000px";
      wrapper.style.top = "0";
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      const target = wrapper.querySelector(".kanban-pdf-root");
      const canvas = await html2canvas(target, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true
      });
      wrapper.remove();
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      let y = margin;
      let heightLeft = imgHeight;
      pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;
      while (heightLeft > 0) {
        pdf.addPage();
        y = margin - (imgHeight - heightLeft);
        pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
        heightLeft -= pageHeight - margin * 2;
      }
      pdf.save(`relatorio-kanban-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd-HHmm")}.pdf`);
      toast.success("PDF gerado");
    } catch (e) {
      toast.error(e.message || "Não foi possível gerar o PDF");
    } finally {
      setExportingPdf(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[calc(100dvh-3rem)] min-h-0 flex-col md:h-[calc(100dvh-49px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "shrink-0 border-b bg-background px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => void exportPdf(), disabled: exportingPdf, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "mr-2 h-4 w-4" }),
          exportingPdf ? "Gerando…" : "Exportar PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setFilesOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "mr-2 h-4 w-4" }),
          "Arquivos Cliente"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setTagsOpen(true), children: "Etiquetas" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: addColumn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Coluna"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setEditTask(null);
          setDefaultCol(columns[0]?.id ?? null);
          setDialogOpen(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Tarefa"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TaskFilters, { filters, onChange: setFilters, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1", onClick: () => updatePrefs.mutate({
            kanban_orientation: orientation === "horizontal" ? "vertical" : "horizontal"
          }), title: orientation === "horizontal" ? "Mudar para vertical" : "Mudar para horizontal", children: [
            orientation === "horizontal" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Rows2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Columns2, { className: "h-3.5 w-3.5" }),
            orientation === "horizontal" ? "Vertical" : "Horizontal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: minimalCards ? "default" : "outline", className: "h-7 gap-1", onClick: toggleMinimalCards, title: minimalCards ? "Exibir cards completos" : "Exibir cards minimalistas", children: [
            minimalCards ? /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PanelTop, { className: "h-3.5 w-3.5" }),
            minimalCards ? "Completo" : "Minimalista"
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardFieldsPopover, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mr-3 inline-flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Concluídas no período" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: completedRange.start, onChange: (e) => setCompletedRange((range) => ({
            ...range,
            start: e.target.value
          })), className: "h-7 w-36" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "até" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: completedRange.end, onChange: (e) => setCompletedRange((range) => ({
            ...range,
            end: e.target.value
          })), className: "h-7 w-36" }),
          completedRange.start || completedRange.end ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-7", onClick: () => setCompletedRange({
            start: "",
            end: ""
          }), children: "Limpar período" }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Ordenar:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort.field, onValueChange: (v) => setSort((s) => ({
            ...s,
            field: v
          })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "1º critério" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "position", children: "Posição (manual)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "priority", children: "Prioridade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "due_date", children: "Prazo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "created_at", children: "Data de criação" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tag", children: "Tag" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-7", onClick: () => setSort((s) => ({
            ...s,
            direction: s.direction === "asc" ? "desc" : "asc"
          })), title: "Inverter direção", children: sort.direction === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "então:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort2.field, onValueChange: (v) => setSort2((s) => ({
            ...s,
            field: v
          })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "2º critério" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "— nenhum —" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "priority", children: "Prioridade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "due_date", children: "Prazo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "created_at", children: "Data de criação" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tag", children: "Tag" })
            ] })
          ] }),
          sort2.field !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-7", onClick: () => setSort2((s) => ({
            ...s,
            direction: s.direction === "asc" ? "desc" : "asc"
          })), title: "Inverter direção secundária", children: sort2.direction === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(KanbanScrollArea, { orientation, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DndContext, { sensors, collisionDetection: collisionDetectionStrategy, autoScroll: {
      layoutShiftCompensation: false,
      threshold: {
        x: 0.15,
        y: 0.15
      }
    }, onDragStart: (e) => {
      if (e.active.data.current?.type === "task") {
        setActiveTask(tasks.find((t) => t.id === e.active.id) ?? null);
      }
    }, onDragEnd, onDragCancel: () => setActiveTask(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: columnIds, strategy: orientation === "horizontal" ? horizontalListSortingStrategy : verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: orientation === "horizontal" ? "flex flex-row items-start gap-4" : "flex flex-col gap-4", children: [
        columns.map((col) => {
          const colTasks = tasksByCol.get(col.id) ?? [];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SortableColumn, { col, orientation, minimal: minimalCards, taskIds: colTasks.map((t) => t.id), count: colTasks.length, onAdd: () => {
            setEditTask(null);
            setDefaultCol(col.id);
            setDialogOpen(true);
          }, onEdit: () => renameColumn(col), onDelete: () => deleteColumn(col), canManage: isAdmin, children: colTasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableTaskCard, { task: t, orientation, clients, profiles, columns, tags, statuses, collaborators, minimal: minimalCards, onEdit: () => {
            setEditTask(t);
            setDialogOpen(true);
          }, onDuplicate: () => {
            setDuplicateTaskTarget(t);
            setDuplicateDueDate("");
          } }, t.id)) }, col.id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CompletedColumn, { count: completedTasks.length, orientation, minimal: minimalCards, taskIds: completedTasks.map((t) => t.id), children: completedTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-center justify-center text-xs text-muted-foreground", children: "Nenhuma tarefa concluída ainda." }) : completedTasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableTaskCard, { task: t, colId: COMPLETED_COL_ID, orientation, clients, profiles, columns, tags, statuses, collaborators, minimal: minimalCards, onEdit: () => {
          setEditTask(t);
          setDialogOpen(true);
        }, onDuplicate: () => {
          setDuplicateTaskTarget(t);
          setDuplicateDueDate("");
        } }, t.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DragOverlay, { children: activeTask && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rotate-2 opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TaskCard, { task: activeTask, clients, profiles, columns, tags, statuses, collaborators, minimal: minimalCards }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TaskDialog, { open: dialogOpen, onOpenChange: setDialogOpen, task: editTask, defaultColumnId: defaultCol }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!duplicateTaskTarget, onOpenChange: (open) => {
      if (!open && !duplicatingTask) setDuplicateTaskTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Duplicar tarefa" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Defina o novo prazo para a cópia de “",
          duplicateTaskTarget?.title,
          "”."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: duplicateDueDate, onChange: (event) => setDuplicateDueDate(event.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: duplicatingTask, onClick: () => setDuplicateTaskTarget(null), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !duplicateDueDate || duplicatingTask, onClick: () => duplicateTaskTarget && void duplicateTask(duplicateTaskTarget, duplicateDueDate), children: duplicatingTask ? "Duplicando…" : "Duplicar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagManagerDialog, { open: tagsOpen, onOpenChange: setTagsOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClientFilesSheet, { open: filesOpen, onOpenChange: setFilesOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: columnEditor.open, onOpenChange: (o) => {
      if (!o) setColumnEditor((c) => ({
        ...c,
        open: false
      }));
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: columnEditor.id ? "Editar coluna" : "Nova coluna" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: columnEditor.name, onChange: (e) => setColumnEditor((c) => ({
            ...c,
            name: e.target.value
          })), placeholder: "Ex.: Em revisão", autoFocus: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: "Cor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: columnEditor.color, onChange: (e) => setColumnEditor((c) => ({
              ...c,
              color: e.target.value
            })), className: "h-9 w-14 cursor-pointer rounded border bg-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: columnEditor.color, onChange: (e) => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColumnEditor((c) => ({
                ...c,
                color: v
              }));
            }, className: "flex-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: ["#1e3a8a", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#ec4899", "#64748b"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setColumnEditor((cur) => ({
            ...cur,
            color: c
          })), className: "h-6 w-6 rounded-full border border-border shadow-sm transition hover:scale-110", style: {
            background: c
          }, title: c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setColumnEditor((c) => ({
          ...c,
          open: false
        })), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => void saveColumn(), children: "Salvar" })
      ] })
    ] }) })
  ] });
}
function KanbanScrollArea({
  orientation,
  children
}) {
  const mainRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = mainRef.current;
    if (!el || orientation !== "horizontal") return;
    const onWheel = (e) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const target = e.target;
      const column = target?.closest(".kanban-scroll");
      if (column && column !== el && column.scrollHeight > column.clientHeight + 1) {
        return;
      }
      if (e.deltaY !== 0 && e.deltaX === 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, {
      passive: false
    });
    return () => el.removeEventListener("wheel", onWheel);
  }, [orientation]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mainRef, className: "kanban-scroll min-h-0 flex-1 overflow-auto p-4", children }) });
}
export {
  KanbanPage as component
};
