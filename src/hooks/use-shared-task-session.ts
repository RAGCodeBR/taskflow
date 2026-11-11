import { useEffect, useRef, useState } from "react";
import { probeSiblingTaskSession, siblingTaskflowOrigin } from "@/lib/shared-task-session";

export function useSharedTaskSession({ taskId, ready, signedIn, skip }: {
  taskId: string | null;
  ready: boolean;
  signedIn: boolean;
  skip: boolean;
}) {
  const [checking, setChecking] = useState(() => Boolean(
    taskId && !skip && typeof window !== "undefined" && siblingTaskflowOrigin(window.location.origin),
  ));
  const signedInRef = useRef(signedIn);
  signedInRef.current = signedIn;
  useEffect(() => {
    if (!ready) return;
    if (!taskId || signedIn || skip) {
      setChecking(false);
      return;
    }
    setChecking(true);
    return probeSiblingTaskSession(taskId, (redirect) => {
      if (redirect && !signedInRef.current) window.location.replace(redirect);
      else setChecking(false);
    });
  }, [taskId, ready, signedIn, skip]);
  return checking;
}
