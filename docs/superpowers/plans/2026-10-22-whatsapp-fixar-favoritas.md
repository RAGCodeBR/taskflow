# Mensagens fixadas, favoritas e ordem das fixadas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** No chat do WhatsApp (WA-AKG), fixar mensagens (WhatsApp ou local), favoritar com lista pesquisável e ordenar conversas fixadas no Kanban.

**Architecture:** Duas tabelas Prisma novas no PostgreSQL do WA-AKG; eventos `pinInChatMessage` tratados no store do Baileys; rotas Next no padrão das vizinhas; UI no `chat-window`, um painel novo e ajustes no board. O TaskFlow só ajusta o tema injetado.

**Tech Stack:** Next.js (app router), Prisma 5 + PostgreSQL 16, Baileys 7.0.0-rc14, Socket.IO, React, node:test via tsx.

**Spec:** `docs/superpowers/specs/2026-10-22-whatsapp-fixar-favoritas-design.md`

## Global Constraints

- Repositório do trabalho: `/Users/rei/Documents/Codex/2026-10-19/cons/outputs/wa-akg` (abaixo, `WA/`). Ele tem muitas alterações não commitadas de trabalho anterior: **não commitar, não fazer stash, não reverter nada**; antes de editar um arquivo, copiar o original para o scratchpad.
- Não reiniciar o app da porta 3039 nem trocar `.local/active-build` sem "ok" explícito do titular.
- Antes de `prisma db push`: `pg_dump` para `WA/.local/antes-fixadas-favoritas.dump`.
- Testes: `cd WA && npx tsx --test <arquivo>`; nunca enviar mensagens reais em testes.
- Durações aceitas: `86400 | 604800 | 2592000`; padrão `604800`.
- Toda rota nova: `getAuthenticatedUser` + `canAccessSession`, respostas `{ message }` com status como as vizinhas.
- Textos de UI em português, sentence case.

## Review Focus

1. Mensagem de grupo enviada por outra pessoa: a chave do pin precisa de `participant` = `senderJid`, senão o WhatsApp rejeita — teste em Task 1 (`pinKeyFor`).
2. Fixação que expira: some da faixa sem job — teste em Task 1 (`activePins` ignora `expiresAt` passado).
3. Busca de favoritas com acento/maiúscula ("reunião" acha "REUNIAO") — teste em Task 1 (`matchesStarQuery`).
4. Fixar quando o WhatsApp falha: grava `scope: local` e devolve `warning` — teste em Task 2 (`pinResultFromError`).
5. Arrastar não fixada sobre fixada: não altera `pinnedJids` — teste em Task 4 (`reorderPinned`).

---

### Task 1: Lógica pura (chaves, expiração, busca)

**Files:**
- Create: `WA/src/lib/message-marks.ts`
- Test: `WA/src/lib/__tests__/message-marks.test.ts`

**Interfaces:**
- Produces:
  - `pinKeyFor(m: { remoteJid: string; keyId: string; fromMe: boolean; senderJid: string | null }): { remoteJid: string; id: string; fromMe: boolean; participant?: string }` — `participant` só em grupo (`@g.us`) e `!fromMe`.
  - `parsePinEvent(msg: proto.IWebMessageInfo): { remoteJid: string; keyId: string; pin: boolean; seconds: number; by: string | null } | null` — lê `message.pinInChatMessage` (`type` 1 = pin, 2 = unpin), `seconds` de `message.messageContextInfo.messageAddOnDurationInSecs` ou `604800`.
  - `activePins<T extends { expiresAt: Date | null }>(rows: T[], now: Date): T[]`.
  - `normalizeSearch(text: string): string` (minúsculas, sem acento) e `matchesStarQuery(row: { content: string | null; chatName: string; senderName: string }, q: string): boolean`.

- [ ] **Step 1: Testes** — `pinKeyFor` com grupo/!fromMe inclui `participant`, privado não; `parsePinEvent` para type 1 com 86400, type 2, mensagem sem pin → `null`; `activePins` descarta `expiresAt` < now e mantém `null`; `matchesStarQuery({content:'Reunião às 10',chatName:'Diretoria',senderName:'Ana'},'reuniao')` → true, `'ANA'` → true, `'xyz'` → false.
- [ ] **Step 2:** Rodar `npx tsx --test src/lib/__tests__/message-marks.test.ts` → FAIL (módulo inexistente).
- [ ] **Step 3:** Implementar as funções acima.
- [ ] **Step 4:** Rodar de novo → PASS.

### Task 2: Banco, eventos do WhatsApp e rotas de fixar/favoritar

**Files:**
- Modify: `WA/prisma/schema.prisma` (modelos `PinnedMessage`, `StarredMessage` do spec + relações `pinnedMessages PinnedMessage[]`, `starredMessages StarredMessage[]` em `Session`)
- Modify: `WA/src/modules/whatsapp/store/index.ts` (no loop do `messages.upsert`, antes de `processAndSaveMessage`)
- Create: `WA/src/app/api/messages/[sessionId]/[jid]/[messageId]/pin/route.ts`
- Modify: `WA/src/app/api/messages/[sessionId]/[jid]/[messageId]/star/route.ts`
- Create: `WA/src/app/api/chat/[sessionId]/[jid]/pins/route.ts`
- Create: `WA/src/app/api/messages/[sessionId]/starred/route.ts`
- Create: `WA/src/lib/message-marks-server.ts` (consultas compartilhadas)
- Test: `WA/src/lib/__tests__/message-marks.test.ts` (acrescentar)

**Interfaces:**
- Consumes: Task 1.
- Produces:
  - `pinResultFromError(error: unknown): { scope: 'local'; warning: string }` em `message-marks.ts` (texto: "O WhatsApp não aceitou a fixação. Ela ficou fixada só para você.").
  - `listPins(dbSessionId: string, jid: string): Promise<PinView[]>` e `listStarred(dbSessionId: string, q: string): Promise<StarView[]>` em `message-marks-server.ts`, com
    `PinView = { keyId; scope: 'whatsapp'|'local'; expiresAt: string|null; content: string|null; type: string; senderName: string; timestamp: string }` e
    `StarView = { keyId; remoteJid; chatName; senderName; content: string|null; type: string; timestamp: string; starredAt: string }`.
  - Socket: `io.to(sessionId).emit('message.pins', { jid })` e `('message.stars', { keyId, starred })`.
  - HTTP: `GET pins → { pins: PinView[] }`; `POST pin {time}` → `{ pin: PinView, warning? }`; `DELETE pin` → `{ ok: true }`; `POST star {star}` → `{ starred: boolean }`; `GET starred?q=` → `{ items: StarView[] }` (até 200, `starredAt` desc).

- [ ] **Step 1:** Teste de `pinResultFromError` (qualquer erro → `scope: 'local'` + texto acima) → FAIL → implementar → PASS.
- [ ] **Step 2:** `pg_dump` (porta 55439, banco `wa_akg`) para o arquivo da restrição global; conferir tamanho > 0.
- [ ] **Step 3:** Editar schema; `npx prisma db push` (apenas cria tabelas; conferir que a saída não fala em perda de dados) e `npx prisma generate`.
- [ ] **Step 4:** Store: se `parsePinEvent(msg)` ≠ null → upsert/delete em `PinnedMessage` (`scope: 'whatsapp'`, `expiresAt = now + seconds`), emitir `message.pins`, `continue` (não salvar como mensagem).
- [ ] **Step 5:** Rotas. `pin` POST: busca a `Message` por `sessionId`+`keyId`; `sock.sendMessage(jid, { pin: pinKeyFor(row), type: 1, time })`; sucesso → upsert `scope:'whatsapp'`; exceção → upsert `scope:'local'` + `warning`. DELETE: se `whatsapp`, `type: 2` (erro ignorado), apaga linha. `star`: grava/apaga `StarredMessage` primeiro, `chatModify` em try/catch, emite `message.stars`.
- [ ] **Step 6:** `npx tsc --noEmit -p .` filtrado pelos arquivos tocados → sem erros novos.

### Task 3: UI de mensagens — menu, estrela, faixa de fixadas, foco

**Files:**
- Modify: `WA/src/components/chat/chat-window.tsx`
- Create: `WA/src/components/chat/pinned-bar.tsx`

**Interfaces:**
- Consumes: rotas e eventos da Task 2.
- Produces: `ChatWindow` aceita `focusKeyId?: string` e `onFocusDone?: (found: boolean) => void`; cada bolha tem `data-key-id={msg.keyId}`; evento `window.dispatchEvent(new CustomEvent('wa:open-starred'))` disparado pelo botão de estrela do cabeçalho.

- [ ] **Step 1:** `ContextMenu` ganha itens "Favoritar"/"Remover favorita" e "Fixar por 24 horas" / "Fixar por 7 dias" / "Fixar por 30 dias" ou "Desfixar"; estado de favoritas (`Set<keyId>`) carregado de `GET starred` filtrado pela conversa, e de fixadas via `GET pins`; recarrega em `message.pins` / `message.stars`. Toast com `warning` quando houver.
- [ ] **Step 2:** Estrela pequena (lucide `Star`, 11px, preenchida) junto ao horário da bolha favoritada.
- [ ] **Step 3:** `PinnedBar({ pins, onOpen(keyId), onUnpin(keyId) })` abaixo do cabeçalho: mostra a fixada atual (ícone de pin, remetente, 1 linha), contador "1/3" que alterna ao clicar no ícone, rótulo "só para você" quando `scope==='local'`.
- [ ] **Step 4:** Foco: quando `focusKeyId` muda e as mensagens carregaram, `querySelector('[data-key-id=…]')` → `scrollIntoView({block:'center'})` + classe `tf-focus` por 1,6 s; `onFocusDone(found)`.
- [ ] **Step 5:** Botão de estrela no cabeçalho (ao lado de "Contato") dispara `wa:open-starred`.

### Task 4: Painel de favoritas e ordem das conversas fixadas

**Files:**
- Create: `WA/src/components/chat/starred-panel.tsx`
- Modify: `WA/src/components/chat/chat-layout-client.tsx`
- Modify: `WA/src/lib/chat-stages.ts`
- Modify: `WA/src/components/chat/conversation-board.tsx`
- Modify: `WA/src/app/api/chat/[sessionId]/board/route.ts`
- Test: `WA/src/lib/__tests__/message-marks.test.ts` (acrescentar ordem)

**Interfaces:**
- Consumes: `GET starred`, `ChatWindow.focusKeyId` (Task 3).
- Produces: `reorderPinned(pinned: string[], source: string, target: string, edge: 'before'|'after'): string[]` em `chat-stages.ts` (retorna `pinned` inalterado se `source` ou `target` não estiver nele); board POST `{ action: 'reorderPins', stage, order: string[] }` → grava `pinnedJids = order` (só jids já fixados).

- [ ] **Step 1:** Testes: `sortKanbanCards` com `pinnedJids: ['b','a']` coloca `b`,`a` antes dos demais mesmo com `orderedAt` recente e `a` com mensagem mais nova; `reorderPinned(['a','b','c'],'c','a','before')` → `['c','a','b']`; `reorderPinned(['a','b'],'x','a','before')` → `['a','b']` → FAIL → implementar → PASS.
- [ ] **Step 2:** Board: soltar card fixado sobre outro fixado na mesma coluna chama `reorderPins`; demais casos mantêm o fluxo atual.
- [ ] **Step 3:** `StarredPanel({ sessionId, open, onOpenChange, onGo(item: StarView) })` em `Sheet` lateral direita: busca com debounce 250 ms, lista agrupada por dia ("Hoje", "Ontem", "22/10/2026"), item com conversa, remetente, hora, texto (2 linhas) ou tipo; ações "Ir para a conversa" e remover favorita; estado vazio "Nenhuma mensagem favoritada ainda. Clique com o botão direito numa mensagem e escolha Favoritar."
- [ ] **Step 4:** `chat-layout-client`: botão "Favoritas" (ícone `Star`) na barra superior ao lado de som/notificações; escuta `wa:open-starred`; `onGo` seleciona o chat (Lista ou Kanban) e passa `focusKeyId`; se `onFocusDone(false)` → toast "Essa mensagem é antiga e não está entre as 100 mais recentes desta conversa."

### Task 5: Build isolado, tema no TaskFlow e ativação

**Files:**
- Modify: `taskflow/src/styles/whatsapp-embed.css` (faixa, estrela, painel, `.tf-focus` no tema v2)

- [ ] **Step 1:** Tema: estilos para `.tf-focus` (anel `--tf-unread` que some em 1,6 s), faixa de fixadas e painel coerentes com o v2.
- [ ] **Step 2:** `cd WA && python3 .local/build-isolated.py` → "Build isolado concluído"; `.local/pending-build` aponta para a nova pasta com `BUILD_ID`.
- [ ] **Step 3:** Pedir "ok" ao titular. Com ok: `pg_dump` de novo, copiar `.local/active-build` para `.local/previous-build`, gravar o pending em `active-build`, encerrar só o PID da porta 3039 e aguardar o supervisor subir o novo (porta 3039 respondendo, sessões `CONNECTED`).
- [ ] **Step 4:** Verificação no navegador (TaskFlow `localhost:5173/whatsapp`): favoritar/remover, painel + busca, "ir para" recente e antiga, faixa com fixada local, reordenar fixadas. Fixar no WhatsApp real: titular escolhe a conversa.
- [ ] **Step 5 (rollback se algo falhar):** gravar `previous-build` de volta em `active-build` e reiniciar o PID da 3039.
