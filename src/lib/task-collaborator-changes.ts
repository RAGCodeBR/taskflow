export function taskCollaboratorChanges(
  loadedIds: readonly string[],
  currentIds: readonly string[],
  selectedIds: readonly string[],
) {
  const loaded = new Set(loadedIds);
  const current = new Set(currentIds);
  const selected = new Set(selectedIds);

  return {
    // Never remove a collaborator added by someone else after this editor opened.
    removedIds: [...loaded].filter((id) => !selected.has(id) && current.has(id)),
    addedIds: [...selected].filter((id) => !current.has(id)),
  };
}
