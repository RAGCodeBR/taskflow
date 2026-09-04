# src/components/ObligationDialog.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 2 | `import { useEffect, useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Loader2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { useAssignableProfiles, useClients, useColumns, useTaskStatuses } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import type { Obligation, ObligationFrequency, ObligationMonthRule } from "@/hooks/use-obligations";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `import { cn } from "@/lib/utils";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `interface ObligationDialogProps {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 31 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  onOpenChange: (open: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 33 | `  obligation?: Obligation | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `const weekDays = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `  { value: 1, label: "Seg" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  { value: 2, label: "Ter" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  { value: 3, label: "Qua" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  { value: 4, label: "Qui" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  { value: 5, label: "Sex" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  { value: 6, label: "Sáb" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  { value: 7, label: "Dom" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `const todayValue = () => new Date().toISOString().slice(0, 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `export function ObligationDialog({ open, onOpenChange, obligation }: ObligationDialogProps) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 49 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const { data: profiles = [] } = useAssignableProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `  const { data: columns = [] } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 53 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `  const [title, setTitle] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 55 | `  const [description, setDescription] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `  const [clientId, setClientId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const [assigneeId, setAssigneeId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const [frequency, setFrequency] = useState<ObligationFrequency>("monthly");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  const [intervalCount, setIntervalCount] = useState(1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const [monthRule, setMonthRule] = useState<ObligationMonthRule>("specific_days");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const [daysOfMonth, setDaysOfMonth] = useState("30");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `  const [startDate, setStartDate] = useState(todayValue());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  const [endDate, setEndDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `  const [createBeforeDays, setCreateBeforeDays] = useState(7);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `  const [dueTime, setDueTime] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `  const [priority, setPriority] = useState<Obligation["priority"]>("medium");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 69 | `  const [columnId, setColumnId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `  const [statusId, setStatusId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `  const [isActive, setIsActive] = useState(true);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 75 | `    if (!open) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 76 | `    setTitle(obligation?.title ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    setDescription(obligation?.description ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `    setClientId(obligation?.client_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `    setAssigneeId(obligation?.assignee_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `    setFrequency(obligation?.frequency ?? "monthly");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `    setIntervalCount(obligation?.interval_count ?? 1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `    setDaysOfWeek(obligation?.days_of_week?.length ? obligation.days_of_week : [1]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `    setMonthRule(obligation?.month_rule ?? "specific_days");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `    setDaysOfMonth(obligation?.days_of_month?.length ? obligation.days_of_month.join(", ") : "30");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `    setBusinessDaysOnly(obligation?.business_days_only ?? false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    setStartDate(obligation?.start_date ?? todayValue());` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `    setEndDate(obligation?.end_date ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `    setCreateBeforeDays(obligation?.create_before_days ?? 7);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `    setDueTime(obligation?.due_time?.slice(0, 5) ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `    setPriority(obligation?.priority ?? "medium");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `    setColumnId(obligation?.column_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `    setStatusId(obligation?.status_id ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `    setIsActive(obligation?.is_active ?? true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  }, [open, obligation]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `  const parsedMonthDays = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 98 | `      [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `        ...new Set(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `          daysOfMonth` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `            .split(/[,;\s]+/)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `            .map(Number)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `            .filter((day) => day >= 1 && day <= 31),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      ].sort((a, b) => a - b),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 106 | `    [daysOfMonth],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `  const recurrencePreview = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 110 | `    const every = intervalCount > 1 ? \`A cada ${intervalCount}\` : "Todo";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `    if (frequency === "daily") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 112 | `      return intervalCount === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 113 | `        ? businessDaysOnly` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `          ? "Todos os dias úteis"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `          : "Todos os dias"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `        : \`${every} dias${businessDaysOnly ? " úteis" : ""}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `    if (frequency === "weekly") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 119 | `      const selected = weekDays` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `        .filter((day) => daysOfWeek.includes(day.value))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 121 | `        .map((day) => day.label);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 122 | `      return \`${intervalCount === 1 ? "Toda semana" : \`${every} semanas\`}: ${selected.join(", ") || "selecione os dias"}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 123 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 124 | `    if (monthRule === "last_day")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 125 | `      return intervalCount === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 126 | `        ? "Último dia de cada mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `        : \`Último dia a cada ${intervalCount} meses\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `    if (monthRule === "last_business_day")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `      return intervalCount === 1` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 130 | `        ? "Último dia útil de cada mês"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `        : \`Último dia útil a cada ${intervalCount} meses\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `    return \`${intervalCount === 1 ? "Todo mês" : \`${every} meses\`}: dia${parsedMonthDays.length > 1 ? "s" : ""} ${parsedMonthDays.join(" e ") || "—"}\`;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 133 | `  }, [businessDaysOnly, daysOfWeek, frequency, intervalCount, monthRule, parsedMonthDays]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `    if (!title.trim()) return toast.error("Informe o nome da obrigação.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 137 | `    if (!clientId) return toast.error("Selecione o cliente.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 138 | `    if (!startDate) return toast.error("Informe a data de início.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 139 | `    if (frequency === "weekly" && daysOfWeek.length === 0)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 140 | `      return toast.error("Selecione ao menos um dia da semana.");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 141 | `    if (frequency === "monthly" && monthRule === "specific_days" && parsedMonthDays.length === 0)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 142 | `      return toast.error("Informe ao menos um dia válido do mês.");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 143 | `    if (endDate && endDate < startDate)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 144 | `      return toast.error("A data final não pode ser anterior ao início.");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 145 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 146 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `      title: title.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `      description: description.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `      client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      assignee_id: assigneeId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `      frequency,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `      interval_count: Math.max(1, intervalCount),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `      days_of_week: frequency === "weekly" ? daysOfWeek : [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      days_of_month:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `        frequency === "monthly" && monthRule === "specific_days" ? parsedMonthDays : [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `      month_rule: frequency === "monthly" ? monthRule : "specific_days",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `      business_days_only: frequency === "daily" && businessDaysOnly,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      start_date: startDate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `      end_date: endDate || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `      create_before_days: Math.max(0, createBeforeDays),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `      due_time: dueTime || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `      priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `      column_id: columnId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `      status_id: statusId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `      is_active: isActive,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 168 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 169 | `    const request = obligation` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `      ? (supabase.from("obligations" as any) as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 171 | `          .update(payload)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `          .eq("id", obligation.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `          .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `          .single()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `      : (supabase.from("obligations" as any) as any).insert(payload).select("id").single();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 176 | `    const { data, error } = await request;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 178 | `      setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 181 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 183 | `    const { error: refreshError } = await (supabase as any).rpc("refresh_obligation", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `      target_obligation_id: data.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 186 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `    if (refreshError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 188 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `        \`Obrigação salva, mas os próximos prazos não foram gerados: ${refreshError.message}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 191 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 192 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 193 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 194 | `      queryClient.invalidateQueries({ queryKey: ["obligations"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `      queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `      queryClient.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `    toast.success(obligation ? "Obrigação atualizada" : "Obrigação criada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `    onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 201 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 202 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 203 | `    <Dialog open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto sm:rounded-2xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `        <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `          <DialogTitle>{obligation ? "Editar obrigação" : "Nova obrigação"}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 208 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 209 | `        <div className="space-y-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 210 | `          <section className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 212 | `              <Label htmlFor="obligation-title">Nome da obrigação *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `                id="obligation-title"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `                value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `                onChange={(event) => setTitle(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 217 | `                placeholder="Ex.: Entregar relatório mensal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `                autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 221 | `            <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 222 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 223 | `                <Label>Cliente *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 224 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 225 | `                  value={clientId || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `                  onValueChange={(value) => setClientId(value === "none" ? "" : value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 227 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `                  <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 229 | `                    <SelectValue placeholder="Selecione o cliente" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 231 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `                    <SelectItem value="none">Selecione o cliente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `                    {clients` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `                      .filter((client) => client.is_active)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 235 | `                      .map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `                        <SelectItem key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `                          {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `                        </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 243 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 244 | `                <Label>Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 245 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `                  value={assigneeId || "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `                  onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 248 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `                  <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `                    <SelectValue placeholder="Sem responsável" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 253 | `                    <SelectItem value="none">Sem responsável</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `                    {profiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `                      <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `                        {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `                      </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `              <Label htmlFor="obligation-description">Descrição e orientações</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `              <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `                id="obligation-description"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `                value={description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `                onChange={(event) => setDescription(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 269 | `                rows={3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `                placeholder="Documentos necessários, forma de entrega, conferências..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `          </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 275 | `          <section className="space-y-4 rounded-xl border bg-muted/20 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `              <h3 className="font-medium">Recorrência</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 278 | `              <p className="mt-1 text-xs text-muted-foreground">{recurrencePreview}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 279 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 280 | `            <div className="grid gap-4 sm:grid-cols-[1fr_140px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 281 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 282 | `                <Label>Frequência</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `                <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 284 | `                  value={frequency}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `                  onValueChange={(value) => setFrequency(value as ObligationFrequency)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 286 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `                  <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 288 | `                    <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 289 | `                  </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 290 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 291 | `                    <SelectItem value="daily">Diária</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 292 | `                    <SelectItem value="weekly">Semanal</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 293 | `                    <SelectItem value="monthly">Mensal</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 294 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 295 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 296 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 297 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 298 | `                <Label htmlFor="obligation-interval">A cada</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 299 | `                <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 300 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 301 | `                    id="obligation-interval"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `                    type="number"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `                    min={1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `                    max={365}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `                    value={intervalCount}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `                    onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 307 | `                      setIntervalCount(Math.max(1, Number(event.target.value) || 1))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 309 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `                  <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 311 | `                    {frequency === "daily"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `                      ? "dia(s)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `                      : frequency === "weekly"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `                        ? "semana(s)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `                        : "mês(es)"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 317 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 318 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 319 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 320 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 321 | `            {frequency === "daily" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `              <label className="flex items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 323 | `                <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 324 | `                  checked={businessDaysOnly}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `                  onCheckedChange={(value) => setBusinessDaysOnly(value === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 326 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `                Somente dias úteis` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 329 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 331 | `            {frequency === "weekly" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `                <Label>Dias da semana</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 334 | `                <div className="flex flex-wrap gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `                  {weekDays.map((day) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 336 | `                    const selected = daysOfWeek.includes(day.value);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 337 | `                    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 338 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `                        key={day.value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 342 | `                          setDaysOfWeek(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `                            selected` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `                              ? daysOfWeek.filter((value) => value !== day.value)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 345 | `                              : [...daysOfWeek, day.value].sort(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `                          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 348 | `                        className={cn(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 349 | `                          "rounded-full border px-3 py-1.5 text-xs transition",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `                          selected` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `                            ? "border-primary bg-primary text-primary-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `                            : "bg-background hover:bg-muted",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `                        {day.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `                    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 358 | `                  })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 360 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 361 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 363 | `            {frequency === "monthly" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `              <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `                  <Label>Regra mensal</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `                  <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 368 | `                    value={monthRule}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `                    onValueChange={(value) => setMonthRule(value as ObligationMonthRule)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 370 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `                    <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `                      <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 373 | `                    </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `                    <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `                      <SelectItem value="specific_days">Dia(s) específico(s)</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `                      <SelectItem value="last_day">Último dia do mês</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `                      <SelectItem value="last_business_day">Último dia útil do mês</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `                    </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `                  </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 381 | `                {monthRule === "specific_days" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `                    <Label htmlFor="obligation-month-days">Dias do mês</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 384 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `                      id="obligation-month-days"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `                      value={daysOfMonth}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `                      onChange={(event) => setDaysOfMonth(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `                      placeholder="Ex.: 15, 30"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `                    <p className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 391 | `                      Separe por vírgulas. Se o dia não existir, será usado o último dia do mês.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 393 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 396 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 398 | `            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 399 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 400 | `                <Label htmlFor="obligation-start">Início</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 401 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `                  id="obligation-start"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `                  type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `                  value={startDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `                  onChange={(event) => setStartDate(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 406 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 408 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 409 | `                <Label htmlFor="obligation-end">Término opcional</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 410 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 411 | `                  id="obligation-end"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `                  type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `                  value={endDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `                  min={startDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `                  onChange={(event) => setEndDate(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 416 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `                <Label htmlFor="obligation-before">Criar tarefa antes</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `                <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `                    id="obligation-before"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `                    type="number"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `                    min={0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `                    max={365}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `                    value={createBeforeDays}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `                    onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 428 | `                      setCreateBeforeDays(Math.max(0, Number(event.target.value) || 0))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 430 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `                  <span className="text-xs text-muted-foreground">dias</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 432 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                <Label htmlFor="obligation-time">Horário opcional</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 436 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `                  id="obligation-time"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `                  type="time"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `                  value={dueTime}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `                  onChange={(event) => setDueTime(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 441 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 443 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `          </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 446 | `          <section className="grid gap-4 rounded-xl border p-4 sm:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 447 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `              <Label>Prioridade da tarefa</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 449 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `                value={priority}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `                onValueChange={(value) => setPriority(value as Obligation["priority"])}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 452 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 455 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 456 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 457 | `                  <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 458 | `                  <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 459 | `                  <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `                  <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 462 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `              <Label>Coluna inicial</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 466 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 467 | `                value={columnId || "auto"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `                onValueChange={(value) => setColumnId(value === "auto" ? "" : value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 469 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 473 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `                  <SelectItem value="auto">Primeira coluna</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `                  {columns.map((column) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 476 | `                    <SelectItem key={column.id} value={column.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `                      {column.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 481 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 482 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 483 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 484 | `              <Label>Status inicial</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `              <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 486 | `                value={statusId || "auto"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 487 | `                onValueChange={(value) => setStatusId(value === "auto" ? "" : value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 488 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 490 | `                  <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `                  <SelectItem value="auto">Primeiro status aberto</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `                  {statuses` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `                    .filter((status) => !status.is_completed)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 496 | `                    .map((status) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 497 | `                      <SelectItem key={status.id} value={status.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `                        {status.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `                      </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `            <label className="flex items-center gap-2 text-sm sm:col-span-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 505 | `              <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `                checked={isActive}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `                onCheckedChange={(value) => setIsActive(value === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 508 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `              Obrigação ativa` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `            </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 511 | `          </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 514 | `        <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 516 | `            Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 518 | `          <Button onClick={() => void save()} disabled={saving}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 519 | `            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 520 | `            {saving ? "Salvando..." : "Salvar obrigação"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 522 | `        </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 525 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 526 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 527 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
