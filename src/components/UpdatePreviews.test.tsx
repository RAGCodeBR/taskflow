import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { APP_UPDATES } from "@/lib/app-updates";
import { AppUpdatePreview } from "./UpdatePreviews";

describe("release thumbnails", () => {
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
    expect(html).toContain("sm:grid-cols-2");
  });
});
