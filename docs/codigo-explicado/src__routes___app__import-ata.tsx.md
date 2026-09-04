# src/routes/_app/import-ata.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useServerFn } from "@tanstack/react-start";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useMemo, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { useClients, useColumns, useProfiles, useTaskTags, useTaskStatuses } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import { Sparkles, Upload, FileText, Loader2, Trash2, Plus, CheckCircle2, NotebookPen, FileSignature, FileDown } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `import { createTasksFromAta, parseAtaWithGemini, type ExtractedTask } from "@/lib/import-ata.functions";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 18 | `import { formatAtaWithGemini } from "@/lib/format-ata.functions";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 19 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 20 | `import timbradoPngUrl from "@/assets/Timbrado LA.pdf?timbrado-png";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 21 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 22 | `export const Route = createFileRoute("/_app/import-ata")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 23 | `  component: ImportAtaPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 25 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 26 | `type Row = ExtractedTask & {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 27 | `  _selected: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  _id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `  status_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  column_id: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  mark_completed: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 33 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 34 | `const A4_WIDTH_PX = 794;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 35 | `const A4_HEIGHT_PX = 1123;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `// O cabeçalho do timbrado ocupa aproximadamente 140 px; mantemos uma folga` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 37 | `// adicional para que o conteúdo nunca invada a marca em páginas seguintes.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 38 | `const DOCUMENT_TOP_PADDING_PX = 176;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `const DOCUMENT_BOTTOM_PADDING_PX = 105;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `function ImportAtaPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 42 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 43 | `  const qc = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 46 | `  const { data: tags = [] } = useTaskTags();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 47 | `  const { data: statuses = [] } = useTaskStatuses();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `  const { data: columns = [] } = useColumns();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const runParse = useServerFn(parseAtaWithGemini);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const runFormat = useServerFn(formatAtaWithGemini);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const runCreateTasks = useServerFn(createTasksFromAta);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  const [tab, setTab] = useState<"pdf" | "text">("pdf");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `  const [file, setFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 55 | `  const [text, setText] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `  const [loading, setLoading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const [rows, setRows] = useState<Row[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const [creating, setCreating] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  const [formatting, setFormatting] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  const [ataHtml, setAtaHtml] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const [ataText, setAtaText] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const [ataTitle, setAtaTitle] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  const [saveClientId, setSaveClientId] = useState<string>("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `  const [savingNote, setSavingNote] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  const [exportingPdf, setExportingPdf] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 67 | `  const activeMembers = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `    () => profiles.filter((p) => p.is_active !== false).map((p) => ({ id: p.id, name: p.full_name || "Sem nome" })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 69 | `    [profiles],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 71 | `  const clientList = useMemo(() => clients.map((c) => ({ id: c.id, name: c.name })), [clients]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const tagList = useMemo(() => tags.map((t) => ({ id: t.id, name: t.name })), [tags]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 74 | `  const defaultStatusId = useMemo(() => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `    const open = statuses.find((s) => s.is_active && !s.is_completed);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `    return open?.id ?? statuses[0]?.id ?? null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 77 | `  }, [statuses]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `  const defaultColumnId = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `    () => columns.find((column) => column.name.trim().toLocaleLowerCase("pt-BR") === "a fazer")?.id ?? columns[0]?.id ?? null,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 80 | `    [columns],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 82 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 83 | `  const fileToBase64 = (f: File) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `    new Promise<string>((resolve, reject) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 85 | `      const r = new FileReader();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 86 | `      r.onload = () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 87 | `        const s = String(r.result || "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `        const i = s.indexOf(",");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `        resolve(i >= 0 ? s.slice(i + 1) : s);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 91 | `      r.onerror = () => reject(r.error);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 92 | `      r.readAsDataURL(f);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 94 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 95 | `  const analyze = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 96 | `    if (tab === "pdf" && !file) { toast.error("Selecione um PDF"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `    if (tab === "text" && !text.trim()) { toast.error("Cole o texto da ata"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 98 | `    setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 100 | `      const payload: {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 101 | `        members: { id: string; name: string }[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `        clients: { id: string; name: string }[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `        tags: { id: string; name: string }[];` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `        pdfBase64?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `        filename?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `        text?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      } = {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `        members: activeMembers,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `        clients: clientList,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `        tags: tagList,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 112 | `      if (tab === "pdf" && file) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 113 | `        payload.pdfBase64 = await fileToBase64(file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `        payload.filename = file.name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `        payload.text = text;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `      const res = await runParse({ data: payload });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 119 | `      const mapped: Row[] = (res.tasks || []).map((t, i) => ({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 120 | `        ...t,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `        _selected: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `        _id: \`r-${i}-${Date.now()}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 123 | `        status_id: defaultStatusId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 124 | `        column_id: defaultColumnId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `        mark_completed: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `      }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `      if (mapped.length === 0) toast.message("Nenhuma tarefa encontrada na ata");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 128 | `      setRows(mapped);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 130 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `      setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 134 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 135 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 136 | `  const generateAta = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 137 | `    if (tab === "pdf" && !file) { toast.error("Selecione um PDF"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 138 | `    if (tab === "text" && !text.trim()) { toast.error("Cole o texto da reunião"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 139 | `    setFormatting(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 141 | `      const payload: { pdfBase64?: string; filename?: string; text?: string } = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 142 | `      if (tab === "pdf" && file) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 143 | `        payload.pdfBase64 = await fileToBase64(file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 144 | `        payload.filename = file.name;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 146 | `        payload.text = text;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 148 | `      const res = await runFormat({ data: payload });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 149 | `      setAtaHtml(res.html);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 150 | `      setAtaText(res.text);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `      if (!ataTitle) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 152 | `        const today = new Date().toLocaleDateString("pt-BR");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 153 | `        setAtaTitle(\`Ata de Reunião — ${today}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 154 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 155 | `      toast.success("Ata gerada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `      setFormatting(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 160 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 161 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `  const saveAtaAsNote = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 164 | `    if (!user) { toast.error("Sessão expirada"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 165 | `    if (!ataHtml) { toast.error("Gere a ata primeiro"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 166 | `    if (!saveClientId) { toast.error("Selecione um cliente"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 167 | `    setSavingNote(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 168 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 169 | `      const { error } = await supabase.from("client_notes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `        client_id: saveClientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `        title: ataTitle || "Ata de Reunião",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 172 | `        content: ataText,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 173 | `        content_html: ataHtml,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `        created_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 175 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 176 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 177 | `      toast.success("Ata salva nas anotações do cliente");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `      qc.invalidateQueries({ queryKey: ["client_notes"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 179 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 182 | `      setSavingNote(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 183 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 184 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 185 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 186 | `  const downloadAtaPdf = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `    if (!ataHtml) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 188 | `    setExportingPdf(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `    let renderFrame: HTMLIFrameElement | null = null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 191 | `      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `        import("html2canvas"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 193 | `        import("jspdf"),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `      ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 195 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 196 | `      renderFrame = document.createElement("iframe");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 197 | `      renderFrame.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;border:0;visibility:hidden;";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `      document.body.appendChild(renderFrame);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 199 | `      const previewDocument = renderFrame.contentDocument;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 200 | `      if (!previewDocument) throw new Error("Não foi possível preparar a página da ata.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 201 | `      previewDocument.open();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 202 | `      previewDocument.write(\`<!doctype html><html><head><meta charset="utf-8" /><style>` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `          * { box-sizing: border-box; }` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 204 | `          html, body { margin: 0; padding: 0; background: transparent; color: #172033; font-family: Arial, Helvetica, sans-serif; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `          #ata-pdf-preview { width: ${A4_WIDTH_PX}px; padding: 0 68px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `          .ata-pdf-content { font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.55; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `          .ata-pdf-content h2 { margin: 0 0 20px; color: #14284b; font-size: 24px; line-height: 1.2; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `          .ata-pdf-content h3 { margin: 22px 0 9px; color: #14284b; font-size: 16px; line-height: 1.25; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `          .ata-pdf-content p { margin: 0 0 10px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `          .ata-pdf-content ul { margin: 0 0 12px; padding-left: 22px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `          .ata-pdf-content li { margin: 0 0 5px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `          .ata-pdf-content table { width: 100%; border-collapse: collapse; margin: 12px 0 16px; font-size: 12px; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `          .ata-pdf-content th, .ata-pdf-content td { border: 1px solid #9aa6b6; padding: 7px 8px; vertical-align: top; text-align: left; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `          .ata-pdf-content th { background: #eaf0f8; color: #14284b; }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `        </style></head><body><main id="ata-pdf-preview">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 216 | `          <div style="font-size:12px;color:#536174;margin-bottom:18px;">${new Date().toLocaleDateString("pt-BR")}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 217 | `          <div class="ata-pdf-content">${ataHtml}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 218 | `        </main></body></html>\`);` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 219 | `      previewDocument.close();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 220 | `      const preview = previewDocument.getElementById("ata-pdf-preview");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 221 | `      if (!preview) throw new Error("Não foi possível preparar o conteúdo da ata.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 222 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 223 | `      const source = await html2canvas(preview, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 224 | `        backgroundColor: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `        scale: 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 226 | `        logging: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 227 | `        useCORS: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 229 | `      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [A4_WIDTH_PX, A4_HEIGHT_PX] });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 230 | `      const pageWidth = pdf.internal.pageSize.getWidth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 231 | `      const pageHeight = pdf.internal.pageSize.getHeight();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 232 | `      const usableHeight = A4_HEIGHT_PX - DOCUMENT_TOP_PADDING_PX - DOCUMENT_BOTTOM_PADDING_PX;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 233 | `      const totalPages = Math.max(1, Math.ceil(source.height / 2 / usableHeight));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 234 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 235 | `      for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 236 | `        if (pageIndex > 0) pdf.addPage([A4_WIDTH_PX, A4_HEIGHT_PX], "portrait");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 237 | `        const pageCanvas = document.createElement("canvas");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `        pageCanvas.width = A4_WIDTH_PX * 2;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `        pageCanvas.height = A4_HEIGHT_PX * 2;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `        const context = pageCanvas.getContext("2d");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 241 | `        if (!context) throw new Error("Não foi possível montar a página da ata.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 242 | `        context.drawImage(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 243 | `          source,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `          0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `          pageIndex * usableHeight * 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 246 | `          source.width,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 247 | `          Math.min(usableHeight * 2, source.height - pageIndex * usableHeight * 2),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `          0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `          DOCUMENT_TOP_PADDING_PX * 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 250 | `          A4_WIDTH_PX * 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `          Math.min(usableHeight * 2, source.height - pageIndex * usableHeight * 2),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 253 | `        pdf.addImage(timbradoPngUrl, "PNG", 0, 0, pageWidth, pageHeight);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 254 | `        pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 256 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 257 | `      pdf.save(\`${(ataTitle || "ata-de-reuniao").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "ata-de-reuniao"}.pdf\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `      toast.success("PDF timbrado gerado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 260 | `      toast.error((e as Error).message || "Não foi possível gerar o PDF.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 261 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 262 | `      renderFrame?.remove();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `      setExportingPdf(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 265 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 267 | `  const updateRow = (id: string, patch: Partial<Row>) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 268 | `    setRows((rs) => rs.map((r) => (r._id === id ? { ...r, ...patch } : r)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 269 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 270 | `  const removeRow = (id: string) => setRows((rs) => rs.filter((r) => r._id !== id));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 271 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 272 | `  const addRow = () =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 273 | `    setRows((rs) => [` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 274 | `      ...rs,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `      {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 276 | `        _id: \`r-new-${Date.now()}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        _selected: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `        title: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `        description: "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `        assignee_id: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 281 | `        assignee_name: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 282 | `        due_date: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `        client_id: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `        client_name: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `        tag_id: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `        tag_name: null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 287 | `        priority: "medium",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `        status_id: defaultStatusId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 289 | `        column_id: defaultColumnId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 290 | `        mark_completed: false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 291 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 292 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 294 | `  const createTasks = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 295 | `    if (!user) { toast.error("Sessão expirada"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 296 | `    const picked = rows.filter((r) => r._selected && r.title.trim());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 297 | `    if (picked.length === 0) { toast.error("Selecione ao menos uma tarefa válida"); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 298 | `    if (picked.some((r) => !r.due_date)) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 299 | `      toast.error("Defina o prazo de todas as tarefas selecionadas antes de criar no Kanban.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 301 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 302 | `    setCreating(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 304 | `      const completedStatusId = statuses.find((status) => status.is_completed)?.id ?? null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 305 | `      const payload = picked.map((r) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 306 | `      return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 307 | `        title: r.title.trim().slice(0, 200),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `        description: r.description || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `        status: r.mark_completed ? "done" as const : "todo" as const,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `        status_id: r.mark_completed ? completedStatusId : r.status_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `        column_id: r.mark_completed ? null : r.column_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `        priority: r.priority,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 313 | `        due_date: r.due_date ? new Date(r.due_date + "T18:00:00").toISOString() : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `        assignee_id: r.assignee_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `        client_id: r.client_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `        tag_id: r.tag_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 317 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 318 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 319 | `      const result = await runCreateTasks({ data: { tasks: payload } });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 320 | `      toast.success(\`${result.created} tarefa(s) criada(s) no Kanban\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 321 | `      qc.invalidateQueries({ queryKey: ["tasks"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 322 | `      qc.invalidateQueries({ queryKey: ["task_tag_links"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `      setRows([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `      setFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `      setText("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `    } catch (e) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 327 | `      toast.error((e as Error).message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 328 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 329 | `      setCreating(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 330 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 331 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 332 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 333 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 334 | `    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `      <div className="flex items-center gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 336 | `        <Sparkles className="h-6 w-6 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 338 | `          <h1 className="text-xl font-semibold">Importar ata de reunião</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 339 | `          <p className="text-sm text-muted-foreground">Gere uma <strong>ata formatada</strong> a partir de notas brutas e/ou extraia <strong>tarefas</strong> para o Kanban. Use os dois ou apenas um.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 341 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 343 | `      <Card className="p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `        <Tabs value={tab} onValueChange={(v) => setTab(v as "pdf" | "text")}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 345 | `          <TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 346 | `            <TabsTrigger value="pdf"><FileText className="h-4 w-4 mr-1" />PDF da ata</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 347 | `            <TabsTrigger value="text"><Sparkles className="h-4 w-4 mr-1" />Texto do Gemini</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 348 | `          </TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 349 | `          <TabsContent value="pdf" className="mt-3 space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 350 | `            <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `              onFiles={(files) => setFile(files.item(0))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 352 | `              className="rounded-md"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed p-4 hover:bg-muted/40">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `              <Upload className="h-5 w-5 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 356 | `              <div className="flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `                <div className="text-sm font-medium">{file ? file.name : "Selecionar PDF"}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `                <div className="text-xs text-muted-foreground">{file ? \`${(file.size / 1024).toFixed(0)} KB\` : "Aceita atas em PDF (até ~10MB)"}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 360 | `              <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 361 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 362 | `            </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `          <TabsContent value="text" className="mt-3 space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `            <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `              rows={10}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 367 | `              placeholder="Cole aqui o conteúdo da ata (ou a resposta do Gemini com as próximas etapas)..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 368 | `              value={text}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `              onChange={(e) => setText(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 370 | `            />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `        </Tabs>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 373 | `        <div className="mt-3 flex flex-wrap justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `          <Button variant="outline" onClick={generateAta} disabled={formatting}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `            {formatting ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileSignature className="h-4 w-4 mr-1" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `            Gerar Ata Formatada` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 377 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `          <Button onClick={analyze} disabled={loading}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `            {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 380 | `            Extrair Tarefas` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 382 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 383 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 384 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 385 | `      {ataHtml && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `        <Card className="p-4 space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 387 | `          <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 388 | `            <NotebookPen className="h-5 w-5 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 389 | `            <div className="text-sm font-medium">Ata gerada</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 390 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 391 | `          <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 392 | `            value={ataTitle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `            onChange={(e) => setAtaTitle(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 394 | `            placeholder="Título da ata"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `          <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 397 | `            className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4 dark:prose-invert [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2 [&_th]:bg-muted"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 398 | `            dangerouslySetInnerHTML={{ __html: ataHtml }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `          <div className="flex flex-wrap items-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 401 | `            <div className="flex-1 min-w-[200px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `              <div className="text-[11px] text-muted-foreground mb-1">Salvar nas anotações do cliente</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 403 | `              <Select value={saveClientId} onValueChange={setSaveClientId}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 404 | `                <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 405 | `                <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 406 | `                  {clientList.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 407 | `                </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 408 | `              </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 409 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 410 | `            <Button onClick={saveAtaAsNote} disabled={savingNote || !saveClientId}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 411 | `              {savingNote ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <NotebookPen className="h-4 w-4 mr-1" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 412 | `              Salvar como Anotação` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 414 | `            <Button variant="outline" onClick={downloadAtaPdf} disabled={exportingPdf}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `              {exportingPdf ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileDown className="h-4 w-4 mr-1" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 416 | `              Baixar PDF timbrado` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 418 | `            <Button variant="ghost" onClick={() => { setAtaHtml(""); setAtaText(""); }}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 419 | `              Descartar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `          <div className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `            A criação de tarefas no Kanban é opcional e independente — use o botão "Extrair Tarefas" acima se quiser também transformar as ações em cards.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 428 | `      {rows.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `        <Card className="p-4 space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `          <div className="flex items-center justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 431 | `            <div className="text-sm font-medium">Tarefas sugeridas ({rows.filter(r => r._selected).length}/{rows.length})</div>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 432 | `            <div className="flex gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `              <Button variant="outline" size="sm" onClick={addRow}><Plus className="h-4 w-4 mr-1" />Adicionar manualmente</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `              <Button size="sm" onClick={createTasks} disabled={creating}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                {creating ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-1" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 436 | `                Criar no Kanban` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 437 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 440 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 441 | `          <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 442 | `            {rows.map((r) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 443 | `              <div key={r._id} className={\`rounded-md border p-3 space-y-2 ${r._selected ? "" : "opacity-50"}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `                <div className="flex items-start gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `                  <Checkbox checked={r._selected} onCheckedChange={(c) => updateRow(r._id, { _selected: !!c })} className="mt-1" />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 446 | `                  <div className="flex-1 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 447 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 448 | `                      value={r.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `                      onChange={(e) => updateRow(r._id, { title: e.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 450 | `                      placeholder="Título da tarefa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `                      className="font-medium"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 452 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `                    <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 454 | `                      rows={2}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `                      value={r.description}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `                      onChange={(e) => updateRow(r._id, { description: e.target.value })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 457 | `                      placeholder="Descrição"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `                      <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `                        <div className="text-[11px] text-muted-foreground mb-1">Responsável {r.assignee_name && !r.assignee_id ? <span className="text-amber-600">(sugestão: {r.assignee_name})</span> : null}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 462 | `                        <Select value={r.assignee_id ?? "none"} onValueChange={(v) => updateRow(r._id, { assignee_id: v === "none" ? null : v })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 463 | `                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `                          <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `                            <SelectItem value="none">— Sem responsável —</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 466 | `                            {activeMembers.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 467 | `                          </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `                        </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 469 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 470 | `                      <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `                        <div className="text-[11px] text-muted-foreground mb-1">Prazo *</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `                        <Input type="date" required value={r.due_date ?? ""} onChange={(e) => updateRow(r._id, { due_date: e.target.value || null })} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 473 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `                      <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `                        <div className="text-[11px] text-muted-foreground mb-1">Cliente {r.client_name && !r.client_id ? <span className="text-amber-600">({r.client_name})</span> : null}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 476 | `                        <Select value={r.client_id ?? "none"} onValueChange={(v) => updateRow(r._id, { client_id: v === "none" ? null : v })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 477 | `                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 478 | `                          <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 479 | `                            <SelectItem value="none">— Sem cliente —</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `                            {clientList.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 481 | `                          </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 482 | `                        </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 483 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 484 | `                      <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `                        <div className="text-[11px] text-muted-foreground mb-1">Tag {r.tag_name && !r.tag_id ? <span className="text-amber-600">({r.tag_name})</span> : null}</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 486 | `                        <Select value={r.tag_id ?? "none"} onValueChange={(v) => updateRow(r._id, { tag_id: v === "none" ? null : v })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 487 | `                          <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 488 | `                          <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 489 | `                            <SelectItem value="none">— Sem tag —</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 490 | `                            {tagList.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 491 | `                          </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 492 | `                        </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 493 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 494 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `                    <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 496 | `                      <div className="text-[11px] text-muted-foreground">Prioridade:</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `                      <Select value={r.priority} onValueChange={(v) => updateRow(r._id, { priority: v as Row["priority"] })}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 498 | `                        <SelectTrigger className="h-8 w-36"><SelectValue /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 499 | `                        <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `                          <SelectItem value="low">Baixa</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `                          <SelectItem value="medium">Média</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `                          <SelectItem value="high">Alta</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 503 | `                          <SelectItem value="urgent">Urgente</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `                        </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 505 | `                      </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `                      <div className="text-[11px] text-muted-foreground ml-2">Status:</div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 507 | `                      <Select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 508 | `                        value={r.mark_completed ? "completed" : r.column_id ?? "none"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `                        onValueChange={(v) => updateRow(r._id, v === "completed"` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 510 | `                          ? { mark_completed: true, column_id: null }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `                          : { mark_completed: false, column_id: v === "none" ? null : v })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `                        <SelectTrigger className="h-8 w-48"><SelectValue placeholder="Nenhum status" /></SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `                        <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 515 | `                          <SelectItem value="none">— Nenhum status —</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 516 | `                          {columns.map((column) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 517 | `                            <SelectItem key={column.id} value={column.id}>{column.name}</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 518 | `                          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `                          <SelectItem value="completed">Concluídas</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 520 | `                        </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 521 | `                      </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 522 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 523 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 524 | `                  <Button variant="ghost" size="icon" onClick={() => removeRow(r._id)} className="text-muted-foreground hover:text-destructive">` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 525 | `                    <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 526 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 527 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 528 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 529 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 531 | `        </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 532 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 535 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 536 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
