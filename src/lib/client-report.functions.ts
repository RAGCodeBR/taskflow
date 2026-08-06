import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateGeminiContent } from "@/lib/gemini.server";

export const generateClientReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { clientId: string; assigneeIds?: string[] }) => {
    if (!input?.clientId || typeof input.clientId !== "string")
      throw new Error("clientId requerido");
    if (
      input.assigneeIds !== undefined &&
      (!Array.isArray(input.assigneeIds) ||
        input.assigneeIds.some((id) => typeof id !== "string" || !id))
    )
      throw new Error("Responsável inválido");
    return {
      clientId: input.clientId,
      assigneeIds: [...new Set(input.assigneeIds ?? [])].slice(0, 20),
    };
  })
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

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", assigneeIds);
    if (profilesError) throw profilesError;
    const profileById = new Map((profiles ?? []).map((profile: any) => [profile.id, profile]));
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
        const profile = profileById.get(assigneeId);
        const assignedTasks = (tasks ?? []).filter((task: any) => task.assignee_id === assigneeId);
        return {
          nome: profile?.full_name || profile?.email || "Colaborador sem nome",
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

    const prompt = `Você é um consultor sênior de operações. Produza um RELATÓRIO CONSULTIVO, detalhado e profissional em HTML (PT-BR) sobre as tarefas do cliente "${client.name}", agrupadas por responsável.

DIRETRIZES:
- Devolva APENAS HTML (sem markdown, sem \`\`\`).
- Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>, <thead>, <tbody>, <tr>, <th>, <td>.
- Comece por <h2>Visão geral</h2> com uma leitura consolidada e uma tabela de indicadores gerais.
- Para CADA responsável, crie <h2>Relatório — NOME</h2>, uma tabela de indicadores individuais e analise TODAS as suas tarefas. Não misture os responsáveis.
- Para cada tarefa, use <h3>NOME DA TAREFA</h3> e cubra claramente, usando subtítulos em <p><strong>…</strong></p> e listas quando necessário:
  * Situação e prazo: status, prioridade, prazo, conclusão e se está atrasada; só diga que há atraso quando o campo atrasada for verdadeiro.
  * O que foi feito: entregas e subtarefas concluídas, com base estrita nos dados.
  * Conclusões: o que efetivamente foi concluído ou validado. Se não houver conclusão registrada, diga isso de forma objetiva.
  * Pendências e encaminhamentos: tarefas/subtarefas abertas e o que precisa ocorrer para avançar, sem sugerir ações genéricas.
  * Leitura consultiva: risco, dependência ou impacto apenas quando estiver fundamentado em prazo, pendência, descrição, seções ou mudanças de prazo.
  * Mudanças de prazo: registre alterações e motivos existentes; se não houver, não invente justificativas.
- Quando um responsável não tiver tarefas, informe isso em seu bloco.
- Este é um relatório por tarefa: não faça apenas um resumo e não omita tarefas por parecerem menos relevantes.
- Não inclua uma seção genérica de "Insights e recomendações" ao final.
- Não invente dados, datas, causas, entregas ou conclusões. Se um campo estiver vazio, diga somente o que os dados permitem.
- Use tom consultivo, preciso e direto, sem jargão desnecessário.

DADOS (JSON):
${JSON.stringify(payload)}`;

    const geminiRaw = await generateGeminiContent({
      systemInstruction:
        "Produza relatórios consultivos detalhados em HTML limpo, sem inventar dados.",
      parts: [{ text: prompt }],
      responseMimeType: "text/plain",
      maxOutputTokens: 5000,
    });
    const geminiHtml = geminiRaw
      .replace(/^```html\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    return {
      html: geminiHtml,
      stats: { total: payload.total_tasks, done: payload.done, pending: payload.pending },
    };
  });
