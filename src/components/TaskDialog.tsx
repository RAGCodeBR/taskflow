import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/use-auth";
import { useClients, useColumns, useProfiles, type Task } from "@/hooks/use-data";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Paperclip, Send, Download, ExternalLink, X, Plus, Link2, ChevronDown, ChevronRight, Clock3 } from "lucide-react";
import { format } from "date-fns";
import { AttachmentPreviewDialog } from "@/components/AttachmentPreviewDialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RichTextEditor } from "@/components/RichTextEditor";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  task?: Task | null;
  defaultColumnId?: string | null;
}

interface Subtask { id: string; title: string; done: boolean; position: number; due_date: string | null; assignee_id: string | null; notes: string | null; }
interface SubtaskAttachment { id: string; subtask_id: string; file_name: string; storage_path: string; mime_type: string | null; size_bytes: number | null; }
interface SubtaskDueChange { id: string; subtask_id: string; old_due_date: string | null; new_due_date: string | null; reason: string | null; created_at: string; }
interface Comment { id: string; title: string | null; body: string; author_id: string; created_at: string; }

const DEFAULT_DEADLINE_TIME = "12:00";
const deadlineToIso = (date: string) =>
  date ? new Date(`${date}T${DEFAULT_DEADLINE_TIME}:00`).toISOString() : null;
const normalizeDueTime = (time: string | null) => time?.slice(0, 5) ?? "";
interface Attachment { id: string; file_name: string; storage_path: string; mime_type: string | null; size_bytes: number | null; }
const LINK_MIME = "text/uri-list";

export function TaskDialog({ open, onOpenChange, task, defaultColumnId }: Props) {
  const qc = useQueryClient();
  const { user, isAdmin } = useAuth();
  const { data: cols } = useColumns();
  const { data: clients } = useClients();
  const { data: profiles } = useProfiles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [columnId, setColumnId] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [collaboratorIds, setCollaboratorIds] = useState<string[]>([]);
  const [collaboratorPickerOpen, setCollaboratorPickerOpen] = useState(false);
  const [dueDate, setDueDate] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("");
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const currentTaskIdRef = useRef<string | null>(null);


  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [newSubtaskDue, setNewSubtaskDue] = useState("");
  const [newSubtaskAssignee, setNewSubtaskAssignee] = useState<string>("");

  const [subDueChanges, setSubDueChanges] = useState<Record<string, SubtaskDueChange[]>>({});
  const [subDueOpen, setSubDueOpen] = useState<Record<string, boolean>>({});
  const [subExpanded, setSubExpanded] = useState<Record<string, boolean>>({});
  const [subAttachments, setSubAttachments] = useState<Record<string, SubtaskAttachment[]>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentTitle, setNewCommentTitle] = useState("");
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [saving, setSaving] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const canDeleteTask = !!currentTaskId && (!!isAdmin || !task || task.created_by === user?.id);
  const canDeleteSubtask = (subtask: Subtask) =>
    !!isAdmin || subtask.assignee_id !== user?.id || task?.created_by === user?.id;

  // Recurrence (only used on create)
  const [recurrenceEnabled, setRecurrenceEnabled] = useState(false);
  const [recurrenceDays, setRecurrenceDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [recurrenceEnd, setRecurrenceEnd] = useState<string>("");
  const [recurrenceOffsets, setRecurrenceOffsets] = useState<Record<number, number>>({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
  });

  useEffect(() => {
    if (!open) return;
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
      setTitle(""); setDescription(""); setStatus("todo"); setPriority("medium");
      setColumnId(defaultColumnId ?? ""); setClientId(""); setAssigneeId(""); setCollaboratorIds([]); setDueDate(""); setDueTime("");
      currentTaskIdRef.current = null;
      setCurrentTaskId(null);
      setSubtasks([]); setComments([]); setAttachments([]); setNewCommentTitle(""); setNewComment(""); setOpenComments({});
      setNewSubtask("");
      setNewSubtaskDue("");
      setNewSubtaskAssignee("");
      setRecurrenceEnabled(false);
      setRecurrenceDays([1, 2, 3, 4, 5]);
      setRecurrenceEnd("");
      setRecurrenceOffsets({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    }

  }, [open, task, defaultColumnId]);

  const loadRelated = async (taskId: string) => {
    const [s, c, a] = await Promise.all([
      supabase.from("subtasks").select("*").eq("task_id", taskId).order("position"),
      supabase.from("comments").select("*").eq("task_id", taskId).order("created_at"),
      supabase.from("attachments").select("*").eq("task_id", taskId).order("created_at"),
    ]);
    setSubtasks((s.data ?? []) as Subtask[]);
    setComments((c.data ?? []) as Comment[]);
    setAttachments((a.data ?? []) as Attachment[]);
  };

  const loadCollaborators = async (taskId: string) => {
    const { data, error } = await (supabase.from("task_collaborators") as any)
      .select("collaborator_id")
      .eq("task_id", taskId);
    if (error) {
      toast.error(error.message);
      return;
    }
    setCollaboratorIds((data ?? []).map((collaborator: { collaborator_id: string }) => collaborator.collaborator_id));
  };

  const syncCollaborators = async (taskId: string) => {
    const { error: deleteError } = await (supabase.from("task_collaborators") as any)
      .delete()
      .eq("task_id", taskId);
    if (deleteError) throw deleteError;
    if (collaboratorIds.length === 0) return;
    const { error: insertError } = await (supabase.from("task_collaborators") as any).insert(
      collaboratorIds.map((collaboratorId) => ({
        task_id: taskId,
        collaborator_id: collaboratorId,
        added_by: user?.id ?? null,
      })),
    );
    if (insertError) throw insertError;
  };

  const toggleCollaborator = (collaboratorId: string) => {
    setCollaboratorIds((current) =>
      current.includes(collaboratorId)
        ? current.filter((id) => id !== collaboratorId)
        : [...current, collaboratorId],
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
    completed_at: status === "done" ? new Date().toISOString() : null,
  });

  // React can retain the previous user while Supabase refreshes or clears an
  // expired token. Database writes must use the live session so they are sent
  // as `authenticated`, not `anon` (which RLS correctly rejects).
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
    const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !publishableKey) {
      toast.error("A conexão com o Supabase não está configurada.");
      return null;
    }

    // Use the verified access token explicitly for task creation. This avoids a
    // stale internal auth state causing PostgREST to receive the request as anon.
    const authenticatedClient = createClient<Database>(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${session.access_token}` } },
    });
    return { user: authenticatedUser, client: authenticatedClient };
  };

  // Ensures a task row exists so sub-features (subtasks/comments/files) can attach.
  // Auto-creates a draft when the dialog is in "new task" mode.
  const ensureTask = async (): Promise<string | null> => {
    const existingId = currentTaskIdRef.current ?? currentTaskId;
    if (existingId) return existingId;
    const authenticated = await getAuthenticatedUser();
    if (!authenticated) return null;
    if (!title.trim()) { toast.error("Defina um título antes de adicionar itens"); return null; }
    if (!dueDate && !recurrenceEnabled) { toast.error("Defina um prazo antes de criar a tarefa"); return null; }
    // Do not use INSERT ... RETURNING here. The tasks SELECT policy checks
    // visibility through can_view_task(), which cannot see a just-inserted row
    // from inside the same RETURNING statement. A client UUID lets us continue
    // with the new task without that second RLS evaluation.
    const taskId = crypto.randomUUID();
    const { error } = await authenticated.client.from("tasks").insert({
      id: taskId,
      ...buildPayload(),
      created_by: authenticated.user.id,
    });
    if (error) { toast.error(error.message); return null; }
    currentTaskIdRef.current = taskId;
    setCurrentTaskId(taskId);
    await syncCollaborators(taskId);
    await supabase.from("task_history").insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });
    qc.invalidateQueries({ queryKey: ["tasks"] });
    return taskId;
  };

  const commitPendingSubtask = async (taskId: string): Promise<boolean> => {
    const title = newSubtask.trim();
    if (!title) return true;

    const due = newSubtaskDue;
    const assignee = newSubtaskAssignee;
    const position = subtasks.length;
    const { data, error } = await supabase.from("subtasks").insert({
      task_id: taskId,
      title,
      position,
      due_date: deadlineToIso(due),
      assignee_id: assignee || null,
    } as any).select("id, title, done, position, due_date, assignee_id, notes").single();

    if (error) {
      toast.error(error.message);
      return false;
    }

    setSubtasks((prev) => [...prev, data as Subtask]);
    setNewSubtask("");
    setNewSubtaskDue("");
    setNewSubtaskAssignee("");
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["tasks"] }),
      qc.invalidateQueries({ queryKey: ["subtasks"] }),
    ]);
    return true;
  };

  const save = async () => {
    if (!title.trim()) { toast.error("Título é obrigatório"); return; }
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
        if (!(await commitPendingSubtask(existingTaskId))) return;
      } else if (recurrenceEnabled) {
        if (newSubtask.trim()) {
          toast.error("Para subtarefas com responsável, crie uma tarefa única ou adicione após criar as recorrências.");
          return;
        }
        if (recurrenceDays.length === 0) { toast.error("Selecione ao menos um dia da semana"); setSaving(false); return; }
        if (!recurrenceEnd) { toast.error("Defina a data final da recorrência"); setSaving(false); return; }
                const start = new Date(); start.setHours(0, 0, 0, 0);
        const end = new Date(recurrenceEnd + "T23:59:59");
        if (end < start) { toast.error("A data final deve ser futura"); setSaving(false); return; }
        const rows: ReturnType<typeof buildPayload>[] = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const wd = d.getDay();
          if (!recurrenceDays.includes(wd)) continue;
          const due = new Date(d);
          due.setDate(due.getDate() + (recurrenceOffsets[wd] ?? 0));
          due.setHours(12, 0, 0, 0);
          rows.push({ ...payload, due_date: due.toISOString() });
        }
        if (rows.length === 0) { toast.error("Nenhuma ocorrência no intervalo"); setSaving(false); return; }
        const tasksToCreate = rows.map((row) => ({
          id: crypto.randomUUID(),
          ...row,
          created_by: authenticated.user.id,
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
          created_by: authenticated.user.id,
        });
        if (error) throw error;
        await supabase.from("task_history").insert({ task_id: taskId, user_id: authenticated.user.id, action: "created" });
        currentTaskIdRef.current = taskId;
        setCurrentTaskId(taskId);
        await syncCollaborators(taskId);
        if (!(await commitPendingSubtask(taskId))) return;
      }
      toast.success(currentTaskId || task ? "Tarefa atualizada" : "Tarefa criada");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["tasks"] }),
        qc.invalidateQueries({ queryKey: ["subtasks"] }),
        qc.invalidateQueries({ queryKey: ["task_collaborators"] }),
      ]);
      onOpenChange(false);
    } catch (e) {
      toast.error((e as Error).message);

    } finally { setSaving(false); }
  };

  const remove = async () => {
    if (!currentTaskId) return;
    if (!confirm("Mover esta tarefa para a lixeira? Você pode restaurá-la depois.")) return;
    const { error } = await supabase
      .from("tasks")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", currentTaskId);
    if (error) return toast.error(error.message);
    toast.success("Tarefa movida para a lixeira");
    qc.invalidateQueries({ queryKey: ["tasks"] });
    onOpenChange(false);
  };


  // Subtasks
  const addSubtask = async () => {
    if (!newSubtask.trim()) return;
    const tid = await ensureTask();
    if (!tid) return;
    await commitPendingSubtask(tid);
  };


  const toggleSubtask = async (st: Subtask) => {
    await supabase.from("subtasks").update({ done: !st.done }).eq("id", st.id);
    setSubtasks(subtasks.map(s => s.id === st.id ? { ...s, done: !s.done } : s));
  };
  const deleteSubtask = async (id: string) => {
    await supabase.from("subtasks").delete().eq("id", id);
    setSubtasks(subtasks.filter(s => s.id !== id));
  };
  const updateSubtaskDue = async (st: Subtask, isoOrEmpty: string, reason?: string) => {
    const next = deadlineToIso(isoOrEmpty);
    const prev = st.due_date;
    if (next === prev) return;
    const { error } = await supabase.from("subtasks").update({ due_date: next }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map(s => s.id === st.id ? { ...s, due_date: next } : s));
    if (user) {
      await supabase.from("subtask_due_date_changes").insert({
        subtask_id: st.id, old_due_date: prev, new_due_date: next,
        reason: reason?.trim() || null, user_id: user.id,
      });
      // refresh history if open
      if (subDueOpen[st.id]) void loadSubDueChanges(st.id);
    }
  };
  const loadSubDueChanges = async (subtaskId: string) => {
    const { data } = await supabase.from("subtask_due_date_changes")
      .select("*").eq("subtask_id", subtaskId).order("created_at", { ascending: false });
    setSubDueChanges(prev => ({ ...prev, [subtaskId]: (data ?? []) as SubtaskDueChange[] }));
  };
  const toggleSubDueHistory = async (subtaskId: string) => {
    const willOpen = !subDueOpen[subtaskId];
    setSubDueOpen(prev => ({ ...prev, [subtaskId]: willOpen }));
    if (willOpen && !subDueChanges[subtaskId]) await loadSubDueChanges(subtaskId);
  };
  const updateSubtaskAssignee = async (st: Subtask, value: string) => {
    const next = value === "none" ? null : value;
    const { error } = await (supabase.from("subtasks") as any).update({ assignee_id: next }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map(s => s.id === st.id ? { ...s, assignee_id: next } : s));
  };
  const updateSubtaskNotes = async (st: Subtask, notes: string) => {
    const { error } = await (supabase.from("subtasks") as any).update({ notes: notes || null }).eq("id", st.id);
    if (error) return toast.error(error.message);
    setSubtasks(subtasks.map(s => s.id === st.id ? { ...s, notes: notes || null } : s));
  };
  const loadSubAttachments = async (subtaskId: string) => {
    const { data } = await (supabase.from("subtask_attachments") as any)
      .select("*").eq("subtask_id", subtaskId).order("created_at");
    setSubAttachments(prev => ({ ...prev, [subtaskId]: (data ?? []) as SubtaskAttachment[] }));
  };
  const toggleSubExpanded = async (id: string) => {
    const willOpen = !subExpanded[id];
    setSubExpanded(prev => ({ ...prev, [id]: willOpen }));
    if (willOpen && !subAttachments[id]) await loadSubAttachments(id);
  };
  const uploadSubFile = async (st: Subtask, file: File) => {
    if (!user) return;
    const tid = currentTaskId ?? await ensureTask();
    if (!tid) return;
    const path = `${tid}/subtasks/${st.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const { data, error } = await (supabase.from("subtask_attachments") as any).insert({
      subtask_id: st.id, task_id: tid, file_name: file.name, storage_path: path,
      mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,
    }).select().single();
    if (error) return toast.error(error.message);
    setSubAttachments(prev => ({ ...prev, [st.id]: [ ...(prev[st.id] ?? []), data as SubtaskAttachment ] }));
    toast.success("Arquivo enviado");
  };

  const downloadSubFile = async (att: SubtaskAttachment) => {
    const { data, error } = await supabase.storage.from("task-attachments").download(att.storage_path);
    if (error) return toast.error(error.message);
    const url = URL.createObjectURL(data);
    const a = document.createElement("a"); a.href = url; a.download = att.file_name;
    document.body.appendChild(a); a.click(); a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };
  const deleteSubFile = async (att: SubtaskAttachment) => {
    await supabase.storage.from("task-attachments").remove([att.storage_path]);
    await (supabase.from("subtask_attachments") as any).delete().eq("id", att.id);
    setSubAttachments(prev => ({ ...prev, [att.subtask_id]: (prev[att.subtask_id] ?? []).filter(x => x.id !== att.id) }));
  };


  // Comments
  const addComment = async () => {
    if (!newComment.trim() || !user) return;
    const tid = await ensureTask();
    if (!tid) return;
    const { data, error } = await supabase.from("comments").insert({
      task_id: tid, author_id: user.id, body: newComment, title: newCommentTitle.trim() || null,
    }).select().single();
    if (error) return toast.error(error.message);
    setComments([...comments, data as Comment]);
    setNewComment("");
    setNewCommentTitle("");
  };

  const deleteComment = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setComments(comments.filter(c => c.id !== id));
  };

  // Attachments
  const uploadFile = async (file: File) => {
    if (!user) return;
    const tid = await ensureTask();
    if (!tid) return;
    const path = `${tid}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const { data, error } = await supabase.from("attachments").insert({
      task_id: tid, file_name: file.name, storage_path: path,
      mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,
    }).select().single();
    if (error) return toast.error(error.message);
    setAttachments([...attachments, data as Attachment]);
    toast.success("Arquivo enviado");
  };

  const openAttachment = async (att: Attachment) => {
    if (att.mime_type === LINK_MIME) {
      window.open(att.storage_path, "_blank", "noopener,noreferrer");
      return;
    }

    setPreviewAttachment(att);
  };
  const downloadAttachment = async (att: Attachment) => {
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
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
  };
  const deleteAttachment = async (att: Attachment) => {
    await supabase.storage.from("task-attachments").remove([att.storage_path]);
    await supabase.from("attachments").delete().eq("id", att.id);
    setAttachments(attachments.filter(a => a.id !== att.id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="O que precisa ser feito?" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs">Prioridade</Label>
              <Select value={priority ?? "none"} onValueChange={(v) => setPriority(v === "none" ? null : (v as Task["priority"]))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem prioridade</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">
                Prazo {!task ? <span className="text-destructive">*</span> : null}
              </Label>
              <div className="rounded-md border bg-muted/30 p-1.5 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="task-deadline-date h-9 flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
                    required={!task && !recurrenceEnabled}
                  />
                  {dueDate && (
                    <Button type="button" size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => { setDueDate(""); setDueTime(""); }} title="Sem prazo">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 border-t px-1.5 pt-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  <Input
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="h-7 border-0 bg-transparent px-0 text-xs shadow-none focus-visible:ring-0"
                    step="300"
                    disabled={!dueDate}
                    aria-label="Hora do prazo (opcional)"
                  />
                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">Opcional</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Colaboradores</Label>
              <Popover open={collaboratorPickerOpen} onOpenChange={setCollaboratorPickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    <span className="truncate">
                      {collaboratorIds.length === 0
                        ? "Selecionar nomes"
                        : `${collaboratorIds.length} selecionado${collaboratorIds.length === 1 ? "" : "s"}`}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-2">
                  <div className="max-h-56 space-y-0.5 overflow-y-auto">
                    {(profiles ?? []).filter((profile) => profile.is_active !== false).map((profile) => {
                      const selected = collaboratorIds.includes(profile.id);
                      const name = profile.full_name || profile.email || "Usuário sem nome";
                      return (
                        <label
                          key={profile.id}
                          className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted"
                        >
                          <Checkbox
                            checked={selected}
                            onCheckedChange={() => toggleCollaborator(profile.id)}
                          />
                          <span className="truncate">{name}</span>
                        </label>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs">Status</Label>
              <Select value={columnId || "none"} onValueChange={(v) => setColumnId(v === "none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Nenhuma" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma</SelectItem>
                  {cols?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Cliente</Label>
              <Select value={clientId || "none"} onValueChange={(v) => setClientId(v === "none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Nenhum" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {clients?.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Responsável</Label>
              <Select value={assigneeId || "none"} onValueChange={(v) => setAssigneeId(v === "none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Ninguém" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguém</SelectItem>
                  {profiles?.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Descreva a tarefa..."
              minHeight={100}
            />
          </div>

          {!currentTaskId && (
            <div className="space-y-3 rounded-md border bg-muted/20 p-3">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Checkbox checked={recurrenceEnabled} onCheckedChange={(v) => setRecurrenceEnabled(!!v)} />
                Criar como tarefa recorrente
              </label>
              {recurrenceEnabled && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Dias da semana</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((label, idx) => {
                        const active = recurrenceDays.includes(idx);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setRecurrenceDays(active ? recurrenceDays.filter(d => d !== idx) : [...recurrenceDays, idx].sort())}
                            className={`rounded-md border px-3 py-1 text-xs transition ${active ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Repetir até</Label>
                      <Input type="date" value={recurrenceEnd} onChange={(e) => setRecurrenceEnd(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Prazo personalizado por dia (dias após a ocorrência)</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {recurrenceDays.map(wd => {
                        const labels = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
                        return (
                          <div key={wd} className="flex items-center gap-2">
                            <span className="w-10 text-xs text-muted-foreground">{labels[wd]}</span>
                            <Input
                              type="number"
                              min={0}
                              max={30}
                              value={recurrenceOffsets[wd] ?? 0}
                              onChange={(e) => setRecurrenceOffsets({ ...recurrenceOffsets, [wd]: Math.max(0, Number(e.target.value) || 0) })}
                              className="h-8 w-16"
                            />
                            <span className="text-xs text-muted-foreground">d</span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">Ex.: Seg=1 → tarefa de segunda vence na terça. Use 0 para vencer no próprio dia.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {(

            <Tabs defaultValue="subtasks">
              <TabsList>
                <TabsTrigger value="subtasks">Subtarefas ({subtasks.length})</TabsTrigger>
                <TabsTrigger value="comments">Comentários ({comments.length})</TabsTrigger>
                <TabsTrigger value="files">Arquivos ({attachments.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="subtasks" className="space-y-2">
                {subtasks.map(s => {
                  const dueStr = s.due_date ? format(new Date(s.due_date), "yyyy-MM-dd") : "";
                  const historyOpen = subDueOpen[s.id];
                  const history = subDueChanges[s.id] ?? [];
                  const expanded = subExpanded[s.id];
                  const files = subAttachments[s.id] ?? [];
                  const assignee = profiles?.find(p => p.id === s.assignee_id);
                  return (
                    <div key={s.id} className="space-y-1.5 rounded-md border bg-muted/30 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={s.done} onCheckedChange={() => toggleSubtask(s)} />
                        <span className={`flex-1 text-sm ${s.done ? "line-through text-muted-foreground" : ""}`}>{s.title}</span>
                        {assignee && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {assignee.full_name || assignee.email}
                          </span>
                        )}
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleSubExpanded(s.id)} title="Detalhes">
                          {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </Button>
                        {canDeleteSubtask(s) && (
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteSubtask(s.id)}><X className="h-3.5 w-3.5" /></Button>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pl-6">
                        <Label className="text-[10px] text-muted-foreground">Prazo</Label>
                        <Input
                          type="date"
                          value={dueStr}
                          onChange={(e) => updateSubtaskDue(s, e.target.value)}
                          className="h-7 w-52 text-xs"
                        />
                        {s.due_date && (
                          <Button
                            type="button" size="sm" variant="ghost"
                            className="h-7 px-2 text-xs text-muted-foreground"
                            onClick={() => {
                              const reason = window.prompt("Motivo para remover o prazo? (opcional)") ?? "";
                              void updateSubtaskDue(s, "", reason);
                            }}
                          >
                            Indefinido
                          </Button>
                        )}
                        <Button type="button" size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => toggleSubDueHistory(s.id)}>
                          {historyOpen ? <ChevronDown className="mr-1 h-3 w-3" /> : <ChevronRight className="mr-1 h-3 w-3" />}
                          Alterações
                        </Button>
                      </div>
                      {historyOpen && (
                        <div className="ml-6 space-y-1 border-l pl-2">
                          {history.length === 0 ? (
                            <p className="text-[11px] text-muted-foreground">Sem alterações registradas.</p>
                          ) : history.map(h => (
                            <div key={h.id} className="text-[11px] text-muted-foreground">
                              <span className="font-medium text-foreground">{h.old_due_date ? format(new Date(h.old_due_date), "dd/MM/yyyy") : "sem prazo"}</span>
                              {" → "}
                              <span className="font-medium text-foreground">{h.new_due_date ? format(new Date(h.new_due_date), "dd/MM/yyyy") : "sem prazo"}</span>
                              {h.reason ? <> — {h.reason}</> : null}
                              <span className="ml-2 opacity-60">{format(new Date(h.created_at), "dd/MM/yyyy")}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {expanded && (
                        <div className="ml-6 space-y-2 border-l pl-3">
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Responsável</Label>
                            <Select value={s.assignee_id || "none"} onValueChange={(v) => updateSubtaskAssignee(s, v)}>
                              <SelectTrigger className="h-8"><SelectValue placeholder="Ninguém" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Ninguém</SelectItem>
                                {profiles?.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Anotações</Label>
                            <Textarea
                              rows={2}
                              defaultValue={s.notes ?? ""}
                              onBlur={(e) => { if ((e.target.value || "") !== (s.notes ?? "")) void updateSubtaskNotes(s, e.target.value); }}
                              placeholder="Notas desta subtarefa"
                              className="text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Arquivos</Label>
                            {files.map(a => (
                              <div key={a.id} className="flex items-center gap-2 rounded border bg-background px-2 py-1 text-xs">
                                <Paperclip className="h-3 w-3 text-muted-foreground" />
                                <span className="flex-1 truncate">{a.file_name}</span>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => downloadSubFile(a)}><Download className="h-3 w-3" /></Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => deleteSubFile(a)}><X className="h-3 w-3" /></Button>
                              </div>
                            ))}
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed py-1.5 text-[11px] text-muted-foreground hover:bg-muted/40">
                              <Paperclip className="h-3 w-3" /> Anexar arquivo
                              <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadSubFile(s, f); e.target.value = ""; }} />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex flex-wrap gap-2">
                  <Input placeholder="Nova subtarefa" value={newSubtask} onChange={(e) => setNewSubtask(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSubtask()} className="min-w-[180px] flex-1" />
                  <Input type="date" value={newSubtaskDue} onChange={(e) => setNewSubtaskDue(e.target.value)} className="w-52" title="Prazo (opcional)" />
                  <Select value={newSubtaskAssignee || "none"} onValueChange={(v) => setNewSubtaskAssignee(v === "none" ? "" : v)}>
                    <SelectTrigger className="w-44" title="Responsável (opcional)"><SelectValue placeholder="Responsável" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem responsável</SelectItem>
                      {profiles?.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name || p.email}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button onClick={addSubtask} size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
                <p className="text-[11px] text-muted-foreground">Defina responsável e prazo já ao criar. Use a seta para editar anotações e anexar arquivos.</p>

              </TabsContent>

              <TabsContent value="comments" className="space-y-2">
                <div className="max-h-72 space-y-2 overflow-y-auto">
                  {comments.map(c => {
                    const author = profiles?.find(p => p.id === c.author_id);
                    const isOpen = openComments[c.id] ?? false;
                    const headTitle = c.title?.trim() || (c.body.split("\n")[0].slice(0, 60) || "Anotação");
                    return (
                      <Collapsible
                        key={c.id}
                        open={isOpen}
                        onOpenChange={(o) => setOpenComments((s) => ({ ...s, [c.id]: o }))}
                        className="rounded-md border bg-muted/30"
                      >
                        <div className="flex items-center gap-1 px-2 py-1.5">
                          <CollapsibleTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0">
                              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleTrigger asChild>
                            <button className="flex-1 truncate text-left text-sm font-medium">
                              {headTitle}
                            </button>
                          </CollapsibleTrigger>
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {format(new Date(c.created_at), "dd/MM/yyyy")}
                          </span>
                          <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => deleteComment(c.id)}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <CollapsibleContent className="border-t px-3 py-2 text-sm">
                          <div className="mb-1 text-xs text-muted-foreground">
                            {author?.full_name || author?.email || "Usuário"}
                          </div>
                          <p className="whitespace-pre-wrap">{c.body}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
                <div className="space-y-2 rounded-md border bg-muted/10 p-2">
                  <Input
                    placeholder="Título da anotação (opcional)"
                    value={newCommentTitle}
                    onChange={(e) => setNewCommentTitle(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Textarea
                      rows={2}
                      placeholder="Escreva a anotação"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={addComment} size="icon" className="self-stretch"><Send className="h-4 w-4" /></Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="files" className="space-y-2">
                {attachments.map(a => (
                  <div key={a.id} className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2">
                    {a.mime_type === LINK_MIME ? <Link2 className="h-4 w-4 text-muted-foreground" /> : <Paperclip className="h-4 w-4 text-muted-foreground" />}
                    <span className="flex-1 truncate text-sm">{a.file_name}</span>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openAttachment(a)}><ExternalLink className="h-3.5 w-3.5" /></Button>
                    {a.mime_type !== LINK_MIME && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => downloadAttachment(a)}><Download className="h-3.5 w-3.5" /></Button>}
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteAttachment(a)}><X className="h-3.5 w-3.5" /></Button>
                  </div>
                ))}
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed py-3 text-sm text-muted-foreground hover:bg-muted/40">
                  <Paperclip className="h-4 w-4" /> Anexar arquivo
                  <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }} />
                </label>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex justify-between gap-2 pt-2">
            <div>
              {currentTaskId && canDeleteTask && (
                <Button variant="ghost" onClick={remove} className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button onClick={save} disabled={saving}>{saving ? "Salvando…" : "Salvar"}</Button>
            </div>
          </div>
        </div>

        <AttachmentPreviewDialog
          open={!!previewAttachment}
          onOpenChange={(open) => {
            if (!open) setPreviewAttachment(null);
          }}
          attachment={previewAttachment}
        />
      </DialogContent>
    </Dialog>
  );
}
