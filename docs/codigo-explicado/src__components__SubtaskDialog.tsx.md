# src/components/SubtaskDialog.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { Loader2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import { useAssignableProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `export interface EditableSubtask {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 29 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  notes: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `interface SubtaskDialogProps {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 40 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  onOpenChange: (open: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 42 | `  taskId: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  /** Ambiente da tarefa dona. A lista de pessoas segue a tarefa, não quem abriu. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 44 | `  workspaceId?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  subtask?: EditableSubtask | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  defaults?: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `    title?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `    dueDate?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `    assigneeId?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 52 | `  onSaved: (subtask: EditableSubtask) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 53 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `const toDateInputValue = (value: string | null | undefined) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `  value ? value.slice(0, 10) : "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `const dueDateToIso = (value: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  value ? new Date(\`${value}T12:00:00\`).toISOString() : null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 61 | `const formatCompletionDate = (value: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  new Intl.DateTimeFormat("pt-BR", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `    day: "2-digit",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `    month: "2-digit",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `    year: "numeric",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    hour: "2-digit",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `    minute: "2-digit",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  }).format(new Date(value));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `export function SubtaskDialog({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 71 | `  open,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  taskId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `  workspaceId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  subtask,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  position,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  defaults,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  onSaved,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `}: SubtaskDialogProps) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `  const { data: assignableProfiles = [] } = useAssignableProfiles(workspaceId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `  const [title, setTitle] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `  const [dueDate, setDueDate] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 85 | `  const [assigneeId, setAssigneeId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `  const [notes, setNotes] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 87 | `  const [dueDateReason, setDueDateReason] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `  const [done, setDone] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `  const defaultTitle = defaults?.title ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `  const defaultDueDate = defaults?.dueDate ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `  const defaultAssigneeId = defaults?.assigneeId ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 95 | `    if (!open) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `    setTitle(subtask?.title ?? defaultTitle);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `    setDueDate(toDateInputValue(subtask?.due_date) || defaultDueDate);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `    setAssigneeId(subtask?.assignee_id ?? defaultAssigneeId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `    setNotes(subtask?.notes ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `    setDueDateReason("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `    setDone(subtask?.done ?? false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `  }, [open, subtask, defaultTitle, defaultDueDate, defaultAssigneeId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `  const dueDateChanged =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `    Boolean(subtask?.due_date) && dueDate !== toDateInputValue(subtask?.due_date);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 107 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `    if (!taskId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 109 | `      toast.error("Salve a tarefa antes de criar uma subtarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 111 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 112 | `    if (!title.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 113 | `      toast.error("Informe o título da subtarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 115 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `    if (dueDateChanged && !dueDateReason.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 117 | `      toast.error("Informe a justificativa para alterar o prazo da subtarefa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 119 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 123 | `      title: title.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `      due_date: dueDateToIso(dueDate),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `      assignee_id: assigneeId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `      notes: notes.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `      done,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 130 | `    const request = subtask` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `      ? (supabase.from("subtasks") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 132 | `          .update(payload)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `          .eq("id", subtask.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `          .select("id, title, done, position, due_date, assignee_id, notes, completed_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `          .single()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `      : (supabase.from("subtasks") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 137 | `          .insert({ ...payload, task_id: taskId, position })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `          .select("id, title, done, position, due_date, assignee_id, notes, completed_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `          .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    const { data, error } = await request;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 141 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 143 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 144 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 146 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 147 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 148 | `    onSaved(data as EditableSubtask);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `    if (subtask && dueDateChanged && user) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 150 | `      const { error: historyError } = await supabase.from("subtask_due_date_changes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 151 | `        subtask_id: subtask.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `        old_due_date: subtask.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `        new_due_date: payload.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `        reason: dueDateReason.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `        user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 157 | `      if (historyError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 158 | `        toast.warning("Prazo atualizado, mas não foi possível registrar a justificativa.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 160 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 161 | `    await Promise.all([` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 162 | `      qc.invalidateQueries({ queryKey: ["tasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `      qc.invalidateQueries({ queryKey: ["subtasks"] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `    toast.success(subtask ? "Subtarefa atualizada" : "Subtarefa criada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `    onOpenChange(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 168 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 169 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 170 | `    <Dialog open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 171 | `      <DialogContent className="max-w-2xl gap-5 p-6 sm:rounded-2xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 172 | `        <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 173 | `          <DialogTitle>{subtask ? "Editar subtarefa" : "Nova subtarefa"}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 174 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 175 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 176 | `        <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 177 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 178 | `            <Label htmlFor="subtask-title">Título *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 180 | `              id="subtask-title"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `              value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `              onChange={(event) => setTitle(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 183 | `              placeholder="Descreva a subtarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `              autoFocus` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 188 | `          <div className="grid gap-4 rounded-xl border bg-muted/20 p-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 189 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 190 | `              <Label>Responsável</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `              <Select value={assigneeId || "none"} onValueChange={(value) => setAssigneeId(value === "none" ? "" : value)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 192 | `                <SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `                  <SelectValue placeholder="Sem responsável" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 194 | `                </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 195 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `                  <SelectItem value="none">Sem responsável</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 197 | `                  {assignableProfiles.map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 198 | `                    <SelectItem key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 199 | `                      {profile.full_name || profile.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `                    </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `              <Label htmlFor="subtask-due-date">Prazo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 208 | `                id="subtask-due-date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `                type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `                value={dueDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `                onChange={(event) => setDueDate(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 212 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `            {dueDateChanged && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `              <div className="space-y-2 sm:col-span-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `                <Label htmlFor="subtask-due-date-reason">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `                  Justificativa da alteração de prazo *` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `                </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `                <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 220 | `                  id="subtask-due-date-reason"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `                  value={dueDateReason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `                  onChange={(event) => setDueDateReason(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 223 | `                  placeholder="Explique o motivo da alteração"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `                  rows={3}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 227 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `            {subtask && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `              <label className="flex items-center gap-2 text-sm sm:col-span-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `                <Checkbox checked={done} onCheckedChange={(value) => setDone(value === true)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 231 | `                Concluída` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `                {subtask.done && subtask.completed_at ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `                  <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `                    em {formatCompletionDate(subtask.completed_at)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 236 | `                ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 241 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `            <Label htmlFor="subtask-notes">Descrição</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 243 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 244 | `              id="subtask-notes"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `              value={notes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `              onChange={(event) => setNotes(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 247 | `              placeholder="Descreva a subtarefa..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `              rows={6}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 253 | `        <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `            Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `          <Button onClick={save} disabled={saving}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `            {saving ? "Salvando..." : "Salvar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `        </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 265 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
