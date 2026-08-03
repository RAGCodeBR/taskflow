import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as useSensors, d as useSensor, D as DndContext, f as closestCenter, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, a as arrayMove, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { y as Route, B as Button, C as Card, I as Input, L as Label, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./router-DXKzFnT6.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, d as Textarea } from "./tabs-D14-kHfb.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Collapsible, a as CollapsibleTrigger, b as CollapsibleContent } from "./collapsible-DUtqt5i7.mjs";
import { D as LoaderCircle, aj as ArrowLeft, ad as ImageUp, a8 as Save, P as Plus, j as ChevronDown, b as Pencil, T as Trash2, U as Users } from "../_libs/lucide-react.mjs";

import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/unenv.mjs";


import "../_libs/seroval-plugins.mjs";


import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
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
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
const EMPTY_DEPARTMENTS = [];
const EMPTY_EMPLOYEES = [];
const EMPTY_SYSTEM_ACCESSES = [];
function EditClientPage() {
  const {
    clientId
  } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: client,
    isLoading
  } = useQuery({
    queryKey: ["clients", clientId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("clients").select("*").eq("id", clientId).single();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: departments = EMPTY_DEPARTMENTS
  } = useQuery({
    queryKey: ["client-departments", clientId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("client_departments").select("*").eq("client_id", clientId).order("position").order("created_at");
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: employees = EMPTY_EMPLOYEES
  } = useQuery({
    queryKey: ["client-department-employees", clientId, departments.map((department) => department.id)],
    enabled: departments.length > 0,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("client_department_employees").select("*").in("department_id", departments.map((department) => department.id)).order("full_name");
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: systemAccesses = EMPTY_SYSTEM_ACCESSES
  } = useQuery({
    queryKey: ["client-system-accesses", clientId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("client_system_accesses").select("*").eq("client_id", clientId).order("title");
      if (error) throw error;
      return data ?? [];
    }
  });
  const [saving, setSaving] = reactExports.useState(false);
  const [cnpj, setCnpj] = reactExports.useState("");
  const [legalName, setLegalName] = reactExports.useState("");
  const [tradeName, setTradeName] = reactExports.useState("");
  const [stateRegistration, setStateRegistration] = reactExports.useState("");
  const [municipalRegistration, setMunicipalRegistration] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [responsible, setResponsible] = reactExports.useState("");
  const [color, setColor] = reactExports.useState("#1e3a8a");
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(null);
  const [departmentFormOpen, setDepartmentFormOpen] = reactExports.useState(false);
  const [departmentName, setDepartmentName] = reactExports.useState("");
  const [editingDepartmentId, setEditingDepartmentId] = reactExports.useState(null);
  const [employeeFormDepartmentId, setEmployeeFormDepartmentId] = reactExports.useState(null);
  const [editingEmployeeId, setEditingEmployeeId] = reactExports.useState(null);
  const [employeeName, setEmployeeName] = reactExports.useState("");
  const [employeeCbo, setEmployeeCbo] = reactExports.useState("");
  const [employeeRole, setEmployeeRole] = reactExports.useState("");
  const [employeeSalary, setEmployeeSalary] = reactExports.useState("");
  const [employeeActivities, setEmployeeActivities] = reactExports.useState("");
  const [employeeAvatarFile, setEmployeeAvatarFile] = reactExports.useState(null);
  const [employeeAvatarPreview, setEmployeeAvatarPreview] = reactExports.useState(null);
  const [employeeAvatarUrls, setEmployeeAvatarUrls] = reactExports.useState({});
  const [selectedEmployee, setSelectedEmployee] = reactExports.useState(null);
  const [employeeDialogPosition, setEmployeeDialogPosition] = reactExports.useState({
    x: 0,
    y: 0
  });
  const [systemAccessFormOpen, setSystemAccessFormOpen] = reactExports.useState(false);
  const [editingSystemAccessId, setEditingSystemAccessId] = reactExports.useState(null);
  const [systemAccessTitle, setSystemAccessTitle] = reactExports.useState("");
  const [systemAccessLogin, setSystemAccessLogin] = reactExports.useState("");
  const [systemAccessPassword, setSystemAccessPassword] = reactExports.useState("");
  const [systemAccessNotes, setSystemAccessNotes] = reactExports.useState("");
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8
    }
  }));
  reactExports.useEffect(() => {
    if (!client) return;
    setCnpj(client.cnpj ?? "");
    setLegalName(client.legal_name ?? "");
    setTradeName(client.trade_name ?? "");
    setStateRegistration(client.state_registration ?? "");
    setMunicipalRegistration(client.municipal_registration ?? "");
    setAddress(client.address ?? "");
    setPhone(client.phone ?? "");
    setEmail(client.email ?? "");
    setResponsible(client.responsible ?? "");
    setColor(client.color ?? "#1e3a8a");
  }, [client]);
  reactExports.useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);
  reactExports.useEffect(() => {
    if (!employeeAvatarFile) {
      setEmployeeAvatarPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(employeeAvatarFile);
    setEmployeeAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [employeeAvatarFile]);
  reactExports.useEffect(() => {
    let cancelled = false;
    const loadEmployeeAvatars = async () => {
      const employeesWithAvatar = employees.filter((employee) => employee.avatar_path);
      if (employeesWithAvatar.length === 0) {
        if (!cancelled) setEmployeeAvatarUrls((current) => Object.keys(current).length === 0 ? current : {});
        return;
      }
      const entries = await Promise.all(employeesWithAvatar.map(async (employee) => {
        const {
          data
        } = await supabase.storage.from("task-attachments").createSignedUrl(employee.avatar_path, 3600);
        return [employee.id, data?.signedUrl ?? ""];
      }));
      if (!cancelled) setEmployeeAvatarUrls(Object.fromEntries(entries));
    };
    void loadEmployeeAvatars();
    return () => {
      cancelled = true;
    };
  }, [employees]);
  const save = async () => {
    const name = tradeName.trim() || legalName.trim() || client?.name;
    if (!name) {
      toast.error("Preencha o Nome fantasia ou a Razão social.");
      return;
    }
    setSaving(true);
    let avatarPath = client.avatar_path;
    if (avatarFile) {
      const extension = avatarFile.name.split(".").pop()?.toLowerCase() || "png";
      const nextAvatarPath = `clients/${clientId}/avatar-${Date.now()}.${extension}`;
      const {
        error: uploadError
      } = await supabase.storage.from("task-attachments").upload(nextAvatarPath, avatarFile, {
        contentType: avatarFile.type
      });
      if (uploadError) {
        setSaving(false);
        toast.error(`Não foi possível enviar o logo: ${uploadError.message}`);
        return;
      }
      avatarPath = nextAvatarPath;
    }
    const {
      error
    } = await supabase.from("clients").update({
      name,
      cnpj: cnpj || null,
      legal_name: legalName || null,
      trade_name: tradeName || null,
      state_registration: stateRegistration || null,
      municipal_registration: municipalRegistration || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      responsible: responsible || null,
      color,
      avatar_path: avatarPath
    }).eq("id", clientId);
    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }
    if (avatarFile && client.avatar_path && client.avatar_path !== avatarPath) {
      await supabase.storage.from("task-attachments").remove([client.avatar_path]);
    }
    setSaving(false);
    queryClient.invalidateQueries({
      queryKey: ["clients"]
    });
    toast.success("Cliente atualizado");
    navigate({
      to: "/clients"
    });
  };
  const saveDepartment = async () => {
    if (!departmentName.trim()) {
      toast.error("Informe o nome do departamento.");
      return;
    }
    const {
      error
    } = editingDepartmentId ? await supabase.from("client_departments").update({
      name: departmentName.trim()
    }).eq("id", editingDepartmentId) : await supabase.from("client_departments").insert({
      client_id: clientId,
      name: departmentName.trim(),
      position: departments.length
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-departments", clientId]
    });
    setDepartmentName("");
    setDepartmentFormOpen(false);
    setEditingDepartmentId(null);
    toast.success(editingDepartmentId ? "Departamento atualizado" : "Departamento cadastrado");
  };
  const startDepartmentEdit = (department) => {
    setEditingDepartmentId(department.id);
    setDepartmentName(department.name);
    setDepartmentFormOpen(true);
  };
  const deleteDepartment = async (department) => {
    if (!confirm(`Excluir o departamento "${department.name}" e todos os seus funcionários?`)) return;
    const {
      error
    } = await supabase.from("client_departments").delete().eq("id", department.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-departments", clientId]
    });
    queryClient.invalidateQueries({
      queryKey: ["client-department-employees", clientId]
    });
    toast.success("Departamento excluído");
  };
  const handleDepartmentDragEnd = async ({
    active,
    over
  }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = departments.findIndex((department) => department.id === active.id);
    const newIndex = departments.findIndex((department) => department.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(departments, oldIndex, newIndex);
    const results = await Promise.all(reordered.map((department, position) => supabase.from("client_departments").update({
      position
    }).eq("id", department.id)));
    const error = results.find((result) => result.error)?.error;
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-departments", clientId]
    });
  };
  const resetEmployeeForm = () => {
    setEmployeeFormDepartmentId(null);
    setEditingEmployeeId(null);
    setEmployeeName("");
    setEmployeeCbo("");
    setEmployeeRole("");
    setEmployeeSalary("");
    setEmployeeActivities("");
    setEmployeeAvatarFile(null);
  };
  const saveEmployee = async () => {
    if (!employeeName.trim() || !employeeFormDepartmentId) {
      toast.error("Informe o nome completo do funcionário.");
      return;
    }
    const employeeData = {
      department_id: employeeFormDepartmentId,
      full_name: employeeName.trim(),
      cbo: employeeCbo.trim() || null,
      role: employeeRole.trim() || null,
      salary: parseSalary(employeeSalary),
      activities: employeeActivities.trim() || null
    };
    const {
      data: savedEmployee,
      error
    } = editingEmployeeId ? await supabase.from("client_department_employees").update(employeeData).eq("id", editingEmployeeId).select().single() : await supabase.from("client_department_employees").insert(employeeData).select().single();
    if (error) {
      toast.error(error.message);
      return;
    }
    if (employeeAvatarFile && savedEmployee) {
      const extension = employeeAvatarFile.name.split(".").pop()?.toLowerCase() || "png";
      const avatarPath = `clients/${clientId}/departments/${employeeFormDepartmentId}/employees/${savedEmployee.id}-${Date.now()}.${extension}`;
      const {
        error: uploadError
      } = await supabase.storage.from("task-attachments").upload(avatarPath, employeeAvatarFile, {
        contentType: employeeAvatarFile.type
      });
      if (uploadError) {
        toast.error(`Funcionário salvo, mas não foi possível enviar a foto: ${uploadError.message}`);
      } else {
        const {
          error: avatarError
        } = await supabase.from("client_department_employees").update({
          avatar_path: avatarPath
        }).eq("id", savedEmployee.id);
        if (avatarError) toast.error(`Não foi possível vincular a foto: ${avatarError.message}`);
      }
    }
    queryClient.invalidateQueries({
      queryKey: ["client-department-employees", clientId]
    });
    resetEmployeeForm();
    toast.success(editingEmployeeId ? "Funcionário atualizado" : "Funcionário cadastrado");
  };
  const startEmployeeEdit = (employee) => {
    setEmployeeFormDepartmentId(employee.department_id);
    setEditingEmployeeId(employee.id);
    setEmployeeName(employee.full_name);
    setEmployeeCbo(employee.cbo ?? "");
    setEmployeeRole(employee.role ?? "");
    setEmployeeSalary(employee.salary === null ? "" : formatSalary(employee.salary));
    setEmployeeActivities(employee.activities ?? "");
    setEmployeeAvatarFile(null);
  };
  const deleteEmployee = async (employee) => {
    if (!confirm(`Excluir o funcionário "${employee.full_name}"?`)) return;
    const {
      error
    } = await supabase.from("client_department_employees").delete().eq("id", employee.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-department-employees", clientId]
    });
    toast.success("Funcionário excluído");
  };
  const resetSystemAccessForm = () => {
    setSystemAccessFormOpen(false);
    setEditingSystemAccessId(null);
    setSystemAccessTitle("");
    setSystemAccessLogin("");
    setSystemAccessPassword("");
    setSystemAccessNotes("");
  };
  const saveSystemAccess = async () => {
    if (!systemAccessTitle.trim() || !systemAccessLogin.trim() || !systemAccessPassword) {
      toast.error("Informe o título, login e senha do acesso.");
      return;
    }
    const values = {
      title: systemAccessTitle.trim(),
      login: systemAccessLogin.trim(),
      password: systemAccessPassword,
      notes: systemAccessNotes.trim() || null
    };
    const {
      error
    } = editingSystemAccessId ? await supabase.from("client_system_accesses").update(values).eq("id", editingSystemAccessId) : await supabase.from("client_system_accesses").insert({
      ...values,
      client_id: clientId
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-system-accesses", clientId]
    });
    const wasEditing = !!editingSystemAccessId;
    resetSystemAccessForm();
    toast.success(wasEditing ? "Acesso atualizado" : "Acesso cadastrado");
  };
  const startSystemAccessEdit = (access) => {
    setEditingSystemAccessId(access.id);
    setSystemAccessTitle(access.title);
    setSystemAccessLogin(access.login);
    setSystemAccessPassword(access.password);
    setSystemAccessNotes(access.notes ?? "");
    setSystemAccessFormOpen(true);
  };
  const deleteSystemAccess = async (access) => {
    if (!confirm(`Excluir o acesso "${access.title}"?`)) return;
    const {
      error
    } = await supabase.from("client_system_accesses").delete().eq("id", access.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["client-system-accesses", clientId]
    });
    toast.success("Acesso excluído");
  };
  const startEmployeeDialogDrag = (event) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const initialPosition = employeeDialogPosition;
    const onMove = (moveEvent) => {
      setEmployeeDialogPosition({
        x: initialPosition.x + moveEvent.clientX - startX,
        y: initialPosition.y + moveEvent.clientY - startY
      });
    };
    const onEnd = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-64 place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin" }) });
  }
  if (!client) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Cliente não encontrado." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients", children: "Voltar para clientes" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "icon", variant: "ghost", title: "Voltar para clientes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Dados do cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Atualize todos os dados cadastrados do cliente." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "client", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "client", children: "Dados do cliente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "departments", children: "Departamentos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "system", children: "Sistemas" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "client", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome exibido pelo sistema", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: client.name, disabled: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Logo do cliente", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-client-avatar", className: "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 transition-colors hover:bg-primary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUp, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Alterar logo do cliente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "PNG, JPG ou WebP" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "edit-client-avatar", type: "file", accept: "image/png,image/jpeg,image/webp", className: "sr-only", onChange: (event) => setAvatarFile(event.target.files?.[0] ?? null) }),
          avatarFile && avatarPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border bg-muted/30 p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarPreview, alt: "Prévia do logo selecionado", className: "h-10 w-10 rounded object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Imagem selecionada" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", title: avatarFile.name, children: avatarFile.name })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 border-t pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Dados cadastrais" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CNPJ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: cnpj, onChange: (event) => setCnpj(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome fantasia", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tradeName, onChange: (event) => setTradeName(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Razão social", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: legalName, onChange: (event) => setLegalName(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Responsável", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: responsible, onChange: (event) => setResponsible(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Inscrição Estadual", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: stateRegistration, onChange: (event) => setStateRegistration(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Inscrição Municipal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: municipalRegistration, onChange: (event) => setMunicipalRegistration(event.target.value) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3 border-t pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Contato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Telefone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phone, onChange: (event) => setPhone(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (event) => setEmail(event.target.value) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endereço completo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: address, onChange: (event) => setAddress(event.target.value) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Cor de identificação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: color, onChange: (event) => setColor(event.target.value), className: "h-9 w-9 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 shadow-sm ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 border-t pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clients", children: "Cancelar" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
            saving ? "Salvando..." : "Salvar alterações"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "departments", className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Departamentos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Cadastre e organize os departamentos deste cliente." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
            setEditingDepartmentId(null);
            setDepartmentName("");
            setDepartmentFormOpen((open) => !open);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Cadastrar departamento"
          ] })
        ] }),
        departmentFormOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome do departamento", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: departmentName, onChange: (event) => setDepartmentName(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setDepartmentFormOpen(false), children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveDepartment, children: "Salvar departamento" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDepartmentDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: departments.map((department) => department.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          departments.map((department) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableDepartment, { id: department.id, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { className: "rounded-lg border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { className: "flex min-w-0 flex-1 items-center justify-between gap-3 rounded-md px-2 py-2 text-left font-medium hover:bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: department.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Editar departamento", onClick: () => startDepartmentEdit(department), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir departamento", onClick: () => deleteDepartment(department), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleContent, { className: "border-t p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-muted-foreground" }),
                  "Funcionários (",
                  employees.filter((employee) => employee.department_id === department.id).length,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => {
                  resetEmployeeForm();
                  setEmployeeFormDepartmentId(department.id);
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                  "Cadastrar funcionário"
                ] })
              ] }),
              employeeFormDepartmentId === department.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4 rounded-lg border bg-muted/20 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: editingEmployeeId ? "Editar funcionário" : "Novo funcionário" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome Completo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: employeeName, onChange: (event) => setEmployeeName(event.target.value) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CBO", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: employeeCbo, onChange: (event) => setEmployeeCbo(event.target.value) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Função", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: employeeRole, onChange: (event) => setEmployeeRole(event.target.value) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Salário", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "decimal", placeholder: "0,00", value: employeeSalary, onChange: (event) => setEmployeeSalary(event.target.value), onBlur: () => setEmployeeSalary((value) => value ? formatSalary(value) : "") }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Atividades", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: employeeActivities, onChange: (event) => setEmployeeActivities(event.target.value), placeholder: "Descreva livremente as atividades do funcionário." }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Foto do funcionário" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "employee-avatar", className: "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-3 transition-colors hover:bg-primary/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUp, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium", children: "Selecionar foto do funcionário" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "PNG, JPG ou WebP" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "employee-avatar", type: "file", accept: "image/png,image/jpeg,image/webp", className: "sr-only", onChange: (event) => setEmployeeAvatarFile(event.target.files?.[0] ?? null) }),
                  employeeAvatarFile && employeeAvatarPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 rounded-md border p-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: employeeAvatarPreview, alt: "Prévia", className: "h-9 w-9 rounded-full object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm", children: employeeAvatarFile.name })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: resetEmployeeForm, children: "Cancelar" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveEmployee, children: "Salvar funcionário" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
                employees.filter((employee) => employee.department_id === department.id).map((employee) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-lg border p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "flex min-w-0 flex-1 items-start gap-3 text-left", onClick: () => {
                    setEmployeeDialogPosition({
                      x: 0,
                      y: 0
                    });
                    setSelectedEmployee(employee);
                  }, children: [
                    employeeAvatarUrls[employee.id] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: employeeAvatarUrls[employee.id], alt: `Foto de ${employee.full_name}`, className: "h-10 w-10 shrink-0 rounded-full object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: employee.full_name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: employee.role || "Sem função cadastrada" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-9", size: "sm", variant: "outline", onClick: () => {
                      setEmployeeDialogPosition({
                        x: 0,
                        y: 0
                      });
                      setSelectedEmployee(employee);
                    }, children: "Ver dados" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-9 w-9", size: "icon", variant: "ghost", title: "Editar informações", onClick: () => startEmployeeEdit(employee), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-9 w-9", size: "icon", variant: "ghost", title: "Excluir funcionário", onClick: () => deleteEmployee(employee), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
                  ] })
                ] }, employee.id)),
                employees.filter((employee) => employee.department_id === department.id).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground", children: "Nenhum funcionário cadastrado neste departamento." })
              ] })
            ] })
          ] }) }, department.id)),
          departments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground", children: "Nenhum departamento cadastrado." })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "system", className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Sistemas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gerencie os acessos e credenciais deste cliente." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
            resetSystemAccessForm();
            setSystemAccessFormOpen(true);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Cadastrar Acesso"
          ] })
        ] }),
        systemAccessFormOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: editingSystemAccessId ? "Editar acesso" : "Novo acesso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Título", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: systemAccessTitle, onChange: (event) => setSystemAccessTitle(event.target.value), placeholder: "Ex.: Portal do cliente" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: systemAccessLogin, onChange: (event) => setSystemAccessLogin(event.target.value) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Senha", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: systemAccessPassword, onChange: (event) => setSystemAccessPassword(event.target.value) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observação", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: systemAccessNotes, onChange: (event) => setSystemAccessNotes(event.target.value) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: resetSystemAccessForm, children: "Cancelar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: saveSystemAccess, children: "Salvar acesso" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          systemAccesses.map((access) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 rounded-lg border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: access.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                "Login: ",
                access.login
              ] }),
              access.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: access.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Editar acesso", onClick: () => startSystemAccessEdit(access), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "Excluir acesso", onClick: () => deleteSystemAccess(access), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] }, access.id)),
          systemAccesses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground", children: "Nenhum acesso cadastrado." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedEmployee, onOpenChange: (open) => !open && setSelectedEmployee(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl", style: {
      left: `calc(50% + ${employeeDialogPosition.x}px)`,
      top: `calc(50% + ${employeeDialogPosition.y}px)`
    }, children: selectedEmployee && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "cursor-grab select-none rounded-md px-1 py-1 active:cursor-grabbing", onPointerDown: startEmployeeDialogDrag, title: "Arraste para mover esta janela", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Dados do funcionário" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gradient-to-r from-emerald-600 via-yellow-400 to-blue-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 p-5 sm:grid-cols-[110px_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-first", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Foto salva" }),
            employeeAvatarUrls[selectedEmployee.id] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: employeeAvatarUrls[selectedEmployee.id], alt: `Foto de ${selectedEmployee.full_name}`, className: "aspect-[3/4] w-[110px] rounded-md border bg-muted object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-[3/4] w-[110px] place-items-center rounded-md border bg-muted text-xs text-muted-foreground", children: "Sem foto" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Nome completo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: selectedEmployee.full_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "CBO", value: selectedEmployee.cbo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Função", value: selectedEmployee.role }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Salário", value: selectedEmployee.salary === null ? null : formatSalary(selectedEmployee.salary) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Atividades", value: selectedEmployee.activities, multiline: true })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
function SortableDepartment({
  id,
  children
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setNodeRef, style: {
    transform: CSS.Transform.toString(transform),
    transition
  }, className: isDragging ? "opacity-50" : void 0, ...attributes, ...listeners, children });
}
function parseSalary(value) {
  if (!value.trim()) return null;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const salary = Number(normalized);
  return Number.isFinite(salary) ? salary : null;
}
function formatSalary(value) {
  const salary = typeof value === "number" ? value : parseSalary(value);
  return salary === null ? value : new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(salary);
}
function Detail({
  label,
  value,
  multiline = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: multiline ? "mt-1 whitespace-pre-wrap text-sm" : "text-sm font-medium", children: value || "Não informado" })
  ] });
}
export {
  EditClientPage as component
};
