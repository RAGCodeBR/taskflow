import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { muralActivityToast } from "@/lib/mural-activity-toast";

// Uma vez por carregamento do sistema, não por navegação entre telas.
let alreadyRan = false;

/**
 * Ao abrir o sistema (qualquer tela), resume por toast a atividade leve do mural
 * — reação, edição de recado, anexo — que aconteceu desde a última visita desta
 * pessoa. O marco fica no localStorage; é informação de passagem.
 */
export function useMuralLaunchDigest() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id || alreadyRan) return;
    alreadyRan = true;

    const key = `mural_last_seen_${user.id}`;
    let lastSeen = 0;
    try {
      lastSeen = Number(localStorage.getItem(key)) || 0;
    } catch {
      lastSeen = 0;
    }
    try {
      localStorage.setItem(key, String(Date.now()));
    } catch {
      /* storage bloqueado: sem resumo, sem erro */
    }
    // Primeira vez neste navegador: não despeja o histórico inteiro.
    if (!lastSeen) return;
    const sinceIso = new Date(lastSeen).toISOString();

    void (async () => {
      // As três consultas respeitam a RLS de ambiente — só volta o que o mural
      // desta pessoa contém.
      const [postsRes, reactionsRes, attachmentsRes, profilesRes] = await Promise.all([
        (supabase.from("mural_posts") as any).select(
          "id, title, created_by, created_at, updated_at",
        ),
        (supabase.from("mural_post_reactions") as any)
          .select("post_id, user_id, emoji, created_at")
          .gt("created_at", sinceIso),
        (supabase.from("mural_post_attachments") as any)
          .select("post_id, file_name, uploaded_by, created_at")
          .gt("created_at", sinceIso),
        (supabase.from("profiles") as any).select("id, full_name, email"),
      ]);

      const posts = (postsRes.data ?? []) as Array<{
        id: string;
        title: string;
        created_by: string | null;
        created_at: string | null;
        updated_at: string | null;
      }>;
      const profiles = (profilesRes.data ?? []) as Array<{
        id: string;
        full_name: string | null;
        email: string | null;
      }>;
      const nameOf = (id: string | null | undefined) => {
        if (!id) return "Alguém";
        const p = profiles.find((item) => item.id === id);
        return p?.full_name || p?.email || "Alguém";
      };
      const titleOf = (id: string | null | undefined) =>
        posts.find((item) => item.id === id)?.title || "um recado";

      const novidades: string[] = [];

      const reacts = (reactionsRes.data ?? []) as Array<{
        post_id: string;
        user_id: string;
        emoji: string;
      }>;
      reacts.forEach((r) => {
        if (r.user_id !== user.id) {
          novidades.push(`${nameOf(r.user_id)} reagiu ${r.emoji} em "${titleOf(r.post_id)}"`);
        }
      });
      const atts = (attachmentsRes.data ?? []) as Array<{
        post_id: string;
        file_name: string;
        uploaded_by: string | null;
      }>;
      atts.forEach((a) => {
        if (a.uploaded_by !== user.id) {
          novidades.push(
            `${nameOf(a.uploaded_by)} anexou ${a.file_name} em "${titleOf(a.post_id)}"`,
          );
        }
      });
      posts.forEach((post) => {
        const editado =
          post.updated_at &&
          Date.parse(post.updated_at) > lastSeen &&
          (!post.created_at || Date.parse(post.created_at) <= lastSeen);
        if (editado && post.created_by && post.created_by !== user.id) {
          novidades.push(`${nameOf(post.created_by)} atualizou "${post.title}"`);
        }
      });

      novidades.slice(0, 4).forEach(muralActivityToast);
      if (novidades.length > 4) {
        const resto = novidades.length - 4;
        muralActivityToast(`e mais ${resto} novidade${resto === 1 ? "" : "s"} no mural`);
      }
    })();
  }, [user?.id]);
}
