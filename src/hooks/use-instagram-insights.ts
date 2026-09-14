import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ClientSocialAccount {
  id: string;
  client_id: string;
  platform: string;
  page_name: string | null;
  connected_at: string;
  last_sync_at: string | null;
  last_sync_error: string | null;
}
export interface ClientAccountStat {
  snapshot_date: string;
  followers_count: number | null;
  reach: number | null;
  impressions: number | null;
}
export interface ClientSocialPost {
  id: string;
  permalink: string | null;
  caption: string | null;
  media_type: string | null;
  thumbnail_url: string | null;
  posted_at: string | null;
  reach: number | null;
  likes: number | null;
  comments: number | null;
  saved: number | null;
  shares: number | null;
}

// Nunca inclui access_token aqui — a coluna existe na tabela, mas nenhum
// hook do frontend a seleciona.
const ACCOUNT_COLUMNS =
  "id, client_id, platform, page_name, connected_at, last_sync_at, last_sync_error";

export function useClientSocialAccount(clientId: string) {
  return useQuery({
    queryKey: ["client_social_account", clientId],
    enabled: !!clientId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_accounts") as any)
        .select(ACCOUNT_COLUMNS)
        .eq("client_id", clientId)
        .eq("platform", "instagram")
        .maybeSingle();
      // A tabela ainda não existe em produção enquanto a migration não roda —
      // trata como "sem conta conectada" em vez de quebrar a tela.
      if (error && error.code !== "PGRST205" && error.code !== "42P01") throw error;
      return (data ?? null) as ClientSocialAccount | null;
    },
  });
}

export function useClientAccountStats(accountId: string | undefined) {
  return useQuery({
    queryKey: ["client_social_account_stats", accountId],
    enabled: !!accountId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_account_stats") as any)
        .select("snapshot_date, followers_count, reach, impressions")
        .eq("account_id", accountId)
        .order("snapshot_date", { ascending: false })
        .limit(30);
      if (error) throw error;
      return (data ?? []) as ClientAccountStat[];
    },
  });
}

export function useClientSocialPosts(accountId: string | undefined) {
  return useQuery({
    queryKey: ["client_social_posts", accountId],
    enabled: !!accountId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("client_social_posts") as any)
        .select(
          "id, permalink, caption, media_type, thumbnail_url, posted_at, reach, likes, comments, saved, shares",
        )
        .eq("account_id", accountId)
        .order("posted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ClientSocialPost[];
    },
  });
}

export function useConnectInstagram() {
  return async (clientId: string) => {
    const { data, error } = await supabase.functions.invoke("instagram-oauth-callback", {
      body: { action: "begin", client_id: clientId },
    });
    if (error || !data?.authorizeUrl) {
      throw new Error(error?.message ?? "Não foi possível iniciar a conexão com o Instagram.");
    }
    window.location.assign(data.authorizeUrl);
  };
}

export function useDisconnectInstagram() {
  const qc = useQueryClient();
  return async (clientId: string) => {
    const { error } = await supabase.functions.invoke("instagram-oauth-callback", {
      body: { action: "disconnect", client_id: clientId },
    });
    if (error) throw new Error(error.message);
    await qc.invalidateQueries({ queryKey: ["client_social_account", clientId] });
  };
}
