# TaskFlow

Sistema de gestão de tarefas, clientes, obrigações e reuniões da LA Business Mentoring. A aplicação usa React 19, TanStack Start, Vite e Supabase (Auth, Postgres, Storage e Realtime). A implantação principal é preparada para Vercel; há um build alternativo para GitHub Pages.

## Começar localmente

Requisitos: Node.js 20 ou superior, npm e acesso ao projeto Supabase correto.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` antes de abrir a aplicação. As variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` são usadas pelo navegador. As operações de servidor também precisam de `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` e, quando aplicável, `SUPABASE_SERVICE_ROLE_KEY`. A importação e formatação de atas com Gemini precisam de `GEMINI_API_KEY` no servidor. Consulte `.env.example` para as demais integrações.

**Nunca** coloque a chave `service_role`, a chave do Gemini ou segredos OAuth em variáveis `VITE_*`: elas entram no bundle público. O arquivo `.env.local` é local; configure as variáveis necessárias separadamente no ambiente de implantação.

Comandos úteis:

```bash
npm test
npm run build
npm run lint
```

O build não substitui a checagem de tipos. Algumas áreas antigas ainda apresentam erros em `npx tsc --noEmit`; verifique as mensagens antes de atribuí-las a uma alteração nova.

## Fluxos principais

- **Tarefas:** Kanban, lista e calendário, com cliente, responsável, participantes, subtarefas, anexos, comentários e histórico.
- **Clientes:** cadastros e arquivos pertencem ao ambiente em que foram criados. Inativar um cliente preserva o histórico e arquiva suas tarefas operacionais.
- **Obrigações:** regras recorrentes geram vencimentos e tarefas.
- **Reuniões:** “Nova reunião” cria uma reunião única por padrão; a recorrência é opcional. O cliente deve estar ativo. A pauta pode receber itens novos ou tarefas abertas existentes. Concluir uma pauta vinculada a uma tarefa conclui a tarefa, e vice-versa.
- **Importar Ata:** o botão fica dentro de “Nova reunião”, entre “Cancelar” e “Salvar reunião”. É possível enviar um PDF ou colar texto, gerar a ata formatada e revisar tarefas extraídas pelo Gemini. Na janela da reunião, a ata e as tarefas ficam em rascunho até salvar; depois, a ata é vinculada à reunião e às anotações do cliente, e as tarefas selecionadas entram na pauta da primeira ocorrência. Cancelar antes de salvar não cria essas tarefas ou anotações. A rota legada `/import-ata` continua disponível por link direto, mas não aparece na navegação.
- **Agenda:** a inclusão de um compromisso é opcional na criação da reunião, pela chave “Adicionar à Agenda”. Quando ativada, mostra duração, local, convidados, link e opções de Google Meet, ata Gemini e transcrição. A página Agenda exibe os eventos e permite editá-los ou excluí-los; não oferece criação direta. Excluir um compromisso vinculado remove apenas aquela data da Agenda, mantendo a reunião.

Existem dois ambientes de trabalho, Consultoria e Marketing. Os registros continuam vinculados ao ambiente em que foram criados; confira o ambiente ativo antes de cadastrar dados ou aplicar alterações no banco.

## Atualizações para os usuários

O botão “Novas atualizações”/“Versão atual” no topo é implementado em [`src/components/UpdateCenter.tsx`](src/components/UpdateCenter.tsx). Em produção, o service worker da PWA verifica uma versão nova ao abrir a aplicação, ao voltar para a aba e aproximadamente a cada minuto. Quando há uma versão aguardando ativação, o usuário pode clicar em “Atualizar agora” para tentar ativá-la e recarregar a página. Em desenvolvimento local, o service worker é desregistrado.

O **histórico de novidades é manual**: publicar código novo não acrescenta automaticamente uma entrada. Antes de anunciar uma versão, atualize o identificador `UPDATE_VERSION`, o título, a data, a descrição e a prévia da novidade em `UpdateCenter.tsx`. O reconhecimento da novidade é guardado no `localStorage` por usuário e navegador; o aviso da sessão é controlado separadamente por usuário e ambiente. Por isso, “Versão atual” indica o estado desse navegador, não uma comparação confiável com todos os commits do servidor. Quem abre o site já na versão recém-publicada pode não receber um aviso de recarga.

Para publicar com segurança:

1. Revise as mudanças e as migrations pendentes no projeto Supabase **correto**.
2. Execute testes e build; configure os segredos necessários no ambiente de implantação.
3. Atualize o histórico e o identificador da versão se quiser comunicar as novidades no aplicativo.
4. Implante o código e verifique a aplicação publicada em um navegador que ainda esteja com a versão anterior.

## Banco e estrutura

As mudanças de schema ficam em [`supabase/migrations`](supabase/migrations). Antes de aplicar uma migration remota, confirme o projeto ligado ao CLI e faça uma simulação:

```bash
npx supabase db push --linked --dry-run
```

Depois de conferir a lista, aplique com `npx supabase db push --linked`. Não aplique migrations em outro projeto por engano e não copie dados ou credenciais entre ambientes.

- [`src/routes`](src/routes/README.md): convenções do roteamento por arquivos.
- [`src/components`](src/components): componentes de interface e fluxos reutilizáveis.
- [`src/hooks`](src/hooks): consultas, cache e estado de domínio.
- [`src/integrations/supabase`](src/integrations/supabase): clientes Supabase para navegador e servidor.
- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md): visão arquitetural detalhada; algumas seções históricas podem estar defasadas em relação ao código e às migrations recentes.
