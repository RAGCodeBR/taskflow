import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { f as useTasks, e as useClients, g as useProfiles, r as useSubtasks, j as useTaskStatuses, s as useTaskCollaborators, u as useAuth, x as Route$1, B as Button } from "./router-DXKzFnT6.mjs";
import { B as Badge } from "./badge-BTBDGtvX.mjs";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./avatar-Cs2p32WM.mjs";
import { a as applyTaskFilters, T as TaskFilters, b as TaskDialog } from "./TaskDialog-BFwzVxA1.mjs";
import { p as priorityLabels, a as priorityColors } from "./task-utils-DZ472SbJ.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/tiptap__starter-kit.mjs";
import "../_libs/tiptap__extension-link.mjs";
import "../_libs/tiptap__extension-highlight.mjs";
import { P as Plus, n as Check } from "../_libs/lucide-react.mjs";
import { u as isPast, a as format, p as ptBR } from "../_libs/date-fns.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "./select-DM4Ewr_J.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "./RichTextEditor-BdSq1KNI.mjs";
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
import "./checkbox-D8t29Ars.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "./tabs-D14-kHfb.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./AttachmentPreviewDialog-BrAtk_dg.mjs";
import "./collapsible-DUtqt5i7.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
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
function ListPage() {
  const {
    data: tasks = []
  } = useTasks();
  const {
    data: clients = []
  } = useClients();
  const {
    data: profiles = []
  } = useProfiles();
  const {
    data: subtasks = []
  } = useSubtasks();
  const {
    data: statuses = []
  } = useTaskStatuses();
  const {
    data: collaborators = []
  } = useTaskCollaborators();
  const queryClient = useQueryClient();
  const {
    user
  } = useAuth();
  const search = Route$1.useSearch();
  const navigate = useNavigate();
  const [filters, setFilters] = reactExports.useState(() => search.mine ? {
    scope: "mine"
  } : {});
  const [open, setOpen] = reactExports.useState(false);
  const [edit, setEdit] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!search.task) return;
    const t = tasks.find((x) => x.id === search.task);
    if (t) {
      setEdit(t);
      setOpen(true);
      navigate({
        to: "/tasks/list",
        search: (p) => ({
          ...p,
          task: void 0
        }),
        replace: true
      });
    }
  }, [search.task, tasks, navigate]);
  const subtaskAssigneeTaskIds = reactExports.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    if (!user?.id) return s;
    for (const st of subtasks) if (st.assignee_id === user.id && st.task_id) s.add(st.task_id);
    return s;
  }, [subtasks, user?.id]);
  const subtaskAssigneeTaskIdsByUser = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const st of subtasks) {
      if (!st.assignee_id || !st.task_id) continue;
      const set = map.get(st.assignee_id) ?? /* @__PURE__ */ new Set();
      set.add(st.task_id);
      map.set(st.assignee_id, set);
    }
    return map;
  }, [subtasks]);
  const collaboratorTaskIds = reactExports.useMemo(() => new Set(collaborators.filter((collaborator) => collaborator.collaborator_id === user?.id).map((collaborator) => collaborator.task_id)), [collaborators, user?.id]);
  const list = reactExports.useMemo(() => {
    const r = applyTaskFilters(tasks, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser
    });
    return r.filter((task) => filters.status === "completed" ? task.status === "done" || !!task.completed_at : task.status !== "done" && !task.completed_at).sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }, [tasks, filters, user?.id, subtaskAssigneeTaskIds, collaboratorTaskIds, subtaskAssigneeTaskIdsByUser]);
  const completeTask = async (taskId) => {
    const completedStatus = statuses.find((status) => status.is_completed);
    if (!completedStatus) {
      toast.error("Cadastre um status marcado como concluído.");
      return;
    }
    const {
      error
    } = await supabase.from("tasks").update({
      status: "done",
      status_id: completedStatus.id,
      completed_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", taskId);
    if (error) {
      toast.error(error.message);
      return;
    }
    await queryClient.invalidateQueries({
      queryKey: ["tasks"]
    });
    toast.success("Tarefa concluída.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-center justify-end gap-3 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
      setEdit(null);
      setOpen(true);
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Nova tarefa"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TaskFilters, { filters, onChange: setFilters }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full table-fixed border-collapse text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b bg-muted/50 text-left text-[10px] uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[29%] border-r px-2 py-2", children: "Tarefa" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[11%] border-r px-2 py-2", children: "Cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[13%] border-r px-2 py-2", children: "Responsável" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[12%] border-r px-2 py-2", children: "Colaboradores" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[10%] border-r px-2 py-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[10%] border-r px-2 py-2", children: "Prioridade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[10%] border-r px-2 py-2", children: "Prazo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-[5%] px-1 py-2 text-center", children: "Concluir" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "py-10 text-center text-muted-foreground", children: "Nenhuma tarefa" }) }) : list.map((t) => {
        const client = clients.find((c) => c.id === t.client_id);
        const assignee = profiles.find((p) => p.id === t.assignee_id);
        const taskStatus = statuses.find((status) => status.id === t.status_id);
        const overdue = t.due_date && isPast(new Date(t.due_date)) && t.status !== "done";
        const taskCollaborators = collaborators.filter((collaborator) => collaborator.task_id === t.id).map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id)).filter(Boolean);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "cursor-pointer border-t hover:bg-muted/30", onClick: () => {
          setEdit(t);
          setOpen(true);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate", children: t.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2", children: client ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", style: {
            borderColor: client.color ?? void 0
          }, children: client.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2 text-muted-foreground", children: assignee?.full_name || assignee?.email || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2", children: taskCollaborators.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-1", title: taskCollaborators.map((p) => p.full_name || p.email).join(", "), children: [
            taskCollaborators.slice(0, 3).map((person) => {
              const name = person.full_name || person.email || "Usuário";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-5 w-5 border border-background", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: person.avatar_url || void 0, alt: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-[8px]", children: name.slice(0, 1).toUpperCase() })
              ] }, person.id);
            }),
            taskCollaborators.length > 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-[10px] text-muted-foreground", children: [
              "+",
              taskCollaborators.length - 3
            ] }) : null
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2", children: taskStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "max-w-full truncate", style: {
            borderColor: taskStatus.color,
            color: taskStatus.color
          }, children: taskStatus.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-r px-2 py-2", children: t.priority ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", style: {
            borderColor: priorityColors[t.priority],
            color: priorityColors[t.priority]
          }, children: priorityLabels[t.priority] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `border-r px-2 py-2 whitespace-nowrap ${overdue ? "font-medium text-destructive" : "text-muted-foreground"}`, children: t.due_date ? `${format(new Date(t.due_date), "dd MMM yyyy", {
            locale: ptBR
          })}${t.due_time ? ` · ${t.due_time.slice(0, 5)}` : ""}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-1 py-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Concluir tarefa", disabled: t.completed_at !== null, onClick: (event) => {
            event.stopPropagation();
            void completeTask(t.id);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) })
        ] }, t.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TaskDialog, { open, onOpenChange: setOpen, task: edit })
  ] });
}
export {
  ListPage as component
};
