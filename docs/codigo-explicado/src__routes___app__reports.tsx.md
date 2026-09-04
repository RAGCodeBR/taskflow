# src/routes/_app/reports.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, Navigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQuery } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { useProfiles, useClients, useTaskStatuses } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { useWorkspaceTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  DialogDescription,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `  BarChart,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  Bar,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  XAxis,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  YAxis,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  CartesianGrid,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  Tooltip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  ResponsiveContainer,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  Legend,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `} from "recharts";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `  CheckCircle2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  ListTodo,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  AlertTriangle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  Clock,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  ShieldCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  User as UserIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  ListChecks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  Flame,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  ShieldAlert,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  Swords,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  Trophy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  Crown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  Activity,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  CalendarRange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  RotateCcw,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  TrendingUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  UsersRound,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  Gauge,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `  ArrowDownUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `  TicketCheck,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  Timer,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  Sparkles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  Target,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 63 | `  endOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  endOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  format,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  isAfter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  isBefore,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  isWithinInterval,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  parseISO,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  startOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  startOfMonth,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  subDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  subMonths,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `} from "date-fns";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `export const Route = createFileRoute("/_app/reports")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 78 | `  component: ReportsPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 81 | `function Kpi({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 82 | `  label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  icon: Icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  value: number | string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  icon: typeof Clock;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 93 | `    <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 94 | `      <div className="flex items-center justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 95 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 96 | `          <p className="text-xs text-muted-foreground">{label}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 97 | `          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 98 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 99 | `        <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 100 | `          className="grid h-10 w-10 place-items-center rounded-lg"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 101 | `          style={{ background: \`${color}20\`, color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `          <Icon className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 104 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 105 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 106 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 107 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `type ClientPerformance = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 111 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  people: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `  total: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `  done: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `  pending: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  overdue: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `  unassigned: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  onTimeRate: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `  score: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `  strongPoint: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `  blocker: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `  contributors: Array<{ name: string; done: number; pending: number; overdue: number }>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 125 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 126 | `const battleColors = ["#167c80", "#2d5c91", "#53739e", "#7a91ad", "#a4b3c5", "#c6d1de"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 127 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 128 | `const currentMonthPeriod = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 129 | `  const today = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 130 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 131 | `    start: format(startOfMonth(today), "yyyy-MM-dd"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `    end: format(endOfMonth(today), "yyyy-MM-dd"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 134 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 135 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 136 | `const previousMonthPeriod = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 137 | `  const previousMonth = subMonths(new Date(), 1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 138 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 139 | `    start: format(startOfMonth(previousMonth), "yyyy-MM-dd"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    end: format(endOfMonth(previousMonth), "yyyy-MM-dd"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 142 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 143 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 144 | `const dateIsInPeriod = (value: string | null | undefined, start: Date, end: Date) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 145 | `  Boolean(value && isWithinInterval(parseISO(value), { start, end }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 147 | `const formatReportDate = (value: string | null | undefined) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `  value ? format(parseISO(value), "dd/MM/yyyy", { locale: ptBR }) : "Sem prazo";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 150 | `const completedAfterDueDate = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 151 | `  completedAt: string | null | undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `  dueDate: string | null | undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `) => Boolean(completedAt && dueDate && isAfter(parseISO(completedAt), endOfDay(parseISO(dueDate))));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 154 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 155 | `function TeamRankingPanel({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 156 | `  members,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `  onViewLateTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `  members: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `  onViewLateTasks: (member: any) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 161 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `  const ranked = members` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 163 | `    .filter((member) => member.done > 0 || member.lateCount > 0)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 164 | `    .sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 165 | `      return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 166 | `        b.deliveryBalance - a.deliveryBalance ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `        b.onTime - a.onTime ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `        b.done - a.done ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `        a.lateCount - b.lateCount ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `        a.fullName.localeCompare(b.fullName, "pt-BR")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 172 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 173 | `  const maxOnTime = Math.max(...ranked.map((member) => member.onTime), 1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 174 | `  const podiumColors = ["#f59e0b", "#94a3b8", "#b87333"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `  const podiumBackgrounds = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `    "border-amber-300 bg-amber-50/80 dark:bg-amber-950/15",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `    "border-slate-300 bg-slate-50/70 dark:bg-slate-900/25",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `    "border-orange-300 bg-orange-50/70 dark:bg-orange-950/15",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `  ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 181 | `  if (!ranked.length)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 182 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 183 | `      <Card className="p-5 text-sm text-muted-foreground">Nenhum colaborador no filtro atual.</Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 184 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 185 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 186 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 187 | `    <div className="grid gap-4 xl:grid-cols-[minmax(19rem,0.8fr)_minmax(0,1.6fr)]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 188 | `      <Card className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 189 | `        <div className="flex items-center gap-2 border-b px-5 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 190 | `          <Crown className="h-5 w-5 text-[#f59e0b]" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 191 | `          <h2 className="text-xl font-semibold">Pódio da performance</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 192 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `        <div className="space-y-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 194 | `          {ranked.slice(0, 3).map((member, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 195 | `            const Medal = index === 0 ? Crown : Trophy;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `            return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 197 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 198 | `                key={member.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `                className={\`rounded-[1.35rem] border p-5 ${podiumBackgrounds[index]}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 202 | `                  <Avatar className="h-20 w-20 border-4 border-background shadow-md">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `                    <AvatarImage src={member.avatarUrl || undefined} alt={member.fullName} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 204 | `                    <AvatarFallback className="text-lg">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `                      {member.fullName.slice(0, 2).toUpperCase()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `                    </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `                  </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 208 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 209 | `                    <p className="flex items-center gap-2 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 210 | `                      <Medal className="h-5 w-5" style={{ color: podiumColors[index] }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `                      {index + 1}º lugar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 213 | `                    <p className="truncate text-xl font-bold">{member.fullName}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `                    <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 215 | `                      {member.done} entregas · {member.onTime} no prazo · {member.lateCount} fora do` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `                      prazo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `                  <div className="text-right">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 220 | `                    <p className="text-2xl font-bold tabular-nums">{member.done}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 221 | `                    <p className="text-sm text-muted-foreground">entregas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 222 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 223 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 224 | `                <div className="mt-4 border-t pt-4 text-sm leading-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 225 | `                  <p className="text-emerald-600">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 226 | `                    <span className="font-semibold">Por que está no pódio:</span> {member.done}{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 227 | `                    entregas concluídas, com {member.onTime} entregue(s) no prazo.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 229 | `                  <p className="mt-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 230 | `                    <span className="font-semibold">Ponto a evoluir:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 231 | `                    {member.lateCount ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `                      <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 233 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `                          onClick={() => onViewLateTasks(member)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `                          className="font-medium underline decoration-dotted underline-offset-4 hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `                          {member.lateCount} tarefa(s) fora do prazo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `                        </button>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `                        descontam posição.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `                      </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `                    ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `                      "manter as entregas no prazo."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 249 | `          })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 253 | `      <Card className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `        <div className="flex items-center gap-2 border-b px-5 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `          <Activity className="h-5 w-5 text-[#167c80]" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `            <h2 className="text-xl font-semibold">Ranking completo — equipe</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `            <p className="mt-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `              Entregas no prazo e concluídas fazem subir; cada item fora do prazo desconta posição.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `        <div className="space-y-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `          {ranked.map((member, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `            return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 266 | `              <div key={member.id} className="rounded-lg border p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 267 | `                <div className="grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 268 | `                  <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `                    {index + 1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 271 | `                  <Avatar className="h-12 w-12 border shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 272 | `                    <AvatarImage src={member.avatarUrl || undefined} alt={member.fullName} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `                    <AvatarFallback>{member.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `                  </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 275 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 276 | `                    <div className="flex items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 277 | `                      <p className="truncate font-semibold">{member.fullName}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 278 | `                      <span className="rounded-full bg-muted px-2.5 py-1 text-sm font-bold tabular-nums">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 279 | `                        {member.done} entregas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 281 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 282 | `                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `                      <span>Entregas concluídas no prazo</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 284 | `                      <span className="tabular-nums">{member.onTime}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 285 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 286 | `                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 287 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 288 | `                        className="h-full rounded-full bg-[#167c80]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 289 | `                        style={{ width: \`${(member.onTime / maxOnTime) * 100}%\` }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 292 | `                    <p className="mt-2 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 293 | `                      <span className="text-emerald-600">{member.done} concluídas</span> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 294 | `                      <span>{member.onTime} no prazo</span> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 295 | `                      {member.lateCount ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 297 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `                          onClick={() => onViewLateTasks(member)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 299 | `                          className="underline decoration-dotted underline-offset-4 hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 300 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `                          {member.lateCount} fora do prazo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `                        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 303 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `                        "0 fora do prazo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 307 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 308 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 309 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 310 | `            );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 311 | `          })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 313 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 314 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 315 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 316 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 317 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 318 | `function LateTasksDialog({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 319 | `  member,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `  open,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `  onOpenChange,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `  member: any | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `  onOpenChange: (open: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 326 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `  const lateTasks = member?.lateTasks ?? [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 328 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 329 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 330 | `    <Dialog open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 331 | `      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `        <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 333 | `          <DialogTitle>Cards fora do prazo — {member?.fullName}</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 334 | `          <DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `            O prazo final é sempre o vigente no card. Alterações justificadas aparecem abaixo.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `          </DialogDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `        </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 338 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 339 | `        <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `          {lateTasks.map((task: any) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 341 | `            <article key={task.id} className="rounded-2xl border p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `              <div className="flex flex-wrap items-start justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 343 | `                <p className="font-semibold">{task.title}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `                <Badge variant="outline">{task.kind}</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 345 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 346 | `              <div className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 348 | `                  Prazo final:{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `                  <span className="font-medium text-foreground">{task.dueDateLabel}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `                  {task.completedAtLabel ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `                    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `                      Concluída:{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 355 | `                      <span className="font-medium text-foreground">{task.completedAtLabel}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `                    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `                  ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `                    "Ainda em aberto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 361 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 362 | `              {task.deadlineChange && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 363 | `                <div className="mt-3 rounded-xl bg-muted/70 p-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `                  <p className="font-medium">Prazo reprogramado</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `                  <p className="mt-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `                    {task.deadlineChange.oldDueDateLabel} → {task.deadlineChange.newDueDateLabel}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 368 | `                  {task.deadlineChange.reason && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `                    <p className="mt-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 370 | `                      Justificativa: {task.deadlineChange.reason}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `            </article>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `      </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `    </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 381 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 382 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 383 | `function ClientBattlePanel({ clients }: { clients: ClientPerformance[] }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 384 | `  if (clients.length === 0) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 385 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 386 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 387 | `    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 388 | `      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 389 | `        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 390 | `          <Swords className="h-5 w-5 text-[#167c80]" /> Desempenho por cliente` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 391 | `        </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 392 | `        <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 393 | `          Score composto de entregas, prazo e pendências — evita que só o volume distorça a leitura.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 395 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 396 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 397 | `      <div className="divide-y px-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 398 | `        {clients.map((client, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 399 | `          const color = battleColors[index] ?? "#c6d1de";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 400 | `          return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 401 | `            <article key={client.id} className="py-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 403 | `                <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 404 | `                  {index === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `                    <Trophy className="h-5 w-5 text-[#f59e0b]" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 406 | `                  ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `                    <span className="grid h-5 w-5 place-items-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 408 | `                      {index + 1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 410 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 411 | `                  <h3 className="text-lg font-semibold">{client.name}</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 412 | `                  <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 413 | `                    {client.people} {client.people === 1 ? "pessoa" : "pessoas"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `                <div className="flex items-center gap-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 417 | `                  <span className="font-medium text-[#167c80]">{client.onTimeRate}% no prazo</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `                  <span className="text-lg font-bold tabular-nums">{client.score}/100</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 419 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 420 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `              <div className="h-5 overflow-hidden rounded-full bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `                  className="h-full rounded-full transition-[width]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 424 | `                  style={{ width: \`${Math.max(client.score, 1)}%\`, backgroundColor: color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 426 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 427 | `              <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 428 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `                  <Flame className="mr-1 inline h-4 w-4 text-emerald-600" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `                  <span className="font-semibold text-emerald-600">Ponto forte:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 431 | `                  {client.strongPoint}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `                <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `                  <ShieldAlert className="mr-1 inline h-4 w-4 text-rose-500" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                  <span className="font-semibold text-rose-500">O que travou:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 436 | `                  {client.blocker}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `              <div className="mt-4 rounded-md border bg-muted/20 px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 441 | `                  Participação por consultor` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 443 | `                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `                  {client.contributors.map((contributor) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 445 | `                    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 446 | `                      key={contributor.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `                      className="rounded-md bg-background px-3 py-2 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `                      <p className="truncate font-medium">{contributor.name}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 450 | `                      <p className="mt-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `                        <span className="text-emerald-600">{contributor.done} concluídas</span> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 452 | `                        <span className="text-amber-600">{contributor.pending} pendentes</span> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `                        <span className="text-rose-600">{contributor.overdue} atrasadas</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 455 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 456 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 458 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 459 | `            </article>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 461 | `        })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `    </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 465 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 466 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 467 | `function MonthlyBriefingPanel({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 468 | `  periodLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `  totals,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `  created,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `  previousCompleted,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 472 | `  team,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `  clients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `  peopleWithoutDeadline,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `  periodLabel: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `  totals: { done: number; pending: number; overdue: number };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `  created: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `  previousCompleted: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `  team: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `  clients: ClientPerformance[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `  peopleWithoutDeadline: Array<{ id: string; name: string; tasks: any[] }>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `  const topDelivery = [...team].sort((a, b) => b.done - a.done)[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 485 | `  const highestLoad = [...team].sort((a, b) => b.pending - a.pending)[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 486 | `  const strongestClient = clients[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 487 | `  const attentionClient = [...clients].sort((a, b) => a.score - b.score)[0];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 488 | `  const change = totals.done - previousCompleted;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 489 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 490 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 491 | `    <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `      <Card className="overflow-hidden border-[#167c80]/20 bg-[linear-gradient(135deg,rgba(22,124,128,0.12),rgba(255,255,255,0.9)_55%,rgba(37,99,235,0.08))] p-6 dark:bg-[linear-gradient(135deg,rgba(22,124,128,0.2),rgba(15,23,42,0.85)_55%,rgba(37,99,235,0.12))]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `        <div className="flex flex-wrap items-start justify-between gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `          <div className="max-w-3xl">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `            <Badge className="mb-3 bg-[#167c80] hover:bg-[#167c80]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 496 | `              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Briefing executivo` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `            </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `            <h2 className="text-2xl font-bold tracking-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 499 | `              Leitura da operação — {periodLabel}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `            </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `            <p className="mt-3 text-base leading-7 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `              Foram concluídas <strong className="text-foreground">{totals.done} entregas</strong> e` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `              criadas {created} novas tarefas.{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `              {change === 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `                ? "O volume de entregas ficou estável em relação ao período anterior."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `                : change > 0` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `                  ? \`Isso representa ${change} entrega(s) a mais que no período anterior.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `                  : \`Isso representa ${Math.abs(change)} entrega(s) a menos que no período anterior.\`}{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `              {totals.overdue` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `                ? \`Há ${totals.overdue} tarefa(s) atrasada(s) que exigem atenção imediata.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `                : "Não há tarefas atrasadas no recorte atual."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `          <div className="rounded-2xl border border-[#167c80]/20 bg-background/70 px-5 py-4 text-right shadow-sm backdrop-blur">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 516 | `              Foco imediato` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 518 | `            <p className="mt-1 text-3xl font-bold text-[#167c80]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 519 | `              {totals.overdue +` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `                peopleWithoutDeadline.reduce((sum, person) => sum + person.tasks.length, 0)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 521 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 522 | `            <p className="text-sm text-muted-foreground">pontos de atenção</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 525 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 526 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 527 | `      <div className="grid gap-4 xl:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 528 | `        <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 529 | `          <p className="flex items-center gap-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 530 | `            <TrendingUp className="h-4 w-4 text-emerald-600" /> Equipe` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 531 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `          {topDelivery ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `            <div className="mt-4 space-y-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 535 | `                <span className="text-muted-foreground">Maior volume de entregas:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 536 | `                <br />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 537 | `                <strong className="text-base">{topDelivery.fullName}</strong> · {topDelivery.done}{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 538 | `                concluída(s).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 540 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 541 | `                <span className="text-muted-foreground">Maior carga aberta:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 542 | `                <br />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 543 | `                <strong className="text-base">{highestLoad?.fullName}</strong> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 544 | `                {highestLoad?.pending ?? 0} pendente(s).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 546 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 547 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `            <p className="mt-4 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 549 | `              Ainda não há dados de equipe no período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 551 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 553 | `        <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 554 | `          <p className="flex items-center gap-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 555 | `            <Trophy className="h-4 w-4 text-amber-500" /> Clientes` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 556 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 557 | `          {strongestClient ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `            <div className="mt-4 space-y-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 559 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `                <span className="text-muted-foreground">Melhor desempenho:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 561 | `                <br />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 562 | `                <strong className="text-base">{strongestClient.name}</strong> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 563 | `                {strongestClient.onTimeRate}% no prazo.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 565 | `              <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 566 | `                <span className="text-muted-foreground">Cliente para acompanhar:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 567 | `                <br />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 568 | `                <strong className="text-base">{attentionClient?.name}</strong> ·{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 569 | `                {attentionClient?.blocker}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `            <p className="mt-4 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 574 | `              Ainda não há clientes com demandas no período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 576 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 577 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `        <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 579 | `          <p className="flex items-center gap-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `            <Target className="h-4 w-4 text-rose-600" /> Próximas ações` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 581 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `            {totals.overdue ? <li>Priorizar as {totals.overdue} tarefa(s) atrasada(s).</li> : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `            {peopleWithoutDeadline.length ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `              <li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `                Definir prazo com {peopleWithoutDeadline.length} pessoa(s) que têm tarefas sem data.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `              </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 588 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 589 | `            {highestLoad?.pending ? <li>Revisar a carga de {highestLoad.fullName}.</li> : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 590 | `            {!totals.overdue && !peopleWithoutDeadline.length ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `              <li>Manter a cadência e acompanhar as {totals.pending} pendência(s) abertas.</li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `            ) : null}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `          </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 595 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 596 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 597 | `      <section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 598 | `        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 599 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `            <h3 className="flex items-center gap-2 text-lg font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `              <UsersRound className="h-5 w-5 text-[#167c80]" /> Leitura por consultor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 602 | `            </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 603 | `            <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 604 | `              Quem entregou, onde existe acúmulo e qual é o principal ponto de atenção de cada` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 605 | `              pessoa.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 607 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 608 | `          <Badge variant="outline">{team.length} consultor(es) no período</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 609 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `        {team.length ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `            {team.map((person) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 613 | `              const withoutDeadline =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 614 | `                peopleWithoutDeadline.find((item) => item.id === person.id)?.tasks.length ?? 0;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 615 | `              const attention = person.overdue` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 616 | `                ? \`${person.overdue} tarefa(s) atrasada(s)\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 617 | `                : withoutDeadline` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `                  ? \`${withoutDeadline} tarefa(s) sem prazo\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `                  : person.pending` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `                    ? \`${person.pending} tarefa(s) em aberto\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `                    : "Nenhum risco imediato";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 623 | `                <Card key={person.id} className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 624 | `                  <div className="flex items-start justify-between gap-3 border-b px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `                    <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 626 | `                      <p className="truncate font-semibold">{person.fullName}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `                      <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `                        {person.isAdmin ? "Administrador" : "Consultor"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 630 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `                    <span className="rounded-full bg-[#167c80]/10 px-2.5 py-1 text-sm font-bold text-[#167c80]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 632 | `                      {person.onTimeRate}% no prazo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 634 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 635 | `                  <div className="grid grid-cols-3 divide-x text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 636 | `                    <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 637 | `                      <p className="text-xl font-bold text-emerald-600">{person.done}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 638 | `                      <p className="text-[11px] text-muted-foreground">entregas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 639 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 640 | `                    <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 641 | `                      <p className="text-xl font-bold text-amber-600">{person.pending}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `                      <p className="text-[11px] text-muted-foreground">abertas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 643 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 644 | `                    <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `                      <p className="text-xl font-bold text-rose-600">{person.overdue}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 646 | `                      <p className="text-[11px] text-muted-foreground">atrasadas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 647 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 648 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 649 | `                  <div className="bg-muted/30 px-5 py-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 650 | `                    <span className="font-medium">Leitura:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 651 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 652 | `                      className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 653 | `                        person.overdue || withoutDeadline` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `                          ? "text-rose-700"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `                          : "text-muted-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 656 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 657 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 658 | `                      {attention}.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 661 | `                </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 662 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 663 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 664 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 665 | `        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 666 | `          <Card className="p-5 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 667 | `            Não há dados de consultores neste período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 668 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `      </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 672 | `      <section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 673 | `        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 674 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `            <h3 className="flex items-center gap-2 text-lg font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 676 | `              <Swords className="h-5 w-5 text-[#167c80]" /> Leitura por cliente` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 677 | `            </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 678 | `            <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 679 | `              Visão compacta da saúde de cada conta, sem precisar abrir cliente por cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 680 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 681 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 682 | `          <Badge variant="outline">{clients.length} cliente(s) com demanda</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 683 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `        {clients.length ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 685 | `          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 686 | `            {clients.map((client) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 687 | `              <Card key={client.id} className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 688 | `                <div className="flex items-start justify-between gap-3 border-b px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 690 | `                    <p className="truncate font-semibold">{client.name}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 691 | `                    <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 692 | `                      {client.people} pessoa(s) envolvida(s)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 694 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 695 | `                  <div className="text-right">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 696 | `                    <p className="text-2xl font-bold text-[#167c80]">{client.score}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 697 | `                    <p className="text-[11px] text-muted-foreground">saúde / 100</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 698 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 699 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 700 | `                <div className="grid grid-cols-3 divide-x text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 701 | `                  <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 702 | `                    <p className="text-xl font-bold text-emerald-600">{client.done}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 703 | `                    <p className="text-[11px] text-muted-foreground">entregas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 704 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 705 | `                  <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 706 | `                    <p className="text-xl font-bold text-amber-600">{client.pending}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 707 | `                    <p className="text-[11px] text-muted-foreground">abertas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 708 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 709 | `                  <div className="p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 710 | `                    <p className="text-xl font-bold text-rose-600">{client.overdue}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 711 | `                    <p className="text-[11px] text-muted-foreground">atrasadas</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 712 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 714 | `                <div className="space-y-1.5 bg-muted/30 px-5 py-3 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 715 | `                  <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 716 | `                    <span className="font-medium text-emerald-700">Ponto forte:</span>{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 717 | `                    {client.strongPoint}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 719 | `                  <p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 720 | `                    <span className="font-medium text-rose-700">Atenção:</span> {client.blocker}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 721 | `                  </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 722 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 723 | `              </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 724 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 726 | `        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 727 | `          <Card className="p-5 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 728 | `            Não há clientes com demandas neste período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 730 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `      </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 732 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 733 | `      <p className="px-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 734 | `        Prévia do briefing automático mensal. No fechamento, a IA usará essas métricas para produzir` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `        uma análise editorial salva do período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 736 | `      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 737 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 738 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 739 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 740 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 741 | `function ReportsPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 742 | `  const { isAdmin, hasPermission, loading } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 743 | `  const { data: tasks = [] } = useWorkspaceTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 744 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 745 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 746 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 747 | `  const { data: subtasks = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 748 | `    queryKey: ["subtasks_all"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 749 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 750 | `      const { data, error } = await supabase.from("subtasks").select("id, task_id, done");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 751 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 752 | `      return data ?? [];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 753 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 754 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 755 | `  const { data: roles = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 756 | `    queryKey: ["roles"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `    queryFn: async () => (await supabase.from("user_roles").select("user_id, role")).data ?? [],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 758 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 759 | `  const { data: dueDateChanges = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 760 | `    queryKey: ["task_due_date_changes_report"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 762 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 763 | `        .from("task_due_date_changes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 764 | `        .select("id, task_id, old_due_date, new_due_date, reason, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 765 | `        .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 766 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 767 | `      return data ?? [];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 768 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 769 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 770 | `  const { data: serviceRequests = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 771 | `    queryKey: ["service_requests_report"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 772 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 773 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 774 | `        .from("service_requests")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `        .select("id, status, priority, due_date, created_at, resolved_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 777 | `      return data ?? [];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 778 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 779 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 780 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 781 | `  const [period, setPeriod] = useState(previousMonthPeriod);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 782 | `  const [userFilter, setUserFilter] = useState<string>("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 783 | `  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("active");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 784 | `  const [reportView, setReportView] = useState<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 785 | `    "briefing" | "summary" | "operations" | "clients" | "team"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `  >("briefing");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `  const [lateTasksMember, setLateTasksMember] = useState<any | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 788 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 789 | `  if (loading) return <div className="p-6 text-sm text-muted-foreground">Carregando…</div>;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 790 | `  if (!hasPermission("reports")) return <Navigate to="/mural" />;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 791 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 792 | `  const matchesStatus = (p: any) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 793 | `    const active = p.is_active !== false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 794 | `    return statusFilter === "all" || (statusFilter === "active" ? active : !active);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 795 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 796 | `  // Client accounts can access the portal, but are never collaborators and` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 797 | `  // therefore must not be included in user report filters, charts or tables.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 798 | `  const clientUserIds = new Set(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 799 | `    roles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 800 | `      .filter((role: { role: string }) => role.role === "client")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 801 | `      .map((role: { user_id: string }) => role.user_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 802 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 803 | `  const visibleProfiles = profiles` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 804 | `    .filter(matchesStatus)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 805 | `    .filter((profile) => !clientUserIds.has(profile.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 806 | `  const visibleIds = new Set(visibleProfiles.map((p) => p.id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 807 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 808 | `  const periodStart = startOfDay(parseISO(period.start));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 809 | `  const periodEnd = endOfDay(parseISO(period.end));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 810 | `  const isDone = (task: { status: string | null; completed_at: string | null }) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 811 | `    task.status === "done" || Boolean(task.completed_at);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 812 | `  const isOverdue = (task: {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 813 | `    due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `    status: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 815 | `    completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `  }) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 817 | `    Boolean(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 818 | `      task.due_date && !isDone(task) && isBefore(parseISO(task.due_date), startOfDay(new Date())),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 819 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 820 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 821 | `  // Deliveries are counted by completion date; open work is counted by its` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 822 | `  // deadline. That makes the team ranking reflect what was actually delivered` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 823 | `  // in the selected period instead of only what was due then.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 824 | `  const taskBelongsToPeriod = (task: any) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 825 | `    isDone(task)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 826 | `      ? dateIsInPeriod(task.completed_at, periodStart, periodEnd)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 827 | `      : dateIsInPeriod(task.due_date, periodStart, periodEnd);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 828 | `  const periodTasks = tasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 829 | `    .filter(taskBelongsToPeriod)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 830 | `    .filter((task) => !task.assignee_id || visibleIds.has(task.assignee_id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 831 | `  const filteredTasks = periodTasks.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 832 | `    (task) => userFilter === "all" || task.assignee_id === userFilter,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 833 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 834 | `  const latestDueDateChangeByTask = new Map<string, any>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 835 | `  dueDateChanges.forEach((change: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 836 | `    if (!latestDueDateChangeByTask.has(change.task_id)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 837 | `      latestDueDateChangeByTask.set(change.task_id, change);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 838 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 839 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 840 | `  const periodDays = Math.max(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 841 | `    1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `    Math.round((periodEnd.getTime() - periodStart.getTime()) / (24 * 60 * 60 * 1000)) + 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 843 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 844 | `  const previousStart = startOfDay(subDays(periodStart, periodDays));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 845 | `  const previousEnd = endOfDay(subDays(periodStart, 1));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 846 | `  const previousTasks = tasks.filter((task) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 847 | `    isDone(task)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 848 | `      ? dateIsInPeriod(task.completed_at, previousStart, previousEnd)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 849 | `      : dateIsInPeriod(task.due_date, previousStart, previousEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 851 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 852 | `  // Tasks without a deadline are scoped by their creation date. This keeps the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 853 | `  // risk view inside the chosen period while still showing the responsible people.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 854 | `  const noDueTasks = tasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 855 | `    .filter((task) => !isDone(task) && !task.due_date)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 856 | `    .filter((task) => dateIsInPeriod(task.created_at, periodStart, periodEnd))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 857 | `    .filter((task) => userFilter === "all" || task.assignee_id === userFilter)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 858 | `    .filter((task) => !task.assignee_id || visibleIds.has(task.assignee_id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 859 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 860 | `  const subtasksByTask = (() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 861 | `    const m = new Map<string, { total: number; done: number }>();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 862 | `    subtasks.forEach((s: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 863 | `      const cur = m.get(s.task_id) ?? { total: 0, done: 0 };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 864 | `      cur.total += 1;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 865 | `      if (s.done) cur.done += 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 866 | `      m.set(s.task_id, cur);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 867 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 868 | `    return m;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 869 | `  })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 870 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 871 | `  const sumSubtasks = (taskList: any[]) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 872 | `    let total = 0,` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 873 | `      done = 0;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 874 | `    taskList.forEach((t: { id: string }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 875 | `      const s = subtasksByTask.get(t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 876 | `      if (s) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 877 | `        total += s.total;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 878 | `        done += s.done;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 880 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 881 | `    return { total, done };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 882 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 883 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 884 | `  const totals = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 885 | `    total: filteredTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `    done: filteredTasks.filter((t) => t.status === "done").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 887 | `    pending: filteredTasks.filter((t) => t.status !== "done").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 888 | `    overdue: filteredTasks.filter(isOverdue).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `    subtasks: sumSubtasks(filteredTasks),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 890 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 891 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 892 | `  const perUser = visibleProfiles` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 893 | `    .filter((profile) => userFilter === "all" || profile.id === userFilter)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 894 | `    .map((p) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 895 | `      const userTasks = periodTasks.filter((t) => t.assignee_id === p.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 896 | `      const done = userTasks.filter((t) => t.status === "done");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 897 | `      const overdue = userTasks.filter(isOverdue);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 898 | `      const completedWithDeadline = done.filter((t) => t.due_date && t.completed_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 899 | `      const onTime = completedWithDeadline.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 900 | `        (t) => t.due_date && t.completed_at && !completedAfterDueDate(t.completed_at, t.due_date),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 901 | `      ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 902 | `      const lateCompleted = completedWithDeadline.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 903 | `        (t) => t.due_date && t.completed_at && completedAfterDueDate(t.completed_at, t.due_date),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 904 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 905 | `      const lateTasks = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 906 | `        ...lateCompleted.map((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 907 | `          const change = latestDueDateChangeByTask.get(task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 908 | `          return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 909 | `            id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `            title: task.title || "Card sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `            kind: "Concluída após o prazo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `            dueDateLabel: formatReportDate(task.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `            completedAtLabel: formatReportDate(task.completed_at),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `            deadlineChange: change` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `              ? {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 916 | `                  oldDueDateLabel: formatReportDate(change.old_due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 917 | `                  newDueDateLabel: formatReportDate(change.new_due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 918 | `                  reason: change.reason,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 920 | `              : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 921 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 922 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 923 | `        ...overdue.map((task) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 924 | `          const change = latestDueDateChangeByTask.get(task.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 925 | `          return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 926 | `            id: task.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 927 | `            title: task.title || "Card sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 928 | `            kind: "Em aberto após o prazo",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `            dueDateLabel: formatReportDate(task.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 930 | `            completedAtLabel: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 931 | `            deadlineChange: change` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 932 | `              ? {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 933 | `                  oldDueDateLabel: formatReportDate(change.old_due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 934 | `                  newDueDateLabel: formatReportDate(change.new_due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 935 | `                  reason: change.reason,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `                }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 937 | `              : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 938 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 939 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 941 | `      const lateCount = lateTasks.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 942 | `      const isAdminRole = roles.some(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 943 | `        (r: { user_id: string; role: string }) => r.user_id === p.id && r.role === "admin",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 944 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 945 | `      const sub = sumSubtasks(userTasks);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 946 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 947 | `        id: p.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 948 | `        name: (p.full_name || p.email || "?").slice(0, 14),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 949 | `        fullName: p.full_name || p.email,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 950 | `        isAdmin: isAdminRole,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 951 | `        isActive: (p as any).is_active !== false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 952 | `        total: userTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 953 | `        done: done.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 954 | `        pending: userTasks.length - done.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 955 | `        overdue: overdue.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 956 | `        onTime,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 957 | `        lateCount,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 958 | `        deliveryBalance: onTime - lateCount,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 959 | `        lateTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `        onTimeRate: completedWithDeadline.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 961 | `          ? Math.round((onTime / completedWithDeadline.length) * 100)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 962 | `          : 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `        subtasksDone: sub.done,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 964 | `        subtasksTotal: sub.total,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 965 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 966 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 967 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 968 | `  const byClient = clients` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 969 | `    .map((client) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 970 | `      const clientTasks = filteredTasks.filter((task) => task.client_id === client.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 971 | `      const concluded = clientTasks.filter((task) => task.status === "done").length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 972 | `      const overdue = clientTasks.filter(isOverdue).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 973 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 974 | `        name: client.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `        concluídas: concluded,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 976 | `        emAberto: clientTasks.length - concluded - overdue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `        atrasadas: overdue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 978 | `        total: clientTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 979 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 980 | `    })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `    .filter((client) => client.total > 0)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 982 | `    .sort((a, b) => b.total - a.total);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 983 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 984 | `  const clientPerformance: ClientPerformance[] = clients` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 985 | `    .map((client) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 986 | `      const clientTasks = filteredTasks.filter((task) => task.client_id === client.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 987 | `      if (clientTasks.length === 0) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 988 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 989 | `      const doneTasks = clientTasks.filter((task) => task.status === "done");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 990 | `      const overdue = clientTasks.filter(isOverdue).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 991 | `      const unassigned = clientTasks.filter((task) => !task.assignee_id).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 992 | `      const people = new Set(clientTasks.map((task) => task.assignee_id).filter(Boolean)).size;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 993 | `      const completedWithDeadline = doneTasks.filter((task) => task.due_date && task.completed_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 994 | `      const onTime = completedWithDeadline.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 995 | `        (task) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 996 | `          task.due_date &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 997 | `          task.completed_at &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `          !completedAfterDueDate(task.completed_at, task.due_date),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 999 | `      ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1000 | `      const onTimeRate = completedWithDeadline.length` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1001 | `        ? Math.round((onTime / completedWithDeadline.length) * 100)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1002 | `        : 0;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1003 | `      const completionRate = Math.round((doneTasks.length / clientTasks.length) * 100);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1004 | `      const score = Math.max(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1005 | `        0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1006 | `        Math.min(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1007 | `          100,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1008 | `          Math.round(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1009 | `            completionRate * 0.55 +` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1010 | `              onTimeRate * 0.3 +` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `              Math.min(15, clientTasks.length * 3) -` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `              overdue * 5,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `          ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1014 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1015 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1016 | `      const pending = clientTasks.length - doneTasks.length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1017 | `      const strongPoint = doneTasks.length` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1018 | `        ? \`${doneTasks.length} ${doneTasks.length === 1 ? "tarefa concluída" : "tarefas concluídas"}, ${onTimeRate}% das entregas no prazo.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1019 | `        : \`${clientTasks.length} ${clientTasks.length === 1 ? "tarefa acompanhada" : "tarefas acompanhadas"} no período.\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1020 | `      const blocker = overdue` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1021 | `        ? \`${overdue} ${overdue === 1 ? "tarefa atrasada" : "tarefas atrasadas"}.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `        : unassigned` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1023 | `          ? \`${unassigned} ${unassigned === 1 ? "tarefa sem responsável" : "tarefas sem responsável"}.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `          : pending` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1025 | `            ? \`${pending} ${pending === 1 ? "tarefa pendente" : "tarefas pendentes"}.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1026 | `            : "Nenhum bloqueio identificado no período.";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `      const contributors = Array.from(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1028 | `        new Set(clientTasks.map((task) => task.assignee_id ?? "__unassigned__")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1029 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `        .map((assigneeId) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1031 | `          const consultantTasks = clientTasks.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1032 | `            (task) => (task.assignee_id ?? "__unassigned__") === assigneeId,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1033 | `          );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1034 | `          const profile = profiles.find((item) => item.id === assigneeId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1035 | `          return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1036 | `            name: profile?.full_name || profile?.email || "Sem responsável",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1037 | `            done: consultantTasks.filter((task) => task.status === "done").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1038 | `            pending: consultantTasks.filter((task) => task.status !== "done").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1039 | `            overdue: consultantTasks.filter(isOverdue).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1040 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1041 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1042 | `        .sort((a, b) => b.done + b.pending - (a.done + a.pending));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1043 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1044 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1045 | `        id: client.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `        name: client.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1047 | `        people: people || 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1048 | `        total: clientTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `        done: doneTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1050 | `        pending,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1051 | `        overdue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1052 | `        unassigned,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1053 | `        onTimeRate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1054 | `        score,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `        strongPoint,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1056 | `        blocker,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1057 | `        contributors,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1059 | `    })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `    .filter((client): client is ClientPerformance => Boolean(client))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1061 | `    .sort((a, b) => b.score - a.score || b.total - a.total);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1062 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1063 | `  const admins = perUser.filter((u) => u.isAdmin);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1064 | `  const members = perUser.filter((u) => !u.isAdmin);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1065 | `  const teamRanking = perUser.map((person) => ({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1066 | `    ...person,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1067 | `    avatarUrl: profiles.find((profile) => profile.id === person.id)?.avatar_url ?? null,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1068 | `  }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1069 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1070 | `  const peopleWithoutDeadline = Array.from(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1071 | `    new Set(noDueTasks.map((task) => task.assignee_id ?? "__unassigned__")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1072 | `  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `    .map((assigneeId) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1074 | `      const personTasks = noDueTasks.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1075 | `        (task) => (task.assignee_id ?? "__unassigned__") === assigneeId,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1076 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1077 | `      const profile = profiles.find((candidate) => candidate.id === assigneeId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1078 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1079 | `        id: assigneeId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `        name: profile?.full_name || profile?.email || "Sem responsável",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `        tasks: personTasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1082 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1083 | `    })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `    .sort((a, b) => b.tasks.length - a.tasks.length || a.name.localeCompare(b.name));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1085 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1086 | `  const statusFlow = statuses` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1087 | `    .map((status) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1088 | `      name: status.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1089 | `      total: filteredTasks.filter((task) => task.status_id === status.id).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1090 | `      color: status.color || "#64748b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `    }))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `    .filter((item) => item.total > 0);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1093 | `  const priorityData = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1094 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `      name: "Urgente",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1096 | `      value: filteredTasks.filter((task) => !isDone(task) && task.priority === "urgent").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1097 | `      color: "#dc2626",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1098 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1099 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1100 | `      name: "Alta",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `      value: filteredTasks.filter((task) => !isDone(task) && task.priority === "high").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1102 | `      color: "#f59e0b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1104 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1105 | `      name: "Média",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1106 | `      value: filteredTasks.filter((task) => !isDone(task) && task.priority === "medium").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1107 | `      color: "#2563eb",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1109 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `      name: "Baixa",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1111 | `      value: filteredTasks.filter((task) => !isDone(task) && task.priority === "low").length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1112 | `      color: "#64748b",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1113 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1114 | `  ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `  const capacityRows = perUser` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1116 | `    .map((person) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1117 | `      const personTasks = filteredTasks.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1118 | `        (task) => task.assignee_id === person.id && !isDone(task),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1119 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1120 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1121 | `        ...person,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1122 | `        open: personTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `        critical: personTasks.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1124 | `          (task) => task.priority === "urgent" || task.priority === "high",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1125 | `        ).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1127 | `    })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `    .sort((a, b) => b.open - a.open || b.critical - a.critical);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1129 | `  const dueDateChangesInPeriod = dueDateChanges.filter((change) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1130 | `    dateIsInPeriod(change.created_at, periodStart, periodEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1131 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1132 | `  const completedInPreviousPeriod = previousTasks.filter(isDone).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1133 | `  const createdInPeriod = tasks.filter((task) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1134 | `    dateIsInPeriod(task.created_at, periodStart, periodEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1136 | `  const createdInPreviousPeriod = tasks.filter((task) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1137 | `    dateIsInPeriod(task.created_at, previousStart, previousEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1138 | `  ).length;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `  const requestMetrics = (() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1140 | `    const created = serviceRequests.filter((request) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1141 | `      dateIsInPeriod(request.created_at, periodStart, periodEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1142 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1143 | `    const resolved = serviceRequests.filter((request) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1144 | `      dateIsInPeriod(request.resolved_at, periodStart, periodEnd),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1145 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1146 | `    const overdue = serviceRequests.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1147 | `      (request) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1148 | `        request.status !== "resolved" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1149 | `        request.due_date &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1150 | `        isBefore(parseISO(request.due_date), startOfDay(new Date())),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1152 | `    const resolutionHours = resolved` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1153 | `      .filter((request) => request.resolved_at)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1154 | `      .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1155 | `        (request) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1156 | `          (parseISO(request.resolved_at!).getTime() - parseISO(request.created_at).getTime()) /` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1157 | `          3_600_000,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1158 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1159 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1160 | `      created: created.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1161 | `      resolved: resolved.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `      overdue: overdue.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1163 | `      averageHours: resolutionHours.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1164 | `        ? Math.round(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1165 | `            resolutionHours.reduce((sum, hours) => sum + hours, 0) / resolutionHours.length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1166 | `          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1167 | `        : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1168 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1169 | `  })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1170 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1171 | `    <div className="space-y-6 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1172 | `      <header className="flex flex-wrap items-end justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1173 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1174 | `          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1175 | `          <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1176 | `            Visão macro de entregas, pendências e riscos da operação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1177 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1178 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1179 | `        <div className="flex flex-wrap items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1180 | `          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1181 | `            <SelectTrigger className="w-44">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1182 | `              <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1183 | `            </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1184 | `            <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1185 | `              <SelectItem value="active">Somente ativos</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1186 | `              <SelectItem value="inactive">Somente inativos</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1187 | `              <SelectItem value="all">Ativos + inativos</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1188 | `            </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `          </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1190 | `          <Select value={userFilter} onValueChange={setUserFilter}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1191 | `            <SelectTrigger className="w-56">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1192 | `              <SelectValue placeholder="Filtrar por usuário" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1193 | `            </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1194 | `            <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1195 | `              <SelectItem value="all">Todos os usuários</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1196 | `              {visibleProfiles.map((p) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1197 | `                <SelectItem key={p.id} value={p.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1198 | `                  {p.full_name || p.email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1199 | `                  {(p as any).is_active === false ? " (inativo)" : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1200 | `                </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1201 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1202 | `            </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1203 | `          </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1204 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1205 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1206 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1207 | `      <Card className="flex flex-wrap items-end justify-between gap-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1208 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1209 | `          <p className="flex items-center gap-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1210 | `            <CalendarRange className="h-4 w-4 text-[#167c80]" /> Período analisado` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1211 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1212 | `          <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1213 | `            {format(periodStart, "d 'de' MMMM 'de' yyyy", { locale: ptBR })} até{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1214 | `            {format(periodEnd, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1216 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1217 | `        <div className="flex flex-wrap items-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1218 | `          <label className="space-y-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1219 | `            Início` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1220 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1221 | `              type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1222 | `              value={period.start}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1223 | `              max={period.end}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1224 | `              onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1225 | `                setPeriod((current) => ({ ...current, start: event.target.value }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1226 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1227 | `              className="h-9 w-36"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1228 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `          </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1230 | `          <label className="space-y-1 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1231 | `            Fim` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1232 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1233 | `              type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `              value={period.end}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1235 | `              min={period.start}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1236 | `              onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1237 | `                setPeriod((current) => ({ ...current, end: event.target.value }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1238 | `              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1239 | `              className="h-9 w-36"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1240 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1241 | `          </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1242 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1243 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1244 | `            size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1245 | `            variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1246 | `            onClick={() => setPeriod(currentMonthPeriod)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1247 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1248 | `            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Mês vigente` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1249 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1250 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1251 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1252 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1253 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1254 | `        className="flex max-w-full overflow-x-auto border-b"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1255 | `        role="tablist"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1256 | `        aria-label="Visões dos relatórios"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1257 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1258 | `        {[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1259 | `          ["briefing", "Briefing mensal"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1260 | `          ["summary", "Resumo"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1261 | `          ["operations", "Operação"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1262 | `          ["clients", "Desempenho por cliente"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1263 | `          ["team", "Ranking da equipe"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1264 | `        ].map(([id, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1265 | `          <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1266 | `            key={id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1267 | `            type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1268 | `            role="tab"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1269 | `            aria-selected={reportView === id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1270 | `            onClick={() => setReportView(id as typeof reportView)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1271 | `            className={\`relative shrink-0 px-4 py-3 text-sm font-medium ${reportView === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1272 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1273 | `            {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1274 | `            {reportView === id && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1275 | `              <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#167c80]" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1276 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1277 | `          </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1278 | `        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1279 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1280 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1281 | `      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1282 | `        className={reportView === "summary" ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-6" : "hidden"}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1283 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1284 | `        <Kpi label="Total" value={totals.total} icon={ListTodo} color="#2563eb" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1285 | `        <Kpi label="Concluídas" value={totals.done} icon={CheckCircle2} color="#059669" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1286 | `        <Kpi label="Pendentes" value={totals.pending} icon={Clock} color="#f59e0b" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1287 | `        <Kpi label="Atrasadas" value={totals.overdue} icon={AlertTriangle} color="#dc2626" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1288 | `        <Kpi` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1289 | `          label="Subtarefas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1290 | `          value={\`${totals.subtasks.done}/${totals.subtasks.total}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1291 | `          icon={ListChecks}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1292 | `          color="#0ea5e9"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1293 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1294 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1295 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1296 | `      <div className={reportView === "briefing" ? "block" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1297 | `        <MonthlyBriefingPanel` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1298 | `          periodLabel={format(periodStart, "MMMM 'de' yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1299 | `          totals={totals}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1300 | `          created={createdInPeriod}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1301 | `          previousCompleted={completedInPreviousPeriod}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1302 | `          team={perUser}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1303 | `          clients={clientPerformance}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1304 | `          peopleWithoutDeadline={peopleWithoutDeadline}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1305 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1306 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1307 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1308 | `      <div className={reportView === "clients" ? "block" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1309 | `        <ClientBattlePanel clients={clientPerformance} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1310 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1311 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1312 | `      <div className={reportView === "operations" ? "space-y-4" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1313 | `        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1314 | `          <Kpi` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1315 | `            label="Entradas no período"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1316 | `            value={createdInPeriod}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1317 | `            icon={ArrowDownUp}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1318 | `            color="#2563eb"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1319 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1320 | `          <Kpi label="Entregas no período" value={totals.done} icon={TrendingUp} color="#059669" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1321 | `          <Kpi` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1322 | `            label="Alterações de prazo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1323 | `            value={dueDateChangesInPeriod}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1324 | `            icon={Clock}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `            color="#d97706"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1326 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1327 | `          <Kpi` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1328 | `            label="Solicitações vencidas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1329 | `            value={requestMetrics.overdue}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1330 | `            icon={TicketCheck}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1331 | `            color="#dc2626"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1332 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1333 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1334 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1335 | `        <div className="grid gap-4 xl:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1336 | `          <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1337 | `            <div className="mb-4 flex items-start justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1338 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1339 | `                <h2 className="flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1340 | `                  <ArrowDownUp className="h-4 w-4 text-[#167c80]" /> Entrada × saída` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1341 | `                </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1342 | `                <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1343 | `                  Compara o período selecionado com o período imediatamente anterior de mesma` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1344 | `                  duração.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1345 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1346 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1347 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1348 | `            <div className="h-64">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1349 | `              <ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1350 | `                <BarChart` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1351 | `                  data={[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1352 | `                    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1353 | `                      period: "Anterior",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `                      entradas: createdInPreviousPeriod,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1355 | `                      entregas: completedInPreviousPeriod,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `                    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1357 | `                    { period: "Selecionado", entradas: createdInPeriod, entregas: totals.done },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1358 | `                  ]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1359 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1360 | `                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1361 | `                  <XAxis dataKey="period" fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1362 | `                  <YAxis allowDecimals={false} fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1363 | `                  <Tooltip />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1364 | `                  <Legend />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1365 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1366 | `                    dataKey="entradas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1367 | `                    name="Tarefas criadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1368 | `                    fill="#2563eb"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1369 | `                    radius={[4, 4, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1370 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1371 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1372 | `                    dataKey="entregas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1373 | `                    name="Tarefas concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1374 | `                    fill="#059669"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1375 | `                    radius={[4, 4, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1377 | `                </BarChart>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1378 | `              </ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1379 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1380 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1381 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1382 | `          <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1383 | `            <h2 className="flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1384 | `              <Gauge className="h-4 w-4 text-[#167c80]" /> Fluxo atual por etapa` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1385 | `            </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1386 | `            <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1387 | `              Volume de trabalho que está em cada etapa no período.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1389 | `            <div className="mt-5 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1390 | `              {statusFlow.length ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1391 | `                statusFlow.map((item) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1392 | `                  <div key={item.name}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1393 | `                    <div className="mb-1.5 flex justify-between text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1394 | `                      <span>{item.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1395 | `                      <span className="font-semibold">{item.total}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1396 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1397 | `                    <div className="h-2.5 overflow-hidden rounded-full bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1398 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1399 | `                        className="h-full rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1400 | `                        style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1401 | `                          width: \`${Math.max(4, (item.total / Math.max(filteredTasks.length, 1)) * 100)}%\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1402 | `                          backgroundColor: item.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1403 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1404 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1405 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1406 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1407 | `                ))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1408 | `              ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1409 | `                <p className="text-sm text-muted-foreground">Nenhuma tarefa no período.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1410 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1411 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1412 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1413 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1414 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1415 | `        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1416 | `          <Card className="overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1417 | `            <div className="border-b px-5 py-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1418 | `              <h2 className="flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1419 | `                <UsersRound className="h-4 w-4 text-[#167c80]" /> Capacidade da equipe` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1420 | `              </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1421 | `              <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1422 | `                Carga aberta no período, destacando prioridades alta e urgente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1423 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1424 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1425 | `            <div className="divide-y">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1426 | `              {capacityRows.map((person) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1427 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1428 | `                  key={person.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1429 | `                  className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 px-5 py-3.5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1430 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1431 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1432 | `                    <p className="truncate font-medium">{person.fullName}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1433 | `                    <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1434 | `                      {person.done} entrega(s) concluída(s)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1435 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1436 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1437 | `                  <div className="text-right">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1438 | `                    <p className="text-lg font-bold">{person.open}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1439 | `                    <p className="text-xs text-muted-foreground">em aberto</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1440 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1441 | `                  <Badge` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1442 | `                    variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1443 | `                    className={` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1444 | `                      person.critical` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1445 | `                        ? "border-rose-200 bg-rose-50 text-rose-700"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1446 | `                        : "text-muted-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1447 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1448 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1449 | `                    {person.critical} crítica(s)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1450 | `                  </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1451 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1452 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1453 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1454 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1455 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1456 | `          <Card className="p-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1457 | `            <h2 className="flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1458 | `              <Flame className="h-4 w-4 text-[#dc2626]" /> Prioridades abertas` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1459 | `            </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1460 | `            <div className="mt-5 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1461 | `              {priorityData.map((item) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1462 | `                <div key={item.name} className="flex items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1463 | `                  <span className="flex items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1464 | `                    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1465 | `                      className="h-2.5 w-2.5 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1466 | `                      style={{ backgroundColor: item.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1467 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1468 | `                    {item.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1469 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1470 | `                  <span className="text-xl font-bold">{item.value}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1471 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1472 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1473 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1474 | `            <div className="mt-6 border-t pt-4 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1475 | `              <p className="flex items-center gap-2 font-medium text-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1476 | `                <Timer className="h-4 w-4 text-[#167c80]" /> Solicitações` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1477 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1478 | `              <p className="mt-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1479 | `                {requestMetrics.created} abertas · {requestMetrics.resolved} resolvidas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1480 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1481 | `              <p className="mt-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1482 | `                {requestMetrics.averageHours === null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1483 | `                  ? "Ainda não há tempo médio de resolução no período."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1484 | `                  : \`Tempo médio até solução: ${requestMetrics.averageHours}h.\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1485 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1486 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1487 | `          </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1488 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1489 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1490 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1491 | `      <div className={reportView === "summary" ? "grid gap-4 lg:grid-cols-2" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1492 | `        <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1493 | `          <h3 className="mb-3 font-semibold">Comparativo por usuário</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1494 | `          <div className="h-72">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1495 | `            <ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1496 | `              <BarChart data={perUser}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1497 | `                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1498 | `                <XAxis dataKey="name" fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1499 | `                <YAxis fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1500 | `                <Tooltip />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1501 | `                <Legend />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1502 | `                <Bar dataKey="done" name="Concluídas" stackId="a" fill="#059669" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1503 | `                <Bar dataKey="pending" name="Pendentes" stackId="a" fill="#f59e0b" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1504 | `                <Bar dataKey="overdue" name="Atrasadas" fill="#dc2626" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1505 | `              </BarChart>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1506 | `            </ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1507 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1508 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1509 | `        <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1510 | `          <div className="mb-1 flex items-baseline justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1511 | `            <h3 className="font-semibold">Atividades por cliente</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1512 | `            <span className="text-xs text-muted-foreground">Conclusão × pendências</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1513 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1514 | `          <p className="mb-3 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1515 | `            Comparativo de atividades concluídas, em aberto e atrasadas para cada cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1516 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1517 | `          <div className="h-72">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1518 | `            {byClient.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1519 | `              <div className="grid h-full place-items-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1520 | `                Sem dados no período` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1521 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1522 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1523 | `              <ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1524 | `                <BarChart` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1525 | `                  data={byClient}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1526 | `                  layout="vertical"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1527 | `                  margin={{ top: 4, right: 12, left: 10, bottom: 0 }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1528 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1529 | `                  <CartesianGrid` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1530 | `                    horizontal={false}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1531 | `                    strokeDasharray="3 3"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1532 | `                    stroke="hsl(var(--border))"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1533 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1534 | `                  <XAxis type="number" allowDecimals={false} fontSize={11} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1535 | `                  <YAxis type="category" dataKey="name" width={112} tick={{ fontSize: 11 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1536 | `                  <Tooltip cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.45 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1537 | `                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1538 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1539 | `                    dataKey="concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1540 | `                    name="Concluídas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1541 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1542 | `                    fill="#059669"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1543 | `                    radius={[0, 0, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1544 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1545 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1546 | `                    dataKey="emAberto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1547 | `                    name="Em aberto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1548 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1549 | `                    fill="#2563eb"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1550 | `                    radius={[0, 0, 0, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1551 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1552 | `                  <Bar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1553 | `                    dataKey="atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1554 | `                    name="Atrasadas"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1555 | `                    stackId="atividade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1556 | `                    fill="#dc2626"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1557 | `                    radius={[0, 4, 4, 0]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1558 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1559 | `                </BarChart>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1560 | `              </ResponsiveContainer>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1561 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1562 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1563 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1564 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1565 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1566 | `      <div className={reportView === "team" ? "space-y-4" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1567 | `        <TeamRankingPanel members={teamRanking} onViewLateTasks={setLateTasksMember} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1568 | `        <UserTable title="Administradores" icon={ShieldCheck} rows={admins} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1569 | `        <UserTable title="Colaboradores" rows={members} icon={UserIcon} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1570 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1571 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1572 | `      <div className={reportView === "summary" ? "block" : "hidden"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1573 | `        <ClientByUserTable clients={clients} users={perUser} tasks={filteredTasks} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1574 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1575 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1576 | `      <LateTasksDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1577 | `        member={lateTasksMember}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1578 | `        open={Boolean(lateTasksMember)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1579 | `        onOpenChange={(open) => !open && setLateTasksMember(null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1580 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1581 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1582 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1583 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1584 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1585 | `function UserTable({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1586 | `  title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1587 | `  icon: Icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1588 | `  rows,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1589 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1590 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1591 | `  icon: typeof UserIcon;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1592 | `  rows: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1593 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1594 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1595 | `    <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1596 | `      <h3 className="mb-3 flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1597 | `        <Icon className="h-4 w-4" /> {title}{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1598 | `        <span className="text-xs text-muted-foreground">({rows.length})</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1599 | `      </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1600 | `      {rows.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1601 | `        <p className="text-sm text-muted-foreground">Nenhum usuário neste grupo.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1602 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1603 | `        <div className="overflow-x-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1604 | `          <table className="w-full text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1605 | `            <thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1606 | `              <tr className="border-b text-left text-xs uppercase text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1607 | `                <th className="py-2">Usuário</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1608 | `                <th className="py-2 text-center">Total</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1609 | `                <th className="py-2 text-center">Concluídas</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1610 | `                <th className="py-2 text-center">Pendentes</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1611 | `                <th className="py-2 text-center">Atrasadas</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1612 | `                <th className="py-2 text-center">Subtarefas</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1613 | `                <th className="py-2 text-center">No prazo</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1614 | `                <th className="py-2 text-center">% prazo</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1615 | `              </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1616 | `            </thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1617 | `            <tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1618 | `              {rows.map((r) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1619 | `                const subPct = r.subtasksTotal` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1620 | `                  ? Math.round((r.subtasksDone / r.subtasksTotal) * 100)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1621 | `                  : 0;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1622 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1623 | `                  <tr key={r.id} className="border-b last:border-b-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1624 | `                    <td className="py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1625 | `                      <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1626 | `                        <span>{r.fullName}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1627 | `                        {!r.isActive && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1628 | `                          <Badge variant="outline" className="text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1629 | `                            Desativado` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1630 | `                          </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1631 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1632 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1633 | `                    </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1634 | `                    <td className="py-2 text-center font-medium">{r.total}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1635 | `                    <td className="py-2 text-center text-emerald-600">{r.done}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1636 | `                    <td className="py-2 text-center text-amber-600">{r.pending}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1637 | `                    <td className="py-2 text-center text-red-600">{r.overdue}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1638 | `                    <td className="py-2 text-center text-sky-600">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1639 | `                      {r.subtasksTotal ? \`${r.subtasksDone}/${r.subtasksTotal} (${subPct}%)\` : "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1640 | `                    </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1641 | `                    <td className="py-2 text-center">{r.onTime}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1642 | `                    <td className="py-2 text-center">{r.onTimeRate}%</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1643 | `                  </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1644 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1645 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1646 | `            </tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1647 | `          </table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1648 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1649 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1650 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1651 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1652 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1653 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1654 | `function ClientByUserTable({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1655 | `  clients,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1656 | `  users,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1657 | `  tasks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1658 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1659 | `  clients: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1660 | `  users: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1661 | `  tasks: any[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1662 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1663 | `  const activeClients = clients.filter((c) => tasks.some((t) => t.client_id === c.id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1664 | `  if (activeClients.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1665 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1666 | `      <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1667 | `        <h3 className="mb-2 font-semibold">Demandas por cliente × usuário</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1668 | `        <p className="text-sm text-muted-foreground">Sem demandas com cliente no período.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1669 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1670 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1671 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1672 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1673 | `    <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1674 | `      <h3 className="mb-3 font-semibold">Demandas por cliente × usuário</h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1675 | `      <p className="mb-3 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1676 | `        Quantidade de tarefas atribuídas a cada usuário, agrupadas por cliente. "Concl." =` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1677 | `        concluídas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1678 | `      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1679 | `      <div className="overflow-x-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1680 | `        <table className="w-full text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1681 | `          <thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1682 | `            <tr className="border-b text-left text-xs uppercase text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1683 | `              <th className="py-2 pr-3">Cliente</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1684 | `              {users.map((u) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1685 | `                <th key={u.id} className="py-2 px-2 text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1686 | `                  <div className="flex flex-col items-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1687 | `                    <span>{u.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1688 | `                    <span className="text-[10px] font-normal text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1689 | `                      {u.isAdmin ? "admin" : "colaborador"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1690 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1691 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1692 | `                </th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1693 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1694 | `              <th className="py-2 px-2 text-center">Total</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1695 | `            </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1696 | `          </thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1697 | `          <tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1698 | `            {activeClients.map((c) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1699 | `              const clientTasks = tasks.filter((t) => t.client_id === c.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1700 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1701 | `                <tr key={c.id} className="border-b last:border-b-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1702 | `                  <td className="py-2 pr-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1703 | `                    <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1704 | `                      <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1705 | `                        className="h-2.5 w-2.5 rounded-full"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1706 | `                        style={{ background: c.color || "#1e3a8a" }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1707 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1708 | `                      <span className="font-medium">{c.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1709 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1710 | `                  </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1711 | `                  {users.map((u) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1712 | `                    const ut = clientTasks.filter((t) => t.assignee_id === u.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1713 | `                    const done = ut.filter((t) => t.status === "done").length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1714 | `                    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1715 | `                      <td key={u.id} className="py-2 px-2 text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1716 | `                        {ut.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1717 | `                          <span className="text-muted-foreground">—</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1718 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1719 | `                          <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1720 | `                            <span className="font-medium">{ut.length}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1721 | `                            <span className="ml-1 text-xs text-emerald-600">({done} concl.)</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1722 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1723 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1724 | `                      </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1725 | `                    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1726 | `                  })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1727 | `                  <td className="py-2 px-2 text-center font-semibold">{clientTasks.length}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1728 | `                </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1729 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1730 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1731 | `          </tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1732 | `        </table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1733 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1734 | `    </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1735 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1736 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1737 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
