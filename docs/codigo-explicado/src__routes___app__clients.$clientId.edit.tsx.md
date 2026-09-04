# src/routes/_app/clients.$clientId.edit.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import { useEffect, useRef, useState, type ReactNode } from "react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `import { useQuery, useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 4 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 5 | `  ArrowLeft,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  Building2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 7 | `  ChevronDown,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 8 | `  Download,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `  ExternalLink,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 10 | `  Eye,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  EyeOff,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  ImageUp,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  LoaderCircle,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  NotebookPen,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  Paperclip,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  Pencil,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  Plus,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  Save,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  Trash2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  Users,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `} from "lucide-react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `  DndContext,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 24 | `  PointerSensor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 25 | `  closestCenter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 26 | `  type DragEndEvent,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 27 | `  useSensor,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 28 | `  useSensors,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 29 | `} from "@dnd-kit/core";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 31 | `  arrayMove,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  SortableContext,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 33 | `  useSortable,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 34 | `  verticalListSortingStrategy,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `} from "@dnd-kit/sortable";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 36 | `import { CSS } from "@dnd-kit/utilities";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `import { Card } from "@/components/ui/card";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 39 | `import { Input } from "@/components/ui/input";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 40 | `import { Label } from "@/components/ui/label";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 41 | `import { Textarea } from "@/components/ui/textarea";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 42 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 43 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 44 | `  type Client,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 45 | `  type ClientBranch,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 46 | `  type ClientDepartment,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 47 | `  type ClientDepartmentEmployee,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 48 | `  type ClientSystemAccess,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 49 | `  useProfiles,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 52 | `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 53 | `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 54 | `import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 55 | `import { NotesWorkspace } from "@/routes/_app/notes";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 56 | `import { FileDropZone } from "@/components/FileDropZone";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 57 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 58 | `import { toJpeg } from "html-to-image";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 59 | `import { format } from "date-fns";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 60 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 61 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 62 | `export const Route = createFileRoute("/_app/clients/$clientId/edit")({` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 63 | `  component: EditClientPage,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 64 | `});` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 65 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 66 | `const EMPTY_DEPARTMENTS: ClientDepartment[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `const EMPTY_EMPLOYEES: ClientDepartmentEmployee[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `const EMPTY_SYSTEM_ACCESSES: ClientSystemAccess[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 69 | `const EMPTY_BRANCHES: ClientBranch[] = [];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 71 | `function EditClientPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 72 | `  const { clientId } = Route.useParams();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  const navigate = useNavigate();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `  const { data: client, isLoading } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `    queryKey: ["clients", clientId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 77 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 78 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 79 | `        .from("clients")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 81 | `        .eq("id", clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 82 | `        .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 83 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 84 | `      return data as Client;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 85 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 86 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 87 | `  const { data: departments = EMPTY_DEPARTMENTS } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 88 | `    queryKey: ["client-departments", clientId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 89 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 90 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 91 | `        .from("client_departments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 92 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 93 | `        .eq("client_id", clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 94 | `        .order("position")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 95 | `        .order("created_at");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 97 | `      return (data ?? []) as ClientDepartment[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 98 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 99 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 100 | `  const { data: employees = EMPTY_EMPLOYEES } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 101 | `    queryKey: [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `      "client-department-employees",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `      clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 104 | `      departments.map((department) => department.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 105 | `    ],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `    enabled: departments.length > 0,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 108 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 109 | `        .from("client_department_employees")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `        .in(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 112 | `          "department_id",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 113 | `          departments.map((department) => department.id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 114 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 115 | `        .order("full_name");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 117 | `      return (data ?? []) as ClientDepartmentEmployee[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 118 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 119 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 120 | `  const { data: systemAccesses = EMPTY_SYSTEM_ACCESSES } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 121 | `    queryKey: ["client-system-accesses", clientId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 122 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 123 | `      const { data, error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 124 | `        .from("client_system_accesses")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `        .eq("client_id", clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `        .order("title");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 129 | `      return (data ?? []) as ClientSystemAccess[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 130 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 131 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 132 | `  const { data: branches = EMPTY_BRANCHES } = useQuery({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 133 | `    queryKey: ["client-branches", clientId],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `    queryFn: async () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 135 | `      const { data, error } = await (supabase.from("client_branches" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 136 | `        .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 137 | `        .eq("client_id", clientId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `        .order("name");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `      if (error) throw error;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 140 | `      return (data ?? []) as ClientBranch[];` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 141 | `    },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 142 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 143 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 144 | `  const [cnpj, setCnpj] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 145 | `  const [legalName, setLegalName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 146 | `  const [tradeName, setTradeName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 147 | `  const [stateRegistration, setStateRegistration] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 148 | `  const [municipalRegistration, setMunicipalRegistration] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 149 | `  const [address, setAddress] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 150 | `  const [phone, setPhone] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 151 | `  const [email, setEmail] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 152 | `  const [responsible, setResponsible] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 153 | `  const [color, setColor] = useState("#1e3a8a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `  const [avatarFile, setAvatarFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 155 | `  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 156 | `  const [departmentFormOpen, setDepartmentFormOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 157 | `  const [departmentName, setDepartmentName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 158 | `  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 159 | `  const [employeeFormDepartmentId, setEmployeeFormDepartmentId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 160 | `  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 161 | `  const [employeePersonType, setEmployeePersonType] = useState<"individual" | "company">(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 162 | `    "individual",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 163 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 164 | `  const [employeeName, setEmployeeName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 165 | `  const [employeeDocument, setEmployeeDocument] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 166 | `  const [employeeCbo, setEmployeeCbo] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 167 | `  const [employeeRole, setEmployeeRole] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 168 | `  const [employeeSalary, setEmployeeSalary] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 169 | `  const [employeeSalaryExtrafolha, setEmployeeSalaryExtrafolha] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 170 | `  const [employeeActivities, setEmployeeActivities] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 171 | `  const [employeeAvatarFile, setEmployeeAvatarFile] = useState<File | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 172 | `  const [employeeAvatarPreview, setEmployeeAvatarPreview] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `  const [isEmployeeAvatarDragging, setIsEmployeeAvatarDragging] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 174 | `  const employeeAvatarInputRef = useRef<HTMLInputElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `  const employeeCardRef = useRef<HTMLDivElement>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 176 | `  const [isDownloadingEmployeeCard, setIsDownloadingEmployeeCard] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 177 | `  const [employeeAvatarUrls, setEmployeeAvatarUrls] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 178 | `  const [selectedEmployee, setSelectedEmployee] = useState<ClientDepartmentEmployee | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 179 | `  const [employeeDialogPosition, setEmployeeDialogPosition] = useState({ x: 0, y: 0 });` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 180 | `  const [systemAccessFormOpen, setSystemAccessFormOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 181 | `  const [editingSystemAccessId, setEditingSystemAccessId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 182 | `  const [systemAccessTitle, setSystemAccessTitle] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 183 | `  const [systemAccessLogin, setSystemAccessLogin] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 184 | `  const [systemAccessPassword, setSystemAccessPassword] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 185 | `  const [systemAccessNotes, setSystemAccessNotes] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 186 | `  const [visibleSystemAccessPasswordId, setVisibleSystemAccessPasswordId] = useState<string | null>(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 187 | `    null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 188 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 189 | `  const [branchFormOpen, setBranchFormOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 190 | `  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 191 | `  const [branchName, setBranchName] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 192 | `  const [branchCnpj, setBranchCnpj] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 193 | `  const [branchAddress, setBranchAddress] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 194 | `  const [branchPhone, setBranchPhone] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `  const [branchEmail, setBranchEmail] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 196 | `  const [branchNotes, setBranchNotes] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 197 | `  const [activeTab, setActiveTab] = useState("client");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 198 | `  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 199 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 200 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 201 | `    if (!client) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 202 | `    setCnpj(client.cnpj ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 203 | `    setLegalName(client.legal_name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 204 | `    setTradeName(client.trade_name ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 205 | `    setStateRegistration(client.state_registration ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `    setMunicipalRegistration(client.municipal_registration ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 207 | `    setAddress(client.address ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 208 | `    setPhone(client.phone ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 209 | `    setEmail(client.email ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 210 | `    setResponsible(client.responsible ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `    setColor(client.color ?? "#1e3a8a");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 212 | `  }, [client]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 214 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 215 | `    if (!avatarFile) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 216 | `      setAvatarPreview(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 217 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 218 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 219 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 220 | `    const previewUrl = URL.createObjectURL(avatarFile);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 221 | `    setAvatarPreview(previewUrl);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 222 | `    return () => URL.revokeObjectURL(previewUrl);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 223 | `  }, [avatarFile]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 224 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 225 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 226 | `    if (!employeeAvatarFile) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 227 | `      setEmployeeAvatarPreview(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 228 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 229 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 230 | `    const previewUrl = URL.createObjectURL(employeeAvatarFile);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 231 | `    setEmployeeAvatarPreview(previewUrl);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 232 | `    return () => URL.revokeObjectURL(previewUrl);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 233 | `  }, [employeeAvatarFile]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 234 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 235 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 236 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 237 | `    const loadEmployeeAvatars = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 238 | `      const employeesWithAvatar = employees.filter((employee) => employee.avatar_path);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 239 | `      if (employeesWithAvatar.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 240 | `        if (!cancelled)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 241 | `          setEmployeeAvatarUrls((current) => (Object.keys(current).length === 0 ? current : {}));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 242 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 243 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 244 | `      const entries = await Promise.all(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 245 | `        employeesWithAvatar.map(async (employee) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 246 | `          const { data } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `            .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 248 | `            .createSignedUrl(employee.avatar_path!, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 249 | `          return [employee.id, data?.signedUrl ?? ""] as const;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 250 | `        }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 251 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 252 | `      if (!cancelled) setEmployeeAvatarUrls(Object.fromEntries(entries));` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 253 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 254 | `    void loadEmployeeAvatars();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 255 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 256 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 257 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 258 | `  }, [employees]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 259 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 260 | `  const save = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 261 | `    if (!client) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 262 | `      toast.error("Cliente nÃ£o encontrado.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 263 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 264 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 265 | `    const name = tradeName.trim() || legalName.trim() || client?.name;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 266 | `    if (!name) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 267 | `      toast.error("Preencha o Nome fantasia ou a Razão social.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 269 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 270 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 271 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 272 | `    let avatarPath = client.avatar_path;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 273 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 274 | `    if (avatarFile) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 275 | `      const extension = avatarFile.name.split(".").pop()?.toLowerCase() || "png";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `      const nextAvatarPath = \`clients/${clientId}/avatar-${Date.now()}.${extension}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 277 | `      const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 278 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `        .upload(nextAvatarPath, avatarFile, { contentType: avatarFile.type });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 281 | `      if (uploadError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 282 | `        setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `        toast.error(\`Não foi possível enviar o logo: ${uploadError.message}\`);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 285 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 286 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 287 | `      avatarPath = nextAvatarPath;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 288 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 289 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 290 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 291 | `      .from("clients")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 292 | `      .update({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 293 | `        name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 294 | `        cnpj: cnpj || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `        legal_name: legalName || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `        trade_name: tradeName || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 297 | `        state_registration: stateRegistration || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 298 | `        municipal_registration: municipalRegistration || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 299 | `        address: address || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 300 | `        phone: phone || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 301 | `        email: email || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 302 | `        responsible: responsible || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 303 | `        color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `        avatar_path: avatarPath,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `      })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 306 | `      .eq("id", clientId);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 307 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 308 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 309 | `      setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 312 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 313 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 314 | `    if (avatarFile) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 315 | `      window.sessionStorage.removeItem("taskflow-client-avatar-urls");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 316 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 317 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 318 | `    if (avatarFile && client.avatar_path && client.avatar_path !== avatarPath) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 319 | `      await supabase.storage.from("task-attachments").remove([client.avatar_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 320 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 321 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 322 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `    queryClient.invalidateQueries({ queryKey: ["clients"] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `    toast.success("Cliente atualizado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `    navigate({ to: "/clients" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 327 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 328 | `  const saveDepartment = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 329 | `    if (!departmentName.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 330 | `      toast.error("Informe o nome do departamento.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 331 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 332 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 333 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 334 | `    const { error } = editingDepartmentId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 335 | `      ? await supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 336 | `          .from("client_departments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 337 | `          .update({ name: departmentName.trim() })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 338 | `          .eq("id", editingDepartmentId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `      : await supabase.from("client_departments").insert({` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 340 | `          client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 341 | `          name: departmentName.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `          position: departments.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 343 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 344 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 345 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 347 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 348 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 349 | `    queryClient.invalidateQueries({ queryKey: ["client-departments", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 350 | `    setDepartmentName("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `    setDepartmentFormOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `    setEditingDepartmentId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 353 | `    toast.success(editingDepartmentId ? "Departamento atualizado" : "Departamento cadastrado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 354 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 355 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 356 | `  const resetDepartmentForm = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 357 | `    setDepartmentFormOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 358 | `    setEditingDepartmentId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 359 | `    setDepartmentName("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 360 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 361 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 362 | `  const startDepartmentEdit = (department: ClientDepartment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 363 | `    setEditingDepartmentId(department.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 364 | `    setDepartmentName(department.name);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 365 | `    setDepartmentFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 366 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 367 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 368 | `  const deleteDepartment = async (department: ClientDepartment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 369 | `    if (!confirm(\`Excluir o departamento "${department.name}" e todos os seus funcionários?\`))` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 370 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 371 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 372 | `    const { error } = await supabase.from("client_departments").delete().eq("id", department.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 373 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 374 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 376 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 377 | `    queryClient.invalidateQueries({ queryKey: ["client-departments", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `    queryClient.invalidateQueries({ queryKey: ["client-department-employees", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 379 | `    toast.success("Departamento excluído");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 381 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 382 | `  const handleDepartmentDragEnd = async ({ active, over }: DragEndEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 383 | `    if (!over || active.id === over.id) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 384 | `    const oldIndex = departments.findIndex((department) => department.id === active.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 385 | `    const newIndex = departments.findIndex((department) => department.id === over.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 386 | `    if (oldIndex < 0 || newIndex < 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 387 | `    const reordered = arrayMove(departments, oldIndex, newIndex);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 388 | `    const results = await Promise.all(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 389 | `      reordered.map((department, position) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 390 | `        supabase.from("client_departments").update({ position }).eq("id", department.id),` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 391 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 393 | `    const error = results.find((result) => result.error)?.error;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 394 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 395 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 397 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 398 | `    queryClient.invalidateQueries({ queryKey: ["client-departments", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 399 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 400 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 401 | `  const resetEmployeeForm = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 402 | `    setEmployeeFormDepartmentId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 403 | `    setEditingEmployeeId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 404 | `    setEmployeePersonType("individual");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `    setEmployeeName("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 406 | `    setEmployeeDocument("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 407 | `    setEmployeeCbo("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `    setEmployeeRole("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `    setEmployeeSalary("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `    setEmployeeSalaryExtrafolha("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 411 | `    setEmployeeActivities("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `    setEmployeeAvatarFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 413 | `    setIsEmployeeAvatarDragging(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 414 | `    if (employeeAvatarInputRef.current) employeeAvatarInputRef.current.value = "";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 415 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 416 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 417 | `  const setEmployeeAvatar = (file: File | null | undefined) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 418 | `    if (!file) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 419 | `    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 420 | `      toast.error("Selecione uma imagem PNG, JPG ou WebP.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 421 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 422 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 423 | `    setEmployeeAvatarFile(file);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 425 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 426 | `  const clearSelectedEmployeeAvatar = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 427 | `    setEmployeeAvatarFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 428 | `    if (employeeAvatarInputRef.current) employeeAvatarInputRef.current.value = "";` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 429 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 430 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 431 | `  const removeSavedEmployeeAvatar = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 432 | `    if (!editingEmployeeId) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 433 | `    const employee = employees.find((item) => item.id === editingEmployeeId);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 434 | `    if (!employee?.avatar_path) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 435 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 436 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 437 | `      .from("client_department_employees")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 438 | `      .update({ avatar_path: null })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 439 | `      .eq("id", employee.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 440 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 441 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 443 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 444 | `    const { error: storageError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 445 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `      .remove([employee.avatar_path]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `    if (storageError)` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 448 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 449 | `        \`Foto desvinculada, mas não foi possível excluir o arquivo: ${storageError.message}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 451 | `    await queryClient.invalidateQueries({ queryKey: ["client-department-employees", clientId] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 452 | `    toast.success("Foto do funcionário removida");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 453 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 454 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 455 | `  const saveEmployee = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 456 | `    if (!employeeName.trim() || !employeeFormDepartmentId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 457 | `      toast.error("Informe o nome completo do funcionário.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 458 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 459 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 460 | `    const employeeData = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 461 | `      department_id: employeeFormDepartmentId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      person_type: employeePersonType,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 463 | `      full_name: employeeName.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 464 | `      document: employeeDocument.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 465 | `      cbo: employeeCbo.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 466 | `      role: employeeRole.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 467 | `      salary: parseSalary(employeeSalary),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 468 | `      salary_extrafolha: parseSalary(employeeSalaryExtrafolha),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `      activities: employeeActivities.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 470 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 471 | `    const { data: savedEmployee, error } = editingEmployeeId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 472 | `      ? await supabase` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 473 | `          .from("client_department_employees")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 474 | `          .update(employeeData)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 475 | `          .eq("id", editingEmployeeId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 476 | `          .select()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 477 | `          .single()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `      : await supabase.from("client_department_employees").insert(employeeData).select().single();` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 479 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 480 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 481 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 482 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 483 | `    if (employeeAvatarFile && savedEmployee) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 484 | `      const extension = employeeAvatarFile.name.split(".").pop()?.toLowerCase() || "png";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 485 | `      const avatarPath = \`clients/${clientId}/departments/${employeeFormDepartmentId}/employees/${savedEmployee.id}-${Date.now()}.${extension}\`;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 486 | `      const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 487 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 488 | `        .upload(avatarPath, employeeAvatarFile, { contentType: employeeAvatarFile.type });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `      if (uploadError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 490 | `        toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 491 | `          \`Funcionário salvo, mas não foi possível enviar a foto: ${uploadError.message}\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 493 | `      } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `        const { error: avatarError } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 495 | `          .from("client_department_employees")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `          .update({ avatar_path: avatarPath })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 497 | `          .eq("id", savedEmployee.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 498 | `        if (avatarError) toast.error(\`Não foi possível vincular a foto: ${avatarError.message}\`);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 499 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 500 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 501 | `    queryClient.invalidateQueries({ queryKey: ["client-department-employees", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 502 | `    resetEmployeeForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 503 | `    toast.success(editingEmployeeId ? "Funcionário atualizado" : "Funcionário cadastrado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 504 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 505 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 506 | `  const startEmployeeEdit = (employee: ClientDepartmentEmployee) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 507 | `    setEmployeeFormDepartmentId(employee.department_id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `    setEditingEmployeeId(employee.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `    setEmployeePersonType(employee.person_type ?? "individual");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 510 | `    setEmployeeName(employee.full_name);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `    setEmployeeDocument(employee.document ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 512 | `    setEmployeeCbo(employee.cbo ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 513 | `    setEmployeeRole(employee.role ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 514 | `    setEmployeeSalary(employee.salary === null ? "" : formatSalary(employee.salary));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `    setEmployeeSalaryExtrafolha(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 516 | `      employee.salary_extrafolha == null ? "" : formatSalary(employee.salary_extrafolha),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 518 | `    setEmployeeActivities(employee.activities ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 519 | `    setEmployeeAvatarFile(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 520 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 521 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 522 | `  const deleteEmployee = async (employee: ClientDepartmentEmployee) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 523 | `    if (!confirm(\`Excluir o funcionário "${employee.full_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 524 | `    const { error } = await supabase` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 525 | `      .from("client_department_employees")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 526 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `      .eq("id", employee.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 529 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 530 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 531 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 532 | `    queryClient.invalidateQueries({ queryKey: ["client-department-employees", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 533 | `    toast.success("Funcionário excluído");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 534 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 535 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 536 | `  const resetSystemAccessForm = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 537 | `    setSystemAccessFormOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 538 | `    setEditingSystemAccessId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 539 | `    setSystemAccessTitle("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 540 | `    setSystemAccessLogin("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 541 | `    setSystemAccessPassword("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 542 | `    setSystemAccessNotes("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 543 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 544 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 545 | `  const saveSystemAccess = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 546 | `    if (!systemAccessTitle.trim() || !systemAccessLogin.trim() || !systemAccessPassword) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 547 | `      toast.error("Informe o título, login e senha do acesso.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 548 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 549 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 550 | `    const values = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 551 | `      title: systemAccessTitle.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 552 | `      login: systemAccessLogin.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `      password: systemAccessPassword,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 554 | `      notes: systemAccessNotes.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 556 | `    const { error } = editingSystemAccessId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 557 | `      ? await supabase.from("client_system_accesses").update(values).eq("id", editingSystemAccessId)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 558 | `      : await supabase.from("client_system_accesses").insert({ ...values, client_id: clientId });` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 559 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 560 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 562 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 563 | `    queryClient.invalidateQueries({ queryKey: ["client-system-accesses", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 564 | `    const wasEditing = !!editingSystemAccessId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 565 | `    resetSystemAccessForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `    toast.success(wasEditing ? "Acesso atualizado" : "Acesso cadastrado");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 568 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 569 | `  const startSystemAccessEdit = (access: ClientSystemAccess) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 570 | `    setEditingSystemAccessId(access.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `    setSystemAccessTitle(access.title);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 572 | `    setSystemAccessLogin(access.login);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `    setSystemAccessPassword(access.password);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 574 | `    setSystemAccessNotes(access.notes ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 575 | `    setSystemAccessFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 577 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 578 | `  const deleteSystemAccess = async (access: ClientSystemAccess) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 579 | `    if (!confirm(\`Excluir o acesso "${access.title}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 580 | `    const { error } = await supabase.from("client_system_accesses").delete().eq("id", access.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 581 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 582 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 583 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 584 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 585 | `    queryClient.invalidateQueries({ queryKey: ["client-system-accesses", clientId] });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 586 | `    toast.success("Acesso excluído");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 588 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 589 | `  const resetBranchForm = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 590 | `    setBranchFormOpen(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `    setEditingBranchId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `    setBranchName("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `    setBranchCnpj("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 594 | `    setBranchAddress("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `    setBranchPhone("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 596 | `    setBranchEmail("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 597 | `    setBranchNotes("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 598 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 599 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 600 | `  const saveBranch = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 601 | `    if (!branchName.trim()) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 602 | `      toast.error("Informe o nome da unidade.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 603 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 604 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 605 | `    const payload = {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 606 | `      name: branchName.trim(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 607 | `      cnpj: branchCnpj.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 608 | `      address: branchAddress.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 609 | `      phone: branchPhone.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 610 | `      email: branchEmail.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 611 | `      notes: branchNotes.trim() || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 612 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 613 | `    const { error } = editingBranchId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 614 | `      ? await (supabase.from("client_branches" as any) as any)` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 615 | `          .update(payload)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 616 | `          .eq("id", editingBranchId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 617 | `      : await (supabase.from("client_branches" as any) as any).insert({` | Interage com o cliente Supabase para autenticar ou acessar o banco. |
| 618 | `          ...payload,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 619 | `          client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 620 | `        });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 621 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 622 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 623 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 624 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 625 | `    await queryClient.invalidateQueries({ queryKey: ["client-branches", clientId] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 626 | `    const wasEditing = !!editingBranchId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 627 | `    resetBranchForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 628 | `    toast.success(wasEditing ? "Unidade atualizada" : "Unidade cadastrada");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 629 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 630 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 631 | `  const startBranchEdit = (branch: ClientBranch) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 632 | `    setEditingBranchId(branch.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 633 | `    setBranchName(branch.name);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 634 | `    setBranchCnpj(branch.cnpj ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 635 | `    setBranchAddress(branch.address ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 636 | `    setBranchPhone(branch.phone ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 637 | `    setBranchEmail(branch.email ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 638 | `    setBranchNotes(branch.notes ?? "");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 639 | `    setBranchFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 640 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 641 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 642 | `  const deleteBranch = async (branch: ClientBranch) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 643 | `    if (!confirm(\`Excluir a unidade "${branch.name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 644 | `    const { error } = await (supabase.from("client_branches" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 645 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 646 | `      .eq("id", branch.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 647 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 648 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 649 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 650 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 651 | `    await queryClient.invalidateQueries({ queryKey: ["client-branches", clientId] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 652 | `    toast.success("Unidade excluída");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 653 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 654 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 655 | `  const startEmployeeDialogDrag = (event: React.PointerEvent<HTMLDivElement>) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 656 | `    const startX = event.clientX;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 657 | `    const startY = event.clientY;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 658 | `    const initialPosition = employeeDialogPosition;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 659 | `    const onMove = (moveEvent: PointerEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 660 | `      setEmployeeDialogPosition({` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 661 | `        x: initialPosition.x + moveEvent.clientX - startX,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 662 | `        y: initialPosition.y + moveEvent.clientY - startY,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 663 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 664 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 665 | `    const onEnd = () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 666 | `      window.removeEventListener("pointermove", onMove);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 667 | `      window.removeEventListener("pointerup", onEnd);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 668 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 669 | `    window.addEventListener("pointermove", onMove);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 670 | `    window.addEventListener("pointerup", onEnd);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 671 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 672 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 673 | `  const downloadEmployeeCard = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 674 | `    if (!selectedEmployee || !employeeCardRef.current) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 675 | `    setIsDownloadingEmployeeCard(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 676 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 677 | `      const url = await toJpeg(employeeCardRef.current, {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 678 | `        quality: 0.95,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 679 | `        pixelRatio: 2,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 680 | `        cacheBust: true,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 681 | `        backgroundColor: "#ffffff",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 682 | `        style: { border: "2px solid #d8e0ea", borderRadius: "12px" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 683 | `      });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 684 | `      const link = document.createElement("a");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 685 | `      const safeName =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 686 | `        selectedEmployee.full_name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "") ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 687 | `        "funcionario";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 688 | `      link.href = url;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 689 | `      link.download = \`cartao-${safeName}.jpeg\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 690 | `      link.click();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 691 | `    } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 692 | `      toast.error(error instanceof Error ? error.message : "Não foi possível baixar o cartão.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 693 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 694 | `      setIsDownloadingEmployeeCard(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 695 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 696 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 697 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 698 | `  if (isLoading) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 699 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 700 | `      <div className="grid min-h-64 place-items-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 701 | `        <LoaderCircle className="h-6 w-6 animate-spin" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 702 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 703 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 704 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 705 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 706 | `  if (!client) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 707 | `    return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 708 | `      <div className="p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 709 | `        <p className="text-muted-foreground">Cliente não encontrado.</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 710 | `        <Button asChild className="mt-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 711 | `          <Link to="/clients">Voltar para clientes</Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 712 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 713 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 714 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 715 | `  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 716 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 717 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 718 | `    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 719 | `      className={\`mx-auto w-full ${activeTab === "notes" ? "max-w-5xl" : "max-w-4xl"} space-y-6 p-6\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 720 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 721 | `      <header className="flex items-center gap-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 722 | `        <Button asChild size="icon" variant="ghost" title="Voltar para clientes">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 723 | `          <Link to="/clients">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 724 | `            <ArrowLeft className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 725 | `          </Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 726 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 727 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 728 | `          <h1 className="text-2xl font-bold tracking-tight">Dados do cliente</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 729 | `          <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 730 | `            Atualize todos os dados cadastrados do cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 731 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 732 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 733 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 734 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 735 | `      <Card className="p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 736 | `        <Tabs value={activeTab} onValueChange={setActiveTab}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 737 | `          <TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 738 | `            <TabsTrigger value="client">Dados do cliente</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 739 | `            <TabsTrigger value="branches">Outras unidades</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 740 | `            <TabsTrigger value="departments">Departamentos</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 741 | `            <TabsTrigger value="system">Sistemas</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 742 | `            <TabsTrigger value="notes">Anotações</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 743 | `            <TabsTrigger value="attachments">Anexos</TabsTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 744 | `          </TabsList>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 745 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 746 | `          <TabsContent value="client" className="mt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 747 | `            <div className="space-y-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 748 | `              <Field label="Nome exibido pelo sistema">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 749 | `                <Input value={client.name} disabled />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 750 | `              </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 751 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 752 | `              <Field label="Logo do cliente">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 753 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 754 | `                  <Label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 755 | `                    htmlFor="edit-client-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 756 | `                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 transition-colors hover:bg-primary/10"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 757 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 758 | `                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 759 | `                      <ImageUp className="h-5 w-5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 760 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 761 | `                    <span className="flex flex-col">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 762 | `                      <span className="font-medium">Alterar logo do cliente</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 763 | `                      <span className="text-xs font-normal text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 764 | `                        PNG, JPG ou WebP` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 765 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 766 | `                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 767 | `                  </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 768 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 769 | `                    id="edit-client-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 770 | `                    type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 771 | `                    accept="image/png,image/jpeg,image/webp"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 772 | `                    className="sr-only"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 773 | `                    onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 774 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 775 | `                  {avatarFile && avatarPreview && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 776 | `                    <div className="flex items-center gap-3 rounded-md border bg-muted/30 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 777 | `                      <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 778 | `                        src={avatarPreview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 779 | `                        alt="Prévia do logo selecionado"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 780 | `                        className="block h-14 w-14 shrink-0 rounded border bg-muted object-contain p-0.5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 781 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 782 | `                      <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 783 | `                        <p className="text-xs text-muted-foreground">Imagem selecionada</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 784 | `                        <p className="truncate text-sm font-medium" title={avatarFile.name}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 785 | `                          {avatarFile.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 786 | `                        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 787 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 788 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 789 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 790 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 791 | `              </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 792 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 793 | `              <section className="space-y-3 border-t pt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 794 | `                <h2 className="font-semibold">Dados cadastrais</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 795 | `                <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 796 | `                  <Field label="CNPJ">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 797 | `                    <Input value={cnpj} onChange={(event) => setCnpj(event.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 798 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 799 | `                  <Field label="Nome fantasia">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 800 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 801 | `                      value={tradeName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 802 | `                      onChange={(event) => setTradeName(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 803 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 804 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 805 | `                  <Field label="Razão social">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 806 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 807 | `                      value={legalName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 808 | `                      onChange={(event) => setLegalName(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 809 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 810 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 811 | `                  <Field label="Responsável">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 812 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 813 | `                      value={responsible}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 814 | `                      onChange={(event) => setResponsible(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 815 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 816 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 817 | `                  <Field label="Inscrição Estadual">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 818 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 819 | `                      value={stateRegistration}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 820 | `                      onChange={(event) => setStateRegistration(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 821 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 822 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 823 | `                  <Field label="Inscrição Municipal">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 824 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 825 | `                      value={municipalRegistration}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 826 | `                      onChange={(event) => setMunicipalRegistration(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 827 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 828 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 829 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 830 | `              </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 831 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 832 | `              <section className="space-y-3 border-t pt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 833 | `                <h2 className="font-semibold">Contato</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 834 | `                <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 835 | `                  <Field label="Telefone">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 836 | `                    <Input value={phone} onChange={(event) => setPhone(event.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 837 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 838 | `                  <Field label="E-mail">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 839 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 840 | `                      type="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 841 | `                      value={email}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 842 | `                      onChange={(event) => setEmail(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 843 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 844 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 845 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 846 | `                <Field label="Endereço completo">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 847 | `                  <Input value={address} onChange={(event) => setAddress(event.target.value)} />` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 848 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 849 | `              </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 850 | `              <div className="border-t pt-5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 851 | `                <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 852 | `                  <Label className="text-sm font-medium">Cor de identificação</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 853 | `                  <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 854 | `                    type="color"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 855 | `                    value={color}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 856 | `                    onChange={(event) => setColor(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 857 | `                    className="h-9 w-9 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 shadow-sm ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 858 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 859 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 860 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 861 | `              <div className="flex justify-end gap-3 border-t pt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 862 | `                <Button asChild variant="outline">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 863 | `                  <Link to="/clients">Cancelar</Link>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 864 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 865 | `                <Button onClick={save} disabled={saving}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 866 | `                  <Save className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 867 | `                  {saving ? "Salvando..." : "Salvar alterações"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 868 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 869 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 870 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 871 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 872 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 873 | `          <TabsContent value="branches" className="mt-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 874 | `            <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 875 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 876 | `                <h2 className="font-semibold">Outras unidades</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 877 | `                <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 878 | `                  Cadastre as demais unidades vinculadas a este cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 879 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 880 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 881 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 882 | `                onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 883 | `                  resetBranchForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 884 | `                  setBranchFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 885 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 886 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 887 | `                <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 888 | `                Cadastrar unidade` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 889 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 890 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 891 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 892 | `            {branchFormOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 893 | `              <div className="space-y-4 rounded-lg border p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 894 | `                <h3 className="font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 895 | `                  {editingBranchId ? "Editar unidade" : "Nova unidade"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 896 | `                </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 897 | `                <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 898 | `                  <Field label="Nome da unidade">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 899 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 900 | `                      value={branchName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 901 | `                      onChange={(event) => setBranchName(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 902 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 903 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 904 | `                  <Field label="CNPJ">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 905 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 906 | `                      value={branchCnpj}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 907 | `                      onChange={(event) => setBranchCnpj(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 908 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 909 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 910 | `                  <Field label="Telefone">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 911 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 912 | `                      value={branchPhone}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 913 | `                      onChange={(event) => setBranchPhone(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 914 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 915 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 916 | `                  <Field label="E-mail">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 917 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 918 | `                      type="email"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 919 | `                      value={branchEmail}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 920 | `                      onChange={(event) => setBranchEmail(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 921 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 922 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 923 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 924 | `                <Field label="Endereço">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 925 | `                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 926 | `                    value={branchAddress}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 927 | `                    onChange={(event) => setBranchAddress(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 928 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 929 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 930 | `                <Field label="Observações">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 931 | `                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 932 | `                    value={branchNotes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 933 | `                    onChange={(event) => setBranchNotes(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 934 | `                    placeholder="Informações adicionais sobre esta unidade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 935 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 936 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 937 | `                <div className="flex justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 938 | `                  <Button variant="outline" onClick={resetBranchForm}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 939 | `                    Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 940 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 941 | `                  <Button onClick={saveBranch}>Salvar unidade</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 942 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 943 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 944 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 945 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 946 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 947 | `              {branches.map((branch) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 948 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 949 | `                  key={branch.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 950 | `                  className="flex items-start justify-between gap-3 rounded-lg border p-4"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 951 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 952 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 953 | `                    <p className="flex items-center gap-2 font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 954 | `                      <Building2 className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 955 | `                      {branch.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 956 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 957 | `                    <p className="mt-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 958 | `                      {[branch.cnpj && \`CNPJ: ${branch.cnpj}\`, branch.phone, branch.email]` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 959 | `                        .filter(Boolean)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 960 | `                        .join(" · ") || "Sem contatos cadastrados"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 961 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 962 | `                    {branch.address && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 963 | `                      <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 964 | `                        {branch.address}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 965 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 966 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 967 | `                    {branch.notes && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 968 | `                      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 969 | `                        {branch.notes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 970 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 971 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 972 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 973 | `                  <div className="flex shrink-0 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 974 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 975 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 976 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 977 | `                      title="Editar unidade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 978 | `                      onClick={() => startBranchEdit(branch)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 979 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 980 | `                      <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 981 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 982 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 983 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 984 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 985 | `                      title="Excluir unidade"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 986 | `                      onClick={() => deleteBranch(branch)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 987 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 988 | `                      <Trash2 className="h-4 w-4 text-destructive" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 989 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 990 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 991 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 992 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 993 | `              {branches.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 994 | `                <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 995 | `                  Nenhuma unidade cadastrada.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 996 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 997 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 998 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 999 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1000 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1001 | `          <TabsContent value="departments" className="mt-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1002 | `            <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1003 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1004 | `                <h2 className="font-semibold">Departamentos</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1005 | `                <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1006 | `                  Cadastre e organize os departamentos deste cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1007 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1008 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1009 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1010 | `                onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1011 | `                  resetDepartmentForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1012 | `                  setDepartmentFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1013 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1014 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1015 | `                <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1016 | `                Cadastrar departamento` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1017 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1018 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1019 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1020 | `            {departmentFormOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1021 | `              <div className="space-y-4 rounded-lg border p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1022 | `                <Field label="Nome do departamento">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1023 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1024 | `                    value={departmentName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1025 | `                    onChange={(event) => setDepartmentName(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1026 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1027 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1028 | `                <div className="flex justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1029 | `                  <Button variant="outline" onClick={resetDepartmentForm}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1030 | `                    Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1031 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1032 | `                  <Button onClick={saveDepartment}>Salvar departamento</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1033 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1034 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1035 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1036 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1037 | `            <DndContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1038 | `              sensors={sensors}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1039 | `              collisionDetection={closestCenter}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1040 | `              onDragEnd={handleDepartmentDragEnd}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1041 | `            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1042 | `              <SortableContext` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1043 | `                items={departments.map((department) => department.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1044 | `                strategy={verticalListSortingStrategy}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1045 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1046 | `                <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1047 | `                  {departments.map((department) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1048 | `                    <SortableDepartment key={department.id} id={department.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1049 | `                      <Collapsible className="rounded-lg border">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1050 | `                        <div className="flex items-center gap-1 p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1051 | `                          <CollapsibleTrigger className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-md px-2 py-2 text-left font-medium hover:bg-muted">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1052 | `                            <span className="truncate">{department.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1053 | `                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1054 | `                          </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1055 | `                          <div className="flex shrink-0 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1056 | `                            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1057 | `                              size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1058 | `                              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1059 | `                              title="Editar departamento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1060 | `                              onClick={() => startDepartmentEdit(department)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1061 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1062 | `                              <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1063 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1064 | `                            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1065 | `                              size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1066 | `                              variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1067 | `                              title="Excluir departamento"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1068 | `                              onClick={() => deleteDepartment(department)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1069 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1070 | `                              <Trash2 className="h-4 w-4 text-destructive" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1071 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1072 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1073 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1074 | `                        <CollapsibleContent className="border-t p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1075 | `                          <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1076 | `                            <div className="flex items-center gap-2 text-sm font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1077 | `                              <Users className="h-4 w-4 text-muted-foreground" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1078 | `                              Funcionários (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1079 | `                              {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1080 | `                                employees.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1081 | `                                  (employee) => employee.department_id === department.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1082 | `                                ).length` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1083 | `                              }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1084 | `                              )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1085 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1086 | `                            <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1087 | `                              size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1088 | `                              onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1089 | `                                resetEmployeeForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1090 | `                                setEmployeeFormDepartmentId(department.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1091 | `                              }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1092 | `                            >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1093 | `                              <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1094 | `                              Cadastrar funcionário` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1095 | `                            </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1096 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1097 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1098 | `                          {employeeFormDepartmentId === department.id && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1099 | `                            <div className="mt-4 space-y-4 rounded-lg border bg-muted/20 p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1100 | `                              <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1101 | `                                <h3 className="font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1102 | `                                  {editingEmployeeId ? "Editar funcionário" : "Novo funcionário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1103 | `                                </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1104 | `                                <div className="inline-flex rounded-md border p-0.5">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1105 | `                                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1106 | `                                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1107 | `                                    size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1108 | `                                    variant={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1109 | `                                      employeePersonType === "individual" ? "default" : "ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1110 | `                                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1111 | `                                    className="h-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1112 | `                                    onClick={() => setEmployeePersonType("individual")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1113 | `                                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1114 | `                                    Pessoa Física` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1115 | `                                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1116 | `                                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1117 | `                                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1118 | `                                    size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1119 | `                                    variant={employeePersonType === "company" ? "default" : "ghost"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1120 | `                                    className="h-7"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1121 | `                                    onClick={() => setEmployeePersonType("company")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1122 | `                                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1123 | `                                    Pessoa Jurídica` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1124 | `                                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1125 | `                                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1126 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1127 | `                              <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1128 | `                                <Field` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1129 | `                                  label={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1130 | `                                    employeePersonType === "individual"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1131 | `                                      ? "Nome Completo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1132 | `                                      : "Razão Social"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1133 | `                                  }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1134 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1135 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1136 | `                                    value={employeeName}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1137 | `                                    onChange={(event) => setEmployeeName(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1138 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1139 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1140 | `                                <Field label={employeePersonType === "individual" ? "CPF" : "CNPJ"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1141 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1142 | `                                    value={employeeDocument}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1143 | `                                    onChange={(event) => setEmployeeDocument(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1144 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1145 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1146 | `                                <Field label="CBO">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1147 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1148 | `                                    value={employeeCbo}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1149 | `                                    onChange={(event) => setEmployeeCbo(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1150 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1151 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1152 | `                                <Field label="Função">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1153 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1154 | `                                    value={employeeRole}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1155 | `                                    onChange={(event) => setEmployeeRole(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1156 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1157 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1158 | `                                <Field label="Folha de pagamento">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1159 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1160 | `                                    inputMode="decimal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1161 | `                                    placeholder="0,00"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1162 | `                                    value={employeeSalary}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1163 | `                                    onChange={(event) => setEmployeeSalary(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1164 | `                                    onBlur={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1165 | `                                      setEmployeeSalary((value) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1166 | `                                        value ? formatSalary(value) : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1167 | `                                      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1168 | `                                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1169 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1170 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1171 | `                                <Field label="Salário Extrafolha">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1172 | `                                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1173 | `                                    inputMode="decimal"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1174 | `                                    placeholder="0,00"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1175 | `                                    value={employeeSalaryExtrafolha}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1176 | `                                    onChange={(event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1177 | `                                      setEmployeeSalaryExtrafolha(event.target.value)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1178 | `                                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1179 | `                                    onBlur={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1180 | `                                      setEmployeeSalaryExtrafolha((value) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1181 | `                                        value ? formatSalary(value) : "",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1182 | `                                      )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1183 | `                                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1184 | `                                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1185 | `                                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1186 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1187 | `                              <Field label="Observações">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1188 | `                                <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1189 | `                                  value={employeeActivities}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1190 | `                                  onChange={(event) => setEmployeeActivities(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1191 | `                                  placeholder="Descreva livremente quaisquer observações."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1192 | `                                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1193 | `                              </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1194 | `                              <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1195 | `                                <Label>Foto do funcionário</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1196 | `                                <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1197 | `                                  htmlFor="employee-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1198 | `                                  className={\`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed p-3 transition-colors ${` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1199 | `                                    isEmployeeAvatarDragging` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1200 | `                                      ? "border-primary bg-primary/15"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1201 | `                                      : "border-primary/50 bg-primary/5 hover:bg-primary/10"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1202 | `                                  }\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1203 | `                                  onDragEnter={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1204 | `                                    event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1205 | `                                    setIsEmployeeAvatarDragging(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1206 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1207 | `                                  onDragOver={(event) => event.preventDefault()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1208 | `                                  onDragLeave={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1209 | `                                    event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1210 | `                                    setIsEmployeeAvatarDragging(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1211 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1212 | `                                  onDrop={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1213 | `                                    event.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1214 | `                                    setIsEmployeeAvatarDragging(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1215 | `                                    setEmployeeAvatar(event.dataTransfer.files?.[0]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1216 | `                                  }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1217 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1218 | `                                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1219 | `                                    <ImageUp className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1220 | `                                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1221 | `                                  <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1222 | `                                    <span className="block text-sm font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1223 | `                                      {isEmployeeAvatarDragging` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1224 | `                                        ? "Solte a foto aqui"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1225 | `                                        : "Selecionar ou arrastar foto do funcionário"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1226 | `                                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1227 | `                                    <span className="block text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1228 | `                                      PNG, JPG ou WebP` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1229 | `                                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1230 | `                                  </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1231 | `                                </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1232 | `                                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1233 | `                                  ref={employeeAvatarInputRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1234 | `                                  id="employee-avatar"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1235 | `                                  type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1236 | `                                  accept="image/png,image/jpeg,image/webp"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1237 | `                                  className="sr-only"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1238 | `                                  onChange={(event) => setEmployeeAvatar(event.target.files?.[0])}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1239 | `                                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1240 | `                                {employeeAvatarFile && employeeAvatarPreview && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1241 | `                                  <div className="mt-2 flex items-center gap-2 rounded-md border p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1242 | `                                    <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1243 | `                                      src={employeeAvatarPreview}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1244 | `                                      alt="Prévia"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1245 | `                                      className="h-9 w-9 rounded-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1246 | `                                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1247 | `                                    <span className="min-w-0 flex-1 truncate text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1248 | `                                      {employeeAvatarFile.name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1249 | `                                    </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1250 | `                                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1251 | `                                      type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1252 | `                                      size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1253 | `                                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1254 | `                                      onClick={clearSelectedEmployeeAvatar}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1255 | `                                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1256 | `                                      Remover` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1257 | `                                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1258 | `                                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1259 | `                                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1260 | `                                {!employeeAvatarFile &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1261 | `                                  editingEmployeeId &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1262 | `                                  employeeAvatarUrls[editingEmployeeId] && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1263 | `                                    <div className="mt-2 flex items-center gap-2 rounded-md border p-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1264 | `                                      <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1265 | `                                        src={employeeAvatarUrls[editingEmployeeId]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1266 | `                                        alt="Foto atual"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1267 | `                                        className="h-9 w-9 rounded-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1268 | `                                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1269 | `                                      <span className="min-w-0 flex-1 truncate text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1270 | `                                        Foto atual salva` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1271 | `                                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1272 | `                                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1273 | `                                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1274 | `                                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1275 | `                                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1276 | `                                        className="text-destructive hover:text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1277 | `                                        onClick={() => void removeSavedEmployeeAvatar()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1278 | `                                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1279 | `                                        Remover foto` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1280 | `                                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1281 | `                                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1282 | `                                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1283 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1284 | `                              <div className="flex justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1285 | `                                <Button variant="outline" onClick={resetEmployeeForm}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1286 | `                                  Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1287 | `                                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1288 | `                                <Button onClick={saveEmployee}>Salvar funcionário</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1289 | `                              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1290 | `                            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1291 | `                          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1292 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1293 | `                          <div className="mt-4 space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1294 | `                            {employees` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1295 | `                              .filter((employee) => employee.department_id === department.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1296 | `                              .map((employee) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1297 | `                                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1298 | `                                  key={employee.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1299 | `                                  className="flex items-center justify-between gap-3 rounded-lg border p-3"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1300 | `                                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1301 | `                                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1302 | `                                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1303 | `                                    className="flex min-w-0 flex-1 items-start gap-3 text-left"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1304 | `                                    onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1305 | `                                      setEmployeeDialogPosition({ x: 0, y: 0 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1306 | `                                      setSelectedEmployee(employee);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1307 | `                                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1308 | `                                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1309 | `                                    {employeeAvatarUrls[employee.id] && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1310 | `                                      <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1311 | `                                        src={employeeAvatarUrls[employee.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1312 | `                                        alt={\`Foto de ${employee.full_name}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1313 | `                                        className="h-10 w-10 shrink-0 rounded-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1314 | `                                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1315 | `                                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1316 | `                                    <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1317 | `                                      <p className="font-medium">{employee.full_name}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1318 | `                                      <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1319 | `                                        {employee.role || "Sem função cadastrada"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1320 | `                                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1321 | `                                      <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1322 | `                                        {employee.person_type === "company"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1323 | `                                          ? "Pessoa Jurídica"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1324 | `                                          : "Pessoa Física"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1325 | `                                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1326 | `                                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1327 | `                                  </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1328 | `                                  <div className="flex shrink-0 items-center justify-end gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1329 | `                                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1330 | `                                      className="h-9"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1331 | `                                      size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1332 | `                                      variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1333 | `                                      onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1334 | `                                        setEmployeeDialogPosition({ x: 0, y: 0 });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1335 | `                                        setSelectedEmployee(employee);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1336 | `                                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1337 | `                                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1338 | `                                      Ver dados` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1339 | `                                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1340 | `                                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1341 | `                                      className="h-9 w-9"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1342 | `                                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1343 | `                                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1344 | `                                      title="Editar informações"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1345 | `                                      onClick={() => startEmployeeEdit(employee)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1346 | `                                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1347 | `                                      <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1348 | `                                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1349 | `                                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1350 | `                                      className="h-9 w-9"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1351 | `                                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1352 | `                                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1353 | `                                      title="Excluir funcionário"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1354 | `                                      onClick={() => deleteEmployee(employee)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1355 | `                                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1356 | `                                      <Trash2 className="h-4 w-4 text-destructive" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1357 | `                                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1358 | `                                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1359 | `                                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1360 | `                              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1361 | `                            {employees.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1362 | `                              (employee) => employee.department_id === department.id,` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1363 | `                            ).length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1364 | `                              <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1365 | `                                Nenhum funcionário cadastrado neste departamento.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1366 | `                              </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1367 | `                            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1368 | `                          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1369 | `                        </CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1370 | `                      </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1371 | `                    </SortableDepartment>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1372 | `                  ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1373 | `                  {departments.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1374 | `                    <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1375 | `                      Nenhum departamento cadastrado.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1376 | `                    </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1377 | `                  )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1378 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1379 | `              </SortableContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1380 | `            </DndContext>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1381 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1382 | `          <TabsContent value="system" className="mt-6 space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1383 | `            <div className="flex flex-wrap items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1384 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1385 | `                <h2 className="font-semibold">Sistemas</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1386 | `                <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1387 | `                  Gerencie os acessos e credenciais deste cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1388 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1389 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1390 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1391 | `                onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1392 | `                  resetSystemAccessForm();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1393 | `                  setSystemAccessFormOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1394 | `                }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1395 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1396 | `                <Plus className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1397 | `                Cadastrar Acesso` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1398 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1399 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1400 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1401 | `            {systemAccessFormOpen && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1402 | `              <div className="space-y-4 rounded-lg border p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1403 | `                <h3 className="font-medium">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1404 | `                  {editingSystemAccessId ? "Editar acesso" : "Novo acesso"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1405 | `                </h3>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1406 | `                <Field label="Título">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1407 | `                  <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1408 | `                    value={systemAccessTitle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1409 | `                    onChange={(event) => setSystemAccessTitle(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1410 | `                    placeholder="Ex.: Portal do cliente"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1411 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1412 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1413 | `                <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1414 | `                  <Field label="Login">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1415 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1416 | `                      value={systemAccessLogin}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1417 | `                      onChange={(event) => setSystemAccessLogin(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1418 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1419 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1420 | `                  <Field label="Senha">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1421 | `                    <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1422 | `                      type="password"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1423 | `                      value={systemAccessPassword}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1424 | `                      onChange={(event) => setSystemAccessPassword(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1425 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1426 | `                  </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1427 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1428 | `                <Field label="Observação">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1429 | `                  <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1430 | `                    value={systemAccessNotes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1431 | `                    onChange={(event) => setSystemAccessNotes(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1432 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1433 | `                </Field>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1434 | `                <div className="flex justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1435 | `                  <Button variant="outline" onClick={resetSystemAccessForm}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1436 | `                    Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1437 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1438 | `                  <Button onClick={saveSystemAccess}>Salvar acesso</Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1439 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1440 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1441 | `            )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1442 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1443 | `            <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1444 | `              {systemAccesses.map((access) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1445 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1446 | `                  key={access.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1447 | `                  className="flex items-start justify-between gap-3 rounded-lg border p-4"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1448 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1449 | `                  <div className="min-w-0">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1450 | `                    <p className="font-medium">{access.title}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1451 | `                    <p className="mt-1 text-sm text-muted-foreground">Login: {access.login}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1452 | `                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1453 | `                      <span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1454 | `                        Senha:{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1455 | `                        {visibleSystemAccessPasswordId === access.id ? access.password : "••••••••"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1456 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1457 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1458 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1459 | `                        size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1460 | `                        variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1461 | `                        className="h-6 w-6"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1462 | `                        title={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1463 | `                          visibleSystemAccessPasswordId === access.id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1464 | `                            ? "Ocultar senha"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1465 | `                            : "Visualizar senha"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1466 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1467 | `                        onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1468 | `                          setVisibleSystemAccessPasswordId((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1469 | `                            current === access.id ? null : access.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1470 | `                          )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1471 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1472 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1473 | `                        {visibleSystemAccessPasswordId === access.id ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1474 | `                          <EyeOff className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1475 | `                        ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1476 | `                          <Eye className="h-3.5 w-3.5" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1477 | `                        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1478 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1479 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1480 | `                    {access.notes && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1481 | `                      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1482 | `                        {access.notes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1483 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1484 | `                    )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1485 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1486 | `                  <div className="flex shrink-0 gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1487 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1488 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1489 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1490 | `                      title="Editar acesso"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1491 | `                      onClick={() => startSystemAccessEdit(access)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1492 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1493 | `                      <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1494 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1495 | `                    <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1496 | `                      size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1497 | `                      variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1498 | `                      title="Excluir acesso"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1499 | `                      onClick={() => deleteSystemAccess(access)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1500 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1501 | `                      <Trash2 className="h-4 w-4 text-destructive" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1502 | `                    </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1503 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1504 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1505 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1506 | `              {systemAccesses.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1507 | `                <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1508 | `                  Nenhum acesso cadastrado.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1509 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1510 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1511 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1512 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1513 | `          <TabsContent value="notes" className="mt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1514 | `            <div className="mb-4 flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1515 | `              <NotebookPen className="h-5 w-5 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1516 | `              <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1517 | `                <h2 className="font-semibold">Anotações</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1518 | `                <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1519 | `                  Anotações, pendências, links e anexos deste cliente.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1520 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1521 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1522 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1523 | `            <NotesWorkspace fixedClientId={clientId} embedded />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1524 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1525 | `          <TabsContent value="attachments" className="mt-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1526 | `            <AttachmentsManager clientId={clientId} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1527 | `          </TabsContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1528 | `        </Tabs>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1529 | `      </Card>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1530 | `      <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1531 | `        <DialogContent` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1532 | `          className="max-w-2xl"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1533 | `          style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1534 | `            left: \`calc(50% + ${employeeDialogPosition.x}px)\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1535 | `            top: \`calc(50% + ${employeeDialogPosition.y}px)\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1536 | `          }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1537 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1538 | `          {selectedEmployee && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1539 | `            <>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1540 | `              <DialogHeader` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1541 | `                className="cursor-grab select-none rounded-md px-1 py-1 active:cursor-grabbing"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1542 | `                onPointerDown={startEmployeeDialogDrag}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1543 | `                title="Arraste para mover esta janela"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1544 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1545 | `                <DialogTitle>Dados do funcionário</DialogTitle>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1546 | `              </DialogHeader>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1547 | `              <div className="flex justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1548 | `                <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1549 | `                  type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1550 | `                  size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1551 | `                  variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1552 | `                  onClick={() => void downloadEmployeeCard()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1553 | `                  disabled={isDownloadingEmployeeCard}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1554 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1555 | `                  <Download className="mr-2 h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1556 | `                  {isDownloadingEmployeeCard ? "Gerando..." : "Baixar JPEG"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1557 | `                </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1558 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1559 | `              <div className="overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1560 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1561 | `                  id="employee-card-export"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1562 | `                  ref={employeeCardRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1563 | `                  className="overflow-hidden bg-card"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1564 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1565 | `                  <div className="h-2 bg-gradient-to-r from-emerald-600 via-yellow-400 to-blue-700" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1566 | `                  <div className="grid gap-5 p-5 sm:grid-cols-[110px_1fr]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1567 | `                    <div className="order-first">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1568 | `                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1569 | `                        Foto salva` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1570 | `                      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1571 | `                      {employeeAvatarUrls[selectedEmployee.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1572 | `                        <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1573 | `                          src={employeeAvatarUrls[selectedEmployee.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1574 | `                          alt={\`Foto de ${selectedEmployee.full_name}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1575 | `                          className="aspect-[3/4] w-[110px] rounded-md border bg-muted object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1576 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1577 | `                      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1578 | `                        <div className="grid aspect-[3/4] w-[110px] place-items-center rounded-md border bg-muted text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1579 | `                          Sem foto` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1580 | `                        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1581 | `                      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1582 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1583 | `                    <div className="space-y-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1584 | `                      <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1585 | `                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1586 | `                          Nome completo` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1587 | `                        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1588 | `                        <p className="text-lg font-semibold">{selectedEmployee.full_name}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1589 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1590 | `                      <div className="grid gap-4 sm:grid-cols-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1591 | `                        <Detail` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1592 | `                          label="Tipo de pessoa"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1593 | `                          value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1594 | `                            selectedEmployee.person_type === "company"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1595 | `                              ? "Pessoa Jurídica"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1596 | `                              : "Pessoa Física"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1597 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1598 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1599 | `                        <Detail` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1600 | `                          label={selectedEmployee.person_type === "company" ? "CNPJ" : "CPF"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1601 | `                          value={selectedEmployee.document}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1602 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1603 | `                        <Detail label="CBO" value={selectedEmployee.cbo} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1604 | `                        <Detail label="Função" value={selectedEmployee.role} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1605 | `                        <Detail` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1606 | `                          label="Salário Bruto"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1607 | `                          value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1608 | `                            selectedEmployee.salary === null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1609 | `                              ? null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1610 | `                              : formatSalary(selectedEmployee.salary)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1611 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1612 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1613 | `                        <Detail` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1614 | `                          label="Salário Extrafolha"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1615 | `                          value={` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1616 | `                            selectedEmployee.salary_extrafolha == null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1617 | `                              ? null` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1618 | `                              : formatSalary(selectedEmployee.salary_extrafolha)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1619 | `                          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1620 | `                        />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1621 | `                      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1622 | `                      <Detail label="Observações" value={selectedEmployee.activities} multiline />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1623 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1624 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1625 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1626 | `                <EmployeeDetailSection` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1627 | `                  title="Anexos do funcionário"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1628 | `                  icon={<Paperclip className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1629 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1630 | `                  <AttachmentsManager` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1631 | `                    clientId={clientId}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1632 | `                    employeeId={selectedEmployee.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1633 | `                    hideHeader` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1634 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1635 | `                </EmployeeDetailSection>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1636 | `                <EmployeeDetailSection` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1637 | `                  title="Anotações do funcionário"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1638 | `                  icon={<NotebookPen className="h-4 w-4" />}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1639 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1640 | `                  <EmployeeNotesManager employeeId={selectedEmployee.id} />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1641 | `                </EmployeeDetailSection>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1642 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1643 | `            </>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1644 | `          )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1645 | `        </DialogContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1646 | `      </Dialog>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1647 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1648 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1649 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1650 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1651 | `type ManagedAttachment = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 1652 | `  id: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1653 | `  title: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1654 | `  file_name: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1655 | `  storage_path: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1656 | `  mime_type: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1657 | `  size_bytes: number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1658 | `  created_at: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1659 | `  source_attachment_id?: string | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1660 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1661 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1662 | `function EmployeeDetailSection({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1663 | `  title,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1664 | `  icon,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1665 | `  children,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1666 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1667 | `  title: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1668 | `  icon: ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1669 | `  children: ReactNode;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1670 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1671 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1672 | `    <Collapsible className="border-t">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1673 | `      <CollapsibleTrigger className="group flex w-full items-center gap-2 px-5 py-4 text-left hover:bg-muted/30">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1674 | `        {icon}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1675 | `        <span className="flex-1 font-semibold">{title}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1676 | `        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1677 | `      </CollapsibleTrigger>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1678 | `      <CollapsibleContent className="px-5 pb-5">{children}</CollapsibleContent>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1679 | `    </Collapsible>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1680 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1681 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1682 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1683 | `type EmployeeNote = { id: string; content: string; created_at: string };` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 1684 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1685 | `function EmployeeNotesManager({ employeeId }: { employeeId: string }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1686 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1687 | `  const [notes, setNotes] = useState<EmployeeNote[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1688 | `  const [content, setContent] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1689 | `  const [saving, setSaving] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1690 | `  const [editingId, setEditingId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1691 | `  const [editingContent, setEditingContent] = useState("");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1692 | `  const [savingEditId, setSavingEditId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1693 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1694 | `  const load = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1695 | `    const { data, error } = await (supabase.from("client_department_employee_notes") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1696 | `      .select("id, content, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1697 | `      .eq("employee_id", employeeId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1698 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1699 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1700 | `    setNotes((data ?? []) as EmployeeNote[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1701 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1702 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1703 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1704 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1705 | `  }, [employeeId]); // eslint-disable-line react-hooks/exhaustive-deps` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1706 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1707 | `  const add = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1708 | `    if (!user || !content.trim()) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1709 | `    setSaving(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1710 | `    const { data, error } = await (supabase.from("client_department_employee_notes") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1711 | `      .insert({ employee_id: employeeId, content: content.trim(), created_by: user.id })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1712 | `      .select("id, content, created_at")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1713 | `      .single();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1714 | `    setSaving(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1715 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1716 | `    setNotes((current) => [data as EmployeeNote, ...current]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1717 | `    setContent("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1718 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1719 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1720 | `  const remove = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1721 | `    const { error } = await (supabase.from("client_department_employee_notes") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1722 | `      .delete()` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1723 | `      .eq("id", id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1724 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1725 | `    setNotes((current) => current.filter((note) => note.id !== id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1726 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1727 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1728 | `  const saveEdit = async (id: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1729 | `    const nextContent = editingContent.trim();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1730 | `    if (!nextContent) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1731 | `    setSavingEditId(id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1732 | `    const { error } = await (supabase.from("client_department_employee_notes") as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1733 | `      .update({ content: nextContent })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1734 | `      .eq("id", id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1735 | `    setSavingEditId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1736 | `    if (error) return toast.error(error.message);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1737 | `    setNotes((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1738 | `      current.map((note) => (note.id === id ? { ...note, content: nextContent } : note)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1739 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1740 | `    setEditingId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1741 | `    setEditingContent("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1742 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1743 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1744 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1745 | `    <div className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1746 | `      <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1747 | `        value={content}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1748 | `        onChange={(event) => setContent(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1749 | `        placeholder="Registre uma anotação sobre este funcionário..."` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1750 | `        className="min-h-24"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1751 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1752 | `      <div className="flex justify-end">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1753 | `        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1754 | `          type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1755 | `          size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1756 | `          disabled={saving || !content.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1757 | `          onClick={() => void add()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1758 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1759 | `          <Plus className="mr-1 h-4 w-4" /> {saving ? "Salvando..." : "Adicionar anotação"}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1760 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1761 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1762 | `      {notes.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1763 | `        <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1764 | `          Nenhuma anotação adicionada.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1765 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1766 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1767 | `        <ul className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1768 | `          {notes.map((note) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1769 | `            <li key={note.id} className="flex gap-3 rounded-lg border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1770 | `              <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1771 | `                {editingId === note.id ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1772 | `                  <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1773 | `                    <Textarea` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1774 | `                      value={editingContent}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1775 | `                      onChange={(event) => setEditingContent(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1776 | `                      className="min-h-20"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1777 | `                    />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1778 | `                    <div className="flex justify-end gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1779 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1780 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1781 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1782 | `                        variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1783 | `                        onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1784 | `                          setEditingId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1785 | `                          setEditingContent("");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1786 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1787 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1788 | `                        Cancelar` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1789 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1790 | `                      <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1791 | `                        type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1792 | `                        size="sm"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1793 | `                        disabled={savingEditId === note.id || !editingContent.trim()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1794 | `                        onClick={() => void saveEdit(note.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1795 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1796 | `                        <Save className="mr-1 h-3.5 w-3.5" />{" "}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1797 | `                        {savingEditId === note.id ? "Salvando..." : "Salvar"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1798 | `                      </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1799 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1800 | `                  </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1801 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1802 | `                  <p className="whitespace-pre-wrap text-sm">{note.content}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1803 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1804 | `                <p className="mt-2 text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1805 | `                  Criada em{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1806 | `                  {format(new Date(note.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1807 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1808 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1809 | `              {editingId !== note.id && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1810 | `                <div className="flex shrink-0 items-start gap-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1811 | `                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1812 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1813 | `                    size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1814 | `                    variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1815 | `                    onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1816 | `                      setEditingId(note.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1817 | `                      setEditingContent(note.content);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1818 | `                    }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1819 | `                    title="Editar anotação"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1820 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1821 | `                    <Pencil className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1822 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1823 | `                  <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1824 | `                    type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1825 | `                    size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1826 | `                    variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1827 | `                    className="text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1828 | `                    onClick={() => void remove(note.id)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1829 | `                    title="Excluir anotação"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1830 | `                  >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1831 | `                    <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1832 | `                  </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1833 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1834 | `              )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1835 | `            </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1836 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1837 | `        </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1838 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1839 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 1840 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1841 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1842 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1843 | `function AttachmentsManager({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1844 | `  clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1845 | `  employeeId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1846 | `  hideHeader = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1847 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1848 | `  clientId: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1849 | `  employeeId?: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1850 | `  hideHeader?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1851 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1852 | `  const { user, isAdmin } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1853 | `  const { data: profiles = [] } = useProfiles();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1854 | `  const [files, setFiles] = useState<ManagedAttachment[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1855 | `  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1856 | `  const [uploading, setUploading] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1857 | `  // Admins begin with their own uploads, but may deliberately switch to one` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1858 | `  // person or all people. Other roles always remain restricted to themselves.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1859 | `  const [ownerFilter, setOwnerFilter] = useState<string>(user?.id ?? "");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1860 | `  const table = employeeId ? "client_department_employee_attachments" : "client_files";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1861 | `  const foreignKey = employeeId ? "employee_id" : "client_id";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1862 | `  const referenceId = employeeId ?? clientId;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1863 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1864 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1865 | `    if (user?.id) setOwnerFilter((current) => current || user.id);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1866 | `  }, [user?.id]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1867 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1868 | `  const load = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1869 | `    // The client-wide attachment area is personal by default. Keep the` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1870 | `    // employee attachment area unchanged, since it belongs to the employee.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 1871 | `    if (!employeeId && !user?.id) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1872 | `      setFiles([]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1873 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1874 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1875 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1876 | `    let query = (supabase.from(table) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1877 | `      .select("*")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1878 | `      .eq(foreignKey, referenceId)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1879 | `      .order("created_at", { ascending: false });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1880 | `    if (!employeeId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1881 | `      const selectedOwner = isAdmin ? ownerFilter || user!.id : user!.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1882 | `      if (selectedOwner !== "all") query = query.eq("uploaded_by", selectedOwner);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1883 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1884 | `    const { data, error } = await query;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1885 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1886 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1887 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1888 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1889 | `    setFiles((data ?? []) as ManagedAttachment[]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1890 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1891 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1892 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1893 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1894 | `  }, [referenceId, ownerFilter, isAdmin, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1895 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1896 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1897 | `    let cancelled = false;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1898 | `    const imageFiles = files.filter((file) => file.mime_type?.startsWith("image/"));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1899 | `    if (imageFiles.length === 0) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1900 | `      setThumbnails({});` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1901 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1902 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1903 | `    void Promise.all(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1904 | `      imageFiles.map(async (file) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1905 | `        const { data } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1906 | `          .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1907 | `          .createSignedUrl(file.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1908 | `        return [file.id, data?.signedUrl ?? ""] as const;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1909 | `      }),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1910 | `    ).then((entries) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1911 | `      if (!cancelled) setThumbnails(Object.fromEntries(entries));` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1912 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1913 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 1914 | `      cancelled = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1915 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1916 | `  }, [files]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1917 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1918 | `  const upload = async (fileList: FileList | null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1919 | `    if (!fileList?.length || !user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1920 | `    setUploading(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1921 | `    for (const file of Array.from(fileList)) {` | Inicia uma repeticao sobre dados ou condicoes. |
| 1922 | `      const safeName = file.name` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1923 | `        .normalize("NFD")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1924 | `        .replace(/[\u0300-\u036f]/g, "")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1925 | `        .replace(/[^a-zA-Z0-9._-]+/g, "_");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1926 | `      const path = employeeId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1927 | `        ? \`clients/${clientId}/employees/${employeeId}/files/${Date.now()}_${safeName}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1928 | `        : \`clients/${clientId}/files/${Date.now()}_${safeName}\`;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1929 | `      const { error: uploadError } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1930 | `        .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1931 | `        .upload(path, file, { contentType: file.type || "application/octet-stream" });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1932 | `      if (uploadError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1933 | `        toast.error(uploadError.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1934 | `        continue;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1935 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1936 | `      const payload = employeeId` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1937 | `        ? {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1938 | `            employee_id: employeeId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1939 | `            title: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1940 | `            file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1941 | `            storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1942 | `            mime_type: file.type || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1943 | `            size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1944 | `            uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1945 | `          }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1946 | `        : {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1947 | `            client_id: clientId,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1948 | `            title: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1949 | `            file_name: file.name,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1950 | `            storage_path: path,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1951 | `            mime_type: file.type || null,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1952 | `            size_bytes: file.size,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1953 | `            uploaded_by: user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1954 | `            position: files.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1955 | `          };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1956 | `      const { error: insertError } = await (supabase.from(table) as any).insert(payload);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1957 | `      if (insertError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1958 | `        await supabase.storage.from("task-attachments").remove([path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1959 | `        toast.error(insertError.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1960 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1961 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1962 | `    setUploading(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1963 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1964 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1965 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1966 | `  const open = async (file: ManagedAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1967 | `    const { data, error } = await supabase.storage` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1968 | `      .from("task-attachments")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1969 | `      .createSignedUrl(file.storage_path, 3600);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1970 | `    if (error || !data?.signedUrl) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1971 | `      toast.error(error?.message ?? "Não foi possível abrir o arquivo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1972 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1973 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1974 | `    window.open(data.signedUrl, "_blank", "noopener,noreferrer");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1975 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1976 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 1977 | `  const remove = async (file: ManagedAttachment) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1978 | `    if (!confirm(\`Excluir o anexo "${file.file_name}"?\`)) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1979 | `    const { taskAttachmentIdFromClientFilePath } =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1980 | `      await import("@/lib/sync-task-attachment-to-client");` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1981 | `    const sourceAttachmentId =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1982 | `      file.source_attachment_id ?? taskAttachmentIdFromClientFilePath(file.storage_path);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1983 | `    if (!employeeId && sourceAttachmentId) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1984 | `      const { removeTaskAttachmentAndClientCopy } =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1985 | `        await import("@/lib/sync-task-attachment-to-client");` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1986 | `      try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 1987 | `        await removeTaskAttachmentAndClientCopy(sourceAttachmentId);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 1988 | `      } catch (error) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1989 | `        toast.error(error instanceof Error ? error.message : "Não foi possível excluir o arquivo.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1990 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1991 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1992 | `      void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1993 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1994 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 1995 | `    const { error } = await (supabase.from(table) as any).delete().eq("id", file.id);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 1996 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 1997 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 1998 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 1999 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2000 | `    await supabase.storage.from("task-attachments").remove([file.storage_path]);` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 2001 | `    void load();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2002 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2003 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2004 | `  const saveTitle = async (file: ManagedAttachment, title: string) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2005 | `    const { error } = await (supabase.from(table) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2006 | `      .update({ title: title.trim() || file.file_name })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2007 | `      .eq("id", file.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2008 | `    if (error) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2009 | `      toast.error(error.message);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2010 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2011 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2012 | `    setFiles((current) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2013 | `      current.map((item) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2014 | `        item.id === file.id ? { ...item, title: title.trim() || file.file_name } : item,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2015 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2016 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2017 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2018 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2019 | `  const title = employeeId ? "Anexos do funcionário" : "Anexos do cliente";` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2020 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2021 | `    <section className="space-y-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2022 | `      {!hideHeader && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2023 | `        <div className="flex items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2024 | `          <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2025 | `            <h2 className="flex items-center gap-2 font-semibold">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2026 | `              <Paperclip className="h-4 w-4" /> {title}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2027 | `            </h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2028 | `            <p className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2029 | `              Adicione documentos, imagens e outros arquivos.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2030 | `            </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2031 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2032 | `          <span className="text-sm text-muted-foreground">{files.length} arquivo(s)</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2033 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2034 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2035 | `      {isAdmin && !employeeId && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2036 | `        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2037 | `          <Label htmlFor="client-attachment-owner" className="text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2038 | `            Exibir anexos de` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2039 | `          </Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2040 | `          <select` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2041 | `            id="client-attachment-owner"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2042 | `            value={ownerFilter || user?.id || ""}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2043 | `            onChange={(event) => setOwnerFilter(event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2044 | `            className="h-8 min-w-52 rounded-md border bg-background px-2 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2045 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2046 | `            <option value={user?.id ?? ""}>Meus anexos</option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2047 | `            <option value="all">Todos os usuários</option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2048 | `            {profiles` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2049 | `              .filter((profile) => profile.id !== user?.id)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2050 | `              .map((profile) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2051 | `                <option key={profile.id} value={profile.id}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2052 | `                  {profile.full_name || profile.email || "Usuário sem nome"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2053 | `                </option>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2054 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2055 | `          </select>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2056 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2057 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2058 | `      <FileDropZone` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2059 | `        onFiles={(dropped) => void upload(dropped)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2060 | `        disabled={uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2061 | `        className="rounded-lg border border-dashed p-4"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2062 | `      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2063 | `        <label className="flex cursor-pointer items-center justify-between gap-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2064 | `          <span className="text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2065 | `            Arraste arquivos aqui ou selecione do computador.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2066 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2067 | `          <span className="rounded-md border bg-background px-3 py-1.5 text-sm">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2068 | `            {uploading ? "Enviando..." : "Adicionar arquivos"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2069 | `          </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2070 | `          <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2071 | `            type="file"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2072 | `            multiple` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2073 | `            className="hidden"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2074 | `            onChange={(event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2075 | `              void upload(event.target.files);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2076 | `              event.currentTarget.value = "";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2077 | `            }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2078 | `            disabled={uploading}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2079 | `          />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2080 | `        </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2081 | `      </FileDropZone>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2082 | `      {files.length === 0 ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2083 | `        <p className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2084 | `          Nenhum anexo adicionado.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2085 | `        </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2086 | `      ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2087 | `        <ul className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2088 | `          {files.map((file) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2089 | `            <li key={file.id} className="flex items-center gap-3 rounded-lg border p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2090 | `              <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2091 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2092 | `                onClick={() => void open(file)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2093 | `                className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted text-muted-foreground hover:bg-muted/70"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2094 | `                title={\`Abrir ${file.file_name}\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2095 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2096 | `                {thumbnails[file.id] ? (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2097 | `                  <img` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2098 | `                    src={thumbnails[file.id]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2099 | `                    alt={file.title || file.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2100 | `                    className="h-full w-full object-cover"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2101 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2102 | `                ) : (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2103 | `                  <Paperclip className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2104 | `                )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2105 | `              </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2106 | `              <div className="min-w-0 flex-1">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2107 | `                <Input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2108 | `                  defaultValue={file.title || file.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2109 | `                  onBlur={(event) => void saveTitle(file, event.target.value)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2110 | `                  placeholder="Título do anexo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2111 | `                  className="h-8"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2112 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2113 | `                <p className="mt-1 truncate text-xs text-muted-foreground" title={file.file_name}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2114 | `                  {file.file_name}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2115 | `                </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2116 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2117 | `              <Button type="button" size="sm" variant="outline" onClick={() => void open(file)}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2118 | `                <ExternalLink className="mr-1 h-3.5 w-3.5" /> Abrir` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2119 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2120 | `              <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2121 | `                type="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2122 | `                size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2123 | `                variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2124 | `                className="text-destructive"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2125 | `                onClick={() => void remove(file)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2126 | `                title="Excluir anexo"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2127 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2128 | `                <Trash2 className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2129 | `              </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2130 | `            </li>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2131 | `          ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2132 | `        </ul>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2133 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2134 | `    </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2135 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2136 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2137 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2138 | `function Field({ label, children }: { label: string; children: ReactNode }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2139 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2140 | `    <div className="space-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2141 | `      <Label>{label}</Label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2142 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2143 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2144 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2145 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2146 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2147 | `function SortableDepartment({ id, children }: { id: string; children: ReactNode }) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2148 | `  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2149 | `    id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2150 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2151 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2152 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2153 | `    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2154 | `      ref={setNodeRef}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2155 | `      style={{ transform: CSS.Transform.toString(transform), transition }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2156 | `      className={isDragging ? "opacity-50" : undefined}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2157 | `      {...attributes}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2158 | `      {...listeners}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2159 | `    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2160 | `      {children}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2161 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2162 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2163 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2164 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2165 | `function parseSalary(value: string) {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2166 | `  if (!value.trim()) return null;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 2167 | `  const normalized = value.replace(/\./g, "").replace(",", ".");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2168 | `  const salary = Number(normalized);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2169 | `  return Number.isFinite(salary) ? salary : null;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2170 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2171 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2172 | `function formatSalary(value: string | number): string {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2173 | `  const salary = typeof value === "number" ? value : parseSalary(value);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 2174 | `  return salary === null` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2175 | `    ? String(value)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2176 | `    : new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2177 | `        salary,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2178 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2179 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2180 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 2181 | `function Detail({` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 2182 | `  label,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2183 | `  value,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2184 | `  multiline = false,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2185 | `}: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2186 | `  label: string;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2187 | `  value: string | number | null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2188 | `  multiline?: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2189 | `}) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2190 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 2191 | `    <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2192 | `      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2193 | `      <p className={multiline ? "mt-1 whitespace-pre-wrap text-sm" : "text-sm font-medium"}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2194 | `        {value || "Não informado"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 2195 | `      </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2196 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 2197 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2198 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 2199 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
