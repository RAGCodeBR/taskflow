import {
  AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function UnsavedChangesDialog({ open, onContinue, onDiscard, onSave, description }: {
  open: boolean;
  onContinue: () => void;
  onDiscard: () => void;
  onSave: () => Promise<unknown>;
  description?: string;
}) {
  const continueButton = useRef<HTMLButtonElement>(null);
  return <AlertDialog open={open} onOpenChange={(next) => { if (!next) onContinue(); }}>
    <AlertDialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-2xl p-5" onOpenAutoFocus={(event) => {
      event.preventDefault();
      continueButton.current?.focus();
    }}>
      <AlertDialogHeader>
        <AlertDialogTitle>Salvar alterações antes de sair?</AlertDialogTitle>
        <AlertDialogDescription>{description ?? "Há alterações que ainda não foram salvas. Escolha se deseja salvá-las ou continuar editando."}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
        <Button onClick={() => void onSave()}>Salvar e sair</Button>
        <Button variant="outline" ref={continueButton} onClick={onContinue}>Continuar editando</Button>
        <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={onDiscard}>Descartar alterações</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
