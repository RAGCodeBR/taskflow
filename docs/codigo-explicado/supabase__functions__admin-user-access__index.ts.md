# supabase/functions/admin-user-access/index.ts

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
| 9 | `const allAdminPermissions = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 10 | `  "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  "requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  "users",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `const clientPermissions = ["portal_entregas", "portal_financeiro"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 25 | `const marketingManagerEmail = "reinangrupoahouse@gmail.com";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 26 | `const validPermissions = new Set([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 27 | `  "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  "requests",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `function response(body: Record<string, unknown>, status = 200) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 42 | `  return new Response(JSON.stringify(body), {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 43 | `    status,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `    headers: { ...corsHeaders, "Content-Type": "application/json" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 46 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `function validUuid(value: unknown): value is string {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 49 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 50 | `    typeof value === "string" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `Deno.serve(async (request) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 56 | `  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `  if (request.method !== "POST") return response({ error: "Método não permitido." }, 405);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 58 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 59 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 60 | `    const authorization = request.headers.get("Authorization");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `    const token = authorization?.replace(/^Bearer\s+/i, "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `    if (!token) return response({ error: "Sessão não encontrada." }, 401);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 63 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 64 | `    const projectUrl = Deno.env.get("SUPABASE_URL")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `    const authClient = createClient(projectUrl, anonKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `      global: { headers: { Authorization: authorization } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 70 | `    const { data: authData, error: authError } = await authClient.auth.getUser(token);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `    if (authError || !authData.user) return response({ error: "Sessão inválida." }, 401);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 72 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 73 | `    const admin = createClient(projectUrl, serviceRoleKey, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `      auth: { autoRefreshToken: false, persistSession: false },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 75 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 76 | `    const { data: callerRoles, error: roleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 77 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `      .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `      .eq("user_id", authData.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `    if (roleError) throw roleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 81 | `    if (!callerRoles?.some((item) => item.role === "admin"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 82 | `      return response({ error: "Somente administradores podem gerenciar acessos." }, 403);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 83 | `    const isMarketingManager = authData.user.email?.trim().toLowerCase() === marketingManagerEmail;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `    const payload = await request.json();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `    const action = payload?.action;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 87 | `    const data = payload?.data ?? {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `    const role = data.role;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `    const managesMarketing = data.workspaceSlug === "marketing";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 90 | `    if (!["create", "update", "delete"].includes(action))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 91 | `      return response({ error: "Ação inválida." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 92 | `    if (action !== "delete" && !["admin", "collaborator", "client"].includes(role))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `      return response({ error: "Categoria de acesso inválida." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 94 | `    if (action !== "delete" && role === "client" && !validUuid(data.clientId))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 95 | `      return response({ error: "Selecione o cliente que será vinculado a este acesso." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 96 | `    if (action === "create" && data.marketingAccess === true && role === "client")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `      return response({ error: "O acesso de cliente deve permanecer vinculado à Consultoria." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 98 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 99 | `    // In Marketing, every administrator can manage only Marketing's own` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 100 | `    // collaborators. Consultoria users and administrator accounts remain` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 101 | `    // centrally managed by the responsible account.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 102 | `    if (!isMarketingManager) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 103 | `      if (!managesMarketing)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 104 | `        return response({ error: "Você pode alterar apenas seu próprio perfil fora do Marketing." }, 403);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 105 | `      if (action === "create") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 106 | `        if (role !== "collaborator" || data.marketingAccess !== true)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 107 | `          return response({ error: "No Marketing, crie somente colaboradores próprios do ambiente." }, 403);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 108 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 110 | `        const { data: targetRoles, error: targetRoleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 111 | `          .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `          .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `          .eq("user_id", data.userId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `          .maybeSingle();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `        if (targetRoleError) throw targetRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 116 | `        const { data: memberships, error: membershipsError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `          .from("workspace_memberships")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `          .select("workspace_id, workspaces!inner(slug)")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `          .eq("user_id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `        if (membershipsError) throw membershipsError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 121 | `        const membershipSlugs = (memberships ?? []).map((membership: any) => membership.workspaces?.slug);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `        const onlyMarketingCollaborator =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 123 | `          targetRoles?.role === "collaborator" &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `          membershipSlugs.includes("marketing") &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `          !membershipSlugs.includes("consultoria");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `        if (!onlyMarketingCollaborator || (action === "update" && role !== "collaborator"))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 127 | `          return response({ error: "Você pode alterar somente colaboradores próprios do Marketing." }, 403);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 128 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 129 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 130 | `    const permissions =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `      action === "delete"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `        ? []` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `        : role === "admin"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `          ? allAdminPermissions` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `          : Array.isArray(data.permissions)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `            ? data.permissions.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `                (permission): permission is string =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 138 | `                  typeof permission === "string" && validPermissions.has(permission),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `              )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `            : role === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `              ? clientPermissions` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `              : [];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 144 | `    if (action === "create") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 145 | `      if (typeof data.fullName !== "string" || data.fullName.trim().length < 2)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 146 | `        return response({ error: "Informe o nome completo." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 147 | `      if (typeof data.email !== "string" || !/^\S+@\S+\.\S+$/.test(data.email))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 148 | `        return response({ error: "Informe um e-mail válido." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 149 | `      const invitedEmail = data.email.trim().toLowerCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `      const { error: allowInvitationError } = await admin.from("access_invitations").upsert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 151 | `        email: invitedEmail,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `        invited_by: authData.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 155 | `      if (allowInvitationError) throw allowInvitationError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 156 | `      const redirectTo = Deno.env.get("INVITE_REDIRECT_URL");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `      const { data: created, error: createError } = await admin.auth.admin.inviteUserByEmail(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `        invitedEmail,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `        {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `          ...(redirectTo ? { redirectTo } : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `          data: { full_name: data.fullName.trim() },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 163 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 164 | `      if (createError || !created.user)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 165 | `        throw createError ?? new Error("Não foi possível enviar o convite.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 167 | `      // The database trigger creates every invited account as a collaborator` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 168 | `      // first. Replace that temporary role with the category selected by the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 169 | `      // administrator; roles must never come from browser-controlled metadata.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 170 | `      const { error: removeRoleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `        .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `        .eq("user_id", created.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `      if (removeRoleError) throw removeRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 175 | `      const { error: addRoleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `        .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `        .insert({ user_id: created.user.id, role });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `      if (addRoleError) throw addRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 179 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 180 | `      const { error: permissionsError } = await admin.from("user_permissions").upsert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `        user_id: created.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `        permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `        updated_by: authData.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 185 | `      if (permissionsError) throw permissionsError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 186 | `      if (role === "client") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 187 | `        const { error: linkError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `          .from("client_user_links")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `          .upsert({ user_id: created.user.id, client_id: data.clientId });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `        if (linkError) throw linkError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 191 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 192 | `      if (data.marketingAccess === true) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 193 | `        const { data: marketingWorkspace, error: marketingWorkspaceError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `          .from("workspaces")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `          .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `          .eq("slug", "marketing")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `          .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `        if (marketingWorkspaceError || !marketingWorkspace) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 199 | `          throw marketingWorkspaceError ?? new Error("Ambiente Marketing não encontrado.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 201 | `        const { data: consultoriaWorkspace, error: consultoriaWorkspaceError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `          .from("workspaces")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `          .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `          .eq("slug", "consultoria")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `          .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `        if (consultoriaWorkspaceError || !consultoriaWorkspace) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 207 | `          throw consultoriaWorkspaceError ?? new Error("Ambiente Consultoria não encontrado.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 209 | `        const { error: membershipError } = await admin.from("workspace_memberships").upsert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 210 | `          workspace_id: marketingWorkspace.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `          user_id: created.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `          role,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `          permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `          access_grant: "manual",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 216 | `        if (membershipError) throw membershipError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 217 | `        const { error: removeConsultoriaMembershipError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 218 | `          .from("workspace_memberships")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `          .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `          .eq("workspace_id", consultoriaWorkspace.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `          .eq("user_id", created.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `        if (removeConsultoriaMembershipError) throw removeConsultoriaMembershipError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 223 | `        const { error: activeWorkspaceError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 224 | `          .from("profiles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `          .update({ active_workspace_id: marketingWorkspace.id })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `          .eq("id", created.user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `        if (activeWorkspaceError) throw activeWorkspaceError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 228 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 229 | `      return response({ userId: created.user.id });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 230 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 231 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 232 | `    if (action === "update") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 233 | `      if (typeof data.fullName !== "string" || data.fullName.trim().length < 2)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 234 | `        return response({ error: "Informe o nome completo." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 235 | `      if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 236 | `        data.password !== undefined &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `        (typeof data.password !== "string" || data.password.length < 6)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `        return response({ error: "A nova senha deve ter ao menos 6 caracteres." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 240 | `      if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 241 | `      if (data.userId === authData.user.id && role !== "admin")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 242 | `        return response(` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 243 | `          { error: "Você não pode remover seu próprio acesso de administrador." },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `          400,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 246 | `      const authUpdate = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `        // The Admin API accepts user_metadata (not the client-side \`data\`` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 248 | `        // property). Using \`data\` made every access update be rejected by GoTrue.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 249 | `        user_metadata: { full_name: data.fullName.trim(), role },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `        ...(data.password ? { password: data.password } : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `      const { error: authUpdateError } = await admin.auth.admin.updateUserById(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 253 | `        data.userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `        authUpdate,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 256 | `      if (authUpdateError) throw authUpdateError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 257 | `      const { error: profileUpdateError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 258 | `        .from("profiles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `        .update({ full_name: data.fullName.trim() })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `        .eq("id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `      if (profileUpdateError) throw profileUpdateError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 262 | `      const { error: removeRoleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 263 | `        .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 265 | `        .eq("user_id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 266 | `      if (removeRoleError) throw removeRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 267 | `      const { error: addRoleError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 268 | `        .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        .insert({ user_id: data.userId, role });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `      if (addRoleError) throw addRoleError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 271 | `      const { error: permissionsError } = await admin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 272 | `        .from("user_permissions")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `        .upsert({ user_id: data.userId, permissions, updated_by: authData.user.id });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      if (permissionsError) throw permissionsError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 275 | `      const linkQuery = admin.from("client_user_links");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `      const { error: linkError } =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 277 | `        role === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `          ? await linkQuery.upsert({ user_id: data.userId, client_id: data.clientId })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `          : await linkQuery.delete().eq("user_id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `      if (linkError) throw linkError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 281 | `      return response({ ok: true });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 282 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 283 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 284 | `    if (!validUuid(data.userId)) return response({ error: "Usuário inválido." }, 400);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 285 | `    if (data.userId === authData.user.id)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 286 | `      return response({ error: "Você não pode excluir seu próprio acesso." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 287 | `    const { error: deleteError } = await admin.auth.admin.deleteUser(data.userId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 288 | `    if (deleteError) throw deleteError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 289 | `    return response({ ok: true });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 290 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 291 | `    return response({ error: "Ação inválida." }, 400);` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 292 | `  } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `    console.error(error);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `    const message =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 295 | `      error instanceof Error` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `        ? error.message` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `        : typeof error === "string"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `          ? error` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `          : "Não foi possível salvar o acesso.";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `    // Returning a JSON payload with a successful transport status lets the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 301 | `    // browser show the provider's real message instead of Supabase's empty` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 302 | `    // FunctionsHttpError object. The \`error\` field is still handled as a` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 303 | `    // failed operation by the caller.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 304 | `    return response({ error: message });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 305 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 306 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 307 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
