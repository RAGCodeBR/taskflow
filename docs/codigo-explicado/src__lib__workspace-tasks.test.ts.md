# src/lib/workspace-tasks.test.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { describe, expect, it } from "vitest";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { isTaskFromAnotherWorkspace, splitTasksByWorkspace } from "./workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `const CONSULTORIA = "11111111-1111-1111-1111-111111111111";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 5 | `const MARKETING = "22222222-2222-2222-2222-222222222222";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 6 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 7 | `const task = (id: string, workspace_id: string | null) => ({ id, workspace_id });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `describe("isTaskFromAnotherWorkspace", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 10 | `  it("reconhece a tarefa que veio do outro ambiente", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 11 | `    expect(isTaskFromAnotherWorkspace(task("a", CONSULTORIA), MARKETING)).toBe(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `  it("não marca a tarefa do próprio ambiente", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 15 | `    expect(isTaskFromAnotherWorkspace(task("a", MARKETING), MARKETING)).toBe(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `  it("na dúvida trata como local: sem ambiente ativo", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 19 | `    expect(isTaskFromAnotherWorkspace(task("a", CONSULTORIA), null)).toBe(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `  it("na dúvida trata como local: linha antiga sem workspace_id", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 23 | `    expect(isTaskFromAnotherWorkspace(task("a", null), MARKETING)).toBe(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `    // Linha vinda de um select que nem trouxe a coluna.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 25 | `    const semCampo: { id: string; workspace_id?: string | null } = { id: "a" };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 26 | `    expect(isTaskFromAnotherWorkspace(semCampo, MARKETING)).toBe(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 28 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 29 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 30 | `describe("splitTasksByWorkspace", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 31 | `  it("separa os dois lados preservando a ordem de cada um", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 32 | `    const tasks = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `      task("m1", MARKETING),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `      task("c1", CONSULTORIA),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `      task("m2", MARKETING),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `      task("c2", CONSULTORIA),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `    ];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `    const { own, shared } = splitTasksByWorkspace(tasks, MARKETING);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    expect(own.map((t) => t.id)).toEqual(["m1", "m2"]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 40 | `    expect(shared.map((t) => t.id)).toEqual(["c1", "c2"]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 41 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `  it("sem ambiente ativo, nada é tratado como compartilhado", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 44 | `    const tasks = [task("m1", MARKETING), task("c1", CONSULTORIA)];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `    const { own, shared } = splitTasksByWorkspace(tasks, null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `    expect(own).toHaveLength(2);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `    expect(shared).toEqual([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 50 | `  it("lista vazia não quebra", () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 51 | `    expect(splitTasksByWorkspace([], MARKETING)).toEqual({ own: [], shared: [] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
