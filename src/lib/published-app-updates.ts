import { APP_UPDATES, type AppUpdate, type UpdateWorkspace } from "./app-updates";

export type PublishedAppUpdate = Pick<
  AppUpdate,
  "id" | "title" | "date" | "audience" | "workspaces"
>;

// Generated from the same catalogue as the UI; never maintain a second version list.
export function publishedAppUpdates() {
  return {
    releases: APP_UPDATES.map(({ id, title, date, audience, workspaces }) => ({
      id,
      title,
      date,
      audience,
      workspaces,
    })),
  };
}

export function readPublishedAppUpdates(value: unknown): PublishedAppUpdate[] {
  if (
    !value ||
    typeof value !== "object" ||
    !("releases" in value) ||
    !Array.isArray(value.releases)
  )
    throw new Error("Não foi possível verificar a versão publicada. Tente novamente.");
  if (
    !value.releases.length ||
    !value.releases.every((release: unknown) => {
      if (!release || typeof release !== "object") return false;
      const row = release as Record<string, unknown>;
      return (
        typeof row.id === "string" &&
        row.id.length > 0 &&
        typeof row.title === "string" &&
        row.title.length > 0 &&
        typeof row.date === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(row.date) &&
        (row.audience === "all" || row.audience === "admin") &&
        Array.isArray(row.workspaces) &&
        row.workspaces.length > 0 &&
        row.workspaces.every(
          (workspace) => workspace === "marketing" || workspace === "consultoria",
        )
      );
    })
  )
    throw new Error("Não foi possível verificar a versão publicada. Tente novamente.");
  return value.releases as PublishedAppUpdate[];
}

export function newerPublishedAppUpdate(
  releases: readonly PublishedAppUpdate[],
  installed: readonly AppUpdate[],
  isAdmin: boolean,
  workspace?: string,
) {
  const latest = releases.find(
    (release) =>
      release.workspaces.includes(workspace as UpdateWorkspace) &&
      (release.audience === "all" || isAdmin),
  );
  if (!latest || !installed.length || installed.some((release) => release.id === latest.id))
    return null;
  // A preview/local build or a server rollback must not be advertised as an upgrade.
  return latest.date >= installed[0].date ? latest : null;
}
