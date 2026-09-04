# src/lib/subtask-status.test.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { describe, expect, it } from "vitest";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { countCompletedSubtasks, subtaskStatus } from "./subtask-status";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `// Meio do dia, para que "ontem" e "amanhã" não escorreguem por fuso.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 5 | `const HOJE = new Date("2026-09-04T12:00:00");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `const sub = (done: boolean, due_date: string | null) => ({ done, due_date });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `describe("subtaskStatus", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 10 | `  it("marca como concluída quando está feita", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 11 | `    expect(subtaskStatus(sub(true, "2026-09-10T12:00:00"), HOJE)).toBe("concluida");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `  it("concluída vence atrasada: entregue com atraso continua entregue", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 15 | `    expect(subtaskStatus(sub(true, "2026-08-01T12:00:00"), HOJE)).toBe("concluida");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `  it("sem prazo quando não há data", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 19 | `    expect(subtaskStatus(sub(false, null), HOJE)).toBe("sem_prazo");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `  it("atrasada quando o prazo ficou para trás", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 23 | `    expect(subtaskStatus(sub(false, "2026-09-03T12:00:00"), HOJE)).toBe("atrasada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `  it("vencer hoje ainda é pendente, não atrasada", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 27 | `    expect(subtaskStatus(sub(false, "2026-09-04T08:00:00"), HOJE)).toBe("pendente");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `    expect(subtaskStatus(sub(false, "2026-09-04T23:59:00"), HOJE)).toBe("pendente");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `  it("pendente quando o prazo está à frente", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 32 | `    expect(subtaskStatus(sub(false, "2026-09-30T12:00:00"), HOJE)).toBe("pendente");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 34 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `describe("countCompletedSubtasks", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 37 | `  it("conta quantas de quantas", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 38 | `    const lista = [sub(true, null), sub(false, null), sub(true, "2026-09-01T12:00:00")];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    expect(countCompletedSubtasks(lista)).toEqual({ done: 2, total: 3 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 41 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 42 | `  it("lista vazia não quebra", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 43 | `    expect(countCompletedSubtasks([])).toEqual({ done: 0, total: 0 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 45 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 46 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
