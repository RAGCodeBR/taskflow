import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronDown, History, RefreshCw, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AppUpdatePreview } from "@/components/UpdatePreviews";
import {
  DASHBOARD_UPDATE_VERSION,
  formatAppUpdateDate,
  getVisibleAppUpdates,
  type AppUpdate,
} from "@/lib/app-updates";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ReleaseSection({
  title,
  date,
  status,
  updated = false,
  defaultOpen = false,
  children,
}: {
  title: string;
  date: string;
  status: ReactNode;
  updated?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="rounded-xl border bg-background">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/35"
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${updated ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/[0.09] text-primary"}`}
          >
            {status}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{title}</span>
            <span className="block text-xs text-muted-foreground">{date}</span>
          </span>
          {updated ? (
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              Versão atual
            </span>
          ) : null}
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="space-y-4 p-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function UpdateCenter() {
  const { user, isAdmin, activeWorkspace } = useAuth();
  const updates = useMemo(
    () => getVisibleAppUpdates(isAdmin, activeWorkspace?.slug),
    [isAdmin, activeWorkspace?.slug],
  );
  const latestUpdate = updates[0];
  const UPDATE_VERSION = latestUpdate?.id ?? "";
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(true);
  const [dashboardAcknowledged, setDashboardAcknowledged] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [serviceWorkerUpdateReady, setServiceWorkerUpdateReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const watchedRegistrationsRef = useRef(new Set<ServiceWorkerRegistration>());

  const isSupportedWorkspace = Boolean(latestUpdate);
  const storageKey = useMemo(
    () => (user?.id ? `taskflow:update:${UPDATE_VERSION}:${user.id}` : null),
    [UPDATE_VERSION, user?.id],
  );
  const dashboardStorageKey = useMemo(
    () => (user?.id ? `taskflow:update:${DASHBOARD_UPDATE_VERSION}:${user.id}` : null),
    [user?.id],
  );
  const promptKey = useMemo(
    () =>
      user?.id && activeWorkspace?.id
        ? `taskflow:update-prompt:${UPDATE_VERSION}:${user.id}:${activeWorkspace.id}`
        : null,
    [UPDATE_VERSION, activeWorkspace?.id, user?.id],
  );
  // O catálogo seleciona as novidades permitidas no ambiente e para o público.
  // O histórico administrativo do Dashboard continua reservado aos admins.
  const canSeeUpdates = isSupportedWorkspace && Boolean(storageKey);

  useEffect(() => {
    if (!canSeeUpdates || !storageKey) return;
    setAcknowledged(window.localStorage.getItem(storageKey) === UPDATE_VERSION);
  }, [UPDATE_VERSION, canSeeUpdates, storageKey]);

  useEffect(() => {
    if (!canSeeUpdates || !dashboardStorageKey) return;
    setDashboardAcknowledged(
      window.localStorage.getItem(dashboardStorageKey) === DASHBOARD_UPDATE_VERSION,
    );
  }, [canSeeUpdates, dashboardStorageKey]);

  const hasReleaseUpdate = !acknowledged;
  const hasUpdate = hasReleaseUpdate || serviceWorkerUpdateReady;
  const dashboardIsCurrent = acknowledged || dashboardAcknowledged;

  useEffect(() => {
    if (!canSeeUpdates || !("serviceWorker" in navigator)) return;

    let active = true;
    const cleanup: Array<() => void> = [];
    const watchedRegistrations = watchedRegistrationsRef.current;
    const watchRegistration = (registration: ServiceWorkerRegistration) => {
      if (watchedRegistrations.has(registration)) return;
      watchedRegistrations.add(registration);

      const watchInstallingWorker = () => {
        const worker = registration.installing;
        if (!worker) return;
        const onStateChange = () => {
          if (active && worker.state === "installed" && navigator.serviceWorker.controller) {
            setServiceWorkerUpdateReady(true);
          }
        };
        worker.addEventListener("statechange", onStateChange);
        cleanup.push(() => worker.removeEventListener("statechange", onStateChange));
      };
      registration.addEventListener("updatefound", watchInstallingWorker);
      cleanup.push(() => registration.removeEventListener("updatefound", watchInstallingWorker));
      watchInstallingWorker();
    };

    const checkForUpdate = async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();
      if (!active) return;
      registrations.forEach((registration) => {
        watchRegistration(registration);
        if (registration.waiting && navigator.serviceWorker.controller)
          setServiceWorkerUpdateReady(true);
        void registration.update().catch(() => undefined);
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") void checkForUpdate();
    };
    void checkForUpdate();
    const interval = window.setInterval(() => void checkForUpdate(), 60_000);
    window.addEventListener("focus", onVisibilityChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisibilityChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanup.forEach((remove) => remove());
      watchedRegistrations.clear();
    };
  }, [canSeeUpdates]);

  useEffect(() => {
    if (!canSeeUpdates || !hasUpdate || !promptKey) {
      setShowUpdatePrompt(false);
      return;
    }
    if (serviceWorkerUpdateReady) {
      setShowUpdatePrompt(true);
      return;
    }
    setShowUpdatePrompt(window.sessionStorage.getItem(promptKey) !== UPDATE_VERSION);
  }, [UPDATE_VERSION, canSeeUpdates, hasUpdate, promptKey, serviceWorkerUpdateReady]);

  if (!canSeeUpdates) return null;

  const openPendingUpdate = () => {
    if (promptKey) window.sessionStorage.setItem(promptKey, UPDATE_VERSION);
    setShowUpdatePrompt(false);
    setOpen(true);
  };
  const updateApplication = async () => {
    if (!storageKey) return;
    setRefreshing(true);
    window.localStorage.setItem(storageKey, UPDATE_VERSION);
    setAcknowledged(true);
    setServiceWorkerUpdateReady(false);

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

  const updateDetails = (update: AppUpdate, pending: boolean) => (
    <>
      <AppUpdatePreview kind={update.preview} />
      <div className="space-y-2 rounded-lg bg-muted/35 p-3 text-sm leading-6 text-muted-foreground">
        {update.details.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {pending ? (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
          <p className="text-sm font-medium">
            Atualize para carregar esta versão no seu navegador.
          </p>
          <Button
            type="button"
            className="mt-3 gap-2"
            onClick={() => void updateApplication()}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Atualizando…" : "Atualizar agora"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> Esta versão já foi atualizada neste
          navegador.
        </div>
      )}
    </>
  );

  return (
    <>
      {showUpdatePrompt ? (
        <div
          className="fixed inset-x-3 top-14 z-[70] animate-in slide-in-from-top-2 fade-in md:left-auto md:right-4 md:w-[380px]"
          role="status"
        >
          <div className="rounded-2xl border border-primary/25 bg-background p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Nova atualização disponível</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Esta tela está em uma versão anterior. Veja a novidade e recarregue o TaskFlow
                  para atualizar.
                </p>
                <Button type="button" size="sm" className="mt-3" onClick={openPendingUpdate}>
                  Ver atualizações
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Button
        type="button"
        variant={hasUpdate ? "default" : "outline"}
        size="sm"
        onClick={hasUpdate ? openPendingUpdate : () => setOpen(true)}
        className={`relative h-9 gap-2 rounded-full px-3 text-sm ${hasUpdate ? "animate-pulse shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"}`}
        title={hasUpdate ? "Há uma atualização disponível" : "Este navegador está na versão atual"}
      >
        {hasUpdate ? <Sparkles className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        <span className="hidden lg:inline">
          {hasUpdate ? "Novas atualizações" : "Versão atual"}
        </span>
        {hasUpdate && (
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
          </span>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto p-0 sm:rounded-3xl">
          <div className="border-b bg-gradient-to-br from-primary/[0.1] via-background to-cyan-500/[0.08] px-6 pb-5 pt-6">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                  <History className="h-3.5 w-3.5" /> Histórico de atualizações
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {activeWorkspace?.name}
                </span>
              </div>
              <DialogTitle className="pt-3 text-2xl">Novas atualizações</DialogTitle>
              <DialogDescription className="leading-6">
                Veja o que mudou no TaskFlow e atualize o navegador quando houver uma nova versão.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-6 px-6 py-5">
            {hasUpdate ? (
              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Atualizações pendentes
                </p>
                <ReleaseSection
                  title={latestUpdate.title}
                  date={formatAppUpdateDate(latestUpdate.date)}
                  defaultOpen
                  status={<Sparkles className="h-4 w-4" />}
                >
                  {updateDetails(latestUpdate, true)}
                </ReleaseSection>
              </section>
            ) : null}

            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Atualizações instaladas neste navegador
              </p>
              <div className="space-y-3">
                {!hasUpdate ? (
                  <ReleaseSection
                    title={latestUpdate.title}
                    date={formatAppUpdateDate(latestUpdate.date)}
                    defaultOpen
                    status={<CheckCircle2 className="h-4 w-4" />}
                    updated
                  >
                    {updateDetails(latestUpdate, false)}
                  </ReleaseSection>
                ) : null}

                {updates.slice(1).map((update) => (
                  <ReleaseSection
                    key={update.id}
                    title={update.title}
                    date={formatAppUpdateDate(update.date)}
                    status={<CheckCircle2 className="h-4 w-4" />}
                    updated={update.id === DASHBOARD_UPDATE_VERSION && dashboardIsCurrent}
                  >
                    {updateDetails(update, false)}
                  </ReleaseSection>
                ))}

                {hasUpdate && !isAdmin ? (
                  <p className="rounded-xl border border-dashed px-4 py-3 text-sm text-muted-foreground">
                    As atualizações aparecerão aqui em verde depois de instaladas neste navegador.
                  </p>
                ) : null}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
