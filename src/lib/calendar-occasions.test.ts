import { describe, expect, it } from "vitest";
import type { ClientImportantDate } from "@/hooks/use-client-important-dates";
import { calendarOccasionsForDay } from "./calendar-occasions";

const names = new Map([["client-1", "Cliente Exemplo"]]);
const dates: ClientImportantDate[] = [
  {
    id: "annual",
    client_id: "client-1",
    title: "Aniversário",
    event_date: "2026-10-18",
    recurrence: "annual",
    created_at: "",
    updated_at: "",
  },
  {
    id: "once",
    client_id: "client-1",
    title: "Evento único",
    event_date: "2026-10-18",
    recurrence: "once",
    created_at: "",
    updated_at: "",
  },
  {
    id: "leap",
    client_id: "client-1",
    title: "29 de fevereiro",
    event_date: "2024-02-29",
    recurrence: "annual",
    created_at: "",
    updated_at: "",
  },
];

describe("calendar occasions", () => {
  it("shows annual dates again but one-time dates only in their chosen year", () => {
    expect(
      calendarOccasionsForDay(new Date(2026, 9, 18), dates, names).map((item) => item.title),
    ).toEqual(["Aniversário", "Evento único"]);
    expect(
      calendarOccasionsForDay(new Date(2027, 9, 18), dates, names).map((item) => item.title),
    ).toEqual(["Aniversário"]);
    expect(calendarOccasionsForDay(new Date(2025, 9, 18), dates, names)).toEqual([]);
  });

  it("keeps February 29 annual dates on leap years only", () => {
    expect(
      calendarOccasionsForDay(new Date(2028, 1, 29), dates, names).some(
        (item) => item.title === "29 de fevereiro",
      ),
    ).toBe(true);
    expect(
      calendarOccasionsForDay(new Date(2027, 1, 28), dates, names).some(
        (item) => item.title === "29 de fevereiro",
      ),
    ).toBe(false);
  });

  it("shows national holidays including Good Friday, not optional days", () => {
    expect(calendarOccasionsForDay(new Date(2026, 3, 3), [], names)[0]?.title).toBe(
      "Paixão de Cristo",
    );
    expect(calendarOccasionsForDay(new Date(2027, 2, 26), [], names)[0]?.title).toBe(
      "Paixão de Cristo",
    );
    expect(calendarOccasionsForDay(new Date(2026, 9, 12), [], names)[0]?.title).toBe(
      "Nossa Senhora Aparecida",
    );
    expect(calendarOccasionsForDay(new Date(2026, 5, 4), [], names)).toEqual([]);
  });
});
