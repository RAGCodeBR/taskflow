import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { P as Primitive } from "./radix-ui__react-primitive.mjs";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var Label = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function Label2(props, forwardedRef) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.label,
      {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event) => {
          const target = event.target;
          if (target.closest("button, input, select, textarea")) return;
          props.onMouseDown?.(event);
          if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
      }
    );
  }, "Label")
);
var Root = Label;
export {
  Root as R
};
