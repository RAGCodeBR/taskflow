import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, j as useProfiles, e as useClients, k as useTaskTags, l as useTaskStatuses, m as useServerFn, C as Card, F as FileDropZone, B as Button, I as Input, S as Select, n as SelectTrigger, o as SelectValue, p as SelectContent, q as SelectItem, i as createSsrRpc } from "./router-ZM7179_C.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { T as Textarea } from "./textarea-CnlXJbD_.mjs";
import { C as Checkbox } from "./checkbox-Bhd60i9o.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-p8M_GyVz.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-DJ8sPH9h.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CTknNXUw.mjs";
import "../_libs/marked.mjs";
import "../_libs/seroval.mjs";
import { a as Sparkles, F as FileText, a9 as Upload, L as LoaderCircle, aa as FilePenLine, N as NotebookPen, P as Plus, a1 as CircleCheck, T as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/date-fns.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
const InputSchema$1 = objectType({
  pdfBase64: stringType().optional(),
  text: stringType().optional(),
  filename: stringType().optional(),
  members: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(200),
  clients: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(500),
  tags: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(500)
}).refine((d) => !!(d.pdfBase64 || d.text && d.text.trim()), {
  message: "Envie um PDF ou cole o texto da ata"
});
const parseAtaWithGemini = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema$1.parse(data)).handler(createSsrRpc("262ce3ed5de3ddc963412f4728b292b329875f4bebdabf2e54153fe103370b1f"));
const InputSchema = objectType({
  pdfBase64: stringType().optional(),
  text: stringType().optional(),
  filename: stringType().optional()
}).refine((d) => !!(d.pdfBase64 || d.text && d.text.trim()), {
  message: "Envie um PDF ou cole o texto da reunião"
});
const formatAtaWithGemini = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema.parse(data)).handler(createSsrRpc("1ac0227fbe0dd79474df6631419249d0757766cdf1dcd6aeac31ad2535735f89"));
function ImportAtaPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: profiles = []
  } = useProfiles();
  const {
    data: clients = []
  } = useClients();
  const {
    data: tags = []
  } = useTaskTags();
  const {
    data: statuses = []
  } = useTaskStatuses();
  const runParse = useServerFn(parseAtaWithGemini);
  const runFormat = useServerFn(formatAtaWithGemini);
  const [tab, setTab] = reactExports.useState("pdf");
  const [file, setFile] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [rows, setRows] = reactExports.useState([]);
  const [creating, setCreating] = reactExports.useState(false);
  const [formatting, setFormatting] = reactExports.useState(false);
  const [ataHtml, setAtaHtml] = reactExports.useState("");
  const [ataText, setAtaText] = reactExports.useState("");
  const [ataTitle, setAtaTitle] = reactExports.useState("");
  const [saveClientId, setSaveClientId] = reactExports.useState("");
  const [savingNote, setSavingNote] = reactExports.useState(false);
  const activeMembers = reactExports.useMemo(() => profiles.filter((p) => p.is_active !== false).map((p) => ({
    id: p.id,
    name: p.full_name || "Sem nome"
  })), [profiles]);
  const clientList = reactExports.useMemo(() => clients.map((c) => ({
    id: c.id,
    name: c.name
  })), [clients]);
  const tagList = reactExports.useMemo(() => tags.map((t) => ({
    id: t.id,
    name: t.name
  })), [tags]);
  const defaultStatusId = reactExports.useMemo(() => {
    const open = statuses.find((s) => s.is_active && !s.is_completed);
    return open?.id ?? statuses[0]?.id ?? null;
  }, [statuses]);
  const fileToBase64 = (f) => new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = String(r.result || "");
      const i = s.indexOf(",");
      resolve(i >= 0 ? s.slice(i + 1) : s);
    };
    r.onerror = () => reject(r.error);
    r.readAsDataURL(f);
  });
  const analyze = async () => {
    if (tab === "pdf" && !file) {
      toast.error("Selecione um PDF");
      return;
    }
    if (tab === "text" && !text.trim()) {
      toast.error("Cole o texto da ata");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        members: activeMembers,
        clients: clientList,
        tags: tagList
      };
      if (tab === "pdf" && file) {
        payload.pdfBase64 = await fileToBase64(file);
        payload.filename = file.name;
      } else {
        payload.text = text;
      }
      const res = await runParse({
        data: payload
      });
      const mapped = (res.tasks || []).map((t, i) => ({
        ...t,
        _selected: true,
        _id: `r-${i}-${Date.now()}`
      }));
      if (mapped.length === 0) toast.message("Nenhuma tarefa encontrada na ata");
      setRows(mapped);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  const generateAta = async () => {
    if (tab === "pdf" && !file) {
      toast.error("Selecione um PDF");
      return;
    }
    if (tab === "text" && !text.trim()) {
      toast.error("Cole o texto da reunião");
      return;
    }
    setFormatting(true);
    try {
      const payload = {};
      if (tab === "pdf" && file) {
        payload.pdfBase64 = await fileToBase64(file);
        payload.filename = file.name;
      } else {
        payload.text = text;
      }
      const res = await runFormat({
        data: payload
      });
      setAtaHtml(res.html);
      setAtaText(res.text);
      if (!ataTitle) {
        const today = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR");
        setAtaTitle(`Ata de Reunião — ${today}`);
      }
      toast.success("Ata gerada");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setFormatting(false);
    }
  };
  const saveAtaAsNote = async () => {
    if (!user) {
      toast.error("Sessão expirada");
      return;
    }
    if (!ataHtml) {
      toast.error("Gere a ata primeiro");
      return;
    }
    if (!saveClientId) {
      toast.error("Selecione um cliente");
      return;
    }
    setSavingNote(true);
    try {
      const {
        error
      } = await supabase.from("client_notes").insert({
        client_id: saveClientId,
        title: ataTitle || "Ata de Reunião",
        content: ataText,
        content_html: ataHtml,
        created_by: user.id
      });
      if (error) throw error;
      toast.success("Ata salva nas anotações do cliente");
      qc.invalidateQueries({
        queryKey: ["client_notes"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSavingNote(false);
    }
  };
  const updateRow = (id, patch) => setRows((rs) => rs.map((r) => r._id === id ? {
    ...r,
    ...patch
  } : r));
  const removeRow = (id) => setRows((rs) => rs.filter((r) => r._id !== id));
  const addRow = () => setRows((rs) => [...rs, {
    _id: `r-new-${Date.now()}`,
    _selected: true,
    title: "",
    description: "",
    assignee_id: null,
    assignee_name: null,
    due_date: null,
    client_id: null,
    client_name: null,
    tag_id: null,
    tag_name: null,
    priority: "medium"
  }]);
  const createTasks = async () => {
    if (!user) {
      toast.error("Sessão expirada");
      return;
    }
    const picked = rows.filter((r) => r._selected && r.title.trim());
    if (picked.length === 0) {
      toast.error("Selecione ao menos uma tarefa válida");
      return;
    }
    setCreating(true);
    try {
      const payload = picked.map((r) => ({
        title: r.title.trim().slice(0, 200),
        description: r.description || null,
        status: "todo",
        status_id: defaultStatusId,
        priority: r.priority,
        due_date: r.due_date ? (/* @__PURE__ */ new Date(r.due_date + "T18:00:00")).toISOString() : null,
        assignee_id: r.assignee_id,
        client_id: r.client_id,
        tag_id: r.tag_id,
        created_by: user.id
      }));
      const {
        data,
        error
      } = await supabase.from("tasks").insert(payload).select("id");
      if (error) throw error;
      const links = picked.map((r, i) => ({
        task: data?.[i],
        tagId: r.tag_id
      })).filter((x) => x.task && x.tagId).map((x) => ({
        task_id: x.task.id,
        tag_id: x.tagId
      }));
      if (links.length) {
        await supabase.from("task_tag_links").insert(links);
      }
      toast.success(`${picked.length} tarefa(s) criada(s) no Kanban`);
      qc.invalidateQueries({
        queryKey: ["tasks"]
      });
      qc.invalidateQueries({
        queryKey: ["task_tag_links"]
      });
      setRows([]);
      setFile(null);
      setText("");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setCreating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-6xl p-4 md:p-6 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Importar ata de reunião" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Gere uma ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ata formatada" }),
          " a partir de notas brutas e/ou extraia ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "tarefas" }),
          " para o Kanban. Use os dois ou apenas um."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "pdf", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-1" }),
            "PDF da ata"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "text", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-1" }),
            "Texto do Gemini"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pdf", className: "mt-3 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileDropZone, { onFiles: (files) => setFile(files.item(0)), className: "rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-3 rounded-md border border-dashed p-4 hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: file ? file.name : "Selecionar PDF" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: file ? `${(file.size / 1024).toFixed(0)} KB` : "Aceita atas em PDF (até ~10MB)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "application/pdf", className: "hidden", onChange: (e) => setFile(e.target.files?.[0] ?? null) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "text", className: "mt-3 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 10, placeholder: "Cole aqui o conteúdo da ata (ou a resposta do Gemini com as próximas etapas)...", value: text, onChange: (e) => setText(e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: generateAta, disabled: formatting, children: [
          formatting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { className: "h-4 w-4 mr-1" }),
          "Gerar Ata Formatada"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: analyze, disabled: loading, children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-1" }),
          "Extrair Tarefas"
        ] })
      ] })
    ] }),
    ataHtml && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Ata gerada" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: ataTitle, onChange: (e) => setAtaTitle(e.target.value), placeholder: "Título da ata" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm max-w-none rounded-md border bg-muted/30 p-4 dark:prose-invert [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2 [&_th]:bg-muted", dangerouslySetInnerHTML: {
        __html: ataHtml
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mb-1", children: "Salvar nas anotações do cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: saveClientId, onValueChange: setSaveClientId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione o cliente" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clientList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: saveAtaAsNote, disabled: savingNote || !saveClientId, children: [
          savingNote ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(NotebookPen, { className: "h-4 w-4 mr-1" }),
          "Salvar como Anotação"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
          setAtaHtml("");
          setAtaText("");
        }, children: "Descartar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: 'A criação de tarefas no Kanban é opcional e independente — use o botão "Extrair Tarefas" acima se quiser também transformar as ações em cards.' })
    ] }),
    rows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium", children: [
          "Tarefas sugeridas (",
          rows.filter((r) => r._selected).length,
          "/",
          rows.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: addRow, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            "Adicionar manualmente"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: createTasks, disabled: creating, children: [
            creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-1" }),
            "Criar no Kanban"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-md border p-3 space-y-2 ${r._selected ? "" : "opacity-50"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: r._selected, onCheckedChange: (c) => updateRow(r._id, {
          _selected: !!c
        }), className: "mt-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: r.title, onChange: (e) => updateRow(r._id, {
            title: e.target.value
          }), placeholder: "Título da tarefa", className: "font-medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: r.description, onChange: (e) => updateRow(r._id, {
            description: e.target.value
          }), placeholder: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mb-1", children: [
                "Responsável ",
                r.assignee_name && !r.assignee_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600", children: [
                  "(sugestão: ",
                  r.assignee_name,
                  ")"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.assignee_id ?? "none", onValueChange: (v) => updateRow(r._id, {
                assignee_id: v === "none" ? null : v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "— Sem responsável —" }),
                  activeMembers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.name }, m.id))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground mb-1", children: "Prazo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: r.due_date ?? "", onChange: (e) => updateRow(r._id, {
                due_date: e.target.value || null
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mb-1", children: [
                "Cliente ",
                r.client_name && !r.client_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600", children: [
                  "(",
                  r.client_name,
                  ")"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.client_id ?? "none", onValueChange: (v) => updateRow(r._id, {
                client_id: v === "none" ? null : v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "— Sem cliente —" }),
                  clientList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground mb-1", children: [
                "Tag ",
                r.tag_name && !r.tag_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-600", children: [
                  "(",
                  r.tag_name,
                  ")"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.tag_id ?? "none", onValueChange: (v) => updateRow(r._id, {
                tag_id: v === "none" ? null : v
              }), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "— Sem tag —" }),
                  tagList.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.id, children: t.name }, t.id))
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground", children: "Prioridade:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: r.priority, onValueChange: (v) => updateRow(r._id, {
              priority: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Baixa" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Média" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "Alta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgente" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => removeRow(r._id), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }) }, r._id)) })
    ] })
  ] });
}
export {
  ImportAtaPage as component
};
