# src/hooks/use-board-preferences.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `export const ALL_FIELDS = ["tags", "description", "subtasks", "attachments", "priority", "due", "createdAt", "meta"] as const;` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 6 | `export type CardField = (typeof ALL_FIELDS)[number];` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 8 | `export const FIELD_LABELS: Record<CardField, string> = {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 9 | `  tags: "Etiquetas", description: "Descrição", subtasks: "Subtarefas", attachments: "Arquivos externos",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  priority: "Prioridade", due: "Prazo", createdAt: "Data de criação", meta: "Responsável e ações rápidas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 12 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 13 | `const DEFAULT_ORDER: CardField[] = ["tags", "description", "subtasks", "attachments", "priority", "due", "createdAt", "meta"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 14 | `export type KanbanOrientation = "vertical" | "horizontal";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 15 | `export interface BoardPreferences { field_order: CardField[]; hidden_fields: CardField[]; kanban_orientation: KanbanOrientation; }` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 16 | `const DEFAULT_PREFS: BoardPreferences = { field_order: DEFAULT_ORDER, hidden_fields: [], kanban_orientation: "vertical" };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `function migrateFields(fields: string[]): CardField[] {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 19 | `  const out: CardField[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 20 | `  for (const field of fields) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 21 | `    const next = field === "chips" ? ["priority", "due", "createdAt"] : field === "due" ? ["due", "createdAt"] : [field];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `    for (const value of next) if ((ALL_FIELDS as readonly string[]).includes(value) && !out.includes(value as CardField)) out.push(value as CardField);` | Inicia uma repeticao sobre dados ou condicoes. |
| 23 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 24 | `  return out;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 25 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `function normalize(prefs: Partial<BoardPreferences> | null | undefined): BoardPreferences {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 28 | `  const order = migrateFields(Array.isArray(prefs?.field_order) ? prefs.field_order as string[] : []);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 30 | `    field_order: [...order, ...DEFAULT_ORDER.filter((field) => !order.includes(field))],` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 31 | `    hidden_fields: migrateFields(Array.isArray(prefs?.hidden_fields) ? prefs.hidden_fields as string[] : []),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `    kanban_orientation: prefs?.kanban_orientation === "horizontal" ? "horizontal" : "vertical",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 34 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `export function useBoardPreferences() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 37 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `  return useQuery({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 40 | `    queryKey: ["board_preferences", user?.id], enabled: !!user,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `    queryFn: async (): Promise<BoardPreferences> => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 42 | `      if (!user) return DEFAULT_PREFS;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `      const { data } = await supabase.from("board_preferences").select("field_order, hidden_fields, kanban_orientation").eq("user_id", user.id).maybeSingle();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `      const raw = data as Partial<BoardPreferences> | null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `      const normalized = normalize(raw);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `      const rawOrder = Array.isArray(raw?.field_order) ? raw.field_order as string[] : [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `      const rawHidden = Array.isArray(raw?.hidden_fields) ? raw.hidden_fields as string[] : [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `      if (raw && (rawOrder.join("|") !== normalized.field_order.join("|") || rawHidden.join("|") !== normalized.hidden_fields.join("|"))) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 49 | `        void supabase.from("board_preferences").upsert({ user_id: user.id, ...normalized }, { onConflict: "user_id" }).then(() => qc.setQueryData(["board_preferences", user.id], normalized));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 50 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 51 | `      return normalized;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 52 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 56 | `export function useUpdateBoardPreferences() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 57 | `  const qc = useQueryClient(); const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  return useMutation({` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 59 | `    mutationFn: async (patch: Partial<BoardPreferences>) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 60 | `      if (!user) throw new Error("not authenticated");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 61 | `      const next = { ...(qc.getQueryData<BoardPreferences>(["board_preferences", user.id]) ?? DEFAULT_PREFS), ...patch };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `      const { error } = await supabase.from("board_preferences").upsert({ user_id: user.id, ...next }, { onConflict: "user_id" });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `      if (error) throw error; return next;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 64 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 65 | `    onMutate: async (patch) => { if (user) qc.setQueryData(["board_preferences", user.id], (current: BoardPreferences | undefined) => ({ ...(current ?? DEFAULT_PREFS), ...patch })); },` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 66 | `    onSettled: () => { if (user) qc.invalidateQueries({ queryKey: ["board_preferences", user.id] }); },` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 67 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 68 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
