# supabase/functions/agenda-events/index.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createClient } from "https://esm.sh/@supabase/supabase-js@2";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 3 | `const corsHeaders = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 4 | `  "Access-Control-Allow-Origin": "*",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 5 | `  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  "Access-Control-Allow-Methods": "POST, OPTIONS",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 8 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 9 | `function json(body: Record<string, unknown>, status = 200) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 10 | `  return new Response(JSON.stringify(body), {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 11 | `    status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `    headers: { ...corsHeaders, "Content-Type": "application/json" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 14 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `Deno.serve(async (request) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 17 | `  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 18 | `  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 19 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 20 | `    const authorization = request.headers.get("Authorization");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `    if (!authorization) throw new Error("Sessão não encontrada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 22 | `    const projectUrl = Deno.env.get("SUPABASE_URL")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 25 | `    const auth = createClient(projectUrl, anonKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 26 | `      global: { headers: { Authorization: authorization } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 28 | `    const { data: authData, error: authError } = await auth.auth.getUser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `    if (authError || !authData.user) throw new Error("Sessão inválida.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 30 | `    const admin = createClient(projectUrl, serviceKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `      auth: { persistSession: false, autoRefreshToken: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 33 | `    const { data: roles, error: roleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 34 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `      .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `      .eq("user_id", authData.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `    if (roleError) throw roleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 38 | `    if (!roles?.some((role) => role.role === "admin" || role.role === "collaborator"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 39 | `      throw new Error("Sua conta não possui acesso à Agenda.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `    const { data, error } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 41 | `      .from("calendar_events")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      .is("deleted_at", null)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `      .order("starts_at", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `    if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 46 | `    return json({ events: data ?? [] });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 47 | `  } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `    console.error(error);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `    return json(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 50 | `      { error: error instanceof Error ? error.message : "Não foi possível carregar a Agenda." },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `      400,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 55 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
