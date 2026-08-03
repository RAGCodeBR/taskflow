import { r as reactExports, j as jsxRuntimeExports } from "../react.mjs";
import { P as Primitive } from "../radix-ui__react-primitive.mjs";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var VisuallyHidden = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function VisuallyHidden2(props, forwardedRef) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }, "VisuallyHidden")
);
var Root = VisuallyHidden;
export {
  Root as R,
  VISUALLY_HIDDEN_STYLES as V
};
