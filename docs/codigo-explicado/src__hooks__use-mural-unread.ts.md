# src/hooks/use-mural-unread.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 6 | `const muralUnreadKey = (userId?: string) => ["mural_unread", userId] as const;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 7 | `const MURAL_NOTIFICATION_TYPES = ["mural_post", "mural_reaction"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `export function useMuralUnreadCount() {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 10 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 11 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 12 | `  const query = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 13 | `    queryKey: muralUnreadKey(user?.id),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `    enabled: !!user?.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 16 | `      const { count, error } = await (supabase.from("notifications") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `        .select("id", { count: "exact", head: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `        .eq("user_id", user!.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `        .eq("is_read", false)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `        .in("type", MURAL_NOTIFICATION_TYPES);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 22 | `      return count ?? 0;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 23 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 24 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 27 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 28 | `    const refresh = () => queryClient.invalidateQueries({ queryKey: muralUnreadKey(user.id) });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `    const channel = supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `      .channel(\`mural-unread-${user.id}\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: \`user_id=eq.${user.id}\` }, refresh)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `      .subscribe();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `    return () => void supabase.removeChannel(channel);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 34 | `  }, [queryClient, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 36 | `  return query.data ?? 0;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 37 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `export async function markMuralAsRead(userId: string, postIds: string[]) {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 40 | `  if (!postIds.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 41 | `  const { error } = await (supabase.from("mural_post_reads") as any).upsert(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `    postIds.map((postId) => ({ user_id: userId, post_id: postId })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 43 | `    { onConflict: "user_id,post_id", ignoreDuplicates: true },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 45 | `  if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `export { muralUnreadKey };` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 49 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
