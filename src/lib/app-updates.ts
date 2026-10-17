export type UpdateWorkspace = "marketing" | "consultoria";
export type UpdatePreviewKind =
  | "client-calendar-references"
  | "agenda-google-compact-actions"
  | "agenda-google-connection-layout"
  | "reports-period-layout"
  | "mobile-client-cards"
  | "dashboard-mobile-metrics"
  | "mobile-obligations-metrics"
  | "mobile-task-toolbar"
  | "dashboard-filter-panel"
  | "team-distribution-labels"
  | "compact-environments-mobile"
  | "animated-sidebar"
  | "recent-update-history"
  | "sidebar-control-footer"
  | "mobile-layout"
  | "meeting-delete-history"
  | "collaborator-sync"
  | "client-important-dates"
  | "member-team-dashboard"
  | "report-subtask-metrics"
  | "meeting-empty-close"
  | "meeting-auto-complete"
  | "permission-save"
  | "permission-nav-order"
  | "crm-avatar-aligned"
  | "crm-without-contact"
  | "crm-company-labels"
  | "crm-company"
  | "crm-columns"
  | "crm-pipeline"
  | "subtask-participation"
  | "calendar-subtask-dates"
  | "update-one-click"
  | "update-retry"
  | "assignment-popup-read"
  | "update-shortcut"
  | "calendar-subtasks"
  | "update-flow"
  | "task-card-activity"
  | "task-edit"
  | "calendar-reschedule"
  | "links-calendar"
  | "task-prints"
  | "dashboard";
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
    id: "calendario-dos-clientes-e-referencias-2026-10-16",
    title: "Calendário dos clientes e referências por tópico",
    date: "2026-10-16",
    preview: "client-calendar-references",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Clique em Clientes para abrir o calendário geral ou use a seta do menu para escolher um cliente. Os cards mostram apenas o título; clique para abrir a tarefa completa.",
      "No calendário de um cliente, consulte cadastro, sistemas e senhas ou referências em um painel lateral. Gerenciar clientes mantém acesso à lista e ao cadastro completo.",
      "A nova aba Referências reúne posts, links, observações e imagens por tópico. Edite uma referência para movê-la entre campanhas ou assuntos do mesmo cliente.",
    ],
  },
  {
    id: "acoes-google-agenda-sem-rolagem-2026-10-15",
    title: "Ações da Google Agenda sem rolagem",
    date: "2026-10-15",
    preview: "agenda-google-compact-actions",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Os botões Reconectar Google, Desconectar e Sincronizar agora foram compactados para ocupar a mesma linha dentro do cartão, sem barra de rolagem horizontal. Em telas estreitas, o texto pode quebrar dentro dos botões.",
    ],
  },
  {
    id: "conexao-google-agenda-centralizada-2026-10-15",
    title: "Conexão da Google Agenda organizada",
    date: "2026-10-15",
    preview: "agenda-google-connection-layout",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "O cartão de conexão da Google Agenda centraliza o título e a conta conectada. Reconectar Google, Desconectar e Sincronizar agora ficam na mesma linha, com rolagem horizontal em telas estreitas.",
    ],
  },
  {
    id: "periodo-dos-relatorios-centralizado-2026-10-15",
    title: "Período dos Relatórios centralizado",
    date: "2026-10-15",
    preview: "reports-period-layout",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "No cartão de período dos Relatórios, o título e o intervalo analisado ficam centralizados. Início, Fim e Mês vigente aparecem na mesma linha; em telas muito estreitas, a linha pode ser deslizada sem cortar os campos.",
    ],
  },
  {
    id: "clientes-em-dois-cartoes-no-celular-2026-10-15",
    title: "Clientes em dois cartões por linha no celular",
    date: "2026-10-15",
    preview: "mobile-client-cards",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "A lista de clientes mostra dois cartões por linha no celular. Logo, nome, quantidade de tarefas e ações ficam mais próximos; nomes longos quebram de linha e a mensagem de informações ausentes não ocupa espaço no cartão.",
    ],
  },
  {
    id: "indicadores-do-dashboard-em-duas-colunas-2026-10-15",
    title: "Indicadores do Dashboard em duas colunas no celular",
    date: "2026-10-15",
    preview: "dashboard-mobile-metrics",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "No celular, os indicadores do Dashboard aparecem dois por linha, tanto na visão geral quanto na visão individual. O conteúdo dos cartões foi ajustado para caber na largura menor.",
    ],
  },
  {
    id: "indicadores-de-obrigacoes-em-duas-colunas-2026-10-15",
    title: "Indicadores de Obrigações em duas colunas no celular",
    date: "2026-10-15",
    preview: "mobile-obligations-metrics",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Na página de Obrigações, Atrasadas e Vencem hoje aparecem lado a lado; Próximos 7 dias e Concluídas no mês ocupam a linha seguinte. Os cartões se ajustam para manter os textos legíveis no celular.",
    ],
  },
  {
    id: "barra-de-tarefas-alinhada-no-celular-2026-10-15",
    title: "Controles de tarefas na mesma largura no celular",
    date: "2026-10-15",
    preview: "mobile-task-toolbar",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Na página de tarefas, a busca, as visualizações, os filtros e os botões de ação ocupam a mesma largura no celular. Os três tipos de visualização e os três recortes de tarefas se distribuem por toda a linha; os botões de ação preenchem duas colunas quando há espaço.",
      "As telas de lista e calendário usam a mesma margem da busca em dispositivos móveis.",
    ],
  },
  {
    id: "filtros-do-dashboard-organizados-2026-10-15",
    title: "Filtros do Dashboard em uma janela",
    date: "2026-10-15",
    preview: "dashboard-filter-panel",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "No Dashboard administrativo, o botão Filtros abre uma janela no celular e no computador. A visualização rápida reúne Vence hoje, Amanhã, Semana, Mês, Atrasadas, Sem prazo, Pendentes, Concluídas e o período personalizado. Limpar filtros retorna à visão de todas as tarefas.",
      "Os filtros podem ser combinados e atualizam os indicadores, gráficos e listas do painel.",
      "Prazos informados somente como data são interpretados no dia correto do fuso local.",
    ],
  },
  {
    id: "grafico-equipe-legivel-2026-10-15",
    title: "Gráfico da equipe mais legível",
    date: "2026-10-15",
    preview: "team-distribution-labels",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "O gráfico Distribuição da equipe mostra uma pessoa por linha, evitando nomes sobrepostos em telas estreitas. Passe sobre a barra para ver o nome completo e clique para abrir a carga da pessoa.",
    ],
  },
  {
    id: "ambientes-compactos-no-celular-2026-10-15",
    title: "Ambientes mais compactos no celular",
    date: "2026-10-15",
    preview: "compact-environments-mobile",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Na escolha de ambientes, o título, os espaços e os cartões ficaram menores em telas estreitas. Os dois ambientes e seus botões cabem melhor na mesma tela, sem alterar o layout do computador.",
    ],
  },
  {
    id: "animacao-da-barra-lateral-2026-10-15",
    title: "Barra lateral com animação",
    date: "2026-10-15",
    preview: "animated-sidebar",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Ao expandir ou recolher a barra lateral no computador, a largura e os nomes dos itens mudam suavemente. A marca, os ícones e o destaque do item ativo permanecem alinhados nas duas posições. No celular, o menu desliza ao abrir e fechar.",
    ],
  },
  {
    id: "historico-limitado-a-cinco-atualizacoes-2026-10-15",
    title: "Histórico com as cinco atualizações mais recentes",
    date: "2026-10-15",
    preview: "recent-update-history",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "O histórico mostra somente as cinco atualizações mais recentes, incluindo esta. As entradas mais antigas foram retiradas do catálogo.",
    ],
  },
];

export function getVisibleAppUpdates(isAdmin: boolean, workspace?: string) {
  return APP_UPDATES.filter(
    (update) =>
      update.workspaces.some((name) => name === workspace) &&
      (update.audience === "all" || isAdmin),
  ).slice(0, 5);
}

export function formatAppUpdateDate(date: string) {
  // Explicit noon avoids moving a date-only release to the previous local day.
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
