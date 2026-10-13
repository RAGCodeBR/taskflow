import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarHeart, Pencil, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import {
  useClientImportantDates,
  type ClientImportantDate,
} from "@/hooks/use-client-important-dates";
import { supabase } from "@/integrations/supabase/client";
import { enqueueOfflineOperation, isNetworkFailure, isOffline } from "@/lib/offline-sync";
import { isClientDatesSchemaMissing } from "@/lib/client-important-dates";

type DateForm = Pick<ClientImportantDate, "title" | "event_date" | "recurrence">;
const EMPTY_FORM: DateForm = { title: "", event_date: "", recurrence: "annual" };

function validDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const parsed = new Date(year, month - 1, day);
  return (
    parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day
  );
}

export function ClientImportantDates({ clientId }: { clientId: string }) {
  const { user, activeWorkspace } = useAuth();
  const queryClient = useQueryClient();
  const { data: allDates = [], isLoading, error } = useClientImportantDates();
  const schemaMissing = isClientDatesSchemaMissing(error);
  const dates = useMemo(
    () =>
      allDates
        .filter((date) => date.client_id === clientId)
        .sort((a, b) => a.event_date.localeCompare(b.event_date)),
    [allDates, clientId],
  );
  const [form, setForm] = useState<DateForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const cacheKey = ["client-important-dates", activeWorkspace?.id ?? null, user?.id];
  const putInCache = (record: ClientImportantDate) => {
    queryClient.setQueryData<ClientImportantDate[]>(cacheKey, (current = []) => [
      ...current.filter((item) => item.id !== record.id),
      record,
    ]);
  };

  const save = async () => {
    const title = form.title.trim();
    if (!title || title.length > 120 || !validDate(form.event_date)) {
      toast.error("Preencha uma descrição de até 120 caracteres e uma data válida.");
      return;
    }
    if (!user || !activeWorkspace) return;
    const current = dates.find((date) => date.id === editingId);
    const record: ClientImportantDate = {
      id: current?.id ?? crypto.randomUUID(),
      client_id: clientId,
      title,
      event_date: form.event_date,
      recurrence: form.recurrence,
      created_at: current?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const action = current ? "update" : "create";
    const queue = async () => {
      await enqueueOfflineOperation({
        userId: user.id,
        entity: "record",
        action,
        entityId: record.id,
        payload: current
          ? {
              table: "client_important_dates",
              workspaceId: activeWorkspace.id,
              patch: {
                title,
                event_date: form.event_date,
                recurrence: form.recurrence,
                updated_at: record.updated_at,
              },
            }
          : { table: "client_important_dates", workspaceId: activeWorkspace.id, record },
      });
      putInCache(record);
      toast.success("Data salva neste aparelho. Será sincronizada ao reconectar.");
    };

    setSaving(true);
    try {
      if (isOffline()) {
        await queue();
      } else {
        const result = current
          ? await supabase
              .from("client_important_dates")
              .update({
                title,
                event_date: form.event_date,
                recurrence: form.recurrence,
                updated_at: record.updated_at,
              })
              .eq("id", record.id)
              .select("*")
              .single()
          : await supabase.from("client_important_dates").insert(record).select("*").single();
        if (result.error) throw result.error;
        putInCache(result.data as ClientImportantDate);
        void queryClient.invalidateQueries({ queryKey: ["client-important-dates"] });
        toast.success(current ? "Data atualizada." : "Data adicionada.");
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (saveError) {
      if (isNetworkFailure(saveError)) {
        await queue();
        setForm(EMPTY_FORM);
        setEditingId(null);
      } else {
        toast.error("Não foi possível salvar a data. Verifique seu acesso e tente novamente.");
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async (date: ClientImportantDate) => {
    if (!user || !activeWorkspace || !window.confirm(`Excluir a data “${date.title}”?`)) return;
    const updateCache = () =>
      queryClient.setQueryData<ClientImportantDate[]>(cacheKey, (current = []) =>
        current.filter((item) => item.id !== date.id),
      );
    const queue = async () => {
      await enqueueOfflineOperation({
        userId: user.id,
        entity: "record",
        action: "delete",
        entityId: date.id,
        payload: { table: "client_important_dates", workspaceId: activeWorkspace.id },
      });
      updateCache();
      toast.success("Exclusão salva neste aparelho. Será sincronizada ao reconectar.");
    };
    try {
      if (isOffline()) {
        await queue();
      } else {
        const { error: deleteError } = await supabase
          .from("client_important_dates")
          .delete()
          .eq("id", date.id)
          .select("id")
          .single();
        if (deleteError) throw deleteError;
        updateCache();
        void queryClient.invalidateQueries({ queryKey: ["client-important-dates"] });
        toast.success("Data excluída.");
      }
      if (editingId === date.id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
    } catch (deleteError) {
      if (isNetworkFailure(deleteError)) await queue();
      else toast.error("Não foi possível excluir a data.");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <CalendarHeart className="h-4 w-4 text-amber-600" />
          Datas importantes
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Marque aniversários e outras datas deste cliente. Elas aparecem de forma discreta na
          Agenda e no calendário de tarefas.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Datas anuais começam no ano informado; 29 de fevereiro aparece apenas em anos bissextos.
        </p>
      </div>
      <fieldset
        disabled={isLoading || Boolean(error)}
        className="grid gap-3 rounded-lg border bg-muted/20 p-4 disabled:opacity-60 sm:grid-cols-[minmax(0,1fr)_160px_155px]"
      >
        <div className="space-y-1.5">
          <Label htmlFor="important-date-title">Descrição</Label>
          <Input
            id="important-date-title"
            maxLength={120}
            placeholder="Ex.: Aniversário da fundadora"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="important-date-date">Data</Label>
          <Input
            id="important-date-date"
            type="date"
            value={form.event_date}
            onChange={(event) => setForm({ ...form, event_date: event.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="important-date-recurrence">Repetição</Label>
          <select
            id="important-date-recurrence"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={form.recurrence}
            onChange={(event) =>
              setForm({ ...form, recurrence: event.target.value as DateForm["recurrence"] })
            }
          >
            <option value="annual">Todo ano</option>
            <option value="once">Uma única vez</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 sm:col-span-3">
          <Button size="sm" disabled={saving} onClick={() => void save()}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            {editingId ? "Salvar alteração" : "Adicionar data"}
          </Button>
          {editingId && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setForm(EMPTY_FORM);
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </fieldset>
      {error && (
        <p
          role="alert"
          className={`rounded-lg border px-3 py-2 text-sm ${schemaMissing ? "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200" : "border-destructive/30 text-destructive"}`}
        >
          {schemaMissing
            ? "As Datas Importantes ainda não estão disponíveis neste ambiente. É necessário aplicar a atualização do banco de dados."
            : "Não foi possível carregar as datas. Verifique seu acesso e tente novamente."}
        </p>
      )}
      {isLoading && <p className="text-sm text-muted-foreground">Carregando datas...</p>}
      {!isLoading && !error && dates.length === 0 && (
        <p className="rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
          Nenhuma data importante cadastrada para este cliente.
        </p>
      )}
      {dates.length > 0 && (
        <ul className="divide-y rounded-lg border">
          {dates.map((date) => {
            const [, month, day] = date.event_date.split("-").map(Number);
            const dayLabel = format(new Date(2024, month - 1, day), "dd 'de' MMMM", {
              locale: ptBR,
            });
            return (
              <li
                key={date.id}
                className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{date.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {dayLabel}
                    {date.recurrence === "annual"
                      ? " · Todo ano"
                      : ` · Apenas ${date.event_date.slice(0, 4)}`}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    aria-label={`Editar ${date.title}`}
                    onClick={() => {
                      setEditingId(date.id);
                      setForm({
                        title: date.title,
                        event_date: date.event_date,
                        recurrence: date.recurrence,
                      });
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    aria-label={`Excluir ${date.title}`}
                    onClick={() => void remove(date)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
