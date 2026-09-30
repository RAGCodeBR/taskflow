import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useTaskTags, type TaskTag } from "@/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_COLOR = "#6366f1";

function normalizeHexColor(value: string) {
  const normalized = value.trim().startsWith("#") ? value.trim() : `#${value.trim()}`;
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized.toLowerCase() : null;
}

function ColorField({
  color,
  onChange,
  label,
}: {
  color: string;
  onChange: (color: string) => void;
  label: string;
}) {
  const validColor = normalizeHexColor(color) ?? DEFAULT_COLOR;
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        aria-label={label}
        value={validColor}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-10 cursor-pointer rounded border bg-transparent p-0.5"
      />
      <Input
        aria-label={`${label} em hexadecimal`}
        value={color}
        onChange={(event) => onChange(event.target.value)}
        placeholder="#6366f1"
        className="h-9 w-28 font-mono text-xs"
      />
    </div>
  );
}

export function MarketingFormatSettings() {
  const { user, isAdmin, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const { data: formats = [] } = useTaskTags();
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [saving, setSaving] = useState(false);

  if (!isAdmin || activeWorkspace?.slug !== "marketing") return null;

  const refresh = () => qc.invalidateQueries({ queryKey: ["task_tags"] });

  const create = async () => {
    const trimmedName = name.trim();
    const validColor = normalizeHexColor(color);
    if (!user || !trimmedName) return;
    if (!validColor) {
      toast.error("Use uma cor hexadecimal válida, como #6366f1.");
      return;
    }
    if (
      formats.some(
        (format) =>
          format.name.trim().toLocaleLowerCase("pt-BR") ===
          trimmedName.toLocaleLowerCase("pt-BR"),
      )
    ) {
      toast.error("Já existe um formato com esse nome.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await (supabase.from("task_tags") as any).insert({
        name: trimmedName,
        color: validColor,
        position: formats.length,
        created_by: user.id,
        workspace_id: activeWorkspace.id,
      });
      if (error) throw error;
      setName("");
      await refresh();
      toast.success("Formato criada.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const update = async (format: TaskTag, patch: Partial<TaskTag>) => {
    const color = patch.color ? normalizeHexColor(patch.color) : format.color;
    if (!color) {
      toast.error("Use uma cor hexadecimal válida, como #6366f1.");
      return;
    }
    try {
      const { error } = await (supabase.from("task_tags") as any)
        .update({ ...patch, color })
        .eq("id", format.id);
      if (error) throw error;
      await refresh();
      toast.success("Formato atualizada.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const remove = async (format: TaskTag) => {
    if (
      !window.confirm(
        `Excluir o formato “${format.name}”? A formato será removida das tarefas que a utilizam.`,
      )
    )
      return;
    try {
      const { error } = await (supabase.from("task_tags") as any).delete().eq("id", format.id);
      if (error) throw error;
      await refresh();
      toast.success("Formato excluída.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="space-y-4 border-0 p-0 shadow-none">
      <div>
        <p className="text-sm text-muted-foreground">
          Crie formatos como Vídeo, Post ou Carrossel. Escolha qualquer cor pelo seletor ou
          informe o código hexadecimal.
        </p>
      </div>
      <div className="rounded-lg border p-3">
        <Label htmlFor="marketing-format-name" className="text-xs">
          Novo formato
        </Label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="marketing-format-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Vídeo"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void create();
              }
            }}
          />
          <ColorField color={color} onChange={setColor} label="Cor da novo formato" />
          <Button type="button" onClick={() => void create()} disabled={saving || !name.trim()}>
            <Plus className="mr-1.5 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {formats.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            Nenhum formato criada ainda.
          </p>
        ) : (
          formats.map((format) => (
            <CategoryRow key={format.id} format={format} onSave={update} onDelete={remove} />
          ))
        )}
      </div>
    </Card>
  );
}

function CategoryRow({
  format,
  onSave,
  onDelete,
}: {
  format: TaskTag;
  onSave: (format: TaskTag, patch: Partial<TaskTag>) => Promise<void>;
  onDelete: (format: TaskTag) => Promise<void>;
}) {
  const [name, setName] = useState(format.name);
  const [color, setColor] = useState(format.color);
  const dirty = name.trim() !== format.name || color !== format.color;
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border p-2">
      <ColorField color={color} onChange={setColor} label={`Cor de ${format.name}`} />
      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="h-9 min-w-44 flex-1"
      />
      {dirty ? (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          aria-label={`Salvar ${format.name}`}
          onClick={() => void onSave(format, { name: name.trim(), color })}
        >
          <Save className="h-4 w-4" />
        </Button>
      ) : null}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label={`Excluir ${format.name}`}
        className="text-destructive hover:text-destructive"
        onClick={() => void onDelete(format)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
