export type UpdateWorkspace = "marketing" | "consultoria";
export type UpdatePreviewKind =
  | "subtask-participation"
  | "calendar-subtask-dates"
  | "update-one-click"
  | "update-retry"
  | "assignment-popup-read"
  | "update-shortcut"
  | "calendar-subtasks"
  | "update-flow"
  | "task-card-activity"
  | "task-edit"
  | "calendar-reschedule"
  | "links-calendar"
  | "task-prints"
  | "dashboard";
export type AppUpdate = {
  id: string;
  title: string;
  date: string;
  preview: UpdatePreviewKind;
  audience: "all" | "admin";
  workspaces: readonly UpdateWorkspace[];
  details: readonly string[];
};

// Keep newest first. The first visible entry determines the update notice and
// acknowledgement key, so a release is registered once, not in several screens.
export const APP_UPDATES: readonly AppUpdate[] = [
  {
    id: "subtarefas-concluidas-nas-visoes-2026-10-09",
    title: "Minha parte concluída nas tarefas",
    date: "2026-10-09",
    preview: "subtask-participation",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Quem participa somente por subtarefas acompanha o card principal enquanto ainda tiver alguma subtarefa atribuída em aberto. A subtarefa concluída continua visível no calendário no prazo próprio ou, se não tiver prazo, no dia da conclusão, sem recolocar o card pai na visão pessoal depois da última parte.",
      "Quem é colaborador ou responsável pelo card continua acompanhando a tarefa principal. No Kanban, a subtarefa finalizada aparece na coluna Concluídas; na lista, na seção Concluídas. A faixa separada acima das tarefas foi removida.",
    ],
  },
  {
    id: "prazos-individuais-subtarefas-calendario-2026-10-09",
    title: "Calendário e colagem de texto mais precisos",
    date: "2026-10-09",
    preview: "calendar-subtask-dates",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Com o filtro Subtarefas ativado, cada subtarefa com prazo diferente da tarefa principal aparece separadamente no dia do seu próprio prazo, nas visões de semana e mês.",
      "Subtarefas com o mesmo prazo, ou sem prazo próprio, continuam junto da tarefa principal. Clicar em qualquer subtarefa abre a tarefa para consultar seus detalhes.",
      "Ao colar texto na descrição, o editor preserva a formatação disponível e não exibe as tags HTML da origem. Textos simples e prints continuam aceitos.",
    ],
  },
  {
    id: "atualizacao-ultima-versao-um-clique-2026-10-09",
    title: "Atualização até a versão mais recente em um clique",
    date: "2026-10-09",
    preview: "update-one-click",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Ao clicar em Atualizar agora, o TaskFlow espera a versão publicada assumir o controle desta aba antes de recarregar. As novidades acumuladas chegam juntas no histórico.",
      "Depois do recarregamento, o sistema confirma que carregou a versão mais recente. Se uma versão intermediária aparecer, continua a atualização automaticamente, com limite de tentativas, sem pedir outro clique.",
      "Os dados offline são preservados. Uma falha de instalação não marca a atualização como concluída.",
    ],
  },
  {
    id: "atualizacao-navegador-recuperacao-2026-10-09",
    title: "Atualização do navegador mais confiável",
    date: "2026-10-09",
    preview: "update-retry",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Se o navegador substituir o serviço de atualização durante a instalação, Atualizar agora acompanha a nova tentativa e recarrega somente após a ativação.",
      "Quando outra aba já concluiu a atualização, o botão reconhece a versão ativada. Os dados offline permanecem preservados.",
    ],
  },
  {
    id: "avisos-atribuicao-marcar-lidos-2026-10-09",
    title: "Avisos de atribuição mais fáceis de organizar",
    date: "2026-10-09",
    preview: "assignment-popup-read",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "No pop-up de uma tarefa ou subtarefa atribuída, Marcar como lido substitui Depois quando há apenas um aviso.",
      "Se houver dois ou mais avisos na fila, Marcar todos como lidos limpa os avisos de atribuição pendentes de uma vez e atualiza o sino de notificações. Ver tarefa continua disponível.",
    ],
  },
  {
    id: "atualizar-direto-central-2026-10-08",
    title: "Atualização da página com menos cliques",
    date: "2026-10-08",
    preview: "update-shortcut",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Ao clicar em Novas atualizações ou abrir o histórico pelo aviso, a verificação da versão publicada acontece automaticamente. Não é mais preciso clicar em Verificar atualizações.",
      "O botão Atualizar agora fica no início da janela. A página só recarrega após seu clique e depois que a nova versão estiver pronta. Os dados offline continuam preservados; se houver falha, você pode tentar novamente.",
    ],
  },
  {
    id: "subtarefas-agrupadas-calendario-2026-10-08",
    title: "Subtarefas agrupadas no calendário",
    date: "2026-10-08",
    preview: "calendar-subtasks",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Ative Subtarefas nos filtros para vê-las abaixo da tarefa pai, no mesmo grupo e no dia em que a tarefa principal aparece. As linhas mostram o título, o responsável e a conclusão, sem exibir os prazos.",
      "Clique em uma subtarefa para abrir a tarefa pai e consultar seus prazos e detalhes. A visualização funciona nas visões de semana e mês e não altera datas nem o arraste das tarefas principais.",
      "A escolha fica lembrada neste navegador, por pessoa e ambiente. Os perfis com essa visualização pré-configurada já iniciam com o filtro ativado.",
      "O centro de atualizações verifica a versão publicada e espera a nova versão terminar de ativar antes de recarregar. Sem internet ou em caso de falha, mantém os dados offline e permite tentar novamente. As miniaturas ficam lado a lado quando há espaço e passam para a linha seguinte quando necessário.",
    ],
  },
  {
    id: "aberturas-pins-atalhos-tarefas-2026-10-08",
    title: "Aberturas, prioridades pessoais e tarefas no calendário",
    date: "2026-10-08",
    preview: "task-card-activity",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Em Aberturas do card, consulte a primeira e a última vez que cada pessoa abriu a tarefa, com data e horário de Brasília. O registro começa nesta atualização; aberturas offline aparecem ao sincronizar.",
      "No calendário, clique com o botão direito na tarefa e escolha Fixar tarefa ou Desfixar tarefa. Um pin pequeno em azul-marinho, com fundo claro, aparece sobreposto no canto do card. O botão Fixadas mostra apenas suas tarefas pendentes fixadas no período exibido; clicar novamente retorna à visualização normal. Cada pessoa tem seus próprios pins.",
      "Clique com o botão direito no dia ou em uma tarefa do calendário e selecione Nova tarefa. O formulário abre com o prazo daquele dia preenchido, nas visões de semana e mês.",
    ],
  },
  {
    id: "edicao-tarefas-prazos-descricoes-2026-10-08",
    title: "Salvamento de descrições e prazos",
    date: "2026-10-08",
    preview: "task-edit",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Ao editar uma tarefa, apenas os campos alterados são enviados. Salvar a descrição preserva um prazo atualizado enquanto a janela estava aberta.",
      "O salvamento confirma a tarefa retornada pelo servidor e atualiza sua exibição. Se a descrição no card não puder ser salva, o texto permanece no editor para tentar novamente. As permissões de acesso continuam as mesmas.",
    ],
  },
  {
    id: "arraste-calendario-justificativa-2026-10-07",
    title: "Arraste tarefas para alterar o prazo",
    date: "2026-10-07",
    preview: "calendar-reschedule",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Nas visões de mês e semana, arraste a tarefa para outra data. Um pop-up pequeno pede a justificativa; o prazo só muda depois de preencher e confirmar. ESC ou Cancelar mantêm a data original.",
      "Apenas o prazo da tarefa principal é alterado. Horário e subtarefas ficam intactos. Uma tarefa aberta movida para uma data anterior a hoje aparece como atrasada; uma tarefa concluída continua concluída.",
      "As alterações e suas justificativas ficam salvas neste aparelho quando você está offline e são sincronizadas ao reconectar. O histórico dos relatórios também é atualizado após a sincronização.",
    ],
  },
  {
    id: "links-clicaveis-calendario-tarefas-2026-10-06-r2",
    title: "Links clicáveis e calendário mais organizado",
    date: "2026-10-06",
    preview: "links-calendar",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Links nas tarefas, descrições, subtarefas e conversas abrem em uma nova aba. Nos campos de edição simples, os links aparecem logo abaixo do texto para você abrir sem copiar e colar. No editor de descrição, ficam apenas na própria linha do texto.",
      "O calendário mostra apenas as tarefas principais, no prazo de cada tarefa. Para visualizar as subtarefas, abra a tarefa principal. A mudança vale para Marketing e Consultoria, nas visões de semana e mês.",
    ],
  },
  {
    id: "prints-organizados-em-arquivos-2026-10-02",
    title: "Agora você pode colar prints nas tarefas",
    date: "2026-10-02",
    preview: "task-prints",
    audience: "all",
    workspaces: ["marketing", "consultoria"],
    details: [
      "Na criação ou edição da tarefa, escreva normalmente na descrição e cole uma imagem com ⌘V ou Ctrl+V. Enquanto edita, o print aparece no texto; ao salvar, ele fica organizado somente em Arquivos, com miniatura e download.",
    ],
  },
  {
    id: "dashboard-interativo-2026-10-01",
    title: "Dashboard mais interativo",
    date: "2026-10-01",
    preview: "dashboard",
    audience: "admin",
    workspaces: ["marketing", "consultoria"],
    details: [
      "A distribuição da equipe ganhou mais espaço e os indicadores passaram a abrir as tarefas relacionadas por cliente.",
    ],
  },
];

export const DASHBOARD_UPDATE_VERSION = "dashboard-interativo-2026-10-01";

export function getVisibleAppUpdates(isAdmin: boolean, workspace?: string) {
  return APP_UPDATES.filter(
    (update) =>
      update.workspaces.some((name) => name === workspace) &&
      (update.audience === "all" || isAdmin),
  );
}

export function formatAppUpdateDate(date: string) {
  // Explicit noon avoids moving a date-only release to the previous local day.
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
