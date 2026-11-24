/**
 * Acesso às páginas para administradores e colaboradores.
 *
 * O menu já esconde o que a pessoa não pode usar, mas a página continuava
 * abrindo pelo endereço. Esta tabela aplica a mesma permissão do menu
 * (`AppShell`) ao endereço digitado, a um favorito ou a um link recebido.
 *
 * Fora desta tabela, de propósito:
 *  - `/meetings`: a página também permite acesso a convidados da reunião;
 *  - `/ambientes`: é a troca de ambiente, disponível a quem tem mais de um;
 *  - `/requests`: ainda não existe uma permissão para Solicitações.
 * Usuários do tipo cliente seguem a regra própria do portal, em `_app.tsx`.
 */
const ROUTE_PERMISSIONS: ReadonlyArray<readonly [prefix: string, anyOf: readonly string[]]> = [
  ["/mural", ["mural"]],
  ["/dashboard", ["dashboard"]],
  ["/tasks", ["tasks"]],
  ["/conversations", ["conversations"]],
  ["/obligations", ["obligations"]],
  ["/clients", ["clients"]],
  ["/client-report", ["clients"]],
  // As anotações são as anotações dos clientes.
  ["/notes", ["clients"]],
  ["/import-ata", ["import_ata"]],
  ["/crm", ["crm"]],
  ["/reports", ["reports"]],
  ["/agenda", ["agenda"]],
  ["/portal/entregas", ["portal_entregas", "portal"]],
  ["/portal/financeiro", ["portal_financeiro", "portal"]],
  ["/users", ["users"]],
  ["/trash", ["trash"]],
  ["/settings", ["settings"]],
];

/** Destinos possíveis quando a página pedida é negada, na ordem do menu. */
const FALLBACK_ROUTES = [
  "/mural",
  "/dashboard",
  "/tasks",
  "/conversations",
  "/obligations",
  "/clients",
  "/crm",
  "/reports",
  "/agenda",
  "/portal/entregas",
  "/portal/financeiro",
  "/trash",
  "/settings",
] as const;

export type FallbackRoute = (typeof FALLBACK_ROUTES)[number];

type Access = {
  isAdmin: boolean;
  /** Permissões do ambiente ativo, como o menu as recebe. */
  permissions: readonly string[];
};

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

function requiredPermissions(pathname: string) {
  return ROUTE_PERMISSIONS.find(([prefix]) => matchesPrefix(pathname, prefix))?.[1] ?? null;
}

export type RouteDecision =
  { allowed: true } | { allowed: false; redirectTo: FallbackRoute | null };

export function decideRouteAccess(pathname: string, access: Access): RouteDecision {
  if (access.isAdmin) return { allowed: true };
  // Lista vazia não é prova de "sem acesso": é também o estado de uma leitura
  // de permissões que falhou. Nesse caso não tiramos a pessoa da página em
  // que ela está trabalhando; o menu já aparece vazio e o banco continua
  // protegendo os dados.
  if (access.permissions.length === 0) return { allowed: true };

  const has = (anyOf: readonly string[]) =>
    anyOf.some((permission) => access.permissions.includes(permission));
  const required = requiredPermissions(pathname);
  if (!required || has(required)) return { allowed: true };

  const redirectTo =
    FALLBACK_ROUTES.find((route) => {
      const needed = requiredPermissions(route);
      return !!needed && has(needed);
    }) ?? null;
  return { allowed: false, redirectTo };
}
