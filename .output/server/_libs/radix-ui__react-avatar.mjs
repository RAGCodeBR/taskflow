import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { c as createContextScope } from "./radix-ui__react-context.mjs";
import { u as useCallbackRef } from "./@radix-ui/react-use-callback-ref+[...].mjs";
import { u as useLayoutEffect2 } from "./@radix-ui/react-use-layout-effect+[...].mjs";
import { P as Primitive } from "./radix-ui__react-primitive.mjs";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var STATIC_IMAGE_COUNT_STATE = [
  0,
  () => void 0
];
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = /* @__PURE__ */ reactExports.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function Avatar2(props, forwardedRef) {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    const [imageCount, setImageCount] = useImageCount();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        setImageLoadingStatus,
        imageCount,
        setImageCount,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }, "Avatar")
);
var IMAGE_NAME = "AvatarImage";
var AvatarImage = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function AvatarImage2(props, forwardedRef) {
    const { __scopeAvatar, src, onLoadingStatusChange, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    useUpdateImageCount(context.setImageCount);
    const imageLoadingStatus = useImageLoadingStatus(src, {
      referrerPolicy: imageProps.referrerPolicy,
      crossOrigin: imageProps.crossOrigin,
      loadingStatus: context.imageLoadingStatus,
      setLoadingStatus: context.setImageLoadingStatus
    });
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange?.(status);
    });
    const loadingStatusRef = reactExports.useRef(imageLoadingStatus);
    useLayoutEffect2(() => {
      const previousLoadingStatus = loadingStatusRef.current;
      loadingStatusRef.current = imageLoadingStatus;
      if (imageLoadingStatus !== previousLoadingStatus) {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }, "AvatarImage")
);
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = /* @__PURE__ */ reactExports.forwardRef(
  /* @__PURE__ */ __name(function AvatarFallback2(props, forwardedRef) {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }, "AvatarFallback")
);
function useImageLoadingStatus(src, {
  loadingStatus,
  setLoadingStatus,
  referrerPolicy,
  crossOrigin
}) {
  useLayoutEffect2(() => {
    if (!src) {
      setLoadingStatus("error");
      return;
    }
    const image = new window.Image();
    const handleLoad = /* @__PURE__ */ __name((event) => {
      const image2 = event.currentTarget;
      setLoadingStatus(getImageLoadingStatus(image2));
    }, "handleLoad");
    const handleError = /* @__PURE__ */ __name(() => setLoadingStatus("error"), "handleError");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    image.crossOrigin = crossOrigin ?? null;
    image.src = src;
    setLoadingStatus(getImageLoadingStatus(image));
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
      setLoadingStatus("idle");
    };
  }, [src, crossOrigin, referrerPolicy, setLoadingStatus]);
  return loadingStatus;
}
__name(useImageLoadingStatus, "useImageLoadingStatus");
function getImageLoadingStatus(image) {
  return image.complete ? image.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
__name(getImageLoadingStatus, "getImageLoadingStatus");
function useImageCount() {
  let state = STATIC_IMAGE_COUNT_STATE;
  return state;
}
__name(useImageCount, "useImageCount");
function useUpdateImageCount(setImageCount) {
}
__name(useUpdateImageCount, "useUpdateImageCount");
export {
  Avatar as A,
  AvatarImage as a,
  AvatarFallback as b
};
