# docs/SUPABASE-NOVO.md

Tipo: Documento Markdown.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `# Banco Supabase novo` | Titulo ou subtitulo usado para organizar a documentacao. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `Este projeto deve usar um Supabase separado do Lovable/original e separado da copia atual.` | Texto explicativo da documentacao. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `## Passos` | Titulo ou subtitulo usado para organizar a documentacao. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `1. Crie um projeto novo no Supabase.` | Texto explicativo da documentacao. |
| 8 | `2. Copie \`Project URL\` e \`anon public key\`.` | Texto explicativo da documentacao. |
| 9 | `3. Rode as migrations em \`supabase/migrations\` no banco novo.` | Texto explicativo da documentacao. |
| 10 | `4. Configure o build com:` | Texto explicativo da documentacao. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `\`\`\`env` | Marca inicio ou fim de um bloco de codigo. |
| 13 | `VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co` | Referencia um link externo ou endereco importante. |
| 14 | `VITE_SUPABASE_PUBLISHABLE_KEY=SUA_ANON_PUBLIC_KEY` | Texto explicativo da documentacao. |
| 15 | `\`\`\`` | Marca inicio ou fim de um bloco de codigo. |
| 16 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 17 | `## Projeto criado nesta copia` | Titulo ou subtitulo usado para organizar a documentacao. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `- Project ref: \`xlcurhbxexyunpkcswwo\`` | Item de lista com uma orientacao, decisao ou observacao. |
| 20 | `- Project URL: \`https://xlcurhbxexyunpkcswwo.supabase.co\`` | Item de lista com uma orientacao, decisao ou observacao. |
| 21 | `- Plano observado no painel: Free/Livre` | Item de lista com uma orientacao, decisao ou observacao. |
| 22 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 23 | `## Por que as chaves entram no build?` | Titulo ou subtitulo usado para organizar a documentacao. |
| 24 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 25 | `GitHub Pages e um host estatico. Nao existe backend lendo \`.env\` em runtime. O Vite substitui \`VITE_*\` quando gera os arquivos finais.` | Texto explicativo da documentacao. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `## O que nao copiar` | Titulo ou subtitulo usado para organizar a documentacao. |
| 28 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 29 | `- Nao copie dados do Supabase antigo.` | Item de lista com uma orientacao, decisao ou observacao. |
| 30 | `- Nao use \`service_role\` no frontend.` | Item de lista com uma orientacao, decisao ou observacao. |
| 31 | `- Nao misture migrations novas no projeto Lovable.` | Item de lista com uma orientacao, decisao ou observacao. |
| 32 | `- Nao use a URL antiga do banco atual.` | Item de lista com uma orientacao, decisao ou observacao. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `## Cadastro somente por convite` | Titulo ou subtitulo usado para organizar a documentacao. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `Depois de aplicar a migration \`20260803113000_invite_only_auth.sql\`, cadastros` | Texto explicativo da documentacao. |
| 37 | `diretos sao recusados pelo banco. Para concluir a configuracao do convite:` | Texto explicativo da documentacao. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `1. Publique a funcao \`admin-user-access\` no Supabase.` | Texto explicativo da documentacao. |
| 40 | `2. Cadastre \`https://seu-dominio.com/auth?invite=1\` em **Auth > URL Configuration > Redirect URLs**.` | Referencia um link externo ou endereco importante. |
| 41 | `3. Crie o secret da Edge Function \`INVITE_REDIRECT_URL\` com essa mesma URL.` | Texto explicativo da documentacao. |
| 42 | `4. Em **Auth > Email Templates**, mantenha habilitado o template de convite e` | Texto explicativo da documentacao. |
| 43 | `   ajuste a validade do token de convite para 24 ou 48 horas, conforme a politica desejada.` | Texto explicativo da documentacao. |
| 44 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 45 | `O administrador passa a usar **Usuarios > Novo usuario > Enviar convite**. O` | Texto explicativo da documentacao. |
| 46 | `Supabase envia um link individual ao e-mail indicado e, ao abri-lo, a pessoa` | Texto explicativo da documentacao. |
| 47 | `define a propria senha. O token e de uso unico e fica vinculado ao destinatario.` | Texto explicativo da documentacao. |
| 48 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
