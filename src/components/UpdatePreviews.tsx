import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ImagePlus,
  LayoutDashboard,
  Link2,
  MousePointer2,
  Pin,
  Eye,
  Plus,
  RefreshCw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { UpdatePreviewKind } from "@/lib/app-updates";
import { CalendarTaskPin } from "@/components/CalendarTaskPin";

function PreviewGrid({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3"
      aria-label={label}
      data-update-preview-grid
    >
      {children}
    </div>
  );
}

function AssignmentPopupReadPreview() {
  return (
    <PreviewGrid label="Prévia dos avisos de atribuição com um ou vários pop-ups">
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold">
          <Bell className="h-3.5 w-3.5 text-primary" />
          Nova tarefa atribuída
        </p>
        <p className="mt-3 text-[10px] text-muted-foreground">Uma notificação pendente</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
          <span className="rounded-md border px-2 py-1 font-medium">Marcar como lido</span>
          <span className="rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
            Ver tarefa
          </span>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold">
          <Bell className="h-3.5 w-3.5 text-primary" />
          Avisos na fila
        </p>
        <p className="mt-3 text-[10px] text-muted-foreground">3 notificações pendentes</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
          <span className="rounded-md border px-2 py-1 font-medium">Marcar todos como lidos</span>
          <span className="rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
            Ver tarefa
          </span>
        </div>
      </div>
    </PreviewGrid>
  );
}

function SubtaskParticipationPreview() {
  return (
    <PreviewGrid label="Prévia da subtarefa concluída no calendário, Kanban e lista">
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <div className="flex items-center gap-1.5 border-b px-3 py-2 text-[10px] font-semibold">
          <CalendarDays className="h-3.5 w-3.5 text-primary" /> Calendário · Semana e mês
        </div>
        <div className="grid grid-cols-3 divide-x p-2">
          <div className="min-h-24 p-1 text-[9px] text-muted-foreground">8 out</div>
          <div className="min-h-24 p-1 text-[9px]">
            <p className="text-muted-foreground">9 out</p>
            <div className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 p-1.5 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
              <p className="flex items-center gap-1 font-medium line-through">
                <CheckCircle2 className="h-3 w-3 shrink-0" /> Revisar texto
              </p>
              <p className="mt-1 text-[8px] opacity-75">Subtarefa de Preparar campanha</p>
            </div>
          </div>
          <div className="min-h-24 p-1 text-[9px] text-muted-foreground">10 out</div>
        </div>
        <p className="border-t px-3 py-2 text-[9px] text-muted-foreground">
          A subtarefa fica no dia dela.
        </p>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" /> Kanban · Concluídas
        </p>
        <div className="mt-3 rounded-lg border border-emerald-200 p-2.5">
          <p className="text-[9px] font-semibold uppercase text-emerald-700">Subtarefa concluída</p>
          <p className="mt-1 text-[11px] line-through">Revisar texto</p>
          <p className="mt-1 text-[9px] text-muted-foreground">Na tarefa: Preparar campanha</p>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="text-[10px] font-semibold">Lista · Concluídas</p>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 p-2 text-[10px]">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
          <span className="line-through">Revisar texto</span>
          <span className="ml-auto rounded border border-emerald-200 px-1 text-emerald-700">
            Concluída
          </span>
        </div>
      </div>
    </PreviewGrid>
  );
}

function UpdateRetryPreview() {
  return (
    <div
      aria-label="Prévia da atualização que acompanha a substituição do serviço de instalação"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="text-[11px] font-semibold">Novas atualizações</p>
      <div className="mt-3 space-y-2 rounded-lg border p-2.5 text-[10px]">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5" />
          Instalando nova versão…
        </div>
        <div className="rounded-md bg-primary/5 px-2 py-1.5 text-primary">
          Serviço substituído → acompanhando a nova instalação
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Versão ativada → recarregar página
        </div>
      </div>
    </div>
  );
}

function UpdateOneClickPreview() {
  return (
    <div
      aria-label="Prévia de várias novidades acumuladas carregadas em uma atualização"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="text-[11px] font-semibold">Novas atualizações</p>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="rounded-md border px-2 py-1">3 novidades acumuladas</span>
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="rounded-md bg-primary px-2 py-1 font-medium text-primary-foreground">
          Atualizar agora
        </span>
      </div>
      <div className="mt-3 rounded-lg border p-2.5 text-[10px]">
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <RefreshCw className="h-3 w-3" /> Versão mais recente assumindo esta aba…
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" /> 3 novidades disponíveis após recarregar
        </p>
      </div>
    </div>
  );
}

function TaskDescriptionPreview() {
  return (
    <div
      className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      aria-label="Prévia do novo campo de prints na descrição"
    >
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
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">
              Descrição
            </span>
            <span className="rounded bg-primary px-1.5 py-0.5 text-[8px] font-semibold text-primary-foreground">
              NOVO
            </span>
          </div>
          <div className="mt-1.5 rounded border border-dashed border-slate-300 bg-slate-50 p-2 text-[9px] text-slate-400 dark:border-slate-700 dark:bg-slate-950">
            <p>Escreva aqui e cole um print com ⌘V</p>
            <div className="mt-1.5 flex items-center gap-2 rounded border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded bg-gradient-to-br from-sky-200 to-indigo-300">
                <ImagePlus className="h-3.5 w-3.5 text-indigo-700" />
              </div>
              <p className="text-[8px] text-slate-500">
                Print colado — será organizado em Arquivos ao salvar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardUpdatePreview() {
  return (
    <div
      className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      aria-label="Prévia da atualização anterior do Dashboard"
    >
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
          <span>Cliente com mais atividades</span>
          <MousePointer2 className="h-3 w-3 text-primary" />
        </div>
        <div className="flex items-center justify-between rounded bg-slate-100 px-2 py-1.5 text-[8px] text-slate-500 dark:bg-slate-800">
          <span>Distribuição da equipe</span>
          <MousePointer2 className="h-3 w-3 text-primary" />
        </div>
      </div>
    </div>
  );
}

function TaskLinksCalendarPreview() {
  return (
    <PreviewGrid label="Prévia dos links clicáveis e do calendário com tarefas principais">
      <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
          <Link2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold text-slate-500">
            Links nas tarefas e conversas
          </span>
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
                <p className="border-b bg-slate-100 p-1.5 text-center text-slate-500 dark:bg-slate-800">
                  {day}
                </p>
                <p className="px-2 pt-2 text-slate-500">{5 + index}</p>
                {index === 1 ? (
                  <div className="mx-1 mt-2 rounded-md border border-emerald-300 bg-emerald-100 p-1.5 text-[8px] font-semibold text-emerald-900">
                    Campanha
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-dashed p-2 text-[9px] text-slate-500">
            Abra a tarefa para ver Vídeo, Story e as demais subtarefas.
          </div>
        </div>
      </div>
    </PreviewGrid>
  );
}

function CalendarReschedulePreview() {
  return (
    <PreviewGrid label="Prévia do arraste de tarefas com justificativa">
      <div className="overflow-hidden rounded-xl border bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 border-b bg-white px-3 py-2 dark:bg-slate-900">
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold text-slate-500">
            Calendário · Semana e mês
          </span>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-3 overflow-hidden rounded-lg border bg-white text-[9px] dark:bg-slate-900">
            {["Qua", "Qui", "Sex"].map((day, index) => (
              <div
                key={day}
                className={`min-h-32 border-r last:border-r-0 ${index === 2 ? "bg-primary/[0.06] ring-2 ring-inset ring-primary/40" : ""}`}
              >
                <p className="border-b bg-slate-100 p-1.5 text-center text-slate-500 dark:bg-slate-800">
                  {day}
                </p>
                <p className="px-2 pt-2 text-slate-500">{7 + index}</p>
                {index === 0 ? (
                  <div className="mx-1 mt-2 rounded-md border border-dashed border-primary/30 p-1.5 text-[8px] text-slate-400">
                    Campanha
                  </div>
                ) : null}
                {index === 1 ? <ArrowRight className="mx-auto mt-3 h-4 w-4 text-primary" /> : null}
                {index === 2 ? (
                  <div className="mx-1 mt-2 flex items-center gap-1 rounded-md bg-primary p-1.5 text-[8px] font-semibold text-primary-foreground">
                    Campanha
                    <MousePointer2 className="h-3 w-3 shrink-0" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] text-slate-500">
            Arraste para escolher outro dia. A data ainda não foi salva.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-xl border bg-slate-100 p-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="w-full rounded-xl border bg-background p-3 shadow-md">
          <p className="text-[11px] font-semibold">Alterar prazo</p>
          <p className="mt-1 text-[9px] text-muted-foreground">Campanha de outubro</p>
          <p className="mt-1 text-[9px] text-muted-foreground">07/10/2026 → 09/10/2026</p>
          <p className="mt-3 text-[9px] font-medium">
            Justificativa da alteração de prazo <span className="text-destructive">*</span>
          </p>
          <div className="mt-1 min-h-12 rounded-xl border bg-background p-2 text-[9px] text-muted-foreground">
            Cliente solicitou revisar o briefing.
          </div>
          <div className="mt-3 flex justify-end gap-2 text-[9px]">
            <span className="rounded-full border px-2.5 py-1">Cancelar</span>
            <span className="rounded-full bg-primary px-2.5 py-1 font-medium text-primary-foreground">
              Confirmar
            </span>
          </div>
          <p className="mt-2 text-[8px] text-muted-foreground">
            ESC cancela · Só muda após justificar e confirmar.
          </p>
        </div>
      </div>
    </PreviewGrid>
  );
}

function TaskEditPreview() {
  return (
    <div
      aria-label="Prévia do salvamento de descrições e prazos"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="text-xs font-semibold">Revisar campanha</p>
      <div className="mt-3">
        <PreviewGrid>
          <div className="rounded-lg border p-3">
            <p className="text-[10px] text-muted-foreground">Descrição editada</p>
            <p className="mt-2 text-xs">Briefing revisado pela equipe.</p>
            <p className="mt-3 text-[10px] text-emerald-700 dark:text-emerald-400">
              Texto salvo e exibido na tarefa
            </p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-[10px] text-muted-foreground">Prazo atualizado no calendário</p>
            <p className="mt-2 flex items-center gap-2 text-xs">
              <CalendarDays className="h-4 w-4" />
              13 de outubro
            </p>
            <p className="mt-3 text-[10px] text-muted-foreground">
              Preservado ao salvar somente a descrição
            </p>
          </div>
        </PreviewGrid>
      </div>
    </div>
  );
}

function CalendarSubtasksPreview() {
  return (
    <PreviewGrid label="Prévia das subtarefas e da atualização segura">
      <div
        aria-label="Prévia das subtarefas agrupadas abaixo da tarefa pai"
        className="rounded-xl border bg-background p-3 shadow-sm"
      >
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-[11px] font-medium">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-primary text-[9px] text-primary-foreground">
            ✓
          </span>
          Subtarefas
        </div>
        <div className="rounded-lg border p-3">
          <p className="mb-2 text-[10px] text-muted-foreground">13</p>
          <div className="rounded-md bg-primary px-2.5 py-2 text-xs font-semibold text-primary-foreground">
            Carrossel da campanha
          </div>
          <div className="ml-1 mt-1 space-y-1 border-l-2 border-primary/20 pl-2">
            {[
              { title: "Conteúdo", done: true },
              { title: "Legenda", done: true },
              { title: "Arte", done: false },
            ].map((row) => (
              <div
                key={row.title}
                className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-[11px] ${row.done ? "bg-emerald-50 text-muted-foreground dark:bg-emerald-950/20" : "bg-background"}`}
              >
                <span className={row.done ? "text-emerald-600" : "text-muted-foreground"}>
                  {row.done ? "✓" : "○"}
                </span>
                <span className={row.done ? "line-through" : ""}>{row.title}</span>
                <span className="ml-auto rounded-full bg-muted px-1.5 text-[8px] text-muted-foreground">
                  Equipe
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Pai e subtarefas juntos. Abra a tarefa para consultar os prazos.
        </p>
      </div>
      <UpdateFlowPreview />
    </PreviewGrid>
  );
}

function CalendarSubtaskDatesPreview() {
  return (
    <PreviewGrid label="Prévia dos prazos das subtarefas e da colagem formatada">
      <div
        className="rounded-xl border bg-background p-3 shadow-sm"
        aria-label="Prévia da tarefa principal no dia 9 e da subtarefa com prazo próprio no dia 12"
      >
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold">
          <CalendarDays className="h-3.5 w-3.5 text-primary" /> Calendário · Subtarefas
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-lg border p-2">
            <p className="mb-1.5 font-medium text-muted-foreground">09 out</p>
            <div className="rounded bg-primary px-2 py-1.5 text-primary-foreground">
              Tarefa principal
            </div>
          </div>
          <div className="rounded-lg border p-2">
            <p className="mb-1.5 font-medium text-muted-foreground">12 out</p>
            <div className="rounded border border-l-[3px] border-l-primary px-2 py-1.5">
              <span className="block font-medium">Revisar conteúdo</span>
              <span className="text-[9px] text-muted-foreground">
                Subtarefa de Tarefa principal
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-xl border bg-background p-3 shadow-sm"
        aria-label="Prévia do texto formatado colado na descrição sem código HTML visível"
      >
        <p className="mb-2 text-[11px] font-semibold">Descrição · Colar texto</p>
        <div className="rounded-lg border p-2.5 text-[10px] leading-relaxed">
          <p>
            <strong>Texto em destaque</strong> permanece formatado.
          </p>
          <p>Parágrafos e pontuação ficam no texto, sem mostrar tags HTML.</p>
        </div>
      </div>
    </PreviewGrid>
  );
}

function UpdateShortcutPreview() {
  return (
    <PreviewGrid label="Prévia da atualização direta pela central de novidades">
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="text-[11px] font-semibold">1. Abra as novidades</p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[10px] text-primary-foreground">
          <Sparkles className="h-3 w-3" />
          Novas atualizações
          <MousePointer2 className="h-3 w-3" />
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          A versão publicada é verificada automaticamente ao abrir.
        </p>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="text-[11px] font-semibold">2. Atualize quando quiser</p>
        <div className="mt-3 rounded-lg border p-2.5">
          <p className="text-[10px] font-medium">Novas atualizações</p>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1.5 text-[10px] text-primary-foreground">
            <RefreshCw className="h-3 w-3" />
            Atualizar agora
          </span>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">
          Recarrega somente após seu clique e a nova versão estar pronta.
        </p>
      </div>
    </PreviewGrid>
  );
}

function UpdateFlowPreview() {
  return (
    <div
      aria-label="Prévia da verificação e ativação da nova versão"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="flex items-center gap-1.5 text-[11px] font-semibold">
        <RefreshCw className="h-3.5 w-3.5" />
        Atualização segura
      </p>
      <div className="mt-3 space-y-2 rounded-lg border p-2.5 text-[10px]">
        <p className="text-muted-foreground">Nova versão disponível</p>
        <div className="flex items-center gap-1.5 rounded-lg bg-primary/5 p-2">
          <RefreshCw className="h-3 w-3" />
          Preparando a nova versão…
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" />
          Pronta → Recarregar
        </div>
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground">
        Verifique novamente quando precisar. Seus dados offline permanecem salvos.
      </p>
    </div>
  );
}

function TaskCardActivityPreview() {
  return (
    <PreviewGrid label="Prévia das aberturas, prioridades pessoais e criação pelo calendário">
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold">
          <Eye className="h-3.5 w-3.5" />
          Aberturas do card
        </p>
        <div className="mt-3 rounded-lg border p-2 text-[10px]">
          <p className="font-medium">Pessoa da equipe</p>
          <p className="mt-1 text-muted-foreground">Primeira: 08/10 às 09:12</p>
          <p className="text-muted-foreground">Última: 08/10 às 14:35</p>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Outro participante · Ainda não abriu
        </p>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="inline-flex items-center gap-1.5 rounded-full border bg-muted px-2 py-1 text-[11px] font-semibold">
          <Pin className="h-3.5 w-3.5" />
          Fixadas
        </p>
        <div className="mt-3 rounded-lg border p-2">
          <p className="text-[10px] text-muted-foreground">12 de outubro</p>
          <div className="relative mt-2 rounded-md bg-primary p-2 text-[10px] text-primary-foreground">
            <CalendarTaskPin />
            Retomar briefing
          </div>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">Botão direito → Fixar tarefa</p>
      </div>
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold">
          <CalendarDays className="h-3.5 w-3.5" />
          Criar no dia
        </p>
        <div className="mt-3 rounded-lg border p-2 text-[10px]">
          <p>12 de outubro</p>
          <div className="mt-2 flex items-center gap-1 rounded-md border bg-muted/50 p-2">
            <Plus className="h-3 w-3" />
            Nova tarefa
          </div>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground">Botão direito → Prazo preenchido</p>
      </div>
    </PreviewGrid>
  );
}

const UPDATE_PREVIEWS: Record<UpdatePreviewKind, () => ReactNode> = {
  "subtask-participation": SubtaskParticipationPreview,
  "calendar-subtask-dates": CalendarSubtaskDatesPreview,
  "update-one-click": UpdateOneClickPreview,
  "update-retry": UpdateRetryPreview,
  "assignment-popup-read": AssignmentPopupReadPreview,
  "update-shortcut": UpdateShortcutPreview,
  "calendar-subtasks": CalendarSubtasksPreview,
  "update-flow": UpdateFlowPreview,
  "task-card-activity": TaskCardActivityPreview,
  "task-edit": TaskEditPreview,
  "calendar-reschedule": CalendarReschedulePreview,
  "links-calendar": TaskLinksCalendarPreview,
  "task-prints": TaskDescriptionPreview,
  dashboard: DashboardUpdatePreview,
};

export function AppUpdatePreview({ kind }: { kind: UpdatePreviewKind }) {
  const Preview = UPDATE_PREVIEWS[kind];
  return <Preview />;
}
