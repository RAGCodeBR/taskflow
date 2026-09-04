# src/routes/_app/users.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, Link, Navigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useClients, useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  DialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  DialogTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { canManageMarketingAccess } from "@/lib/environment-access";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `  Archive,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  ShieldCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  User as UserIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  UserCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  UserX,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `export const Route = createFileRoute("/_app/users")({ component: UsersPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `const ACCESS_OPTIONS = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `  ["dashboard", "Dashboard"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  ["tasks", "Minhas tarefas"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  ["obligations", "Obrigações"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  ["requests", "Solicitações"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  ["import_ata", "Importar ata"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  ["clients", "Clientes"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  ["reports", "Relatórios"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  ["mural", "Mural"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  ["agenda", "Agenda"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  ["portal_entregas", "Calendário de entregas"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  ["portal_financeiro", "Financeiro"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  ["trash", "Lixeira"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  ["settings", "Personalizar"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `] as const;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `type Role = "admin" | "collaborator" | "client";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 55 | `type FormState = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 56 | `  fullName: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  email: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  password: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  role: Role;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  permissions: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  clientId: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  marketingAccess: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 64 | `const defaults: FormState = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  fullName: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  email: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  password: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  role: "collaborator",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  permissions: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `    "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `    "requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `    "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `    "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `    "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `    "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `    "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `    "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `    "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `    "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `  ],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  clientId: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  marketingAccess: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 86 | `const roleLabel: Record<Role, string> = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 87 | `  admin: "Administrador",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  collaborator: "Colaboradores",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  client: "Cliente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 92 | `function AccessForm({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 93 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  includeCredentials = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  marketingOnly = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  value: FormState;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  onChange: (next: FormState) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 100 | `  includeCredentials?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `  marketingOnly?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 104 | `  const toggle = (permission: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `    onChange({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      ...value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      permissions: value.permissions.includes(permission)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `        ? value.permissions.filter((item) => item !== permission)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 109 | `        : [...value.permissions, permission],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 111 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 112 | `    <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 113 | `      {includeCredentials && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `        <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 115 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 116 | `            <Label>Nome completo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 117 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 118 | `              value={value.fullName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `              onChange={(e) => onChange({ ...value, fullName: e.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 120 | `              required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 123 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 124 | `            <Label>Login (e-mail)</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 125 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `              type="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `              value={value.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `              onChange={(e) => onChange({ ...value, email: e.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 129 | `              required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 132 | `        </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 135 | `        <Label>Categoria</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `        <select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 137 | `          className="h-10 w-full rounded-md border bg-background px-3 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 138 | `          value={value.role}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `          disabled={marketingOnly}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `          onChange={(e) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 141 | `            onChange({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `              ...value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `              role: e.target.value as Role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `              permissions:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `                e.target.value === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `                  ? ["portal_entregas", "portal_financeiro"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `                  : value.permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `              marketingAccess: e.target.value === "client" ? false : value.marketingAccess,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 151 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `          <option value="collaborator">Colaborador</option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 153 | `          {!marketingOnly && <option value="client">Cliente</option>}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `          {!marketingOnly && <option value="admin">Administrador</option>}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `        </select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 156 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `      {includeCredentials && !marketingOnly && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `        <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 159 | `          <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `            <span className="block text-sm font-medium">Liberar ambiente Marketing</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 161 | `            <span className="mt-0.5 block text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 162 | `              {value.role === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `                ? "Contas de cliente permanecem vinculadas à Consultoria."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `                : "O novo usuário entra somente no Marketing, sem acesso à Consultoria."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 166 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `          <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 168 | `            className="mt-0.5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 169 | `            checked={value.marketingAccess}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `            disabled={value.role === "client"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `            onCheckedChange={(checked) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 172 | `              onChange({ ...value, marketingAccess: checked === true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `            }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 174 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 176 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `      {value.role === "client" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `        <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `          <Label>Cliente vinculado</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 180 | `          <select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 181 | `            required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `            className="h-10 w-full rounded-md border bg-background px-3 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 183 | `            value={value.clientId}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `            onChange={(e) => onChange({ ...value, clientId: e.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 185 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `            <option value="">Selecione o cliente</option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 187 | `            {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 188 | `              <option key={client.id} value={client.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 189 | `                {client.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `              </option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `          </select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `          <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 194 | `            Este usuário verá somente as tarefas e faturas deste cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 196 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 197 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 199 | `        <Label>Acessos do sistema</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `        <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `          Administradores possuem acesso completo automaticamente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `        <div className="grid grid-cols-2 gap-2 rounded-md border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `          {ACCESS_OPTIONS.map(([key, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 205 | `            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `              <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `                checked={value.role === "admin" || value.permissions.includes(key)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `                disabled={value.role === "admin"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `                onCheckedChange={() => toggle(key)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 210 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `              {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `            </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 215 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 218 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 219 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 220 | `function UserDetailsForm({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 221 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `  onChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `  value: FormState;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `  onChange: (next: FormState) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 226 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 228 | `    <div className="space-y-4 border-b pb-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 229 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `        <Label>Nome completo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 231 | `        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `          value={value.fullName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `          onChange={(event) => onChange({ ...value, fullName: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 234 | `          required` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `      <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 238 | `        <Label>Nova senha</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `          type="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `          minLength={6}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `          value={value.password}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `          onChange={(event) => onChange({ ...value, password: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 244 | `          placeholder="Deixe em branco para manter a senha atual"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `        <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `          A nova senha deve ter ao menos 6 caracteres.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 249 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 253 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 254 | `function UsersPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `  const { isAdmin, user, loading, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 256 | `  const inMarketing = activeWorkspace?.slug === "marketing";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 257 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 258 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 259 | `  const { data: profileEmails = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 260 | `    queryKey: ["admin_profile_emails"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 262 | `      const { data, error } = await supabase.rpc("admin_get_profile_emails");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 263 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 264 | `      return data ?? [];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 265 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 267 | `  const [createOpen, setCreateOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 268 | `  const [editing, setEditing] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 269 | `  const [form, setForm] = useState<FormState>(defaults);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 270 | `  const { data: roles = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 271 | `    queryKey: ["roles"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `    queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? [],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 273 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 274 | `  const { data: clientLinks = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 275 | `    queryKey: ["client_user_links"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `    queryFn: async () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 277 | `      ((await (supabase.from("client_user_links" as any) as any).select("user_id, client_id"))` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 278 | `        .data ?? []) as { user_id: string; client_id: string }[],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 280 | `  const { data: permissionRows = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 281 | `    queryKey: ["user_permissions"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `    queryFn: async () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 283 | `      ((await (supabase.from("user_permissions") as any).select("user_id, permissions")).data ??` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 284 | `        []) as { user_id: string; permissions: string[] }[],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 286 | `  const { data: workspaceRows = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 287 | `    queryKey: ["workspaces_for_access"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `    queryFn: async () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 289 | `      ((await (supabase.from("workspaces") as any).select("id, slug, name")).data ?? []) as Array<{` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 290 | `        id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `        slug: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `        name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `      }>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 295 | `  const marketingWorkspace = workspaceRows.find((workspace) => workspace.slug === "marketing");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 296 | `  const { data: marketingMembers = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 297 | `    queryKey: ["marketing_members", marketingWorkspace?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `    enabled: !!marketingWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `    queryFn: async () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 300 | `      ((await (supabase.from("workspace_memberships") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 301 | `        .select("user_id, access_grant")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `        .eq("workspace_id", marketingWorkspace!.id)).data ?? []) as Array<{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `        user_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `        access_grant: "manual" | "admin_policy";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `      }>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 307 | `  const { data: currentWorkspaceMembers = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 308 | `    queryKey: ["current_workspace_members", activeWorkspace?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `    enabled: !!activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `    queryFn: async () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 311 | `      ((await (supabase.from("workspace_memberships") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 312 | `        .select("user_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `        .eq("workspace_id", activeWorkspace!.id)).data ?? []) as Array<{ user_id: string }>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 315 | `  const invokeAccessManager = async (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 316 | `    action: "create" | "update" | "delete",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `    data: Record<string, unknown>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `  ) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 319 | `    const { data: result, error } = await supabase.functions.invoke("admin-user-access", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 320 | `      body: { action, data: { ...data, workspaceSlug: activeWorkspace?.slug } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 322 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 323 | `      const details = await error.context` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 324 | `        ?.clone()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `        .json()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `        .catch(() => null);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 327 | `      const message = details?.error ?? error.message;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 328 | `      throw new Error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `        typeof message === "string"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `          ? message` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `          : "Não foi possível processar a solicitação. Verifique a configuração de convites.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 333 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 334 | `    if (result?.error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 335 | `      throw new Error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `        typeof result.error === "string"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `          ? result.error` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `          : "Não foi possível processar a solicitação. Verifique a configuração de convites.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 340 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 341 | `    return result;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 342 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 343 | `  const refresh = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 344 | `    qc.invalidateQueries({ queryKey: ["profiles"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `    qc.invalidateQueries({ queryKey: ["roles"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `    qc.invalidateQueries({ queryKey: ["user_permissions"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `    qc.invalidateQueries({ queryKey: ["client_user_links"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `    qc.invalidateQueries({ queryKey: ["marketing_members"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `    qc.invalidateQueries({ queryKey: ["current_workspace_members"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 351 | `  const createMutation = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `    mutationFn: () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 353 | `      invokeAccessManager(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `        "create",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `        inMarketing ? { ...form, role: "collaborator", marketingAccess: true } : form,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 358 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `      setCreateOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `      setForm(defaults);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 361 | `      toast.success("Convite enviado com sucesso.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 362 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 363 | `    onError: (e: any) => toast.error(e?.message ?? "Erro ao criar acesso"),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 364 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 365 | `  const updateMutation = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 366 | `    mutationFn: () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 367 | `      invokeAccessManager("update", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `        userId: editing!,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `        fullName: form.fullName,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `        password: form.password || undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `        role: form.role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 372 | `        permissions: form.permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `        clientId: form.clientId || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 376 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `      setEditing(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `      toast.success("Acessos atualizados.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 380 | `    onError: (e: any) => toast.error(e?.message ?? "Erro ao atualizar acessos"),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 381 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 382 | `  const refreshMarketingAccess = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 383 | `    qc.invalidateQueries({ queryKey: ["marketing_members"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `    qc.invalidateQueries({ queryKey: ["current_workspace_members"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 386 | `  const setMarketingAccess = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 387 | `    mutationFn: async ({ userId, enabled }: { userId: string; enabled: boolean }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `      const { error } = await (supabase as any).rpc("set_marketing_user_access", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 389 | `        target_user_id: userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `        enabled,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 392 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 393 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 394 | `    onSuccess: (_data, variables) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 395 | `      refreshMarketingAccess();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `      toast.success(variables.enabled ? "Marketing liberado para este usuário." : "Marketing removido deste usuário.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 398 | `    onError: (error: any) => toast.error(error?.message ?? "Não foi possível atualizar o acesso ao Marketing."),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 399 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 400 | `  const setActive = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 401 | `    mutationFn: async ({ userId, active }: { userId: string; active: boolean }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 402 | `      const { error } = await (supabase.from("profiles") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 403 | `        .update({ is_active: active })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `        .eq("id", userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 406 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 407 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 408 | `      qc.invalidateQueries({ queryKey: ["profiles"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `      toast.success("Status atualizado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 411 | `    onError: (e: any) => toast.error(e.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 412 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 413 | `  const deleteAccess = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 414 | `    mutationFn: (userId: string) => invokeAccessManager("delete", { userId }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 415 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 416 | `      refresh();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `      toast.success("Acesso excluído permanentemente.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 419 | `    onError: (e: any) => toast.error(e?.message ?? "Não foi possível excluir o acesso."),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 420 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 421 | `  const profilesWithEmails = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 422 | `    const emailsById = new Map(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 423 | `      profileEmails.map((item: { id: string; email: string | null }) => [item.id, item.email]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 424 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 425 | `    return profiles.map((profile) => ({ ...profile, email: emailsById.get(profile.id) ?? null }));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 426 | `  }, [profiles, profileEmails]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `  const workspaceMemberIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 428 | `    () => new Set(currentWorkspaceMembers.map((member) => member.user_id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 429 | `    [currentWorkspaceMembers],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 430 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 431 | `  const activeProfiles = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 432 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 433 | `      profilesWithEmails.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `        (p) => workspaceMemberIds.has(p.id) && (p as any).is_active !== false,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 435 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `    [profilesWithEmails, workspaceMemberIds],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 438 | `  const inactiveProfiles = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 439 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 440 | `      profilesWithEmails.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `        (p) => workspaceMemberIds.has(p.id) && (p as any).is_active === false,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 442 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `    [profilesWithEmails, workspaceMemberIds],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 445 | `  const activeProfilesByRole = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 446 | `    const byRole: Record<Role, any[]> = { admin: [], collaborator: [], client: [] };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 447 | `    for (const profile of activeProfiles) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 448 | `      const role = (roles.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 449 | `        (item: { user_id: string; role: Role }) => item.user_id === profile.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 450 | `      )?.role ?? "collaborator") as Role;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `      byRole[role].push(profile);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 452 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 453 | `    return (Object.keys(byRole) as Role[]).map((role) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 454 | `      role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `      label: roleLabel[role],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `      profiles: byRole[role].sort((a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 457 | `        (a.full_name || a.email || "").localeCompare(b.full_name || b.email || "", "pt-BR", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `          sensitivity: "base",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 461 | `    }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `  }, [activeProfiles, roles]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `  const openEdit = (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 464 | `    const profile = profiles.find((item) => item.id === id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `    const role = (roles.find((r: { user_id: string; role: string }) => r.user_id === id)?.role ??` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 466 | `      "collaborator") as Role;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `    setForm({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `      ...defaults,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `      fullName: profile?.full_name ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `      role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `      permissions: permissionRows.find((p) => p.user_id === id)?.permissions ?? [],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 472 | `      clientId: clientLinks.find((link) => link.user_id === id)?.client_id ?? "",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 473 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 474 | `    setEditing(id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 476 | `  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 477 | `  if (!isAdmin) return <Navigate to="/mural" />;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 478 | `  const isMarketingManager = canManageMarketingAccess(user?.email);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 479 | `  const renderProfile = (p: any) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 480 | `    const role = (roles.find((r: { user_id: string; role: string }) => r.user_id === p.id)?.role ??` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 481 | `      "collaborator") as Role;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `    const self = p.id === user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 483 | `    const marketingMembership = marketingMembers.find((member) => member.user_id === p.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 484 | `    const canManageMarketing = role === "admin" || role === "collaborator";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 485 | `    const canToggleMarketing = inMarketing && role === "collaborator";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 486 | `    const canEditUser = isMarketingManager || (inMarketing && role === "collaborator");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 487 | `    const canDeactivateUser = isMarketingManager;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 488 | `    const canDeleteUser = isMarketingManager || (inMarketing && role === "collaborator");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 489 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 490 | `      <Card key={p.id} className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `        <div className="flex items-center gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `          <Avatar className="h-12 w-12">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `            <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `              src={p.avatar_url || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `              alt={p.full_name || p.email || "Usuário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `            <AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `              {(p.full_name || p.email || "?").slice(0, 2).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `            </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `          </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `          <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `            <h3 className="truncate font-semibold">{p.full_name || "Sem nome"}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `            <p className="truncate text-xs text-muted-foreground">{p.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 505 | `          {role === "admin" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `            <ShieldCheck className="h-4 w-4 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 507 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `            <UserIcon className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 509 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 511 | `        <div className="mt-3 flex gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `          <Badge variant={role === "admin" ? "default" : "secondary"}>{roleLabel[role]}</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `          {self && <Badge variant="outline">Você</Badge>}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `        {inMarketing && canManageMarketing && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `          <div className="mt-3 rounded-xl border bg-muted/20 px-3 py-2.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 517 | `            <div className="flex items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 518 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 519 | `                <p className="text-sm font-medium">Ambiente Marketing</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 520 | `                <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 521 | `                  {role === "admin"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `                    ? "Acesso administrativo obrigatório"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `                    : marketingMembership` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `                      ? "Colaborador próprio do Marketing"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `                      : "Sem acesso a este ambiente"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 527 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 528 | `              {canToggleMarketing ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 530 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `                  variant={marketingMembership ? "outline" : "default"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 532 | `                  disabled={setMarketingAccess.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `                  onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 534 | `                    setMarketingAccess.mutate({ userId: p.id, enabled: !marketingMembership })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 536 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `                  {marketingMembership ? "Remover" : "Liberar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 539 | `              ) : role === "admin" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `                <Badge variant="secondary">Administrador</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 541 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `                <Badge variant="secondary">Gerenciado</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 543 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 545 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 546 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 547 | `        <div className="mt-3 border-t pt-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 548 | `          {canEditUser ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `            <Button size="sm" variant="outline" className="w-full" onClick={() => openEdit(p.id)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 550 | `              Definir categoria e acessos` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 552 | `          ) : self ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `            <Button asChild size="sm" variant="outline" className="w-full">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 554 | `              <Link to="/settings">Editar meu perfil</Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 555 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 556 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 557 | `            <p className="text-center text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 558 | `              Acessos são gerenciados pelo responsável.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `          {!self && canDeactivateUser && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `            <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 563 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 564 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 565 | `                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `                className="mt-2 w-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 567 | `                onClick={() => setActive.mutate({ userId: p.id, active: false })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 568 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `                <UserX className="mr-1 h-3 w-3" /> Desativar acesso` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 570 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `            </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `          {!self && canDeleteUser && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 575 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `                variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `                className="mt-2 w-full text-destructive hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `                disabled={deleteAccess.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `                onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 580 | `                  if (confirm(\`Excluir permanentemente o acesso de "${p.full_name || p.email}"?\`)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 581 | `                    deleteAccess.mutate(p.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 582 | `                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 583 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `                <Trash2 className="mr-1 h-3 w-3" /> Excluir acesso` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 587 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 588 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 589 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 590 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 591 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 592 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 593 | `    <div className="space-y-6 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `      <header className="flex flex-wrap items-start justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 595 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 596 | `          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 597 | `          <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 598 | `            Crie logins e defina os acessos de cada usuário.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `        {(isMarketingManager || inMarketing) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 602 | `          <Dialog open={createOpen} onOpenChange={setCreateOpen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 603 | `            <DialogTrigger asChild>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 604 | `              <Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 605 | `                <Plus className="mr-2 h-4 w-4" /> Novo usuário` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 606 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 607 | `            </DialogTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 608 | `            <DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 609 | `              <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `                <DialogTitle>Criar acesso</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 611 | `                <DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `                  O usuário receberá um convite por e-mail para criar a própria senha e ativar o` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `                  acesso.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `                </DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 615 | `              </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 616 | `              <AccessForm` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 617 | `                value={inMarketing ? { ...form, role: "collaborator", marketingAccess: true } : form}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `                onChange={setForm}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `                includeCredentials` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `                marketingOnly={inMarketing}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `              <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `                <Button disabled={createMutation.isPending} onClick={() => createMutation.mutate()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 624 | `                  {createMutation.isPending ? "Enviando…" : "Enviar convite"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 625 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `              </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `            </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `          </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 629 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 630 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `      <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 632 | `        {activeProfilesByRole.map(({ role, label, profiles: roleProfiles }) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 633 | `          <Collapsible key={role} defaultOpen={false}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 634 | `            <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-lg border bg-card px-4 py-3 text-left transition hover:bg-muted/50">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 635 | `              {role === "admin" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `                <ShieldCheck className="h-4 w-4 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 637 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `                <UserIcon className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 639 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `              <span className="flex-1 font-semibold">{label}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 641 | `              <Badge variant="secondary">{roleProfiles.length}</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `            </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 644 | `            <CollapsibleContent className="pt-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `              {roleProfiles.length > 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 647 | `                  {roleProfiles.map(renderProfile)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 648 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 649 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 650 | `                <p className="rounded-lg border border-dashed px-4 py-5 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 651 | `                  Nenhum usuário nesta categoria.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 653 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `            </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 655 | `          </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 656 | `        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 658 | `      {isMarketingManager && inactiveProfiles.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 661 | `            <Archive className="h-4 w-4" /> Desativados ({inactiveProfiles.length})` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `          </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 663 | `          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 664 | `            {inactiveProfiles.map((p: any) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 665 | `              <Card key={p.id} className="border-dashed p-4 opacity-75">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 666 | `                <p className="font-medium">{p.full_name || p.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `                <p className="mt-1 truncate text-xs text-muted-foreground">{p.email}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 668 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `                  className="mt-3 w-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `                  variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 672 | `                  onClick={() => setActive.mutate({ userId: p.id, active: true })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 673 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 674 | `                  <UserCheck className="mr-1 h-3 w-3" /> Reativar acesso` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 676 | `              </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 677 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 679 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 680 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 682 | `        <DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 683 | `          <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `            <DialogTitle>Definir acessos</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 685 | `            <DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 686 | `              Escolha a categoria e as áreas disponíveis no menu para este usuário.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `            </DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 688 | `          </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `          <UserDetailsForm value={form} onChange={setForm} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 690 | `          <AccessForm value={form} onChange={setForm} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 691 | `          <DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 692 | `            <Button disabled={updateMutation.isPending} onClick={() => updateMutation.mutate()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 693 | `              {updateMutation.isPending ? "Salvando…" : "Salvar acessos"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 694 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 695 | `          </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 696 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 697 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 698 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 699 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 700 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 701 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
