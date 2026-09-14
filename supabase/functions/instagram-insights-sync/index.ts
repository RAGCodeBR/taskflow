import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

interface Account {
  id: string;
  client_id: string;
  ig_business_id: string;
  access_token: string;
}

// A Graph API rejeita métricas que não fazem sentido pro tipo de mídia (ex.:
// "plays" só existe em vídeo/reels). Em vez de mapear cada combinação, pede o
// conjunto cheio e, se a Meta recusar, tenta de novo com um conjunto menor —
// isso é tratamento de erro esperado da API, não um TODO.
const POST_METRIC_SETS = ["reach,likes,comments,saved,shares", "reach,likes,comments,saved", "reach"];

async function fetchPostInsights(mediaId: string, token: string) {
  for (const metrics of POST_METRIC_SETS) {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${mediaId}/insights?metric=${metrics}&access_token=${token}`,
    );
    const body = await response.json();
    if (response.ok) {
      const values: Record<string, number> = {};
      for (const entry of body.data ?? []) {
        values[entry.name] = entry.values?.[0]?.value ?? 0;
      }
      return values;
    }
  }
  return {};
}

async function syncAccount(admin: ReturnType<typeof createClient>, account: Account) {
  const token = account.access_token;

  // Conta: seguidores + alcance/impressões do dia
  const accountResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}?fields=followers_count&access_token=${token}`,
  );
  const accountData = await accountResponse.json();
  if (!accountResponse.ok) throw new Error(accountData?.error?.message ?? "Falha ao ler a conta.");

  const insightsResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}/insights?metric=reach,impressions&period=day&access_token=${token}`,
  );
  const insightsData = await insightsResponse.json();
  const accountInsights: Record<string, number> = {};
  if (insightsResponse.ok) {
    for (const entry of insightsData.data ?? []) {
      accountInsights[entry.name] = entry.values?.[0]?.value ?? 0;
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  await admin.from("client_social_account_stats").upsert(
    {
      account_id: account.id,
      snapshot_date: today,
      followers_count: accountData.followers_count ?? null,
      reach: accountInsights.reach ?? null,
      impressions: accountInsights.impressions ?? null,
    },
    { onConflict: "account_id,snapshot_date" },
  );

  // Posts recentes + métricas de cada um
  const mediaResponse = await fetch(
    `https://graph.facebook.com/v21.0/${account.ig_business_id}/media?fields=id,caption,media_type,thumbnail_url,media_url,permalink,timestamp&limit=25&access_token=${token}`,
  );
  const mediaData = await mediaResponse.json();
  if (!mediaResponse.ok) throw new Error(mediaData?.error?.message ?? "Falha ao listar os posts.");

  for (const media of mediaData.data ?? []) {
    const metrics = await fetchPostInsights(media.id, token);
    await admin.from("client_social_posts").upsert(
      {
        account_id: account.id,
        platform_post_id: media.id,
        permalink: media.permalink ?? null,
        caption: media.caption ?? null,
        media_type: media.media_type ?? null,
        thumbnail_url: media.thumbnail_url ?? media.media_url ?? null,
        posted_at: media.timestamp ?? null,
        reach: metrics.reach ?? null,
        likes: metrics.likes ?? null,
        comments: metrics.comments ?? null,
        saved: metrics.saved ?? null,
        shares: metrics.shares ?? null,
        synced_at: new Date().toISOString(),
      },
      { onConflict: "account_id,platform_post_id" },
    );
  }

  await admin
    .from("client_social_accounts")
    .update({ last_sync_at: new Date().toISOString(), last_sync_error: null })
    .eq("id", account.id);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);

    // Chamada só pelo cron ou por um admin testando na mão — nunca pelo
    // navegador de um usuário comum. Segredo próprio (CRON_SECRET), não a
    // service role key: essa é injetada automaticamente pela plataforma e não
    // é algo que a gente define/confirma aqui, então não é confiável pra
    // comparar bit a bit.
    const authorization = request.headers.get("Authorization") ?? "";
    const cronSecret = Deno.env.get("CRON_SECRET");
    if (!cronSecret || authorization !== `Bearer ${cronSecret}`)
      return json({ error: "Não autorizado." }, 401);

    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(projectUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: accounts, error } = await admin
      .from("client_social_accounts")
      .select("id, client_id, ig_business_id, access_token")
      .eq("platform", "instagram");
    if (error) return json({ error: error.message }, 500);

    const errors: Array<{ client_id: string; message: string }> = [];
    let synced = 0;
    for (const account of (accounts ?? []) as Account[]) {
      try {
        await syncAccount(admin, account);
        synced += 1;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erro desconhecido.";
        errors.push({ client_id: account.client_id, message });
        await admin
          .from("client_social_accounts")
          .update({ last_sync_error: message })
          .eq("id", account.id);
      }
    }

    return json({ synced, errors });
  } catch (error) {
    console.error(error);
    return json(
      { error: error instanceof Error ? error.message : "Falha inesperada na sincronização." },
      500,
    );
  }
});
