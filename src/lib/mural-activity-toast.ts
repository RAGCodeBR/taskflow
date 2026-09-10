import { toast } from "sonner";

/**
 * Aviso de atividade leve do mural (reação, edição, anexo).
 *
 * Fica embaixo, ao centro, com borda destacada e um pouco mais de tempo na tela
 * — a versão anterior no canto passava despercebida. Não é notificação
 * persistente: aparece e some.
 */
export function muralActivityToast(message: string) {
  toast(message, {
    position: "bottom-center",
    duration: 6500,
    className: "border-2 border-primary font-semibold shadow-xl",
  });
}
