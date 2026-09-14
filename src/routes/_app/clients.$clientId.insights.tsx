import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Instagram, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useClients } from "@/hooks/use-data";
import {
  useClientAccountStats,
  useClientSocialAccount,
  useClientSocialPosts,
  useConnectInstagram,
  useDisconnectInstagram,
} from "@/hooks/use-instagram-insights";
import { followerDelta, formatLastSync, sortPostsByDate } from "@/lib/instagram-insights";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/clients/$clientId/insights")({
  validateSearch: (search: Record<string, unknown>): { instagram?: string } => ({
    instagram: typeof search.instagram === "string" ? search.instagram : undefined,
  }),
  component: ClientInsightsPage,
});

const CONNECT_FEEDBACK: Record<string, { tone: "success" | "error"; message: string }> = {
  connected: { tone: "success", message: "Instagram conectado com sucesso." },
  error: { tone: "error", message: "Não foi possível conectar o Instagram. Tente novamente." },
  cancelled: { tone: "error", message: "Conexão cancelada." },
  "no-instagram-account": {
    tone: "error",
    message: "Essa Página do Facebook não tem uma conta Instagram Business vinculada.",
  },
};

function ClientInsightsPage() {
  const { clientId } = Route.useParams();
  const { instagram: feedbackKey } = Route.useSearch();
  const { data: clients = [] } = useClients();
  const client = clients.find((item) => item.id === clientId);
  const { data: account, isLoading: loadingAccount } = useClientSocialAccount(clientId);
  const { data: stats = [] } = useClientAccountStats(account?.id);
  const { data: posts = [] } = useClientSocialPosts(account?.id);
  const connectInstagram = useConnectInstagram();
  const disconnectInstagram = useDisconnectInstagram();
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!feedbackKey) return;
    const feedback = CONNECT_FEEDBACK[feedbackKey];
    if (!feedback) return;
    if (feedback.tone === "success") toast.success(feedback.message);
    else toast.error(feedback.message);
  }, [feedbackKey]);

  const latest = stats[0];
  const delta = followerDelta(stats);
  const orderedPosts = sortPostsByDate(posts);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      await connectInstagram(clientId);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "A conexão com o Instagram ainda não foi configurada.",
      );
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectInstagram(clientId);
      toast.success("Instagram desconectado.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao desconectar.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <header className="flex items-center gap-3">
        <Link to="/clients" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="text-sm font-medium text-primary">Insights</p>
          <h1 className="text-2xl font-bold">{client?.name ?? "Cliente"}</h1>
        </div>
      </header>

      {loadingAccount ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" /> Carregando…
        </Card>
      ) : !account ? (
        <Card className="space-y-3 p-10 text-center">
          <Instagram className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Nenhuma conta do Instagram conectada pra este cliente ainda.
          </p>
          <Button onClick={handleConnect} disabled={connecting}>
            {connecting ? "Redirecionando…" : "Conectar Instagram"}
          </Button>
        </Card>
      ) : (
        <>
          <Card className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold">{account.page_name ?? "Conta conectada"}</p>
              <p className="text-xs text-muted-foreground">
                {formatLastSync(account.last_sync_at)}
                {account.last_sync_error
                  ? ` — última sincronização falhou: ${account.last_sync_error}`
                  : ""}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleDisconnect}>
              Desconectar
            </Button>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Seguidores</p>
              <p className="text-2xl font-bold">{latest?.followers_count ?? "—"}</p>
              {delta != null && (
                <p className={`text-xs ${delta >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {delta >= 0 ? "+" : ""}
                  {delta} desde ontem
                </p>
              )}
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Alcance (hoje)</p>
              <p className="text-2xl font-bold">{latest?.reach ?? "—"}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Impressões (hoje)</p>
              <p className="text-2xl font-bold">{latest?.impressions ?? "—"}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold">Posts recentes</h2>
            {orderedPosts.length === 0 ? (
              <Card className="p-6 text-center text-sm text-muted-foreground">
                Nenhum post sincronizado ainda.
              </Card>
            ) : (
              orderedPosts.map((post) => (
                <Card key={post.id} className="flex gap-3 p-3">
                  {post.thumbnail_url && (
                    <img
                      src={post.thumbnail_url}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{post.caption ?? "(sem legenda)"}</p>
                    <p className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Alcance: {post.reach ?? "—"}</span>
                      <span>Curtidas: {post.likes ?? "—"}</span>
                      <span>Comentários: {post.comments ?? "—"}</span>
                      <span>Salvos: {post.saved ?? "—"}</span>
                    </p>
                  </div>
                  {post.permalink && (
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 self-center text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
