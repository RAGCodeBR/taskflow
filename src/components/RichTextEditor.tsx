import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
        ...(attachmentId ? { "data-task-attachment-id": attachmentId } : {}),
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
    .filter((file, index, all) =>
      all.findIndex((candidate) =>
        candidate.name === file.name &&
        candidate.size === file.size &&
        candidate.lastModified === file.lastModified,
      ) === index,
    );
}

function clipboardHtmlImageData(clipboardData: DataTransfer | null) {
  const html = clipboardData?.getData("text/html") || "";
  const sources = [...html.matchAll(/<img[^>]+src=["'](data:image\/[a-zA-Z0-9.+-]+;base64,[^"']+)["']/gi)]
    .map((match) => match[1]);

  return sources.map((source, index) => {
    const [, mimeType = "image/png", encoded = ""] = source.match(/^data:([^;]+);base64,(.+)$/i) || [];
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new File([bytes], `print-colado-${Date.now()}-${index}.${mimeType.split("/")[1] || "png"}`, { type: mimeType });
  });
}

function allClipboardImageFiles(clipboardData: DataTransfer | null) {
  // Windows, macOS e a maior parte das extensões entregam o binário em
  // files/items. Algumas extensões entregam somente HTML com data:image.
  // Preferimos o binário quando ambos existem para não duplicar o print.
  const binaryFiles = clipboardImageFiles(clipboardData);
  return binaryFiles.length ? binaryFiles : clipboardHtmlImageData(clipboardData);
}

function attachmentIdFromImage(image: HTMLImageElement) {
  const dataId = image.dataset.taskAttachmentId;
  if (dataId) return dataId;
  const source = image.getAttribute("src") || "";
  return source.match(/^taskflow-attachment:\/\/([^/?#]+)/)?.[1] || null;
}

function stripStoredPrintImages(html: string) {
  // Prints colados são anexos da tarefa após o salvamento. Não os repetimos
  // dentro da descrição do cartão; a galeria de Arquivos é a visualização
  // única, com miniatura e download.
  return html.replace(/<img\b[^>]*(?:data-task-attachment-id|src="taskflow-attachment:\/\/)[^>]*>/gi, "");
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
  /** Recebe imagens coladas diretamente no texto (⌘V / Ctrl+V). */
  onImagePaste?: (images: PastedEditorImage[]) => void;
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

  const text = editor.getText();
  const empty = !text.trim();

  const copy = async () => {
    if (empty) return;
    const html = editor.getHTML();
    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        // Keeps the formatting when pasted into a rich editor, plain text elsewhere.
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
    } catch {
      // Fallback for contexts without the async clipboard API (http, older browsers).
      const area = document.createElement("textarea");
      area.value = text;
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

function Toolbar({ editor }: { editor: Editor }) {
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
}: Props) {
  const onImagePasteRef = useRef(onImagePaste);
  const imageHandledFromPasteRef = useRef(false);
  const clipboardReadInFlightRef = useRef(false);

  useEffect(() => {
    onImagePasteRef.current = onImagePaste;
  }, [onImagePaste]);

  const insertPastedImages = (files: File[]) => {
    if (!files.length || !onImagePasteRef.current) return false;
    const images = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      src: URL.createObjectURL(file),
    }));
    images.forEach((image) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "taskImage",
          attrs: { src: image.src, alt: image.file.name, pendingId: image.id },
        })
        .run();
    });
    onImagePasteRef.current(images);
    return true;
  };

  const readClipboardImage = async () => {
    if (!navigator.clipboard?.read || clipboardReadInFlightRef.current) return;
    clipboardReadInFlightRef.current = true;
    try {
      const items = await navigator.clipboard.read();
      const files: File[] = [];
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"));
        if (!imageType) continue;
        const blob = await item.getType(imageType);
        files.push(new File([blob], `print-${Date.now()}.${imageType.split("/")[1] || "png"}`, { type: imageType }));
      }
      // Se o evento nativo já entregou o PNG, não duplica o print. Caso o
      // Lightshot só tenha liberado a imagem na API, este é o caminho que a
      // coloca diretamente no cursor.
      if (!imageHandledFromPasteRef.current) insertPastedImages(files);
    } catch {
      // O navegador pode bloquear a leitura extra do clipboard; os itens do
      // evento continuam sendo a primeira via para imagens copiadas.
    } finally {
      clipboardReadInFlightRef.current = false;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      UnderlineMark,
      TaskImage,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "underline text-primary" } }),
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class: cn(
          "tiptap prose prose-sm dark:prose-invert max-w-none px-2 py-2 text-xs leading-snug [overflow-wrap:anywhere] focus:outline-none",
          className,
        ),
        style: `min-height:${minHeight}px;`,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onBlur: () => onBlur?.(),
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;

    // Depois de salvar, a descrição mantém um identificador seguro do anexo
    // (taskflow-attachment://...), não uma URL pública. No editor, trocamos
    // apenas a imagem exibida por um blob local, sem alterar o HTML salvo.
    const container = editor.view.dom;
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

      const pathById = new Map(attachments.map((attachment) => [attachment.id, attachment.storage_path]));
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
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;

    // A captura nativa no próprio ProseMirror é necessária para aplicativos
    // como Lightshot no macOS. Ela recebe o PNG antes dos handlers do React e
    // do Tiptap, que poderiam consumir o ⌘V sem inserir a imagem.
    const target = editor.view.dom;
    const handleNativePaste = (event: ClipboardEvent) => {
      const files = allClipboardImageFiles(event.clipboardData);
      if (files.length) {
        event.preventDefault();
        event.stopImmediatePropagation();
        imageHandledFromPasteRef.current = insertPastedImages(files);
        return;
      }
      void readClipboardImage();
    };

    target.addEventListener("paste", handleNativePaste, true);
    return () => target.removeEventListener("paste", handleNativePaste, true);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    // Alguns apps de captura do macOS atualizam o clipboard no atalho, mas
    // não propagam o evento paste até o campo rico. Este fallback começa a
    // leitura ainda dentro do gesto ⌘V/Ctrl+V, quando o navegador autoriza a
    // Clipboard API.
    const handlePasteShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "v" || !editor.isFocused) return;
      imageHandledFromPasteRef.current = false;
      void readClipboardImage();
    };

    window.addEventListener("keydown", handlePasteShortcut, true);
    return () => window.removeEventListener("keydown", handlePasteShortcut, true);
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className="tiptap-wrapper relative overflow-hidden rounded border bg-background"
      style={{ cursor: "text" }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Toolbar editor={editor} />
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
      const pathById = new Map(attachments.map((attachment) => [attachment.id, attachment.storage_path]));
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
        onClick={onClick}
        className={cn(
          "text-xs leading-snug [overflow-wrap:anywhere] [&_strong]:font-bold [&_em]:italic [&_u]:underline",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />
    );
  }
  return (
    <div
      ref={contentRef}
      onClick={onClick}
      className={cn(
        "tiptap prose prose-sm dark:prose-invert max-w-none text-xs leading-snug [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h2]:text-sm [&_h3]:text-xs [&_a]:underline [&_a]:text-primary [&_u]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_img]:my-3 [&_img]:block [&_img]:max-h-56 [&_img]:max-w-[80%] [&_img]:rounded-lg [&_img]:border [&_img]:bg-muted [&_img]:p-1 [&_img]:shadow-sm",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
