# src/hooks/use-obligations.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `/* eslint-disable @typescript-eslint/no-explicit-any -- Supabase types are regenerated after the migration is applied. */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 2 | `import { useEffect } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `export type ObligationFrequency = "daily" | "weekly" | "monthly";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 8 | `export type ObligationMonthRule = "specific_days" | "last_day" | "last_business_day";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 9 | `export type ObligationOccurrenceStatus = "scheduled" | "open" | "completed" | "skipped";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 10 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 11 | `export interface Obligation {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 12 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  workspace_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  description: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  frequency: ObligationFrequency;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  interval_count: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  days_of_week: number[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  days_of_month: number[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  month_rule: ObligationMonthRule;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  business_days_only: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  start_date: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  end_date: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  create_before_days: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  due_time: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  priority: "low" | "medium" | "high" | "urgent";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  column_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  status_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  is_active: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  created_by: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 36 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 37 | `export interface ObligationOccurrence {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 38 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  workspace_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  obligation_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  due_date: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  due_time: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  status: ObligationOccurrenceStatus;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  task_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  completed_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `function useObligationRealtime() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 52 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 53 | `  const { activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 56 | `    if (!activeWorkspace?.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `      .channel(\`obligations-${activeWorkspace.id}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `        { event: "*", schema: "public", table: "obligations" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `        () => void queryClient.invalidateQueries({ queryKey: ["obligations"] }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 63 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `      .on(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `        "postgres_changes",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `        { event: "*", schema: "public", table: "obligation_occurrences" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `        () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 68 | `          void queryClient.invalidateQueries({ queryKey: ["obligation-occurrences"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `          void queryClient.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 71 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 75 | `      void supabase.removeChannel(channel);` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 76 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 77 | `  }, [activeWorkspace?.id, queryClient]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `export function useObligations() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 81 | `  const { user, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `  useObligationRealtime();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 84 | `    queryKey: ["obligations", activeWorkspace?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `    enabled: !!user && !!activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `      const { data, error } = await (supabase.from("obligations" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `        .order("title", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 91 | `      return (data ?? []) as Obligation[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 92 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 94 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `export function useObligationOccurrences() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 97 | `  const { user, activeWorkspace } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 99 | `    queryKey: ["obligation-occurrences", activeWorkspace?.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `    enabled: !!user && !!activeWorkspace?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 102 | `      const today = new Date();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `      const from = new Date(today);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 104 | `      from.setFullYear(from.getFullYear() - 1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      const until = new Date(today);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `      until.setFullYear(until.getFullYear() + 2);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      const { data, error } = await (supabase.from("obligation_occurrences" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        .gte("due_date", from.toISOString().slice(0, 10))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `        .lte("due_date", until.toISOString().slice(0, 10))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `        .order("due_date", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 113 | `      return (data ?? []) as ObligationOccurrence[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 114 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 115 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 117 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
