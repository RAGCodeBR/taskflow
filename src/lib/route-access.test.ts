import { describe, expect, it } from "vitest";
import { decideRouteAccess } from "./route-access";

const collaborator = (permissions: string[]) => ({ isAdmin: false, permissions });

describe("decideRouteAccess", () => {
  it("abre a página quando a pessoa tem a permissão do menu", () => {
    expect(decideRouteAccess("/clients/directory", collaborator(["clients"]))).toEqual({
      allowed: true,
    });
  });

  it("nega o endereço direto sem a permissão e manda para a primeira página permitida", () => {
    expect(decideRouteAccess("/clients/abc/edit", collaborator(["tasks", "agenda"]))).toEqual({
      allowed: false,
      redirectTo: "/tasks",
    });
    expect(decideRouteAccess("/agenda", collaborator(["mural", "tasks"]))).toEqual({
      allowed: false,
      redirectTo: "/mural",
    });
  });

  it("protege também as páginas que não aparecem no menu", () => {
    const access = collaborator(["tasks"]);
    expect(decideRouteAccess("/import-ata", access).allowed).toBe(false);
    expect(decideRouteAccess("/notes", access).allowed).toBe(false);
    expect(decideRouteAccess("/client-report/abc", access).allowed).toBe(false);
    expect(decideRouteAccess("/notes", collaborator(["clients"])).allowed).toBe(true);
  });

  it("não confunde endereços com o mesmo começo", () => {
    expect(decideRouteAccess("/client-report/abc", collaborator(["clients"])).allowed).toBe(true);
    expect(decideRouteAccess("/crm", collaborator(["clients"])).allowed).toBe(false);
  });

  it("aceita a permissão antiga do portal", () => {
    expect(decideRouteAccess("/portal/financeiro", collaborator(["portal"])).allowed).toBe(true);
    expect(decideRouteAccess("/portal/financeiro", collaborator(["portal_entregas"]))).toEqual({
      allowed: false,
      redirectTo: "/portal/entregas",
    });
  });

  it("deixa com a própria página as rotas que têm regra especial", () => {
    const access = collaborator(["tasks"]);
    expect(decideRouteAccess("/meetings", access).allowed).toBe(true);
    expect(decideRouteAccess("/ambientes", access).allowed).toBe(true);
    expect(decideRouteAccess("/requests", access).allowed).toBe(true);
  });

  it("administradores entram em tudo", () => {
    expect(decideRouteAccess("/crm", { isAdmin: true, permissions: [] }).allowed).toBe(true);
  });

  it("sem nenhuma permissão carregada, não expulsa a pessoa da página", () => {
    expect(decideRouteAccess("/tasks/kanban", collaborator([])).allowed).toBe(true);
  });

  it("nunca redireciona para uma página que também seria negada", () => {
    const decision = decideRouteAccess("/dashboard", collaborator(["users"]));
    expect(decision).toEqual({ allowed: false, redirectTo: null });
  });
});
