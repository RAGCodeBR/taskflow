import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const requestUnreadKey = (userId?: string) => ["request-unread", userId] as const;

export function useRequestUnreadCount() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: requestUnreadKey(user?.id),
    enabled: !!user,
    queryFn: async () => {
      const { count, error } = await (supabase.from("notifications") as any)
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("type", "service_request")
        .eq("is_read", false);
      if (error) throw error;
      return count ?? 0;
    },
    refetchInterval: 30_000,
  });

  useEffect(() => {
    if (!user) return;
    const refresh = () => void queryClient.invalidateQueries({ queryKey: requestUnreadKey(user.id) });
    const channel = supabase
      .channel(`request-unread-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        refresh,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, user?.id]);

  return query.data ?? 0;
}

