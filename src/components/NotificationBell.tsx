import { useEffect, useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

interface Notification {
  id: string;
  user_id: string;
  task_id: string | null;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  created_at: string;
}

export function NotificationBell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const refreshAssignedWork = () => {
    qc.invalidateQueries({ queryKey: ["tasks"] });
    qc.invalidateQueries({ queryKey: ["subtasks"] });
  };

  const load = async () => {
    if (!user) return;
    const { data } = await (supabase.from("notifications") as any)
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);
    const next = (data ?? []) as Notification[];
    if (next.some((n) => n.type === "assignment" || n.type === "subtask_assignment" || n.type === "collaborator_assignment")) {
      refreshAssignedWork();
    }
    setItems(next);
  };

  useEffect(() => {
    if (!user) return;
    load();
    const poll = window.setInterval(() => void load(), 15_000);
    const channel = supabase
      .channel(`notifications-${user.id}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        (payload: any) => {
          const type = payload.new?.type ?? payload.old?.type;
          if (type === "assignment" || type === "subtask_assignment" || type === "collaborator_assignment") refreshAssignedWork();
          void load();
        },
      )
      .subscribe();
    return () => {
      window.clearInterval(poll);
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const unread = items.filter((n) => !n.is_read).length;

  const markRead = async (id: string) => {
    await (supabase.from("notifications") as any).update({ is_read: true }).eq("id", id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const markAllRead = async () => {
    if (!user) return;
    await (supabase.from("notifications") as any)
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const remove = async (id: string) => {
    await (supabase.from("notifications") as any).delete().eq("id", id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const openNotification = async (n: Notification) => {
    if (!n.is_read) await markRead(n.id);
    setOpen(false);
    if (n.type === "mural_post" || n.type === "mural_reaction") {
      navigate({ to: "/mural" });
      return;
    }
    if (n.task_id) {
      navigate({ to: "/tasks/list", search: { task: n.task_id, mine: true } as any });
    } else {
      navigate({ to: "/tasks/list", search: { mine: true } as any });
    }
  };

  if (!user) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative h-9 w-9" title="Notificações">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Notificações</p>
            <p className="text-xs text-muted-foreground">{unread > 0 ? `${unread} não lidas` : "Tudo em dia"}</p>
          </div>
          <Button size="sm" variant="ghost" disabled={unread === 0} onClick={markAllRead}>
            <Check className="mr-1 h-3.5 w-3.5" />
            Marcar todas
          </Button>
        </div>
        <div className="max-h-[420px] overflow-y-auto">
          {items.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">Sem notificações</p>
          )}
          {items.map((n) => (
            <div
              key={n.id}
              className={`group relative flex cursor-pointer gap-3 border-b px-4 py-3 text-sm transition hover:bg-muted/50 ${
                !n.is_read ? "bg-primary/5" : ""
              }`}
              onClick={() => openNotification(n)}
            >
              {!n.is_read && (
                <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-tight">{n.title}</p>
                {n.body && <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>}
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true, locale: ptBR })}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(n.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
