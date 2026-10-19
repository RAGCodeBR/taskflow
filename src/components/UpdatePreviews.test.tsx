import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { APP_UPDATES } from "@/lib/app-updates";
import { AppUpdatePreview } from "./UpdatePreviews";

describe("release thumbnails", () => {
  it("illustrates the attachment count while a subtask is collapsed", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "subtask-attachment-indicator" }));
    expect(html).toContain("data-subtask-attachment-count");
    expect(html).toContain("2 arquivos");
    expect(html).not.toContain("<button");
  });
  it("illustrates a real image thumbnail beside an attachment name", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "subtask-file-thumbnails" }));
    expect(html).toContain("data-subtask-file-thumbnail");
    expect(html).toContain("imagem-campanha.png");
    expect(html).toContain("briefing.pdf");
    expect(html).not.toContain("<button");
  });
  it("illustrates dragging an image into a subtask and previewing it before save", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "subtask-dragged-images" }));
    expect(html).toContain("Arraste imagens aqui");
    expect(html).toContain("data-subtask-drag-preview");
    expect(html).toContain("Arquivos da subtarefa (1)");
    expect(html).not.toContain("<button");
  });
  it("shows when the new version installs automatically and when it waits", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "automatic-safe-update" }));
    expect(html).toContain("Nova versão disponível");
    expect(html).toContain("Atualiza a página");
    expect(html).toContain("Aguarda para instalar");
    expect(html).not.toContain("<button");
  });
  it("shows the pasted print preview and its destination in subtask files", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "subtask-pasted-prints" }));
    expect(html).toContain("Editar subtarefa");
    expect(html).toContain("data-subtask-print-preview");
    expect(html).toContain("Arquivos da subtarefa (1)");
    expect(html).not.toContain("<button");
  });

  it("shows the client calendar and categorized references side by side without real actions", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "client-calendar-references" }));
    expect(html).toContain('Sistemas e senhas');
    expect(html).toContain('Campanha de verão (2)');
    expect(html).toContain('Gincana (1)');
    expect(html).toContain('data-update-preview-grid');
    expect(html).not.toContain('<button');
    expect(html).not.toContain('href=');
  });
  it("illustrates three compact Google Agenda actions without horizontal scrolling", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "agenda-google-compact-actions" }));
    expect(html).toContain("grid-cols-3");
    expect((html.match(/data-agenda-compact-action/g) ?? [])).toHaveLength(3);
    expect(html).toContain("Sincronizar agora");
    expect(html).not.toContain("overflow-x-auto");
    expect(html).not.toContain("<button");
  });

  it("illustrates the centered Google Agenda connection and its three controls on one row", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "agenda-google-connection-layout" }));
    expect(html).toContain("text-center");
    expect(html).toContain("overflow-x-auto");
    expect((html.match(/data-agenda-connection-control/g) ?? [])).toHaveLength(3);
    expect(html).toContain("pessoa@exemplo.com");
    expect(html).not.toContain("<button");
  });

  it("centers the report period and keeps its three controls on one row", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "reports-period-layout" }));
    expect(html).toContain("text-center");
    expect(html).toContain("grid-cols-[1fr_1fr_auto]");
    expect((html.match(/data-report-period-control/g) ?? [])).toHaveLength(3);
    expect(html).toContain("Mês vigente");
    expect(html).not.toContain("<button");
  });

  it("shows two compact client cards in the mobile preview", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "mobile-client-cards" }));
    expect(html).toContain("grid-cols-2");
    expect((html.match(/data-mobile-client-card/g) ?? [])).toHaveLength(2);
    expect(html).toContain("Cliente Exemplo A");
    expect(html).toContain("tarefas");
    expect(html).not.toContain("<button");
  });

  it("shows the Dashboard metrics in two mobile columns", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "dashboard-mobile-metrics" }));
    expect(html).toContain("grid-cols-2");
    expect((html.match(/data-dashboard-metric/g) ?? [])).toHaveLength(4);
    for (const label of ["Total de tarefas", "Concluídas", "Pendentes", "Atrasadas"]) {
      expect(html).toContain(label);
    }
    expect(html).not.toContain("<button");
  });

  it("shows the four obligation metrics in two mobile columns", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "mobile-obligations-metrics" }));
    expect(html).toContain("grid-cols-2");
    expect((html.match(/data-obligation-metric/g) ?? [])).toHaveLength(4);
    for (const label of ["Atrasadas", "Vencem hoje", "Próximos 7 dias", "Concluídas no mês"]) {
      expect(html).toContain(label);
    }
    expect(html).not.toContain("<button");
  });

  it("shows the task controls sharing a mobile gutter", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "mobile-task-toolbar" }));
    expect((html.match(/data-mobile-task-toolbar-row/g) ?? [])).toHaveLength(5);
    for (const label of ["Buscar tarefa", "Kanban", "Lista", "Calendário", "Atribuídas a mim", "Criadas por mim", "Filtros", "Arquivos Cliente", "Etiquetas", "Coluna", "Tarefa"]) {
      expect(html).toContain(label);
    }
    expect(html).not.toContain("<button");
  });

  it("illustrates the Dashboard filters on narrow and wide layouts", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "dashboard-filter-panel" }),
    );
    expect(html).toContain("Filtros");
    expect(html).toContain("Visualização rápida");
    expect(html).toContain("Vence hoje");
    expect(html).toContain("Amanhã");
    expect(html).toContain("Sem prazo");
    expect(html).toContain("Escolher período");
    expect(html).toContain("Situação");
    expect(html).toContain("Responsável");
    expect(html).not.toContain(">Hoje<");
    expect(html).not.toContain("Mais filtros");
    expect(html).toContain("Limpar filtros");
    expect(html).not.toContain("<button");
  });
  it("shows separate rows for members in the team chart preview", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "team-distribution-labels" }),
    );
    expect((html.match(/data-team-preview-row/g) ?? [])).toHaveLength(3);
    expect(html).toContain("Concluídas");
    expect(html).toContain("Em aberto");
    expect(html).not.toContain("<button");
  });
  it("illustrates both compact environment cards", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "compact-environments-mobile" }),
    );
    expect(html).toContain("Consultoria");
    expect(html).toContain("Marketing");
    expect(html).toContain("Abrir painel");
    expect(html).toContain("Acessar");
    expect(html).not.toContain("<button");
  });
  it("illustrates both widths of the animated navigation", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "animated-sidebar" }),
    );
    expect(html).toContain("Dashboard");
    expect(html).toContain("Minhas tarefas");
    expect(html).toContain("barra lateral deslizando");
    expect(html).not.toContain("<button");
  });
  it("illustrates the five retained updates", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "recent-update-history" }),
    );
    expect(html).toContain("Histórico de atualizações");
    expect((html.match(/rounded-md border px-2 py-1.5/g) ?? [])).toHaveLength(5);
    expect(html).not.toContain("<button");
  });
  it("shows the sidebar control beside the night mode in the profile footer", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "sidebar-control-footer" }),
    );
    expect(html).toContain("Modo noturno");
    expect(html).toContain("Recolher menu");
    expect(html).toContain("Seu perfil");
    expect(html).not.toContain("<button");
  });
  it("illustrates the mobile navigation and horizontally browsable views", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "mobile-layout" }));
    expect(html).toContain("Buscar reunião...");
    expect(html).toContain("Deslize para ver as etapas");
    expect(html).toContain("Agenda · deslize para ver outros dias");
    expect(html).not.toContain("<button");
  });
  it("illustrates deletion of a meeting with recorded work", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "meeting-delete-history" }),
    );
    expect(html).toContain("2 pautas · 1 tarefa · 1 ata");
    expect(html).toContain("Tarefas e notas continuam disponíveis.");
    expect(html).toContain("Configurações");
    expect(html).not.toContain("Arquivadas");
    expect(html).not.toContain("<button");
  });
  it("shows the loaded collaborator selection and the refreshed task list", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "collaborator-sync" }),
    );
    expect(html).toContain("Participantes carregados antes de salvar.");
    expect(html).toContain("Você foi adicionada como colaboradora.");
    expect(html).toContain("data-update-preview-grid");
    expect(html).not.toContain("<button");
  });

  it("shows recurring and one-time client dates without hiding task cards", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "client-important-dates" }));
    expect(html).toContain("Todo ano");
    expect(html).toContain("Uma única vez");
    expect(html).toContain("Feriado · Nossa Senhora Aparecida");
    expect(html).toContain("Revisar campanha");
    expect(html).toContain("Data ao lado do dia quando couber");
    expect(html).toContain("Abas do cliente organizadas em duas linhas");
    expect(html).toContain("Arquivadas");
    expect(html).toContain("data-update-preview-grid");
    expect(html).not.toContain("<button");
  });
  it("shows the subtask owner's ranking and the separate summary counters", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "report-subtask-metrics" }),
    );
    expect(html).toContain("Ranking da equipe");
    expect(html).toContain("Tarefas principais");
    expect(html).toContain("Subtarefas concluídas/total");
    expect(html).toContain("Check verde para concluir a tarefa");
    expect(html).toContain("Passe o mouse no card para concluir.");
    expect(html).toContain("data-update-preview-grid");
    expect(html).toContain("repeat(auto-fit,minmax(min(100%,220px),1fr))");
    expect(html).not.toContain("<button");
  });
  it("illustrates the manual close option for an empty meeting agenda", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "meeting-empty-close" }),
    );
    expect(html).toContain("Nenhum item na pauta desta reunião.");
    expect(html).toContain("Encerrar sem pauta");
    expect(html).not.toContain("<button");
  });
  it("illustrates a meeting closed after its agenda and task are completed", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "meeting-auto-complete" }),
    );
    expect(html).toContain("Pauta concluída");
    expect(html).toContain("Tarefa vinculada concluída");
    expect(html).toContain("Encerrada");
    expect(html).not.toContain("<button");
  });
  it("illustrates saved meeting and CRM access without interactive controls", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "permission-save" }));
    expect(html).toContain("Reuniões");
    expect(html).toContain("CRM");
    expect(html).toContain("Acessos mantidos após salvar");
    expect(html).not.toContain("<button");
  });
  it("illustrates permissions in sidebar order without the old import option", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "permission-nav-order" }),
    );
    expect(html.indexOf("Mural LA")).toBeLessThan(html.indexOf("Dashboard"));
    expect(html.indexOf("Dashboard")).toBeLessThan(html.indexOf("Minhas Tarefas"));
    expect(html).not.toContain("Importar ata");
    expect(html).not.toContain("<button");
  });
  it("illustrates the lead initial centered beside its title and company", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "crm-avatar-aligned" }),
    );
    expect(html).toContain("items-center");
    expect(html).toContain("Lead de exemplo");
    expect(html).toContain("Empresa exemplo");
    expect(html).not.toContain("<button");
  });
  it("illustrates the lead card and form without a separate contact field", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "crm-without-contact" }),
    );
    expect(html).toContain("Lead de exemplo");
    expect(html).toContain("E-mail");
    expect(html).toContain("Telefone");
    expect(html).not.toContain("Contato:");
    expect(html).not.toContain("<input");
  });
  it("shows the updated company labels without interactive controls", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "crm-company-labels" }),
    );
    expect(html).toContain("Sem cadastro");
    expect(html).toContain("Selecionar cliente cadastrado");
    expect(html).not.toContain("<button");
  });
  it("illustrates linking an existing company or entering only its name", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "crm-company" }));
    expect(html).toContain("Empresa cadastrada");
    expect(html).toContain("Somente o nome");
    expect(html).toContain("Selecionar cliente do TaskFlow");
    expect(html).not.toContain("<button");
  });
  it("shows the completed personal part without turning the parent into a completed card", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "subtask-participation" }),
    );
    expect(html).toContain("Calendário · Semana e mês");
    expect(html).toContain("9 out");
    expect(html).toContain("Revisar texto");
    expect(html).toContain("Kanban · Concluídas");
    expect(html).toContain("Lista · Concluídas");
    expect(html).toContain("data-update-preview-grid");
    expect(html).not.toContain("<button");
  });
  it("illustrates the title and color controls for a CRM column", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "crm-columns" }));
    expect(html).toContain("Título da coluna");
    expect(html).toContain("Cor da coluna");
    expect(html).toContain("#F06E43");
    expect(html).not.toContain("<input");
    expect(html).not.toContain("<button");
  });
  it("illustrates the CRM pipeline in a responsive, non-interactive preview", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "crm-pipeline" }));
    expect(html).toContain("Novos Leads");
    expect(html).toContain("Proposta Enviada");
    expect(html).toContain("Finalizados");
    expect(html).toContain("grid-cols-1");
    expect(html).toContain("sm:grid-cols-3");
    expect(html).not.toContain("<button");
  });
  it("illustrates one click for accumulated releases and control before reload", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "update-one-click" }),
    );
    expect(html).toContain("3 novidades acumuladas");
    expect(html).toContain("Atualizar agora");
    expect(html).toContain("assumindo esta aba");
    expect(html).not.toContain("<button");
  });
  it("illustrates the replacement worker and reload only after activation", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "update-retry" }));
    expect(html).toContain("Serviço substituído");
    expect(html).toContain("Versão ativada");
    expect(html).not.toContain("<button");
  });
  it("shows the single and multiple assignment notification actions", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "assignment-popup-read" }),
    );
    expect(html).toContain("Marcar como lido");
    expect(html).toContain("Marcar todos como lidos");
    expect(html).toContain("Ver tarefa");
    expect(html).not.toContain("<button");
  });
  it("illustrates automatic verification on open and a direct update button", () => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: "update-shortcut" }));
    expect(html).toContain("Novas atualizações");
    expect(html).toContain("Atualizar agora");
    expect(html).toContain("automaticamente ao abrir");
    expect(html).toContain("somente após seu clique");
    expect(html).not.toContain("<button");
  });
  it.each(APP_UPDATES)("renders a real, non-interactive preview for $id", (update) => {
    const html = renderToStaticMarkup(createElement(AppUpdatePreview, { kind: update.preview }));
    expect(html).toContain("aria-label=");
    expect(html).toContain("rounded");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("<input");
    expect(html).not.toContain("<textarea");
    expect(html).not.toMatch(/<a(?:\s|>)/);
  });

  it("shows the drag and the mandatory reason rather than an unrelated generic image", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "calendar-reschedule" }),
    );
    expect(html).toContain("Calendário · Semana e mês");
    expect(html).toContain("Justificativa da alteração de prazo");
    expect(html).toContain("Cancelar");
    expect(html).toContain("Confirmar");
    expect(html).toContain("ESC cancela");
    expect(html).toContain("repeat(auto-fit,minmax(min(100%,220px),1fr))");
  });
  it("illustrates grouped subtasks and the safe updater in the same responsive delivery", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "calendar-subtasks" }),
    );
    expect(html).toContain("Carrossel da campanha");
    expect(html).toContain("Conteúdo");
    expect(html).toContain("Legenda");
    expect(html).toContain("Arte");
    expect(html).toContain("Atualização segura");
    expect(html).toContain("Preparando a nova versão");
    expect(html).toContain("data-update-preview-grid");
    expect(html).not.toContain("<button");
  });
  it("illustrates a subtask on a different date from its parent", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "calendar-subtask-dates" }),
    );
    expect(html).toContain("09 out");
    expect(html).toContain("12 out");
    expect(html).toContain("Subtarefa de Tarefa principal");
    expect(html).toContain("Texto em destaque");
    expect(html).toContain("sem mostrar tags HTML");
  });
  it("lets three feature thumbnails wrap instead of squeezing them into fixed columns", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "task-card-activity" }),
    );
    expect(html).toContain("repeat(auto-fit,minmax(min(100%,220px),1fr))");
    expect(html).not.toContain("sm:grid-cols-3");
  });
});
