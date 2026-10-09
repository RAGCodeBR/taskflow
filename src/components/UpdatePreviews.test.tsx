import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { APP_UPDATES } from "@/lib/app-updates";
import { AppUpdatePreview } from "./UpdatePreviews";

describe("release thumbnails", () => {
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
    expect(html).not.toContain("href=");
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
