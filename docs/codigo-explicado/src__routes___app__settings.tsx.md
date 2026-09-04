# src/routes/_app/settings.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `﻿import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { ImageUp, Loader2, Trash2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 14 | `export const Route = createFileRoute("/_app/settings")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 15 | `  component: Settings,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `const MAX_AVATAR_SIZE = 5 * 1024 * 1024;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 20 | `const AVATAR_PREVIEW_SIZE = 176;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `async function createCroppedAvatar(file: File, zoom: number, offset: { x: number; y: number }) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  const source = new Image();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 24 | `  const sourceUrl = URL.createObjectURL(file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 25 | `  try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 26 | `    await new Promise<void>((resolve, reject) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 27 | `      source.onload = () => resolve();` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 28 | `      source.onerror = () => reject(new Error("Não foi possível ler a imagem."));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 29 | `      source.src = sourceUrl;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 31 | `    const size = 512;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `    const scale = Math.max(size / source.naturalWidth, size / source.naturalHeight) * zoom;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `    const canvas = document.createElement("canvas");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 34 | `    canvas.width = size;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `    canvas.height = size;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `    const context = canvas.getContext("2d");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `    if (!context) throw new Error("Não foi possível preparar a imagem.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 38 | `    context.drawImage(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `      source,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `      (size - source.naturalWidth * scale) / 2 + (offset.x * size) / AVATAR_PREVIEW_SIZE,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `      (size - source.naturalHeight * scale) / 2 + (offset.y * size) / AVATAR_PREVIEW_SIZE,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `      source.naturalWidth * scale,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `      source.naturalHeight * scale,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 45 | `    const blob = await new Promise<Blob | null>((resolve) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `      canvas.toBlob(resolve, "image/jpeg", 0.9),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 48 | `    if (!blob) throw new Error("Não foi possível recortar a imagem.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 49 | `    return new File([blob], "avatar.jpg", { type: "image/jpeg" });` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 50 | `  } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `    URL.revokeObjectURL(sourceUrl);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `function Settings() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 56 | `  const { profile, user, refreshProfile } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const [name, setName] = useState(profile?.full_name ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  const [avatarFile, setAvatarFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url ?? null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const [removeAvatar, setRemoveAvatar] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  const [avatarZoom, setAvatarZoom] = useState(1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  const dragRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 68 | `    setName(profile?.full_name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `    if (!avatarFile) setAvatarPreview(profile?.avatar_url ?? null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 70 | `  }, [profile, avatarFile]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 72 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 73 | `    if (!avatarFile) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 74 | `    const preview = URL.createObjectURL(avatarFile);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `    setAvatarPreview(preview);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `    return () => URL.revokeObjectURL(preview);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 77 | `  }, [avatarFile]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `  const selectAvatar = (file: File | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `    if (!file) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 81 | `    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 82 | `      toast.error("Use uma imagem PNG, JPG ou WebP.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 84 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 85 | `    if (file.size > MAX_AVATAR_SIZE) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 86 | `      toast.error("A foto deve ter no máximo 5 MB.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 88 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 89 | `    setRemoveAvatar(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `    setAvatarZoom(1);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `    setAvatarOffset({ x: 0, y: 0 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `    setAvatarFile(file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `  const limitOffset = (next: { x: number; y: number }, zoom = avatarZoom) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 96 | `    const limit = ((zoom - 1) * AVATAR_PREVIEW_SIZE) / 2;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 97 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 98 | `      x: Math.max(-limit, Math.min(limit, next.x)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `      y: Math.max(-limit, Math.min(limit, next.y)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 101 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 102 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 103 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 104 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 105 | `    const fullName = name.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 106 | `    if (!fullName) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 107 | `      toast.error("Informe seu nome completo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 109 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 110 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 111 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 113 | `      let avatarUrl = removeAvatar ? null : (profile?.avatar_url ?? null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `      if (avatarFile) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 115 | `        const croppedAvatar = await createCroppedAvatar(avatarFile, avatarZoom, avatarOffset);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `        const path = \`${user.id}/avatar-${Date.now()}.jpg\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 117 | `        const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 118 | `          .from("profile-avatars")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `          .upload(path, croppedAvatar, { contentType: "image/jpeg", upsert: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `        if (uploadError) throw uploadError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 121 | `        avatarUrl = supabase.storage.from("profile-avatars").getPublicUrl(path).data.publicUrl;` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 122 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 123 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 124 | `      const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 125 | `        .from("profiles")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `        .update({ full_name: fullName, avatar_url: avatarUrl })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `        .eq("id", user.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 130 | `      setAvatarFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `      setRemoveAvatar(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `      await refreshProfile();` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 133 | `      await queryClient.invalidateQueries({ queryKey: ["profiles"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 134 | `      toast.success("Perfil atualizado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `      toast.error((error as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 140 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 141 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 142 | `  const initials = (name || user?.email || "U").slice(0, 2).toUpperCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 143 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 144 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 145 | `    <div className="mx-auto max-w-2xl space-y-6 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 146 | `      <header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 147 | `        <h1 className="text-2xl font-bold tracking-tight">Personalização</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `        <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 149 | `          Edite seu perfil e escolha a foto usada no Kanban.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 151 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 153 | `      <Card className="space-y-5 p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 154 | `        <div className="flex flex-wrap items-center gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `          {avatarFile ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `            <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 157 | `              className="relative h-44 w-44 shrink-0 touch-none overflow-hidden rounded-full border bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 158 | `              onPointerDown={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 159 | `                event.currentTarget.setPointerCapture(event.pointerId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `                dragRef.current = {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `                  x: event.clientX,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `                  y: event.clientY,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `                  offsetX: avatarOffset.x,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `                  offsetY: avatarOffset.y,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `                };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 166 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `              onPointerMove={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 168 | `                if (!dragRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 169 | `                setAvatarOffset(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `                  limitOffset({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `                    x: dragRef.current.offsetX + event.clientX - dragRef.current.x,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `                    y: dragRef.current.offsetY + event.clientY - dragRef.current.y,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `                  }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 175 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `              onPointerUp={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 177 | `                dragRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `              <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 181 | `                src={avatarPreview || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `                alt="Prévia do enquadramento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `                className="h-full w-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 184 | `                style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `                  transform: \`translate(${avatarOffset.x}px, ${avatarOffset.y}px) scale(${avatarZoom})\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `                draggable={false}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 190 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `            <Avatar className="h-20 w-20 border">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 192 | `              <AvatarImage` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 193 | `                src={removeAvatar ? undefined : avatarPreview || undefined}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `                alt="Sua foto de perfil"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `              <AvatarFallback className="text-lg">{initials}</AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 197 | `            </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 198 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `          <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 200 | `            <Label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 201 | `              htmlFor="profile-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `              className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 203 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `              <ImageUp className="h-4 w-4" /> Escolher foto` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 205 | `            </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 206 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 207 | `              id="profile-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `              type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `              accept="image/png,image/jpeg,image/webp"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `              className="sr-only"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 211 | `              onChange={(event) => selectAvatar(event.target.files?.[0] ?? null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 212 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `            <p className="text-xs text-muted-foreground">PNG, JPG ou WebP, até 5 MB.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 214 | `            {avatarFile && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `              <div className="space-y-1 pt-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `                <Label htmlFor="avatar-zoom" className="text-xs">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `                  Enquadrar foto · arraste para reposicionar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `                </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 220 | `                  id="avatar-zoom"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `                  type="range"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `                  min="1"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `                  max="2.5"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `                  step="0.01"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `                  value={avatarZoom}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `                  onChange={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 227 | `                    const nextZoom = Number(event.target.value);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 228 | `                    setAvatarZoom(nextZoom);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `                    setAvatarOffset(limitOffset(avatarOffset, nextZoom));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `                  className="w-full accent-[#183b72]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 232 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 234 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `            {(avatarPreview || profile?.avatar_url) && !removeAvatar && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 237 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `                size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `                className="h-auto px-0 text-destructive hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `                onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 242 | `                  setAvatarFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `                  setRemoveAvatar(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `                  setAvatarPreview(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `                <Trash2 className="mr-1 h-3.5 w-3.5" /> Remover foto` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 249 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 253 | `        <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `          <Label htmlFor="profile-name">Nome completo</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `          <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 256 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `        <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `          <Label>E-mail</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `          <Input value={user?.email ?? ""} disabled />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `        <Button onClick={save} disabled={saving}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `          {saving ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `            <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 264 | `              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 265 | `            </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 266 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `            "Salvar perfil"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 270 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 271 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 272 | `      <Card className="p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 273 | `        <h2 className="font-semibold">Como a foto é usada</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 274 | `        <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 275 | `          Sua foto aparece nos cards do Kanban quando você for responsável ou colaborador de uma` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `          tarefa.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 278 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 279 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 280 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 281 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 282 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
