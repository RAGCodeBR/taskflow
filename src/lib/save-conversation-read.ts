type ReceiptClient = {
  rpc: (
    name: string,
    args: { target_task_id: string; mark_unread: boolean },
  ) => PromiseLike<{ data: unknown; error: { message: string } | null }>;
};

/** The server owns the user identity, clock and parent-task existence check. */
export async function saveConversationRead(
  client: ReceiptClient,
  taskId: string,
  markUnread: boolean,
): Promise<boolean> {
  const { data, error } = await client.rpc("set_task_conversation_read", {
    target_task_id: taskId,
    mark_unread: markUnread,
  });
  if (error) throw new Error(error.message);
  return data === true;
}
