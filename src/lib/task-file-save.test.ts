import { beforeEach, expect, it, vi } from "vitest";
import { createTaskFileSaver } from "./task-file-save";

const { upload, upsert, sync, enqueue } = vi.hoisted(() => ({
  upload: vi.fn(), upsert: vi.fn(), sync: vi.fn(), enqueue: vi.fn(),
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { storage: { from: () => ({ upload }) }, from: () => ({ upsert }) },
}));
vi.mock("./offline-sync", () => ({ enqueueOfflineOperation: enqueue }));
vi.mock("./sync-task-attachment-to-client", () => ({ syncTaskAttachmentToClient: sync }));

const target = { userId: "eloisa", taskId: "arte" };
beforeEach(() => {
  vi.resetAllMocks();
  upload.mockResolvedValue({ error: null });
  upsert.mockResolvedValue({ error: null });
  sync.mockResolvedValue(null);
});

it("finishes the client link on retry using the attachment already on the task", async () => {
  const save = createTaskFileSaver();
  const file = new File(["original"], "arte.png");
  sync.mockRejectedValueOnce(new Error("Sem resposta"));
  await expect(save(file, target, false)).rejects.toThrow("Sem resposta");
  const saved = await save(file, target, false);
  expect(upload).toHaveBeenCalledTimes(1);
  expect(upsert).toHaveBeenCalledTimes(1);
  expect(sync).toHaveBeenCalledTimes(2);
  expect(sync.mock.calls[0][0]).toEqual(sync.mock.calls[1][0]);
  expect(saved.id).toEqual(sync.mock.calls[1][0].sourceAttachmentId);
});

it("recovers lost upload and metadata acknowledgements on the same subtask", async () => {
  const save = createTaskFileSaver();
  const parent = { ...target, subtaskId: "briefing" };
  const file = new File(["imagem"], "print.png");
  upload.mockRejectedValueOnce(new Error("Sem rede")).mockResolvedValueOnce({ error: { message: "Resource already exists" } });
  upsert.mockResolvedValueOnce({ error: { message: "Sem confirmação" } });
  await expect(save(file, parent, false)).rejects.toThrow("Sem rede");
  await expect(save(file, parent, false)).rejects.toMatchObject({ message: "Sem confirmação" });
  const saved = await save(file, parent, false);
  expect(upload).toHaveBeenCalledTimes(2);
  expect(upload.mock.calls[0]).toEqual(upload.mock.calls[1]);
  expect(upsert.mock.calls[0]).toEqual([saved, { onConflict: "id", ignoreDuplicates: true }]);
  expect(upsert.mock.calls[1]).toEqual(upsert.mock.calls[0]);
  expect(sync).not.toHaveBeenCalled();
});

it("keeps the original file and its existing identifier when a retry goes offline", async () => {
  const save = createTaskFileSaver();
  const file = new File(["texto completo"], "briefing.txt");
  sync.mockRejectedValueOnce(new Error("Sem rede"));
  await expect(save(file, target, false)).rejects.toThrow();
  const saved = await save(file, target, true);
  expect(enqueue).toHaveBeenCalledWith(expect.objectContaining({
    entityId: saved.id,
    payload: expect.objectContaining({ blob: file, attachment: saved, syncClientFile: true }),
  }));
  expect(saved.storage_path).toBe(upload.mock.calls[0][0]);
});
