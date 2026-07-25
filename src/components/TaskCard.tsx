import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlignLeft,
  ArrowDown,
  ArrowUp,
  Calendar as CalendarIcon,
  Clock3,
  ChevronDown,
  ChevronRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  Flag,
  Image as ImageIcon,
  Link2,
  History,
  ListChecks,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Plus,
  Tag as TagIcon,
  Trash2,
  Upload,
  User as UserIcon,
  Users,
  X,


} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RichTextEditor, RichTextView } from "@/components/RichTextEditor";
import { CommentAttachments } from "@/components/CommentAttachments";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import type { Client, KanbanColumn, Profile, Task, TaskCollaborator, TaskStatus, TaskTag } from "@/hooks/use-data";
import { useBoardPreferences, type CardField } from "@/hooks/use-board-preferences";
import { InterruptionsBlock } from "@/components/InterruptionsBlock";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Attachment {
  id: string;
  task_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

interface Subtask {
  id: string;
  task_id: string;
  title: string;
  done: boolean;
  position: number;
  comment_id: string | null;
  due_date: string | null;
  completed_at: string | null;
  assignee_id: string | null;
}

interface CardComment {
  id: string;
  task_id: string;
  title: string | null;
  body: string;
  created_at: string;
  position: number;
}


const LINK_MIME = "text/uri-list";
const DESCRIPTION_COLLAPSED_LIMIT = 140;
const DEFAULT_DEADLINE_TIME = "12:00";
const formatDueTime = (time: string | null) => time?.slice(0, 5) ?? null;
const hasExplicitDueTime = (time: string | null) => Boolean(formatDueTime(time));

interface Props {
  task: Task;
  columns?: KanbanColumn[];
  clients?: Client[];
  profiles?: Profile[];
  tags?: TaskTag[];
  statuses?: TaskStatus[];
  collaborators?: TaskCollaborator[];
  onEdit?: () => void;
  onDuplicate?: () => void;
  dragHandleProps?: HTMLAttributes<HTMLDivElement>;
  minimal?: boolean;
}

const PRIORITY_LABELS: Record<NonNullable<Task["priority"]>, { label: string; color: string }> = {
  low: { label: "Baixa", color: "#64748b" },
  medium: { label: "Média", color: "#3b82f6" },
  high: { label: "Alta", color: "#f59e0b" },
  urgent: { label: "Urgente", color: "#ef4444" },
};

function stop(e: { stopPropagation: () => void }) {
  e.stopPropagation();
}

/* Contrast helper — returns white or black depending on bg brightness */
function readableText(hex: string) {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#0a0a0a" : "#ffffff";
}

export function TaskCard({
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
  minimal = false,
}: Props) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [titleEditing, setTitleEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);
  const [descEditing, setDescEditing] = useState(false);
  const [descDraft, setDescDraft] = useState(task.description ?? "");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [comments, setComments] = useState<CardComment[]>([]);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
  const [subtaskDraft, setSubtaskDraft] = useState("");
  const canDeleteSubtask = (subtask: Subtask) =>
    !!isAdmin || subtask.assignee_id !== user?.id || task.created_by === user?.id;
  const [newSubtask, setNewSubtask] = useState("");
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [commentSubtaskDraft, setCommentSubtaskDraft] = useState<Record<string, string>>({});
  const [dueChange, setDueChange] = useState<{ open: boolean; pending: string | null; pendingTime: string | null; reason: string }>({ open: false, pending: null, pendingTime: null, reason: "" });
  const [historyOpen, setHistoryOpen] = useState(false);
  const { data: dueHistory = [] } = useQuery({
    queryKey: ["task_due_date_changes", task.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_due_date_changes")
        .select("id, old_due_date, new_due_date, reason, created_at, user_id")
        .eq("task_id", task.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Array<{ id: string; old_due_date: string | null; new_due_date: string | null; reason: string | null; created_at: string; user_id: string | null }>;
    },
    enabled: historyOpen,
  });
  const { data: prefs } = useBoardPreferences();
  const hiddenFields = prefs?.hidden_fields ?? [];
  const fieldOrder = prefs?.field_order ?? [];
  const interruptionColor = prefs?.interruption_color ?? "#ef4444";
  const isVisible = (f: CardField) => !hiddenFields.includes(f);
  const orderOf = (f: CardField) => {
    const idx = fieldOrder.indexOf(f);
    return idx === -1 ? 999 : idx;
  };
  const subtasksTitleKey = `subtasks-title:${task.id}`;
  const subtasksOpenKey = `subtasks-open:${task.id}`;
  const [subtasksTitle, setSubtasksTitle] = useState<string>(() => {
    if (typeof window === "undefined") return "Subtarefas";
    return window.localStorage.getItem(subtasksTitleKey) || "Subtarefas";
  });
  const [subtasksOpen, setSubtasksOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = window.localStorage.getItem(subtasksOpenKey);
    return v === null ? true : v === "1";
  });
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(subtasksOpenKey, subtasksOpen ? "1" : "0");
  }, [subtasksOpen, subtasksOpenKey]);
  const renameSubtasksTitle = () => {
    const next = window.prompt("Título da seção de subtarefas", subtasksTitle)?.trim();
    if (!next) return;
    setSubtasksTitle(next);
    if (typeof window !== "undefined") window.localStorage.setItem(subtasksTitleKey, next);
  };

  useEffect(() => setTitleDraft(task.title), [task.title]);
  useEffect(() => setDescDraft(task.description ?? ""), [task.description]);
  // A expansão é local ao card: ao trocar/sair da tarefa ou recarregar, volta fechada.
  useEffect(() => setDescriptionExpanded(false), [task.id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("attachments")
        .select("*")
        .eq("task_id", task.id)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      const list = (data ?? []) as Attachment[];
      setAttachments(list);

      const next: Record<string, string> = {};
      await Promise.all(
        list
          .filter((a) => a.mime_type !== LINK_MIME && (a.mime_type?.startsWith("image/") ?? false))
          .map(async (a) => {
            const { data: signed } = await supabase.storage
              .from("task-attachments")
              .createSignedUrl(a.storage_path, 3600);
            if (signed) next[a.id] = signed.signedUrl;
          }),
      );
      if (!cancelled) setThumbs(next);
    })();
    return () => {
      cancelled = true;
    };
  }, [task.id]);

  const [subsRefreshTick, setSubsRefreshTick] = useState(0);
  useEffect(() => {
    const cache = qc.getQueryCache();
    const unsub = cache.subscribe((event: any) => {
      if (event?.type !== "updated") return;
      const key = event.query?.queryKey?.[0];
      if (key === "subtasks" || key === "tasks") {
        setSubsRefreshTick((n) => n + 1);
      }
    });
    return () => unsub();
  }, [qc]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ data: links }, { data: subs }, { data: notes }] = await Promise.all([
        supabase.from("task_tag_links").select("tag_id").eq("task_id", task.id),
        supabase.from("subtasks").select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id").eq("task_id", task.id).order("position"),
        supabase.from("comments").select("id, task_id, title, body, created_at, position").eq("task_id", task.id).order("position", { ascending: true }).order("created_at", { ascending: true }),
      ]);
      if (cancelled) return;
      setTagIds(((links ?? []) as { tag_id: string }[]).map((l) => l.tag_id));
      setSubtasks((subs ?? []) as Subtask[]);
      setComments((notes ?? []) as CardComment[]);
    })();
    return () => { cancelled = true; };
  }, [task.id, subsRefreshTick]);

  const selectedTags = useMemo(
    () => tagIds.map((id) => tags.find((t) => t.id === id)).filter(Boolean) as TaskTag[],
    [tagIds, tags],
  );
  const client = useMemo(() => clients.find((c) => c.id === task.client_id), [clients, task.client_id]);
  const assignee = useMemo(
    () => profiles.find((p) => p.id === task.assignee_id),
    [profiles, task.assignee_id],
  );
  const taskCollaborators = useMemo(
    () => collaborators
      .filter((collaborator) => collaborator.task_id === task.id)
      .map((collaborator) => profiles.find((profile) => profile.id === collaborator.collaborator_id))
      .filter((profile): profile is Profile => Boolean(profile)),
    [collaborators, profiles, task.id],
  );
  const taskPeople = useMemo(
    () => [assignee, ...taskCollaborators].filter(
      (profile, index, people): profile is Profile =>
        Boolean(profile) && people.findIndex((person) => person?.id === profile?.id) === index,
    ),
    [assignee, taskCollaborators],
  );

  const toggleCollaborator = async (collaboratorId: string) => {
    const existing = collaborators.find(
      (collaborator) => collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId,
    );
    const queryKey = ["task_collaborators"];
    if (existing) {
      const { error } = await (supabase.from("task_collaborators") as any)
        .delete()
        .eq("task_id", task.id)
        .eq("collaborator_id", collaboratorId);
      if (error) return toast.error(error.message);
      qc.setQueryData<TaskCollaborator[]>(queryKey, (current = []) =>
        current.filter((collaborator) => !(collaborator.task_id === task.id && collaborator.collaborator_id === collaboratorId)),
      );
    } else {
      const { data, error } = await (supabase.from("task_collaborators") as any)
        .insert({ task_id: task.id, collaborator_id: collaboratorId, added_by: user?.id ?? null })
        .select("task_id, collaborator_id, added_by, created_at")
        .single();
      if (error) return toast.error(error.message);
      qc.setQueryData<TaskCollaborator[]>(queryKey, (current = []) => [...current, data as TaskCollaborator]);
    }
    qc.invalidateQueries({ queryKey });
  };
  const creator = useMemo(
    () => profiles.find((p) => p.id === task.created_by),
    [profiles, task.created_by],
  );
  const assigner = useMemo(
    () => profiles.find((p) => p.id === task.assigned_by),
    [profiles, task.assigned_by],
  );

  const update = async (patch: Partial<Task>) => {
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

  const foldSelectedDescription = async () => {
    if (!user) return;
    const el = descTextareaRef.current;
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? 0;
    const selected = descDraft.slice(start, end).trim();
    if (!selected || start === end) {
      toast.error("Selecione o texto que deseja transformar em seção dobrável");
      return;
    }
    const suggested = selected.split("\n").find(Boolean)?.slice(0, 60) ?? "Anotação";
    const title = window.prompt("Título da seção dobrável", suggested)?.trim();
    if (!title) return;
    const nextDescription = `${descDraft.slice(0, start)}${descDraft.slice(end)}`.trim();
    const nextPos = (comments.reduce((m, c) => Math.max(m, c.position ?? 0), -1)) + 1;
    const { data, error } = await supabase
      .from("comments")
      .insert({ task_id: task.id, author_id: user.id, title, body: selected, position: nextPos })
      .select("id, task_id, title, body, created_at, position")
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setComments((current) => [...current, data as CardComment]);
    setOpenComments((current) => ({ ...current, [(data as CardComment).id]: true }));
    setDescDraft(nextDescription);
    await update({ description: nextDescription || null });
    setDescEditing(false);
    toast.success("Seção dobrável criada");
  };



  const uploadFile = async (file: File) => {
    if (!user) return;
    const safe =
      file.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._-]+/g, "_")
        .replace(/_+/g, "_")
        .slice(-120) || "arquivo";
    const path = `${task.id}/${Date.now()}-${safe}`;
    const contentType = file.type || "application/octet-stream";
    const { error: upErr } = await supabase.storage
      .from("task-attachments")
      .upload(path, file, { contentType, upsert: false });
    if (upErr) {
      toast.error(upErr.message);
      return;
    }
    const { data, error } = await supabase
      .from("attachments")
      .insert({
        task_id: task.id,
        file_name: file.name,
        storage_path: path,
        mime_type: contentType,
        size_bytes: file.size,
        uploaded_by: user.id,
      })
      .select()
      .single();
    if (error) {
      toast.error(error.message);
      return;
    }
    const att = data as Attachment;
    setAttachments((c) => [...c, att]);
    if (att.mime_type?.startsWith("image/")) {
      const { data: signed } = await supabase.storage
        .from("task-attachments")
        .createSignedUrl(att.storage_path, 3600);
      if (signed) setThumbs((c) => ({ ...c, [att.id]: signed.signedUrl }));
    }
  };

  const deleteAttachment = async (a: Attachment) => {
    if (a.mime_type !== LINK_MIME) {
      await supabase.storage.from("task-attachments").remove([a.storage_path]);
    }
    await supabase.from("attachments").delete().eq("id", a.id);
    setAttachments((c) => c.filter((x) => x.id !== a.id));
  };

  const openAttachment = (a: Attachment) => {
    if (a.mime_type === LINK_MIME) {
      window.open(a.storage_path, "_blank", "noopener,noreferrer");
      return;
    }
    setPreviewAttachment(a);
  };

  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const dueTime = formatDueTime(task.due_time);
  const dueHasTime = Boolean(dueTime);
  const dueMoment = dueDate && dueTime
    ? new Date(`${format(dueDate, "yyyy-MM-dd")}T${dueTime}:00`)
    : dueDate;
  const dueLabel = dueDate
    ? `${format(dueDate, "dd MMM", { locale: ptBR })}${dueHasTime ? ` · ${dueTime}` : ""}`
    : null;

  const dueMeta = (() => {
    if (!dueDate || task.status === "done") {
      return { state: "none" as const, label: "Prazo", days: 0, subtext: dueLabel ?? "Definir" };
    }
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const diffMs = startOfDue.getTime() - startOfToday.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      return {
        state: "overdue" as const,
        label: overdueDays === 1 ? "Atrasado 1 dia" : `Atrasado ${overdueDays} dias`,
        days: overdueDays,
        subtext: dueLabel,
      };
    }
    if (diffDays === 0) {
      if (dueHasTime) {
        if (dueMoment && dueMoment.getTime() < now.getTime()) {
          const overdueHours = Math.max(1, Math.ceil((now.getTime() - dueMoment.getTime()) / 3_600_000));
          return {
            state: "overdue" as const,
            label: overdueHours === 1 ? "Atrasado 1h" : `Atrasado ${overdueHours}h`,
            days: 0,
            subtext: dueLabel,
          };
        }
        return {
          state: "today" as const,
          label: `Vence às ${dueTime}`,
          days: 0,
          subtext: dueLabel,
        };
      }
      return {
        state: "today" as const,
        label: "Vence hoje",
        days: 0,
        subtext: dueLabel,
      };
    }
    if (diffDays === 1) {
      return {
        state: "tomorrow" as const,
        label: "Vence amanhã",
        days: 1,
        subtext: dueLabel,
      };
    }
    if (diffDays <= 7) {
      return {
        state: "soon" as const,
        label: `Vence em ${diffDays} dias`,
        days: diffDays,
        subtext: dueLabel,
      };
    }
    return { state: "future" as const, label: "Prazo", days: diffDays, subtext: dueLabel };
  })();
  const dueState = dueMeta.state;

  const dueChipClass = {
    overdue: "bg-destructive text-destructive-foreground font-bold shadow-sm ring-1 ring-destructive/40",
    today: "bg-destructive/90 text-destructive-foreground font-semibold shadow-sm ring-1 ring-destructive/30",
    tomorrow: "bg-amber-500 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/40",
    soon: "bg-amber-500/90 text-amber-950 font-semibold shadow-sm ring-1 ring-amber-500/30",
    future: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30",
    none: "bg-muted text-muted-foreground",
  }[dueState];

  const computeSubtaskDue = (iso: string | null, done: boolean) => {
    if (!iso) return { label: "Sem prazo", cls: "bg-muted/60 text-muted-foreground border border-dashed border-muted-foreground/30", state: "none" as const };
    const d = new Date(iso);
    const dateLabel = format(d, "dd MMM", { locale: ptBR });
    if (done) return { label: dateLabel, cls: "bg-muted text-muted-foreground line-through", state: "done" as const };
    const now = new Date();
    const s0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const s1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diff = Math.round((s1.getTime() - s0.getTime()) / 86400000);
    if (diff < 0) {
      const n = Math.abs(diff);
      return { label: n === 1 ? "Atrasado 1 dia" : `Atrasado ${n} dias`, cls: "bg-destructive text-destructive-foreground font-semibold ring-1 ring-destructive/40", state: "overdue" as const };
    }
    if (diff === 0) return { label: "Vence hoje", cls: "bg-destructive/90 text-destructive-foreground font-semibold ring-1 ring-destructive/30", state: "today" as const };
    if (diff === 1) return { label: "Vence amanhã", cls: "bg-amber-500 text-amber-950 font-semibold ring-1 ring-amber-500/40", state: "tomorrow" as const };
    if (diff <= 7) return { label: `Vence em ${diff} dias`, cls: "bg-amber-500/90 text-amber-950 font-semibold ring-1 ring-amber-500/30", state: "soon" as const };
    return { label: dateLabel, cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500/30", state: "future" as const };
  };

  const priority = task.priority ? PRIORITY_LABELS[task.priority] : null;
  const clientText = client?.color ? readableText(client.color) : "#fff";

  const toggleTag = async (tagId: string) => {
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

  const addSubtask = async (commentId: string | null = null, titleOverride?: string, dueOverride?: string | null) => {
    const title = (titleOverride ?? newSubtask).trim();
    if (!title) { setAddingSubtask(false); return; }
    const siblings = subtasks.filter((s) => (s.comment_id ?? null) === commentId);
    const { data, error } = await supabase
      .from("subtasks")
      .insert({ task_id: task.id, title, position: siblings.length, comment_id: commentId, due_date: dueOverride ?? null })
      .select("id, task_id, title, done, position, comment_id, due_date, completed_at, assignee_id")
      .single();
    if (error) { toast.error(error.message); return; }
    setSubtasks((c) => [...c, data as Subtask]);
    if (commentId === null) setNewSubtask("");
  };

  const toggleSubtask = async (s: Subtask) => {
    const nextDone = !s.done;
    const nextCompleted = nextDone ? new Date().toISOString() : null;
    setSubtasks((c) => c.map((x) => (x.id === s.id ? { ...x, done: nextDone, completed_at: nextCompleted } : x)));
    await supabase.from("subtasks").update({ done: nextDone }).eq("id", s.id);
  };

  const deleteSubtask = async (id: string) => {
    setSubtasks((c) => c.filter((x) => x.id !== id));
    await supabase.from("subtasks").delete().eq("id", id);
  };

  const startEditSubtask = (s: Subtask) => {
    setEditingSubtaskId(s.id);
    setSubtaskDraft(s.title);
  };

  const saveSubtaskTitle = async () => {
    const id = editingSubtaskId;
    if (!id) return;
    const next = subtaskDraft.trim();
    setEditingSubtaskId(null);
    if (!next) return;
    setSubtasks((c) => c.map((x) => (x.id === id ? { ...x, title: next } : x)));
    const { error } = await supabase.from("subtasks").update({ title: next }).eq("id", id);
    if (error) toast.error(error.message);
  };

  const [subDueReason, setSubDueReason] = useState<{ open: boolean; subtask: Subtask | null; prev: string | null; next: string | null; reason: string }>({ open: false, subtask: null, prev: null, next: null, reason: "" });

  const applySubtaskDue = async (s: Subtask, nextIso: string | null, reason?: string) => {
    const prev = s.due_date;
    if (nextIso === prev) return;
    setSubtasks((c) => c.map((x) => (x.id === s.id ? { ...x, due_date: nextIso } : x)));
    const { error } = await supabase.from("subtasks").update({ due_date: nextIso }).eq("id", s.id);
    if (error) { toast.error(error.message); return; }
    if (user) {
      await supabase.from("subtask_due_date_changes").insert({
        subtask_id: s.id, old_due_date: prev, new_due_date: nextIso,
        reason: reason?.trim() || null, user_id: user.id,
      });
    }
  };

  const updateSubtaskDue = async (s: Subtask, isoOrEmpty: string) => {
    const next = isoOrEmpty ? new Date(isoOrEmpty).toISOString() : null;
    if (next === s.due_date) return;
    // Se já existia um prazo, pergunta o motivo (opcional)
    if (s.due_date) {
      setSubDueReason({ open: true, subtask: s, prev: s.due_date, next, reason: "" });
      return;
    }
    await applySubtaskDue(s, next);
  };

  const updateSubtaskAssignee = async (s: Subtask, value: string) => {
    const next = value === "none" ? null : value;
    if (next === s.assignee_id) return;
    setSubtasks((c) => c.map((x) => (x.id === s.id ? { ...x, assignee_id: next } : x)));
    const { error } = await supabase.from("subtasks").update({ assignee_id: next }).eq("id", s.id);
    if (error) toast.error(error.message);
  };


  const moveSubtaskInScope = async (id: string, dir: -1 | 1, commentId: string | null) => {
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
      reindexed.map((s) => supabase.from("subtasks").update({ position: s.position }).eq("id", s.id)),
    );
  };

  const startEditCommentBody = (c: CardComment) => {
    setEditingCommentId(c.id);
    setCommentDraft(c.body);
    setOpenComments((cur) => ({ ...cur, [c.id]: true }));
  };

  const saveCommentBody = async () => {
    const id = editingCommentId;
    if (!id) return;
    const next = commentDraft;
    setEditingCommentId(null);
    setComments((cs) => cs.map((x) => (x.id === id ? { ...x, body: next } : x)));
    const { error } = await supabase.from("comments").update({ body: next }).eq("id", id);
    if (error) toast.error(error.message);
  };

  const renameComment = async (c: CardComment) => {
    const current = c.title ?? "";
    const next = window.prompt("Renomear seção", current)?.trim();
    if (next === undefined) return;
    const value = next || null;
    setComments((cs) => cs.map((x) => (x.id === c.id ? { ...x, title: value } : x)));
    const { error } = await supabase.from("comments").update({ title: value }).eq("id", c.id);
    if (error) toast.error(error.message);
  };

  const deleteComment = async (id: string) => {
    setComments((cs) => cs.filter((x) => x.id !== id));
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) toast.error(error.message);
  };

  const moveComment = async (id: string, dir: -1 | 1) => {
    const idx = comments.findIndex((c) => c.id === id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= comments.length) return;
    const next = [...comments];
    [next[idx], next[target]] = [next[target], next[idx]];
    const reindexed = next.map((c, i) => ({ ...c, position: i }));
    setComments(reindexed);
    await Promise.all(
      reindexed.map((c) => supabase.from("comments").update({ position: c.position }).eq("id", c.id)),
    );
  };


  const completedStatus = useMemo(() => statuses.find((s) => s.is_completed) ?? null, [statuses]);

  const completeTask = async () => {
    await update({
      status: "done",
      status_id: completedStatus?.id ?? task.status_id,
      completed_at: new Date().toISOString(),
    });
    toast.success("Tarefa concluída");
  };

  const openDueChange = ({ dueDate: nextIso, dueTime }: { dueDate: string | null; dueTime: string | null }) => {
    const oldIso = task.due_date ?? null;
    if (oldIso === nextIso && (task.due_time ?? null) === dueTime) return;
    setDueChange({ open: true, pending: nextIso, pendingTime: dueTime, reason: "" });
  };

  const confirmDueChange = async (skipReason = false) => {
    const nextIso = dueChange.pending;
    const oldIso = task.due_date ?? null;
    setDueChange({ open: false, pending: null, pendingTime: null, reason: "" });
    // registra histórico (só quando havia algum prazo antes ou passa a ter)
    if (user && (oldIso || nextIso)) {
      await supabase.from("task_due_date_changes").insert({
        task_id: task.id,
        user_id: user.id,
        old_due_date: oldIso,
        new_due_date: nextIso,
        reason: skipReason ? null : (dueChange.reason.trim() || null),
      });
      void qc.invalidateQueries({ queryKey: ["task_due_date_changes", task.id] });
    }
    await update({ due_date: nextIso, due_time: dueChange.pendingTime });
  };


  if (minimal) {
    return (
      <div {...dragHandleProps} className="group flex min-h-[132px] w-full cursor-grab touch-none flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing" title={task.title || "Sem título"}>
        <div className="flex min-h-7 items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider" style={client?.color ? { background: client.color, color: clientText } : undefined}>
          <Users className="h-3 w-3 shrink-0" />
          <span className="truncate">{client?.name || "Sem cliente"}</span>
        </div>
        <button type="button" onPointerDown={stop} onClick={(event) => { stop(event); onEdit?.(); }} className="min-h-0 flex-1 px-2 py-1.5 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary">
          {task.title || <span className="text-muted-foreground">Sem título</span>}
        </button>
        <div className="flex items-center gap-1 border-t px-1.5 py-1">
          <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0 text-success" onPointerDown={stop} onClick={(event) => { stop(event); void completeTask(); }} title="Concluir tarefa" aria-label="Concluir tarefa"><CheckCircle2 className="h-4 w-4" /></Button>
          <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" onPointerDown={stop} onClick={(event) => { stop(event); onDuplicate?.(); }} title="Duplicar tarefa" aria-label="Duplicar tarefa"><Copy className="h-3.5 w-3.5" /></Button>
          {taskPeople.length > 0 ? <div className="ml-0.5 flex min-w-0 flex-1 -space-x-1.5" title="Responsável e colaboradores">{taskPeople.slice(0, 3).map((person) => { const name = person.full_name || person.email || "Usuário"; return <Avatar key={person.id} className="h-6 w-6 border-2 border-card text-[8px]" title={name}><AvatarImage src={person.avatar_url || undefined} alt={name} /><AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>; })}{taskPeople.length > 3 ? <span className="ml-1 self-center text-[10px] text-muted-foreground">+{taskPeople.length - 3}</span> : null}</div> : <span className="flex-1" />}
          <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0" onPointerDown={stop} onClick={(event) => { stop(event); onEdit?.(); }} title="Editar tarefa" aria-label="Editar tarefa"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
        </div>
        <div className={cn("flex items-center gap-1 border-t px-2 py-1 text-[11px]", dueChipClass)}>
          {dueHasTime ? <Clock3 className="h-3 w-3 shrink-0" /> : <CalendarIcon className="h-3 w-3 shrink-0" />}
          <span className="truncate">{dueLabel ? `Prazo: ${dueLabel}` : "Sem prazo"}</span>
        </div>
      </div>
    );
  }  return (
    <>
      <div
        {...dragHandleProps}
        className={cn(
          "group relative flex min-h-[460px] w-full cursor-grab touch-none flex-col overflow-visible rounded-lg border bg-card shadow-sm transition hover:border-primary/40 hover:shadow active:cursor-grabbing",
        )}
      >
        {/* Client color strip at top */}
        {client?.color ? (
          <div
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
              "rounded-t-lg",
            )}
            style={{ background: client.color, color: clientText }}
          >
            <Users className="h-3 w-3" />
            <span className="truncate">{client.name}</span>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-visible p-2">
          <div className="flex flex-col gap-1.5">
        {/* Tags — multiple, click chip to manage */}
        {isVisible("tags") ? (
        <div className="mb-2 -mx-1" style={{ order: orderOf("tags") }}>
          <ChipPopover
            value={
              selectedTags.length > 0 ? (
                <span className="flex flex-wrap items-center gap-1">
                  {selectedTags.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm"
                      style={{
                        background: t.color,
                        color: readableText(t.color),
                        boxShadow: `0 2px 8px -2px ${t.color}80`,
                      }}
                    >
                      {t.name}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 rounded-md border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">
                    <Plus className="h-2.5 w-2.5" />
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">
                  <TagIcon className="h-2.5 w-2.5" /> Adicionar etiquetas
                </span>
              )
            }
            render={() => (
              <PopoverField label="Etiquetas">
                <div className="max-h-56 space-y-0.5 overflow-y-auto">
                  {tags.length === 0 ? (
                    <p className="px-1 py-1 text-[11px] text-muted-foreground">Nenhuma etiqueta criada</p>
                  ) : tags.map((t) => {
                    const checked = tagIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => void toggleTag(t.id)}
                        className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"
                      >
                        <span className={cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40")}>
                          {checked ? <Check className="h-3 w-3" /> : null}
                        </span>
                        <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                        <span className="truncate">{t.name}</span>
                      </button>
                    );
                  })}
                </div>
              </PopoverField>
            )}
          />
        </div>
        ) : null}

        {/* Title row */}
        <div className="mb-1 flex items-start justify-between gap-1" style={{ order: -1 }}>
          {titleEditing ? (
            <Textarea
              value={titleDraft}
              autoFocus
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={() => void saveTitle()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void saveTitle();
                }
                if (e.key === "Escape") {
                  setTitleDraft(task.title);
                  setTitleEditing(false);
                }
              }}
              onPointerDown={stop}
              onClick={stop}
              className="min-h-[28px] resize-none border-none bg-transparent p-0 text-sm font-medium leading-snug shadow-none focus-visible:ring-0 md:text-sm"
            />
          ) : (
            <button
              type="button"
              onPointerDown={stop}
              onClick={(e) => {
                stop(e);
                setTitleEditing(true);
              }}
              className="min-w-0 flex-1 text-left text-sm font-medium leading-snug [overflow-wrap:anywhere] hover:text-primary"
            >
              {task.title || <span className="text-muted-foreground">Sem título</span>}
            </button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 shrink-0 text-success opacity-0 transition group-hover:opacity-100"
            onPointerDown={stop}
            onClick={(e) => { stop(e); void completeTask(); }}
            title="Concluir tarefa"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100"
            onPointerDown={stop}
            onClick={(e) => { stop(e); onDuplicate?.(); }}
            title="Duplicar tarefa"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          {false && <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hidden"
                onPointerDown={stop}
                onClick={stop}
                title="Largura do card"
              >
                {null}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-56 p-2"
              align="end"
              onPointerDown={stop}
              onClick={stop}
            >
              <div className="mb-1.5 px-1 text-xs font-semibold">Largura do card</div>
              <div className="grid grid-cols-2 gap-1">
                {(
                  [
                    { label: "Padrão", value: null },
                    { label: "Médio", value: 360 },
                    { label: "Grande", value: 480 },
                    { label: "Extra", value: 640 },
                  ]
                ).map((p) => {
                  const active = (task.card_width ?? null) === p.value;
                  return (
                    <Button
                      key={p.label}
                      size="sm"
                      variant={active ? "default" : "outline"}
                      className="h-8 text-[11px]"
                      onClick={() => void update({ card_width: p.value })}
                    >
                      {p.label}
                    </Button>
                  );
                })}
              </div>

            </PopoverContent>
          </Popover>}
          {taskPeople.length > 0 ? (
            <div className="flex -space-x-1.5" title="Responsável e colaboradores">
              {taskPeople.slice(0, 4).map((person) => {
                const name = person.full_name || person.email || "Usuário";
                return (
                  <Avatar key={person.id} className="h-6 w-6 border-2 border-card text-[8px]" title={name}>
                    <AvatarImage src={person.avatar_url || undefined} alt={name} />
                    <AvatarFallback>
                      {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
              {taskPeople.length > 4 ? (
                <span className="ml-1 self-center text-[10px] text-muted-foreground">+{taskPeople.length - 4}</span>
              ) : null}
            </div>
          ) : null}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100"
            onPointerDown={stop}
            onClick={(e) => {
              stop(e);
              onEdit?.();
            }}
            title="Editar tarefa"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Description — inline editable */}
        {isVisible("description") ? (
        <div style={{ order: orderOf("description") }}>
        {descEditing ? (
          <>
            <Textarea
              value={descDraft}
              autoFocus
              ref={(el) => {
                descTextareaRef.current = el;
                if (el) {
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
              onChange={(e) => {
                setDescDraft(e.target.value);
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${el.scrollHeight}px`;
              }}
              onBlur={() => void saveDesc()}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void saveDesc();
                }
                if (e.key === "Escape") {
                  setDescDraft(task.description ?? "");
                  setDescEditing(false);
                }
              }}
              onPointerDown={stop}
              onClick={stop}
              placeholder="Observações..."
              className="mb-2 min-h-[40px] resize-none overflow-hidden whitespace-pre-wrap border-none bg-transparent p-0 text-sm leading-snug text-foreground shadow-none focus-visible:ring-0 md:text-sm"
            />
          </>
        ) : task.description ? (
          <div className="mb-2">
            <div
              onPointerDown={stop}
              onClick={(e) => { stop(e); setDescEditing(true); }}
              className="cursor-text whitespace-pre-wrap rounded text-sm leading-snug text-muted-foreground [overflow-wrap:anywhere] hover:bg-muted/40"
              style={{
                maxHeight: descriptionExpanded
                  ? "min(18rem, max(8rem, calc(100vh - 22rem)))"
                  : "7.5rem",
                overflowY: descriptionExpanded ? "auto" : "hidden",
              }}
            >
              <RichTextView html={task.description} className="text-sm text-muted-foreground" />
            </div>
            {task.description.length > DESCRIPTION_COLLAPSED_LIMIT ? (
              <button
                type="button"
                onPointerDown={stop}
                onClick={(e) => { stop(e); setDescriptionExpanded((expanded) => !expanded); }}
                className="mt-1 text-xs font-medium text-primary hover:underline"
              >
                {descriptionExpanded ? "Ver menos" : "Ver mais"}
              </button>
            ) : null}
          </div>
        ) : null}
        </div>
        ) : null}

        {/* Seções dobráveis de observações foram removidas — use o campo Observações acima. */}


        {/* Subtasks — collapsible com título editável */}
        {isVisible("subtasks") ? (() => {
        const rootSubs = subtasks.filter((s) => !s.comment_id);
        return (
        <div style={{ order: orderOf("subtasks") }}>
        {(rootSubs.length > 0 || addingSubtask) ? (
          <Collapsible
            open={subtasksOpen}
            onOpenChange={setSubtasksOpen}
            className="mb-2 rounded-md border bg-muted/20"
          >
            <div className="flex w-full items-center gap-0.5 pr-1 hover:bg-muted/40">
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  onPointerDown={stop}
                  onClick={stop}
                  className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5 text-left text-xs font-medium"
                >
                  {subtasksOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                  <ListChecks className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 truncate">{subtasksTitle}</span>
                  {rootSubs.length > 0 ? (
                    <span className="shrink-0 text-[10px] font-normal text-muted-foreground">
                      {rootSubs.filter((s) => s.done).length}/{rootSubs.length}
                    </span>
                  ) : null}
                </button>
              </CollapsibleTrigger>
              <button
                type="button"
                title="Renomear seção"
                onPointerDown={stop}
                onClick={(e) => { stop(e); renameSubtasksTitle(); }}
                className="rounded p-0.5 opacity-0 transition group-hover:opacity-100 hover:bg-muted"
              >
                <Pencil className="h-3 w-3" />
              </button>
            </div>
            <CollapsibleContent>
              <div className="space-y-0.5 border-t p-1.5">
                {rootSubs.map((s, sIdx) => {
                  const dueInfo = computeSubtaskDue(s.due_date, s.done);
                  return (
                  <div key={s.id} className={cn(
                    "group/sub rounded px-1 py-1 transition-colors",
                    s.done ? "bg-emerald-500/10 ring-1 ring-emerald-500/30 hover:bg-emerald-500/15" : "hover:bg-muted/40",
                  )}>
                    <div className="flex items-start gap-1">
                    <button
                      type="button"
                      onPointerDown={stop}
                      onClick={(e) => { stop(e); void toggleSubtask(s); }}
                      className={cn(
                        "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border",
                        s.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
                      )}
                    >
                      {s.done ? <Check className="h-2.5 w-2.5" /> : null}
                    </button>
                    {editingSubtaskId === s.id ? (
                      <div className="min-w-0 flex-1">
                        <RichTextEditor
                          value={subtaskDraft}
                          onChange={setSubtaskDraft}
                          onBlur={() => void saveSubtaskTitle()}
                          onSubmit={() => void saveSubtaskTitle()}
                          autoFocus
                          placeholder="Escreva… (Enter para salvar)"
                          minHeight={40}
                        />
                      </div>
                    ) : (
                      <div
                        onPointerDown={stop}
                        onClick={(e) => { stop(e); startEditSubtask(s); }}
                        className={cn("min-w-0 flex-1 cursor-text break-words text-left hover:text-primary", s.done && "text-muted-foreground line-through")}
                      >
                        <RichTextView html={s.title} />
                      </div>
                    )}
                    <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition group-hover/sub:opacity-100">
                      <button
                        type="button"
                        title="Mover para cima"
                        disabled={sIdx === 0}
                        onPointerDown={stop}
                        onClick={(e) => { stop(e); void moveSubtaskInScope(s.id, -1, null); }}
                        className="rounded p-0.5 hover:bg-muted disabled:opacity-30"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        title="Mover para baixo"
                        disabled={sIdx === rootSubs.length - 1}
                        onPointerDown={stop}
                        onClick={(e) => { stop(e); void moveSubtaskInScope(s.id, 1, null); }}
                        className="rounded p-0.5 hover:bg-muted disabled:opacity-30"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        title="Renomear"
                        onPointerDown={stop}
                        onClick={(e) => { stop(e); startEditSubtask(s); }}
                        className="rounded p-0.5 hover:bg-muted"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      {canDeleteSubtask(s) && (
                        <button
                          type="button"
                          onPointerDown={stop}
                          onClick={(e) => { stop(e); void deleteSubtask(s.id); }}
                          title="Remover"
                          className="rounded p-0.5 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1 pl-5">
                      {s.done && s.completed_at ? (
                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium leading-none text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300"
                          title={format(new Date(s.completed_at), "PPPp", { locale: ptBR })}
                        >
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {format(new Date(s.completed_at), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      ) : null}
                      <SubtaskDuePopover
                        dueIso={s.due_date}
                        dueInfo={dueInfo}
                        onApply={(iso) => void updateSubtaskDue(s, iso)}
                        onClear={() => void updateSubtaskDue(s, "")}
                      />
                      <SubtaskAssigneePopover
                        profiles={profiles}
                        value={s.assignee_id}
                        onChange={(v) => void updateSubtaskAssignee(s, v)}
                      />

                    </div>
                  </div>
                  );
                })}
                {addingSubtask ? (
                  <div className="flex items-start gap-1.5 px-1">
                    <span className="mt-1 h-3.5 w-3.5 shrink-0 rounded border border-muted-foreground/40" />
                    <Textarea
                      value={newSubtask}
                      autoFocus
                      ref={(el) => { if (el) { el.style.height = "auto"; el.style.height = `${el.scrollHeight}px`; } }}
                      onChange={(e) => {
                        setNewSubtask(e.target.value);
                        const el = e.currentTarget;
                        el.style.height = "auto";
                        el.style.height = `${el.scrollHeight}px`;
                      }}
                      onBlur={() => void addSubtask()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void addSubtask(); }
                        if (e.key === "Escape") { setNewSubtask(""); setAddingSubtask(false); }
                      }}
                      onPointerDown={stop}
                      onClick={stop}
                      placeholder="Nova subtarefa (Enter para salvar)"
                      className="min-h-[24px] flex-1 resize-none overflow-hidden whitespace-pre-wrap border-none bg-transparent p-0 text-xs leading-snug shadow-none focus-visible:ring-0"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onPointerDown={stop}
                    onClick={(e) => { stop(e); setAddingSubtask(true); }}
                    className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Adicionar subtarefa</span>
                  </button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <button
            type="button"
            onPointerDown={stop}
            onClick={(e) => { stop(e); setAddingSubtask(true); setSubtasksOpen(true); }}
            className="mb-2 flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"
          >
            <Plus className="h-3 w-3" />
            <span>Adicionar subtarefa</span>
          </button>
        )}
        </div>
        );
        })() : null}

        {/* Attachment thumbnails grid */}
        {isVisible("attachments") && attachments.length > 0 ? (
          <div className="mb-2 grid grid-cols-3 gap-1" style={{ order: orderOf("attachments") }}>
            {attachments.slice(0, 6).map((a) => {
              const isLink = a.mime_type === LINK_MIME;
              const isImage = !isLink && a.mime_type?.startsWith("image/");
              return (
                <div key={a.id} className="group/att relative aspect-square overflow-hidden rounded border bg-muted">
                  {isImage && thumbs[a.id] ? (
                    <button
                      type="button"
                      onPointerDown={stop}
                      onClick={(e) => { stop(e); openAttachment(a); }}
                      className="block h-full w-full"
                    >
                      <img src={thumbs[a.id]} alt={a.file_name} className="h-full w-full object-cover" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onPointerDown={stop}
                      onClick={(e) => { stop(e); openAttachment(a); }}
                      className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground"
                      title={a.file_name}
                    >
                      {isLink ? <Link2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      <span className="line-clamp-1 w-full break-all text-center text-[8px] leading-tight">
                        {a.file_name}
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onPointerDown={stop}
                    onClick={(e) => { stop(e); void deleteAttachment(a); }}
                    className="absolute right-0.5 top-0.5 rounded-full bg-background/80 p-0.5 opacity-0 transition group-hover/att:opacity-100"
                    title="Remover"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              );
            })}
            {attachments.length > 6 ? (
              <button
                type="button"
                onPointerDown={stop}
                onClick={(e) => { stop(e); onEdit?.(); }}
                className="flex aspect-square items-center justify-center rounded border bg-muted text-[10px] font-medium text-muted-foreground hover:bg-muted/60"
              >
                +{attachments.length - 6}
              </button>
            ) : null}
          </div>
        ) : null}

        {/* Interruptions */}
        {isVisible("interruptions") ? (
          <div style={{ order: orderOf("interruptions") }}>
            <InterruptionsBlock task={task} color={interruptionColor} />
          </div>
        ) : null}

        {/* Prioridade — bloco próprio */}
        {isVisible("priority") ? (
          <div className="flex flex-wrap items-center gap-1" style={{ order: orderOf("priority") }}>
            <ChipPopover
              value={
                priority ? (
                  <span
                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium"
                    style={{ background: `${priority.color}22`, color: priority.color }}
                  >
                    <Flag className="h-2.5 w-2.5" />
                    {priority.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded border border-dashed px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted">
                    <Flag className="h-2.5 w-2.5" />
                    Definir prioridade
                  </span>
                )
              }
              render={(close) => (
                <PopoverField label="Prioridade">
                  <Select value={task.priority ?? "none"} onValueChange={(v) => { void update({ priority: v === "none" ? null : (v as Task["priority"]) }); close(); }}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem prioridade</SelectItem>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </PopoverField>
              )}
            />
          </div>
        ) : null}

        <Collapsible
          open={collaboratorsOpen}
          onOpenChange={setCollaboratorsOpen}
          className="rounded-md border"
          style={{ order: orderOf("priority") + 1 }}
        >
          <CollapsibleTrigger asChild>
            <button
              type="button"
              onPointerDown={stop}
              className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/60"
            >
              <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", collaboratorsOpen && "rotate-90")} />
              <Users className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">Colaboradores</span>
              <span className="ml-auto text-[10px]">
                {taskCollaborators.length === 0 ? "Nenhum" : taskCollaborators.length}
              </span>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t p-1.5">
            <div className="max-h-56 space-y-0.5 overflow-y-auto">
              {profiles.filter((profile) => profile.is_active !== false).map((profile) => {
                const checked = taskCollaborators.some((collaborator) => collaborator.id === profile.id);
                return (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => void toggleCollaborator(profile.id)}
                    className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-xs hover:bg-muted"
                  >
                    <span className={cn("flex h-4 w-4 items-center justify-center rounded border", checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40")}>
                      {checked ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span className="truncate">{profile.full_name || profile.email || "Usuário sem nome"}</span>
                  </button>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Prazo — bloco próprio */}
        {isVisible("due") ? (
          <div className="flex flex-wrap items-center gap-1" style={{ order: orderOf("due") }}>
            <ChipPopover
              value={
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs shadow-sm",
                    dueChipClass,
                  )}
                  title={dueMeta.label}
                >
                  {dueHasTime ? <Clock3 className="h-3.5 w-3.5" /> : <CalendarIcon className="h-3.5 w-3.5" />}
                  <span className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium opacity-90">{dueMeta.label}</span>
                    <span className="font-semibold">{dueMeta.subtext}</span>
                  </span>
                </span>
              }
              render={(close) => (
                <DueDateEditor
                  task={task}
                  onChange={(v) => { openDueChange(v); close(); }}
                />
              )}
            />
            {dueLabel ? (
              <button
                type="button"
                onPointerDown={stop}
                onClick={(e) => { stop(e); setHistoryOpen(true); }}
                title="Histórico de mudanças de prazo"
                className="inline-flex items-center rounded-sm border border-dashed px-1 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <History className="h-3 w-3" />
              </button>
            ) : null}
          </div>
        ) : null}

        {/* Data de criação — bloco próprio */}
        {isVisible("createdAt") ? (
          <div className="flex flex-wrap items-center gap-1" style={{ order: orderOf("createdAt") }}>
            <ChipPopover
              value={
                <span
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted"
                  title={`Criada em ${format(new Date(task.created_at), "dd/MM/yyyy", { locale: ptBR })}`}
                >
                  <CalendarIcon className="h-2.5 w-2.5" />
                  Criada · {format(new Date(task.created_at), "dd MMM", { locale: ptBR })}
                </span>
              }
              render={(close) => (
                <CreatedAtEditor
                  value={task.created_at}
                  onChange={(v) => { void update({ created_at: v } as Partial<Task>); close(); }}
                />
              )}
            />
          </div>
        ) : null}

        {task.completed_at ? (
          <div className="flex flex-wrap items-center gap-1" style={{ order: orderOf("createdAt") + 0.1 }}>
            <span
              className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-300"
              title={`Concluída em ${format(new Date(task.completed_at), "dd/MM/yyyy", { locale: ptBR })}`}
            >
              <CheckCircle2 className="h-2.5 w-2.5" />
              Concluída · {format(new Date(task.completed_at), "dd MMM", { locale: ptBR })}
            </span>
          </div>
        ) : null}

        <div className="mt-1 space-y-0.5" style={{ order: orderOf("meta") }}>
          <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground">
            <UserIcon className="h-3 w-3 shrink-0" />
            <span className="truncate">Criada por: {creator?.full_name || creator?.email || "Usuário não identificado"}</span>
          </div>
          {task.assignee_id && task.assigned_by ? (
            <div className="flex items-center gap-1.5 px-1 py-0.5 text-[11px] text-muted-foreground">
              <Users className="h-3 w-3 shrink-0" />
              <span className="truncate">Atribuída por: {assigner?.full_name || assigner?.email || "Usuário não identificado"}</span>
            </div>
          ) : null}
        </div>

        {/* Meta rows (empty fields) */}
        {isVisible("meta") ? (
        <div className="mt-1 space-y-0.5" style={{ order: orderOf("meta") }}>
          <CompactRow
            icon={<UserIcon className="h-3 w-3" />}
            empty={!assignee}
            label={assignee ? (assignee.full_name || assignee.email || "Sem nome") : "Adicionar responsável"}
            render={(close) => (
              <PopoverField label="Responsável">
                <Select value={task.assignee_id ?? "none"} onValueChange={(v) => { void update({ assignee_id: v === "none" ? null : v }); close(); }}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem responsável</SelectItem>
                    {profiles.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </PopoverField>
            )}
          />

          {!client ? (
            <CompactRow
              icon={<Users className="h-3 w-3" />}
              empty
              label="Adicionar cliente"
              render={(close) => (
                <PopoverField label="Cliente">
                  <Select value={task.client_id ?? "none"} onValueChange={(v) => { void update({ client_id: v === "none" ? null : v }); close(); }}>
                    <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhum</SelectItem>
                      {clients.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </PopoverField>
              )}
            />
          ) : null}

          {!dueLabel ? (
            <CompactRow
              icon={<CalendarIcon className="h-3 w-3" />}
              empty
              label="Adicionar prazo"
              render={(close) => (
                <DueDateEditor task={task} onChange={(v) => { openDueChange(v); close(); }} />
              )}
            />
          ) : null}

          {!task.description ? (
            <button
              type="button"
              onPointerDown={stop}
              onClick={(e) => { stop(e); setDescEditing(true); }}
              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"
            >
              <AlignLeft className="h-3 w-3" />
              <span>Adicionar observação</span>
            </button>
          ) : null}

          {subtasks.filter((s) => !s.comment_id).length === 0 && !addingSubtask ? (
            <button
              type="button"
              onPointerDown={stop}
              onClick={(e) => { stop(e); setAddingSubtask(true); }}
              className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"
            >
              <ListChecks className="h-3 w-3" />
              <span>Adicionar subtarefa</span>
            </button>
          ) : null}


          {/* Upload button */}
          <button
            type="button"
            onPointerDown={stop}
            onClick={(e) => { stop(e); fileRef.current?.click(); }}
            className="flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] text-muted-foreground/70 hover:bg-muted hover:text-foreground"
          >
            <Upload className="h-3 w-3" />
            <span>Adicionar arquivo</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadFile(f);
              e.target.value = "";
            }}
          />
        </div>
        ) : null}
          </div>
        </div>
      </div>

      <AttachmentPreviewDialog
        open={!!previewAttachment}
        onOpenChange={(o) => { if (!o) setPreviewAttachment(null); }}
        attachment={previewAttachment}
      />

      {/* Diálogo de justificativa ao mudar prazo */}
      <Dialog open={dueChange.open} onOpenChange={(o) => { if (!o) setDueChange({ open: false, pending: null, pendingTime: null, reason: "" }); }}>
        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm">Justificar mudança de prazo</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-xs">
            <div className="rounded border bg-muted/50 p-2">
              <p><strong>Prazo anterior:</strong> {task.due_date ? format(new Date(task.due_date), "dd/MM/yyyy", { locale: ptBR }) : "—"}</p>
              <p><strong>Novo prazo:</strong> {dueChange.pending ? format(new Date(dueChange.pending), "dd/MM/yyyy", { locale: ptBR }) : "—"}</p>
            </div>
            <Textarea
              autoFocus
              value={dueChange.reason}
              onChange={(e) => setDueChange((c) => ({ ...c, reason: e.target.value }))}
              placeholder="Motivo da mudança (opcional)"
              className="min-h-[80px] text-sm"
            />
            <p className="text-[10px] text-muted-foreground">Se não justificar, a mudança será registrada sem motivo.</p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDueChange({ open: false, pending: null, pendingTime: null, reason: "" })}>Cancelar</Button>
            <Button variant="outline" size="sm" onClick={() => void confirmDueChange(true)}>Mudar sem justificar</Button>
            <Button size="sm" onClick={() => void confirmDueChange(false)}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Justificativa mudança prazo subtarefa */}
      <Dialog open={subDueReason.open} onOpenChange={(o) => { if (!o) setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" }); }}>
        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm">Mudança de prazo da subtarefa</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-xs">
            <div className="rounded border bg-muted/50 p-2">
              <p><strong>Subtarefa:</strong> <span dangerouslySetInnerHTML={{ __html: subDueReason.subtask?.title ?? "" }} /></p>
              <p><strong>Prazo anterior:</strong> {subDueReason.prev ? format(new Date(subDueReason.prev), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"}</p>
              <p><strong>Novo prazo:</strong> {subDueReason.next ? format(new Date(subDueReason.next), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"}</p>
            </div>
            <Textarea
              autoFocus
              value={subDueReason.reason}
              onChange={(e) => setSubDueReason((c) => ({ ...c, reason: e.target.value }))}
              placeholder="Motivo (opcional) — se preenchido aparece no relatório do cliente"
              className="min-h-[80px] text-sm"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" })}>Cancelar</Button>
            <Button variant="outline" size="sm" onClick={async () => {
              const st = subDueReason.subtask; if (!st) return;
              const nx = subDueReason.next;
              setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });
              await applySubtaskDue(st, nx);
            }}>Sem justificativa</Button>
            <Button size="sm" onClick={async () => {
              const st = subDueReason.subtask; if (!st) return;
              const nx = subDueReason.next; const r = subDueReason.reason;
              setSubDueReason({ open: false, subtask: null, prev: null, next: null, reason: "" });
              await applySubtaskDue(st, nx, r);
            }}>Salvar com motivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Histórico de mudanças de prazo */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent onPointerDown={stop} onClick={stop} className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <History className="h-4 w-4" />
              Histórico de prazos
            </DialogTitle>
          </DialogHeader>
          {dueHistory.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">Nenhuma mudança de prazo registrada.</p>
          ) : (
            <ul className="max-h-[60vh] space-y-2 overflow-y-auto">
              {dueHistory.map((h) => (
                <li key={h.id} className="rounded border p-2 text-xs">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{format(new Date(h.created_at), "dd/MM/yyyy", { locale: ptBR })}</span>
                    {h.user_id ? <span>por {profiles.find((p) => p.id === h.user_id)?.full_name ?? "usuário"}</span> : null}
                  </div>
                  <p>
                    <span className="text-muted-foreground">De:</span>{" "}
                    <strong>{h.old_due_date ? format(new Date(h.old_due_date), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"}</strong>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Para:</span>{" "}
                    <strong>{h.new_due_date ? format(new Date(h.new_due_date), "dd/MM/yyyy", { locale: ptBR }) : "sem prazo"}</strong>
                  </p>
                  <p className="mt-1">
                    <span className="text-muted-foreground">Motivo: </span>
                    {h.reason ? <span>{h.reason}</span> : <em className="text-muted-foreground">não justificado</em>}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function statusLabel(s: Task["status"]) {
  if (!s) return "Sem status";
  return { todo: "A fazer", in_progress: "Em andamento", review: "Em revisão", done: "Concluída" }[s];
}

function ChipPopover({
  value,
  render,
}: {
  value: React.ReactNode;
  render: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerDown={stop}
          onClick={stop}
          className="inline-flex items-center"
        >
          {value}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" onPointerDown={stop} onClick={stop}>
        {render(() => setOpen(false))}
      </PopoverContent>
    </Popover>
  );
}

function CompactRow({
  icon,
  label,
  empty,
  render,
}: {
  icon: React.ReactNode;
  label: string;
  empty?: boolean;
  render: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerDown={stop}
          onClick={stop}
          className={cn(
            "flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left text-[11px] hover:bg-muted",
            empty ? "text-muted-foreground/70" : "text-foreground",
          )}
        >
          <span className="text-muted-foreground">{icon}</span>
          <span className="truncate">{label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" onPointerDown={stop} onClick={stop}>
        {render(() => setOpen(false))}
      </PopoverContent>
    </Popover>
  );
}

function PopoverField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function SubtaskAssigneePopover({
  profiles,
  value,
  onChange,
}: {
  profiles: Profile[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = profiles.find((p) => p.id === value) ?? null;
  const label = current ? (current.full_name || current.email || "Responsável") : "Atribuir";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setOpen(true); }}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-none ring-1 transition",
            current
              ? "bg-primary/10 text-primary ring-primary/30 hover:bg-primary/15"
              : "bg-muted text-muted-foreground ring-border hover:bg-muted/70",
          )}
          title={current ? `Responsável: ${label}` : "Atribuir responsável"}
        >
          <UserIcon className="h-2.5 w-2.5" />
          <span className="max-w-[100px] truncate">{label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 p-1"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => { onChange("none"); setOpen(false); }}
          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-[10px]">—</span>
          Ninguém
        </button>
        <div className="my-1 h-px bg-border" />
        <div className="max-h-56 overflow-y-auto">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => { onChange(p.id); setOpen(false); }}
              className={cn(
                "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-muted",
                value === p.id && "bg-primary/10 text-primary",
              )}
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={p.avatar_url || undefined} alt={p.full_name || p.email || "Usuário"} />
                <AvatarFallback className="text-[9px]">
                  {(p.full_name || p.email || "?").slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1 truncate">{p.full_name || p.email}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SubtaskDuePopover({
  dueIso,
  dueInfo,
  onApply,
  onClear,
}: {
  dueIso: string | null;
  dueInfo: { label: string; cls: string };
  onApply: (iso: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    if (!open) return;
    setDateStr(dueIso ? format(new Date(dueIso), "yyyy-MM-dd") : "");
  }, [open, dueIso]);

  const save = () => {
    if (!dateStr) { onClear(); setOpen(false); return; }
    onApply(new Date(`${dateStr}T12:00:00`).toISOString());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onPointerDown={stop}
          onClick={stop}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none transition hover:opacity-90",
            dueInfo.cls,
          )}
          title="Editar prazo"
        >
          <CalendarIcon className="h-2.5 w-2.5" />
          <span>{dueInfo.label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" onPointerDown={stop} onClick={stop}>
        <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Prazo da subtarefa</Label>
        <div className="mt-1 flex gap-1">
          <Input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="h-8 flex-1 text-xs"
          />
        </div>
        <div className="mt-2 flex gap-1">
          <Button type="button" size="sm" onClick={save} className="h-7 flex-1 text-xs">
            Salvar
          </Button>
          {dueIso ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
              className="h-7 text-xs text-muted-foreground"
            >
              Indefinido
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DueDateEditor({ task, onChange }: { task: Task; onChange: (v: { dueDate: string | null; dueTime: string | null }) => void }) {
  const [dateStr, setDateStr] = useState(task.due_date ? format(new Date(task.due_date), "yyyy-MM-dd") : "");
  const [timeStr, setTimeStr] = useState(formatDueTime(task.due_time) ?? "");
  const commit = () => onChange({
    dueDate: dateStr ? new Date(`${dateStr}T${DEFAULT_DEADLINE_TIME}:00`).toISOString() : null,
    dueTime: dateStr ? timeStr || null : null,
  });

  return (
    <PopoverField label="Prazo">
      <div className="space-y-2">
        <Input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="h-8 text-xs" />
        <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1">
          <Clock3 className="h-3.5 w-3.5 text-primary" />
          <Input type="time" step="300" value={timeStr} onChange={(e) => setTimeStr(e.target.value)} className="h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0" aria-label="Hora do prazo (opcional)" />
          <span className="text-[10px] text-muted-foreground">Opcional</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => { setDateStr(""); setTimeStr(""); onChange({ dueDate: null, dueTime: null }); }}>Limpar</Button>
          <Button size="sm" className="h-7 text-xs" onClick={commit}>Salvar</Button>
        </div>
      </div>
    </PopoverField>
  );
}

function CreatedAtEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [v, setV] = useState(format(new Date(value), "yyyy-MM-dd"));
  return (
    <PopoverField label="Data de criação">
      <div className="space-y-2">
        <Input type="date" value={v} onChange={(e) => setV(e.target.value)} className="h-8 text-xs" />
        <div className="flex justify-end">
          <Button size="sm" className="h-7 text-xs" onClick={() => { if (v) onChange(new Date(`${v}T12:00:00`).toISOString()); }}>
            Salvar
          </Button>
        </div>
      </div>
    </PopoverField>
  );
}

function DescriptionEditor({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {
  const [v, setV] = useState(initial);
  return (
    <div className="space-y-2">
      <Textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Observações..."
        className="min-h-[120px] text-xs"
        autoFocus
      />
      <div className="flex justify-end">
        <Button size="sm" className="h-7 text-xs" onClick={() => onSave(v)}>Salvar</Button>
      </div>
    </div>
  );
}
