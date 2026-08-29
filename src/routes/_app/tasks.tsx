import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { KanbanSquare, List as ListIcon, Calendar as CalIcon } from "lucide-react";

export const Route = createFileRoute("/_app/tasks")({
  component: TasksLayout,
});

function TasksLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const views = [
    { to: "/tasks/kanban", label: "Kanban", icon: KanbanSquare },
    { to: "/tasks/list", label: "Lista", icon: ListIcon },
    { to: "/tasks/calendar", label: "Calendário", icon: CalIcon },
  ] as const;
  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b bg-background/95 px-6 py-2.5 backdrop-blur">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Visualizar
        </span>
        <div className="inline-flex rounded-md border bg-muted/35 p-0.5">
          {views.map((v) => {
            const active = pathname === v.to || pathname.startsWith(v.to + "/");
            const Icon = v.icon;
            return (
              <Link
                key={v.to}
                to={v.to}
                className={`flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {v.label}
              </Link>
            );
          })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
