# docs/ARQUITETURA.md

Tipo: Documento Markdown.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `# Arquitetura da copia limpa` | Titulo ou subtitulo usado para organizar a documentacao. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `Esta versao e uma copia React/Supabase para estudo e evolucao, sem tocar no Lovable.` | Texto explicativo da documentacao. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `Stack: React 19 + TanStack Router/Start (roteamento por arquivo) + Vite 7 +` | Texto explicativo da documentacao. |
| 6 | `Tailwind 4 + Radix/shadcn (\`src/components/ui\`) + TanStack Query + Supabase` | Texto explicativo da documentacao. |
| 7 | `(Postgres, Auth, Realtime, RLS). IA (Gemini) e Google Calendar entram como` | Texto explicativo da documentacao. |
| 8 | `integracoes externas via funcoes de servidor, nunca direto do navegador.` | Texto explicativo da documentacao. |
| 9 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 10 | `## Camadas` | Titulo ou subtitulo usado para organizar a documentacao. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `- \`src/routes\`: telas e rotas do app (arquivo = rota; ver \`src/routes/README.md\` para a convencao do TanStack Router).` | Item de lista com uma orientacao, decisao ou observacao. |
| 13 | `- \`src/components\`: componentes reutilizaveis (dialogs, popovers, cards de tarefa etc.).` | Item de lista com uma orientacao, decisao ou observacao. |
| 14 | `- \`src/components/ui\`: componentes base de interface (botoes, dialogs, inputs, menus).` | Item de lista com uma orientacao, decisao ou observacao. |
| 15 | `- \`src/hooks/use-auth.tsx\`: sessao, perfil e permissao admin.` | Item de lista com uma orientacao, decisao ou observacao. |
| 16 | `- \`src/hooks/use-data.ts\`: consultas e mutations principais ao Supabase (tarefas, subtarefas, status, tags, clientes).` | Item de lista com uma orientacao, decisao ou observacao. |
| 17 | `- \`src/hooks/use-workspace-tasks.ts\` + \`src/lib/workspace-tasks.ts\`: leitura/filtragem de tarefas considerando o ambiente atual e participacao entre ambientes.` | Item de lista com uma orientacao, decisao ou observacao. |
| 18 | `- \`src/hooks/use-obligations.ts\`, \`use-mural-unread.ts\`, \`use-request-unread.ts\`, \`use-board-preferences.ts\`: hooks de dominio para obrigacoes recorrentes, mural, solicitacoes e preferencias de quadro.` | Item de lista com uma orientacao, decisao ou observacao. |
| 19 | `- \`src/integrations/supabase/client.ts\` (navegador) e \`client.server.ts\` (servidor): clientes Supabase.` | Item de lista com uma orientacao, decisao ou observacao. |
| 20 | `- \`src/lib/*.functions.ts\`: funcoes de servidor do TanStack Start (admin de usuarios, formatacao/importacao de ata via IA, relatorio de cliente).` | Item de lista com uma orientacao, decisao ou observacao. |
| 21 | `- \`supabase/migrations\`: schema que deve ser aplicado no banco novo (evolui por migrations incrementais, sem baseline unico — ver contagem crescente ao longo do tempo).` | Item de lista com uma orientacao, decisao ou observacao. |
| 22 | `- \`vite.pages.config.ts\`: build estatico alternativo para GitHub Pages. O deploy principal e Vercel (\`vercel.json\`).` | Item de lista com uma orientacao, decisao ou observacao. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `## Modelo de ambientes (workspaces)` | Titulo ou subtitulo usado para organizar a documentacao. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `O sistema e multi-tenant por **ambiente isolado** (hoje: \`consultoria\` e` | Texto explicativo da documentacao. |
| 27 | `\`marketing\`). Cada usuario pertence a um ou mais ambientes; a tela` | Texto explicativo da documentacao. |
| 28 | `\`src/routes/_app/ambientes.tsx\` deixa escolher onde trabalhar quando ha mais` | Texto explicativo da documentacao. |
| 29 | `de um. A regra de isolamento roda via RLS no banco:` | Texto explicativo da documentacao. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 32 | `has_workspace_access(w) = (w = current_workspace_id()) AND existe membership` | Texto explicativo da documentacao. |
| 33 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `Desde 09/2026 essa regra ganhou uma camada aditiva de **participacao entre` | Texto explicativo da documentacao. |
| 36 | `ambientes**: uma tarefa continua pertencendo a um unico ambiente` | Texto explicativo da documentacao. |
| 37 | `(\`tasks.workspace_id\`), mas fica visivel tambem para quem foi` | Texto explicativo da documentacao. |
| 38 | `atribuido/colaborador/participante de subtarefa em outro ambiente, sem criar` | Texto explicativo da documentacao. |
| 39 | `copia. Detalhe de decisao e das policies em` | Texto explicativo da documentacao. |
| 40 | `\`docs/superpowers/specs/2026-09-03-participacao-de-tarefas-entre-ambientes-design.md\`.` | Texto explicativo da documentacao. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `## Mapa de rotas (\`src/routes/_app\`)` | Titulo ou subtitulo usado para organizar a documentacao. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `| Rota | Proposito |` | Texto explicativo da documentacao. |
| 45 | `| --- | --- |` | Texto explicativo da documentacao. |
| 46 | `| \`dashboard\` | Visao inicial pos-login. |` | Texto explicativo da documentacao. |
| 47 | `| \`tasks\` (\`.kanban\` / \`.list\` / \`.calendar\` / \`.index\`) | Tarefas em tres visualizacoes. |` | Texto explicativo da documentacao. |
| 48 | `| \`agenda\` | Agenda/compromissos, integra com Google Calendar. |` | Texto explicativo da documentacao. |
| 49 | `| \`ambientes\` | Selecao do ambiente/workspace de trabalho. |` | Texto explicativo da documentacao. |
| 50 | `| \`clients\` (\`.index\` / \`.new\` / \`.$clientId.edit\`) | Cadastro e gestao de clientes. |` | Texto explicativo da documentacao. |
| 51 | `| \`client-report.$clientId\` | Relatorio exportavel de um cliente. |` | Texto explicativo da documentacao. |
| 52 | `| \`import-ata\` | Importacao/formatacao de ata de reuniao via Gemini. |` | Texto explicativo da documentacao. |
| 53 | `| \`mural\` | Mural/avisos internos. |` | Texto explicativo da documentacao. |
| 54 | `| \`notes\` | Notas pessoais/da equipe. |` | Texto explicativo da documentacao. |
| 55 | `| \`obligations\` | Obrigacoes recorrentes (prazos fixos). |` | Texto explicativo da documentacao. |
| 56 | `| \`portal.entregas\` | Portal do cliente: calendario de entregas. |` | Texto explicativo da documentacao. |
| 57 | `| \`portal.financeiro\` | Portal do cliente: faturas e pagamentos. |` | Texto explicativo da documentacao. |
| 58 | `| \`reports\` | Relatorios internos. |` | Texto explicativo da documentacao. |
| 59 | `| \`requests\` | Solicitacoes (fila de pedidos). |` | Texto explicativo da documentacao. |
| 60 | `| \`settings\` | Personalizacao da conta. |` | Texto explicativo da documentacao. |
| 61 | `| \`trash\` | Lixeira (soft delete). |` | Texto explicativo da documentacao. |
| 62 | `| \`users\` | Gestao de usuarios/permissoes. |` | Texto explicativo da documentacao. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `## Funcionalidades que dependem do Supabase` | Titulo ou subtitulo usado para organizar a documentacao. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `- Login e cadastro (convite apenas — ver \`docs/SUPABASE-NOVO.md\`).` | Item de lista com uma orientacao, decisao ou observacao. |
| 67 | `- Perfis, papeis (\`user_roles\`) e permissao admin.` | Item de lista com uma orientacao, decisao ou observacao. |
| 68 | `- Ambientes/workspaces e participacao entre ambientes.` | Item de lista com uma orientacao, decisao ou observacao. |
| 69 | `- Clientes, departamentos e acessos de cliente.` | Item de lista com uma orientacao, decisao ou observacao. |
| 70 | `- Tarefas, subtarefas, status, tags, colunas de kanban, historico de mudancas.` | Item de lista com uma orientacao, decisao ou observacao. |
| 71 | `- Comentarios, anexos e mencoes.` | Item de lista com uma orientacao, decisao ou observacao. |
| 72 | `- Notificacoes (ainda nao escopadas por ambiente — ver spec de participacao).` | Item de lista com uma orientacao, decisao ou observacao. |
| 73 | `- Obrigacoes recorrentes, mural, solicitacoes.` | Item de lista com uma orientacao, decisao ou observacao. |
| 74 | `- Lixeira por soft delete.` | Item de lista com uma orientacao, decisao ou observacao. |
| 75 | `- Atualizacoes realtime em algumas telas.` | Item de lista com uma orientacao, decisao ou observacao. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `## Integracoes externas` | Titulo ou subtitulo usado para organizar a documentacao. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `- **Gemini** (\`@google/genai\`, \`src/lib/gemini.server.ts\`): formatacao e importacao de ata (\`ai-format.functions.ts\`, \`import-ata.functions.ts\`). Chave apenas no servidor (\`GEMINI_API_KEY\`, sem prefixo \`VITE_\`).` | Item de lista com uma orientacao, decisao ou observacao. |
| 80 | `- **Google Calendar**: OAuth server-side, calendario corporativo compartilhado (\`GOOGLE_OAUTH_*\`, \`GOOGLE_SHARED_CALENDAR_ID\`), usado pela rota \`agenda\`.` | Item de lista com uma orientacao, decisao ou observacao. |
| 81 | `- **Ideia futura (nao implementada)**: canal de WhatsApp Business — ver \`IDEIAS_FUTURAS.md\`.` | Item de lista com uma orientacao, decisao ou observacao. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `## Funcionalidades que ainda podem precisar de backend depois` | Titulo ou subtitulo usado para organizar a documentacao. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `- IA/importacao avancada de ata.` | Item de lista com uma orientacao, decisao ou observacao. |
| 86 | `- Relatorios gerados por funcoes server-side.` | Item de lista com uma orientacao, decisao ou observacao. |
| 87 | `- Uploads com politicas de storage mais rigorosas.` | Item de lista com uma orientacao, decisao ou observacao. |
| 88 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 89 | `## Qualidade e testes` | Titulo ou subtitulo usado para organizar a documentacao. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `Cobertura de teste automatizado ainda e baixa: apenas` | Texto explicativo da documentacao. |
| 92 | `\`calendar-event-layout.test.ts\`, \`subtask-status.test.ts\` e` | Texto explicativo da documentacao. |
| 93 | `\`workspace-tasks.test.ts\` em \`src/lib\`. Priorize testar regras de` | Texto explicativo da documentacao. |
| 94 | `permissao/RLS e logica de participacao entre ambientes ao evoluir essas areas.` | Texto explicativo da documentacao. |
| 95 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 96 | `## Regra de seguranca` | Titulo ou subtitulo usado para organizar a documentacao. |
| 97 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 98 | `Toda evolucao deve acontecer neste repositorio e no Supabase novo. O projeto Lovable/original fica como referencia, nao como ambiente de teste.` | Texto explicativo da documentacao. |
| 99 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
