import type { Client, Profile, Subtask, Task } from "@/hooks/use-data";
import { isTaskCompleted } from "./task-utils";

export type TeamMemberSummary = {
  id: string;
  name: string;
  tasksOpen: number;
  tasksDone: number;
  subtasksOpen: number;
  subtasksDone: number;
};

export type TeamCompletion = {
  id: string;
  kind: "task" | "subtask";
  title: string;
  parentTitle?: string;
  taskId: string;
  personName: string;
  completedAt: string;
};

export type ClientDemandItem = {
  id: string;
  kind: "task" | "subtask";
  title: string;
  parentTitle?: string;
  taskId: string;
  done: boolean;
};

export type ClientDemandRow = {
  id: string;
  name: string;
  taskCount: number;
  subtaskCount: number;
  items: ClientDemandItem[];
};

export type ClientDemandStatus = "open" | "done" | "all";

export type TeamSummaryMetric = "tasks-open" | "tasks-done" | "subtasks-open" | "subtasks-done";

export type TeamSummaryActivity = {
  id: string;
  kind: "task" | "subtask";
  title: string;
  parentTitle?: string;
  taskId: string;
  clientName: string;
  assigneeId: string | null;
  dueDate: string | null;
  completedAt: string | null;
};

export function dashboardTaskOpenMode(
  taskId: string,
  visibleTaskIds: ReadonlySet<string>,
  access: { isAdmin: boolean; isCollaborator: boolean; isClient: boolean; workspaceSlug?: string },
): "preview" | "navigate" | "ignore" {
  if (!visibleTaskIds.has(taskId)) return "ignore";
  return !access.isAdmin && access.isCollaborator && !access.isClient && access.workspaceSlug === "marketing"
    ? "preview"
    : "navigate";
}

export function getTeamSummaryActivities(
  tasks: Task[],
  subtasks: Subtask[],
  clients: Client[],
  metric: TeamSummaryMetric,
): TeamSummaryActivity[] {
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  const clientsById = new Map(clients.map((client) => [client.id, client.name]));
  const clientNameFor = (id: string | null) =>
    id ? clientsById.get(id) || "Cliente não encontrado" : "Sem cliente";
  const wantsDone = metric.endsWith("done");
  const items: TeamSummaryActivity[] = [];

  if (metric.startsWith("tasks-")) {
    for (const task of tasks) {
      if (isTaskCompleted(task) !== wantsDone) continue;
      items.push({
        id: `task-${task.id}`,
        kind: "task",
        title: task.title,
        taskId: task.id,
        clientName: clientNameFor(task.client_id),
        assigneeId: task.assignee_id,
        dueDate: task.due_date,
        completedAt: task.completed_at,
      });
    }
  } else {
    for (const subtask of subtasks) {
      const parent = taskById.get(subtask.task_id);
      if (!parent || subtask.done !== wantsDone) continue;
      items.push({
        id: `subtask-${subtask.id}`,
        kind: "subtask",
        title: subtask.title,
        parentTitle: parent.title,
        taskId: parent.id,
        clientName: clientNameFor(parent.client_id),
        assigneeId: subtask.assignee_id,
        dueDate: subtask.due_date,
        completedAt: subtask.completed_at,
      });
    }
  }

  return items.sort((a, b) =>
    wantsDone
      ? (b.completedAt ?? "").localeCompare(a.completedAt ?? "") ||
        a.title.localeCompare(b.title, "pt-BR")
      : (a.dueDate ?? "9999-12-31").localeCompare(b.dueDate ?? "9999-12-31") ||
        a.title.localeCompare(b.title, "pt-BR"),
  );
}

/** Count each parent once for its assignee and each child for its own assignee. */
export function getClientDemand(
  tasks: Task[],
  subtasks: Subtask[],
  clients: Client[],
  assigneeId: string | null = null,
  status: ClientDemandStatus = "all",
): ClientDemandRow[] {
  const visibleTasks = new Map(tasks.map((task) => [task.id, task]));
  const names = new Map(clients.map((client) => [client.id, client.name]));
  const rows = new Map<string, ClientDemandRow>();
  const rowFor = (clientId: string | null) => {
    const id = clientId ?? "unlinked";
    let row = rows.get(id);
    if (!row) {
      row = {
        id,
        name: clientId ? names.get(clientId) || "Cliente não encontrado" : "Sem cliente",
        taskCount: 0,
        subtaskCount: 0,
        items: [],
      };
      rows.set(id, row);
    }
    return row;
  };

  for (const task of tasks) {
    if (assigneeId && task.assignee_id !== assigneeId) continue;
    const done = isTaskCompleted(task);
    if (status !== "all" && (status === "done") !== done) continue;
    const row = rowFor(task.client_id);
    row.taskCount++;
    row.items.push({
      id: `task-${task.id}`,
      kind: "task",
      title: task.title,
      taskId: task.id,
      done,
    });
  }
  for (const subtask of subtasks) {
    const parent = visibleTasks.get(subtask.task_id);
    if (!parent || (assigneeId && subtask.assignee_id !== assigneeId)) continue;
    if (status !== "all" && (status === "done") !== subtask.done) continue;
    const row = rowFor(parent.client_id);
    row.subtaskCount++;
    row.items.push({
      id: `subtask-${subtask.id}`,
      kind: "subtask",
      title: subtask.title,
      parentTitle: parent.title,
      taskId: parent.id,
      done: subtask.done,
    });
  }
  return [...rows.values()].sort(
    (a, b) =>
      b.taskCount + b.subtaskCount - a.taskCount - a.subtaskCount ||
      a.name.localeCompare(b.name, "pt-BR"),
  );
}

export function getMemberDashboard(
  tasks: Task[],
  subtasks: Subtask[],
  profiles: Profile[],
  currentUserId?: string,
  currentUserName?: string,
) {
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  // The subtasks query is global. Never count a child whose parent is not
  // visible in the currently selected workspace.
  const visibleSubtasks = subtasks.filter((subtask) => taskById.has(subtask.task_id));
  const members = new Map<string, TeamMemberSummary>();
  const names = new Map(
    profiles.map((person) => [person.id, person.full_name || person.email || "Pessoa da equipe"]),
  );
  if (currentUserId && currentUserName) names.set(currentUserId, currentUserName);

  const memberFor = (id: string | null) => {
    if (!id) return null;
    let member = members.get(id);
    if (!member) {
      member = {
        id,
        name: names.get(id) || "Pessoa da equipe",
        tasksOpen: 0,
        tasksDone: 0,
        subtasksOpen: 0,
        subtasksDone: 0,
      };
      members.set(id, member);
    }
    return member;
  };
  const completions: TeamCompletion[] = [];

  for (const task of tasks) {
    const member = memberFor(task.assignee_id);
    if (member) {
      if (isTaskCompleted(task)) member.tasksDone++;
      else member.tasksOpen++;
    }
    if (isTaskCompleted(task) && task.completed_at) {
      completions.push({
        id: `task-${task.id}`,
        kind: "task",
        title: task.title,
        taskId: task.id,
        personName: member?.name || "Sem responsável",
        completedAt: task.completed_at,
      });
    }
  }
  for (const subtask of visibleSubtasks) {
    const member = memberFor(subtask.assignee_id);
    if (member) {
      if (subtask.done) member.subtasksDone++;
      else member.subtasksOpen++;
    }
    if (subtask.done && subtask.completed_at) {
      completions.push({
        id: `subtask-${subtask.id}`,
        kind: "subtask",
        title: subtask.title,
        parentTitle: taskById.get(subtask.task_id)?.title,
        taskId: subtask.task_id,
        personName: member?.name || "Sem responsável",
        completedAt: subtask.completed_at,
      });
    }
  }

  return {
    tasksOpen: tasks.filter((task) => !isTaskCompleted(task)).length,
    tasksDone: tasks.filter(isTaskCompleted).length,
    subtasksOpen: visibleSubtasks.filter((subtask) => !subtask.done).length,
    subtasksDone: visibleSubtasks.filter((subtask) => subtask.done).length,
    members: [...members.values()].sort((a, b) => {
      const activityA = a.tasksOpen + a.tasksDone + a.subtasksOpen + a.subtasksDone;
      const activityB = b.tasksOpen + b.tasksDone + b.subtasksOpen + b.subtasksDone;
      return activityB - activityA || a.name.localeCompare(b.name, "pt-BR");
    }),
    recentCompletions: completions
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, 8),
  };
}
