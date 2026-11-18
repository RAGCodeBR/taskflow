# Salvamento de tarefas — 18/11/2026

## Escopo

- Manter a confirmação da sessão, o `UPDATE ... RETURNING`, as verificações de
  prazo/justificativa, RLS e a fila offline existentes.
- Não consultar colaboradores quando a seleção não mudou. Quando houver edição,
  continuar lendo os vínculos atuais e aplicar somente as inclusões/remoções
  deliberadas, preservando alterações concorrentes.
- Rastrear a última seleção persistida também em tarefas novas que já ganharam
  um rascunho ao anexar itens, para permitir remover um colaborador nessa etapa.
- Enviar subtarefas novas do Marketing em um único INSERT. A falha do lote
  mantém todas as subtarefas pendentes no editor; os UUIDs continuam sendo os
  mesmos para permitir repetição segura e sincronização offline.
- Fechar a janela somente após as gravações e uploads obrigatórios terminarem,
  mas sem aguardar a releitura das listas. As consultas são invalidadas e
  atualizadas em segundo plano; erro nessa atualização não desfaz o salvamento.

## Medição controlada

Comparação entre os arquivos publicados antes da mudança e o build local,
usando o mesmo navegador e as mesmas respostas simuladas: 100 ms de latência
por requisição de autenticação/banco e mais 1.500 ms nas releituras gerais de
tarefas, subtarefas e colaboradores. Nenhum dado real foi escrito.

| Caso | Antes | Depois |
| --- | ---: | ---: |
| Edição simples no Marketing | 3.892 ms | 549 ms |
| Edição simples na Consultoria | 3.880 ms | 553 ms |
| Salvar cinco subtarefas novas | 7.710 ms | 648 ms |
| INSERTs para essas cinco subtarefas | 5 | 1 |
| Leitura extra da seleção inalterada | 1 | 0 |

O tempo medido termina quando a janela fecha, após confirmação das gravações.
Não representa benchmark de produção nem redução equivalente no tempo de
execução de cada UPDATE no Postgres. O benefício vem de menos viagens de rede
e da retirada de releituras da etapa de salvamento.

## Publicação

Não requer migration, troca de chave ou interrupção do sistema. A alteração
precisa de commit/push/deploy autorizado e da atualização normal do aplicativo.
