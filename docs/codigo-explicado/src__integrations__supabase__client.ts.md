# src/integrations/supabase/client.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createClient } from '@supabase/supabase-js';` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import type { Database } from './types';` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 4 | `/**` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 5 | ` * Supabase browser client.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 6 | ` *` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 7 | ` * This clean GitHub Pages copy must point to its own Supabase project.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 8 | ` * Do not paste credentials from the Lovable/original project here.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 9 | ` *` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 10 | ` * In GitHub Pages, Vite replaces VITE_* values during build time. That means` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 11 | ` * changing the Supabase project later requires rebuilding and redeploying Pages.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 12 | ` */` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 13 | `function createFallbackQueryBuilder(message: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 14 | `  const error = new Error(message);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 15 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 16 | `  const builder = new Proxy(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `      data: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `      error,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 21 | `    {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `      get(target, prop, receiver) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `        if (prop === 'then') {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 24 | `          return (resolve: (value: unknown) => void) => resolve({ data: null, error });` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 25 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `        if (prop === 'catch') {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 28 | `          return (callback: (error: Error) => unknown) => Promise.resolve({ data: null, error }).catch(callback);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 29 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `        if (prop === 'finally') {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 32 | `          return (callback: () => void) => Promise.resolve({ data: null, error }).finally(callback);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 33 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 34 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 35 | `        if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 36 | `          prop === 'select' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `          prop === 'insert' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `          prop === 'update' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `          prop === 'delete' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `          prop === 'upsert' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `          prop === 'eq' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `          prop === 'in' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `          prop === 'order' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `          prop === 'limit' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `          prop === 'range' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `          prop === 'match' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `          prop === 'or' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `          prop === 'filter' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `          prop === 'not' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `          prop === 'is' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `          prop === 'contains' ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `          prop === 'over'` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `        ) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `          return () => builder;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 55 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `        if (prop === 'single' || prop === 'maybeSingle') {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 58 | `          return () => Promise.resolve({ data: null, error });` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 59 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 60 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 61 | `        if (prop === 'rpc') {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 62 | `          return () => Promise.resolve({ data: null, error });` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 63 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 64 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 65 | `        if (prop in target) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 66 | `          return Reflect.get(target, prop, receiver);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 67 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `        return undefined;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 70 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 71 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 72 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  return builder as any;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 75 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `function createFallbackSupabaseClient() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 78 | `  const message = 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable database features.';` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `  const error = new Error(message);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 81 | `  return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 82 | `    auth: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `      getUser: () => Promise.resolve({ data: { user: null }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 84 | `      getSession: () => Promise.resolve({ data: { session: null }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 85 | `      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 86 | `      signOut: () => Promise.resolve({ error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 88 | `      signUp: () => Promise.resolve({ data: { user: null, session: null }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 89 | `      signInWithOAuth: () => Promise.resolve({ data: { provider: '', url: '' }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `      setSession: () => Promise.resolve({ error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 91 | `      getClaims: () => Promise.resolve({ data: { claims: null }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 92 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `    from: () => createFallbackQueryBuilder(message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 94 | `    storage: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `      from: () => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 96 | `        upload: () => Promise.resolve({ data: null, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 97 | `        download: () => Promise.resolve({ data: null, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 98 | `        remove: () => Promise.resolve({ data: null, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 99 | `        getPublicUrl: () => ({ data: { publicUrl: '' }, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 100 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 102 | `    functions: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `      invoke: () => Promise.resolve({ data: null, error }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `    removeChannel: () => undefined,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 106 | `  } as any;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 108 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 109 | `function createSupabaseClient() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 110 | `  // Client-side static build: values come from GitHub Actions/local .env as VITE_*.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 111 | `  // Local SSR/dev fallback: values can also come from process.env for compatibility.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 112 | `  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `  const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 116 | `    console.warn('[Supabase] Missing credentials. Falling back to a local-safe client.');` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    return createFallbackSupabaseClient();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 118 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 121 | `    auth: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `      // Persisting sessions in localStorage is what keeps the user logged in after reloads.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 123 | `      storage: typeof window !== 'undefined' ? localStorage : undefined,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `      persistSession: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `      autoRefreshToken: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 127 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 128 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 130 | `let _supabase: ReturnType<typeof createSupabaseClient> | undefined;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 132 | `// Lazy proxy: importing this module does not crash immediately if env vars are missing.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 133 | `// The clear error is raised only when some code actually calls supabase.from/auth/etc.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 134 | `export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 135 | `  get(_, prop, receiver) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `    if (!_supabase) _supabase = createSupabaseClient();` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 137 | `    return Reflect.get(_supabase, prop, receiver);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 138 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 139 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 140 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
