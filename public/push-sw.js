/* Importado pelo service worker gerado (workbox importScripts).
 * Só trata push e clique na notificação: não mexe em cache, install ou
 * activate, para não interferir no fluxo de atualização do app. */
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "TaskFlow", body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "TaskFlow";
  const options = {
    body: data.body || "",
    tag: data.tag,
    renotify: Boolean(data.tag),
    icon: "/taskflow-mark.png",
    badge: "/taskflow-mark.png",
    data: { url: data.url || "/tasks/list" },
  };
  const badge = typeof data.badge === "number" ? data.badge : null;
  event.waitUntil(
    Promise.all([
      self.registration.showNotification(title, options),
      badge !== null && self.navigator && "setAppBadge" in self.navigator
        ? (badge > 0 ? self.navigator.setAppBadge(badge) : self.navigator.clearAppBadge()).catch(
            () => undefined,
          )
        : Promise.resolve(),
    ]),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(
    (event.notification.data && event.notification.data.url) || "/tasks/list",
    self.location.origin,
  ).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          return (
            client
              .focus()
              .then((focused) =>
                focused && "navigate" in focused ? focused.navigate(target) : null,
              )
              // Janela não controlada pelo SW não aceita navigate: abre a tarefa numa nova.
              .then((result) => result || self.clients.openWindow(target))
              .catch(() => self.clients.openWindow(target))
          );
        }
      }
      return self.clients.openWindow(target);
    }),
  );
});
