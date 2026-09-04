# src/routes/_app/notes.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useCallback, useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { useClients, useProfiles } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Dialog, DialogContent } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `  Plus, Trash2, Highlighter, Bold, Italic, Underline, Eraser, NotebookPen, ExternalLink,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  ArrowUp, ArrowDown, Paperclip, FileText, Save, Sparkles, FileDown, Maximize2, Minimize2, Check, Loader2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `import { format, parseISO } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 18 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import { marked } from "marked";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `import { AttachmentPreviewDialog, type PreviewableAttachment } from "@/components/AttachmentPreviewDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 22 | `import { formatNoteWithAI } from "@/lib/ai-format.functions";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `export const Route = createFileRoute("/_app/notes")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 25 | `  component: NotesPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `const sb = supabase as any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 29 | `const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `type SortMode = "manual" | "date_desc" | "date_asc" | "updated_desc" | "title_asc";` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 32 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 33 | `interface ClientNote {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 34 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `  content: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 38 | `  content_html: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 39 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 40 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 41 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 42 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  note_date: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 44 | `  task_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  created_by: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `interface NoteAttachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 49 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  note_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 53 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 54 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 55 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 57 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 58 | `function escapeHtml(value: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 59 | `  return value` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 60 | `    .replace(/&/g, "&amp;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `    .replace(/</g, "&lt;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `    .replace(/>/g, "&gt;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 63 | `    .replace(/"/g, "&quot;")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `    .replace(/'/g, "&#39;");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 65 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `function normalizeNoteHtmlForPdf(rawHtml: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 68 | `  if (typeof window === "undefined") return rawHtml;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 69 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 70 | `  const parser = new DOMParser();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `  const doc = parser.parseFromString(rawHtml || "", "text/html");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const root = doc.body;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  root.querySelectorAll("script, style, meta, link, title, noscript, iframe, object").forEach((node) => node.remove());` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 75 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 76 | `  root.querySelectorAll<HTMLElement>("*").forEach((el) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 77 | `    const tag = el.tagName.toLowerCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `    const keepBackground = el.style.backgroundColor;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `    const keepColor = el.style.color;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `    const keepTextAlign = el.style.textAlign;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 81 | `    const keepFontWeight = el.style.fontWeight;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `    const keepFontStyle = el.style.fontStyle;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `    const keepTextDecoration = el.style.textDecoration;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 85 | `    el.removeAttribute("class");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `    el.removeAttribute("id");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `    el.removeAttribute("width");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 88 | `    el.removeAttribute("height");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `    el.removeAttribute("face");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `    el.removeAttribute("size");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `    el.removeAttribute("dir");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `    el.removeAttribute("data-start");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `    el.removeAttribute("data-end");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `    if (tag !== "a") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `      el.removeAttribute("href");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `      el.removeAttribute("target");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 98 | `      el.removeAttribute("rel");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `    const nextStyle = [` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `      keepBackground ? \`background-color: ${keepBackground}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `      keepColor ? \`color: ${keepColor}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `      keepTextAlign ? \`text-align: ${keepTextAlign}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      keepFontWeight && keepFontWeight !== "400" && keepFontWeight !== "normal" ? \`font-weight: ${keepFontWeight}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      keepFontStyle && keepFontStyle !== "normal" ? \`font-style: ${keepFontStyle}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      keepTextDecoration && keepTextDecoration !== "none" ? \`text-decoration: ${keepTextDecoration}\` : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `    ].filter(Boolean).join("; ");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 110 | `    if (nextStyle) el.setAttribute("style", nextStyle);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 111 | `    else el.removeAttribute("style");` | Define o caminho alternativo da condicao anterior. |
| 112 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 113 | `    if (tag === "font") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 114 | `      const fragment = doc.createDocumentFragment();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `      while (el.firstChild) fragment.appendChild(el.firstChild);` | Inicia uma repeticao sobre dados ou condicoes. |
| 116 | `      el.replaceWith(fragment);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  return root.innerHTML;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 121 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 122 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 123 | `function syncEditorDom(target: HTMLDivElement | null, html: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 124 | `  if (!target || target.innerHTML === html) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 125 | `  target.innerHTML = html;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 127 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 128 | `function extractTextFromHtml(rawHtml: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 129 | `  if (typeof window === "undefined") return rawHtml;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 130 | `  const doc = new DOMParser().parseFromString(rawHtml || "", "text/html");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 131 | `  return doc.body.textContent ?? "";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 132 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 133 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 134 | `function openNotePrintPreview({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 135 | `  title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 136 | `  dateLabel,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `  html,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `  dateLabel: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `  html: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `  const popup = window.open("", "_blank");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 144 | `  if (!popup) throw new Error("Não foi possível abrir a nova aba do PDF.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 145 | `  const previewCss = \`` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 146 | `    :root {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `      color-scheme: light;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `      --page-width: 210mm;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `      --page-padding-y: 20mm;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `      --page-padding-x: 18mm;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      --surface: #eef1f5;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 152 | `      --paper: #ffffff;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 153 | `      --ink: #1f2937;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `      --muted: #6b7280;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      --rule: #d1d5db;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `      --accent: #0f172a;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 158 | `    * { box-sizing: border-box; }` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 159 | `    html, body { margin: 0; padding: 0; background: var(--surface); color: var(--ink); }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `    body { font-family: Arial, Helvetica, sans-serif; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `    .preview-shell { min-height: 100vh; padding: 24px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 162 | `    .preview-toolbar {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `      position: sticky; top: 0; z-index: 5; display: flex; justify-content: center;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 164 | `      padding-bottom: 16px;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 165 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 166 | `    .preview-toolbar-inner {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 167 | `      display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--rule);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `      background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 169 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 170 | `    .toolbar-button {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `      border: 1px solid var(--rule); background: #fff; color: var(--accent); padding: 10px 14px; cursor: pointer;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `      font-size: 13px; font-weight: 600;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 174 | `    .toolbar-note { font-size: 12px; color: var(--muted); }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `    .paper {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `      width: min(100%, calc(var(--page-width) + 36mm)); margin: 0 auto; background: var(--paper);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 179 | `    .paper-inner {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `      padding: var(--page-padding-y) var(--page-padding-x) calc(var(--page-padding-y) + 2mm);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `      min-height: 297mm;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 183 | `    .doc-title {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `      margin: 0 0 10px; font-size: 28px; line-height: 1.1; font-weight: 700; color: var(--accent);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 186 | `    .doc-date {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 187 | `      margin: 0 0 22px; padding-bottom: 14px; border-bottom: 1px solid var(--rule); font-size: 13px; color: var(--muted);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 189 | `    .doc-body, .doc-body * {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `      max-width: 100%; letter-spacing: 0; word-break: normal; overflow-wrap: break-word;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 192 | `    .doc-body {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `      font-family: Georgia, 'Times New Roman', serif; font-size: 13.5pt; line-height: 1.7; color: var(--ink);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 195 | `    .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4 {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `      font-family: Arial, Helvetica, sans-serif; color: var(--accent); line-height: 1.25; break-after: avoid;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `      margin: 22px 0 10px;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 199 | `    .doc-body h1 { font-size: 22px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `    .doc-body h2 { font-size: 18px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `    .doc-body h3 { font-size: 16px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `    .doc-body p, .doc-body div { margin: 0 0 12px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `    .doc-body ul, .doc-body ol { margin: 0 0 14px; padding-left: 24px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `    .doc-body li { margin-bottom: 6px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `    .doc-body blockquote {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `      margin: 16px 0; padding: 0 0 0 14px; border-left: 3px solid #cbd5e1; color: #475569;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 208 | `    .doc-body table { width: 100%; border-collapse: collapse; margin: 14px 0; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `    .doc-body th, .doc-body td { border: 1px solid var(--rule); padding: 7px 8px; text-align: left; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `    .doc-body img { max-width: 100%; height: auto; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `    .doc-body pre, .doc-body code {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `      font-family: Consolas, Monaco, monospace; white-space: pre-wrap; word-break: break-word; font-size: 11.5pt;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 214 | `    .doc-body span[style*="background"] { padding: 0 2px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `    @page {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 216 | `      size: A4;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      margin: 18mm 16mm 20mm;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 219 | `    @media print {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `      html, body { background: #fff; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `      .preview-shell { padding: 0; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `      .preview-toolbar { display: none; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 223 | `      .paper {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `        width: auto; margin: 0; box-shadow: none;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 226 | `      .paper-inner {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `        min-height: auto; padding: 0;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 229 | `      .doc-title, .doc-date, .doc-body h1, .doc-body h2, .doc-body h3, .doc-body h4,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `      .doc-body p, .doc-body div, .doc-body ul, .doc-body ol, .doc-body table, .doc-body blockquote, .doc-body pre {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 231 | `        break-inside: avoid-page;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 233 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 234 | `  \`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 235 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 236 | `  popup.document.open();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `  popup.document.write(\`<!doctype html>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `    <html lang="pt-BR">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 239 | `      <head>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 240 | `        <meta charset="utf-8" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 241 | `        <meta name="viewport" content="width=device-width, initial-scale=1" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 242 | `        <title>${escapeHtml(title || "Anotação")}</title>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 243 | `        <style>${previewCss}</style>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 244 | `      </head>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 245 | `      <body>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 246 | `        <div class="preview-shell">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 247 | `          <div class="preview-toolbar">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 248 | `            <div class="preview-toolbar-inner">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 249 | `              <button class="toolbar-button" onclick="window.print()">Imprimir / Salvar em PDF</button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 250 | `              <button class="toolbar-button" onclick="window.close()">Fechar</button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 251 | `              <span class="toolbar-note">Pré-visualização limpa para impressão profissional.</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 252 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 253 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 254 | `          <article class="paper">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 255 | `            <div class="paper-inner">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 256 | `              <h1 class="doc-title">${escapeHtml(title || "Sem título")}</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 257 | `              <p class="doc-date">${escapeHtml(dateLabel)}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 258 | `              <div class="doc-body">${html}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 259 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 260 | `          </article>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 261 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 262 | `        <script>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 263 | `          window.addEventListener('load', () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 264 | `            setTimeout(() => window.print(), 250);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 265 | `          });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `        </script>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 267 | `      </body>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 268 | `    </html>\`);` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 269 | `  popup.document.close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 271 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 272 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 273 | `export function NotesWorkspace({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 274 | `  fixedClientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `  embedded = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `  fixedClientId?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `  embedded?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 281 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 282 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 283 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 284 | `  const [clientId, setClientId] = useState<string | null>(fixedClientId ?? null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 285 | `  const [notes, setNotes] = useState<ClientNote[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 286 | `  const [selectedId, setSelectedId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 287 | `  const [loading, setLoading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 288 | `  const autoCreatedFor = useRef<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 289 | `  const [search, setSearch] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 290 | `  const [createdBy, setCreatedBy] = useState("all");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 291 | `  const [sortMode, setSortMode] = useState<SortMode>(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 292 | `    if (typeof window === "undefined") return "manual";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 293 | `    return (localStorage.getItem("notes_sort_mode") as SortMode) || "manual";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 294 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 295 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 296 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 297 | `    if (typeof window !== "undefined") localStorage.setItem("notes_sort_mode", sortMode);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 298 | `  }, [sortMode]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 300 | `  // Administrators begin by seeing their own notes. They can explicitly choose` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 301 | `  // "Todos os usuários" whenever they need the team-wide view.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 302 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 303 | `    if (!user?.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 304 | `    setCreatedBy((current) => (current === "all" ? user.id : current));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 305 | `  }, [user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 307 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 308 | `    if (fixedClientId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 309 | `      setClientId(fixedClientId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `    } else if (!clientId && clients[0]) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `      setClientId(clients[0].id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 313 | `  }, [clients, clientId, fixedClientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 315 | `  const load = async (cid: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 316 | `    setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `    const { data, error } = await sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 318 | `      .from("client_notes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `      .eq("client_id", cid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `      .order("position", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `    setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 325 | `    const list = (data ?? []) as ClientNote[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 326 | `    setNotes(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `    if (list.length && !list.find((n) => n.id === selectedId)) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 328 | `      setSelectedId(list[0].id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 330 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 331 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 332 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 333 | `    if (clientId) void load(clientId);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 334 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 335 | `  }, [clientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 337 | `  const addNote = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 338 | `    if (!clientId || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 339 | `    const today = new Date().toISOString().slice(0, 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 340 | `    const minPos = notes.reduce((m, n) => Math.min(m, n.position), 0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 341 | `    const { data, error } = await sb.from("client_notes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 342 | `      client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `      title: "Nova anotação",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 344 | `      content: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `      content_html: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `      note_date: today,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 347 | `      created_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `      position: minPos - 1,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `    }).select().single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 351 | `    const created = data as ClientNote;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 352 | `    setNotes((n) => [created, ...n]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 353 | `    setSelectedId(created.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 355 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 356 | `  const deleteNote = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 357 | `    if (!confirm("Excluir esta anotação?")) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 358 | `    setNotes((n) => n.filter((x) => x.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 359 | `    if (selectedId === id) setSelectedId(null);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 360 | `    const { error } = await sb.from("client_notes").delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 361 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 362 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 363 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 364 | `  const patchNote = (id: string, patch: Partial<ClientNote>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 365 | `    setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 366 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 367 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 368 | `  const persistNote = async (id: string, patch: Partial<ClientNote>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 369 | `    const { error } = await sb.from("client_notes").update(patch).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 370 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 371 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 372 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 373 | `  const sortedNotes = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 374 | `    const arr = [...notes];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 375 | `    switch (sortMode) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 376 | `      case "date_desc":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `        arr.sort((a, b) => (b.note_date || "").localeCompare(a.note_date || ""));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 378 | `        break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `      case "date_asc":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `        arr.sort((a, b) => (a.note_date || "").localeCompare(b.note_date || ""));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 381 | `        break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `      case "updated_desc":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `        arr.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 384 | `        break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 385 | `      case "title_asc":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `        arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", "pt-BR"));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 387 | `        break;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 388 | `      case "manual":` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `      default:` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `        arr.sort((a, b) => a.position - b.position || b.created_at.localeCompare(a.created_at));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 391 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 392 | `    return arr;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 393 | `  }, [notes, sortMode]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 394 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 395 | `  const authorNameById = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 396 | `    () => new Map(profiles.map((profile) => [profile.id, profile.full_name || "Usuário sem nome"])),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 397 | `    [profiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 399 | `  const noteAuthors = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 400 | `    () => [...new Set(notes.map((note) => note.created_by).filter((id): id is string => !!id))]` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 401 | `      .map((id) => ({ id, name: authorNameById.get(id) ?? "Usuário removido" }))` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 402 | `      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 403 | `    [authorNameById, notes],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 405 | `  const selectableNoteAuthors = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 406 | `    if (!user?.id || noteAuthors.some((author) => author.id === user.id)) return noteAuthors;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 407 | `    return [` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 408 | `      {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `        id: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `        name: authorNameById.get(user.id) ?? "Meu usuário",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 411 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 412 | `      ...noteAuthors,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `    ].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 414 | `  }, [authorNameById, noteAuthors, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 415 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 416 | `  const filteredNotes = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 417 | `    const q = search.trim().toLowerCase();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 418 | `    return sortedNotes.filter((note) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 419 | `      const matchesAuthor = createdBy === "all" || note.created_by === createdBy;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 420 | `      const matchesSearch = !q || note.title.toLowerCase().includes(q) || (note.content ?? "").toLowerCase().includes(q);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 421 | `      return matchesAuthor && matchesSearch;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 422 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 423 | `  }, [createdBy, sortedNotes, search]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 425 | `  // The editor must follow the visible list. Without this, loading a client's` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 426 | `  // shared notes selected the first note in the database even when the author` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 427 | `  // filter showed an empty list for the current administrator.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 428 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 429 | `    if (loading) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 430 | `    if (selectedId && filteredNotes.some((note) => note.id === selectedId)) return;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 431 | `    setSelectedId(filteredNotes[0]?.id ?? null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 432 | `  }, [filteredNotes, loading, selectedId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 434 | `  // A user's first visit to a client's notes starts with their own blank note,` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 435 | `  // rather than opening another person's note. The ref prevents recreating it` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 436 | `  // if the user intentionally deletes that note during the same visit.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 437 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 438 | `    const hasOwnNote = notes.some((note) => note.created_by === user?.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 439 | `    if (!clientId || !user?.id || loading || createdBy !== user.id || hasOwnNote) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 440 | `    const key = \`${clientId}:${user.id}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 441 | `    if (autoCreatedFor.current === key) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 442 | `    autoCreatedFor.current = key;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `    void addNote();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `    // \`addNote\` intentionally is not a dependency: its identity changes as` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 445 | `    // the note list changes, whereas this action must run at most once per client visit.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 446 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 447 | `  }, [clientId, createdBy, loading, notes, user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 449 | `  const move = async (id: string, dir: -1 | 1) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 450 | `    const ordered = [...sortedNotes];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 451 | `    const idx = ordered.findIndex((n) => n.id === id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 452 | `    const swap = idx + dir;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 453 | `    if (idx < 0 || swap < 0 || swap >= ordered.length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 454 | `    [ordered[idx], ordered[swap]] = [ordered[swap], ordered[idx]];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `    const reIndexed = ordered.map((n, i) => ({ ...n, position: i }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 456 | `    setNotes(reIndexed);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `    await Promise.all(` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 458 | `      reIndexed.map((n) => sb.from("client_notes").update({ position: n.position }).eq("id", n.id)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 459 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 460 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 461 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 462 | `  const selected = useMemo(() => notes.find((n) => n.id === selectedId) ?? null, [notes, selectedId]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 463 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 464 | `    <div className={embedded ? "flex min-h-[720px] flex-col" : "flex h-[calc(100vh-0px)] flex-col"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `      <header className="border-b bg-background p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 466 | `        <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 467 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 469 | `              <NotebookPen className="h-6 w-6" /> Anotações` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 470 | `            </h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `            <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `              Anotações dedicadas por cliente, com data, grifos e anexos.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `          <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 476 | `            {!fixedClientId && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `              <Select value={clientId ?? undefined} onValueChange={(v) => setClientId(v)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 478 | `                <SelectTrigger className="w-[260px]"><SelectValue placeholder="Selecione um cliente" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `                  {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 481 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 482 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 483 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `            <Button onClick={addNote} disabled={!clientId}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `              <Plus className="mr-1 h-4 w-4" /> Nova anotação` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 486 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 487 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 488 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 489 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 490 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 491 | `      <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-[340px_1fr]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `        {/* Lista lateral */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `        <aside className="flex min-h-0 flex-col border-r bg-muted/20">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `          <div className="space-y-2 border-b p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 496 | `              placeholder="Buscar anotação…"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `              value={search}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `              onChange={(e) => setSearch(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 499 | `              className="h-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 501 | `            <div className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `              <span className="text-[11px] text-muted-foreground">Ordenar:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `              <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 504 | `                <SelectTrigger className="h-7 flex-1 text-xs"><SelectValue /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 505 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `                  <SelectItem value="manual">Manual (arrastar)</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 507 | `                  <SelectItem value="date_desc">Data ↓ (mais recente)</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 508 | `                  <SelectItem value="date_asc">Data ↑ (mais antiga)</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 509 | `                  <SelectItem value="updated_desc">Atualizado recente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 510 | `                  <SelectItem value="title_asc">Título A→Z</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 511 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 513 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `            {isAdmin && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `              <div className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 516 | `                <span className="shrink-0 text-[11px] text-muted-foreground">Criado por:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 517 | `                <Select value={createdBy} onValueChange={setCreatedBy}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 518 | `                  <SelectTrigger className="h-7 flex-1 text-xs"><SelectValue /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 519 | `                  <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 520 | `                    <SelectItem value="all">Todos os usuários</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 521 | `                    {selectableNoteAuthors.map((author) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 522 | `                      <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `                  </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 525 | `                </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 526 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 527 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 529 | `          <div className="min-h-0 flex-1 overflow-y-auto p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 530 | `            {loading ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `              <p className="p-4 text-sm text-muted-foreground">Carregando…</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `            ) : filteredNotes.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `              <p className="rounded border border-dashed p-6 text-center text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `                {clientId ? "Nenhuma anotação ainda." : "Selecione um cliente."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 536 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `              <ul className="space-y-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 538 | `                {filteredNotes.map((n, i) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 539 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 540 | `                    <li key={n.id} className="flex items-stretch gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 541 | `                      {sortMode === "manual" && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `                        <div className="flex flex-col justify-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 543 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 544 | `                            size="icon" variant="ghost" className="h-5 w-5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 545 | `                            onClick={(e) => { e.stopPropagation(); void move(n.id, -1); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 546 | `                            disabled={i === 0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 547 | `                            title="Mover para cima"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `                            <ArrowUp className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 550 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 551 | `                          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 552 | `                            size="icon" variant="ghost" className="h-5 w-5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 553 | `                            onClick={(e) => { e.stopPropagation(); void move(n.id, 1); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 554 | `                            disabled={i === filteredNotes.length - 1}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `                            title="Mover para baixo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `                          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 557 | `                            <ArrowDown className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 558 | `                          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 559 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 562 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `                        onClick={() => setSelectedId(n.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 564 | `                        className={\`flex-1 rounded-md border px-3 py-2 text-left transition ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 565 | `                          selectedId === n.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `                            ? "border-primary bg-primary/10"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `                            : "border-transparent hover:bg-muted"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 568 | `                        }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 569 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `                        <div className="flex items-center justify-between gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `                          <p className="line-clamp-1 text-sm font-medium">{n.title || "(sem título)"}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `                          <span className="shrink-0 text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 573 | `                            {n.note_date ? format(parseISO(n.note_date), "dd/MM", { locale: ptBR }) : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `                          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 575 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 576 | `                        <p` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 577 | `                          className="mt-1 line-clamp-2 text-[11px] text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 578 | `                          dangerouslySetInnerHTML={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `                            __html: (n.content_html || n.content || "").replace(/<[^>]+>/g, " "),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 580 | `                          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 582 | `                        {isAdmin && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 583 | `                          <p className="mt-1 text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 584 | `                            Criada por: {n.created_by ? (authorNameById.get(n.created_by) ?? "Usuário removido") : "Não identificado"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `                          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 588 | `                    </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 589 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 590 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `              </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `        </aside>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 595 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 596 | `        {/* Editor */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `        <section className="min-h-0 overflow-y-auto p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 598 | `          {selected ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `            <NoteEditor` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `              key={selected.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 601 | `              note={selected}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 602 | `              onPatch={(p) => patchNote(selected.id, p)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 603 | `              onSave={(p) => persistNote(selected.id, p)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 604 | `              onDelete={() => deleteNote(selected.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 605 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `            <Card className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 608 | `              Selecione ou crie uma anotação.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `            </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 610 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `        </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 613 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 614 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 615 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 616 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 617 | `function NotesPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 618 | `  return <NotesWorkspace />;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 619 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 620 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 621 | `function NoteEditor({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 622 | `  note, onPatch, onSave, onDelete,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 624 | `  note: ClientNote;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 625 | `  onPatch: (p: Partial<ClientNote>) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 626 | `  onSave: (p: Partial<ClientNote>) => Promise<void>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 627 | `  onDelete: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 628 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 630 | `  const aiFormat = useServerFn(formatNoteWithAI);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 631 | `  const [title, setTitle] = useState(note.title);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 632 | `  const [noteDate, setNoteDate] = useState(note.note_date ?? new Date().toISOString().slice(0, 10));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 633 | `  const editorRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 634 | `  const fsEditorRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 635 | `  const pendingPatch = useRef<Partial<ClientNote>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 636 | `  const syncingRef = useRef(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 637 | `  const selectedTextRangeRef = useRef<Range | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 638 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 639 | `  const [saveState, setSaveState] = useState<"idle" | "dirty" | "saving" | "saved">("idle");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 640 | `  const [fullscreen, setFullscreen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 641 | `  const [aiLoading, setAiLoading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 642 | `  const [editorHtml, setEditorHtml] = useState(note.content_html ?? note.content ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 643 | `  const [highlightColor, setHighlightColor] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 644 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 645 | `  const [attachments, setAttachments] = useState<NoteAttachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 646 | `  const [attUrls, setAttUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 647 | `  const [uploading, setUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 648 | `  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 649 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 650 | `  const setEditorsHTML = useCallback((html: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 651 | `    syncingRef.current = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 652 | `    setEditorHtml(html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `    syncEditorDom(editorRef.current, html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 654 | `    syncEditorDom(fsEditorRef.current, html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 655 | `    requestAnimationFrame(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 656 | `      syncingRef.current = false;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 657 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 658 | `  }, []);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 659 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 660 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 661 | `    setEditorsHTML(note.content_html ?? note.content ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 662 | `    setTitle(note.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `    setNoteDate(note.note_date ?? new Date().toISOString().slice(0, 10));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 664 | `    setHighlightColor(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 665 | `    pendingPatch.current = {};` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 666 | `    setSaveState("idle");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 667 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 668 | `  }, [note.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 669 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 670 | `  // Sync between main editor and focus-mode editor when toggling fullscreen` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 671 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 672 | `    if (fullscreen) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 673 | `      const html = editorHtml || editorRef.current?.innerHTML || note.content_html || note.content || "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 674 | `      requestAnimationFrame(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 675 | `        syncEditorDom(fsEditorRef.current, html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 676 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 677 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 678 | `      syncEditorDom(editorRef.current, editorHtml || fsEditorRef.current?.innerHTML || "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 680 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 681 | `  }, [fullscreen, editorHtml]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 683 | `  const loadAttachments = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 684 | `    const { data, error } = await sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 685 | `      .from("client_note_attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 686 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `      .eq("note_id", note.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `      .order("created_at", { ascending: true });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 689 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 690 | `    const list = (data ?? []) as NoteAttachment[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 691 | `    setAttachments(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `    const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 693 | `    await Promise.all(list.map(async (a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 694 | `      const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 695 | `        .from("task-attachments").createSignedUrl(a.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 696 | `      if (signed) next[a.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 697 | `    }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 698 | `    setAttUrls(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 699 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 700 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 701 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 702 | `    void loadAttachments();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 703 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 704 | `  }, [note.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 705 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 706 | `  const doSave = useCallback(async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 707 | `    const patch = pendingPatch.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 708 | `    if (!Object.keys(patch).length) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 709 | `    pendingPatch.current = {};` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 710 | `    setSaveState("saving");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 711 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 712 | `      await onSave(patch);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 713 | `      setSaveState("saved");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 714 | `      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1500);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 715 | `    } catch (e: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 716 | `      setSaveState("dirty");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 717 | `      toast.error(e?.message ?? "Falha ao salvar");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 718 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 719 | `  }, [onSave]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 720 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 721 | `  const stageChange = useCallback((patch: Partial<ClientNote>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 722 | `    onPatch(patch);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 723 | `    pendingPatch.current = { ...pendingPatch.current, ...patch };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 724 | `    setSaveState("dirty");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 725 | `  }, [onPatch]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 726 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 727 | `  // Save on unmount / before unload` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 728 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 729 | `    const handler = (e: BeforeUnloadEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 730 | `      if (saveState === "dirty" || saveState === "saving" || Object.keys(pendingPatch.current).length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 731 | `        e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 732 | `        e.returnValue = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 733 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 734 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 735 | `    window.addEventListener("beforeunload", handler);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 736 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 737 | `      window.removeEventListener("beforeunload", handler);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 738 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 739 | `  }, [saveState]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 740 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 741 | `  const getActiveEditor = () => (fullscreen ? fsEditorRef.current : editorRef.current);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 742 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 743 | `  const applyEditorChange = useCallback((html: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 744 | `    setEditorsHTML(html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 745 | `    stageChange({ content_html: html, content: extractTextFromHtml(html) });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 746 | `  }, [setEditorsHTML, stageChange]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 747 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 748 | `  const exec = (cmd: string, value?: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 749 | `    const ed = getActiveEditor();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 750 | `    ed?.focus();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 751 | `    document.execCommand(cmd, false, value);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 752 | `    const html = ed?.innerHTML ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 753 | `    applyEditorChange(html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 754 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 755 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 756 | `  const applyHighlightColor = (color: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 757 | `    setHighlightColor(color);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `    exec("hiliteColor", color);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 759 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 760 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 761 | `  const preserveSelectedText = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 762 | `    const ed = getActiveEditor();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 763 | `    const selection = window.getSelection();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 764 | `    if (!ed || !selection?.rangeCount) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 765 | `    const range = selection.getRangeAt(0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 766 | `    if (ed.contains(range.commonAncestorContainer)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 767 | `      selectedTextRangeRef.current = range.cloneRange();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 768 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 769 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 770 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 771 | `  const clearHighlight = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 772 | `    const ed = getActiveEditor();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 773 | `    const savedRange = selectedTextRangeRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 774 | `    ed?.focus();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 776 | `    if (savedRange) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 777 | `      const selection = window.getSelection();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 778 | `      selection?.removeAllRanges();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 779 | `      selection?.addRange(savedRange);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 780 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 781 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 782 | `    // Alguns navegadores usam \`backColor\` e outros \`hiliteColor\` para o grifo.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 783 | `    document.execCommand("hiliteColor", false, "transparent");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 784 | `    document.execCommand("backColor", false, "transparent");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 785 | `    selectedTextRangeRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `    applyEditorChange(ed?.innerHTML ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 787 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 788 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 789 | `  const onEditorInput = (which: "main" | "fs") => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 790 | `    if (syncingRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 791 | `    const ed = which === "fs" ? fsEditorRef.current : editorRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 792 | `    const html = ed?.innerHTML ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 793 | `    applyEditorChange(html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 794 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 795 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 796 | `  // Smart paste: prefer HTML; if only plain text and looks like markdown, convert` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 797 | `  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 798 | `    const cd = e.clipboardData;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 799 | `    const html = cd.getData("text/html");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 800 | `    const text = cd.getData("text/plain");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 801 | `    if (html && html.trim()) return; // browser default keeps formatting` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 802 | `    if (!text) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 803 | `    const looksLikeMarkdown = /(^|\n)\s*(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|\`\`\`)|\*\*[^*]+\*\*|\`[^\`]+\`|\[[^\]]+\]\(/.test(text);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 804 | `    if (!looksLikeMarkdown) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 805 | `    e.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 806 | `    const converted = String(marked.parse(text, { breaks: true, async: false }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 807 | `    document.execCommand("insertHTML", false, converted);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `    const ed = getActiveEditor();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 809 | `    if (ed) applyEditorChange(ed.innerHTML);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 810 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 811 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 812 | `  const runAIFormat = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 813 | `    const ed = getActiveEditor();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 814 | `    const html = ed?.innerHTML ?? "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 815 | `    if (!html.trim()) { toast.info("Escreva algo primeiro."); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 816 | `    setAiLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 817 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 818 | `      const res = await aiFormat({ data: { html, title } });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 819 | `      applyEditorChange(res.html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `      toast.success("Texto reformatado pela IA.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 821 | `    } catch (e: any) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `      toast.error(e?.message ?? "Falha ao reformatar.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 823 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 824 | `      setAiLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 825 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 826 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 827 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 828 | `  const exportPDF = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 829 | `    const html = normalizeNoteHtmlForPdf(editorHtml || getActiveEditor()?.innerHTML || "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 830 | `    const dateLabel = noteDate ? format(parseISO(noteDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 831 | `    Promise.resolve().then(() => openNotePrintPreview({ title: title || "Sem título", dateLabel, html })).catch((error: any) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 832 | `      toast.error(error?.message ?? "Falha ao gerar PDF.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 833 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 834 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 835 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 836 | `  const onUpload = async (fl: FileList | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 837 | `    if (!fl || !fl.length || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 838 | `    setUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 839 | `    for (const file of Array.from(fl)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 840 | `      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 841 | `      const path = \`notes/${note.id}/${Date.now()}_${safe}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 842 | `      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 843 | `      if (upErr) { toast.error(upErr.message); continue; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 844 | `      const { error: insErr } = await sb.from("client_note_attachments").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 845 | `        note_id: note.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 846 | `        file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 847 | `        storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 848 | `        mime_type: file.type,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 849 | `        size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 850 | `        uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 851 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 852 | `      if (insErr) toast.error(insErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 853 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 854 | `    setUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 855 | `    void loadAttachments();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 857 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 858 | `  const removeAttachment = async (a: NoteAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 859 | `    if (!confirm(\`Excluir "${a.file_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 860 | `    await supabase.storage.from("task-attachments").remove([a.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 861 | `    await sb.from("client_note_attachments").delete().eq("id", a.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 862 | `    void loadAttachments();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 863 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 864 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 865 | `  const openAttachment = (a: NoteAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 866 | `    const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 867 | `    if (canPreview) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 868 | `      setPreview({ file_name: a.file_name, storage_path: a.storage_path, mime_type: a.mime_type });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 869 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 870 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 871 | `    const u = attUrls[a.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 872 | `    if (u) window.open(u, "_blank", "noopener,noreferrer");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 873 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 874 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 875 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 876 | `  const SaveBadge = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 877 | `    <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 878 | `      className={\`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 879 | `        saveState === "saved" ? "bg-green-500/15 text-green-600 dark:text-green-400" :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 880 | `        saveState === "saving" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 881 | `        saveState === "dirty" ? "bg-amber-500/15 text-amber-700 dark:text-amber-400" :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 882 | `        "bg-muted text-muted-foreground"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 883 | `      }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `      title="Estado do salvamento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `      {saveState === "saving" ? <Loader2 className="h-3 w-3 animate-spin" /> :` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 887 | `       saveState === "saved" ? <Check className="h-3 w-3" /> :` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 888 | `       saveState === "dirty" ? <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> :` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 889 | `       <Check className="h-3 w-3 opacity-60" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 890 | `      {saveState === "saving" ? "Salvando…" :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 891 | `       saveState === "saved" ? "Salvo" :` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 892 | `       saveState === "dirty" ? "Não salvo" : "Salvo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 894 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 895 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 896 | `  const Toolbar = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 897 | `    <div className="flex flex-wrap items-center gap-1 rounded-md border bg-muted/30 p-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 898 | `      <Button type="button" variant="ghost" size="sm" onClick={() => exec("bold")} title="Negrito (Ctrl+B)">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 899 | `        <Bold className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 900 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 901 | `      <Button type="button" variant="ghost" size="sm" onClick={() => exec("italic")} title="Itálico (Ctrl+I)">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 902 | `        <Italic className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 903 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 904 | `      <Button type="button" variant="ghost" size="sm" onClick={() => exec("underline")} title="Sublinhado">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 905 | `        <Underline className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 906 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 907 | `      <div className="mx-1 h-5 w-px bg-border" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 908 | `      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#fde047")} title="Grifar amarelo" className={highlightColor === "#fde047" ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" : "text-yellow-700 dark:text-yellow-400"}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 909 | `        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Amarelo</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 910 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 911 | `      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#86efac")} title="Grifar verde" className={highlightColor === "#86efac" ? "bg-green-500/15 text-green-700 dark:text-green-400" : "text-green-700 dark:text-green-400"}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 912 | `        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Verde</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 913 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 914 | `      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#fca5a5")} title="Grifar vermelho" className={highlightColor === "#fca5a5" ? "bg-red-500/15 text-red-700 dark:text-red-400" : "text-red-700 dark:text-red-400"}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 915 | `        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Vermelho</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 916 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 917 | `      <Button type="button" variant="ghost" size="sm" onClick={() => applyHighlightColor("#93c5fd")} title="Grifar azul" className={highlightColor === "#93c5fd" ? "bg-blue-500/15 text-blue-700 dark:text-blue-400" : "text-blue-700 dark:text-blue-400"}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 918 | `        <Highlighter className="h-4 w-4" /><span className="ml-1 text-xs">Azul</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 919 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 920 | `      <Button type="button" variant="ghost" size="sm" onPointerDown={(e) => { preserveSelectedText(); e.preventDefault(); }} onClick={clearHighlight} title="Remover grifo do texto selecionado">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 921 | `        <Eraser className="h-4 w-4" /><span className="ml-1 text-xs">Remover grifo</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 922 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 923 | `      <div className="mx-1 h-5 w-px bg-border" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 924 | `      <Button type="button" variant="ghost" size="sm" onClick={runAIFormat} disabled={aiLoading} title="Reformatar texto com IA">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 925 | `        {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 926 | `        <span className="ml-1 text-xs">Auto-ajuste</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 927 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 928 | `      <Button type="button" variant="ghost" size="sm" onClick={exportPDF} title="Gerar PDF em nova aba">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 929 | `        <FileDown className="h-4 w-4" /><span className="ml-1 text-xs">PDF</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 930 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 931 | `      <Button type="button" variant="ghost" size="sm" onClick={() => setFullscreen((v) => !v)} title="Modo foco (tela cheia)">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 932 | `        {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 933 | `        <span className="ml-1 text-xs">{fullscreen ? "Sair" : "Foco"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 934 | `      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 935 | `      <div className="ml-auto flex items-center gap-2 pr-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 936 | `        {SaveBadge}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 937 | `        <Button type="button" size="sm" onClick={() => void doSave()} disabled={saveState === "saving"}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 938 | `          <Save className="mr-1 h-4 w-4" /> Salvar` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 939 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 940 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 941 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 942 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 943 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 944 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 945 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 946 | `      <Card className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 947 | `        <div className="space-y-3 border-b p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 948 | `          <div className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 949 | `            <label htmlFor="note-title" className="block px-1 text-[11px] font-bold uppercase tracking-widest text-primary">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 950 | `              Título da anotação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 951 | `            </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 952 | `            <div className="flex items-start gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 953 | `              <Input id="note-title"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 954 | `                value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 955 | `                onChange={(e) => { setTitle(e.target.value); stageChange({ title: e.target.value }); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 956 | `                onBlur={() => stageChange({ title })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 957 | `                placeholder="Título da anotação"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 958 | `                className="h-12 flex-1 rounded-lg border-primary/25 bg-primary/5 px-3 text-xl font-bold shadow-sm focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 959 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `              <Button variant="ghost" size="icon" className="mt-1 text-destructive" onClick={onDelete}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 961 | `                <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 962 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 963 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 964 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 965 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 966 | `          <div className="flex flex-wrap items-center gap-2 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 967 | `            <label className="flex items-center gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 968 | `              <span className="text-xs text-muted-foreground">Data:</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 969 | `              <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 970 | `                type="date"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 971 | `                value={noteDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 972 | `                onChange={(e) => { setNoteDate(e.target.value); stageChange({ note_date: e.target.value }); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 973 | `                className="h-8 w-[160px]"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 974 | `              />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 975 | `            </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 976 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 977 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 978 | `          {Toolbar}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 979 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 980 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 981 | `        <div className="min-h-0 flex-1 overflow-y-auto p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 982 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 983 | `            ref={editorRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `            contentEditable` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 985 | `            suppressContentEditableWarning` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 986 | `            onInput={() => onEditorInput("main")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 987 | `            onPaste={onPaste}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 988 | `            onBlur={() => stageChange({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 989 | `              content_html: editorRef.current?.innerHTML ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 990 | `              content: editorRef.current?.innerText ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 991 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 992 | `            className="prose prose-sm dark:prose-invert min-h-[360px] max-w-none rounded-md border border-dashed bg-background p-5 text-base leading-relaxed outline-none transition focus:border-primary focus:bg-card focus:shadow-lg focus:ring-2 focus:ring-primary/30"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 993 | `            data-placeholder="Escreva sua anotação aqui… (use o botão Salvar para registrar as alterações)"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 995 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 996 | `          {/* Anexos */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 997 | `          <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 998 | `            onFiles={(files) => void onUpload(files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 999 | `            disabled={uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1000 | `            className="mt-6 space-y-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1001 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1002 | `            <div className="flex items-center justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1003 | `              <h3 className="flex items-center gap-2 text-sm font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1004 | `                <Paperclip className="h-4 w-4" /> Anexos` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1005 | `                <span className="text-xs font-normal text-muted-foreground">({attachments.length})</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1006 | `              </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1007 | `              <label className="cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1008 | `                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1009 | `                  type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1010 | `                  multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1011 | `                  accept="*/*"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `                  className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1013 | `                  onChange={(e) => { void onUpload(e.target.files); e.currentTarget.value = ""; }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1014 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1015 | `                <span className="inline-flex items-center rounded-md border bg-background px-3 py-1 text-xs hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1016 | `                  {uploading ? "Enviando…" : "+ Adicionar arquivo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1017 | `                </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1018 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1019 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1020 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1021 | `            {attachments.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1022 | `              <p className="rounded border border-dashed p-4 text-center text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1023 | `                Nenhum anexo. Aceita qualquer tipo (imagens, PDF, Word, Excel, etc.).` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1024 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1025 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1026 | `              <ul className="space-y-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1027 | `                {attachments.map((a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1028 | `                  const isImage = a.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1029 | `                  const canPreview = PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1030 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1031 | `                    <li key={a.id} className="flex items-center gap-2 rounded-md border bg-card p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1032 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1033 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1034 | `                        onClick={() => openAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1035 | `                        className="h-10 w-10 shrink-0 overflow-hidden rounded border bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1036 | `                        title={a.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1037 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1038 | `                        {isImage && attUrls[a.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1039 | `                          <img src={attUrls[a.id]} alt={a.file_name} className="h-full w-full object-cover" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1040 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1042 | `                            {canPreview ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1043 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1044 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1046 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1047 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1048 | `                        onClick={() => openAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1049 | `                        className="flex min-w-0 flex-1 flex-col text-left"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1050 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1051 | `                        <span className="truncate text-sm">{a.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1052 | `                        <span className="text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1053 | `                          {a.mime_type || "arquivo"}{a.size_bytes ? \` · ${Math.round(a.size_bytes / 1024)} KB\` : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1054 | `                        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1055 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1056 | `                      <Button size="sm" variant="ghost" onClick={() => openAttachment(a)}>Abrir</Button>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1057 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1058 | `                        size="icon" variant="ghost" className="h-8 w-8 text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1059 | `                        onClick={() => void removeAttachment(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1060 | `                        title="Excluir"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1061 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1062 | `                        <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `                    </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1065 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1066 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1067 | `              </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1068 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1069 | `          </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1070 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1071 | `          <p className="mt-4 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1072 | `            Atualizado em {format(new Date(note.updated_at), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1073 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1074 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1075 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1076 | `        <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1077 | `          open={!!preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1078 | `          onOpenChange={(o) => { if (!o) setPreview(null); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1079 | `          attachment={preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1082 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1083 | `      {/* Fullscreen / Focus mode */}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1084 | `      <Dialog open={fullscreen} onOpenChange={setFullscreen}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1085 | `        <DialogContent className="flex h-[96vh] max-h-[96vh] w-[96vw] max-w-[1100px] flex-col gap-3 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1086 | `          <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1087 | `            <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1088 | `              value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1089 | `              onChange={(e) => { setTitle(e.target.value); stageChange({ title: e.target.value }); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1090 | `              placeholder="Título da anotação"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `              className="h-11 flex-1 border-0 px-1 text-2xl font-bold shadow-none focus-visible:ring-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1092 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `            <span className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1094 | `              {noteDate ? format(parseISO(noteDate), "dd 'de' MMM yyyy", { locale: ptBR }) : ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `            </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1096 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1097 | `          {Toolbar}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1098 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1099 | `            ref={fsEditorRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1100 | `            contentEditable` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1101 | `            suppressContentEditableWarning` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1102 | `            onInput={() => onEditorInput("fs")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1103 | `            onPaste={onPaste}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1104 | `            onBlur={() => stageChange({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1105 | `              content_html: fsEditorRef.current?.innerHTML ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1106 | `              content: fsEditorRef.current?.innerText ?? "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1107 | `            })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `            className="prose dark:prose-invert min-h-0 flex-1 max-w-none overflow-y-auto rounded-md border bg-background p-8 text-lg leading-relaxed outline-none focus:ring-2 focus:ring-primary/30"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1109 | `            data-placeholder="Modo foco — escreva à vontade…"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1111 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1112 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1113 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1114 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1115 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1116 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
