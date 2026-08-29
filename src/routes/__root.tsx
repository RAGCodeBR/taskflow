import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import taskflowMark from "@/assets/taskflow-mark.png";

const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === "true";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TaskFlow — Gestão de Tarefas" },
      {
        name: "description",
        content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário.",
      },
      { property: "og:title", content: "TaskFlow — Gestão de Tarefas" },
      { name: "twitter:title", content: "TaskFlow — Gestão de Tarefas" },
      {
        property: "og:description",
        content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário.",
      },
      {
        name: "twitter:description",
        content: "Gerenciador de tarefas moderno com Kanban, Lista e Calendário.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/tLagbeX8d1c8AGKu15ndhxeLhHq2/social-images/social-1781773355411-ChatGPT_Image_18_de_jun._de_2026,_05_58_29.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/tLagbeX8d1c8AGKu15ndhxeLhHq2/social-images/social-1781773355411-ChatGPT_Image_18_de_jun._de_2026,_05_58_29.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: taskflowMark },
      { rel: "apple-touch-icon", href: taskflowMark },
    ],
  }),
  shellComponent: isGitHubPages ? undefined : RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Página não encontrada</p>
        <a href="/" className="mt-4 inline-block text-primary underline">
          Voltar ao início
        </a>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {isGitHubPages ? <HeadContent /> : null}
          <Outlet />
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
