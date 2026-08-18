import { useCallback, useEffect, useMemo, useState } from "react";
import { Send, X } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useProfiles, type Task } from "@/hooks/use-data";
import { toast } from "sonner";

type Comment = {
  id: string;
  task_id: string;
  body: string;
  author_id: string;
  created_at: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function TaskConversationDialog({ open, onOpenChange, task }: Props) {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");

  const mentionableProfiles = useMemo(
    () => profiles.filter((profile) => profile.is_active !== false),
    [profiles],
  );
  const mentionQuery = useMemo(() => {
    const match = message.match(/(?:^|\s)@([^\n@]*)$/);
    return match ? match[1].trim().toLocaleLowerCase("pt-BR") : null;
  }, [message]);
  const mentionCandidates = useMemo(() => {
    if (mentionQuery === null) return [];
    return mentionableProfiles
      .filter((profile) =>
        (profile.full_name || profile.email || "")
          .toLocaleLowerCase("pt-BR")
          .includes(mentionQuery),
      )
      .slice(0, 5);
  }, [mentionQuery, mentionableProfiles]);

  const loadComments = useCallback(async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("id, task_id, body, author_id, created_at")
      .eq("task_id", task.id)
      .order("created_at");
    if (error) return toast.error(error.message);
    setComments((data ?? []) as Comment[]);
  }, [task.id]);

  useEffect(() => {
    if (!open) return;
    void loadComments();
    const channel = supabase
      .channel(`task-conversation-${task.id}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `task_id=eq.${task.id}` },
        ({ new: comment }: { new: Record<string, unknown> }) => {
          setComments((current) =>
            current.some((item) => item.id === comment.id)
              ? current
              : [...current, comment as unknown as Comment],
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "comments", filter: `task_id=eq.${task.id}` },
        ({ old: comment }: { old: { id: string } }) =>
          setComments((current) => current.filter((item) => item.id !== comment.id)),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [open, task.id, loadComments]);

  const insertMention = (profile: { full_name: string | null; email: string | null }) => {
    const name = profile.full_name || profile.email;
    if (!name) return;
    setMessage((current) => current.replace(/(^|\s)@[^\n@]*$/, `$1@${name} `));
  };

  const mentionedProfileIds = (body: string) =>
    mentionableProfiles
      .filter((profile) => {
        const name = profile.full_name || profile.email;
        return (
          !!name && new RegExp(`(^|\\s)@${escapeRegExp(name)}(?=$|[\\s.,!?:;])`, "i").test(body)
        );
      })
      .map((profile) => profile.id);

  const sendMessage = async () => {
    if (!message.trim() || !user) return;
    const body = message.trim();
    const { data, error } = await supabase
      .from("comments")
      .insert({ task_id: task.id, author_id: user.id, body, title: null })
      .select("id, task_id, body, author_id, created_at")
      .single();
    if (error) return toast.error(error.message);

    const mentionedIds = mentionedProfileIds(body).filter((id) => id !== user.id);
    if (mentionedIds.length) {
      const { error: mentionError } = await supabase.from("comment_mentions").insert(
        mentionedIds.map((mentionedUserId) => ({
          comment_id: data.id,
          mentioned_user_id: mentionedUserId,
        })),
      );
      if (mentionError)
        toast.error(
          `Mensagem enviada, mas não foi possível notificar as menções: ${mentionError.message}`,
        );
    }
    setComments((current) =>
      current.some((item) => item.id === data.id) ? current : [...current, data as Comment],
    );
    setMessage("");
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setComments((current) => current.filter((comment) => comment.id !== id));
  };

  const mentionNames = mentionableProfiles
    .map((profile) => profile.full_name || profile.email)
    .filter((name): name is string => Boolean(name));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[82vh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-5 py-4">
          <DialogTitle>Conversa da tarefa</DialogTitle>
          <p className="truncate text-sm font-normal text-muted-foreground">{task.title}</p>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/10 p-4">
          {comments.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Ainda não há mensagens nesta tarefa.
            </p>
          )}
          {comments.map((comment) => {
            const author = profiles.find((profile) => profile.id === comment.author_id);
            const authorName = author?.full_name || author?.email || "Usuário";
            const isOwnMessage = comment.author_id === user?.id;
            const parts = mentionNames.length
              ? comment.body.split(
                  new RegExp(
                    `(${mentionNames.map((name) => `@${escapeRegExp(name)}`).join("|")})`,
                    "gi",
                  ),
                )
              : [comment.body];
            return (
              <div
                key={comment.id}
                className={`flex gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                {!isOwnMessage && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    {authorName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div
                  className={`group max-w-[82%] rounded-xl px-3 py-2 text-sm ${isOwnMessage ? "bg-primary text-primary-foreground" : "bg-background shadow-sm"}`}
                >
                  <div className="mb-1 flex items-center gap-2 text-[11px] opacity-75">
                    <span className="font-medium">{isOwnMessage ? "Você" : authorName}</span>
                    <span>{format(new Date(comment.created_at), "dd/MM HH:mm")}</span>
                    {(isOwnMessage || isAdmin) && (
                      <button
                        type="button"
                        className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => void deleteMessage(comment.id)}
                        title="Excluir mensagem"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap break-words">
                    {parts.map((part, index) =>
                      part.startsWith("@") ? (
                        <span
                          key={index}
                          className={
                            isOwnMessage ? "font-semibold underline" : "font-semibold text-primary"
                          }
                        >
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative border-t bg-background p-3">
          <Textarea
            rows={3}
            placeholder="Escreva uma mensagem… Use @ para marcar alguém."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                void sendMessage();
              }
            }}
          />
          {mentionCandidates.length > 0 && (
            <div className="absolute bottom-[calc(100%+4px)] left-3 z-10 w-64 overflow-hidden rounded-md border bg-popover p-1 shadow-md">
              {mentionCandidates.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => insertMention(profile)}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
                    {(profile.full_name || profile.email || "U").slice(0, 2).toUpperCase()}
                  </span>
                  <span className="truncate">{profile.full_name || profile.email}</span>
                </button>
              ))}
            </div>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground">
              Use @ para marcar alguém · Ctrl/⌘ + Enter para enviar
            </span>
            <Button onClick={() => void sendMessage()} size="sm" disabled={!message.trim()}>
              <Send className="mr-1 h-4 w-4" /> Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
