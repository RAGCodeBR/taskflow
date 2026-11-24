import { describe, expect, it } from "vitest";
import { pushSupport, urlBase64ToUint8Array } from "./push-subscription";

describe("pushSupport", () => {
  it("asks to install first on an iPhone browser tab", () => {
    expect(pushSupport({ isIOS: true, standalone: false, hasPush: false })).toBe("install-first");
  });
  it("is ready on the installed iPhone app", () => {
    expect(pushSupport({ isIOS: true, standalone: true, hasPush: true })).toBe("ok");
  });
  it("is ready on Android/desktop browsers with push", () => {
    expect(pushSupport({ isIOS: false, standalone: false, hasPush: true })).toBe("ok");
  });
  it("is unsupported without the Push API", () => {
    expect(pushSupport({ isIOS: false, standalone: false, hasPush: false })).toBe("unsupported");
    expect(pushSupport({ isIOS: true, standalone: true, hasPush: false })).toBe("unsupported");
  });
});

describe("urlBase64ToUint8Array", () => {
  it("decodes URL-safe base64 without padding", () => {
    expect(Array.from(urlBase64ToUint8Array("-_8"))).toEqual([251, 255]);
    expect(Array.from(urlBase64ToUint8Array("AQID"))).toEqual([1, 2, 3]);
  });
});

import { forgetThisDeviceForPush } from "./push-subscription";

describe("forgetThisDeviceForPush", () => {
  it("deletes this device's subscription row, unsubscribes it and clears the badge", async () => {
    const calls: string[] = [];
    await forgetThisDeviceForPush({
      getSubscription: async () => ({
        endpoint: "https://push.example/1",
        unsubscribe: async () => {
          calls.push("unsubscribe");
          return true;
        },
      }),
      deleteRow: async (endpoint) => {
        calls.push(`delete ${endpoint}`);
      },
      clearBadge: () => calls.push("badge"),
    });
    expect(calls).toEqual(["delete https://push.example/1", "unsubscribe", "badge"]);
  });
  it("never throws, so logout is not blocked", async () => {
    await expect(
      forgetThisDeviceForPush({
        getSubscription: async () => {
          throw new Error("sem SW");
        },
        deleteRow: async () => undefined,
        clearBadge: () => undefined,
      }),
    ).resolves.toBeUndefined();
  });
});

import { isPushConfigured } from "./push-subscription";

describe("isPushConfigured", () => {
  it("hides the push option until the server key exists", () => {
    expect(isPushConfigured(undefined)).toBe(false);
    expect(isPushConfigured("")).toBe(false);
    expect(isPushConfigured("BKey")).toBe(true);
  });
});
