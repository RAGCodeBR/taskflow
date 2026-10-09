import { afterEach, describe, expect, it, vi } from "vitest";
import { activateAppUpdate } from "./app-update-install";

class Worker extends EventTarget {
  state: ServiceWorkerState = "installing";
  postMessage = vi.fn();
  change(state: ServiceWorkerState) {
    this.state = state;
    this.dispatchEvent(new Event("statechange"));
  }
}
function registration(worker?: Worker) {
  return {
    update: vi.fn().mockResolvedValue(undefined),
    installing: worker ?? null,
    waiting: null,
    active: null,
  } as unknown as ServiceWorkerRegistration;
}
afterEach(() => vi.useRealTimers());

describe("safe app update activation", () => {
  it("waits beyond the old 250 ms reload for both installation and activation", async () => {
    vi.useFakeTimers();
    const worker = new Worker();
    const result = activateAppUpdate(registration(worker));
    const finished = vi.fn();
    result.then(finished);
    await vi.advanceTimersByTimeAsync(1000);
    expect(finished).not.toHaveBeenCalled();
    expect(worker.postMessage).not.toHaveBeenCalled();
    worker.change("installed");
    await vi.advanceTimersByTimeAsync(0);
    expect(worker.postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" });
    await vi.advanceTimersByTimeAsync(1000);
    expect(finished).not.toHaveBeenCalled();
    worker.change("activated");
    await expect(result).resolves.toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });
  it("handles immediate activation without missing the event", async () => {
    const worker = new Worker();
    worker.state = "installed";
    const entry = registration();
    Object.assign(entry, { waiting: worker });
    worker.postMessage.mockImplementation(() => worker.change("activated"));
    await expect(activateAppUpdate(entry)).resolves.toBe(true);
  });
  it("keeps a fully downloaded waiting update usable if the version check fails", async () => {
    const worker = new Worker();
    worker.state = "installed";
    const entry = registration();
    Object.assign(entry, { waiting: worker });
    vi.mocked(entry.update).mockRejectedValue(new Error("network failed"));
    worker.postMessage.mockImplementation(() => worker.change("activated"));
    await expect(activateAppUpdate(entry)).resolves.toBe(true);
  });
  it("rejects an installation failure rather than acknowledging or reloading", async () => {
    const worker = new Worker();
    const entry = registration(worker);
    const result = activateAppUpdate(entry);
    const rejected = expect(result).rejects.toThrow("Não foi possível instalar");
    await Promise.resolve();
    await Promise.resolve();
    worker.change("redundant");
    await rejected;
    expect(worker.postMessage).not.toHaveBeenCalled();
    expect(entry.update).toHaveBeenCalledTimes(2);
  });
  it("follows a replacement worker after the first installer becomes redundant", async () => {
    const first = new Worker();
    const replacement = new Worker();
    const entry = registration(first);
    vi.mocked(entry.update).mockImplementation(async () => {
      if (first.state === "redundant") Object.assign(entry, { installing: replacement });
      return entry;
    });
    const result = activateAppUpdate(entry);
    await Promise.resolve();
    await Promise.resolve();
    first.change("redundant");
    await vi.waitFor(() => expect(entry.update).toHaveBeenCalledTimes(2));
    replacement.change("installed");
    await vi.waitFor(() =>
      expect(replacement.postMessage).toHaveBeenCalledWith({ type: "SKIP_WAITING" }),
    );
    replacement.change("activated");
    await expect(result).resolves.toBe(true);
  });
  it("accepts an update activated by another tab while its installer is discarded", async () => {
    const worker = new Worker();
    const entry = registration(worker);
    const result = activateAppUpdate(entry);
    await Promise.resolve();
    await Promise.resolve();
    const active = new Worker();
    active.state = "activated";
    Object.assign(entry, { active });
    worker.change("redundant");
    await expect(result).resolves.toBe(true);
    expect(entry.update).toHaveBeenCalledTimes(1);
  });
  it("bounds a stuck installation and removes its listener", async () => {
    vi.useFakeTimers();
    const worker = new Worker();
    const remove = vi.spyOn(worker, "removeEventListener");
    const result = activateAppUpdate(registration(worker), 1000);
    const rejected = expect(result).rejects.toThrow("demorou mais");
    await vi.advanceTimersByTimeAsync(1000);
    await rejected;
    expect(remove).toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
  it("bounds activation separately and permits the caller to retry", async () => {
    vi.useFakeTimers();
    const worker = new Worker();
    worker.state = "installed";
    const entry = registration();
    Object.assign(entry, { waiting: worker });
    const rejected = expect(activateAppUpdate(entry, 1000)).rejects.toThrow("demorou mais");
    await vi.advanceTimersByTimeAsync(1000);
    await rejected;
    expect(vi.getTimerCount()).toBe(0);
  });
  it("propagates failed checks and reports no update without activating anything", async () => {
    const entry = registration();
    await expect(activateAppUpdate(entry)).resolves.toBe(false);
    vi.mocked(entry.update).mockRejectedValue(new Error("offline"));
    await expect(activateAppUpdate(entry)).rejects.toThrow("offline");
  });
  it("bounds a stalled network check rather than leaving the update button stuck", async () => {
    vi.useFakeTimers();
    const entry = registration();
    vi.mocked(entry.update).mockImplementation(() => new Promise(() => {}));
    const rejected = expect(activateAppUpdate(entry, 1000)).rejects.toThrow(
      "verificar a atualização",
    );
    await vi.advanceTimersByTimeAsync(1000);
    await rejected;
    expect(vi.getTimerCount()).toBe(0);
  });
  it("recognizes a worker that finished activating during the version check", async () => {
    const entry = registration();
    const worker = new Worker();
    worker.state = "activated";
    vi.mocked(entry.update).mockImplementation(async () => {
      Object.assign(entry, { active: worker });
      return entry;
    });
    await expect(activateAppUpdate(entry)).resolves.toBe(true);
  });
});
