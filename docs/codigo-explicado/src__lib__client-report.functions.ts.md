# src/lib/client-report.functions.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { generateGeminiContent } from "@/lib/gemini.server";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `export const generateClientReport = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 6 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  .inputValidator(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `    (input: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `      clientId: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `      assigneeIds?: string[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `      assigneeNames?: Record<string, string>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `    }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 13 | `      if (!input?.clientId || typeof input.clientId !== "string")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 14 | `        throw new Error("clientId requerido");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `      if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 16 | `        input.assigneeIds !== undefined &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `        (!Array.isArray(input.assigneeIds) ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `          input.assigneeIds.some((id) => typeof id !== "string" || !id))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 19 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `        throw new Error("Responsável inválido");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `      if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 22 | `        input.assigneeNames !== undefined &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `        (typeof input.assigneeNames !== "object" || Array.isArray(input.assigneeNames))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `        throw new Error("Nomes dos responsáveis inválidos");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 27 | `        clientId: input.clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `        assigneeIds: [...new Set(input.assigneeIds ?? [])].slice(0, 20),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `        assigneeNames: Object.fromEntries(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `          Object.entries(input.assigneeNames ?? {})` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `            .filter(([id, name]) => typeof id === "string" && typeof name === "string")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 32 | `            .map(([id, name]) => [id, name.trim().slice(0, 160)]),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 33 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 36 | `  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  .handler(async ({ data, context }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 38 | `    const { supabase } = context;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    if (!context.userId) throw new Error("Usuário não autenticado");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `    const { data: callerRoles, error: callerRoleError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `      .eq("user_id", context.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `    if (callerRoleError) throw callerRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 47 | `    const isAdmin = callerRoles?.some((item: { role: string }) => item.role === "admin") ?? false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `    // A collaborator can never broaden this query through a manually crafted request.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 49 | `    const assigneeIds = isAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `      ? data.assigneeIds.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `        ? data.assigneeIds` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `        : [context.userId]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `      : [context.userId];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `    if (isAdmin) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 56 | `      const { data: targetRoles, error: targetRoleError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `        .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `        .select("user_id, role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `        .in("user_id", assigneeIds);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `      if (targetRoleError) throw targetRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 61 | `      const eligibleIds = new Set(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `        targetRoles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `          ?.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `            (item: { role: string }) => item.role === "admin" || item.role === "collaborator",` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 65 | `          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `          .map((item: { user_id: string }) => item.user_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 67 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 68 | `      if (assigneeIds.some((id) => !eligibleIds.has(id)))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 69 | `        throw new Error("Selecione apenas administradores ou colaboradores válidos.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `    const { data: client, error: cErr } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `      .from("clients")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `      .select("id, name, description")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `      .eq("id", data.clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `      .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    if (cErr) throw cErr;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 78 | `    if (!client) throw new Error("Cliente não encontrado");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 79 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 80 | `    const { data: tasks, error: tErr } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `      .select(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `        "id, title, description, status, priority, due_date, completed_at, created_at, updated_at, assignee_id",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `      .eq("client_id", data.clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      .in("assignee_id", assigneeIds)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      .is("deleted_at", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `    if (tErr) throw tErr;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `    const taskIds = (tasks ?? []).map((t: { id: string }) => t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `    const [{ data: subs }, { data: notes }, { data: dueChanges }] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `      taskIds.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `        ? supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 95 | `            .from("subtasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `            .select("id, task_id, title, done, position, due_date, completed_at, comment_id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `            .in("task_id", taskIds)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `            .order("position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `        : Promise.resolve({ data: [] as any[] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `      taskIds.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `        ? supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 102 | `            .from("comments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `            .select("id, task_id, title, body, created_at, position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `            .in("task_id", taskIds)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `            .order("position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `        : Promise.resolve({ data: [] as any[] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      taskIds.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `        ? supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 109 | `            .from("task_due_date_changes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `            .select("task_id, old_due_date, new_due_date, reason, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `            .in("task_id", taskIds)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `            .order("created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `        : Promise.resolve({ data: [] as any[] }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 116 | `    const subIds = (subs ?? []).map((s: any) => s.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `    const { data: subDueChanges } = subIds.length` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 118 | `      ? await supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 119 | `          .from("subtask_due_date_changes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `          .select("subtask_id, old_due_date, new_due_date, reason, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `          .in("subtask_id", subIds)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `          .order("created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `      : { data: [] as any[] };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 125 | `    const stripHtml = (s: string | null | undefined) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 126 | `      (s ?? "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `        .replace(/<[^>]+>/g, " ")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `        .replace(/&nbsp;/g, " ")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `        .replace(/\s+/g, " ")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `        .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 132 | `    const today = new Date().toISOString().slice(0, 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `    const isDone = (task: any) => task.status === "done" || Boolean(task.completed_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 134 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 135 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `      client: { name: client.name, description: client.description ?? "" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `      total_tasks: tasks?.length ?? 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      done: (tasks ?? []).filter(isDone).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `      pending: (tasks ?? []).filter((t: any) => !isDone(t)).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 140 | `      overdue: (tasks ?? []).filter((t: any) => !isDone(t) && t.due_date && t.due_date < today)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 141 | `        .length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `      responsaveis: assigneeIds.map((assigneeId) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 143 | `        const assignedTasks = (tasks ?? []).filter((task: any) => task.assignee_id === assigneeId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 144 | `        return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 145 | `          // Names are presentation-only and come from the permitted assignee picker.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 146 | `          // Authorization remains based exclusively on the verified ids above.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 147 | `          nome: data.assigneeNames[assigneeId] || "Colaborador selecionado",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `          total: assignedTasks.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `          concluidas: assignedTasks.filter(isDone).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `          pendentes: assignedTasks.filter((task: any) => !isDone(task)).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 151 | `          atrasadas: assignedTasks.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `            (task: any) => !isDone(task) && task.due_date && task.due_date < today,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 153 | `          ).length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `          tarefas: assignedTasks.map((t: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 155 | `            const taskSubs = (subs ?? []).filter((s: any) => s.task_id === t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 156 | `            const taskNotes = (notes ?? []).filter((n: any) => n.task_id === t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `            const secoes = taskNotes.map((n: any) => ({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `              titulo: n.title ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `              corpo: stripHtml(n.body).slice(0, 600),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `              criada_em: n.created_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `              subtarefas: taskSubs` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `                .filter((s: any) => s.comment_id === n.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 163 | `                .map((s: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 164 | `                  titulo: stripHtml(s.title),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `                  feita: s.done,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `                  concluida_em: s.completed_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `                  prazo: s.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `                  mudancas_prazo: (subDueChanges ?? [])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `                    .filter((c: any) => c.subtask_id === s.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 170 | `                    .map((c: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 171 | `                      de: c.old_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `                      para: c.new_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `                      motivo: c.reason ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `                    })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `                })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `            }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `            const subtarefasRaiz = taskSubs` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `              .filter((s: any) => !s.comment_id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 179 | `              .map((s: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 180 | `                titulo: stripHtml(s.title),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `                feita: s.done,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `                concluida_em: s.completed_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `                prazo: s.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `                mudancas_prazo: (subDueChanges ?? [])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `                  .filter((c: any) => c.subtask_id === s.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 186 | `                  .map((c: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 187 | `                    de: c.old_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `                    para: c.new_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `                    motivo: c.reason ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `                  })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `              }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `            return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 193 | `              titulo: t.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `              descricao: stripHtml(t.description).slice(0, 1000),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `              status: t.status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `              prioridade: t.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `              prazo: t.due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `              concluida_em: t.completed_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `              atrasada: !isDone(t) && Boolean(t.due_date && t.due_date < today),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `              criada_em: t.created_at,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `              secoes,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `              subtarefas_raiz: subtarefasRaiz,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `              mudancas_prazo: (dueChanges ?? [])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `                .filter((c: any) => c.task_id === t.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 205 | `                .map((c: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 206 | `                  de: c.old_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `                  para: c.new_due_date,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `                  motivo: c.reason ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `                })),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `            };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 211 | `          }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `        };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 213 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 215 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 216 | `    const escapeHtml = (value: unknown) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `      String(value ?? "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `        .replace(/&/g, "&amp;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `        .replace(/</g, "&lt;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `        .replace(/>/g, "&gt;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `        .replace(/"/g, "&quot;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `        .replace(/'/g, "&#039;");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `    const formatDate = (value: string | null | undefined) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 224 | `      if (!value) return "não registrado";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 225 | `      const [year, month, day] = value.slice(0, 10).split("-");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 226 | `      return year && month && day ? \`${day}/${month}/${year}\` : value;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 227 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 228 | `    const list = (items: string[], empty: string) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 229 | `      items.length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `        ? \`<ul>${items.map((item) => \`<li>${item}</li>\`).join("")}</ul>\`` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 231 | `        : \`<p>${empty}</p>\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `    const taskDetailHtml = (task: any) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 233 | `      const subtasks = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 234 | `        ...task.subtarefas_raiz,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `        ...task.secoes.flatMap((section: any) => section.subtarefas),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `      const completed = subtasks.filter((subtask: any) => subtask.feita);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `      const pending = subtasks.filter((subtask: any) => !subtask.feita);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 239 | `      const deadlineChanges = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 240 | `        ...task.mudancas_prazo,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `        ...subtasks.flatMap((subtask: any) => subtask.mudancas_prazo),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 242 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `      const doneItems = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 244 | `        ...(task.status === "done" || task.concluida_em` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `          ? [\`Tarefa concluída${task.concluida_em ? \` em ${formatDate(task.concluida_em)}\` : ""}.\`]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `          : []),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `        ...completed.map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `          (subtask: any) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 249 | `            \`${escapeHtml(subtask.titulo)}${subtask.concluida_em ? \` (${formatDate(subtask.concluida_em)})\` : ""}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `        ...task.secoes` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `          .filter((section: any) => section.corpo)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 253 | `          .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `            (section: any) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 255 | `              \`${escapeHtml(section.titulo || "Registro")}: ${escapeHtml(section.corpo)}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 256 | `          ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `      const pendingItems = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 259 | `        ...(task.status === "done" || task.concluida_em` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `          ? []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `          : ["Conclusão da tarefa ainda não registrada."]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `        ...pending.map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `          (subtask: any) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 264 | `            \`${escapeHtml(subtask.titulo)}${subtask.prazo ? \` — prazo ${formatDate(subtask.prazo)}\` : ""}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `      return \`<h3>${escapeHtml(task.titulo)}</h3>` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 268 | `<table><tbody><tr><th>Status</th><td>${escapeHtml(task.status || "Não informado")}${task.atrasada ? " — Em atraso" : ""}</td><th>Prazo</th><td>${formatDate(task.prazo)}</td></tr><tr><th>Prioridade</th><td>${escapeHtml(task.prioridade || "Não informada")}</td><th>Conclusão</th><td>${formatDate(task.concluida_em)}</td></tr></tbody></table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `${task.descricao ? \`<p><strong>Escopo:</strong> ${escapeHtml(task.descricao)}</p>\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `<p><strong>O que foi feito</strong></p>${list(doneItems, "Nenhuma entrega registrada.")}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 271 | `<p><strong>Pendências</strong></p>${list(pendingItems, "Nenhuma pendência registrada.")}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 272 | `<p><strong>Mudanças de prazo</strong></p>${list(` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `        deadlineChanges.map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `          (change: any) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 275 | `            \`${formatDate(change.de)} → ${formatDate(change.para)}${change.motivo ? \`: ${escapeHtml(change.motivo)}\` : ""}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        "Nenhuma mudança de prazo registrada.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `      )}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 280 | `    const fallbackHtml = \`<h2>Visão geral</h2>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 281 | `<p>Este relatório consolida ${payload.total_tasks} tarefa(s) do cliente ${escapeHtml(client.name)}: ${payload.done} concluída(s), ${payload.pending} pendente(s) e ${payload.overdue} em atraso.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 282 | `<table><thead><tr><th>Total</th><th>Concluídas</th><th>Pendentes</th><th>Atrasadas</th></tr></thead><tbody><tr><td>${payload.total_tasks}</td><td>${payload.done}</td><td>${payload.pending}</td><td>${payload.overdue}</td></tr></tbody></table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 283 | `${payload.responsaveis` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `  .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `    (responsavel: any) => \`<h2>Consultor — ${escapeHtml(responsavel.nome)}</h2>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 286 | `<p>${responsavel.total} tarefa(s): ${responsavel.concluidas} concluída(s), ${responsavel.pendentes} pendente(s) e ${responsavel.atrasadas} atrasada(s).</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 287 | `${responsavel.tarefas.length ? responsavel.tarefas.map(taskDetailHtml).join("") : "<p>Nenhuma tarefa atribuída a este consultor.</p>"}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `  .join("")}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 291 | `    const createPrompt = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 292 | `      responsavel: any,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `    ) => \`Produza um Relatório de Atividades em HTML (PT-BR), escrito em primeira pessoa como prestação de contas do consultor "${responsavel.nome}" para o cliente "${client.name}".` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 294 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 295 | `DIRETRIZES:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `- Devolva APENAS HTML (sem markdown, sem \\`\\`\\`).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `- Use somente <h2>, <h3>, <p>, <ul>, <li>, <strong> e <table>.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `- Este pedido contém dados de UM único consultor. Crie exatamente um bloco: <h2>Relatório de Atividades — ${responsavel.nome}</h2>.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `- Abra com <p><strong>Período:</strong> ...</p>, usando o intervalo de datas que puder ser obtido dos registros. Não invente data quando ela não existir.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `- Em seguida, escreva de 3 a 5 parágrafos narrativos, claros e específicos, no estilo: "Durante o período, realizei...". O texto deve explicar o que o consultor fez, para qual sistema/cliente, e por que a atividade é relevante.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `- Agrupe tarefas relacionadas no mesmo parágrafo quando fizer sentido (por exemplo: importação, integração Sicoob, ajustes de identidade). Cite títulos e datas importantes naturalmente no texto.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `- Inclua subtarefas concluídas como entregas concretas, não como uma lista técnica solta.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `- Depois do texto, use <h3>Pendências em aberto</h3> com uma lista apenas das tarefas ou subtarefas que ainda não foram concluídas. Se não houver, diga que não há pendências registradas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `- Use <h3>Mudanças de prazo</h3> e liste somente alterações registradas, com data anterior, nova data e motivo quando houver. Se não houver, diga isso uma única vez.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `- Feche com um parágrafo curto de síntese: o que ficou concluído e o que permanece em acompanhamento.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `- Não faça seção de insights genéricos, não repita status técnicos e não gere uma ficha por tarefa. A prioridade é uma narrativa profissional, fácil de ler e fiel às atividades registradas.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `- Não invente dados, datas, causas, entregas ou conclusões.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 309 | `DADOS (JSON):` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `${JSON.stringify({ client: payload.client, responsavel })}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 312 | `    const individualFallback = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 313 | `      responsavel: any,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `    ) => \`<h2>Relatório de Atividades — ${escapeHtml(responsavel.nome)}</h2>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 315 | `<p>${responsavel.total} tarefa(s) registradas para este cliente: ${responsavel.concluidas} concluída(s), ${responsavel.pendentes} pendente(s) e ${responsavel.atrasadas} atrasada(s).</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 316 | `${responsavel.tarefas.length ? responsavel.tarefas.map(taskDetailHtml).join("") : "<p>Nenhuma tarefa atribuída a este consultor.</p>"}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `    const reports = await Promise.all(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 318 | `      payload.responsaveis.map(async (responsavel: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 319 | `        const geminiRaw = await generateGeminiContent({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 320 | `          systemInstruction:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `            "Escreva relatórios de atividades profissionais, naturais e específicos em HTML limpo. Não invente fatos.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `          parts: [{ text: createPrompt(responsavel) }],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `          responseMimeType: "text/plain",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `          maxOutputTokens: 3000,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 326 | `        const html = geminiRaw` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 327 | `          .replace(/^\`\`\`html\s*/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `          .replace(/\`\`\`\s*$/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `          .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `        return html.length >= 400 ? html : individualFallback(responsavel);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 331 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 333 | `    const html = reports.join("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 334 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 335 | `      html,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `      stats: { total: payload.total_tasks, done: payload.done, pending: payload.pending },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 338 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 339 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
