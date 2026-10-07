import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  CheckCircle2,
  CalendarDays,
  ChevronDown,
  History,
  ImagePlus,
  LayoutDashboard,
  Link2,
  MousePointer2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UPDATE_VERSION = "links-clicaveis-calendario-tarefas-2026-10-06-r2";
const DASHBOARD_UPDATE_VERSION = "dashboard-interativo-2026-10-01";

function TaskDescriptionPreview() {
  return (
    <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-label="Prévia do novo campo de prints na descrição">
      <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-1 text-[10px] font-semibold text-slate-500">Nova tarefa</span>
      </div>
      <div className="space-y-2.5 p-3">
        <div className="rounded-md border bg-white px-2.5 py-2 dark:bg-slate-900">
          <span className="text-[9px] font-medium text-slate-500">Título</span>
          <div className="mt-1 h-2 w-2/5 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
        <div className="rounded-md border-2 border-primary/40 bg-white p-2.5 shadow-sm dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">Descrição</span>
            <span className="rounded bg-primary px-1.5 py-0.5 text-[8px] font-semibold text-primary-foreground">NOVO</span>
          </div>
          <div className="mt-1.5 rounded border border-dashed border-slate-300 bg-slate-50 p-2 text-[9px] text-slate-400 dark:border-slate-700 dark:bg-slate-950">
            <p>Escreva aqui e cole um print com ⌘V</p>
            <div className="mt-1.5 flex items-center gap-2 rounded border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br from-sky-200 to-indigo-300">
                <ImagePlus className="h-3.5 w-3.5 text-indigo-700" />
              </div>
              <p className="text-[8px] text-slate-500">Print colado — será organizado em Arquivos ao salvar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardUpdatePreview() {
  return (
    <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-label="Prévia da atualização anterior do Dashboard">
      <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
        <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] font-semibold text-slate-500">Dashboard TaskFlow</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[
          ["Tarefas", "bg-blue-100"],
          ["Pendentes", "bg-amber-100"],
          ["Concluídas", "bg-emerald-100"],
        ].map(([label, color]) => (
          <div key={label} className={`rounded-lg ${color} p-2`}>
            <p className="text-[8px] font-medium text-slate-500">{label}</p>
            <div className="mt-1.5 h-3 w-1/3 rounded bg-slate-700/70" />
          </div>
        ))}
      </div>
      <div className="mx-3 mb-3 space-y-1.5 rounded-lg border bg-white p-2 dark:bg-slate-900">
        <div className="h-2 w-1/3 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="flex items-center justify-between rounded bg-slate-100 px-2 py-1.5 text-[8px] text-slate-500 dark:bg-slate-800">
          <span>Cliente com mais atividades</span><MousePointer2 className="h-3 w-3 text-primary" />
        </div>
        <div className="flex items-center justify-between rounded bg-slate-100 px-2 py-1.5 text-[8px] text-slate-500 dark:bg-slate-800">
          <span>Distribuição da equipe</span><MousePointer2 className="h-3 w-3 text-primary" />
        </div>
      </div>
    </div>
  );
}

function TaskLinksCalendarPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-label="Prévia dos links clicáveis e do calendário com tarefas principais">
      <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
          <Link2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold text-slate-500">Links nas tarefas e conversas</span>
        </div>
        <div className="space-y-3 p-3">
          <div className="rounded-lg border bg-white p-3 dark:bg-slate-900">
            <p className="text-[10px] font-semibold">Campanha de outubro</p>
            <p className="mt-1 text-[9px] text-slate-500">Confira o briefing:</p>
            <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-primary underline underline-offset-2">
              example.com/briefing <MousePointer2 className="h-3 w-3" />
            </span>
          </div>
          <div className="ml-5 rounded-xl bg-primary p-3 text-primary-foreground">
            <p className="text-[9px]">Material para revisar:</p>
            <span className="text-[10px] underline underline-offset-2">example.com/material</span>
          </div>
          <p className="text-[9px] text-slate-500">Um clique abre o link em outra aba.</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold text-slate-500">Calendário de tarefas</span>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-lg border bg-white text-[9px] dark:bg-slate-900">
            {["Seg", "Ter", "Qua"].map((day, index) => (
              <div key={day} className="min-h-28 border-r last:border-r-0">
                <p className="border-b bg-slate-100 p-1.5 text-center text-slate-500 dark:bg-slate-800">{day}</p>
                <p className="px-2 pt-2 text-slate-500">{5 + index}</p>
                {index === 1 ? (
                  <div className="mx-1 mt-2 rounded-md border border-emerald-300 bg-emerald-100 p-1.5 text-[8px] font-semibold text-emerald-900">Campanha</div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-dashed p-2 text-[9px] text-slate-500">
            Abra a tarefa para ver Vídeo, Story e as demais subtarefas.
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <button type="button" className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/35">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${updated ? "bg-emerald-500/10 text-emerald-600" : "bg-primary/[0.09] text-primary"}`}>
            {status}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{title}</span>
            <span className="block text-xs text-muted-foreground">{date}</span>
          </span>
          {updated ? (
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Versão atual</span>
          ) : null}
          <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
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
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(true);
  const [dashboardAcknowledged, setDashboardAcknowledged] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [serviceWorkerUpdateReady, setServiceWorkerUpdateReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const watchedRegistrationsRef = useRef(new Set<ServiceWorkerRegistration>());

  const isSupportedWorkspace = activeWorkspace?.slug === "consultoria" || activeWorkspace?.slug === "marketing";
  const storageKey = useMemo(
    () => (user?.id ? `taskflow:update:${UPDATE_VERSION}:${user.id}` : null),
    [user?.id],
  );
  const dashboardStorageKey = useMemo(
    () => (user?.id ? `taskflow:update:${DASHBOARD_UPDATE_VERSION}:${user.id}` : null),
    [user?.id],
  );
  const promptKey = useMemo(
    () => (user?.id && activeWorkspace?.id ? `taskflow:update-prompt:${UPDATE_VERSION}:${user.id}:${activeWorkspace.id}` : null),
    [activeWorkspace?.id, user?.id],
  );
  // Links e calendário valem para todas as pessoas dos dois ambientes.
  // O histórico administrativo do Dashboard continua reservado aos admins.
  const canSeeUpdates = isSupportedWorkspace && Boolean(storageKey);

  useEffect(() => {
    if (!canSeeUpdates || !storageKey) return;
    setAcknowledged(window.localStorage.getItem(storageKey) === UPDATE_VERSION);
  }, [canSeeUpdates, storageKey]);

  useEffect(() => {
    if (!canSeeUpdates || !dashboardStorageKey) return;
    setDashboardAcknowledged(window.localStorage.getItem(dashboardStorageKey) === DASHBOARD_UPDATE_VERSION);
  }, [canSeeUpdates, dashboardStorageKey]);

  const hasReleaseUpdate = !acknowledged;
  const hasUpdate = hasReleaseUpdate || serviceWorkerUpdateReady;
  const dashboardIsCurrent = acknowledged || dashboardAcknowledged;

  useEffect(() => {
    if (!canSeeUpdates || !("serviceWorker" in navigator)) return;

    let active = true;
    const cleanup: Array<() => void> = [];
    const watchRegistration = (registration: ServiceWorkerRegistration) => {
      if (watchedRegistrationsRef.current.has(registration)) return;
      watchedRegistrationsRef.current.add(registration);

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
        if (registration.waiting && navigator.serviceWorker.controller) setServiceWorkerUpdateReady(true);
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
      watchedRegistrationsRef.current.clear();
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
  }, [canSeeUpdates, hasUpdate, promptKey, serviceWorkerUpdateReady]);

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

  const printUpdateDetails = (pending: boolean) => (
    <>
      <TaskDescriptionPreview />
      <div className="rounded-lg bg-muted/35 p-3 text-sm leading-6 text-muted-foreground">
        Na criação ou edição da tarefa, escreva normalmente na descrição e cole uma imagem com ⌘V ou Ctrl+V. Enquanto edita, o print aparece no texto; ao salvar, ele fica organizado somente em Arquivos, com miniatura e download.
      </div>
      {pending ? (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
          <p className="text-sm font-medium">Atualize para carregar esta versão no seu navegador.</p>
          <Button type="button" className="mt-3 gap-2" onClick={() => void updateApplication()} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Atualizando…" : "Atualizar agora"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">O TaskFlow buscará a versão nova e fará uma recarga forçada.</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> Esta versão já foi atualizada neste navegador.
        </div>
      )}
    </>
  );

  const taskUpdateDetails = (pending: boolean) => (
    <>
      <TaskLinksCalendarPreview />
      <div className="space-y-2 rounded-lg bg-muted/35 p-3 text-sm leading-6 text-muted-foreground">
        <p>Links nas tarefas, descrições, subtarefas e conversas agora abrem em uma nova aba. Nos campos de edição simples, os links aparecem logo abaixo do texto para você abrir sem copiar e colar.</p>
        <p>O calendário mostra apenas as tarefas principais, no prazo de cada tarefa. Para visualizar as subtarefas, abra a tarefa principal. A mudança vale para Marketing e Consultoria, nas visões de semana e mês.</p>
      </div>
      {pending ? (
        <div className="rounded-xl border border-primary/20 bg-primary/[0.05] p-4">
          <p className="text-sm font-medium">Atualize para carregar esta versão no seu navegador.</p>
          <Button type="button" className="mt-3 gap-2" onClick={() => void updateApplication()} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Atualizando…" : "Atualizar agora"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> Esta versão já foi atualizada neste navegador.
        </div>
      )}
    </>
  );

  return (
    <>
      {showUpdatePrompt ? (
        <div className="fixed inset-x-3 top-14 z-[70] animate-in slide-in-from-top-2 fade-in md:left-auto md:right-4 md:w-[380px]" role="status">
          <div className="rounded-2xl border border-primary/25 bg-background p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Nova atualização disponível</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">Esta tela está em uma versão anterior. Veja a novidade e recarregue o TaskFlow para atualizar.</p>
                <Button type="button" size="sm" className="mt-3" onClick={openPendingUpdate}>Ver atualizações</Button>
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
        <span className="hidden lg:inline">{hasUpdate ? "Novas atualizações" : "Versão atual"}</span>
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
                <span className="text-xs font-medium text-muted-foreground">{activeWorkspace?.name}</span>
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
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Atualizações pendentes</p>
                <ReleaseSection
                  title="Links clicáveis e calendário mais organizado"
                  date="06 de outubro de 2026"
                  defaultOpen
                  status={<Sparkles className="h-4 w-4" />}
                >
                  {taskUpdateDetails(true)}
                </ReleaseSection>
              </section>
            ) : null}

            <section className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Atualizações instaladas neste navegador</p>
              <div className="space-y-3">
                {!hasUpdate ? (
                  <ReleaseSection
                    title="Links clicáveis e calendário mais organizado"
                    date="06 de outubro de 2026"
                    defaultOpen
                    status={<CheckCircle2 className="h-4 w-4" />}
                    updated
                  >
                    {taskUpdateDetails(false)}
                  </ReleaseSection>
                ) : null}

                <ReleaseSection
                  title="Agora você pode colar prints nas tarefas"
                  date="02 de outubro de 2026"
                  status={<CheckCircle2 className="h-4 w-4" />}
                >
                  {printUpdateDetails(false)}
                </ReleaseSection>

                {isAdmin ? (
                  <ReleaseSection
                    title="Dashboard mais interativo"
                    date="01 de outubro de 2026"
                    status={<CheckCircle2 className="h-4 w-4" />}
                    updated={dashboardIsCurrent}
                  >
                    <DashboardUpdatePreview />
                    <p className="text-sm leading-6 text-muted-foreground">A distribuição da equipe ganhou mais espaço e os indicadores passaram a abrir as tarefas relacionadas por cliente.</p>
                  </ReleaseSection>
                ) : null}

                {hasUpdate && !isAdmin ? (
                  <p className="rounded-xl border border-dashed px-4 py-3 text-sm text-muted-foreground">As atualizações aparecerão aqui em verde depois de instaladas neste navegador.</p>
                ) : null}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
