import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, ChevronDown, History, RefreshCw, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AppUpdatePreview } from "@/components/UpdatePreviews";
import { activateAppUpdate, checkAppWorkerUpdate } from "@/lib/app-update-install";
import {
  newerPublishedAppUpdate,
  readPublishedAppUpdates,
  type PublishedAppUpdate,
} from "@/lib/published-app-updates";
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
  const [checking, setChecking] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const [published, setPublished] = useState<{
    scope: string;
    release: PublishedAppUpdate | null;
    checked: boolean;
  } | null>(null);
  const checkForUpdateRef = useRef<(() => Promise<void>) | null>(null);
  const watchedRegistrationsRef = useRef(new Set<ServiceWorkerRegistration>());
  const initialWorkerRef = useRef<ServiceWorker | null>(null);
  const scope = `${user?.id}:${activeWorkspace?.slug}:${isAdmin}`;
  const remoteRelease = published?.scope === scope ? published.release : null;
  const versionVerified = published?.scope === scope && published.checked;
  const noticeVersion = remoteRelease?.id ?? UPDATE_VERSION;

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
        ? `taskflow:update-prompt:${noticeVersion}:${user.id}:${activeWorkspace.id}`
        : null,
    [noticeVersion, activeWorkspace?.id, user?.id],
  );
  // O catálogo seleciona as novidades permitidas no ambiente e para o público.
  // O histórico administrativo do Dashboard continua reservado aos admins.
  const canSeeUpdates = isSupportedWorkspace && Boolean(storageKey);

  useEffect(() => {
    if (!canSeeUpdates || !storageKey) return;
    try {
      setAcknowledged(window.localStorage.getItem(storageKey) === UPDATE_VERSION);
    } catch {
      setAcknowledged(false);
    }
  }, [UPDATE_VERSION, canSeeUpdates, storageKey]);

  useEffect(() => {
    if (!canSeeUpdates || !dashboardStorageKey) return;
    try {
      setDashboardAcknowledged(
        window.localStorage.getItem(dashboardStorageKey) === DASHBOARD_UPDATE_VERSION,
      );
    } catch {
      setDashboardAcknowledged(false);
    }
  }, [canSeeUpdates, dashboardStorageKey]);

  const hasReleaseUpdate = !acknowledged;
  const hasNewVersion = Boolean(remoteRelease) || serviceWorkerUpdateReady;
  const hasUpdate = hasReleaseUpdate || hasNewVersion;
  const isCurrent = !hasUpdate && versionVerified;
  const dashboardIsCurrent = acknowledged || dashboardAcknowledged;

  useEffect(() => {
    if (!canSeeUpdates) return;

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

    let running: Promise<void> | null = null;
    const checkForUpdate = (): Promise<void> => {
      if (running) return running;
      running = (async () => {
        if (!navigator.onLine)
          throw new Error(
            "Conecte-se à internet para verificar novas atualizações. Seus dados offline estão preservados.",
          );
        const workerCheck = async () => {
          if (!("serviceWorker" in navigator)) return;
          const registration = await navigator.serviceWorker.getRegistration();
          if (!active || !registration) return;
          if (!initialWorkerRef.current) initialWorkerRef.current = registration.active;
          watchRegistration(registration);
          if (registration.waiting) setServiceWorkerUpdateReady(true);
          await checkAppWorkerUpdate(registration);
          if (active && registration.waiting) setServiceWorkerUpdateReady(true);
        };
        // Keep detecting installed workers even if the independent server check fails.
        const versionCheck = async () => {
          const response = await fetch(`/app-release.json?check=${Date.now()}`, {
            cache: "no-store",
            signal: AbortSignal.timeout(8_000),
          });
          if (!response.ok)
            throw new Error("Não foi possível verificar a versão publicada. Tente novamente.");
          const releases = readPublishedAppUpdates(await response.json());
          if (active)
            setPublished({
              scope,
              release: newerPublishedAppUpdate(releases, updates, isAdmin, activeWorkspace?.slug),
              checked: true,
            });
        };
        const results = await Promise.allSettled([workerCheck(), versionCheck()]);
        if (results[1].status === "rejected") {
          if (active)
            setPublished((previous) =>
              previous?.scope === scope ? { ...previous, checked: false } : null,
            );
          throw results[1].reason;
        }
      })().finally(() => {
        running = null;
      });
      return running;
    };
    checkForUpdateRef.current = checkForUpdate;
    const backgroundCheck = () =>
      void checkForUpdate().catch(() => {
        if (active)
          setPublished((previous) =>
            previous?.scope === scope ? { ...previous, checked: false } : null,
          );
      });

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") backgroundCheck();
    };
    backgroundCheck();
    const interval = window.setInterval(backgroundCheck, 60_000);
    window.addEventListener("focus", onVisibilityChange);
    window.addEventListener("online", backgroundCheck);
    window.addEventListener("offline", backgroundCheck);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onVisibilityChange);
      window.removeEventListener("online", backgroundCheck);
      window.removeEventListener("offline", backgroundCheck);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanup.forEach((remove) => remove());
      watchedRegistrations.clear();
      if (checkForUpdateRef.current === checkForUpdate) checkForUpdateRef.current = null;
    };
  }, [canSeeUpdates, scope, updates, isAdmin, activeWorkspace?.slug]);

  useEffect(() => {
    if (!canSeeUpdates || !hasUpdate || !promptKey) {
      setShowUpdatePrompt(false);
      return;
    }
    if (hasNewVersion) {
      setShowUpdatePrompt(true);
      return;
    }
    try {
      setShowUpdatePrompt(window.sessionStorage.getItem(promptKey) !== noticeVersion);
    } catch {
      setShowUpdatePrompt(true);
    }
  }, [noticeVersion, canSeeUpdates, hasUpdate, promptKey, hasNewVersion]);

  // Opening the centre performs the check; no additional verification click.
  // It never activates the worker or reloads without the user's update click.
  useEffect(() => {
    if (!open || !canSeeUpdates) return;
    let active = true;
    setChecking(true);
    setCheckMessage(null);
    setUpdateError(null);
    void (async () => {
      try {
        await checkForUpdateRef.current?.();
      } catch {
        if (active)
          setCheckMessage(
            navigator.onLine
              ? "Não foi possível verificar a versão publicada. Você pode tentar novamente em Atualizar agora."
              : "Conecte-se à internet para verificar novas atualizações. Seus dados offline estão preservados.",
          );
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [open, canSeeUpdates, scope]);

  if (!canSeeUpdates) return null;

  const openPendingUpdate = () => {
    try {
      if (promptKey) window.sessionStorage.setItem(promptKey, noticeVersion);
    } catch {
      /* Storage can be blocked. */
    }
    setShowUpdatePrompt(false);
    setOpen(true);
  };
  const updateApplication = async () => {
    if (!storageKey || refreshing || checking) return;
    setUpdateError(null);
    if (!navigator.onLine) {
      setUpdateError("Conecte-se à internet para atualizar. Seus dados offline estão preservados.");
      return;
    }
    setRefreshing(true);

    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const activated = await activateAppUpdate(registration);
          const activatedInAnotherTab =
            initialWorkerRef.current &&
            registration.active !== initialWorkerRef.current &&
            registration.active?.state === "activated";
          if (hasNewVersion && !activated && !activatedInAnotherTab)
            throw new Error(
              "A nova versão ainda não está pronta. Aguarde alguns instantes e tente novamente.",
            );
        }
      }
      // Acknowledgement happens only after installation succeeds. Never clear
      // IndexedDB, offline queues, user preferences or unrelated registrations.
      try {
        window.localStorage.setItem(storageKey, UPDATE_VERSION);
        if (remoteRelease && user?.id)
          window.localStorage.setItem(
            `taskflow:update:${remoteRelease.id}:${user.id}`,
            remoteRelease.id,
          );
      } catch {
        /* Still allow the verified reload. */
      }
      window.location.reload();
    } catch (error) {
      setUpdateError(
        error instanceof Error && !(error instanceof TypeError)
          ? error.message
          : "Não foi possível baixar a atualização. Verifique sua conexão e tente novamente.",
      );
      setRefreshing(false);
    }
  };
  const updateButton = (
    <Button
      type="button"
      className="gap-2"
      onClick={() => void updateApplication()}
      disabled={refreshing || checking}
    >
      <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
      {refreshing ? "Atualizando…" : "Atualizar agora"}
    </Button>
  );

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
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> Esta versão está instalada neste navegador.
        </div>
      )}
    </>
  );

  return (
    <>
      {showUpdatePrompt && !open ? (
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
        onClick={openPendingUpdate}
        className={`relative h-9 gap-2 rounded-full px-3 text-sm ${hasUpdate ? "animate-pulse shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]" : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"}`}
        title={
          hasUpdate
            ? "Há uma atualização disponível"
            : isCurrent
              ? "Este navegador está na versão atual"
              : "Versão instalada; abra para verificar atualizações"
        }
      >
        {hasUpdate ? <Sparkles className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
        <span className="hidden lg:inline">
          {hasUpdate ? "Novas atualizações" : isCurrent ? "Versão atual" : "Versão instalada"}
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
            <div className="space-y-2">
              {updateButton}
              {checking ? (
                <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Verificando novas atualizações…
                </p>
              ) : null}
              {checkMessage ? (
                <p role="status" className="text-sm text-muted-foreground">
                  {checkMessage}
                </p>
              ) : null}
              {updateError ? (
                <p
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                >
                  {updateError}
                </p>
              ) : null}
            </div>
            {hasUpdate ? (
              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Atualizações pendentes
                </p>
                <ReleaseSection
                  title={
                    hasNewVersion
                      ? (remoteRelease?.title ?? "Nova versão do TaskFlow")
                      : latestUpdate.title
                  }
                  date={formatAppUpdateDate(remoteRelease?.date ?? latestUpdate.date)}
                  defaultOpen
                  status={<Sparkles className="h-4 w-4" />}
                >
                  {hasNewVersion ? (
                    <>
                      <AppUpdatePreview kind="update-flow" />
                      <p className="text-sm leading-6 text-muted-foreground">
                        Uma versão mais recente está disponível. Atualize para carregar as novidades
                        e suas miniaturas. A página só será recarregada depois que a nova versão
                        estiver pronta.
                      </p>
                    </>
                  ) : (
                    updateDetails(latestUpdate, true)
                  )}
                </ReleaseSection>
              </section>
            ) : null}

            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Atualizações instaladas neste navegador
              </p>
              <div className="space-y-3">
                {!hasReleaseUpdate || hasNewVersion ? (
                  <ReleaseSection
                    title={latestUpdate.title}
                    date={formatAppUpdateDate(latestUpdate.date)}
                    defaultOpen
                    status={<CheckCircle2 className="h-4 w-4" />}
                    updated={isCurrent}
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
