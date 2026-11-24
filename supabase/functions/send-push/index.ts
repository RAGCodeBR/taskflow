// Envia notificações Web Push para os aparelhos do usuário.
//
// Dois jeitos de chamar:
// 1. Pelo banco (trigger em notifications via pg_net), com o header
//    `x-cron-secret` = CRON_SECRET e o corpo `{ notification_id }`.
// 2. Pelo app, botão "Enviar teste", com o JWT do próprio usuário e o corpo
//    `{ test: true }` — envia só para os aparelhos dessa pessoa.
//
// Segredos: CRON_SECRET, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT
// (ex.: "mailto:contato@seudominio").
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";
import {
  buildPushPayload,
  isExpiredSubscription,
  type PushNotificationRow,
  type PushPayload,
} from "./payload.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

type Subscription = { id: string; endpoint: string; p256dh: string; auth: string };

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
  try {
    const publicKey = Deno.env.get("VAPID_PUBLIC_KEY");
    const privateKey = Deno.env.get("VAPID_PRIVATE_KEY");
    const subject = Deno.env.get("VAPID_SUBJECT");
    if (!publicKey || !privateKey || !subject) return json({ error: "Push não configurado." }, 503);
    webpush.setVapidDetails(subject, publicKey, privateKey);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        auth: { persistSession: false, autoRefreshToken: false },
      },
    );
    const body = (await request.json().catch(() => ({}))) as {
      notification_id?: string;
      test?: boolean;
    };

    let userId: string;
    let payload: PushPayload;

    const cronSecret = Deno.env.get("CRON_SECRET");
    if (body.notification_id) {
      if (!cronSecret || request.headers.get("x-cron-secret") !== cronSecret) {
        return json({ error: "Não autorizado." }, 401);
      }
      const { data: notification, error } = await admin
        .from("notifications")
        .select("id, user_id, task_id, type, title, body")
        .eq("id", body.notification_id)
        .maybeSingle();
      if (error) return json({ error: error.message }, 500);
      if (!notification) return json({ sent: 0, reason: "notification not found" });
      userId = notification.user_id as string;
      const { count } = await admin
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false)
        .in("type", ["assignment", "due_soon"]);
      payload = buildPushPayload(notification as PushNotificationRow, count ?? 0);
    } else if (body.test) {
      const token = (request.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
      const { data, error } = await admin.auth.getUser(token);
      if (error || !data.user) return json({ error: "Não autorizado." }, 401);
      userId = data.user.id;
      payload = {
        title: "Notificações ativadas ✅",
        body: "Você vai receber avisos de tarefas por aqui.",
        url: "/tasks/list",
        tag: "test",
        badge: 0,
      };
    } else {
      return json({ error: "Requisição inválida." }, 400);
    }

    const { data: subscriptions, error: subscriptionsError } = await admin
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth")
      .eq("user_id", userId);
    if (subscriptionsError) return json({ error: subscriptionsError.message }, 500);

    let sent = 0;
    const expired: string[] = [];
    await Promise.all(
      ((subscriptions ?? []) as Subscription[]).map(async (subscription) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: subscription.endpoint,
              keys: { p256dh: subscription.p256dh, auth: subscription.auth },
            },
            JSON.stringify(payload),
            { TTL: 60 * 60 * 24, urgency: "high" },
          );
          sent += 1;
        } catch (error) {
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (isExpiredSubscription(statusCode)) expired.push(subscription.id);
          else console.error("push failed", statusCode, error);
        }
      }),
    );
    if (expired.length) await admin.from("push_subscriptions").delete().in("id", expired);
    if (sent) {
      await admin
        .from("push_subscriptions")
        .update({ last_used_at: new Date().toISOString() })
        .eq("user_id", userId)
        .not("id", "in", `(${expired.join(",") || "00000000-0000-0000-0000-000000000000"})`);
    }
    return json({ sent, removed: expired.length });
  } catch (error) {
    console.error(error);
    return json({ error: error instanceof Error ? error.message : "Erro inesperado." }, 500);
  }
});
