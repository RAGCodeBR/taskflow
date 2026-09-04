# Guia de estudo do codigo

Este projeto e uma copia separada do TaskFlow para estudo e evolucao sem mexer no projeto original do Lovable.

## Como estudar

1. Comece por `src/routes/_app/dashboard.tsx` para entender a tela inicial depois do login.
2. Depois leia `src/hooks/use-auth.tsx`, que explica a sessao do usuario e a conexao com o Supabase Auth.
3. Leia `src/routes/_app/ambientes.tsx` e `src/lib/workspace-tasks.ts` para entender o modelo de ambientes isolados (`consultoria`/`marketing`) e a participacao entre ambientes — e a decisao arquitetural mais recente do projeto (ver `docs/superpowers/specs/2026-09-03-participacao-de-tarefas-entre-ambientes-design.md`).
4. Leia `src/hooks/use-data.ts`, que concentra boa parte das consultas e operacoes de dados de tarefas.
5. Abra `src/components/TaskCard.tsx`, `src/components/TaskDialog.tsx` e `src/routes/_app/tasks.kanban.tsx` para entender a parte principal das tarefas.
6. Explore as demais telas de dominio por ordem de proximidade com tarefas: `tasks.list.tsx`, `tasks.calendar.tsx`, `obligations.tsx`, `mural.tsx`, `requests.tsx`, `agenda.tsx`, depois `clients.tsx` e as rotas `portal.entregas.tsx` / `portal.financeiro.tsx` (visao do cliente).
7. Use `docs/codigo-explicado/README.md` quando quiser ver a explicacao linha por linha de qualquer arquivo. Rode `npm run docs:codigo` para regenerar essa pasta depois de criar ou renomear arquivos — ela e gerada automaticamente e nao deve ser editada a mao.

## Onde estao as partes principais

- `src/routes`: define as paginas e rotas da aplicacao (arquivo-rota do TanStack Router; ver `src/routes/README.md`).
- `src/components`: guarda os componentes visuais reutilizaveis (dialogs de tarefa/subtarefa, popovers, filtros).
- `src/components/ui`: guarda componentes base de interface, como botoes, dialogs, inputs e menus.
- `src/hooks`: guarda logicas reaproveitaveis do React — autenticacao, carregamento de dados, ambientes/workspaces, obrigacoes, mural, solicitacoes e preferencias de quadro.
- `src/integrations/supabase`: concentra a conexao com o Supabase (cliente de navegador e de servidor).
- `src/integrations/lovable`: integracao residual com o template original do Lovable.
- `src/lib`: guarda funcoes auxiliares, funcoes de servidor (`*.functions.ts`) e utilitarios de dominio (tarefas, subtarefas, ambientes, calendario).
- `supabase/migrations`: guarda a estrutura do banco de dados novo e separado — schema evolui por migrations incrementais (nao ha baseline unico).
- `scripts`: guarda automacoes de documentacao e publicacao no GitHub Pages.
- `docs`: documentacao de arquitetura, setup do Supabase e especificacoes de decisoes recentes (`docs/superpowers/specs`).

## Observacao importante

Os comentarios linha por linha foram colocados em documentacao separada para preservar o funcionamento do sistema. Inserir comentario manual em cada linha dentro dos arquivos reais deixaria o codigo muito pesado, dificultaria manutencao e poderia quebrar arquivos gerados automaticamente.
