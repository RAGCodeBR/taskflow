import { toast } from "sonner";

/**
 * Aviso discreto de atividade em background (mural, conversa de tarefa).
 *
 * Fica embaixo, ao centro, com borda destacada e um pouco mais de tempo na
 * tela. Não é notificação persistente: aparece e some.
 */
export function activityToast(message: string) {
  toast(message, {
    position: "bottom-center",
    duration: 6500,
    className: "border-2 border-primary font-semibold shadow-xl",
  });
}
