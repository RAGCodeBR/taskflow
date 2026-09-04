# src/routes/_app/portal.financeiro.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useMutation, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { type RefObject, useEffect, useMemo, useRef, useState } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import { isBefore, startOfToday } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `import { Copy, FileText, Paperclip, Pencil, Plus, Trash2 } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 6 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 7 | `import { type ClientInvoice, useClientInvoices, useClients } from "@/hooks/use-data";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 8 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 9 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 11 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 12 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 13 | `import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 14 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 15 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 16 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 17 | `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 18 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 19 | `export const Route = createFileRoute("/_app/portal/financeiro")({ component: ClientFinancePage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 20 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 21 | `const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 22 | `const initialForm = { description: "", amount: "", dueDate: "", paymentMethod: "pix", paymentLink: "", pixKey: "" };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 23 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 24 | `function safeFileName(name: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 25 | `  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_").slice(-120) || "arquivo";` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 26 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 27 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 28 | `function ClientFinancePage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 29 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 30 | `  const { data: clients = [] } = useClients();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 31 | `  const { data: invoices = [] } = useClientInvoices();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 32 | `  const { isAdmin, isCollaborator, isClient, clientId: linkedClientId } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 33 | `  const [clientId, setClientId] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 34 | `  const [editorOpen, setEditorOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 35 | `  const [editingInvoice, setEditingInvoice] = useState<ClientInvoice | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 36 | `  const [invoiceToDelete, setInvoiceToDelete] = useState<ClientInvoice | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 37 | `  const [form, setForm] = useState(initialForm);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 38 | `  const [boletoFile, setBoletoFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 39 | `  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 40 | `  const boletoInput = useRef<HTMLInputElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 41 | `  const invoiceInput = useRef<HTMLInputElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 43 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 44 | `    if (isClient) setClientId(linkedClientId ?? "");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 45 | `    else if (!clientId && clients[0]) setClientId(clients[0].id);` | Define o caminho alternativo da condicao anterior. |
| 46 | `  }, [clientId, clients, isClient, linkedClientId]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 47 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 48 | `  const client = clients.find((item) => item.id === clientId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 49 | `  const items = useMemo(() => invoices.filter((invoice) => invoice.client_id === clientId).sort((a, b) => a.due_date.localeCompare(b.due_date)), [clientId, invoices]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 50 | `  const total = (kind: "open" | "paid" | "overdue") => items.filter((invoice) => kind === "paid" ? invoice.status === "paid" : kind === "overdue" ? invoice.status !== "paid" && isBefore(new Date(invoice.due_date), startOfToday()) : invoice.status !== "paid" && !isBefore(new Date(invoice.due_date), startOfToday())).reduce((sum, invoice) => sum + Number(invoice.amount), 0);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 51 | `  const canManageInvoices = isAdmin || isCollaborator;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 52 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 53 | `  const saveInvoice = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 55 | `      const amount = Number(form.amount.replace(",", "."));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 56 | `      if (!clientId || !form.description.trim() || !form.dueDate || !Number.isFinite(amount) || amount <= 0) throw new Error("Preencha a descrição, o valor e o vencimento da fatura.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 57 | `      if (form.paymentMethod === "pix" && !form.pixKey.trim()) throw new Error("Informe a chave Pix para esta fatura.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 58 | `      const data = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `        description: form.description.trim(), amount, due_date: form.dueDate, payment_method: form.paymentMethod,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 60 | `        payment_link: form.paymentMethod === "link" ? form.paymentLink.trim() || null : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 61 | `        pix_key: form.paymentMethod === "pix" ? form.pixKey.trim() : null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 62 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 63 | `      const result = editingInvoice` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `        ? await (supabase.from("client_invoices") as any).update(data).eq("id", editingInvoice.id).select().single()` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 65 | `        : await (supabase.from("client_invoices") as any).insert({ ...data, client_id: clientId }).select().single();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 66 | `      if (result.error) throw result.error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 67 | `      const saved = result.data as ClientInvoice;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 69 | `      const updates: Record<string, string | null> = {};` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `      const upload = async (file: File, kind: "boleto" | "nota") => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `        const path = \`${saved.id}/${kind}-${Date.now()}-${safeFileName(file.name)}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `        const { error } = await supabase.storage.from("invoice-documents").upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 74 | `        if (kind === "boleto") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 75 | `          updates.boleto_file_name = file.name; updates.boleto_storage_path = path; updates.boleto_mime_type = file.type || "application/octet-stream";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 76 | `        } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `          updates.invoice_file_name = file.name; updates.invoice_storage_path = path; updates.invoice_mime_type = file.type || "application/octet-stream";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 78 | `        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 79 | `      };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 80 | `      if (boletoFile) await upload(boletoFile, "boleto");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 81 | `      if (invoiceFile) await upload(invoiceFile, "nota");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 82 | `      if (Object.keys(updates).length) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 83 | `        const { error } = await (supabase.from("client_invoices") as any).update(updates).eq("id", saved.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `        if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 85 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 86 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 87 | `    onSuccess: () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 88 | `      void queryClient.invalidateQueries({ queryKey: ["client_invoices"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `      closeEditor();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `      toast.success(editingInvoice ? "Fatura atualizada." : "Fatura cadastrada para pagamento.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 92 | `    onError: (error: Error) => toast.error(error.message || "Não foi possível salvar a fatura."),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 93 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 94 | `  const deleteInvoice = useMutation({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 95 | `    mutationFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 96 | `      if (!invoiceToDelete) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `      const files = [invoiceToDelete.boleto_storage_path, invoiceToDelete.invoice_storage_path].filter(Boolean) as string[];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 98 | `      if (files.length) await supabase.storage.from("invoice-documents").remove(files);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 99 | `      const { error } = await (supabase.from("client_invoices") as any).delete().eq("id", invoiceToDelete.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 100 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 101 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 102 | `    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ["client_invoices"] }); setInvoiceToDelete(null); toast.success("Fatura apagada."); },` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 103 | `    onError: (error: Error) => toast.error(error.message || "Não foi possível apagar a fatura."),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 105 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 106 | `  const closeEditor = () => { setEditorOpen(false); setEditingInvoice(null); setForm(initialForm); setBoletoFile(null); setInvoiceFile(null); };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 107 | `  const openCreate = () => { closeEditor(); setEditorOpen(true); };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 108 | `  const openEdit = (invoice: ClientInvoice) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 109 | `    setEditingInvoice(invoice);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `    setForm({ description: invoice.description, amount: String(invoice.amount), dueDate: invoice.due_date, paymentMethod: invoice.payment_method, paymentLink: invoice.payment_link ?? "", pixKey: invoice.pix_key ?? "" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `    setBoletoFile(null); setInvoiceFile(null); setEditorOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 113 | `  const openFile = async (path: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 114 | `    const { data, error } = await supabase.storage.from("invoice-documents").createSignedUrl(path, 60 * 10);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `    if (error || !data?.signedUrl) { toast.error(error?.message || "Não foi possível abrir o arquivo."); return; }` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 116 | `    window.open(data.signedUrl, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 118 | `  const copyPix = async (key: string) => { await navigator.clipboard.writeText(key); toast.success("Chave Pix copiada."); };` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 119 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 120 | `  return <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 121 | `    <header className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-medium text-primary">Portal do Cliente</p><h1 className="text-2xl font-bold">Financeiro</h1><p className="text-sm text-muted-foreground">Consulte as faturas e pagamentos por cliente.</p></div>{canManageInvoices && <Button onClick={openCreate} disabled={!clientId}><Plus /> Cadastrar fatura</Button>}</header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 122 | `    {isClient ? <Card className="p-4"><p className="text-sm text-muted-foreground">Cliente vinculado</p><p className="mt-1 font-semibold">{client?.name ?? "Cliente não vinculado"}</p></Card> : <Card className="p-4"><p className="mb-2 text-sm font-medium">Cliente</p><Select value={clientId} onValueChange={setClientId}><SelectTrigger className="max-w-md"><SelectValue placeholder="Selecionar o cliente" /></SelectTrigger><SelectContent>{clients.map((currentClient) => <SelectItem key={currentClient.id} value={currentClient.id}>{currentClient.name}</SelectItem>)}</SelectContent></Select></Card>}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 123 | `    {!clientId ? <Card className="p-10 text-center text-sm text-muted-foreground">Cadastre ou selecione um cliente para ver o financeiro.</Card> : <><div className="grid gap-3 sm:grid-cols-3"><Metric label="Em aberto" value={total("open")} /><Metric label="Vencido" value={total("overdue")} /><Metric label="Pago" value={total("paid")} /></div><section className="space-y-3"><h2 className="text-lg font-semibold">Faturas de {client?.name}</h2>{items.map((invoice) => <Card key={invoice.id} className="space-y-3 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-medium">{invoice.description}</p><p className="text-sm text-muted-foreground">Vencimento: {invoice.due_date}</p></div><div className="flex items-center gap-2"><strong>{money.format(Number(invoice.amount))}</strong>{canManageInvoices && <><Button type="button" size="icon" variant="outline" aria-label={\`Editar ${invoice.description}\`} onClick={() => openEdit(invoice)}><Pencil /></Button><Button type="button" size="icon" variant="outline" className="text-destructive hover:text-destructive" aria-label={\`Apagar ${invoice.description}\`} onClick={() => setInvoiceToDelete(invoice)}><Trash2 /></Button></>}</div></div><InvoiceInstructions invoice={invoice} onOpenFile={openFile} onCopyPix={copyPix} /></Card>)}{!items.length && <Card className="p-10 text-center text-sm text-muted-foreground">Nenhuma fatura encontrada para este cliente.</Card>}</section></>}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 124 | `    <Dialog open={editorOpen} onOpenChange={(open) => { if (!open) closeEditor(); else setEditorOpen(true); }}><DialogContent className="max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editingInvoice ? "Editar fatura" : "Cadastrar fatura para pagamento"}</DialogTitle></DialogHeader><form className="space-y-4" onSubmit={(event) => { event.preventDefault(); saveInvoice.mutate(); }}><div className="space-y-2"><Label htmlFor="invoice-description">Descrição</Label><Input id="invoice-description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Ex.: Mensalidade de agosto" required /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="invoice-amount">Valor</Label><Input id="invoice-amount" type="number" min="0.01" step="0.01" inputMode="decimal" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0,00" required /></div><div className="space-y-2"><Label htmlFor="invoice-due-date">Vencimento</Label><Input id="invoice-due-date" type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} required /></div></div><div className="space-y-2"><Label htmlFor="invoice-method">Forma de pagamento</Label><Select value={form.paymentMethod} onValueChange={(paymentMethod) => setForm({ ...form, paymentMethod })}><SelectTrigger id="invoice-method"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pix">Pix</SelectItem><SelectItem value="boleto">Boleto</SelectItem><SelectItem value="link">Link de pagamento</SelectItem></SelectContent></Select></div>{form.paymentMethod === "pix" && <div className="space-y-2"><Label htmlFor="invoice-pix">Chave Pix</Label><Input id="invoice-pix" value={form.pixKey} onChange={(event) => setForm({ ...form, pixKey: event.target.value })} placeholder="CPF, e-mail, telefone ou chave aleatória" required /></div>}{form.paymentMethod === "link" && <div className="space-y-2"><Label htmlFor="invoice-link">Link de pagamento</Label><Input id="invoice-link" type="url" value={form.paymentLink} onChange={(event) => setForm({ ...form, paymentLink: event.target.value })} placeholder="https://" required /></div>}<DocumentPicker label="Boleto" existing={editingInvoice?.boleto_file_name} file={boletoFile} inputRef={boletoInput} onPick={setBoletoFile} /><DocumentPicker label="Nota fiscal / documento da fatura" existing={editingInvoice?.invoice_file_name} file={invoiceFile} inputRef={invoiceInput} onPick={setInvoiceFile} /><DialogFooter><Button type="button" variant="outline" onClick={closeEditor}>Cancelar</Button><Button type="submit" disabled={saveInvoice.isPending}>{saveInvoice.isPending ? "Salvando…" : editingInvoice ? "Salvar alterações" : "Cadastrar fatura"}</Button></DialogFooter></form></DialogContent></Dialog>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 125 | `    <AlertDialog open={!!invoiceToDelete} onOpenChange={(open) => !open && setInvoiceToDelete(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Apagar fatura?</AlertDialogTitle><AlertDialogDescription>A fatura “{invoiceToDelete?.description}” será excluída permanentemente, junto aos documentos anexados.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={deleteInvoice.isPending}>Cancelar</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={deleteInvoice.isPending} onClick={() => deleteInvoice.mutate()}>{deleteInvoice.isPending ? "Apagando…" : "Apagar fatura"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 126 | `  </div>;` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 127 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 128 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 129 | `function DocumentPicker({ label, existing, file, inputRef, onPick }: { label: string; existing?: string | null; file: File | null; inputRef: RefObject<HTMLInputElement | null>; onPick: (file: File | null) => void }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 130 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 131 | `    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 132 | `      <Label>{label}</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 133 | `      <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 134 | `        onFiles={(files) => onPick(files.item(0))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 135 | `        className="flex flex-wrap items-center gap-2"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 136 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `        <input ref={inputRef} type="file" className="hidden" accept="application/pdf,image/*,.xml,.doc,.docx" onChange={(event) => onPick(event.target.files?.[0] ?? null)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 138 | `        <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}><Paperclip /> {file ? "Trocar arquivo" : existing ? "Substituir arquivo" : "Anexar arquivo"}</Button>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 139 | `        <span className="max-w-full truncate text-sm text-muted-foreground">{file?.name ?? existing ?? "Nenhum arquivo anexado"}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 140 | `      </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 141 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 142 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 143 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 144 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 145 | `function InvoiceInstructions({ invoice, onOpenFile, onCopyPix }: { invoice: ClientInvoice; onOpenFile: (path: string) => void; onCopyPix: (key: string) => void }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 146 | `  return <div className="flex flex-wrap gap-2 border-t pt-3 text-sm"><span className="text-muted-foreground">Pagamento:</span>{invoice.payment_method === "pix" && invoice.pix_key && <Button size="sm" variant="outline" onClick={() => onCopyPix(invoice.pix_key!)}><Copy /> Copiar chave Pix</Button>}{invoice.payment_method === "boleto" && invoice.boleto_storage_path && <Button size="sm" variant="outline" onClick={() => onOpenFile(invoice.boleto_storage_path!)}><FileText /> Abrir boleto</Button>}{invoice.payment_method === "link" && invoice.payment_link && <Button size="sm" variant="outline" asChild><a href={invoice.payment_link} target="_blank" rel="noreferrer">Abrir pagamento</a></Button>}{invoice.invoice_storage_path && <Button size="sm" variant="outline" onClick={() => onOpenFile(invoice.invoice_storage_path!)}><FileText /> Nota fiscal / documento</Button>}</div>;` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 147 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 148 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 149 | `function Metric({ label, value }: { label: string; value: number }) { return <Card className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-xl font-bold">{money.format(value)}</p></Card>; }` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 150 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
