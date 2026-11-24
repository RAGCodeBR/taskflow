# TaskFlow no celular + notificações push — design

Data: 2026-11-24 · Status: aguardando aprovação

## Por quê

O TaskFlow é usado como app instalado (Safari → Tela de Início no iPhone, Dock no Mac).
No celular, Minhas Tarefas é difícil de usar: a Lista é uma tabela de 9 colunas, o
Calendário é uma grade de até ~900px com rolagem lateral e o Kanban exige arrastar
colunas largas. Criar tarefa pelo celular é trabalhoso. E os avisos só aparecem com o
app aberto (sino), então prazos e novas atribuições passam despercebidos.

## Objetivos

1. **Push no aparelho** com o app fechado para:
   - nova tarefa atribuída a mim (já gera aviso `assignment` no banco);
   - tarefa vencendo hoje e amanhã (novo aviso `due_soon`).
   Número de avisos não lidos no ícone do app (Badging API).
2. **Minhas Tarefas no celular** (largura < 768px), com versões próprias:
   - **Lista**: cartões agrupados por prazo (Atrasadas, Hoje, Amanhã, Esta semana,
     Depois, Sem prazo); toque na bolinha conclui; toque no cartão abre a tarefa.
   - **Kanban**: uma coluna por vez, abas com contagem no topo, troca por deslizar
     (scroll-snap) ou tocando na aba; mover cartão de coluna por menu "Mover para…"
     (arrastar não é confiável no toque).
   - **Calendário**: sem grade semanal/mensal; faixa de dias deslizável no topo +
     lista de tarefas do dia escolhido, com setas de semana e botão "Hoje".
3. **Criação rápida**: botão **+** flutuante nas três telas abre folha inferior com
   Título, Cliente, Responsável e Prazo (prazo vem pré-preenchido com o dia escolhido
   no calendário/ coluna escolhida no Kanban). "Mais detalhes" abre o `TaskDialog`
   completo com os dados digitados.
4. **Acabamento de app no iPhone**: `viewport-fit=cover`, safe-area (notch e barra
   inferior) na barra do topo, FAB e folhas; metas `apple-mobile-web-app-*` e
   `theme-color`; alvos de toque ≥ 44px nas telas novas.

## Restrição principal: desktop intocado

Nada muda para quem usa o desktop (≥ 768px):
- Lista, Kanban e Calendário do desktop não são alterados; a versão nova só renderiza
  quando `useIsMobile()` é verdadeiro.
- Avisos `due_soon` não aparecem no sino do desktop (filtrados quando não-mobile).
- O card "Notificações no celular" em Configurações só aparece no celular.
- Push/badge só são ativados pelo celular; o trecho novo do service worker só reage a
  eventos `push`, sem efeito no desktop.
- A entrada em Novidades diz explicitamente "no celular".

## Não-objetivos

- Redesenhar as outras 21 telas (fica para entregas seguintes, uma a uma).
- Mudar qualquer coisa no desktop (≥ 768px) — ver restrição acima.
- App nativo / App Store, vibração (não existe no iOS web), widgets.
- Push para outros tipos de aviso (comentário, mural etc.) — fácil de ligar depois.

## Anti-objetivos (seria falha mesmo funcionando)

- Quebrar o fluxo de atualização do service worker (`registerType: "prompt"`,
  `UpdateCenter`) ou os dados offline.
- Push duplicado (mesmo aviso de prazo várias vezes no dia) ou push de tarefa
  concluída/excluída/rascunho.
- Pedir permissão de notificação sozinho ao abrir o app (o iOS exige toque do usuário
  e pedir sem contexto faz a pessoa negar).

## Abordagens consideradas

| | Abordagem | Troca |
|---|---|---|
| **Escolhida** | Web Push padrão (VAPID) com Edge Function própria no Supabase, disparada por trigger em `notifications` via `pg_net`; cron diário gera `due_soon` | Sem terceiros; exige mexer no SW com cuidado |
| Descartada | OneSignal/Firebase | Conta e SDK de terceiros, dados saem do Supabase |
| Descartada | Só badge no ícone | Não avisa com o app fechado |
| **Escolhida (UI)** | Componentes próprios para celular, renderizados com `useIsMobile()`, usando os mesmos hooks/mutações | Mais código, mas desktop fica intacto |
| Descartada (UI) | Só classes responsivas nas telas atuais | Tabela de 9 colunas não fica boa encolhida |

## Como (decidido)

### Push

- **Tabela `push_subscriptions`** (`id`, `user_id`, `endpoint` único, `p256dh`, `auth`,
  `user_agent`, `created_at`, `last_used_at`); RLS: cada usuário vê/insere/apaga só as
  suas.
- **Service worker**: manter `generateSW` e adicionar `workbox.importScripts:
  ["/push-sw.js"]`. `public/push-sw.js` trata `push` (mostra notificação + atualiza
  badge) e `notificationclick` (foca/abre `/tasks/list?task=<id>`). Não toca no cache.
- **Edge Function `send-push`** (`verify_jwt = false`, valida `CRON_SECRET` como a
  `instagram-insights-sync`): recebe `notification_id`, lê o aviso e as assinaturas do
  usuário com service role, envia com `npm:web-push`, remove assinaturas 404/410.
- **Trigger** `AFTER INSERT ON notifications` para tipos `assignment` e `due_soon`
  chama a função via `net.http_post` (URL e segredo lidos do Vault).
- **Prazo**: função `notify_due_soon_tasks()` + `cron.schedule` diário às 08:00 de
  Brasília (11:00 UTC). Gera `due_soon` para o responsável e colaboradores de tarefas
  com `due_date` hoje ou amanhã (fuso America/Sao_Paulo), não concluídas, não
  excluídas, não rascunho. Índice único (usuário, tarefa, tipo, dia) evita duplicata.
- **Ativação**: card "Notificações no celular" em Configurações e um aviso discreto
  uma vez no celular. Se não estiver instalado no iPhone (`display-mode: standalone`
  falso), mostra o passo a passo "Compartilhar → Adicionar à Tela de Início" em vez do
  botão. Botão "Enviar teste".
- **Badge**: `navigator.setAppBadge(nãoLidas)` no app (NotificationBell) e no SW.
- Chave pública VAPID em `VITE_VAPID_PUBLIC_KEY`; privada e `VAPID_SUBJECT` como
  secrets da função.

### Telas

- `src/components/mobile/`: `MobileTaskList`, `MobileKanban`, `MobileDayAgenda`,
  `MobileTaskCard`, `QuickTaskSheet`, `MobileFab`.
- `tasks.list.tsx`, `tasks.kanban.tsx`, `tasks.calendar.tsx`: quando `useIsMobile()`,
  renderizam a versão mobile com os dados/filtros que já calculam; conclusão e
  mudança de coluna reutilizam as mutações offline existentes.
- Lógica pura (agrupar por prazo, montar semana) em `src/lib/` com testes.

### Regras do projeto

- Entrada nova no topo de `APP_UPDATES` + miniatura em `UpdatePreviews.tsx`.
- Sem commit/push/deploy sem autorização. Aplicar migração, criar secrets VAPID e
  publicar a função são passos que o usuário autoriza no fim.

## Deixado ao implementador

- Visual exato dos cartões (seguir tokens/cores do app, prioridade e urgência de
  prazo já existentes em `task-utils`).
- Texto exato dos pushes (curto, em pt-BR, com cliente quando houver).
