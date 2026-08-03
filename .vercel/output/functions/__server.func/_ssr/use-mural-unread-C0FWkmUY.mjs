import { r as reactExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Bh9iiLf9.mjs";
import { u as useAuth } from "./router-ZM7179_C.mjs";
const muralUnreadKey = (userId) => ["mural_unread", userId];
function useMuralUnreadCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: muralUnreadKey(user?.id),
    enabled: !!user?.id,
    queryFn: async () => {
      const [{ data: posts, error: postsError }, { data: reads, error: readsError }] = await Promise.all([
        supabase.from("mural_posts").select("id, created_by"),
        supabase.from("mural_post_reads").select("post_id")
      ]);
      if (postsError) throw postsError;
      if (readsError) throw readsError;
      const readPostIds = new Set((reads ?? []).map((read) => read.post_id));
      return (posts ?? []).filter(
        (post) => post.created_by !== user.id && !readPostIds.has(post.id)
      ).length;
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const refresh = () => queryClient.invalidateQueries({ queryKey: muralUnreadKey(user.id) });
    const channel = supabase.channel(`mural-unread-${user.id}`).on("postgres_changes", { event: "INSERT", schema: "public", table: "mural_posts" }, refresh).subscribe();
    return () => void supabase.removeChannel(channel);
  }, [queryClient, user?.id]);
  return query.data ?? 0;
}
async function markMuralAsRead(userId, postIds) {
  if (!postIds.length) return;
  const { error } = await supabase.from("mural_post_reads").upsert(
    postIds.map((postId) => ({ user_id: userId, post_id: postId })),
    { onConflict: "user_id,post_id", ignoreDuplicates: true }
  );
  if (error) throw error;
}
export {
  muralUnreadKey as a,
  markMuralAsRead as m,
  useMuralUnreadCount as u
};
