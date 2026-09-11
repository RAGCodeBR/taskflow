import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Send, SmilePlus, X, Reply, Pencil, Check } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useAssignableProfiles, useProfiles } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import { participantColor } from "@/lib/participant-color";
import { toast } from "sonner";

type Comment = {
  id: string;
  task_id: string;
  body: string;
  author_id: string;
  created_at: string;
  reply_to_id: string | null;
  edited_at: string | null;
};

type Props = {
  taskId: string;
  /** Tarefa concluída: histórico visível, sem campo de envio. */
  readOnly?: boolean;
  /** Texto do rodapé quando `readOnly` — o padrão fala em tarefa concluída. */
  readOnlyReason?: string;
  /** Chamado quando uma mensagem entra ou sai — a lista de conversas usa isso. */
  onActivity?: () => void;
  className?: string;
};

const SELECT = "id, task_id, body, author_id, created_at, reply_to_id, edited_at";
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MESSAGE_EMOJIS = [
  "\u{1F600}",
  "\u{1F602}",
  "\u{1F44B}",
  "\u{1F680}",
  "\u{1F4A1}",
  "\u{2764}\u{FE0F}",
  "\u{1F389}",
  "\u{1F44F}",
];

/**
 * O chat de uma tarefa: mensagens em `comments`, realtime por `task_id`,
 * @menção, responder citando, editar a própria mensagem, apagar. Sem casca de
 * layout — serve o diálogo, a aba do card/editor e a tela de Conversas.
 */
export function TaskConversationPanel({
  taskId,
  readOnly = false,
  readOnlyReason,
  onActivity,
  className,
}: Props) {
  const { user, isAdmin } = useAuth();
  const { data: profiles = [] } = useProfiles();
  // O autocomplete de @menção só oferece quem é do ambiente da tarefa.
  const { data: assignableProfiles = [] } = useAssignableProfiles();
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const mentionableProfiles = useMemo(
    () => assignableProfiles.filter((profile) => profile.is_active !== false),
    [assignableProfiles],
  );
  const mentionQuery = useMemo(() => {
    const match = message.match(/(?:^|\s)@([^\n@]*)$/);
    return match ? match[1].trim().toLocaleLowerCase("pt-BR") : null;
  }, [message]);
  const mentionCandidates = useMemo(() => {
    if (mentionQuery === null) return [];
    return mentionableProfiles.filter((profile) =>
      (profile.full_name || profile.email || "").toLocaleLowerCase("pt-BR").includes(mentionQuery),
    );
  }, [mentionQuery, mentionableProfiles]);

  const nameOf = (id: string | null | undefined) => {
    const p = profiles.find((profile) => profile.id === id);
    return p?.full_name || p?.email || "Usuário";
  };

  const loadComments = useCallback(async () => {
    const { data, error } = await supabase
      .from("comments")
      .select(SELECT)
      .eq("task_id", taskId)
      .order("created_at");
    if (error) return toast.error(error.message);
    setComments((data ?? []) as Comment[]);
  }, [taskId]);

  useEffect(() => {
    void loadComments();
    const channel = supabase
      .channel(`task-conversation-${taskId}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `task_id=eq.${taskId}` },
        ({ new: comment }: { new: Record<string, unknown> }) => {
          setComments((current) =>
            current.some((item) => item.id === comment.id)
              ? current
              : [...current, comment as unknown as Comment],
          );
          onActivity?.();
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "comments", filter: `task_id=eq.${taskId}` },
        ({ new: comment }: { new: Record<string, unknown> }) => {
          setComments((current) =>
            current.map((item) =>
              item.id === (comment as { id: string }).id ? (comment as unknown as Comment) : item,
            ),
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "comments", filter: `task_id=eq.${taskId}` },
        ({ old: comment }: { old: { id: string } }) => {
          setComments((current) => current.filter((item) => item.id !== comment.id));
          onActivity?.();
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [taskId, loadComments, onActivity]);

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
    if (!message.trim() || !user || readOnly) return;
    const body = message.trim();
    const { data, error } = await supabase
      .from("comments")
      .insert({
        task_id: taskId,
        author_id: user.id,
        body,
        title: null,
        reply_to_id: replyingTo?.id ?? null,
      })
      .select(SELECT)
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
    setReplyingTo(null);
    onActivity?.();
  };

  const saveEdit = async (id: string) => {
    const body = editDraft.trim();
    if (!body) return;
    const { data, error } = await supabase
      .from("comments")
      .update({ body })
      .eq("id", id)
      .select(SELECT)
      .single();
    if (error) return toast.error(error.message);
    setComments((current) => current.map((item) => (item.id === id ? (data as Comment) : item)));
    setEditingId(null);
    setEditDraft("");
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setComments((current) => current.filter((comment) => comment.id !== id));
    onActivity?.();
  };

  const startReply = (comment: Comment) => {
    setReplyingTo(comment);
    setEditingId(null);
    messageRef.current?.focus();
  };
  const startEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditDraft(comment.body);
    setReplyingTo(null);
  };

  const mentionNames = mentionableProfiles
    .map((profile) => profile.full_name || profile.email)
    .filter((name): name is string => Boolean(name));

  const renderBody = (body: string, ownBubble: boolean) => {
    const parts = mentionNames.length
      ? body.split(
          new RegExp(`(${mentionNames.map((name) => `@${escapeRegExp(name)}`).join("|")})`, "gi"),
        )
      : [body];
    return parts.map((part, index) =>
      part.startsWith("@") ? (
        <span
          key={index}
          className={ownBubble ? "font-semibold underline" : "font-semibold text-primary"}
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/20 px-4 py-5 sm:px-6">
        {comments.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Ainda não há mensagens nesta tarefa.
          </p>
        )}
        {comments.map((comment) => {
          const isOwnMessage = comment.author_id === user?.id;
          const authorName = isOwnMessage ? "Você" : nameOf(comment.author_id);
          const color = participantColor(comment.author_id);
          const quoted = comment.reply_to_id
            ? comments.find((item) => item.id === comment.reply_to_id)
            : null;
          const editing = editingId === comment.id;
          return (
            <div
              key={comment.id}
              id={`msg-${comment.id}`}
              className={`flex gap-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              {!isOwnMessage && (
                <div
                  className={cn(
                    "mt-1 grid h-8 w-8 shrink-0 place-items-center self-start rounded-full text-[10px] font-semibold text-foreground/80",
                    color.avatar,
                  )}
                >
                  {authorName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div
                className={cn(
                  "group max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm",
                  isOwnMessage ? "bg-primary text-primary-foreground" : color.bubble,
                )}
              >
                <div className="mb-1 flex items-center gap-2 text-[11px] opacity-75">
                  <span className="font-medium">{authorName}</span>
                  <span>{format(new Date(comment.created_at), "dd/MM HH:mm")}</span>
                  {comment.edited_at && <span className="italic">editado</span>}
                  {!readOnly && !editing && (
                    <span className="ml-auto flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button type="button" onClick={() => startReply(comment)} title="Responder">
                        <Reply className="h-3.5 w-3.5" />
                      </button>
                      {isOwnMessage && (
                        <button
                          type="button"
                          onClick={() => startEdit(comment)}
                          title="Editar mensagem"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                      )}
                      {(isOwnMessage || isAdmin) && (
                        <button
                          type="button"
                          onClick={() => void deleteMessage(comment.id)}
                          title="Excluir mensagem"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </span>
                  )}
                </div>

                {quoted && (
                  <a
                    href={`#msg-${quoted.id}`}
                    className={cn(
                      "mb-1.5 block rounded-md border-l-2 px-2 py-1 text-xs",
                      isOwnMessage
                        ? "border-primary-foreground/50 bg-primary-foreground/10"
                        : "border-primary/40 bg-background/60",
                    )}
                  >
                    <span className="font-medium">
                      {quoted.author_id === user?.id ? "Você" : nameOf(quoted.author_id)}
                    </span>
                    <span className="ml-1.5 line-clamp-1 opacity-80">{quoted.body}</span>
                  </a>
                )}

                {editing ? (
                  <div className="space-y-1.5">
                    <Textarea
                      rows={2}
                      value={editDraft}
                      autoFocus
                      onChange={(event) => setEditDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                          event.preventDefault();
                          void saveEdit(comment.id);
                        }
                        if (event.key === "Escape") setEditingId(null);
                      }}
                      className="bg-background text-foreground"
                    />
                    <div className="flex justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => setEditingId(null)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs"
                        disabled={!editDraft.trim()}
                        onClick={() => void saveEdit(comment.id)}
                      >
                        <Check className="mr-1 h-3.5 w-3.5" /> Salvar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap break-words">
                    {renderBody(comment.body, isOwnMessage)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {readOnly ? (
        <p className="border-t bg-background px-4 py-3 text-center text-xs text-muted-foreground">
          {readOnlyReason ?? "Tarefa concluída — conversa em modo leitura."}
        </p>
      ) : (
        <div className="relative border-t bg-card p-3 sm:px-4">
          {replyingTo && (
            <div className="mb-2 flex items-start gap-2 rounded-md border-l-2 border-primary bg-muted/40 px-2 py-1.5 text-xs">
              <div className="min-w-0 flex-1">
                <span className="font-medium">
                  Respondendo{" "}
                  {replyingTo.author_id === user?.id ? "você" : nameOf(replyingTo.author_id)}
                </span>
                <p className="line-clamp-1 text-muted-foreground">{replyingTo.body}</p>
              </div>
              <button type="button" onClick={() => setReplyingTo(null)} title="Cancelar resposta">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <Textarea
            ref={messageRef}
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
            <div className="scrollbar-thin absolute bottom-[calc(100%+4px)] left-3 z-10 max-h-52 w-64 overflow-y-auto overscroll-contain rounded-md border bg-popover p-1 shadow-md">
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
          <div className="mt-2 flex flex-nowrap items-center justify-between gap-2 overflow-x-auto">
            <div className="flex shrink-0 items-center gap-1 whitespace-nowrap">
              <SmilePlus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {MESSAGE_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="rounded p-1 text-base leading-none hover:bg-muted"
                  onClick={() => setMessage((current) => `${current}${emoji}`)}
                  title={`Adicionar ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Use @ para marcar · Ctrl/⌘ + Enter para enviar
            </span>
            <Button onClick={() => void sendMessage()} size="sm" disabled={!message.trim()}>
              <Send className="mr-1 h-4 w-4" /> Enviar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
