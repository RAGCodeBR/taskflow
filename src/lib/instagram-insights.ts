/**
 * Lógica pura do painel de Insights de Instagram — sem Supabase, sem React,
 * só as contas que a tela precisa fazer. Fica fácil de testar isolado.
 */

export interface AccountStatLike {
  snapshot_date: string;
  followers_count: number | null;
}

export interface PostLike {
  posted_at: string | null;
}

/** Variação de seguidores entre o snapshot mais recente e o anterior. */
export function followerDelta(stats: AccountStatLike[]): number | null {
  if (stats.length < 2) return null;
  const sorted = [...stats].sort((a, b) => a.snapshot_date.localeCompare(b.snapshot_date));
  const latest = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  if (latest.followers_count == null || previous.followers_count == null) return null;
  return latest.followers_count - previous.followers_count;
}

/** Posts mais recentes primeiro; sem data conhecida vai pro fim. */
export function sortPostsByDate<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    if (!a.posted_at && !b.posted_at) return 0;
    if (!a.posted_at) return 1;
    if (!b.posted_at) return -1;
    return b.posted_at.localeCompare(a.posted_at);
  });
}

/** "Atualizado há Xh" / "há N dias" — mostrado no topo do painel. */
export function formatLastSync(lastSyncAt: string | null, now: Date = new Date()): string {
  if (!lastSyncAt) return "Ainda não sincronizado";
  const diffMs = now.getTime() - new Date(lastSyncAt).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Atualizado há menos de 1h";
  if (hours < 24) return `Atualizado há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Atualizado há ${days} ${days === 1 ? "dia" : "dias"}`;
}
