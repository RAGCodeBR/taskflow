/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAssignableProfiles, useClients, useColumns, useTaskStatuses } from "@/hooks/use-data";
import type { Obligation, ObligationFrequency, ObligationMonthRule } from "@/hooks/use-obligations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ObligationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  obligation?: Obligation | null;
}

const weekDays = [
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
  { value: 7, label: "Dom" },
];

const todayValue = () => new Date().toISOString().slice(0, 10);

export function ObligationDialog({ open, onOpenChange, obligation }: ObligationDialogProps) {
  const queryClient = useQueryClient();
  const { data: clients = [] } = useClients();
  const { data: profiles = [] } = useAssignableProfiles();
  const { data: columns = [] } = useColumns();
  const { data: statuses = [] } = useTaskStatuses();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [frequency, setFrequency] = useState<ObligationFrequency>("monthly");
  const [intervalCount, setIntervalCount] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1]);
  const [monthRule, setMonthRule] = useState<ObligationMonthRule>("specific_days");
  const [daysOfMonth, setDaysOfMonth] = useState("30");
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [startDate, setStartDate] = useState(todayValue());
  const [endDate, setEndDate] = useState("");
  const [createBeforeDays, setCreateBeforeDays] = useState(7);
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState<Obligation["priority"]>("medium");
  const [columnId, setColumnId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(obligation?.title ?? "");
    setDescription(obligation?.description ?? "");
    setClientId(obligation?.client_id ?? "");
    setAssigneeId(obligation?.assignee_id ?? "");
    setFrequency(obligation?.frequency ?? "monthly");
    setIntervalCount(obligation?.interval_count ?? 1);
    setDaysOfWeek(obligation?.days_of_week?.length ? obligation.days_of_week : [1]);
    setMonthRule(obligation?.month_rule ?? "specific_days");
    setDaysOfMonth(obligation?.days_of_month?.length ? obligation.days_of_month.join(", ") : "30");
    setBusinessDaysOnly(obligation?.business_days_only ?? false);
    setStartDate(obligation?.start_date ?? todayValue());
    setEndDate(obligation?.end_date ?? "");
    setCreateBeforeDays(obligation?.create_before_days ?? 7);
    setDueTime(obligation?.due_time?.slice(0, 5) ?? "");
    setPriority(obligation?.priority ?? "medium");
    setColumnId(obligation?.column_id ?? "");
    setStatusId(obligation?.status_id ?? "");
    setIsActive(obligation?.is_active ?? true);
  }, [open, obligation]);

  const parsedMonthDays = useMemo(
    () =>
      [
        ...new Set(
          daysOfMonth
            .split(/[,;\s]+/)
            .map(Number)
            .filter((day) => day >= 1 && day <= 31),
        ),
      ].sort((a, b) => a - b),
    [daysOfMonth],
  );

  const recurrencePreview = useMemo(() => {
    const every = intervalCount > 1 ? `A cada ${intervalCount}` : "Todo";
    if (frequency === "daily") {
      return intervalCount === 1
        ? businessDaysOnly
          ? "Todos os dias úteis"
          : "Todos os dias"
        : `${every} dias${businessDaysOnly ? " úteis" : ""}`;
    }
    if (frequency === "weekly") {
      const selected = weekDays
        .filter((day) => daysOfWeek.includes(day.value))
        .map((day) => day.label);
      return `${intervalCount === 1 ? "Toda semana" : `${every} semanas`}: ${selected.join(", ") || "selecione os dias"}`;
    }
    if (monthRule === "last_day")
      return intervalCount === 1
        ? "Último dia de cada mês"
        : `Último dia a cada ${intervalCount} meses`;
    if (monthRule === "last_business_day")
      return intervalCount === 1
        ? "Último dia útil de cada mês"
        : `Último dia útil a cada ${intervalCount} meses`;
    return `${intervalCount === 1 ? "Todo mês" : `${every} meses`}: dia${parsedMonthDays.length > 1 ? "s" : ""} ${parsedMonthDays.join(" e ") || "—"}`;
  }, [businessDaysOnly, daysOfWeek, frequency, intervalCount, monthRule, parsedMonthDays]);

  const save = async () => {
    if (!title.trim()) return toast.error("Informe o nome da obrigação.");
    if (!clientId) return toast.error("Selecione o cliente.");
    if (!startDate) return toast.error("Informe a data de início.");
    if (frequency === "weekly" && daysOfWeek.length === 0)
      return toast.error("Selecione ao menos um dia da semana.");
    if (frequency === "monthly" && monthRule === "specific_days" && parsedMonthDays.length === 0)
      return toast.error("Informe ao menos um dia válido do mês.");
    if (endDate && endDate < startDate)
      return toast.error("A data final não pode ser anterior ao início.");

    setSaving(true);
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      client_id: clientId,
      assignee_id: assigneeId || null,
      frequency,
      interval_count: Math.max(1, intervalCount),
      days_of_week: frequency === "weekly" ? daysOfWeek : [],
      days_of_month:
        frequency === "monthly" && monthRule === "specific_days" ? parsedMonthDays : [],
      month_rule: frequency === "monthly" ? monthRule : "specific_days",
      business_days_only: frequency === "daily" && businessDaysOnly,
      start_date: startDate,
      end_date: endDate || null,
      create_before_days: Math.max(0, createBeforeDays),
      due_time: dueTime || null,
      priority,
      column_id: columnId || null,
      status_id: statusId || null,
      is_active: isActive,
    };

    const request = obligation
      ? (supabase.from("obligations" as any) as any)
          .update(payload)
          .eq("id", obligation.id)
          .select("id")
          .single()
      : (supabase.from("obligations" as any) as any).insert(payload).select("id").single();
    const { data, error } = await request;
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }

    const { error: refreshError } = await (supabase as any).rpc("refresh_obligation", {
      target_obligation_id: data.id,
    });
    setSaving(false);
    if (refreshError) {
      toast.error(
        `Obrigação salva, mas os próximos prazos não foram gerados: ${refreshError.message}`,
      );
      return;
    }
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["obligations"] }),
      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),
      queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    ]);
    toast.success(obligation ? "Obrigação atualizada" : "Obrigação criada");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle>{obligation ? "Editar obrigação" : "Nova obrigação"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <section className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="obligation-title">Nome da obrigação *</Label>
              <Input
                id="obligation-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex.: Entregar relatório mensal"
                autoFocus
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Cliente *</Label>
                <Select
                  value={clientId || "none"}
                  onValueChange={(value) => setClientId(value === "none" ? "" : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione o cliente</SelectItem>
                    {clients
                      .filter((client) => client.is_active)
                      .map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Responsável</Label>
                <Select
                  value={assigneeId || "none"}
                  onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sem responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem responsável</SelectItem>
                    {profiles.map((profile) => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.full_name || profile.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="obligation-description">Descrição e orientações</Label>
              <Textarea
                id="obligation-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                placeholder="Documentos necessários, forma de entrega, conferências..."
              />
            </div>
          </section>

          <section className="space-y-4 rounded-xl border bg-muted/20 p-4">
            <div>
              <h3 className="font-medium">Recorrência</h3>
              <p className="mt-1 text-xs text-muted-foreground">{recurrencePreview}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select
                  value={frequency}
                  onValueChange={(value) => setFrequency(value as ObligationFrequency)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="obligation-interval">A cada</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="obligation-interval"
                    type="number"
                    min={1}
                    max={365}
                    value={intervalCount}
                    onChange={(event) =>
                      setIntervalCount(Math.max(1, Number(event.target.value) || 1))
                    }
                  />
                  <span className="text-xs text-muted-foreground">
                    {frequency === "daily"
                      ? "dia(s)"
                      : frequency === "weekly"
                        ? "semana(s)"
                        : "mês(es)"}
                  </span>
                </div>
              </div>
            </div>

            {frequency === "daily" && (
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={businessDaysOnly}
                  onCheckedChange={(value) => setBusinessDaysOnly(value === true)}
                />
                Somente dias úteis
              </label>
            )}

            {frequency === "weekly" && (
              <div className="space-y-2">
                <Label>Dias da semana</Label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map((day) => {
                    const selected = daysOfWeek.includes(day.value);
                    return (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() =>
                          setDaysOfWeek(
                            selected
                              ? daysOfWeek.filter((value) => value !== day.value)
                              : [...daysOfWeek, day.value].sort(),
                          )
                        }
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs transition",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted",
                        )}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {frequency === "monthly" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Regra mensal</Label>
                  <Select
                    value={monthRule}
                    onValueChange={(value) => setMonthRule(value as ObligationMonthRule)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific_days">Dia(s) específico(s)</SelectItem>
                      <SelectItem value="last_day">Último dia do mês</SelectItem>
                      <SelectItem value="last_business_day">Último dia útil do mês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {monthRule === "specific_days" && (
                  <div className="space-y-2">
                    <Label htmlFor="obligation-month-days">Dias do mês</Label>
                    <Input
                      id="obligation-month-days"
                      value={daysOfMonth}
                      onChange={(event) => setDaysOfMonth(event.target.value)}
                      placeholder="Ex.: 15, 30"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Separe por vírgulas. Se o dia não existir, será usado o último dia do mês.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="obligation-start">Início</Label>
                <Input
                  id="obligation-start"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="obligation-end">Término opcional</Label>
                <Input
                  id="obligation-end"
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="obligation-before">Criar tarefa antes</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="obligation-before"
                    type="number"
                    min={0}
                    max={365}
                    value={createBeforeDays}
                    onChange={(event) =>
                      setCreateBeforeDays(Math.max(0, Number(event.target.value) || 0))
                    }
                  />
                  <span className="text-xs text-muted-foreground">dias</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="obligation-time">Horário opcional</Label>
                <Input
                  id="obligation-time"
                  type="time"
                  value={dueTime}
                  onChange={(event) => setDueTime(event.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="grid gap-4 rounded-xl border p-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Prioridade da tarefa</Label>
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as Obligation["priority"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Coluna inicial</Label>
              <Select
                value={columnId || "auto"}
                onValueChange={(value) => setColumnId(value === "auto" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Primeira coluna</SelectItem>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status inicial</Label>
              <Select
                value={statusId || "auto"}
                onValueChange={(value) => setStatusId(value === "auto" ? "" : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Primeiro status aberto</SelectItem>
                  {statuses
                    .filter((status) => !status.is_completed)
                    .map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-2 text-sm sm:col-span-3">
              <Checkbox
                checked={isActive}
                onCheckedChange={(value) => setIsActive(value === true)}
              />
              Obrigação ativa
            </label>
          </section>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={() => void save()} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Salvando..." : "Salvar obrigação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
