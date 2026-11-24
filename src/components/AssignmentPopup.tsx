import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { refreshTaskListsAfterSave } from "@/lib/task-save";
import { Bell, ExternalLink, Calendar, AlertCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { priorityLabels, priorityColors } from "@/lib/task-utils";
import { RichTextView } from "@/components/RichTextEditor";
import { LinkedText } from "@/components/LinkedText";
import { toast } from "sonner";
import { isOffline } from "@/lib/offline-sync";

interface AssignmentNotification {
  id: string;
  task_id: string | null;
  type: string;
  title: string;
  body: string | null;
  created_at: string;
}

interface TaskPreview {
  title: string;
  description: string | null;
  due_date: string | null;
  priority: string | null;
}

const ASSIGN_TYPES = new Set(["assignment", "subtask_assignment", "collaborator_assignment"]);

export function AssignmentPopup() {
  const { user, activeWorkspace } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [queue, setQueue] = useState<AssignmentNotification[]>([]);
  const [preview, setPreview] = useState<TaskPreview | null>(null);
  const [markingRead, setMarkingRead] = useState(false);
  const reload = useRef<() => void>(() => {});

  const storageKey = user ? `assign-popup-seen:${user.id}` : null;

  const getSeen = (): Set<string> => {
    if (!storageKey || typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  };

  const markSeen = (ids: string[]) => {
    if (!storageKey || typeof window === "undefined" || ids.length === 0) return;
    const seen = getSeen();
    ids.forEach((id) => seen.add(id));
    const arr = Array.from(seen).slice(-500);
    try { localStorage.setItem(storageKey, JSON.stringify(arr)); } catch { /* noop */ }
  };

  useEffect(() => {
    if (!user || !activeWorkspace) return;
    const uid = user.id;
    let cancelled = false;
    let running = false;
    let again = false;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      if (cancelled || isOffline()) return;
      if (running) { again = true; return; }
      running = true;
      try {
        const next: AssignmentNotification[] = [];
        // Dismissing a popup leaves its bell notification unread. Page past
        // dismissed entries so they cannot hide subsequent assignments.
        for (let offset = 0; next.length < 20; offset += 50) {
          const { data, error } = await supabase.from("notifications")
            .select("id, task_id, title, body, created_at, type, tasks!inner(id)")
            .eq("user_id", uid).eq("is_read", false)
            .is("tasks.deleted_at", null).is("tasks.archived_at", null).eq("tasks.is_draft", false)
            .in("type", [...ASSIGN_TYPES])
            .order("created_at").order("id").range(offset, offset + 49);
          if (cancelled || error || !data) return;
          const seen = getSeen();
          next.push(...data.filter((n: AssignmentNotification) => !seen.has(n.id)));
          if (data.length < 50) break;
        }
        const seen = getSeen();
        setQueue(next.filter((n) => !seen.has(n.id)).slice(0, 20));
      } finally {
        running = false;
        if (again && !cancelled) { again = false; schedule(); }
      }
    };
    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(() => void load(), 150);
    }
    reload.current = schedule;
    const onVisible = () => { if (!document.hidden) schedule(); };
    void load();
    const poll = window.setInterval(onVisible, 60_000);
    window.addEventListener("online", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    const channel = supabase.channel(`assign-popup-${uid}-${activeWorkspace.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${uid}` },
        (payload: { eventType: string; new: { type?: string } }) => {
          if (payload.eventType !== "DELETE" && !ASSIGN_TYPES.has(payload.new.type ?? "")) return;
          if (payload.eventType === "INSERT") refreshTaskListsAfterSave(qc);
          schedule();
        })
      .subscribe((status: string) => { if (status === "SUBSCRIBED") schedule(); });
    return () => {
      cancelled = true;
      reload.current = () => {};
      clearTimeout(timer);
      window.clearInterval(poll);
      window.removeEventListener("online", onVisible);
      document.removeEventListener("visibilitychange", onVisible);
      void supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, activeWorkspace?.id, qc]);

  const current = queue[0] ?? null;

  useEffect(() => {
    setPreview(null);
    if (!current?.task_id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("tasks")
        .select("title, description, due_date, priority")
        .eq("id", current.task_id!)
        .maybeSingle();
      if (!cancelled && data) setPreview(data as TaskPreview);
    })();
    return () => { cancelled = true; };
  }, [current?.task_id]);

  const dismiss = () => {
    if (!current) return;
    markSeen([current.id]);
    setQueue((prev) => prev.filter(({ id }) => id !== current.id));
    reload.current();
  };

  const markAssignmentNotificationsRead = async () => {
    if (!user || !current || markingRead) return;
    setMarkingRead(true);
    const ids = queue.map(({ id }) => id);
    const { error } = await supabase.from("notifications").update({ is_read: true })
      .eq("user_id", user.id).in("id", ids);
    setMarkingRead(false);
    if (error) {
      toast.error("Não foi possível marcar os avisos como lidos.");
      return;
    }
    markSeen(ids);
    setQueue((previous) => previous.filter(({ id }) => !ids.includes(id)));
    reload.current();
  };

  const openTask = () => {
    if (!current) return;
    const target = current;
    markSeen([target.id]);
    setQueue((prev) => prev.filter(({ id }) => id !== current.id));
    reload.current();
    if (target.task_id) {
      navigate({ to: "/tasks/list", search: { task: target.task_id, mine: true } as any });
    } else {
      navigate({ to: "/tasks/list", search: { mine: true } as any });
    }
  };

  if (!user || !current) return null;

  return (
    <Dialog open onOpenChange={(o) => { if (!o) dismiss(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
            </span>
            {current.title}
          </DialogTitle>
        </DialogHeader>
        {current.body && (
          <p className="text-sm text-muted-foreground"><LinkedText text={current.body} /></p>
        )}
        {preview && (
          <div className="space-y-2 rounded-md border bg-muted/30 p-3 text-sm">
            <p className="font-medium"><LinkedText text={preview.title} /></p>
            {preview.description && (
              <RichTextView html={preview.description} className="line-clamp-3 text-xs text-muted-foreground" />
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {preview.due_date && (
                <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 font-medium">
                  <Calendar className="h-3 w-3" />
                  Prazo: {format(new Date(preview.due_date), "dd/MM/yyyy", { locale: ptBR })}
                </span>
              )}
              {preview.priority && (
                <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 font-medium"
                  style={{ color: priorityColors[preview.priority] }}>
                  <AlertCircle className="h-3 w-3" />
                  {priorityLabels[preview.priority as keyof typeof priorityLabels] ?? preview.priority}
                </span>
              )}
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(current.created_at), { addSuffix: true, locale: ptBR })}
          {queue.length > 1 && <span className="ml-2">• {queue.length - 1} outra(s) na fila</span>}
        </p>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="ghost"
            disabled={markingRead}
            onClick={() => void markAssignmentNotificationsRead()}
          >
            {markingRead
              ? "Marcando…"
              : queue.length > 1
                ? "Marcar todos como lidos"
                : "Marcar como lido"}
          </Button>
          <Button onClick={openTask}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver tarefa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
