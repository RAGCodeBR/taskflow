/** Metas do app instalado na Tela de Início (iPhone). Nada aqui muda o desktop. */
export const installedAppMeta: { name: string; content: string; media?: string }[] = [
  { name: "apple-mobile-web-app-capable", content: "yes" },
  { name: "mobile-web-app-capable", content: "yes" },
  { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  { name: "apple-mobile-web-app-title", content: "TaskFlow" },
  // Safari do Mac também pinta a barra de abas com theme-color: só no celular.
  { name: "theme-color", content: "#142e63", media: "(max-width: 767px)" },
];
