import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { o as cn } from "./router-DXKzFnT6.mjs";
import { u as useEditor, E as EditorContent } from "../_libs/tiptap__react.mjs";
import { M as Mark, m as mergeAttributes } from "../_libs/tiptap__core.mjs";
import { i as index_default } from "../_libs/tiptap__starter-kit.mjs";
import { i as index_default$1 } from "../_libs/tiptap__extension-link.mjs";
import { i as index_default$2 } from "../_libs/tiptap__extension-highlight.mjs";
import { q as Bold, I as Italic, r as Underline, s as Strikethrough, H as Heading2, t as Heading3, u as List, v as ListOrdered, Q as Quote, w as Code, x as Link, y as Eraser, z as Undo2, R as Redo2 } from "../_libs/lucide-react.mjs";
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
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
      setUnderline: () => ({ commands }) => commands.setMark(this.name),
      toggleUnderline: () => ({ commands }) => commands.toggleMark(this.name),
      unsetUnderline: () => ({ commands }) => commands.unsetMark(this.name)
    };
  }
});
function ToolbarBtn({
  active,
  disabled,
  onClick,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onMouseDown: (e) => e.preventDefault(),
      onClick,
      disabled,
      title,
      className: cn(
        "inline-flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-30",
        active && "bg-primary/15 text-primary"
      ),
      children
    }
  );
}
function Toolbar({ editor }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-0.5 border-b bg-muted/30 px-1 py-0.5",
      onPointerDown: (e) => e.stopPropagation(),
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Negrito (Ctrl+B)", active: editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Itálico (Ctrl+I)", active: editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Sublinhado", active: editor.isActive("underline"), onClick: () => editor.chain().focus().toggleUnderline().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Tachado", active: editor.isActive("strike"), onClick: () => editor.chain().focus().toggleStrike().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Strikethrough, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5 h-4 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Título 2", active: editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Título 3", active: editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading3, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5 h-4 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Lista", active: editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Lista numerada", active: editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Citação", active: editor.isActive("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Código", active: editor.isActive("code"), onClick: () => editor.chain().focus().toggleCode().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToolbarBtn,
          {
            title: "Link",
            active: editor.isActive("link"),
            onClick: () => {
              const prev = editor.getAttributes("link").href;
              const url = window.prompt("URL", prev ?? "https://");
              if (url === null) return;
              if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                return;
              }
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-3 w-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5 h-4 w-px bg-border" }),
        [
          { color: "#fef08a", label: "Amarelo" },
          { color: "#bbf7d0", label: "Verde" },
          { color: "#bfdbfe", label: "Azul" },
          { color: "#fbcfe8", label: "Rosa" },
          { color: "#fed7aa", label: "Laranja" }
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToolbarBtn,
          {
            title: `Marca-texto ${h.label}`,
            active: editor.isActive("highlight", { color: h.color }),
            onClick: () => editor.chain().focus().toggleHighlight({ color: h.color }).run(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "block h-3 w-3 rounded-sm border border-black/10",
                style: { background: h.color }
              }
            )
          },
          h.color
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ToolbarBtn,
          {
            title: "Remover marca-texto",
            onClick: () => editor.chain().focus().unsetHighlight().run(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "h-3 w-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5 h-4 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Desfazer", onClick: () => editor.chain().focus().undo().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { title: "Refazer", onClick: () => editor.chain().focus().redo().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, { className: "h-3 w-3" }) })
      ]
    }
  );
}
function RichTextEditor({
  value,
  onChange,
  onBlur,
  onSubmit,
  autoFocus,
  placeholder,
  className,
  minHeight = 60
}) {
  const editor = useEditor({
    extensions: [
      index_default.configure({ heading: { levels: [2, 3] } }),
      UnderlineMark,
      index_default$1.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "underline text-primary" } }),
      index_default$2.configure({ multicolor: true })
    ],
    content: value || "",
    autofocus: autoFocus ? "end" : false,
    editorProps: {
      attributes: {
        class: cn(
          "tiptap prose prose-sm dark:prose-invert max-w-none px-2 py-2 text-xs leading-snug focus:outline-none",
          className
        ),
        style: `min-height:${minHeight}px;`
      },
      handleKeyDown: (_view, event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          onSubmit?.();
          return true;
        }
        return false;
      }
    },
    onUpdate: ({ editor: editor2 }) => onChange(editor2.getHTML()),
    onBlur: () => onBlur?.()
  });
  reactExports.useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);
  if (!editor) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "tiptap-wrapper relative overflow-hidden rounded border bg-background",
      style: { cursor: "text" },
      onPointerDown: (e) => e.stopPropagation(),
      onMouseDown: (e) => e.stopPropagation(),
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { editor }),
        placeholder && editor.isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute px-2 py-2 text-xs text-muted-foreground/60", children: placeholder }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor })
      ]
    }
  );
}
function RichTextView({
  html,
  className,
  onClick
}) {
  const looksLikeHtml = /<\/?(p|h[1-6]|ul|ol|li|strong|em|u|code|blockquote|a|br|s|hr)\b/i.test(html);
  if (!looksLikeHtml) {
    const formattedHtml = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>").replace(/\r?\n/g, "<br />");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick,
        className: cn(
          "text-xs leading-snug [overflow-wrap:anywhere] [&_strong]:font-bold [&_em]:italic [&_u]:underline",
          className
        ),
        dangerouslySetInnerHTML: { __html: formattedHtml }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick,
      className: cn(
        "tiptap prose prose-sm dark:prose-invert max-w-none text-xs leading-snug [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h2]:text-sm [&_h3]:text-xs [&_a]:underline [&_a]:text-primary [&_u]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1",
        className
      ),
      dangerouslySetInnerHTML: { __html: html }
    }
  );
}
export {
  Popover as P,
  RichTextView as R,
  PopoverTrigger as a,
  PopoverContent as b,
  RichTextEditor as c
};
