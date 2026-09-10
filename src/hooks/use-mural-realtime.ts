import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { muralActivityToast } from "@/lib/mural-activity-toast";

// Reposicionar o card no quadro não é "atividade" que mereça aviso.
const SILENT_FIELDS = new Set(["canvas_x", "canvas_y", "updated_at"]);

/**
 * Atividade do mural ao vivo, em QUALQUER tela — não só com o quadro aberto.
 *
 * Mantém o cache do mural fresco (invalida as queries a cada mudança) e mostra
 * um toast discreto quando OUTRA pessoa reage, edita um recado ou anexa um
 * arquivo. É a versão global do que antes vivia dentro da página do mural.
 */
export function useMuralRealtime() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const userIdRef = useRef(user?.id);
  userIdRef.current = user?.id;

  useEffect(() => {
    if (!user?.id) return;

    const nameOf = (id: string | null | undefined) => {
      if (!id) return "Alguém";
      const list = (qc.getQueryData(["profiles"]) ?? []) as Array<{
        id: string;
        full_name: string | null;
        email?: string | null;
      }>;
      const found = list.find((item) => item.id === id);
      return found?.full_name || found?.email || "Alguém";
    };
    const titleOf = (id: string | null | undefined) => {
      if (!id) return "um recado";
      const list = (qc.getQueryData(["mural_posts"]) ?? []) as Array<{ id: string; title: string }>;
      return list.find((item) => item.id === id)?.title || "um recado";
    };

    const channel = supabase
      .channel(`mural-realtime-global-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mural_posts" },
        (payload: any) => {
          void qc.invalidateQueries({ queryKey: ["mural_posts"] });
          if (payload.eventType !== "UPDATE") return;
          const actor = payload.new?.created_by;
          if (!actor || actor === userIdRef.current) return;
          const changed = Object.keys(payload.new ?? {}).some(
            (key) => !SILENT_FIELDS.has(key) && payload.new[key] !== payload.old?.[key],
          );
          if (changed) muralActivityToast(`${nameOf(actor)} atualizou "${payload.new.title}"`);
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mural_post_attachments" },
        (payload: any) => {
          void qc.invalidateQueries({ queryKey: ["mural_post_attachments"] });
          if (payload.eventType !== "INSERT") return;
          const actor = payload.new?.uploaded_by;
          if (!actor || actor === userIdRef.current) return;
          muralActivityToast(
            `${nameOf(actor)} anexou ${payload.new.file_name} em "${titleOf(payload.new.post_id)}"`,
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mural_post_reactions" },
        (payload: any) => {
          void qc.invalidateQueries({ queryKey: ["mural_post_reactions"] });
          if (payload.eventType !== "INSERT") return;
          const actor = payload.new?.user_id;
          if (!actor || actor === userIdRef.current) return;
          muralActivityToast(
            `${nameOf(actor)} reagiu ${payload.new.emoji} em "${titleOf(payload.new.post_id)}"`,
          );
        },
      )
      .subscribe((status: string, err?: Error) => {
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || err) {
          console.warn("[mural realtime] canal não conectou:", status, err);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc, user?.id]);
}
