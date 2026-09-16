import { useEffect, useState, type ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";
import {
  persistQueryClientRestore,
  persistQueryClientSubscribe,
} from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { del, get, set } from "idb-keyval";
import { useAuth } from "@/hooks/use-auth";
import {
  OFFLINE_QUERY_CACHE_VERSION,
  offlineQueryCacheKey,
} from "@/lib/offline-user-storage";

// A versão 2 passa a preservar todas as consultas de dados de trabalho já
// abertas pelo usuário. Isso evita que uma tela fique vazia no modo avião
// apenas porque sua chave não estava na lista inicial.
const CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

// Agenda e integrações Google deliberadamente ficam fora da primeira etapa offline.
// Integrações externas e dados financeiros continuam estritamente online.
// Todo o restante que a pessoa já pôde visualizar é mantido somente no
// IndexedDB do próprio usuário, separado por conta.
const ONLINE_ONLY_QUERY_ROOTS = new Set([
  "google_calendar_connection",
  "agenda_events",
  "agenda_calendar_sources",
  "meeting_minutes",
  "client_invoices",
]);

function shouldPersistQuery(query: { queryKey: readonly unknown[]; state: { status: string } }) {
  return (
    query.state.status === "success" &&
    typeof query.queryKey[0] === "string" &&
    !ONLINE_ONLY_QUERY_ROOTS.has(query.queryKey[0])
  );
}

type Props = {
  queryClient: QueryClient;
  children: ReactNode;
};

/**
 * Persiste dados já vistos em IndexedDB, separados por usuário. Não envia
 * alterações nem toca no Supabase: a fila de sincronização é uma etapa própria.
 */
export function OfflineQueryCache({ queryClient, children }: Props) {
  const { user, loading } = useAuth();
  const [restoredFor, setRestoredFor] = useState<string | null>(null);

  useEffect(() => {
    const userId = user?.id;
    if (!userId) {
      // A sessao pode ficar momentaneamente indisponivel enquanto a rede volta.
      // Limpar IndexedDB aqui apagava a operacao pendente e o card otimista.
      // Dados persistidos so sao removidos no logout solicitado pela pessoa.
      queryClient.clear();
      setRestoredFor(null);
      return;
    }

    let active = true;
    let unsubscribe: (() => void) | undefined;
    const key = offlineQueryCacheKey(userId);
    setRestoredFor(null);
    // A restauração local nunca pode impedir a abertura do sistema. Em modo
    // avião o perfil remoto pode continuar carregando, mas a sessão já existe
    // no navegador e os dados em IndexedDB devem ser disponibilizados.
    const restoreFallback = window.setTimeout(() => {
      if (active) setRestoredFor(userId);
    }, 3_000);

    const persister = createAsyncStoragePersister({
      key,
      // Não deixe uma janela entre carregar a tela e desligar a rede: cada
      // resposta bem-sucedida deve ir ao IndexedDB imediatamente.
      throttleTime: 0,
      storage: {
        getItem: (itemKey) => get<string>(itemKey),
        setItem: (itemKey, value) => set(itemKey, value),
        removeItem: (itemKey) => del(itemKey),
      },
    });

    void persistQueryClientRestore({
      queryClient,
      persister,
      buster: OFFLINE_QUERY_CACHE_VERSION,
      maxAge: CACHE_MAX_AGE,
    })
      .catch(() => {
        // A falha do cache local nunca bloqueia o uso online do sistema.
      })
      .finally(() => {
        if (!active) return;
        window.clearTimeout(restoreFallback);
        unsubscribe = persistQueryClientSubscribe({
          queryClient,
          persister,
          buster: OFFLINE_QUERY_CACHE_VERSION,
          dehydrateOptions: { shouldDehydrateQuery: shouldPersistQuery },
        });
        setRestoredFor(userId);
      });

    return () => {
      active = false;
      window.clearTimeout(restoreFallback);
      unsubscribe?.();
    };
  }, [queryClient, user?.id]);

  // Com uma sessão local identificada, não espere a consulta remota de perfil:
  // ela depende da internet e bloquearia justamente o modo offline.
  if ((!user && loading) || (!!user && restoredFor !== user.id)) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-center text-sm text-muted-foreground">
        Preparando dados locais…
      </div>
    );
  }

  return <>{children}</>;
}
