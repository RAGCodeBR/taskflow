// Lógica pura do push, sem APIs do Deno, para ser testada com Vitest.

export type PushNotificationRow = {
  id: string;
  task_id: string | null;
  type: string;
  title: string;
  body: string | null;
};

export type PushPayload = { title: string; body: string; url: string; tag: string; badge: number };

export function buildPushPayload(notification: PushNotificationRow, unread: number): PushPayload {
  return {
    title: notification.title,
    body: notification.body ?? "",
    url: notification.task_id ? `/tasks/list?task=${notification.task_id}` : "/tasks/list",
    tag: `${notification.type}:${notification.task_id ?? notification.id}`,
    badge: unread,
  };
}

/** O serviço de push responde 404/410 quando o aparelho cancelou a assinatura. */
export function isExpiredSubscription(statusCode: number | undefined): boolean {
  return statusCode === 404 || statusCode === 410;
}
