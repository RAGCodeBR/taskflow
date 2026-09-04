# docs/GUIA-DE-ESTUDO.md

Tipo: Documento Markdown.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `# Guia de estudo do codigo` | Titulo ou subtitulo usado para organizar a documentacao. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `Este projeto e uma copia separada do TaskFlow para estudo e evolucao sem mexer no projeto original do Lovable.` | Texto explicativo da documentacao. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `## Como estudar` | Titulo ou subtitulo usado para organizar a documentacao. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `1. Comece por \`src/routes/_app/dashboard.tsx\` para entender a tela inicial depois do login.` | Texto explicativo da documentacao. |
| 8 | `2. Depois leia \`src/hooks/use-auth.tsx\`, que explica a sessao do usuario e a conexao com o Supabase Auth.` | Texto explicativo da documentacao. |
| 9 | `3. Leia \`src/routes/_app/ambientes.tsx\` e \`src/lib/workspace-tasks.ts\` para entender o modelo de ambientes isolados (\`consultoria\`/\`marketing\`) e a participacao entre ambientes — e a decisao arquitetural mais recente do projeto (ver \`docs/superpowers/specs/2026-09-03-participacao-de-tarefas-entre-ambientes-design.md\`).` | Texto explicativo da documentacao. |
| 10 | `4. Leia \`src/hooks/use-data.ts\`, que concentra boa parte das consultas e operacoes de dados de tarefas.` | Texto explicativo da documentacao. |
| 11 | `5. Abra \`src/components/TaskCard.tsx\`, \`src/components/TaskDialog.tsx\` e \`src/routes/_app/tasks.kanban.tsx\` para entender a parte principal das tarefas.` | Texto explicativo da documentacao. |
| 12 | `6. Explore as demais telas de dominio por ordem de proximidade com tarefas: \`tasks.list.tsx\`, \`tasks.calendar.tsx\`, \`obligations.tsx\`, \`mural.tsx\`, \`requests.tsx\`, \`agenda.tsx\`, depois \`clients.tsx\` e as rotas \`portal.entregas.tsx\` / \`portal.financeiro.tsx\` (visao do cliente).` | Texto explicativo da documentacao. |
| 13 | `7. Use \`docs/codigo-explicado/README.md\` quando quiser ver a explicacao linha por linha de qualquer arquivo. Rode \`npm run docs:codigo\` para regenerar essa pasta depois de criar ou renomear arquivos — ela e gerada automaticamente e nao deve ser editada a mao.` | Texto explicativo da documentacao. |
| 14 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 15 | `## Onde estao as partes principais` | Titulo ou subtitulo usado para organizar a documentacao. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `- \`src/routes\`: define as paginas e rotas da aplicacao (arquivo-rota do TanStack Router; ver \`src/routes/README.md\`).` | Item de lista com uma orientacao, decisao ou observacao. |
| 18 | `- \`src/components\`: guarda os componentes visuais reutilizaveis (dialogs de tarefa/subtarefa, popovers, filtros).` | Item de lista com uma orientacao, decisao ou observacao. |
| 19 | `- \`src/components/ui\`: guarda componentes base de interface, como botoes, dialogs, inputs e menus.` | Item de lista com uma orientacao, decisao ou observacao. |
| 20 | `- \`src/hooks\`: guarda logicas reaproveitaveis do React — autenticacao, carregamento de dados, ambientes/workspaces, obrigacoes, mural, solicitacoes e preferencias de quadro.` | Item de lista com uma orientacao, decisao ou observacao. |
| 21 | `- \`src/integrations/supabase\`: concentra a conexao com o Supabase (cliente de navegador e de servidor).` | Item de lista com uma orientacao, decisao ou observacao. |
| 22 | `- \`src/integrations/lovable\`: integracao residual com o template original do Lovable.` | Item de lista com uma orientacao, decisao ou observacao. |
| 23 | `- \`src/lib\`: guarda funcoes auxiliares, funcoes de servidor (\`*.functions.ts\`) e utilitarios de dominio (tarefas, subtarefas, ambientes, calendario).` | Item de lista com uma orientacao, decisao ou observacao. |
| 24 | `- \`supabase/migrations\`: guarda a estrutura do banco de dados novo e separado — schema evolui por migrations incrementais (nao ha baseline unico).` | Item de lista com uma orientacao, decisao ou observacao. |
| 25 | `- \`scripts\`: guarda automacoes de documentacao e publicacao no GitHub Pages.` | Item de lista com uma orientacao, decisao ou observacao. |
| 26 | `- \`docs\`: documentacao de arquitetura, setup do Supabase e especificacoes de decisoes recentes (\`docs/superpowers/specs\`).` | Item de lista com uma orientacao, decisao ou observacao. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `## Observacao importante` | Titulo ou subtitulo usado para organizar a documentacao. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `Os comentarios linha por linha foram colocados em documentacao separada para preservar o funcionamento do sistema. Inserir comentario manual em cada linha dentro dos arquivos reais deixaria o codigo muito pesado, dificultaria manutencao e poderia quebrar arquivos gerados automaticamente.` | Texto explicativo da documentacao. |
| 31 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
