# src/routes/_app/mural.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `  Check,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  Download,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  GripVertical,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  ImageIcon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  Maximize2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  Minimize2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  Pin,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  PinOff,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  RotateCcw,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  SmilePlus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `  Upload,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import { useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 30 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 31 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 32 | `  Select,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  SelectContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  SelectItem,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  SelectTrigger,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  SelectValue,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `} from "@/components/ui/select";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `import { Switch } from "@/components/ui/switch";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 39 | `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 41 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 42 | `  Dialog,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  DialogContent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  DialogFooter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  DialogHeader,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `  DialogTitle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `} from "@/components/ui/dialog";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 48 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 49 | `import { muralUnreadKey } from "@/hooks/use-mural-unread";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 50 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 51 | `export const Route = createFileRoute("/_app/mural")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 52 | `  component: MuralPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `type ChecklistItem = { text: string; done: boolean };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 56 | `type MuralPost = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 57 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 58 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 59 | `  content: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `  color: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `  tag: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `  image_url: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `  checklist: ChecklistItem[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `  created_by: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `  completed_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `  is_pinned: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `  is_featured: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `  expires_at: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  card_size: CardSize;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `  text_style: TextStyle;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 72 | `  canvas_x: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  canvas_y: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 74 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 75 | `type MuralAttachment = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 76 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `  post_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 79 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 83 | `type MuralReaction = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 84 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 85 | `  post_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `  user_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `  emoji: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 90 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 91 | `const COLORS = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 92 | `  { value: "sky", label: "Azul", card: "bg-sky-100 text-sky-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `  { value: "amber", label: "Amarelo", card: "bg-amber-100 text-amber-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `  { value: "violet", label: "Lilás", card: "bg-violet-100 text-violet-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `  { value: "green", label: "Verde", card: "bg-green-100 text-green-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `  { value: "rose", label: "Rosa", card: "bg-pink-100 text-pink-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `  { value: "red", label: "Vermelho", card: "bg-red-100 text-red-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `  { value: "stone", label: "Cinza", card: "bg-slate-100 text-slate-950" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `] as const;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `const POST_CATEGORIES = ["Aviso", "Notícia", "Norma", "Regulamento", "Evento"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 103 | `type CardSize = "compact" | "normal" | "large";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 104 | `type TextStyle =` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 105 | `  | "clean"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `  | "handwritten"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `  | "pen"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `  | "marker"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `  | "casual"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `  | "scribble"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  | "architect"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  | "editorial"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `  | "typewriter";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 115 | `const CARD_SIZES: { value: CardSize; label: string }[] = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 116 | `  { value: "compact", label: "Compacto" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  { value: "normal", label: "Normal" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `  { value: "large", label: "Destaque" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `const TEXT_STYLES: { value: TextStyle; label: string; css: CSSProperties }[] = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `  { value: "handwritten", label: "Manuscrito (Caveat)", css: { fontFamily: "Caveat, cursive" } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `  { value: "pen", label: "Caneta (Kalam)", css: { fontFamily: "Kalam, cursive" } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `    value: "marker",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `    label: "Marcador (Patrick Hand)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `    css: { fontFamily: "Patrick Hand, cursive" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 129 | `  { value: "casual", label: "Casual (Indie Flower)", css: { fontFamily: "Indie Flower, cursive" } },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `    value: "scribble",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `    label: "Rabisco (Shadows Into Light)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `    css: { fontFamily: "Shadows Into Light, cursive" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 135 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `    value: "architect",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `    label: "Arquiteto (Architects Daughter)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `    css: { fontFamily: "Architects Daughter, cursive" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 140 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `    value: "clean",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `    label: "Padrão (Sem serifa)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `    css: { fontFamily: "Inter, system-ui, sans-serif" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 145 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `    value: "editorial",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `    label: "Clássico (Serifa)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `    css: { fontFamily: "Georgia, 'Times New Roman', serif" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 150 | `  {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `    value: "typewriter",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `    label: "Máquina (Mono)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `    css: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.92em" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `  },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 155 | `];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 157 | `const QUICK_EMOJIS = ["📌", "✨", "💡", "🚀", "✅", "⚠️", "🎉", "❤️"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `const REACTION_EMOJIS = ["👍", "❤️", "🎉", "👏", "💡", "👀"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 159 | `const CANVAS_WIDTH = 3200;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 160 | `const CANVAS_HEIGHT = 2200;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 161 | `const CARD_GAP = 20;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 162 | `const cardFallbackSize = (size: CardSize) => ({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 163 | `  width: size === "large" ? 560 : size === "compact" ? 256 : 320,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `  height: size === "large" ? 420 : size === "compact" ? 220 : 300,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 166 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 167 | `const emptyForm = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `  title: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `  content: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `  tag: "Aviso",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `  imageUrl: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `  checklist: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `  color: "sky",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `  cardSize: "normal" as CardSize,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `  textStyle: "clean" as TextStyle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `  isPinned: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `  isFeatured: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `  expiresAt: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 180 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 181 | `function colorClass(color: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 182 | `  return COLORS.find((item) => item.value === color)?.card ?? COLORS[0].card;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 183 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 184 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 185 | `function textStyleCss(style: TextStyle | null | undefined) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 186 | `  return TEXT_STYLES.find((item) => item.value === style)?.css ?? TEXT_STYLES[0].css;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 187 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 188 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 189 | `function profileName(` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 190 | `  profiles: Array<{ id: string; full_name: string | null; email?: string | null }>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `  userId?: string,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `  const name = profiles.find((profile) => profile.id === userId)?.full_name;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `  return name?.split(" ")[0] || "equipe";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 195 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 196 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 197 | `function MuralPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 198 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 199 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 200 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `  const [open, setOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `  const [form, setForm] = useState(emptyForm);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `  const [editingPost, setEditingPost] = useState<MuralPost | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 204 | `  const [postFilter, setPostFilter] = useState<"all" | "pinned" | "open" | "completed">("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `  const [draggingId, setDraggingId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 206 | `  const [frontCardId, setFrontCardId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 207 | `  const [draftPositions, setDraftPositions] = useState<Record<string, { x: number; y: number }>>(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 208 | `    {},` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 210 | `  const [uploadingPostId, setUploadingPostId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 211 | `  const hasMarkedCurrentVisitRead = useRef(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 212 | `  const canvasViewportRef = useRef<HTMLDivElement | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 213 | `  const topCanvasScrollRef = useRef<HTMLDivElement | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 214 | `  const canvasRef = useRef<HTMLDivElement | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 215 | `  const postRefs = useRef(new Map<string, HTMLElement>());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 216 | `  const activeDragRef = useRef<{` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `    id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `    pointerId: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 219 | `    offsetX: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `    offsetY: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `  } | null>(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `  const draftPositionsRef = useRef<Record<string, { x: number; y: number }>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 223 | `  const { data: posts = [], isLoading } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 224 | `    queryKey: ["mural_posts"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 226 | `      const { data, error } = await (supabase.from("mural_posts") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 227 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `        .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 230 | `      return (data ?? []).map((post: any) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 231 | `        ...post,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `        checklist: Array.isArray(post.checklist) ? post.checklist : [],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 233 | `        is_pinned: !!post.is_pinned,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `        is_featured: !!post.is_featured,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `        expires_at: post.expires_at ?? null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `        card_size: post.card_size ?? "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `        text_style: post.text_style ?? "clean",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `        canvas_x: post.canvas_x ?? 520,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `        canvas_y: post.canvas_y ?? 180,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `      })) as MuralPost[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 242 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 243 | `  const { data: attachments = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 244 | `    queryKey: ["mural_post_attachments"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 246 | `      const { data, error } = await (supabase.from("mural_post_attachments") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `        .select("id, post_id, file_name, storage_path, mime_type, size_bytes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 250 | `      return (data ?? []) as MuralAttachment[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 251 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 253 | `  const { data: reactions = [] } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 254 | `    queryKey: ["mural_post_reactions"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 256 | `      const { data, error } = await (supabase.from("mural_post_reactions") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 257 | `        .select("id, post_id, user_id, emoji, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 260 | `      return (data ?? []) as MuralReaction[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 261 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 262 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 263 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 264 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `    if (!user || isLoading || hasMarkedCurrentVisitRead.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 266 | `    hasMarkedCurrentVisitRead.current = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `    void (async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 268 | `      const { error } = await (supabase.from("notifications") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 269 | `        .update({ is_read: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `        .eq("user_id", user.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 271 | `        .eq("is_read", false)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `        .in("type", ["mural_post", "mural_reaction"]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `      if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 274 | `        hasMarkedCurrentVisitRead.current = false;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `        toast.error(\`Não foi possível atualizar a leitura do mural: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 277 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 278 | `      await qc.invalidateQueries({ queryKey: muralUnreadKey(user.id) });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 279 | `    })();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `  }, [isLoading, qc, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 282 | `  const savePost = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 283 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 284 | `      if (!user) throw new Error("Sua sessão expirou. Entre novamente.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 285 | `      if (!form.title.trim()) throw new Error("Informe o título do post-it.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 286 | `      const checklist = form.checklist` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 287 | `        .split("\n")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `        .map((text) => text.trim())` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 289 | `        .filter(Boolean)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `        .map((text) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 291 | `          text,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `          done: editingPost?.checklist.find((item) => item.text === text)?.done ?? false,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 293 | `        }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `      const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 295 | `        title: form.title.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `        content: form.content.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `        tag: form.tag.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `        image_url: form.imageUrl.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `        color: form.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `        checklist,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `        card_size: form.cardSize,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `        text_style: form.textStyle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `        is_pinned: form.isPinned,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `        is_featured: form.isFeatured,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `        expires_at: form.expiresAt || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 307 | `      const newPostPosition = editingPost ? null : findAvailableCanvasPosition(form.cardSize);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 308 | `      const { data, error } = editingPost` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 309 | `        ? await (supabase.from("mural_posts") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 310 | `            .update(payload)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `            .eq("id", editingPost.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `            .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `            .single()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `        : await (supabase.from("mural_posts") as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 315 | `            .insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `              ...payload,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `              created_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `              canvas_x: newPostPosition?.x,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `              canvas_y: newPostPosition?.y,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `            .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `            .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 324 | `      return data as MuralPost;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 325 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 326 | `    onSuccess: (savedPost) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 327 | `      qc.invalidateQueries({ queryKey: ["mural_posts"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `      if (!editingPost) setFrontCardId(savedPost.id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 329 | `      setOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `      setForm(emptyForm);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `      setEditingPost(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 332 | `      toast.success(editingPost ? "Post-it atualizado." : "Post-it publicado no mural.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 334 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 335 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 336 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 337 | `  const updateChecklist = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 338 | `    mutationFn: async ({ post, index }: { post: MuralPost; index: number }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 339 | `      const checklist = post.checklist.map((item, itemIndex) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 340 | `        itemIndex === index ? { ...item, done: !item.done } : item,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 342 | `      const { error } = await (supabase.from("mural_posts") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 343 | `        .update({ checklist })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `        .eq("id", post.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 346 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 347 | `    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 348 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 349 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 350 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 351 | `  const removePost = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `    mutationFn: async (id: string) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 353 | `      const { error } = await (supabase.from("mural_posts") as any).delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 354 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 355 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 356 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 357 | `      qc.invalidateQueries({ queryKey: ["mural_posts"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `      toast.success("Post-it removido.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 360 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 361 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 362 | `  const setPostCompleted = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 363 | `    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 364 | `      const { error } = await (supabase.from("mural_posts") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 365 | `        // Um recado concluído deixa automaticamente de ocupar a área de fixados.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 366 | `        .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `          completed_at: completed ? new Date().toISOString() : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `          ...(completed ? { is_pinned: false } : {}),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `        })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 370 | `        .eq("id", id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 372 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 373 | `    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 374 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 375 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 376 | `  const updatePostPresentation = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 377 | `    mutationFn: async ({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `      id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `      patch,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `    }: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `      id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `      patch: Partial<Pick<MuralPost, "is_pinned" | "card_size" | "canvas_x" | "canvas_y">>;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `    }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 384 | `      const { error } = await (supabase.from("mural_posts") as any).update(patch).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 385 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 386 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 387 | `    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_posts"] }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 388 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 389 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 390 | `  const toggleReaction = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 391 | `    mutationFn: async ({ postId, emoji }: { postId: string; emoji: string }) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 392 | `      if (!user) throw new Error("Sua sessão expirou. Entre novamente.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 393 | `      const current = reactions.find(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `        (reaction) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 395 | `          reaction.post_id === postId && reaction.user_id === user.id && reaction.emoji === emoji,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 397 | `      const { error } = current` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 398 | `        ? await (supabase.from("mural_post_reactions") as any).delete().eq("id", current.id)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 399 | `        : await (supabase.from("mural_post_reactions") as any).insert({` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 400 | `            post_id: postId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `            user_id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 402 | `            emoji,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `          });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 404 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 405 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 406 | `    onSuccess: () => qc.invalidateQueries({ queryKey: ["mural_post_reactions"] }),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 407 | `    onError: (error: Error) => toast.error(error.message),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 408 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 409 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 410 | `  const orderedPosts = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 411 | `    return posts` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 412 | `      .filter((post) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 413 | `        if (post.expires_at && new Date(\`${post.expires_at}T23:59:59\`) < new Date()) return false;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 414 | `        if (postFilter === "pinned") return post.is_pinned;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 415 | `        if (postFilter === "open") return !post.completed_at;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 416 | `        if (postFilter === "completed") return !!post.completed_at;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 417 | `        return !post.completed_at;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 418 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 419 | `      .sort((a, b) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 420 | `        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 421 | `        if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 422 | `        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 423 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 424 | `  }, [posts, postFilter]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `  const openNewPost = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 426 | `    setEditingPost(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `    setForm(emptyForm);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `    setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 430 | `  const openEditPost = (post: MuralPost) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 431 | `    setEditingPost(post);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `    setForm({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `      title: post.title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 434 | `      content: post.content ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 435 | `      tag: POST_CATEGORIES.includes(post.tag ?? "") ? (post.tag ?? "Aviso") : "Aviso",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `      imageUrl: post.image_url ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `      checklist: post.checklist.map((item) => item.text).join("\n"),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 438 | `      color: post.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `      cardSize: post.card_size ?? "normal",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `      textStyle: post.text_style ?? "clean",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 441 | `      isPinned: post.is_pinned,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `      isFeatured: post.is_featured,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `      expiresAt: post.expires_at ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 445 | `    setOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 447 | `  const findOpenCanvasPosition = (post: MuralPost, requestedX: number, requestedY: number) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 448 | `    const card = postRefs.current.get(post.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 449 | `    const fallback = cardFallbackSize(post.card_size);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 450 | `    const width = card?.offsetWidth ?? fallback.width;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 451 | `    const height = card?.offsetHeight ?? fallback.height;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 452 | `    const maxX = CANVAS_WIDTH - width - CARD_GAP;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 453 | `    const maxY = CANVAS_HEIGHT - height - CARD_GAP;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 454 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 455 | `      x: Math.max(CARD_GAP, Math.min(Math.round(requestedX), maxX)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `      y: Math.max(CARD_GAP, Math.min(Math.round(requestedY), maxY)),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 458 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 459 | `  const findAvailableCanvasPosition = (cardSize: CardSize) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 460 | `    const { width, height } = cardFallbackSize(cardSize);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 461 | `    const viewport = canvasViewportRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 462 | `    const preferredX = Math.max(CARD_GAP, (viewport?.scrollLeft ?? 0) + 48);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 463 | `    const preferredY = Math.max(CARD_GAP, (viewport?.scrollTop ?? 0) + 48);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 464 | `    const maxX = CANVAS_WIDTH - width - CARD_GAP;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 465 | `    const maxY = CANVAS_HEIGHT - height - CARD_GAP;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 466 | `    const overlapsExistingCard = (x: number, y: number) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 467 | `      orderedPosts.some((post) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 468 | `        const element = postRefs.current.get(post.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 469 | `        const fallback = cardFallbackSize(post.card_size);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 470 | `        const otherWidth = element?.offsetWidth ?? fallback.width;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 471 | `        const otherHeight = element?.offsetHeight ?? fallback.height;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 472 | `        const position = draftPositionsRef.current[post.id] ?? {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 473 | `          x: post.canvas_x,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `          y: post.canvas_y,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `        };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 476 | `        return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 477 | `          x < position.x + otherWidth + CARD_GAP &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `          x + width + CARD_GAP > position.x &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `          y < position.y + otherHeight + CARD_GAP &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 480 | `          y + height + CARD_GAP > position.y` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 482 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 483 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 484 | `    // Só a criação procura espaço vazio. Depois de criado, o usuário pode` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 485 | `    // mover livremente e sobrepor cartões sem o mural travar.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 486 | `    let x = Math.min(preferredX, maxX);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 487 | `    let y = Math.min(preferredY, maxY);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 488 | `    for (let attempt = 0; overlapsExistingCard(x, y) && attempt < 600; attempt += 1) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 489 | `      x += 40;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `      if (x > maxX) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 491 | `        x = CARD_GAP;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `        y += 40;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `        if (y > maxY) y = CARD_GAP;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 494 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 495 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 496 | `    return { x, y };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 497 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 498 | `  const setDraftPosition = (id: string, position: { x: number; y: number }) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 499 | `    draftPositionsRef.current = { ...draftPositionsRef.current, [id]: position };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 500 | `    setDraftPositions(draftPositionsRef.current);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 502 | `  const startCanvasDrag = (event: PointerEvent<SVGSVGElement>, post: MuralPost) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 503 | `    if (!(isAdmin || post.created_by === user?.id) || !canvasRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 504 | `    event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `    event.currentTarget.setPointerCapture(event.pointerId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `    const rect = canvasRef.current.getBoundingClientRect();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 507 | `    const current = draftPositionsRef.current[post.id] ?? { x: post.canvas_x, y: post.canvas_y };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 508 | `    activeDragRef.current = {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `      id: post.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `      pointerId: event.pointerId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `      offsetX: event.clientX - rect.left - current.x,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `      offsetY: event.clientY - rect.top - current.y,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 514 | `    setFrontCardId(post.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `    setDraggingId(post.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 517 | `  const moveCanvasDrag = (event: PointerEvent<SVGSVGElement>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 518 | `    const activeDrag = activeDragRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 519 | `    const post = orderedPosts.find((item) => item.id === activeDrag?.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 520 | `    const canvas = canvasRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 521 | `    if (!activeDrag || activeDrag.pointerId !== event.pointerId || !post || !canvas) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 522 | `    const rect = canvas.getBoundingClientRect();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 523 | `    setDraftPosition(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `      post.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 525 | `      findOpenCanvasPosition(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `        post,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `        event.clientX - rect.left - activeDrag.offsetX,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `        event.clientY - rect.top - activeDrag.offsetY,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 531 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 532 | `  const finishCanvasDrag = (event: PointerEvent<SVGSVGElement>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 533 | `    const activeDrag = activeDragRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 534 | `    if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 535 | `    const position = draftPositionsRef.current[activeDrag.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 536 | `    activeDragRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `    setDraggingId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `    if (position)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 539 | `      updatePostPresentation.mutate({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `        id: activeDrag.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 541 | `        patch: { canvas_x: position.x, canvas_y: position.y },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 543 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 544 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 545 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 546 | `    const viewport = canvasViewportRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 547 | `    const topScroll = topCanvasScrollRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 548 | `    if (viewport) viewport.scrollLeft = 420;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 549 | `    if (topScroll) topScroll.scrollLeft = 420;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 550 | `  }, []);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `  const uploadFiles = async (post: MuralPost, files: FileList) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 552 | `    if (!user || files.length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 553 | `    setUploadingPostId(post.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 554 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 555 | `      for (const file of Array.from(files)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 556 | `        const safeName = file.name` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 557 | `          .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `          .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `          .replace(/[^a-zA-Z0-9._-]+/g, "_");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `        const path = \`mural/${post.id}/${crypto.randomUUID()}-${safeName}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 561 | `        const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 562 | `          .from("mural-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `          .upload(path, file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `        if (uploadError) throw uploadError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 565 | `        const { error: insertError } = await (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 566 | `          supabase.from("mural_post_attachments") as any` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 567 | `        ).insert({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `          post_id: post.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `          file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `          storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `          mime_type: file.type || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `          size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `          uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 575 | `        if (insertError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 576 | `          await supabase.storage.from("mural-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 577 | `          throw insertError;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 578 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 579 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 580 | `      qc.invalidateQueries({ queryKey: ["mural_post_attachments"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `      toast.success("Anexo adicionado ao post-it.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 582 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 583 | `      toast.error((error as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 584 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `      setUploadingPostId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 586 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 587 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 588 | `  const downloadAttachment = async (attachment: MuralAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 589 | `    const { data, error } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 590 | `      .from("mural-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `      .createSignedUrl(attachment.storage_path, 60);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `    if (error || !data) return toast.error(error?.message ?? "Não foi possível baixar o anexo.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 593 | `    const response = await fetch(data.signedUrl);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 594 | `    if (!response.ok) return toast.error("Não foi possível baixar o anexo.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 595 | `    const url = URL.createObjectURL(await response.blob());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 596 | `    const link = document.createElement("a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 597 | `    link.href = url;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `    link.download = attachment.file_name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `    link.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 600 | `    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 601 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 602 | `  const deleteAttachment = async (attachment: MuralAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 603 | `    if (!confirm(\`Excluir "${attachment.file_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 604 | `    const { error: storageError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 605 | `      .from("mural-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `      .remove([attachment.storage_path]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `    if (storageError) return toast.error(storageError.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 608 | `    const { error } = await (supabase.from("mural_post_attachments") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 609 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `      .eq("id", attachment.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 612 | `    qc.invalidateQueries({ queryKey: ["mural_post_attachments"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 613 | `    toast.success("Anexo excluído.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 614 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 615 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 616 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 617 | `    <div className="mural-la min-h-full bg-background px-4 py-5 text-[#313532] sm:px-7 sm:py-7">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 618 | `      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 619 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 620 | `          <p className="mural-subtle text-[11px] text-[#8a9089]">Mural LA</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 621 | `          <h1 className="mt-1 text-2xl font-semibold tracking-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 622 | `            Olá, {profileName(profiles, user?.id)} 👋` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `          </h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 624 | `          <p className="mural-subtle mt-1 text-sm text-[#747a74]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `            Recados, normas e novidades compartilhadas com a equipe.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 626 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 627 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `        <div className="flex gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 629 | `          <Button className="h-9 rounded-full px-4 shadow-sm" onClick={openNewPost}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 630 | `            <Plus className="h-4 w-4" /> Novo recado` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 631 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 632 | `          <Dialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 633 | `            open={open}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `            onOpenChange={(next) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 635 | `              setOpen(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `              if (!next) setEditingPost(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 637 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `            <DialogContent className="max-h-[86dvh] w-[calc(100vw-2rem)] max-w-6xl overflow-y-auto border-0 bg-[#ebe9e5] p-5 shadow-2xl sm:p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 640 | `              <DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 641 | `                <DialogTitle className="text-xl tracking-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 642 | `                  {editingPost ? "Editar recado no mural" : "Novo recado no mural"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 643 | `                </DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 644 | `              </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 645 | `              <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 646 | `                <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 647 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 648 | `                    <Label>Título *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 649 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 650 | `                      className="h-12 border-[#e3e7ed] bg-transparent text-base shadow-none"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 651 | `                      value={form.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `                      onChange={(event) => setForm({ ...form, title: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 653 | `                      placeholder="Ex.: Reunião geral na sexta-feira"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 656 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 657 | `                    <Label>Mensagem *</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 658 | `                    <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 659 | `                      className="min-h-[220px] resize-y border-[#e3e7ed] bg-transparent text-base shadow-none"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 660 | `                      value={form.content}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `                      onChange={(event) => setForm({ ...form, content: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 662 | `                      placeholder="Escreva o recado, norma ou aviso..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 664 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 665 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 666 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 667 | `                <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 668 | `                  <div className="grid grid-cols-2 gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 669 | `                    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 670 | `                      <Label>Categoria</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 671 | `                      <Select value={form.tag} onValueChange={(tag) => setForm({ ...form, tag })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 672 | `                        <SelectTrigger className="h-12 border-[#e3e7ed] bg-transparent text-base shadow-none">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 673 | `                          <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 674 | `                        </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 675 | `                        <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 676 | `                          {POST_CATEGORIES.map((category) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 677 | `                            <SelectItem key={category} value={category}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 678 | `                              {category}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `                            </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 680 | `                          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `                        </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 682 | `                      </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 683 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 684 | `                    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 685 | `                      <Label>Validade</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 686 | `                      <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 687 | `                        type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `                        className="h-12 border-[#e3e7ed] bg-transparent text-base shadow-none"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 689 | `                        value={form.expiresAt}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 690 | `                        onChange={(event) => setForm({ ...form, expiresAt: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 691 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 693 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 694 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 695 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 696 | `                    <Label>Cor do papel</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 697 | `                    <div className="flex flex-wrap gap-2.5" aria-label="Cor do papel">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 698 | `                      {COLORS.map((color) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 699 | `                        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 700 | `                          key={color.value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 701 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 702 | `                          aria-label={color.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `                          aria-pressed={form.color === color.value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 704 | `                          onClick={() => setForm({ ...form, color: color.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 705 | `                        className={\`h-7 w-7 rounded-full border border-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#287f80] focus-visible:ring-offset-2 ${color.card.split(" ")[0]} ${form.color === color.value ? "ring-2 ring-[#287f80] ring-offset-2" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 706 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 707 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 708 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 709 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 710 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 711 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 712 | `                    <Label>Estilo de letra</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `                    <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 714 | `                      value={form.textStyle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 715 | `                      onValueChange={(textStyle) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 716 | `                        setForm({ ...form, textStyle: textStyle as TextStyle })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 718 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 719 | `                      <SelectTrigger` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 720 | `                        className="h-12 bg-background text-base"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 721 | `                        style={textStyleCss(form.textStyle)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 722 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 723 | `                        <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 724 | `                      </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 725 | `                      <SelectContent className="max-h-80">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 726 | `                        {TEXT_STYLES.map((style) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 727 | `                          <SelectItem` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 728 | `                            key={style.value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 729 | `                            value={style.value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 730 | `                            style={textStyleCss(style.value)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 732 | `                            {style.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 733 | `                          </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 734 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 735 | `                      </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 736 | `                    </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 737 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 738 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 739 | `                  <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 740 | `                    className={\`relative rounded-md p-3.5 ${colorClass(form.color)}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 741 | `                    style={textStyleCss(form.textStyle)}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 742 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 743 | `                    <span className="absolute -top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded bg-white/35" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 744 | `                    <p className="text-base font-bold leading-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 745 | `                      {form.title || "Título do recado"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `                    <p className="mt-2 text-sm leading-relaxed opacity-80">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 748 | `                      {form.content || "A mensagem aparecerá assim no mural."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 749 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 750 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 751 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 752 | `                  <div className="flex items-center justify-between border-t border-[#d8d5cf] px-1 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 753 | `                    <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 754 | `                      <p className="font-medium">Fixar no topo</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 755 | `                      <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 756 | `                        Mantém este recado sempre visível` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 757 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 758 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 759 | `                    <Switch` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 760 | `                      checked={form.isPinned}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 761 | `                      onCheckedChange={(isPinned) => setForm({ ...form, isPinned })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 762 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 763 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 764 | `                  <div className="flex items-center justify-between border-t border-[#d8d5cf] px-1 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 765 | `                    <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 766 | `                      <p className="font-medium">Marcar como destaque</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 767 | `                      <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 768 | `                        Aparece em evidência no topo do mural` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 769 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 770 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 771 | `                    <Switch` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 772 | `                      checked={form.isFeatured}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 773 | `                      onCheckedChange={(isFeatured) => setForm({ ...form, isFeatured })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 774 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 776 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 777 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 778 | `              <details className="border-t border-[#d8d5cf] px-1 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 779 | `                <summary className="cursor-pointer font-medium">Opções avançadas</summary>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 780 | `                <div className="mt-4 grid gap-4 md:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 781 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 782 | `                    <Label>Tamanho no mural</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 783 | `                    <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 784 | `                      value={form.cardSize}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 785 | `                      onValueChange={(cardSize) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 786 | `                        setForm({ ...form, cardSize: cardSize as CardSize })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `                      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 788 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 789 | `                      <SelectTrigger className="bg-transparent shadow-none">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 790 | `                        <SelectValue />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 791 | `                      </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 792 | `                      <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 793 | `                        {CARD_SIZES.map((size) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 794 | `                          <SelectItem key={size.value} value={size.value}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 795 | `                            {size.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 796 | `                          </SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 797 | `                        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 798 | `                      </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 799 | `                    </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 800 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 801 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 802 | `                    <Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 803 | `                      Checklist{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `                      <span className="font-normal text-muted-foreground">(um item por linha)</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 805 | `                    </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 806 | `                    <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 807 | `                      value={form.checklist}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `                      onChange={(event) => setForm({ ...form, checklist: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 809 | `                      placeholder={"Preparar pauta\nConfirmar participantes"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 810 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 811 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 812 | `                  <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 813 | `                    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 814 | `                      <Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 815 | `                        Imagem{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `                        <span className="font-normal text-muted-foreground">(link opcional)</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 817 | `                      </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 818 | `                      <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 819 | `                        type="url"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `                        value={form.imageUrl}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `                        onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 822 | `                        placeholder="https://..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 825 | `                    <div className="flex flex-wrap gap-1.5" aria-label="Adicionar emoji à mensagem">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 826 | `                      {QUICK_EMOJIS.map((emoji) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 827 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 828 | `                          key={emoji}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 829 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 830 | `                          variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 831 | `                          size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 832 | `                          className="h-7 min-w-7 bg-background px-1.5 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 833 | `                          onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 834 | `                            setForm((current) => ({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 835 | `                              ...current,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 836 | `                              content: \`${current.content}${current.content ? " " : ""}${emoji}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 837 | `                            }))` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 838 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 839 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 840 | `                          {emoji}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 842 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 843 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 844 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 845 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 846 | `              </details>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 847 | `              <DialogFooter className="pt-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 848 | `                <Button variant="ghost" className="rounded-full" onClick={() => setOpen(false)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 849 | `                  Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 851 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 852 | `                  className="rounded-full px-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 853 | `                  disabled={savePost.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 854 | `                  onClick={() => savePost.mutate()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 855 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `                  {savePost.isPending` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 857 | `                    ? "Salvando..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 858 | `                    : editingPost` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `                      ? "Salvar alterações"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 860 | `                      : "Publicar post-it"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 861 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 862 | `              </DialogFooter>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 863 | `            </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 864 | `          </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 865 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 866 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 867 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 868 | `      <section className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 869 | `        {[` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 870 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 871 | `            label: "Recados em aberto",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 872 | `            value: posts.filter((post) => !post.completed_at).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 873 | `            tone: "bg-[#fff0cf] text-[#3d3d32]",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 874 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 875 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 876 | `            label: "Recados fixados",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 877 | `            value: posts.filter((post) => post.is_pinned && !post.completed_at).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 878 | `            tone: "bg-[#dff2fa] text-[#304248]",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 880 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `            label: "Reações da equipe",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 882 | `            value: reactions.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 883 | `            tone: "bg-[#dff5e9] text-[#32433a]",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 885 | `          {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `            label: "Recados concluídos",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `            value: posts.filter((post) => !!post.completed_at).length,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 888 | `            tone: "bg-[#f8e1ef] text-[#493742]",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `          },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 890 | `        ].map((metric) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 891 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 892 | `            key={metric.label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `            className={\`flex min-h-20 items-center justify-between rounded-xl px-4 py-3 shadow-[0_1px_0_rgb(0_0_0_/_0.05)] ${metric.tone}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 894 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 895 | `            <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 896 | `              <p className="text-sm font-medium">{metric.label}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 897 | `              <p className="mt-1 text-xs text-[#727973]">Atualização do mural</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 898 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 899 | `            <strong className="text-2xl font-semibold">{metric.value}</strong>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 900 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 901 | `        ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 902 | `      </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 903 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 904 | `      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 905 | `        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#858b85]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 906 | `          Em destaque` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 907 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 908 | `        <div className="mural-filter flex flex-wrap gap-1 rounded-full bg-white/70 p-1 text-xs shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 909 | `          {(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 910 | `            [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 911 | `              ["all", "Todos"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 912 | `              ["pinned", "Fixados"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `              ["open", "Em aberto"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 914 | `              ["completed", "Concluídos"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `            ] as const` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 916 | `          ).map(([value, label]) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 917 | `            <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 918 | `              key={value}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `              type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 920 | `              onClick={() => setPostFilter(value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 921 | `              className={\`rounded-full px-3 py-1 transition-colors ${postFilter === value ? "bg-[#d9efed] text-[#256e6f]" : "text-[#737a74] hover:bg-[#eeefea]"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 922 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 923 | `              {label}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 924 | `            </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 925 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 926 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 927 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 928 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 929 | `      {isLoading ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 930 | `        <div className="py-20 text-center text-sm text-[#747a74]">Carregando mural...</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 931 | `      ) : orderedPosts.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 932 | `        <div className="mural-empty grid min-h-72 place-items-center rounded-xl border border-dashed border-[#d9dcd5] bg-white/50 p-8 text-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 933 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 934 | `            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dff2fa] text-[#287f80]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 935 | `              <Pin className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 936 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 937 | `            <h2 className="font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 938 | `              {postFilter === "all"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 939 | `                ? "O mural está pronto para começar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `                : "Nenhum recado nesta visualização"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 941 | `            </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 942 | `            <p className="mt-1 text-sm text-[#747a74]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 943 | `              {postFilter === "all"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 944 | `                ? "Publique o primeiro recado para compartilhar uma ideia ou comunicado."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 945 | `                : "Use os filtros acima para navegar entre os outros recados."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 946 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 947 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 948 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 949 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 950 | `        <section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 951 | `          <div ref={canvasRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 952 | `            {orderedPosts.map((post, index) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 953 | `              const canEdit = isAdmin || post.created_by === user?.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 954 | `              const postAttachments = attachments.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 955 | `                (attachment) => attachment.post_id === post.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 956 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 957 | `              const postReactions = reactions.filter((reaction) => reaction.post_id === post.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 958 | `              const author = profiles.find((profile) => profile.id === post.created_by);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 959 | `              const authorName = author?.full_name ?? "Usuário";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 960 | `              const authorInitials = authorName` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 961 | `                .split(" ")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 962 | `                .filter(Boolean)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `                .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 964 | `                .map((name) => name[0])` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 965 | `                .join("")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 966 | `                .toUpperCase();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 967 | `              return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 968 | `                <article` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 969 | `                  key={post.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 970 | `                  ref={(node) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 971 | `                    if (node) postRefs.current.set(post.id, node);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 972 | `                    else postRefs.current.delete(post.id);` | Define o caminho alternativo da condicao anterior. |
| 973 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 974 | `                  className={\`group relative flex min-w-0 self-start flex-col rounded-md p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.07)] transition-transform duration-300 hover:-translate-y-0.5 hover:rotate-0 ${index % 3 === 0 ? "-rotate-1" : index % 3 === 1 ? "rotate-1" : "rotate-[0.5deg]"} ${post.card_size === "large" ? "min-h-[220px] md:col-span-2 p-6" : post.card_size === "compact" ? "min-h-[180px] max-w-xs p-3" : "min-h-[180px]"} ${post.is_pinned ? "ring-1 ring-[#287f80]/45" : ""} ${draggingId === post.id ? "opacity-75 shadow-xl" : ""} ${colorClass(post.color)}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 975 | `                  style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 976 | `                    ...textStyleCss(post.text_style),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 978 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 979 | `                  {index === 4 && <span className="sr-only">Mural</span>}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 980 | `                  {post.image_url && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 981 | `                    <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 982 | `                      src={post.image_url}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 983 | `                      alt=""` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `                      className="-mx-4 -mt-4 mb-4 h-36 w-[calc(100%+2rem)] object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 985 | `                      onError={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 986 | `                        event.currentTarget.style.display = "none";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 987 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 988 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 989 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 990 | `                  <div className="mb-2 flex items-start justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 991 | `                    <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 992 | `                      <p className="mb-2 inline-flex rounded-full bg-white/60 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 993 | `                        {post.tag || "Aviso"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 995 | `                      <h2` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 996 | `                        className={\`font-sans font-bold leading-tight ${post.card_size === "large" ? "text-xl" : "text-lg"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 997 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `                        {post.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 999 | `                      </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1000 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1001 | `                    {canEdit && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1002 | `                      <div className="-mr-2 -mt-2 flex opacity-0 transition-opacity group-hover:opacity-100">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1003 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1004 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1005 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1006 | `                          className="h-7 w-7 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1007 | `                          onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1008 | `                            updatePostPresentation.mutate({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1009 | `                              id: post.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1010 | `                              patch: { is_pinned: !post.is_pinned },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `                            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1013 | `                          title={post.is_pinned ? "Desafixar" : "Fixar à frente dos demais"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1014 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1015 | `                          {post.is_pinned ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1016 | `                            <PinOff className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1017 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1018 | `                            <Pin className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1019 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1020 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1021 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1022 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1023 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `                          className="h-7 w-7 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1025 | `                          onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1026 | `                            updatePostPresentation.mutate({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `                              id: post.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1028 | `                              patch: { card_size: post.card_size === "large" ? "normal" : "large" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1029 | `                            })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1030 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1031 | `                          title={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1032 | `                            post.card_size === "large"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1033 | `                              ? "Voltar ao tamanho normal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1034 | `                              : "Destacar e ampliar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1035 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1036 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1037 | `                          {post.card_size === "large" ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1038 | `                            <Minimize2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1039 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1040 | `                            <Maximize2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1041 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1042 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1043 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1044 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `                          className="h-7 w-7 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1047 | `                          onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1048 | `                            setPostCompleted.mutate({ id: post.id, completed: !post.completed_at })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1049 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1050 | `                          title={post.completed_at ? "Reabrir post-it" : "Concluir post-it"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1051 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1052 | `                          {post.completed_at ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1053 | `                            <RotateCcw className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1054 | `                          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1055 | `                            <Check className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1056 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1057 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1058 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1059 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1061 | `                          className="h-7 w-7 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1062 | `                          onClick={() => openEditPost(post)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1063 | `                          title="Editar post-it"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1064 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1065 | `                          <Pencil className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1066 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1067 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1068 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1069 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1070 | `                          className="h-7 w-7 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1071 | `                          onClick={() => removePost.mutate(post.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1072 | `                          title="Remover post-it"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1074 | `                          <Trash2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1075 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1076 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1077 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1079 | `                  {post.is_pinned && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1081 | `                      <Pin className="h-3 w-3" /> Fixado à frente` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1082 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1083 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `                  {post.content && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1085 | `                    <p` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1086 | `                      className={\`whitespace-pre-wrap leading-relaxed opacity-85 ${post.is_pinned ? "mt-2" : "mt-3"} ${post.card_size === "large" ? "text-base" : "text-sm"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1087 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1088 | `                      {post.content}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1089 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1090 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `                  {post.checklist.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `                    <div className="mt-4 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1093 | `                      {post.checklist.map((item, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1094 | `                        <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1095 | `                          key={\`${post.id}-${index}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1096 | `                          className={\`flex items-start gap-2 text-sm ${canEdit ? "cursor-pointer" : "cursor-default"}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1097 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1098 | `                          <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1099 | `                            disabled={!canEdit}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1100 | `                            checked={item.done}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `                            onCheckedChange={() => updateChecklist.mutate({ post, index })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1102 | `                          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `                          <span className={item.done ? "text-muted-foreground line-through" : ""}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1104 | `                            {item.text}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1105 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1106 | `                        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1107 | `                      ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1109 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `                  <div className="mt-4 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1111 | `                    {canEdit && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1112 | `                      <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1113 | `                        onFiles={(files) => uploadFiles(post, files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1114 | `                        disabled={uploadingPostId === post.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1116 | `                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed border-black/20 bg-white/25 px-2 py-2 text-xs font-medium hover:bg-white/40">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1117 | `                          <Upload className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1118 | `                          {uploadingPostId === post.id ? "Enviando..." : "Anexar arquivo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1119 | `                          <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1120 | `                            className="sr-only"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1121 | `                            type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1122 | `                            multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `                            onChange={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1124 | `                              if (event.target.files) void uploadFiles(post, event.target.files);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1125 | `                              event.currentTarget.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1126 | `                            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1127 | `                          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1128 | `                        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1129 | `                      </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1130 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1131 | `                    {postAttachments.map((attachment) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1132 | `                      <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1133 | `                        key={attachment.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1134 | `                        className="flex items-center gap-1 rounded bg-white/40 px-2 py-1.5 text-xs"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1135 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1136 | `                        <Paperclip className="h-3.5 w-3.5 shrink-0" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1137 | `                        <span className="min-w-0 flex-1 truncate" title={attachment.file_name}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1138 | `                          {attachment.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1140 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1141 | `                          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1142 | `                          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1143 | `                          className="h-6 w-6 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1144 | `                          onClick={() => void downloadAttachment(attachment)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1145 | `                          title="Baixar anexo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1146 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1147 | `                          <Download className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1148 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1149 | `                        {canEdit && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1150 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1151 | `                            variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1152 | `                            size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1153 | `                            className="h-6 w-6 text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1154 | `                            onClick={() => void deleteAttachment(attachment)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1155 | `                            title="Excluir anexo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1156 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1157 | `                            <Trash2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1158 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1159 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1160 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1161 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1163 | `                  <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-foreground/10 pt-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1164 | `                    <SmilePlus className="mr-0.5 h-3.5 w-3.5 opacity-60" aria-hidden="true" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1165 | `                    {REACTION_EMOJIS.map((emoji) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1166 | `                      const emojiReactions = postReactions.filter(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1167 | `                        (reaction) => reaction.emoji === emoji,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1168 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1169 | `                      const reactedByCurrentUser = emojiReactions.some(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1170 | `                        (reaction) => reaction.user_id === user?.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1171 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1172 | `                      const names = emojiReactions` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1173 | `                        .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1174 | `                          (reaction) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1175 | `                            profiles.find((profile) => profile.id === reaction.user_id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1176 | `                              ?.full_name ?? "Usuário",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1177 | `                        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1178 | `                        .join(", ");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1179 | `                      return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1180 | `                        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1181 | `                          key={emoji}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `                          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1183 | `                          variant={reactedByCurrentUser ? "secondary" : "ghost"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1184 | `                          size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1185 | `                          disabled={toggleReaction.isPending}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1186 | `                          onClick={() => toggleReaction.mutate({ postId: post.id, emoji })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1187 | `                          title={names ? \`${emoji} por ${names}\` : \`Reagir com ${emoji}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1188 | `                          className="h-7 min-w-7 gap-1 rounded-full px-1.5 text-xs text-current"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `                        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1190 | `                          <span>{emoji}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1191 | `                          {emojiReactions.length > 0 && <span>{emojiReactions.length}</span>}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1192 | `                        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1193 | `                      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1194 | `                    })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1195 | `                    {postReactions.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1196 | `                      <p className="basis-full pt-1 text-[10px] opacity-65">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1197 | `                        {postReactions` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1198 | `                          .map(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1199 | `                            (reaction) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1200 | `                              \`${profiles.find((profile) => profile.id === reaction.user_id)?.full_name ?? "Usuário"} ${reaction.emoji}\`,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1201 | `                          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1202 | `                          .join(" · ")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1203 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1204 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1205 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1206 | `                  {!post.image_url && !post.content && post.checklist.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1207 | `                    <ImageIcon className="mt-8 h-5 w-5 opacity-25" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1208 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1209 | `                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-foreground/10 pt-3 font-sans text-xs text-current/70">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1210 | `                    <div className="flex min-w-0 items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1211 | `                      <Avatar className="h-7 w-7 shrink-0 border border-white/70 shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1212 | `                        {author?.avatar_url && <AvatarImage src={author.avatar_url} alt={authorName} />}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1213 | `                        <AvatarFallback className="bg-white/65 text-[9px] font-semibold text-current">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1214 | `                          {authorInitials || "U"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `                        </AvatarFallback>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1216 | `                      </Avatar>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1217 | `                      <span className="truncate font-medium">{authorName}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1218 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1219 | `                    <time className="shrink-0 text-[11px]" dateTime={post.created_at}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1220 | `                      {format(new Date(post.created_at), "d 'de' MMM.", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1221 | `                    </time>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1222 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1223 | `                </article>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1224 | `              );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1225 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1226 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1227 | `        </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1228 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1230 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1231 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1232 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
