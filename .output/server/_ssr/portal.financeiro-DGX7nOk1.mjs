import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { e as useClients, q as useClientInvoices, u as useAuth, B as Button, C as Card, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, I as Input, d as DialogFooter, o as cn, p as buttonVariants } from "./router-DXKzFnT6.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DM4Ewr_J.mjs";
import { P as Plus, b as Pencil, T as Trash2, an as Copy, Z as FileText, a3 as Paperclip } from "../_libs/lucide-react.mjs";
import { i as isBefore, r as startOfToday } from "../_libs/date-fns.mjs";

import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
const initialForm = {
  description: "",
  amount: "",
  dueDate: "",
  paymentMethod: "pix",
  paymentLink: "",
  pixKey: ""
};
function safeFileName(name) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_").slice(-120) || "arquivo";
}
function ClientFinancePage() {
  const queryClient = useQueryClient();
  const {
    data: clients = []
  } = useClients();
  const {
    data: invoices = []
  } = useClientInvoices();
  const {
    isAdmin,
    isCollaborator,
    isClient,
    clientId: linkedClientId
  } = useAuth();
  const [clientId, setClientId] = reactExports.useState("");
  const [editorOpen, setEditorOpen] = reactExports.useState(false);
  const [editingInvoice, setEditingInvoice] = reactExports.useState(null);
  const [invoiceToDelete, setInvoiceToDelete] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(initialForm);
  const [boletoFile, setBoletoFile] = reactExports.useState(null);
  const [invoiceFile, setInvoiceFile] = reactExports.useState(null);
  const boletoInput = reactExports.useRef(null);
  const invoiceInput = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isClient) setClientId(linkedClientId ?? "");
    else if (!clientId && clients[0]) setClientId(clients[0].id);
  }, [clientId, clients, isClient, linkedClientId]);
  const client = clients.find((item) => item.id === clientId);
  const items = reactExports.useMemo(() => invoices.filter((invoice) => invoice.client_id === clientId).sort((a, b) => a.due_date.localeCompare(b.due_date)), [clientId, invoices]);
  const total = (kind) => items.filter((invoice) => kind === "paid" ? invoice.status === "paid" : kind === "overdue" ? invoice.status !== "paid" && isBefore(new Date(invoice.due_date), startOfToday()) : invoice.status !== "paid" && !isBefore(new Date(invoice.due_date), startOfToday())).reduce((sum, invoice) => sum + Number(invoice.amount), 0);
  const canManageInvoices = isAdmin || isCollaborator;
  const saveInvoice = useMutation({
    mutationFn: async () => {
      const amount = Number(form.amount.replace(",", "."));
      if (!clientId || !form.description.trim() || !form.dueDate || !Number.isFinite(amount) || amount <= 0) throw new Error("Preencha a descrição, o valor e o vencimento da fatura.");
      if (form.paymentMethod === "pix" && !form.pixKey.trim()) throw new Error("Informe a chave Pix para esta fatura.");
      const data = {
        description: form.description.trim(),
        amount,
        due_date: form.dueDate,
        payment_method: form.paymentMethod,
        payment_link: form.paymentMethod === "link" ? form.paymentLink.trim() || null : null,
        pix_key: form.paymentMethod === "pix" ? form.pixKey.trim() : null
      };
      const result = editingInvoice ? await supabase.from("client_invoices").update(data).eq("id", editingInvoice.id).select().single() : await supabase.from("client_invoices").insert({
        ...data,
        client_id: clientId
      }).select().single();
      if (result.error) throw result.error;
      const saved = result.data;
      const updates = {};
      const upload = async (file, kind) => {
        const path = `${saved.id}/${kind}-${Date.now()}-${safeFileName(file.name)}`;
        const {
          error
        } = await supabase.storage.from("invoice-documents").upload(path, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false
        });
        if (error) throw error;
        if (kind === "boleto") {
          updates.boleto_file_name = file.name;
          updates.boleto_storage_path = path;
          updates.boleto_mime_type = file.type || "application/octet-stream";
        } else {
          updates.invoice_file_name = file.name;
          updates.invoice_storage_path = path;
          updates.invoice_mime_type = file.type || "application/octet-stream";
        }
      };
      if (boletoFile) await upload(boletoFile, "boleto");
      if (invoiceFile) await upload(invoiceFile, "nota");
      if (Object.keys(updates).length) {
        const {
          error
        } = await supabase.from("client_invoices").update(updates).eq("id", saved.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["client_invoices"]
      });
      closeEditor();
      toast.success(editingInvoice ? "Fatura atualizada." : "Fatura cadastrada para pagamento.");
    },
    onError: (error) => toast.error(error.message || "Não foi possível salvar a fatura.")
  });
  const deleteInvoice = useMutation({
    mutationFn: async () => {
      if (!invoiceToDelete) return;
      const files = [invoiceToDelete.boleto_storage_path, invoiceToDelete.invoice_storage_path].filter(Boolean);
      if (files.length) await supabase.storage.from("invoice-documents").remove(files);
      const {
        error
      } = await supabase.from("client_invoices").delete().eq("id", invoiceToDelete.id);
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["client_invoices"]
      });
      setInvoiceToDelete(null);
      toast.success("Fatura apagada.");
    },
    onError: (error) => toast.error(error.message || "Não foi possível apagar a fatura.")
  });
  const closeEditor = () => {
    setEditorOpen(false);
    setEditingInvoice(null);
    setForm(initialForm);
    setBoletoFile(null);
    setInvoiceFile(null);
  };
  const openCreate = () => {
    closeEditor();
    setEditorOpen(true);
  };
  const openEdit = (invoice) => {
    setEditingInvoice(invoice);
    setForm({
      description: invoice.description,
      amount: String(invoice.amount),
      dueDate: invoice.due_date,
      paymentMethod: invoice.payment_method,
      paymentLink: invoice.payment_link ?? "",
      pixKey: invoice.pix_key ?? ""
    });
    setBoletoFile(null);
    setInvoiceFile(null);
    setEditorOpen(true);
  };
  const openFile = async (path) => {
    const {
      data,
      error
    } = await supabase.storage.from("invoice-documents").createSignedUrl(path, 60 * 10);
    if (error || !data?.signedUrl) {
      toast.error(error?.message || "Não foi possível abrir o arquivo.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };
  const copyPix = async (key) => {
    await navigator.clipboard.writeText(key);
    toast.success("Chave Pix copiada.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6 p-4 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-primary", children: "Portal do Cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Financeiro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Consulte as faturas e pagamentos por cliente." })
      ] }),
      canManageInvoices && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, disabled: !clientId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}),
        " Cadastrar fatura"
      ] })
    ] }),
    isClient ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cliente vinculado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", children: client?.name ?? "Cliente não vinculado" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-medium", children: "Cliente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: clientId, onValueChange: setClientId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecionar o cliente" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: clients.map((currentClient) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: currentClient.id, children: currentClient.name }, currentClient.id)) })
      ] })
    ] }),
    !clientId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "Cadastre ou selecione um cliente para ver o financeiro." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Em aberto", value: total("open") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Vencido", value: total("overdue") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Pago", value: total("paid") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold", children: [
          "Faturas de ",
          client?.name
        ] }),
        items.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "space-y-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: invoice.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Vencimento: ",
                invoice.due_date
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: money.format(Number(invoice.amount)) }),
              canManageInvoices && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "outline", "aria-label": `Editar ${invoice.description}`, onClick: () => openEdit(invoice), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "icon", variant: "outline", className: "text-destructive hover:text-destructive", "aria-label": `Apagar ${invoice.description}`, onClick: () => setInvoiceToDelete(invoice), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InvoiceInstructions, { invoice, onOpenFile: openFile, onCopyPix: copyPix })
        ] }, invoice.id)),
        !items.length && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-10 text-center text-sm text-muted-foreground", children: "Nenhuma fatura encontrada para este cliente." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editorOpen, onOpenChange: (open) => {
      if (!open) closeEditor();
      else setEditorOpen(true);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingInvoice ? "Editar fatura" : "Cadastrar fatura para pagamento" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: (event) => {
        event.preventDefault();
        saveInvoice.mutate();
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-description", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice-description", value: form.description, onChange: (event) => setForm({
            ...form,
            description: event.target.value
          }), placeholder: "Ex.: Mensalidade de agosto", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-amount", children: "Valor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice-amount", type: "number", min: "0.01", step: "0.01", inputMode: "decimal", value: form.amount, onChange: (event) => setForm({
              ...form,
              amount: event.target.value
            }), placeholder: "0,00", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-due-date", children: "Vencimento" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice-due-date", type: "date", value: form.dueDate, onChange: (event) => setForm({
              ...form,
              dueDate: event.target.value
            }), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-method", children: "Forma de pagamento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.paymentMethod, onValueChange: (paymentMethod) => setForm({
            ...form,
            paymentMethod
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "invoice-method", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pix", children: "Pix" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "boleto", children: "Boleto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "link", children: "Link de pagamento" })
            ] })
          ] })
        ] }),
        form.paymentMethod === "pix" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-pix", children: "Chave Pix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice-pix", value: form.pixKey, onChange: (event) => setForm({
            ...form,
            pixKey: event.target.value
          }), placeholder: "CPF, e-mail, telefone ou chave aleatória", required: true })
        ] }),
        form.paymentMethod === "link" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "invoice-link", children: "Link de pagamento" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "invoice-link", type: "url", value: form.paymentLink, onChange: (event) => setForm({
            ...form,
            paymentLink: event.target.value
          }), placeholder: "https://", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentPicker, { label: "Boleto", existing: editingInvoice?.boleto_file_name, file: boletoFile, inputRef: boletoInput, onPick: setBoletoFile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentPicker, { label: "Nota fiscal / documento da fatura", existing: editingInvoice?.invoice_file_name, file: invoiceFile, inputRef: invoiceInput, onPick: setInvoiceFile }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: closeEditor, children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: saveInvoice.isPending, children: saveInvoice.isPending ? "Salvando…" : editingInvoice ? "Salvar alterações" : "Cadastrar fatura" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!invoiceToDelete, onOpenChange: (open) => !open && setInvoiceToDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Apagar fatura?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "A fatura “",
          invoiceToDelete?.description,
          "” será excluída permanentemente, junto aos documentos anexados."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteInvoice.isPending, children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", disabled: deleteInvoice.isPending, onClick: () => deleteInvoice.mutate(), children: deleteInvoice.isPending ? "Apagando…" : "Apagar fatura" })
      ] })
    ] }) })
  ] });
}
function DocumentPicker({
  label,
  existing,
  file,
  inputRef,
  onPick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", className: "hidden", accept: "application/pdf,image/*,.xml,.doc,.docx", onChange: (event) => onPick(event.target.files?.[0] ?? null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: () => inputRef.current?.click(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, {}),
        " ",
        file ? "Trocar arquivo" : existing ? "Substituir arquivo" : "Anexar arquivo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-full truncate text-sm text-muted-foreground", children: file?.name ?? existing ?? "Nenhum arquivo anexado" })
    ] })
  ] });
}
function InvoiceInstructions({
  invoice,
  onOpenFile,
  onCopyPix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 border-t pt-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pagamento:" }),
    invoice.payment_method === "pix" && invoice.pix_key && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => onCopyPix(invoice.pix_key), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
      " Copiar chave Pix"
    ] }),
    invoice.payment_method === "boleto" && invoice.boleto_storage_path && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => onOpenFile(invoice.boleto_storage_path), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
      " Abrir boleto"
    ] }),
    invoice.payment_method === "link" && invoice.payment_link && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: invoice.payment_link, target: "_blank", rel: "noreferrer", children: "Abrir pagamento" }) }),
    invoice.invoice_storage_path && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => onOpenFile(invoice.invoice_storage_path), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
      " Nota fiscal / documento"
    ] })
  ] });
}
function Metric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xl font-bold", children: money.format(value) })
  ] });
}
export {
  ClientFinancePage as component
};
