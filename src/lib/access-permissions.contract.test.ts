import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const usersSource = readFileSync(resolve("src/routes/_app/users.tsx"), "utf8");
const accessManagerSource = readFileSync(
  resolve("supabase/functions/admin-user-access/index.ts"),
  "utf8",
);

function optionKeys(source: string): string[] {
  const options = source.match(/const ACCESS_OPTIONS = \[([\s\S]*?)\] as const;/)?.[1];
  if (!options) throw new Error("Lista de acessos da tela não encontrada.");
  return [...options.matchAll(/\["([a-z_]+)",\s*"[^"]+"\]/g)].map((match) => match[1]);
}

function permissionKeys(source: string, name: string): string[] {
  const list = source.match(new RegExp(`const ${name} = (?:new Set\\()?\\[([\\s\\S]*?)\\]`))?.[1];
  if (!list) throw new Error(`Lista ${name} não encontrada na função de acessos.`);
  return [...list.matchAll(/"([a-z_]+)"/g)].map((match) => match[1]);
}

describe("user access contract", () => {
  it("saves every permission offered in the access form", () => {
    const displayed = optionKeys(usersSource);
    const accepted = permissionKeys(accessManagerSource, "validPermissions");
    expect(displayed.length).toBeGreaterThan(0);
    expect(displayed.filter((key) => !accepted.includes(key))).toEqual([]);
  });

  it("includes every displayed permission in the administrator set", () => {
    const displayed = optionKeys(usersSource);
    const admin = permissionKeys(accessManagerSource, "allAdminPermissions");
    expect(displayed.filter((key) => !admin.includes(key))).toEqual([]);
  });
});
