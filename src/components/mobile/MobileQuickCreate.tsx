import { useState } from "react";
import { MobileFab } from "./MobileFab";
import { QuickTaskSheet, type QuickTaskValues } from "./QuickTaskSheet";

/** Botão + e folha de criação rápida. Renderize só no celular. */
export function MobileQuickCreate({
  workspaceId,
  defaults,
  onMoreDetails,
}: {
  workspaceId?: string | null;
  defaults?: { dueDate?: string; columnId?: string | null };
  onMoreDetails(values: QuickTaskValues): void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MobileFab onClick={() => setOpen(true)} />
      <QuickTaskSheet
        open={open}
        onOpenChange={setOpen}
        workspaceId={workspaceId}
        defaults={defaults}
        onMoreDetails={onMoreDetails}
      />
    </>
  );
}

/** Converte o que foi digitado na folha nos `defaults` do TaskDialog. */
export function quickValuesToDialogDefaults(values: QuickTaskValues) {
  return {
    title: values.title.trim() || undefined,
    clientId: values.clientId || undefined,
    // "" = sem responsável; null faria o TaskDialog escolher o usuário atual.
    assigneeId: values.assigneeId,
    dueDate: values.dueDate || undefined,
  };
}
