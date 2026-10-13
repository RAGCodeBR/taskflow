import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CalendarOccasionMarkers } from "./CalendarOccasionMarkers";

describe("calendar occasion markers", () => {
  it("keeps one compact marker and an overflow indicator for crowded days", () => {
    const html = renderToStaticMarkup(
      createElement(CalendarOccasionMarkers, {
        occasions: [
          { id: "holiday", kind: "holiday", title: "Nossa Senhora Aparecida" },
          { id: "client", kind: "client", title: "Aniversário", clientName: "Cliente Exemplo" },
          { id: "client-2", kind: "client", title: "Campanha", clientName: "Outro Cliente" },
        ],
      }),
    );
    expect(html).toContain("Feriado · Nossa Senhora Aparecida");
    expect(html).toContain("+2");
    expect(html).toContain("Ver mais 2 datas importantes");
    expect(html).toContain("truncate");
    expect(html).toContain("w-max max-w-full flex-none");
  });
});
