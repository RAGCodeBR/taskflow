import { r as reactExports, R as React, j as jsxRuntimeExports } from "./react.mjs";
import { a as ReactDOM } from "./react-dom.mjs";
import { s as shimExports, w as withSelectorExports } from "./use-sync-external-store.mjs";
import { E as Editor } from "./tiptap__core.mjs";
import { d as deepEqual } from "./fast-equals.mjs";
var mergeRefs = (...refs) => {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
};
var Portals = ({ contentComponent }) => {
  const renderers = shimExports.useSyncExternalStore(
    contentComponent.subscribe,
    contentComponent.getSnapshot,
    contentComponent.getServerSnapshot
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Object.values(renderers) });
};
function createContentComponent() {
  const subscribers = /* @__PURE__ */ new Set();
  let renderers = {};
  let isNotificationQueued = false;
  const notifySubscribers = () => {
    if (isNotificationQueued || !subscribers.size) {
      return;
    }
    isNotificationQueued = true;
    queueMicrotask(() => {
      isNotificationQueued = false;
      subscribers.forEach((subscriber) => subscriber());
    });
  };
  return {
    /**
     * Subscribe to the editor instance's changes.
     */
    subscribe(callback) {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
    getSnapshot() {
      return renderers;
    },
    getServerSnapshot() {
      return renderers;
    },
    /**
     * Adds a new NodeView Renderer to the editor.
     */
    setRenderer(id, renderer) {
      renderers = {
        ...renderers,
        [id]: ReactDOM.createPortal(renderer.reactElement, renderer.element, id)
      };
      notifySubscribers();
    },
    /**
     * Removes a NodeView Renderer from the editor.
     */
    removeRenderer(id) {
      const nextRenderers = { ...renderers };
      delete nextRenderers[id];
      renderers = nextRenderers;
      notifySubscribers();
    }
  };
}
var PureEditorContent = class extends React.Component {
  constructor(props) {
    super(props);
    this.editorContentRef = React.createRef();
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    var _a;
    const editor = this.props.editor;
    if (editor && !editor.isDestroyed && ((_a = editor.view.dom) == null ? void 0 : _a.parentNode)) {
      if (editor.contentComponent) {
        return;
      }
      const element = this.editorContentRef.current;
      element.append(...editor.view.dom.parentNode.childNodes);
      editor.setOptions({
        element
      });
      editor.contentComponent = createContentComponent();
      editor.createNodeViews();
      editor.isEditorContentInitialized = true;
      this.forceUpdate();
    }
  }
  componentWillUnmount() {
    var _a;
    const editor = this.props.editor;
    if (!editor) {
      return;
    }
    editor.isEditorContentInitialized = false;
    if (!editor.isDestroyed) {
      editor.view.setProps({
        nodeViews: {}
      });
    }
    editor.contentComponent = null;
    try {
      if (!((_a = editor.view.dom) == null ? void 0 : _a.parentNode)) {
        return;
      }
      const newElement = document.createElement("div");
      newElement.append(...editor.view.dom.parentNode.childNodes);
      editor.setOptions({
        element: newElement
      });
    } catch {
    }
  }
  render() {
    const { editor, innerRef, ...rest } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mergeRefs(innerRef, this.editorContentRef), ...rest }),
      (editor == null ? void 0 : editor.contentComponent) && /* @__PURE__ */ jsxRuntimeExports.jsx(Portals, { contentComponent: editor.contentComponent })
    ] });
  }
};
var EditorContentWithKey = reactExports.forwardRef(
  (props, ref) => {
    const key = React.useMemo(() => {
      return Math.floor(Math.random() * 4294967295).toString();
    }, [props.editor]);
    return React.createElement(PureEditorContent, {
      key,
      innerRef: ref,
      ...props
    });
  }
);
var EditorContent = React.memo(EditorContentWithKey);
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var EditorStateManager = class {
  constructor(initialEditor) {
    this.transactionNumber = 0;
    this.lastTransactionNumber = 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.editor = initialEditor;
    this.lastSnapshot = { editor: initialEditor, transactionNumber: 0 };
    this.getSnapshot = this.getSnapshot.bind(this);
    this.getServerSnapshot = this.getServerSnapshot.bind(this);
    this.watch = this.watch.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  /**
   * Get the current editor instance.
   */
  getSnapshot() {
    if (this.transactionNumber === this.lastTransactionNumber) {
      return this.lastSnapshot;
    }
    this.lastTransactionNumber = this.transactionNumber;
    this.lastSnapshot = { editor: this.editor, transactionNumber: this.transactionNumber };
    return this.lastSnapshot;
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return { editor: null, transactionNumber: 0 };
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }
  /**
   * Watch the editor instance for changes.
   */
  watch(nextEditor) {
    this.editor = nextEditor;
    if (this.editor) {
      const fn = () => {
        this.transactionNumber += 1;
        this.subscribers.forEach((callback) => callback());
      };
      const currentEditor = this.editor;
      currentEditor.on("transaction", fn);
      return () => {
        currentEditor.off("transaction", fn);
      };
    }
    return void 0;
  }
};
function useEditorState(options) {
  var _a;
  const [editorStateManager] = reactExports.useState(() => new EditorStateManager(options.editor));
  const selectedState = withSelectorExports.useSyncExternalStoreWithSelector(
    editorStateManager.subscribe,
    editorStateManager.getSnapshot,
    editorStateManager.getServerSnapshot,
    options.selector,
    (_a = options.equalityFn) != null ? _a : deepEqual
  );
  useIsomorphicLayoutEffect(() => {
    return editorStateManager.watch(options.editor);
  }, [options.editor, editorStateManager]);
  reactExports.useDebugValue(selectedState);
  return selectedState;
}
var isDev = false;
var isSSR = typeof window === "undefined";
var isNext = isSSR || Boolean(typeof window !== "undefined" && window.next);
var EditorInstanceManager = class _EditorInstanceManager {
  constructor(options) {
    this.editor = null;
    this.subscriptions = /* @__PURE__ */ new Set();
    this.isComponentMounted = false;
    this.previousDeps = null;
    this.instanceId = "";
    this.options = options;
    this.subscriptions = /* @__PURE__ */ new Set();
    this.setEditor(this.getInitialEditor());
    this.scheduleDestroy();
    this.getEditor = this.getEditor.bind(this);
    this.getServerSnapshot = this.getServerSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.refreshEditorInstance = this.refreshEditorInstance.bind(this);
    this.scheduleDestroy = this.scheduleDestroy.bind(this);
    this.onRender = this.onRender.bind(this);
    this.createEditor = this.createEditor.bind(this);
  }
  setEditor(editor) {
    this.editor = editor;
    this.instanceId = Math.random().toString(36).slice(2, 9);
    this.subscriptions.forEach((cb) => cb());
  }
  getInitialEditor() {
    const explicit = this.options.current.immediatelyRender;
    let immediatelyRender = explicit != null ? explicit : true;
    if (isSSR) {
      if (immediatelyRender && isDev) {
        console.warn(
          "SSR detected. `immediatelyRender` has been set to false to avoid hydration mismatches"
        );
      }
      immediatelyRender = false;
    } else if (isNext && explicit === void 0) {
      immediatelyRender = false;
    }
    return immediatelyRender ? this.createEditor() : null;
  }
  /**
   * Create a new editor instance. And attach event listeners.
   */
  createEditor() {
    const optionsToApply = {
      ...this.options.current,
      // Always call the most recent version of the callback function by default
      onBeforeCreate: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onBeforeCreate) == null ? void 0 : _b.call(_a, ...args);
      },
      onBlur: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onBlur) == null ? void 0 : _b.call(_a, ...args);
      },
      onCreate: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onCreate) == null ? void 0 : _b.call(_a, ...args);
      },
      onDestroy: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onDestroy) == null ? void 0 : _b.call(_a, ...args);
      },
      onFocus: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onFocus) == null ? void 0 : _b.call(_a, ...args);
      },
      onSelectionUpdate: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onSelectionUpdate) == null ? void 0 : _b.call(_a, ...args);
      },
      onTransaction: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onTransaction) == null ? void 0 : _b.call(_a, ...args);
      },
      onUpdate: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onUpdate) == null ? void 0 : _b.call(_a, ...args);
      },
      onContentError: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onContentError) == null ? void 0 : _b.call(_a, ...args);
      },
      onDrop: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onDrop) == null ? void 0 : _b.call(_a, ...args);
      },
      onPaste: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onPaste) == null ? void 0 : _b.call(_a, ...args);
      },
      onDelete: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onDelete) == null ? void 0 : _b.call(_a, ...args);
      },
      onMount: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onMount) == null ? void 0 : _b.call(_a, ...args);
      },
      onUnmount: (...args) => {
        var _a, _b;
        return (_b = (_a = this.options.current).onUnmount) == null ? void 0 : _b.call(_a, ...args);
      }
    };
    const editor = new Editor(optionsToApply);
    return editor;
  }
  /**
   * Get the current editor instance.
   */
  getEditor() {
    return this.editor;
  }
  /**
   * Always disable the editor on the server-side.
   */
  getServerSnapshot() {
    return null;
  }
  /**
   * Subscribe to the editor instance's changes.
   */
  subscribe(onStoreChange) {
    this.subscriptions.add(onStoreChange);
    return () => {
      this.subscriptions.delete(onStoreChange);
    };
  }
  static compareOptions(a, b) {
    return Object.keys(a).every((key) => {
      if ([
        "onCreate",
        "onBeforeCreate",
        "onDestroy",
        "onUpdate",
        "onTransaction",
        "onFocus",
        "onBlur",
        "onSelectionUpdate",
        "onContentError",
        "onDrop",
        "onPaste"
      ].includes(key)) {
        return true;
      }
      if (key === "extensions" && a.extensions && b.extensions) {
        if (a.extensions.length !== b.extensions.length) {
          return false;
        }
        return a.extensions.every((extension, index) => {
          var _a;
          if (extension !== ((_a = b.extensions) == null ? void 0 : _a[index])) {
            return false;
          }
          return true;
        });
      }
      if (a[key] !== b[key]) {
        return false;
      }
      return true;
    });
  }
  /**
   * On each render, we will create, update, or destroy the editor instance.
   * @param deps The dependencies to watch for changes
   * @returns A cleanup function
   */
  onRender(deps) {
    return () => {
      this.isComponentMounted = true;
      clearTimeout(this.scheduledDestructionTimeout);
      if (this.editor && !this.editor.isDestroyed && deps.length === 0) {
        if (!_EditorInstanceManager.compareOptions(this.options.current, this.editor.options)) {
          this.editor.setOptions({
            ...this.options.current,
            editable: this.editor.isEditable
          });
        }
      } else {
        this.refreshEditorInstance(deps);
      }
      return () => {
        this.isComponentMounted = false;
        this.scheduleDestroy();
      };
    };
  }
  /**
   * Recreate the editor instance if the dependencies have changed.
   */
  refreshEditorInstance(deps) {
    if (this.editor && !this.editor.isDestroyed) {
      if (this.previousDeps === null) {
        this.previousDeps = deps;
        return;
      }
      const depsAreEqual = this.previousDeps.length === deps.length && this.previousDeps.every((dep, index) => dep === deps[index]);
      if (depsAreEqual) {
        return;
      }
    }
    if (this.editor && !this.editor.isDestroyed) {
      this.editor.destroy();
    }
    this.setEditor(this.createEditor());
    this.previousDeps = deps;
  }
  /**
   * Schedule the destruction of the editor instance.
   * This will only destroy the editor if it was not mounted on the next tick.
   * This is to avoid destroying the editor instance when it's actually still mounted.
   */
  scheduleDestroy() {
    const currentInstanceId = this.instanceId;
    const currentEditor = this.editor;
    this.scheduledDestructionTimeout = setTimeout(() => {
      if (this.isComponentMounted && this.instanceId === currentInstanceId) {
        if (currentEditor) {
          currentEditor.setOptions(this.options.current);
        }
        return;
      }
      if (currentEditor && !currentEditor.isDestroyed) {
        currentEditor.destroy();
        if (this.instanceId === currentInstanceId) {
          this.setEditor(null);
        }
      }
    }, 1);
  }
};
function useEditor(options = {}, deps = []) {
  const mostRecentOptions = reactExports.useRef(options);
  mostRecentOptions.current = options;
  const [instanceManager] = reactExports.useState(() => new EditorInstanceManager(mostRecentOptions));
  const editor = shimExports.useSyncExternalStore(
    instanceManager.subscribe,
    instanceManager.getEditor,
    instanceManager.getServerSnapshot
  );
  reactExports.useDebugValue(editor);
  reactExports.useEffect(instanceManager.onRender(deps));
  useEditorState({
    editor,
    selector: ({ transactionNumber }) => {
      if (options.shouldRerenderOnTransaction === false || options.shouldRerenderOnTransaction === void 0) {
        return null;
      }
      if (options.immediatelyRender && transactionNumber === 0) {
        return 0;
      }
      return transactionNumber + 1;
    }
  });
  return editor;
}
var EditorContext = reactExports.createContext({
  editor: null
});
EditorContext.Consumer;
var ReactNodeViewContext = reactExports.createContext({
  onDragStart: () => {
  },
  nodeViewContentChildren: void 0,
  nodeViewContentRef: () => {
  }
});
var useReactNodeView = () => reactExports.useContext(ReactNodeViewContext);
React.forwardRef((props, ref) => {
  const { onDragStart } = useReactNodeView();
  const Tag = props.as || "div";
  return (
    // @ts-ignore
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tag,
      {
        ...props,
        ref,
        "data-node-view-wrapper": "",
        onDragStart,
        style: {
          whiteSpace: "normal",
          ...props.style
        }
      }
    )
  );
});
React.createContext({
  markViewContentRef: () => {
  }
});
var TiptapContext = reactExports.createContext({
  get editor() {
    throw new Error("useTiptap must be used within a <Tiptap> provider");
  }
});
TiptapContext.displayName = "TiptapContext";
var useTiptap = () => reactExports.useContext(TiptapContext);
function TiptapWrapper({ children, ...props }) {
  const resolvedEditor = "editor" in props ? props.editor : props.instance;
  if (!resolvedEditor) {
    throw new Error("Tiptap: An editor instance is required. Pass a non-null `editor` prop.");
  }
  const tiptapContextValue = reactExports.useMemo(
    () => ({ editor: resolvedEditor }),
    [resolvedEditor]
  );
  const legacyContextValue = reactExports.useMemo(() => ({ editor: resolvedEditor }), [resolvedEditor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContext.Provider, { value: legacyContextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TiptapContext.Provider, { value: tiptapContextValue, children }) });
}
TiptapWrapper.displayName = "Tiptap";
function TiptapContent({ ...rest }) {
  const { editor } = useTiptap();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor, ...rest });
}
TiptapContent.displayName = "Tiptap.Content";
Object.assign(TiptapWrapper, {
  /**
   * The Tiptap Content component that renders the EditorContent with the editor instance from the context.
   * @see TiptapContent
   */
  Content: TiptapContent
});
export {
  EditorContent as E,
  useEditor as u
};
