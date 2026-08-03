import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-BkxXroER.mjs";
import { a as createServerFn } from "./server-C9iofFPa.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D_hJEKsH.mjs";

import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/h3-v2.mjs";
import "../_libs/unenv.mjs";


import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";





import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";

import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
const InputSchema = objectType({
  pdfBase64: stringType().optional(),
  text: stringType().optional(),
  filename: stringType().optional(),
  members: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(200),
  clients: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(500),
  tags: arrayType(objectType({
    id: stringType(),
    name: stringType()
  })).max(500)
}).refine((d) => !!(d.pdfBase64 || d.text && d.text.trim()), {
  message: "Envie um PDF ou cole o texto da ata"
});
function norm(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
function matchByName(arr, name) {
  if (!name) return null;
  const n = norm(name);
  if (!n) return null;
  let m = arr.find((a) => norm(a.name) === n);
  if (m) return m;
  m = arr.find((a) => {
    const an = norm(a.name);
    return an.includes(n) || n.includes(an) || an.split(/\s+/)[0] === n.split(/\s+/)[0];
  });
  return m ?? null;
}
const parseAtaWithClaude_createServerFn_handler = createServerRpc({
  id: "b3ad5d952d9f852d7cbe4262d7e8b7bc90ab391dde38df31563c103ded58bf1d",
  name: "parseAtaWithClaude",
  filename: "src/lib/import-ata.functions.ts"
}, (opts) => parseAtaWithClaude.__executeServer(opts));
const parseAtaWithClaude = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema.parse(data)).handler(parseAtaWithClaude_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY ausente");
  const memberList = data.members.map((m) => m.name).join(", ") || "(nenhum)";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
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
  const userContent = [];
  if (data.pdfBase64) {
    userContent.push({
      type: "document",
      source: {
        type: "base64",
        media_type: "application/pdf",
        data: data.pdfBase64
      }
    });
  }
  userContent.push({
    type: "text",
    text: data.text ? `Conteúdo da ata:

${data.text}

Extraia as tarefas conforme as regras.` : `Extraia as tarefas da ata anexa conforme as regras. Arquivo: ${data.filename ?? "ata.pdf"}`
  });
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: userContent
      }]
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Claude API ${res.status}: ${t.slice(0, 300)}`);
  }
  const json = await res.json();
  const raw = json?.content?.[0]?.text ?? "";
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("Não foi possível interpretar a resposta da IA");
    parsed = JSON.parse(m[0]);
  }
  const taskArr = Array.isArray(parsed.tasks) ? parsed.tasks : [];
  const out = taskArr.map((t) => {
    const o = t ?? {};
    const assigneeName = typeof o.assignee_name === "string" ? o.assignee_name : null;
    const clientName = typeof o.client_name === "string" ? o.client_name : null;
    const tagName = typeof o.tag_name === "string" ? o.tag_name : null;
    const matchedAssignee = matchByName(data.members, assigneeName);
    const matchedClient = matchByName(data.clients, clientName);
    const matchedTag = matchByName(data.tags, tagName);
    const priorityRaw = typeof o.priority === "string" ? o.priority.toLowerCase() : "medium";
    const priority = ["low", "medium", "high", "urgent"].includes(priorityRaw) ? priorityRaw : "medium";
    return {
      title: String(o.title ?? "").slice(0, 200) || "Tarefa sem título",
      description: String(o.description ?? ""),
      assignee_name: assigneeName,
      assignee_id: matchedAssignee?.id ?? null,
      due_date: typeof o.due_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.due_date) ? o.due_date : null,
      client_name: clientName,
      client_id: matchedClient?.id ?? null,
      tag_name: tagName,
      tag_id: matchedTag?.id ?? null,
      priority
    };
  });
  return {
    tasks: out
  };
});
export {
  parseAtaWithClaude_createServerFn_handler
};
