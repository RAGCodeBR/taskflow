import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateGeminiContent } from "@/lib/gemini.server";

export const generateClientReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { clientId: string; assigneeId?: string }) => {
    if (!input?.clientId || typeof input.clientId !== "string")
      throw new Error("clientId requerido");
    if (input.assigneeId !== undefined && typeof input.assigneeId !== "string")
      throw new Error("Responsável inválido");
    return { clientId: input.clientId, assigneeId: input.assigneeId };
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
    const assigneeId = isAdmin ? data.assigneeId || context.userId : context.userId;

    if (isAdmin && data.assigneeId && data.assigneeId !== context.userId) {
      const { data: targetRoles, error: targetRoleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", assigneeId);
      if (targetRoleError) throw targetRoleError;
      const isEligible = targetRoles?.some(
        (item: { role: string }) => item.role === "admin" || item.role === "collaborator",
      );
      if (!isEligible) throw new Error("Selecione um administrador ou colaborador válido.");
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
      .eq("assignee_id", assigneeId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    if (tErr) throw tErr;

    const taskIds = (tasks ?? []).map((t) => t.id);
    const [
      { data: subs },
      { data: notes },
      { data: dueChanges },
    ] = await Promise.all([
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

    // Keep the request focused on one person's work. This keeps the report scoped
    // correctly and materially reduces the prompt size sent to Gemini.
    const payload = {
      client: { name: client.name, description: client.description ?? "" },
      total_tasks: tasks?.length ?? 0,
      done: (tasks ?? []).filter((t: any) => t.status === "done" || t.completed_at).length,
      pending: (tasks ?? []).filter((t: any) => t.status !== "done" && !t.completed_at).length,
      tasks: (tasks ?? []).map((t: any) => {
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
          descricao: stripHtml(t.description).slice(0, 400),
          status: t.status,
          prioridade: t.priority,
          prazo: t.due_date,
          concluida_em: t.completed_at,
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

    const prompt = `Você é um analista sênior. Produza um RELATÓRIO INTELIGENTE, objetivo e profissional em HTML (PT-BR) sobre as tarefas atribuídas a uma única pessoa para o cliente "${client.name}".

DIRETRIZES:
- Devolva APENAS HTML (sem markdown, sem \`\`\`).
- Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>, <thead>, <tbody>, <tr>, <th>, <td>.
- Estruture em seções:
  1) <h2>Resumo executivo</h2> (2-4 linhas com o essencial)
  2) <h2>Indicadores</h2> (tabela com totais, concluídas, pendentes, atrasadas, subtarefas concluídas e mudanças de prazo)
  3) <h2>Entregas por período</h2> (agrupe por mês/ano em ordem cronológica, use as datas de conclusão de tarefas E de subtarefas — cada subtarefa concluída é uma entrega pontual; cite o título da subtarefa e a seção/tarefa pai quando útil)
  4) <h2>Detalhamento por tarefa</h2> (somente as tarefas mais relevantes: contexto, subtarefas concluídas e pendentes, prazos e mudanças de prazo)
  5) <h2>Trabalho em andamento</h2> (tarefas/subtarefas não concluídas, com contexto e riscos aparentes)
  6) <h2>Mudanças de prazo</h2> (resuma o padrão; destaque justificativas registradas — inclua tanto as de tarefa quanto as de subtarefa)
  7) Não inclua uma seção de insights, recomendações ou próximos passos.
- Seja específico, mas conciso: cite nomes quando útil e não liste os dados cruamente.
- Não invente dados. Se um campo estiver vazio, ignore.
- Use tom profissional, direto, sem jargão desnecessário.

DADOS (JSON):
${JSON.stringify(payload)}`;

    const geminiRaw = await generateGeminiContent({
      systemInstruction: "Produza relatórios executivos em HTML limpo, sem inventar dados.",
      parts: [{ text: prompt }],
      responseMimeType: "text/plain",
      maxOutputTokens: 1800,
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
