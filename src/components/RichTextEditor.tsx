import { useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { Mark, mergeAttributes } from "@tiptap/core";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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

interface Props {
  value: string;
  onChange: (html: string) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
  minHeight?: number;
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
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      UnderlineMark,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "underline text-primary" } }),
      Highlight.configure({ multicolor: true }),
    ],
    content: value || "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class: cn(
          "tiptap prose prose-sm dark:prose-invert max-w-none px-2 py-2 text-xs leading-snug focus:outline-none",
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
      <EditorContent editor={editor} />
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
  const hasEncodedHtmlTag = /&(?:amp;)*lt;\/?(p|h[1-6]|ul|ol|li|strong|em|u|code|blockquote|a|br|s|hr|mark)\b/i.test(html);
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
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|u|code|blockquote|a|br|s|hr|mark)\b/i.test(renderedHtml);
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
      onClick={onClick}
      className={cn(
        "tiptap prose prose-sm dark:prose-invert max-w-none text-xs leading-snug [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h2]:text-sm [&_h3]:text-xs [&_a]:underline [&_a]:text-primary [&_u]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
