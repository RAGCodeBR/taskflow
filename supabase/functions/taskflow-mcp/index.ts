// Conector MCP do TaskFlow (consultoria) para o Claude.
// Autenticação: OAuth 2.1 do Supabase Auth (Authentication > OAuth Server). O Claude obtém um token
// do usuário pelo fluxo de consentimento em https://www.taskfloww.com.br/oauth/consent.
// Acesso restrito a MCP_ALLOWED_EMAILS (padrão: reinangrupoahouse@gmail.com).
// Deploy: supabase functions deploy taskflow-mcp --no-verify-jwt
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const ALLOWED = (Deno.env.get("MCP_ALLOWED_EMAILS") ?? "reinangrupoahouse@gmail.com")
  .split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
const WORKSPACE_SLUG = Deno.env.get("MCP_WORKSPACE_SLUG") ?? "consultoria";
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/taskflow-mcp`;
const METADATA_URL = `${FUNCTION_URL}/.well-known/oauth-protected-resource`;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, mcp-protocol-version, mcp-session-id",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Expose-Headers": "WWW-Authenticate",
};
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json", ...extra } });
const unauthorized = (msg: string) =>
  json({ error: "unauthorized", error_description: msg }, 401, { "WWW-Authenticate": `Bearer resource_metadata="${METADATA_URL}"` });

const TOOLS = [
  {
    name: "taskflow_clientes",
    title: "Buscar clientes da consultoria",
    description: "Busca clientes no TaskFlow da consultoria pelo nome, razão social ou nome fantasia. Retorna id e nome para usar em taskflow_anexar_ata.",
    inputSchema: { type: "object", properties: { busca: { type: "string", description: "Parte do nome (vazio lista os primeiros 30)" } } },
    annotations: { readOnlyHint: true },
  },
  {
    name: "taskflow_anexar_ata",
    title: "Anexar ata ao cliente",
    description: "Salva uma ata de reunião nas anotações do cliente no TaskFlow da consultoria (como a tela Importar Ata faz). Confirme com o usuário o cliente antes de anexar.",
    inputSchema: {
      type: "object",
      properties: {
        cliente_id: { type: "string", description: "id do cliente (de taskflow_clientes)" },
        titulo: { type: "string" },
        texto: { type: "string", description: "Ata em texto simples" },
        html: { type: "string", description: "Ata em HTML (opcional; usado na visualização formatada)" },
        data: { type: "string", description: "Data da reunião AAAA-MM-DD (opcional)" },
      },
      required: ["cliente_id", "titulo", "texto"],
    },
    annotations: { readOnlyHint: false, destructiveHint: false },
  },
  {
    name: "taskflow_contatos",
    title: "Contatos dos clientes",
    description: "Telefone, e-mail e responsável dos clientes da consultoria (para mandar mensagem ou ligar). 'busca' filtra pelo nome.",
    inputSchema: { type: "object", properties: { busca: { type: "string" } } },
    annotations: { readOnlyHint: true },
  },
];

type Db = ReturnType<typeof createClient>;

async function workspaceId(db: Db) {
  const { data, error } = await db.from("workspaces").select("id").eq("slug", WORKSPACE_SLUG).maybeSingle();
  if (error || !data) throw new Error("Ambiente da consultoria não encontrado.");
  return (data as { id: string }).id;
}

const strip = (s: string) => s.replace(/[%,()]/g, " ").trim();

async function callTool(db: Db, userId: string, name: string, args: Record<string, unknown>): Promise<string> {
  const ws = await workspaceId(db);
  if (name === "taskflow_clientes") {
    const q = strip(String(args.busca ?? ""));
    let query = db.from("clients").select("id,name,trade_name,legal_name").eq("workspace_id", ws).neq("is_active", false).order("name").limit(30);
    if (q) query = query.or(`name.ilike.%${q}%,trade_name.ilike.%${q}%,legal_name.ilike.%${q}%`);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as { id: string; name: string; trade_name: string | null }[];
    return JSON.stringify({ clientes: rows.map((c) => ({ id: c.id, nome: c.name, fantasia: c.trade_name })) });
  }
  if (name === "taskflow_contatos") {
    const q = strip(String(args.busca ?? ""));
    let query = db.from("clients").select("id,name,trade_name,phone,email,responsible").eq("workspace_id", ws).neq("is_active", false).order("name").limit(200);
    if (q) query = query.or(`name.ilike.%${q}%,trade_name.ilike.%${q}%,responsible.ilike.%${q}%`);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as { id: string; name: string; phone: string | null; email: string | null; responsible: string | null }[];
    return JSON.stringify({ contatos: rows.map((c) => ({ id: c.id, cliente: c.name, responsavel: c.responsible, telefone: c.phone, email: c.email })) });
  }
  if (name === "taskflow_anexar_ata") {
    const clientId = String(args.cliente_id ?? "");
    const titulo = String(args.titulo ?? "").trim() || "Ata de Reunião";
    const texto = String(args.texto ?? "").trim();
    if (!/^[0-9a-f-]{36}$/i.test(clientId)) throw new Error("cliente_id inválido.");
    if (texto.length < 20) throw new Error("A ata está vazia.");
    const { data: client, error: ce } = await db.from("clients").select("id,name").eq("id", clientId).eq("workspace_id", ws).maybeSingle();
    if (ce || !client) throw new Error("Cliente não encontrado na consultoria.");
    const noteDate = /^\d{4}-\d{2}-\d{2}$/.test(String(args.data ?? "")) ? String(args.data) : null;
    const { data: note, error } = await db.from("client_notes").insert({
      client_id: clientId, title: titulo.slice(0, 300), content: texto.slice(0, 200000),
      content_html: typeof args.html === "string" && args.html.trim() ? args.html.slice(0, 400000) : null,
      created_by: userId, note_date: noteDate,
    }).select("id").single();
    if (error) throw new Error(error.message);
    return JSON.stringify({ anexada: true, cliente: (client as { name: string }).name, anotacao_id: (note as { id: string }).id });
  }
  throw new Error("Ferramenta desconhecida: " + name);
}

type Rpc = { jsonrpc: "2.0"; id?: string | number | null; method: string; params?: Record<string, any> };

async function handle(db: Db, userId: string, msg: Rpc) {
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id: msg.id ?? null, result });
  switch (msg.method) {
    case "initialize":
      return ok({
        protocolVersion: msg.params?.protocolVersion ?? "2025-06-18",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "taskflow-consultoria", version: "1.0.0" },
        instructions: "TaskFlow da consultoria. Use taskflow_clientes para achar o cliente e taskflow_anexar_ata para salvar atas nas anotações dele.",
      });
    case "ping": return ok({});
    case "tools/list": return ok({ tools: TOOLS });
    case "tools/call":
      try {
        const text = await callTool(db, userId, msg.params?.name, msg.params?.arguments ?? {});
        return ok({ content: [{ type: "text", text }], structuredContent: JSON.parse(text) });
      } catch (e) {
        return ok({ content: [{ type: "text", text: "Erro: " + ((e as Error).message ?? "falha") }], isError: true });
      }
    default:
      return msg.id === undefined ? null : { jsonrpc: "2.0", id: msg.id, error: { code: -32601, message: "Método não suportado" } };
  }
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (url.pathname.endsWith("/.well-known/oauth-protected-resource")) {
    return json({
      resource: FUNCTION_URL,
      authorization_servers: [`${SUPABASE_URL}/auth/v1`],
      bearer_methods_supported: ["header"],
      resource_name: "TaskFlow Consultoria",
    });
  }
  if (req.method !== "POST") return new Response("Use POST (MCP Streamable HTTP).", { status: 405, headers: { ...cors, Allow: "POST" } });

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return unauthorized("Token ausente.");
  const db = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: u, error } = await db.auth.getUser(token);
  if (error || !u?.user) return unauthorized("Token inválido ou expirado.");
  if (!ALLOWED.includes((u.user.email ?? "").toLowerCase())) return json({ error: "forbidden", error_description: "Usuário não autorizado." }, 403);

  const body = await req.json().catch(() => null);
  if (!body) return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON inválido" } }, 400);
  const batch = Array.isArray(body) ? body : [body];
  const out = (await Promise.all(batch.map((m: Rpc) => handle(db, u.user!.id, m)))).filter(Boolean);
  if (!out.length) return new Response(null, { status: 202, headers: cors });
  return json(Array.isArray(body) ? out : out[0]);
});
