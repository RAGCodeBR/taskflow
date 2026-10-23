import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { Mark, Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import {
  Highlighter,
  Eraser,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Code,
  Quote,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Copy,
  Check,
  ImagePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { plainTextForClipboard } from "@/lib/rich-text-clipboard";
import { htmlHasMeaningfulText, plainTextToEditorHtml, richTextPasteContent } from "@/lib/rich-text-paste";
import { isTaskAttachmentTooLarge, MAX_TASK_ATTACHMENT_LABEL } from "@/lib/attachment-limits";
import { linkifyTextNodes } from "@/lib/text-links";
import { linkifyEditorDocument } from "@/lib/editor-links";

const UnderlineMark = Mark.create({
  name: "underline",
  parseHTML() {
    return [{ tag: "u" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["u", mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setUnderline:
        () =>
        ({ commands }) =>
          commands.setMark(this.name),
      toggleUnderline:
        () =>
        ({ commands }) =>
          commands.toggleMark(this.name),
      unsetUnderline:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    };
  },
});

const TaskImage = Node.create({
  name: "taskImage",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      pendingId: { default: null, parseHTML: (element) => element.getAttribute("data-taskflow-pending-id") },
      attachmentId: { default: null, parseHTML: (element) => element.getAttribute("data-task-attachment-id") },
    };
  },
  parseHTML() {
    return [{ tag: "img[data-taskflow-pending-id]" }, { tag: "img[data-task-attachment-id]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const { pendingId, attachmentId, ...attrs } = HTMLAttributes;
    return [
      "img",
      mergeAttributes(attrs, {
        class: "my-3 block max-h-56 max-w-[80%] rounded-lg border bg-muted p-1 shadow-sm object-contain",
        ...(pendingId ? { "data-taskflow-pending-id": pendingId } : {}),
        ...(attachmentId ? { "data-task-attachment-id": attachmentId, title: "Abrir print e baixar", tabindex: "0" } : {}),
      }),
    ];
  },
});

export type PastedEditorImage = { id: string; file: File; src: string };

function clipboardImageFiles(clipboardData: DataTransfer | null) {
  const fromItems = Array.from(clipboardData?.items ?? [])
    .filter((item) => item.type.startsWith("image/"))
    .map((item) => item.getAsFile())
    .filter((file): file is File => file !== null);

  return [...Array.from(clipboardData?.files ?? []), ...fromItems]
    .filter((file) => file.type.startsWith("image/"))
    .filter((file, index, all) => all.findIndex((candidate) =>
      candidate.name === file.name && candidate.size === file.size && candidate.lastModified === file.lastModified,
    ) === index);
}

function clipboardHtmlImageFiles(clipboardData: DataTransfer | null) {
  const html = clipboardData?.getData("text/html") || "";
  const sources = [...html.matchAll(/<img[^>]+src=["'](data:image\/[a-zA-Z0-9.+-]+;base64,[^"']+)["']/gi)]
    .map((match) => match[1]);

  return sources.flatMap((source, index) => {
    const [, mimeType = "image/png", encoded = ""] = source.match(/^data:([^;]+);base64,(.+)$/i) || [];
    try {
      const binary = atob(encoded);
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      return [new File([bytes], `print-colado-${Date.now()}-${index}.${mimeType.split("/")[1] || "png"}`, { type: mimeType })];
    } catch {
      return [];
    }
  });
}

export function allClipboardImageFiles(clipboardData: DataTransfer | null) {
  const files = clipboardImageFiles(clipboardData);
  return files.length ? files : clipboardHtmlImageFiles(clipboardData);
}

export function hasClipboardText(clipboardData: DataTransfer | null) {
  const plainText = clipboardData?.getData("text/plain").trim() || "";
  const html = clipboardData?.getData("text/html").trim() || "";
  // Imagem copiada por Lightshot/extensões pode ter um HTML com apenas <img>
  // e até um texto auxiliar. Nesse caso ela continua sendo um print.
  const imageOnlyHtml = Boolean(html) && !htmlHasMeaningfulText(html) && allClipboardImageFiles(clipboardData).length > 0;
  if (!imageOnlyHtml && (plainText || htmlHasMeaningfulText(html))) return true;

  const types = Array.from(clipboardData?.types ?? []).map((type) => type.toLowerCase());
  return types.some((type) =>
    type === "text/rtf" || type === "application/rtf" || type === "application/x-rtf" || type === "public.rtf",
  );
}

function attachmentIdFromImage(image: HTMLImageElement) {
  const dataId = image.dataset.taskAttachmentId;
  if (dataId) return dataId;
  const source = image.getAttribute("src") || "";
  return source.match(/^taskflow-attachment:\/\/([^/?#]+)/)?.[1] || null;
}

const loadingPrintSource = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="150" viewBox="0 0 480 150"><rect width="480" height="150" rx="12" fill="#f1f5f9"/><rect x="20" y="20" width="440" height="110" rx="8" fill="#e2e8f0"/><text x="240" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#64748b">Carregando print…</text></svg>',
)}`;

function stripStoredPrintImages(html: string) {
  // Prints colados são anexos da tarefa após o salvamento. Não os repetimos
  // dentro da descrição do cartão; a galeria de Arquivos é a visualização
  // única, com miniatura e download.
  return html.replace(/<img\b[^>]*(?:data-task-attachment-id|src="taskflow-attachment:\/\/)[^>]*>/gi, "");
}

function paragraphClipboardContent(html: string) {
  // Empty paragraphs already represent blank lines. Flatten paragraph tags
  // for rich destinations so their own paragraph spacing does not double them.
  const container = document.createElement("div");
  container.innerHTML = html;
  const blocks = Array.from(container.childNodes).filter(
    (node) => node.nodeType !== 3 || Boolean(node.textContent?.trim()),
  );
  if (!blocks.length || !blocks.every((node) => node instanceof HTMLParagraphElement)) return null;

  const inlineText = (node: ChildNode): string => {
    if (node.nodeType === 3) return node.textContent ?? "";
    if (node.nodeName === "BR") return "\n";
    return Array.from(node.childNodes).map(inlineText).join("");
  };
  const paragraphs = blocks as HTMLParagraphElement[];
  const content = paragraphs.map((paragraph) => {
    const onlyPlaceholderBreak = !paragraph.textContent && paragraph.childNodes.length === 1 && paragraph.firstChild?.nodeName === "BR";
    return {
      text: onlyPlaceholderBreak ? "" : inlineText(paragraph),
      html: onlyPlaceholderBreak ? "" : paragraph.innerHTML,
    };
  });
  return {
    text: content.map((paragraph) => paragraph.text).join("\n"),
    html: content.map((paragraph) => paragraph.html).join("<br>"),
  };
}

interface Props {
  value: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  minHeight?: number;
  /** Caps the editing area; content scrolls inside so the footer stays reachable. */
  maxHeight?: number;
  /** Shows a footer button that copies the written content to the clipboard. */
  copyable?: boolean;
  /** Recebe imagens coladas quando o clipboard contiver somente um print. */
  onImagePaste?: (images: PastedEditorImage[]) => void;
  /** Abre um print já salvo diretamente da descrição. */
  onStoredImageClick?: (attachmentId: string) => void;
  /** Permite escolher ou arrastar imagens para a posição atual do texto. */
  imageTools?: boolean;
  /** Bloqueia edições enquanto a tarefa e seus prints estão sendo salvos. */
  disabled?: boolean;
  /** Prévia local do print que acabou de ser salvo, mantida durante a troca pelo anexo. */
  storedImagePreviews?: ReadonlyMap<string, string>;
  storedImageTable?: "attachments" | "subtask_attachments";
}

function ToolbarBtn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-30",
        active && "bg-primary/15 text-primary",
      )}
    >
      {children}
    </button>
  );
}

function CopyButton({ editor }: { editor: Editor }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const text = plainTextForClipboard(editor.state.doc.content);
  const empty = !text.trim();

  const copy = async () => {
    if (empty) return;
    const copiedContent = paragraphClipboardContent(editor.getHTML());
    const plainText = copiedContent?.text ?? text;
    const html = copiedContent?.html ?? editor.getHTML();
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        // Keeps the formatting when pasted into a rich editor, plain text elsewhere.
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(plainText);
      }
      setCopied(true);
    } catch {
      // Fallback for contexts without the async clipboard API (http, older browsers).
      const area = document.createElement("textarea");
      area.value = plainText;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      setCopied(ok);
    }
  };

  return (
    <div
      className="flex justify-end border-t bg-muted/30 px-1 py-0.5"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={copy}
        disabled={empty}
        title={empty ? "Escreva algo para copiar" : "Copiar texto da descrição"}
        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

function Toolbar({ editor, onAddImage }: { editor: Editor; onAddImage?: () => void }) {
  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 px-1 py-0.5"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <ToolbarBtn title="Negrito (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Itálico (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Sublinhado" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Tachado" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-3 w-3" />
      </ToolbarBtn>
      <span className="mx-0.5 h-4 w-px bg-border" />
      <ToolbarBtn title="Título 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Título 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="h-3 w-3" />
      </ToolbarBtn>
      <span className="mx-0.5 h-4 w-px bg-border" />
      <ToolbarBtn title="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Lista numerada" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Citação" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Código" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
        <Code className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn
        title="Link"
        active={editor.isActive("link")}
        onClick={() => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = window.prompt("URL", prev ?? "https://");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="h-3 w-3" />
      </ToolbarBtn>
      {onAddImage ? (
        <ToolbarBtn title="Inserir imagem na descrição" onClick={onAddImage}>
          <ImagePlus className="h-3 w-3" />
        </ToolbarBtn>
      ) : null}
      <span className="mx-0.5 h-4 w-px bg-border" />
      {[
        { color: "#fef08a", label: "Amarelo" },
        { color: "#bbf7d0", label: "Verde" },
        { color: "#bfdbfe", label: "Azul" },
        { color: "#fbcfe8", label: "Rosa" },
        { color: "#fed7aa", label: "Laranja" },
      ].map((h) => (
        <ToolbarBtn
          key={h.color}
          title={`Marca-texto ${h.label}`}
          active={editor.isActive("highlight", { color: h.color })}
          onClick={() => editor.chain().focus().toggleHighlight({ color: h.color }).run()}
        >
          <span
            className="block h-3 w-3 rounded-sm border border-black/10"
            style={{ background: h.color }}
          />
        </ToolbarBtn>
      ))}
      <ToolbarBtn
        title="Remover marca-texto"
        onClick={() => editor.chain().focus().unsetHighlight().run()}
      >
        <Eraser className="h-3 w-3" />
      </ToolbarBtn>
      <span className="mx-0.5 h-4 w-px bg-border" />
      <ToolbarBtn title="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="h-3 w-3" />
      </ToolbarBtn>
      <ToolbarBtn title="Refazer" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="h-3 w-3" />
      </ToolbarBtn>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
  onBlur,
  autoFocus,
  placeholder,
  className,
  minHeight = 60,
  maxHeight = 320,
  copyable = false,
  onImagePaste,
  onStoredImageClick,
  imageTools = false,
  disabled = false,
  storedImagePreviews,
  storedImageTable = "attachments",
}: Props) {
  const onImagePasteRef = useRef(onImagePaste);
  const onStoredImageClickRef = useRef(onStoredImageClick);
  const nativePasteHandledRef = useRef(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const storedImageUrlsRef = useRef(new Map<string, string>());
  const storedImageLoadsRef = useRef(new Map<string, Promise<string | null>>());
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      storedImageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      storedImageUrlsRef.current.clear();
    };
  }, []);

  useEffect(() => {
    onImagePasteRef.current = onImagePaste;
  }, [onImagePaste]);

  useEffect(() => {
    onStoredImageClickRef.current = onStoredImageClick;
  }, [onStoredImageClick]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false, underline: false }),
      UnderlineMark,
      TaskImage,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: { class: "cursor-pointer underline text-primary", target: "_blank", rel: "noopener noreferrer" },
      }),
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      clipboardTextSerializer: (slice) => plainTextForClipboard(slice.content),
      attributes: {
        class: cn(
          "tiptap prose prose-sm dark:prose-invert max-w-none px-2 py-2 text-xs leading-snug [overflow-wrap:anywhere] focus:outline-none",
          className,
        ),
        style: `min-height:${minHeight}px;`,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onBlur: ({ editor }) => {
      const linkedContent = linkifyEditorDocument(editor.getJSON());
      if (linkedContent) editor.commands.setContent(linkedContent, { emitUpdate: false });
      onBlur?.();
    },
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  const insertPastedImages = useCallback((files: File[]) => {
    if (!editor || !files.length || !onImagePasteRef.current) return false;
    const accepted = files.filter((file) => !isTaskAttachmentTooLarge(file));
    if (accepted.length !== files.length) toast.error(`Cada imagem deve ter no máximo ${MAX_TASK_ATTACHMENT_LABEL}.`);
    if (!accepted.length) return false;
    const images = accepted.map((file) => ({
      id: crypto.randomUUID(),
      file,
      src: URL.createObjectURL(file),
    }));
    images.forEach((image) => {
      editor.chain().focus().insertContent({
        type: "taskImage",
        attrs: { src: image.src, alt: image.file.name, pendingId: image.id },
      }).run();
    });
    onImagePasteRef.current(images);
    return true;
  }, [editor]);

  const insertClipboardText = useCallback((html: string, text: string) => {
    if (!editor) return;
    const pasted = richTextPasteContent(html, text);
    if (!pasted.content) return;
    editor.chain().focus().insertContent(
      pasted.kind === "html" ? pasted.content : plainTextToEditorHtml(pasted.content),
    ).run();
  }, [editor]);

  useLayoutEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    // Depois do upload, troque o preview temporário pelo identificador salvo
    // mesmo quando o editor ainda estiver focado. Caso contrário, o print
    // continua apontando para um blob e parece quebrado ao salvar.
    const reconcilesSavedImages = current.includes("data-taskflow-pending-id")
      && value.includes("data-task-attachment-id");
    if (editor.isFocused && !reconcilesSavedImages) return;
    if (value !== current) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    const linkedContent = linkifyEditorDocument(editor.getJSON());
    if (linkedContent) editor.commands.setContent(linkedContent, { emitUpdate: false });
  }, [value, editor]);

  useLayoutEffect(() => {
    if (!editor) return;
    const container = editor.view.dom;
    const images = Array.from(container.querySelectorAll<HTMLImageElement>("img[data-task-attachment-id], img[src^='taskflow-attachment://']"));
    if (!images.length) return;
    const urls = storedImageUrlsRef.current;
    const loads = storedImageLoadsRef.current;
    const missing = new Set<string>();
    images.forEach((image) => {
      const id = attachmentIdFromImage(image);
      if (!id) return;
      const preview = storedImagePreviews?.get(id) ?? urls.get(id);
      // O identificador taskflow-attachment:// não é uma URL de imagem. Nunca
      // deixe o navegador tentar desenhá-lo enquanto o Storage responde.
      image.src = preview ?? loadingPrintSource;
      if (!preview && !loads.has(id)) missing.add(id);
    });
    if (missing.size) {
      const ids = [...missing];
      const batch = (async () => {
        const { data: attachments } = await supabase.from(storedImageTable)
          .select("id, storage_path").in("id", ids);
        const paths = new Map((attachments ?? []).map((attachment: { id: string; storage_path: string }) => [attachment.id, attachment.storage_path]));
        return new Map(await Promise.all(ids.map(async (id) => {
          const path = paths.get(id);
          if (!path) return [id, null] as const;
          const { data } = await supabase.storage.from("task-attachments").download(path);
          if (!data || !mountedRef.current) return [id, null] as const;
          const url = URL.createObjectURL(data);
          urls.set(id, url);
          return [id, url] as const;
        })));
      })();
      ids.forEach((id) => {
        const load = batch.then((results) => results.get(id) ?? null).catch(() => null);
        loads.set(id, load);
        void load.finally(() => { if (loads.get(id) === load) loads.delete(id); });
      });
    }
    images.forEach((image) => {
      const id = attachmentIdFromImage(image);
      if (!id || storedImagePreviews?.has(id)) return;
      const load = loads.get(id);
      if (load) void load.then((url) => {
        if (url && image.isConnected && mountedRef.current) image.src = url;
      });
    });
  }, [editor, value, storedImagePreviews, storedImageTable]);

  useEffect(() => {
    if (!editor || !imageTools || !onStoredImageClick) return;
    const target = editor.view.dom;
    const openImage = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && !["Enter", " "].includes(event.key)) return;
      const image = event.target instanceof HTMLImageElement ? event.target : null;
      const attachmentId = image && attachmentIdFromImage(image);
      if (!attachmentId) return;
      event.preventDefault();
      event.stopPropagation();
      onStoredImageClickRef.current?.(attachmentId);
    };
    target.addEventListener("click", openImage);
    target.addEventListener("keydown", openImage);
    return () => {
      target.removeEventListener("click", openImage);
      target.removeEventListener("keydown", openImage);
    };
  }, [editor, imageTools, onStoredImageClick]);

  useEffect(() => {
    if (!editor) return;

    const target = editor.view.dom;
    const handleNativePaste = (event: ClipboardEvent) => {
      const html = event.clipboardData?.getData("text/html").trim() || "";
      const text = event.clipboardData?.getData("text/plain") || "";

      // Texto da ata: inserimos diretamente o HTML disponibilizado pelo
      // Google. Isso preserva listas, negrito, links e quebras mesmo quando
      // outro handler do navegador não entrega a colagem ao ProseMirror.
      if ((html || text) && hasClipboardText(event.clipboardData)) {
        nativePasteHandledRef.current = true;
        event.preventDefault();
        event.stopImmediatePropagation();
        insertClipboardText(html, text);
        return;
      }

      const files = allClipboardImageFiles(event.clipboardData);
      if (!files.length || !onImagePasteRef.current) return;

      nativePasteHandledRef.current = true;
      event.preventDefault();
      event.stopImmediatePropagation();
      insertPastedImages(files);
    };

    target.addEventListener("paste", handleNativePaste, true);
    return () => target.removeEventListener("paste", handleNativePaste, true);
  }, [editor, insertClipboardText, insertPastedImages]);

  useEffect(() => {
    if (!editor || !imageTools) return;
    const target = editor.view.dom;
    const handleDragOver = (event: DragEvent) => {
      if (Array.from(event.dataTransfer?.items ?? []).some((item) => item.type.startsWith("image/"))) {
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
      }
    };
    const handleDrop = (event: DragEvent) => {
      const files = Array.from(event.dataTransfer?.files ?? []).filter((file) => file.type.startsWith("image/"));
      if (!files.length) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const position = editor.view.posAtCoords({ left: event.clientX, top: event.clientY });
      if (position) editor.chain().focus().setTextSelection(position.pos).run();
      insertPastedImages(files);
    };
    target.addEventListener("dragover", handleDragOver, true);
    target.addEventListener("drop", handleDrop, true);
    return () => {
      target.removeEventListener("dragover", handleDragOver, true);
      target.removeEventListener("drop", handleDrop, true);
    };
  }, [editor, imageTools, insertPastedImages]);

  useEffect(() => {
    if (!editor) return;

    // Alguns navegadores e apps de reunião não encaminham o evento `paste`
    // para o campo rico, embora liberem o conteúdo durante o próprio atalho.
    // Ela só insere depois de confirmar que o evento nativo não aconteceu.
    const handlePasteShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "v" || !editor.isFocused) return;
      if (!navigator.clipboard?.read) return;

      nativePasteHandledRef.current = false;
      void (async () => {
        try {
          const items = await navigator.clipboard.read();
          let html = "";
          let text = "";
          const images: File[] = [];
          for (const item of items) {
            if (!html && item.types.includes("text/html")) html = await (await item.getType("text/html")).text();
            if (!text && item.types.includes("text/plain")) text = await (await item.getType("text/plain")).text();
            const imageType = item.types.find((type) => type.startsWith("image/"));
            if (imageType) {
              const blob = await item.getType(imageType);
              images.push(new File([blob], `print-${Date.now()}.${imageType.split("/")[1] || "png"}`, { type: imageType }));
            }
          }
          // Espera o evento nativo da mesma tecla; se ele já tratou o
          // conteúdo, não há segunda inserção.
          window.setTimeout(() => {
            if (nativePasteHandledRef.current) return;
            const htmlIsOnlyImage = Boolean(html.trim()) && !htmlHasMeaningfulText(html);
            if (images.length && (!html.trim() || htmlIsOnlyImage)) {
              nativePasteHandledRef.current = insertPastedImages(images);
            } else if (html.trim() || text) {
              insertClipboardText(html, text);
            }
          }, 0);
        } catch {
          // Se a permissão do navegador bloquear a leitura, a colagem nativa
          // continua sendo usada normalmente.
        }
      })();
    };

    window.addEventListener("keydown", handlePasteShortcut, true);
    return () => window.removeEventListener("keydown", handlePasteShortcut, true);
  }, [editor, insertClipboardText, insertPastedImages]);


  if (!editor) return null;

  return (
    <div
      className={cn("tiptap-wrapper relative overflow-hidden rounded border bg-background", disabled && "pointer-events-none")}
      style={{ cursor: "text" }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onCopy={(event) => {
        const content = paragraphClipboardContent(event.clipboardData.getData("text/html"));
        if (!content) return;
        event.clipboardData.setData("text/plain", content.text);
        event.clipboardData.setData("text/html", content.html);
        event.preventDefault();
      }}
    >
      {imageTools ? (
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Escolher imagens para a descrição"
          onChange={(event) => {
            insertPastedImages(Array.from(event.currentTarget.files ?? []).filter((file) => file.type.startsWith("image/")));
            event.currentTarget.value = "";
          }}
        />
      ) : null}
      <Toolbar editor={editor} onAddImage={imageTools ? () => imageInputRef.current?.click() : undefined} />
      {placeholder && editor.isEmpty ? (
        <div className="pointer-events-none absolute px-2 py-2 text-xs text-muted-foreground/60">{placeholder}</div>
      ) : null}
      <div
        className="overflow-y-auto overscroll-contain"
        style={{ maxHeight: Math.max(minHeight, maxHeight) }}
      >
        <EditorContent editor={editor} />
      </div>
      {copyable ? <CopyButton editor={editor} /> : null}
    </div>
  );
}

/** Display-mode renderer for stored content. Accepts HTML or plain text. */
export function RichTextView({
  html,
  className,
  onClick,
}: {
  html: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  // Some descriptions were persisted with the HTML escaped more than once
  // (for example, `&amp;lt;p&amp;gt;...`). Decode up to three levels, but only when
  // that value represents one of the tags supported by the editor.
  const hasEncodedHtmlTag = /&(?:amp;)*lt;\/?(p|h[1-6]|ul|ol|li|strong|em|u|code|blockquote|a|br|s|hr|mark|img)\b/i.test(html);
  let renderedHtml = html;
  if (hasEncodedHtmlTag) {
    for (let depth = 0; depth < 3; depth += 1) {
      const decoded = renderedHtml
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&amp;/gi, "&");
      if (decoded === renderedHtml) break;
      renderedHtml = decoded;
    }
  }
  renderedHtml = stripStoredPrintImages(renderedHtml);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) linkifyTextNodes(contentRef.current);
    // React can reapply dangerouslySetInnerHTML when the card refreshes even
    // when the stored text is unchanged. Reapply the idempotent transformation
    // after each render so generated links remain clickable.
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);
    if (!event.currentTarget.contains(range.commonAncestorContainer)) return;
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    const content = paragraphClipboardContent(container.innerHTML);
    if (!content) return;
    event.clipboardData.setData("text/plain", content.text);
    event.clipboardData.setData("text/html", content.html);
    event.preventDefault();
  };

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const images = Array.from(container.querySelectorAll<HTMLImageElement>("img[data-task-attachment-id], img[src^='taskflow-attachment://']"));
    if (!images.length) return;

    let active = true;
    const urls: string[] = [];
    void (async () => {
      const ids = [...new Set(images.map(attachmentIdFromImage).filter(Boolean))] as string[];
      const { data: attachments } = await supabase
        .from("attachments")
        .select("id, storage_path")
        .in("id", ids);
      if (!active || !attachments) return;
      const pathById = new Map(attachments.map((attachment: { id: string; storage_path: string }) => [attachment.id, attachment.storage_path]));
      await Promise.all(images.map(async (image) => {
        const path = pathById.get(attachmentIdFromImage(image) ?? "");
        if (!path) return;
        const { data } = await supabase.storage.from("task-attachments").download(path);
        if (!active || !data) return;
        const url = URL.createObjectURL(data);
        urls.push(url);
        image.src = url;
      }));
    })();

    return () => {
      active = false;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [renderedHtml]);
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|u|code|blockquote|a|br|s|hr|mark|img)\b/i.test(renderedHtml);
  if (!looksLikeHtml) {
    const formattedHtml = renderedHtml
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>")
      .replace(/\r?\n/g, "<br />");
    return (
      <div
        ref={contentRef}
        onClick={handleClick}
        onCopy={handleCopy}
        className={cn(
          "text-xs leading-snug [overflow-wrap:anywhere] [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_a]:cursor-pointer [&_a]:underline [&_a]:text-primary",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />
    );
  }
  return (
    <div
      ref={contentRef}
      onClick={handleClick}
      onCopy={handleCopy}
      className={cn(
        "tiptap prose prose-sm dark:prose-invert max-w-none text-xs leading-snug [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h2]:text-sm [&_h3]:text-xs [&_a]:underline [&_a]:text-primary [&_u]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_img]:my-3 [&_img]:block [&_img]:max-h-56 [&_img]:max-w-[80%] [&_img]:rounded-lg [&_img]:border [&_img]:bg-muted [&_img]:p-1 [&_img]:shadow-sm",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
