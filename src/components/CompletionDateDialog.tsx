import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompletionDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: string) => void | Promise<void>;
}

/** Lets a quick completion retain the day the work was actually delivered. */
export function CompletionDateDialog({ open, onOpenChange, onConfirm }: CompletionDateDialogProps) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (open) setDate(today);
  }, [open, today]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Concluir tarefa</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="quick-completion-date">Data em que foi concluída</Label>
          <Input
            id="quick-completion-date"
            type="date"
            value={date}
            max={today}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Esta data é usada para saber se a entrega cumpriu o prazo, mesmo que você a registre
            depois.
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button disabled={!date} onClick={() => void onConfirm(date)}>
            Concluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
