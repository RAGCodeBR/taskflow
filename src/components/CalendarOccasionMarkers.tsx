import { CalendarHeart, Flag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { CalendarOccasion } from "@/lib/calendar-occasions";

function labelFor(occasion: CalendarOccasion) {
  return occasion.kind === "holiday"
    ? `Feriado · ${occasion.title}`
    : `${occasion.clientName} · ${occasion.title}`;
}

export function CalendarOccasionMarkers({ occasions }: { occasions: readonly CalendarOccasion[] }) {
  if (occasions.length === 0) return null;
  const first = occasions[0];
  const Icon = first.kind === "holiday" ? Flag : CalendarHeart;
  const tone =
    first.kind === "holiday"
      ? "border-sky-200 bg-sky-50/80 text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
      : "border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-max max-w-full flex-none items-center gap-1 text-left text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={
            occasions.length > 1
              ? `Ver mais ${occasions.length - 1} datas importantes`
              : `Ver ${labelFor(first)}`
          }
          title={labelFor(first)}
        >
          <span className={`flex min-w-0 items-center gap-1 rounded border px-1.5 py-0.5 ${tone}`}>
            <Icon className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{labelFor(first)}</span>
          </span>
          {occasions.length > 1 && (
            <span className="shrink-0 rounded px-1 text-muted-foreground">
              +{occasions.length - 1}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 max-w-[calc(100vw-2rem)] p-2">
        <p className="mb-1 px-1 text-xs font-medium">Datas deste dia</p>
        <ul className="max-h-56 space-y-1 overflow-y-auto">
          {occasions.map((occasion) => (
            <li key={occasion.id} className="flex items-start gap-2 rounded px-1 py-1 text-xs">
              {occasion.kind === "holiday" ? (
                <Flag className="mt-0.5 h-3 w-3 shrink-0 text-sky-600" />
              ) : (
                <CalendarHeart className="mt-0.5 h-3 w-3 shrink-0 text-amber-600" />
              )}
              <span>{labelFor(occasion)}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
