import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const muralUnreadKey = (userId?: string) => ["mural_unread", userId] as const;

export function useMuralUnreadCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: muralUnreadKey(user?.id),
    enabled: !!user?.id,
    queryFn: async () => {
      const [{ data: posts, error: postsError }, { data: reads, error: readsError }] = await Promise.all([
        (supabase.from("mural_posts") as any).select("id, created_by"),
        (supabase.from("mural_post_reads") as any).select("post_id"),
      ]);
      if (postsError) throw postsError;
      if (readsError) throw readsError;
      const readPostIds = new Set((reads ?? []).map((read: { post_id: string }) => read.post_id));
      return (posts ?? []).filter(
        (post: { id: string; created_by: string }) =>
          post.created_by !== user!.id && !readPostIds.has(post.id),
      ).length;
    },
  });

  useEffect(() => {
    if (!user) return;
    const refresh = () => queryClient.invalidateQueries({ queryKey: muralUnreadKey(user.id) });
    const channel = supabase
      .channel(`mural-unread-${user.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "mural_posts" }, refresh)
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
