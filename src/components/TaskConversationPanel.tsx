import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Send, SmilePlus, X, Reply, Pencil, Check, LoaderCircle, Mic, Square } from "lucide-react";
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

type AudioAttachment = {
  id: string;
  comment_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  signed_url: string;
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
const MAX_AUDIO_SECONDS = 60;

function createWavBlob(chunks: Float32Array[], sampleRate: number) {
  const sampleCount = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);
  const writeText = (offset: number, value: string) => {
    [...value].forEach((character, index) =>
      view.setUint8(offset + index, character.charCodeAt(0)),
    );
  };

  writeText(0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, sampleCount * 2, true);

  let offset = 44;
  chunks.forEach((chunk) => {
    chunk.forEach((sample) => {
      const normalized = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, normalized < 0 ? normalized * 0x8000 : normalized * 0x7fff, true);
      offset += 2;
    });
  });

  return new Blob([buffer], { type: "audio/wav" });
}

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
  const [audioByComment, setAudioByComment] = useState<Record<string, AudioAttachment[]>>({});
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [sendingAudio, setSendingAudio] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const silentGainRef = useRef<GainNode | null>(null);
  const audioChunksRef = useRef<Float32Array[]>([]);
  const audioSampleRateRef = useRef(44_100);
  const recordingTimerRef = useRef<number | null>(null);
  const recordingTimeoutRef = useRef<number | null>(null);
  const recordingSecondsRef = useRef(0);
  const recordingStartedAtRef = useRef<number | null>(null);

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

  const loadAudioAttachments = useCallback(async () => {
    const commentIds = comments.map((comment) => comment.id);
    if (!commentIds.length) {
      setAudioByComment({});
      return;
    }
    const { data, error } = await (supabase.from("comment_attachments") as any)
      .select("id, comment_id, file_name, storage_path, mime_type")
      .in("comment_id", commentIds)
      .like("mime_type", "audio/%");
    if (error) return;
    const attachments = await Promise.all(
      (data ?? []).map(async (attachment: Omit<AudioAttachment, "signed_url">) => {
        const { data: signed } = await supabase.storage
          .from("task-attachments")
          .createSignedUrl(attachment.storage_path, 60 * 60);
        return signed ? { ...attachment, signed_url: signed.signedUrl } : null;
      }),
    );
    const grouped: Record<string, AudioAttachment[]> = {};
    attachments.filter(Boolean).forEach((attachment) => {
      const audio = attachment as AudioAttachment;
      grouped[audio.comment_id] = [...(grouped[audio.comment_id] ?? []), audio];
    });
    setAudioByComment(grouped);
  }, [comments]);

  useEffect(() => {
    void loadAudioAttachments();
  }, [loadAudioAttachments]);

  useEffect(() => {
    const container = commentsContainerRef.current;
    if (!container) return;
    const frame = window.requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [taskId, comments.length]);

  useEffect(
    () => () => {
      if (recordingTimerRef.current !== null) window.clearInterval(recordingTimerRef.current);
      if (recordingTimeoutRef.current !== null) window.clearTimeout(recordingTimeoutRef.current);
      audioProcessorRef.current?.disconnect();
      audioSourceRef.current?.disconnect();
      silentGainRef.current?.disconnect();
      void audioContextRef.current?.close();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    },
    [],
  );

  const clearRecordingTimers = () => {
    if (recordingTimerRef.current !== null) window.clearInterval(recordingTimerRef.current);
    if (recordingTimeoutRef.current !== null) window.clearTimeout(recordingTimeoutRef.current);
    recordingTimerRef.current = null;
    recordingTimeoutRef.current = null;
  };

  const clearAudioPreview = () => {
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(null);
    setAudioBlob(null);
    setAudioDuration(0);
  };

  const stopRecordingAudio = () => {
    clearRecordingTimers();
    const elapsedSeconds = Math.max(
      recordingSecondsRef.current,
      recordingStartedAtRef.current
        ? Math.floor((Date.now() - recordingStartedAtRef.current) / 1000)
        : 0,
    );
    recordingStartedAtRef.current = null;

    audioProcessorRef.current?.disconnect();
    audioSourceRef.current?.disconnect();
    silentGainRef.current?.disconnect();
    void audioContextRef.current?.close();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    audioContextRef.current = null;
    audioSourceRef.current = null;
    audioProcessorRef.current = null;
    silentGainRef.current = null;

    const blob = createWavBlob(audioChunksRef.current, audioSampleRateRef.current);
    audioChunksRef.current = [];
    if (blob.size > 44 && elapsedSeconds >= 1) {
      const previewUrl = URL.createObjectURL(blob);
      setAudioBlob(blob);
      setAudioPreviewUrl(previewUrl);
      setAudioDuration(elapsedSeconds);
    } else if (elapsedSeconds < 1) {
      toast.error("Grave o áudio por pelo menos 1 segundo antes de parar.");
    } else {
      toast.error("Nenhum áudio foi capturado. Verifique o microfone e tente novamente.");
    }
    setIsRecordingAudio(false);
  };

  const startRecordingAudio = async () => {
    if (readOnly || isRecordingAudio || sendingAudio) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof AudioContext === "undefined") {
      return toast.error("A gravação de áudio não é compatível com este navegador.");
    }
    clearAudioPreview();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;
      const audioContext = new AudioContext();
      await audioContext.resume();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      const silentGain = audioContext.createGain();
      silentGain.gain.value = 0;
      audioChunksRef.current = [];
      audioSampleRateRef.current = audioContext.sampleRate;
      processor.onaudioprocess = (event) => {
        audioChunksRef.current.push(new Float32Array(event.inputBuffer.getChannelData(0)));
      };
      source.connect(processor);
      processor.connect(silentGain);
      silentGain.connect(audioContext.destination);
      audioContextRef.current = audioContext;
      audioSourceRef.current = source;
      audioProcessorRef.current = processor;
      silentGainRef.current = silentGain;
      recordingSecondsRef.current = 0;
      recordingStartedAtRef.current = Date.now();
      setRecordingSeconds(0);
      setIsRecordingAudio(true);
      recordingTimerRef.current = window.setInterval(() => {
        recordingSecondsRef.current = Math.min(
          MAX_AUDIO_SECONDS,
          Math.floor((Date.now() - (recordingStartedAtRef.current ?? Date.now())) / 1000),
        );
        setRecordingSeconds(recordingSecondsRef.current);
      }, 1000);
      recordingTimeoutRef.current = window.setTimeout(
        () => stopRecordingAudio(),
        MAX_AUDIO_SECONDS * 1000,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível acessar o microfone.");
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

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

  const sendAudio = async () => {
    if (!audioBlob || !user || readOnly || sendingAudio) return;
    setSendingAudio(true);
    try {
      const { data: comment, error: commentError } = await supabase
        .from("comments")
        .insert({
          task_id: taskId,
          author_id: user.id,
          body: "🎤 Áudio",
          title: null,
          reply_to_id: null,
        })
        .select(SELECT)
        .single();
      if (commentError) throw commentError;

      const extension = audioBlob.type.includes("wav")
        ? "wav"
        : audioBlob.type.includes("ogg")
          ? "ogg"
          : "webm";
      const path = `${taskId}/comments/${comment.id}/${Date.now()}-audio.${extension}`;
      const contentType = audioBlob.type || `audio/${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("task-attachments")
        .upload(path, audioBlob, { contentType, upsert: false });
      if (uploadError) throw uploadError;

      const { data: attachment, error: attachmentError } = await (
        supabase.from("comment_attachments") as any
      )
        .insert({
          comment_id: comment.id,
          task_id: taskId,
          file_name: `Áudio ${format(new Date(), "dd/MM HH:mm")}.${extension}`,
          storage_path: path,
          mime_type: contentType,
          size_bytes: audioBlob.size,
          uploaded_by: user.id,
        })
        .select("id, comment_id, file_name, storage_path, mime_type")
        .single();
      if (attachmentError) throw attachmentError;

      const { data: signed } = await supabase.storage
        .from("task-attachments")
        .createSignedUrl(path, 60 * 60);
      if (signed) {
        setAudioByComment((current) => ({
          ...current,
          [comment.id]: [
            ...(current[comment.id] ?? []),
            {
              ...(attachment as Omit<AudioAttachment, "signed_url">),
              signed_url: signed.signedUrl,
            },
          ],
        }));
      }
      setComments((current) =>
        current.some((item) => item.id === comment.id) ? current : [...current, comment as Comment],
      );
      clearAudioPreview();
      onActivity?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível enviar o áudio.");
    } finally {
      setSendingAudio(false);
    }
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
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col [&_button:not(:disabled)]:cursor-pointer",
        className,
      )}
    >
      <div
        ref={commentsContainerRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/20 px-4 py-5 sm:px-6"
      >
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
                {(audioByComment[comment.id] ?? []).map((audio) => (
                  <audio
                    key={audio.id}
                    controls
                    preload="metadata"
                    src={audio.signed_url}
                    className="mt-2 h-9 max-w-full"
                  >
                    Seu navegador não suporta a reprodução de áudio.
                  </audio>
                ))}
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
          {isRecordingAudio && (
            <div className="mb-2 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-destructive" />
              <span className="font-medium">Gravando áudio</span>
              <span className="text-muted-foreground">
                {String(Math.floor(recordingSeconds / 60)).padStart(2, "0")}:
                {String(recordingSeconds % 60).padStart(2, "0")} / 01:00
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="ml-auto h-7 px-2 text-xs"
                onClick={stopRecordingAudio}
              >
                <Square className="mr-1 h-3 w-3 fill-current" /> Parar
              </Button>
            </div>
          )}
          {audioPreviewUrl && !isRecordingAudio && (
            <div className="mb-2 flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 px-3 py-2">
              <audio controls preload="metadata" src={audioPreviewUrl} className="h-9 max-w-full" />
              <span className="text-xs text-muted-foreground">
                Áudio de até 01:00{audioDuration ? ` · ${audioDuration}s gravados` : ""}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="ml-auto h-7 w-7"
                onClick={clearAudioPreview}
                title="Descartar áudio"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                className="h-8"
                onClick={() => void sendAudio()}
                disabled={sendingAudio}
              >
                {sendingAudio ? (
                  <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-1 h-4 w-4" />
                )}
                Enviar áudio
              </Button>
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
              <Button
                type="button"
                size="icon"
                variant={isRecordingAudio ? "destructive" : "ghost"}
                className="h-7 w-7"
                onClick={() =>
                  void (isRecordingAudio ? stopRecordingAudio() : startRecordingAudio())
                }
                disabled={sendingAudio || !!audioPreviewUrl}
                title={isRecordingAudio ? "Parar gravação" : "Gravar áudio (máximo de 1 minuto)"}
              >
                {isRecordingAudio ? (
                  <Square className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
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
