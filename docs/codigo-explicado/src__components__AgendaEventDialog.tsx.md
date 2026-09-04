# src/components/AgendaEventDialog.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { LoaderCircle, Trash2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 18 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import type { AgendaEvent } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `type Props = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 23 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  onOpenChange: (open: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 25 | `  event?: AgendaEvent | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  defaultDate?: Date | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  defaultStartTime?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  onSaved?: () => void | Promise<void>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 29 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `const defaultStartTimeValue = "09:00";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `const defaultEndTime = "10:00";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `const dateValue = (value: string) => format(new Date(value), "yyyy-MM-dd");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 35 | `const timeValue = (value: string) => format(new Date(value), "HH:mm");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `export function AgendaEventDialog({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 38 | `  open,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  event,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  defaultDate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  defaultStartTime,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  onSaved,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `}: Props) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `  const [title, setTitle] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `  const [description, setDescription] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const [startDate, setStartDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const [startTime, setStartTime] = useState(defaultStartTime);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const [endDate, setEndDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `  const [endTime, setEndTime] = useState(defaultEndTime);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 53 | `  const [allDay, setAllDay] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `  const [location, setLocation] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 55 | `  const [meetingUrl, setMeetingUrl] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `  const [color, setColor] = useState("#2563eb");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 60 | `    if (!open) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 61 | `    if (event) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 62 | `      setTitle(event.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `      setDescription(event.description ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `      setStartDate(dateValue(event.starts_at));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `      setStartTime(timeValue(event.starts_at));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `      setEndDate(dateValue(event.ends_at));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `      setEndTime(timeValue(event.ends_at));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `      setAllDay(event.is_all_day);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `      setLocation(event.location ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `      setMeetingUrl(event.meeting_url ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `      setColor(event.color);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 73 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 74 | `    const date = format(defaultDate ?? new Date(), "yyyy-MM-dd");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `    setTitle("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `    setDescription("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    setStartDate(date);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `    setStartTime(defaultStartTime ?? defaultStartTimeValue);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `    const [hours, minutes] = (defaultStartTime ?? "09:00").split(":").map(Number);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `    const end = new Date(2000, 0, 1, hours + 1, minutes);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `    setEndDate(date);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `    setEndTime(format(end, "HH:mm"));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `    setAllDay(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `    setLocation("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `    setMeetingUrl("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    setColor("#2563eb");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  }, [open, event, defaultDate]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `  const toIso = (date: string, time: string) => new Date(\`${date}T${time}:00\`).toISOString();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `    if (!title.trim()) return toast.error("Informe o título do compromisso.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 94 | `    if (!startDate || !endDate) return toast.error("Informe a data de início e término.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `    const startsAt = toIso(startDate, allDay ? "00:00" : startTime);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `    const endsAt = toIso(endDate, allDay ? "23:59" : endTime);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `    if (new Date(endsAt) <= new Date(startsAt))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 99 | `      return toast.error("O término deve ser posterior ao início.");` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `      title: title.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `      description: description.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      starts_at: startsAt,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      ends_at: endsAt,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      is_all_day: allDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `      location: location.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `      meeting_url: meetingUrl.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `      color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `      updated_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `      source: event?.source ?? "taskflow",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `      sync_status: "pending",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 115 | `    const table = supabase.from("calendar_events" as any) as any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `    const result = event` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `      ? await table.update(payload).eq("id", event.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `      : await table.insert({ ...payload, created_by: user.id });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `    if (result.error) return toast.error(result.error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 121 | `    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 122 | `    toast.success(event ? "Compromisso atualizado" : "Compromisso criado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `    onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `    await onSaved?.();` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 125 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 126 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 127 | `  const remove = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 128 | `    if (!event || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `    if (!window.confirm(\`Excluir “${event.title}”?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 130 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `    const { error } = await (supabase.from("calendar_events" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 132 | `      .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `        deleted_at: new Date().toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `        deleted_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `        updated_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `        sync_status: "pending",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 141 | `    await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 142 | `    toast.success("Compromisso excluído");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `    onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `    await onSaved?.();` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 145 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 146 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 147 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 148 | `    <Dialog open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `        <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `          <DialogTitle>{event ? "Editar compromisso" : "Novo compromisso"}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 153 | `        <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 154 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `            <Label htmlFor="agenda-title">Título</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 156 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `              id="agenda-title"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `              value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `              onChange={(e) => setTitle(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 160 | `              autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 163 | `          <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 164 | `            <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 165 | `              id="agenda-all-day"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `              checked={allDay}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `              onCheckedChange={(checked) => setAllDay(checked === true)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 168 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `            <Label htmlFor="agenda-all-day" className="cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 170 | `              Dia inteiro` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `            </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 172 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 173 | `          <div className="grid gap-3 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 174 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 175 | `              <Label htmlFor="agenda-start-date">Início</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 176 | `              <div className="grid grid-cols-[minmax(0,1fr)_104px] gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 177 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 178 | `                  id="agenda-start-date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `                  type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `                  value={startDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `                  onChange={(e) => setStartDate(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 182 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `                {!allDay && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 185 | `                    type="time"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `                    value={startTime}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `                    onChange={(e) => setStartTime(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 188 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 192 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `              <Label htmlFor="agenda-end-date">Término</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 194 | `              <div className="grid grid-cols-[minmax(0,1fr)_104px] gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 195 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `                  id="agenda-end-date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `                  type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `                  value={endDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `                  onChange={(e) => setEndDate(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 200 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `                {!allDay && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 203 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 208 | `            <Label htmlFor="agenda-description">Descrição</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 209 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 210 | `              id="agenda-description"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `              value={description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `              onChange={(e) => setDescription(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 213 | `              rows={3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `          <div className="grid gap-3 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `              <Label htmlFor="agenda-location">Local</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 220 | `                id="agenda-location"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `                value={location}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `                onChange={(e) => setLocation(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 223 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 225 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 226 | `              <Label htmlFor="agenda-meeting-url">Link da reunião</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 227 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 228 | `                id="agenda-meeting-url"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `                type="url"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `                placeholder="https://"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `                value={meetingUrl}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `                onChange={(e) => setMeetingUrl(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 233 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 235 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 236 | `          <div className="flex items-center gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `            <Label htmlFor="agenda-color">Cor</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `              id="agenda-color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `              type="color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `              className="h-9 w-14 p-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `              value={color}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `              onChange={(e) => setColor(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 244 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `        <DialogFooter className="mt-6 gap-3 border-t pt-4 sm:justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `          {event ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `              variant="destructive"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `              onClick={() => void remove()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 253 | `              disabled={saving}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `              <Trash2 className="mr-2 h-4 w-4" /> Excluir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `          ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `          <Button type="button" onClick={() => void save()} disabled={saving}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 259 | `            {saving && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `            Salvar compromisso` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `        </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 267 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
