import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const muralUnreadKey = (userId?: string) => ["mural_unread", userId] as const;
const MURAL_NOTIFICATION_TYPES = ["mural_post", "mural_reaction"];

export function useMuralUnreadCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: muralUnreadKey(user?.id),
    enabled: !!user?.id,
    queryFn: async () => {
      const { count, error } = await (supabase.from("notifications") as any)
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("is_read", false)
        .in("type", MURAL_NOTIFICATION_TYPES);
      if (error) throw error;
      return count ?? 0;
    },
  });

  useEffect(() => {
    if (!user) return;
    const refresh = () => queryClient.invalidateQueries({ queryKey: muralUnreadKey(user.id) });
    const channel = supabase
      .channel(`mural-unread-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, refresh)
      .subscribe();
    return () => void supabase.removeChannel(channel);
  }, [queryClient, user?.id]);

  return query.data ?? 0;
}

export async function markMuralAsRead(userId: string, postIds: string[]) {
  if (!postIds.length) return;
  const { error } = await (supabase.from("mural_post_reads") as any).upsert(
    postIds.map((postId) => ({ user_id: userId, post_id: postId })),
    { onConflict: "user_id,post_id", ignoreDuplicates: true },
  );
  if (error) throw error;
}

export { muralUnreadKey };
