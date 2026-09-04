# src/components/ClientNotesSheet.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { Checkbox } from "@/components/ui/checkbox";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { Plus, Trash2, Paperclip, FileText, Link2, ChevronDown, ChevronRight, Check, Loader2, ExternalLink } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { useClients } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import { AttachmentPreviewDialog, type PreviewableAttachment } from "@/components/AttachmentPreviewDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 18 | `const PREVIEWABLE_MIME_RE = /^(image\/|video\/|audio\/|text\/)|application\/pdf|json/i;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 19 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 20 | `interface ClientNote {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 21 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 23 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  content: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  done: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  position: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 27 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  updated_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 30 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 31 | `interface NoteAttachment {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 32 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  note_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 37 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `const sb = supabase as any;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `export function ClientNotesSheet({ open, onOpenChange, initialClientId, embedded = false }: {` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 42 | `  open: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 43 | `  onOpenChange: (v: boolean) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 44 | `  initialClientId?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 45 | `  embedded?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 46 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 48 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const [clientId, setClientId] = useState<string | null>(initialClientId ?? null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const [notes, setNotes] = useState<ClientNote[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const [loading, setLoading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 54 | `    if (initialClientId) setClientId(initialClientId);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 55 | `  }, [initialClientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 56 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 57 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 58 | `    if ((!open && !embedded) || clientId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 59 | `    if (clients[0]) setClientId(clients[0].id);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 60 | `  }, [open, clients, clientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `  const load = async (cid: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `    setLoading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `    const { data, error } = await sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `      .from("client_notes")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 66 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 67 | `      .eq("client_id", cid)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 68 | `      .order("done", { ascending: true })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 69 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 70 | `    setLoading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 71 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 72 | `    setNotes((data ?? []) as ClientNote[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 73 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 74 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 75 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 76 | `    if ((open || embedded) && clientId) void load(clientId);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 77 | `  }, [open, embedded, clientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 79 | `  const addNote = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 80 | `    if (!clientId || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 81 | `    const { data, error } = await sb.from("client_notes").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `      client_id: clientId, title: "Nova anotação", content: "", created_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `    }).select().single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 84 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 85 | `    setNotes((n) => [data as ClientNote, ...n]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 86 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 87 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 88 | `  const updateNote = async (id: string, patch: Partial<ClientNote>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 89 | `    setNotes((n) => n.map((x) => (x.id === id ? { ...x, ...patch } : x)));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `    const { error } = await sb.from("client_notes").update(patch).eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 92 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 93 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 94 | `  const deleteNote = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `    if (!confirm("Excluir esta anotação?")) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 96 | `    setNotes((n) => n.filter((x) => x.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 97 | `    const { error } = await sb.from("client_notes").delete().eq("id", id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `    if (error) toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 99 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 101 | `  const currentClient = useMemo(() => clients.find((c) => c.id === clientId), [clients, clientId]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 102 | `  const pendingCount = notes.filter((n) => !n.done).length;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 103 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 104 | `  const content = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 105 | `    <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 106 | `        {embedded ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `          <div className="border-b px-4 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 108 | `            <h2 className="text-lg font-semibold">Anotações do cliente</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 109 | `            <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 110 | `              Anotações livres, com checkbox e anexos. Role na horizontal para navegar.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 112 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 113 | `        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 114 | `          <SheetHeader className="border-b px-4 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 115 | `            <SheetTitle>Anotações do cliente</SheetTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 116 | `            <SheetDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 117 | `              Anotações livres, com checkbox e anexos. Role na horizontal para navegar.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `            </SheetDescription>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 119 | `          </SheetHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 120 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 121 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 122 | `        <div className="flex items-center gap-2 border-b px-4 py-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 123 | `          <Select value={clientId ?? undefined} onValueChange={(v) => setClientId(v)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 124 | `            <SelectTrigger className="w-[260px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 125 | `              <SelectValue placeholder="Selecione um cliente" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 126 | `            </SelectTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `            <SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 128 | `              {clients.map((c) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 129 | `                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 130 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 131 | `            </SelectContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 132 | `          </Select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `          <Button onClick={addNote} disabled={!clientId}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 134 | `            <Plus className="mr-1 h-4 w-4" /> Nova` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 135 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `          {currentClient && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `            <p className="ml-2 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 138 | `              {notes.length} anotação(ões) · {pendingCount} pendente(s)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 142 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 143 | `        <div className="kanban-scroll min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 144 | `          {loading ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 145 | `            <p className="text-sm text-muted-foreground">Carregando…</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 146 | `          ) : notes.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 147 | `            <p className="rounded border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 148 | `              {clientId ? "Nenhuma anotação ainda. Clique em \"Nova\"." : "Selecione um cliente."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 150 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 151 | `            <div className="flex h-full items-start gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 152 | `              {notes.map((note) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 153 | `                <div key={note.id} className="flex h-full w-80 shrink-0 flex-col overflow-y-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 154 | `                  <NoteCard` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 155 | `                    note={note}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 156 | `                    onChange={(p) => void updateNote(note.id, p)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 157 | `                    onDelete={() => void deleteNote(note.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 158 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 160 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 161 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 162 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 165 | `        {clientId && <ClientFilesPanel clientId={clientId} />}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 166 | `    </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 167 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 168 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 169 | `  if (embedded) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 170 | `    return <div className="flex min-h-[680px] flex-col">{content}</div>;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 171 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 172 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 173 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 174 | `    <Sheet open={open} onOpenChange={onOpenChange}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 175 | `      <SheetContent side="bottom" className="flex h-[85vh] w-full flex-col p-0 sm:max-w-none">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 176 | `        {content}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 177 | `      </SheetContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 178 | `    </Sheet>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 179 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 180 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 181 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 182 | `function NoteCard({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 183 | `  note, onChange, onDelete,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 184 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `  note: ClientNote;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 186 | `  onChange: (p: Partial<ClientNote>) => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 187 | `  onDelete: () => void;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 188 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 189 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `  const [expanded, setExpanded] = useState(true);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `  const [title, setTitle] = useState(note.title);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `  const [content, setContent] = useState(note.content);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `  const [atts, setAtts] = useState<NoteAttachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `  const [urls, setUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `  const [uploading, setUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `  const [previewAtt, setPreviewAtt] = useState<PreviewableAttachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 198 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 199 | `  // Track what's actually persisted, so we don't clobber in-progress typing` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 200 | `  const savedTitleRef = useRef(note.title);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 201 | `  const savedContentRef = useRef(note.content);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 202 | `  const titleRef = useRef(title);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 203 | `  const contentRef = useRef(content);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 204 | `  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 205 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 206 | `  useEffect(() => { titleRef.current = title; }, [title]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 207 | `  useEffect(() => { contentRef.current = content; }, [content]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 208 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 209 | `  // Re-sync from props ONLY when there are no unsaved local edits` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 210 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 211 | `    if (titleRef.current === savedTitleRef.current) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 212 | `      savedTitleRef.current = note.title;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `      setTitle(note.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 214 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 215 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 216 | `  }, [note.title]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 218 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 219 | `    if (contentRef.current === savedContentRef.current) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 220 | `      savedContentRef.current = note.content;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `      setContent(note.content);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 223 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 224 | `  }, [note.content]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 225 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 226 | `  const flushSave = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 227 | `    const nextTitle = titleRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 228 | `    const nextContent = contentRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 229 | `    const patch: Partial<ClientNote> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 230 | `    if (nextTitle !== savedTitleRef.current) patch.title = nextTitle;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 231 | `    if (nextContent !== savedContentRef.current) patch.content = nextContent;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 232 | `    if (Object.keys(patch).length === 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 233 | `    setSaveState("saving");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `    // Mark as saved optimistically so prop-sync from onChange doesn't clobber` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 235 | `    savedTitleRef.current = nextTitle;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 236 | `    savedContentRef.current = nextContent;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 237 | `    const { error } = await sb.from("client_notes").update(patch).eq("id", note.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 239 | `      setSaveState("error");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 240 | `      toast.error(\`Erro ao salvar: ${error.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 241 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 242 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 243 | `    onChange(patch);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 244 | `    setSaveState("saved");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 245 | `    setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1500);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 246 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 247 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 248 | `  // Debounced autosave on title/content change` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 249 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 250 | `    if (title === savedTitleRef.current && content === savedContentRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 251 | `    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 252 | `    saveTimerRef.current = setTimeout(() => { void flushSave(); }, 600);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 253 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 254 | `      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 255 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 256 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 257 | `  }, [title, content]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 258 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 259 | `  // Flush on unmount (sheet close / navigation)` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 260 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 261 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 262 | `      if (titleRef.current !== savedTitleRef.current || contentRef.current !== savedContentRef.current) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 263 | `        void flushSave();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 264 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 265 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 266 | `    // eslint-disable-next-line react-hooks/exhaustive-deps` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 267 | `  }, []);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 269 | `  const loadAtts = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 270 | `    const { data } = await sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 271 | `      .from("client_note_attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 273 | `      .eq("note_id", note.id)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 274 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 275 | `    const list = (data ?? []) as NoteAttachment[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `    setAtts(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `    const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 278 | `    await Promise.all(list` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 279 | `      .filter((a) => a.mime_type !== "text/uri-list")` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 280 | `      .map(async (a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 281 | `        const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 282 | `          .from("task-attachments").createSignedUrl(a.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `        if (signed) next[a.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 284 | `      }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 285 | `    setUrls(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 286 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 287 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 288 | `  useEffect(() => { if (expanded) void loadAtts(); }, [expanded, note.id]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 289 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 290 | `  const onFiles = async (files: FileList | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 291 | `    if (!files || files.length === 0 || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 292 | `    setUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `    for (const file of Array.from(files)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 294 | `      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 295 | `      const path = \`notes/${note.id}/${Date.now()}_${safe}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 296 | `      const { error: upErr } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 297 | `        .from("task-attachments").upload(path, file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `      if (upErr) { toast.error(upErr.message); continue; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 299 | `      const { error: insErr } = await sb.from("client_note_attachments").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 300 | `        note_id: note.id, file_name: file.name, storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `        mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 303 | `      if (insErr) toast.error(insErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 304 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 305 | `    setUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `    void loadAtts();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 308 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 309 | `  const addLink = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 310 | `    const url = prompt("Cole o link");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 311 | `    if (!url || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 312 | `    const { error } = await sb.from("client_note_attachments").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 313 | `      note_id: note.id, file_name: url, storage_path: url,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 314 | `      mime_type: "text/uri-list", uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 315 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 316 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 317 | `    void loadAtts();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 319 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 320 | `  const removeAtt = async (a: NoteAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 321 | `    if (a.mime_type !== "text/uri-list") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 322 | `      await supabase.storage.from("task-attachments").remove([a.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 323 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 324 | `    await sb.from("client_note_attachments").delete().eq("id", a.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 325 | `    void loadAtts();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 327 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 328 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 329 | `    <div className={\`rounded-lg border bg-card ${note.done ? "opacity-70" : ""}\`}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 330 | `      <div className="flex items-start gap-2 p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 331 | `        <Checkbox` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 332 | `          checked={note.done}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 333 | `          onCheckedChange={(v) => onChange({ done: !!v })}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 334 | `          className="mt-1"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 335 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 336 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 337 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `          onClick={() => setExpanded((v) => !v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 339 | `          className="mt-0.5 text-muted-foreground hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 340 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 342 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 343 | `        <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 344 | `          value={title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `          onChange={(e) => setTitle(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 346 | `          onBlur={() => void flushSave()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 347 | `          className={\`h-8 flex-1 border-0 px-1 text-sm font-medium shadow-none focus-visible:ring-0 ${note.done ? "line-through" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 348 | `          placeholder="Título"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `        <SaveIndicator state={saveState} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 351 | `        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={onDelete}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 352 | `          <Trash2 className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 353 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 354 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 355 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 356 | `      {expanded && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 357 | `        <div className="space-y-3 border-t px-3 pb-3 pt-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `          <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `            value={content}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `            onChange={(e) => setContent(e.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 361 | `            onBlur={() => void flushSave()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 362 | `            placeholder="Escreva aqui informações, contexto, lembretes…"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 363 | `            className="min-h-[120px] resize-y text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 364 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 366 | `          <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `            onFiles={(files) => void onFiles(files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 368 | `            disabled={uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 369 | `            className="rounded-md border border-dashed bg-muted/30 p-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 370 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 371 | `            <div className="mb-2 flex items-center justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `              <p className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 373 | `                <Paperclip className="h-3 w-3" /> Arquivos e imagens ({atts.length})` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 374 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 375 | `              <div className="flex gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `                <label className="cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `                  <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 378 | `                    type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `                    multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `                    accept="*/*"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 381 | `                    className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 382 | `                    onChange={(e) => void onFiles(e.target.files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 383 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `                  <span className="rounded border bg-background px-2 py-0.5 text-[10px] hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `                    {uploading ? "Enviando…" : "+ Arquivo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 387 | `                </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 388 | `                <button type="button" onClick={addLink} className="rounded border bg-background px-2 py-0.5 text-[10px] hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 389 | `                  + Link` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 390 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 391 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 392 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 393 | `            <p className="mb-2 text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `              Aceita qualquer tipo: PDF, Word, Excel, PNG, JPG, vídeo, áudio, etc. Imagens, PDFs, vídeos, áudios e textos abrem aqui; os demais baixam ou abrem em nova aba.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 396 | `            {atts.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 397 | `              <p className="rounded border border-dashed bg-background/50 p-3 text-center text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 398 | `                Nenhum arquivo. Clique em "+ Arquivo" para enviar.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 400 | `            ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 401 | `              <div className="grid grid-cols-3 gap-1.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 402 | `                {atts.map((a) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 403 | `                  const isLink = a.mime_type === "text/uri-list";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 404 | `                  const isImage = !isLink && a.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 405 | `                  const canPreview = !isLink && PREVIEWABLE_MIME_RE.test(a.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 406 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 407 | `                  const handleOpen = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 408 | `                    if (isLink) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 409 | `                      window.open(a.storage_path, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `                      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 411 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 412 | `                    if (canPreview) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 413 | `                      setPreviewAtt({ file_name: a.file_name, storage_path: a.storage_path, mime_type: a.mime_type });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `                      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 415 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 416 | `                    const url = urls[a.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 417 | `                    if (url) window.open(url, "_blank", "noopener,noreferrer");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 418 | `                  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 419 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 420 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 421 | `                    <div key={a.id} className="group relative aspect-square overflow-hidden rounded border bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `                        onClick={handleOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 425 | `                        className="block h-full w-full text-left"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `                        title={a.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `                        {isImage && urls[a.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 429 | `                          <img src={urls[a.id]} alt={a.file_name} className="h-full w-full object-cover" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 430 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `                          <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 p-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 432 | `                            {isLink ? <Link2 className="h-4 w-4" /> : canPreview ? <FileText className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 433 | `                            <span className="line-clamp-2 w-full break-all text-center text-[8px] leading-tight">{a.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 435 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `                        onClick={() => void removeAtt(a)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 440 | `                        className="absolute right-0.5 top-0.5 hidden rounded bg-black/60 p-0.5 text-white group-hover:block"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 441 | `                        title="Remover"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 443 | `                        <Trash2 className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 444 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 446 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 447 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 448 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 449 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `          </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 451 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 452 | `          <p className="text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `            Atualizado em {format(new Date(note.updated_at), "dd MMM yyyy HH:mm", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 455 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 456 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 457 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 458 | `      <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 459 | `        open={!!previewAtt}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 460 | `        onOpenChange={(o) => { if (!o) setPreviewAtt(null); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 461 | `        attachment={previewAtt}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 465 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 466 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 467 | `function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" | "error" }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 468 | `  if (state === "idle") return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 469 | `  if (state === "saving") return (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 470 | `    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 471 | `      <Loader2 className="h-3 w-3 animate-spin" /> salvando` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 473 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 474 | `  if (state === "saved") return (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 475 | `    <span className="flex items-center gap-1 text-[10px] text-emerald-600">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 476 | `      <Check className="h-3 w-3" /> salvo` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 478 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 479 | `  return <span className="text-[10px] text-destructive">erro</span>;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 480 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 481 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 482 | `interface ClientFile {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 483 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 484 | `  client_id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 485 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 487 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 488 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 491 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 492 | `function ClientFilesPanel({ clientId }: { clientId: string }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 493 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 494 | `  const [files, setFiles] = useState<ClientFile[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 495 | `  const [urls, setUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 496 | `  const [uploading, setUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 497 | `  const [preview, setPreview] = useState<PreviewableAttachment | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 498 | `  const [collapsed, setCollapsed] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 499 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 500 | `  const load = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 501 | `    const { data, error } = await sb` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 502 | `      .from("client_files")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `      .eq("client_id", clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 506 | `    if (error) { toast.error(error.message); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 507 | `    const list = (data ?? []) as ClientFile[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 508 | `    setFiles(list);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `    const next: Record<string, string> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 510 | `    await Promise.all(list.map(async (f) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 511 | `      const { data: signed } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 512 | `        .from("task-attachments").createSignedUrl(f.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `      if (signed) next[f.id] = signed.signedUrl;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 514 | `    }));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `    setUrls(next);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 517 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 518 | `  useEffect(() => { void load(); /* eslint-disable-next-line */ }, [clientId]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 519 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 520 | `  const onFiles = async (fl: FileList | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 521 | `    if (!fl || fl.length === 0 || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 522 | `    setUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 523 | `    for (const file of Array.from(fl)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 524 | `      const safe = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 525 | `      const path = \`clients/${clientId}/${Date.now()}_${safe}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 526 | `      const { error: upErr } = await supabase.storage.from("task-attachments").upload(path, file);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 527 | `      if (upErr) { toast.error(upErr.message); continue; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 528 | `      const { error: insErr } = await sb.from("client_files").insert({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 529 | `        client_id: clientId, file_name: file.name, storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `        mime_type: file.type, size_bytes: file.size, uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 531 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 532 | `      if (insErr) toast.error(insErr.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 533 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 534 | `    setUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 537 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 538 | `  const remove = async (f: ClientFile) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 539 | `    if (!confirm(\`Excluir "${f.file_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 540 | `    await supabase.storage.from("task-attachments").remove([f.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 541 | `    await sb.from("client_files").delete().eq("id", f.id);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 542 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 544 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 545 | `  const open = (f: ClientFile) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 546 | `    const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 547 | `    if (canPreview) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 548 | `      setPreview({ file_name: f.file_name, storage_path: f.storage_path, mime_type: f.mime_type });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 550 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 551 | `    const url = urls[f.id];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 552 | `    if (url) window.open(url, "_blank", "noopener,noreferrer");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 553 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 554 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 555 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 556 | `    <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 557 | `      onFiles={(files) => void onFiles(files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 558 | `      disabled={uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `      className="border-t bg-muted/20"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 560 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `      <div className="flex items-center justify-between px-4 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 562 | `        <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 563 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `          onClick={() => setCollapsed((v) => !v)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 565 | `          className="flex items-center gap-2 text-sm font-medium hover:text-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 566 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 568 | `          <Paperclip className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 569 | `          Arquivos do cliente ({files.length})` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `        </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 571 | `        <label className="cursor-pointer">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 572 | `          <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 573 | `            type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `            multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `            accept="*/*"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `            className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 577 | `            onChange={(e) => void onFiles(e.target.files)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 578 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `          <span className="rounded border bg-background px-3 py-1 text-xs hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `            {uploading ? "Enviando…" : "+ Adicionar arquivo"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 584 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 585 | `      {!collapsed && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 586 | `        <div className="max-h-[28vh] overflow-y-auto px-4 pb-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 587 | `          <p className="mb-2 text-[11px] text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 588 | `            PDF, Word, Excel, imagens, vídeos, áudio, qualquer tipo. Imagens, PDF, vídeo, áudio e texto abrem aqui; os demais abrem em nova aba.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 589 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 590 | `          {files.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `            <p className="rounded border border-dashed bg-background/50 p-4 text-center text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 592 | `              Nenhum arquivo enviado ainda para este cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 594 | `          ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 596 | `              {files.map((f) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 597 | `                const isImage = f.mime_type?.startsWith("image/");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 598 | `                const canPreview = PREVIEWABLE_MIME_RE.test(f.mime_type ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 599 | `                return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 600 | `                  <div key={f.id} className="group relative aspect-square overflow-hidden rounded border bg-background">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 601 | `                    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 602 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 603 | `                      onClick={() => open(f)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 604 | `                      className="block h-full w-full text-left"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 605 | `                      title={f.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 606 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `                      {isImage && urls[f.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `                        <img src={urls[f.id]} alt={f.file_name} className="h-full w-full object-cover" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 609 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `                        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 611 | `                          {canPreview ? <FileText className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 612 | `                          <span className="line-clamp-2 w-full break-all text-center text-[9px] leading-tight">{f.file_name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 613 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 614 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 615 | `                    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 616 | `                    <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 617 | `                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 618 | `                      onClick={() => void remove(f)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 619 | `                      className="absolute right-0.5 top-0.5 hidden rounded bg-black/60 p-0.5 text-white group-hover:block"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 620 | `                      title="Excluir"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 621 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 622 | `                      <Trash2 className="h-3 w-3" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 623 | `                    </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 624 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 625 | `                );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 626 | `              })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 627 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 628 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 630 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 631 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 632 | `      <AttachmentPreviewDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 633 | `        open={!!preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `        onOpenChange={(o) => { if (!o) setPreview(null); }}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 635 | `        attachment={preview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `    </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 638 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 639 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 640 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
