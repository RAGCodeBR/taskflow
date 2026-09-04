# src/lib/attachment-limits.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `export const MAX_TASK_ATTACHMENT_BYTES = 50 * 1024 * 1024;` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 2 | `export const MAX_TASK_ATTACHMENT_LABEL = "50 MB";` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `export function isTaskAttachmentTooLarge(file: File) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 5 | `  return file.size > MAX_TASK_ATTACHMENT_BYTES;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 6 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 7 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
