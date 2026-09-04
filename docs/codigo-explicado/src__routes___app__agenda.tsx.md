# src/routes/_app/agenda.tsx

Tipo: Componente ou rota React em TypeScript.

Este documento foi gerado para estudo e manutencao. Ele preserva o codigo original e explica linha por linha sem alterar o comportamento do sistema publicado.

| Linha | Codigo original | Explicacao |
| ---: | --- | --- |
| 1 | `import { createFileRoute } from "@tanstack/react-router";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 2 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 3 | `  useEffect,` | Executa efeito React quando o componente carrega ou quando dependencias mudam. |
| 4 | `  useMemo,` | Memoriza um valor calculado para evitar processamento desnecessario. |
| 5 | `  useRef,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 6 | `  useState,` | Cria estado React para armazenar valores que mudam na tela. |
| 7 | `  type PointerEvent as ReactPointerEvent,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 8 | `} from "react";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 9 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 10 | `  addDays,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 11 | `  addMinutes,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 12 | `  addWeeks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 13 | `  differenceInMinutes,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 14 | `  endOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 15 | `  format,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 16 | `  isSameDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 17 | `  isToday,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 18 | `  startOfDay,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 19 | `  startOfWeek,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 20 | `  subWeeks,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 21 | `} from "date-fns";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 22 | `import { ptBR } from "date-fns/locale";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 23 | `import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 24 | `import { useQueryClient } from "@tanstack/react-query";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 25 | `import { Badge } from "@/components/ui/badge";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 26 | `import { Button } from "@/components/ui/button";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 27 | `import { AgendaEventDialog } from "@/components/AgendaEventDialog";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 28 | `import {` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 29 | `  useAgendaCalendarSources,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 30 | `  useAgendaEvents,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 31 | `  useGoogleCalendarConnection,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 32 | `  type AgendaEvent,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 33 | `  type AgendaCalendarSource,` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 34 | `} from "@/hooks/use-data";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 35 | `import { useAuth } from "@/hooks/use-auth";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 36 | `import { supabase } from "@/integrations/supabase/client";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 37 | `import { toast } from "sonner";` | Importa bibliotecas, componentes, tipos ou funcoes usados neste arquivo. |
| 38 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 39 | `export const Route = createFileRoute("/_app/agenda")({ component: AgendaPage });` | Exporta valor, funcao, tipo ou componente para ser usado por outros arquivos. |
| 40 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 41 | `const DAY_START_HOUR = 0;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 42 | `const DAY_END_HOUR = 24;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 43 | `const HOUR_HEIGHT = 64;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 44 | `const SNAP_MINUTES = 15;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 45 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 46 | `type ScheduleChange = Pick<AgendaEvent, "starts_at" | "ends_at">;` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 47 | `type Gesture = {` | Declara um contrato de tipos TypeScript para deixar os dados mais seguros e previsiveis. |
| 48 | `  event: AgendaEvent;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 49 | `  mode: "move" | "resize";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 50 | `  startY: number;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 51 | `  moved: boolean;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 52 | `};` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 53 | `const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 54 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 55 | `function AgendaPage() {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 56 | `  const [cursor, setCursor] = useState(new Date());` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 57 | `  const weekStart = useMemo(() => startOfWeek(cursor, { weekStartsOn: 1 }), [cursor]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 58 | `  const agendaRangeStart = useMemo(() => startOfDay(weekStart).toISOString(), [weekStart]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 59 | `  const agendaRangeEnd = useMemo(() => endOfDay(addDays(weekStart, 6)).toISOString(), [weekStart]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 60 | `  const { data: events = [], isLoading, error } = useAgendaEvents(agendaRangeStart, agendaRangeEnd);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 61 | `  const { data: calendarSources = [] } = useAgendaCalendarSources();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 62 | `  const { user } = useAuth();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 63 | `  const { data: googleConnection, isLoading: loadingGoogle } = useGoogleCalendarConnection();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 64 | `  const queryClient = useQueryClient();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 65 | `  const [dialogOpen, setDialogOpen] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 66 | `  const [editing, setEditing] = useState<AgendaEvent | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 67 | `  const [selectedDate, setSelectedDate] = useState<Date | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 68 | `  const [selectedTime, setSelectedTime] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 69 | `  const [connectingGoogle, setConnectingGoogle] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 70 | `  const [syncingGoogle, setSyncingGoogle] = useState(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 71 | `  const [previewSchedule, setPreviewSchedule] = useState<Record<string, ScheduleChange>>({});` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 72 | `  const [draggingId, setDraggingId] = useState<string | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 73 | `  const [savingIds, setSavingIds] = useState<string[]>([]);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 74 | `  const gestureRef = useRef<Gesture | null>(null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 75 | `  const skipClickRef = useRef(false);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 76 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 77 | `  const days = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 78 | `    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 79 | `    [weekStart],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 80 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 81 | `  const totalHeight = (DAY_END_HOUR - DAY_START_HOUR) * HOUR_HEIGHT;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 82 | `  const agendaEvents = events;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 83 | `  const visibleCalendarIds = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 84 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 85 | `      new Set(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 86 | `        calendarSources` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 87 | `          .filter((source) => source.is_visible)` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 88 | `          .map((source) => source.google_calendar_id),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 89 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 90 | `    [calendarSources],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 91 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 92 | `  const hasActiveCalendarFilter = calendarSources.some((source) => !source.is_visible);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 93 | `  const visibleEvents = useMemo(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 94 | `    () =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 95 | `      agendaEvents` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 96 | `        .filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 97 | `          (event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 98 | `            !event.google_calendar_id ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 99 | `            calendarSources.length === 0 ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 100 | `            !hasActiveCalendarFilter ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 101 | `            visibleCalendarIds.has(event.google_calendar_id),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 102 | `        )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 103 | `        .map((event) => ({ ...event, ...previewSchedule[event.id] })),` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 104 | `    [` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 105 | `      agendaEvents,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 106 | `      calendarSources.length,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 107 | `      hasActiveCalendarFilter,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 108 | `      previewSchedule,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 109 | `      visibleCalendarIds,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 110 | `    ],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 111 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 112 | `  const allDayEvents = visibleEvents.filter((event) => event.is_all_day);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 113 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 114 | `  const openNew = (date: Date = new Date(), time: string | null = null) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 115 | `    setEditing(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 116 | `    setSelectedDate(date);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 117 | `    setSelectedTime(time);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 118 | `    setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 119 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 120 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 121 | `  const setCalendarVisibility = async (source: AgendaCalendarSource, isVisible: boolean) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 122 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 123 | `    const previousSources = queryClient.getQueryData<AgendaCalendarSource[]>([` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 124 | `      "agenda_calendar_sources",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 125 | `      user.id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 126 | `    ]);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 127 | `    queryClient.setQueryData<AgendaCalendarSource[]>(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 128 | `      ["agenda_calendar_sources", user.id],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 129 | `      (current = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 130 | `        current.map((item) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 131 | `          item.google_calendar_id === source.google_calendar_id` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 132 | `            ? { ...item, is_visible: isVisible }` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 133 | `            : item,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 134 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 135 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 136 | `    const { data, error: preferenceError } = await supabase.functions.invoke(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 137 | `      "google-calendar-sync",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 138 | `      {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 139 | `        body: {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 140 | `          action: "set_calendar_visibility",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 141 | `          googleCalendarId: source.google_calendar_id,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 142 | `          isVisible,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 143 | `        },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 144 | `      },` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 145 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 146 | `    if (preferenceError || !data?.ok) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 147 | `      queryClient.setQueryData(["agenda_calendar_sources", user.id], previousSources);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 148 | `      toast.error("Não foi possível atualizar o filtro da agenda.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 149 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 150 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 151 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 152 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 153 | `  const timedEventsForDay = (day: Date) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 154 | `    visibleEvents.filter(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 155 | `      (event) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 156 | `        !event.is_all_day &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 157 | `        new Date(event.starts_at) < endOfDay(day) &&` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 158 | `        new Date(event.ends_at) > startOfDay(day),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 159 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 160 | `  const allDayEventsForDay = (day: Date) =>` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 161 | `    allDayEvents.filter((event) => isSameDay(new Date(event.starts_at), day));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 162 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 163 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 164 | `    const result = new URLSearchParams(window.location.search).get("google");` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 165 | `    if (!result) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 166 | `    if (result === "connected") toast.success("Conta Google conectada com sucesso.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 167 | `    if (result === "cancelled") toast.message("A conexão com o Google foi cancelada.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 168 | `    if (result === "error") toast.error("Não foi possível concluir a conexão com o Google.");` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 169 | `    window.history.replaceState({}, "", window.location.pathname);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 170 | `  }, []);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 171 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 172 | `  const connectGoogle = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 173 | `    setConnectingGoogle(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 174 | `    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-oauth", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 175 | `      body: { action: "start" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 176 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 177 | `    setConnectingGoogle(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 178 | `    if (invokeError || !data?.authorizeUrl) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 179 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 180 | `        invokeError?.message || data?.error || "Não foi possível iniciar a conexão Google.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 181 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 182 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 183 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 184 | `    window.location.assign(data.authorizeUrl);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 185 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 186 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 187 | `  const disconnectGoogle = async () => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 188 | `    if (` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 189 | `      !googleConnection ||` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 190 | `      !window.confirm(\`Desconectar a conta ${googleConnection.google_email}?\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 191 | `    )` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 192 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 193 | `    setConnectingGoogle(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 194 | `    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-oauth", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 195 | `      body: { action: "disconnect" },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 196 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 197 | `    setConnectingGoogle(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 198 | `    if (invokeError || !data?.ok) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 199 | `      toast.error(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 200 | `        invokeError?.message || data?.error || "Não foi possível desconectar a conta Google.",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 201 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 202 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 203 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 204 | `    await queryClient.invalidateQueries({ queryKey: ["google_calendar_connection"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 205 | `    toast.success("Conta Google desconectada.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 206 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 207 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 208 | `  const syncGoogle = async (silent = false) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 209 | `    if (syncingGoogle) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 210 | `    setSyncingGoogle(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 211 | `    const { data, error: invokeError } = await supabase.functions.invoke("google-calendar-sync", {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 212 | `      body: { rangeStart: agendaRangeStart, rangeEnd: agendaRangeEnd },` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 213 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 214 | `    setSyncingGoogle(false);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 215 | `    if (invokeError || !data?.ok) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 216 | `      let errorMessage =` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 217 | `        data?.error || invokeError?.message || "Não foi possível sincronizar a Agenda.";` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 218 | `      if (invokeError && "context" in invokeError) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 219 | `        const detail = await (invokeError as any).context?.json().catch(() => null);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 220 | `        errorMessage = detail?.error || errorMessage;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 221 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 222 | `      if (!silent) toast.error(errorMessage);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 223 | `      return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 224 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 225 | `    const returnedEvents = Array.isArray(data.events) ? (data.events as AgendaEvent[]) : null;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 226 | `    if (returnedEvents) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 227 | `      // A grade recebe a resposta da sincronização imediatamente pelo cache único.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 228 | `      queryClient.setQueryData(["agenda_events", agendaRangeStart, agendaRangeEnd], returnedEvents);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 229 | `    } else {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 230 | `      await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 231 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 232 | `    await queryClient.invalidateQueries({ queryKey: ["agenda_calendar_sources"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 233 | `    if (!silent) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 234 | `      if (data.importErrors?.length) toast.error(data.importErrors[0]);` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 235 | `      else if (data.pushErrors?.length) toast.error(data.pushErrors[0]);` | Define o caminho alternativo da condicao anterior. |
| 236 | `      else` | Define o caminho alternativo da condicao anterior. |
| 237 | `        toast.success(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 238 | `          \`Agenda sincronizada: ${data.pushed} enviados, ${data.pulled} recebidos de ${data.remoteEvents} evento(s) no Google.\`,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 239 | `        );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 240 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 241 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 242 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 243 | `  const eventStyle = (event: AgendaEvent, day: Date) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 244 | `    const dayStart = startOfDay(day);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 245 | `    const dayEnd = endOfDay(day);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 246 | `    const start = new Date(event.starts_at) < dayStart ? dayStart : new Date(event.starts_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 247 | `    const end = new Date(event.ends_at) > dayEnd ? dayEnd : new Date(event.ends_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 248 | `    const startMinutes = differenceInMinutes(start, dayStart) - DAY_START_HOUR * 60;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 249 | `    const duration = Math.max(30, differenceInMinutes(end, start));` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 250 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 251 | `      top: Math.max(0, (startMinutes / 60) * HOUR_HEIGHT),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 252 | `      height: Math.max(26, (duration / 60) * HOUR_HEIGHT),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 253 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 254 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 255 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 256 | `  const scheduleForGesture = (gesture: Gesture, clientY: number): ScheduleChange => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 257 | `    const rawDelta = ((clientY - gesture.startY) / HOUR_HEIGHT) * 60;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 258 | `    const delta = Math.round(rawDelta / SNAP_MINUTES) * SNAP_MINUTES;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 259 | `    const originalStart = new Date(gesture.event.starts_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 260 | `    const originalEnd = new Date(gesture.event.ends_at);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 261 | `    const dayStart = startOfDay(originalStart);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 262 | `    const nextDay = addDays(dayStart, 1);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 263 | `    if (gesture.mode === "resize") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 264 | `      const minEnd = addMinutes(originalStart, SNAP_MINUTES);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 265 | `      const end = new Date(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 266 | `        Math.min(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 267 | `          Math.max(addMinutes(originalEnd, delta).getTime(), minEnd.getTime()),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 268 | `          nextDay.getTime(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 269 | `        ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 270 | `      );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 271 | `      return { starts_at: originalStart.toISOString(), ends_at: end.toISOString() };` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 272 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 273 | `    const duration = originalEnd.getTime() - originalStart.getTime();` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 274 | `    const latestStart = new Date(nextDay.getTime() - duration);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 275 | `    const start = new Date(` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 276 | `      Math.min(` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 277 | `        Math.max(addMinutes(originalStart, delta).getTime(), dayStart.getTime()),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 278 | `        latestStart.getTime(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 279 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 280 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 281 | `    return {` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 282 | `      starts_at: start.toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 283 | `      ends_at: new Date(start.getTime() + duration).toISOString(),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 284 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 285 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 286 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 287 | `  const persistSchedule = async (event: AgendaEvent, schedule: ScheduleChange) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 288 | `    if (!user) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 289 | `    const agendaQueryKey = ["agenda_events", agendaRangeStart, agendaRangeEnd];` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 290 | `    const previousEvents = queryClient.getQueryData<AgendaEvent[]>(agendaQueryKey);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 291 | `    setSavingIds((ids) => [...ids, event.id]);` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 292 | `    queryClient.setQueryData<AgendaEvent[]>(agendaQueryKey, (current = []) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 293 | `      current.map((item) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 294 | `        item.id === event.id ? { ...item, ...schedule, updated_by: user.id } : item,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 295 | `      ),` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 296 | `    );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 297 | `    setPreviewSchedule((current) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 298 | `      const { [event.id]: _removed, ...remaining } = current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 299 | `      return remaining;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 300 | `    });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 301 | `    try {` | Inicia bloco protegido para capturar erros durante a execucao. |
| 302 | `      const { error: updateError } = await (supabase.from("calendar_events" as any) as any)` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 303 | `        .update({ ...schedule, updated_by: user.id, sync_status: "pending" })` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 304 | `        .eq("id", event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 305 | `      if (updateError) throw updateError;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 306 | `      await queryClient.invalidateQueries({ queryKey: ["agenda_events"] });` | Espera uma operacao assincrona terminar, como chamada ao Supabase ou processamento externo. |
| 307 | `      void syncGoogle(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 308 | `    } catch (updateError) {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 309 | `      queryClient.setQueryData(agendaQueryKey, previousEvents);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 310 | `      toast.error("Não foi possível atualizar o evento. A alteração foi desfeita.");` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 311 | `    } finally {` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 312 | `      setSavingIds((ids) => ids.filter((id) => id !== event.id));` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 313 | `    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 314 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 315 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 316 | `  const startGesture = (` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 317 | `    reactEvent: ReactPointerEvent<HTMLDivElement>,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 318 | `    event: AgendaEvent,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 319 | `    mode: Gesture["mode"],` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 320 | `  ) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 321 | `    if (reactEvent.button !== 0) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 322 | `    reactEvent.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 323 | `    reactEvent.stopPropagation();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 324 | `    gestureRef.current = { event, mode, startY: reactEvent.clientY, moved: false };` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 325 | `    setDraggingId(event.id);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 326 | `  };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 327 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 328 | `  useEffect(() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 329 | `    const move = (pointerEvent: PointerEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 330 | `      const gesture = gestureRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 331 | `      if (!gesture) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 332 | `      if (Math.abs(pointerEvent.clientY - gesture.startY) > 3) gesture.moved = true;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 333 | `      setPreviewSchedule({ [gesture.event.id]: scheduleForGesture(gesture, pointerEvent.clientY) });` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 334 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 335 | `    const end = (pointerEvent: PointerEvent) => {` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 336 | `      const gesture = gestureRef.current;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 337 | `      if (!gesture) return;` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 338 | `      gestureRef.current = null;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 339 | `      setDraggingId(null);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 340 | `      if (!gesture.moved) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 341 | `        setPreviewSchedule({});` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 342 | `        return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 343 | `      }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 344 | `      skipClickRef.current = true;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 345 | `      void persistSchedule(gesture.event, scheduleForGesture(gesture, pointerEvent.clientY));` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 346 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 347 | `    window.addEventListener("pointermove", move);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 348 | `    window.addEventListener("pointerup", end);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 349 | `    return () => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 350 | `      window.removeEventListener("pointermove", move);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 351 | `      window.removeEventListener("pointerup", end);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 352 | `    };` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 353 | `  });` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 354 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 355 | `  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 356 | `    <div className="space-y-4 p-4 sm:p-6">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 357 | `      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 358 | `        <div className="flex items-center gap-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 359 | `          <CalendarDays className="h-5 w-5 text-primary" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 360 | `          <h1 className="text-xl font-semibold">Agenda</h1>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 361 | `          <Badge variant="outline">Compartilhada</Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 362 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 363 | `        <Button onClick={() => openNew()}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 364 | `          <Plus className="mr-2 h-4 w-4" /> Novo compromisso` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 365 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 366 | `      </header>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 367 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 368 | `      <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 369 | `        <div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 370 | `          <p className="text-sm font-medium">Google Agenda</p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 371 | `          <p className="text-xs text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 372 | `            {googleConnection` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 373 | `              ? \`Conectado como ${googleConnection.google_email}\`` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 374 | `              : "Conecte sua conta para autorizar a Agenda compartilhada."}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 375 | `          </p>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 376 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 377 | `        {!loadingGoogle && !googleConnection && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 378 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 379 | `            variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 380 | `            onClick={() => void connectGoogle()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 381 | `            disabled={connectingGoogle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 382 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 383 | `            {connectingGoogle ? "Conectando…" : "Conectar Google Agenda"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 384 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 385 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 386 | `        {!loadingGoogle && googleConnection && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 387 | `          <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 388 | `            variant="outline"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 389 | `            onClick={() => void disconnectGoogle()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 390 | `            disabled={connectingGoogle}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 391 | `          >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 392 | `            {connectingGoogle ? "Desconectando…" : "Desconectar Google Agenda"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 393 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 394 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 395 | `        {!loadingGoogle && googleConnection && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 396 | `          <Button onClick={() => void syncGoogle()} disabled={syncingGoogle}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 397 | `            {syncingGoogle ? "Sincronizando…" : "Sincronizar agora"}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 398 | `          </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 399 | `        )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 400 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 401 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 402 | `      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 403 | `        <Button variant="outline" onClick={() => setCursor(new Date())}>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 404 | `          Hoje` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 405 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 406 | `        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 407 | `          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 408 | `          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 409 | `          aria-label="Semana anterior"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 410 | `          onClick={() => setCursor(subWeeks(cursor, 1))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 411 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 412 | `          <ChevronLeft className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 413 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 414 | `        <Button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 415 | `          size="icon"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 416 | `          variant="ghost"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 417 | `          aria-label="Próxima semana"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 418 | `          onClick={() => setCursor(addWeeks(cursor, 1))}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 419 | `        >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 420 | `          <ChevronRight className="h-4 w-4" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 421 | `        </Button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 422 | `        <span className="ml-1 text-base font-semibold capitalize sm:text-lg">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 423 | `          {format(weekStart, "MMMM 'de' yyyy", { locale: ptBR })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 424 | `        </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 425 | `        <Badge variant="secondary" className="ml-auto">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 426 | `          Semana` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 427 | `        </Badge>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 428 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 429 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
| 430 | `      {error && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 431 | `        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 432 | `          Não foi possível carregar a Agenda: {(error as Error).message}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 433 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 434 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 435 | `      {calendarSources.length > 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 436 | `        <section className="rounded-lg border bg-card p-4">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 437 | `          <h2 className="text-sm font-semibold">Minhas agendas</h2>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 438 | `          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 439 | `            {calendarSources.map((source) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 440 | `              <label` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 441 | `                key={source.google_calendar_id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 442 | `                className="flex cursor-pointer items-center gap-2 text-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 443 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 444 | `                <input` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 445 | `                  type="checkbox"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 446 | `                  checked={source.is_visible}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 447 | `                  onChange={(input) => void setCalendarVisibility(source, input.target.checked)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 448 | `                  className="h-4 w-4 rounded border-border"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 449 | `                  style={{ accentColor: source.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 450 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 451 | `                <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 452 | `                  className="h-3 w-3 rounded-sm"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 453 | `                  style={{ backgroundColor: source.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 454 | `                  aria-hidden="true"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 455 | `                />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 456 | `                <span>{source.name}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 457 | `              </label>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 458 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 459 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 460 | `        </section>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 461 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 462 | `      <div className="overflow-x-auto rounded-lg border bg-card">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 463 | `        <div className="min-w-[900px]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 464 | `          <div className="grid grid-cols-[64px_repeat(7,minmax(118px,1fr))] border-b">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 465 | `            <div className="border-r" />` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 466 | `            {days.map((day, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 467 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 468 | `                key={day.toISOString()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 469 | `                className="min-h-16 border-r px-2 py-2 text-center last:border-r-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 470 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 471 | `                <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 472 | `                  {DAYS[index]}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 473 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 474 | `                <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 475 | `                  onClick={() => openNew(day)}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 476 | `                  className={\`mx-auto mt-1 grid h-9 w-9 place-items-center rounded-full text-xl hover:bg-muted ${isToday(day) ? "bg-primary font-semibold text-primary-foreground hover:bg-primary" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 477 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 478 | `                  {format(day, "d")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 479 | `                </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 480 | `                <div className="mt-1 space-y-1 text-left">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 481 | `                  {allDayEventsForDay(day)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 482 | `                    .slice(0, 2)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 483 | `                    .map((event) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 484 | `                      <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 485 | `                        key={event.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 486 | `                        onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 487 | `                          setEditing(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 488 | `                          setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 489 | `                        }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 490 | `                        className="block w-full truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 491 | `                        style={{ backgroundColor: event.color }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 492 | `                      >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 493 | `                        {event.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 494 | `                      </button>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 495 | `                    ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 496 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 497 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 498 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 499 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 500 | `          <div className="grid grid-cols-[64px_repeat(7,minmax(118px,1fr))]">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 501 | `            <div className="relative border-r" style={{ height: totalHeight }}>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 502 | `              {Array.from({ length: DAY_END_HOUR - DAY_START_HOUR }, (_, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 503 | `                <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 504 | `                  key={index}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 505 | `                  className="absolute -top-2 right-2 text-[10px] text-muted-foreground"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 506 | `                  style={{ top: index * HOUR_HEIGHT }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 507 | `                >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 508 | `                  {String(DAY_START_HOUR + index).padStart(2, "0")}:00` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 509 | `                </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 510 | `              ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 511 | `            </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 512 | `            {days.map((day) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 513 | `              <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 514 | `                key={day.toISOString()}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 515 | `                className="relative border-r last:border-r-0"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 516 | `                style={{ height: totalHeight }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 517 | `              >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 518 | `                {Array.from({ length: DAY_END_HOUR - DAY_START_HOUR }, (_, index) => (` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 519 | `                  <button` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 520 | `                    key={index}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 521 | `                    aria-label={\`Criar compromisso às ${DAY_START_HOUR + index}:00\`}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 522 | `                    onClick={() =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 523 | `                      openNew(day, \`${String(DAY_START_HOUR + index).padStart(2, "0")}:00\`)` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 524 | `                    }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 525 | `                    className="absolute left-0 right-0 border-b border-border/70 hover:bg-primary/5"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 526 | `                    style={{ top: index * HOUR_HEIGHT, height: HOUR_HEIGHT }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 527 | `                  />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 528 | `                ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 529 | `                {timedEventsForDay(day).map((event) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 530 | `                  const style = eventStyle(event, day);` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 531 | `                  const isActive = draggingId === event.id;` | Cria uma variavel ou constante usada pela logica deste trecho. |
| 532 | `                  return (` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 533 | `                    <div` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 534 | `                      key={event.id}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 535 | `                      role="button"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 536 | `                      tabIndex={0}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 537 | `                      onPointerDown={(pointerEvent) => startGesture(pointerEvent, event, "move")}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 538 | `                      onClick={() => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 539 | `                        if (skipClickRef.current) {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 540 | `                          skipClickRef.current = false;` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 541 | `                          return;` | Devolve o resultado da funcao ou renderiza a interface do componente. |
| 542 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 543 | `                        setEditing(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 544 | `                        setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 545 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 546 | `                      onKeyDown={(keyboardEvent) => {` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 547 | `                        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {` | Inicia uma decisao condicional para tratar cenarios diferentes. |
| 548 | `                          keyboardEvent.preventDefault();` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 549 | `                          setEditing(event);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 550 | `                          setDialogOpen(true);` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 551 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 552 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 553 | `                      className={\`absolute z-10 overflow-hidden rounded-md px-1.5 py-1 text-left text-[11px] text-white shadow-sm outline-none transition-shadow hover:brightness-95 focus-visible:ring-2 focus-visible:ring-primary/70 ${isActive ? "z-20 cursor-grabbing opacity-85 shadow-lg" : "cursor-grab"} ${savingIds.includes(event.id) ? "animate-pulse" : ""}\`}` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 554 | `                      style={{` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 555 | `                        ...style,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 556 | `                        left: "3px",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 557 | `                        width: "calc(100% - 6px)",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 558 | `                        backgroundColor: event.color,` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 559 | `                        touchAction: "none",` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 560 | `                      }}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 561 | `                      title={event.title}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 562 | `                    >` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 563 | `                      <span className="block truncate font-semibold">{event.title}</span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 564 | `                      <span className="block truncate">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 565 | `                        {format(new Date(event.starts_at), "HH:mm")} –{" "}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 566 | `                        {format(new Date(event.ends_at), "HH:mm")}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 567 | `                      </span>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 568 | `                      <span` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 569 | `                        role="presentation"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 570 | `                        aria-label="Resize event duration"` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 571 | `                        onPointerDown={(pointerEvent) =>` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 572 | `                          startGesture(pointerEvent, event, "resize")` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 573 | `                        }` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 574 | `                        className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 575 | `                      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 576 | `                    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 577 | `                  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 578 | `                })}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 579 | `              </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 580 | `            ))}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 581 | `          </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 582 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 583 | `      </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 584 | `      {!isLoading && events.length === 0 && (` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 585 | `        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 586 | `          Ainda não há compromissos. Clique em um horário da grade para criar o primeiro.` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 587 | `        </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 588 | `      )}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 589 | `      <AgendaEventDialog` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 590 | `        open={dialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 591 | `        onOpenChange={setDialogOpen}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 592 | `        event={editing}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 593 | `        defaultDate={selectedDate}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 594 | `        defaultStartTime={selectedTime}` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 595 | `        // Saving must report a Google delivery error to the person who` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 596 | `        // created the event; silent failures make the two calendars diverge.` | Comentario existente no codigo; registra uma observacao para quem esta lendo ou mantendo o arquivo. |
| 597 | `        onSaved={() => syncGoogle()}` | Define uma funcao ou callback que sera executado quando a aplicacao precisar dessa logica. |
| 598 | `      />` | Linha de implementacao que compoe a regra de negocio, a interface ou a configuracao do arquivo. |
| 599 | `    </div>` | Renderiza elemento de interface React/JSX e aplica estilos ou propriedades. |
| 600 | `  );` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 601 | `}` | Fecha o bloco, objeto, funcao ou chamada iniciado nas linhas anteriores. |
| 602 | `(linha em branco)` | Separa blocos de codigo para melhorar a leitura. |
