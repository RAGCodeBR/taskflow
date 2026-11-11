export function loginErrorMessage(error: unknown): string {
  const value = error as { code?: string; message?: string } | null;
  if (value?.code === "invalid_credentials" || /invalid login credentials/i.test(value?.message ?? "")) {
    return "E-mail ou senha não conferem. Confira os dados ou solicite a redefinição da senha ao administrador.";
  }
  if (value?.code === "email_not_confirmed") return "Confirme seu e-mail para acessar o sistema.";
  if (value?.code === "user_banned") return "Seu acesso está bloqueado. Entre em contato com o administrador.";
  if (/failed to fetch|network request failed/i.test(value?.message ?? "")) return "Não foi possível conectar. Confira sua conexão e tente novamente.";
  return value?.message || "Não foi possível entrar. Tente novamente.";
}
