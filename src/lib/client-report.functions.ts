import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateGeminiContent } from "@/lib/gemini.server";

export const generateClientReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      clientId: string;
      assigneeIds?: string[];
      assigneeNames?: Record<string, string>;
    }) => {
      if (!input?.clientId || typeof input.clientId !== "string")
        throw new Error("clientId requerido");
      if (
        input.assigneeIds !== undefined &&
        (!Array.isArray(input.assigneeIds) ||
          input.assigneeIds.some((id) => typeof id !== "string" || !id))
      )
        throw new Error("Responsável inválido");
      if (
        input.assigneeNames !== undefined &&
        (typeof input.assigneeNames !== "object" || Array.isArray(input.assigneeNames))
      )
        throw new Error("Nomes dos responsáveis inválidos");
      return {
        clientId: input.clientId,
        assigneeIds: [...new Set(input.assigneeIds ?? [])].slice(0, 20),
        assigneeNames: Object.fromEntries(
          Object.entries(input.assigneeNames ?? {})
            .filter(([id, name]) => typeof id === "string" && typeof name === "string")
            .map(([id, name]) => [id, name.trim().slice(0, 160)]),
        ),
      };
    },
  )
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    if (!context.userId) throw new Error("Usuário não autenticado");

    const { data: callerRoles, error: callerRoleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (callerRoleError) throw callerRoleError;

    const isAdmin = callerRoles?.some((item: { role: string }) => item.role === "admin") ?? false;
    // A collaborator can never broaden this query through a manually crafted request.
    const assigneeIds = isAdmin
      ? data.assigneeIds.length
        ? data.assigneeIds
        : [context.userId]
      : [context.userId];

    if (isAdmin) {
      const { data: targetRoles, error: targetRoleError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", assigneeIds);
      if (targetRoleError) throw targetRoleError;
      const eligibleIds = new Set(
        targetRoles
          ?.filter(
            (item: { role: string }) => item.role === "admin" || item.role === "collaborator",
          )
          .map((item: { user_id: string }) => item.user_id),
      );
      if (assigneeIds.some((id) => !eligibleIds.has(id)))
        throw new Error("Selecione apenas administradores ou colaboradores válidos.");
    }

    const { data: client, error: cErr } = await supabase
      .from("clients")
      .select("id, name, description")
      .eq("id", data.clientId)
      .maybeSingle();
    if (cErr) throw cErr;
    if (!client) throw new Error("Cliente não encontrado");

    const { data: tasks, error: tErr } = await supabase
      .from("tasks")
      .select(
        "id, title, description, status, priority, due_date, completed_at, created_at, updated_at, assignee_id",
      )
      .eq("client_id", data.clientId)
      .in("assignee_id", assigneeIds)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (tErr) throw tErr;

    const taskIds = (tasks ?? []).map((t) => t.id);
    const [{ data: subs }, { data: notes }, { data: dueChanges }] = await Promise.all([
      taskIds.length
        ? supabase
            .from("subtasks")
            .select("id, task_id, title, done, position, due_date, completed_at, comment_id")
            .in("task_id", taskIds)
            .order("position")
        : Promise.resolve({ data: [] as any[] }),
      taskIds.length
        ? supabase
            .from("comments")
            .select("id, task_id, title, body, created_at, position")
            .in("task_id", taskIds)
            .order("position")
        : Promise.resolve({ data: [] as any[] }),
      taskIds.length
        ? supabase
            .from("task_due_date_changes")
            .select("task_id, old_due_date, new_due_date, reason, created_at")
            .in("task_id", taskIds)
            .order("created_at")
        : Promise.resolve({ data: [] as any[] }),
    ]);

    const subIds = (subs ?? []).map((s: any) => s.id);
    const { data: subDueChanges } = subIds.length
      ? await supabase
          .from("subtask_due_date_changes")
          .select("subtask_id, old_due_date, new_due_date, reason, created_at")
          .in("subtask_id", subIds)
          .order("created_at")
      : { data: [] as any[] };

    const stripHtml = (s: string | null | undefined) =>
      (s ?? "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const today = new Date().toISOString().slice(0, 10);
    const isDone = (task: any) => task.status === "done" || Boolean(task.completed_at);

    const payload = {
      client: { name: client.name, description: client.description ?? "" },
      total_tasks: tasks?.length ?? 0,
      done: (tasks ?? []).filter(isDone).length,
      pending: (tasks ?? []).filter((t: any) => !isDone(t)).length,
      overdue: (tasks ?? []).filter((t: any) => !isDone(t) && t.due_date && t.due_date < today)
        .length,
      responsaveis: assigneeIds.map((assigneeId) => {
        const assignedTasks = (tasks ?? []).filter((task: any) => task.assignee_id === assigneeId);
        return {
          // Names are presentation-only and come from the permitted assignee picker.
          // Authorization remains based exclusively on the verified ids above.
          nome: data.assigneeNames[assigneeId] || "Colaborador selecionado",
          total: assignedTasks.length,
          concluidas: assignedTasks.filter(isDone).length,
          pendentes: assignedTasks.filter((task: any) => !isDone(task)).length,
          atrasadas: assignedTasks.filter(
            (task: any) => !isDone(task) && task.due_date && task.due_date < today,
          ).length,
          tarefas: assignedTasks.map((t: any) => {
            const taskSubs = (subs ?? []).filter((s: any) => s.task_id === t.id);
            const taskNotes = (notes ?? []).filter((n: any) => n.task_id === t.id);
            const secoes = taskNotes.map((n: any) => ({
              titulo: n.title ?? "",
              corpo: stripHtml(n.body).slice(0, 600),
              criada_em: n.created_at,
              subtarefas: taskSubs
                .filter((s: any) => s.comment_id === n.id)
                .map((s: any) => ({
                  titulo: stripHtml(s.title),
                  feita: s.done,
                  concluida_em: s.completed_at,
                  prazo: s.due_date,
                  mudancas_prazo: (subDueChanges ?? [])
                    .filter((c: any) => c.subtask_id === s.id)
                    .map((c: any) => ({
                      de: c.old_due_date,
                      para: c.new_due_date,
                      motivo: c.reason ?? null,
                    })),
                })),
            }));
            const subtarefasRaiz = taskSubs
              .filter((s: any) => !s.comment_id)
              .map((s: any) => ({
                titulo: stripHtml(s.title),
                feita: s.done,
                concluida_em: s.completed_at,
                prazo: s.due_date,
                mudancas_prazo: (subDueChanges ?? [])
                  .filter((c: any) => c.subtask_id === s.id)
                  .map((c: any) => ({
                    de: c.old_due_date,
                    para: c.new_due_date,
                    motivo: c.reason ?? null,
                  })),
              }));
            return {
              titulo: t.title,
              descricao: stripHtml(t.description).slice(0, 1000),
              status: t.status,
              prioridade: t.priority,
              prazo: t.due_date,
              concluida_em: t.completed_at,
              atrasada: !isDone(t) && Boolean(t.due_date && t.due_date < today),
              criada_em: t.created_at,
              secoes,
              subtarefas_raiz: subtarefasRaiz,
              mudancas_prazo: (dueChanges ?? [])
                .filter((c: any) => c.task_id === t.id)
                .map((c: any) => ({
                  de: c.old_due_date,
                  para: c.new_due_date,
                  motivo: c.reason ?? null,
                })),
            };
          }),
        };
      }),
    };

    const escapeHtml = (value: unknown) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    const formatDate = (value: string | null | undefined) => {
      if (!value) return "não registrado";
      const [year, month, day] = value.slice(0, 10).split("-");
      return year && month && day ? `${day}/${month}/${year}` : value;
    };
    const list = (items: string[], empty: string) =>
      items.length
        ? `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
        : `<p>${empty}</p>`;
    const taskDetailHtml = (task: any) => {
      const subtasks = [
        ...task.subtarefas_raiz,
        ...task.secoes.flatMap((section: any) => section.subtarefas),
      ];
      const completed = subtasks.filter((subtask: any) => subtask.feita);
      const pending = subtasks.filter((subtask: any) => !subtask.feita);
      const deadlineChanges = [
        ...task.mudancas_prazo,
        ...subtasks.flatMap((subtask: any) => subtask.mudancas_prazo),
      ];
      const doneItems = [
        ...(task.status === "done" || task.concluida_em
          ? [`Tarefa concluída${task.concluida_em ? ` em ${formatDate(task.concluida_em)}` : ""}.`]
          : []),
        ...completed.map(
          (subtask: any) =>
            `${escapeHtml(subtask.titulo)}${subtask.concluida_em ? ` (${formatDate(subtask.concluida_em)})` : ""}`,
        ),
        ...task.secoes
          .filter((section: any) => section.corpo)
          .map(
            (section: any) =>
              `${escapeHtml(section.titulo || "Registro")}: ${escapeHtml(section.corpo)}`,
          ),
      ];
      const pendingItems = [
        ...(task.status === "done" || task.concluida_em
          ? []
          : ["Conclusão da tarefa ainda não registrada."]),
        ...pending.map(
          (subtask: any) =>
            `${escapeHtml(subtask.titulo)}${subtask.prazo ? ` — prazo ${formatDate(subtask.prazo)}` : ""}`,
        ),
      ];
      return `<h3>${escapeHtml(task.titulo)}</h3>
<table><tbody><tr><th>Status</th><td>${escapeHtml(task.status || "Não informado")}${task.atrasada ? " — Em atraso" : ""}</td><th>Prazo</th><td>${formatDate(task.prazo)}</td></tr><tr><th>Prioridade</th><td>${escapeHtml(task.prioridade || "Não informada")}</td><th>Conclusão</th><td>${formatDate(task.concluida_em)}</td></tr></tbody></table>
${task.descricao ? `<p><strong>Escopo:</strong> ${escapeHtml(task.descricao)}</p>` : ""}
<p><strong>O que foi feito</strong></p>${list(doneItems, "Nenhuma entrega registrada.")}
<p><strong>Pendências</strong></p>${list(pendingItems, "Nenhuma pendência registrada.")}
<p><strong>Mudanças de prazo</strong></p>${list(
        deadlineChanges.map(
          (change: any) =>
            `${formatDate(change.de)} → ${formatDate(change.para)}${change.motivo ? `: ${escapeHtml(change.motivo)}` : ""}`,
        ),
        "Nenhuma mudança de prazo registrada.",
      )}`;
    };
    const fallbackHtml = `<h2>Visão geral</h2>
<p>Este relatório consolida ${payload.total_tasks} tarefa(s) do cliente ${escapeHtml(client.name)}: ${payload.done} concluída(s), ${payload.pending} pendente(s) e ${payload.overdue} em atraso.</p>
<table><thead><tr><th>Total</th><th>Concluídas</th><th>Pendentes</th><th>Atrasadas</th></tr></thead><tbody><tr><td>${payload.total_tasks}</td><td>${payload.done}</td><td>${payload.pending}</td><td>${payload.overdue}</td></tr></tbody></table>
${payload.responsaveis
  .map(
    (responsavel: any) => `<h2>Consultor — ${escapeHtml(responsavel.nome)}</h2>
<p>${responsavel.total} tarefa(s): ${responsavel.concluidas} concluída(s), ${responsavel.pendentes} pendente(s) e ${responsavel.atrasadas} atrasada(s).</p>
${responsavel.tarefas.length ? responsavel.tarefas.map(taskDetailHtml).join("") : "<p>Nenhuma tarefa atribuída a este consultor.</p>"}`,
  )
  .join("")}`;

    const prompt = `Produza um Relatório de Atividades em HTML (PT-BR), escrito em primeira pessoa como prestação de contas de cada consultor para o cliente "${client.name}".

DIRETRIZES:
- Devolva APENAS HTML (sem markdown, sem \`\`\`).
- Use somente <h2>, <h3>, <p>, <ul>, <li>, <strong> e <table>.
- Para CADA responsável, crie um bloco separado: <h2>Relatório de Atividades — NOME</h2>.
- Abra com <p><strong>Período:</strong> ...</p>, usando o intervalo de datas que puder ser obtido dos registros. Não invente data quando ela não existir.
- Em seguida, escreva de 3 a 5 parágrafos narrativos, claros e específicos, no estilo: "Durante o período, realizei...". O texto deve explicar o que o consultor fez, para qual sistema/cliente, e por que a atividade é relevante.
- Agrupe tarefas relacionadas no mesmo parágrafo quando fizer sentido (por exemplo: importação, integração Sicoob, ajustes de identidade). Cite títulos e datas importantes naturalmente no texto.
- Inclua subtarefas concluídas como entregas concretas, não como uma lista técnica solta.
- Depois do texto, use <h3>Pendências em aberto</h3> com uma lista apenas das tarefas ou subtarefas que ainda não foram concluídas. Se não houver, diga que não há pendências registradas.
- Use <h3>Mudanças de prazo</h3> e liste somente alterações registradas, com data anterior, nova data e motivo quando houver. Se não houver, diga isso uma única vez.
- Feche com um parágrafo curto de síntese: o que ficou concluído e o que permanece em acompanhamento.
- Não faça seção de insights genéricos, não repita status técnicos e não gere uma ficha por tarefa. A prioridade é uma narrativa profissional, fácil de ler e fiel às atividades registradas.
- Não invente dados, datas, causas, entregas ou conclusões.

DADOS (JSON):
${JSON.stringify(payload)}`;

    const geminiRaw = await generateGeminiContent({
      systemInstruction:
        "Escreva relatórios de atividades profissionais, naturais e específicos em HTML limpo. Não invente fatos.",
      parts: [{ text: prompt }],
      responseMimeType: "text/plain",
      maxOutputTokens: 3500,
    });
    const geminiHtml = geminiRaw
      .replace(/^```html\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    const html = geminiHtml.length >= 400 ? geminiHtml : fallbackHtml;
    return {
      html,
      stats: { total: payload.total_tasks, done: payload.done, pending: payload.pending },
    };
  });
