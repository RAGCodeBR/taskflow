import { k as Extension, x as callOrReturn, y as getExtensionField, i as isNodeSelection, z as isNodeEmpty, g as getChangedRanges } from "./tiptap__core.mjs";
import { a as PluginKey, P as Plugin } from "./prosemirror-state.mjs";
import { d as dropCursor } from "./prosemirror-dropcursor.mjs";
import { D as DecorationSet, a as Decoration } from "./prosemirror-view.mjs";
import { g as gapCursor } from "./prosemirror-gapcursor.mjs";
import { h as history, r as redo, u as undo } from "./prosemirror-history.mjs";
Extension.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      autoTrim: true,
      mode: "textSize",
      textCounter: (text) => text.length,
      wordCounter: (text) => text.split(" ").filter((word) => word !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const mode = (options == null ? void 0 : options.mode) || this.options.mode;
      if (mode === "textSize") {
        const text = node.textBetween(0, node.content.size, void 0, " ");
        return this.options.textCounter(text);
      }
      return node.nodeSize;
    };
    this.storage.words = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const text = node.textBetween(0, node.content.size, " ", " ");
      return this.options.wordCounter(text);
    };
  },
  addProseMirrorPlugins() {
    let initialEvaluationDone = false;
    return [
      new Plugin({
        key: new PluginKey("characterCount"),
        appendTransaction: (transactions, oldState, newState) => {
          if (initialEvaluationDone) {
            return;
          }
          const limit = this.options.limit;
          const autoTrim = this.options.autoTrim;
          if (limit === null || limit === void 0 || limit === 0 || autoTrim === false) {
            initialEvaluationDone = true;
            return;
          }
          const initialContentSize = this.storage.characters({ node: newState.doc });
          if (initialContentSize > limit) {
            const over = initialContentSize - limit;
            const from = 0;
            const to = over;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${limit} characters. Content was automatically trimmed.`
            );
            const tr = newState.tr.deleteRange(from, to);
            initialEvaluationDone = true;
            return tr;
          }
          initialEvaluationDone = true;
        },
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;
          if (!transaction.docChanged || limit === 0 || limit === null || limit === void 0) {
            return true;
          }
          const oldSize = this.storage.characters({ node: state.doc });
          const newSize = this.storage.characters({ node: transaction.doc });
          if (newSize <= limit) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize <= oldSize) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize > oldSize) {
            return false;
          }
          const isPaste = transaction.getMeta("paste");
          if (!isPaste) {
            return false;
          }
          const pos = transaction.selection.$head.pos;
          const over = newSize - limit;
          const from = pos - over;
          const to = pos;
          transaction.deleteRange(from, to);
          const updatedSize = this.storage.characters({ node: transaction.doc });
          if (updatedSize > limit) {
            return false;
          }
          return true;
        }
      })
    ];
  }
});
var Dropcursor = Extension.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [dropCursor(this.options)];
  }
});
Extension.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("focus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { anchor } = selection;
            const decorations = [];
            if (!isEditable || !isFocused) {
              return DecorationSet.create(doc, []);
            }
            let maxLevels = 0;
            if (this.options.mode === "deepest") {
              doc.descendants((node, pos) => {
                if (node.isText) {
                  return;
                }
                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
                if (!isCurrent) {
                  return false;
                }
                maxLevels += 1;
              });
            }
            let currentLevel = 0;
            doc.descendants((node, pos) => {
              if (node.isText) {
                return false;
              }
              const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
              if (!isCurrent) {
                return false;
              }
              currentLevel += 1;
              const outOfScope = this.options.mode === "deepest" && maxLevels - currentLevel > 0 || this.options.mode === "shallowest" && currentLevel > 1;
              if (outOfScope) {
                return this.options.mode === "deepest";
              }
              decorations.push(
                Decoration.node(pos, pos + node.nodeSize, {
                  class: this.options.className
                })
              );
            });
            return DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});
var Gapcursor = Extension.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [gapCursor()];
  },
  extendNodeSchema(extension) {
    var _a;
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      allowGapCursor: (_a = callOrReturn(getExtensionField(extension, "allowGapCursor", context))) != null ? _a : null
    };
  }
});
var DEFAULT_DATA_ATTRIBUTE = "placeholder";
var PLUGIN_KEY = new PluginKey("tiptap__placeholder");
function createPlaceholderDecoration(options) {
  const {
    editor,
    placeholder,
    dataAttribute,
    pos,
    node,
    isEmptyDoc,
    hasAnchor,
    classes: { emptyNode, emptyEditor }
  } = options;
  const classes = [emptyNode];
  if (isEmptyDoc) {
    classes.push(emptyEditor);
  }
  return Decoration.node(pos, pos + node.nodeSize, {
    class: classes.join(" "),
    [dataAttribute]: typeof placeholder === "function" ? placeholder({
      editor,
      node,
      pos,
      hasAnchor
    }) : placeholder
  });
}
function resolveEmptyNodeClass(emptyNodeClass, props) {
  return typeof emptyNodeClass === "function" ? emptyNodeClass(props) : emptyNodeClass;
}
function scanRangeForDecorations({
  editor,
  options,
  dataAttribute,
  doc,
  selection,
  from,
  to
}) {
  const { anchor } = selection;
  const decorations = [];
  const isEmptyDoc = editor.isEmpty;
  doc.nodesBetween(from, to, (node, pos) => {
    const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
    const isEmpty = !node.isLeaf && isNodeEmpty(node);
    if (!node.type.isTextblock) {
      return options.includeChildren;
    }
    if ((hasAnchor || !options.showOnlyCurrent) && isEmpty) {
      decorations.push(
        createPlaceholderDecoration({
          editor,
          isEmptyDoc,
          dataAttribute,
          hasAnchor,
          placeholder: options.placeholder,
          classes: {
            emptyEditor: options.emptyEditorClass,
            emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
              editor,
              node,
              pos,
              hasAnchor
            })
          },
          node,
          pos
        })
      );
    }
    return options.includeChildren;
  });
  return decorations;
}
function buildPlaceholderDecorations({
  editor,
  options,
  dataAttribute,
  doc,
  selection
}) {
  const active = editor.isEditable || !options.showOnlyWhenEditable;
  if (!active) {
    return null;
  }
  const { anchor } = selection;
  const decorations = [];
  const isEmptyDoc = editor.isEmpty;
  const useResolvedPath = options.showOnlyCurrent && !options.includeChildren;
  if (useResolvedPath) {
    const resolved = doc.resolve(anchor);
    const node = resolved.depth > 0 ? resolved.node(1) : resolved.nodeAfter;
    const nodeStart = resolved.depth > 0 ? resolved.before(1) : anchor;
    if (node && node.type.isTextblock && isNodeEmpty(node)) {
      const hasAnchor = anchor >= nodeStart && anchor <= nodeStart + node.nodeSize;
      decorations.push(
        createPlaceholderDecoration({
          editor,
          isEmptyDoc,
          dataAttribute,
          hasAnchor,
          placeholder: options.placeholder,
          classes: {
            emptyEditor: options.emptyEditorClass,
            emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
              editor,
              node,
              pos: nodeStart,
              hasAnchor
            })
          },
          node,
          pos: nodeStart
        })
      );
    }
  } else {
    decorations.push(
      ...scanRangeForDecorations({
        editor,
        options,
        dataAttribute,
        doc,
        selection,
        from: 0,
        to: doc.content.size
      })
    );
  }
  return DecorationSet.create(doc, decorations);
}
function resolveTopLevelRange(doc, pos) {
  var _a;
  const resolved = doc.resolve(pos);
  if (resolved.depth === 0) {
    const node2 = (_a = resolved.nodeAfter) != null ? _a : resolved.nodeBefore;
    if (!node2) {
      return { from: pos, to: pos };
    }
    const nodePos = resolved.nodeAfter ? pos : pos - node2.nodeSize;
    return { from: nodePos, to: nodePos + node2.nodeSize };
  }
  const topLevelPos = resolved.before(1);
  const node = resolved.node(1);
  return { from: topLevelPos, to: topLevelPos + node.nodeSize };
}
function toContentRelativeRange(doc, range) {
  return {
    from: Math.max(0, range.from - 1),
    to: Math.min(doc.content.size, range.to - 1)
  };
}
function getTopLevelBlocksInRange(doc, from, to) {
  const ranges = [];
  doc.forEach((node, offset) => {
    const nodeStart = offset;
    const nodeEnd = nodeStart + node.nodeSize;
    const absNodeStart = nodeStart + 1;
    const absNodeEnd = nodeEnd + 1;
    if (absNodeStart < to && absNodeEnd > from) {
      ranges.push({ from: nodeStart, to: nodeEnd });
    }
  });
  return ranges;
}
function mergeRanges(ranges) {
  if (ranges.length === 0) {
    return [];
  }
  const sorted = [...ranges].sort((a, b) => a.from - b.from);
  const merged = [{ ...sorted[0] }];
  for (let i = 1; i < sorted.length; i += 1) {
    const last = merged[merged.length - 1];
    const current = sorted[i];
    if (current.from <= last.to) {
      last.to = Math.max(last.to, current.to);
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}
function collectBlocksForChange(doc, change) {
  const ranges = getTopLevelBlocksInRange(doc, change.from, change.to);
  ranges.push(toContentRelativeRange(doc, resolveTopLevelRange(doc, change.from)));
  if (change.to > change.from) {
    ranges.push(
      toContentRelativeRange(
        doc,
        resolveTopLevelRange(doc, Math.min(change.to, doc.content.size + 1) - 1)
      )
    );
  } else if (change.from < doc.content.size + 1) {
    ranges.push(
      toContentRelativeRange(
        doc,
        resolveTopLevelRange(doc, Math.min(change.from + 1, doc.content.size))
      )
    );
  }
  return ranges;
}
function collectRescanRanges(tr, oldState, newState) {
  const ranges = [];
  if (tr.docChanged) {
    const changes = getChangedRanges(tr);
    for (const change of changes) {
      ranges.push(...collectBlocksForChange(newState.doc, change.newRange));
    }
  }
  if (tr.selectionSet) {
    ranges.push(
      toContentRelativeRange(
        newState.doc,
        resolveTopLevelRange(newState.doc, tr.mapping.map(oldState.selection.anchor))
      )
    );
    ranges.push(
      toContentRelativeRange(
        newState.doc,
        resolveTopLevelRange(newState.doc, newState.selection.anchor)
      )
    );
  }
  return mergeRanges(ranges);
}
function clampRange(from, to, doc) {
  const clampedFrom = Math.max(0, Math.min(from, doc.content.size));
  const clampedTo = Math.max(clampedFrom, Math.min(to, doc.content.size));
  return { from: clampedFrom, to: clampedTo };
}
function updateDecorationsInRanges({
  decorations,
  ranges,
  editor,
  options,
  dataAttribute,
  doc,
  selection
}) {
  let next = decorations;
  for (const range of ranges) {
    const { from, to } = clampRange(range.from, range.to, doc);
    const existing = next.find(from, to).filter((decoration) => decoration.from >= from && decoration.to <= to);
    if (existing.length) {
      next = next.remove(existing);
    }
    const newDecos = scanRangeForDecorations({
      editor,
      options,
      dataAttribute,
      doc,
      selection,
      from,
      to
    });
    if (newDecos.length) {
      next = next.add(doc, newDecos);
    }
  }
  return next;
}
function createPlaceholderStateField({
  editor,
  options,
  dataAttribute
}) {
  return {
    init(_config, state) {
      const decorations = buildPlaceholderDecorations({
        editor,
        options,
        dataAttribute,
        doc: state.doc,
        selection: state.selection
      });
      return decorations != null ? decorations : DecorationSet.empty;
    },
    apply(tr, prev, oldState, newState) {
      if (!tr.docChanged && !tr.selectionSet) {
        return prev;
      }
      const mapped = prev.map(tr.mapping, tr.doc);
      const ranges = collectRescanRanges(tr, oldState, newState);
      return updateDecorationsInRanges({
        decorations: mapped,
        ranges,
        editor,
        options,
        dataAttribute,
        doc: newState.doc,
        selection: newState.selection
      });
    }
  };
}
function preparePlaceholderAttribute(attr) {
  return attr.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function createPlaceholderPlugin({ editor, options }) {
  const dataAttribute = options.dataAttribute ? `data-${preparePlaceholderAttribute(options.dataAttribute)}` : `data-${DEFAULT_DATA_ATTRIBUTE}`;
  const useResolvedPath = options.showOnlyCurrent && !options.includeChildren;
  return new Plugin({
    key: PLUGIN_KEY,
    ...useResolvedPath ? {} : {
      state: createPlaceholderStateField({ editor, options, dataAttribute })
    },
    props: {
      decorations: useResolvedPath ? ({ doc, selection }) => buildPlaceholderDecorations({ editor, options, dataAttribute, doc, selection }) : (state) => {
        var _a;
        if (options.showOnlyWhenEditable && !editor.isEditable) {
          return DecorationSet.empty;
        }
        return (_a = PLUGIN_KEY.getState(state)) != null ? _a : DecorationSet.empty;
      }
    }
  });
}
Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      dataAttribute: DEFAULT_DATA_ATTRIBUTE,
      placeholder: "Write something …",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [createPlaceholderPlugin({ editor: this.editor, options: this.options })];
  }
});
function shouldSyncDomSelection(state, editor) {
  return !state.selection.empty && !isNodeSelection(state.selection) && editor.isEditable;
}
function shouldPreserveSelection(state, editor) {
  return shouldSyncDomSelection(state, editor) && !editor.isFocused && !editor.view.dragging;
}
function clearDomSelection() {
  var _a;
  (_a = window.getSelection()) == null ? void 0 : _a.removeAllRanges();
}
function restoreDomSelection(view) {
  view.focus();
}
Extension.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor, options } = this;
    return [
      new Plugin({
        key: new PluginKey("selection"),
        props: {
          decorations(state) {
            if (!shouldPreserveSelection(state, editor)) {
              return null;
            }
            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: options.className
              })
            ]);
          },
          handleDOMEvents: {
            blur(view) {
              if (!shouldSyncDomSelection(view.state, editor)) {
                return false;
              }
              clearDomSelection();
              return false;
            },
            focus(view) {
              if (!shouldSyncDomSelection(view.state, editor)) {
                return false;
              }
              requestAnimationFrame(() => {
                if (!editor.isDestroyed && view.hasFocus()) {
                  restoreDomSelection(view);
                }
              });
              return false;
            }
          }
        }
      })
    ];
  }
});
var skipTrailingNodeMeta = "skipTrailingNode";
function nodeEqualsType({
  types,
  node
}) {
  return node && Array.isArray(types) && types.includes(node.type) || (node == null ? void 0 : node.type) === types;
}
var TrailingNode = Extension.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var _a;
    const plugin = new PluginKey(this.name);
    const defaultNode = this.options.node || ((_a = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : _a.name) || "paragraph";
    const disabledNodes = Object.entries(this.editor.schema.nodes).map(([, value]) => value).filter((node) => (this.options.notAfter || []).concat(defaultNode).includes(node.name));
    return [
      new Plugin({
        key: plugin,
        appendTransaction: (transactions, __, state) => {
          const { doc, tr, schema } = state;
          const shouldInsertNodeAtEnd = plugin.getState(state);
          const endPosition = doc.content.size;
          const type = schema.nodes[defaultNode];
          if (transactions.some((transaction) => transaction.getMeta(skipTrailingNodeMeta))) {
            return;
          }
          if (!shouldInsertNodeAtEnd) {
            return;
          }
          return tr.insert(endPosition, type.create());
        },
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value;
            }
            if (tr.getMeta("__uniqueIDTransaction")) {
              return value;
            }
            const lastNode = tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          }
        }
      })
    ];
  }
});
var UndoRedo = Extension.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state, dispatch }) => {
        return undo(state, dispatch);
      },
      redo: () => ({ state, dispatch }) => {
        return redo(state, dispatch);
      }
    };
  },
  addProseMirrorPlugins() {
    return [history(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
});
export {
  Dropcursor as D,
  Gapcursor as G,
  TrailingNode as T,
  UndoRedo as U
};
