export const WHATSAPP_SECTIONS = [
  { key: "chat", label: "Conversas e Kanban", path: "/dashboard/chat", group: "Atendimento" },
  { key: "sessions", label: "Números e conexão", path: "/dashboard/sessions", group: "Atendimento" },
  { key: "panel", label: "Painel", path: "/dashboard", group: "Atendimento" },
  { key: "broadcast", label: "Transmissão", path: "/dashboard/broadcast", group: "Atendimento" },
  { key: "interactive", label: "Testador interativo", path: "/dashboard/interactive", group: "Atendimento" },
  { key: "stickers", label: "Figurinhas", path: "/dashboard/sticker", group: "Atendimento" },
  { key: "contacts", label: "Contatos", path: "/dashboard/contacts", group: "Contatos" },
  { key: "groups", label: "Grupos", path: "/dashboard/groups", group: "Contatos" },
  { key: "labels", label: "Etiquetas", path: "/dashboard/labels", group: "Contatos" },
  { key: "bot", label: "Configurações do bot", path: "/dashboard/bot-settings", group: "Automação" },
  { key: "autoreply", label: "Respostas automáticas", path: "/dashboard/autoreply", group: "Automação" },
  { key: "profile", label: "Perfil do bot", path: "/dashboard/profile", group: "Automação" },
  { key: "scheduler", label: "Agendamentos", path: "/dashboard/scheduler", group: "Automação" },
  { key: "webhooks", label: "Webhooks e API", path: "/dashboard/webhooks", group: "Automação" },
  { key: "media", label: "Arquivos e mídias", path: "/dashboard/media", group: "Configurações" },
  { key: "access", label: "Acesso aos números", path: "/dashboard/sessions/access", group: "Configurações" },
  { key: "users", label: "Usuários do WhatsApp", path: "/dashboard/users", group: "Configurações" },
  { key: "settings", label: "Configurações gerais", path: "/dashboard/settings", group: "Configurações" },
  { key: "monitor", label: "Monitor do sistema", path: "/dashboard/system-monitor", group: "Configurações" },
  { key: "notifications", label: "Notificações", path: "/dashboard/notifications", group: "Configurações" },
  { key: "docs", label: "Documentação da API", path: "/docs", group: "Desenvolvedor" },
  { key: "swagger", label: "Swagger", path: "/swagger", group: "Desenvolvedor" },
] as const;

export function whatsappSection(value: unknown) {
  return WHATSAPP_SECTIONS.find(section => section.key === value) ?? WHATSAPP_SECTIONS[0];
}
