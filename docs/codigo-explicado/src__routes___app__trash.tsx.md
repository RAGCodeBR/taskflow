# src/routes/_app/trash.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { Trash2, RotateCcw } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { useClients, useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { useWorkspaceDeletedTasks } from "@/hooks/use-workspace-tasks";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 12 | `export const Route = createFileRoute("/_app/trash")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 13 | `  component: TrashPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `function TrashPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 17 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 18 | `  const { data: tasks = [], isLoading } = useWorkspaceDeletedTasks();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 20 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `  const canDeleteTask = (task: (typeof tasks)[number]) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `    !!isAdmin || task.created_by === user?.id;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  const deletableTasks = tasks.filter(canDeleteTask);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `  const restore = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 27 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 28 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `      .update({ deleted_at: null, deleted_by: null })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `      .eq("id", id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 32 | `    toast.success("Tarefa restaurada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `    qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  const purge = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `    if (!confirm("Excluir esta tarefa permanentemente? Esta ação não pode ser desfeita.")) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 38 | `    const { error } = await supabase.from("tasks").delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 40 | `    toast.success("Tarefa excluída permanentemente");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `    qc.invalidateQueries({ queryKey: ["tasks", "deleted"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `  const purgeAll = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `    if (!deletableTasks.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `    if (!confirm(\`Excluir permanentemente ${deletableTasks.length} tarefa(s) da lixeira?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 47 | `    const ids = deletableTasks.map((t) => t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `    const { error } = await supabase.from("tasks").delete().in("id", ids);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 50 | `    toast.success("Lixeira esvaziada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `    qc.invalidateQueries({ queryKey: ["tasks", "deleted"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 54 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 55 | `    <div className="p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 56 | `      <header className="mb-4 flex items-center justify-between gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 57 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 58 | `          <h1 className="text-2xl font-bold tracking-tight">Lixeira</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 59 | `          <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 60 | `            Tarefas excluídas. Restaure ou apague permanentemente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 62 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 63 | `        {deletableTasks.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `          <Button variant="destructive" onClick={purgeAll}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 65 | `            <Trash2 className="mr-2 h-4 w-4" />Esvaziar lixeira` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 66 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 67 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `      {isLoading ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `        <p className="text-sm text-muted-foreground">Carregando…</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 72 | `      ) : tasks.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `        <div className="rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 74 | `          A lixeira está vazia.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 76 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `        <div className="overflow-hidden rounded-lg border">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 78 | `          <table className="w-full text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 79 | `            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 80 | `              <tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 81 | `                <th className="px-3 py-2 text-left">Título</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 82 | `                <th className="px-3 py-2 text-left">Cliente</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 83 | `                <th className="px-3 py-2 text-left">Responsável</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 84 | `                <th className="px-3 py-2 text-left">Excluída em</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 85 | `                <th className="px-3 py-2 text-right">Ações</th>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 86 | `              </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 87 | `            </thead>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 88 | `            <tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 89 | `              {tasks.map((t) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `                const c = clients.find((x) => x.id === t.client_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `                const a = profiles.find((p) => p.id === t.assignee_id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 93 | `                  <tr key={t.id} className="border-t">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 94 | `                    <td className="px-3 py-2 font-medium">{t.title}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 95 | `                    <td className="px-3 py-2 text-muted-foreground">{c?.name ?? "—"}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 96 | `                    <td className="px-3 py-2 text-muted-foreground">{a?.full_name ?? a?.email ?? "—"}</td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 97 | `                    <td className="px-3 py-2 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 98 | `                      {t.deleted_at ? format(new Date(t.deleted_at), "dd/MM/yyyy HH:mm") : "—"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `                    </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 100 | `                    <td className="px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 101 | `                      <div className="flex justify-end gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 102 | `                        {canDeleteTask(t) && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `                          <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 104 | `                            <Button size="sm" variant="outline" onClick={() => restore(t.id)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 105 | `                              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />Restaurar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 106 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 107 | `                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => purge(t.id)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 108 | `                              <Trash2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 109 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 110 | `                          </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 111 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 113 | `                    </td>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 114 | `                  </tr>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 115 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 116 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `            </tbody>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 118 | `          </table>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 119 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 120 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 122 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 123 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 124 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
