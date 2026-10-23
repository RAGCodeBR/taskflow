import type { ReactNode } from "react";
import {
  ArrowRight,
  AlertTriangle,
  Archive,
  Bell,
  CalendarCheck2,
  CalendarDays,
  CalendarRange,
  CalendarHeart,
  Flag,
  FileDown,
  Download,
  ImagePlus,
  LayoutDashboard,
  ListTodo,
  Link2,
  MousePointer2,
  Paperclip,
  Pin,
  Pencil,
  Eye,
  Plus,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Sparkles,
  KanbanSquare,
  Trash2,
  Menu,
  Moon,
  PanelLeft,
  LogOut,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { APP_UPDATES, type UpdatePreviewKind } from "@/lib/app-updates";
import { CalendarTaskPin } from "@/components/CalendarTaskPin";
import businessMentoringLogo from "@/assets/la-business-mentoring.png";

function ClientCalendarReferencesPreview() {
  return <PreviewGrid label="Prévia do calendário dos clientes e referências por tópico">
    <div className="overflow-hidden rounded-xl border bg-background text-[10px] shadow-sm">
      <div className="border-b bg-muted/30 p-3 font-semibold">Clientes <span className="float-right">⌄</span></div>
      <div className="p-3"><p className="rounded-md bg-primary/10 px-2 py-1.5 font-medium text-primary">Cliente Exemplo · Calendário</p>
        <div className="mt-2 flex flex-wrap gap-1 text-[9px]">{['Cadastro', 'Sistemas e senhas', 'Referências'].map(label => <span key={label} className="rounded-md border px-2 py-1">{label}</span>)}</div>
        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border"><div className="min-h-20 border-r p-2"><p className="text-muted-foreground">16</p><p className="mt-2 truncate rounded bg-primary px-2 py-1 text-primary-foreground">Campanha de verão</p></div><div className="p-2"><p className="text-muted-foreground">17</p><p className="mt-2 truncate rounded bg-primary px-2 py-1 text-primary-foreground">Revisar publicação</p></div></div>
      </div>
    </div>
    <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm"><p className="font-semibold">Referências</p><p className="mt-1 text-muted-foreground">Organizadas por campanha ou assunto</p>
      <div className="mt-3 rounded-lg border p-2"><p className="font-medium">Campanha de verão (2)</p><div className="mt-2 grid grid-cols-2 gap-2"><div className="rounded-md border p-2"><div className="h-10 rounded bg-gradient-to-br from-sky-100 to-amber-100" /><p className="mt-1">Inspiração visual</p></div><div className="rounded-md border p-2"><Link2 className="mb-2 h-4 w-4 text-primary" /><p>Post de referência</p><p className="mt-1 text-primary underline">example.com/post</p></div></div></div>
      <div className="mt-2 rounded-lg border p-2 font-medium">Gincana (1)</div>
    </div>
  </PreviewGrid>;
}

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

function MarketingCreateSidePanelPreview({ workspace = "Marketing" }: { workspace?: "Marketing" | "Consultoria" }) {
  return (
    <div aria-label={`Prévia do calendário compacto e do painel lateral de tarefas na ${workspace}`} className="mx-auto flex w-full max-w-sm flex-col items-end overflow-hidden rounded-xl border bg-muted/40 text-[10px] shadow-sm">
      <div className="grid w-full grid-cols-2 gap-2 border-b bg-background p-2">
        <div className="flex h-9 items-center gap-1 rounded-full border-2 border-dashed border-slate-400 bg-white px-2 text-slate-900 shadow-sm"><span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-emerald-500 text-emerald-700"><Check className="h-3 w-3" /></span><span className="line-clamp-2 leading-3">Sem cliente · só título</span></div>
        <div className="flex h-9 items-center gap-1 rounded-full border border-[#e8dfa8] bg-[#e8dfa8] px-2 text-slate-900 shadow-sm saturate-125"><Check className="h-3.5 w-3.5 shrink-0" /><span className="line-clamp-2 leading-3">Cliente salvo · publicar</span></div>
      </div>
      <div className="w-4/5 border-l bg-background">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="rounded border border-primary/30 px-2 py-1 font-medium text-primary">✓ Marcar como concluída</span>
          <span className="text-muted-foreground">Criar e editar</span>
        </div>
        <div className="space-y-3 p-3">
          <p className="text-base font-semibold">Planejar campanha</p>
          <div className="grid grid-cols-[70px_1fr] gap-y-2">
            <span className="text-muted-foreground">Responsável</span><span>Equipe de {workspace}</span>
            <span className="text-muted-foreground">Prazo</span><span>24 out</span>
            <span className="text-muted-foreground">Cliente</span><span>Cliente exemplo</span>
          </div>
          <p className="text-primary">⌄ Mais campos</p>
          <div className="border-t pt-3"><strong>Descrição</strong><p className="mt-2 text-muted-foreground">O que precisa ser feito?</p></div>
          <div className="border-t pt-3"><strong>Subtarefas</strong><div className="mt-2 flex items-center gap-2 border-b py-1"><span className="text-primary">○</span><span className="flex-1">Criar legenda</span><span className="rounded-full bg-primary/10 px-1.5 text-primary">CA</span><span>›</span></div><div className="mt-2 rounded-md border bg-primary/5 p-2"><p className="font-semibold">Criar legenda · detalhes ›</p><p className="mt-1 text-muted-foreground">Descrição, responsável e prazo</p><p className="mt-2 rounded bg-background p-1.5 text-primary">Print dentro da descrição</p></div><p className="mt-2 text-muted-foreground">Calendário: digite o título no dia e pressione Enter</p></div>
        </div>
      </div>
    </div>
  );
}

function TaskListQuickActionsPreview() {
  return (
    <div aria-label="Prévia da lista compacta com status editável e lixeira" className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background text-[10px] shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b p-2"><span className="rounded-full border px-2 py-1 text-muted-foreground">⌕ Buscar tarefa...</span><span className="text-primary">+ Nova tarefa</span></div>
      <div className="grid grid-cols-[1fr_95px_48px] items-center gap-2 bg-muted/40 px-3 py-1.5 font-semibold uppercase text-muted-foreground"><span>Tarefa</span><span>Status</span><span>Ações</span></div>
      <div className="grid grid-cols-[1fr_95px_48px] items-center gap-2 border-t px-3 py-2" style={{ boxShadow: "inset 3px 0 #2563eb" }}><span className="truncate font-medium">Preparar campanha</span><span className="rounded-full border border-blue-500 bg-blue-50 px-2 py-1 font-semibold text-blue-700">Em andamento ⌄</span><span className="flex gap-1 text-muted-foreground"><Check className="h-3 w-3" /><Trash2 className="h-3 w-3" /></span></div>
      <div className="grid grid-cols-[1fr_95px_48px] items-center gap-2 border-t px-3 py-2" style={{ boxShadow: "inset 3px 0 #7c3aed" }}><span className="truncate font-medium">Revisar postagem</span><span className="rounded-full border border-violet-500 bg-violet-50 px-2 py-1 font-semibold text-violet-700">Em revisão ⌄</span><span className="flex gap-1 text-muted-foreground"><Check className="h-3 w-3" /><Trash2 className="h-3 w-3" /></span></div>
      <div className="flex items-center gap-2 border-t bg-slate-50 px-3 py-2 text-slate-600"><ImagePlus className="h-3.5 w-3.5 text-emerald-600" /><span>Print salvo na subtarefa</span><Check className="ml-auto h-3.5 w-3.5 text-emerald-600" /></div>
    </div>
  );
}

function MarketingInlineTaskImagesPreview() {
  return (
    <div aria-label="Prévia do print entre parágrafos com opção de ampliar e baixar no Marketing" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <p className="font-semibold">Tarefa · Campanha exemplo</p>
      <div className="mt-2 rounded-lg border bg-muted/20 p-2">
        <p className="font-medium">Descrição</p>
        <p className="mt-2">Revisar a arte antes da publicação.</p>
        <div data-inline-task-image className="my-2 flex h-20 items-center justify-center rounded-md border bg-gradient-to-br from-sky-100 to-violet-100 text-primary dark:from-sky-950 dark:to-violet-950">
          <ImagePlus className="mr-1.5 h-5 w-5" /> Print inserido aqui
        </div>
        <p className="flex items-center gap-1 text-primary"><Download className="h-3 w-3" /> Clique para ampliar e baixar</p>
        <p>Confirmar a legenda com a equipe.</p>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg border px-2 py-1.5">
        <Paperclip className="h-3.5 w-3.5" /> Arquivos <span className="rounded-full bg-muted px-1.5">1</span>
        <span className="ml-auto text-muted-foreground">print-da-campanha.png</span>
      </div>
    </div>
  );
}

function MeetingAgendaTasksPreview() {
  return (
    <div
      aria-label="Prévia da tarefa clicável na pauta e do cliente fixo no formulário"
      className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm"
    >
      <p className="font-semibold">Pauta da reunião · Cliente Exemplo</p>
      <div
        data-meeting-task-row
        className="mt-2 flex items-center justify-between rounded-lg border bg-muted/20 px-2 py-1.5"
      >
        <span>Preparar proposta</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p data-meeting-task-backdrop className="mt-2 rounded-md bg-muted/30 px-2 py-1 text-muted-foreground">
        Fundo da reunião preservado ao abrir a tarefa
      </p>
      <div className="mt-2 rounded-lg border bg-muted/20 p-2">
        <p className="font-medium">Tarefa da pauta</p>
        <p className="mt-2 text-muted-foreground">Título</p>
        <p className="rounded-md border bg-background px-2 py-1.5">Preparar proposta</p>
        <p className="mt-2 text-muted-foreground">Cliente</p>
        <p
          data-meeting-task-client
          className="flex items-center justify-between rounded-md border bg-muted/40 px-2 py-1.5"
        >
          <span>Cliente Exemplo</span>
          <span aria-hidden="true">🔒</span>
        </p>
      </div>
    </div>
  );
}

function SubtaskPastedPrintsPreview() {
  return (
    <div aria-label="Prévia de print colado na descrição de uma subtarefa" className="mx-auto w-full max-w-xs rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <strong>Editar subtarefa</strong>
      <p className="mt-2 text-muted-foreground">Descrição</p>
      <div className="mt-1 rounded-lg border px-2 py-2">
        <p>Revisar a arte da campanha</p>
        <div data-subtask-print-preview className="mt-2 flex h-16 items-center justify-center rounded-md border bg-muted/40 text-primary">
          <ImagePlus className="h-6 w-6" />
          <span className="ml-2">Prévia do print colado</span>
        </div>
      </div>
      <p className="mt-2 text-muted-foreground">Após salvar: Arquivos da subtarefa (1)</p>
    </div>
  );
}

function AutomaticSafeUpdatePreview() {
  return (
    <div aria-label="Prévia da atualização automática segura" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <div className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 p-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <div><strong>Nova versão disponível</strong><p className="text-muted-foreground">Instalação automática quando for seguro</p></div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-lg border p-2"><CheckCircle2 className="mb-1 h-3.5 w-3.5 text-emerald-600" /><strong>Sem edição aberta</strong><p className="text-muted-foreground">Atualiza a página</p></div>
        <div className="rounded-lg border p-2"><Clock3 className="mb-1 h-3.5 w-3.5 text-amber-600" /><strong>Trabalho em andamento</strong><p className="text-muted-foreground">Aguarda para instalar</p></div>
      </div>
    </div>
  );
}

function SubtaskDraggedImagesPreview() {
  return (
    <div aria-label="Prévia de imagens arrastadas para uma subtarefa" className="mx-auto w-full max-w-xs rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <strong>Editar subtarefa</strong>
      <p className="mt-2 text-muted-foreground">Descrição</p>
      <div className="mt-1 rounded-lg border-2 border-dashed border-primary bg-primary/5 px-3 py-4 text-center text-primary">
        <ImagePlus className="mx-auto mb-1 h-5 w-5" />
        Arraste imagens aqui
      </div>
      <div data-subtask-drag-preview className="mt-2 flex items-center gap-2 rounded-lg border p-2">
        <div className="h-10 w-12 rounded bg-gradient-to-br from-sky-200 to-amber-100" />
        <div><strong>imagem-campanha.png</strong><p className="text-muted-foreground">Prévia antes de salvar</p></div>
      </div>
      <p className="mt-2 text-muted-foreground">Após salvar: Arquivos da subtarefa (1)</p>
    </div>
  );
}

function SubtaskFileThumbnailsPreview() {
  return (
    <div aria-label="Prévia das miniaturas dos arquivos da subtarefa" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <strong>Subtarefa · Arquivos</strong>
      <div className="mt-2 flex items-center gap-2 rounded-lg border p-2">
        <div data-subtask-file-thumbnail className="h-10 w-10 shrink-0 rounded bg-gradient-to-br from-sky-200 via-emerald-100 to-amber-100" />
        <span className="min-w-0 flex-1 truncate">imagem-campanha.png</span>
        <Download className="h-3.5 w-3.5" />
      </div>
      <div className="mt-1 flex items-center gap-2 rounded-lg border p-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-muted"><FileDown className="h-4 w-4" /></span>
        <span className="min-w-0 flex-1 truncate">briefing.pdf</span>
        <Download className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function SubtaskAttachmentIndicatorPreview() {
  return (
    <div aria-label="Prévia do indicador de anexos na subtarefa recolhida" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <p className="mb-2 font-semibold">Subtarefas (1)</p>
      <div className="rounded-lg border bg-muted/20 p-2">
        <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-muted-foreground" /><strong className="min-w-0 flex-1 truncate">Revisar arte da campanha</strong><ChevronDown className="h-3.5 w-3.5 -rotate-90" /></div>
        <div className="mt-2 flex flex-wrap items-center gap-2 pl-6 text-muted-foreground">
          <span>Prazo 20/10</span>
          <span data-subtask-attachment-count className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 font-medium text-primary"><Paperclip className="h-3 w-3" />2 arquivos</span>
        </div>
      </div>
    </div>
  );
}

function AgendaGoogleCompactActionsPreview() {
  return (
    <div aria-label="Prévia das ações compactas da Google Agenda" className="mx-auto w-full max-w-64 rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <div className="text-center">
        <strong>Google Agenda</strong>
        <p className="text-muted-foreground">Conectado como pessoa@exemplo.com</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {(["Reconectar Google", "Desconectar", "Sincronizar agora"] as const).map((label) => (
          <span key={label} data-agenda-compact-action className={`flex min-w-0 items-center justify-center break-words rounded-full border px-1 py-1.5 text-center leading-tight ${label === "Sincronizar agora" ? "border-primary bg-primary text-primary-foreground" : ""}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function AgendaGoogleConnectionLayoutPreview() {
  return (
    <div aria-label="Prévia da conexão da Google Agenda centralizada" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <div className="text-center">
        <strong>Google Agenda</strong>
        <p className="text-muted-foreground">Conectado como pessoa@exemplo.com</p>
      </div>
      <div className="mt-3 overflow-x-auto">
        <div className="mx-auto flex w-max min-w-full items-center justify-center gap-1.5 pb-1">
          {(["Reconectar Google", "Desconectar", "Sincronizar agora"] as const).map((label) => (
            <span key={label} data-agenda-connection-control className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-1 ${label === "Sincronizar agora" ? "border-primary bg-primary text-primary-foreground" : ""}`}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsPeriodLayoutPreview() {
  return (
    <div aria-label="Prévia do período dos Relatórios centralizado" className="mx-auto w-full max-w-sm rounded-xl border bg-background p-3 text-[10px] shadow-sm">
      <div className="text-center">
        <strong className="inline-flex items-center gap-1.5"><CalendarRange className="h-3.5 w-3.5 text-teal-700" /> Período analisado</strong>
        <p className="mt-1 text-muted-foreground">1 de outubro de 2026 até 31 de outubro de 2026</p>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_1fr_auto] items-end gap-1.5">
        <div data-report-period-control className="min-w-0"><span>Início</span><p className="mt-1 rounded-full border px-2 py-1.5">01/10/2026</p></div>
        <div data-report-period-control className="min-w-0"><span>Fim</span><p className="mt-1 rounded-full border px-2 py-1.5">31/10/2026</p></div>
        <span data-report-period-control className="inline-flex items-center gap-1 rounded-full border px-2 py-1.5"><RotateCcw className="h-3 w-3" /> Mês vigente</span>
      </div>
    </div>
  );
}

function MobileClientCardsPreview() {
  return (
    <div aria-label="Prévia dos clientes em dois cartões por linha no celular" className="mx-auto grid w-full max-w-64 grid-cols-2 gap-2 text-[10px]">
      {["Cliente Exemplo A", "Cliente Exemplo B"].map((name, index) => (
        <div key={name} data-mobile-client-card className="flex min-w-0 flex-col rounded-xl border bg-background p-2.5 shadow-sm">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 font-bold text-primary">{index === 0 ? "A" : "B"}</span>
          <strong className="mt-2 break-words leading-tight">{name}</strong>
          <span className="text-muted-foreground">Cliente ativo</span>
          <span className="mt-2 font-semibold">{index === 0 ? 8 : 5} <span className="font-normal text-muted-foreground">tarefas</span></span>
          <span className="mt-auto flex gap-2 border-t pt-2 text-primary">
            <FileDown className="h-3 w-3" /><Sparkles className="h-3 w-3" /><Pencil className="h-3 w-3" /><Archive className="h-3 w-3" /><Trash2 className="h-3 w-3 text-destructive" />
          </span>
        </div>
      ))}
    </div>
  );
}

function DashboardMobileMetricsPreview() {
  const items = [
    { label: "Total de tarefas", icon: ListTodo, color: "text-blue-600 bg-blue-50" },
    { label: "Concluídas", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Pendentes", icon: Clock3, color: "text-amber-600 bg-amber-50" },
    { label: "Atrasadas", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
  ];
  return (
    <div aria-label="Prévia dos indicadores do Dashboard em duas colunas no celular" className="mx-auto grid w-full max-w-64 grid-cols-2 gap-2 text-[10px]">
      {items.map(({ label, icon: Icon, color }) => (
        <div key={label} data-dashboard-metric className="flex min-w-0 items-start justify-between gap-1 rounded-xl border bg-background p-2.5 shadow-sm">
          <span className="min-w-0"><span className="block leading-tight text-muted-foreground">{label}</span><strong className="mt-1 block text-base leading-none">0</strong></span>
          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ${color}`}><Icon className="h-3.5 w-3.5" /></span>
        </div>
      ))}
    </div>
  );
}

function MobileObligationsMetricsPreview() {
  const items = [
    { label: "Atrasadas", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
    { label: "Vencem hoje", icon: Clock3, color: "text-amber-600 bg-amber-50" },
    { label: "Próximos 7 dias", icon: CalendarCheck2, color: "text-primary bg-primary/10" },
    { label: "Concluídas no mês", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  ];
  return (
    <div aria-label="Prévia dos indicadores de Obrigações em duas colunas no celular" className="mx-auto grid w-full max-w-64 grid-cols-2 gap-2 text-[10px]">
      {items.map(({ label, icon: Icon, color }) => (
        <div key={label} data-obligation-metric className="min-w-0 rounded-xl border bg-background p-2.5 shadow-sm">
          <span className={`grid h-7 w-7 place-items-center rounded-lg ${color}`}><Icon className="h-4 w-4" /></span>
          <strong className="mt-1.5 block text-base leading-none">0</strong>
          <span className="mt-1 block leading-tight text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

function MobileTaskToolbarPreview() {
  const chip = "min-w-0 flex-1 rounded-full border bg-background px-1.5 py-1 text-center shadow-sm";
  return (
    <div aria-label="Prévia dos controles de tarefas na mesma largura no celular" className="mx-auto w-full max-w-64 overflow-hidden rounded-2xl border bg-muted/20 text-[10px] shadow-sm">
      <div className="space-y-2.5 px-3 py-3">
        <div data-mobile-task-toolbar-row className="rounded-full border bg-background px-3 py-1.5 text-muted-foreground">⌕ Buscar tarefa pelo título...</div>
        <div data-mobile-task-toolbar-row className="flex w-full rounded-full border bg-muted/40 p-0.5">
          {['Kanban', 'Lista', 'Calendário'].map((label) => <span key={label} className={chip}>{label}</span>)}
        </div>
        <div data-mobile-task-toolbar-row className="flex w-full rounded-full border bg-muted/40 p-0.5">
          {['Todas', 'Atribuídas a mim', 'Criadas por mim'].map((label) => <span key={label} className={chip}>{label}</span>)}
        </div>
        <div data-mobile-task-toolbar-row className="w-full rounded-full border bg-background px-2 py-1 text-center shadow-sm">Filtros</div>
        <div data-mobile-task-toolbar-row className="grid w-full grid-cols-2 gap-1">
          {['Arquivos Cliente', 'Etiquetas', 'Coluna', 'Tarefa'].map((label) => <span key={label} className="rounded-full border bg-background px-1.5 py-1 text-center shadow-sm">{label}</span>)}
        </div>
      </div>
    </div>
  );
}

function DashboardFilterPanelPreview() {
  return (
    <div aria-label="Prévia dos filtros do Dashboard" className="mx-auto w-full max-w-sm text-[10px]">
      <span className="inline-flex rounded-full border bg-background px-3 py-1.5 font-semibold shadow-sm">☷ Filtros</span>
      <div className="mt-2 rounded-xl border bg-background p-3 shadow-sm">
        <div className="flex justify-between gap-2">
          <strong>Filtrar tarefas</strong>
          <span className="text-muted-foreground">Outubro de 2026</span>
        </div>
        <p className="mt-3 text-muted-foreground">Visualização rápida</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {['Todas', 'Vence hoje', 'Amanhã', 'Semana', 'Mês', 'Atrasadas', 'Sem prazo', 'Pendentes', 'Concluídas', 'Escolher período'].map((label) => (
            <span key={label} className={`rounded-full border px-2 py-1 ${label === 'Mês' ? 'bg-primary text-primary-foreground' : ''}`}>
              {label}
            </span>
          ))}
        </div>
        <div className="mt-3 border-t pt-2">
          <p className="text-muted-foreground">Refinar resultados</p>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            <div><span>Situação</span><p className="mt-1 rounded-full border px-2 py-1">Todas</p></div>
            <div><span>Responsável</span><p className="mt-1 rounded-full border px-2 py-1">Todos</p></div>
          </div>
          <p className="mt-2 text-right">Limpar filtros</p>
        </div>
      </div>
    </div>
  );
}

function TeamDistributionLabelsPreview() {
  return (
    <div
      aria-label="Prévia da distribuição da equipe com nomes em linhas separadas"
      className="mx-auto w-full max-w-64 rounded-xl border bg-background p-3 text-[10px] shadow-sm"
    >
      <strong>Distribuição da equipe</strong>
      <div className="mt-3 space-y-2.5">
        {[
          { name: "Ana Exemplo", done: "w-1/2", open: "w-1/5" },
          { name: "Bruno Exemplo", done: "w-1/3", open: "w-1/4" },
          { name: "Carla Exemplo", done: "w-2/5", open: "w-1/6" },
        ].map((person) => (
          <div key={person.name} data-team-preview-row className="grid grid-cols-[5rem_1fr] items-center gap-2">
            <span className="truncate">{person.name}</span>
            <span className="flex h-3 overflow-hidden rounded-r bg-muted/40">
              <span className={`${person.done} bg-emerald-600`} />
              <span className={`${person.open} bg-amber-500`} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 flex gap-3 text-muted-foreground">
        <span>● Concluídas</span><span>● Em aberto</span>
      </p>
    </div>
  );
}

function CompactEnvironmentsMobilePreview() {
  return (
    <div
      aria-label="Prévia dos dois ambientes visíveis em uma tela compacta"
      className="mx-auto w-full max-w-48 rounded-xl border bg-background p-2.5 text-[10px] shadow-sm"
    >
      <p className="text-center text-[9px] text-muted-foreground">Ambientes</p>
      <strong className="mt-1 block text-center text-[12px]">Escolha onde trabalhar</strong>
      <div className="mt-2 space-y-2">
        <div className="rounded-lg border border-primary/40 bg-primary/[0.025] p-2">
          <p className="flex items-center gap-1.5 font-semibold"><ShieldCheck className="h-3 w-3" /> Consultoria</p>
          <p className="mt-1 text-muted-foreground">Ambiente ativo</p>
          <span className="mt-1 block rounded-full border px-2 py-0.5 text-center">Abrir painel</span>
        </div>
        <div className="rounded-lg border p-2">
          <p className="flex items-center gap-1.5 font-semibold"><Megaphone className="h-3 w-3" /> Marketing</p>
          <p className="mt-1 text-muted-foreground">Acesso autorizado</p>
          <span className="mt-1 block rounded-full bg-primary px-2 py-0.5 text-center text-primary-foreground">Acessar</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedSidebarPreview() {
  return (
    <div
      aria-label="Prévia da barra lateral deslizando entre os estados aberto e recolhido"
      className="mx-auto flex w-full max-w-72 items-center justify-center gap-2 rounded-xl border bg-background p-3 text-[10px] shadow-sm"
    >
      <div className="flex h-36 w-11 shrink-0 flex-col items-center gap-2 rounded-lg border bg-muted/30 p-2">
        <span className="relative h-7 w-6 shrink-0 overflow-hidden">
          <img
            src={businessMentoringLogo}
            alt=""
            className="absolute -left-[3px] top-0 w-[120px] max-w-none"
          />
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
          <Menu className="h-4 w-4" />
        </span>
        <span className="h-3 w-3 rounded bg-muted-foreground/20" />
        <PanelLeft className="mt-auto h-4 w-4" />
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
      <div className="flex h-36 min-w-0 flex-1 flex-col gap-2 rounded-lg border bg-muted/30 p-2">
        <img src={businessMentoringLogo} alt="" className="h-6 w-full object-contain" />
        <strong>TaskFlow</strong>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">▦ Dashboard</span>
        <span className="px-2 py-1">☷ Minhas tarefas</span>
        <span className="mt-auto flex items-center gap-1 border-t pt-2">
          <Moon className="h-3 w-3" /> <PanelLeft className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

function RecentUpdateHistoryPreview() {
  return (
    <div
      aria-label="Prévia do histórico com cinco atualizações recentes"
      className="mx-auto w-full max-w-64 rounded-xl border bg-background p-3 text-[10px] shadow-sm"
    >
      <strong>Histórico de atualizações</strong>
      <div className="mt-2 space-y-1.5">
        {APP_UPDATES.slice(0, 5).map(({ id, title }, index) => (
          <div key={id} className="flex items-center gap-2 rounded-md border px-2 py-1.5">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              {index + 1}
            </span>
            <span className="truncate">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarControlFooterPreview() {
  return (
    <div
      aria-label="Prévia do controle do menu junto ao modo noturno"
      className="mx-auto flex h-48 w-full max-w-56 flex-col overflow-hidden rounded-xl border bg-background text-[10px] shadow-sm"
    >
      <div className="flex-1 space-y-2 p-3">
        <strong>TaskFlow</strong>
        <div className="rounded-full bg-primary/10 px-2 py-1 text-primary">Dashboard</div>
        <div className="px-2 py-1 text-muted-foreground">Minhas tarefas</div>
      </div>
      <div className="flex items-center gap-2 border-t p-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 font-semibold">TF</span>
        <span className="min-w-0 flex-1 truncate font-medium">Seu perfil</span>
        <Moon className="h-4 w-4 shrink-0" aria-label="Modo noturno" />
        <PanelLeft className="h-4 w-4 shrink-0" aria-label="Recolher menu" />
        <LogOut className="h-4 w-4 shrink-0" aria-label="Sair" />
      </div>
    </div>
  );
}

function MobileLayoutPreview() {
  return (
    <PreviewGrid label="Prévia da navegação e das telas ajustadas para celular">
      <div className="mx-auto w-full max-w-52 overflow-hidden rounded-2xl border bg-background text-[10px] shadow-sm">
        <div className="flex items-center justify-between border-b p-2">
          <Menu className="h-4 w-4" />
          <strong>TaskFlow</strong>
          <span className="h-4 w-4 rounded-full bg-primary/20" />
        </div>
        <div className="space-y-2 p-2">
          <p className="font-semibold">Reuniões</p>
          <div className="rounded-md border px-2 py-1.5 text-muted-foreground">
            Buscar reunião...
          </div>
          <div className="rounded-md border px-2 py-1.5">Todos os clientes</div>
          <div className="rounded-md border px-2 py-1.5">Todos os participantes</div>
          <p className="rounded-md bg-muted px-2 py-1.5">Reuniões · Histórico · Configurações</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-52 overflow-hidden rounded-2xl border bg-background p-2 text-[10px] shadow-sm">
        <strong>CRM · Funil</strong>
        <p className="mt-1 text-muted-foreground">Deslize para ver as etapas →</p>
        <div className="mt-2 rounded-lg border border-t-4 border-t-emerald-500 bg-muted/20 p-2">
          <strong>Atendendo</strong>
          <div className="mt-2 rounded-md border bg-background p-2">Lead de exemplo · R$ 0,00</div>
        </div>
        <p className="mt-2 text-muted-foreground">Agenda · deslize para ver outros dias →</p>
      </div>
    </PreviewGrid>
  );
}

function CollaboratorSyncPreview() {
  return (
    <PreviewGrid label="Prévia dos colaboradores preservados e da tarefa atualizada para o participante">
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="mb-2 text-[11px] font-semibold">Editar tarefa · Colaboradores</p>
        <div className="rounded-lg border p-2.5">
          <p className="text-muted-foreground">Colaboradores</p>
          <div className="mt-1.5 flex items-center justify-between rounded-md border bg-muted/30 px-2 py-1.5">
            <span>2 selecionados</span>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <p className="mt-2 text-muted-foreground">Participantes carregados antes de salvar.</p>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="mb-2 text-[11px] font-semibold">Minhas tarefas · Atribuídas a mim</p>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-emerald-900">
          <p className="font-medium">Revisar campanha</p>
          <p className="mt-1">Você foi adicionada como colaboradora.</p>
        </div>
        <p className="mt-2 text-muted-foreground">A lista recebe novas atribuições automaticamente.</p>
      </div>
    </PreviewGrid>
  );
}

function MeetingDeleteHistoryPreview() {
  return (
    <PreviewGrid label="Prévia da exclusão de reunião com histórico">
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <div
          className="mb-2 flex flex-wrap gap-1 rounded-lg bg-muted p-1"
          aria-label="Abas de reuniões"
        >
          <span className="rounded-md bg-background px-2 py-1 font-medium shadow-sm">Reuniões</span>
          <span className="px-2 py-1 text-muted-foreground">Histórico</span>
          <span className="px-2 py-1 text-muted-foreground">Configurações</span>
        </div>
        <p className="text-[11px] font-semibold">Reunião de exemplo</p>
        <p className="mt-1 text-muted-foreground">2 pautas · 1 tarefa · 1 ata</p>
        <div className="mt-3 flex items-center gap-2 rounded-lg border p-2">
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
          <span>Excluir reunião</span>
        </div>
      </div>
      <div className="rounded-xl border border-destructive/30 bg-background p-3 text-[10px] shadow-sm">
        <p className="text-[11px] font-semibold">Excluir esta reunião?</p>
        <p className="mt-2 text-muted-foreground">Pautas e vínculos com atas serão removidos.</p>
        <p className="mt-1 text-muted-foreground">Tarefas e notas continuam disponíveis.</p>
        <span className="mt-3 inline-block rounded-md bg-destructive px-2 py-1 text-destructive-foreground">
          Excluir reunião
        </span>
      </div>
    </PreviewGrid>
  );
}

function MemberTeamDashboardPreview() {
  return (
    <div
      aria-label="Prévia do dashboard da equipe para colaboradores"
      className="overflow-hidden rounded-xl border bg-background shadow-sm"
    >
      <div className="bg-[#11295a] p-3 text-white">
        <p className="text-[9px] uppercase tracking-widest text-sky-200">Visão compartilhada</p>
        <p className="mt-1 text-sm font-bold">O trabalho da equipe</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5 text-[9px] sm:grid-cols-4">
          <span className="rounded-md bg-white/10 p-2">
            Tarefas abertas
            <br />
            <strong className="text-amber-200">6 ↗</strong>
          </span>
          <span className="rounded-md bg-white/10 p-2">
            Tarefas concluídas
            <br />
            <strong className="text-emerald-200">4</strong>
          </span>
          <span className="rounded-md bg-white/10 p-2">
            Subtarefas abertas
            <br />
            <strong className="text-sky-200">3</strong>
          </span>
          <span className="rounded-md bg-white/10 p-2">
            Subtarefas concluídas
            <br />
            <strong className="text-emerald-200">5</strong>
          </span>
        </div>
      </div>
      <div className="border-b p-3 text-[10px]">
        <strong>Tarefas em andamento · 6</strong>
        <p className="mt-1 rounded border px-2 py-1 text-muted-foreground">
          Buscar por tarefa, cliente ou responsável
        </p>
        <p className="mt-1.5 border-b pb-1">Card principal · Cliente exemplo A ↗</p>
        <p className="mt-1.5">Card principal · Cliente exemplo B ↗</p>
        <div className="mt-2 rounded-lg border border-sky-200 bg-sky-50 p-2 text-slate-800">
          <strong>Resumo do card · Marketing</strong>
          <p className="mt-1">Tarefa exemplo · Em andamento</p>
          <p className="text-slate-600">Cliente exemplo A · Responsável da equipe</p>
        </div>
      </div>
      <div className="border-b p-3 text-[10px]">
        <div className="flex items-center justify-between gap-2">
          <strong>Demanda por cliente</strong>
          <span className="rounded border px-2 py-1 text-muted-foreground">
            Toda a equipe · Em aberto ▾
          </span>
        </div>
        <p className="mt-1 text-muted-foreground">Cards principais · Subtarefas</p>
        <div className="mt-2 space-y-2">
          <div>
            <span>Cliente exemplo A · 7</span>
            <span className="mt-1 flex h-2 overflow-hidden rounded-full">
              <span className="w-3/5 bg-blue-600" />
              <span className="w-2/5 bg-violet-500" />
            </span>
          </div>
          <div>
            <span>Cliente exemplo B · 4</span>
            <span className="mt-1 flex h-2 w-3/5 overflow-hidden rounded-full">
              <span className="w-1/2 bg-blue-600" />
              <span className="w-1/2 bg-violet-500" />
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-2 p-3 text-[10px] sm:grid-cols-2">
        <div className="rounded-lg border p-2">
          <strong>Quem está fazendo o quê</strong>
          <p className="mt-2">Pessoa da equipe · 2 tarefas e 3 subtarefas concluídas</p>
          <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-emerald-500" />
        </div>
        <div className="rounded-lg border p-2">
          <strong>Entregas recentes</strong>
          <p className="mt-2">✓ Subtarefa concluída</p>
          <p className="mt-1 text-muted-foreground">Atividade visível no ambiente</p>
        </div>
      </div>
    </div>
  );
}

function ClientImportantDatesPreview() {
  return (
    <PreviewGrid label="Prévia das datas dos clientes e feriados nos calendários">
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="flex items-center gap-1 font-semibold"><CalendarHeart className="h-3 w-3 text-amber-600" />Cliente · Datas importantes</p>
        <div className="mt-2 grid grid-cols-4 gap-0.5 rounded-lg bg-muted p-1 text-center text-[8px]" aria-label="Abas do cliente organizadas em duas linhas">
          {["Dados", "Datas", "Unidades", "Deptos.", "Sistemas", "Notas", "Anexos", "Arquivadas"].map((tab) => (
            <span key={tab} className={`min-w-0 truncate rounded px-0.5 py-1 ${tab === "Datas" ? "bg-background font-semibold text-foreground shadow-sm" : "text-muted-foreground"}`}>{tab}</span>
          ))}
        </div>
        <div className="mt-2 rounded-md border bg-muted/20 p-2">
          <p className="font-medium">Aniversário da fundadora</p>
          <p className="text-muted-foreground">18 de outubro · Todo ano</p>
        </div>
        <div className="mt-1 rounded-md border bg-muted/20 p-2">
          <p className="font-medium">Lançamento especial</p>
          <p className="text-muted-foreground">22 de outubro de 2026 · Uma única vez</p>
        </div>
      </div>
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="flex items-center gap-1 font-semibold"><CalendarDays className="h-3 w-3" />Calendários · Outubro</p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full font-semibold">12</span>
          <span className="flex max-w-full items-center gap-1 rounded-md border border-sky-200 bg-sky-50/80 px-1.5 py-0.5 text-sky-800"><Flag className="h-2.5 w-2.5 shrink-0" />Feriado · Nossa Senhora Aparecida</span>
        </div>
        <div className="mt-1.5 rounded-md bg-primary px-2 py-1.5 text-primary-foreground">Revisar campanha</div>
        <p className="mt-2 text-muted-foreground">Data ao lado do dia quando couber; senão, abaixo. As tarefas permanecem visíveis.</p>
      </div>
    </PreviewGrid>
  );
}

function ReportSubtaskMetricsPreview() {
  return (
    <PreviewGrid label="Prévia do ranking com subtarefas atribuídas ao próprio responsável">
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="font-semibold">Ranking da equipe</p>
        <div className="mt-3 rounded-lg border p-2">
          <p className="font-medium">Pessoa da equipe</p>
          <p className="mt-1 text-muted-foreground">3 entregas · 2 subtarefas</p>
          <div className="mt-2 flex gap-1">
            <span className="h-1.5 w-2/3 rounded-full bg-emerald-500" />
            <span className="h-1.5 w-1/3 rounded-full bg-amber-400" />
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">A subtarefa conta para quem a recebeu.</p>
      </div>
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="font-semibold">Resumo do período</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded-lg border p-2">Tarefas principais<br /><strong>4</strong></span>
          <span className="rounded-lg border p-2">Subtarefas concluídas/total<br /><strong>2/3</strong></span>
        </div>
        <p className="mt-2 text-muted-foreground">Prazo e conclusão próprios de cada atividade.</p>
      </div>
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="flex items-center gap-1 font-semibold"><CalendarDays className="h-3 w-3" />Calendário · Tarefas</p>
        <div className="mt-3 rounded-lg border p-2">
          <p className="text-muted-foreground">Sex, 9 de outubro</p>
          <div className="mt-2 flex items-center justify-between rounded-md bg-primary px-2 py-1.5 text-primary-foreground">
            <span className="truncate">Revisar campanha</span>
            <span className="ml-2 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700" aria-label="Check verde para concluir a tarefa">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">Passe o mouse no card para concluir.</p>
      </div>
    </PreviewGrid>
  );
}

function CrmPipelinePreview() {
  return (
    <div
      aria-label="Prévia do CRM com leads distribuídos por etapa"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold">
        <KanbanSquare className="h-3.5 w-3.5 text-primary" /> CRM · Pipeline
      </p>
      <div className="grid grid-cols-1 gap-1.5 text-[9px] sm:grid-cols-3">
        {[
          { label: "Novos Leads", color: "#3278d4", card: "Nova oportunidade" },
          { label: "Proposta Enviada", color: "#f06e43", card: "Projeto em análise" },
          { label: "Finalizados", color: "#208b43", card: "Contrato fechado" },
        ].map((stage) => (
          <div
            key={stage.label}
            className="min-h-20 rounded-md border bg-muted/30 p-1.5"
            style={{ borderTop: `2px solid ${stage.color}` }}
          >
            <p className="mb-2 font-semibold">{stage.label}</p>
            <div className="rounded border bg-background p-1.5 shadow-sm">{stage.card}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrmColumnsPreview() {
  return (
    <div
      aria-label="Prévia da edição do título e da cor de uma coluna do CRM"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 text-[11px] font-semibold">CRM · Editar coluna</p>
      <div className="rounded-lg border p-2.5 text-[10px]">
        <p className="mb-2 text-muted-foreground">Título da coluna</p>
        <div className="rounded border px-2 py-1.5 font-medium">Proposta Enviada</div>
        <p className="mb-2 mt-3 text-muted-foreground">Cor da coluna</p>
        <div className="flex items-center gap-2">
          <span className="h-6 w-8 rounded border" style={{ backgroundColor: "#f06e43" }} />
          <span>#F06E43</span>
        </div>
        <div className="mt-3 rounded-md bg-primary px-2 py-1.5 text-center font-medium text-primary-foreground">
          Salvar coluna
        </div>
      </div>
    </div>
  );
}

function CrmCompanyPreview() {
  return (
    <div
      aria-label="Prévia das duas formas de informar uma empresa no lead"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 text-[11px] font-semibold">Novo lead · Empresa</p>
      <div className="flex flex-wrap gap-1.5 text-[9px]">
        <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">
          Empresa cadastrada
        </span>
        <span className="rounded-md border px-2 py-1">Somente o nome</span>
      </div>
      <div className="mt-2 rounded-md border p-2 text-[9px]">
        <p className="text-muted-foreground">Selecionar cliente do TaskFlow</p>
        <p className="mt-1 font-medium">Empresa exemplo ▾</p>
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground">
        Ou informe apenas o nome, sem criar um cadastro.
      </p>
    </div>
  );
}

function CrmCompanyLabelsPreview() {
  return (
    <div
      aria-label="Prévia dos novos rótulos de empresa no lead"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 text-[11px] font-semibold">Lead · Empresa</p>
      <div className="flex flex-wrap gap-1.5 text-[9px]">
        <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">
          Empresa cadastrada
        </span>
        <span className="rounded-md border px-2 py-1">Sem cadastro</span>
      </div>
      <div className="mt-2 rounded-md border p-2 text-[9px]">
        <p className="text-muted-foreground">Selecionar cliente cadastrado</p>
        <p className="mt-1 font-medium">Selecione uma empresa cadastrada ▾</p>
      </div>
    </div>
  );
}

function CrmWithoutContactPreview() {
  return (
    <PreviewGrid label="Prévia do cartão e do formulário de lead sem campo de contato separado">
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="font-semibold">Lead de exemplo</p>
        <p className="mt-1 text-muted-foreground">Empresa exemplo</p>
        <p className="mt-3 text-muted-foreground">(11) 99999-9999</p>
        <p className="mt-1 text-muted-foreground">equipe@exemplo.com</p>
      </div>
      <div className="rounded-xl border bg-background p-3 text-[10px] shadow-sm">
        <p className="font-semibold">Editar lead</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="rounded border px-2 py-1.5">E-mail</span>
          <span className="rounded border px-2 py-1.5">Telefone</span>
        </div>
      </div>
    </PreviewGrid>
  );
}

function CrmAvatarAlignedPreview() {
  return (
    <div
      aria-label="Prévia da inicial centralizada ao lado do título e da empresa no cartão do CRM"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
            V
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold">Lead de exemplo</p>
            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">Empresa exemplo</p>
          </div>
        </div>
        <span className="rounded-md border p-1.5">
          <Pencil className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

function PermissionNavOrderPreview() {
  return (
    <div
      aria-label="Prévia das permissões organizadas na ordem da barra lateral"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 text-[11px] font-semibold">Acessos do sistema</p>
      <div className="grid grid-cols-1 gap-1.5 text-[9px] sm:grid-cols-2">
        {[
          "Mural LA",
          "Dashboard",
          "Minhas Tarefas",
          "Conversas",
          "Obrigações",
          "Reuniões",
          "Clientes",
          "CRM",
        ].map((label) => (
          <span key={label} className="flex items-center gap-1.5 rounded-md border px-2 py-1">
            <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PermissionSavePreview() {
  return (
    <div
      aria-label="Prévia dos acessos de Reuniões e CRM mantidos após salvar"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="mb-2 text-[11px] font-semibold">Definir acessos</p>
      <div className="grid grid-cols-1 gap-1.5 text-[10px] sm:grid-cols-2">
        {["Reuniões", "CRM"].map((label) => (
          <span key={label} className="flex items-center gap-1.5 rounded-md border px-2 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
            {label}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground">Acessos mantidos após salvar</p>
    </div>
  );
}

function MeetingAutoCompletePreview() {
  return (
    <div
      aria-label="Prévia da reunião encerrada após concluir todos os itens e tarefas"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold">Reunião de exemplo</p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
          Encerrada
        </span>
      </div>
      <div className="mt-2 space-y-1 text-[9px]">
        <p className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-primary" /> Pauta concluída
        </p>
        <p className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-primary" /> Tarefa vinculada concluída
        </p>
      </div>
    </div>
  );
}

function MeetingEmptyClosePreview() {
  return (
    <div
      aria-label="Prévia da opção para encerrar uma reunião sem pauta"
      className="rounded-xl border bg-background p-3 shadow-sm"
    >
      <p className="text-[11px] font-semibold">Reunião de exemplo</p>
      <div className="mt-2 rounded-lg border bg-muted/20 px-3 py-4 text-center text-[10px] text-muted-foreground">
        Nenhum item na pauta desta reunião.
      </div>
      <div className="mt-2 flex justify-end">
        <span className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[9px] font-medium text-primary-foreground">
          <CheckCircle2 className="h-3 w-3" /> Encerrar sem pauta
        </span>
      </div>
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
  "task-list-quick-actions": TaskListQuickActionsPreview,
  "consultoria-owner-task-panel": () => <MarketingCreateSidePanelPreview workspace="Consultoria" />,
  "marketing-create-side-panel": MarketingCreateSidePanelPreview,
  "marketing-inline-task-images": MarketingInlineTaskImagesPreview,
  "meeting-agenda-tasks": MeetingAgendaTasksPreview,
  "subtask-attachment-indicator": SubtaskAttachmentIndicatorPreview,
  "subtask-file-thumbnails": SubtaskFileThumbnailsPreview,
  "subtask-dragged-images": SubtaskDraggedImagesPreview,
  "automatic-safe-update": AutomaticSafeUpdatePreview,
  "subtask-pasted-prints": SubtaskPastedPrintsPreview,
  "client-calendar-references": ClientCalendarReferencesPreview,
  "agenda-google-compact-actions": AgendaGoogleCompactActionsPreview,
  "agenda-google-connection-layout": AgendaGoogleConnectionLayoutPreview,
  "reports-period-layout": ReportsPeriodLayoutPreview,
  "mobile-client-cards": MobileClientCardsPreview,
  "dashboard-mobile-metrics": DashboardMobileMetricsPreview,
  "mobile-obligations-metrics": MobileObligationsMetricsPreview,
  "mobile-task-toolbar": MobileTaskToolbarPreview,
  "dashboard-filter-panel": DashboardFilterPanelPreview,
  "team-distribution-labels": TeamDistributionLabelsPreview,
  "compact-environments-mobile": CompactEnvironmentsMobilePreview,
  "animated-sidebar": AnimatedSidebarPreview,
  "recent-update-history": RecentUpdateHistoryPreview,
  "sidebar-control-footer": SidebarControlFooterPreview,
  "mobile-layout": MobileLayoutPreview,
  "meeting-delete-history": MeetingDeleteHistoryPreview,
  "collaborator-sync": CollaboratorSyncPreview,
  "client-important-dates": ClientImportantDatesPreview,
  "member-team-dashboard": MemberTeamDashboardPreview,
  "report-subtask-metrics": ReportSubtaskMetricsPreview,
  "meeting-empty-close": MeetingEmptyClosePreview,
  "meeting-auto-complete": MeetingAutoCompletePreview,
  "permission-save": PermissionSavePreview,
  "permission-nav-order": PermissionNavOrderPreview,
  "crm-avatar-aligned": CrmAvatarAlignedPreview,
  "crm-without-contact": CrmWithoutContactPreview,
  "crm-company-labels": CrmCompanyLabelsPreview,
  "crm-company": CrmCompanyPreview,
  "crm-columns": CrmColumnsPreview,
  "crm-pipeline": CrmPipelinePreview,
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
