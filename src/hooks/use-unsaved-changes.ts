import { useEffect, useRef, useState } from "react";

export function useUnsavedChanges({ open, dirty, busy, onClose, onSave, onDiscard }: {
  open: boolean;
  dirty: boolean;
  busy: boolean;
  onClose: () => void;
  /** The existing save flow closes the form only after a confirmed save. */
  onSave: () => Promise<unknown>;
  onDiscard?: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const saveRequested = useRef(false);
  useEffect(() => { if (!open) setConfirming(false); }, [open]);
  useEffect(() => {
    if (!open || (!dirty && !busy)) return;
    const preventUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", preventUnload);
    return () => window.removeEventListener("beforeunload", preventUnload);
  }, [open, dirty, busy]);

  return {
    confirming: open && confirming,
    requestClose: () => {
      if (busy || saveRequested.current) return;
      if (dirty) setConfirming(true);
      else onClose();
    },
    continueEditing: () => { if (!busy) setConfirming(false); },
    discard: () => {
      if (busy || saveRequested.current) return;
      setConfirming(false);
      onDiscard?.();
      onClose();
    },
    saveAndLeave: async () => {
      if (busy || saveRequested.current) return;
      saveRequested.current = true;
      // Validation errors belong to the form; never close it from this prompt.
      setConfirming(false);
      try { await onSave(); }
      finally { saveRequested.current = false; }
    },
  };
}
