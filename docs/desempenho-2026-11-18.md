# Consultas de tarefas — 18/11/2026

## Diagnóstico

Janela analisada: 17/11 às 10h até 18/11 às 10h (America/Sao_Paulo).
Foram encontrados 584 cancelamentos por `statement_timeout`, com 572 respostas
500 na leitura de subtarefas. O pico de 15h–16h do dia 17 concentrou 294 timeouts.

As listas completas pediam `count=exact` a cada página. A política dos registros
filhos executava funções de acesso por linha. Cada card disparava três novas
leituras em qualquer evento de atualização do cache de tarefas/subtarefas,
inclusive início e fim de uma leitura sem mudanças. Notificações de atribuição
ainda abertas também invalidavam as listas em cada atualização periódica.

## Mudanças

- Paginação com ordenação estável mantida; sem total, termina somente quando
  recebe uma página vazia, inclusive se o servidor limitar o lote abaixo de 1000.
  Falha em qualquer página não publica resultado parcial.
- Leitura de subtarefas e colaboradores calcula os IDs permitidos uma vez por
  consulta. Escritas continuam usando a regra anterior e os mesmos triggers.
- Um canal compartilhado por usuário/ambiente agrupa invalidações em 250 ms.
  Leituras periódicas de segurança passam a 60 segundos, com tempo real ativo.
- Cards usam cache por usuário, ambiente e tarefa; leituras simultâneas são
  agrupadas em lotes de até 100 tarefas e mantêm paginação de seus filhos.
- Eventos de início/fim de leitura do cache não disparam outra leitura dos cards.
- Notificações já recebidas não invalidam repetidamente a lista. A atualização
  periódica de notificações pausa em abas ocultas e sem conexão.

## Validação do banco

A equivalência entre as regras antiga e nova foi verificada com as 18 contas e
1.348 tarefas atuais, em transação revertida antes da aplicação. A migration
`20261118110000` foi aplicada e registrada no banco. Não alterou registros de
tarefas, colaboradores ou subtarefas. Usou `lock_timeout=2s` para falhar em vez
de aguardar um bloqueio longo.
A migration `20261118113000` mantém a função de apoio no schema privado
`taskflow_private`, fora dos endpoints RPC públicos. As políticas acompanham
a mesma função e suas permissões continuam restritas ao contexto autenticado.

Medições pontuais no banco, com o mesmo contexto de usuário:

- Contagem com a regra anterior: 570,49 ms.
- Contagem com a nova política: 7,62 ms.
- Nova leitura ordenada de 1.000 subtarefas: 4,50 ms.

Esses tempos não incluem rede ou renderização e não garantem a mesma melhora
para todas as telas ou horários.

Testes isolados também comparam administrador, membro, participante externo,
pessoa sem vínculo e contexto anônimo; validam criação, edição e exclusão
permitidas e inserção fora do escopo recusada. Em navegador com dados fictícios,
30 cards e 1.230 subtarefas foram lidos por completo nos dois ambientes, mesmo
com o servidor limitado a 500 linhas por página. Foram sete leituras em lote
dos filhos, em vez de 90 leituras individuais iniciais.

## Publicação e acompanhamento

A alteração do banco é compatível com a versão anterior do aplicativo. O código
do navegador exige publicação e atualização normal do service worker; não se
deve limpar os dados offline para forçar a atualização. Não é necessário parar
o uso nem reiniciar o banco.

Após publicar, comparar a taxa de erros e latência de `/rest/v1/subtasks`, volume
de leituras por sessão e memória/CPU em horário de uso. Não aumentar o timeout
como substituto da correção. Upgrade de compute só deve ser reavaliado com as
métricas após a otimização.

## Reversão da política, se necessária

Executar em transação com `lock_timeout` curto. Para cada uma das tabelas
`subtasks` e `task_collaborators`, remover somente as quatro políticas
`workspace_<tabela>_read/insert/update/delete` desta migration e recriar a
política original `workspace_<tabela>_parent FOR ALL TO authenticated` com
`USING (can_access_workspace_task(task_id))` e o mesmo `WITH CHECK`.
Não alterar grants, triggers ou dados. A migration aplicada permanece registrada;
uma reversão deve ser documentada por outra migration.
