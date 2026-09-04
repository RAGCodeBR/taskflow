# src/lib/import-ata.functions.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { z } from "zod";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { generateGeminiContent } from "@/lib/gemini.server";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `const InputSchema = z` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 7 | `  .object({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `    pdfBase64: z.string().optional(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `    text: z.string().optional(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `    filename: z.string().optional(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `    members: z.array(z.object({ id: z.string(), name: z.string() })).max(200),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `    clients: z.array(z.object({ id: z.string(), name: z.string() })).max(500),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `    tags: z.array(z.object({ id: z.string(), name: z.string() })).max(500),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  .refine((d) => !!(d.pdfBase64 || (d.text && d.text.trim())), {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 16 | `    message: "Envie um PDF ou cole o texto da ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `export interface ExtractedTask {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 20 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  description: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  assignee_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  assignee_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  due_date: string | null; // ISO yyyy-mm-dd` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  client_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  client_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  tag_name: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  tag_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  priority: "low" | "medium" | "high" | "urgent";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 32 | `const CreateTasksSchema = z.object({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `  tasks: z` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `    .array(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `      z.object({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `        title: z.string().trim().min(1).max(200),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `        description: z.string().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `        status: z.enum(["todo", "done"]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `        status_id: z.string().uuid().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `        column_id: z.string().uuid().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `        priority: z.enum(["low", "medium", "high", "urgent"]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `        due_date: z.string().datetime(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `        assignee_id: z.string().uuid().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `        client_id: z.string().uuid().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `        tag_id: z.string().uuid().nullable(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `    )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `    .min(1)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `    .max(100),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 51 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 52 | `function norm(s: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 53 | `  return s` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 54 | `    .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `    .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `    .toLowerCase()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `    .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 59 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 60 | `function matchByName<T extends { id: string; name: string }>(` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 61 | `  arr: T[],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  name: string | null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `): T | null {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  if (!name) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 65 | `  const n = norm(name);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `  if (!n) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `  // exact` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 68 | `  let m = arr.find((a) => norm(a.name) === n);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 69 | `  if (m) return m;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 70 | `  // first-name / contains` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 71 | `  m = arr.find((a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 72 | `    const an = norm(a.name);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `    return an.includes(n) || n.includes(an) || an.split(/\s+/)[0] === n.split(/\s+/)[0];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 74 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 75 | `  return m ?? null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 76 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 77 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 78 | `export const parseAtaWithGemini = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 79 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  .inputValidator((data: unknown) => InputSchema.parse(data))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 81 | `  .handler(async ({ data }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 82 | `    const memberList = data.members.map((m) => m.name).join(", ") || "(nenhum)";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `    const today = new Date().toISOString().slice(0, 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `    const systemPrompt = \`Você é um assistente que lê atas de reunião em português e extrai APENAS as próximas etapas / próximas ações / próximos passos como tarefas acionáveis.` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 87 | `REGRAS:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `- Foque na seção final da ata (ex.: "Próximas Etapas", "Próximas Ações", "Next Steps", "Action Items", tabela de responsável/ação).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `- Ignore resumo, contexto e pontos discutidos a menos que claramente sejam ações pendentes.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `- Cada tarefa deve ser uma ação concreta, no infinitivo, curta (até 90 caracteres no título).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `- Descrição: contexto extra da ata (1-3 frases). Se não houver, repita o título.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `- Responsável: nome EXATO citado na ata. Tente casar com esta lista de membros do sistema: [${memberList}]. Se não houver correspondência clara, use o nome literal da ata.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `- Prazo: se a ata mencionar data ("até 30/06", "próxima semana"), converta para AAAA-MM-DD. Hoje é ${today}. Caso contrário, null.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `- Cliente: tente identificar o cliente/projeto principal da ata.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `- Tag: classifique brevemente (ex.: "reunião", "cadastro", "configuração").` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `- Prioridade: "low" | "medium" | "high" | "urgent". Padrão "medium". Use "high" se houver urgência explícita.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `SAÍDA: Apenas JSON válido, sem markdown, sem \\`\\`\\`. Formato:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `{"tasks":[{"title":"...","description":"...","assignee_name":"...|null","due_date":"AAAA-MM-DD|null","client_name":"...|null","tag_name":"...|null","priority":"medium"}]}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `    const userContent: Array<` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `      { text: string } | { inlineData: { mimeType: string; data: string } }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `    > = [];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    if (data.pdfBase64) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 105 | `      userContent.push({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `        inlineData: { mimeType: "application/pdf", data: data.pdfBase64 },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 109 | `    userContent.push({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `      text: data.text` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `        ? \`Conteúdo da ata:\n\n${data.text}\n\nExtraia as tarefas conforme as regras.\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `        : \`Extraia as tarefas da ata anexa conforme as regras. Arquivo: ${data.filename ?? "ata.pdf"}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `    const raw = await generateGeminiContent({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `      systemInstruction: systemPrompt,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `      parts: userContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `      responseMimeType: "application/json",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 120 | `    const cleaned = raw` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `      .replace(/^\`\`\`json\s*/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      .replace(/^\`\`\`\s*/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `      .replace(/\`\`\`\s*$/i, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `      .trim();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 126 | `    let parsed: { tasks?: unknown };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 127 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 128 | `      parsed = JSON.parse(cleaned);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `    } catch {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `      // try to recover JSON block` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 131 | `      const m = cleaned.match(/\{[\s\S]*\}/);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 132 | `      if (!m) throw new Error("Não foi possível interpretar a resposta da IA");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 133 | `      parsed = JSON.parse(m[0]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 135 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 136 | `    const taskArr = Array.isArray((parsed as { tasks?: unknown }).tasks)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 137 | `      ? (parsed as { tasks: unknown[] }).tasks` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      : [];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 140 | `    const out: ExtractedTask[] = taskArr.map((t) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 141 | `      const o = (t ?? {}) as Record<string, unknown>;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 142 | `      const assigneeName = typeof o.assignee_name === "string" ? o.assignee_name : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 143 | `      const clientName = typeof o.client_name === "string" ? o.client_name : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 144 | `      const tagName = typeof o.tag_name === "string" ? o.tag_name : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 145 | `      const matchedAssignee = matchByName(data.members, assigneeName);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 146 | `      const matchedClient = matchByName(data.clients, clientName);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 147 | `      const matchedTag = matchByName(data.tags, tagName);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `      const priorityRaw = typeof o.priority === "string" ? o.priority.toLowerCase() : "medium";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 149 | `      const priority = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `        ["low", "medium", "high", "urgent"].includes(priorityRaw) ? priorityRaw : "medium"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      ) as ExtractedTask["priority"];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 153 | `        title: String(o.title ?? "").slice(0, 200) || "Tarefa sem título",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `        description: String(o.description ?? ""),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `        assignee_name: assigneeName,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `        assignee_id: matchedAssignee?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `        due_date:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `          typeof o.due_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.due_date)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `            ? o.due_date` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `            : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `        client_name: clientName,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `        client_id: matchedClient?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `        tag_name: tagName,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `        tag_id: matchedTag?.id ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `        priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 167 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 168 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 169 | `    return { tasks: out };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 170 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 171 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 172 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 173 | ` * Creates extracted tasks through the trusted server client. The browser stays` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 174 | ` * authenticated, while the database write is not affected by browser RLS.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 175 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 176 | `export const createTasksFromAta = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 177 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `  .inputValidator((data: unknown) => CreateTasksSchema.parse(data))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 179 | `  .handler(async ({ data, context }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 180 | `    const userId = context?.userId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `    if (!userId) throw new Error("Sessão expirada. Entre novamente para criar tarefas.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 182 | `    const payload = data.tasks.map(({ tag_id, ...task }) => ({ ...task, created_by: userId }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `    // The server client bypasses task RLS; the database trigger preserves this` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 185 | `    // authenticated user ID when there is no browser auth context.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 186 | `    const { data: created, error: createError } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `      .insert(payload)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `      .select("id");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `    if (createError) throw new Error(createError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 191 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 192 | `    const tagLinks = data.tasks` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `      .map((task, index) => ({ task_id: created?.[index]?.id, tag_id: task.tag_id }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 194 | `      .filter((link): link is { task_id: string; tag_id: string } => !!link.task_id && !!link.tag_id);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 195 | `    if (tagLinks.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 196 | `      const { error: linksError } = await supabaseAdmin.from("task_tag_links").insert(tagLinks);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `      if (linksError) throw new Error(linksError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 198 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 199 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 200 | `    return { created: created?.length ?? 0 };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 201 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 202 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
