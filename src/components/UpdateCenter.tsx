import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, History, LayoutDashboard, MousePointer2, RefreshCw, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UPDATE_VERSION = "dashboard-interativo-2026-10-01";

function DashboardPreview() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      aria-label="Prévia visual do Dashboard atualizado"
    >
      <div className="flex items-center gap-1.5 border-b bg-white px-3 py-2 dark:bg-slate-900">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[9px] font-semibold text-slate-500">Dashboard TaskFlow</span>
      </div>
      <div className="grid grid-cols-[0.32fr_1fr] gap-2 p-3">
        <div className="space-y-1.5 rounded-lg bg-slate-200/80 p-2 dark:bg-slate-800">
          <div className="h-1.5 w-8 rounded bg-slate-400/70" />
          <div className="h-1.5 w-full rounded bg-slate-300 dark:bg-slate-700" />
          <div className="h-1.5 w-4/5 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="h-1.5 w-3/5 rounded bg-blue-300" />
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            {["bg-blue-100", "bg-emerald-100", "bg-amber-100"].map((color) => (
              <div key={color} className={`h-9 rounded-md ${color} p-1.5`}>
                <div className="h-1.5 w-1/2 rounded bg-slate-400/50" />
                <div className="mt-1.5 h-2 w-1/3 rounded bg-slate-700/70" />
              </div>
            ))}
          </div>
          <div className="rounded-md border bg-white p-2 dark:bg-slate-900">
            <div className="mb-2 h-1.5 w-20 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="flex h-14 items-end gap-1">
              <span className="h-[34%] flex-1 rounded-t bg-amber-400" />
              <span className="h-[58%] flex-1 rounded-t bg-emerald-500" />
              <span className="h-[82%] flex-1 rounded-t bg-amber-400" />
              <span className="h-[48%] flex-1 rounded-t bg-emerald-500" />
              <span className="h-[68%] flex-1 rounded-t bg-amber-400" />
              <span className="h-[42%] flex-1 rounded-t bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UpdateCenter() {
  const { user, isAdmin, activeWorkspace } = useAuth();
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isSupportedWorkspace = activeWorkspace?.slug === "consultoria" || activeWorkspace?.slug === "marketing";
  const storageKey = useMemo(
    () => (user?.id ? `taskflow:update:${UPDATE_VERSION}:${user.id}` : null),
    [user?.id],
  );
  const canSeeUpdates = isAdmin && isSupportedWorkspace && Boolean(storageKey);

  useEffect(() => {
    if (!canSeeUpdates || !storageKey) return;
    setAcknowledged(window.localStorage.getItem(storageKey) === UPDATE_VERSION);
  }, [canSeeUpdates, storageKey]);

  if (!canSeeUpdates) return null;

  const hasUpdate = !acknowledged;
  const updateApplication = async () => {
    if (!storageKey) return;
    setRefreshing(true);
    window.localStorage.setItem(storageKey, UPDATE_VERSION);
    setAcknowledged(true);

    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(async (registration) => {
            await registration.update();
            registration.waiting?.postMessage({ type: "SKIP_WAITING" });
          }),
        );
      }
    } finally {
      window.setTimeout(() => window.location.reload(), 250);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={hasUpdate ? "default" : "ghost"}
        size="sm"
        onClick={() => setOpen(true)}
        className={`relative h-9 gap-2 rounded-full px-3 text-sm ${hasUpdate ? "animate-pulse shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" : ""}`}
        title={hasUpdate ? "Há uma atualização disponível" : "Ver histórico de atualizações"}
      >
        {hasUpdate ? <Sparkles className="h-4 w-4" /> : <History className="h-4 w-4" />}
        <span className="hidden lg:inline">Novas atualizações</span>
        {hasUpdate && (
          <>
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            </span>
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto p-0 sm:rounded-3xl">
          <div className="border-b bg-gradient-to-br from-primary/[0.1] via-background to-cyan-500/[0.08] px-6 pb-5 pt-6">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  {hasUpdate ? <Sparkles className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  {hasUpdate ? "Atualização disponível" : "Atualizado"}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{activeWorkspace?.name}</span>
              </div>
              <DialogTitle className="pt-3 text-2xl">Seu Dashboard ficou mais completo</DialogTitle>
              <DialogDescription className="leading-6">
                Versão de 01 de outubro de 2026. Este registro continua disponível aqui para consulta.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 px-6 pb-6">
            <DashboardPreview />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-muted/30 p-3">
                <LayoutDashboard className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Gráfico de equipe ampliado</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">A distribuição da equipe agora ocupa toda a largura.</p>
              </div>
              <div className="rounded-xl border bg-muted/30 p-3">
                <MousePointer2 className="mb-2 h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Indicadores clicáveis</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Clientes e indicadores abrem as tarefas relacionadas.</p>
              </div>
            </div>

            {hasUpdate ? (
              <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
                <p className="text-sm font-medium">Atualize para carregar a versão nova no seu navegador.</p>
                <Button type="button" className="mt-3 gap-2" onClick={() => void updateApplication()} disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                  {refreshing ? "Atualizando…" : "Atualizar agora"}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">O TaskFlow buscará a versão nova e fará uma recarga forçada.</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Esta versão já foi atualizada neste navegador.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
