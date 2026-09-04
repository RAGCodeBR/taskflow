# src/lib/admin-users.functions.ts

Tipo: Modulo TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { z } from "zod";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 5 | `const userAccessSchema = z.object({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 6 | `  fullName: z.string().trim().min(2).max(120),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  email: z.string().trim().email(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  password: z.string().min(6).max(128),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  role: z.enum(["admin", "collaborator", "client"]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  permissions: z.array(z.string()).max(20),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  clientId: z.string().uuid().nullable().or(z.literal("")),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `async function requireAdmin(userId: string | null) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  if (!userId) throw new Response("Unauthorized", { status: 401 });` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 16 | `  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 17 | `  const { data, error } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 18 | `    .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `    .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `    .eq("user_id", userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  if (error) throw new Error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 22 | `  if (!data?.some((row: { role: string }) => row.role === "admin"))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 23 | `    throw new Response("Forbidden", { status: 403 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  return supabaseAdmin;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 25 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 26 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 27 | `export const createUserAccess = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 28 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  .inputValidator((data) => userAccessSchema.parse(data))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 30 | `  .handler(async ({ data, context }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 31 | `    const callerId = (context as any)?.userId ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `    const supabaseAdmin = await requireAdmin(callerId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `    if (data.role === "client" && !data.clientId)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 34 | `      throw new Error("Selecione o cliente que será vinculado a este acesso.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `      email: data.email,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `      password: data.password,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `      email_confirm: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `      user_metadata: { full_name: data.fullName, role: data.role },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 41 | `    if (error) throw new Error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 42 | `    if (!created.user) throw new Error("Não foi possível criar o usuário.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 43 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 44 | `    const { error: permissionsError } = await supabaseAdmin.from("user_permissions").upsert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `      user_id: created.user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `      permissions:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `        data.role === "admin"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `          ? [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `              "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `              "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `              "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `              "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `              "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `              "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `              "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `              "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 57 | `              "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `              "users",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `              "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `              "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `            ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `          : data.role === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `            ? ["portal_entregas", "portal_financeiro"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `            : data.permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `      updated_by: callerId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 67 | `    if (permissionsError) throw new Error(permissionsError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 68 | `    if (data.role === "client" && data.clientId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 69 | `      const { error: linkError } = await (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `        supabaseAdmin.from("client_user_links" as any) as any` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 71 | `      ).upsert({ user_id: created.user.id, client_id: data.clientId });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `      if (linkError) throw new Error(linkError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 73 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 74 | `    return { userId: created.user.id };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 75 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `export const updateUserAccess = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 78 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  .inputValidator((data) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 80 | `    z` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `      .object({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `        userId: z.string().uuid(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `        role: z.enum(["admin", "collaborator", "client"]),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `        permissions: z.array(z.string()).max(20),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `        clientId: z.string().uuid().nullable().or(z.literal("")),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      .parse(data),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `  .handler(async ({ data, context }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `    const callerId = (context as any)?.userId ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `    const supabaseAdmin = await requireAdmin(callerId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `    if (data.role === "client" && !data.clientId)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 93 | `      throw new Error("Selecione o cliente que será vinculado a este acesso.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `    if (data.userId === callerId && data.role !== "admin")` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 95 | `      throw new Error("Você não pode remover seu próprio acesso de administrador.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `    const { error: roleError } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `      .eq("user_id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `    if (roleError) throw new Error(roleError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 101 | `    const { error: insertRoleError } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `      .insert({ user_id: data.userId, role: data.role });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `    if (insertRoleError) throw new Error(insertRoleError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 105 | `    const { error: permissionsError } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `      .from("user_permissions")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      .upsert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `        user_id: data.userId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        permissions:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `          data.role === "admin"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `            ? [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `                "dashboard",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `                "tasks",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `                "import_ata",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `                "clients",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `                "reports",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `                "mural",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `                "agenda",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `                "portal_entregas",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `                "portal_financeiro",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `                "users",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `                "trash",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `                "settings",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `              ]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `            : data.role === "client"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `              ? ["portal_entregas", "portal_financeiro"]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `              : data.permissions,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `        updated_by: callerId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 130 | `    if (permissionsError) throw new Error(permissionsError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 131 | `    if (data.role === "client" && data.clientId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 132 | `      const { error: linkError } = await (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `        supabaseAdmin.from("client_user_links" as any) as any` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 134 | `      ).upsert({ user_id: data.userId, client_id: data.clientId });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `      if (linkError) throw new Error(linkError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 136 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `      const { error: unlinkError } = await (supabaseAdmin.from("client_user_links" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 138 | `        .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `        .eq("user_id", data.userId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `      if (unlinkError) throw new Error(unlinkError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 141 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 142 | `    return { ok: true };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 143 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 144 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 145 | `export const deleteUserCompletely = createServerFn({ method: "POST" })` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 146 | `  .middleware([requireSupabaseAuth])` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 148 | `  .handler(async ({ data, context }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 149 | `    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `    const callerId = (context as any)?.userId ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 152 | `    // Verify caller is admin` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 153 | `    const { data: callerRoles, error: rolesErr } = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `      .from("user_roles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      .select("role")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `      .eq("user_id", callerId ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `    if (rolesErr) throw new Error(rolesErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 158 | `    if (!callerRoles?.some((r: { role: string }) => r.role === "admin")) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 159 | `      throw new Response("Forbidden", { status: 403 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 161 | `    if (data.userId === callerId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 162 | `      throw new Error("Você não pode excluir a si mesmo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 165 | `    const uid = data.userId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 166 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 167 | `    // Wipe user-owned content in public schema. Order matters for FKs.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 168 | `    const tasksRes = await supabaseAdmin` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 169 | `      .from("tasks")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `      .select("id")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `      .or(\`assignee_id.eq.${uid},created_by.eq.${uid}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `    const taskIds = (tasksRes.data ?? []).map((t: any) => t.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 174 | `    if (taskIds.length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 175 | `      await supabaseAdmin.from("subtasks").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 176 | `      await supabaseAdmin.from("task_tag_links").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 177 | `      await supabaseAdmin.from("task_interruptions").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 178 | `      await supabaseAdmin.from("task_history").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 179 | `      await supabaseAdmin.from("comments").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 180 | `      await supabaseAdmin.from("attachments").delete().in("task_id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 181 | `      await supabaseAdmin.from("tasks").delete().in("id", taskIds);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 182 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 184 | `    // Other user-scoped rows` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 185 | `    await supabaseAdmin.from("task_interruptions").delete().eq("user_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 186 | `    await supabaseAdmin.from("comments").delete().eq("author_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 187 | `    await supabaseAdmin.from("client_note_attachments").delete().eq("uploaded_by", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 188 | `    await supabaseAdmin.from("client_notes").delete().eq("created_by", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 189 | `    await supabaseAdmin.from("client_files").delete().eq("uploaded_by", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 190 | `    // tags/statuses/columns are global — never delete on user removal` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 191 | `    await supabaseAdmin.from("user_column_order").delete().eq("user_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 192 | `    await supabaseAdmin.from("user_task_order").delete().eq("user_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 193 | `    await supabaseAdmin.from("board_preferences").delete().eq("user_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 194 | `    await supabaseAdmin.from("user_roles").delete().eq("user_id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 195 | `    await supabaseAdmin.from("profiles").delete().eq("id", uid);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 196 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 197 | `    // Finally remove auth user` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 198 | `    const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(uid);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 199 | `    if (authErr) throw new Error(authErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 200 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 201 | `    return { ok: true };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 202 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 203 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
