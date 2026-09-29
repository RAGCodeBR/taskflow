import taskflowLogo from "@/assets/taskflow-logo.png";

export function WorkspaceLoadingScreen({ workspaceName }: { workspaceName?: string }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-background/95 px-6 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Carregando ambiente"
    >
      <div className="flex max-w-xs flex-col items-center text-center">
        <div className="grid h-24 w-56 place-items-center rounded-2xl bg-card p-4 shadow-[var(--shadow-elegant)]">
          <img src={taskflowLogo} alt="TaskFlow" className="max-h-full max-w-full object-contain" />
        </div>
        <p className="mt-7 text-lg font-semibold tracking-tight">Abrindo {workspaceName ?? "o ambiente"}</p>
        <p className="mt-1 text-sm text-muted-foreground">Preparando os dados para você.</p>
        <span className="mt-5 flex items-center gap-2" aria-hidden="true">
          <i className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <i className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <i className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />
        </span>
      </div>
    </div>
  );
}
