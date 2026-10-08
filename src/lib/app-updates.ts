export type UpdateWorkspace = "marketing" | "consultoria";
export type UpdatePreviewKind =
  "calendar-reschedule" | "links-calendar" | "task-prints" | "dashboard";
export type AppUpdate = {
  id: string;
  title: string;
  date: string;
  preview: UpdatePreviewKind;
  audience: "all" | "admin";
  workspaces: readonly UpdateWorkspace[];
  details: readonly string[];
};

// Keep newest first. The first visible entry determines the update notice and
// acknowledgement key, so a release is registered once, not in several screens.
export const APP_UPDATES: readonly AppUpdate[] = [
  {
    id: "arraste-calendario-justificativa-2026-10-07",
    title: "Arraste tarefas para alterar o prazo",
    date: "2026-10-07",
    preview: "calendar-reschedule",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Nas visões de mês e semana, arraste a tarefa para outra data. Um pop-up pequeno pede a justificativa; o prazo só muda depois de preencher e confirmar. ESC ou Cancelar mantêm a data original.",
      "Apenas o prazo da tarefa principal é alterado. Horário e subtarefas ficam intactos. Uma tarefa aberta movida para uma data anterior a hoje aparece como atrasada; uma tarefa concluída continua concluída.",
      "As alterações e suas justificativas ficam salvas neste aparelho quando você está offline e são sincronizadas ao reconectar. O histórico dos relatórios também é atualizado após a sincronização.",
    ],
  },
  {
    id: "links-clicaveis-calendario-tarefas-2026-10-06-r2",
    title: "Links clicáveis e calendário mais organizado",
    date: "2026-10-06",
    preview: "links-calendar",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Links nas tarefas, descrições, subtarefas e conversas abrem em uma nova aba. Nos campos de edição simples, os links aparecem logo abaixo do texto para você abrir sem copiar e colar. No editor de descrição, ficam apenas na própria linha do texto.",
      "O calendário mostra apenas as tarefas principais, no prazo de cada tarefa. Para visualizar as subtarefas, abra a tarefa principal. A mudança vale para Marketing e Consultoria, nas visões de semana e mês.",
    ],
  },
  {
    id: "prints-organizados-em-arquivos-2026-10-02",
    title: "Agora você pode colar prints nas tarefas",
    date: "2026-10-02",
    preview: "task-prints",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Na criação ou edição da tarefa, escreva normalmente na descrição e cole uma imagem com ⌘V ou Ctrl+V. Enquanto edita, o print aparece no texto; ao salvar, ele fica organizado somente em Arquivos, com miniatura e download.",
    ],
  },
  {
    id: "dashboard-interativo-2026-10-01",
    title: "Dashboard mais interativo",
    date: "2026-10-01",
    preview: "dashboard",
    audience: "admin",
    workspaces: ["marketing", "consultoria"],
    details: [
      "A distribuição da equipe ganhou mais espaço e os indicadores passaram a abrir as tarefas relacionadas por cliente.",
    ],
  },
];

export const DASHBOARD_UPDATE_VERSION = "dashboard-interativo-2026-10-01";

export function getVisibleAppUpdates(isAdmin: boolean, workspace?: string) {
  return APP_UPDATES.filter(
    (update) =>
      update.workspaces.some((name) => name === workspace) &&
      (update.audience === "all" || isAdmin),
  );
}

export function formatAppUpdateDate(date: string) {
  // Explicit noon avoids moving a date-only release to the previous local day.
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
