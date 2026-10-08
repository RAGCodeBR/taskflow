import { Pin } from "lucide-react";

/** A small thumbtack that sits on the card, without covering its click/drag area. */
export function CalendarTaskPin() {
  return (
    <span
      role="img"
      aria-label="Prioridade pessoal fixada"
      className="pointer-events-none absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[#b4c3dc] bg-[#f8fafc] text-[#14254f] shadow-[0_1px_3px_rgba(15,23,42,0.22)]"
    >
      <Pin className="h-3.5 w-3.5 rotate-35" fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}
