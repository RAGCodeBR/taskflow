import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { APP_UPDATES } from "@/lib/app-updates";
import { AppUpdatePreview } from "./UpdatePreviews";

describe("release thumbnails", () => {
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
  it("lets three feature thumbnails wrap instead of squeezing them into fixed columns", () => {
    const html = renderToStaticMarkup(
      createElement(AppUpdatePreview, { kind: "task-card-activity" }),
    );
    expect(html).toContain("repeat(auto-fit,minmax(min(100%,220px),1fr))");
    expect(html).not.toContain("sm:grid-cols-3");
  });
});
