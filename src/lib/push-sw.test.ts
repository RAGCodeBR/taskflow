import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../../public/push-sw.js", import.meta.url), "utf8");

function loadWorker(windows: unknown[]) {
  const listeners: Record<string, (event: any) => void> = {};
  const opened: string[] = [];
  const self = {
    location: { origin: "https://app.example" },
    addEventListener: (type: string, fn: (event: any) => void) => (listeners[type] = fn),
    clients: { matchAll: async () => windows, openWindow: async (url: string) => opened.push(url) },
    registration: { showNotification: async () => undefined },
    navigator: {},
  };
  runInNewContext(source, { self, URL, Promise });
  return { listeners, opened };
}

async function click(listeners: Record<string, (event: any) => void>) {
  let done: Promise<unknown> = Promise.resolve();
  listeners.notificationclick({
    notification: { close: () => undefined, data: { url: "/tasks/list?task=t1" } },
    waitUntil: (promise: Promise<unknown>) => (done = promise),
  });
  await done;
}

describe("push-sw notificationclick", () => {
  it("opens the task in a new window when the open window cannot navigate", async () => {
    const stuck = {
      url: "https://app.example/dashboard",
      focus: async () => stuck,
      navigate: async () => {
        throw new TypeError("not controlled");
      },
    };
    const { listeners, opened } = loadWorker([stuck]);
    await click(listeners);
    expect(opened).toEqual(["https://app.example/tasks/list?task=t1"]);
  });

  it("navigates the existing window to the task when it can", async () => {
    const navigated: string[] = [];
    const ok = {
      url: "https://app.example/",
      focus: async () => ok,
      navigate: async (url: string) => navigated.push(url),
    };
    const { listeners, opened } = loadWorker([ok]);
    await click(listeners);
    expect(navigated).toEqual(["https://app.example/tasks/list?task=t1"]);
    expect(opened).toEqual([]);
  });
});
