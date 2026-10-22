# Chat do WhatsApp: mensagens fixadas, favoritas e ordem das conversas fixadas

Data: 2026-10-22 · Escopo: piloto privado do WhatsApp (somente o titular)

## Por quê

O titular atende clientes e grupos pelo chat do WhatsApp embutido no TaskFlow (Kanban de conversas). Hoje não há como:

- destacar uma mensagem importante dentro de uma conversa ou grupo;
- guardar mensagens para achar depois, com contexto (de quem, em qual conversa, quando);
- controlar a ordem das conversas fixadas no Kanban — uma conversa fixada sobe sozinha quando chega mensagem nova.

## Onde vive o código

O chat é o app WA-AKG (Next.js + Baileys + PostgreSQL) em
`/Users/rei/Documents/Codex/2026-10-19/cons/outputs/wa-akg`, servido por LaunchAgents no Mac
(porta 3039) e exibido no TaskFlow por um iframe através da ponte privada
(`scripts/whatsapp-local-server.ts`). O TaskFlow só injeta visual e pequenos comportamentos
(`src/styles/whatsapp-embed.css` e `.js`).

Fixar e favoritar precisam de banco, servidor e telas → mudanças no WA-AKG. Velocidade de
áudio ficou na camada do TaskFlow (já entregue).

## Objetivos

1. **Fixar mensagem de verdade.** Na conversa/grupo, fixar uma mensagem no WhatsApp para todos
   (duração 24 h, 7 dias ou 30 dias). Se o WhatsApp recusar (limite de 3 fixadas, grupo que só
   permite admins, falha da API não oficial), a mensagem fica **fixada só para o titular**, com aviso.
2. **Faixa de fixadas no topo do chat.** Mostra as mensagens fixadas da conversa (do WhatsApp,
   inclusive as fixadas por outras pessoas, e as locais). Clicar leva até a mensagem; um botão desfixa.
3. **Favoritar mensagem.** Estrela em qualquer mensagem; também marca a estrela real no WhatsApp
   (melhor esforço — falha não impede salvar). Bolha favoritada mostra uma estrela pequena.
4. **Lista de favoritas pesquisável.** Botão "Favoritas" no topo da tela de conversas (Lista e
   Kanban) e no cabeçalho do chat abre um painel lateral: texto (ou "Áudio", "Imagem"…), quem
   enviou, conversa/grupo, dia e hora; busca por texto, conversa ou pessoa; remover favorita.
   "Ir para a conversa" abre o chat e, se a mensagem estiver entre as carregadas (últimas 100),
   rola até ela e destaca; se for mais antiga, abre a conversa e avisa.
5. **Ordem das conversas fixadas.** Fixadas ficam sempre no topo da coluna, na ordem definida
   pelo titular arrastando uma fixada sobre outra; mensagens novas não mudam essa ordem.

## Não-objetivos

- Carregar histórico antigo além das 100 mensagens mais recentes (o titular aceitou só o aviso).
- Liberar para outros usuários do TaskFlow ou entrar no catálogo de novidades (piloto silencioso).
- Mudar o chat em produção sem autorização: o código é preparado e testado; ativar a nova build
  (reiniciar o app 3039, que também atende `chat.taskfloww.com.br`) exige "ok" explícito.

## Anti-objetivos

- Perder sessões do WhatsApp ou exigir novo QR code por causa da troca de build.
- Alterar mensagens existentes no banco ou enviar mensagens reais em testes automatizados.
- Duplicar a fixação (mesma mensagem fixada duas vezes) ou deixar fixação "fantasma" após desfixar.

## Decisões

| Tema | Decisão | Origem |
|---|---|---|
| Fixar para todos | Sim, via Baileys `sendMessage(jid, { pin: key, type: 1, time })`; desfixar `type: 2` | titular |
| Falha ao fixar | Fica fixada só localmente, com aviso "fixada só para você" | titular |
| Duração | Escolha 24 h / 7 dias / 30 dias no menu; padrão 7 dias | escolha do Claude |
| Favoritas: onde ficam | Tabela no PostgreSQL do WA-AKG (não no TaskFlow nem no navegador) | escolha do Claude |
| Favoritas: estrela no WhatsApp | Também marca (chatModify star), melhor esforço | palpite confirmado implicitamente |
| Acesso às favoritas | Botão na barra da tela de conversas (Lista/Kanban) e no cabeçalho do chat | titular |
| Mensagem antiga | Abre a conversa e avisa; sem carregar histórico | titular |
| Ordem das fixadas | Arrastar fixada sobre fixada; ordem = ordem de `KanbanColumn.pinnedJids` | escolha do Claude |
| Entrada das ações | Menu do botão direito da mensagem (já existe) ganha "Fixar…", "Favoritar" | escolha do Claude |

## Desenho técnico

### Banco (Prisma, `prisma db push` após `pg_dump` em `.local/antes-fixadas-favoritas.dump`)

```prisma
model PinnedMessage {
  id         String    @id @default(cuid())
  sessionId  String                       // Session.id
  remoteJid  String
  keyId      String                       // mensagem fixada
  scope      String    @default("whatsapp") // "whatsapp" | "local"
  pinnedBy   String?                      // jid de quem fixou (WhatsApp) ou null = titular
  pinnedAt   DateTime  @default(now())
  expiresAt  DateTime?
  session    Session   @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  @@unique([sessionId, remoteJid, keyId])
  @@index([sessionId, remoteJid])
}

model StarredMessage {
  id        String   @id @default(cuid())
  sessionId String
  remoteJid String
  keyId     String
  createdAt DateTime @default(now())
  session   Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  @@unique([sessionId, keyId])
  @@index([sessionId, createdAt])
}
```

Expiradas (`expiresAt < now`) são ignoradas na leitura; não precisam de job.

### Eventos do WhatsApp

Em `modules/whatsapp/store/index.ts`, no `messages.upsert`, mensagens com
`message.pinInChatMessage` atualizam `PinnedMessage` (type 1 = cria/atualiza com `expiresAt`
de `messageContextInfo.messageAddOnDurationInSecs` quando houver, senão 7 dias; type 2 = remove)
e emitem `message.pins` para a sala da sessão. Não são salvas como mensagem comum.

### API (todas com `getAuthenticatedUser` + `canAccessSession`, como as rotas vizinhas)

- `GET /api/chat/{sessionId}/{jid}/pins` → fixadas ativas com prévia (conteúdo, tipo, remetente, horário).
- `POST /api/messages/{sessionId}/{jid}/{messageId}/pin` `{ time }` → tenta fixar no WhatsApp;
  sucesso = `scope: whatsapp`; erro = `scope: local` + `warning`. `DELETE` → desfixa (WhatsApp se
  for `whatsapp`) e remove.
- `POST /api/messages/{sessionId}/{jid}/{messageId}/star` (existente) passa a gravar/remover
  `StarredMessage`; o `chatModify` vira melhor esforço.
- `GET /api/messages/{sessionId}/starred?q=` → favoritas com mensagem, nome da conversa,
  remetente e horário; busca case/acento-insensível em conteúdo, nome da conversa e remetente.

### Telas (WA-AKG)

- `chat-window.tsx`: itens "Fixar…" (submenu de duração) / "Desfixar" e "Favoritar" /
  "Remover favorita" no `ContextMenu`; estrela pequena na bolha favoritada; `data-key-id` em cada
  bolha; faixa de fixadas abaixo do cabeçalho (carrosel simples se houver várias); rolar e
  destacar ao receber `focusKeyId`; escuta `message.pins`.
- Novo `starred-panel.tsx` (Sheet lateral) aberto por botão em `chat-layout-client.tsx` (barra
  superior) e por evento do cabeçalho do chat; "Ir para a conversa" seleciona o chat e passa
  `focusKeyId`.
- `chat-stages.ts` `sortKanbanCards`: fixadas ordenadas pelo índice em `pinnedJids`, antes de
  qualquer outra regra. `conversation-board.tsx`: soltar fixada sobre fixada envia
  `{ action: 'reorderPins', order }`; `board/route.ts` grava a nova ordem de `pinnedJids`.

### Camada do TaskFlow

O CSS já põe fixadas acima de não lidas (`order: -2`). Revisar estilos da faixa, da estrela e
do painel para seguir o tema v2. Nada muda na ponte nem no Supabase.

## Verificação

- Testes unitários (padrão `node --test`/`tsx` do WA-AKG): ordenação de fixadas por
  `pinnedJids`; parser de `pinInChatMessage` (fixar, desfixar, duração); busca de favoritas.
- `tsc` sem novos erros nos arquivos tocados; `next build` isolado (`.local/build-isolated.py`).
- Após autorização para ativar: backup, trocar `active-build`, reiniciar só o app, confirmar
  sessões conectadas, e testar no navegador: favoritar/desfavoritar, painel e busca, "ir para",
  faixa de fixadas, reordenar fixadas. Fixar no WhatsApp de verdade é testado pelo titular
  numa conversa escolhida por ele (o teste envia algo visível aos participantes).

## Deixado para quem implementa

Visual fino da faixa e do painel, textos de aviso, limite de itens por página no painel
(sugestão: 200, mais recentes primeiro).
