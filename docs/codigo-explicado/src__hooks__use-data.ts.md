# src/hooks/use-data.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `﻿import { useEffect } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { createClient } from "@supabase/supabase-js";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import type { Database } from "@/integrations/supabase/types";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 9 | ` * Data access layer for the TaskFlow screens.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 10 | ` *` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 11 | ` * Most pages should read data through these hooks instead of calling Supabase directly.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 12 | ` * That keeps cache keys, filters and real-time invalidation in one place. When this clean` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 13 | ` * copy points to a new database, the table names must still match the migrations under` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 14 | ` * supabase/migrations.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 15 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 16 | `export interface Task {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 17 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  status: "todo" | "in_progress" | "review" | "done" | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  status_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  priority: "low" | "medium" | "high" | "urgent" | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  due_time: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  assigned_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  assigned_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  column_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  color: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  created_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  tag_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  deleted_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  deleted_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  card_width: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  /** Ambiente dono da tarefa. Diverge do ativo quando ela chega por participação. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 41 | `  workspace_id?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 43 | `export interface TaskStatus {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 44 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  is_completed: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  is_active: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 51 | `export interface TaskTag {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 52 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `export interface KanbanColumn {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 58 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  color: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 64 | `export interface Client {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 65 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  color: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  cnpj: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  legal_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  trade_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  state_registration: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  municipal_registration: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `  address: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `  phone: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `  email: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  responsible: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  avatar_path: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  is_active: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 81 | `export interface ClientDepartment {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 82 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `export interface ClientDepartmentEmployee {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 90 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `  department_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `  person_type: "individual" | "company";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  full_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  document: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  cbo: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  role: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `  salary: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  salary_extrafolha: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `  activities: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `  avatar_path: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 103 | `export interface ClientSystemAccess {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 104 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `  login: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `  password: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `  notes: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 113 | `export interface ClientBranch {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 114 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  cnpj: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `  address: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  phone: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `  email: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `  notes: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 125 | `export interface Profile {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 126 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `  full_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `  email: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `  avatar_url: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `  is_active?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `  /** Slugs dos ambientes da pessoa; só vem de list_task_assignees. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 132 | `  workspace_slugs?: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `export interface AgendaEvent {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 136 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `  starts_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `  ends_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `  is_all_day: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `  location: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `  meeting_url: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `  created_by: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `  updated_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `  source: "taskflow" | "google";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `  google_event_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `  google_calendar_id?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `  sync_status: "not_configured" | "pending" | "synced" | "error";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 154 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 155 | `export interface AgendaCalendarSource {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 156 | `  google_calendar_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `  name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `  is_shared: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `  is_visible: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `export interface GoogleCalendarConnection {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 164 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `  google_email: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `  connected_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 169 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 170 | `export function useGoogleCalendarConnection() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 171 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 172 | `    queryKey: ["google_calendar_connection"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 174 | `      const { data, error } = await (supabase.from("calendar_google_connections" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `        .select("id, google_email, connected_at, updated_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `        .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 178 | `      return (data ?? null) as GoogleCalendarConnection | null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 179 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 180 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 181 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 183 | `export function useAgendaEvents(rangeStart?: string, rangeEnd?: string) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 184 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `  const { user, loading: loadingAuth } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 187 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 188 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 189 | `    let refreshTimer: ReturnType<typeof setTimeout> | undefined;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `      .channel(\`agenda-events-${Math.random().toString(36).slice(2)}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `      .on("postgres_changes", { event: "*", schema: "public", table: "calendar_events" }, () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 193 | `        if (refreshTimer) clearTimeout(refreshTimer);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 194 | `        refreshTimer = setTimeout(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 195 | `          void qc.invalidateQueries({ queryKey: ["agenda_events"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `        }, 750);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 200 | `      if (refreshTimer) clearTimeout(refreshTimer);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 201 | `      void supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 202 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 203 | `  }, [qc, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 205 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 206 | `    queryKey: ["agenda_events", rangeStart, rangeEnd],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 208 | `      // Read through the authenticated client so the active workspace RLS` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 209 | `      // policy is enforced. Google sync remains an explicit server action.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 210 | `      let query = (supabase.from("calendar_events" as any) as any).select("*").order("starts_at");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 211 | `      if (rangeStart) query = query.gte("starts_at", rangeStart);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 212 | `      if (rangeEnd) query = query.lte("starts_at", rangeEnd);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 213 | `      const { data, error } = await query;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 214 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 215 | `      return (data ?? []) as AgendaEvent[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 216 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 217 | `    enabled: !loadingAuth && !!user,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `    refetchOnMount: "always",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 220 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 221 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 222 | `export function useAgendaCalendarSources() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 223 | `  const { user, loading: loadingAuth } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 224 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 225 | `    queryKey: ["agenda_calendar_sources", user?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `    enabled: !loadingAuth && !!user,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 228 | `      const { data, error } = await supabase.functions.invoke("google-calendar-sync", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 229 | `        // Calendar filters have their own lightweight endpoint. Do not load` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 230 | `        // an event range just to render the filter list.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 231 | `        body: { action: "list_sources" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 233 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 234 | `      if (!data?.ok) throw new Error(data?.error ?? "Não foi possível carregar as agendas.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 235 | `      return (data.sources ?? []) as AgendaCalendarSource[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 236 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 237 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 238 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 239 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 240 | `export interface TaskCollaborator {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 241 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 242 | `  collaborator_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `  added_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 246 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 247 | `export interface ClientInvoice {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 248 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `  description: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `  amount: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `  due_date: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `  status: "open" | "paid";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `  paid_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `  payment_method: "pix" | "boleto" | "link";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `  payment_link: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `  pix_key: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `  boleto_file_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `  boleto_storage_path: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `  boleto_mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `  invoice_file_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `  invoice_storage_path: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `  invoice_mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 267 | `export function useClientInvoices() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 268 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 269 | `    queryKey: ["client_invoices"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 271 | `      // The generated Supabase types are refreshed separately; this cast keeps the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 272 | `      // new migration usable immediately in the application.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 273 | `      const { data, error } = await (supabase.from("client_invoices") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 274 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `        .order("due_date", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 277 | `      return (data ?? []) as ClientInvoice[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 278 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 279 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 280 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 281 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 282 | `export function useTasks() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 283 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 284 | `    queryKey: ["tasks"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 286 | `      // Read through the current verified session. Without an explicit bearer` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 287 | `      // token, a stale browser auth state can make RLS return an empty task list.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 288 | `      const {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 289 | `        data: { session },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `      } = await supabase.auth.getSession();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 291 | `      const url = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 292 | `      const publishableKey =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 293 | `        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `      const taskClient =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 295 | `        session && url && publishableKey` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `          ? createClient<Database>(url, publishableKey, {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `              auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `              global: { headers: { Authorization: \`Bearer ${session.access_token}\` } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `          : supabase;` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 301 | `      // Soft-delete strategy: deleted tasks stay in the database, but normal screens hide them.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 302 | `      const { data, error } = await taskClient` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 303 | `        .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `        .is("deleted_at", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `        .order("position", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `        .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 309 | `      return (data ?? []) as Task[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 310 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 311 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 312 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 313 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 314 | `export function useDeletedTasks() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 315 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 316 | `    queryKey: ["tasks", "deleted"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 318 | `      // Trash page uses the opposite filter so records can be restored later.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 319 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 320 | `        .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `        .not("deleted_at", "is", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `        .order("deleted_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 325 | `      return (data ?? []) as Task[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 326 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 327 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 328 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 329 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 330 | `export function useColumns() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 331 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 332 | `    queryKey: ["columns"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 334 | `      // Kanban columns are global unless client_id is filled for client-specific boards.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 335 | `      const { data, error } = await supabase.from("kanban_columns").select("*").order("position");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 336 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 337 | `      return (data ?? []) as KanbanColumn[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 338 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 339 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 340 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 341 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 342 | `export interface UserColumnOrder {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 343 | `  column_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 346 | `export function useUserColumnOrder() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 347 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 348 | `    queryKey: ["user_column_order"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 350 | `      // Per-user layout preferences are optional; anonymous/non-loaded users get the default order.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 351 | `      const { data: u } = await supabase.auth.getUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `      const uid = u.user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 353 | `      if (!uid) return [] as UserColumnOrder[];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 354 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 355 | `        .from("user_column_order")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 356 | `        .select("column_id, position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `        .eq("user_id", uid);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 359 | `      return (data ?? []) as UserColumnOrder[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 360 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 361 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 363 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 364 | `export interface UserTaskOrder {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 365 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 368 | `export function useUserTaskOrder() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 369 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 370 | `    queryKey: ["user_task_order"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 372 | `      const { data: u } = await supabase.auth.getUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 373 | `      const uid = u.user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 374 | `      if (!uid) return [] as UserTaskOrder[];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 375 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 376 | `        .from("user_task_order")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `        .select("task_id, position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `        .eq("user_id", uid);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 380 | `      return (data ?? []) as UserTaskOrder[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 381 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 382 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 383 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 384 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 385 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 386 | ` * Nome e cor dos clientes de todos os ambientes a que a pessoa pertence.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 387 | ` * Serve apenas para exibição: uma tarefa lançada para o outro ambiente aponta` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 388 | ` * para o cliente de lá, que useClients() — restrito ao ambiente ativo — não` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 389 | ` * alcança. Os seletores continuam usando useClients(), de propósito.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 390 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 391 | `export function useRelatedClients() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 392 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 393 | `    queryKey: ["related-clients"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 395 | `      const { data, error } = await (supabase.rpc("list_related_client_names") as any);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 396 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 397 | `      return (data ?? []) as Array<{ id: string; name: string; color: string | null }>;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 398 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 399 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 400 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 401 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 402 | `export function useClients() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 403 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 404 | `    queryKey: ["clients"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 406 | `      const { data, error } = await supabase.from("clients").select("*").order("name");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 407 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 408 | `      return (data ?? []) as Client[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 409 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 410 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 411 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 412 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 413 | `export function useProfiles() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 414 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 415 | `    queryKey: ["profiles"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 417 | `      const { data, error } = await (supabase.from("profiles") as any).select(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 418 | `        "id, full_name, avatar_url, is_active",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 420 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 421 | `      return [...((data ?? []) as Profile[])].sort((a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 422 | `        (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 423 | `          sensitivity: "base",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 426 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 427 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 428 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 429 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 430 | `export interface UserRole {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 431 | `  user_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `  role: "admin" | "collaborator" | "client";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 434 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 435 | `export function useUserRoles() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 436 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 437 | `    queryKey: ["user_roles"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 439 | `      const { data, error } = await supabase.from("user_roles").select("user_id, role");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 440 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 441 | `      return (data ?? []) as UserRole[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 442 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 443 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 444 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 445 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 446 | `export function useAssignableProfiles(targetWorkspaceId?: string | null) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 447 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 448 | `    queryKey: ["assignable-profiles", targetWorkspaceId ?? null],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 450 | `      // A versão de list_task_assignees que aceita ambiente só passa a existir` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 451 | `      // com a migration 20260903122000. Enquanto ela não for aplicada, chamar` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 452 | `      // com argumento devolve erro de função inexistente e a tela ficaria sem` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 453 | `      // nome nenhum — então a chamada sem argumento é a rede de proteção.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 454 | `      let rows: Profile[] | null = null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 455 | `      if (targetWorkspaceId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 456 | `        const scoped = await (supabase.rpc("list_task_assignees", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 457 | `          target_workspace_id: targetWorkspaceId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `        }) as any);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `        if (!scoped.error) rows = (scoped.data ?? []) as Profile[];` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 460 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 461 | `      if (rows === null) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 462 | `        const { data, error } = await (supabase.rpc("list_task_assignees") as any);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 463 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 464 | `        rows = (data ?? []) as Profile[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 465 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 466 | `      return [...rows].sort((a, b) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 467 | `        (a.full_name ?? "").localeCompare(b.full_name ?? "", "pt-BR", {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `          sensitivity: "base",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 471 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 472 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 473 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 474 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 475 | `export function useTaskCollaborators() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 476 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 477 | `    queryKey: ["task_collaborators"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 479 | `      const { data, error } = await (supabase.from("task_collaborators") as any).select(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 480 | `        "task_id, collaborator_id, added_by, created_at",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 483 | `      return (data ?? []) as TaskCollaborator[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 484 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 485 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 486 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 487 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 488 | `export function useTaskTags() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 489 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 490 | `    queryKey: ["task_tags"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 492 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 493 | `        .from("task_tags")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 495 | `        .order("position", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `        .order("name", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 498 | `      return (data ?? []) as TaskTag[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 499 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 500 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 501 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 502 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 503 | `export interface TaskTagLink {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 504 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `  tag_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 507 | `export function useTaskTagLinks() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 508 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 509 | `    queryKey: ["task_tag_links"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 511 | `      const { data, error } = await supabase.from("task_tag_links").select("task_id, tag_id");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 512 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 513 | `      return (data ?? []) as TaskTagLink[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 514 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 515 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 516 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 517 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 518 | `export interface Subtask {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 519 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `  task_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `  due_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 528 | `export function useSubtasks() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 529 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 530 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 531 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 532 | `    // Realtime updates keep task/subtask counters fresh across browser tabs and team members.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 533 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 534 | `      .channel(\`subtasks-cache-${Math.random().toString(36).slice(2)}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `      .on("postgres_changes", { event: "*", schema: "public", table: "subtasks" }, () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 536 | `        void qc.invalidateQueries({ queryKey: ["subtasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `        void qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 541 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 542 | `      void supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 543 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 544 | `  }, [qc]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 546 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 547 | `    queryKey: ["subtasks"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 549 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 550 | `        .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `        .select("id, task_id, title, done, position, assignee_id, due_date, completed_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `        .order("position");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 554 | `      return (data ?? []) as Subtask[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 555 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 556 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 557 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 558 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 559 | `export function useTaskStatuses() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 560 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 561 | `    queryKey: ["task_statuses"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 563 | `      const { data, error } = await supabase.from("task_statuses").select("*").order("position");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 564 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 565 | `      return (data ?? []) as TaskStatus[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 566 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 567 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 568 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 569 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
