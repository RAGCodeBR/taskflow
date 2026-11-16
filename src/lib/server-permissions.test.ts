import { describe, expect, it } from "vitest";
import { PermissionDeniedError, requireServerPermission } from "./server-permissions";

type Access = {
  roles?: string[];
  activeWorkspaceId?: string | null;
  memberships?: Array<{ workspace_id: string; permissions: unknown }>;
  general?: string[] | null;
  failing?: string;
};

/** Cliente mínimo que responde como o Supabase para as quatro leituras de acesso. */
function fakeClient(access: Access) {
  const result = (table: string, data: unknown) =>
    access.failing === table ? { data: null, error: { message: "falha" } } : { data, error: null };
  return {
    rpc: () => Promise.resolve({ data: access.activeWorkspaceId ?? null, error: null }),
    from: (table: string) => ({
      select: () => ({
        eq: () => {
          if (table === "user_roles") {
            return Promise.resolve(
              result(
                table,
                (access.roles ?? []).map((role) => ({ role })),
              ),
            );
          }
          if (table === "workspace_memberships") {
            return Promise.resolve(result(table, access.memberships ?? []));
          }
          return {
            maybeSingle: () =>
              Promise.resolve(
                result(table, access.general ? { permissions: access.general } : null),
              ),
          };
        },
      }),
    }),
  };
}

describe("requireServerPermission", () => {
  it("libera administradores mesmo sem a permissão listada", async () => {
    const access = await requireServerPermission(fakeClient({ roles: ["admin"] }), "user-1", [
      "import_ata",
    ]);
    expect(access.isAdmin).toBe(true);
  });

  it("usa as permissões do ambiente ativo, não as de outro ambiente", async () => {
    const client = fakeClient({
      roles: ["collaborator"],
      activeWorkspaceId: "marketing",
      memberships: [
        { workspace_id: "consultoria", permissions: ["import_ata"] },
        { workspace_id: "marketing", permissions: ["tasks"] },
      ],
      general: ["import_ata"],
    });
    await expect(requireServerPermission(client, "user-1", ["import_ata"])).rejects.toBeInstanceOf(
      PermissionDeniedError,
    );
    await expect(requireServerPermission(client, "user-1", ["tasks"])).resolves.toMatchObject({
      activeWorkspaceId: "marketing",
    });
  });

  it("aceita qualquer uma das permissões pedidas", async () => {
    const client = fakeClient({
      roles: ["collaborator"],
      activeWorkspaceId: "consultoria",
      memberships: [{ workspace_id: "consultoria", permissions: ["meetings"] }],
    });
    await expect(
      requireServerPermission(client, "user-1", ["import_ata", "meetings"]),
    ).resolves.toBeTruthy();
  });

  it("sem ambiente, recorre às permissões gerais do usuário", async () => {
    const client = fakeClient({ roles: ["collaborator"], general: ["import_ata"] });
    await expect(requireServerPermission(client, "user-1", ["import_ata"])).resolves.toBeTruthy();
  });

  it("nega quando não há sessão", async () => {
    await expect(
      requireServerPermission(fakeClient({ roles: ["admin"] }), null, ["import_ata"]),
    ).rejects.toBeInstanceOf(PermissionDeniedError);
  });

  it("nega, em vez de liberar, quando a leitura de acesso falha", async () => {
    await expect(
      requireServerPermission(fakeClient({ roles: ["admin"], failing: "user_roles" }), "user-1", [
        "import_ata",
      ]),
    ).rejects.toBeInstanceOf(PermissionDeniedError);
  });
});
