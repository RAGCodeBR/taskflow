// Private pilot: an administrator role by itself never grants this access.
export const WHATSAPP_PILOT_OWNER = {
  id: "f0265853-29fb-4301-bc58-d40f4d0c0493",
  email: "reinangrupoahouse@gmail.com",
} as const;

export function canUseLocalWhatsApp(
  user: { id?: string; email?: string | null } | null | undefined,
  isAdmin: boolean,
  localEnabled: boolean,
) {
  return localEnabled && isAdmin && user?.id === WHATSAPP_PILOT_OWNER.id &&
    user.email?.trim().toLowerCase() === WHATSAPP_PILOT_OWNER.email;
}
