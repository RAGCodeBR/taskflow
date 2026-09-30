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

export function MarketingCategorySettings() {
  const { user, isAdmin, activeWorkspace } = useAuth();
  const qc = useQueryClient();
  const { data: categories = [] } = useTaskTags();
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
      categories.some(
        (category) =>
          category.name.trim().toLocaleLowerCase("pt-BR") ===
          trimmedName.toLocaleLowerCase("pt-BR"),
      )
    ) {
      toast.error("Já existe uma categoria com esse nome.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await (supabase.from("task_tags") as any).insert({
        name: trimmedName,
        color: validColor,
        position: categories.length,
        created_by: user.id,
        workspace_id: activeWorkspace.id,
      });
      if (error) throw error;
      setName("");
      await refresh();
      toast.success("Categoria criada.");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const update = async (category: TaskTag, patch: Partial<TaskTag>) => {
    const color = patch.color ? normalizeHexColor(patch.color) : category.color;
    if (!color) {
      toast.error("Use uma cor hexadecimal válida, como #6366f1.");
      return;
    }
    try {
      const { error } = await (supabase.from("task_tags") as any)
        .update({ ...patch, color })
        .eq("id", category.id);
      if (error) throw error;
      await refresh();
      toast.success("Categoria atualizada.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const remove = async (category: TaskTag) => {
    if (
      !window.confirm(
        `Excluir a categoria “${category.name}”? A categoria será removida das tarefas que a utilizam.`,
      )
    )
      return;
    try {
      const { error } = await (supabase.from("task_tags") as any).delete().eq("id", category.id);
      if (error) throw error;
      await refresh();
      toast.success("Categoria excluída.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="space-y-4 border-0 p-0 shadow-none">
      <div>
        <p className="text-sm text-muted-foreground">
          Crie categorias como Vídeo, Post ou Carrossel. Escolha qualquer cor pelo seletor ou
          informe o código hexadecimal.
        </p>
      </div>
      <div className="rounded-lg border p-3">
        <Label htmlFor="marketing-category-name" className="text-xs">
          Nova categoria
        </Label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="marketing-category-name"
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
          <ColorField color={color} onChange={setColor} label="Cor da nova categoria" />
          <Button type="button" onClick={() => void create()} disabled={saving || !name.trim()}>
            <Plus className="mr-1.5 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            Nenhuma categoria criada ainda.
          </p>
        ) : (
          categories.map((category) => (
            <CategoryRow key={category.id} category={category} onSave={update} onDelete={remove} />
          ))
        )}
      </div>
    </Card>
  );
}

function CategoryRow({
  category,
  onSave,
  onDelete,
}: {
  category: TaskTag;
  onSave: (category: TaskTag, patch: Partial<TaskTag>) => Promise<void>;
  onDelete: (category: TaskTag) => Promise<void>;
}) {
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color);
  const dirty = name.trim() !== category.name || color !== category.color;
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border p-2">
      <ColorField color={color} onChange={setColor} label={`Cor de ${category.name}`} />
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
          aria-label={`Salvar ${category.name}`}
          onClick={() => void onSave(category, { name: name.trim(), color })}
        >
          <Save className="h-4 w-4" />
        </Button>
      ) : null}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label={`Excluir ${category.name}`}
        className="text-destructive hover:text-destructive"
        onClick={() => void onDelete(category)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
