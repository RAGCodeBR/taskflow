/**
 * Cor de bolha e avatar por pessoa numa conversa — não é preferência do usuário,
 * só um jeito determinístico de não deixar tudo azul e cinza quando há várias
 * pessoas na mesma demanda. A minha própria mensagem continua com a cor primary
 * (tratada fora daqui); estas são as variações para os outros.
 */

export interface ParticipantColor {
  /** Classe(s) para o fundo da bolha. */
  bubble: string;
  /** Classe(s) para o fundo do avatar/iniciais. */
  avatar: string;
}

// Tons calmos, sempre com texto foreground legível por cima. Ordem pensada para
// que os dois primeiros (os mais comuns numa conversa de 2) já contrastem entre
// si: um slate mais escuro, um azul mais claro.
const PALETTE: ParticipantColor[] = [
  { bubble: "bg-slate-200 dark:bg-slate-700", avatar: "bg-slate-300 dark:bg-slate-600" },
  { bubble: "bg-sky-100 dark:bg-sky-900/50", avatar: "bg-sky-200 dark:bg-sky-800" },
  { bubble: "bg-teal-100 dark:bg-teal-900/50", avatar: "bg-teal-200 dark:bg-teal-800" },
  { bubble: "bg-amber-100 dark:bg-amber-900/40", avatar: "bg-amber-200 dark:bg-amber-800" },
  { bubble: "bg-violet-100 dark:bg-violet-900/45", avatar: "bg-violet-200 dark:bg-violet-800" },
  { bubble: "bg-rose-100 dark:bg-rose-900/40", avatar: "bg-rose-200 dark:bg-rose-800" },
];

export function participantColor(userId: string | null | undefined): ParticipantColor {
  if (!userId) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < userId.length; i += 1) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
