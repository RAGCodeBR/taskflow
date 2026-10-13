import { format, subDays } from "date-fns";
import type { ClientImportantDate } from "@/hooks/use-client-important-dates";

export interface CalendarOccasion {
  id: string;
  kind: "holiday" | "client";
  title: string;
  clientName?: string;
}

// National holidays only. Optional days and state/municipal holidays are not
// included. Review this list against the official annual federal calendar.
const FIXED_NATIONAL_HOLIDAYS: Record<string, string> = {
  "01-01": "Confraternização Universal",
  "04-21": "Tiradentes",
  "05-01": "Dia do Trabalho",
  "09-07": "Independência do Brasil",
  "10-12": "Nossa Senhora Aparecida",
  "11-02": "Finados",
  "11-15": "Proclamação da República",
  "11-20": "Dia da Consciência Negra",
  "12-25": "Natal",
};

// Gregorian computus (Meeus/Jones/Butcher). Paixão de Cristo is two days
// before Easter and is the only movable national holiday in this catalogue.
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k + 7) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function calendarOccasionsForDay(
  day: Date,
  dates: readonly ClientImportantDate[],
  clientNames: ReadonlyMap<string, string>,
): CalendarOccasion[] {
  const dayKey = format(day, "yyyy-MM-dd");
  const monthDay = dayKey.slice(5);
  const fixedHoliday = FIXED_NATIONAL_HOLIDAYS[monthDay];
  const goodFriday = format(subDays(easterSunday(day.getFullYear()), 2), "yyyy-MM-dd") === dayKey;
  const occasions: CalendarOccasion[] = [];

  if (fixedHoliday) {
    occasions.push({ id: `holiday:${dayKey}`, kind: "holiday", title: fixedHoliday });
  }
  if (goodFriday) {
    occasions.push({
      id: `holiday:good-friday:${dayKey}`,
      kind: "holiday",
      title: "Paixão de Cristo",
    });
  }

  for (const date of dates) {
    if (
      date.recurrence === "once"
        ? date.event_date !== dayKey
        : date.event_date.slice(5) !== monthDay || dayKey < date.event_date
    ) {
      continue;
    }
    occasions.push({
      id: `client:${date.id}:${dayKey}`,
      kind: "client",
      title: date.title,
      clientName: clientNames.get(date.client_id) ?? "Cliente",
    });
  }

  return occasions;
}
