import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  DndContext,
  type CollisionDetection,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  closestCenter,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  GripVertical,
  FolderOpen,
  ArrowUp,
  ArrowDown,
  FileDown,
  Rows,
  Columns,
  PanelTop,
  PanelsTopLeft,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientFilesSheet } from "@/components/ClientFilesSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  useTasks,
  useColumns,
  useClients,
  useProfiles,
  useTaskTags,
  useTaskStatuses,
  useTaskTagLinks,
  useTaskCollaborators,
  useUserColumnOrder,
  useUserTaskOrder,
  useSubtasks,
  type Task,
  type KanbanColumn,
} from "@/hooks/use-data";
import { TaskCard } from "@/components/TaskCard";
import { TaskDialog } from "@/components/TaskDialog";
import { TagManagerDialog } from "@/components/TagManagerDialog";
import { TaskFilters, applyTaskFilters, type TaskFilterValue } from "@/components/TaskFilters";
import { CardFieldsPopover } from "@/components/CardFieldsPopover";
import { useBoardPreferences, useUpdateBoardPreferences } from "@/hooks/use-board-preferences";
import { toast } from "sonner";
import { format } from "date-fns";
import { matchDateFilter, type DateFilter } from "@/lib/task-utils";

export const Route = createFileRoute("/_app/tasks/kanban")({
  component: KanbanPage,
});

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
  minimal,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", colId: colId ?? task.column_id },
    animateLayoutChanges: () => false,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition ?? "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
    opacity: isDragging ? 0.4 : 1,
    willChange: "transform",
  } as CSSProperties;

  return (
    <div ref={setNodeRef} style={style} className={minimal ? "w-[clamp(15rem,18vw,19rem)] max-w-full min-w-0 shrink-0" : "w-72 max-w-full min-w-0 shrink-0"}>
      <TaskCard
        task={task}
        columns={columns}
        clients={clients}
        profiles={profiles}
        tags={tags}
        statuses={statuses}
        collaborators={collaborators}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        minimal={minimal}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

const COMPLETED_COL_ID = "__completed__";

type SortField = "position" | "due_date" | "created_at" | "tag" | "priority" | "status";
type SortDirection = "asc" | "desc";

function compareByField(
  field: SortField,
  a: any,
  b: any,
  tagNameForTask: Map<string, string>,
  statuses: any[],
): number {
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
      const order: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };
      return (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
    }
    case "status": {
      const sa = statuses.find((s: any) => s.id === a.status_id);
      const sb = statuses.find((s: any) => s.id === b.status_id);
      return (sa ? sa.position : 9999) - (sb ? sb.position : 9999);
    }
    default:
      return 0;
  }
}

function CompletedColumn({ taskIds, count, children, orientation, minimal, open, onOpenChange }: any) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop:${COMPLETED_COL_ID}`,
    data: { type: "column-drop", colId: COMPLETED_COL_ID },
  });
  const isH = orientation === "horizontal";
  return (
    <div className={isH ? (minimal ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col" : "flex w-72 shrink-0 flex-col") : "flex w-full flex-col"}>
      <button type="button" onClick={onOpenChange} className="mb-2 flex w-full items-center gap-1.5 rounded px-1 text-left hover:bg-muted/50">
        <span className="h-3 w-3 rounded-full bg-emerald-500 dark:bg-emerald-400 dark:ring-2 dark:ring-emerald-200/40 dark:shadow-[0_0_12px_rgba(74,222,128,0.7)]" />
        <h3 className="font-semibold">Concluídas</h3>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-400/25 dark:text-emerald-100 dark:ring-1 dark:ring-emerald-200/45 dark:shadow-[0_0_10px_rgba(74,222,128,0.32)]">
          {count}
        </span>
        {!isH && open && (
          <span className="ml-2 text-xs text-muted-foreground">
            Arraste tarefas aqui para concluir
          </span>
        )}
        <ChevronDown className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      <SortableContext
        items={taskIds}
        strategy={isH ? verticalListSortingStrategy : horizontalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`rounded-lg border-2 border-solid p-2 transition ${
            open
              ? (isH ? "flex flex-col gap-2" : "flex flex-nowrap items-start gap-2 overflow-x-auto pb-2")
              : "flex items-center justify-center"
          } ${isOver ? "border-emerald-500 bg-emerald-500/10" : "border-emerald-500/30 bg-emerald-500/5"}`}
          style={{ minHeight: open ? (isH ? 200 : 120) : 42 }}
        >
          {open ? children : <span className="text-xs font-medium text-muted-foreground">Arraste aqui para concluir</span>}
        </div>
      </SortableContext>
    </div>
  );
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
  canManage,
}: any) {
  const sortable = useSortable({ id: `col:${col.id}`, data: { type: "column", colId: col.id } });
  const {
    setNodeRef: setSortRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = sortable;
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop:${col.id}`,
    data: { type: "column-drop", colId: col.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const isH = orientation === "horizontal";

  return (
    <div
      ref={setSortRef}
      style={style}
      className={isH ? (minimal ? "flex w-[clamp(15rem,18vw,19rem)] shrink-0 flex-col" : "flex w-fit min-w-72 shrink-0 flex-col") : "flex w-full flex-col"}
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {canManage && (
            <span
              {...attributes}
              {...listeners}
              className="inline-flex h-6 w-6 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-muted active:cursor-grabbing dark:text-slate-100 dark:hover:bg-white/10"
              title="Arrastar coluna"
            >
              <GripVertical className="h-4 w-4" />
            </span>
          )}
          <span
            className="h-3 w-3 rounded-full dark:ring-2 dark:ring-white/45 dark:shadow-[0_0_12px_rgba(255,255,255,0.32)]"
            style={{ background: col.color || "#1e3a8a" }}
          />
          <h3 className="font-semibold">{col.name}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold dark:ring-1 dark:ring-white/45 dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            style={{
              color: "var(--foreground)",
              backgroundColor: `${col.color || "#1e3a8a"}40`,
            }}
          >
            {count}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10"
            onClick={onAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 dark:text-slate-100 dark:hover:bg-white/10"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <SortableContext
        items={taskIds}
        strategy={isH ? verticalListSortingStrategy : horizontalListSortingStrategy}
      >
        <div
          ref={setDropRef}
          className={`rounded-lg border-2 border-solid border-l-4 p-2 transition ${
            isH ? "flex flex-col gap-3" : "flex flex-nowrap items-start gap-4 overflow-x-auto pb-2"
          } ${isOver ? "border-primary bg-primary/5" : "border-transparent bg-muted/40"}`}
          style={{
            minHeight: isH ? 200 : 120,
            borderLeftColor: col.color || "#1e3a8a",
          }}
        >
          {children}
        </div>
      </SortableContext>
    </div>
  );
}

function KanbanPage() {
  const qc = useQueryClient();
  const { user, isAdmin, isCollaborator } = useAuth();
  const { data: tasks = [] } = useTasks();
  const { data: rawColumns = [] } = useColumns();
  const { data: userColOrder = [] } = useUserColumnOrder();
  const { data: userTaskOrder = [] } = useUserTaskOrder();
  const { data: clients = [] } = useClients();
  const { data: profiles = [] } = useProfiles();
  const { data: tags = [] } = useTaskTags();
  const { data: statuses = [] } = useTaskStatuses();
  const { data: collaborators = [] } = useTaskCollaborators();
  const collaboratorTaskIds = useMemo(
    () =>
      new Set(
        collaborators
          .filter((collaborator) => collaborator.collaborator_id === user?.id)
          .map((collaborator) => collaborator.task_id),
      ),
    [collaborators, user?.id],
  );
  const { data: boardPrefs } = useBoardPreferences();
  const { data: allSubtasks = [] } = useSubtasks();
  const updatePrefs = useUpdateBoardPreferences();
  const orientation = boardPrefs?.kanban_orientation ?? "vertical";
  const minimalCardsStorageKey = `kanban-minimal-cards:${user?.id ?? "anonymous"}`;
  const [minimalCards, setMinimalCards] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMinimalCards(window.localStorage.getItem(minimalCardsStorageKey) === "true");
  }, [minimalCardsStorageKey]);

  const toggleMinimalCards = () => {
    const next = !minimalCards;
    setMinimalCards(next);
    if (typeof window !== "undefined") window.localStorage.setItem(minimalCardsStorageKey, String(next));
  };

  const subtaskAssigneeTaskIds = useMemo(() => {
    const s = new Set<string>();
    if (!user?.id) return s;
    for (const st of allSubtasks as any[])
      if (st.assignee_id === user.id && st.task_id) s.add(st.task_id);
    return s;
  }, [allSubtasks, user?.id]);

  const subtaskAssigneeTaskIdsByUser = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const st of allSubtasks as any[]) {
      if (!st.assignee_id || !st.task_id) continue;
      const set = map.get(st.assignee_id) ?? new Set<string>();
      set.add(st.task_id);
      map.set(st.assignee_id, set);
    }
    return map;
  }, [allSubtasks]);

  const [filters, setFilters] = useState<TaskFilterValue>({});

  const subtaskDateFilterTaskIds = useMemo(() => {
    const dateFilter = filters.date;
    if (!dateFilter || dateFilter === "all") return new Set<string>();
    return new Set(
      (allSubtasks as any[])
        .filter((subtask) =>
          matchDateFilter(
            {
              due_date: subtask.due_date,
              status: subtask.done ? "done" : null,
              completed_at: subtask.completed_at,
            },
            dateFilter as DateFilter,
          ),
        )
        .map((subtask) => subtask.task_id),
    );
  }, [allSubtasks, filters.date]);

  // Apply per-user column ordering (fallback to global position)
  const columns = useMemo(() => {
    const ord = new Map(userColOrder.map((u) => [u.column_id, u.position]));
    return [...rawColumns].sort((a, b) => {
      const ap = ord.has(a.id) ? (ord.get(a.id) as number) : a.position + 10000;
      const bp = ord.has(b.id) ? (ord.get(b.id) as number) : b.position + 10000;
      return ap - bp;
    });
  }, [rawColumns, userColOrder]);

  // Per-user task position map (fallback to task.position)
  const userTaskPos = useMemo(() => {
    const m = new Map<string, number>();
    userTaskOrder.forEach((u) => m.set(u.task_id, u.position));
    return m;
  }, [userTaskOrder]);
  const didApplyDefaultAssignee = useRef(false);
  const [sort, setSort] = useState<{ field: SortField; direction: SortDirection }>({
    field: "position",
    direction: "asc",
  });

  useEffect(() => {
    if (!user?.id) return;
    if (isCollaborator) {
      setFilters((current) =>
        current.assignee ? { ...current, assignee: undefined } : current,
      );
      return;
    }
    if (didApplyDefaultAssignee.current) return;
    setFilters((current) => ({ ...current, assignee: current.assignee ?? user.id }));
    didApplyDefaultAssignee.current = true;
  }, [user?.id, isCollaborator]);

  const [sort2, setSort2] = useState<{ field: SortField | "none"; direction: SortDirection }>({
    field: "none",
    direction: "asc",
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [defaultCol, setDefaultCol] = useState<string | null>(null);
  const [duplicateTaskTarget, setDuplicateTaskTarget] = useState<Task | null>(null);
  const [duplicateDueDate, setDuplicateDueDate] = useState("");
  const [duplicatingTask, setDuplicatingTask] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [filesOpen, setFilesOpen] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [completedRange, setCompletedRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [completedOpen, setCompletedOpen] = useState(false);
  const [columnEditor, setColumnEditor] = useState<{
    open: boolean;
    id: string | null;
    name: string;
    color: string;
  }>({ open: false, id: null, name: "", color: "#1e3a8a" });

  const completedStatus = useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);
  const fallbackStatus = useMemo(() => statuses.find((s) => !s.is_completed) ?? null, [statuses]);

  const { data: tagLinks = [] } = useTaskTagLinks();

  const tagNameForTask = useMemo(() => {
    const map = new Map<string, string>();
    const linksByTask = new Map<string, string[]>();
    tagLinks.forEach((l) => {
      if (!linksByTask.has(l.task_id)) linksByTask.set(l.task_id, []);
      linksByTask.get(l.task_id)!.push(l.tag_id);
    });
    tasks.forEach((t) => {
      const linkIds = linksByTask.get(t.id) ?? [];
      if (t.tag_id) linkIds.push(t.tag_id);
      const uniqueIds = [...new Set(linkIds)];
      const names = uniqueIds
        .map((id) => tags.find((tag) => tag.id === id)?.name ?? "")
        .filter(Boolean)
        .sort();
      map.set(t.id, names[0] ?? "");
    });
    return map;
  }, [tagLinks, tags, tasks]);

  const completedTasks = useMemo(() => {
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);
    const hasRange = !!(completedRange.start || completedRange.end);
    let all = tasks.filter((t) => {
      if (t.status !== "done" && !t.completed_at) return false;
      const ref = t.completed_at ? new Date(t.completed_at) : new Date(t.updated_at);
      if (hasRange) {
        const start = completedRange.start ? new Date(`${completedRange.start}T00:00:00`) : null;
        const end = completedRange.end ? new Date(`${completedRange.end}T23:59:59`) : null;
        return (!start || ref >= start) && (!end || ref <= end);
      }
      // Padrão: apenas as concluídas de hoje
      return ref >= startToday && ref <= endToday;
    });
    all = applyTaskFilters(all, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser,
      subtaskDateFilterTaskIds,
      restrictToCurrentUserParticipation: isCollaborator,
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
          const order: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };
          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
          break;
        }
        case "status": {
          const sa = statuses.find((s) => s.id === a.status_id);
          const sb = statuses.find((s) => s.id === b.status_id);
          const ap = sa ? sa.position : 9999;
          const bp = sb ? sb.position : 9999;
          cmp = ap - bp;
          break;
        }
        case "position":
        default: {
          cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(
            a.completed_at ?? a.updated_at ?? "",
          );
          break;
        }
      }
      if (cmp === 0 && sort2.field !== "none") {
        const c2 = compareByField(sort2.field as SortField, a, b, tagNameForTask, statuses);
        cmp = sort2.direction === "asc" ? c2 : -c2;
      }
      if (cmp === 0)
        cmp = (b.completed_at ?? b.updated_at ?? "").localeCompare(
          a.completed_at ?? a.updated_at ?? "",
        );
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return all;
  }, [
    tasks,
    filters,
    sort,
    sort2,
    tagNameForTask,
    completedRange,
    statuses,
    user?.id,
    subtaskAssigneeTaskIds,
    collaboratorTaskIds,
    subtaskAssigneeTaskIdsByUser,
    subtaskDateFilterTaskIds,
    isCollaborator,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
  );

  const filtered = useMemo(() => {
    let r = tasks.filter((t) => t.status !== "done" && !t.completed_at);
    r = applyTaskFilters(r, filters, {
      userId: user?.id ?? null,
      subtaskAssigneeTaskIds,
      collaboratorTaskIds,
      subtaskAssigneeTaskIdsByUser,
      subtaskDateFilterTaskIds,
      restrictToCurrentUserParticipation: isCollaborator,
    });
    return r;
  }, [
    tasks,
    filters,
    user?.id,
    subtaskAssigneeTaskIds,
    collaboratorTaskIds,
    subtaskAssigneeTaskIdsByUser,
    subtaskDateFilterTaskIds,
    isCollaborator,
  ]);

  const sortedTasks = useMemo(() => {
    const r = [...filtered];
    r.sort((a, b) => {
      // Na ordenação padrão, tarefas recebidas de outro usuário vêm primeiro,
      // sempre da maior prioridade para a menor.
      if (sort.field === "position" && sort.direction === "asc" && user?.id) {
        const wasAssignedToCurrentUser = (task: Task) =>
          task.assignee_id === user.id && !!task.assigned_by && task.assigned_by !== user.id;
        const aWasAssigned = wasAssignedToCurrentUser(a);
        const bWasAssigned = wasAssignedToCurrentUser(b);
        if (aWasAssigned !== bWasAssigned) return aWasAssigned ? -1 : 1;
        if (aWasAssigned && bWasAssigned) {
          const priorityOrder: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };
          const priorityComparison =
            (priorityOrder[b.priority ?? ""] || 0) - (priorityOrder[a.priority ?? ""] || 0);
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
          const order: Record<string, number> = { low: 1, medium: 2, high: 3, urgent: 4 };
          cmp = (order[a.priority ?? ""] || 0) - (order[b.priority ?? ""] || 0);
          break;
        }
        case "status": {
          const sa = statuses.find((s) => s.id === a.status_id);
          const sb = statuses.find((s) => s.id === b.status_id);
          const ap = sa ? sa.position : 9999;
          const bp = sb ? sb.position : 9999;
          cmp = ap - bp;
          break;
        }
        case "position":
        default: {
          const ap = userTaskPos.has(a.id)
            ? (userTaskPos.get(a.id) as number)
            : (a.position ?? 0) + 100000;
          const bp = userTaskPos.has(b.id)
            ? (userTaskPos.get(b.id) as number)
            : (b.position ?? 0) + 100000;
          cmp = ap - bp;
          break;
        }
      }
      if (cmp === 0 && sort2.field !== "none") {
        const c2 = compareByField(sort2.field as SortField, a, b, tagNameForTask, statuses);
        cmp = sort2.direction === "asc" ? c2 : -c2;
      }
      if (cmp === 0) {
        const ap = userTaskPos.has(a.id)
          ? (userTaskPos.get(a.id) as number)
          : (a.position ?? 0) + 100000;
        const bp = userTaskPos.has(b.id)
          ? (userTaskPos.get(b.id) as number)
          : (b.position ?? 0) + 100000;
        cmp = ap - bp;
      }
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return r;
  }, [filtered, sort, sort2, tagNameForTask, userTaskPos, statuses, user?.id]);

  const tasksByCol = useMemo(() => {
    const map = new Map<string, Task[]>();
    columns.forEach((c) => map.set(c.id, []));
    const firstColId = columns[0]?.id;
    sortedTasks.forEach((t) => {
      if (t.column_id && map.has(t.column_id)) {
        map.get(t.column_id)!.push(t);
        return;
      }
      if (firstColId && map.has(firstColId)) map.get(firstColId)!.push(t);
    });
    return map;
  }, [sortedTasks, columns]);

  const columnIds = useMemo(() => columns.map((c) => `col:${c.id}`), [columns]);

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    const activeType = args.active.data.current?.type;

    if (activeType === "column") {
      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter(
          (container) => container.data.current?.type === "column",
        ),
      });
    }

    const pointerIntersections = pointerWithin(args);
    const intersections =
      pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);
    const overId = getFirstCollision(intersections, "id");

    if (overId) {
      const matchedColumn = columns.find(
        (column) => `drop:${column.id}` === overId || `col:${column.id}` === overId,
      );

      if (matchedColumn) {
        const taskIds = (tasksByCol.get(matchedColumn.id) ?? []).map((task) => task.id);

        if (taskIds.length > 0) {
          const taskCollisions = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) =>
              taskIds.includes(String(container.id)),
            ),
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
      }),
    });
  };

  const onDragEnd = async (e: DragEndEvent) => {
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
      const newIndex = columns.findIndex((c) => `col:${c.id}` === e.over!.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;
      if (!user) return;
      const next = arrayMove(columns, oldIndex, newIndex);
      // Optimistic local order: refresh user_column_order cache so columns memo recomputes
      qc.setQueryData(
        ["user_column_order"],
        next.map((c, i) => ({ column_id: c.id, position: i })),
      );
      // Persist per-user ordering only (does NOT affect other users)
      const rows = next.map((c, i) => ({ user_id: user.id, column_id: c.id, position: i }));
      const { error } = await supabase
        .from("user_column_order")
        .upsert(rows, { onConflict: "user_id,column_id" });
      if (error) toast.error(error.message);
      qc.invalidateQueries({ queryKey: ["user_column_order"] });
      return;
    }

    // task drag
    const taskId = e.active.id as string;
    const overData = e.over.data.current as any;
    const overId = e.over.id as string;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    let targetCol: string | null = null;
    let targetIndex = -1;

    if (overData?.type === "task") {
      targetCol = overData.colId as string;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.findIndex((t) => t.id === overId);
    } else if (overData?.type === "column-drop") {
      targetCol = overData.colId as string;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.length;
    } else if (overData?.type === "column") {
      // Hit the column header/sortable wrapper — treat as drop at end of that column
      targetCol = overData.colId as string;
      const colTasks = tasksByCol.get(targetCol) ?? [];
      targetIndex = colTasks.length;
    }

    if (!targetCol) return;

    const wasCompleted = !!task.completed_at || task.status === "done";

    // Drop into the "Concluídas" lane
    if (targetCol === COMPLETED_COL_ID) {
      if (wasCompleted) return;
      const patch: Partial<Task> = {
        status: "done",
        completed_at: new Date().toISOString(),
      };
      if (completedStatus?.id) patch.status_id = completedStatus.id;
      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>
        curr.map((t) => (t.id === taskId ? ({ ...t, ...patch } as Task) : t)),
      );
      const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);
      if (error) toast.error(error.message);
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa concluída");
      return;
    }

    // Drag out of "Concluídas" back into a normal column → restore
    if (wasCompleted) {
      const patch: Partial<Task> = {
        status: "todo",
        completed_at: null,
        column_id: targetCol,
      };
      if (fallbackStatus?.id) patch.status_id = fallbackStatus.id;
      else patch.status_id = null;
      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>
        curr.map((t) => (t.id === taskId ? ({ ...t, ...patch } as Task) : t)),
      );
      const { error } = await supabase.from("tasks").update(patch).eq("id", taskId);
      if (error) toast.error(error.message);
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa restaurada");
      return;
    }

    const sourceCol = task.column_id;
    const sourceList = sourceCol ? (tasksByCol.get(sourceCol) ?? []) : [];
    const targetList = tasksByCol.get(targetCol) ?? [];

    let nextTargetList: Task[];
    if (sourceCol === targetCol) {
      const oldIdx = sourceList.findIndex((t) => t.id === taskId);
      if (oldIdx === -1 || oldIdx === targetIndex) return;
      nextTargetList = arrayMove(sourceList, oldIdx, targetIndex);
    } else {
      nextTargetList = [...targetList];
      const insertAt = targetIndex === -1 ? nextTargetList.length : targetIndex;
      nextTargetList.splice(insertAt, 0, { ...task, column_id: targetCol });
    }

    if (!user) return;

    // Optimistic local: update task.column_id if it changed
    if (sourceCol !== targetCol) {
      qc.setQueryData<Task[]>(["tasks"], (curr = []) =>
        curr.map((t) => (t.id === taskId ? ({ ...t, column_id: targetCol! } as Task) : t)),
      );
    }
    // Optimistic per-user ordering for the target column
    qc.setQueryData<{ task_id: string; position: number }[]>(["user_task_order"], (curr = []) => {
      const filteredOrder = curr.filter((u) => !nextTargetList.some((t) => t.id === u.task_id));
      const newOrders = nextTargetList.map((t, i) => ({ task_id: t.id, position: i }));
      return [...filteredOrder, ...newOrders];
    });

    // Persist: column change is GLOBAL; ordering is PER-USER
    if (sourceCol !== targetCol) {
      const { error } = await supabase
        .from("tasks")
        .update({ column_id: targetCol })
        .eq("id", taskId);
      if (error) toast.error(error.message);
    }
    const rows = nextTargetList.map((t, i) => ({ user_id: user.id, task_id: t.id, position: i }));
    const { error: ordErr } = await supabase
      .from("user_task_order")
      .upsert(rows, { onConflict: "user_id,task_id" });
    if (ordErr) toast.error(ordErr.message);
    qc.invalidateQueries({ queryKey: ["tasks"] });
    qc.invalidateQueries({ queryKey: ["user_task_order"] });
  };

  const addColumn = () => {
    if (!isAdmin) return toast.error("Apenas administradores podem criar colunas");
    setColumnEditor({ open: true, id: null, name: "", color: "#1e3a8a" });
  };

  const renameColumn = (col: KanbanColumn) => {
    setColumnEditor({ open: true, id: col.id, name: col.name, color: col.color || "#1e3a8a" });
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
      const { error } = await supabase
        .from("kanban_columns")
        .update({ name, color })
        .eq("id", columnEditor.id);
      if (error) return toast.error(error.message);
    } else {
      const { error } = await supabase
        .from("kanban_columns")
        .insert({ name, color, position: columns.length, created_by: user.id });
      if (error) return toast.error(error.message);
    }
    setColumnEditor({ open: false, id: null, name: "", color: "#1e3a8a" });
    qc.invalidateQueries({ queryKey: ["columns"] });
  };

  const deleteColumn = async (col: KanbanColumn) => {
    if (!confirm(`Excluir coluna "${col.name}"? As tarefas ficarão sem coluna.`)) return;
    const { error } = await supabase.from("kanban_columns").delete().eq("id", col.id);
    if (error) toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["columns"] });
    qc.invalidateQueries({ queryKey: ["tasks"] });
  };

  const duplicateTask = async (task: Task, dueDate: string) => {
    if (!user || !dueDate) return;
    setDuplicatingTask(true);
    try {
      // 1. Criar nova tarefa
      // Não use INSERT ... RETURNING: a política SELECT pode bloquear a leitura
      // da linha recém-criada. Geramos o UUID no cliente e inserimos sem select.
      const newTaskId = crypto.randomUUID();
      const { error: taskError } = await supabase.from("tasks").insert({
        id: newTaskId,
        title: `${task.title} (cópia)`,
        description: task.description,
        status: task.status === "done" ? "todo" : task.status,
        priority: task.priority,
        column_id: task.column_id,
        client_id: task.client_id,
        assignee_id: task.assignee_id,
        due_date: new Date(`${dueDate}T12:00:00`).toISOString(),
        color: task.color,
        status_id: task.status_id,
        completed_at: null,
        created_by: user.id,
        position: 9999,
      });
      if (taskError) throw taskError;

      // 2. Copiar subtarefas
      const { data: subs } = await supabase
        .from("subtasks")
        .select("title, done, position")
        .eq("task_id", task.id);
      if (subs && subs.length > 0) {
        await supabase.from("subtasks").insert(
          subs.map((s) => ({
            task_id: newTaskId,
            title: s.title,
            done: s.done,
            position: s.position,
          })),
        );
      }

      // 3. Copiar comentários
      const { data: coms } = await supabase
        .from("comments")
        .select("body, author_id")
        .eq("task_id", task.id);
      if (coms && coms.length > 0) {
        await supabase
          .from("comments")
          .insert(coms.map((c) => ({ task_id: newTaskId, body: c.body, author_id: c.author_id })));
      }

      // 4. Copiar tags
      const { data: tagLinks } = await supabase
        .from("task_tag_links")
        .select("tag_id")
        .eq("task_id", task.id);
      if (tagLinks && tagLinks.length > 0) {
        await supabase
          .from("task_tag_links")
          .insert(tagLinks.map((t) => ({ task_id: newTaskId, tag_id: t.tag_id })));
      }

      // 5. Copiar anexos (arquivos no storage também)
      const { data: atts } = await supabase
        .from("attachments")
        .select("file_name, storage_path, mime_type, size_bytes, uploaded_by")
        .eq("task_id", task.id);
      if (atts && atts.length > 0) {
        for (const a of atts) {
          if (a.mime_type === "text/uri-list") {
            // Links não precisam copiar arquivo
            await supabase.from("attachments").insert({
              task_id: newTaskId,
              file_name: a.file_name,
              storage_path: a.storage_path,
              mime_type: a.mime_type,
              size_bytes: a.size_bytes,
              uploaded_by: a.uploaded_by,
            });
          } else {
            try {
              const { data: fileData, error: dlErr } = await supabase.storage
                .from("task-attachments")
                .download(a.storage_path);
              if (!dlErr && fileData) {
                const newPath = `${newTaskId}/${Date.now()}-${a.file_name}`;
                await supabase.storage.from("task-attachments").upload(newPath, fileData, {
                  contentType: a.mime_type || "application/octet-stream",
                });
                await supabase.from("attachments").insert({
                  task_id: newTaskId,
                  file_name: a.file_name,
                  storage_path: newPath,
                  mime_type: a.mime_type,
                  size_bytes: a.size_bytes,
                  uploaded_by: a.uploaded_by,
                });
              }
            } catch {
              // ignora erro de arquivo individual
            }
          }
        }
      }

      qc.invalidateQueries({ queryKey: ["tasks"] });
      setDuplicateTaskTarget(null);
      setDuplicateDueDate("");
      toast.success("Tarefa duplicada");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setDuplicatingTask(false);
    }
  };

  const exportPdf = async () => {
    setExportingPdf(true);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const prioLabel: Record<string, string> = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente",
    };
    const prioColor: Record<string, string> = {
      low: "#64748b",
      medium: "#2563eb",
      high: "#f59e0b",
      urgent: "#dc2626",
    };

    const tagsByTask = new Map<string, { name: string; color: string }[]>();
    tagLinks.forEach((l) => {
      const tag = tags.find((t) => t.id === l.tag_id);
      if (!tag) return;
      if (!tagsByTask.has(l.task_id)) tagsByTask.set(l.task_id, []);
      tagsByTask.get(l.task_id)!.push({ name: tag.name, color: tag.color });
    });

    const renderTask = (t: Task) => {
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
          ${
            taskTags.length
              ? `<div class="tags">${taskTags
                  .map(
                    (tg) =>
                      `<span class="tag" style="background:${tg.color}20;color:${tg.color};border-color:${tg.color}55">${esc(tg.name)}</span>`,
                  )
                  .join("")}</div>`
              : ""
          }
        </div>`;
    };

    const renderCol = (name: string, color: string, items: Task[]) => `
      <section class="col">
        <h2 style="border-color:${color}"><span class="dot" style="background:${color}"></span>${esc(name)} <span class="count">${items.length}</span></h2>
        <div class="col-body">
          ${items.length === 0 ? '<div class="empty">Nenhuma tarefa</div>' : items.map(renderTask).join("")}
        </div>
      </section>
    `;

    const colsHtml = columns
      .map((c) => renderCol(c.name, c.color || "#1e3a8a", tasksByCol.get(c.id) ?? []))
      .join("");
    const completedLabel =
      completedRange.start || completedRange.end
        ? "Concluídas no período"
        : filters.date === "completed"
          ? "Concluídas"
          : filters.date === "this_month"
            ? "Concluídas no mês"
            : "Concluídas hoje";
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
    <div class="meta">${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</div>
  </header>
  <div class="board">${colsHtml}${completedHtml}</div>
  </div>`;

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-10000px";
      wrapper.style.top = "0";
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      const target = wrapper.querySelector(".kanban-pdf-root") as HTMLElement;
      const canvas = await html2canvas(target, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });
      wrapper.remove();

      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
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

      pdf.save(`relatorio-kanban-${format(new Date(), "yyyy-MM-dd-HHmm")}.pdf`);
      toast.success("PDF gerado");
    } catch (e) {
      toast.error((e as Error).message || "Não foi possível gerar o PDF");
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <header className="shrink-0 border-b bg-background px-3 py-2">
        <div className="flex items-center justify-end gap-2">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setFilesOpen(true)}>
              <FolderOpen className="mr-2 h-4 w-4" />
              Arquivos Cliente
            </Button>
            <Button variant="outline" onClick={() => setTagsOpen(true)}>
              Etiquetas
            </Button>
            {isAdmin && (
              <Button variant="outline" onClick={addColumn}>
                <Plus className="mr-2 h-4 w-4" />
                Coluna
              </Button>
            )}
            <Button
              onClick={() => {
                setEditTask(null);
                setDefaultCol(columns[0]?.id ?? null);
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tarefa
            </Button>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <TaskFilters filters={filters} onChange={setFilters} hideAssignee={isCollaborator}>
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1"
                onClick={() =>
                  updatePrefs.mutate({
                    kanban_orientation: orientation === "horizontal" ? "vertical" : "horizontal",
                  })
                }
                title={
                  orientation === "horizontal" ? "Mudar para vertical" : "Mudar para horizontal"
                }
              >
                {orientation === "horizontal" ? (
                  <Rows className="h-3.5 w-3.5" />
                ) : (
                  <Columns className="h-3.5 w-3.5" />
                )}
                {orientation === "horizontal" ? "Vertical" : "Horizontal"}
              </Button>
              <Button
                size="sm"
                variant={minimalCards ? "default" : "outline"}
                className="h-7 gap-1"
                onClick={toggleMinimalCards}
                title={minimalCards ? "Exibir cards completos" : "Exibir cards minimalistas"}
              >
                {minimalCards ? (
                  <PanelsTopLeft className="h-3.5 w-3.5" />
                ) : (
                  <PanelTop className="h-3.5 w-3.5" />
                )}
                {minimalCards ? "Completo" : "Minimalista"}
              </Button>{" "}
              <CardFieldsPopover />
            </div>
            <div className="mr-3 inline-flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Concluídas no período</span>
              <Input
                type="date"
                value={completedRange.start}
                onChange={(e) =>
                  setCompletedRange((range) => ({ ...range, start: e.target.value }))
                }
                className="h-7 w-36"
              />
              <span>até</span>
              <Input
                type="date"
                value={completedRange.end}
                onChange={(e) => setCompletedRange((range) => ({ ...range, end: e.target.value }))}
                className="h-7 w-36"
              />
              {completedRange.start || completedRange.end ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7"
                  onClick={() => setCompletedRange({ start: "", end: "" })}
                >
                  Limpar período
                </Button>
              ) : null}
            </div>
            <div className="inline-flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-muted-foreground">Ordenar:</span>
              <Select
                value={sort.field}
                onValueChange={(v) => setSort((s) => ({ ...s, field: v as SortField }))}
              >
                <SelectTrigger className="h-7 w-44">
                  <SelectValue placeholder="1º critério" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="position">Posição (manual)</SelectItem>
                  <SelectItem value="priority">Prioridade</SelectItem>
                  <SelectItem value="due_date">Prazo</SelectItem>
                  <SelectItem value="created_at">Data de criação</SelectItem>
                  <SelectItem value="tag">Tag</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-7"
                onClick={() =>
                  setSort((s) => ({ ...s, direction: s.direction === "asc" ? "desc" : "asc" }))
                }
                title="Inverter direção"
              >
                {sort.direction === "asc" ? (
                  <ArrowUp className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5" />
                )}
              </Button>
              <span className="text-xs text-muted-foreground">então:</span>
              <Select
                value={sort2.field}
                onValueChange={(v) => setSort2((s) => ({ ...s, field: v as SortField | "none" }))}
              >
                <SelectTrigger className="h-7 w-44">
                  <SelectValue placeholder="2º critério" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— nenhum —</SelectItem>
                  <SelectItem value="priority">Prioridade</SelectItem>
                  <SelectItem value="due_date">Prazo</SelectItem>
                  <SelectItem value="created_at">Data de criação</SelectItem>
                  <SelectItem value="tag">Tag</SelectItem>
                </SelectContent>
              </Select>
              {sort2.field !== "none" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7"
                  onClick={() =>
                    setSort2((s) => ({ ...s, direction: s.direction === "asc" ? "desc" : "asc" }))
                  }
                  title="Inverter direção secundária"
                >
                  {sort2.direction === "asc" ? (
                    <ArrowUp className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDown className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
            </div>
          </TaskFilters>
        </div>
      </header>

      <KanbanScrollArea orientation={orientation}>
        <DndContext
          sensors={sensors}
          collisionDetection={collisionDetectionStrategy}
          autoScroll={{ layoutShiftCompensation: false, threshold: { x: 0.15, y: 0.15 } }}
          onDragStart={(e) => {
            if (e.active.data.current?.type === "task") {
              setActiveTask(tasks.find((t) => t.id === e.active.id) ?? null);
            }
          }}
          onDragEnd={onDragEnd}
          onDragCancel={() => setActiveTask(null)}
        >
          <SortableContext
            items={columnIds}
            strategy={
              orientation === "horizontal"
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy
            }
          >
            <div
              className={
                orientation === "horizontal"
                  ? "flex flex-row items-start gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {columns.map((col) => {
                const colTasks = tasksByCol.get(col.id) ?? [];
                return (
                  <SortableColumn
                    key={col.id}
                    col={col}
                    orientation={orientation}
                    minimal={minimalCards}
                    taskIds={colTasks.map((t) => t.id)}
                    count={colTasks.length}
                    onAdd={() => {
                      setEditTask(null);
                      setDefaultCol(col.id);
                      setDialogOpen(true);
                    }}
                    onEdit={() => renameColumn(col)}
                    onDelete={() => deleteColumn(col)}
                    canManage={isAdmin}
                  >
                    {colTasks.map((t) => (
                      <SortableTaskCard
                        key={t.id}
                        task={t}
                        orientation={orientation}
                        clients={clients}
                        profiles={profiles}
                        columns={columns}
                        tags={tags}
                        statuses={statuses}
                        collaborators={collaborators}
                        minimal={minimalCards}
                        onEdit={() => {
                          setEditTask(t);
                          setDialogOpen(true);
                        }}
                        onDuplicate={() => {
                          setDuplicateTaskTarget(t);
                          setDuplicateDueDate("");
                        }}
                      />
                    ))}
                  </SortableColumn>
                );
              })}

              <CompletedColumn
                count={completedTasks.length}
                orientation={orientation}
                minimal={minimalCards}
                open={completedOpen}
                onOpenChange={() => setCompletedOpen((current) => !current)}
                taskIds={completedTasks.map((t) => t.id)}
              >
                {completedTasks.length === 0 ? (
                  <div className="flex w-full items-center justify-center text-xs text-muted-foreground">
                    Nenhuma tarefa concluída ainda.
                  </div>
                ) : (
                  completedTasks.map((t) => (
                    <SortableTaskCard
                      key={t.id}
                      task={t}
                      colId={COMPLETED_COL_ID}
                      orientation={orientation}
                      clients={clients}
                      profiles={profiles}
                      columns={columns}
                      tags={tags}
                      statuses={statuses}
                      collaborators={collaborators}
                      minimal={minimalCards}
                      onEdit={() => {
                        setEditTask(t);
                        setDialogOpen(true);
                      }}
                      onDuplicate={() => {
                        setDuplicateTaskTarget(t);
                        setDuplicateDueDate("");
                      }}
                    />
                  ))
                )}
              </CompletedColumn>
            </div>
          </SortableContext>
          <DragOverlay>
            {activeTask && (
              <div className="rotate-2 opacity-90">
                <TaskCard
                  task={activeTask}
                  clients={clients}
                  profiles={profiles}
                  columns={columns}
                  tags={tags}
                  statuses={statuses}
                  collaborators={collaborators}
                  minimal={minimalCards}
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </KanbanScrollArea>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editTask}
        defaultColumnId={defaultCol}
      />
      <Dialog
        open={!!duplicateTaskTarget}
        onOpenChange={(open) => {
          if (!open && !duplicatingTask) setDuplicateTaskTarget(null);
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Duplicar tarefa</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Defina o novo prazo para a cópia de “{duplicateTaskTarget?.title}”.
            </p>
            <Input
              type="date"
              value={duplicateDueDate}
              onChange={(event) => setDuplicateDueDate(event.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={duplicatingTask}
              onClick={() => setDuplicateTaskTarget(null)}
            >
              Cancelar
            </Button>
            <Button
              disabled={!duplicateDueDate || duplicatingTask}
              onClick={() =>
                duplicateTaskTarget && void duplicateTask(duplicateTaskTarget, duplicateDueDate)
              }
            >
              {duplicatingTask ? "Duplicando…" : "Duplicar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TagManagerDialog open={tagsOpen} onOpenChange={setTagsOpen} />
      <ClientFilesSheet open={filesOpen} onOpenChange={setFilesOpen} />

      <Dialog
        open={columnEditor.open}
        onOpenChange={(o) => {
          if (!o) setColumnEditor((c) => ({ ...c, open: false }));
        }}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{columnEditor.id ? "Editar coluna" : "Nova coluna"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Nome</label>
              <Input
                value={columnEditor.name}
                onChange={(e) => setColumnEditor((c) => ({ ...c, name: e.target.value }))}
                placeholder="Ex.: Em revisão"
                autoFocus
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Cor</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={columnEditor.color}
                  onChange={(e) => setColumnEditor((c) => ({ ...c, color: e.target.value }))}
                  className="h-9 w-14 cursor-pointer rounded border bg-transparent"
                />
                <Input
                  value={columnEditor.color}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setColumnEditor((c) => ({ ...c, color: v }));
                  }}
                  className="flex-1"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  "#1e3a8a",
                  "#0ea5e9",
                  "#10b981",
                  "#f59e0b",
                  "#ef4444",
                  "#a855f7",
                  "#ec4899",
                  "#64748b",
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColumnEditor((cur) => ({ ...cur, color: c }))}
                    className="h-6 w-6 rounded-full border border-border shadow-sm transition hover:scale-110"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setColumnEditor((c) => ({ ...c, open: false }))}
            >
              Cancelar
            </Button>
            <Button onClick={() => void saveColumn()}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function KanbanScrollArea({
  orientation,
  children,
}: {
  orientation: "horizontal" | "vertical";
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null);

  // Wheel vertical → scroll horizontal quando estiver no modo horizontal
  useEffect(() => {
    const el = mainRef.current;
    if (!el || orientation !== "horizontal") return;
    const onWheel = (e: WheelEvent) => {
      // se não há overflow horizontal, ignora
      if (el.scrollWidth <= el.clientWidth) return;
      // ignora se o alvo está dentro de uma coluna que tem rolagem vertical útil
      const target = e.target as HTMLElement | null;
      const column = target?.closest(".kanban-scroll");
      if (
        column &&
        column !== el &&
        (column as HTMLElement).scrollHeight > (column as HTMLElement).clientHeight + 1
      ) {
        return; // deixa o navegador rolar a coluna
      }
      if (e.shiftKey && e.deltaY !== 0 && e.deltaX === 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [orientation]);

  return (
    <div className="flex flex-1 flex-col">
      <div ref={mainRef} className="kanban-scroll flex-1 overflow-x-auto overflow-y-visible p-4">
        {children}
      </div>
    </div>
  );
}
