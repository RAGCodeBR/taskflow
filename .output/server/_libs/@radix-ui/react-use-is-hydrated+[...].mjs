import { b as React2, r as reactExports } from "../react.mjs";
var _isHydrated = false;
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = reactExports.useState(_isHydrated);
  reactExports.useEffect(() => {
    if (!_isHydrated) {
      _isHydrated = true;
      setIsHydrated(true);
    }
  }, []);
  return isHydrated;
}
var useReactSyncExternalStore = React2[" useSyncExternalStore ".trim().toString()];
function subscribe() {
  return () => {
  };
}
function useIsHydratedModern() {
  return useReactSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;
export {
  useIsHydrated2 as u
};
