import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DM4Ewr_J.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent, c as RichTextEditor } from "./RichTextEditor-BdSq1KNI.mjs";
import { e as useClients, g as useProfiles, j as useTaskStatuses, B as Button, I as Input, u as useAuth, h as useColumns, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label } from "./router-DXKzFnT6.mjs";
import { C as Checkbox } from "./checkbox-D8t29Ars.mjs";
import { B as Badge } from "./badge-BTBDGtvX.mjs";
import { m as matchDateFilter, d as dateFilterLabels } from "./task-utils-DZ472SbJ.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, d as Textarea } from "./tabs-D14-kHfb.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AttachmentPreviewDialog } from "./AttachmentPreviewDialog-BrAtk_dg.mjs";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.mjs";
import { U as Users, ah as UserCheck, ao as SquarePen, j as ChevronDown, X, af as RotateCcw, ap as Funnel, aq as Clock3, am as ChevronRight, a3 as Paperclip, a9 as Download, P as Plus, ar as Send, as as Link2, E as ExternalLink, T as Trash2 } from "../_libs/lucide-react.mjs";
import { a as format } from "../_libs/date-fns.mjs";
const COMPLETED_STATUS_FILTER = "completed";
const DATE_OPTIONS = [
  "all",
  "today",
  "due_today",
  "tomorrow",
  "this_week",
  "this_month",
  "overdue",
  "no_due",
  "pending",
  "completed"
];
function TaskFilters({ filters, onChange, children }) {
  const { data: clients } = useClients();
  const { data: profiles } = useProfiles();
  const { data: statuses = [] } = useTaskStatuses();
  const [clientsOpen, setClientsOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const scope = filters.scope ?? "all";
  const dateVal = filters.date ?? "all";
  const selectedClients = reactExports.useMemo(() => {
    if (filters.clients && filters.clients.length > 0) return filters.clients;
    if (filters.client) return [filters.client];
    return [];
  }, [filters.clients, filters.client]);
  const setSelectedClients = (ids) => {
    onChange({ ...filters, clients: ids.length > 0 ? ids : void 0, client: void 0 });
  };
  const toggleClient = (id) => {
    setSelectedClients(
      selectedClients.includes(id) ? selectedClients.filter((c) => c !== id) : [...selectedClients, id]
    );
  };
  const filteredClients = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = clients ?? [];
    return q ? list.filter((c) => c.name.toLowerCase().includes(q)) : list;
  }, [clients, search]);
  const allSelected = (clients?.length ?? 0) > 0 && selectedClients.length === clients?.length;
  const clientsLabel = selectedClients.length === 0 ? "Clientes" : selectedClients.length === 1 ? clients?.find((c) => c.id === selectedClients[0])?.name ?? "1 cliente" : `${selectedClients.length} clientes`;
  const activeCount = [
    scope !== "all",
    dateVal !== "all",
    selectedClients.length > 0,
    !!filters.assignee,
    !!filters.priority,
    !!filters.status
  ].filter(Boolean).length;
  const clearAll = () => onChange({});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 rounded-lg border bg-card p-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-md border bg-muted/40 p-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScopeBtn, { active: scope === "all", onClick: () => onChange({ ...filters, scope: void 0 }), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }), children: "Todas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScopeBtn, { active: scope === "mine", onClick: () => onChange({ ...filters, scope: "mine" }), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3.5 w-3.5" }), children: "Atribuídas a mim" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScopeBtn, { active: scope === "created", onClick: () => onChange({ ...filters, scope: "created" }), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-3.5 w-3.5" }), children: "Criadas por mim" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: dateVal,
        onValueChange: (v) => onChange({ ...filters, date: v }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DATE_OPTIONS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: dateFilterLabels[d] }, d)) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: clientsOpen, onOpenChange: setClientsOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "h-7 justify-between gap-1.5 font-normal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-40", children: clientsLabel }),
        selectedClients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "h-5 px-1.5", children: selectedClients.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "start", className: "w-64 p-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Buscar cliente...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "h-8"
            }
          ),
          selectedClients.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 shrink-0",
              onClick: () => setSelectedClients([]),
              title: "Limpar seleção",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-2 py-1.5 border-b mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: allSelected,
                onCheckedChange: (v) => {
                  if (v) setSelectedClients((clients ?? []).map((c) => c.id));
                  else setSelectedClients([]);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Selecionar todos" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            selectedClients.length,
            "/",
            clients?.length ?? 0
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 overflow-y-auto", children: filteredClients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-4 text-sm text-muted-foreground text-center", children: "Nenhum cliente" }) : filteredClients.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: selectedClients.includes(c.id),
                  onCheckedChange: () => toggleClient(c.id)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name })
            ]
          },
          c.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: filters.assignee ?? "all",
        onValueChange: (v) => onChange({ ...filters, assignee: v === "all" ? void 0 : v }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Responsável" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos responsáveis" }),
            profiles?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.full_name || p.email }, p.id))
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: filters.priority ?? "all",
        onValueChange: (v) => onChange({ ...filters, priority: v === "all" ? void 0 : v }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Prioridade" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todas prioridades" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Baixa" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Média" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "Alta" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgente" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: filters.status ?? "all",
        onValueChange: (v) => onChange({ ...filters, status: v === "all" ? void 0 : v }),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todos status" }),
            statuses.filter((status) => !status.is_completed).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status.id, children: status.name }, status.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: COMPLETED_STATUS_FILTER, children: "Concluídos" })
          ] })
        ]
      }
    ),
    "      ",
    activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-7 ml-auto text-muted-foreground", onClick: clearAll, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-1 h-3.5 w-3.5" }),
      "Limpar (",
      activeCount,
      ")"
    ] }),
    activeCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
      "Nenhum filtro"
    ] }),
    children
  ] }) });
}
function ScopeBtn({
  active,
  onClick,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium transition ${active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
      children: [
        icon,
        children
      ]
    }
  );
}
function applyTaskFilters(tasks, f, opts) {
  const clientIds = f.clients && f.clients.length > 0 ? f.clients : f.client ? [f.client] : null;
  const uid = opts?.userId ?? null;
  const subIds = opts?.subtaskAssigneeTaskIds ?? null;
  const collaboratorIds = opts?.collaboratorTaskIds ?? null;
  return tasks.filter((t) => {
    if (f.scope === "mine") {
      if (!uid) return false;
      const mine = t.assignee_id === uid || (subIds ? subIds.has(t.id) : false) || (collaboratorIds ? collaboratorIds.has(t.id) : false);
      if (!mine) return false;
    }
    if (f.scope === "created" && (!uid || t.created_by !== uid)) return false;
    if (f.date && f.date !== "all" && !matchDateFilter(t, f.date)) return false;
    if (clientIds && (!t.client_id || !clientIds.includes(t.client_id))) return false;
    if (f.assignee) {
      const assigneeSubtasks = opts?.subtaskAssigneeTaskIdsByUser?.get(f.assignee);
      if (t.assignee_id !== f.assignee && !assigneeSubtasks?.has(t.id)) return false;
    }
    if (f.priority && t.priority !== f.priority) return false;
    if (f.status === COMPLETED_STATUS_FILTER && t.status !== "done" && !t.completed_at) return false;
    if (f.status && f.status !== COMPLETED_STATUS_FILTER && t.status_id !== f.status) return false;
    return true;
  });
}
const DEFAULT_DEADLINE_TIME = "12:00";
const deadlineToIso = (date) => date ? (/* @__PURE__ */ new Date(`${date}T${DEFAULT_DEADLINE_TIME}:00`)).toISOString() : null;
const normalizeDueTime = (time) => time?.slice(0, 5) ?? "";
const LINK_MIME = "text/uri-list";
function TaskDialog({ open, onOpenChange, task, defaultColumnId }) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const { data: cols } = useColumns();
  const { data: clients } = useClients();
  const { data: profiles } = useProfiles();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("todo");
  const [priority, setPriority] = reactExports.useState("medium");
  const [columnId, setColumnId] = reactExports.useState("");
  const [clientId, setClientId] = reactExports.useState("");
  const [clientPickerOpen, setClientPickerOpen] = reactExports.useState(false);
  const [clientSearch, setClientSearch] = reactExports.useState("");
  const [assigneeId, setAssigneeId] = reactExports.useState("");
  const [collaboratorIds, setCollaboratorIds] = reactExports.useState([]);
  const [collaboratorPickerOpen, setCollaboratorPickerOpen] = reactExports.useState(false);
  const [dueDate, setDueDate] = reactExports.useState("");
  const [dueTime, setDueTime] = reactExports.useState("");
  const [currentTaskId, setCurrentTaskId] = reactExports.useState(null);
  const currentTaskIdRef = reactExports.useRef(null);
  const [subtasks, setSubtasks] = reactExports.useState([]);
  const [newSubtask, setNewSubtask] = reactExports.useState("");
  const [newSubtaskDue, setNewSubtaskDue] = reactExports.useState("");
  const [newSubtaskAssignee, setNewSubtaskAssignee] = reactExports.useState("");
  const [subDueChanges, setSubDueChanges] = reactExports.useState({});
  const [subDueOpen, setSubDueOpen] = reactExports.useState({});
  const [subExpanded, setSubExpanded] = reactExports.useState({});
  const [subAttachments, setSubAttachments] = reactExports.useState({});
  const [comments, setComments] = reactExports.useState([]);
  const [newComment, setNewComment] = reactExports.useState("");
  const [newCommentTitle, setNewCommentTitle] = reactExports.useState("");
  const [openComments, setOpenComments] = reactExports.useState({});
  const [attachments, setAttachments] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(false);
  const [previewAttachment, setPreviewAttachment] = reactExports.useState(null);
  const canDeleteTask = !!currentTaskId && (!!isAdmin || !task || task.created_by === user?.id);
  const canDeleteSubtask = (subtask) => !!isAdmin || subtask.assignee_id !== user?.id || task?.created_by === user?.id;
  const [recurrenceEnabled, setRecurrenceEnabled] = reactExports.useState(false);
  const [recurrenceDays, setRecurrenceDays] = reactExports.useState([1, 2, 3, 4, 5]);
  const [recurrenceEnd, setRecurrenceEnd] = reactExports.useState("");
  const [recurrenceOffsets, setRecurrenceOffsets] = reactExports.useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });
  const filteredClients = reactExports.useMemo(() => {
    const term = clientSearch.trim().toLocaleLowerCase("pt-BR");
    const allClients = clients ?? [];
    return term ? allClients.filter((client) => client.name.toLocaleLowerCase("pt-BR").includes(term)) : allClients;
  }, [clients, clientSearch]);
  const selectedClient = clients?.find((client) => client.id === clientId);
  reactExports.useEffect(() => {
    if (!open) return;
    setClientPickerOpen(false);
    setClientSearch("");
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setStatus(task.status);
      setPriority(task.priority);
      setColumnId(task.column_id ?? "");
      setClientId(task.client_id ?? "");
      setAssigneeId(task.assignee_id ?? "");
      void loadCollaborators(task.id);
      setDueDate(task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "");
      setDueTime(normalizeDueTime(task.due_time));
      currentTaskIdRef.current = task.id;
      setCurrentTaskId(task.id);
      setNewSubtask("");
      setNewSubtaskDue("");
      setNewSubtaskAssignee("");
      loadRelated(task.id);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setColumnId(defaultColumnId ?? "");
      setClientId("");
      setAssigneeId("");
      setCollaboratorIds([]);
      setDueDate("");
      setDueTime("");
      currentTaskIdRef.current = null;
      setCurrentTaskId(null);
      setSubtasks([]);
      setComments([]);
      setAttachments([]);
      setNewCommentTitle("");
      setNewComment("");
      setOpenComments({});
      setNewSubtask("");
      setNewSubtaskDue("");
      setNewSubtaskAssignee("");
      setRecurrenceEnabled(false);
      setRecurrenceDays([1, 2, 3, 4, 5]);
      setRecurrenceEnd("");
      setRecurrenceOffsets({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    }
  }, [open, task, defaultColumnId]);
  const loadRelated = async (taskId) => {
    const [s, c, a] = await Promise.all([
      supabase.from("subtasks").select("*").eq("task_id", taskId).order("position"),
      supabase.from("comments").select("*").eq("task_id", taskId).order("created_at"),
      supabase.from("attachments").select("*").eq("task_id", taskId).order("created_at")
    ]);
    setSubtasks(s.data ?? []);
    setComments(c.data ?? []);
    setAttachments(a.data ?? []);
  };
  const loadCollaborators = async (taskId) => {
    const { data, error } = await supabase.from("task_collaborators").select("collaborator_id").eq("task_id", taskId);
    if (error) {
      toast.error(error.message);
      return;
    }
    setCollaboratorIds((data ?? []).map((collaborator) => collaborator.collaborator_id));
  };
  const syncCollaborators = async (taskId) => {
    const { error: deleteError } = await supabase.from("task_collaborators").delete().eq("task_id", taskId);
    if (deleteError) throw deleteError;
    if (collaboratorIds.length === 0) return;
    const { error: insertError } = await supabase.from("task_collaborators").insert(
      collaboratorIds.map((collaboratorId) => ({
        task_id: taskId,
        collaborator_id: collaboratorId,
        added_by: user?.id ?? null
      }))
    );
    if (insertError) throw insertError;
  };
  const toggleCollaborator = (collaboratorId) => {
    setCollaboratorIds(
      (current) => current.includes(collaboratorId) ? current.filter((id) => id !== collaboratorId) : [...current, collaboratorId]
    );
  };
  const buildPayload = () => ({
    title: title.trim() || "Sem título",
    description: description || null,
    status,
    priority,
    column_id: columnId || null,
    client_id: clientId || null,
    assignee_id: assigneeId || null,
    due_date: deadlineToIso(dueDate),
    due_time: dueDate ? dueTime || null : null,
    completed_at: status === "done" ? (/* @__PURE__ */ new Date()).toISOString() : null
  });
  const getAuthenticatedUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.error("Sua sessão expirou. Entre novamente para criar uma tarefa.");
      return null;
    }
    const { data: { user: authenticatedUser }, error } = await supabase.auth.getUser();
    if (error || !authenticatedUser) {
      toast.error("Não foi possível validar sua sessão. Entre novamente para criar uma tarefa.");
      return null;
    }
    const url = "https://xlcurhbxexyunpkcswwo.supabase.co";
    const publishableKey = "sb_publishable_dXaKnuVcb5EQdiunTZkWzQ_NG44RPhW";
    const authenticatedClient = createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${session.access_token}` } }
    });
    return { user: authenticatedUser, client: authenticatedClient };
  };
  const ensureTask = async () => {
    const existingId = currentTaskIdRef.current ?? currentTaskId;
    if (existingId) return existingId;
    const authenticated = await getAuthenticatedUser();
    if (!authenticated) return null;
    if (!title.trim()) {
      toast.error("Defina um título antes de adicionar itens");
      return null;
    }
    if (!dueDate && !recurrenceEnabled) {
      toast.error("Defina um prazo antes de criar a tarefa");
      return null;
    }
    const taskId = crypto.randomUUID();
    const { error } = await authenticated.client.from("tasks").insert({
      id: taskId,
      ...buildPayload(),
      created_by: authenticated.user.id
    });
    if (error) {
      toast.error(error.message);
      return null;
    }
    currentTaskIdRef.current = taskId;
    setCurrentTaskId(taskId);
    await syncCollaborators(taskId);
    await supabase.from("task_history").insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });
    qc.invalidateQueries({ queryKey: ["tasks"] });
    return taskId;
  };
  const commitPendingSubtask = async (taskId) => {
    const title2 = newSubtask.trim();
    if (!title2) return true;
    const due = newSubtaskDue;
    const assignee = newSubtaskAssignee;
    const position = subtasks.length;
    const { data, error } = await supabase.from("subtasks").insert({
      task_id: taskId,
      title: title2,
      position,
      due_date: deadlineToIso(due),
      assignee_id: assignee || null
    }).select("id, title, done, position, due_date, assignee_id, notes").single();
    if (error) {
      toast.error(error.message);
      return false;
    }
    setSubtasks((prev) => [...prev, data]);
    setNewSubtask("");
    setNewSubtaskDue("");
    setNewSubtaskAssignee("");
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["tasks"] }),
      qc.invalidateQueries({ queryKey: ["subtasks"] })
    ]);
    return true;
  };
  const save = async () => {
    if (!title.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    const authenticated = await getAuthenticatedUser();
    if (!authenticated) return;
    const existingTaskId = currentTaskIdRef.current ?? currentTaskId;
    if (!existingTaskId && !recurrenceEnabled && !dueDate) {
      toast.error("Prazo é obrigatório para criar uma tarefa");
      return;
    }
    setSaving(true);
    try {
      const payload = buildPayload();
      if (existingTaskId) {
        const { error } = await supabase.from("tasks").update(payload).eq("id", existingTaskId);
        if (error) throw error;
        await syncCollaborators(existingTaskId);
        await supabase.from("task_history").insert({ task_id: existingTaskId, user_id: authenticated.user.id, action: "updated" });
        if (!await commitPendingSubtask(existingTaskId)) return;
      } else if (recurrenceEnabled) {
        if (newSubtask.trim()) {
          toast.error("Para subtarefas com responsável, crie uma tarefa única ou adicione após criar as recorrências.");
          return;
        }
        if (recurrenceDays.length === 0) {
          toast.error("Selecione ao menos um dia da semana");
          setSaving(false);
          return;
        }
        if (!recurrenceEnd) {
          toast.error("Defina a data final da recorrência");
          setSaving(false);
          return;
        }
        const start = /* @__PURE__ */ new Date();
        start.setHours(0, 0, 0, 0);
        const end = /* @__PURE__ */ new Date(recurrenceEnd + "T23:59:59");
        if (end < start) {
          toast.error("A data final deve ser futura");
          setSaving(false);
          return;
        }
        const rows = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const wd = d.getDay();
          if (!recurrenceDays.includes(wd)) continue;
          const due = new Date(d);
          due.setDate(due.getDate() + (recurrenceOffsets[wd] ?? 0));
          due.setHours(12, 0, 0, 0);
          rows.push({ ...payload, due_date: due.toISOString() });
        }
        if (rows.length === 0) {
          toast.error("Nenhuma ocorrência no intervalo");
          setSaving(false);
          return;
        }
        const tasksToCreate = rows.map((row) => ({
          id: crypto.randomUUID(),
          ...row,
          created_by: authenticated.user.id
        }));
        const { error } = await authenticated.client.from("tasks").insert(tasksToCreate);
        if (error) throw error;
        await Promise.all(tasksToCreate.map((createdTask) => syncCollaborators(createdTask.id)));
        toast.success(`${rows.length} tarefas recorrentes criadas`);
        qc.invalidateQueries({ queryKey: ["tasks"] });
        onOpenChange(false);
        return;
      } else {
        const taskId = crypto.randomUUID();
        const { error } = await authenticated.client.from("tasks").insert({
          id: taskId,
          ...payload,
          created_by: authenticated.user.id
        });
        if (error) throw error;
        await supabase.from("task_history").insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });
        currentTaskIdRef.current = taskId;
        setCurrentTaskId(taskId);
        await syncCollaborators(taskId);
        if (!await commitPendingSubtask(taskId)) return;
      }
      toast.success(currentTaskId || task ? "Tarefa atualizada" : "Tarefa criada");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["tasks"] }),
        qc.invalidateQueries({ queryKey: ["subtasks"] }),
        qc.invalidateQueries({ queryKey: ["task_collaborators"] })
      ]);
      onOpenChange(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    if (!currentTaskId) return;
    if (!confirm("Mover esta tarefa para a lixeira? Você pode restaurá-la depois.")) return;
    const { error } = await supabase.from("tasks").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", currentTaskId);
    if (error) return toast.error(error.message);
    toast.success("Tarefa movida para a lixeira");
    qc.invalidateQueries({ queryKey: ["tasks"] });
    onOpenChange(false);
  };
  const addSubtask = async () => {
    if (!newSubtask.trim()) return;
    const tid = await ensureTask();
    if (!tid) return;
    await commitPendingSubtask(tid);
  };
  const toggleSubtask = async (st) => {
    await supabase.from("subtasks").update({ done: !st.done }).eq("id", st.id);
    setSubtasks(subtasks.map((s) => s.id === st.id ? { ...s, done: !s.done } : s));
  };
  const deleteSubtask = async (id) => {
    await supabase.from("subtasks").delete().eq("id", id);
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };
  const updateSubtaskDue = async (st, isoOrEmpty, reason) => {
    const next = deadlineToIso(isoOrEmpty);
    const prev = st.due_date;
    if (next === prev) return;
    const { error } = await supabase.from("subtasks").update({ due_date: next }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map((s) => s.id === st.id ? { ...s, due_date: next } : s));
    if (user) {
      await supabase.from("subtask_due_date_changes").insert({
        subtask_id: st.id,
        old_due_date: prev,
        new_due_date: next,
        reason: reason?.trim() || null,
        user_id: user.id
      });
      if (subDueOpen[st.id]) void loadSubDueChanges(st.id);
    }
  };
  const loadSubDueChanges = async (subtaskId) => {
    const { data } = await supabase.from("subtask_due_date_changes").select("*").eq("subtask_id", subtaskId).order("created_at", { ascending: false });
    setSubDueChanges((prev) => ({ ...prev, [subtaskId]: data ?? [] }));
  };
  const toggleSubDueHistory = async (subtaskId) => {
    const willOpen = !subDueOpen[subtaskId];
    setSubDueOpen((prev) => ({ ...prev, [subtaskId]: willOpen }));
    if (willOpen && !subDueChanges[subtaskId]) await loadSubDueChanges(subtaskId);
  };
  const updateSubtaskAssignee = async (st, value) => {
    const next = value === "none" ? null : value;
    const { error } = await supabase.from("subtasks").update({ assignee_id: next }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map((s) => s.id === st.id ? { ...s, assignee_id: next } : s));
  };
  const updateSubtaskNotes = async (st, notes) => {
    const { error } = await supabase.from("subtasks").update({ notes: notes || null }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map((s) => s.id === st.id ? { ...s, notes: notes || null } : s));
  };
  const loadSubAttachments = async (subtaskId) => {
    const { data } = await supabase.from("subtask_attachments").select("*").eq("subtask_id", subtaskId).order("created_at");
    setSubAttachments((prev) => ({ ...prev, [subtaskId]: data ?? [] }));
  };
  const toggleSubExpanded = async (id) => {
    const willOpen = !subExpanded[id];
    setSubExpanded((prev) => ({ ...prev, [id]: willOpen }));
    if (willOpen && !subAttachments[id]) await loadSubAttachments(id);
  };
  const uploadSubFile = async (st, file) => {
    if (!user) return;
    const tid = currentTaskId ?? await ensureTask();
    if (!tid) return;
    const path = `${tid}/subtasks/${st.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const { data, error } = await supabase.from("subtask_attachments").insert({
      subtask_id: st.id,
      task_id: tid,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: user.id
    }).select().single();
    if (error) return toast.error(error.message);
    setSubAttachments((prev) => ({ ...prev, [st.id]: [...prev[st.id] ?? [], data] }));
    toast.success("Arquivo enviado");
  };
  const downloadSubFile = async (att) => {
    const { data, error } = await supabase.storage.from("task-attachments").download(att.storage_path);
    if (error) return toast.error(error.message);
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = att.file_name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 3e4);
  };
  const deleteSubFile = async (att) => {
    await supabase.storage.from("task-attachments").remove([att.storage_path]);
    await supabase.from("subtask_attachments").delete().eq("id", att.id);
    setSubAttachments((prev) => ({ ...prev, [att.subtask_id]: (prev[att.subtask_id] ?? []).filter((x) => x.id !== att.id) }));
  };
  const addComment = async () => {
    if (!newComment.trim() || !user) return;
    const tid = await ensureTask();
    if (!tid) return;
    const { data, error } = await supabase.from("comments").insert({
      task_id: tid,
      author_id: user.id,
      body: newComment,
      title: newCommentTitle.trim() || null
    }).select().single();
    if (error) return toast.error(error.message);
    setComments([...comments, data]);
    setNewComment("");
    setNewCommentTitle("");
  };
  const deleteComment = async (id) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setComments(comments.filter((c) => c.id !== id));
  };
  const uploadFile = async (file) => {
    if (!user) return;
    const tid = await ensureTask();
    if (!tid) return;
    const path = `${tid}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const { data, error } = await supabase.from("attachments").insert({
      task_id: tid,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: user.id
    }).select().single();
    if (error) return toast.error(error.message);
    setAttachments([...attachments, data]);
    toast.success("Arquivo enviado");
  };
  const openAttachment = async (att) => {
    if (att.mime_type === LINK_MIME) {
      window.open(att.storage_path, "_blank", "noopener,noreferrer");
      return;
    }
    setPreviewAttachment(att);
  };
  const downloadAttachment = async (att) => {
    if (att.mime_type === LINK_MIME) return openAttachment(att);
    const { data, error } = await supabase.storage.from("task-attachments").download(att.storage_path);
    if (error) return toast.error(error.message);
    const blobUrl = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = att.file_name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 3e4);
  };
  const deleteAttachment = async (att) => {
    await supabase.storage.from("task-attachments").remove([att.storage_path]);
    await supabase.from("attachments").delete().eq("id", att.id);
    setAttachments(attachments.filter((a) => a.id !== att.id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: task ? "Editar tarefa" : "Nova tarefa" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Título *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "O que precisa ser feito?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Prioridade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priority ?? "none", onValueChange: (v) => setPriority(v === "none" ? null : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Sem prioridade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "low", children: "Baixa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "medium", children: "Média" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "high", children: "Alta" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "urgent", children: "Urgente" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
            "Prazo ",
            !task ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-muted/30 p-1.5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: dueDate,
                  onChange: (e) => setDueDate(e.target.value),
                  className: "task-deadline-date h-9 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0",
                  required: !task && !recurrenceEnabled
                }
              ),
              dueDate && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "ghost", className: "h-8 w-8 shrink-0", onClick: () => {
                setDueDate("");
                setDueTime("");
              }, title: "Sem prazo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 border-t px-1.5 pt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-3.5 w-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "time",
                  value: dueTime,
                  onChange: (e) => setDueTime(e.target.value),
                  className: "h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0",
                  step: "300",
                  disabled: !dueDate,
                  "aria-label": "Hora do prazo (opcional)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap text-[10px] text-muted-foreground", children: "Opcional" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Colaboradores" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: collaboratorPickerOpen, onOpenChange: setCollaboratorPickerOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full justify-between font-normal", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: collaboratorIds.length === 0 ? "Selecionar nomes" : `${collaboratorIds.length} selecionado${collaboratorIds.length === 1 ? "" : "s"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 opacity-50" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { align: "start", className: "w-64 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-56 space-y-0.5 overflow-y-auto", children: (profiles ?? []).filter((profile) => profile.is_active !== false).map((profile) => {
              const selected = collaboratorIds.includes(profile.id);
              const name = profile.full_name || profile.email || "Usuário sem nome";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        checked: selected,
                        onCheckedChange: () => toggleCollaborator(profile.id)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: name })
                  ]
                },
                profile.id
              );
            }) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: columnId || "none", onValueChange: (v) => setColumnId(v === "none" ? "" : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Nenhuma" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Nenhuma" }),
              cols?.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: clientPickerOpen, onOpenChange: setClientPickerOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full justify-between font-normal", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: selectedClient?.name ?? "Nenhum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 opacity-50" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "start", className: "w-[var(--radix-popover-trigger-width)] p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  autoFocus: true,
                  value: clientSearch,
                  onChange: (event) => setClientSearch(event.target.value),
                  placeholder: "Pesquisar cliente...",
                  className: "mb-2 h-8 text-xs"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  setClientId("");
                  setClientPickerOpen(false);
                }, className: `flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${!clientId ? "bg-muted font-medium" : ""}`, children: "Nenhum" }),
                filteredClients.slice(0, 5).map((client) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
                  setClientId(client.id);
                  setClientPickerOpen(false);
                }, className: `flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${clientId === client.id ? "bg-muted font-medium" : ""}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 shrink-0 rounded-full", style: { backgroundColor: client.color ?? "#94a3b8" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: client.name })
                ] }, client.id)),
                filteredClients.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-2 text-xs text-muted-foreground", children: "Nenhum cliente encontrado." })
              ] }),
              filteredClients.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-muted-foreground", children: "Exibindo os 5 primeiros resultados. Refine a pesquisa para encontrar outro cliente." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Responsável" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: assigneeId || "none", onValueChange: (v) => setAssigneeId(v === "none" ? "" : v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Ninguém" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Ninguém" }),
              profiles?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.full_name || p.email }, p.id))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Descrição" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RichTextEditor,
          {
            value: description,
            onChange: setDescription,
            placeholder: "Descreva a tarefa...",
            minHeight: 100
          }
        )
      ] }),
      !currentTaskId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-md border bg-muted/20 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: recurrenceEnabled, onCheckedChange: (v) => setRecurrenceEnabled(!!v) }),
          "Criar como tarefa recorrente"
        ] }),
        recurrenceEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Dias da semana" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((label, idx) => {
              const active = recurrenceDays.includes(idx);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setRecurrenceDays(active ? recurrenceDays.filter((d) => d !== idx) : [...recurrenceDays, idx].sort()),
                  className: `rounded-md border px-3 py-1 text-xs transition ${active ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`,
                  children: label
                },
                idx
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Repetir até" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: recurrenceEnd, onChange: (e) => setRecurrenceEnd(e.target.value) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Prazo personalizado por dia (dias após a ocorrência)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: recurrenceDays.map((wd) => {
              const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-xs text-muted-foreground", children: labels[wd] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: 0,
                    max: 30,
                    value: recurrenceOffsets[wd] ?? 0,
                    onChange: (e) => setRecurrenceOffsets({ ...recurrenceOffsets, [wd]: Math.max(0, Number(e.target.value) || 0) }),
                    className: "h-8 w-16"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "d" })
              ] }, wd);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Ex.: Seg=1 → tarefa de segunda vence na terça. Use 0 para vencer no próprio dia." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "subtasks", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "subtasks", children: [
            "Subtarefas (",
            subtasks.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "comments", children: [
            "Comentários (",
            comments.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "files", children: [
            "Arquivos (",
            attachments.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "subtasks", className: "space-y-2", children: [
          subtasks.map((s) => {
            const dueStr = s.due_date ? format(new Date(s.due_date), "yyyy-MM-dd") : "";
            const historyOpen = subDueOpen[s.id];
            const history = subDueChanges[s.id] ?? [];
            const expanded = subExpanded[s.id];
            const files = subAttachments[s.id] ?? [];
            const assignee = profiles?.find((p) => p.id === s.assignee_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 rounded-md border bg-muted/30 px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: s.done, onCheckedChange: () => toggleSubtask(s) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-1 text-sm ${s.done ? "line-through text-muted-foreground" : ""}`, children: s.title }),
                assignee && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary", children: assignee.full_name || assignee.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => toggleSubExpanded(s.id), title: "Detalhes", children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }) }),
                canDeleteSubtask(s) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => deleteSubtask(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 pl-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Prazo" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    value: dueStr,
                    onChange: (e) => updateSubtaskDue(s, e.target.value),
                    className: "h-7 w-52 text-xs"
                  }
                ),
                s.due_date && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "ghost",
                    className: "h-7 px-2 text-xs text-muted-foreground",
                    onClick: () => {
                      const reason = window.prompt("Motivo para remover o prazo? (opcional)") ?? "";
                      void updateSubtaskDue(s, "", reason);
                    },
                    children: "Indefinido"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "sm", variant: "ghost", className: "h-7 px-2 text-xs", onClick: () => toggleSubDueHistory(s.id), children: [
                  historyOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "mr-1 h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "mr-1 h-3 w-3" }),
                  "Alterações"
                ] })
              ] }),
              historyOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-6 space-y-1 border-l pl-2", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Sem alterações registradas." }) : history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: h.old_due_date ? format(new Date(h.old_due_date), "dd/MM/yyyy") : "sem prazo" }),
                " → ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: h.new_due_date ? format(new Date(h.new_due_date), "dd/MM/yyyy") : "sem prazo" }),
                h.reason ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " — ",
                  h.reason
                ] }) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 opacity-60", children: format(new Date(h.created_at), "dd/MM/yyyy") })
              ] }, h.id)) }),
              expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-6 space-y-2 border-l pl-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Responsável" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: s.assignee_id || "none", onValueChange: (v) => updateSubtaskAssignee(s, v), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Ninguém" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Ninguém" }),
                      profiles?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.full_name || p.email }, p.id))
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Anotações" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      rows: 2,
                      defaultValue: s.notes ?? "",
                      onBlur: (e) => {
                        if ((e.target.value || "") !== (s.notes ?? "")) void updateSubtaskNotes(s, e.target.value);
                      },
                      placeholder: "Notas desta subtarefa",
                      className: "text-xs"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] text-muted-foreground", children: "Arquivos" }),
                  files.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded border bg-background px-2 py-1 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-3 w-3 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: a.file_name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6", onClick: () => downloadSubFile(a), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-6 w-6", onClick: () => deleteSubFile(a), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
                  ] }, a.id)),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed py-1.5 text-[11px] text-muted-foreground hover:bg-muted/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-3 w-3" }),
                    " Anexar arquivo",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", onChange: (e) => {
                      const f = e.target.files?.[0];
                      if (f) void uploadSubFile(s, f);
                      e.target.value = "";
                    } })
                  ] })
                ] })
              ] })
            ] }, s.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Nova subtarefa", value: newSubtask, onChange: (e) => setNewSubtask(e.target.value), onKeyDown: (e) => e.key === "Enter" && addSubtask(), className: "min-w-[180px] flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: newSubtaskDue, onChange: (e) => setNewSubtaskDue(e.target.value), className: "w-52", title: "Prazo (opcional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newSubtaskAssignee || "none", onValueChange: (v) => setNewSubtaskAssignee(v === "none" ? "" : v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", title: "Responsável (opcional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Responsável" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "Sem responsável" }),
                profiles?.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.id, children: p.full_name || p.email }, p.id))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addSubtask, size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Defina responsável e prazo já ao criar. Use a seta para editar anotações e anexar arquivos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "comments", className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 space-y-2 overflow-y-auto", children: comments.map((c) => {
            const author = profiles?.find((p) => p.id === c.author_id);
            const isOpen = openComments[c.id] ?? false;
            const headTitle = c.title?.trim() || (c.body.split("\n")[0].slice(0, 60) || "Anotação");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Collapsible,
              {
                open: isOpen,
                onOpenChange: (o) => setOpenComments((s) => ({ ...s, [c.id]: o })),
                className: "rounded-md border bg-muted/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 px-2 py-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 shrink-0", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 truncate text-left text-sm font-medium", children: headTitle }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: format(new Date(c.created_at), "dd/MM/yyyy") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 shrink-0", onClick: () => deleteComment(c.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleContent, { className: "border-t px-3 py-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs text-muted-foreground", children: author?.full_name || author?.email || "Usuário" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap", children: c.body })
                  ] })
                ]
              },
              c.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-md border bg-muted/10 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Título da anotação (opcional)",
                value: newCommentTitle,
                onChange: (e) => setNewCommentTitle(e.target.value)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  rows: 2,
                  placeholder: "Escreva a anotação",
                  value: newComment,
                  onChange: (e) => setNewComment(e.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addComment, size: "icon", className: "self-stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "files", className: "space-y-2", children: [
          attachments.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2", children: [
            a.mime_type === LINK_MIME ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-sm", children: a.file_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => openAttachment(a), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }),
            a.mime_type !== LINK_MIME && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => downloadAttachment(a), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7", onClick: () => deleteAttachment(a), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
          ] }, a.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed py-3 text-sm text-muted-foreground hover:bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
            " Anexar arquivo",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) uploadFile(f);
              e.target.value = "";
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: currentTaskId && canDeleteTask && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: remove, className: "text-destructive hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
          " Excluir"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, disabled: saving, children: saving ? "Salvando…" : "Salvar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AttachmentPreviewDialog,
      {
        open: !!previewAttachment,
        onOpenChange: (open2) => {
          if (!open2) setPreviewAttachment(null);
        },
        attachment: previewAttachment
      }
    )
  ] }) });
}
export {
  TaskFilters as T,
  applyTaskFilters as a,
  TaskDialog as b
};
