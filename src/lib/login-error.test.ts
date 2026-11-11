import { describe, expect, it } from "vitest";
import { loginErrorMessage } from "./login-error";
describe("login error messages", () => {
  it("explains a rejected password in Portuguese without changing credentials", () => {
    expect(loginErrorMessage({ code: "invalid_credentials", message: "Invalid login credentials" })).toContain("E-mail ou senha não conferem");
    expect(loginErrorMessage(new Error("Invalid login credentials"))).toContain("administrador");
  });
  it("distinguishes a network problem from a blocked account", () => {
    expect(loginErrorMessage(new Error("Failed to fetch"))).toContain("conexão");
    expect(loginErrorMessage({ code: "user_banned" })).toContain("bloqueado");
    expect(loginErrorMessage({ code: "email_not_confirmed" })).toContain("Confirme");
  });
});
