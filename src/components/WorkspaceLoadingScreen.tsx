export function WorkspaceLoadingScreen({ workspaceName }: { workspaceName?: string }) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-background/95 px-6 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Carregando ambiente"
    >
      <div className="flex max-w-xs flex-col items-center text-center">
        <div className="relative grid h-12 w-12 place-items-center" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/65" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <p className="mt-5 text-base font-semibold tracking-tight">Abrindo {workspaceName ?? "o ambiente"}</p>
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
