const INSTALL_TIMEOUT = 30_000;

export async function checkAppWorkerUpdate(
  registration: ServiceWorkerRegistration,
  timeout = 8_000,
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      registration.update(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("Não foi possível verificar a atualização. Tente novamente.")),
          timeout,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function waitForWorker(
  worker: ServiceWorker,
  accepts: (state: ServiceWorkerState) => boolean,
  timeout: number,
) {
  return new Promise<void>((resolve, reject) => {
    const finish = (error?: Error) => {
      clearTimeout(timer);
      worker.removeEventListener("statechange", check);
      if (error) reject(error);
      else resolve();
    };
    const check = () => {
      if (accepts(worker.state)) finish();
      else if (worker.state === "redundant")
        finish(new Error("Não foi possível instalar a atualização. Tente novamente."));
    };
    const timer = setTimeout(
      () => finish(new Error("A atualização demorou mais que o esperado. Tente novamente.")),
      timeout,
    );
    worker.addEventListener("statechange", check);
    check();
  });
}

export function waitForAppWorkerControl(
  worker: ServiceWorker,
  container: ServiceWorkerContainer,
  timeout = INSTALL_TIMEOUT,
) {
  return new Promise<void>((resolve, reject) => {
    const finish = (error?: Error) => {
      clearTimeout(timer);
      container.removeEventListener("controllerchange", check);
      if (error) reject(error);
      else resolve();
    };
    const check = () => {
      if (container.controller === worker) finish();
    };
    const timer = setTimeout(
      () =>
        finish(
          new Error("A nova versão foi ativada, mas ainda não assumiu esta aba. Tente novamente."),
        ),
      timeout,
    );
    container.addEventListener("controllerchange", check);
    check();
  });
}

// update() finishes the version check, not necessarily the worker installation.
// Never reload or acknowledge a release until its worker actually activates.
export async function activateAppUpdate(
  registration: ServiceWorkerRegistration,
  timeout = INSTALL_TIMEOUT,
) {
  const activeBeforeCheck = registration.active;
  const anotherWorkerActivated = () =>
    Boolean(
      registration.active &&
      registration.active !== activeBeforeCheck &&
      registration.active.state === "activated",
    );

  // Another tab or an overlapping update check can replace an installing
  // worker. Follow the current registration once before reporting a failure.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await checkAppWorkerUpdate(registration, timeout);
    } catch (error) {
      // A fully downloaded waiting version can still be installed if this check fails.
      if (!registration.waiting) throw error;
    }

    const installing = registration.installing;
    try {
      if (installing) {
        await waitForWorker(
          installing,
          (state) => state === "installed" || state === "activating" || state === "activated",
          timeout,
        );
      }

      const worker = registration.waiting ?? installing;
      if (!worker) return anotherWorkerActivated();
      // Subscribe first: a fast worker must not activate before we start listening.
      const activation = waitForWorker(worker, (state) => state === "activated", timeout);
      if (worker.state === "installed") worker.postMessage({ type: "SKIP_WAITING" });
      await activation;
      return true;
    } catch (error) {
      if (anotherWorkerActivated()) return true;
      if (
        attempt === 1 ||
        !(error instanceof Error) ||
        error.message !== "Não foi possível instalar a atualização. Tente novamente."
      )
        throw error;
    }
  }
  return false;
}
