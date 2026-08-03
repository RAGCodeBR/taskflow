import { u as useLayoutEffect2 } from "./react-use-layout-effect+[...].mjs";
import { r as reactExports, b as React2 } from "../react.mjs";
var useReactEffectEvent = React2[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = React2[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = reactExports.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      ref.current = callback;
    });
  }
  return reactExports.useMemo(() => ((...args) => ref.current?.(...args)), []);
}
export {
  useEffectEvent as u
};
