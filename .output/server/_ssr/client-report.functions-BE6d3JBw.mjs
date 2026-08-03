import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-BkxXroER.mjs";
import { a as createServerFn } from "./server-C9iofFPa.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D_hJEKsH.mjs";

import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const generateClientReport_createServerFn_handler = createServerRpc({
  id: "396ec2195f8f36010d13cff4d86b957ebf305db024ad438ebf67ec411374b67c",
  name: "generateClientReport",
  filename: "src/lib/client-report.functions.ts"
}, (opts) => generateClientReport.__executeServer(opts));
const generateClientReport = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => {
  if (!input?.clientId || typeof input.clientId !== "string") throw new Error("clientId requerido");
  return {
    clientId: input.clientId
  };
}).handler(generateClientReport_createServerFn_handler, async ({
  data,
  context
}) => {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY ausente");
  const {
    supabase
  } = context;
  const {
    data: client,
    error: cErr
  } = await supabase.from("clients").select("id, name, description").eq("id", data.clientId).maybeSingle();
  if (cErr) throw cErr;
  if (!client) throw new Error("Cliente não encontrado");
  const {
    data: tasks,
    error: tErr
  } = await supabase.from("tasks").select("id, title, description, status, priority, due_date, completed_at, created_at, updated_at, assignee_id").eq("client_id", data.clientId).is("deleted_at", null).order("created_at", {
    ascending: false
  });
  if (tErr) throw tErr;
  const taskIds = (tasks ?? []).map((t) => t.id);
  const [{
    data: subs
  }, {
    data: notes
  }, {
    data: profiles
  }, {
    data: dueChanges
  }, {
    data: interruptions
  }] = await Promise.all([taskIds.length ? supabase.from("subtasks").select("id, task_id, title, done, position, due_date, completed_at, comment_id").in("task_id", taskIds).order("position") : Promise.resolve({
    data: []
  }), taskIds.length ? supabase.from("comments").select("id, task_id, title, body, created_at, position").in("task_id", taskIds).order("position") : Promise.resolve({
    data: []
  }), supabase.from("profiles").select("id, full_name, email"), taskIds.length ? supabase.from("task_due_date_changes").select("task_id, old_due_date, new_due_date, reason, created_at").in("task_id", taskIds).order("created_at") : Promise.resolve({
    data: []
  }), taskIds.length ? supabase.from("task_interruptions").select("task_id, reason, created_at").in("task_id", taskIds).order("created_at") : Promise.resolve({
    data: []
  })]);
  const subIds = (subs ?? []).map((s) => s.id);
  const {
    data: subDueChanges
  } = subIds.length ? await supabase.from("subtask_due_date_changes").select("subtask_id, old_due_date, new_due_date, reason, created_at").in("subtask_id", subIds).order("created_at") : {
    data: []
  };
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p.full_name || p.email || "?"]));
  const stripHtml = (s) => (s ?? "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  new Map((subs ?? []).map((s) => [s.id, s]));
  const payload = {
    client: {
      name: client.name,
      description: client.description ?? ""
    },
    total_tasks: tasks?.length ?? 0,
    done: (tasks ?? []).filter((t) => t.status === "done" || t.completed_at).length,
    pending: (tasks ?? []).filter((t) => t.status !== "done" && !t.completed_at).length,
    tasks: (tasks ?? []).map((t) => {
      const taskSubs = (subs ?? []).filter((s) => s.task_id === t.id);
      const taskNotes = (notes ?? []).filter((n) => n.task_id === t.id);
      const secoes = taskNotes.map((n) => ({
        titulo: n.title ?? "",
        corpo: stripHtml(n.body).slice(0, 600),
        criada_em: n.created_at,
        subtarefas: taskSubs.filter((s) => s.comment_id === n.id).map((s) => ({
          titulo: stripHtml(s.title),
          feita: s.done,
          concluida_em: s.completed_at,
          prazo: s.due_date,
          mudancas_prazo: (subDueChanges ?? []).filter((c) => c.subtask_id === s.id).map((c) => ({
            de: c.old_due_date,
            para: c.new_due_date,
            motivo: c.reason ?? null
          }))
        }))
      }));
      const subtarefasRaiz = taskSubs.filter((s) => !s.comment_id).map((s) => ({
        titulo: stripHtml(s.title),
        feita: s.done,
        concluida_em: s.completed_at,
        prazo: s.due_date,
        mudancas_prazo: (subDueChanges ?? []).filter((c) => c.subtask_id === s.id).map((c) => ({
          de: c.old_due_date,
          para: c.new_due_date,
          motivo: c.reason ?? null
        }))
      }));
      return {
        titulo: t.title,
        descricao: stripHtml(t.description).slice(0, 800),
        status: t.status,
        prioridade: t.priority,
        prazo: t.due_date,
        concluida_em: t.completed_at,
        criada_em: t.created_at,
        responsavel: t.assignee_id ? profileById.get(t.assignee_id) : null,
        secoes,
        subtarefas_raiz: subtarefasRaiz,
        mudancas_prazo: (dueChanges ?? []).filter((c) => c.task_id === t.id).map((c) => ({
          de: c.old_due_date,
          para: c.new_due_date,
          motivo: c.reason ?? null
        })),
        interrupcoes: (interruptions ?? []).filter((i) => i.task_id === t.id).map((i) => ({
          motivo: i.reason,
          quando: i.created_at
        }))
      };
    })
  };
  const prompt = `Você é um analista sênior. Produza um RELATÓRIO INTELIGENTE em HTML profissional (PT-BR) sobre tudo que foi feito para o cliente "${client.name}".

DIRETRIZES:
- Devolva APENAS HTML (sem markdown, sem \`\`\`).
- Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>, <thead>, <tbody>, <tr>, <th>, <td>.
- Estruture em seções:
  1) <h2>Resumo executivo</h2> (3-6 linhas com o essencial)
  2) <h2>Indicadores</h2> (tabela com totais, concluídas, pendentes, atrasadas, subtarefas concluídas, interrupções, mudanças de prazo)
  3) <h2>Entregas por período</h2> (agrupe por mês/ano em ordem cronológica, use as datas de conclusão de tarefas E de subtarefas — cada subtarefa concluída é uma entrega pontual; cite o título da subtarefa e a seção/tarefa pai quando útil)
  4) <h2>Detalhamento por tarefa</h2> (para cada tarefa relevante: contexto, seções (observações), subtarefas concluídas com data, subtarefas pendentes, prazos e mudanças de prazo — se um motivo foi registrado em uma mudança de prazo de tarefa OU de subtarefa, cite-o textualmente)
  5) <h2>Trabalho em andamento</h2> (tarefas/subtarefas não concluídas, com contexto e riscos aparentes)
  6) <h2>Mudanças de prazo</h2> (resuma o padrão; destaque justificativas registradas — inclua tanto as de tarefa quanto as de subtarefa)
  7) <h2>Interrupções</h2> (se houver — liste os motivos registrados)
  8) <h2>Insights e recomendações</h2> (3-6 bullets acionáveis)
- Seja específico: cite nomes de tarefas e subtarefas quando útil, mas SEM listar tudo cru — sintetize.
- Não invente dados. Se um campo estiver vazio, ignore.
- Use tom profissional, direto, sem jargão desnecessário.

DADOS (JSON):
${JSON.stringify(payload)}`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [{
        role: "system",
        content: "Você produz relatórios executivos em HTML limpo, sem inventar dados."
      }, {
        role: "user",
        content: prompt
      }]
    })
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status === 429) throw new Error("Limite de requisições atingido. Tente novamente em instantes.");
    if (res.status === 402) throw new Error("Créditos de IA esgotados. Adicione créditos no workspace.");
    throw new Error(`AI: ${res.status} ${t.slice(0, 200)}`);
  }
  const json = await res.json();
  const raw = json?.choices?.[0]?.message?.content ?? "";
  const html = raw.replace(/^```html\s*/i, "").replace(/```\s*$/i, "").trim();
  return {
    html,
    stats: {
      total: payload.total_tasks,
      done: payload.done,
      pending: payload.pending
    }
  };
});
export {
  generateClientReport_createServerFn_handler
};
