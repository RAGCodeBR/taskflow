import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  ImagePlus,
  LayoutDashboard,
  Link2,
  MousePointer2,
} from "lucide-react";
import type { UpdatePreviewKind } from "@/lib/app-updates";

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
    <div
      className="grid gap-3 sm:grid-cols-2"
      aria-label="Prévia dos links clicáveis e do calendário com tarefas principais"
    >
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
    </div>
  );
}

function CalendarReschedulePreview() {
  return (
    <div
      className="grid gap-3 sm:grid-cols-2"
      aria-label="Prévia do arraste de tarefas com justificativa"
    >
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
    </div>
  );
}

const UPDATE_PREVIEWS: Record<UpdatePreviewKind, () => ReactNode> = {
  "calendar-reschedule": CalendarReschedulePreview,
  "links-calendar": TaskLinksCalendarPreview,
  "task-prints": TaskDescriptionPreview,
  dashboard: DashboardUpdatePreview,
};

export function AppUpdatePreview({ kind }: { kind: UpdatePreviewKind }) {
  const Preview = UPDATE_PREVIEWS[kind];
  return <Preview />;
}
