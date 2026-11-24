# TaskFlow no celular + push — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Versões próprias para celular de Lista, Kanban e Calendário de Minhas Tarefas, criação rápida, acabamento de app no iPhone e push de "tarefa atribuída" e "vence hoje/amanhã" — sem nenhuma mudança no desktop.

**Architecture:** As rotas de tarefas continuam calculando dados/filtros como hoje; quando `useIsMobile()` é verdadeiro renderizam componentes de `src/components/mobile/`. Push usa Web Push (VAPID): tabela `push_subscriptions`, trigger em `notifications` → `pg_net` → Edge Function `send-push`; cron diário gera `due_soon`. O SW gerado pelo vite-plugin-pwa importa `public/push-sw.js`.

**Tech Stack:** React 19 + TanStack Router/Query, Tailwind, Radix (Sheet/Drawer de `src/components/ui`), Vitest, Supabase (Postgres, pg_cron, pg_net, Vault, Edge Functions Deno + `npm:web-push@3.6.7`), vite-plugin-pwa (generateSW).

**Spec:** `docs/superpowers/specs/2026-11-24-taskflow-mobile-push-design.md`

## Global Constraints

- Desktop (≥ 768px) idêntico ao atual: nada novo renderiza fora de `useIsMobile()`; `due_soon` fora do sino no desktop; card de push só no celular.
- Breakpoint mobile = `useIsMobile()` de `src/hooks/use-mobile.tsx` (768px).
- Fuso de prazo: America/Sao_Paulo. Cron 08:00 BRT = `0 11 * * *` UTC.
- Push só para tipos `assignment` e `due_soon`; `due_soon` para responsável + colaboradores; nunca concluída (`completed_at` ou status concluído), excluída (`deleted_at`), arquivada (`archived_at`) ou rascunho (`is_draft`).
- Não alterar `registerType: "prompt"`, cache/offline nem o fluxo do `UpdateCenter`. Não limpar storage.
- Mutações reutilizam `updateTaskWithOfflineSupport` / `createTaskWithOfflineSupport`.
- Alvos de toque ≥ 44px; safe-area via `env(safe-area-inset-*)`.
- Textos em pt-BR. Sem commit/push/deploy sem autorização explícita do usuário (AGENTS.md) — os passos "Commit" deste plano ficam para quando ele autorizar.
- Entrada nova no topo de `APP_UPDATES` com miniatura, título deixando claro "no celular".

## Review Focus

1. Tarefa com `due_date` às 00:30 BRT (que em UTC é o dia anterior) → agrupada/avisada no dia certo de Brasília (teste em Task 1 e SQL usa `AT TIME ZONE 'America/Sao_Paulo'`).
2. Rodar o cron duas vezes no mesmo dia → nenhum `due_soon` duplicado (índice único, Task 7).
3. Assinatura expirada (404/410) → removida, sem travar envio para os outros aparelhos (Task 8).
4. Concluir tarefa pela bolinha estando offline → fica na fila e some do grupo (usa mutação offline, Task 3).
5. Redimensionar de 1280px para 390px e voltar → desktop volta exatamente igual (verificação Task 11).

---

### Task 1: Lógica pura de agrupamento e semana

**Files:**
- Create: `src/lib/mobile-task-groups.ts`
- Test: `src/lib/mobile-task-groups.test.ts`

**Interfaces:**
- Produces:
  - `type DueGroupKey = "overdue" | "today" | "tomorrow" | "week" | "later" | "none" | "done"`
  - `const DUE_GROUP_LABELS: Record<DueGroupKey, string>` = Atrasadas, Hoje, Amanhã, Esta semana, Depois, Sem prazo, Concluídas
  - `groupTasksByDue<T extends { due_date: string | null; completed_at?: string | null; status?: string | null }>(tasks: T[], now?: Date, isDone?: (t: T) => boolean): { key: DueGroupKey; label: string; tasks: T[] }[]` — só grupos não vazios, na ordem acima; dentro do grupo ordena por `due_date` asc.
  - `weekDaysAround(anchor: Date): Date[]` — 7 dias, segunda a domingo, da semana de `anchor`.
  - `tasksOnDay<T extends { due_date: string | null }>(tasks: T[], day: Date): T[]`
  - Datas comparadas em America/Sao_Paulo (usar `Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" })` para chave `YYYY-MM-DD`).

- [ ] **Step 1: Testes** — `groupTasksByDue` com now=`2026-11-24T15:00:00-03:00`: due `2026-11-23T12:00-03:00` → overdue; `2026-11-24T00:30:00-03:00` → today; `2026-11-25` → tomorrow; `2026-11-29` → week; `2026-12-10` → later; null → none; `completed_at` preenchido → done; grupos vazios ausentes. `weekDaysAround(2026-11-26)` → primeiro dia 2026-11-23, último 2026-11-29. `tasksOnDay` inclui a tarefa das 00:30 BRT no dia 24.
- [ ] **Step 2:** `npx vitest run src/lib/mobile-task-groups.test.ts` → FAIL (módulo inexistente).
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** Mesmo comando → PASS.

### Task 2: Acabamento de app no iPhone

**Files:**
- Modify: `src/routes/__root.tsx` (meta viewport e novas metas)
- Modify: `src/styles.css` (utilitários safe-area)
- Modify: `src/components/AppShell.tsx:300` (barra mobile) e `:449` (`main` padding)

- [ ] **Step 1:** viewport → `width=device-width, initial-scale=1, viewport-fit=cover`; adicionar `apple-mobile-web-app-capable=yes`, `mobile-web-app-capable=yes`, `apple-mobile-web-app-status-bar-style=default`, `apple-mobile-web-app-title=TaskFlow`, `theme-color=#142e63`.
- [ ] **Step 2:** Em `styles.css` (`@layer utilities`): `.pt-safe { padding-top: env(safe-area-inset-top) }`, `.pb-safe { padding-bottom: env(safe-area-inset-bottom) }`, `.bottom-safe-4 { bottom: calc(1rem + env(safe-area-inset-bottom)) }`.
- [ ] **Step 3:** Barra mobile `fixed … h-14 md:hidden` ganha `pt-safe` e altura `h-[calc(3.5rem+env(safe-area-inset-top))]`; `main` usa `pt-[calc(3.5rem+env(safe-area-inset-top))] md:pt-0`. Classes só afetam < md (insets são 0 no desktop).
- [ ] **Step 4:** `npm run build` → sucesso.

### Task 3: Lista no celular

**Files:**
- Create: `src/components/mobile/MobileTaskCard.tsx`, `src/components/mobile/MobileTaskList.tsx`
- Modify: `src/routes/_app/tasks.list.tsx` (render condicional, perto da `<table>` em ~421)
- Test: `src/components/mobile/MobileTaskList.test.tsx`

**Interfaces:**
- Consumes: `groupTasksByDue` (Task 1); `priorityColors`, `dueUrgencyState`, `dueUrgencyTextClass` de `task-utils`.
- Produces:
  - `MobileTaskCard({ task, clientName, assignee, isDone, onOpen, onToggleDone, actions? }: { task: Task; clientName?: string; assignee?: Profile; isDone: boolean; onOpen(): void; onToggleDone(): void; actions?: ReactNode })` — bolinha 44px à esquerda (`aria-label="Concluir tarefa"`), título 2 linhas, linha de meta (cliente · prazo colorido por urgência · avatar), faixa de prioridade.
  - `MobileTaskList({ tasks, isDone, clientNames, profiles, onOpen, onToggleDone })` — seções colapsáveis por grupo com contagem; "Concluídas" começa fechada; estado vazio "Nenhuma tarefa por aqui".

- [ ] **Step 1: Testes** (Testing Library, padrão de `CompletedSubtaskCard.test.tsx`): renderiza títulos de seção "Atrasadas (1)" e "Hoje (1)"; clicar no botão "Concluir tarefa" chama `onToggleDone` e não `onOpen`; clicar no título chama `onOpen`; "Concluídas" inicia fechada.
- [ ] **Step 2:** Rodar → FAIL.
- [ ] **Step 3:** Implementar componentes. Em `tasks.list.tsx`, `const isMobile = useIsMobile()`; quando verdadeiro, renderizar `MobileTaskList` com a mesma lista já filtrada/ordenada que alimenta a tabela; `onOpen` = mesmo handler que abre `TaskDialog`; `onToggleDone` = mesmo fluxo de conclusão da tabela (inclui `CompletionDateDialog` se a tabela usa). Filtros/período no topo continuam, mas em linha rolável horizontal.
- [ ] **Step 4:** Rodar teste → PASS; `npx vitest run src/routes` sem regressão.

### Task 4: Kanban no celular

**Files:**
- Create: `src/components/mobile/MobileKanban.tsx`
- Modify: `src/routes/_app/tasks.kanban.tsx`
- Test: `src/components/mobile/MobileKanban.test.tsx`

**Interfaces:**
- Consumes: `MobileTaskCard` (Task 3).
- Produces: `MobileKanban({ columns, tasksByColumn, isDone, clientNames, profiles, onOpen, onToggleDone, onMove, onCreateInColumn }: { columns: { id: string; name: string }[]; tasksByColumn: Record<string, Task[]>; …; onMove(task: Task, columnId: string): void; onCreateInColumn(columnId: string): void })`
  - Abas roláveis no topo com contagem; corpo `flex overflow-x-auto snap-x snap-mandatory`, cada coluna `w-full shrink-0 snap-start`; `IntersectionObserver`/scroll sincroniza aba ativa; tocar aba faz `scrollIntoView`.
  - Cada cartão tem menu (⋯) "Mover para…" listando as outras colunas.

- [ ] **Step 1: Testes:** renderiza abas "A fazer 2", "Fazendo 1"; clicar "Mover para…" → "Fazendo" chama `onMove(task, "col-2")`.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar; em `tasks.kanban.tsx` usar a mesma origem de colunas/tarefas e a mesma função de mover que o drag-and-drop desktop usa ao soltar. **Step 4:** PASS.

### Task 5: Calendário dia a dia no celular

**Files:**
- Create: `src/components/mobile/MobileDayAgenda.tsx`
- Modify: `src/components/TaskCalendar.tsx` (`CalendarPage`; render condicional antes da grade em ~697)
- Test: `src/components/mobile/MobileDayAgenda.test.tsx`

**Interfaces:**
- Consumes: `weekDaysAround`, `tasksOnDay` (Task 1), `MobileTaskCard`.
- Produces: `MobileDayAgenda({ tasks, selectedDay, onSelectDay, isDone, clientNames, profiles, onOpen, onToggleDone })` — cabeçalho "novembro 2026" + setas ‹ › (semana anterior/seguinte) + botão "Hoje"; faixa de 7 dias (letra + número, ponto quando há tarefa, hoje destacado, selecionado preenchido); swipe horizontal na faixa troca semana; abaixo, tarefas do dia ou "Nada para este dia".

- [ ] **Step 1: Testes:** com selectedDay 2026-11-24 mostra 7 botões de dia de 23 a 29; clicar no dia 26 chama `onSelectDay` com 26; botão "Próxima semana" chama com 2026-12-01; lista só tarefas do dia selecionado.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar; no `CalendarPage`, quando mobile, esconder seletor semana/mês e a grade e renderizar `MobileDayAgenda` (estado `selectedDay` inicial = hoje). **Step 4:** PASS.

### Task 6: Criação rápida

**Files:**
- Create: `src/lib/quick-task.ts`, `src/components/mobile/QuickTaskSheet.tsx`, `src/components/mobile/MobileFab.tsx`
- Modify: `tasks.list.tsx`, `tasks.kanban.tsx`, `TaskCalendar.tsx` (montar FAB + sheet só no mobile)
- Test: `src/lib/quick-task.test.ts`

**Interfaces:**
- Produces:
  - `buildQuickTask(input: { id: string; title: string; clientId: string | null; assigneeId: string | null; dueDate: string | null /* YYYY-MM-DD */; columnId: string | null; statusId: string | null; workspaceId: string | null; userId: string; now: string }): Task` — `status: "todo"`, `priority: "medium"`, `due_date` = fim do dia em BRT no mesmo formato de `deadlineToIso` do TaskDialog, `is_draft: false`, `position: 0`, demais nulos.
  - `createQuickTask(input, queryClient): Promise<{ queued: boolean }>` — online: insert autenticado igual ao do TaskDialog (~1369) + `task_history` `created` + `addCachedTask`; offline: `createTaskWithOfflineSupport`.
  - `QuickTaskSheet({ open, onOpenChange, defaults?: { dueDate?: string; columnId?: string }, onMoreDetails(values): void })` — Drawer inferior com Título (autofocus, Enter = Criar), Cliente, Responsável (padrão = eu), Prazo (chips Hoje/Amanhã/+data); botões "Criar" e "Mais detalhes" (abre `TaskDialog` com `defaults` = título/cliente/responsável/prazo).
  - `MobileFab({ onClick })` — botão 56px redondo, `fixed right-4 bottom-safe-4 z-40 md:hidden`, `aria-label="Nova tarefa"`.
- [ ] **Step 1: Testes** de `buildQuickTask`: título com espaços é aparado; vazio → lança "Informe o título"; `dueDate "2026-11-24"` gera `due_date` que `tasksOnDay(…, 24/11)` reconhece; `status_id` e `column_id` repassados.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar. Coluna/status padrão: primeira coluna e primeiro status não concluído do ambiente ativo (mesma regra do `buildPayload`). Calendário passa `dueDate` do dia selecionado; Kanban passa `columnId` da aba ativa. **Step 4:** PASS.

### Task 7: Banco — assinaturas, aviso de prazo e disparo

**Files:**
- Create: `supabase/migrations/20261124200000_mobile_push_notifications.sql`

- [ ] **Step 1:** `push_subscriptions` (colunas do spec; `endpoint text unique not null`); RLS `user_id = auth.uid()` para select/insert/delete/update; grants para `authenticated`.
- [ ] **Step 2:** `notifications` ganha coluna `notify_day date` (nullable) e índice único parcial `(user_id, task_id, type, notify_day) WHERE type = 'due_soon'`.
- [ ] **Step 3:** `public.notify_due_soon_tasks()` SECURITY DEFINER: para tarefas com `(due_date AT TIME ZONE 'America/Sao_Paulo')::date` em (hoje, amanhã) BRT e filtros dos Global Constraints, insere para `assignee_id` e para `task_collaborators.user_id` (distintos) `type 'due_soon'`, título `Vence hoje` / `Vence amanhã`, corpo = título da tarefa, `notify_day` = hoje BRT, `ON CONFLICT DO NOTHING`. `cron.schedule('taskflow-due-soon', '0 11 * * *', 'SELECT public.notify_due_soon_tasks()')` com unschedule prévio (padrão de `20260930120000_…:1793`).
- [ ] **Step 4:** `CREATE EXTENSION IF NOT EXISTS pg_net`; `public.dispatch_push()` trigger AFTER INSERT ON notifications, `WHEN (NEW.type IN ('assignment','due_soon'))`: lê `push_function_url` e `cron_secret` de `vault.decrypted_secrets`; se ausentes, retorna sem erro; senão `net.http_post(url, jsonb_build_object('notification_id', NEW.id), headers => {'Content-Type','x-cron-secret'})`.
- [ ] **Step 5:** Validar sintaxe localmente se houver `supabase` CLI/DB local (`supabase db lint` ou `psql` em container); se não houver, revisar à mão e registrar no relatório que não foi executada. **Não aplicar no remoto.**

### Task 8: Edge Function `send-push`

**Files:**
- Create: `supabase/functions/send-push/index.ts`
- Modify: `supabase/config.toml` (`[functions.send-push] verify_jwt = false`)

- [ ] **Step 1:** Handler: valida header `x-cron-secret` == `CRON_SECRET` (401 se não); body `{ notification_id }` ou `{ test: true, user_id }` (teste exige JWT do próprio usuário via `Authorization` e envia "Notificações ativadas ✅"). Lê aviso + assinaturas do usuário com service role; conta não lidos para `badge`.
- [ ] **Step 2:** Payload JSON `{ title, body, url, badge, tag }` — `url` = `/tasks/list?task=<task_id>`, `tag` = `<type>:<task_id>`. Envia com `webpush.sendNotification` (VAPID de `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`); status 404/410 → delete da assinatura; outros erros só log; atualiza `last_used_at`.
- [ ] **Step 3:** `deno check supabase/functions/send-push/index.ts` se `deno` disponível → sem erros.

### Task 9: Service worker, inscrição, badge e filtros desktop

**Files:**
- Create: `public/push-sw.js`, `src/lib/push-subscription.ts`, `src/components/mobile/PushSettingsCard.tsx`
- Modify: `vite.config.ts` (`workbox.importScripts: ["/push-sw.js"]`, `includeAssets` + `push-sw.js`), `src/routes/_app/settings.tsx`, `src/components/NotificationBell.tsx`
- Test: `src/lib/push-subscription.test.ts`

**Interfaces:**
- Produces:
  - `pushSupport(env?: { standalone: boolean; hasPush: boolean; isIOS: boolean }): "ok" | "install-first" | "unsupported"` — iOS não instalado → `install-first`.
  - `urlBase64ToUint8Array(key: string): Uint8Array`
  - `subscribeToPush(userId: string): Promise<void>` — pede permissão (só chamada de clique), `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })` com `VITE_VAPID_PUBLIC_KEY`, upsert em `push_subscriptions` por `endpoint`.
  - `unsubscribeFromPush(): Promise<void>`, `sendTestPush(): Promise<void>` (invoca `send-push` com `{ test: true }`).
- [ ] **Step 1: Testes:** `pushSupport` para (iOS, não standalone) → `install-first`; (iOS standalone, push) → `ok`; (sem push) → `unsupported`; `urlBase64ToUint8Array` decodifica chave URL-safe conhecida.
- [ ] **Step 2:** FAIL. **Step 3:** Implementar.
  - `push-sw.js`: `push` → `showNotification(title, { body, tag, icon: "/taskflow-mark.png", data: { url } })` + `self.navigator.setAppBadge?.(badge)`; `notificationclick` → fecha, foca janela existente e `navigate(url)` ou `clients.openWindow(url)`. Nenhum listener de `fetch`/`install`/`activate`.
  - `PushSettingsCard`: renderizado em `settings.tsx` só quando `useIsMobile()`; estados: `install-first` (passo a passo Compartilhar → Adicionar à Tela de Início), desativado (botão "Ativar notificações"), ativado ("Enviar teste" / "Desativar"), permissão negada (texto de como liberar nos Ajustes).
  - `NotificationBell`: quando `!useIsMobile()`, filtrar `type === "due_soon"` da lista e do realtime; em ambos, `navigator.setAppBadge?.(nãoLidas)` / `clearAppBadge` quando 0 — **apenas se** `display-mode: standalone` e mobile, para não mudar o desktop.
- [ ] **Step 4:** PASS; `npm run build` gera `sw.js` contendo `importScripts("/push-sw.js")`(conferir com `grep`).

### Task 10: Novidade com miniatura

**Files:**
- Modify: `src/lib/app-updates.ts` (tipo `"mobile-tasks-push"` + entrada no topo), `src/components/UpdatePreviews.tsx` (miniatura no `UPDATE_PREVIEWS`)

- [ ] **Step 1:** Entrada `id: "tarefas-no-celular-2026-11-24"`, `title: "Minhas Tarefas mais fácil no celular"`, `date: "2026-11-24"`, `audience: "all"`, `workspaces: ["marketing","consultoria"]`, details: Lista em cartões por prazo; Kanban uma coluna por vez; Calendário dia a dia; botão + para criar rápido; avisos no celular de tarefa atribuída e prazo (ativar em Configurações, com o app instalado na Tela de Início). Frase "No computador nada muda."
- [ ] **Step 2:** Miniatura ilustrativa (celular com lista em cartões + FAB + notificação), dados fictícios, sem ações reais.
- [ ] **Step 3:** `npx vitest run src/lib/app-updates.test.ts src/components/UpdatePreviews.test.tsx` → PASS.

### Task 11: Verificação final

- [ ] `npm test` → tudo verde; `npm run lint` sem erros novos; `npm run build` ok.
- [ ] `npm run dev` + Playwright: 390×844 em Lista, Kanban, Calendário, criação rápida e Configurações, nos ambientes Marketing e Consultoria; screenshots.
- [ ] Mesmas telas em 1280×800 comparadas com `git stash` do estado anterior (screenshots antes/depois) → idênticas, sem FAB, sem card de push.
- [ ] Relatar ao usuário os passos que dependem de autorização: gerar VAPID (`npx web-push generate-vapid-keys`), `supabase secrets set VAPID_PUBLIC_KEY VAPID_PRIVATE_KEY VAPID_SUBJECT`, Vault `push_function_url`/`cron_secret`, `supabase db push`, `supabase functions deploy send-push`, `VITE_VAPID_PUBLIC_KEY` na Vercel, commit/push/deploy.
