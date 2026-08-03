import { N as Node3, n as nodeInputRule, c as canInsertNode, i as isNodeSelection, m as mergeAttributes } from "../tiptap__core.mjs";
import { T as TextSelection, N as NodeSelection } from "../prosemirror-state.mjs";
var HorizontalRule = Node3.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (token, helpers) => {
    return helpers.createNode("horizontalRule");
  },
  renderMarkdown: () => {
    return "---";
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain, state }) => {
        if (!canInsertNode(state, state.schema.nodes[this.name])) {
          return false;
        }
        const { selection } = state;
        const { $to: $originTo } = selection;
        const currentChain = chain();
        if (isNodeSelection(selection)) {
          currentChain.insertContentAt($originTo.pos, {
            type: this.name
          });
        } else {
          currentChain.insertContent({ type: this.name });
        }
        return currentChain.command(({ state: chainState, tr, dispatch }) => {
          if (dispatch) {
            const { $to } = tr.selection;
            const posAfter = $to.end();
            if ($to.nodeAfter) {
              if ($to.nodeAfter.isTextblock) {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
              } else if ($to.nodeAfter.isBlock) {
                tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
              } else {
                tr.setSelection(TextSelection.create(tr.doc, $to.pos));
              }
            } else {
              const nodeType = chainState.schema.nodes[this.options.nextNodeType] || $to.parent.type.contentMatch.defaultType;
              const node = nodeType == null ? void 0 : nodeType.create();
              if (node) {
                tr.insert(posAfter, node);
                tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));
              }
            }
            tr.scrollIntoView();
          }
          return true;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});
export {
  HorizontalRule as H
};
