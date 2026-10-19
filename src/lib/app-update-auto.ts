/** Automatic reloads must never interrupt an edit or an offline write. */
export function canAutoInstallAppUpdate({
  online,
  visible,
  hasOpenEditor,
  hasPendingWrites,
  hasRecentInput,
}: {
  online: boolean;
  visible: boolean;
  hasOpenEditor: boolean;
  hasPendingWrites: boolean;
  hasRecentInput: boolean;
}) {
  return online && visible && !hasOpenEditor && !hasPendingWrites && !hasRecentInput;
}
