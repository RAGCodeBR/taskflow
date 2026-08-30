import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ImageUp, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const AVATAR_PREVIEW_SIZE = 176;

async function createCroppedAvatar(file: File, zoom: number, offset: { x: number; y: number }) {
  const source = new Image();
  const sourceUrl = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      source.onload = () => resolve();
      source.onerror = () => reject(new Error("Não foi possível ler a imagem."));
      source.src = sourceUrl;
    });
    const size = 512;
    const scale = Math.max(size / source.naturalWidth, size / source.naturalHeight) * zoom;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Não foi possível preparar a imagem.");
    context.drawImage(
      source,
      (size - source.naturalWidth * scale) / 2 + (offset.x * size) / AVATAR_PREVIEW_SIZE,
      (size - source.naturalHeight * scale) / 2 + (offset.y * size) / AVATAR_PREVIEW_SIZE,
      source.naturalWidth * scale,
      source.naturalHeight * scale,
    );
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.9),
    );
    if (!blob) throw new Error("Não foi possível recortar a imagem.");
    return new File([blob], "avatar.jpg", { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function Settings() {
  const { profile, user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();
  const [name, setName] = useState(profile?.full_name ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url ?? null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarZoom, setAvatarZoom] = useState(1);
  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    setName(profile?.full_name ?? "");
    if (!avatarFile) setAvatarPreview(profile?.avatar_url ?? null);
  }, [profile, avatarFile]);

  useEffect(() => {
    if (!avatarFile) return;
    const preview = URL.createObjectURL(avatarFile);
    setAvatarPreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [avatarFile]);

  const selectAvatar = (file: File | null) => {
    if (!file) return;
    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Use uma imagem PNG, JPG ou WebP.");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      toast.error("A foto deve ter no máximo 5 MB.");
      return;
    }
    setRemoveAvatar(false);
    setAvatarZoom(1);
    setAvatarOffset({ x: 0, y: 0 });
    setAvatarFile(file);
  };

  const limitOffset = (next: { x: number; y: number }, zoom = avatarZoom) => {
    const limit = ((zoom - 1) * AVATAR_PREVIEW_SIZE) / 2;
    return {
      x: Math.max(-limit, Math.min(limit, next.x)),
      y: Math.max(-limit, Math.min(limit, next.y)),
    };
  };

  const save = async () => {
    if (!user) return;
    const fullName = name.trim();
    if (!fullName) {
      toast.error("Informe seu nome completo.");
      return;
    }

    setSaving(true);
    try {
      let avatarUrl = removeAvatar ? null : (profile?.avatar_url ?? null);
      if (avatarFile) {
        const croppedAvatar = await createCroppedAvatar(avatarFile, avatarZoom, avatarOffset);
        const path = `${user.id}/avatar-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("profile-avatars")
          .upload(path, croppedAvatar, { contentType: "image/jpeg", upsert: false });
        if (uploadError) throw uploadError;
        avatarUrl = supabase.storage.from("profile-avatars").getPublicUrl(path).data.publicUrl;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, avatar_url: avatarUrl })
        .eq("id", user.id);
      if (error) throw error;

      setAvatarFile(null);
      setRemoveAvatar(false);
      await refreshProfile();
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Perfil atualizado");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const initials = (name || user?.email || "U").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Personalização</h1>
        <p className="text-sm text-muted-foreground">
          Edite seu perfil e escolha a foto usada no Kanban.
        </p>
      </header>

      <Card className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-4">
          {avatarFile ? (
            <div
              className="relative h-44 w-44 shrink-0 touch-none overflow-hidden rounded-full border bg-muted"
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                dragRef.current = {
                  x: event.clientX,
                  y: event.clientY,
                  offsetX: avatarOffset.x,
                  offsetY: avatarOffset.y,
                };
              }}
              onPointerMove={(event) => {
                if (!dragRef.current) return;
                setAvatarOffset(
                  limitOffset({
                    x: dragRef.current.offsetX + event.clientX - dragRef.current.x,
                    y: dragRef.current.offsetY + event.clientY - dragRef.current.y,
                  }),
                );
              }}
              onPointerUp={() => {
                dragRef.current = null;
              }}
            >
              <img
                src={avatarPreview || undefined}
                alt="Prévia do enquadramento"
                className="h-full w-full object-cover"
                style={{
                  transform: `translate(${avatarOffset.x}px, ${avatarOffset.y}px) scale(${avatarZoom})`,
                }}
                draggable={false}
              />
            </div>
          ) : (
            <Avatar className="h-20 w-20 border">
              <AvatarImage
                src={removeAvatar ? undefined : avatarPreview || undefined}
                alt="Sua foto de perfil"
              />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-2">
            <Label
              htmlFor="profile-avatar"
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <ImageUp className="h-4 w-4" /> Escolher foto
            </Label>
            <Input
              id="profile-avatar"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(event) => selectAvatar(event.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-muted-foreground">PNG, JPG ou WebP, até 5 MB.</p>
            {avatarFile && (
              <div className="space-y-1 pt-1">
                <Label htmlFor="avatar-zoom" className="text-xs">
                  Enquadrar foto · arraste para reposicionar
                </Label>
                <input
                  id="avatar-zoom"
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.01"
                  value={avatarZoom}
                  onChange={(event) => {
                    const nextZoom = Number(event.target.value);
                    setAvatarZoom(nextZoom);
                    setAvatarOffset(limitOffset(avatarOffset, nextZoom));
                  }}
                  className="w-full accent-[#183b72]"
                />
              </div>
            )}
            {(avatarPreview || profile?.avatar_url) && !removeAvatar && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto px-0 text-destructive hover:text-destructive"
                onClick={() => {
                  setAvatarFile(null);
                  setRemoveAvatar(true);
                  setAvatarPreview(null);
                }}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Remover foto
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile-name">Nome completo</Label>
          <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : (
            "Salvar perfil"
          )}
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold">Como a foto é usada</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sua foto aparece nos cards do Kanban quando você for responsável ou colaborador de uma
          tarefa.
        </p>
      </Card>
    </div>
  );
}
