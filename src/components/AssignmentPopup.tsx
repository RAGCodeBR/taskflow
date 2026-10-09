import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [queue, setQueue] = useState<AssignmentNotification[]>([]);
  const [preview, setPreview] = useState<TaskPreview | null>(null);
  const [markingRead, setMarkingRead] = useState(false);

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

  const refreshAssignedWork = () => {
    void qc.invalidateQueries({ queryKey: ["tasks"] });
    void qc.invalidateQueries({ queryKey: ["subtasks"] });
  };

  const markSeen = (ids: string[]) => {
    if (!storageKey || typeof window === "undefined" || ids.length === 0) return;
    const seen = getSeen();
    ids.forEach((id) => seen.add(id));
    const arr = Array.from(seen).slice(-500);
    try { localStorage.setItem(storageKey, JSON.stringify(arr)); } catch { /* noop */ }
  };

  const enqueueFromRow = (row: AssignmentNotification) => {
    const seen = getSeen();
    if (seen.has(row.id)) return;
    refreshAssignedWork();
    setQueue((prev) => (prev.some((n) => n.id === row.id) ? prev : [...prev, row]));
  };

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const loadFreshAssignments = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("id, task_id, title, body, created_at, type")
        .eq("user_id", user.id)
        .eq("is_read", false)
        .in("type", ["assignment", "subtask_assignment", "collaborator_assignment"])
        .order("created_at", { ascending: false })
        .limit(20);
      if (cancelled || !data) return;
      const seen = getSeen();
      const fresh = (data as any[])
        .filter((n) => !seen.has(n.id))
        .map((n) => ({ id: n.id, task_id: n.task_id, type: n.type, title: n.title, body: n.body, created_at: n.created_at }))
        .reverse();
      if (fresh.length > 0) {
        refreshAssignedWork();
        setQueue((prev) => {
          const existing = new Set(prev.map((n) => n.id));
          return [...prev, ...fresh.filter((n) => !existing.has(n.id))];
        });
      }
    };

    void loadFreshAssignments();
    const poll = window.setInterval(() => void loadFreshAssignments(), 12_000);

    const channel = supabase
      .channel(`assign-popup-${user.id}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload: any) => {
          const n = payload.new;
          if (!n || !ASSIGN_TYPES.has(n.type)) return;
          enqueueFromRow({
            id: n.id, task_id: n.task_id ?? null, type: n.type,
            title: n.title, body: n.body ?? null, created_at: n.created_at,
          });
        },
      )
      .subscribe();

    return () => { cancelled = true; window.clearInterval(poll); supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

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
    setQueue((prev) => prev.slice(1));
  };

  const markAssignmentNotificationsRead = async () => {
    if (!user || !current || markingRead) return;
    setMarkingRead(true);
    const markAll = queue.length > 1;
    let request = supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    request = markAll
      ? request.in("type", [...ASSIGN_TYPES])
      : request.eq("id", current.id);
    const { error } = await request;
    setMarkingRead(false);
    if (error) {
      toast.error("Não foi possível marcar os avisos como lidos.");
      return;
    }
    markSeen(markAll ? queue.map(({ id }) => id) : [current.id]);
    setQueue((previous) => (markAll ? [] : previous.filter(({ id }) => id !== current.id)));
  };

  const openTask = () => {
    if (!current) return;
    const target = current;
    markSeen([target.id]);
    setQueue((prev) => prev.slice(1));
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
