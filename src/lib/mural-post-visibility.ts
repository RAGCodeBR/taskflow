/** A validade do recado é inclusiva e armazenada como data local (AAAA-MM-DD). */
export function isMuralPostCurrent(expiresAt: string | null, today: string): boolean {
  return !expiresAt || expiresAt >= today;
}
