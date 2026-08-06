import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { generateGeminiContent } from "@/lib/gemini.server";

const InputSchema = z
  .object({
    pdfBase64: z.string().optional(),
    text: z.string().optional(),
    filename: z.string().optional(),
    members: z.array(z.object({ id: z.string(), name: z.string() })).max(200),
    clients: z.array(z.object({ id: z.string(), name: z.string() })).max(500),
    tags: z.array(z.object({ id: z.string(), name: z.string() })).max(500),
  })
  .refine((d) => !!(d.pdfBase64 || (d.text && d.text.trim())), {
    message: "Envie um PDF ou cole o texto da ata",
  });

export interface ExtractedTask {
  title: string;
  description: string;
  assignee_name: string | null;
  assignee_id: string | null;
  due_date: string | null; // ISO yyyy-mm-dd
  client_name: string | null;
  client_id: string | null;
  tag_name: string | null;
  tag_id: string | null;
  priority: "low" | "medium" | "high" | "urgent";
}

const CreateTasksSchema = z.object({
  tasks: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(200),
        description: z.string().nullable(),
        status: z.enum(["todo", "done"]),
        status_id: z.string().uuid().nullable(),
        column_id: z.string().uuid().nullable(),
        priority: z.enum(["low", "medium", "high", "urgent"]),
        due_date: z.string().datetime(),
        assignee_id: z.string().uuid().nullable(),
        client_id: z.string().uuid().nullable(),
        tag_id: z.string().uuid().nullable(),
      }),
    )
    .min(1)
    .max(100),
});

function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function matchByName<T extends { id: string; name: string }>(
  arr: T[],
  name: string | null,
): T | null {
  if (!name) return null;
  const n = norm(name);
  if (!n) return null;
  // exact
  let m = arr.find((a) => norm(a.name) === n);
  if (m) return m;
  // first-name / contains
  m = arr.find((a) => {
    const an = norm(a.name);
    return an.includes(n) || n.includes(an) || an.split(/\s+/)[0] === n.split(/\s+/)[0];
  });
  return m ?? null;
}

export const parseAtaWithGemini = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const memberList = data.members.map((m) => m.name).join(", ") || "(nenhum)";
    const today = new Date().toISOString().slice(0, 10);

    const systemPrompt = `Você é um assistente que lê atas de reunião em português e extrai APENAS as próximas etapas / próximas ações / próximos passos como tarefas acionáveis.

REGRAS:
- Foque na seção final da ata (ex.: "Próximas Etapas", "Próximas Ações", "Next Steps", "Action Items", tabela de responsável/ação).
- Ignore resumo, contexto e pontos discutidos a menos que claramente sejam ações pendentes.
- Cada tarefa deve ser uma ação concreta, no infinitivo, curta (até 90 caracteres no título).
- Descrição: contexto extra da ata (1-3 frases). Se não houver, repita o título.
- Responsável: nome EXATO citado na ata. Tente casar com esta lista de membros do sistema: [${memberList}]. Se não houver correspondência clara, use o nome literal da ata.
- Prazo: se a ata mencionar data ("até 30/06", "próxima semana"), converta para AAAA-MM-DD. Hoje é ${today}. Caso contrário, null.
- Cliente: tente identificar o cliente/projeto principal da ata.
- Tag: classifique brevemente (ex.: "reunião", "cadastro", "configuração").
- Prioridade: "low" | "medium" | "high" | "urgent". Padrão "medium". Use "high" se houver urgência explícita.

SAÍDA: Apenas JSON válido, sem markdown, sem \`\`\`. Formato:
{"tasks":[{"title":"...","description":"...","assignee_name":"...|null","due_date":"AAAA-MM-DD|null","client_name":"...|null","tag_name":"...|null","priority":"medium"}]}`;

    const userContent: Array<
      { text: string } | { inlineData: { mimeType: string; data: string } }
    > = [];
    if (data.pdfBase64) {
      userContent.push({
        inlineData: { mimeType: "application/pdf", data: data.pdfBase64 },
      });
    }
    userContent.push({
      text: data.text
        ? `Conteúdo da ata:\n\n${data.text}\n\nExtraia as tarefas conforme as regras.`
        : `Extraia as tarefas da ata anexa conforme as regras. Arquivo: ${data.filename ?? "ata.pdf"}`,
    });

    const raw = await generateGeminiContent({
      systemInstruction: systemPrompt,
      parts: userContent,
      responseMimeType: "application/json",
    });
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed: { tasks?: unknown };
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // try to recover JSON block
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (!m) throw new Error("Não foi possível interpretar a resposta da IA");
      parsed = JSON.parse(m[0]);
    }

    const taskArr = Array.isArray((parsed as { tasks?: unknown }).tasks)
      ? (parsed as { tasks: unknown[] }).tasks
      : [];

    const out: ExtractedTask[] = taskArr.map((t) => {
      const o = (t ?? {}) as Record<string, unknown>;
      const assigneeName = typeof o.assignee_name === "string" ? o.assignee_name : null;
      const clientName = typeof o.client_name === "string" ? o.client_name : null;
      const tagName = typeof o.tag_name === "string" ? o.tag_name : null;
      const matchedAssignee = matchByName(data.members, assigneeName);
      const matchedClient = matchByName(data.clients, clientName);
      const matchedTag = matchByName(data.tags, tagName);
      const priorityRaw = typeof o.priority === "string" ? o.priority.toLowerCase() : "medium";
      const priority = (
        ["low", "medium", "high", "urgent"].includes(priorityRaw) ? priorityRaw : "medium"
      ) as ExtractedTask["priority"];
      return {
        title: String(o.title ?? "").slice(0, 200) || "Tarefa sem título",
        description: String(o.description ?? ""),
        assignee_name: assigneeName,
        assignee_id: matchedAssignee?.id ?? null,
        due_date:
          typeof o.due_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.due_date)
            ? o.due_date
            : null,
        client_name: clientName,
        client_id: matchedClient?.id ?? null,
        tag_name: tagName,
        tag_id: matchedTag?.id ?? null,
        priority,
      };
    });

    return { tasks: out };
  });

/**
 * Creates extracted tasks through the trusted server client. The browser stays
 * authenticated, while the database write is not affected by browser RLS.
 */
export const createTasksFromAta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => CreateTasksSchema.parse(data))
  .handler(async ({ data, context }) => {
    const userId = context?.userId;
    if (!userId) throw new Error("Sessão expirada. Entre novamente para criar tarefas.");
    const payload = data.tasks.map(({ tag_id, ...task }) => ({ ...task, created_by: userId }));
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // The server client bypasses task RLS; the database trigger preserves this
    // authenticated user ID when there is no browser auth context.
    const { data: created, error: createError } = await supabaseAdmin
      .from("tasks")
      .insert(payload)
      .select("id");
    if (createError) throw new Error(createError.message);

    const tagLinks = data.tasks
      .map((task, index) => ({ task_id: created?.[index]?.id, tag_id: task.tag_id }))
      .filter((link): link is { task_id: string; tag_id: string } => !!link.task_id && !!link.tag_id);
    if (tagLinks.length) {
      const { error: linksError } = await supabaseAdmin.from("task_tag_links").insert(tagLinks);
      if (linksError) throw new Error(linksError.message);
    }

    return { created: created?.length ?? 0 };
  });
