import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, e as useClients, j as useProfiles, S as Select, n as SelectTrigger, o as SelectValue, p as SelectContent, q as SelectItem, B as Button, I as Input, C as Card, m as useServerFn, s as formatNoteWithAI, F as FileDropZone, A as AttachmentPreviewDialog, D as Dialog, a as DialogContent } from "./router-ZM7179_C.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g } from "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { N as NotebookPen, P as Plus, A as ArrowUp, d as ArrowDown, T as Trash2, f as Paperclip, F as FileText, E as ExternalLink, B as Bold, I as Italic, U as Underline, H as Highlighter, g as Eraser, L as LoaderCircle, a as Sparkles, h as FileDown, M as Minimize2, i as Maximize2, j as Save, c as Check } from "../_libs/lucide-react.mjs";
import { f as format, p as ptBR, a as parseISO } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "tslib";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const sb = supabase;
const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function normalizeNoteHtmlForPdf(rawHtml) {
  if (typeof window === "undefined") return rawHtml;
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml || "", "text/html");
  const root = doc.body;
  root.querySelectorAll("script, style, meta, link, title, noscript, iframe, object").forEach((node) => node.remove());
  root.querySelectorAll("*").forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const keepBackground = el.style.backgroundColor;
    const keepColor = el.style.color;
    const keepTextAlign = el.style.textAlign;
    const keepFontWeight = el.style.fontWeight;
    const keepFontStyle = el.style.fontStyle;
    const keepTextDecoration = el.style.textDecoration;
    el.removeAttribute("class");
    el.removeAttribute("id");
    el.removeAttribute("width");
    el.removeAttribute("height");
    el.removeAttribute("face");
    el.removeAttribute("size");
    el.removeAttribute("dir");
    el.removeAttribute("data-start");
    el.removeAttribute("data-end");
    if (tag !== "a") {
      el.removeAttribute("href");
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
    const nextStyle = [keepBackground ? `background-color: ${keepBackground}` : "", keepColor ? `color: ${keepColor}` : "", keepTextAlign ? `text-align: ${keepTextAlign}` : "", keepFontWeight && keepFontWeight !== "400" && keepFontWeight !== "normal" ? `font-weight: ${keepFontWeight}` : "", keepFontStyle && keepFontStyle !== "normal" ? `font-style: ${keepFontStyle}` : "", keepTextDecoration && keepTextDecoration !== "none" ? `text-decoration: ${keepTextDecoration}` : ""].filter(Boolean).join("; ");
    if (nextStyle) el.setAttribute("style", nextStyle);
    else el.removeAttribute("style");
    if (tag === "font") {
      const fragment = doc.createDocumentFragment();
      while (el.firstChild) fragment.appendChild(el.firstChild);
      el.replaceWith(fragment);
    }
  });
  return root.innerHTML;
}
function syncEditorDom(target, html) {
  if (!target || target.innerHTML === html) return;
  target.innerHTML = html;
}
function extractTextFromHtml(rawHtml) {
  if (typeof window === "undefined") return rawHtml;
  const doc = new DOMParser().parseFromString(rawHtml || "", "text/html");
  return doc.body.textContent ?? "";
}
function openNotePrintPreview({
  title,
  dateLabel,
  html
}) {
  const popup = window.open("", "_blank");
  if (!popup) throw new Error("Não foi possível abrir a nova aba do PDF.");
  const previewCss = `
    :root {
      color-scheme: light;
      --page-width: 210mm;
      --page-padding-y: 20mm;
      --page-padding-x: 18mm;
      --surface: #eef1f5;
      --paper: #ffffff;
      --ink: #1f2937;
      --muted: #6b7280;
      --rule: #d1d5db;
      --accent: #0f172a;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: var(--surface); color: var(--ink); }
    body { font-family: Arial, Helvetica, sans-serif; }
    .preview-shell { min-height: 100vh; padding: 24px; }
    .preview-toolbar {
      position: sticky; top: 0; z-index: 5; display: flex; justify-content: center;
      padding-bottom: 16px;
    }
    .preview-toolbar-inner {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--rule);
      background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    }
    .toolbar-button {
      border: 1px solid var(--rule); background: #fff; color: var(--accent); padding: 10px 14px; cursor: pointer;
      font-size: 13px; font-weight: 600;
    }
    .toolbar-note { font-size: 12px; color: var(--muted); }
    .paper {
      width: min(100%, calc(var(--page-width) + 36mm)); margin: 0 auto; background: var(--paper);
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
    }
    .paper-inner {
      padding: var(--page-padding-y) var(--page-padding-x) calc(var(--page-padding-y) + 2mm);
      min-height: 297mm;
    }
    .doc-title {
      margin: 0 0 10px; font-size: 28px; line-height: 1.1; font-weight: 700; color: var(--accent);
    }
    .doc-date {
      margin: 0 0 22px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--muted);
    }
    .doc-body, .doc-body * {
      max-width: 100%; letter-spacing: 0; word-break: normal; overflow-wrap: break-word;
    }
    .doc-body {
      font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; line-height: 1.7; color: var(--ink);
    }
    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 {
      font-family: Arial, Helvetica, sans-serif; color: var(--accent); line-height: 1.25; break-after: avoid;
      margin: 22px 0 10px;
    }
    .doc-body h1 { font-size: 22px; }
    .doc-body h2 { font-size: 18px; }
    .doc-body h3 { font-size: 16px; }
    .doc-body p, .doc-body div { margin: 0 0 12px; }
    .doc-body ul, .doc-body ol { margin: 0 0 14px; padding-left: 24px; }
    .doc-body li { margin-bottom: 6px; }
    .doc-body blockquote {
      margin: 16px 0; padding: 0 0 0 14px; border-left: 3px solid #cbd5e1; color: #475569;
    }
    .doc-body table { width: 100%; border-collapse: collapse; margin: 14px 0; }
    .doc-body th, .doc-body td { border: 1px solid var(--rule); padding: 7px 8px; text-align: left; }
    .doc-body img { max-width: 100%; height: auto; }
    .doc-body pre, .doc-body code {
      font-family: Consolas, Monaco, monospace; white-space: pre-wrap; word-break: break-word; font-size: 11.5pt;
    }
    .doc-body span[style*="background"] { padding: 0 2px; }
    @page {
      size: A4;
      margin: 18mm 16mm 20mm;
    }
    @media print {
      html, body { background: #fff; }
      .preview-shell { padding: 0; }
      .preview-toolbar { display: none; }
      .paper {
        width: auto; margin: 0; box-shadow: none;
      }
      .paper-inner {
        min-height: auto; padding: 0;
      }
      .doc-title, .doc-date, .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4,
      .doc-body p, .doc-body div, .doc-body ul, .doc-body ol, .doc-body table, .doc-body blockquote, .doc-body pre {
        break-inside: avoid-page;
      }
    }
  `;
  popup.document.open();
  popup.document.write(`<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <style>${previewCss}</style>
      </head>
      <body>
        <div class="preview-shell">
          <div class="preview-toolbar">
            <div class="preview-toolbar-inner">
              <button class="toolbar-button" onclick="window.print()">Imprimir / Salvar em PDF</button>
              <button class="toolbar-button" onclick="window.close()">Fechar</button>
              <span class="toolbar-note">Pré-visualização limpa para impressão profissional.</span>
            </div>
          </div>
          <article class="paper">
            <div class="paper-inner">
              <h1 class="doc-title">${escapeHtml(title)}</h1>
              <p class="doc-date">${escapeHtml(dateLabel)}</p>
              <div class="doc-body">${html}</div>
            </div>
          </article>
        </div>
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => window.print(), 250);
          });
        <\/script>
      </body>
    </html>`);
  popup.document.close();
}
function NotesWorkspace({
  fixedClientId,
  embedded = false
}) {
  const {
    user,
    isAdmin
  } = useAuth();
  const {
    data: clients = []
  } = useClients();
  const {
    data: profiles = []
  } = useProfiles();
  const [clientId, setClientId] = reactExports.useState(fixedClientId ?? null);
  const [notes, setNotes] = reactExports.useState([]);
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const autoCreatedFor = reactExports.useRef(null);
  const [search, setSearch] = reactExports.useState("");
  const [createdBy, setCreatedBy] = reactExports.useState("all");
  const [sortMode, setSortMode] = reactExports.useState(() => {
    if (typeof window === "undefined") return "manual";
    return localStorage.getItem("notes_sort_mode") || "manual";
  });
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("notes_sort_mode", sortMode);
  }, [sortMode]);
  reactExports.useEffect(() => {
    if (!user?.id) return;
    setCreatedBy((current) => current === "all" ? user.id : current);
  }, [user?.id]);
  reactExports.useEffect(() => {
    if (fixedClientId) {
      setClientId(fixedClientId);
    } else if (!clientId && clients[0]) {
      setClientId(clients[0].id);
    }
  }, [clients, clientId, fixedClientId]);
  const load = async (cid) => {
    setLoading(true);
    const {
      data,
      error
    } = await sb.from("client_notes").select("*").eq("client_id", cid).order("position", {
      ascending: true
    }).order("created_at", {
      ascending: false
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setNotes(list);
    if (list.length && !list.find((n) => n.id === selectedId)) {
      setSelectedId(list[0].id);
    }
  };
  reactExports.useEffect(() => {
    if (clientId) void load(clientId);
  }, [clientId]);
  const addNote = async () => {
    if (!clientId || !user) return;
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const minPos = notes.reduce((m, n) => Math.min(m, n.position), 0);
    const {
      data,
      error
    } = await sb.from("client_notes").insert({
      client_id: clientId,
      title: "Nova anotação",
      content: "",
      content_html: "",
      note_date: today,
      created_by: user.id,
      position: minPos - 1
    }).select().single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const created = data;
    setNotes((n) => [created, ...n]);
    setSelectedId(created.id);
  };
  const deleteNote = async (id) => {
    if (!confirm("Excluir esta anotação?")) return;
    setNotes((n) => n.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
    const {
      error
    } = await sb.from("client_notes").delete().eq("id", id);
    if (error) toast.error(error.message);
  };
  const patchNote = (id, patch) => {
    setNotes((n) => n.map((x) => x.id === id ? {
      ...x,
      ...patch
    } : x));
  };
  const persistNote = async (id, patch) => {
    const {
      error
    } = await sb.from("client_notes").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  };
  const sortedNotes = reactExports.useMemo(() => {
    const arr = [...notes];
    switch (sortMode) {
      case "date_desc":
        arr.sort((a, b) => (b.note_date || "").localeCompare(a.note_date || ""));
        break;
      case "date_asc":
        arr.sort((a, b) => (a.note_date || "").localeCompare(b.note_date || ""));
        break;
      case "updated_desc":
        arr.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
        break;
      case "title_asc":
        arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", "pt-BR"));
        break;
      case "manual":
      default:
        arr.sort((a, b) => a.position - b.position || b.created_at.localeCompare(a.created_at));
    }
    return arr;
  }, [notes, sortMode]);
  const authorNameById = reactExports.useMemo(() => new Map(profiles.map((profile) => [profile.id, profile.full_name || "Usuário sem nome"])), [profiles]);
  const noteAuthors = reactExports.useMemo(() => [...new Set(notes.map((note) => note.created_by).filter((id) => !!id))].map((id) => ({
    id,
    name: authorNameById.get(id) ?? "Usuário removido"
  })).sort((a, b) => a.name.localeCompare(b.name, "pt-BR")), [authorNameById, notes]);
  const selectableNoteAuthors = reactExports.useMemo(() => {
    if (!user?.id || noteAuthors.some((author) => author.id === user.id)) return noteAuthors;
    return [{
      id: user.id,
      name: authorNameById.get(user.id) ?? "Meu usuário"
    }, ...noteAuthors].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [authorNameById, noteAuthors, user?.id]);
  const filteredNotes = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    return sortedNotes.filter((note) => {
      const matchesAuthor = createdBy === "all" || note.created_by === createdBy;
      const matchesSearch = !q || note.title.toLowerCase().includes(q) || (note.content ?? "").toLowerCase().includes(q);
      return matchesAuthor && matchesSearch;
    });
  }, [createdBy, sortedNotes, search]);
  reactExports.useEffect(() => {
    if (loading) return;
    if (selectedId && filteredNotes.some((note) => note.id === selectedId)) return;
    setSelectedId(filteredNotes[0]?.id ?? null);
  }, [filteredNotes, loading, selectedId]);
  reactExports.useEffect(() => {
    const hasOwnNote = notes.some((note) => note.created_by === user?.id);
    if (!clientId || !user?.id || loading || createdBy !== user.id || hasOwnNote) return;
    const key = `${clientId}:${user.id}`;
    if (autoCreatedFor.current === key) return;
    autoCreatedFor.current = key;
    void addNote();
  }, [clientId, createdBy, loading, notes, user?.id]);
  const move = async (id, dir) => {
    const ordered = [...sortedNotes];
    const idx = ordered.findIndex((n) => n.id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= ordered.length) return;
    [ordered[idx], ordered[swap]] = [ordered[swap], ordered[idx]];
    const reIndexed = ordered.map((n, i) => ({
      ...n,
      position: i
    }));
    setNotes(reIndexed);
    await Promise.all(reIndexed.map((n) => sb.from("client_notes").update({
      position: n.position
    }).eq("id", n.id)));
  };
  const selected = reactExports.useMemo(() => notes.find((n) => n.id === selectedId) ?? null, [notes, selectedId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embedded ? "flex min-h-[720px] flex-col" : "flex h-[calc(100vh-0px)] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b bg-background p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex items-center gap-2 text-2xl font-bold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "h-6 w-6" }),
          " Anotações"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Anotações dedicadas por cliente, com data, grifos e anexos." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        !fixedClientId && /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: clientId ?? void 0, onValueChange: (v) => setClientId(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione um cliente" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addNote, disabled: !clientId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Nova anotação"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-[340px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex min-h-0 flex-col border-r bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-b p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Buscar anotação…", value: search, onChange: (e) => setSearch(e.target.value), className: "h-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Ordenar:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortMode, onValueChange: (v) => setSortMode(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 flex-1 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manual", children: "Manual (arrastar)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "date_desc", children: "Data ↓ (mais recente)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "date_asc", children: "Data ↑ (mais antiga)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "updated_desc", children: "Atualizado recente" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "title_asc", children: "Título A→Z" })
              ] })
            ] })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] text-muted-foreground", children: "Criado por:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: createdBy, onValueChange: setCreatedBy, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 flex-1 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos os usuários" }),
                selectableNoteAuthors.map((author) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: author.id, children: author.name }, author.id))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto p-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-4 text-sm text-muted-foreground", children: "Carregando…" }) : filteredNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-6 text-center text-xs text-muted-foreground", children: clientId ? "Nenhuma anotação ainda." : "Selecione um cliente." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: filteredNotes.map((n, i) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-stretch gap-1", children: [
            sortMode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: (e) => {
                e.stopPropagation();
                void move(n.id, -1);
              }, disabled: i === 0, title: "Mover para cima", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: (e) => {
                e.stopPropagation();
                void move(n.id, 1);
              }, disabled: i === filteredNotes.length - 1, title: "Mover para baixo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSelectedId(n.id), className: `flex-1 rounded-md border px-3 py-2 text-left transition ${selectedId === n.id ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-medium", children: n.title || "(sem título)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: n.note_date ? format(parseISO(n.note_date), "dd/MM", {
                  locale: ptBR
                }) : "" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-[11px] text-muted-foreground", dangerouslySetInnerHTML: {
                __html: (n.content_html || n.content || "").replace(/<[^>]+>/g, " ")
              } }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] text-muted-foreground", children: [
                "Criada por: ",
                n.created_by ? authorNameById.get(n.created_by) ?? "Usuário removido" : "Não identificado"
              ] })
            ] })
          ] }, n.id);
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-0 overflow-y-auto p-4", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoteEditor, { note: selected, onPatch: (p) => patchNote(selected.id, p), onSave: (p) => persistNote(selected.id, p), onDelete: () => deleteNote(selected.id) }, selected.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "grid h-full place-items-center p-10 text-center text-sm text-muted-foreground", children: "Selecione ou crie uma anotação." }) })
    ] })
  ] });
}
function NotesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NotesWorkspace, {});
}
function NoteEditor({
  note,
  onPatch,
  onSave,
  onDelete
}) {
  const {
    user
  } = useAuth();
  const aiFormat = useServerFn(formatNoteWithAI);
  const [title, setTitle] = reactExports.useState(note.title);
  const [noteDate, setNoteDate] = reactExports.useState(note.note_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const editorRef = reactExports.useRef(null);
  const fsEditorRef = reactExports.useRef(null);
  const pendingPatch = reactExports.useRef({});
  const syncingRef = reactExports.useRef(false);
  const selectedTextRangeRef = reactExports.useRef(null);
  const [saveState, setSaveState] = reactExports.useState("idle");
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const [aiLoading, setAiLoading] = reactExports.useState(false);
  const [editorHtml, setEditorHtml] = reactExports.useState(note.content_html ?? note.content ?? "");
  const [highlightColor, setHighlightColor] = reactExports.useState(null);
  const [attachments, setAttachments] = reactExports.useState([]);
  const [attUrls, setAttUrls] = reactExports.useState({});
  const [uploading, setUploading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const setEditorsHTML = reactExports.useCallback((html) => {
    syncingRef.current = true;
    setEditorHtml(html);
    syncEditorDom(editorRef.current, html);
    syncEditorDom(fsEditorRef.current, html);
    requestAnimationFrame(() => {
      syncingRef.current = false;
    });
  }, []);
  reactExports.useEffect(() => {
    setEditorsHTML(note.content_html ?? note.content ?? "");
    setTitle(note.title);
    setNoteDate(note.note_date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    setHighlightColor(null);
    pendingPatch.current = {};
    setSaveState("idle");
  }, [note.id]);
  reactExports.useEffect(() => {
    if (fullscreen) {
      const html = editorHtml || editorRef.current?.innerHTML || note.content_html || note.content || "";
      requestAnimationFrame(() => {
        syncEditorDom(fsEditorRef.current, html);
      });
    } else {
      syncEditorDom(editorRef.current, editorHtml || fsEditorRef.current?.innerHTML || "");
    }
  }, [fullscreen, editorHtml]);
  const loadAttachments = async () => {
    const {
      data,
      error
    } = await sb.from("client_note_attachments").select("*").eq("note_id", note.id).order("created_at", {
      ascending: true
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const list = data ?? [];
    setAttachments(list);
    const next = {};
    await Promise.all(list.map(async (a) => {
      const {
        data: signed
      } = await supabase.storage.from("task-attachments").createSignedUrl(a.storage_path, 3600);
      if (signed) next[a.id] = signed.signedUrl;
    }));
    setAttUrls(next);
  };
  reactExports.useEffect(() => {
    void loadAttachments();
  }, [note.id]);
  const doSave = reactExports.useCallback(async () => {
    const patch = pendingPatch.current;
    if (!Object.keys(patch).length) return;
    pendingPatch.current = {};
    setSaveState("saving");
    try {
      await onSave(patch);
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => s === "saved" ? "idle" : s), 1500);
    } catch (e) {
      setSaveState("dirty");
      toast.error(e?.message ?? "Falha ao salvar");
    }
  }, [onSave]);
  const stageChange = reactExports.useCallback((patch) => {
    onPatch(patch);
    pendingPatch.current = {
      ...pendingPatch.current,
      ...patch
    };
    setSaveState("dirty");
  }, [onPatch]);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (saveState === "dirty" || saveState === "saving" || Object.keys(pendingPatch.current).length) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [saveState]);
  const getActiveEditor = () => fullscreen ? fsEditorRef.current : editorRef.current;
  const applyEditorChange = reactExports.useCallback((html) => {
    setEditorsHTML(html);
    stageChange({
      content_html: html,
      content: extractTextFromHtml(html)
    });
  }, [setEditorsHTML, stageChange]);
  const exec = (cmd, value) => {
    const ed = getActiveEditor();
    ed?.focus();
    document.execCommand(cmd, false, value);
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };
  const applyHighlightColor = (color) => {
    setHighlightColor(color);
    exec("hiliteColor", color);
  };
  const preserveSelectedText = () => {
    const ed = getActiveEditor();
    const selection = window.getSelection();
    if (!ed || !selection?.rangeCount) return;
    const range = selection.getRangeAt(0);
    if (ed.contains(range.commonAncestorContainer)) {
      selectedTextRangeRef.current = range.cloneRange();
    }
  };
  const clearHighlight = () => {
    const ed = getActiveEditor();
    const savedRange = selectedTextRangeRef.current;
    ed?.focus();
    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    }
    document.execCommand("hiliteColor", false, "transparent");
    document.execCommand("backColor", false, "transparent");
    selectedTextRangeRef.current = null;
    applyEditorChange(ed?.innerHTML ?? "");
  };
  const onEditorInput = (which) => {
    if (syncingRef.current) return;
    const ed = which === "fs" ? fsEditorRef.current : editorRef.current;
    const html = ed?.innerHTML ?? "";
    applyEditorChange(html);
  };
  const onPaste = (e) => {
    const cd = e.clipboardData;
    const html = cd.getData("text/html");
    const text = cd.getData("text/plain");
    if (html && html.trim()) return;
    if (!text) return;
    const looksLikeMarkdown = /(^|\n)\s*(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(/.test(text);
    if (!looksLikeMarkdown) return;
    e.preventDefault();
    const converted = String(g.parse(text, {
      breaks: true,
      async: false
    }));
    document.execCommand("insertHTML", false, converted);
    const ed = getActiveEditor();
    if (ed) applyEditorChange(ed.innerHTML);
  };
  const runAIFormat = async () => {
    const ed = getActiveEditor();
    const html = ed?.innerHTML ?? "";
    if (!html.trim()) {
      toast.info("Escreva algo primeiro.");
      return;
    }
    setAiLoading(true);
    try {
      const res = await aiFormat({
        data: {
          html,
          title
        }
      });
      applyEditorChange(res.html);
      toast.success("Texto reformatado pela IA.");
    } catch (e) {
      toast.error(e?.message ?? "Falha ao reformatar.");
    } finally {
      setAiLoading(false);
    }
  };
  const exportPDF = () => {
    const html = normalizeNoteHtmlForPdf(editorHtml || getActiveEditor()?.innerHTML || "");
    const dateLabel = noteDate ? format(parseISO(noteDate), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    }) : "";
    Promise.resolve().then(() => openNotePrintPreview({
      title: title || "Sem título",
      dateLabel,
      html
    })).catch((error) => {
      toast.error(error?.message ?? "Falha ao gerar PDF.");
    });
  };
  const onUpload = async (fl) => {
    if (!fl || !fl.length || !user) return;
    setUploading(true);
    for (const file of Array.from(fl)) {
      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `notes/${note.id}/${Date.now()}_${safe}`;
      const {
        error: upErr
      } = await supabase.storage.from("task-attachments").upload(path, file);
      if (upErr) {
        toast.error(upErr.message);
        continue;
      }
      const {
        error: insErr
      } = await sb.from("client_note_attachments").insert({
        note_id: note.id,
        file_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        uploaded_by: user.id
      });
      if (insErr) toast.error(insErr.message);
    }
    setUploading(false);
    void loadAttachments();
  };
  const removeAttachment = async (a) => {
    if (!confirm(`Excluir "${a.file_name}"?`)) return;
    await supabase.storage.from("task-attachments").remove([a.storage_path]);
    await sb.from("client_note_attachments").delete().eq("id", a.id);
    void loadAttachments();
  };
  const openAttachment = (a) => {
    const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
    if (canPreview) {
      setPreview({
        file_name: a.file_name,
        storage_path: a.storage_path,
        mime_type: a.mime_type
      });
      return;
    }
    const u = attUrls[a.id];
    if (u) window.open(u, "_blank", "noopener,noreferrer");
  };
  const SaveBadge = /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${saveState === "saved" ? "bg-green-500/15 text-green-600 dark:text-green-400" : saveState === "saving" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" : saveState === "dirty" ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" : "bg-muted text-muted-foreground"}`, title: "Estado do salvamento", children: [
    saveState === "saving" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : saveState === "saved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : saveState === "dirty" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 opacity-60" }),
    saveState === "saving" ? "Salvando…" : saveState === "saved" ? "Salvo" : saveState === "dirty" ? "Não salvo" : "Salvo"
  ] });
  const Toolbar = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 rounded-md border bg-muted/30 p-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("bold"), title: "Negrito (Ctrl+B)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("italic"), title: "Itálico (Ctrl+I)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => exec("underline"), title: "Sublinhado", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#fde047"), title: "Grifar amarelo", className: highlightColor === "#fde047" ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" : "text-yellow-700 dark:text-yellow-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Amarelo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#86efac"), title: "Grifar verde", className: highlightColor === "#86efac" ? "bg-green-500/15 text-green-700 dark:text-green-400" : "text-green-700 dark:text-green-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Verde" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#fca5a5"), title: "Grifar vermelho", className: highlightColor === "#fca5a5" ? "bg-red-500/15 text-red-700 dark:text-red-400" : "text-red-700 dark:text-red-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Vermelho" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => applyHighlightColor("#93c5fd"), title: "Grifar azul", className: highlightColor === "#93c5fd" ? "bg-blue-500/15 text-blue-700 dark:text-blue-400" : "text-blue-700 dark:text-blue-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Highlighter, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Azul" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onPointerDown: (e) => {
      preserveSelectedText();
      e.preventDefault();
    }, onClick: clearHighlight, title: "Remover grifo do texto selecionado", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eraser, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Remover grifo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: runAIFormat, disabled: aiLoading, title: "Reformatar texto com IA", children: [
      aiLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "Auto-ajuste" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: exportPDF, title: "Gerar PDF em nova aba", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "PDF" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setFullscreen((v) => !v), title: "Modo foco (tela cheia)", children: [
      fullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: fullscreen ? "Sair" : "Foco" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 pr-1", children: [
      SaveBadge,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", onClick: () => void doSave(), disabled: saveState === "saving", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1 h-4 w-4" }),
        " Salvar"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mx-auto flex h-full max-w-4xl flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-b p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "note-title", className: "block px-1 text-[11px] font-bold uppercase tracking-widest text-primary", children: "Título da anotação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "note-title", value: title, onChange: (e) => {
              setTitle(e.target.value);
              stageChange({
                title: e.target.value
              });
            }, onBlur: () => stageChange({
              title
            }), placeholder: "Título da anotação", className: "h-12 flex-1 rounded-lg border-primary/25 bg-primary/5 px-3 text-xl font-bold shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "mt-1 text-destructive", onClick: onDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Data:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: noteDate, onChange: (e) => {
            setNoteDate(e.target.value);
            stageChange({
              note_date: e.target.value
            });
          }, className: "h-8 w-[160px]" })
        ] }) }),
        Toolbar
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: editorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: () => onEditorInput("main"), onPaste, onBlur: () => stageChange({
          content_html: editorRef.current?.innerHTML ?? "",
          content: editorRef.current?.innerText ?? ""
        }), className: "prose prose-sm dark:prose-invert min-h-[360px] max-w-none rounded-md border border-dashed bg-background p-5 text-base leading-relaxed outline-none transition focus:border-primary focus:bg-card focus:shadow-lg focus:ring-2 focus:ring-primary/30", "data-placeholder": "Escreva sua anotação aqui… (use o botão Salvar para registrar as alterações)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FileDropZone, { onFiles: (files) => void onUpload(files), disabled: uploading, className: "mt-6 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
              " Anexos",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
                "(",
                attachments.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, accept: "*/*", className: "hidden", onChange: (e) => {
                void onUpload(e.target.files);
                e.currentTarget.value = "";
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md border bg-background px-3 py-1 text-xs hover:bg-muted", children: uploading ? "Enviando…" : "+ Adicionar arquivo" })
            ] })
          ] }),
          attachments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded border border-dashed p-4 text-center text-xs text-muted-foreground", children: "Nenhum anexo. Aceita qualquer tipo (imagens, PDF, Word, Excel, etc.)." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: attachments.map((a) => {
            const isImage = a.mime_type?.startsWith("image/");
            const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-md border bg-card p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => openAttachment(a), className: "h-10 w-10 shrink-0 overflow-hidden rounded border bg-muted", title: a.file_name, children: isImage && attUrls[a.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: attUrls[a.id], alt: a.file_name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-muted-foreground", children: canPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => openAttachment(a), className: "flex min-w-0 flex-1 flex-col text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm", children: a.file_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
                  a.mime_type || "arquivo",
                  a.size_bytes ? ` · ${Math.round(a.size_bytes / 1024)} KB` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => openAttachment(a), children: "Abrir" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-8 w-8 text-destructive", onClick: () => void removeAttachment(a), title: "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }, a.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[11px] text-muted-foreground", children: [
          "Atualizado em ",
          format(new Date(note.updated_at), "dd MMM yyyy 'às' HH:mm", {
            locale: ptBR
          }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AttachmentPreviewDialog, { open: !!preview, onOpenChange: (o) => {
        if (!o) setPreview(null);
      }, attachment: preview })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: fullscreen, onOpenChange: setFullscreen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "flex h-[96vh] max-h-[96vh] w-[96vw] max-w-[1100px] flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => {
          setTitle(e.target.value);
          stageChange({
            title: e.target.value
          });
        }, placeholder: "Título da anotação", className: "h-11 flex-1 border-0 px-1 text-2xl font-bold shadow-none focus-visible:ring-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: noteDate ? format(parseISO(noteDate), "dd 'de' MMM yyyy", {
          locale: ptBR
        }) : "" })
      ] }),
      Toolbar,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: fsEditorRef, contentEditable: true, suppressContentEditableWarning: true, onInput: () => onEditorInput("fs"), onPaste, onBlur: () => stageChange({
        content_html: fsEditorRef.current?.innerHTML ?? "",
        content: fsEditorRef.current?.innerText ?? ""
      }), className: "prose dark:prose-invert min-h-0 flex-1 max-w-none overflow-y-auto rounded-md border bg-background p-8 text-lg leading-relaxed outline-none focus:ring-2 focus:ring-primary/30", "data-placeholder": "Modo foco — escreva à vontade…" })
    ] }) })
  ] });
}
export {
  NotesWorkspace,
  NotesPage as component
};
